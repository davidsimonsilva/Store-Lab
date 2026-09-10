import { Order, OrderStatus } from '../types';
import { getStorageItem, setStorageItem } from './storageService';
import { STORAGE_KEYS, BUSINESS_CONSTANTS } from '../constants';
import { calculateOrderTotals } from '../utils/pricing';

const getOrdersStorageKey = (userId: string): string => {
  const safeId = userId || 'guest';
  return `${STORAGE_KEYS.USER_ORDERS_PREFIX}${safeId}`;
};

export const generateOrderCode = (): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const getSegment = (len: number) => {
    let result = '';
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  return `ORD#${getSegment(4)}-${getSegment(4)}-${getSegment(4)}-${getSegment(4)}`;
};

const generateSeedOrders = (userId: string): Order[] => {
  return [
    {
      id: `ord_${userId}_101`,
      orderNumber: 'ORD#8429-K19F-72PL-3801',
      userId,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), 
      status: 'shipped',
      paymentMethod: 'credit_card',
      paymentDetails: {
        brand: 'mastercard',
        lastFourDigits: '4242',
        installments: 3,
      },
      items: [
        {
          id: 'item_1',
          productId: '1',
          name: 'Fone de Ouvido Bluetooth Noise Cancelling',
          price: 349.9,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80',
        },
        {
          id: 'item_2',
          productId: '2',
          name: 'Mouse Gamer Ergonômico RGB',
          price: 189.0,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&q=80',
        },
      ],
      totalAmount: 538.9,
      shippingCost: 19.9,
      discountAmount: 53.89,
      finalAmount: 504.91,
      trackingCode: 'SL982348102BR',
      shippedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(), 
      deliveryAddress: {
        id: 'addr_demo',
        userId,
        label: 'Residencial',
        recipientName: 'Usuário StoreLab',
        cep: '01310-100',
        street: 'Avenida Paulista',
        number: '1000',
        complement: 'Apto 42',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        isDefault: true,
      },
      timeline: [
        {
          status: 'pending',
          label: 'Pedido Realizado',
          timestamp: '26/08/2026 14:20',
          completed: true,
        },
        {
          status: 'paid',
          label: 'Pagamento Aprovado',
          timestamp: '26/08/2026 14:21',
          completed: true,
        },
        {
          status: 'preparing',
          label: 'Em Separação e Embalagem',
          timestamp: '27/08/2026 09:15',
          completed: true,
        },
        {
          status: 'shipped',
          label: 'Em Transporte (Código: SL98234BR)',
          timestamp: '28/08/2026 11:30',
          completed: true,
        },
        {
          status: 'delivered',
          label: 'Entrega Concluída',
          timestamp: 'Previsão: 31/08/2026',
          completed: false,
        },
      ],
    },
    {
      id: `ord_${userId}_102`,
      orderNumber: 'ORD#7105-X98P-42MA-9014',
      userId,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(), 
      status: 'delivered',
      paymentMethod: 'pix',
      items: [
        {
          id: 'item_3',
          productId: '3',
          name: 'Teclado Mecânico Compacto Wireless',
          price: 499.0,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&q=80',
        },
      ],
      totalAmount: 499.0,
      shippingCost: 0,
      discountAmount: 49.9,
      finalAmount: 449.1,
      deliveryAddress: {
        id: 'addr_demo',
        userId,
        label: 'Residencial',
        recipientName: 'Usuário StoreLab',
        cep: '01310-100',
        street: 'Avenida Paulista',
        number: '1000',
        complement: 'Apto 42',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        isDefault: true,
      },
      timeline: [
        {
          status: 'pending',
          label: 'Pedido Realizado',
          timestamp: '11/08/2026 10:10',
          completed: true,
        },
        {
          status: 'paid',
          label: 'Pagamento Confirmado (Pix)',
          timestamp: '11/08/2026 10:11',
          completed: true,
        },
        {
          status: 'preparing',
          label: 'Separado no Estoque',
          timestamp: '11/08/2026 15:40',
          completed: true,
        },
        {
          status: 'shipped',
          label: 'Enviado por Transportadora',
          timestamp: '12/08/2026 08:20',
          completed: true,
        },
        {
          status: 'delivered',
          label: 'Entregue com Sucesso',
          timestamp: '14/08/2026 16:50',
          completed: true,
        },
      ],
    },
  ];
};

