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
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
}

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  cpf?: string;
  cep?: string;
  card?: string;
  pix?: string;
  cardExpiry?: string;
  cardCvv?: string;
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

export type ActiveView = 'home' | 'cart' | 'profile' | 'login' | 'register' | 'product-detail';

export interface GlobalState {
  activeView: ActiveView;
  searchQuery: string;
  cart: CartItem[];
  user: User | null;
  viewsWithoutHeader: ActiveView[];
  viewsWithoutSearch: ActiveView[];
}
