import { mergeGuestCartToUser, loadCartFromStorage, saveCartToStorage } from '../../services/cartService';
import { CartItem } from '../../types';

describe('cartService - mergeGuestCartToUser', () => {
  const dummyProduct1 = {
    id: 'prod-1',
    productID: 'prod-1',
    name: 'Teclado Mecânico Pro',
    price: 350.00,
    category: 'Eletrônicos',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3'
  };

  const dummyProduct2 = {
    id: 'prod-2',
    productID: 'prod-2',
    name: 'Mouse Ergonômico Air',
    price: 180.00,
    category: 'Eletrônicos',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7'
  };

  test('merges guest items into user cart combining quantities for duplicate products', () => {
    const guestItems: CartItem[] = [
      { id: 'c1', userId: 'anon', productId: 'prod-1', quantity: 2, product: dummyProduct1 },
      { id: 'c2', userId: 'anon', productId: 'prod-2', quantity: 1, product: dummyProduct2 }
    ];

    const userItems: CartItem[] = [
      { id: 'c3', userId: 'user-1', productId: 'prod-1', quantity: 1, product: dummyProduct1 }
    ];

    const merged = mergeGuestCartToUser(guestItems, userItems);

    expect(merged.length).toBe(2);
    const prod1 = merged.find(i => String(i.product.id) === 'prod-1');
    expect(prod1?.quantity).toBe(3);

    const prod2 = merged.find(i => String(i.product.id) === 'prod-2');
    expect(prod2?.quantity).toBe(1);
  });

  test('returns user items intact when guest cart is empty', () => {
    const userItems: CartItem[] = [
      { id: 'c1', userId: 'user-1', productId: 'prod-1', quantity: 5, product: dummyProduct1 }
    ];

    const merged = mergeGuestCartToUser([], userItems);
    expect(merged.length).toBe(1);
    expect(merged[0].quantity).toBe(5);
  });
});

describe('cartService - localStorage persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saves and loads cart successfully from localStorage', () => {
    const testItems: CartItem[] = [
      {
        id: 'cart-1',
        userId: 'u-1',
        productId: 'p-1',
        quantity: 2,
        product: {
          id: 'p-1',
          productID: 'p-1',
          name: 'Fone Bluetooth',
          price: 200,
          category: 'Eletrônicos',
          image: ''
        }
      }
    ];

    saveCartToStorage(testItems, 'test_cart_key');
    const loaded = loadCartFromStorage('test_cart_key');

    expect(loaded.length).toBe(1);
    expect(loaded[0].productId).toBe('p-1');
    expect(loaded[0].quantity).toBe(2);
  });
});
