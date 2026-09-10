export interface Product {
  id: string;
  productID: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating?: number;
  featured?: boolean;
}

export interface Review {
  id: string;
  userId?: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
  edited?: boolean;
}

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  recipientName: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  referencePoint?: string;
  isDefault: boolean;
}

export interface SavedCard {
  id: string;
  userId: string;
  holderName: string;
  lastFourDigits: string;
  brand: 'visa' | 'mastercard' | 'elo' | 'amex' | 'hipercard' | 'discover' | 'unknown';
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus = 'pending' | 'paid' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderTimelineStep {
  status: OrderStatus;
  label: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  createdAt: string;
  items: OrderItem[];
  totalAmount: number;
  shippingCost: number;
  couponDiscount?: number;
  discountAmount: number;
  interestAmount?: number;
  finalAmount: number;
  status: OrderStatus;
  paymentMethod: 'credit_card' | 'pix' | 'boleto';
  paymentDetails?: {
    brand?: string;
    lastFourDigits?: string;
    installments?: number;
    pixCode?: string;
    boletoBarcode?: string;
  };
  deliveryAddress: Address;
  shippingOption?: {
    id: string;
    name: string;
    price: number;
    days: number;
  };
  shippingMethod?: string;
  trackingCode?: string;
  shippedAt?: string;
  courierDeliveredAt?: string;
  timeline: OrderTimelineStep[];
  stepEnteredAt?: string;
}

export interface CourierLogisticsStep {
  stepNumber: number;
  label: string;
  location: string;
  timestamp: string;
  completed: boolean;
  active: boolean;
}

export interface SanitizedTrackingInfo {
  trackingCode: string;
  orderNumber: string;
  destinationCityState: string;
  currentStatusLabel: string;
  estimatedDelivery: string;
  isDelivered: boolean;
  courierSteps: CourierLogisticsStep[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  cpf?: string;
  phone?: string;
  avatarId?: string;
  avatarUrl?: string;
  cep?: string;
  card?: string;
  pix?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export interface RegisteredUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  passwordHash?: string;
  cpf?: string;
  cep?: string;
  avatarId?: string;
  avatarUrl?: string;
  phone?: string;
  createdAt?: string;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string | number;
  product: Product;
  quantity: number;
}

export interface CheckoutPayload {
  items: CartItem[];
  totalPrice: number;
  timestamp: string;
  userId?: string;
}
