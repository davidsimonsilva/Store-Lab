import React, { createContext, useContext, useState } from 'react';
import { CheckoutPayload, CartItem } from '../types';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

interface CheckoutContextType {
  isCheckingOut: boolean;
  checkoutComplete: boolean;
  paymentMethod: 'credit_card' | 'pix' | 'boleto';
  setPaymentMethod: (method: 'credit_card' | 'pix' | 'boleto') => void;
  submitOrder: () => Promise<CheckoutPayload | null>;
  resetCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'pix' | 'boleto'>('pix');

  const submitOrder = async (): Promise<CheckoutPayload | null> => {
    setIsCheckingOut(true);
    
    // Simula processamento seguro
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const payload: CheckoutPayload = {
      items: cartItems,
      totalPrice: total,
      timestamp: new Date().toISOString(),
      userId: user?.id || 'anonymous'
    };

    setIsCheckingOut(false);
    setCheckoutComplete(true);
    clearCart();

    return payload;
  };

  const resetCheckout = () => {
    setIsCheckingOut(false);
    setCheckoutComplete(false);
  };

  return (
    <CheckoutContext.Provider
      value={{
        isCheckingOut,
        checkoutComplete,
        paymentMethod,
        setPaymentMethod,
        submitOrder,
        resetCheckout
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
