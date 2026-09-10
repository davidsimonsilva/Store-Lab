import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  MapPin,
  CreditCard,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react';
import { Order, OrderStatus } from '../../../../types';
import { generateOrderTimeline } from '../../../../services/orderTimelineService';
import { BUSINESS_CONSTANTS } from '../../../../constants';
import { calculateOrderTotals } from '../../../../utils/pricing';
import { formatCurrencyBRL } from '../../../../utils/formatters';
import { ProductImage } from '../../../../components/ui/ProductImage';
import { getProductFallbackImage } from '../../../../mocks/products';
import {
  orderCardStyle,
  orderCardHeaderStyle,
  orderHeaderMetaStyle,
  orderHeaderActionsStyle,
  orderPriceStyle,
  orderExpandButtonStyle,
  orderStepperContainerStyle,
  orderStepperStyle,
  orderStepTimestampStyle,
  orderTitleStyle,
  orderDateStyle,
  orderCodeBadgeStyle,
  orderCardContentStyle,
  orderItemRowStyle,
  orderItemLeftContainerStyle,
  orderItemImageContainerStyle,
  orderItemDetailsContainerStyle,
  orderItemNameStyle,
  orderItemQuantityStyle,
  orderItemMobilePriceContainerStyle,
  orderItemMobilePriceLabelStyle,
  orderItemMobilePriceValueStyle,
  orderItemDesktopPriceStyle,
  orderFinanceBlockStyle,
  orderFinanceRowStyle,
  orderFinanceLabelStyle,
  orderFinanceValueStyle,
  orderFinanceDiscountLabelStyle,
  orderFinanceDiscountValueStyle,
  orderSummaryFooterStyle,
  orderSummaryPaymentMethodStyle,
  orderSummaryTotalContainerStyle,
  orderSummaryTotalValueStyle,
  orderStatusChipCancelledStyle,
  orderStatusChipDeliveredStyle,
  orderStatusChipShippedStyle,
  orderStatusChipPreparingStyle,
  orderStatusChipPaidStyle,
  orderStatusChipPendingStyle,
  orderCodeBadgePrefixStyle,
  orderCodeBadgeCodeStyle,
  orderStatusSectionHeadingStyle,
  orderAddressRowStyle,
  orderAddressIconBoxStyle,
  orderAddressTitleStyle,
  orderItemsHeadingStyle,
  orderItemsListStyle,
  orderItemProductImgStyle,
  orderSummaryMobileTotalLabelStyle,
  orderSummaryDesktopTotalLabelStyle,
} from '../ProfileOrdersTab.styles';

export const getStatusChip = (status: OrderStatus, timeline?: Order['timeline']) => {
  const hasDeclinedStep = timeline?.some((s) => s.label.includes('não Autorizado') || s.label.includes('não Efetivado'));

  if (status === 'cancelled' || hasDeclinedStep) {
    return (
      <Chip
        icon={<AlertCircle size={13} color="#b91c1c" />}
        label="Pagamento não Autorizado"
        size="small"
        sx={orderStatusChipCancelledStyle}
      />
    );
  }

  switch (status) {
    case 'delivered':
      return (
        <Chip
          icon={<CheckCircle2 size={13} color="#15803d" />}
          label="Entregue"
          size="small"
          sx={orderStatusChipDeliveredStyle}
        />
      );
    case 'shipped':
      return (
        <Chip
          icon={<Truck size={13} color="#1d4ed8" />}
          label="Em Transporte"
          size="small"
          sx={orderStatusChipShippedStyle}
        />
      );
    case 'preparing':
      return (
        <Chip
          icon={<Package size={13} color="#b45309" />}
          label="Em Separação"
          size="small"
          sx={orderStatusChipPreparingStyle}
        />
      );
    case 'paid':
      return (
        <Chip
          icon={<CheckCircle2 size={13} color="#047857" />}
          label="Pagamento Confirmado"
          size="small"
          sx={orderStatusChipPaidStyle}
        />
      );
    case 'pending':
    default:
      return (
        <Chip
          icon={<Clock size={13} color="#475569" />}
          label="Pendente"
          size="small"
          sx={orderStatusChipPendingStyle}
        />
      );
  }
};

export const formatDate = (isoString: string) => {
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
};

interface ProfileOrderCardProps {
  order: Order;
  orderSequence: number;
  isExpanded: boolean;
  onToggleExpand: (orderId: string) => void;
  isMobile: boolean;
}

