import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { useCheckoutAddress } from './useCheckoutAddress';
import { useCheckoutPayment } from './useCheckoutPayment';
import { useCheckoutSubmit } from './useCheckoutSubmit';

export function useCheckoutState() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    cartItems,
    subtotal,
    shipping,
    shippingOption,
    discount,
    total,
    couponCode,
    discountApplied,
    couponError,
    applyCoupon,
    removeCoupon,
    clearCouponError,
    clearCart,
  } = useCart();

  const {
    addresses,
    selectedAddress,
    setSelectedAddress,
    loadAddresses,
  } = useCheckoutAddress(user?.id);

  const {
    savedCards,
    paymentMethod,
    setPaymentMethod,
    cardData,
    setCardData,
    loadSavedCards,
  } = useCheckoutPayment(user?.id, user?.name);

  const loadUserData = useCallback(() => {
    loadAddresses();
    loadSavedCards();
  }, [loadAddresses, loadSavedCards]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const {
    isProcessing,
    submitAttempted,
    setSubmitAttempted,
    paymentError,
    setPaymentError,
    completedOrder,
    isPixModalOpen,
    setIsPixModalOpen,
    isBoletoModalOpen,
    setIsBoletoModalOpen,
    getValidationError,
    handleFinalizeOrder,
    handleConfirmPixPayment,
    handleConfirmBoletoPayment,
  } = useCheckoutSubmit({
    user,
    selectedAddress,
    shippingOption,
    shipping,
    subtotal,
    discount,
    cartItems,
    paymentMethod,
    cardData,
    savedCards,
    clearCart,
  });

  return {
    user,
    navigate,
    cartItems,
    subtotal,
    shipping,
    discount,
    total,
    couponCode,
    discountApplied,
    couponError,
    applyCoupon,
    removeCoupon,
    clearCouponError,
    addresses,
    selectedAddress,
    setSelectedAddress,
    loadUserData,
    savedCards,
    paymentMethod,
    setPaymentMethod,
    cardData,
    setCardData,
    isProcessing,
    submitAttempted,
    setSubmitAttempted,
    paymentError,
    setPaymentError,
    completedOrder,
    isPixModalOpen,
    setIsPixModalOpen,
    isBoletoModalOpen,
    setIsBoletoModalOpen,
    getValidationError,
    handleFinalizeOrder,
    handleConfirmPixPayment,
    handleConfirmBoletoPayment,
  };
}
