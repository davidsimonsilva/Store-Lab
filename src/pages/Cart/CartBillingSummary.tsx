import React, { useState, useEffect } from 'react';
import { Card, Typography, Box, Divider, TextField, Button, CircularProgress } from '@mui/material';
import { formatCurrencyBRL } from '../../utils/formatters';
import { CreditCard, ShieldCheck } from 'lucide-react';

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
  isCheckingOut: boolean;
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
  isCheckingOut,
}) => {
  const [inputValue, setInputValue] = useState(coupon);

  useEffect(() => {
    setInputValue(coupon);
  }, [coupon]);

  const isAppliedActiveCoupon = 
    discountApplied && 
    inputValue.trim().toUpperCase() === coupon.trim().toUpperCase() && 
    coupon.trim() !== '';

  return (
    <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
      <Typography variant="h6" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 3, color: '#0f172a' }}>
        Resumo do Pedido
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#64748b' }}>Subtotal</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>{formatCurrencyBRL(subtotal)}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#64748b' }}>Frete</Typography>
        {shipping === 0 ? (
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#10b981' }}>Grátis</Typography>
        ) : (
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>{formatCurrencyBRL(shipping)}</Typography>
        )}
      </Box>

      {discountApplied && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, color: '#10b981' }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>Desconto ({coupon || 'LAB10'})</Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>-{formatCurrencyBRL(discount)}</Typography>
        </Box>
      )}

      <Divider sx={{ my: 2.5 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>Total Geral</Typography>
        <Typography variant="h5" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, color: '#1e3a8a' }}>
          {formatCurrencyBRL(total)}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 1 }}>
          POSSUI UM CUPOM DE DESCONTO?
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField 
            variant="outlined" 
            placeholder="Ex: LAB10" 
            size="small"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (couponError) {
                onClearError();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (inputValue.trim() && !isAppliedActiveCoupon) {
                  onApplyCoupon(inputValue);
                }
              }
            }}
            sx={{ 
              flexGrow: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                height: '40px'
              }
            }}
          />
          {isAppliedActiveCoupon ? (
            <Button 
              variant="outlined"
              color="error"
              size="small"
              onClick={onRemoveCoupon}
              sx={{ 
                borderRadius: '8px', 
                borderStyle: 'solid', 
                borderWidth: '1.5px', 
                fontWeight: 700,
                color: '#ef4444',
                borderColor: '#fca5a5',
                height: '40px',
                px: 2,
                '&:hover': {
                  borderColor: '#ef4444',
                  bgcolor: '#fef2f2'
                }
              }}
            >
              Retirar
            </Button>
          ) : (
            <Button 
              variant="outlined"
              size="small"
              onClick={() => onApplyCoupon(inputValue)}
              disabled={!inputValue.trim()}
              sx={{ 
                borderRadius: '8px', 
                borderStyle: 'solid', 
                borderWidth: '1.5px', 
                fontWeight: 700,
                height: '40px',
                px: 2
              }}
            >
              Aplicar
            </Button>
          )}
        </Box>
        {couponError && (
          <Typography variant="caption" sx={{ color: '#ef4444', display: 'block', mt: 1, fontWeight: 600 }}>
            {couponError}
          </Typography>
        )}
        <Typography variant="caption" sx={{ color: '#10b981', display: 'block', mt: 1, fontWeight: 500 }}>
          Dica: use o cupom <strong>LAB10</strong> para 10% de desconto!
        </Typography>
      </Box>

      <Button 
        onClick={onCheckout}
        variant="contained" 
        color="primary"
        fullWidth 
        size="large"
        disabled={isCheckingOut}
        startIcon={isCheckingOut ? <CircularProgress size={16} color="inherit" /> : <CreditCard size={18} />}
        sx={{ 
          py: 1.8, 
          borderRadius: '50px', 
          fontFamily: '"Space Grotesk", sans-serif', 
          fontWeight: 700,
          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
        }}
      >
        {isCheckingOut ? 'Processando...' : 'Finalizar Compra'}
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 3, color: '#64748b' }}>
        <ShieldCheck size={16} color="#2563eb" />
        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          Ambiente Seguro & Criptografado
        </Typography>
      </Box>
    </Card>
  );
};

export default CartBillingSummary;
