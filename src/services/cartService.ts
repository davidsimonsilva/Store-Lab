import { CartItem } from '../types';

/**
 * Serviço isolado para mesclar o carrinho do visitante anônimo (guest_cart)
 * ao carrinho do usuário logado (user_cart) no momento do login com sucesso.
 */
export const mergeGuestCartToUser = (guestItems: CartItem[], userItems: CartItem[]): CartItem[] => {
  const mergedMap = new Map<string, CartItem>();

  userItems.forEach(item => mergedMap.set(String(item.product.id), { ...item }));
  guestItems.forEach(item => {
    const key = String(item.product.id);
    if (mergedMap.has(key)) {
      const existing = mergedMap.get(key)!;
      mergedMap.set(key, { ...existing, quantity: existing.quantity + item.quantity });
    } else {
      mergedMap.set(key, { ...item });
    }
  });

  return Array.from(mergedMap.values());
};

/**
 * Carrega o carrinho salvo no localStorage.
 */
export const loadCartFromStorage = (key: string = 'lab_cart'): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(key) || localStorage.getItem('store_lab_cart');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      return parsed.map((item: any, idx: number) => {
        if (!item.id) {
          item.id = `cart_${Date.now()}_${idx}_${Math.random()}`;
        }
        return item as CartItem;
      });
    }
    return [];
  } catch (err) {
    console.error(`Error loading cart from ${key}:`, err);
    return [];
  }
};

/**
 * Salva o carrinho no localStorage.
 */
export const saveCartToStorage = (cart: CartItem[], key: string = 'lab_cart'): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(cart));
  } catch (err) {
    console.error(`Error saving cart to ${key}:`, err);
  }
};
