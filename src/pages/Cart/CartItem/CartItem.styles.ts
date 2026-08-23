import { SxProps, Theme } from '@mui/material';

export const cartItemPaperStyle: SxProps<Theme> = {
  p: 2.5,
  borderRadius: '16px',
  border: '1px solid #f1f5f9',
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  gap: 2.5,
  alignItems: 'center',
  position: 'relative',
};

export const cartItemImageWrapperStyle: SxProps<Theme> = {
  width: { xs: '100%', sm: '110px' },
  height: '110px',
  borderRadius: '12px',
  overflow: 'hidden',
  bgcolor: '#f8fafc',
  position: 'relative',
  flexShrink: 0,
  cursor: 'pointer',
  transition: 'opacity 0.2s',
  '&:hover': {
    opacity: 0.82,
  },
};

export const cartItemTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  color: '#0f172a',
  mb: 0.5,
  fontSize: '1.05rem',
  lineHeight: 1.3,
  cursor: 'pointer',
  transition: 'color 0.2s',
  '&:hover': {
    color: '#2563eb',
  },
};

export const quantityControlsStyle: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  bgcolor: '#f1f5f9',
  borderRadius: '20px',
  border: '1px solid #e2e8f0',
  px: 1,
  py: 0.25,
};
