import { SxProps, Theme } from '@mui/material';

export const cartHeaderStyle: SxProps<Theme> = {
  mb: 4,
};

export const cartTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  color: 'text.primary',
  letterSpacing: '-0.02em',
  mb: 0.5,
};

export const cartSubtitleStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.95rem',
};

export const cartAlertStyle: SxProps<Theme> = {
  mb: 4,
  borderRadius: '12px',
  border: '1px solid #bfdbfe',
};

export const emptyCartContainerStyle: SxProps<Theme> = {
  minHeight: { xs: 'auto', md: '540px' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  py: { xs: 2, md: 4 },
};

export const emptyCartCardStyle: SxProps<Theme> = {
  p: { xs: 4, sm: 6 },
  textAlign: 'center',
  bgcolor: '#ffffff',
  borderRadius: '16px',
  border: '1px solid #e2e8f0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '680px',
  width: '100%',
  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
};

export const emptyCartIconBoxStyle: SxProps<Theme> = {
  bgcolor: '#eff6ff',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  mb: 3,
  color: '#2563eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const checkoutDialogPaperStyle: React.CSSProperties = {
  borderRadius: '24px',
  padding: '12px',
};
