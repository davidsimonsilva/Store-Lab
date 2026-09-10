import { Order, OrderStatus, SanitizedTrackingInfo, CourierLogisticsStep } from '../types';
import { findOrderByCodeOrId, saveAllUserOrders, getUserOrders } from './orderService';
import { STORAGE_KEYS } from '../constants';

export const TRACKING_WINDOW_DURATIONS_MS = {
  WINDOW_1_FILIAL: 5 * 60 * 1000,      
  WINDOW_2_TRANSIT: 35 * 60 * 1000,    
  WINDOW_3_CD_LOCAL: 5 * 60 * 1000,    
  WINDOW_4_DELIVERY: 15 * 60 * 1000,   
  TOTAL_TRANSPORT: 60 * 60 * 1000,     
  DELIVERY_DELAY: 5 * 60 * 1000,       
  TOTAL_UNTIL_DELIVERED: 65 * 60 * 1000, 
} as const;

export const calculateWindowProbability = (elapsedInWindowMs: number, windowDurationMs: number): number => {
  if (windowDurationMs <= 0) return 1.0;
  if (elapsedInWindowMs >= windowDurationMs) return 1.0;
  if (elapsedInWindowMs <= 0) return 0.001;

  const ratio = Math.min(1.0, Math.max(0, elapsedInWindowMs / windowDurationMs));

  if (ratio <= 0.75) {
    const normalized = ratio / 0.75;
    return 0.001 + (0.08 - 0.001) * Math.pow(normalized, 1.5);
  } else {
    const normalizedUpper = (ratio - 0.75) / 0.25;
    return 0.08 + (1.0 - 0.08) * Math.pow(normalizedUpper, 2);
  }
};

