import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../context/CartContext';
import { AuthProvider } from '../../context/AuthContext';

describe('CartContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );

  test('initial cart is empty or loaded from storage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(Array.isArray(result.current.cartItems)).toBe(true);
  });

  test('addToCart adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const dummyProduct = {
      id: 'prod-1',
      productID: 'prod-1',
      name: 'Teclado Mecânico Pro',
      price: 350.00,
      category: 'Eletrônicos',
      image: ''
    };
    act(() => {
      result.current.addToCart(dummyProduct, 1);
    });
    const found = result.current.cartItems.find((i) => i.productId === 'prod-1' || i.product.id === 'prod-1');
    expect(found).toBeDefined();
    expect(found?.quantity).toBe(1);
  });
});
