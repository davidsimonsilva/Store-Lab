import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../context/AuthContext';
import { CartProvider } from '../../context/CartContext';
import { CheckoutPage } from '../../pages/Checkout/CheckoutPage';

describe('CheckoutPage - Integração do Funil E2E', () => {
  beforeEach(() => {
    localStorage.clear();
    const mockUser = {
      id: 'usr_checkout_test_1',
      name: 'Carlos Oliveira',
      email: 'carlos@storelab.com',
      isLoggedIn: true,
      cpf: '529.982.247-25',
    };
    localStorage.setItem('user_session', JSON.stringify(mockUser));
    localStorage.setItem('lab_user_session', JSON.stringify(mockUser));

    const initialCart = [
      {
        id: 'cart_item_1',
        productId: '1',
        quantity: 1,
        product: {
          id: '1',
          name: 'Teclado Gamer Mecânico',
          price: 350.0,
          category: 'Periféricos',
          image: '',
          description: 'Teclado Gamer',
          stock: 10,
          rating: 4.8,
          reviewsCount: 15,
          brand: 'Logitech',
          tags: ['teclado'],
        },
      },
    ];
    localStorage.setItem('user_cart', JSON.stringify(initialCart));
    localStorage.setItem('lab_cart', JSON.stringify(initialCart));

    const defaultAddress = {
      id: 'addr_test_1',
      userId: 'usr_checkout_test_1',
      label: 'Casa',
      recipientName: 'Carlos Oliveira',
      street: 'Av. Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      cep: '01310-100',
      zipCode: '01310-100',
      isDefault: true,
    };
    localStorage.setItem(
      'user_addresses_usr_checkout_test_1',
      JSON.stringify([defaultAddress])
    );
    localStorage.setItem(
      'storelab_addresses_usr_checkout_test_1',
      JSON.stringify([defaultAddress])
    );

    const defaultCard = {
      id: 'card_test_1',
      userId: 'usr_checkout_test_1',
      holderName: 'CARLOS OLIVEIRA',
      lastFourDigits: '1234',
      brand: 'visa',
      expiryMonth: '12',
      expiryYear: '28',
      isDefault: true,
    };
    localStorage.setItem(
      'user_cards_usr_checkout_test_1',
      JSON.stringify([defaultCard])
    );
    localStorage.setItem(
      'storelab_cards_usr_checkout_test_1',
      JSON.stringify([defaultCard])
    );
  });

  const renderCheckout = () => {
    return render(
      <AuthProvider>
        <CartProvider>
          <CheckoutPage />
        </CartProvider>
      </AuthProvider>
    );
  };

  test('renderiza os passos de endereço, pagamento e resumo do pedido', async () => {
    renderCheckout();

    expect(await screen.findByText(/finalizar compra & checkout/i)).toBeInTheDocument();
    expect(screen.getAllByText(/endereço de entrega/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/forma de pagamento/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/resumo do pedido/i)[0]).toBeInTheDocument();
  });

  test('permite alternar entre as formas de pagamento (Cartão, Pix, Boleto)', async () => {
    renderCheckout();

    await screen.findByText(/finalizar compra & checkout/i);

    const pixOption = screen.getByText(/pix instantâneo/i);
    fireEvent.click(pixOption);
    expect(await screen.findByText(/pague com pix em segundos/i)).toBeInTheDocument();

    const boletoOption = screen.getByText(/boleto bancário/i);
    fireEvent.click(boletoOption);
    expect(await screen.findByText(/geraremos o código de barras digitável/i)).toBeInTheDocument();

    const cardOption = screen.getByText(/cartão de crédito/i);
    fireEvent.click(cardOption);
    expect(await screen.findByText(/escolha um cartão salvo/i)).toBeInTheDocument();
  });

  test('permite aplicar cupom LAB10 no resumo e recalcular o total', async () => {
    renderCheckout();

    await screen.findByText(/finalizar compra & checkout/i);

    const couponInput = screen.getByPlaceholderText(/ex:\s*lab10/i);
    const applyButton = screen.getByRole('button', { name: /aplicar/i });

    fireEvent.change(couponInput, { target: { value: 'LAB10' } });
    fireEvent.click(applyButton);

    expect(await screen.findByRole('button', { name: /remover/i })).toBeInTheDocument();
    expect(screen.getByText(/desconto \(lab10\):/i)).toBeInTheDocument();
  });

  test('executa o pagamento via Pix e exibe a tela de confirmação de pedido', async () => {
    renderCheckout();

    await screen.findByText(/finalizar compra & checkout/i);

    const pixOption = screen.getByText(/pix instantâneo/i);
    fireEvent.click(pixOption);

    const finalizeButton = screen.getByRole('button', { name: /pagar com pix/i });
    fireEvent.click(finalizeButton);

    const confirmPixButton = await screen.findByRole('button', { name: /confirmar pagamento/i });
    fireEvent.click(confirmPixButton);

    await waitFor(
      () => {
        expect(screen.getByText(/pedido realizado com sucesso!/i)).toBeInTheDocument();
      },
      { timeout: 4000 }
    );

    expect(screen.getByText(/código do pedido:/i)).toBeInTheDocument();
    expect(screen.getByText(/ORD#/i)).toBeInTheDocument();
  });
});