const formatDateTime = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const findOrderForTracking = (query: string, currentUserId?: string): Order | null => {
  if (!query || !query.trim()) return null;
  const clean = query.trim().toUpperCase().replace(/\s+/g, '');

  const matched = findOrderByCodeOrId(clean, currentUserId);
  if (matched) {
    if (matched.status === 'shipped' || matched.status === 'delivered') {
      return matched;
    }
    return null;
  }

  if (clean.startsWith('SL') && clean.endsWith('BR') && clean.length >= 12) {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(STORAGE_KEYS.USER_ORDERS_PREFIX)) {
          const raw = localStorage.getItem(key);
          if (raw) {
            const parsed = JSON.parse(raw) as Order[];
            if (Array.isArray(parsed)) {
              const exactMatch = parsed.find(
                (o) => o.trackingCode && o.trackingCode.toUpperCase().replace(/\s+/g, '') === clean
              );
              if (exactMatch && (exactMatch.status === 'shipped' || exactMatch.status === 'delivered')) {
                return exactMatch;
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn('Erro ao consultar código de rastreio no storage:', e);
    }
  }

  return null;
};

export const validateAndSynchronizeOrderDelivery = (order: Order, now: Date = new Date()): Order => {
  let shippedAtMs: number;
  if (order.shippedAt) {
    shippedAtMs = new Date(order.shippedAt).getTime();
  } else if (order.stepEnteredAt) {
    shippedAtMs = new Date(order.stepEnteredAt).getTime();
  } else {
    shippedAtMs = new Date(order.createdAt).getTime();
  }

  if (isNaN(shippedAtMs)) {
    shippedAtMs = now.getTime() - TRACKING_WINDOW_DURATIONS_MS.TOTAL_UNTIL_DELIVERED;
  }

  const totalElapsedMs = Math.max(0, now.getTime() - shippedAtMs);

  if (totalElapsedMs >= TRACKING_WINDOW_DURATIONS_MS.TOTAL_UNTIL_DELIVERED && order.status === 'shipped') {

    const updatedTimeline = order.timeline.map((step, idx) => {
      if (idx <= 3) {
        return { ...step, completed: true };
      }
      if (idx === 4) {
        return {
          ...step,
          completed: true,
          label: 'Entrega Concluída',
          timestamp: `Entregue em ${formatDateTime(now)}`,
        };
      }
      return step;
    });

    const updatedOrder: Order = {
      ...order,
      status: 'delivered',
      courierDeliveredAt: new Date(shippedAtMs + TRACKING_WINDOW_DURATIONS_MS.TOTAL_TRANSPORT).toISOString(),
      timeline: updatedTimeline,
    };

    try {
      const userOrders = getUserOrders(order.userId);
      const idx = userOrders.findIndex((o) => o.id === order.id);
      if (idx !== -1) {
        userOrders[idx] = updatedOrder;
        saveAllUserOrders(order.userId, userOrders);
      } else {
        saveAllUserOrders('guest', [updatedOrder]);
      }
    } catch (err) {
      console.warn('Erro ao sincronizar status de entrega no storage:', err);
    }

    return updatedOrder;
  }

  return order;
};

export const getSanitizedTrackingInfo = (
  query: string,
  userIdOrNow?: string | Date,
  maybeNow?: Date
): SanitizedTrackingInfo | null => {
  const currentUserId = typeof userIdOrNow === 'string' ? userIdOrNow : undefined;
  const now =
    userIdOrNow instanceof Date
      ? userIdOrNow
      : maybeNow instanceof Date
      ? maybeNow
      : new Date();

  const rawOrder = findOrderForTracking(query, currentUserId);
  if (!rawOrder) return null;

  const order = validateAndSynchronizeOrderDelivery(rawOrder, now);

  const trackingCode = order.trackingCode || 'SL982348102BR';
  const orderNumber = order.orderNumber;
  const destinationCityState = order.deliveryAddress
    ? `${order.deliveryAddress.city} / ${order.deliveryAddress.state}`
    : 'São Paulo / SP';

  let shippedAtMs: number;
  if (order.shippedAt) {
    shippedAtMs = new Date(order.shippedAt).getTime();
  } else if (order.stepEnteredAt) {
    shippedAtMs = new Date(order.stepEnteredAt).getTime();
  } else {
    shippedAtMs = new Date(order.createdAt).getTime();
  }

  if (isNaN(shippedAtMs)) {
    shippedAtMs = now.getTime();
  }

  const shippedDate = new Date(shippedAtMs);
  const totalElapsedMs = Math.max(0, now.getTime() - shippedAtMs);

  const isDelivered = order.status === 'delivered' || totalElapsedMs >= TRACKING_WINDOW_DURATIONS_MS.TOTAL_UNTIL_DELIVERED;

  const w1Completed = isDelivered || totalElapsedMs >= 5 * 60 * 1000;
  const w2Completed = isDelivered || totalElapsedMs >= 40 * 60 * 1000;
  const w3Completed = isDelivered || totalElapsedMs >= 45 * 60 * 1000;
  const w4Completed = isDelivered || totalElapsedMs >= 60 * 60 * 1000;

  let activeWindow = 1;
  if (w4Completed) {
    activeWindow = 4;
  } else if (w3Completed) {
    activeWindow = 4;
  } else if (w2Completed) {
    activeWindow = 3;
  } else if (w1Completed) {
    activeWindow = 2;
  } else {
    activeWindow = 1;
  }

  const t1 = new Date(shippedAtMs);
  const t2 = new Date(shippedAtMs + 5 * 60 * 1000);
  const t3 = new Date(shippedAtMs + 40 * 60 * 1000);
  const t4 = new Date(shippedAtMs + 45 * 60 * 1000);
  const tDelivered = new Date(shippedAtMs + 60 * 60 * 1000);

  const courierSteps: CourierLogisticsStep[] = [
    {
      stepNumber: 1,
      label: 'Entregador pegou na filial',
      location: 'Filial de Origem (São Paulo / SP)',
      timestamp: formatDateTime(t1),
      completed: w1Completed,
      active: activeWindow === 1 && !w1Completed,
    },
    {
      stepNumber: 2,
      label: 'Entregador está indo para o centro de distribuição da sua cidade',
      location: 'Em Trânsito para Centro de Distribuição',
      timestamp: w1Completed ? formatDateTime(t2) : 'Aguardando',
      completed: w2Completed,
      active: activeWindow === 2 && !w2Completed,
    },
    {
      stepNumber: 3,
      label: 'Produto entregue no centro de distribuição',
      location: `Centro de Distribuição (${destinationCityState})`,
      timestamp: w2Completed ? formatDateTime(t3) : 'Aguardando',
      completed: w3Completed,
      active: activeWindow === 3 && !w3Completed,
    },
    {
      stepNumber: 4,
      label: 'Entregador está indo ao seu endereço',
      location: `Unidade de Entrega (${destinationCityState})`,
      timestamp: w3Completed
        ? isDelivered || w4Completed
          ? `Concluído em ${formatDateTime(tDelivered)}`
          : `Saiu em ${formatDateTime(t4)}`
        : 'Aguardando',
      completed: w4Completed,
      active: activeWindow === 4 && !w4Completed,
    },
  ];

  let currentStatusLabel = 'Entregador pegou na filial (São Paulo / SP)';
  if (isDelivered || w4Completed) {
    currentStatusLabel = 'Objeto entregue ao destinatário';
  } else if (w3Completed) {
    currentStatusLabel = 'Entregador está indo ao seu endereço';
  } else if (w2Completed) {
    currentStatusLabel = `Produto entregue no Centro de Distribuição (${destinationCityState})`;
  } else if (w1Completed) {
    currentStatusLabel = 'Entregador a caminho do Centro de Distribuição';
  }

  const estimatedDate = new Date(shippedAtMs + 24 * 60 * 60 * 1000); 
  const estimatedDelivery = isDelivered
    ? `Entregue em ${formatDateTime(tDelivered)}`
    : `Previsão: ${estimatedDate.toLocaleDateString('pt-BR')}`;

  return {
    trackingCode,
    orderNumber,
    destinationCityState,
    currentStatusLabel,
    estimatedDelivery,
    isDelivered,
    courierSteps,
  };
};

export const getSanitizedTrackingInfoAsync = async (
  query: string,
  userIdOrNow?: string | Date,
  maybeNow?: Date
): Promise<SanitizedTrackingInfo | null> => {
  return Promise.resolve(getSanitizedTrackingInfo(query, userIdOrNow, maybeNow));
};

export const trackingService = {
  findOrderForTracking,
  getSanitizedTrackingInfo,
  getSanitizedTrackingInfoAsync,
  validateAndSynchronizeOrderDelivery,
};
