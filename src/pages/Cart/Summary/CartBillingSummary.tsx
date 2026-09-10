import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Box,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
} from '@mui/material';
import { formatCurrencyBRL } from '../../../utils/formatters';
import { CreditCard, Truck } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { validateAndFetchCep, calculateShippingOptions, ShippingOption } from '../../../services/cepService';
import { cepSchema } from '../../../schemas/commonSchemas';
import { CouponSection } from '../../../components/CouponSection/CouponSection';
import {
  cartSummaryCardStyle,
  cartSummaryTitleStyle,
  cartSummarySubtotalBlockStyle,
  cartSummaryRowStyle,
  cartSummaryLabelStyle,
  cartSummaryValueStyle,
  cartSummaryShippingBoxStyle,
  cartSummaryShippingTitleStyle,
  cartSummaryShippingInputRowStyle,
  cartSummaryShippingTextFieldStyle,
  cartSummaryShippingConsultButtonStyle,
  cartSummaryShippingErrorStyle,
  cartSummaryShippingOptionsBoxStyle,
  cartSummaryShippingOptionsSubtitleStyle,
  getCartSummaryShippingOptionPaperStyle,
  cartSummaryShippingOptionTextColStyle,
  cartSummaryShippingOptionNameStyle,
  cartSummaryShippingOptionDaysStyle,
  getCartSummaryShippingOptionPriceStyle,
  cartSummaryCouponWrapperStyle,
  cartSummaryConsolidationBlockStyle,
  cartSummaryDiscountRowStyle,
  cartSummaryTotalRowStyle,
  cartSummaryTotalLabelStyle,
  cartSummaryTotalAmountStyle,
  cartSummaryCheckoutButtonStyle,
} from './CartBillingSummary.styles';

interface CartBillingSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  discountApplied: boolean;
  coupon: string;
  couponError: string | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  onClearError: () => void;
  onCheckout: () => void;
  isCheckingOut?: boolean;
}

