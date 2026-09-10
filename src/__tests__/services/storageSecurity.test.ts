import { getStorageItem, setStorageItem, removeStorageItem } from '../../services/storageService';
import { addressService } from '../../services/addressService';
import { cardService } from '../../services/cardService';
import { orderService } from '../../services/orderService';

describe('Storage & Security - Defensive Parsing and User Isolation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('storageService - Defensive Parsing', () => {
    test('retorna fallback com segurança quando o valor do localStorage é JSON corrompido / inválido', () => {
      const key = 'corrupted_key';
      localStorage.setItem(key, '{ invalid: json syntax');

      const fallbackValue = { safe: true, count: 0 };
      const result = getStorageItem(key, fallbackValue);

      expect(result).toEqual(fallbackValue);
    });

    test('retorna fallback quando a chave não existe', () => {
      const result = getStorageItem('non_existent_key', ['default_item']);
      expect(result).toEqual(['default_item']);
    });

    test('grava e recupera JSON válido com fidelidade', () => {
      const data = { user: 'Ana', roles: ['admin', 'customer'], active: true };
      const saved = setStorageItem('test_valid_key', data);

      expect(saved).toBe(true);
      const retrieved = getStorageItem('test_valid_key', null);
      expect(retrieved).toEqual(data);
    });

    test('remove itens com segurança', () => {
      setStorageItem('temp_key', 'some_value');
      removeStorageItem('temp_key');
      expect(getStorageItem('temp_key', null)).toBeNull();
    });
  });

  describe('Data Isolation por userId', () => {
    test('garante que dados de endereços do Usuário A não vazem para o Usuário B', () => {
      const userA = 'usr_alice_111';
      const userB = 'usr_bob_222';

      addressService.saveAddress({
        userId: userA,
        label: 'Casa da Alice',
        recipientName: 'Alice Silva',
        cep: '01001-000',
        street: 'Rua das Flores',
        number: '123',
        neighborhood: 'Jardins',
        city: 'São Paulo',
        state: 'SP',
      });

      const addressesA = addressService.getAddressesByUserId(userA);
      const addressesB = addressService.getAddressesByUserId(userB);

      expect(addressesA.some((a) => a.label === 'Casa da Alice')).toBe(true);
      expect(addressesB.some((a) => a.label === 'Casa da Alice')).toBe(false);
    });

    test('garante que dados de cartões do Usuário A não vazem para o Usuário B', () => {
      const userA = 'usr_alice_111';
      const userB = 'usr_bob_222';

      cardService.saveCard({
        userId: userA,
        holderName: 'ALICE SILVA',
        cardNumber: '4532 0151 1283 0361',
        expiryMonth: '12',
        expiryYear: '2030',
        isDefault: true,
      });

      const cardsA = cardService.getCardsByUserId(userA);
      const cardsB = cardService.getCardsByUserId(userB);

      expect(cardsA.some((c) => c.holderName === 'ALICE SILVA')).toBe(true);
      expect(cardsB.some((c) => c.holderName === 'ALICE SILVA')).toBe(false);
    });

    test('garante que pedidos do Usuário A não vazem para o Usuário B', () => {
      const userA = 'usr_alice_111';
      const userB = 'usr_bob_222';

      const orderA = orderService.createOrder({
        userId: userA,
        items: [{ id: '1', productId: 'p1', name: 'Notebook Alice', price: 5000, quantity: 1 }],
        totalAmount: 5000,
        shippingCost: 0,
        discountAmount: 500,
        finalAmount: 4500,
        deliveryAddress: {
          id: 'addr_a',
          userId: userA,
          label: 'Casa Alice',
          recipientName: 'Alice',
          cep: '01001-000',
          street: 'Rua Alice',
          number: '10',
          neighborhood: 'Centro',
          city: 'SP',
          state: 'SP',
        },
        paymentMethod: 'pix',
      });

      const ordersA = orderService.getOrdersByUserId(userA);
      const ordersB = orderService.getOrdersByUserId(userB);

      expect(ordersA.some((o) => o.id === orderA.id)).toBe(true);
      expect(ordersB.some((o) => o.id === orderA.id)).toBe(false);
    });
  });
});
