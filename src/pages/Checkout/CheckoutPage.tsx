import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Chip,
} from '@mui/material';
import {
  ShoppingBag,
  ArrowLeft,
  MapPin,
  CreditCard,
} from 'lucide-react';
import { calculateOrderTotals } from '../../utils/pricing';
import { formatUrlName } from '../../utils/formatters';
import { CheckoutAddressSelector } from './Address/CheckoutAddressSelector';
import { CheckoutPaymentSelector } from './Payment/CheckoutPaymentSelector';
import { CheckoutOrderSummary } from './Summary/CheckoutOrderSummary';
import { CheckoutSuccessView } from './Success/CheckoutSuccessView';
import { CheckoutPixModal } from './Modals/CheckoutPixModal';
import { CheckoutBoletoModal } from './Modals/CheckoutBoletoModal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useCheckoutState } from './hooks/useCheckoutState';
import {
  checkoutContainerStyle,
  checkoutTitleStyle,
  checkoutSubtitleStyle,
  checkoutStepBoxStyle,
  checkoutStepHeaderStyle,
  checkoutStepTitleWrapperStyle,
  checkoutStepTitleStyle,
  checkoutStepBadgeStyle,
  checkoutStickySummaryStyle,
} from './CheckoutPage.styles';

export const CheckoutPage: React.FC = () => {
  useDocumentTitle({
    title: 'Finalizar Compra',
    description: 'Finalize sua compra com segurança na StoreLab. Pagamento disponível via Cartão de Crédito, PIX e Boleto Bancário.',
    ogTitle: 'Finalizar Compra',
    ogDescription: 'Ambiente seguro e criptografado para conclusão do seu pedido.',
  });

  const {
    user,
    navigate,
    cartItems,
    subtotal,
    shipping,
    discount,
    total,
    couponCode,
    discountApplied,
    couponError,
    applyCoupon,
    removeCoupon,
    clearCouponError,
    addresses,
    selectedAddress,
    setSelectedAddress,
    loadUserData,
    savedCards,
    paymentMethod,
    setPaymentMethod,
    cardData,
    setCardData,
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
  } = useCheckoutState();

  if (completedOrder) {
    const ordersUrl = user?.name ? `/perfil/${formatUrlName(user.name)}?tab=orders` : '/perfil?tab=orders';
    return (
      <CheckoutSuccessView
        order={completedOrder}
        onGoToOrders={() => navigate(ordersUrl)}
        onGoToStore={() => navigate('/')}
      />
    );
  }

  if (cartItems.length === 0) {
    return (
      <Box sx={{ ...checkoutContainerStyle, textAlign: 'center', py: 8 }}>
        <ShoppingBag size={56} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
          Seu carrinho está vazio
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 450, mx: 'auto' }}>
          Adicione produtos ao seu carrinho antes de prosseguir para a tela de revisão e pagamento.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          startIcon={<ArrowLeft size={18} />}
          sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 700, px: 3 }}
        >
          Explorar Catálogo
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={checkoutContainerStyle}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowLeft size={16} />}
          onClick={() => navigate('/carrinho')}
          sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary', mb: 1, p: 0, minWidth: 'auto', alignSelf: 'flex-start' }}
        >
          Voltar ao Carrinho
        </Button>
        <Typography variant="h4" sx={checkoutTitleStyle}>
          Finalizar Compra & Checkout
        </Typography>
        <Typography variant="body2" sx={checkoutSubtitleStyle}>
          Revise seus itens, escolha o endereço e selecione o método de pagamento seguro.
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2.5, md: 4 }}>

        <Grid size={{ xs: 12, md: 7.2 }}>

          <Box
            sx={{
              ...checkoutStepBoxStyle,
              ...(submitAttempted && !selectedAddress && {
                borderColor: '#ef4444',
                boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.15)',
              }),
            }}
          >
            <Box sx={checkoutStepHeaderStyle}>
              <Box sx={checkoutStepTitleWrapperStyle}>
                <Box
                  sx={{
                    ...checkoutStepBadgeStyle,
                    ...(submitAttempted && !selectedAddress && {
                      bgcolor: '#ef4444',
                    }),
                  }}
                >
                  1
                </Box>
                <MapPin size={20} color={submitAttempted && !selectedAddress ? '#ef4444' : '#2563eb'} />
                <Typography variant="h6" sx={checkoutStepTitleStyle}>
                  Endereço de Entrega
                </Typography>
              </Box>

              {submitAttempted && !selectedAddress && (
                <Chip
                  label="Endereço Obrigatório"
                  color="error"
                  size="small"
                  sx={{ fontWeight: 700, fontSize: '0.725rem', height: 24 }}
                />
              )}
            </Box>

            <CheckoutAddressSelector
              user={user!}
              addresses={addresses}
              selectedAddressId={selectedAddress?.id || null}
              onSelectAddress={(addr) => setSelectedAddress(addr)}
              onRefreshAddresses={loadUserData}
            />
          </Box>

          {(() => {
            const isCardMissing =
              paymentMethod === 'credit_card' &&
              ((cardData.isUsingSavedCard && (!cardData.savedCardId || !cardData.cvv)) ||
                (!cardData.isUsingSavedCard &&
                  (!cardData.holderName.trim() ||
                    !cardData.cardNumber.trim() ||
                    !cardData.expiryDate.trim() ||
                    !cardData.cvv.trim())));
            const isStep2Missing = submitAttempted && isCardMissing;

            return (
              <Box
                sx={{
                  ...checkoutStepBoxStyle,
                  ...(isStep2Missing && {
                    borderColor: '#ef4444',
                    boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.15)',
                  }),
                }}
              >
                <Box sx={checkoutStepHeaderStyle}>
                  <Box sx={checkoutStepTitleWrapperStyle}>
                    <Box
                      sx={{
                        ...checkoutStepBadgeStyle,
                        ...(isStep2Missing && {
                          bgcolor: '#ef4444',
                        }),
                      }}
                    >
                      2
                    </Box>
                    <CreditCard size={20} color={isStep2Missing ? '#ef4444' : '#2563eb'} />
                    <Typography variant="h6" sx={checkoutStepTitleStyle}>
                      Forma de Pagamento
                    </Typography>
                  </Box>

                  {isStep2Missing && (
                    <Chip
                      label="Preencha o Pagamento"
                      color="error"
                      size="small"
                      sx={{ fontWeight: 700, fontSize: '0.725rem', height: 24 }}
                    />
                  )}
                </Box>

                <CheckoutPaymentSelector
                  paymentMethod={paymentMethod}
                  onChangePaymentMethod={(m) => {
                    setPaymentMethod(m);
                    setPaymentError(null);
                    setSubmitAttempted(false);
                  }}
                  savedCards={savedCards}
                  cardData={cardData}
                  onChangeCardData={(updater) => {
                    setCardData(updater);
                    setSubmitAttempted(false);
                  }}
                  totalAmount={total}
                  user={user!}
                  showErrors={submitAttempted}
                />
              </Box>
            );
          })()}
        </Grid>

        <Grid size={{ xs: 12, md: 4.8 }} sx={checkoutStickySummaryStyle}>
          <CheckoutOrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            discount={discount}
            total={total}
            couponCode={couponCode}
            discountApplied={discountApplied}
            couponError={couponError}
            paymentMethod={paymentMethod}
            installments={cardData.installments}
            onApplyCoupon={applyCoupon}
            onRemoveCoupon={removeCoupon}
            onClearCouponError={clearCouponError}
            onFinalizeOrder={handleFinalizeOrder}
            isProcessing={isProcessing}
            canFinalize={getValidationError() === null}
            selectedAddress={selectedAddress}
            paymentError={paymentError}
            onClearPaymentError={() => setPaymentError(null)}
          />
        </Grid>
      </Grid>

      <CheckoutPixModal
        open={isPixModalOpen}
        totalAmount={
          calculateOrderTotals({
            subtotal,
            shipping,
            couponDiscount: discount,
            paymentMethod: 'pix',
          }).finalAmount
        }
        onClose={() => setIsPixModalOpen(false)}
        onConfirmPayment={handleConfirmPixPayment}
      />

      <CheckoutBoletoModal
        open={isBoletoModalOpen}
        totalAmount={
          calculateOrderTotals({
            subtotal,
            shipping,
            couponDiscount: discount,
            paymentMethod: 'boleto',
          }).finalAmount
        }
        userEmail={user?.email}
        onClose={() => setIsBoletoModalOpen(false)}
        onConfirmPayment={handleConfirmBoletoPayment}
      />
    </Box>
  );
};

export default CheckoutPage;
