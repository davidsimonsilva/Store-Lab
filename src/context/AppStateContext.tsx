import React, { createContext, useContext } from 'react';
import { Product, CartItem, ActiveView, User } from '../types';
import { AuthProvider, useAuth } from './AuthContext';
import { CartProvider, useCart } from './CartContext';
import { CheckoutProvider, useCheckout } from './CheckoutContext';
import { UIStateProvider, useUIState, formatUrlName } from './UIStateContext';

export { formatUrlName };

interface AppStateContextType {
  activeView: ActiveView;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
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

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

const AppStateInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  const cartCtx = useCart();
  const uiCtx = useUIState();

  const value: AppStateContextType = {
    activeView: 'home',
    searchQuery: uiCtx.searchQuery,
    setSearchQuery: uiCtx.setSearchQuery,
    selectedCategory: uiCtx.selectedCategory,
    setSelectedCategory: uiCtx.setSelectedCategory,
    cart: cartCtx.cartItems,
    addToCart: cartCtx.addToCart,
    updateCartQuantity: cartCtx.updateCartQuantity,
    removeFromCart: cartCtx.removeFromCart,
    clearCart: cartCtx.clearCart,
    user: auth.user,
    anonymousUserId: auth.anonymousUserId,
    loginUser: (name: string, email: string) => {
      auth.loginUser(name, email);
    },
    logoutUser: auth.logoutUser,
    isHeaderVisible: () => true,
    isSearchVisible: () => true,
    selectedProductId: uiCtx.selectedProductId,
    setSelectedProductId: uiCtx.setSelectedProductId,
    productID: uiCtx.selectedProductId,
    setProductID: uiCtx.setSelectedProductId,
    productId: uiCtx.selectedProductId,
    setProductId: uiCtx.setSelectedProductId,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>
        <CheckoutProvider>
          <UIStateProvider>
            <AppStateInner>
              {children}
            </AppStateInner>
          </UIStateProvider>
        </CheckoutProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export const useAppState = (): AppStateContextType => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

// Aliases for backward compatibility during transition

/**
 * @deprecated Use o componente `AppStateProvider` em seu lugar. Este alias foi descontinuado e será removido no futuro.
 */
export const GlobalStateProvider = AppStateProvider;

/**
 * @deprecated Use o hook `useAppState` em seu lugar. Este alias foi descontinuado e será removido no futuro.
 */
export const useGlobalState = useAppState;

