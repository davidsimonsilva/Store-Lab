import { Order, OrderStatus, CartItem } from '../types';
import { getUserOrders } from './orderService';

export const MAX_PRODUCT_PURCHASE_LIMIT = 3;

export const TERMS_OF_SERVICE_LIMIT_MESSAGE =
  'Prezado cliente, por termos de serviço limitamos a compra de até 3 unidades do mesmo produto enquanto houver pedidos a caminho de sua residência.';

export const CART_SYNC_ADJUSTED_MESSAGE =
  'Bem-vindo! Ajustamos as quantidades no seu carrinho para respeitar o limite de 3 unidades com suas entregas em andamento.';

export const TOOLTIP_MAX_LIMIT_MESSAGE = 'Limite máximo de 3 unidades por produto atingido.';

export const ACTIVE_DELIVERY_STATUSES: readonly OrderStatus[] = [
  'pending',
  'paid',
  'preparing',
  'shipped',
] as const;

export type ActiveDeliveryStatus = typeof ACTIVE_DELIVERY_STATUSES[number];

export interface ProductDeliveryReference {
  orderId: string;
  orderNumber: string;
  statusEntrega: OrderStatus;
  quantity: number;
}

export interface DeliveryItemRecord {
  productId: string | number;
  productName: string;
  quantity: number;
  unitPrice: number;
  image?: string;
}

export interface ActiveDeliveryOrder {
  orderId: string;
  orderNumber: string;
  createdAt: string;
  statusEntrega: ActiveDeliveryStatus;
  shippingMethod?: string;
  trackingCode?: string;
  items: DeliveryItemRecord[];
}

export interface UserActiveDeliveriesReport {
  userId: string;
  generatedAt: string;
  totalActiveOrders: number;
  orders: ActiveDeliveryOrder[];
}

export interface ProductQuotaStatus {
  productId: string | number;
  maxAllowed: number;
  inDeliveryCount: number;
  inCartCount: number;
  currentTotal: number;
  remainingAllowance: number;
  canAddToCart: boolean;
  activeDeliveries: ProductDeliveryReference[];
}

export const getUserActiveDeliveriesReport = (userId: string): UserActiveDeliveriesReport => {
  if (!userId) {
    return {
      userId: '',
      generatedAt: new Date().toISOString(),
      totalActiveOrders: 0,
      orders: [],
    };
  }

  const userOrders = getUserOrders(userId);
  const activeOrders: ActiveDeliveryOrder[] = userOrders
    .filter((order) => (ACTIVE_DELIVERY_STATUSES as readonly string[]).includes(order.status))
    .map((order) => ({
      orderId: order.id,
      orderNumber: order.orderNumber,
      createdAt: order.createdAt,
      statusEntrega: order.status as ActiveDeliveryStatus,
      shippingMethod: order.shippingMethod,
      trackingCode: order.trackingCode,
      items: (order.items || []).map((item) => ({
        productId: String(item.productId),
        productName: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        image: item.image,
      })),
    }));

  return {
    userId,
    generatedAt: new Date().toISOString(),
    totalActiveOrders: activeOrders.length,
    orders: activeOrders,
  };
};

export const getProductInDeliveryCount = (
  userId: string,
  productId: string | number
): { inDeliveryCount: number; activeDeliveries: ProductDeliveryReference[] } => {
  if (!userId) {
    return { inDeliveryCount: 0, activeDeliveries: [] };
  }

  const report = getUserActiveDeliveriesReport(userId);
  const targetIdStr = String(productId);
  let inDeliveryCount = 0;
  const activeDeliveries: ProductDeliveryReference[] = [];

  for (const order of report.orders) {
    for (const item of order.items) {
      if (String(item.productId) === targetIdStr) {
        inDeliveryCount += item.quantity;
        activeDeliveries.push({
          orderId: order.orderId,
          orderNumber: order.orderNumber,
          statusEntrega: order.statusEntrega,
          quantity: item.quantity,
        });
      }
    }
  }

  return { inDeliveryCount, activeDeliveries };
};

export const checkProductQuota = (
  userId: string | undefined | null,
  productId: string | number,
  inCartCount: number = 0
): ProductQuotaStatus => {
  const targetId = String(productId);
  const { inDeliveryCount, activeDeliveries } = userId
    ? getProductInDeliveryCount(userId, targetId)
    : { inDeliveryCount: 0, activeDeliveries: [] };

  const currentTotal = inDeliveryCount + inCartCount;
  const remainingAllowance = Math.max(0, MAX_PRODUCT_PURCHASE_LIMIT - currentTotal);

  return {
    productId: targetId,
    maxAllowed: MAX_PRODUCT_PURCHASE_LIMIT,
    inDeliveryCount,
    inCartCount,
    currentTotal,
    remainingAllowance,
    canAddToCart: remainingAllowance > 0,
    activeDeliveries,
  };
};

export interface QuotaAdjustmentDetail {
  productId: string | number;
  productName: string;
  originalQuantity: number;
  adjustedQuantity: number;
  inDeliveryCount: number;
}

export const sanitizeCartItemsWithQuota = (
  userId: string,
  items: CartItem[]
): {
  sanitizedItems: CartItem[];
  hadAdjustments: boolean;
  adjustedDetails: QuotaAdjustmentDetail[];
} => {
  let hadAdjustments = false;
  const adjustedDetails: QuotaAdjustmentDetail[] = [];
  const report = getUserActiveDeliveriesReport(userId);

  const inDeliveryMap = new Map<string, number>();
  for (const order of report.orders) {
    for (const item of order.items) {
      const pid = String(item.productId);
      inDeliveryMap.set(pid, (inDeliveryMap.get(pid) || 0) + item.quantity);
    }
  }

  const sanitizedItems: CartItem[] = [];

  for (const item of items) {
    const pid = String(item.productId || item.product.id);
    const inDelivery = inDeliveryMap.get(pid) || 0;
    const maxPermitted = Math.max(0, MAX_PRODUCT_PURCHASE_LIMIT - inDelivery);

    if (item.quantity > maxPermitted) {
      hadAdjustments = true;
      adjustedDetails.push({
        productId: pid,
        productName: item.product?.name || `Produto ${pid}`,
        originalQuantity: item.quantity,
        adjustedQuantity: maxPermitted,
        inDeliveryCount: inDelivery,
      });
      if (maxPermitted > 0) {
        sanitizedItems.push({
          ...item,
          quantity: maxPermitted,
        });
      }
    } else {
      sanitizedItems.push(item);
    }
  }

  return { sanitizedItems, hadAdjustments, adjustedDetails };
};

export const validateCheckoutItemsIntegrity = (
  userId: string,
  items: Array<{ productId: string | number; quantity: number }>
): { valid: boolean; violationMessage?: string } => {
  if (!userId) {
    return { valid: true };
  }

  for (const item of items) {
    const pid = String(item.productId);
    const { inDeliveryCount } = getProductInDeliveryCount(userId, pid);
    const totalCirculation = inDeliveryCount + item.quantity;

    if (totalCirculation > MAX_PRODUCT_PURCHASE_LIMIT) {
      return {
        valid: false,
        violationMessage: `Violação de termos de serviço: o produto ID ${pid} excederia o limite máximo de ${MAX_PRODUCT_PURCHASE_LIMIT} unidades em circulação (em transporte: ${inDeliveryCount}, solicitado: ${item.quantity}).`,
      };
    }
  }

  return { valid: true };
};
