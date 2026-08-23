import { formatCurrencyBRL, formatCPF, formatCEP, validateCPF, formatDateBR } from '../../utils/formatters';

describe('formatters - formatCurrencyBRL', () => {
  test('formats numeric amounts to Brazilian Real currency format', () => {
    const formatted = formatCurrencyBRL(1250.5);
    expect(formatted).toContain('1.250,50');
  });

  test('formats zero correctly', () => {
    const formatted = formatCurrencyBRL(0);
    expect(formatted).toContain('0,00');
  });
});

describe('formatters - formatCPF & validateCPF', () => {
  test('formats raw 11-digit string into standard CPF pattern XXX.XXX.XXX-XX', () => {
    const raw = '12345678901';
    expect(formatCPF(raw)).toBe('123.456.789-01');
  });

  test('validates correct CPFs correctly', () => {
    expect(validateCPF('52998224725')).toBe(true);
  });

  test('rejects CPFs with repeated digits', () => {
    expect(validateCPF('11111111111')).toBe(false);
    expect(validateCPF('00000000000')).toBe(false);
  });

  test('rejects CPFs with invalid checksums or length', () => {
    expect(validateCPF('12345678900')).toBe(false);
    expect(validateCPF('123')).toBe(false);
  });
});

describe('formatters - formatCEP & formatDateBR', () => {
  test('formats raw 8-digit string into CEP format XXXXX-XXX', () => {
    const raw = '01001000';
    expect(formatCEP(raw)).toBe('01001-000');
  });

  test('formatDateBR formats Date or string into pt-BR date', () => {
    const date = new Date('2025-05-15T00:00:00');
    expect(formatDateBR(date)).toContain('15/05/2025');
  });
});
