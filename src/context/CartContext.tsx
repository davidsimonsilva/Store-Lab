import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { MOCK_PRODUCTS } from '../mocks/products';
import { loadCartFromStorage, saveCartToStorage, mergeGuestCartToUser } from '../services/cartService';
import { useAuth } from './AuthContext';

interface CartContextType {
  cartItems: CartItem[];
  couponCode: string;
  discountApplied: boolean;
  couponError: string | null;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  addToCart: (productOrId: Product | string | number, quantity?: number) => void;
  updateCartQuantity: (productId: string | number, quantity: number) => void;
  removeFromCart: (productId: string | number) => void;
  clearCart: () => void;
  clearAllCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCouponError: () => void;
  setCouponCode: (code: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, anonymousUserId } = useAuth();
  const currentUserId = user?.isLoggedIn ? user.id : anonymousUserId;

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    return loadCartFromStorage('lab_cart');
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string | null>(null);

  useEffect(() => {
    saveCartToStorage(cartItems, 'lab_cart');
  }, [cartItems]);

  const activeCartItems = cartItems.filter(item => item.userId === currentUserId || !item.userId);

  const subtotal = activeCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 1500 ? 0 : (activeCartItems.length > 0 ? 39.90 : 0);
  const discount = discountApplied ? subtotal * 0.10 : 0;
  const total = subtotal + shipping - discount;

  const addToCart = (productOrId: Product | string | number, quantity: number = 1) => {
    let targetProduct: Product | undefined;
    if (typeof productOrId === 'object') {
      targetProduct = productOrId;
    } else {
      targetProduct = MOCK_PRODUCTS.find(p => p.id === productOrId || p.productID === productOrId);
    }

    if (!targetProduct) return;

    const targetId = targetProduct.productID || targetProduct.id;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        item => (item.productId === targetId || item.product.id === targetId) && item.userId === currentUserId
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: `cart_${Date.now()}_${Math.random()}`,
          userId: currentUserId,
          productId: targetId,
          product: targetProduct,
          quantity
        };
        return [...prev, newItem];
      }
    });
  };

  const updateCartQuantity = (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (
          (item.productId === productId || item.product.id === productId) &&
          (item.userId === currentUserId || !item.userId)
        ) {
          return { ...item, quantity, userId: currentUserId };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string | number) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            (item.productId === productId || item.product.id === productId) &&
            (item.userId === currentUserId || !item.userId)
          )
      )
    );
  };

  const clearCart = () => {
    // Clear items belonging to the current user OR items without a userId (guest/legacy cached items)
    setCartItems((prev) =>
      prev.filter((item) => item.userId !== currentUserId && !!item.userId)
    );
    setDiscountApplied(false);
    setCouponCode('');
    setCouponError(null);
  };

  const clearAllCart = () => {
    // Force reset the entire state to empty
    setCartItems([]);
    setDiscountApplied(false);
    setCouponCode('');
    setCouponError(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lab_cart');
      localStorage.removeItem('store_lab_cart');
    }
  };

  const applyCoupon = (code: string): boolean => {
    setCouponError(null);
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'LAB10' || cleaned === 'STORELAB10') {
      setCouponCode(cleaned);
      setDiscountApplied(true);
      return true;
    } else {
      setCouponError('Cupom inválido. Tente usar o código LAB10.');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountApplied(false);
    setCouponError(null);
  };

  const clearCouponError = () => {
    setCouponError(null);
  };

  useEffect(() => {
    if (user?.isLoggedIn && anonymousUserId) {
      const guestItems = cartItems.filter(item => item.userId === anonymousUserId);
      if (guestItems.length > 0) {
        const userItems = cartItems.filter(item => item.userId === user.id);
        const merged = mergeGuestCartToUser(guestItems, userItems).map(item => ({
          ...item,
          userId: user.id
        }));
        const otherItems = cartItems.filter(item => item.userId !== anonymousUserId && item.userId !== user.id);
        setCartItems([...otherItems, ...merged]);
      }
    }
  }, [user, anonymousUserId]);

  return (
    <CartContext.Provider
      value={{
        cartItems: activeCartItems,
        couponCode,
        discountApplied,
        couponError,
        subtotal,
        shipping,
        discount,
        total,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        clearAllCart,
        applyCoupon,
        removeCoupon,
        clearCouponError,
        setCouponCode
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
