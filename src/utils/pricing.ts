import { BUSINESS_CONSTANTS } from '../constants';

export const calculatePixPrice = (basePrice: number): number => {
  if (basePrice <= 0) return 0;
  return Number((basePrice * (1 - BUSINESS_CONSTANTS.PIX_DISCOUNT_PERCENTAGE / 100)).toFixed(2));
};

export interface InstallmentCalculation {
  installmentNumber: number;
  installmentValue: number;
  totalWithInterest: number;
  hasInterest: boolean;
  interestAmount: number;
  label: string;
}

export const calculateInstallmentDetails = (
  amount: number,
  installmentNumber: number
): InstallmentCalculation => {
  const safeNum = Math.max(1, Math.min(BUSINESS_CONSTANTS.MAX_INSTALLMENTS, installmentNumber));
  const hasInterest = safeNum > BUSINESS_CONSTANTS.FREE_INSTALLMENT_LIMIT;

  if (!hasInterest) {
    const installmentValue = Number((amount / safeNum).toFixed(2));
    return {
      installmentNumber: safeNum,
      installmentValue,
      totalWithInterest: amount,
      hasInterest: false,
      interestAmount: 0,
      label: `${safeNum}x sem juros`,
    };
  }

  const interestFactor = Math.pow(1 + BUSINESS_CONSTANTS.MONTHLY_INTEREST_RATE, safeNum);
  const totalWithInterest = Number((amount * interestFactor).toFixed(2));
  const installmentValue = Number((totalWithInterest / safeNum).toFixed(2));
  const interestAmount = Number((totalWithInterest - amount).toFixed(2));

  return {
    installmentNumber: safeNum,
    installmentValue,
    totalWithInterest,
    hasInterest: true,
    interestAmount,
    label: `${safeNum}x com juros`,
  };
};

export interface OrderFinancialSummary {
  subtotal: number;
  shipping: number;
  couponDiscount: number;
  pixDiscount: number;
  totalDiscount: number;
  hasInterest: boolean;
  interestAmount: number;
  finalAmount: number;
  installmentCount: number;
  installmentValue: number;
}

export const calculateOrderTotals = (params: {
  subtotal: number;
  shipping: number;
  couponDiscount?: number;
  paymentMethod: 'credit_card' | 'pix' | 'boleto';
  installments?: number;
}): OrderFinancialSummary => {
  const { subtotal, shipping, couponDiscount = 0, paymentMethod, installments = 1 } = params;

  const baseAfterCoupon = Math.max(0, subtotal - couponDiscount);
  const pixDiscount =
    paymentMethod === 'pix'
      ? Number((baseAfterCoupon * (BUSINESS_CONSTANTS.PIX_DISCOUNT_PERCENTAGE / 100)).toFixed(2))
      : 0;

  const totalDiscount = Number((couponDiscount + pixDiscount).toFixed(2));
  const baseCardOrBoletoTotal = Math.max(0, subtotal + shipping - couponDiscount);

  if (paymentMethod === 'credit_card' && installments > BUSINESS_CONSTANTS.FREE_INSTALLMENT_LIMIT) {
    const instDetails = calculateInstallmentDetails(baseCardOrBoletoTotal, installments);
    return {
      subtotal,
      shipping,
      couponDiscount,
      pixDiscount: 0,
      totalDiscount: couponDiscount,
      hasInterest: true,
      interestAmount: instDetails.interestAmount,
      finalAmount: instDetails.totalWithInterest,
      installmentCount: installments,
      installmentValue: instDetails.installmentValue,
    };
  }

  if (paymentMethod === 'credit_card') {
    const safeInst = Math.max(1, installments);
    return {
      subtotal,
      shipping,
      couponDiscount,
      pixDiscount: 0,
      totalDiscount: couponDiscount,
      hasInterest: false,
      interestAmount: 0,
      finalAmount: baseCardOrBoletoTotal,
      installmentCount: safeInst,
      installmentValue: Number((baseCardOrBoletoTotal / safeInst).toFixed(2)),
    };
  }

  if (paymentMethod === 'pix') {
    const pixFinal = Math.max(0, baseAfterCoupon - pixDiscount + shipping);
    return {
      subtotal,
      shipping,
      couponDiscount,
      pixDiscount,
      totalDiscount,
      hasInterest: false,
      interestAmount: 0,
      finalAmount: Number(pixFinal.toFixed(2)),
      installmentCount: 1,
      installmentValue: Number(pixFinal.toFixed(2)),
    };
  }

  return {
    subtotal,
    shipping,
    couponDiscount,
    pixDiscount: 0,
    totalDiscount: couponDiscount,
    hasInterest: false,
    interestAmount: 0,
    finalAmount: baseCardOrBoletoTotal,
    installmentCount: 1,
    installmentValue: baseCardOrBoletoTotal,
  };
};
