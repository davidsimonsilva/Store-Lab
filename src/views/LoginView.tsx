import React, { useState } from 'react';
import { 
  Container, 
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
import { useGlobalState } from '../context/GlobalStateContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { BrandLogo } from '../components/BrandLogo';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const LoginView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const anonId = searchParams.get('anonId');
  const { loginUser } = useGlobalState();
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Formato de e-mail inválido')
      .required('E-mail é obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres')
      .required('Senha é obrigatória'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
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

        setTimeout(() => {
          loginUser(matched.name, matched.email, '/perfil');
          setSubmitting(false);
        }, 800);
      } catch (error) {
        setSubmitError('Erro ao realizar o login. Por favor, tente novamente.');
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ py: 10, display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center' }}>
      <Card sx={{ p: { xs: 4, md: 5 }, borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 40px -20px rgba(15,23,42,0.1)' }}>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box sx={{ mb: 2.5 }}>
            <BrandLogo size="large" />
          </Box>
          <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, letterSpacing: '-0.04em', mb: 1, color: '#0f172a' }}>
            Acesse sua Conta
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', textAlign: 'center', px: 2, fontSize: '0.875rem', lineHeight: 1.5 }}>
            Entre com seus dados para gerenciar seus pedidos, carrinho e informações de perfil.
          </Typography>
        </Box>

        {submitError && <Alert severity="error" sx={{ mb: 3, borderRadius: '8px' }}>{submitError}</Alert>}

        {anonId && (
          <Alert severity="info" sx={{ mb: 3.5, borderRadius: '12px', border: '1px solid #bfdbfe', bgcolor: '#eff6ff', color: '#1e40af' }}>
            ID de Compra Ativa detectado: <strong>{anonId}</strong>.
            Os itens do seu carrinho de compras atual serão sincronizados e salvos em sua conta após o login.
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <Box sx={{ mb: 3.5 }}>
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 3.5 }}>
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
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px'
                }
              }}
            />
          </Box>

          <Box sx={{ pt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={formik.isSubmitting}
              onClick={() => formik.handleSubmit()}
              sx={{
                py: 1.6,
                borderRadius: '12px',
                fontWeight: 700,
                fontFamily: '"Space Grotesk", sans-serif',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
              }}
            >
              {formik.isSubmitting ? 'Acessando...' : 'Entrar'}
            </Button>
          </Box>
        </form>

        <Divider sx={{ my: 4 }}>
          <Typography component="span" sx={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Não tem uma conta?</Typography>
        </Divider>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button 
            variant="outlined" 
            fullWidth
            onClick={() => navigate(anonId ? `/cadastro?anonId=${anonId}` : '/cadastro')}
            sx={{ borderRadius: '12px', py: 1.2, fontWeight: 700, borderWidth: '1.5px' }}
          >
            Criar uma Conta
          </Button>
          
          <Button 
            variant="text" 
            fullWidth
            onClick={() => navigate('/')}
            startIcon={<ArrowLeft size={16} />}
            sx={{ 
              borderRadius: '12px', 
              py: 1, 
              fontWeight: 600, 
              color: '#64748b',
              textTransform: 'none',
              '&:hover': { color: '#0f172a', backgroundColor: '#f8fafc' } 
            }}
          >
            Voltar para a Página Inicial
          </Button>
        </Box>

      </Card>
    </Container>
  );
};
