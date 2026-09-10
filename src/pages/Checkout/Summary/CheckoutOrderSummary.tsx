import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Chip,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
} from '@mui/material';
import {
  Tag,
  CheckCircle2,
  CreditCard,
  Truck,
  QrCode,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { BUSINESS_CONSTANTS } from '../../../constants';
import { CartItem, Address } from '../../../types';
import { formatCurrencyBRL } from '../../../utils/formatters';
import { calculateOrderTotals } from '../../../utils/pricing';
import { CustomAlert } from '../../../components/ui/CustomAlert';
import { useCart } from '../../../context/CartContext';
import { calculateShippingOptions, ShippingOption } from '../../../services/cepService';
import { CouponSection } from '../../../components/CouponSection/CouponSection';
import {
  summaryContainerStyle,
  summaryTitleStyle,
  summaryLineRowStyle,
  summaryTotalRowStyle,
  summaryTotalAmountStyle,
  summaryFinanceBlockStyle,
  summaryShippingSectionStyle,
  summaryCouponSectionStyle,
  summaryCheckoutButtonStyle,
} from './CheckoutOrderSummary.styles';

interface CheckoutOrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode: string;
  discountApplied: boolean;
  couponError: string | null;
  paymentMethod?: 'credit_card' | 'pix' | 'boleto';
  installments?: number;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  onClearCouponError: () => void;
  onFinalizeOrder: () => void;
  isProcessing: boolean;
  canFinalize: boolean;
  selectedAddress?: Address | null;
  paymentError?: string | null;
  onClearPaymentError?: () => void;
}

