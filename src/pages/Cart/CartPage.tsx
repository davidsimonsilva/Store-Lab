import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  Grid, 
  Typography, 
  Box, 
  Button, 
} from '@mui/material';
import { 
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatUrlName } from '../../utils/formatters';
import { CartItem } from './CartItem/CartItem';
import { CartBillingSummary } from './Summary/CartBillingSummary';
import { PageContainer } from '../../components/ui/PageContainer';
import { CustomAlert } from '../../components/ui/CustomAlert';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import {
  cartBreadcrumbsStyle,
  cartBreadcrumbLinkStyle,
  cartBreadcrumbCurrentStyle,
  cartHeaderStyle,
  cartTitleStyle,
  cartSubtitleStyle,
  cartAlertStyle,
  cartLoginAlertButtonStyle,
  emptyCartContainerStyle,
  emptyCartCardStyle,
  emptyCartIconBoxStyle,
  cartStickySummaryStyle
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
    applyCoupon, 
    removeCoupon, 
    clearCouponError 
  } = useCart();

  useDocumentTitle({
    title: 'Carrinho',
    description: 'Revise os produtos adicionados ao seu carrinho, aplique cupons promocionais e calcule o frete na StoreLab.',
    ogTitle: 'Carrinho',
    ogDescription: 'Revise seus itens e finalize sua compra com segurança na StoreLab.',
  });

  const isUserLoggedIn = user && user.isLoggedIn;

  const handleNavigateToProduct = (pId: string, name: string) => {
    const pName = formatUrlName(name);
    navigate(`/produto/${pName}`);
  };

  const handleCheckoutClick = () => {
    if (!isUserLoggedIn) {
      navigate(`/login?redirect=checkout`);
      return;
    }
    navigate('/checkout');
  };

  return (
    <PageContainer maxWidth="lg" py={4}>
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
            <CustomAlert 
              severity="info" 
              actionPosition="right"
              action={
                <Button 
                  size="small" 
                  onClick={() => navigate('/login?redirect=carrinho')}
                  sx={cartLoginAlertButtonStyle}
                >
                  Fazer Login
                </Button>
              }
              sx={cartAlertStyle}
            >
              Você está navegando como convidado. Faça login para salvar seu carrinho permanentemente na sua conta.
            </CustomAlert>
          )}

          <Grid container spacing={{ xs: 2, md: 3.5 }}>
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
              <Box sx={cartStickySummaryStyle}>
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
                />
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </PageContainer>
  );
};

export default CartPage;
