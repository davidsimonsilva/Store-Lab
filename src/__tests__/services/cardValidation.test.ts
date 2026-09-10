import {
  validateLuhn,
  detectCardBrand,
  validateExpiryDate,
  formatCardNumber,
  formatExpiryDate,
} from '../../services/cardValidationService';

describe('cardValidationService - Algoritmo de Luhn e Detecção de Bandeiras', () => {
  describe('validateLuhn (Módulo 10)', () => {
    test('valida números de cartões com checksum de Luhn válido', () => {

      expect(validateLuhn('4532 0151 1283 0366')).toBe(true);
      expect(validateLuhn('5555 5555 5555 4444')).toBe(true);
      expect(validateLuhn('3782 8224 6310 005')).toBe(true);
      expect(validateLuhn('4012 8888 8888 1881')).toBe(true);
    });

    test('rejeita números de cartões com checksum de Luhn inválido', () => {
      expect(validateLuhn('4532 0151 1283 0362')).toBe(false);
      expect(validateLuhn('1234 5678 9012 3456')).toBe(false);
      expect(validateLuhn('1111 1111 1111 1111')).toBe(false);
    });

    test('rejeita cartões com menos de 13 dígitos ou mais de 19 dígitos', () => {
      expect(validateLuhn('123456')).toBe(false);
      expect(validateLuhn('123456789012345678901')).toBe(false);
      expect(validateLuhn('')).toBe(false);
    });
  });

  describe('detectCardBrand (BIN e Prefixos)', () => {
    test('detecta bandeira Visa para prefixos iniciando com 4', () => {
      expect(detectCardBrand('4123 4567 8901 2345')).toBe('visa');
      expect(detectCardBrand('4000 0000 0000 0000')).toBe('visa');
    });

    test('detecta bandeira Mastercard para prefixos 51-55 e série 2', () => {
      expect(detectCardBrand('5123 4567 8901 2345')).toBe('mastercard');
      expect(detectCardBrand('5555 5555 5555 4444')).toBe('mastercard');
      expect(detectCardBrand('2221 0000 0000 0000')).toBe('mastercard');
    });

    test('detecta bandeira American Express para prefixos 34 e 37', () => {
      expect(detectCardBrand('3400 0000 0000 000')).toBe('amex');
      expect(detectCardBrand('3782 8224 6310 005')).toBe('amex');
    });

    test('detecta bandeira Elo para prefixos conhecidos', () => {
      expect(detectCardBrand('636368 0000000000')).toBe('elo');
      expect(detectCardBrand('5067 0000 0000 0000')).toBe('elo');
      expect(detectCardBrand('6504 0000 0000 0000')).toBe('elo');
    });

    test('detecta bandeira Hipercard para prefixos 606282 ou 3841', () => {
      expect(detectCardBrand('606282 0000000000')).toBe('hipercard');
      expect(detectCardBrand('3841 0000 0000 0000')).toBe('hipercard');
    });

    test('retorna unknown para bandeiras não identificadas', () => {
      expect(detectCardBrand('9999 9999 9999 9999')).toBe('unknown');
    });
  });

  describe('validateExpiryDate', () => {
    test('valida datas futuras válidas', () => {
      expect(validateExpiryDate('12/35')).toBe(true);
      expect(validateExpiryDate('06/30')).toBe(true);
    });

    test('rejeita meses inválidos (maior que 12 ou igual a 0)', () => {
      expect(validateExpiryDate('00/30')).toBe(false);
      expect(validateExpiryDate('13/30')).toBe(false);
    });

    test('rejeita datas passadas', () => {
      expect(validateExpiryDate('01/20')).toBe(false);
      expect(validateExpiryDate('12/15')).toBe(false);
    });

    test('rejeita formatos incorretos', () => {
      expect(validateExpiryDate('123')).toBe(false);
      expect(validateExpiryDate('abc')).toBe(false);
    });
  });

  describe('formatCardNumber & formatExpiryDate', () => {
    test('formata número de cartão com blocos de 4 dígitos', () => {
      expect(formatCardNumber('4532015112830361')).toBe('4532 0151 1283 0361');
      expect(formatCardNumber('12345')).toBe('1234 5');
    });

    test('formata data de expiração com barra MM/AA', () => {
      expect(formatExpiryDate('1230')).toBe('12/30');
      expect(formatExpiryDate('05')).toBe('05');
    });
  });
});
