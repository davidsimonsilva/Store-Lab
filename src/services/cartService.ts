import { CartItem } from '../types';
import { getStorageItem, setStorageItem, removeStorageItem } from './storageService';
import { STORAGE_KEYS } from '../constants';

export const mergeGuestCartToUser = (guestItems: CartItem[], userItems: CartItem[]): CartItem[] => {
  const mergedMap = new Map<string, CartItem>();

  userItems.forEach(item => {
    const key = String(item.productId || item.product?.id || item.product?.productID || item.id);
    mergedMap.set(key, { ...item });
  });

  guestItems.forEach(item => {
    const key = String(item.productId || item.product?.id || item.product?.productID || item.id);
    if (mergedMap.has(key)) {
      const existing = mergedMap.get(key)!;
      mergedMap.set(key, { ...existing, quantity: existing.quantity + item.quantity });
    } else {
      mergedMap.set(key, { ...item });
    }
  });

  return Array.from(mergedMap.values());
};

export const loadCartFromStorage = (key: string = STORAGE_KEYS.CART): CartItem[] => {
  if (typeof window === 'undefined') return [];

  const raw = localStorage.getItem(key);
  if (raw !== null) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map((item: CartItem, idx: number) => ({
          ...item,
          id: item.id || `cart_${Date.now()}_${idx}_${Math.random()}`,
        }));
      }
    } catch {
    }
  }

  return [];
};

export const saveCartToStorage = (cart: CartItem[], key: string = STORAGE_KEYS.CART): void => {
  setStorageItem(key, cart);
};

export const clearCartStorage = (key: string = STORAGE_KEYS.CART): void => {
  removeStorageItem(key);
};

