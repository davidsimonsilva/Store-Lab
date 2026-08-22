import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useUIState } from '../context/UIStateContext';
import { useDebounce } from '../hooks/useDebounce';
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
  LogOut as LogOutIcon,
  X as ClearIcon
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo/BrandLogo';
import {
  headerAppBarStyles,
  headerLogoBoxStyles,
  searchContainerStyles
} from './Header.styles';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, anonymousUserId, logoutUser } = useAuth();
  const { cartItems } = useCart();
  const { searchQuery, setSearchQuery } = useUIState();

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery(debouncedSearchTerm);
    if (debouncedSearchTerm && debouncedSearchTerm.trim() !== '' && location.pathname !== '/') {
      navigate('/');
    }
  }, [debouncedSearchTerm]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchQuery('');
  };

  const isProfilePage = location.pathname.startsWith('/perfil');
  const isCartPage = location.pathname.startsWith('/carrinho');
  const isLoginPage = location.pathname.startsWith('/login') || location.pathname.startsWith('/cadastro') || location.pathname.startsWith('/register');
  const isHeaderVisible = true;
  const isSearchVisible = !isProfilePage && !isCartPage && !isLoginPage;

  if (!isHeaderVisible) {
    return null;
  }

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogoClick = () => {
    setSearchTerm('');
    setSearchQuery('');
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppBar position="sticky" sx={headerAppBarStyles}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '64px' }}>
          <Box onClick={handleLogoClick} sx={headerLogoBoxStyles}>
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
            {isSearchVisible ? (
              <Box sx={searchContainerStyles}>
                <SearchIcon size={18} color="#94a3b8" style={{ marginRight: '8px', flexShrink: 0 }} />
                <InputBase
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar produtos..."
                  fullWidth
                  endAdornment={
                    searchTerm ? (
                      <IconButton
                        size="small"
                        onClick={handleClearSearch}
                        aria-label="Limpar pesquisa"
                        sx={{ p: 0.5, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                      >
                        <ClearIcon size={16} />
                      </IconButton>
                    ) : null
                  }
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
            {!isLoginPage && (
              <>
                <Tooltip title={user ? `Sessão de ${user.name}` : "Perfil do Usuário"}>
                  <Button
                    onClick={() => navigate(`/perfil/${user?.isLoggedIn ? user.id : anonymousUserId}`)}
                    startIcon={<UserIcon size={18} />}
                    sx={{
                      color: isProfilePage ? 'primary.main' : 'text.secondary',
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
                    aria-label="Seu carrinho de compras"
                    onClick={() => navigate(`/carrinho/${user?.isLoggedIn ? user.id : anonymousUserId}`)}
                    sx={{ 
                      color: isCartPage ? '#ffffff' : 'text.secondary',
                      bgcolor: isCartPage ? 'primary.main' : 'action.selected',
                      '&:hover': { 
                        bgcolor: isCartPage ? 'primary.dark' : 'action.hover' 
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
                          bgcolor: isCartPage ? 'secondary.main' : 'primary.main',
                          color: '#ffffff'
                        }
                      }}
                    >
                      <CartIcon size={18} />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </>
            )}

            {user && (
              <Tooltip title="Sair da Conta">
                <IconButton 
                  aria-label="Sair da conta"
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
