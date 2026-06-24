'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Grid, 
  Button, 
  Card, 
  Typography, 
  TextField, 
  InputAdornment, 
  Alert, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Tooltip,
  Chip
} from '@mui/material';
import { 
  ArrowLeft, 
  User as UserIcon, 
  Mail as MailIcon, 
  CreditCard as CardIcon, 
  MapPin as CepIcon, 
  QrCode as PixIcon, 
  Fingerprint as IdIcon, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  Check
} from 'lucide-react';
import { useGlobalState, formatUrlName } from '../context/GlobalStateContext';

export function validateCPF(cpf: string): boolean {
  const clean = cpf.replace(/[^\d]/g, '');
  if (clean.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(clean)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(clean.charAt(i)) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i)) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(10))) return false;

  return true;
}

export const ProfileView: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const { 
    user, 
    anonymousUserId, 
    cart, 
    logoutUser,
    loginUser,
    setSelectedProductId 
  } = useGlobalState();

  const isUserLoggedIn = user && user.isLoggedIn;
  const activeUserId = isUserLoggedIn ? (userId || user.id) : anonymousUserId;

  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profileCpf, setProfileCpf] = useState(user?.cpf || '');
  const [profileCep, setProfileCep] = useState(user?.cep || '');
  const [profileCard, setProfileCard] = useState(user?.card || '');

  const [cpfError, setCpfError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isUserLoggedIn) {
      setProfileName(user?.name || '');
      setProfileEmail(user?.email || '');
      setProfileCpf(user?.cpf || '');
      setProfileCep(user?.cep || '');
      setProfileCard(user?.card || '');
    }
  }, [user, isUserLoggedIn]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^\d]/g, '');
    let formatted = rawVal;
    if (rawVal.length > 3) formatted = `${rawVal.slice(0, 3)}.${rawVal.slice(3)}`;
    if (rawVal.length > 6) formatted = `${rawVal.slice(0, 3)}.${rawVal.slice(3, 6)}.${rawVal.slice(6)}`;
    if (rawVal.length > 9) formatted = `${rawVal.slice(0, 3)}.${rawVal.slice(3, 6)}.${rawVal.slice(6, 9)}-${rawVal.slice(9, 11)}`;
    setProfileCpf(formatted);

    if (rawVal.length === 11) {
      if (validateCPF(formatted)) {
        setCpfError(null);
      } else {
        setCpfError('CPF inválido ou com dígitos repetidos.');
      }
    } else {
      setCpfError(null);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^\d]/g, '').slice(0, 8);
    let formatted = rawVal;
    if (rawVal.length > 5) {
      formatted = `${rawVal.slice(0, 5)}-${rawVal.slice(5, 8)}`;
    }
    setProfileCep(formatted);
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^\d]/g, '').slice(0, 16);
    const parts = [];
    for (let i = 0; i < rawVal.length; i += 4) {
      parts.push(rawVal.slice(i, i + 4));
    }
    setProfileCard(parts.join(' '));
  };

  const handleSaveProfile = () => {
    setFormError(null);
    setSaveSuccess(false);

    if (!profileName) {
      setFormError('Por favor, preencha o seu Nome.');
      return;
    }
    if (!profileEmail) {
      setFormError('Por favor, preencha o seu E-mail.');
      return;
    }

    if (profileCpf && !validateCPF(profileCpf)) {
      setFormError('CPF inválido! Por favor, corrija o CPF para salvar o cadastro.');
      setCpfError('CPF inválido ou com dígitos repetidos.');
      return;
    }

    try {
      const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const targetEmail = user?.email || profileEmail;
      
      const index = registered.findIndex((u: any) => u.email.toLowerCase() === targetEmail.toLowerCase());

      const updatedUserObj = {
        name: profileName,
        email: profileEmail,
        cpf: profileCpf,
        cep: profileCep,
        card: profileCard,
        pix: user?.pix || ''
      };

      if (index > -1) {
        registered[index] = { ...registered[index], ...updatedUserObj };
      } else {
        registered.push({ ...updatedUserObj, password: 'dummyresetpassword' });
      }

      localStorage.setItem('registered_users', JSON.stringify(registered));

      localStorage.setItem('store_lab_user', JSON.stringify({
        id: activeUserId,
        isLoggedIn: true,
        ...updatedUserObj
      }));

      loginUser(profileName, profileEmail, '/perfil');
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error(e);
      setFormError('Houve um contratempo interno ao tentar consolidar o registro.');
    }
  };

  const relatedCartItems = cart.filter(item => item.userId === activeUserId);
  const cartItemsCount = relatedCartItems.reduce((total, item) => total + item.quantity, 0);

  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleNavigateToProduct = (pId: string, name: string) => {
    const pName = formatUrlName(name);
    setSelectedProductId(pId);
    navigate(`/produto/${pName}-${pId}`);
  };

  if (!isUserLoggedIn) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Card sx={{ p: 5, borderRadius: '24px', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(15,23,42,0.05)' }}>
          <Box sx={{ mb: 3 }}>
            <IdIcon size={48} color="#64748b" style={{ margin: '0 auto' }} />
          </Box>
          <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, mb: 1.5, color: '#0f172a' }}>
            Acesso Restrito ao Perfil
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', maxWidth: '520px', mx: 'auto', mb: 4, lineHeight: 1.6 }}>
            Faça login na sua conta para acessar e gerenciar as suas informações de perfil, endereços de entrega e acompanhar seus pedidos de forma segura.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              onClick={() => navigate('/login')}
              sx={{ py: 1.2, px: 4, borderRadius: '12px', fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Autenticar Login
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/cadastro')}
              sx={{ py: 1.2, px: 4, borderRadius: '12px', fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Criar Cadastro
            </Button>
          </Box>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <Button 
          variant="text" 
          onClick={() => navigate('/')}
          startIcon={<ArrowLeft size={16} />}
          sx={{ color: '#475569', fontWeight: 600, fontFamily: '"Space Grotesk", sans-serif', textTransform: 'none' }}
        >
          Voltar para Home
        </Button>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontFamily: '"Space Grotesk", sans-serif', 
            fontWeight: 800, 
            color: '#0f172a',
            letterSpacing: '-0.03em',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
          }}
        >
          Olá, {user.name} <Sparkles size={28} style={{ color: '#2563eb' }} />
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', mt: 1 }}>
          Gerencie suas informações pessoais, endereços e dados de faturamento de forma segura.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card 
            sx={{ 
              p: 4, 
              borderRadius: '24px', 
              border: '1px solid #e2e8f0', 
              bgcolor: '#ffffff',
              boxShadow: '0 4px 20px -2px rgba(15,23,42,0.02)'
            }}
          >
            <Typography variant="h6" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: '#0f172a', mb: 3 }}>
              Informações Pessoais
            </Typography>

            {formError && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                {formError}
              </Alert>
            )}

            {saveSuccess && (
              <Alert severity="success" icon={<Check size={18} />} sx={{ mb: 3, borderRadius: '12px' }}>
                Informações de perfil atualizadas e registradas com sucesso!
              </Alert>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField 
                label="Nome"
                variant="outlined" 
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <UserIcon size={18} color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <TextField 
                label="E-mail"
                variant="outlined" 
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon size={18} color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <TextField 
                label="CPF"
                variant="outlined" 
                placeholder="000.000.000-00"
                value={profileCpf}
                onChange={handleCpfChange}
                error={Boolean(cpfError)}
                helperText={cpfError || "Digite um CPF regular e sem dígitos repetidos."}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <IdIcon size={18} color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <TextField 
                label="CEP"
                variant="outlined" 
                placeholder="00000-000"
                value={profileCep}
                onChange={handleCepChange}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CepIcon size={18} color="#94a3b8" />
                      </InputAdornment>
                    ),
                  }
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <Box>
                <TextField 
                  label="Cartão"
                  variant="outlined" 
                  placeholder="0000 0000 0000 0000"
                  value={profileCard}
                  onChange={handleCardChange}
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CardIcon size={18} color="#94a3b8" />
                        </InputAdornment>
                      ),
                    }
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
                <Box 
                  sx={{ 
                    mt: 1.5, 
                    p: 1.5, 
                    borderRadius: '8px', 
                    bgcolor: '#fffbeb', 
                    border: '1px solid #fef3c7', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1 
                  }}
                >
                  <AlertTriangle size={16} color="#d97706" style={{ flexShrink: 0 }} />
                  <Typography variant="caption" sx={{ color: '#b45309', fontWeight: 600 }}>
                    Aviso: Insira apenas dados de cartão fictício/teste. Nunca insira dados reais de cartões de faturamento.
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                onClick={handleSaveProfile}
                fullWidth
                sx={{ py: 1.5, borderRadius: '12px', fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif' }}
              >
                Salvar Informações
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={logoutUser}
                sx={{ py: 1.5, px: 3, borderRadius: '12px', fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif', textTransform: 'none' }}
              >
                Desconectar
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
