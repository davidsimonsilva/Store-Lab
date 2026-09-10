import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Card,
  Tooltip,
} from '@mui/material';
import {
  User as UserIcon,
  MapPin,
  CreditCard,
  Package,
  Camera,
  LogIn,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { authService } from '../../services/authService';
import { PageContainer } from '../../components/ui/PageContainer';
import { AppBreadcrumbs } from '../../components/Breadcrumbs/AppBreadcrumbs';
import { ProfileAvatarSelector } from './PersonalData/ProfileAvatarSelector';
import { ProfileDataTab } from './PersonalData/ProfileDataTab';
import { ProfileAddressesTab } from './Addresses/ProfileAddressesTab';
import { ProfileCardsTab } from './Cards/ProfileCardsTab';
import { ProfileOrdersTab } from './Orders/ProfileOrdersTab';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import {
  profileHeroCardStyle,
  profileUserInfoWrapperStyle,
  profileAvatarContainerStyle,
  profileAvatarCircleStyle,
  profileAvatarImageStyle,
  profileAvatarBadgeStyle,
  profileTitleStyle,
  profileSubtitleStyle,
  profileTabsCardStyle,
  profileTabsContainerStyle,
  profileTabItemStyle,
  profileTabContentWrapperStyle,
  profileUnauthContainerStyle,
  profileUnauthIconBoxStyle,
  profileUnauthTitleStyle,
  profileUnauthSubtitleStyle,
  profileUnauthButtonStyle,
  profileTabsStyle,
} from './Profile.styles';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isLoggedIn, updateProfile, anonymousUserId } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState(0);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  const tabTitles = [
    'Meus Dados',
    'Meus Endereços',
    'Cartões Salvos',
    'Meus Pedidos',
  ];

  useDocumentTitle({
    title: tabTitles[activeTab] || 'Meu Perfil',
    description: 'Gerencie seus dados de cadastro, endereços de entrega, cartões de crédito e histórico de compras na StoreLab.',
    ogTitle: 'Meu Perfil',
    ogDescription: 'Painel do cliente StoreLab para gestão de conta e pedidos.',
  });

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'orders' || tabParam === 'pedidos' || tabParam === '3') {
      setActiveTab(3);
    } else if (tabParam === 'cards' || tabParam === 'cartoes' || tabParam === '2') {
      setActiveTab(2);
    } else if (tabParam === 'addresses' || tabParam === 'enderecos' || tabParam === '1') {
      setActiveTab(1);
    } else if (tabParam === 'personal' || tabParam === 'dados' || tabParam === '0') {
      setActiveTab(0);
    }
  }, [searchParams]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    const tabNames = ['personal', 'addresses', 'cards', 'orders'];
    setSearchParams({ tab: tabNames[newValue] || 'personal' });
  };

  const handleSelectAvatar = (avatarUrl?: string) => {
    updateProfile({ avatarUrl, avatarId: avatarUrl ? 'custom' : undefined });

    try {
      if (user?.id) {
        authService.updateUser(user.id, { avatarUrl, avatarId: avatarUrl ? 'custom' : undefined });
      }
    } catch (e) {
      console.warn('Erro ao sincronizar avatar com storage:', e);
    }
    showToast(avatarUrl ? 'Foto de perfil atualizada com sucesso!' : 'Foto de perfil removida.', 'success');
  };

  if (!isLoggedIn || !user) {
    return (
      <PageContainer maxWidth="md">
        <Box sx={profileUnauthContainerStyle}>
          <Box sx={profileUnauthIconBoxStyle}>
            <UserIcon size={36} />
          </Box>
          <Typography variant="h5" sx={profileUnauthTitleStyle}>
            Acesso Restrito ao Perfil
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={profileUnauthSubtitleStyle}>
            Faça login na sua conta para acessar e gerenciar seus dados pessoais, endereços de entrega e pedidos.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              const target = anonymousUserId 
                ? `/login?redirect=perfil&anonId=${anonymousUserId}`
                : `/login?redirect=perfil`;
              navigate(target);
            }}
            startIcon={<LogIn size={18} />}
            sx={profileUnauthButtonStyle}
          >
            Entrar ou Criar Conta
          </Button>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="lg">

      <AppBreadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Meu Perfil' },
        ]}
      />

      <Card sx={profileHeroCardStyle}>
        <Box sx={profileUserInfoWrapperStyle}>
          <Box
            sx={profileAvatarContainerStyle}
            onClick={() => setAvatarModalOpen(true)}
            role="button"
            aria-label="Alterar foto de perfil"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setAvatarModalOpen(true);
              }
            }}
          >
            <Tooltip title="Alterar foto de perfil">
              <Box>
                {user.avatarUrl ? (
                  <Box sx={profileAvatarCircleStyle}>
                    <Box
                      component="img"
                      src={user.avatarUrl}
                      alt={user.name}
                      sx={profileAvatarImageStyle}
                    />
                  </Box>
                ) : (
                  <Box sx={profileAvatarCircleStyle}>
                    <UserIcon size={34} />
                  </Box>
                )}
              </Box>
            </Tooltip>
            <Box sx={profileAvatarBadgeStyle}>
              <Camera size={12} />
            </Box>
          </Box>

          <Box>
            <Typography variant="h5" sx={profileTitleStyle}>
              {user.name || 'Cliente StoreLab'}
            </Typography>
            <Box sx={profileSubtitleStyle}>
              <span>{user.email}</span>
            </Box>
          </Box>
        </Box>
      </Card>

      <Card sx={profileTabsCardStyle}>
        <Box sx={profileTabsContainerStyle}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            textColor="primary"
            indicatorColor="primary"
            sx={profileTabsStyle}
          >
            <Tab
              icon={<UserIcon size={18} />}
              label="Dados Pessoais"
              sx={profileTabItemStyle}
            />
            <Tab
              icon={<MapPin size={18} />}
              label="Endereços"
              sx={profileTabItemStyle}
            />
            <Tab
              icon={<CreditCard size={18} />}
              label="Cartões Salvos"
              sx={profileTabItemStyle}
            />
            <Tab
              icon={<Package size={18} />}
              label="Meus Pedidos"
              sx={profileTabItemStyle}
            />
          </Tabs>
        </Box>

        <Box sx={profileTabContentWrapperStyle}>
          {activeTab === 0 && (
            <ProfileDataTab user={user} onUpdateUser={updateProfile} />
          )}

          {activeTab === 1 && (
            <ProfileAddressesTab user={user} />
          )}

          {activeTab === 2 && (
            <ProfileCardsTab user={user} />
          )}

          {activeTab === 3 && (
            <ProfileOrdersTab user={user} />
          )}
        </Box>
      </Card>

      <ProfileAvatarSelector
        open={avatarModalOpen}
        currentAvatarUrl={user.avatarUrl}
        onClose={() => setAvatarModalOpen(false)}
        onSelectAvatar={handleSelectAvatar}
      />
    </PageContainer>
  );
};

export default ProfilePage;
