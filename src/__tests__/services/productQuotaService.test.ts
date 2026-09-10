import {
  checkProductQuota,
  getUserActiveDeliveriesReport,
  sanitizeCartItemsWithQuota,
  validateCheckoutItemsIntegrity,
  MAX_PRODUCT_PURCHASE_LIMIT,
  TERMS_OF_SERVICE_LIMIT_MESSAGE,
  ACTIVE_DELIVERY_STATUSES,
} from '../../services/productQuotaService';
import { orderService } from '../../services/orderService';
import { Order, CartItem } from '../../types';

describe('productQuotaService (Contrato de Risco e Cota de Produtos)', () => {
  const userId = 'user_test_quota_123';

  beforeEach(() => {
    localStorage.clear();
  });

  it('deve permitir até 3 unidades quando o usuário não possui entregas em andamento', () => {
    const quota = checkProductQuota(userId, 'prod_1', 1);
    expect(quota.maxAllowed).toBe(3);
    expect(quota.inDeliveryCount).toBe(0);
    expect(quota.inCartCount).toBe(1);
    expect(quota.currentTotal).toBe(1);
    expect(quota.remainingAllowance).toBe(2);
    expect(quota.canAddToCart).toBe(true);
  });

  it('deve aninhar múltiplos pedidos contendo o mesmo produto e somar as quantidades em trânsito', () => {
    const mockOrders: Order[] = [
      {
        id: 'ord_1',
        orderNumber: 'ORD#0001',
        userId,
        createdAt: new Date().toISOString(),
        status: 'shipped', 
        paymentMethod: 'pix',
        totalAmount: 100,
        shippingCost: 0,
        discountAmount: 0,
        finalAmount: 100,
        deliveryAddress: {} as any,
        timeline: [],
        items: [
          {
            id: 'item_1',
            productId: 'prod_99',
            name: 'Produto Teste',
            price: 50,
            quantity: 1,
            image: '',
          },
        ],
      },
      {
        id: 'ord_2',
        orderNumber: 'ORD#0002',
        userId,
        createdAt: new Date().toISOString(),
        status: 'preparing', 
        paymentMethod: 'credit_card',
        totalAmount: 50,
        shippingCost: 0,
        discountAmount: 0,
        finalAmount: 50,
        deliveryAddress: {} as any,
        timeline: [],
        items: [
          {
            id: 'item_2',
            productId: 'prod_99',
            name: 'Produto Teste',
            price: 50,
            quantity: 1,
            image: '',
          },
        ],
      },
    ];

    orderService.saveAllUserOrders(userId, mockOrders);

    const report = getUserActiveDeliveriesReport(userId);
    expect(report.totalActiveOrders).toBe(2);
    expect(report.orders).toHaveLength(2);
    expect(report.orders[0].items[0].quantity).toBe(1);

    const quota = checkProductQuota(userId, 'prod_99', 0);
    expect(quota.inDeliveryCount).toBe(2);
    expect(quota.remainingAllowance).toBe(1); 
    expect(quota.canAddToCart).toBe(true);
  });

  it('deve desconsiderar pedidos finalizados com delivered ou cancelled liberando a cota imediatamente', () => {
    const mockOrders: Order[] = [
      {
        id: 'ord_delivered',
        orderNumber: 'ORD#DELIV',
        userId,
        createdAt: new Date().toISOString(),
        status: 'delivered', 
        paymentMethod: 'pix',
        totalAmount: 150,
        shippingCost: 0,
        discountAmount: 0,
        finalAmount: 150,
        deliveryAddress: {} as any,
        timeline: [],
        items: [
          {
            id: 'item_deliv',
            productId: 'prod_free',
            name: 'Produto Entregue',
            price: 50,
            quantity: 3, 
            image: '',
          },
        ],
      },
      {
        id: 'ord_cancelled',
        orderNumber: 'ORD#CANCEL',
        userId,
        createdAt: new Date().toISOString(),
        status: 'cancelled', 
        paymentMethod: 'credit_card',
        totalAmount: 100,
        shippingCost: 0,
        discountAmount: 0,
        finalAmount: 100,
        deliveryAddress: {} as any,
        timeline: [],
        items: [
          {
            id: 'item_canc',
            productId: 'prod_free',
            name: 'Produto Cancelado',
            price: 50,
            quantity: 2,
            image: '',
          },
        ],
      },
    ];

    orderService.saveAllUserOrders(userId, mockOrders);

    const quota = checkProductQuota(userId, 'prod_free', 0);
    expect(quota.inDeliveryCount).toBe(0);
    expect(quota.remainingAllowance).toBe(3);
    expect(quota.canAddToCart).toBe(true);
  });

  it('deve sanitizar o carrinho do visitante ao mesclar com a conta logada, podando o excedente', () => {

    const mockOrders: Order[] = [
      {
        id: 'ord_transito',
        orderNumber: 'ORD#TRANS',
        userId,
        createdAt: new Date().toISOString(),
        status: 'shipped',
        paymentMethod: 'pix',
        totalAmount: 100,
        shippingCost: 0,
        discountAmount: 0,
        finalAmount: 100,
        deliveryAddress: {} as any,
        timeline: [],
        items: [
          {
            id: 'item_trans',
            productId: 'prod_sanit',
            name: 'Produto em Trânsito',
            price: 50,
            quantity: 2,
            image: '',
          },
        ],
      },
    ];
    orderService.saveAllUserOrders(userId, mockOrders);

    const guestItems: CartItem[] = [
      {
        id: 'cart_item_1',
        userId: 'guest_1',
        productId: 'prod_sanit',
        quantity: 3,
        product: { id: 'prod_sanit', name: 'Produto', price: 50, category: 'Geral', image: '' } as any,
      },
    ];

    const { sanitizedItems, hadAdjustments } = sanitizeCartItemsWithQuota(userId, guestItems);

    expect(hadAdjustments).toBe(true);
    expect(sanitizedItems).toHaveLength(1);

    expect(sanitizedItems[0].quantity).toBe(1);
  });

  it('deve barrar a integridade do checkout se o payload for adulterado além de 3 unidades', () => {

    const mockOrders: Order[] = [
      {
        id: 'ord_active',
        orderNumber: 'ORD#ACT',
        userId,
        createdAt: new Date().toISOString(),
        status: 'paid',
        paymentMethod: 'pix',
        totalAmount: 50,
        shippingCost: 0,
        discountAmount: 0,
        finalAmount: 50,
        deliveryAddress: {} as any,
        timeline: [],
        items: [
          {
            id: 'item_act',
            productId: 'prod_tamper',
            name: 'Produto Tamper',
            price: 50,
            quantity: 1,
            image: '',
          },
        ],
      },
    ];
    orderService.saveAllUserOrders(userId, mockOrders);

    const tamperingItems = [{ productId: 'prod_tamper', quantity: 3 }];
    const validation = validateCheckoutItemsIntegrity(userId, tamperingItems);

    expect(validation.valid).toBe(false);
    expect(validation.violationMessage).toContain('Violação de termos de serviço');
  });
});
