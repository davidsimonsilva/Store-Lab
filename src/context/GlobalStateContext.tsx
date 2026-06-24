import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product, CartItem, ActiveView, GlobalState, User } from '../types';
import { MOCK_PRODUCTS } from '../mock/products';

export function formatUrlName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

interface GlobalStateContextType {
  activeView: ActiveView;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cart: CartItem[];
  addToCart: (productOrId: Product | string | number, quantity?: number) => void;
  updateCartQuantity: (productId: string | number, quantity: number) => void;
  removeFromCart: (productId: string | number) => void;
  clearCart: () => void;
  user: User | null;
  anonymousUserId: string;
  loginUser: (name: string, email: string, redirectPath?: string) => void;
  logoutUser: () => void;
  isHeaderVisible: () => boolean;
  isSearchVisible: () => boolean;
  selectedProductId: string | number | null;
  setSelectedProductId: (id: string | number | null) => void;
  productID: string | number | null;
  setProductID: (id: string | number | null) => void;
  productId: string | number | null;
  setProductId: (id: string | number | null) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

function generateSecureAnonId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'anon-';
  const lengthNeeded = 30 - result.length;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(lengthNeeded);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < lengthNeeded; i++) {
      result += chars[array[i] % chars.length];
    }
  } else {
    for (let i = 0; i < lengthNeeded; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }
  return result;
}

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [selectedProductId, setSelectedProductId] = useState<string | number | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('store_lab_selected_product_id');
      } catch (err) {
        console.error("Error reading localStorage product id", err);
      }
    }
    return null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('store_lab_cart');
        return saved ? JSON.parse(saved) : [];
      } catch (err) {
        console.error("Error reading localStorage cart", err);
      }
    }
    return [];
  });

  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('store_lab_user');
        return saved ? JSON.parse(saved) : null;
      } catch (err) {
        console.error("Error reading localStorage user", err);
      }
    }
    return null;
  });

  const [anonymousUserId, setAnonymousUserId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        let anonId = localStorage.getItem('store_lab_anon_user_id');
        if (!anonId) {
          anonId = generateSecureAnonId();
          localStorage.setItem('store_lab_anon_user_id', anonId);
        }
        return anonId;
      } catch (err) {
        console.error("Error reading localStorage anon user id", err);
      }
    }
    return '';
  });

  const activeView = (() => {
    const path = location.pathname;
    if (path === '/' || path === '') return 'home';
    if (path.startsWith('/carrinho')) return 'cart';
    if (path.startsWith('/perfil')) return 'profile';
    if (path.startsWith('/produto')) return 'product-detail';
    if (path === '/login') return 'login';
    if (path === '/cadastro' || path === '/register') return 'register';
    return 'home';
  })();

  const productID = selectedProductId;
  const productId = selectedProductId;
  const setProductID = setSelectedProductId;
  const setProductId = setSelectedProductId;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        let anonId = localStorage.getItem('store_lab_anon_user_id');
        if (!anonId) {
          anonId = generateSecureAnonId();
          localStorage.setItem('store_lab_anon_user_id', anonId);
          setAnonymousUserId(anonId);
        }
      } catch (err) {
        console.error("Error reading localStorage", err);
      }
    }
  }, []);

  const viewsWithoutHeader: ActiveView[] = ['login', 'register'];
  const viewsWithoutSearch: ActiveView[] = ['cart', 'profile', 'login', 'register', 'product-detail'];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedProductId !== null) {
        localStorage.setItem('store_lab_selected_product_id', String(selectedProductId));
      } else {
        localStorage.removeItem('store_lab_selected_product_id');
      }
    }
  }, [selectedProductId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('store_lab_cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('store_lab_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('store_lab_user');
      }
    }
  }, [user]);

  const addToCart = (productOrId: Product | string | number, quantity = 1) => {
    let resolvedProduct: Product;
    if (typeof productOrId === 'string' || typeof productOrId === 'number') {
      const found = MOCK_PRODUCTS.find((p) => p.productID === productOrId || p.id === productOrId);
      if (!found) {
        console.error(`Product with ID ${productOrId} not found to add to cart`);
        return;
      }
      resolvedProduct = found;
    } else {
      resolvedProduct = productOrId;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => 
          item.product.productID === resolvedProduct.productID || 
          item.product.id === resolvedProduct.id
      );
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity,
        };
        return newCart;
      }

      const currentUserId = user?.isLoggedIn ? user.id : anonymousUserId;
      const newCartItem: CartItem = {
        id: `cart-item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        userId: currentUserId,
        productId: resolvedProduct.productID || resolvedProduct.id,
        product: resolvedProduct,
        quantity,
      };
      return [...prevCart, newCartItem];
    });
  };

  const updateCartQuantity = (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.productID === productId || item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string | number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.productID !== productId && item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const loginUser = (name: string, email: string, redirectPath?: string) => {
    const userId = `usr-${btoa(email.toLowerCase()).replace(/=/g, '')}`;
    
    let storedCpf = '';
    let storedCep = '';
    let storedCard = '';
    let storedPix = '';
    let storedName = name;
    
    try {
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const matched = registered.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (matched) {
        storedCpf = matched.cpf || '';
        storedCep = matched.cep || '';
        storedCard = matched.card || '';
        storedPix = matched.pix || '';
        storedName = matched.name || name;
      }
    } catch (e) {
      console.error("Error reading stored users", e);
    }

    const loggedInUser: User = {
      id: userId,
      name: storedName,
      email: email,
      isLoggedIn: true,
      cpf: storedCpf,
      cep: storedCep,
      card: storedCard,
      pix: storedPix
    };
    setUser(loggedInUser);

    setCart((prevCart) =>
      prevCart.map((item) => ({
        ...item,
        userId: userId
      }))
    );

    navigate(redirectPath || '/');
  };

  const logoutUser = () => {
    setUser(null);
    navigate('/login');
  };

  const isHeaderVisible = () => {
    return !viewsWithoutHeader.includes(activeView);
  };

  const isSearchVisible = () => {
    return !viewsWithoutSearch.includes(activeView) && activeView === 'home';
  };

  return (
    <GlobalStateContext.Provider
      value={{
        activeView,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        user,
        anonymousUserId,
        loginUser,
        logoutUser,
        isHeaderVisible,
        isSearchVisible,
        selectedProductId,
        setSelectedProductId,
        productID,
        setProductID,
        productId,
        setProductId,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
