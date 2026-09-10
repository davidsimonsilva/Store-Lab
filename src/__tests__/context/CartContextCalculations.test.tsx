import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../context/CartContext';
import { AuthProvider } from '../../context/AuthContext';
import { BUSINESS_CONSTANTS } from '../../constants';

describe('CartContext - Regras Financeiras e Constantes Unificadas', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );

  beforeEach(() => {
    localStorage.clear();
  });

  test('calcula frete fixo de R$ 19,90 quando o total é inferior a R$ 1500,00', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const cheapItem = {
      id: 'item_cheap_1',
      name: 'Mouse Gamer',
      price: 200.0,
      category: 'Periféricos',
      image: '',
    };

    act(() => {
      result.current.addToCart(cheapItem, 1);
      result.current.setShippingOption({
        id: 'padrao',
        name: 'Envio Padrão',
        price: BUSINESS_CONSTANTS.DEFAULT_SHIPPING_COST,
        days: 3,
        cep: '01310-100',
      });
    });

    expect(result.current.subtotal).toBe(200);
    expect(result.current.shipping).toBe(BUSINESS_CONSTANTS.DEFAULT_SHIPPING_COST);
    expect(result.current.total).toBe(200 + BUSINESS_CONSTANTS.DEFAULT_SHIPPING_COST);
  });

  test('aplica opção de frete selecionada via setShippingOption no cálculo do carrinho', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const expensiveItem = {
      id: 'item_expensive_1',
      name: 'Notebook Gamer Pro',
      price: 1600.0,
      category: 'Notebooks',
      image: '',
    };

    act(() => {
      result.current.addToCart(expensiveItem, 1);
    });

    expect(result.current.subtotal).toBe(1600);

    act(() => {
      result.current.setShippingOption({
        id: 'expresso',
        name: 'Envio Expresso',
        price: 24.90,
        days: 2,
        cep: '01311-200',
      });
    });

    expect(result.current.shipping).toBe(24.90);
    expect(result.current.total).toBe(1624.90);
  });

  test('aplica desconto de 10% com cupom LAB10 ou STORELAB10', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: 'item_test_cupom',
      name: 'Cadeira Gamer',
      price: 1000.0,
      category: 'Móveis',
      image: '',
    };

    act(() => {
      result.current.addToCart(item, 1);
      result.current.setShippingOption({
        id: 'padrao',
        name: 'Envio Padrão',
        price: BUSINESS_CONSTANTS.DEFAULT_SHIPPING_COST,
        days: 3,
        cep: '01310-100',
      });
    });

    let applied = false;
    act(() => {
      applied = result.current.applyCoupon('LAB10');
    });

    expect(applied).toBe(true);
    expect(result.current.couponCode).toBe('LAB10');
    expect(result.current.discountApplied).toBe(true);
    expect(result.current.discount).toBe(100); 

    expect(result.current.total).toBeCloseTo(919.9, 2);
  });

  test('rejeita cupons inválidos ou expirados', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    let applied = false;
    act(() => {
      applied = result.current.applyCoupon('INVALID_COUPON_999');
    });

    expect(applied).toBe(false);
    expect(result.current.discountApplied).toBe(false);
    expect(result.current.discount).toBe(0);
  });

  test('permite remover cupom previamente aplicado', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: 'item_test_cupom_remove',
      name: 'Monitor UltraWide',
      price: 2000.0,
      category: 'Monitores',
      image: '',
    };

    act(() => {
      result.current.addToCart(item, 1);
      result.current.applyCoupon('STORELAB10');
    });

    expect(result.current.discount).toBe(200);

    act(() => {
      result.current.removeCoupon();
    });

    expect(result.current.discountApplied).toBe(false);
    expect(result.current.discount).toBe(0);
    expect(result.current.total).toBe(2000);
  });
});
