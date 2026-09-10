import { formatDocumentTitle, truncateTitle, applySEO, MAX_DOCUMENT_TITLE_LENGTH } from '../../hooks/useDocumentTitle';

describe('Document Title & SEO Formatting', () => {
  beforeEach(() => {
    document.title = '';
  });

  test('default home screen title is "Store-lab"', () => {
    expect(formatDocumentTitle('/')).toBe('Store-lab');
    expect(formatDocumentTitle('')).toBe('Store-lab');
    expect(formatDocumentTitle('Store-lab')).toBe('Store-lab');
    expect(formatDocumentTitle('StoreLab')).toBe('Store-lab');
    expect(formatDocumentTitle('StoreLab | Inovação, Eletrônicos e Gadgets')).toBe('Store-lab');
  });

  test('specific pages display clean names without redundant branding', () => {
    expect(formatDocumentTitle('Carrinho')).toBe('Carrinho');
    expect(formatDocumentTitle('Nexus Prime Smartphone')).toBe('Nexus Prime Smartphone');
    expect(formatDocumentTitle('Meu Perfil')).toBe('Meu Perfil');
    expect(formatDocumentTitle('Finalizar Compra')).toBe('Finalizar Compra');
    expect(formatDocumentTitle('Entrar')).toBe('Entrar');
    expect(formatDocumentTitle('Criar Conta')).toBe('Criar Conta');
  });

  test('truncates titles that exceed 50 characters with ...', () => {
    const longTitle = 'Teclado Mecânico RGB Gamer Switch Azul Layout Compacto 75% Pré-lubrificado de Fábrica';
    expect(longTitle.length).toBeGreaterThan(50);

    const formatted = formatDocumentTitle(longTitle);
    expect(formatted.length).toBeLessThanOrEqual(MAX_DOCUMENT_TITLE_LENGTH);
    expect(formatted.endsWith('...')).toBe(true);
  });

  test('truncateTitle handles custom lengths and strings correctly', () => {
    expect(truncateTitle('Nexus Prime', 50)).toBe('Nexus Prime');

    const exactly50 = '12345678901234567890123456789012345678901234567890';
    expect(truncateTitle(exactly50, 50)).toBe(exactly50);

    const length55 = '1234567890123456789012345678901234567890123456789012345';
    const truncated = truncateTitle(length55, 50);
    expect(truncated.length).toBe(50);
    expect(truncated.endsWith('...')).toBe(true);
  });

  test('applySEO updates document.title in the DOM correctly', () => {
    applySEO({ title: 'Carrinho' });
    expect(document.title).toBe('Carrinho');

    applySEO('Nexus Prime Smartphone');
    expect(document.title).toBe('Nexus Prime Smartphone');

    applySEO('Store-lab');
    expect(document.title).toBe('Store-lab');
  });
});
