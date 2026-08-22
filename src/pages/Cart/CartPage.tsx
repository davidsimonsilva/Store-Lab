import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  Grid, 
  Typography, 
  Box, 
  Button, 
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { 
  CheckCircle2, 
  CreditCard,
  Lock,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatUrlName } from '../../context/AppStateContext';
import { CartItem } from './CartItem/CartItem';
import { CartBillingSummary } from './CartBillingSummary';
import { formatCurrencyBRL } from '../../utils/formatters';
import { PageContainer } from '../../components/ui/PageContainer';
import {
  cartHeaderStyle,
  cartTitleStyle,
  cartSubtitleStyle,
  cartAlertStyle,
  emptyCartContainerStyle,
  emptyCartCardStyle,
  emptyCartIconBoxStyle,
  checkoutDialogPaperStyle,
} from './Cart.styles';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, anonymousUserId } = useAuth();
  
  const { 
    cartItems, 
    subtotal, 
    shipping, 
    discount, 
    total, 
    discountApplied, 
    couponCode, 
    couponError, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    applyCoupon, 
    removeCoupon, 
    clearCouponError 
  } = useCart();

  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    document.title = 'Store-lab';
  }, []);

  const isUserLoggedIn = user && user.isLoggedIn;

  const handleNavigateToProduct = (pId: string, name: string) => {
    const pName = formatUrlName(name);
    navigate(`/produto/${pName}-${pId}`);
  };

  const handleCheckoutClick = () => {
    if (!isUserLoggedIn) {
      navigate(`/login?redirect=carrinho&anonId=${anonymousUserId}`);
      return;
    }
    setCheckoutDialogOpen(true);
  };

  const handleConfirmCheckout = () => {
    setIsProcessingCheckout(true);
    setTimeout(() => {
      setIsProcessingCheckout(false);
      setCheckoutSuccess(true);
      clearCart();
    }, 1500);
  };

  const handleCloseDialog = () => {
    if (isProcessingCheckout) return;
    setCheckoutDialogOpen(false);
    setCheckoutSuccess(false);
  };

  return (
    <PageContainer maxWidth="lg" py={6}>
      {cartItems.length === 0 ? (
        <Box sx={emptyCartContainerStyle}>
          <Box sx={emptyCartCardStyle}>
            <Box sx={emptyCartIconBoxStyle}>
              <ShoppingBag size={38} strokeWidth={1.8} />
            </Box>

            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: '"Space Grotesk", sans-serif', 
                fontWeight: 800, 
                color: '#0f172a', 
                mb: 1.5 
              }}
            >
              Seu Carrinho está Vazio
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                color: '#64748b', 
                mb: 3.5, 
                lineHeight: 1.6,
                maxWidth: '460px'
              }}
            >
              Você ainda não adicionou nenhum item à sua sacola. Explore as categorias em destaque ou pesquise para encontrar o que procura.
            </Typography>

            <Button 
              variant="contained" 
              onClick={() => navigate('/')}
              startIcon={<ShoppingBag size={18} />}
              sx={{ 
                py: 1.5, 
                px: 4, 
                borderRadius: '12px', 
                fontWeight: 700, 
                fontFamily: '"Space Grotesk", sans-serif',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Explorar Catálogo de Produtos
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={cartHeaderStyle}>
            <Typography 
              variant="h4" 
              sx={cartTitleStyle}
            >
              Seu Carrinho de Compras
            </Typography>
            <Typography 
              variant="body1" 
              sx={cartSubtitleStyle}
            >
              Revise os produtos e as quantidades antes de finalizar o seu pedido.
            </Typography>
          </Box>
          {!isUserLoggedIn && (
            <Alert 
              severity="info" 
              action={
                <Button 
                  color="inherit" 
                  size="small" 
                  onClick={() => navigate(`/login?redirect=carrinho&anonId=${anonymousUserId}`)}
                  sx={{ fontWeight: 700 }}
                >
                  Fazer Login
                </Button>
              }
              sx={cartAlertStyle}
            >
              Você está navegando como convidado. Faça login para salvar seu carrinho permanentemente na sua conta.
            </Alert>
          )}

          <Grid container spacing={3.5}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {cartItems.map((item) => (
                  <CartItem 
                    key={item.id}
                    item={item}
                    updateCartQuantity={updateCartQuantity}
                    removeFromCart={removeFromCart}
                    onNavigateToProduct={handleNavigateToProduct}
                  />
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <CartBillingSummary 
                subtotal={subtotal}
                shipping={shipping}
                discount={discount}
                total={total}
                discountApplied={discountApplied}
                coupon={couponCode}
                couponError={couponError}
                onApplyCoupon={applyCoupon}
                onRemoveCoupon={removeCoupon}
                onClearError={clearCouponError}
                onCheckout={handleCheckoutClick}
                isCheckingOut={isProcessingCheckout}
              />
            </Grid>
          </Grid>
        </>
      )}

      <Dialog 
        open={checkoutDialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { style: checkoutDialogPaperStyle } }}
      >
        {checkoutSuccess ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Box sx={{ color: '#16a34a', mb: 2 }}>
              <CheckCircle2 size={64} style={{ margin: '0 auto' }} />
            </Box>
            <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, mb: 1, color: '#0f172a' }}>
              Pedido Confirmado!
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
              Sua compra foi processada com sucesso no ambiente simulado do Store-lab. Um comprovante fictício foi gerado para a sua conta.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => {
                handleCloseDialog();
                navigate('/');
              }}
              sx={{ py: 1.5, px: 4, borderRadius: '12px', fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Voltar à Loja
            </Button>
          </Box>
        ) : (
          <>
            <DialogTitle sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, fontSize: '1.5rem', pb: 1 }}>
              Confirmar Pedido Simulador
            </DialogTitle>
            <DialogContent>
              <Typography variant="body1" sx={{ color: '#475569', mb: 3 }}>
                Você está prestes a finalizar a compra de <strong>{cartItems.length} produto(s)</strong> com valor total de <strong>{formatCurrencyBRL(total)}</strong>.
              </Typography>

              <Box sx={{ bgcolor: '#f8fafc', p: 2.5, borderRadius: '12px', border: '1px solid #e2e8f0', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#2563eb' }}>
                  <Lock size={16} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Ambiente Sandbox / Teste
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#64748b', display: 'block', lineHeight: 1.5 }}>
                  Esta é uma demonstração interativa de e-commerce. Nenhuma cobrança real será feita no seu cartão de crédito.
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 1, gap: 1 }}>
              <Button 
                onClick={handleCloseDialog} 
                disabled={isProcessingCheckout}
                sx={{ borderRadius: '10px', color: '#64748b', fontWeight: 600 }}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleConfirmCheckout} 
                variant="contained"
                disabled={isProcessingCheckout}
                startIcon={isProcessingCheckout ? <CircularProgress size={16} color="inherit" /> : <CreditCard size={18} />}
                sx={{ py: 1.2, px: 3, borderRadius: '10px', fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif' }}
              >
                {isProcessingCheckout ? 'Processando...' : 'Pagar Agora (Simulação)'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </PageContainer>
  );
};

export default CartPage;
