import { couponService } from '../../services/couponService';

describe('couponService', () => {
  it('deve validar com sucesso o cupom LAB10', () => {
    const result = couponService.validateCouponSync('LAB10', 100);
    expect(result.isValid).toBe(true);
    expect(result.code).toBe('LAB10');
    expect(result.discountPercentage).toBe(0.10);
    expect(result.error).toBeUndefined();
  });

  it('deve validar com sucesso o cupom STORELAB10 em minúsculas com espaços', () => {
    const result = couponService.validateCouponSync('  storelab10  ', 200);
    expect(result.isValid).toBe(true);
    expect(result.code).toBe('STORELAB10');
    expect(result.discountPercentage).toBe(0.10);
  });

  it('deve rejeitar código de cupom vazio', () => {
    const result = couponService.validateCouponSync('', 100);
    expect(result.isValid).toBe(false);
    expect(result.discountPercentage).toBe(0);
    expect(result.error).toContain('Informe um cupom');
  });

  it('deve rejeitar código de cupom inexistente', () => {
    const result = couponService.validateCouponSync('INVALIDO99', 500);
    expect(result.isValid).toBe(false);
    expect(result.discountPercentage).toBe(0);
    expect(result.error).toContain('inválido');
  });

  it('deve rejeitar cupom quando o subtotal for menor que o minSubtotal exigido', () => {
    const result = couponService.validateCouponSync('PROMO200', 150);
    expect(result.isValid).toBe(false);
    expect(result.discountPercentage).toBe(0);
    expect(result.error).toContain('Válido apenas para compras acima de R$ 200.00');
  });

  it('deve aceitar cupom com minSubtotal quando o subtotal for igual ou superior', () => {
    const result = couponService.validateCouponSync('PROMO200', 250);
    expect(result.isValid).toBe(true);
    expect(result.code).toBe('PROMO200');
    expect(result.discountPercentage).toBe(0.20);
  });

  it('deve validar de forma assíncrona com validateCouponAsync', async () => {
    const result = await couponService.validateCouponAsync('LAB10', 150);
    expect(result.isValid).toBe(true);
    expect(result.discountPercentage).toBe(0.10);
  });
});
