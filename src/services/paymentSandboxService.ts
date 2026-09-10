import { validateLuhn, detectCardBrand } from './cardValidationService';

export interface PaymentCardPayload {
  holderName: string;
  cardNumber: string; 
  expiryDate: string; 
  cvv: string;
  installments?: number;
}

export type TransactionStatus = 'APPROVED' | 'DECLINED' | 'TIMEOUT_ERROR';

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  status: TransactionStatus;
  message: string;
  brand?: string;
  lastFourDigits?: string;
  timestamp: string;
}

export function simulateGatewayPayment(
  card: PaymentCardPayload,
  amount: number
): Promise<PaymentResponse> {
  return new Promise((resolve) => {
    const cleanNumber = card.cardNumber.replace(/\D/g, '');
    const brand = detectCardBrand(cleanNumber);
    const lastFour = cleanNumber.slice(-4);
    const lastDigit = cleanNumber.slice(-1);
    const timestamp = new Date().toISOString();

    if (!validateLuhn(cleanNumber)) {
      return resolve({
        success: false,
        status: 'DECLINED',
        message: 'Transação Recusada: O número do cartão de crédito é inválido perante o algoritmo de Luhn.',
        brand,
        lastFourDigits: lastFour,
        timestamp,
      });
    }

    const cleanCvv = (card.cvv || '').trim();
    const is4DigitBrand = brand === 'amex' || brand === 'discover';
    const isInvalidTestCvv = ['000', '999', '111', '0000', '9999'].includes(cleanCvv);
    const isIncompatibleCvv = is4DigitBrand
      ? cleanCvv.length !== 4 || isInvalidTestCvv
      : (cleanCvv.length < 3 || cleanCvv.length > 4) || isInvalidTestCvv;

    setTimeout(() => {
      if (isIncompatibleCvv) {
        return resolve({
          success: false,
          status: 'DECLINED',
          message: 'Transação Recusada: Código de segurança (CVV) incompatível com os registros da operadora.',
          brand,
          lastFourDigits: lastFour,
          timestamp: new Date().toISOString(),
        });
      }

      switch (lastDigit) {

        case '1':
          resolve({
            success: true,
            transactionId: `TX-LAB-${Math.floor(100000 + Math.random() * 900000)}`,
            status: 'APPROVED',
            message: `Pagamento de R$ ${amount.toFixed(2).replace('.', ',')} aprovado com sucesso no Sandbox!`,
            brand,
            lastFourDigits: lastFour,
            timestamp: new Date().toISOString(),
          });
          break;

        case '2':
          resolve({
            success: false,
            status: 'DECLINED',
            message: 'Transação Recusada: Saldo insuficiente ou limite de crédito indisponível no banco emissor.',
            brand,
            lastFourDigits: lastFour,
            timestamp: new Date().toISOString(),
          });
          break;

        case '3':
          resolve({
            success: false,
            status: 'TIMEOUT_ERROR',
            message: 'Erro de Conexão: O banco emissor excedeu o tempo limite de resposta (Gateway Timeout). Tente novamente.',
            brand,
            lastFourDigits: lastFour,
            timestamp: new Date().toISOString(),
          });
          break;

        default:
          resolve({
            success: true,
            transactionId: `TX-LAB-${Math.floor(100000 + Math.random() * 900000)}`,
            status: 'APPROVED',
            message: `Pagamento de R$ ${amount.toFixed(2).replace('.', ',')} aprovado com sucesso!`,
            brand,
            lastFourDigits: lastFour,
            timestamp: new Date().toISOString(),
          });
          break;
      }
    }, 1500);
  });
}