export const CartBillingSummary: React.FC<CartBillingSummaryProps> = ({
  subtotal,
  shipping,
  discount,
  total,
  discountApplied,
  coupon,
  couponError,
  onApplyCoupon,
  onRemoveCoupon,
  onClearError,
  onCheckout,
  isCheckingOut = false,
}) => {
  const { shippingOption, setShippingOption } = useCart();
  const [cepInput, setCepInput] = useState(shippingOption?.cep || '');
  const [cepError, setCepError] = useState<string | null>(null);
  const [loadingCep, setLoadingCep] = useState(false);
  const [calculatedOptions, setCalculatedOptions] = useState<ShippingOption[] | null>(
    shippingOption ? calculateShippingOptions(shippingOption.cep) : null
  );

  useEffect(() => {
    if (shippingOption?.cep) {
      setCepInput(shippingOption.cep);
      setCalculatedOptions(calculateShippingOptions(shippingOption.cep));
    } else {
      setCepInput('');
      setCalculatedOptions(null);
      setCepError(null);
    }
  }, [shippingOption]);

  const handleCalculateShipping = async () => {
    try {
      cepSchema.validateSync(cepInput);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'CEP inválido';
      setCepError(msg);
      setCalculatedOptions(null);
      return;
    }

    setLoadingCep(true);
    const res = await validateAndFetchCep(cepInput);
    setLoadingCep(false);

    if (!res.valid) {
      setCepError(res.error || 'CEP inválido');
      setCalculatedOptions(null);
      return;
    }

    setCepInput(res.formattedCep);
    setCepError(null);

    const options = res.options || [];
    setCalculatedOptions(options);

    if (options.length > 0) {
      const defaultOpt = options[0];
      setShippingOption({
        id: defaultOpt.id,
        name: defaultOpt.name,
        price: defaultOpt.price,
        days: defaultOpt.days,
        cep: res.formattedCep,
      });
    }
  };

  const handleSelectOption = (opt: ShippingOption) => {
    setShippingOption({
      id: opt.id,
      name: opt.name,
      price: opt.price,
      days: opt.days,
      cep: cepInput,
    });
  };

  return (
    <Card sx={cartSummaryCardStyle}>

      <Typography variant="h6" sx={cartSummaryTitleStyle}>
        Resumo do Pedido
      </Typography>

      <Box sx={cartSummarySubtotalBlockStyle}>
        <Typography variant="body2" sx={cartSummaryLabelStyle}>
          Subtotal dos Produtos
        </Typography>
        <Typography variant="body2" sx={cartSummaryValueStyle}>
          {formatCurrencyBRL(subtotal)}
        </Typography>
      </Box>

      <Box sx={cartSummaryShippingBoxStyle}>
        <Typography variant="caption" sx={cartSummaryShippingTitleStyle}>
          <Truck size={16} color="#2563eb" />
          CALCULAR FRETE E PRAZO
        </Typography>

        <Box sx={cartSummaryShippingInputRowStyle}>
          <TextField
            variant="outlined"
            placeholder="Ex: 01311-200"
            size="small"
            value={cepInput}
            error={!!cepError}
            onChange={(e) => {
              const raw = e.target.value;
              const clean = raw.replace(/\D/g, '').slice(0, 8);
              let formatted = clean;
              if (clean.length > 5) {
                formatted = `${clean.slice(0, 5)}-${clean.slice(5)}`;
              }
              setCepInput(formatted);
              setCepError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleCalculateShipping();
              }
            }}
            slotProps={{
              input: {
                sx: { borderRadius: '10px', fontSize: '0.875rem' },
              },
              htmlInput: {
                maxLength: 9,
              },
            }}
            sx={cartSummaryShippingTextFieldStyle}
          />
          <Button
            variant="contained"
            size="small"
            onClick={handleCalculateShipping}
            disabled={loadingCep || !cepInput || cepInput.replace(/\D/g, '').length !== 8}
            sx={cartSummaryShippingConsultButtonStyle}
          >
            {loadingCep ? 'Consultando...' : 'Consultar'}
          </Button>
        </Box>

        {cepError && (
          <Typography variant="caption" sx={cartSummaryShippingErrorStyle}>
            {cepError}
          </Typography>
        )}

        {calculatedOptions && calculatedOptions.length > 0 && (
          <Box sx={cartSummaryShippingOptionsBoxStyle}>
            <Typography variant="caption" sx={cartSummaryShippingOptionsSubtitleStyle}>
              Opções de entrega:
            </Typography>
            <RadioGroup
              value={shippingOption?.id || ''}
              onChange={(e) => {
                const opt = calculatedOptions.find((o) => o.id === e.target.value);
                if (opt) {
                  handleSelectOption(opt);
                }
              }}
              sx={{ gap: 0.75 }}
            >
              {calculatedOptions.map((opt) => {
                const isSelected = shippingOption?.id === opt.id && shippingOption?.cep === cepInput;
                return (
                  <Paper
                    key={opt.id}
                    variant="outlined"
                    onClick={() => handleSelectOption(opt)}
                    sx={getCartSummaryShippingOptionPaperStyle(isSelected)}
                  >
                    <FormControlLabel
                      value={opt.id}
                      control={<Radio size="small" checked={isSelected} sx={{ p: 0.5 }} />}
                      label={
                        <Box sx={cartSummaryShippingOptionTextColStyle}>
                          <Typography variant="body2" sx={cartSummaryShippingOptionNameStyle}>
                            {opt.name}
                          </Typography>
                          <Typography variant="caption" sx={cartSummaryShippingOptionDaysStyle}>
                            Chega em até {opt.days} {opt.days === 1 ? 'dia útil' : 'dias úteis'}
                          </Typography>
                        </Box>
                      }
                      sx={{ m: 0 }}
                    />
                    <Typography
                      variant="body2"
                      sx={getCartSummaryShippingOptionPriceStyle(opt.price === 0)}
                    >
                      {opt.price === 0 ? 'Grátis' : formatCurrencyBRL(opt.price)}
                    </Typography>
                  </Paper>
                );
              })}
            </RadioGroup>
          </Box>
        )}
      </Box>

      <Box sx={cartSummaryCouponWrapperStyle}>
        <CouponSection
          couponCode={coupon}
          discountApplied={discountApplied}
          couponError={couponError}
          onApplyCoupon={onApplyCoupon}
          onRemoveCoupon={onRemoveCoupon}
          onClearError={onClearError}
          disabled={isCheckingOut}
        />
      </Box>

      <Box sx={cartSummaryConsolidationBlockStyle}>
        <Box sx={cartSummaryRowStyle}>
          <Typography variant="body2" sx={cartSummaryLabelStyle}>
            Frete {shippingOption?.name ? `(${shippingOption.name})` : ''}
          </Typography>
          {!shippingOption ? (
            <Typography
              variant="body2"
              sx={{ ...cartSummaryLabelStyle, fontStyle: 'italic' }}
            >
              A calcular
            </Typography>
          ) : shipping === 0 ? (
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#10b981' }}>
              Grátis
            </Typography>
          ) : (
            <Typography variant="body2" sx={cartSummaryValueStyle}>
              {formatCurrencyBRL(shipping)}
            </Typography>
          )}
        </Box>

        {discountApplied && (
          <Box sx={cartSummaryDiscountRowStyle}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Desconto ({coupon || 'Cupom'})
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              -{formatCurrencyBRL(discount)}
            </Typography>
          </Box>
        )}

        <Box sx={cartSummaryTotalRowStyle}>
          <Typography variant="subtitle1" sx={cartSummaryTotalLabelStyle}>
            Total Geral
          </Typography>
          <Typography variant="h5" sx={cartSummaryTotalAmountStyle}>
            {formatCurrencyBRL(total)}
          </Typography>
        </Box>
      </Box>

      <Button
        onClick={onCheckout}
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        disabled={isCheckingOut}
        startIcon={isCheckingOut ? undefined : <CreditCard size={18} />}
        sx={cartSummaryCheckoutButtonStyle}
      >
        {isCheckingOut ? 'Processando...' : 'Continuar compra'}
      </Button>
    </Card>
  );
};

export default CartBillingSummary;
