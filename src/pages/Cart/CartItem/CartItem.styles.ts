import { SxProps, Theme } from '@mui/material';

export const cartItemPaperStyle: SxProps<Theme> = {
  p: { xs: 2, sm: 2.5 },
  borderRadius: '16px',
  border: '1px solid #f1f5f9',
  bgcolor: '#ffffff',
  display: 'flex',
  flexDirection: 'row',
  gap: { xs: 2, sm: 2.5 },
  alignItems: 'flex-start',
  position: 'relative',
  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
  '&:hover': {
    borderColor: '#e2e8f0',
    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
  },
};

export const cartItemImageWrapperStyle: SxProps<Theme> = {
  width: { xs: '88px', sm: '110px' },
  height: { xs: '88px', sm: '110px' },
  borderRadius: '12px',
  overflow: 'hidden',
  bgcolor: '#f8fafc',
  position: 'relative',
  flexShrink: 0,
  cursor: 'pointer',
  transition: 'opacity 0.2s',
  '&:hover': {
    opacity: 0.85,
  },
};

export const cartItemContentStyle: SxProps<Theme> = {
  flexGrow: 1,
  minWidth: 0,
  pr: { xs: 3.5, sm: 4 },
  display: 'flex',
  flexDirection: 'column',
};

export const cartItemTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  color: '#0f172a',
  mb: 0.5,
  fontSize: { xs: '0.95rem', sm: '1.05rem' },
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
  px: 0.75,
  py: 0.25,
};

export const cartItemRemoveButtonStyle: SxProps<Theme> = {
  position: 'absolute',
  top: { xs: 12, sm: 16 },
  right: { xs: 12, sm: 16 },
  color: '#94a3b8',
  p: 0.75,
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '#ef4444',
    bgcolor: '#fef2f2',
  },
};