export const CheckoutOrderSummary: React.FC<CheckoutOrderSummaryProps> = ({
  cartItems,
  subtotal,
  shipping,
  discount,
  total,
  couponCode,
  discountApplied,
  couponError,
  paymentMethod = 'credit_card',
  installments = 1,
  onApplyCoupon,
  onRemoveCoupon,
  onClearCouponError,
  onFinalizeOrder,
  isProcessing,
  canFinalize,
  selectedAddress,
  paymentError,
  onClearPaymentError,
}) => {
  const { shippingOption, setShippingOption } = useCart();
  const [calculatedOptions, setCalculatedOptions] = useState<ShippingOption[] | null>(null);

  useEffect(() => {
    if (selectedAddress?.cep) {
      const cleanCep = selectedAddress.cep.replace(/\D/g, '');
      const options = calculateShippingOptions(cleanCep);
      setCalculatedOptions(options);

      if (!shippingOption || shippingOption.cep !== selectedAddress.cep) {
        if (options.length > 0) {
          const defaultOpt = options[0];
          setShippingOption({
            id: defaultOpt.id,
            name: defaultOpt.name,
            price: defaultOpt.price,
            days: defaultOpt.days,
            cep: selectedAddress.cep,
          });
        }
      }
    } else {
      setCalculatedOptions(null);
      if (shippingOption) {
        setShippingOption(null);
      }
    }
  }, [selectedAddress]);

  const handleSelectOption = (opt: ShippingOption) => {
    if (!selectedAddress?.cep) return;
    setShippingOption({
      id: opt.id,
      name: opt.name,
      price: opt.price,
      days: opt.days,
      cep: selectedAddress.cep,
    });
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const pricingSummary = calculateOrderTotals({
    subtotal,
    shipping,
    couponDiscount: discount,
    paymentMethod,
    installments,
  });

  const {
    pixDiscount,
    hasInterest,
    interestAmount,
    finalAmount: displayTotal,
  } = pricingSummary;

  return (
    <Box sx={summaryContainerStyle}>
      <Typography variant="h6" sx={{ ...summaryTitleStyle, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            color: '#ffffff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          3
        </Box>
        Resumo do Pedido ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'})
      </Typography>

      <Box sx={summaryShippingSectionStyle}>
        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.75, letterSpacing: '0.02em', fontSize: '0.725rem' }}>
          <Truck size={13} color="#2563eb" /> OPÇÕES DE ENTREGA
        </Typography>

        {selectedAddress && calculatedOptions && calculatedOptions.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <RadioGroup
              value={shippingOption?.id || calculatedOptions[0].id}
              onChange={(e) => {
                const opt = calculatedOptions.find(o => o.id === e.target.value);
                if (opt) {
                  handleSelectOption(opt);
                }
              }}
            >
              {calculatedOptions.map((opt) => {
                const isSelected = shippingOption?.id === opt.id;
                return (
                  <Paper
                    key={opt.id}
                    variant="outlined"
                    onClick={() => handleSelectOption(opt)}
                    sx={{
                      p: 0.75,
                      px: 1.25,
                      mb: 0.5,
                      borderRadius: '8px',
                      borderColor: isSelected ? '#2563eb' : '#e2e8f0',
                      bgcolor: isSelected ? '#eff6ff' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        borderColor: '#2563eb',
                        bgcolor: '#f8fafc'
                      }
                    }}
                  >
                    <FormControlLabel
                      value={opt.id}
                      control={<Radio size="small" checked={isSelected} sx={{ p: 0.5 }} />}
                      label={
                        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 0.25 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a', fontSize: '0.785rem', lineHeight: 1.15 }}>
                            {opt.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 500 }}>
                            Chega em até {opt.days} {opt.days === 1 ? 'dia útil' : 'dias úteis'}
                          </Typography>
                        </Box>
                      }
                      sx={{ m: 0 }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: opt.price === 0 ? '#10b981' : '#2563eb', fontSize: '0.8rem' }}>
                      {opt.price === 0 ? 'Grátis' : formatCurrencyBRL(opt.price)}
                    </Typography>
                  </Paper>
                );
              })}
            </RadioGroup>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#94a3b8', fontStyle: 'italic', display: 'block', mb: 0.25, fontSize: '0.7rem' }}>
              Selecione um endereço de entrega para visualizar os fretes.
            </Typography>
            {[
              { id: 'padrao_disabled', name: 'Envio Padrão' },
              { id: 'expresso_disabled', name: 'Envio Expresso' },
            ].map((opt) => (
              <Paper
                key={opt.id}
                variant="outlined"
                sx={{
                  p: 0.75,
                  px: 1.25,
                  mb: 0.5,
                  borderRadius: '8px',
                  borderColor: '#e2e8f0',
                  bgcolor: '#f8fafc',
                  opacity: 0.6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <FormControlLabel
                  disabled
                  value={opt.id}
                  control={<Radio size="small" disabled checked={false} sx={{ p: 0.5 }} />}
                  label={
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 0.25 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#94a3b8', fontSize: '0.785rem' }}>
                        {opt.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>
                        Indisponível (Sem endereço)
                      </Typography>
                    </Box>
                  }
                  sx={{ m: 0 }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#94a3b8', fontSize: '0.8rem' }}>
                  --
                </Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Box>

      <Box sx={summaryCouponSectionStyle}>
        <CouponSection
          couponCode={couponCode}
          discountApplied={discountApplied}
          couponError={couponError}
          onApplyCoupon={onApplyCoupon}
          onRemoveCoupon={onRemoveCoupon}
          onClearError={onClearCouponError}
          disabled={isProcessing}
          compact
        />
      </Box>

      <Box sx={summaryFinanceBlockStyle}>
        <Box sx={summaryLineRowStyle}>
          <Typography variant="body2" color="text.secondary">
            Subtotal{` (${totalItemsCount} ${totalItemsCount === 1 ? 'item' : 'itens'}):`}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {paymentMethod === 'credit_card' && installments > 1
              ? `${installments}x de ${formatCurrencyBRL(subtotal / installments)}`
              : formatCurrencyBRL(subtotal)}
          </Typography>
        </Box>

        {hasInterest && interestAmount > 0 && (
          <Box sx={summaryLineRowStyle}>
            <Typography variant="body2" color="text.secondary">
              Juros:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {installments}x de {formatCurrencyBRL(interestAmount / installments)}
            </Typography>
          </Box>
        )}

        <Box sx={summaryLineRowStyle}>
          <Typography variant="body2" color="text.secondary">
            Frete ({shippingOption?.name || 'Envio Padrão'}):
          </Typography>
          {!shippingOption ? (
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              A calcular
            </Typography>
          ) : shipping === 0 ? (
            <Chip
              label="GRÁTIS"
              size="small"
              color="success"
              sx={{ fontWeight: 800, fontSize: '0.65rem', height: 20 }}
            />
          ) : (
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {formatCurrencyBRL(shipping)}
            </Typography>
          )}
        </Box>

        {discount > 0 && (
          <Box sx={summaryLineRowStyle}>
            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
              Desconto{couponCode ? ` (${couponCode})` : ''}:
            </Typography>
            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 700 }}>
              - {formatCurrencyBRL(discount)}
            </Typography>
          </Box>
        )}

        {paymentMethod === 'pix' && pixDiscount > 0 && (
          <Box sx={summaryLineRowStyle}>
            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
              Desconto PIX ({BUSINESS_CONSTANTS.PIX_DISCOUNT_PERCENTAGE}% à vista):
            </Typography>
            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 700 }}>
              - {formatCurrencyBRL(pixDiscount)}
            </Typography>
          </Box>
        )}

        <Box sx={summaryTotalRowStyle}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
            Total Geral:
          </Typography>
          <Typography
            variant="h6"
            sx={summaryTotalAmountStyle}
          >
            {formatCurrencyBRL(displayTotal)}
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        size="large"
        disabled={isProcessing}
        onClick={onFinalizeOrder}
        startIcon={
          isProcessing ? (
            <CircularProgress size={18} color="inherit" />
          ) : paymentMethod === 'pix' ? (
            <QrCode size={18} />
          ) : paymentMethod === 'boleto' ? (
            <FileText size={18} />
          ) : (
            <CreditCard size={18} />
          )
        }
        sx={summaryCheckoutButtonStyle}
      >
        {isProcessing
          ? 'Processando...'
          : paymentMethod === 'pix'
          ? 'Pagar com Pix'
          : paymentMethod === 'boleto'
          ? 'Gerar Boleto Bancário'
          : 'Finalizar Compra'}
      </Button>

      {paymentError && (
        <CustomAlert
          severity="error"
          onClose={onClearPaymentError}
          sx={{ mt: 1.5 }}
        >
          {paymentError}
        </CustomAlert>
      )}
    </Box>
  );
};
