import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  IconButton, 
  InputAdornment,
  Divider,
  Alert
} from '@mui/material';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ArrowLeft 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigate, useLocation, useParams } from 'react-router';
import { BrandLogo } from '../../components/BrandLogo/BrandLogo';
import { PrivacyNoteBadge } from '../../components/PrivacyNoteBadge/PrivacyNoteBadge';
import { CustomAlert } from '../../components/ui/CustomAlert';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas/authSchemas';
import { PageContainer } from '../../components/ui/PageContainer';
import { authService } from '../../services/authService';
import { formatUrlName } from '../../utils/formatters';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import {
  loginCardStyle,
  loginHeaderStyle,
  loginLogoWrapperStyle,
  loginTitleStyle,
  loginSubtitleStyle,
  loginAlertStyle,
  loginAnonAlertStyle,
  loginFormStyle,
  loginInputRootStyle,
  loginSubmitButtonStyle,
  loginDividerStyle,
  loginDividerTextStyle,
  loginActionsContainerStyle,
  loginRegisterButtonStyle,
  loginBackButtonStyle,
} from './Login.styles';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ userId?: string }>();
  const searchParams = new URLSearchParams(location.search);
  const anonId = searchParams.get('anonId');
  const { loginUser, anonymousUserId } = useAuth();
  const { cartItems } = useCart();
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resolvedUserId = params.userId || anonId || anonymousUserId;
  const hasCartItems = Boolean(cartItems && cartItems.length > 0);

  useDocumentTitle({
    title: 'Entrar',
    description: 'Faça login na sua conta StoreLab para gerenciar seus pedidos, endereços e compras com rapidez e segurança.',
    ogTitle: 'Entrar',
    ogDescription: 'Acesse sua conta para conferir seus pedidos e ofertas exclusivas na StoreLab.',
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitError(null);
      try {
        const result = authService.authenticateUser(values.email, values.password);

        if (!result.success || !result.user) {
          setSubmitError(result.error || 'Erro ao realizar o login. Por favor, tente novamente.');
          setSubmitting(false);
          return;
        }

        const authenticatedUser = result.user;
        const redirect = searchParams.get('redirect');
        setTimeout(() => {
          loginUser(authenticatedUser);
          setSubmitting(false);
          if (redirect === 'carrinho' || redirect === '/carrinho') {
            navigate('/carrinho');
          } else if (redirect === 'checkout' || redirect === '/checkout') {
            navigate('/checkout');
          } else {
            const profileUrl = authenticatedUser?.name ? `/perfil/${formatUrlName(authenticatedUser.name)}` : '/perfil';
            navigate(profileUrl);
          }
        }, 800);
      } catch (error) {
        setSubmitError('Erro ao realizar o login. Por favor, tente novamente.');
        setSubmitting(false);
      }
    },
  });

  return (
    <PageContainer maxWidth="sm" py={{ xs: 4, md: 6 }}>
      <Card sx={loginCardStyle}>

        <Box sx={loginHeaderStyle}>
          <Box sx={loginLogoWrapperStyle}>
            <BrandLogo size="large" />
          </Box>
          <Typography variant="h4" sx={loginTitleStyle}>
            Acesse sua Conta
          </Typography>
          <Typography variant="body2" sx={loginSubtitleStyle}>
            Entre com seus dados para gerenciar seus pedidos, carrinho e informações de perfil.
          </Typography>
        </Box>

        <Box component="form" onSubmit={formik.handleSubmit} sx={loginFormStyle}>
          <TextField
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="E-mail"
            variant="outlined"
            fullWidth
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={18} color="#94a3b8" />
                  </InputAdornment>
                ),
              }
            }}
            sx={loginInputRootStyle}
          />

          <TextField
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Senha"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={18} color="#94a3b8" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton 
                      aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
                      onClick={() => setShowPassword(!showPassword)} 
                      edge="end"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
            sx={loginInputRootStyle}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={formik.isSubmitting}
            sx={loginSubmitButtonStyle}
          >
            {formik.isSubmitting ? 'Acessando...' : 'Entrar'}
          </Button>

          {submitError && (
            <CustomAlert severity="error">
              {submitError}
            </CustomAlert>
          )}

          {hasCartItems && (
            <CustomAlert severity="info">
              Prezado cliente, seus itens no carrinho estão salvos caso queira fazer login. Eles serão automaticamente sincronizados com sua conta.
            </CustomAlert>
          )}
        </Box>

        <Divider sx={loginDividerStyle}>
          <Typography component="span" sx={loginDividerTextStyle}>
            Não tem uma conta?
          </Typography>
        </Divider>

        <Box sx={loginActionsContainerStyle}>
          <Button 
            variant="outlined" 
            fullWidth
            onClick={() => {
              let target = resolvedUserId ? `/cadastro/${resolvedUserId}` : '/cadastro';
              const queryParams: string[] = [];
              const redirect = searchParams.get('redirect');
              if (redirect) queryParams.push(`redirect=${redirect}`);
              if (queryParams.length > 0) {
                target += '?' + queryParams.join('&');
              }
              navigate(target);
            }}
            sx={loginRegisterButtonStyle}
          >
            Criar uma Conta
          </Button>

          <Button 
            variant="text" 
            fullWidth
            onClick={() => navigate('/')}
            startIcon={<ArrowLeft size={16} />}
            sx={loginBackButtonStyle}
          >
            Voltar para a Página Inicial
          </Button>
        </Box>

      </Card>

      <PrivacyNoteBadge />
    </PageContainer>
  );
};

export default LoginPage;

