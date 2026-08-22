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
  ArrowLeft 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router';
import { BrandLogo } from '../../components/BrandLogo/BrandLogo';
import { useFormik } from 'formik';
import { registerSchema } from '../../schemas/authSchemas';
import { PageContainer } from '../../components/ui/PageContainer';
import {
  registerCardStyle,
  registerHeaderStyle,
  registerLogoWrapperStyle,
  registerTitleStyle,
  registerSubtitleStyle,
  registerAlertStyle,
  registerAnonAlertStyle,
  registerPrivacyAlertStyle,
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
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitError(null);
      try {
        const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const emailExists = registered.some(
          (u: any) => u.email.toLowerCase() === values.email.toLowerCase()
        );

        if (emailExists) {
          setSubmitError('Este endereço de e-mail já está cadastrado no sistema!');
          setSubmitting(false);
          return;
        }

        const newUser = {
          name: values.name,
          email: values.email,
          password: values.password,
          cpf: '',
          cep: '',
          card: '',
          pix: ''
        };

        registered.push(newUser);
        localStorage.setItem('registered_users', JSON.stringify(registered));

        const redirect = searchParams.get('redirect');
        setTimeout(() => {
          loginUser(values.name, values.email);
          setSubmitting(false);
          if (redirect === 'carrinho' || redirect === '/carrinho') {
            navigate('/carrinho');
          } else {
            navigate('/perfil');
          }
        }, 1000);
      } catch (error) {
        setSubmitError('Houve uma falha ao realizar o cadastro. Verifique os dados fornecidos.');
        setSubmitting(false);
      }
    },
  });

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
            Faça o seu cadastro rápido para salvar seu histórico de pedidos, compras e frete.
          </Typography>
        </Box>

        {submitError && (
          <Alert severity="error" sx={registerAlertStyle}>
            {submitError}
          </Alert>
        )}

        {anonId && (
          <Alert severity="info" sx={registerAnonAlertStyle}>
            ID de Compra Ativa detectado: <strong>{anonId}</strong>.
            Os itens do seu carrinho atual serão sincronizados e salvos em sua conta após a criação do cadastro.
          </Alert>
        )}

        <Alert severity="warning" sx={registerPrivacyAlertStyle}>
          <strong>Nota de Privacidade:</strong> Seus dados de cadastro servem exclusivamente para simular o comportamento da plataforma e são salvos localmente em seu navegador por meio de <code>localStorage</code>. Suas informações não são transmitidas para servidores externos.
        </Alert>

        <Box component="form" onSubmit={formik.handleSubmit} sx={registerFormStyle}>
          <TextField
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Nome Completo"
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
            sx={registerInputRootStyle}
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
            sx={registerInputRootStyle}
          />

          <TextField
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Confirmar Senha"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
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
                      aria-label={showPassword ? "Ocultar confirmação de senha" : "Exibir confirmação de senha"}
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
              let target = '/login';
              const params: string[] = [];
              if (anonId) params.push(`anonId=${anonId}`);
              const redirect = searchParams.get('redirect');
              if (redirect) params.push(`redirect=${redirect}`);
              if (params.length > 0) {
                target += '?' + params.join('&');
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
    </PageContainer>
  );
};

export default RegisterPage;

