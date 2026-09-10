import { useState, useCallback } from 'react';
import { SavedCard } from '../../../types';
import { cardService } from '../../../services/cardService';
import { CardFormData } from '../Payment/CheckoutPaymentSelector';

export function useCheckoutPayment(userId?: string, userName?: string) {
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'pix' | 'boleto'>('credit_card');

  const [cardData, setCardData] = useState<CardFormData>({
    isUsingSavedCard: true,
    savedCardId: null,
    holderName: userName ? userName.toUpperCase() : '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    installments: 1,
  });

  const loadSavedCards = useCallback(() => {
    if (!userId) return;
    const userCards = cardService.getCardsByUserId(userId);
    setSavedCards(userCards);

    const defaultCard = userCards.find((c: SavedCard) => c.isDefault) || userCards[0] || null;
    if (defaultCard) {
      setCardData((prev) => ({
        ...prev,
        isUsingSavedCard: true,
        savedCardId: defaultCard.id,
        holderName: defaultCard.holderName,
        cardNumber: `•••• •••• •••• ${defaultCard.lastFourDigits}`,
        expiryDate: `${defaultCard.expiryMonth}/${defaultCard.expiryYear}`,
      }));
    } else {
      setCardData((prev) => ({
        ...prev,
        isUsingSavedCard: false,
        savedCardId: null,
      }));
    }
  }, [userId]);

  return {
    savedCards,
    setSavedCards,
    paymentMethod,
    setPaymentMethod,
    cardData,
    setCardData,
    loadSavedCards,
  };
}
