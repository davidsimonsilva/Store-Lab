import { useState, useCallback } from 'react';
import { Address, SavedCard, Order, CartItem } from '../../../types';
import { CartShippingOption } from '../../../context/CartContext';
import { calculateOrderTotals } from '../../../utils/pricing';
import { saveUserOrder, generateOrderCode } from '../../../services/orderService';
import { simulateGatewayPayment } from '../../../services/paymentSandboxService';
import { validateLuhn, validateExpiryDate, detectCardBrand } from '../../../services/cardValidationService';
import { calculateShippingOptions, ShippingOption } from '../../../services/cepService';
import { validateCheckoutItemsIntegrity } from '../../../services/productQuotaService';
import { getProductFallbackImage } from '../../../mocks/products';
import { CardFormData } from '../Payment/CheckoutPaymentSelector';

interface UseCheckoutSubmitProps {
  user: { id: string; name: string } | null;
  selectedAddress: Address | null;
  shippingOption: CartShippingOption | null;
  shipping: number;
  subtotal: number;
  discount: number;
  cartItems: CartItem[];
  paymentMethod: 'credit_card' | 'pix' | 'boleto';
  cardData: CardFormData;
  savedCards: SavedCard[];
  clearCart: () => void;
}

export function useCheckoutSubmit({
  user,
  selectedAddress,
  shippingOption,
  shipping,
  subtotal,
  discount,
  cartItems,
  paymentMethod,
  cardData,
  savedCards,
  clearCart,
}: UseCheckoutSubmitProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [isBoletoModalOpen, setIsBoletoModalOpen] = useState(false);

  const getValidationError = useCallback((): string | null => {
    if (!cartItems || cartItems.length === 0) {
      return 'Adicione produtos ao carrinho para finalizar a compra.';
    }
    if (!selectedAddress) {
      return 'Cadastre um endereço de entrega para prosseguir com o pedido.';
    }
    if (!shippingOption || !shippingOption.id) {
      return 'Selecione o tipo de transporte e frete para a entrega.';
    }

    const cleanAddressCep = (selectedAddress.cep || '').replace(/\D/g, '');
    const cleanShippingCep = (shippingOption.cep || '').replace(/\D/g, '');
    if (cleanShippingCep && cleanShippingCep !== cleanAddressCep) {
      return 'A opção de frete selecionada não corresponde ao CEP do endereço de entrega.';
    }

    const validShippingOptions = calculateShippingOptions(cleanAddressCep);
    const matchedShippingOption = validShippingOptions.find(
      (opt: ShippingOption) =>
        opt.id === shippingOption.id ||
        (shippingOption.id === 'pac' && opt.id === 'padrao') ||
        (shippingOption.id === 'sedex' && opt.id === 'expresso')
    );
    if (!matchedShippingOption) {
      return 'Opção de frete inválida ou não disponível para este endereço.';
    }

    if (paymentMethod === 'credit_card') {
      if (cardData.isUsingSavedCard) {
        if (!cardData.savedCardId) {
          return 'Selecione um cartão de crédito cadastrado.';
        }
        const activeCard = savedCards.find((c) => c.id === cardData.savedCardId);
        const cardBrand = (activeCard?.brand || 'unknown').toLowerCase();
        const is4DigitBrand = cardBrand === 'amex' || cardBrand === 'discover';
        if (!cardData.cvv) {
          return 'Informe o código CVV de segurança do cartão.';
        }
        if (is4DigitBrand) {
          if (cardData.cvv.length !== 4) {
            return `O código CVV do cartão ${activeCard?.brand?.toUpperCase() || ''} deve ter 4 dígitos.`;
          }
        } else if (cardBrand === 'unknown') {
          if (cardData.cvv.length < 3 || cardData.cvv.length > 4) {
            return 'O código CVV deve ter 3 ou 4 dígitos.';
          }
        } else {
          if (cardData.cvv.length < 3 || cardData.cvv.length > 4) {
            return `O código CVV do cartão ${activeCard?.brand?.toUpperCase() || ''} deve ter 3 dígitos.`;
          }
        }
      } else {
        if (!cardData.holderName.trim() || cardData.holderName.trim().length < 3) {
          return 'Informe o nome impresso no cartão de crédito.';
        }
        if (!validateLuhn(cardData.cardNumber)) {
          return 'Número de cartão de crédito inválido perante o algoritmo de Luhn.';
        }
        if (!validateExpiryDate(cardData.expiryDate)) {
          return 'Data de validade inválida ou vencida (MM/AA).';
        }
        const brand = detectCardBrand(cardData.cardNumber).toLowerCase();
        const is4DigitBrand = brand === 'amex' || brand === 'discover';
        if (!cardData.cvv) {
          return 'Informe o código CVV de segurança do cartão.';
        }
        if (is4DigitBrand) {
          if (cardData.cvv.length !== 4) {
            return `O código CVV deve ter 4 dígitos para a bandeira ${brand.toUpperCase()}.`;
          }
        } else if (brand === 'unknown') {
          if (cardData.cvv.length < 3 || cardData.cvv.length > 4) {
            return 'O código CVV deve ter 3 ou 4 dígitos.';
          }
        } else {
          if (cardData.cvv.length < 3 || cardData.cvv.length > 4) {
            return `O código CVV deve ter 3 dígitos para a bandeira ${brand.toUpperCase()}.`;
          }
        }
      }
    }
    return null;
  }, [cartItems, selectedAddress, shippingOption, paymentMethod, cardData, savedCards]);

  const createAndSaveOrder = useCallback(
    (method: 'credit_card' | 'pix' | 'boleto', isDeclined = false) => {
      if (!user || !selectedAddress) return;

      const integrityCheck = validateCheckoutItemsIntegrity(
        user.id,
        cartItems.map((ci) => ({ productId: ci.productId || ci.product.id, quantity: ci.quantity }))
      );

      if (!integrityCheck.valid) {
        setPaymentError(integrityCheck.violationMessage || 'Limite de compras excedido.');
        return;
      }

      const cleanAddressCep = (selectedAddress.cep || '').replace(/\D/g, '');
      const validShippingOptions = calculateShippingOptions(cleanAddressCep);
      const matchedShippingOption =
        validShippingOptions.find(
          (opt: ShippingOption) =>
            opt.id === shippingOption?.id ||
            (shippingOption?.id === 'pac' && opt.id === 'padrao') ||
            (shippingOption?.id === 'sedex' && opt.id === 'expresso')
        ) || shippingOption;

      const verifiedShippingCost = matchedShippingOption ? matchedShippingOption.price : shipping;

      const pricingSummary = calculateOrderTotals({
        subtotal,
        shipping: verifiedShippingCost,
        couponDiscount: discount,
        paymentMethod: method,
        installments: cardData.installments,
      });

      const orderNumber = generateOrderCode();
      const now = new Date();
      const formattedNow = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;

      const newOrder: Order = {
        id: `ord_${user.id}_${Date.now()}`,
        orderNumber,
        userId: user.id,
        createdAt: now.toISOString(),
        status: isDeclined ? 'cancelled' : 'pending',
        paymentMethod: method,
        paymentDetails:
          method === 'credit_card'
            ? {
                brand: cardData.isUsingSavedCard
                  ? savedCards.find((c) => c.id === cardData.savedCardId)?.brand || 'visa'
                  : detectCardBrand(cardData.cardNumber) || 'visa',
                lastFourDigits: cardData.isUsingSavedCard
                  ? savedCards.find((c) => c.id === cardData.savedCardId)?.lastFourDigits || '4242'
                  : cardData.cardNumber.replace(/\D/g, '').slice(-4) || '4242',
                installments: cardData.installments,
              }
            : undefined,
        items: cartItems.map((ci) => ({
          id: ci.id,
          productId: String(ci.productId || ci.product.id),
          name: ci.product.name,
          price: ci.product.price,
          quantity: ci.quantity,
          image: getProductFallbackImage(ci.product.id, ci.product.category) || ci.product.image,
        })),
        totalAmount: subtotal,
        shippingCost: verifiedShippingCost,
        shippingOption: matchedShippingOption
          ? {
              id: matchedShippingOption.id,
              name: matchedShippingOption.name,
              price: matchedShippingOption.price,
              days: matchedShippingOption.days,
            }
          : undefined,
        shippingMethod: matchedShippingOption?.name || 'Transportadora Padrão',
        couponDiscount: discount,
        discountAmount: pricingSummary.totalDiscount,
        interestAmount: pricingSummary.interestAmount,
        finalAmount: pricingSummary.finalAmount,
        deliveryAddress: selectedAddress,
        timeline: isDeclined
          ? [
              { status: 'pending', label: 'Pedido Realizado', timestamp: formattedNow, completed: true },
              { status: 'paid', label: 'Pagamento não Autorizado', timestamp: 'Seu pagamento não foi efetivado', completed: false },
              { status: 'preparing', label: 'Em Separação e Embalagem', timestamp: 'Suspenso', completed: false },
              { status: 'shipped', label: 'Em Transporte', timestamp: 'Código gerado no despacho', completed: false },
              { status: 'delivered', label: 'Entrega Concluída', timestamp: 'Previsão em até 5 dias úteis', completed: false },
            ]
          : [
              { status: 'pending', label: 'Pedido Realizado', timestamp: formattedNow, completed: true },
              {
                status: 'paid',
                label:
                  method === 'pix'
                    ? 'Confirmação do Pagamento (Pix)'
                    : method === 'boleto'
                    ? 'Confirmação do Pagamento (Boleto)'
                    : 'Confirmação do Pagamento',
                timestamp: 'Aguardando Pagamento',
                completed: false,
              },
              { status: 'preparing', label: 'Em Separação e Embalagem', timestamp: 'Aguardando Aprovação', completed: false },
              { status: 'shipped', label: 'Em Transporte', timestamp: 'Código gerado no despacho', completed: false },
              { status: 'delivered', label: 'Entrega Concluída', timestamp: 'Previsão em até 5 dias úteis', completed: false },
            ],
        stepEnteredAt: now.toISOString(),
      };

      saveUserOrder(user.id, newOrder);
      clearCart();
      setCompletedOrder(newOrder);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },
    [user, selectedAddress, cartItems, shippingOption, shipping, subtotal, discount, cardData, savedCards, clearCart]
  );

  const handleFinalizeOrder = useCallback(async () => {
    if (!user) return;
    setSubmitAttempted(true);
    setPaymentError(null);

    const validationErr = getValidationError();
    if (validationErr) {
      setPaymentError(validationErr);
      return;
    }

    const integrityCheck = validateCheckoutItemsIntegrity(
      user.id,
      cartItems.map((ci) => ({ productId: ci.productId || ci.product.id, quantity: ci.quantity }))
    );
    if (!integrityCheck.valid) {
      setPaymentError(integrityCheck.violationMessage || 'Limite de compras excedido.');
      return;
    }

    if (paymentMethod === 'pix') {
      setIsPixModalOpen(true);
      return;
    }

    if (paymentMethod === 'boleto') {
      setIsBoletoModalOpen(true);
      return;
    }

    if (paymentMethod === 'credit_card') {
      setIsProcessing(true);

      const activeSavedCard = savedCards.find((c) => c.id === cardData.savedCardId);
      const lastDigit = activeSavedCard?.lastFourDigits.slice(-1) || cardData.cardNumber.replace(/\D/g, '').slice(-1) || '1';
      let activeCardNum = cardData.cardNumber;
      if (cardData.isUsingSavedCard) {
        if (lastDigit === '1') activeCardNum = '4012888888881881';
        else if (lastDigit === '2') activeCardNum = '4012888888881862';
        else if (lastDigit === '3') activeCardNum = '4012888888881843';
        else activeCardNum = '4012888888881881';
      }

      const cleanAddressCep = (selectedAddress?.cep || '').replace(/\D/g, '');
      const validShippingOptions = calculateShippingOptions(cleanAddressCep);
      const matchedShippingOption =
        validShippingOptions.find(
          (opt: ShippingOption) =>
            opt.id === shippingOption?.id ||
            (shippingOption?.id === 'pac' && opt.id === 'padrao') ||
            (shippingOption?.id === 'sedex' && opt.id === 'expresso')
        ) || shippingOption;

      const verifiedShippingCost = matchedShippingOption ? matchedShippingOption.price : shipping;

      const pricingSummary = calculateOrderTotals({
        subtotal,
        shipping: verifiedShippingCost,
        couponDiscount: discount,
        paymentMethod: 'credit_card',
        installments: cardData.installments,
      });

      const response = await simulateGatewayPayment(
        {
          holderName: cardData.holderName,
          cardNumber: activeCardNum,
          expiryDate: cardData.expiryDate || '12/30',
          cvv: cardData.cvv,
          installments: cardData.installments,
        },
        pricingSummary.finalAmount
      );

      setIsProcessing(false);

      if (!response.success) {
        createAndSaveOrder('credit_card', true);
        return;
      }

      createAndSaveOrder('credit_card', false);
    }
  }, [
    user,
    getValidationError,
    cartItems,
    paymentMethod,
    savedCards,
    cardData,
    selectedAddress?.cep,
    shippingOption,
    shipping,
    subtotal,
    discount,
    createAndSaveOrder,
  ]);

  const handleConfirmPixPayment = useCallback(() => {
    setIsPixModalOpen(false);
    createAndSaveOrder('pix');
  }, [createAndSaveOrder]);

  const handleConfirmBoletoPayment = useCallback(() => {
    setIsBoletoModalOpen(false);
    createAndSaveOrder('boleto');
  }, [createAndSaveOrder]);

  return {
    isProcessing,
    submitAttempted,
    setSubmitAttempted,
    paymentError,
    setPaymentError,
    completedOrder,
    isPixModalOpen,
    setIsPixModalOpen,
    isBoletoModalOpen,
    setIsBoletoModalOpen,
    getValidationError,
    handleFinalizeOrder,
    handleConfirmPixPayment,
    handleConfirmBoletoPayment,
  };
}
