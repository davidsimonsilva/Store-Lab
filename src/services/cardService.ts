import { getStorageItem, setStorageItem } from './storageService';
import { SavedCard } from '../types';
import { STORAGE_KEYS } from '../constants';

export type CardBrand = 'visa' | 'mastercard' | 'elo' | 'amex' | 'hipercard' | 'discover' | 'unknown';

export function validateLuhn(cardNumber: string): boolean {
  const cleanNumber = cardNumber.replace(/\D/g, '');
  if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export function detectCardBrand(cardNumber: string): CardBrand {
  const cleanNumber = cardNumber.replace(/\D/g, '');

  if (/^4/.test(cleanNumber)) return 'visa';
  if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/.test(cleanNumber)) return 'mastercard';
  if (/^3[47]/.test(cleanNumber)) return 'amex';
  if (/^(4011|438935|451416|4576|504175|506699|5067|5090|627780|636297|636368|650031|650033|650035|650051|6504|6505|6507|6509|6516|6550)/.test(cleanNumber)) return 'elo';
  if (/^(6011|65|64[4-9]|622)/.test(cleanNumber)) return 'discover';
  if (/^(606282|3841)/.test(cleanNumber)) return 'hipercard';

  return 'unknown';
}

export function validateExpiryDate(expiry: string): boolean {
  const clean = expiry.replace(/\D/g, '');
  if (clean.length !== 4) return false;

  const month = parseInt(clean.slice(0, 2), 10);
  const year = parseInt(`20${clean.slice(2, 4)}`, 10);

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  if (year > currentYear + 20) return false;

  return true;
}

export function formatCardNumber(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 16);
  const parts = clean.match(/[\s\S]{1,4}/g) || [];
  return parts.join(' ');
}

export function formatExpiryDate(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 4);
  if (clean.length > 2) {
    return `${clean.slice(0, 2)}/${clean.slice(2)}`;
  }
  return clean;
}

export function formatExpiryInput(inputValue: string, previousValue: string = ''): string {

  if (
    previousValue.endsWith('/') &&
    (inputValue === previousValue.slice(0, -1) || inputValue.replace(/\D/g, '') === previousValue.replace(/\D/g, ''))
  ) {
    const cleanPrev = previousValue.replace(/\D/g, '');
    if (cleanPrev.length === 2) {
      return cleanPrev.slice(0, 1);
    }
  }

  const clean = inputValue.replace(/\D/g, '').slice(0, 4);
  if (clean.length > 2) {
    return `${clean.slice(0, 2)}/${clean.slice(2)}`;
  } else if (clean.length === 2) {
    return `${clean}/`;
  }
  return clean;
}

const getCardsStorageKey = (userId: string) => `${STORAGE_KEYS.USER_CARDS_PREFIX}${userId}`;

export interface CreateCardDTO {
  userId: string;
  holderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault?: boolean;
}

export const cardService = {
  getCardsByUserId: (userId: string): SavedCard[] => {
    if (!userId) return [];
    return getStorageItem<SavedCard[]>(getCardsStorageKey(userId), []);
  },

  saveCard: (dto: CreateCardDTO): SavedCard => {
    const cleanNumber = dto.cardNumber.replace(/\D/g, '');
    const brand = detectCardBrand(cleanNumber);
    const existingCards = cardService.getCardsByUserId(dto.userId);

    const isFirstCard = existingCards.length === 0;
    const shouldBeDefault = dto.isDefault !== undefined ? dto.isDefault : isFirstCard;

    let updatedCards = existingCards;
    if (shouldBeDefault) {
      updatedCards = existingCards.map((c) => ({ ...c, isDefault: false }));
    }

    const newCard: SavedCard = {
      id: `card_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: dto.userId,
      holderName: dto.holderName.trim().toUpperCase(),
      lastFourDigits: cleanNumber.slice(-4),
      brand: brand,
      expiryMonth: dto.expiryMonth.padStart(2, '0'),
      expiryYear: dto.expiryYear.slice(-2),
      isDefault: shouldBeDefault,
    };

    updatedCards.push(newCard);
    setStorageItem(getCardsStorageKey(dto.userId), updatedCards);
    return newCard;
  },

  setDefaultCard: (userId: string, cardId: string): SavedCard[] => {
    const cards = cardService.getCardsByUserId(userId);
    const updated = cards.map((c) => ({
      ...c,
      isDefault: c.id === cardId,
    }));
    setStorageItem(getCardsStorageKey(userId), updated);
    return updated;
  },

  deleteCard: (userId: string, cardId: string): SavedCard[] => {
    const cards = cardService.getCardsByUserId(userId);
    const updated = cards.filter((c) => c.id !== cardId);

    if (updated.length > 0 && !updated.some((c) => c.isDefault)) {
      updated[0].isDefault = true;
    }

    setStorageItem(getCardsStorageKey(userId), updated);
    return updated;
  },

  getDefaultCard: (userId: string): SavedCard | undefined => {
    const cards = cardService.getCardsByUserId(userId);
    return cards.find((c) => c.isDefault) || cards[0];
  },

  getCardsByUserIdAsync: async (userId: string): Promise<SavedCard[]> => {
    return Promise.resolve(cardService.getCardsByUserId(userId));
  },

  saveCardAsync: async (dto: CreateCardDTO): Promise<SavedCard> => {
    return Promise.resolve(cardService.saveCard(dto));
  },

  setDefaultCardAsync: async (userId: string, cardId: string): Promise<SavedCard[]> => {
    return Promise.resolve(cardService.setDefaultCard(userId, cardId));
  },

  deleteCardAsync: async (userId: string, cardId: string): Promise<SavedCard[]> => {
    return Promise.resolve(cardService.deleteCard(userId, cardId));
  },

  getDefaultCardAsync: async (userId: string): Promise<SavedCard | undefined> => {
    return Promise.resolve(cardService.getDefaultCard(userId));
  },
};
