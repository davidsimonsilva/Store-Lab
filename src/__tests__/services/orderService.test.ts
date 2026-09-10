import { orderService, CreateOrderPayload } from '../../services/orderService';

describe('orderService - Gestão e Persistência de Pedidos', () => {
  const userId = 'usr_test_order_123';

  beforeEach(() => {
    localStorage.clear();
  });

  test('retorna lista inicial de pedidos para usuário (vazia para novos usuários)', () => {
    const orders = orderService.getOrdersByUserId(userId);
    expect(Array.isArray(orders)).toBe(true);
    expect(orders.length).toBe(0);
  });

  test('salva um novo pedido com código gerado seguro e persiste no histórico', () => {
    const payload: CreateOrderPayload = {
      userId,
      items: [
        {
          id: 'item_test_1',
          productId: 'prod_1',
          name: 'Teclado Mecânico',
          price: 250,
          quantity: 2,
          image: '',
        },
      ],
      totalAmount: 500,
      shippingCost: 0,
      discountAmount: 50,
      finalAmount: 450,
      deliveryAddress: {
        id: 'addr_1',
        userId,
        label: 'Casa',
        recipientName: 'Carlos Teste',
        cep: '01001-000',
        street: 'Praça da Sé',
        number: '1',
        neighborhood: 'Sé',
        city: 'São Paulo',
        state: 'SP',
      },
      paymentMethod: 'pix',
      notes: 'Entregar na portaria',
    };

    const newOrder = orderService.createOrder(payload);

    expect(newOrder.id).toBeDefined();
    expect(newOrder.orderNumber).toMatch(/^ORD#[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
    expect(newOrder.status).toBe('pending');
    expect(newOrder.finalAmount).toBe(450);
    expect(newOrder.paymentMethod).toBe('pix');

    const retrieved = orderService.getOrderById(userId, newOrder.id);
    expect(retrieved).not.toBeNull();
    expect(retrieved?.id).toBe(newOrder.id);
    expect(retrieved?.orderNumber).toBe(newOrder.orderNumber);

    const userOrders = orderService.getOrdersByUserId(userId);
    expect(userOrders[0].id).toBe(newOrder.id);
  });

  test('permite atualizar o status de um pedido', () => {
    const payload: CreateOrderPayload = {
      userId,
      items: [
        {
          id: 'item_1',
          productId: 'p1',
          name: 'Item 1',
          price: 100,
          quantity: 1,
        },
      ],
      totalAmount: 100,
      shippingCost: 19.9,
      discountAmount: 0,
      finalAmount: 119.9,
      deliveryAddress: {
        id: 'addr_1',
        userId,
        label: 'Casa',
        recipientName: 'Carlos',
        cep: '01001-000',
        street: 'Rua A',
        number: '10',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP',
      },
      paymentMethod: 'credit_card',
    };

    const order = orderService.createOrder(payload);
    const updated = orderService.updateOrderStatus(userId, order.id, 'shipped');

    expect(updated).not.toBeNull();
    expect(updated?.status).toBe('shipped');
  });
});
