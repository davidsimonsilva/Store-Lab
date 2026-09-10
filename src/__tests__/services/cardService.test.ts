import { cardService } from '../../services/cardService';

describe('cardService - Armazenamento Seguro e Proteção de Dados', () => {
  const userId = 'usr_test_security_999';

  beforeEach(() => {
    localStorage.clear();
  });

  test('retorna array vazio quando nenhum cartão foi salvo', () => {
    const cards = cardService.getCardsByUserId(userId);
    expect(cards).toEqual([]);
  });

  test('salva novo cartão mascarado e NUNCA armazena número completo nem CVV', () => {
    const saved = cardService.saveCard({
      userId,
      holderName: 'Lucas Ferreira',
      cardNumber: '4532 0151 1283 0361',
      expiryMonth: '10',
      expiryYear: '2030',
      isDefault: true,
    });

    expect(saved.id).toBeDefined();
    expect(saved.holderName).toBe('LUCAS FERREIRA');
    expect(saved.lastFourDigits).toBe('0361');
    expect(saved.brand).toBe('visa');
    expect(saved.expiryMonth).toBe('10');
    expect(saved.expiryYear).toBe('30');
    expect(saved.isDefault).toBe(true);

    const storedRaw = localStorage.getItem(`user_cards_${userId}`) || localStorage.getItem(`storelab_cards_${userId}`);
    expect(storedRaw).not.toBeNull();
    expect(storedRaw).not.toContain('4532015112830361');
    expect(storedRaw).not.toContain('4532 0151 1283 0361');
    expect(storedRaw).toContain('"lastFourDigits":"0361"');
  });

  test('permite definir um cartão como padrão (isDefault)', () => {
    const card1 = cardService.saveCard({
      userId,
      holderName: 'Lucas Ferreira 1',
      cardNumber: '4532 0151 1283 0361',
      expiryMonth: '10',
      expiryYear: '2030',
      isDefault: true,
    });

    const card2 = cardService.saveCard({
      userId,
      holderName: 'Lucas Ferreira 2',
      cardNumber: '5555 5555 5555 4444',
      expiryMonth: '11',
      expiryYear: '2031',
      isDefault: false,
    });

    cardService.setDefaultCard(userId, card2.id);

    const cards = cardService.getCardsByUserId(userId);
    const found2 = cards.find((c) => c.id === card2.id);
    const found1 = cards.find((c) => c.id === card1.id);

    expect(found2?.isDefault).toBe(true);
    expect(found1?.isDefault).toBe(false);
  });

  test('permite remover um cartão e elege novo padrão se o removido era default', () => {
    const card1 = cardService.saveCard({
      userId,
      holderName: 'Lucas Ferreira 1',
      cardNumber: '4532 0151 1283 0361',
      expiryMonth: '10',
      expiryYear: '2030',
      isDefault: true,
    });

    const card2 = cardService.saveCard({
      userId,
      holderName: 'Lucas Ferreira 2',
      cardNumber: '5555 5555 5555 4444',
      expiryMonth: '11',
      expiryYear: '2031',
      isDefault: false,
    });

    cardService.deleteCard(userId, card1.id);

    const cards = cardService.getCardsByUserId(userId);
    expect(cards.find((c) => c.id === card1.id)).toBeUndefined();
    expect(cards.length).toBeGreaterThan(0);

    expect(cards[0].isDefault).toBe(true);
  });
});
