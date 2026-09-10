import { simulateGatewayPayment } from '../../services/paymentSandboxService';

describe('paymentSandboxService - Gateway Sandbox Determinístico', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('rejeita imediatamente transação com cartão inválido perante Luhn', async () => {
    const invalidCard = {
      holderName: 'João Silva',
      cardNumber: '1234 5678 9012 3456', 
      expiryDate: '12/30',
      cvv: '123',
    };

    const promise = simulateGatewayPayment(invalidCard, 100);
    const response = await promise;

    expect(response.success).toBe(false);
    expect(response.status).toBe('DECLINED');
    expect(response.message).toContain('algoritmo de Luhn');
  });

  test('aprova transação para cartão terminando em "1"', async () => {

    const validCard = {
      holderName: 'Maria Santos',
      cardNumber: '4000 0000 0000 0051',
      expiryDate: '10/32',
      cvv: '123',
    };

    const promise = simulateGatewayPayment(validCard, 250.50);
    jest.advanceTimersByTime(1600);
    const response = await promise;

    expect(response.success).toBe(true);
    expect(response.status).toBe('APPROVED');
    expect(response.transactionId).toBeDefined();
    expect(response.brand).toBe('visa');
    expect(response.lastFourDigits).toBe('0051');
    expect(response.message).toContain('aprovado com sucesso');
  });

  test('recusa transação por falta de saldo para cartão terminando em "2"', async () => {

    const declinedCard = {
      holderName: 'Carlos Teste',
      cardNumber: '4000 0000 0000 0002',
      expiryDate: '08/30',
      cvv: '456',
    };

    const promise = simulateGatewayPayment(declinedCard, 500);
    jest.advanceTimersByTime(1600);
    const response = await promise;

    expect(response.success).toBe(false);
    expect(response.status).toBe('DECLINED');
    expect(response.message).toContain('Saldo insuficiente');
  });

  test('simula erro de timeout/rede para cartão terminando em "3"', async () => {

    const timeoutCard = {
      holderName: 'Ana Paula',
      cardNumber: '4000 0000 0000 0143',
      expiryDate: '11/31',
      cvv: '789',
    };

    const promise = simulateGatewayPayment(timeoutCard, 150);
    jest.advanceTimersByTime(1600);
    const response = await promise;

    expect(response.success).toBe(false);
    expect(response.status).toBe('TIMEOUT_ERROR');
    expect(response.message).toContain('Timeout');
  });
});
