import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider } from '../../context/AuthContext';
import { CartProvider } from '../../context/CartContext';
import { CheckoutProvider, useCheckout } from '../../context/CheckoutContext';

describe('CheckoutContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>
      <CartProvider>
        <CheckoutProvider>{children}</CheckoutProvider>
      </CartProvider>
    </AuthProvider>
  );

  test('default payment method is pix', () => {
    const { result } = renderHook(() => useCheckout(), { wrapper });
    expect(result.current.paymentMethod).toBe('pix');
    expect(result.current.checkoutComplete).toBe(false);
  });

  test('allows changing payment method', () => {
    const { result } = renderHook(() => useCheckout(), { wrapper });
    act(() => {
      result.current.setPaymentMethod('credit_card');
    });
    expect(result.current.paymentMethod).toBe('credit_card');
  });

  test('submits order and updates state', async () => {
    const { result } = renderHook(() => useCheckout(), { wrapper });

    let payload = null;
    await act(async () => {
      payload = await result.current.submitOrder();
    });

    expect(payload).not.toBeNull();
    expect(result.current.checkoutComplete).toBe(true);

    act(() => {
      result.current.resetCheckout();
    });
    expect(result.current.checkoutComplete).toBe(false);
  });
});
