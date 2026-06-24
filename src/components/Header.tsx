import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  InputBase, 
  IconButton, 
  Badge, 
  Box, 
  Container,
  Tooltip,
  Button
} from '@mui/material';
import { 
  Search as SearchIcon, 
  ShoppingCart as CartIcon, 
  User as UserIcon, 
  LogOut as LogOutIcon
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    activeView, 
    searchQuery, 
    setSearchQuery, 
    cart, 
    user, 
    anonymousUserId,
    logoutUser, 
    isHeaderVisible, 
    isSearchVisible
  } = useGlobalState();

  if (!isHeaderVisible()) {
    return null;
  }

  const currentUserId = user?.isLoggedIn ? user.id : anonymousUserId;
  const cartItemsCount = cart
    .filter((item) => item.userId === currentUserId)
    .reduce((total, item) => total + item.quantity, 0);

  const handleLogoClick = () => {
    setSearchQuery('');
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'background.paper', 
        color: 'text.primary',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '64px' }}>
          <Box 
            onClick={handleLogoClick}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              userSelect: 'none',
              gap: 1.5,
              '&:hover opacity': 0.95
            }}
          >
            <BrandLogo size="small" onClick={handleLogoClick} />
            <Typography 
              variant="h5" 
              noWrap 
              sx={{ 
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 800, 
                letterSpacing: '-0.04em',
                color: 'text.primary',
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                gap: '1px'
              }}
            >
              <span>Store</span>
              <Box component="span" sx={{ color: '#2563eb', fontWeight: 900 }}>-</Box>
              <Box component="span" sx={{ color: '#2563eb', fontWeight: 300, fontSize: '0.95em' }}>lab</Box>
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mx: { xs: 1, sm: 4, md: 8 } }}>
            {isSearchVisible() ? (
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  bgcolor: 'background.default', 
                  px: 2, 
                  py: 0.75, 
                  borderRadius: '30px', 
                  width: '100%',
                  maxWidth: '480px',
                  border: '1px solid transparent',
                  transition: 'all 0.2s',
                  '&:focus-within': {
                    bgcolor: 'background.paper',
                    borderColor: 'primary.main',
                    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.15)'
                  }
                }}
              >
                <SearchIcon size={18} color="#94a3b8" style={{ marginRight: '8px', flexShrink: 0 }} />
                <InputBase
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar produtos..."
                  fullWidth
                  sx={{ 
                    fontSize: '0.875rem',
                    color: 'text.primary',
                    '& input::placeholder': {
                      color: 'text.secondary',
                      opacity: 1
                    }
                  }}
                />
              </Box>
            ) : (
              <Box sx={{ width: '100%', maxWidth: '480px' }} />
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Tooltip title={user ? `Sessão de ${user.name}` : "Perfil do Usuário"}>
              <Button
                onClick={() => navigate(`/perfil/${user?.isLoggedIn ? user.id : anonymousUserId}`)}
                startIcon={<UserIcon size={18} />}
                sx={{
                  color: activeView === 'profile' ? 'primary.main' : 'text.secondary',
                  fontWeight: 650,
                  fontSize: '0.85rem',
                  borderRadius: '8px',
                  px: 1.5,
                  py: 0.8,
                  textTransform: 'none',
                  minWidth: 'auto',
                  '&:hover': {
                    color: 'primary.main',
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  {user ? user.name.split(' ')[0] : 'Perfil'}
                </Box>
              </Button>
            </Tooltip>

            <Tooltip title="Seu Carrinho">
              <IconButton 
                onClick={() => navigate(`/carrinho/${user?.isLoggedIn ? user.id : anonymousUserId}`)}
                sx={{ 
                  color: activeView === 'cart' ? '#ffffff' : 'text.secondary',
                  bgcolor: activeView === 'cart' ? 'primary.main' : 'action.selected',
                  '&:hover': { 
                    bgcolor: activeView === 'cart' ? 'primary.dark' : 'action.hover' 
                  },
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%'
                }}
              >
                <Badge 
                  badgeContent={cartItemsCount} 
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.7rem',
                      height: '18px',
                      minWidth: '18px',
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 700,
                      bgcolor: activeView === 'cart' ? 'secondary.main' : 'primary.main',
                      color: '#ffffff'
                    }
                  }}
                >
                  <CartIcon size={18} />
                </Badge>
              </IconButton>
            </Tooltip>

            {user && (
              <Tooltip title="Sair da Conta">
                <IconButton 
                  onClick={logoutUser}
                  sx={{ 
                    color: '#ef4444',
                    width: '40px',
                    height: '40px',
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  <LogOutIcon size={18} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
