import { SxProps, Theme } from '@mui/material';

export const headerAppBarStyles: SxProps<Theme> = {
  bgcolor: 'background.paper',
  color: 'text.primary',
  zIndex: (theme) => theme.zIndex.drawer + 1,
};

export const headerLogoBoxStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  gap: 1.5,
  flexShrink: 0,
  '&:hover opacity': 0.95,
};

export const headerLogoTitleStyles: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  letterSpacing: '-0.04em',
  color: 'text.primary',
  display: { xs: 'none', sm: 'inline-flex' },
  alignItems: 'baseline',
  fontSize: { sm: '1.25rem', md: '1.4rem' },
  lineHeight: 1,
  gap: '1px',
};

export const headerLogoHyphenStyles: SxProps<Theme> = {
  color: '#2563eb',
  fontWeight: 800,
  fontSize: '1em',
  lineHeight: 1,
  verticalAlign: 'baseline',
};

export const headerLogoSuffixStyles: SxProps<Theme> = {
  color: '#2563eb',
  fontWeight: 400,
  fontSize: '1em',
  lineHeight: 1,
  verticalAlign: 'baseline',
};

export const headerProfileButtonStyle = (isProfilePage: boolean): SxProps<Theme> => ({
  color: isProfilePage ? 'primary.main' : 'text.primary',
  fontWeight: 650,
  fontSize: '0.88rem',
  borderRadius: '24px',
  pl: 0.6,
  pr: 1.6,
  py: 0,
  height: 38,
  minHeight: 38,
  textTransform: 'none',
  minWidth: 'auto',
  display: { xs: 'none', sm: 'inline-flex' },
  alignItems: 'center',
  gap: 1.25,
  border: '1px solid',
  borderColor: isProfilePage ? 'primary.light' : 'transparent',
  bgcolor: isProfilePage ? '#eff6ff' : 'transparent',
  transition: 'all 0.15s ease',
  '&:hover': {
    color: 'primary.main',
    bgcolor: '#f1f5f9',
    borderColor: 'divider',
  },
});

export const headerUserAvatarBoxStyle: SxProps<Theme> = {
  width: 32,
  height: 32,
  minWidth: 32,
  minHeight: 32,
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: '#eff6ff',
  color: 'primary.main',
  border: '1.5px solid #bfdbfe',
  boxShadow: '0 1px 4px rgba(37, 99, 235, 0.1)',
  flexShrink: 0,
};

export const headerUserAvatarImageStyle: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

export const headerLoginButtonStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontWeight: 650,
  fontSize: '0.85rem',
  borderRadius: '8px',
  px: 1.5,
  py: 0,
  height: 36,
  minHeight: 36,
  textTransform: 'none',
  minWidth: 'auto',
  display: { xs: 'none', sm: 'inline-flex' },
  '&:hover': {
    color: 'primary.main',
    bgcolor: 'action.hover',
  },
};

export const headerContainerStyles: SxProps<Theme> = {
  px: { xs: 1.5, sm: 3 },
};

export const headerToolbarStyles: SxProps<Theme> = {
  justifyContent: 'space-between',
  minHeight: '64px',
  width: '100%',
  gap: { xs: 1, sm: 2 },
};

export const headerSearchWrapperStyles: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  mx: { xs: 0.5, sm: 4, md: 8 },
  minWidth: 0,
};

export const headerSearchClearButtonStyles: SxProps<Theme> = {
  p: 0.5,
  color: 'text.secondary',
  '&:hover': { color: 'text.primary' },
};

export const headerSearchInputStyles: SxProps<Theme> = {
  fontSize: '0.875rem',
  color: 'text.primary',
  '& input::placeholder': {
    color: 'text.secondary',
    opacity: 1,
  },
};

export const headerActionGroupStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: { xs: 0.5, sm: 1.5 },
  flexShrink: 0,
};

export const headerCartButtonStyles = (isCartPage: boolean): SxProps<Theme> => ({
  color: isCartPage ? '#ffffff' : 'text.secondary',
  bgcolor: isCartPage ? 'primary.main' : 'action.selected',
  display: { xs: 'none', sm: 'inline-flex' },
  '&:hover': {
    bgcolor: isCartPage ? 'primary.dark' : 'action.hover',
  },
  width: '40px',
  height: '40px',
  borderRadius: '50%',
});

export const headerCartBadgeStyles = (isCartPage: boolean): SxProps<Theme> => ({
  '& .MuiBadge-badge': {
    fontSize: '0.7rem',
    height: '18px',
    minWidth: '18px',
    fontFamily: '"Space Grotesk", sans-serif',
    fontWeight: 700,
    bgcolor: isCartPage ? 'secondary.main' : 'primary.main',
    color: '#ffffff',
  },
});

