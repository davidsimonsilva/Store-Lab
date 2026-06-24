import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  ShoppingBag, 
  ArrowLeft, 
  CheckCircle
} from 'lucide-react';
import { useGlobalState, formatUrlName } from '../context/GlobalStateContext';
import { CartItem } from '../components/CartItem';
import { CartBillingSummary } from '../components/CartBillingSummary';

export const CartView: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const { cart, updateCartQuantity, removeFromCart, clearCart, setSelectedProductId, user, anonymousUserId } = useGlobalState();
  
  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const isUserLoggedIn = user && user.isLoggedIn;
  const activeUserId = userId || (isUserLoggedIn ? user?.id : anonymousUserId);

  const activeCartItems = cart.filter(item => item.userId === activeUserId);

  const subtotal = activeCartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 1500 ? 0 : (activeCartItems.length > 0 ? 39.90 : 0);
  const discount = discountApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const handleApplyCoupon = () => {
    setCouponError(null);
    if (coupon.toUpperCase() === 'STORELAB10' || coupon.toUpperCase() === 'LAB10') {
      setDiscountApplied(true);
    } else {
      setCouponError('Cupom inválido. Tente usar o código LAB10.');
    }
  };

  const handleCheckoutSubmit = () => {
    if (!user || !user.isLoggedIn) {
      setShowAuthDialog(true);
      return;
    }
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      clearCart();
    }, 2000);
  };

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleNavigateToProduct = (pId: string, name: string) => {
    const pName = formatUrlName(name);
    setSelectedProductId(pId);
    navigate(`/produto/${pName}-${pId}`);
  };

  if (activeCartItems.length === 0 && !checkoutComplete) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Card 
          sx={{ 
            p: 6, 
            textAlign: 'center', 
            bgcolor: '#ffffff', 
            borderRadius: '16px', 
            border: '1px solid #e2e8f0', 
            maxWidth: '600px', 
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ bgcolor: '#eff6ff', p: 3, borderRadius: '50px', mb: 3, color: '#2563eb' }}>
            <ShoppingBag size={48} strokeWidth={1.5} />
          </Box>
          <Typography variant="h5" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, mb: 1, color: '#0f172a' }}>
            Seu Carrinho está Vazio
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mb: 4, maxWidth: '420px', lineHeight: 1.6 }}>
            Seu carrinho de compras não possui nenhum produto no momento. Adicione produtos na página inicial para prosseguir.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            startIcon={<ArrowLeft size={16} />}
            sx={{ px: 4, py: 1.5, borderRadius: '50px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 }}
          >
            Ver Produtos
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {checkoutComplete ? (
        <Card 
          sx={{ 
            p: { xs: 4, md: 6 }, 
            textAlign: 'center', 
            bgcolor: '#ffffff', 
            borderRadius: '16px', 
            maxWidth: '650px', 
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box sx={{ color: '#10b981', mb: 3 }}>
            <CheckCircle size={72} strokeWidth={1.5} />
          </Box>
          <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, mb: 1, color: '#0f172a' }}>
            Pedido Realizado com Sucesso!
          </Typography>
          <Typography variant="body2" sx={{ color: '#0d9488', fontWeight: 700, mb: 3, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            NÚMERO DO PEDIDO: #SL-{Math.floor(100000 + Math.random() * 900000)}
          </Typography>
          <Typography variant="body1" sx={{ color: '#475569', mb: 4, maxWidth: '480px', lineHeight: 1.6 }}>
            Seu pedido foi registrado em nosso system. Você receberá um e-mail com a confirmação, detalhes de faturamento e código para rastreamento da entrega.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => {
                setCheckoutComplete(false);
                navigate('/');
              }}
              sx={{ px: 3, py: 1.2, borderRadius: '30px', fontWeight: 600 }}
            >
              Continuar Comprando
            </Button>
          </Box>
        </Card>
      ) : (
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontFamily: '"Space Grotesk", sans-serif', 
              fontWeight: 800, 
              color: '#0f172a', 
              mb: 1.5,
              letterSpacing: '-0.03em'
            }}
          >
            Seu Carrinho de Compras
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mb: 5 }}>
            Revise os produtos e as quantidades antes de finalizar o seu pedido.
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activeCartItems.map((item) => (
                  <CartItem 
                    key={item.id}
                    item={item}
                    updateCartQuantity={updateCartQuantity}
                    removeFromCart={removeFromCart}
                    onNavigateToProduct={handleNavigateToProduct}
                    formatBRL={formatBRL}
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
                coupon={coupon}
                onCouponChange={setCoupon}
                couponError={couponError}
                onApplyCoupon={handleApplyCoupon}
                onCheckout={handleCheckoutSubmit}
                isCheckingOut={isCheckingOut}
                formatBRL={formatBRL}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      <Dialog 
        open={showAuthDialog} 
        onClose={() => setShowAuthDialog(false)}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '20px',
            p: 1.5,
            maxWidth: '420px',
            bgcolor: '#ffffff'
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, color: '#0f172a', pb: 1 }}>
          Acesse sua conta
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.6 }}>
            Faça login ou cadastre-se para finalizar o seu pedido.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button 
            variant="outlined" 
            onClick={() => setShowAuthDialog(false)}
            sx={{ 
              borderRadius: '10px', 
              textTransform: 'none', 
              fontWeight: 600,
              fontFamily: '"Space Grotesk", sans-serif',
              color: '#475569',
              borderColor: '#cbd5e1',
              '&:hover': {
                borderColor: '#94a3b8',
                bgcolor: '#f8fafc'
              }
            }}
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setShowAuthDialog(false);
              navigate('/login');
            }}
            sx={{ 
              borderRadius: '10px', 
              textTransform: 'none', 
              fontWeight: 700,
              fontFamily: '"Space Grotesk", sans-serif',
              bgcolor: '#2563eb',
              color: '#ffffff',
              '&:hover': { bgcolor: '#1d4ed8' }
            }}
          >
            Fazer Login
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
