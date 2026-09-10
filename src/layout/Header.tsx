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
  Button,
  Drawer,
  Divider,
} from '@mui/material';
import { 
  Search as SearchIcon, 
  ShoppingCart as CartIcon, 
  User as UserIcon, 
  LogOut as LogOutIcon,
  X as ClearIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  MapPin as AddressIcon,
  CreditCard as CardIcon,
  Package as PackageIcon,
  LogIn as LogInIcon,
  UserPlus as RegisterIcon,
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo/BrandLogo';
import { formatUrlName } from '../utils/formatters';
import {
  headerAppBarStyles,
  headerLogoBoxStyles,
  headerLogoTitleStyles,
  headerLogoHyphenStyles,
  headerLogoSuffixStyles,
  headerProfileButtonStyle,
  headerUserAvatarBoxStyle,
  headerUserAvatarImageStyle,
  headerLoginButtonStyle,
  headerContainerStyles,
  headerToolbarStyles,
  headerSearchWrapperStyles,
  headerSearchClearButtonStyles,
  headerSearchInputStyles,
  headerActionGroupStyles,
  headerCartButtonStyles,
  headerCartBadgeStyles,
  headerLogoutButtonStyles,
  headerMenuMobileButtonStyles,
  searchContainerStyles,
  mobileDrawerPaperStyles,
  mobileDrawerHeaderStyles,
  mobileDrawerBrandGroupStyles,
  mobileDrawerBrandTitleStyles,
  mobileDrawerUserCardStyles,
  mobileDrawerAvatarBoxStyle,
  mobileDrawerAvatarImageStyle,
  mobileDrawerUserTitleStyles,
  mobileDrawerUserEmailStyles,
  mobileDrawerVisitorSubtitleStyles,
  mobileDrawerNavListStyles,
  mobileDrawerItemButtonStyles,
  mobileDrawerAuthButtonGroupStyles,
  mobileDrawerLoginButtonStyle,
  mobileDrawerRegisterButtonStyle,
  mobileDrawerLogoutButtonStyle,
} from './Header.styles';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, anonymousUserId, logoutUser } = useAuth();
  const { cartItems } = useCart();
  const { searchQuery, setSearchQuery } = useUIState();

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  const isSearchVisible = location.pathname === '/';

  if (!isHeaderVisible) {
    return null;
  }

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const profilePath = user?.name ? `/perfil/${formatUrlName(user.name)}` : '/perfil';
  const getProfileTabPath = (tab?: string) => {
    const base = user?.name ? `/perfil/${formatUrlName(user.name)}` : '/perfil';
    return tab ? `${base}?tab=${tab}` : base;
  };

  const handleLogoClick = () => {
    setSearchTerm('');
    setSearchQuery('');
    setMobileMenuOpen(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);

    if (`${location.pathname}${location.search}` !== path && location.pathname !== path) {
      navigate(path);
    }
  };

  const handleLogoutClick = () => {
    setMobileMenuOpen(false);
    logoutUser();
  };

  return (
    <>
      <AppBar position="sticky" sx={headerAppBarStyles}>
        <Container maxWidth="lg" sx={headerContainerStyles}>
          <Toolbar disableGutters sx={headerToolbarStyles}>
            <Box onClick={handleLogoClick} sx={headerLogoBoxStyles}>
              <BrandLogo size="small" onClick={handleLogoClick} />
              <Typography 
                variant="h5" 
                noWrap 
                sx={headerLogoTitleStyles}
              >
                <span>Store</span>
                <Box component="span" sx={headerLogoHyphenStyles}>-</Box>
                <Box component="span" sx={headerLogoSuffixStyles}>lab</Box>
              </Typography>
            </Box>

            {isSearchVisible ? (
              <Box sx={headerSearchWrapperStyles}>
                <Box sx={searchContainerStyles}>
                  <SearchIcon size={18} color="#94a3b8" style={{ marginRight: '8px', flexShrink: 0 }} />
                  <InputBase
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Pesquisar produto"
                    fullWidth
                    endAdornment={
                      searchTerm ? (
                        <IconButton
                          size="small"
                          onClick={handleClearSearch}
                          aria-label="Limpar pesquisa"
                          sx={headerSearchClearButtonStyles}
                        >
                          <ClearIcon size={16} />
                        </IconButton>
                      ) : null
                    }
                    sx={headerSearchInputStyles}
                  />
                </Box>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 1 }} />
            )}

            <Box sx={headerActionGroupStyles}>
              {!isLoginPage && (
                <>
                  {user ? (
                    <Tooltip title={`Sessão de ${user.name}`}>
                      <Button
                        onClick={() => navigate(profilePath)}
                        sx={headerProfileButtonStyle(isProfilePage)}
                      >
                        <Box sx={headerUserAvatarBoxStyle}>
                          {user.avatarUrl ? (
                            <Box
                              component="img"
                              src={user.avatarUrl}
                              alt={user.name}
                              sx={headerUserAvatarImageStyle}
                            />
                          ) : (
                            <UserIcon size={18} />
                          )}
                        </Box>
                        <span>{user.name.split(' ')[0]}</span>
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Acessar sua conta">
                      <Button
                        onClick={() => navigate('/login')}
                        startIcon={<LogInIcon size={18} />}
                        sx={headerLoginButtonStyle}
                      >
                        <span>Entrar</span>
                      </Button>
                    </Tooltip>
                  )}

                  <Tooltip title="Seu Carrinho">
                    <IconButton 
                      aria-label="Seu carrinho de compras"
                      onClick={() => navigate('/carrinho')}
                      sx={headerCartButtonStyles(isCartPage)}
                    >
                      <Badge 
                        badgeContent={cartItemsCount} 
                        color="primary"
                        sx={headerCartBadgeStyles(isCartPage)}
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
                    sx={headerLogoutButtonStyles}
                  >
                    <LogOutIcon size={18} />
                  </IconButton>
                </Tooltip>
              )}

              {}
              <Tooltip title={mobileMenuOpen ? "Fechar Menu" : "Menu de Opções"}>
                <IconButton
                  aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu de opções"}
                  onClick={() => setMobileMenuOpen((prev) => !prev)}
                  sx={headerMenuMobileButtonStyles}
                >
                  {mobileMenuOpen ? <ClearIcon size={22} /> : <MenuIcon size={22} />}
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        disableScrollLock
        PaperProps={{
          sx: mobileDrawerPaperStyles,
        }}
      >
        <Box sx={mobileDrawerHeaderStyles}>
          <Box sx={mobileDrawerBrandGroupStyles}>
            <BrandLogo size="small" />
            <Typography variant="h6" sx={mobileDrawerBrandTitleStyles}>
              Store-lab
            </Typography>
          </Box>
          <IconButton onClick={() => setMobileMenuOpen(false)} aria-label="Fechar menu" size="small">
            <ClearIcon size={20} />
          </IconButton>
        </Box>

        {user ? (
          <Box sx={mobileDrawerUserCardStyles}>
            <Box sx={mobileDrawerAvatarBoxStyle}>
              {user.avatarUrl ? (
                <Box
                  component="img"
                  src={user.avatarUrl}
                  alt={user.name}
                  sx={mobileDrawerAvatarImageStyle}
                />
              ) : (
                <UserIcon size={26} />
              )}
            </Box>
            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography variant="subtitle2" sx={mobileDrawerUserTitleStyles}>
                {user.name}
              </Typography>
              <Typography variant="caption" sx={mobileDrawerUserEmailStyles} noWrap>
                {user.email}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={mobileDrawerUserCardStyles}>
            <Box sx={mobileDrawerAvatarBoxStyle}>
              <UserIcon size={26} />
            </Box>
            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography variant="subtitle2" sx={mobileDrawerUserTitleStyles}>
                Modo Visitante
              </Typography>
              <Typography variant="caption" sx={mobileDrawerVisitorSubtitleStyles}>
                Faça login para salvar pedidos e histórico.
              </Typography>
            </Box>
          </Box>
        )}

        <Box sx={mobileDrawerNavListStyles}>
          <Button
            onClick={() => handleNavClick('/')}
            sx={mobileDrawerItemButtonStyles(location.pathname === '/')}
            startIcon={<HomeIcon size={18} />}
          >
            Início / Produtos
          </Button>

          <Button
            onClick={() => handleNavClick('/carrinho')}
            sx={mobileDrawerItemButtonStyles(isCartPage)}
            startIcon={<CartIcon size={18} />}
          >
            Meu Carrinho ({cartItemsCount} {cartItemsCount === 1 ? 'item' : 'itens'})
          </Button>

          <Button
            onClick={() => handleNavClick(profilePath)}
            sx={mobileDrawerItemButtonStyles(isProfilePage && (!location.search || location.search.includes('tab=dados') || location.search.includes('tab=personal')))}
            startIcon={<UserIcon size={18} />}
          >
            Meu Perfil
          </Button>

          {user && (
            <>
              <Button
                onClick={() => handleNavClick(getProfileTabPath('enderecos'))}
                sx={mobileDrawerItemButtonStyles(isProfilePage && (location.search.includes('tab=enderecos') || location.search.includes('tab=addresses')))}
                startIcon={<AddressIcon size={18} />}
              >
                Meus Endereços
              </Button>

              <Button
                onClick={() => handleNavClick(getProfileTabPath('cartoes'))}
                sx={mobileDrawerItemButtonStyles(isProfilePage && (location.search.includes('tab=cartoes') || location.search.includes('tab=cards')))}
                startIcon={<CardIcon size={18} />}
              >
                Cartões Salvos
              </Button>

              <Button
                onClick={() => handleNavClick(getProfileTabPath('pedidos'))}
                sx={mobileDrawerItemButtonStyles(isProfilePage && (location.search.includes('tab=pedidos') || location.search.includes('tab=orders')))}
                startIcon={<PackageIcon size={18} />}
              >
                Meus Pedidos
              </Button>
            </>
          )}

          {!user ? (
            <Box sx={mobileDrawerAuthButtonGroupStyles}>
              <Button
                onClick={() => handleNavClick('/login')}
                sx={mobileDrawerLoginButtonStyle}
                startIcon={<LogInIcon size={18} />}
              >
                Entrar na Conta
              </Button>

              <Button
                onClick={() => handleNavClick('/cadastro')}
                sx={mobileDrawerRegisterButtonStyle}
                startIcon={<RegisterIcon size={18} />}
              >
                Criar Conta
              </Button>
            </Box>
          ) : (
            <Button
              onClick={handleLogoutClick}
              sx={mobileDrawerLogoutButtonStyle}
              startIcon={<LogOutIcon size={18} />}
            >
              Sair da Conta
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
};