export const normalizeOrder = (order: Order): Order => {
  if (!order) return order;

  const method = order.paymentMethod || 'credit_card';
  const instCount = order.paymentDetails?.installments || 1;

  let couponDiscount = order.couponDiscount;
  if (couponDiscount === undefined) {
    if (method !== 'pix') {
      couponDiscount = order.discountAmount || 0;
    } else {
      const totalDisc = order.discountAmount || 0;
      const expectedPurePixDisc = Number(
        (order.totalAmount * (BUSINESS_CONSTANTS.PIX_DISCOUNT_PERCENTAGE / 100)).toFixed(2)
      );

      if (Math.abs(totalDisc - expectedPurePixDisc) < 0.05) {
        couponDiscount = 0;
      } else {
        const pixRate = BUSINESS_CONSTANTS.PIX_DISCOUNT_PERCENTAGE / 100;
        const derived = (totalDisc - pixRate * order.totalAmount) / (1 - pixRate);
        couponDiscount = derived > 0 ? Number(derived.toFixed(2)) : 0;
      }
    }
  }

  const totals = calculateOrderTotals({
    subtotal: order.totalAmount,
    shipping: order.shippingCost || 0,
    couponDiscount,
    paymentMethod: method,
    installments: instCount,
  });

  return {
    ...order,
    couponDiscount,
    discountAmount: totals.totalDiscount,
    interestAmount: totals.interestAmount,
    finalAmount: totals.finalAmount,
  };
};

export const getUserOrders = (userId: string): Order[] => {
  const key = getOrdersStorageKey(userId);
  const orders = getStorageItem<Order[]>(key, []);
  if (!orders || !Array.isArray(orders)) return [];
  return orders.map(normalizeOrder);
};

export const saveAllUserOrders = (userId: string, orders: Order[]): void => {
  const key = getOrdersStorageKey(userId);
  setStorageItem(key, orders);
};

export const saveUserOrder = (userId: string, order: Order): void => {
  const currentOrders = getUserOrders(userId);
  const updatedOrders = [order, ...currentOrders];
  saveAllUserOrders(userId, updatedOrders);
};

export interface CreateOrderPayload {
  userId: string;
  items: Order['items'];
  totalAmount: number;
  shippingCost: number;
  couponDiscount?: number;
  discountAmount: number;
  finalAmount: number;
  deliveryAddress: Order['deliveryAddress'];
  paymentMethod: Order['paymentMethod'];
  paymentDetails?: Order['paymentDetails'];
  notes?: string;
  status?: OrderStatus;
  timeline?: Order['timeline'];
}

export const createOrder = (payload: CreateOrderPayload): Order => {
  const now = new Date();
  const formattedNow = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const defaultTimeline = payload.timeline || [
    {
      status: 'pending',
      label: 'Pedido Realizado',
      timestamp: formattedNow,
      completed: true,
    },
    {
      status: 'paid',
      label:
        payload.paymentMethod === 'pix'
          ? 'Confirmação do Pagamento (Pix)'
          : payload.paymentMethod === 'boleto'
          ? 'Confirmação do Pagamento (Boleto)'
          : 'Confirmação do Pagamento',
      timestamp: 'Aguardando Pagamento',
      completed: false,
    },
    {
      status: 'preparing',
      label: 'Em Separação e Embalagem',
      timestamp: 'Aguardando Aprovação',
      completed: false,
    },
    {
      status: 'shipped',
      label: 'Em Transporte',
      timestamp: 'Código gerado no despacho',
      completed: false,
    },
    {
      status: 'delivered',
      label: 'Entrega Concluída',
      timestamp: 'Previsão em até 5 dias úteis',
      completed: false,
    },
  ];

  const newOrder: Order = {
    id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    orderNumber: generateOrderCode(),
    userId: payload.userId,
    createdAt: now.toISOString(),
    status: payload.status || 'pending',
    paymentMethod: payload.paymentMethod,
    paymentDetails: payload.paymentDetails,
    items: payload.items,
    totalAmount: payload.totalAmount,
    shippingCost: payload.shippingCost,
    couponDiscount: payload.couponDiscount,
    discountAmount: payload.discountAmount,
    finalAmount: payload.finalAmount,
    deliveryAddress: payload.deliveryAddress,
    timeline: defaultTimeline,
    stepEnteredAt: now.toISOString(),
  };

  saveUserOrder(payload.userId, newOrder);
  return newOrder;
};