export const headerLogoutButtonStyles: SxProps<Theme> = {
  color: '#ef4444',
  width: '40px',
  height: '40px',
  display: { xs: 'none', sm: 'inline-flex' },
  '&:hover': { bgcolor: 'action.hover' },
};

export const headerMenuMobileButtonStyles: SxProps<Theme> = {
  color: 'text.primary',
  width: '40px',
  height: '40px',
  display: { xs: 'inline-flex', sm: 'none' },
  '&:hover': { bgcolor: 'action.hover' },
};

export const mobileDrawerBrandGroupStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export const mobileDrawerBrandTitleStyles: SxProps<Theme> = {
  fontWeight: 800,
  fontFamily: '"Space Grotesk", sans-serif',
};

export const mobileDrawerAuthButtonGroupStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1.25,
  mt: 'auto',
  pt: 2,
};

export const mobileDrawerLogoutButtonStyle: SxProps<Theme> = {
  borderRadius: 2.5,
  py: 1.4,
  px: 2,
  color: '#ef4444',
  fontWeight: 600,
  fontSize: '0.92rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 1.75,
  textTransform: 'none',
  width: '100%',
  mt: 'auto',
  transition: 'all 0.15s ease-in-out',
  '&:hover': {
    bgcolor: '#fef2f2',
    color: '#dc2626',
  },
};

export const mobileDrawerUserTitleStyles: SxProps<Theme> = {
  fontWeight: 700,
  color: '#1e3a8a',
  lineHeight: 1.2,
  fontSize: '0.95rem',
};

export const mobileDrawerUserEmailStyles: SxProps<Theme> = {
  color: 'text.secondary',
  display: 'block',
  mt: 0.35,
};

export const mobileDrawerVisitorSubtitleStyles: SxProps<Theme> = {
  color: 'text.secondary',
  display: 'block',
  mt: 0.35,
};

export const searchContainerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  bgcolor: 'background.default',
  px: { xs: 1.5, sm: 2 },
  py: 0.75,
  borderRadius: '30px',
  width: '100%',
  maxWidth: '480px',
  border: '1px solid transparent',
  transition: 'all 0.2s',
  '&:focus-within': {
    bgcolor: 'background.paper',
    borderColor: 'primary.main',
    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.15)',
  },
};

export const mobileDrawerPaperStyles: SxProps<Theme> = {
  width: 320,
  maxWidth: '85vw',
  boxSizing: 'border-box',
  p: { xs: 2.5, sm: 3 },
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.paper',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: '#cbd5e1 transparent',
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    bgcolor: '#cbd5e1',
    borderRadius: '8px',
  },
};

export const mobileDrawerHeaderStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  pb: 1.5,
};

export const mobileDrawerUserCardStyles: SxProps<Theme> = {
  p: 2,
  my: 2,
  borderRadius: 3,
  bgcolor: '#eff6ff',
  border: '1px solid #bfdbfe',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

export const mobileDrawerAvatarBoxStyle: SxProps<Theme> = {
  width: 52,
  height: 52,
  minWidth: 52,
  minHeight: 52,
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: '#dbeafe',
  color: '#1d4ed8',
  border: '2px solid #93c5fd',
  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.12)',
  flexShrink: 0,
};

export const mobileDrawerAvatarImageStyle: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

export const mobileDrawerNavListStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1.25,
  flexGrow: 1,
  py: 1,
};

export const mobileDrawerItemButtonStyles = (isActive: boolean): SxProps<Theme> => ({
  borderRadius: 2.5,
  py: 1.4,
  px: 2,
  color: isActive ? 'primary.main' : 'text.primary',
  bgcolor: isActive ? '#eff6ff' : 'transparent',
  fontWeight: isActive ? 700 : 550,
  fontSize: '0.92rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 1.75,
  textTransform: 'none',
  width: '100%',
  transition: 'all 0.15s ease-in-out',
  '&:hover': {
    bgcolor: '#f1f5f9',
    color: 'primary.main',
  },
});

export const mobileDrawerLoginButtonStyle: SxProps<Theme> = {
  py: 1.4,
  px: 2,
  borderRadius: 2.5,
  fontWeight: 700,
  fontSize: '0.92rem',
  textTransform: 'none',
  bgcolor: 'primary.main',
  color: '#ffffff',
  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1.5,
  '&:hover': {
    bgcolor: 'primary.dark',
    boxShadow: '0 6px 18px rgba(37, 99, 235, 0.35)',
  },
};

export const mobileDrawerRegisterButtonStyle: SxProps<Theme> = {
  py: 1.3,
  px: 2,
  borderRadius: 2.5,
  fontWeight: 650,
  fontSize: '0.92rem',
  textTransform: 'none',
  border: '1.5px solid',
  borderColor: 'divider',
  color: 'text.primary',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1.5,
  '&:hover': {
    bgcolor: '#f8fafc',
    borderColor: 'primary.main',
    color: 'primary.main',
  },
};

