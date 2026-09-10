export interface CouponValidationResult {
  isValid: boolean;
  code: string;
  discountPercentage: number;
  error?: string;
}

export interface CouponRule {
  code: string;
  discountPercentage: number;
  minSubtotal?: number;
  active: boolean;
}

const ACTIVE_COUPONS: CouponRule[] = [
  { code: 'LAB10', discountPercentage: 0.10, active: true },
  { code: 'STORELAB10', discountPercentage: 0.10, active: true },
  { code: 'PROMO200', discountPercentage: 0.20, minSubtotal: 200, active: true },
];

export const couponService = {

  validateCouponSync: (rawCode: string, subtotal = 0): CouponValidationResult => {
    const cleaned = (rawCode || '').trim().toUpperCase();
    if (!cleaned) {
      return { isValid: false, code: '', discountPercentage: 0, error: 'Informe um cupom' };
    }

    const matched = ACTIVE_COUPONS.find((c) => c.code === cleaned && c.active);
    if (!matched) {
      return { isValid: false, code: cleaned, discountPercentage: 0, error: 'Cupom inválido' };
    }

    if (matched.minSubtotal && subtotal < matched.minSubtotal) {
      return {
        isValid: false,
        code: cleaned,
        discountPercentage: 0,
        error: `Válido apenas para compras acima de R$ ${matched.minSubtotal.toFixed(2)}`,
      };
    }

    return {
      isValid: true,
      code: matched.code,
      discountPercentage: matched.discountPercentage,
    };
  },

  validateCouponAsync: async (rawCode: string, subtotal = 0): Promise<CouponValidationResult> => {
    return Promise.resolve(couponService.validateCouponSync(rawCode, subtotal));
  },
};