export const getOrderById = (userId: string, orderId: string): Order | null => {
  const orders = getUserOrders(userId);
  return orders.find((o) => o.id === orderId) || null;
};

export const findOrderByCodeOrId = (query: string, currentUserId?: string): Order | null => {
  if (!query || !query.trim()) return null;
  const cleanQuery = query.trim().toUpperCase().replace(/\s+/g, '');

  const matchesOrder = (o: Order): boolean => {
    if (!o) return false;
    const cleanOrderNumber = o.orderNumber ? o.orderNumber.toUpperCase().replace(/\s+/g, '') : '';
    const cleanId = o.id ? o.id.toUpperCase().replace(/\s+/g, '') : '';
    const cleanTracking = o.trackingCode ? o.trackingCode.toUpperCase().replace(/\s+/g, '') : '';

    return (
      cleanOrderNumber === cleanQuery ||
      cleanId === cleanQuery ||
      cleanTracking === cleanQuery ||
      (cleanOrderNumber.length > 0 && cleanOrderNumber.includes(cleanQuery)) ||
      (cleanTracking.length > 0 && cleanTracking.includes(cleanQuery)) ||
      (cleanQuery.length >= 4 && cleanId.includes(cleanQuery))
    );
  };

  if (currentUserId) {
    const userOrders = getUserOrders(currentUserId);
    const found = userOrders.find(matchesOrder);
    if (found) return found;
  }

  const guestOrders = getUserOrders('guest');
  const foundGuest = guestOrders.find(matchesOrder);
  if (foundGuest) return foundGuest;

  const demoOrders = generateSeedOrders('demo');
  const foundDemo = demoOrders.find(matchesOrder);
  if (foundDemo) return foundDemo;

  return null;
};

export const updateOrderStatus = (userId: string, orderId: string, status: OrderStatus): Order | null => {
  const key = getOrdersStorageKey(userId);
  const orders = getUserOrders(userId);
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;

  orders[index] = { ...orders[index], status };
  setStorageItem(key, orders);
  return orders[index];
};

export interface PagedOrdersResult {
  orders: Order[];
  total: number;
  hasMore: boolean;
  page: number;
  pageSize: number;
}

export const getUserOrdersAsync = async (userId: string): Promise<Order[]> => {
  return Promise.resolve(getUserOrders(userId));
};

export const getUserOrdersPagedAsync = async (
  userId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<PagedOrdersResult> => {
  const all = getUserOrders(userId);
  const total = all.length;
  const targetEnd = page * pageSize;
  const paginated = all.slice(0, targetEnd);
  const hasMore = targetEnd < total;

  return Promise.resolve({
    orders: paginated,
    total,
    hasMore,
    page,
    pageSize,
  });
};

export const createOrderAsync = async (payload: CreateOrderPayload): Promise<Order> => {
  return Promise.resolve(createOrder(payload));
};

export const getOrderByIdAsync = async (userId: string, orderId: string): Promise<Order | null> => {
  return Promise.resolve(getOrderById(userId, orderId));
};

export const orderService = {
  getUserOrders,
  getUserOrdersAsync,
  getUserOrdersPagedAsync,
  getOrdersByUserId: getUserOrders,
  getOrdersByUserIdAsync: getUserOrdersAsync,
  saveUserOrder,
  saveAllUserOrders,
  createOrder,
  createOrderAsync,
  getOrderById,
  getOrderByIdAsync,
  findOrderByCodeOrId,
  updateOrderStatus,
};
