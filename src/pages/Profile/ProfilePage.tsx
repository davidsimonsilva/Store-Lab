import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  Box, 
  Grid, 
  Button, 
  Card, 
  Typography, 
  TextField, 
  InputAdornment, 
  Alert,
  Divider
} from '@mui/material';
import { 
  ArrowLeft, 
  User as UserIcon, 
  CreditCard as CardIcon, 
  MapPin as CepIcon, 
  Fingerprint as IdIcon, 
  AlertTriangle,
  Check,
  LogOut,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatCPF, formatCEP, validateCPF } from '../../utils/formatters';
import { User } from '../../types';
import { PageContainer } from '../../components/ui/PageContainer';
import {
  profileHeaderStyle,
  profileTitleStyle,
  profileSubtitleStyle,
  profileCardStyle,
  profileInputRootStyle,
} from './Profile.styles';

export const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const {
    user,
    anonymousUserId,
    logoutUser,
    updateProfile
  } = useAuth();

  useEffect(() => {
    document.title = 'Store-lab';
  }, []);

  const isUserLoggedIn = user && user.isLoggedIn;
  const activeUserId = isUserLoggedIn ? (userId || user.id) : anonymousUserId;

  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profileCpf, setProfileCpf] = useState(user?.cpf && user.cpf !== '/perfil' ? formatCPF(user.cpf) : '');
  const [profileCep, setProfileCep] = useState(user?.cep ? formatCEP(user.cep) : '');
  const [profileCard, setProfileCard] = useState(user?.card || '');
  const [profileExpiry, setProfileExpiry] = useState(user?.cardExpiry || '');
  const [profileCvv, setProfileCvv] = useState(user?.cardCvv || '');

  const [cpfError, setCpfError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isUserLoggedIn) {
      setProfileName(user?.name || '');
      setProfileEmail(user?.email || '');
      setProfileCpf(user?.cpf && user.cpf !== '/perfil' ? formatCPF(user.cpf) : '');
      setProfileCep(user?.cep ? formatCEP(user.cep) : '');
      setProfileCard(user?.card || '');
      setProfileExpiry(user?.cardExpiry || '');
      setProfileCvv(user?.cardCvv || '');
    }
  }, [user, isUserLoggedIn]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setProfileCpf(formatted);

    const clean = formatted.replace(/[^\d]/g, '');
    if (clean.length === 11) {
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
    const formatted = formatCEP(e.target.value);
    setProfileCep(formatted);
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^\d]/g, '').slice(0, 16);
    const parts: string[] = [];
    for (let i = 0; i < rawVal.length; i += 4) {
      parts.push(rawVal.slice(i, i + 4));
    }
    setProfileCard(parts.join(' '));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    let clean = input.replace(/[^\d]/g, '');
    if (clean.length > 4) {
      clean = clean.slice(0, 4);
    }
    let formatted = clean;
    if (clean.length >= 2) {
      formatted = `${clean.slice(0, 2)}/${clean.slice(2)}`;
    }
    if (input.endsWith('/') && clean.length === 2) {
      formatted = clean.slice(0, 1);
    }
    setProfileExpiry(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/[^\d]/g, '').slice(0, 3);
    setProfileCvv(clean);
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
      
      const index = registered.findIndex((u: User & { password?: string }) => u.email.toLowerCase() === targetEmail.toLowerCase());

      const updatedUserObj = {
        name: profileName,
        email: profileEmail,
        cpf: profileCpf,
        cep: profileCep,
        card: profileCard,
        cardExpiry: profileExpiry,
        cardCvv: profileCvv,
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

      updateProfile(updatedUserObj);
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error(e);
      setFormError('Houve um contratempo interno ao tentar consolidar o registro.');
    }
  };

  if (!isUserLoggedIn) {
    return (
      <PageContainer maxWidth="md" py={10}>
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
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="lg" py={6}>
      {/* Navigation / Back Button */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <Button 
          variant="text" 
          onClick={() => navigate('/')}
          startIcon={<ArrowLeft size={16} />}
          sx={{ 
            color: '#64748b', 
            fontWeight: 600, 
            fontFamily: '"Space Grotesk", sans-serif', 
            textTransform: 'none',
            fontSize: '0.875rem',
            px: 2,
            py: 1,
            borderRadius: '8px',
            transition: 'all 0.2s',
            '&:hover': { 
              color: '#0f172a',
              bgcolor: '#f1f5f9'
            }
          }}
        >
          Voltar para a Loja
        </Button>
      </Box>

      {/* Main Profile Card Container */}
      <Card 
        elevation={0}
        sx={{ 
          borderRadius: '20px', 
          border: '1px solid #e2e8f0', 
          bgcolor: '#ffffff',
          boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04)',
          overflow: 'hidden'
        }}
      >
        {/* User Profile Info Header */}
        <Box 
          sx={{ 
            px: { xs: 3, md: 5 }, 
            pt: 4,
            pb: 3, 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            alignItems: 'center', 
            textAlign: { xs: 'center', sm: 'left' }, 
            gap: { xs: 2, sm: 3 }
          }}
        >
          <Box 
            sx={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              bgcolor: '#ffffff', 
              border: '4px solid #ffffff',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0,
              color: '#2563eb'
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                bgcolor: '#eff6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontFamily: '"Space Grotesk", sans-serif', 
                  fontWeight: 800,
                  fontSize: '2.5rem',
                  textTransform: 'uppercase'
                }}
              >
                {user.name.charAt(0)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontFamily: '"Space Grotesk", sans-serif', 
                fontWeight: 800, 
                color: '#0f172a',
                fontSize: '1.45rem',
                lineHeight: 1.2,
                mb: 0.5
              }}
            >
              {profileName || user.name}
            </Typography>
            
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#64748b', 
                fontSize: '0.875rem',
                fontWeight: 500
              }}
            >
              {profileEmail || user.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mx: { xs: 3, md: 5 }, borderColor: '#f1f5f9' }} />

        {/* Form Content Area */}
        <Box sx={{ px: { xs: 3, md: 5 }, py: 4 }}>
          {formError && (
            <Alert severity="error" sx={{ mb: 4, borderRadius: '12px' }}>
              {formError}
            </Alert>
          )}

          {saveSuccess && (
            <Alert severity="success" icon={<Check size={18} />} sx={{ mb: 4, borderRadius: '12px' }}>
              Suas alterações de cadastro foram salvas com sucesso!
            </Alert>
          )}

          <Grid container spacing={4}>
            {/* SECTION 1: DADOS PESSOAIS */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontFamily: '"Space Grotesk", sans-serif', 
                    fontWeight: 700, 
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    fontSize: '1rem'
                  }}
                >
                  <UserIcon size={18} color="#2563eb" />
                  Informações Pessoais
                </Typography>
              </Box>

              <Grid container spacing={3.5}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField 
                    label="Nome Completo"
                    variant="outlined" 
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    fullWidth
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        borderRadius: '12px',
                        bgcolor: '#ffffff',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: '#fafafa'
                        },
                        '&.Mui-focused': {
                          bgcolor: '#ffffff',
                          boxShadow: '0 0 0 4px rgba(37,99,235,0.06)'
                        }
                      } 
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField 
                    label="Endereço de E-mail"
                    variant="outlined" 
                    value={profileEmail}
                    disabled={true}
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock size={16} color="#94a3b8" />
                          </InputAdornment>
                        ),
                      }
                    }}
                    helperText="O e-mail não pode ser alterado."
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        borderRadius: '12px',
                        bgcolor: '#f1f5f9',
                        color: '#64748b',
                        '&.Mui-disabled': {
                          '& fieldset': {
                            borderColor: '#e2e8f0'
                          }
                        }
                      } 
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField 
                    label="CPF"
                    variant="outlined" 
                    placeholder="000.000.000-00"
                    value={profileCpf}
                    onChange={handleCpfChange}
                    disabled={Boolean(user?.cpf && user.cpf !== '' && user.cpf !== '/perfil')}
                    error={Boolean(cpfError)}
                    helperText={cpfError || (user?.cpf && user.cpf !== '' && user.cpf !== '/perfil' ? "CPF já cadastrado e não pode ser alterado." : "Insira o seu CPF (não poderá ser alterado depois).")}
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <IdIcon size={16} color="#94a3b8" />
                          </InputAdornment>
                        ),
                      },
                      htmlInput: {
                        maxLength: 14
                      }
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        borderRadius: '12px',
                        bgcolor: Boolean(user?.cpf && user.cpf !== '' && user.cpf !== '/perfil') ? '#f1f5f9' : '#ffffff',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: Boolean(user?.cpf && user.cpf !== '' && user.cpf !== '/perfil') ? '#f1f5f9' : '#fafafa',
                        },
                        '&.Mui-focused': {
                          bgcolor: '#ffffff',
                          boxShadow: '0 0 0 4px rgba(37,99,235,0.06)'
                        },
                        '&.Mui-disabled': {
                          '& fieldset': {
                            borderColor: '#e2e8f0'
                          }
                        }
                      } 
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
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
                            <CepIcon size={16} color="#94a3b8" />
                          </InputAdornment>
                        ),
                      },
                      htmlInput: {
                        maxLength: 9
                      }
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        borderRadius: '12px',
                        bgcolor: '#ffffff',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: '#fafafa'
                        },
                        '&.Mui-focused': {
                          bgcolor: '#ffffff',
                          boxShadow: '0 0 0 4px rgba(37,99,235,0.06)'
                        }
                      } 
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Divider sx={{ borderColor: '#f1f5f9', my: 1 }} />
            </Grid>

            {/* SECTION 2: CARTÃO */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    fontFamily: '"Space Grotesk", sans-serif', 
                    fontWeight: 700, 
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.25,
                    fontSize: '1rem'
                  }}
                >
                  <CardIcon size={18} color="#2563eb" />
                  Cartão
                </Typography>
              </Box>

              <Grid container spacing={3.5}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField 
                    label="Número do Cartão de Pagamento"
                    variant="outlined" 
                    placeholder="0000 0000 0000 0000"
                    value={profileCard}
                    onChange={handleCardChange}
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <CardIcon size={16} color="#94a3b8" />
                          </InputAdornment>
                        ),
                      }
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        borderRadius: '12px',
                        bgcolor: '#ffffff',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: '#fafafa'
                        },
                        '&.Mui-focused': {
                          bgcolor: '#ffffff',
                          boxShadow: '0 0 0 4px rgba(37,99,235,0.06)'
                        }
                      } 
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField 
                    label="Validade"
                    variant="outlined" 
                    placeholder="MM/AA"
                    value={profileExpiry}
                    onChange={handleExpiryChange}
                    fullWidth
                    slotProps={{
                      htmlInput: {
                        maxLength: 5
                      }
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        borderRadius: '12px',
                        bgcolor: '#ffffff',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: '#fafafa'
                        },
                        '&.Mui-focused': {
                          bgcolor: '#ffffff',
                          boxShadow: '0 0 0 4px rgba(37,99,235,0.06)'
                        }
                      } 
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField 
                    label="CVV"
                    variant="outlined" 
                    placeholder="123"
                    value={profileCvv}
                    onChange={handleCvvChange}
                    fullWidth
                    slotProps={{
                      htmlInput: {
                        maxLength: 3
                      }
                    }}
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        borderRadius: '12px',
                        bgcolor: '#ffffff',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: '#fafafa'
                        },
                        '&.Mui-focused': {
                          bgcolor: '#ffffff',
                          boxShadow: '0 0 0 4px rgba(37,99,235,0.06)'
                        }
                      } 
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderRadius: '12px', 
                      bgcolor: '#fffbeb', 
                      border: '1px solid #fef3c7', 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: 1.5
                    }}
                  >
                    <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <Typography variant="caption" sx={{ color: '#b45309', fontWeight: 600, lineHeight: 1.4 }}>
                      Aviso de Segurança: Insira apenas dados de cartão fictício/teste no Store-lab. Nunca preencha ou salve dados financeiros reais de faturamento.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button 
              variant="outlined" 
              onClick={logoutUser}
              startIcon={<LogOut size={16} />}
              sx={{ 
                py: 1.5, 
                px: 4,
                borderRadius: '12px', 
                fontWeight: 600, 
                fontFamily: '"Space Grotesk", sans-serif', 
                textTransform: 'none',
                fontSize: '0.9rem',
                color: '#64748b',
                borderColor: '#e2e8f0',
                borderWidth: '1.5px',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  borderColor: '#fca5a5',
                  color: '#ef4444',
                  bgcolor: '#fef2f2',
                  borderWidth: '1.5px'
                }
              }}
            >
              Sair da Conta
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSaveProfile}
              sx={{ 
                py: 1.5, 
                px: 5,
                borderRadius: '12px', 
                fontWeight: 700, 
                fontFamily: '"Space Grotesk", sans-serif',
                bgcolor: '#2563eb',
                color: '#ffffff',
                fontSize: '0.9rem',
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                transition: 'all 0.2s ease-in-out',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  bgcolor: '#1d4ed8',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 16px rgba(37, 99, 235, 0.3)'
                },
                '&:active': {
                  transform: 'translateY(0)'
                }
              }}
            >
              Salvar Alterações
            </Button>
          </Box>
        </Box>
      </Card>
    </PageContainer>
  );
};

export default ProfilePage;