export const ProfileOrderCard: React.FC<ProfileOrderCardProps> = ({
  order,
  orderSequence,
  isExpanded,
  onToggleExpand,
  isMobile,
}) => {
  const timeline = order.timeline || generateOrderTimeline(order);
  const completedStepIndex = timeline.findIndex((s) => !s.completed);
  const activeStep = completedStepIndex === -1 ? timeline.length : completedStepIndex;

  const instCount = order.paymentDetails?.installments || 1;
  const headerFinalAmount = order.finalAmount;

  return (
    <Box sx={orderCardStyle}>
      <Box
        sx={orderCardHeaderStyle}
        onClick={() => onToggleExpand(order.id)}
      >
        <Box>
          <Box sx={orderHeaderMetaStyle}>
            <Typography variant="subtitle1" sx={orderTitleStyle}>
              Pedido nº {orderSequence}
            </Typography>
            {getStatusChip(order.status, timeline)}
          </Box>

          <Typography sx={orderDateStyle}>
            Comprado em {formatDate(order.createdAt)}
          </Typography>

          <Box
            sx={orderCodeBadgeStyle}
            title="Código do Pedido"
            onClick={(e) => e.stopPropagation()}
          >
            <Typography component="span" sx={orderCodeBadgePrefixStyle}>
              Cód:
            </Typography>
            <Typography component="span" sx={orderCodeBadgeCodeStyle}>
              {order.orderNumber}
            </Typography>
          </Box>
        </Box>

        <Box sx={orderHeaderActionsStyle}>
          <Typography
            variant="h6"
            sx={orderPriceStyle}
          >
            {formatCurrencyBRL(headerFinalAmount)}
          </Typography>

          <IconButton
            size="medium"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(order.id);
            }}
            aria-label={isExpanded ? 'Ocultar detalhes do pedido' : 'Ver detalhes do pedido'}
            sx={orderExpandButtonStyle}
          >
            {isExpanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
          </IconButton>
        </Box>
      </Box>

      <Collapse in={isExpanded}>
        <Box sx={orderCardContentStyle}>

          <Box sx={orderStepperContainerStyle}>
            <Typography variant="subtitle2" sx={orderStatusSectionHeadingStyle}>
              Status do Envio
            </Typography>
            <Stepper
              activeStep={activeStep}
              orientation={isMobile ? 'vertical' : 'horizontal'}
              alternativeLabel={!isMobile}
              sx={orderStepperStyle}
            >
              {timeline.map((step, idx) => {
                const isStepError =
                  !step.completed &&
                  (step.label.includes('não Autorizado') ||
                    step.label.includes('não Efetivado') ||
                    (order.status === 'cancelled' && idx === 1));

                return (
                  <Step key={idx} completed={step.completed}>
                    <StepLabel
                      error={isStepError}
                      optional={
                        <Typography
                          variant="caption"
                          color={isStepError ? 'error.main' : 'text.secondary'}
                          sx={orderStepTimestampStyle(isStepError)}
                        >
                          {step.timestamp}
                        </Typography>
                      }
                    >
                      {step.label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>

          {order.deliveryAddress && (
            <Box sx={orderAddressRowStyle}>
              <Box sx={orderAddressIconBoxStyle}>
                <MapPin size={20} />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={orderAddressTitleStyle}>
                  Entregar em:{' '}
                  {order.deliveryAddress.recipientName &&
                  order.deliveryAddress.recipientName.trim().toLowerCase() !== 'teste'
                    ? `${order.deliveryAddress.recipientName} `
                    : ''}
                  {order.deliveryAddress.label ? `(${order.deliveryAddress.label})` : ''}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {order.deliveryAddress.street}, {order.deliveryAddress.number}
                  {order.deliveryAddress.complement ? ` - ${order.deliveryAddress.complement}` : ''} • {order.deliveryAddress.neighborhood}, {order.deliveryAddress.city} - {order.deliveryAddress.state} • CEP {order.deliveryAddress.cep}
                </Typography>
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" sx={orderItemsHeadingStyle}>
            Itens do Pedido ({order.items.length})
          </Typography>
          <Box sx={orderItemsListStyle}>
            {order.items.map((item) => (
              <Box key={item.id} sx={orderItemRowStyle}>

                <Box sx={orderItemLeftContainerStyle}>
                  <Box sx={orderItemImageContainerStyle}>
                    <ProductImage
                      src={getProductFallbackImage(item.productId || item.id, '') || item.image}
                      fallbackSrc={getProductFallbackImage(item.productId || item.id, '')}
                      alt={item.name}
                      sx={orderItemProductImgStyle}
                    />
                  </Box>

                  <Box sx={orderItemDetailsContainerStyle}>
                    <Typography variant="body2" sx={orderItemNameStyle}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" sx={orderItemQuantityStyle}>
                      Qtd: {item.quantity} × {formatCurrencyBRL(item.price)}
                    </Typography>

                    <Box sx={orderItemMobilePriceContainerStyle}>
                      <Typography variant="caption" sx={orderItemMobilePriceLabelStyle}>
                        Total:
                      </Typography>
                      <Typography variant="body2" sx={orderItemMobilePriceValueStyle}>
                        {formatCurrencyBRL(item.price * item.quantity)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography variant="body2" sx={orderItemDesktopPriceStyle}>
                  {formatCurrencyBRL(item.price * item.quantity)}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={orderFinanceBlockStyle}>
            {(() => {
              const totalQty = order.items.reduce((sum, item) => sum + item.quantity, 0);
              const isCreditCardInstallments = order.paymentMethod === 'credit_card' && instCount > 1;

              const hasInterest = isCreditCardInstallments && (order.interestAmount !== undefined && order.interestAmount > 0);
              const totalInterest = order.interestAmount || 0;

              const subtotalInstallmentVal = isCreditCardInstallments ? order.totalAmount / instCount : order.totalAmount;
              const interestInstallmentVal = hasInterest ? totalInterest / instCount : 0;

              const pricing = calculateOrderTotals({
                subtotal: order.totalAmount,
                shipping: order.shippingCost || 0,
                couponDiscount: order.couponDiscount || 0,
                paymentMethod: order.paymentMethod,
                installments: instCount,
              });

              const cleanShippingName = order.shippingOption?.name || order.shippingMethod || 'Entrega Padrão (PAC)';

              return (
                <>
                  <Box sx={orderFinanceRowStyle}>
                    <Typography variant="body2" sx={orderFinanceLabelStyle}>
                      Subtotal ({totalQty} {totalQty === 1 ? 'item' : 'itens'}):
                    </Typography>
                    <Typography variant="body2" sx={orderFinanceValueStyle}>
                      {isCreditCardInstallments
                        ? `${instCount}x de ${formatCurrencyBRL(subtotalInstallmentVal)}`
                        : formatCurrencyBRL(order.totalAmount)}
                    </Typography>
                  </Box>

                  {hasInterest && (
                    <Box sx={orderFinanceRowStyle}>
                      <Typography variant="body2" sx={orderFinanceLabelStyle}>
                        Juros do parcelamento:
                      </Typography>
                      <Typography variant="body2" sx={orderFinanceValueStyle}>
                        {instCount}x de {formatCurrencyBRL(interestInstallmentVal)}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={orderFinanceRowStyle}>
                    <Typography variant="body2" sx={orderFinanceLabelStyle}>
                      Frete ({cleanShippingName}):
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        ...orderFinanceValueStyle,
                        color: order.shippingCost === 0 ? 'success.main' : 'text.primary',
                      }}
                    >
                      {order.shippingCost === 0 ? 'Grátis' : formatCurrencyBRL(order.shippingCost)}
                    </Typography>
                  </Box>

                  {pricing.couponDiscount > 0 && (
                    <Box sx={orderFinanceRowStyle}>
                      <Typography variant="body2" sx={orderFinanceDiscountLabelStyle}>
                        Desconto Cupom:
                      </Typography>
                      <Typography variant="body2" sx={orderFinanceDiscountValueStyle}>
                        -{formatCurrencyBRL(pricing.couponDiscount)}
                      </Typography>
                    </Box>
                  )}

                  {pricing.pixDiscount > 0 && (
                    <Box sx={orderFinanceRowStyle}>
                      <Typography variant="body2" sx={orderFinanceDiscountLabelStyle}>
                        Desconto Pix ({BUSINESS_CONSTANTS.PIX_DISCOUNT_PERCENTAGE}%):
                      </Typography>
                      <Typography variant="body2" sx={orderFinanceDiscountValueStyle}>
                        -{formatCurrencyBRL(pricing.pixDiscount)}
                      </Typography>
                    </Box>
                  )}

                  {!pricing.couponDiscount && !pricing.pixDiscount && order.discountAmount > 0 && (
                    <Box sx={orderFinanceRowStyle}>
                      <Typography variant="body2" sx={orderFinanceDiscountLabelStyle}>
                        Desconto Cupom:
                      </Typography>
                      <Typography variant="body2" sx={orderFinanceDiscountValueStyle}>
                        -{formatCurrencyBRL(order.discountAmount)}
                      </Typography>
                    </Box>
                  )}
                </>
              );
            })()}
          </Box>
        </Box>

        <Box sx={orderSummaryFooterStyle}>
          <Box sx={orderSummaryPaymentMethodStyle}>
            <CreditCard size={18} color="#64748b" />
            <Typography variant="body2" color="text.secondary">
              Forma de Pagamento:{' '}
              <strong>
                {order.paymentMethod === 'credit_card'
                  ? `Cartão de Crédito (${order.paymentDetails?.brand?.toUpperCase() || ''} •••• ${order.paymentDetails?.lastFourDigits || ''})`
                  : order.paymentMethod === 'pix'
                  ? 'Pix com Desconto'
                  : 'Boleto Bancário'}
              </strong>
            </Typography>
          </Box>

          <Box sx={orderSummaryTotalContainerStyle}>
            <Typography variant="body2" color="text.secondary" sx={orderSummaryMobileTotalLabelStyle}>
              Total do Pedido:
            </Typography>
            <Typography variant="body2" sx={orderSummaryTotalValueStyle}>
              <Box component="span" sx={orderSummaryDesktopTotalLabelStyle}>
                Total:{' '}
              </Box>
              {formatCurrencyBRL(headerFinalAmount)}
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
