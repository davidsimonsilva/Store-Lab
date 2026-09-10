import { Order, OrderTimelineStep, OrderStatus } from '../types';
import { getUserOrders, saveAllUserOrders } from './orderService';
import { validateAndSynchronizeOrderDelivery } from './trackingService';

export const STEP_DURATIONS_MS = {

  PAID_PIX: 3 * 60 * 1000, 
  PAID_CARD: 20 * 60 * 1000, 
  PAID_BOLETO: 60 * 60 * 1000, 

  PREPARING: 30 * 60 * 1000, 

  SHIPPED: 60 * 60 * 1000, 
} as const;

export const generateTrackingCode = (): string => {
  const digits = Math.floor(100000000 + Math.random() * 900000000).toString();
  return `SL${digits}BR`;
};

export const getMaxDurationForStep = (
  stepIndex: number,
  paymentMethod: Order['paymentMethod']
): number => {
  switch (stepIndex) {
    case 1:
      if (paymentMethod === 'pix') return STEP_DURATIONS_MS.PAID_PIX;
      if (paymentMethod === 'credit_card') return STEP_DURATIONS_MS.PAID_CARD;
      return STEP_DURATIONS_MS.PAID_BOLETO;
    case 2:
      return STEP_DURATIONS_MS.PREPARING;
    case 3:
      return STEP_DURATIONS_MS.SHIPPED;
    default:
      return 0;
  }
};

export const calculateStepCompletionProbability = (
  elapsedMs: number,
  maxDurationMs: number
): number => {
  if (maxDurationMs <= 0) return 1.0;
  if (elapsedMs >= maxDurationMs) return 1.0;
  if (elapsedMs <= 0) return 0.001;

  const ratio = Math.min(1, Math.max(0, elapsedMs / maxDurationMs));

  let probability: number;
  if (ratio <= 0.75) {
    const normalized = ratio / 0.75;
    probability = 0.001 + (0.08 - 0.001) * Math.pow(normalized, 1.5);
  } else {
    const normalizedUpper = (ratio - 0.75) / 0.25;
    probability = 0.08 + (1.0 - 0.08) * Math.pow(normalizedUpper, 2);
  }

  return Math.min(1.0, Math.max(0.001, probability));
};

const formatStepDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const processOrderTimelineStep = (
  order: Order,
  now: Date = new Date()
): { order: Order; updated: boolean } => {
  if (order.status === 'delivered' || order.status === 'cancelled') {
    return { order, updated: false };
  }

  const timeline = [...order.timeline];
  if (!timeline || timeline.length === 0) {
    return { order, updated: false };
  }

  const activeStepIndex = timeline.findIndex((step) => !step.completed);

  if (activeStepIndex === -1) {
    return {
      order: { ...order, status: 'delivered' },
      updated: true,
    };
  }

  if (activeStepIndex === 0) {
    timeline[0] = {
      ...timeline[0],
      completed: true,
      timestamp: timeline[0].timestamp || formatStepDate(now),
    };
    return {
      order: {
        ...order,
        timeline,
        stepEnteredAt: now.toISOString(),
      },
      updated: true,
    };
  }

  let stepStartTimeMs: number;
  if (order.stepEnteredAt) {
    const parsed = new Date(order.stepEnteredAt).getTime();
    stepStartTimeMs = isNaN(parsed) ? new Date(order.createdAt).getTime() : parsed;
  } else {
    stepStartTimeMs = new Date(order.createdAt).getTime();
  }

  if (isNaN(stepStartTimeMs)) {
    stepStartTimeMs = now.getTime();
  }

  const elapsedMs = Math.max(0, now.getTime() - stepStartTimeMs);
  const maxDurationMs = getMaxDurationForStep(activeStepIndex, order.paymentMethod);

  let hasTimelineMessageUpdate = false;
  if (activeStepIndex === 3 && timeline.length >= 5) {
    if (timeline[4].timestamp !== 'Previsão de entrega em 1 dia útil') {
      timeline[4] = {
        ...timeline[4],
        timestamp: 'Previsão de entrega em 1 dia útil',
      };
      hasTimelineMessageUpdate = true;
    }
  }

  const probability = calculateStepCompletionProbability(elapsedMs, maxDurationMs);
  const shouldAdvance = elapsedMs >= maxDurationMs || Math.random() < probability;

  if (!shouldAdvance) {
    if (hasTimelineMessageUpdate) {
      return {
        order: { ...order, timeline },
        updated: true,
      };
    }
    return { order, updated: false };
  }

  const formattedTime = formatStepDate(now);
  const updatedTimeline: OrderTimelineStep[] = [...timeline];
  let nextStatus: OrderStatus = order.status;

  let trackingCode = order.trackingCode;

  if (activeStepIndex === 1) {
    updatedTimeline[1] = {
      ...updatedTimeline[1],
      completed: true,
      label:
        order.paymentMethod === 'pix'
          ? 'Pagamento Confirmado (Pix)'
          : order.paymentMethod === 'boleto'
          ? 'Pagamento Confirmado (Boleto)'
          : 'Pagamento Aprovado',
      timestamp: formattedTime,
    };
    nextStatus = 'paid';
  } else if (activeStepIndex === 2) {
    if (!trackingCode) {
      trackingCode = generateTrackingCode();
    }

    updatedTimeline[2] = {
      ...updatedTimeline[2],
      completed: true,
      label: 'Em Separação e Embalagem',
      timestamp: formattedTime,
    };

    updatedTimeline[3] = {
      ...updatedTimeline[3],
      label: `Em Transporte (${trackingCode})`,
      timestamp: `Enviado em ${formattedTime}`,
    };

    nextStatus = 'shipped';

    if (updatedTimeline.length >= 5) {
      updatedTimeline[4] = {
        ...updatedTimeline[4],
        timestamp: 'Previsão de entrega em 1 dia útil',
      };
    }

    const shippedOrder: Order = {
      ...order,
      status: nextStatus,
      trackingCode,
      shippedAt: order.shippedAt || now.toISOString(),
      timeline: updatedTimeline,
      stepEnteredAt: now.toISOString(),
    };

    return { order: shippedOrder, updated: true };
  } else if (activeStepIndex === 3) {
    const syncedOrder = validateAndSynchronizeOrderDelivery(order, now);
    if (syncedOrder.status !== order.status) {
      return { order: syncedOrder, updated: true };
    }
    return { order, updated: false };
  } else if (activeStepIndex === 4) {
    updatedTimeline[4] = {
      ...updatedTimeline[4],
      completed: true,
      label: 'Entrega Concluída',
      timestamp: `Entregue em ${formattedTime}`,
    };
    nextStatus = 'delivered';
  }

  const updatedOrder: Order = {
    ...order,
    status: nextStatus,
    trackingCode,
    timeline: updatedTimeline,
    stepEnteredAt: now.toISOString(),
  };

  return { order: updatedOrder, updated: true };
};

