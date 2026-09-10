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
  User,
  Fingerprint,
  ArrowLeft 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigate, useLocation, useParams } from 'react-router';
import { BrandLogo } from '../../components/BrandLogo/BrandLogo';
import { PrivacyNoteBadge } from '../../components/PrivacyNoteBadge/PrivacyNoteBadge';
import { CustomAlert } from '../../components/ui/CustomAlert';
import { useFormik } from 'formik';
import { registerSchema } from '../../schemas/authSchemas';
import { formatCPF, formatUrlName } from '../../utils/formatters';
import { PageContainer } from '../../components/ui/PageContainer';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import { authService } from '../../services/authService';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import {
  registerCardStyle,
  registerHeaderStyle,
  registerLogoWrapperStyle,
  registerTitleStyle,
  registerSubtitleStyle,
  registerAlertStyle,
  registerAnonAlertStyle,
  registerFormStyle,
  registerInputRootStyle,
  registerSubmitButtonStyle,
  registerDividerStyle,
  registerDividerTextStyle,
  registerActionsContainerStyle,
  registerLoginButtonStyle,
  registerBackButtonStyle,
} from './Register.styles';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ userId?: string }>();
  const searchParams = new URLSearchParams(location.search);
  const anonId = searchParams.get('anonId');
  const { loginUser, anonymousUserId } = useAuth();
  const { cartItems } = useCart();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const resolvedUserId = params.userId || anonId || anonymousUserId;
  const hasCartItems = Boolean(cartItems && cartItems.length > 0);

  useDocumentTitle({
    title: 'Criar Conta',
    description: 'Cadastre-se na StoreLab e tenha acesso a produtos com tecnologia de ponta, cupons exclusivos e entrega ágil.',
    ogTitle: 'Criar Conta',
    ogDescription: 'Crie sua conta na StoreLab e comece a comprar com vantagens especiais.',
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      cpf: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitError(null);
      try {
        const formattedCpf = formatCPF(values.cpf);
        const result = authService.registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
          cpf: formattedCpf,
        });

        if (!result.success || !result.user) {
          setSubmitError(result.error || 'Houve uma falha ao realizar o cadastro.');
          setSubmitting(false);
          return;
        }

        const registeredUser = result.user;
        const redirect = searchParams.get('redirect');
        setTimeout(() => {
          loginUser(registeredUser);
          setSubmitting(false);
          if (redirect === 'carrinho' || redirect === '/carrinho') {
            navigate('/carrinho');
          } else if (redirect === 'checkout' || redirect === '/checkout') {
            navigate('/checkout');
          } else {
            const profileUrl = registeredUser?.name ? `/perfil/${formatUrlName(registeredUser.name)}` : '/perfil';
            navigate(profileUrl);
          }
        }, 800);
      } catch (error) {
        setSubmitError('Houve uma falha ao realizar o cadastro. Verifique os dados fornecidos.');
        setSubmitting(false);
      }
    },
  });

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = formatCPF(e.target.value);
    formik.setFieldValue('cpf', masked);
  };

  return (
    <PageContainer maxWidth="sm" py={{ xs: 4, md: 6 }}>
      <Card sx={registerCardStyle}>

        <Box sx={registerHeaderStyle}>
          <Box sx={registerLogoWrapperStyle}>
            <BrandLogo size="large" />
          </Box>
          <Typography variant="h5" sx={registerTitleStyle}>
            Criar sua Conta
          </Typography>
          <Typography variant="body2" sx={registerSubtitleStyle}>
            Faça seu cadastro completo para salvar seu histórico de pedidos, compras e frete.
          </Typography>
        </Box>

        <Box component="form" onSubmit={formik.handleSubmit} sx={registerFormStyle}>
          <TextField
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Nome Completo"
            placeholder="Ex: João da Silva"
            variant="outlined"
            fullWidth
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={18} color="#94a3b8" />
                  </InputAdornment>
                ),
              }
            }}
            sx={registerInputRootStyle}
          />

          <TextField
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="E-mail"
            placeholder="seuemail@exemplo.com"
            variant="outlined"
            type="email"
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
            sx={registerInputRootStyle}
          />

          <TextField
            name="cpf"
            value={formik.values.cpf}
            onChange={handleCpfChange}
            onBlur={formik.handleBlur}
            label="CPF (Receita Federal)"
            placeholder="000.000.000-00"
            variant="outlined"
            fullWidth
            error={formik.touched.cpf && Boolean(formik.errors.cpf)}
            helperText={formik.touched.cpf && formik.errors.cpf}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Fingerprint size={18} color="#94a3b8" />
                  </InputAdornment>
                ),
              },
              htmlInput: {
                maxLength: 14
              }
            }}
            sx={registerInputRootStyle}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
              sx={registerInputRootStyle}
            />

            <PasswordStrengthIndicator password={formik.values.password} />
          </Box>

          <TextField
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Confirmar Senha"
            variant="outlined"
            type={showConfirmPassword ? 'text' : 'password'}
            fullWidth
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                      aria-label={showConfirmPassword ? "Ocultar confirmação de senha" : "Exibir confirmação de senha"}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                      edge="end"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
            sx={registerInputRootStyle}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={formik.isSubmitting}
            sx={registerSubmitButtonStyle}
          >
            {formik.isSubmitting ? 'Criando conta...' : 'Criar Conta'}
          </Button>

          {submitError && (
            <CustomAlert severity="error">
              {submitError}
            </CustomAlert>
          )}

          {hasCartItems && (
            <CustomAlert severity="info">
              Prezado cliente, seus itens no carrinho estão salvos caso queira criar sua conta. Eles serão automaticamente sincronizados após o cadastro.
            </CustomAlert>
          )}
        </Box>

        <Divider sx={registerDividerStyle}>
          <Typography component="span" sx={registerDividerTextStyle}>
            Já tem uma conta?
          </Typography>
        </Divider>

        <Box sx={registerActionsContainerStyle}>
          <Button 
            variant="outlined" 
            fullWidth
            onClick={() => {
              let target = resolvedUserId ? `/login/${resolvedUserId}` : '/login';
              const queryParams: string[] = [];
              const redirect = searchParams.get('redirect');
              if (redirect) queryParams.push(`redirect=${redirect}`);
              if (queryParams.length > 0) {
                target += '?' + queryParams.join('&');
              }
              navigate(target);
            }}
            sx={registerLoginButtonStyle}
          >
            Fazer Login
          </Button>

          <Button 
            variant="text" 
            fullWidth
            onClick={() => navigate('/')}
            startIcon={<ArrowLeft size={16} />}
            sx={registerBackButtonStyle}
          >
            Voltar para a Página Inicial
          </Button>
        </Box>

      </Card>

      <PrivacyNoteBadge />
    </PageContainer>
  );
};

export default RegisterPage;
