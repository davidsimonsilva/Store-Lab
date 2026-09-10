import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { MOCK_PRODUCTS } from '../mocks/products';
import { loadCartFromStorage, saveCartToStorage, mergeGuestCartToUser, clearCartStorage } from '../services/cartService';
import {
  checkProductQuota,
  sanitizeCartItemsWithQuota,
  MAX_PRODUCT_PURCHASE_LIMIT,
} from '../services/productQuotaService';
import { BUSINESS_CONSTANTS, STORAGE_KEYS } from '../constants';
import { couponService } from '../services/couponService';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

export interface CartShippingOption {
  id: string;
  name: string;
  price: number;
  days: number;
  cep: string;
}

interface CartContextType {
  cartItems: CartItem[];
  couponCode: string;
  discountApplied: boolean;
  couponError: string | null;
  subtotal: number;
  shipping: number;
  shippingOption: CartShippingOption | null;
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
  setShippingOption: (option: CartShippingOption | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, anonymousUserId } = useAuth();
  const { showToast } = useToast();
  const currentUserId = user?.isLoggedIn ? user.id : anonymousUserId;

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    return loadCartFromStorage(STORAGE_KEYS.CART);
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [shippingOption, setShippingOption] = useState<CartShippingOption | null>(null);

  useEffect(() => {
    saveCartToStorage(cartItems, STORAGE_KEYS.CART);
  }, [cartItems]);

  const activeCartItems = cartItems.filter(item => item.userId === currentUserId || !item.userId);

  useEffect(() => {
    if (activeCartItems.length === 0 && shippingOption !== null) {
      setShippingOption(null);
    }
  }, [activeCartItems.length, shippingOption]);

  const subtotal = activeCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping =
    activeCartItems.length === 0 || !shippingOption
      ? 0
      : shippingOption.price;
  const discount = discountApplied ? subtotal * 0.1 : 0;
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
    const existingItem = cartItems.find(
      item => (item.productId === targetId || item.product?.id === targetId || item.product?.productID === targetId || String(item.productId) === String(targetId)) && 
              (item.userId === currentUserId || !item.userId)
    );
    const currentInCart = existingItem ? existingItem.quantity : 0;

    const quota = checkProductQuota(user?.isLoggedIn ? user.id : undefined, targetId, currentInCart);

    if (quantity > quota.remainingAllowance) {
      return;
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        item => (item.productId === targetId || item.product?.id === targetId || item.product?.productID === targetId || String(item.productId) === String(targetId)) && 
                (item.userId === currentUserId || !item.userId)
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

    const quota = checkProductQuota(user?.isLoggedIn ? user.id : undefined, productId, 0);
    if (quantity > quota.remainingAllowance) {
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
    setCartItems((prev) =>
      prev.filter((item) => item.userId !== currentUserId && !!item.userId)
    );
    setDiscountApplied(false);
    setCouponCode('');
    setCouponError(null);
    setShippingOption(null);
    clearCartStorage(STORAGE_KEYS.CART);
  };

  const clearAllCart = () => {
    setCartItems([]);
    setDiscountApplied(false);
    setCouponCode('');
    setCouponError(null);
    setShippingOption(null);
    clearCartStorage(STORAGE_KEYS.CART);
  };

  const applyCoupon = (code: string): boolean => {
    setCouponError(null);
    const result = couponService.validateCouponSync(code, subtotal);
    if (result.isValid) {
      setCouponCode(result.code);
      setDiscountApplied(true);
      return true;
    } else {
      setCouponError(result.error || 'Cupom inválido');
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
    if (user?.isLoggedIn && user?.id) {
      const targetUserId = user.id;

      setCartItems((prevItems) => {
        const needsMigration = prevItems.some((item) => item.userId !== targetUserId);
        if (!needsMigration) return prevItems;

        const mergedMap = new Map<string, CartItem>();
        prevItems.forEach((item) => {
          const key = String(item.productId || item.product?.id || item.product?.productID || item.id);
          if (mergedMap.has(key)) {
            const existing = mergedMap.get(key)!;
            mergedMap.set(key, {
              ...existing,
              userId: targetUserId,
              quantity: existing.quantity + item.quantity,
            });
          } else {
            mergedMap.set(key, {
              ...item,
              userId: targetUserId,
            });
          }
        });

        const mergedItems = Array.from(mergedMap.values());
        const { sanitizedItems, hadAdjustments, adjustedDetails } = sanitizeCartItemsWithQuota(targetUserId, mergedItems);

        if (hadAdjustments && adjustedDetails.length > 0) {
          const itemsList = adjustedDetails.map((d) => `"${d.productName}"`).join(', ');
          showToast(
            `Ajustamos a quantidade de ${itemsList} na sua sacola para respeitar o limite máximo de ${MAX_PRODUCT_PURCHASE_LIMIT} unidades por cliente com entregas em andamento.`,
            'warning',
            6000
          );
        }

        return sanitizedItems;
      });
    }
  }, [user?.id, user?.isLoggedIn, showToast]);

  return (
    <CartContext.Provider
      value={{
        cartItems: activeCartItems,
        couponCode,
        discountApplied,
        couponError,
        subtotal,
        shipping,
        shippingOption,
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
        setCouponCode,
        setShippingOption,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const defaultCartContext: CartContextType = {
  cartItems: [],
  couponCode: '',
  discountApplied: false,
  couponError: null,
  subtotal: 0,
  shipping: 0,
  shippingOption: null,
  discount: 0,
  total: 0,
  addToCart: () => {},
  updateCartQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  clearAllCart: () => {},
  applyCoupon: () => false,
  removeCoupon: () => {},
  clearCouponError: () => {},
  setCouponCode: () => {},
  setShippingOption: () => {},
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    console.warn('useCart was called outside of a CartProvider. Returning default fallback context.');
    return defaultCartContext;
  }
  return context;
};