export const simulateOrdersProgression = (
  userId: string,
  now: Date = new Date()
): { orders: Order[]; hasUpdates: boolean } => {
  if (!userId) return { orders: [], hasUpdates: false };

  const currentOrders = getUserOrders(userId);
  if (!currentOrders || currentOrders.length === 0) {
    return { orders: [], hasUpdates: false };
  }

  let hasAnyChange = false;
  const updatedOrders = currentOrders.map((order) => {
    if (order.status === 'delivered' || order.status === 'cancelled') {
      return order;
    }

    const { order: newOrder, updated } = processOrderTimelineStep(order, now);
    if (updated) {
      hasAnyChange = true;
      return newOrder;
    }
    return order;
  });

  if (hasAnyChange) {
    saveAllUserOrders(userId, updatedOrders);
  }

  return { orders: updatedOrders, hasUpdates: hasAnyChange };
};

export const generateOrderTimeline = (order: Order): OrderTimelineStep[] => {
  const now = new Date(order.createdAt || new Date());
  const formattedNow = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const isPaid = order.status === 'paid' || order.status === 'preparing' || order.status === 'shipped' || order.status === 'delivered';
  const isPreparing = order.status === 'preparing' || order.status === 'shipped' || order.status === 'delivered';
  const isShipped = order.status === 'shipped' || order.status === 'delivered';
  const isDelivered = order.status === 'delivered';

  return [
    {
      status: 'pending',
      label: 'Pedido Realizado',
      timestamp: formattedNow,
      completed: true,
    },
    {
      status: 'paid',
      label:
        order.paymentMethod === 'pix'
          ? 'Confirmação do Pagamento (Pix)'
          : order.paymentMethod === 'boleto'
          ? 'Confirmação do Pagamento (Boleto)'
          : 'Confirmação do Pagamento',
      timestamp: isPaid ? formattedNow : 'Aguardando Pagamento',
      completed: isPaid,
    },
    {
      status: 'preparing',
      label: 'Em Separação e Embalagem',
      timestamp: isPreparing ? formattedNow : 'Aguardando Aprovação',
      completed: isPreparing,
    },
    {
      status: 'shipped',
      label: order.trackingCode ? `Em Transporte (${order.trackingCode})` : 'Em Transporte',
      timestamp: isShipped ? `Enviado em ${formattedNow}` : 'Código gerado no despacho',
      completed: isShipped,
    },
    {
      status: 'delivered',
      label: 'Entrega Concluída',
      timestamp: isDelivered ? `Entregue em ${formattedNow}` : 'Previsão em até 5 dias úteis',
      completed: isDelivered,
    },
  ];
};

