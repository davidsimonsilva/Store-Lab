import {
  calculateStepCompletionProbability,
  getMaxDurationForStep,
  processOrderTimelineStep,
  simulateOrdersProgression,
  STEP_DURATIONS_MS,
} from '../../services/orderTimelineService';
import { orderService } from '../../services/orderService';
import { Order } from '../../types';

describe('orderTimelineService - Simulação e Transição Probabilística de Pedidos', () => {
  const userId = 'usr_timeline_test';

  beforeEach(() => {
    localStorage.clear();
  });

  describe('Durações Máximas das Etapas', () => {
    test('retorna 3 minutos para Pix no Step 2', () => {
      expect(getMaxDurationForStep(1, 'pix')).toBe(3 * 60 * 1000);
    });

    test('retorna 20 minutos para Cartão no Step 2', () => {
      expect(getMaxDurationForStep(1, 'credit_card')).toBe(20 * 60 * 1000);
    });

    test('retorna 60 minutos para Boleto no Step 2', () => {
      expect(getMaxDurationForStep(1, 'boleto')).toBe(60 * 60 * 1000);
    });

    test('retorna 30 minutos para Step 3 (Separação)', () => {
      expect(getMaxDurationForStep(2, 'credit_card')).toBe(30 * 60 * 1000);
      expect(getMaxDurationForStep(2, 'pix')).toBe(30 * 60 * 1000);
    });

    test('retorna 60 minutos para Step 4 (Em Transporte)', () => {
      expect(getMaxDurationForStep(3, 'credit_card')).toBe(60 * 60 * 1000);
    });
  });

  describe('Cálculo de Probabilidade Matemática', () => {
    const maxDuration = 20 * 60 * 1000; 

    test('inicia em ~0.1% para 0 minutos decorridos', () => {
      const prob = calculateStepCompletionProbability(0, maxDuration);
      expect(prob).toBeCloseTo(0.001, 3);
    });

    test('atinge no máximo 8% (0.08) para 75% do tempo decorrido', () => {
      const elapsed75 = maxDuration * 0.75;
      const prob = calculateStepCompletionProbability(elapsed75, maxDuration);
      expect(prob).toBeCloseTo(0.08, 3);
      expect(prob).toBeLessThanOrEqual(0.081);
    });

    test('atinge 100% (1.0) para 100% ou mais do tempo decorrido', () => {
      const prob100 = calculateStepCompletionProbability(maxDuration, maxDuration);
      expect(prob100).toBe(1.0);

      const probOver = calculateStepCompletionProbability(maxDuration + 10000, maxDuration);
      expect(probOver).toBe(1.0);
    });
  });

  describe('Processamento Individual e Transições de Status', () => {
    const createMockOrder = (method: 'credit_card' | 'pix' | 'boleto'): Order => ({
      id: 'ord_mock_1',
      orderNumber: 'ORDER-#12345',
      userId,
      createdAt: new Date().toISOString(),
      status: 'pending',
      paymentMethod: method,
      items: [],
      totalAmount: 100,
      shippingCost: 10,
      discountAmount: 0,
      finalAmount: 110,
      deliveryAddress: {
        id: 'addr_1',
        userId,
        label: 'Casa',
        recipientName: 'Teste',
        cep: '01001-000',
        street: 'Rua Teste',
        number: '123',
        neighborhood: 'Bairro',
        city: 'Cidade',
        state: 'SP',
        isDefault: true,
      },
      timeline: [
        { status: 'pending', label: 'Pedido Realizado', timestamp: '01/01/2026 10:00', completed: true },
        { status: 'paid', label: 'Confirmação do Pagamento', timestamp: 'Aguardando Pagamento', completed: false },
        { status: 'preparing', label: 'Em Separação e Embalagem', timestamp: 'Aguardando Aprovação', completed: false },
        { status: 'shipped', label: 'Em Transporte', timestamp: 'Código gerado no despacho', completed: false },
        { status: 'delivered', label: 'Entrega Concluída', timestamp: 'Previsão em até 5 dias úteis', completed: false },
      ],
      stepEnteredAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(), 
    });

    test('avança o Step 2 para completo após atingir o tempo máximo e define status "paid"', () => {
      const order = createMockOrder('credit_card');
      const { order: updatedOrder, updated } = processOrderTimelineStep(order, new Date());

      expect(updated).toBe(true);
      expect(updatedOrder.timeline[1].completed).toBe(true);
      expect(updatedOrder.status).toBe('paid');
    });

    test('quando entra no Step 4 (Em Transporte), atualiza a mensagem do Step 5 para "Previsão de entrega em 1 dia útil"', () => {
      const order = createMockOrder('credit_card');

      order.timeline[1].completed = true;
      order.status = 'paid';
      order.stepEnteredAt = new Date(Date.now() - 35 * 60 * 1000).toISOString();

      const { order: updatedOrder, updated } = processOrderTimelineStep(order, new Date());

      expect(updated).toBe(true);
      expect(updatedOrder.timeline[2].completed).toBe(true);
      expect(updatedOrder.status).toBe('shipped');

      expect(updatedOrder.timeline[4].timestamp).toBe('Previsão de entrega em 1 dia útil');
      expect(updatedOrder.timeline[4].completed).toBe(false);
    });

    test('avança para entregue (Step 5) e para imediatamente futuras simulações', () => {
      const order = createMockOrder('credit_card');

      order.timeline[1].completed = true;
      order.timeline[2].completed = true;
      order.timeline[3].completed = false;
      order.status = 'shipped';
      order.stepEnteredAt = new Date(Date.now() - 65 * 60 * 1000).toISOString();

      const { order: deliveredOrder, updated } = processOrderTimelineStep(order, new Date());

      expect(updated).toBe(true);
      expect(deliveredOrder.status).toBe('delivered');
      expect(deliveredOrder.timeline[3].completed).toBe(true);
      expect(deliveredOrder.timeline[4].completed).toBe(true);
      expect(deliveredOrder.timeline[4].label).toBe('Entrega Concluída');

      const { updated: reUpdated } = processOrderTimelineStep(deliveredOrder, new Date());
      expect(reUpdated).toBe(false);
    });

    test('executa simulação em lote de forma individual sem interferência entre pedidos', () => {
      const order1 = createMockOrder('pix');
      order1.id = 'ord_pix_1';

      order1.stepEnteredAt = new Date(Date.now() - 5 * 60 * 1000).toISOString();

      const order2 = createMockOrder('credit_card');
      order2.id = 'ord_card_2';

      order2.stepEnteredAt = new Date().toISOString();

      orderService.saveAllUserOrders(userId, [order1, order2]);

      jest.spyOn(Math, 'random').mockReturnValue(0.99);

      const result = simulateOrdersProgression(userId);

      expect(result.hasUpdates).toBe(true);
      const updatedPix = result.orders.find((o) => o.id === 'ord_pix_1');
      const updatedCard = result.orders.find((o) => o.id === 'ord_card_2');

      expect(updatedPix?.timeline[1].completed).toBe(true);
      expect(updatedPix?.status).toBe('paid');

      expect(updatedCard?.timeline[1].completed).toBe(false);
      expect(updatedCard?.status).toBe('pending');

      jest.restoreAllMocks();
    });
  });
});
