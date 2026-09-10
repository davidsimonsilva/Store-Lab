import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProfileOrderCard } from '../../pages/Profile/Orders/components/ProfileOrderCard';
import { Order } from '../../types';

describe('ProfileOrderCard - Card de Pedido no Perfil', () => {
  const mockOrder: Order = {
    id: 'ORD-98765432',
    orderNumber: 'ORD-98765432',
    userId: 'usr_test_1',
    createdAt: '2026-09-01T12:00:00Z',
    status: 'shipped',
    paymentMethod: 'credit_card',
    totalAmount: 350,
    shippingCost: 15,
    discountAmount: 0,
    finalAmount: 365,
    trackingCode: 'BR123456789BR',
    items: [
      {
        id: 'item_1',
        productId: '1',
        name: 'Teclado Gamer Mecânico',
        price: 350,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1',
      },
    ],
    deliveryAddress: {
      id: 'addr_1',
      userId: 'usr_test_1',
      label: 'Casa',
      recipientName: 'Carlos Oliveira',
      street: 'Av. Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      cep: '01310-100',
      isDefault: true,
    },
  };

  test('renderiza o cabeçalho, número do pedido, badge de status e itens', () => {
    render(
      <ProfileOrderCard
        order={mockOrder}
        orderSequence={1}
        isExpanded={true}
        onToggleExpand={jest.fn()}
        isMobile={false}
      />
    );

    expect(screen.getByText(/ORD-98765432/i)).toBeInTheDocument();
    expect(screen.getAllByText(/em transporte/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/teclado gamer mecânico/i)).toBeInTheDocument();
    expect(screen.getByText(/BR123456789BR/i)).toBeInTheDocument();
  });
});

