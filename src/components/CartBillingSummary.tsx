import React from 'react';
import { Card, Typography, Box, Divider, TextField, Button, CircularProgress } from '@mui/material';
import { CreditCard, ShieldCheck } from 'lucide-react';

interface CartBillingSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  discountApplied: boolean;
  coupon: string;
  onCouponChange: (val: string) => void;
  couponError: string | null;
  onApplyCoupon: () => void;
  onCheckout: () => void;
  isCheckingOut: boolean;
  formatBRL: (val: number) => string;
}

export const CartBillingSummary: React.FC<CartBillingSummaryProps> = ({
  subtotal,
  shipping,
  discount,
  total,
  discountApplied,
  coupon,
  onCouponChange,
  couponError,
  onApplyCoupon,
  onCheckout,
  isCheckingOut,
  formatBRL,
}) => {
  return (
    <Card sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0', bgcolor: '#ffffff' }}>
      <Typography variant="h6" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 3, color: '#0f172a' }}>
        Resumo do Pedido
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#64748b' }}>Subtotal</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>{formatBRL(subtotal)}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2" sx={{ color: '#64748b' }}>Frete</Typography>
        {shipping === 0 ? (
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#10b981' }}>Grátis</Typography>
        ) : (
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#0f172a' }}>{formatBRL(shipping)}</Typography>
        )}
      </Box>

      {discountApplied && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, color: '#10b981' }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>Desconto (LAB10)</Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>-{formatBRL(discount)}</Typography>
        </Box>
      )}

      <Divider sx={{ my: 2.5 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>Total Geral</Typography>
        <Typography variant="h5" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, color: '#1e3a8a' }}>
          {formatBRL(total)}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 1 }}>
          POSSUI UM CUPOM DE DESCONTO?
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField 
            variant="outlined" 
            placeholder="Ex: LAB10" 
            size="small"
            value={coupon}
            onChange={(e) => onCouponChange(e.target.value)}
            disabled={discountApplied}
            sx={{ 
              flexGrow: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px'
              }
            }}
          />
          <Button 
            variant="outlined"
            size="small"
            onClick={onApplyCoupon}
            disabled={discountApplied || !coupon}
            sx={{ borderRadius: '8px', borderStyle: 'solid', borderWidth: '1.5px', fontWeight: 700 }}
          >
            Aplicar
          </Button>
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
