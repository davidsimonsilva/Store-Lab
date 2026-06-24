export interface Product {
  id: string | number;
  productID: string | number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating?: number;
  featured?: boolean;
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
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string | number;
  product: Product;
  quantity: number;
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
