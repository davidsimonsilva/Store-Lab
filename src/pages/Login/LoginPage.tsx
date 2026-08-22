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
import { useNavigate, useLocation } from 'react-router';
import { BrandLogo } from '../../components/BrandLogo/BrandLogo';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas/authSchemas';
import { PageContainer } from '../../components/ui/PageContainer';
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
  const searchParams = new URLSearchParams(location.search);
  const anonId = searchParams.get('anonId');
  const { loginUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Store-lab';
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitError(null);
      try {
        const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const matched = registered.find(
          (u: any) => u.email.toLowerCase() === values.email.toLowerCase()
        );

        if (!matched) {
          setSubmitError('Esse e-mail não está cadastrado. Por favor, faça o cadastro primeiro para poder acessar.');
          setSubmitting(false);
          return;
        }

        if (matched.password !== values.password) {
          setSubmitError('Senha incorreta! Verifique a sua senha e tente novamente.');
          setSubmitting(false);
          return;
        }

        const redirect = searchParams.get('redirect');
        setTimeout(() => {
          loginUser(matched.name, matched.email);
          setSubmitting(false);
          if (redirect === 'carrinho' || redirect === '/carrinho') {
            navigate('/carrinho');
          } else {
            navigate('/perfil');
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

        {submitError && (
          <Alert severity="error" sx={loginAlertStyle}>
            {submitError}
          </Alert>
        )}

        {anonId && (
          <Alert severity="info" sx={loginAnonAlertStyle}>
            ID de Compra Ativa detectado: <strong>{anonId}</strong>.
            Os itens do seu carrinho de compras atual serão sincronizados e salvos em sua conta após o login.
          </Alert>
        )}

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
              let target = '/cadastro';
              const params: string[] = [];
              if (anonId) params.push(`anonId=${anonId}`);
              const redirect = searchParams.get('redirect');
              if (redirect) params.push(`redirect=${redirect}`);
              if (params.length > 0) {
                target += '?' + params.join('&');
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
    </PageContainer>
  );
};

export default LoginPage;

