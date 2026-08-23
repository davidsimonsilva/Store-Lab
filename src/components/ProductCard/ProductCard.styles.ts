import { SxProps, Theme } from '@mui/material';

export const cardContainerStyle: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  p: 2,
  bgcolor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: '#cbd5e1',
    boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.05)',
  },
};

export const cardImageWrapperStyle: SxProps<Theme> = {
  height: '160px',
  bgcolor: '#f1f5f9',
  borderRadius: '12px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    bgcolor: '#e2e8f0',
  },
};

export const ratingBadgeStyle: SxProps<Theme> = {
  position: 'absolute',
  bottom: 8,
  right: 8,
  bgcolor: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'none',
  borderRadius: '6px',
  px: 0.75,
  py: 0.25,
  display: 'flex',
  alignItems: 'center',
  gap: 0.25,
};

export const categoryTagStyle: SxProps<Theme> = {
  textTransform: 'uppercase',
  fontWeight: 800,
  color: '#2563eb',
  fontSize: '10px',
  letterSpacing: '0.075em',
  display: 'block',
  mb: 0.5,
};

export const productTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontSize: '0.95rem',
  fontWeight: 700,
  lineHeight: 1.3,
  mb: 0.5,
  color: '#0f172a',
  height: '2.5rem',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
};

export const productDescStyle: SxProps<Theme> = {
  color: '#64748b',
  lineHeight: 1.4,
  mb: 2.5,
  fontSize: '0.75rem',
  height: '2.2rem',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
};

export const cardFooterStyle: SxProps<Theme> = {
  mt: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  pt: 1.5,
  borderTop: '1px solid #f1f5f9',
};

export const priceTextStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  color: '#0f172a',
  fontSize: '1.05rem',
  letterSpacing: '-0.02em',
};
