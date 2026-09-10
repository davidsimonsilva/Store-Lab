import { SxProps, Theme } from '@mui/material';

export const productDetailCardStyle: SxProps<Theme> = {
  p: { xs: 3, md: 4 },
  bgcolor: 'background.paper',
  borderRadius: '24px',
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
  display: 'flex',
  flexDirection: 'column',
};

export const mainImageWrapperStyle: SxProps<Theme> = {
  width: '100%',
  height: { xs: '320px', sm: '420px', md: '460px' },
  bgcolor: 'background.paper',
  borderRadius: '24px',
  border: '1px solid',
  borderColor: 'divider',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
};

export const specCardStyle: SxProps<Theme> = {
  p: { xs: 3, md: 4 },
  bgcolor: 'background.paper',
  borderRadius: '24px',
  border: '1px solid',
  borderColor: 'divider',
  height: '100%',
  boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
};

export const basicDescriptionTextStyle: SxProps<Theme> = {
  color: '#475569',
  lineHeight: 1.8,
  fontSize: '0.925rem',
  textAlign: 'justify',
  textJustify: 'inter-word',
  hyphens: 'auto',
  letterSpacing: '0.01em',
  mb: 2,
  '&:last-child': {
    mb: 0,
  },
};

export const purchaseLimitBadgeStyle: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.75,
  px: 1.25,
  py: 0.5,
  borderRadius: '8px',
  bgcolor: '#eff6ff',
  border: '1px solid #dbeafe',
  color: '#1d4ed8',
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.01em',
};

export const shippingSimulationContainerStyle: SxProps<Theme> = {
  mt: 2,
  p: 1.5,
  bgcolor: '#f8fafc',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

export const shippingSimulationOptionCardStyle: SxProps<Theme> = {
  p: 1.25,
  px: 1.5,
  bgcolor: '#ffffff',
  borderRadius: '10px',
  border: '1px solid #e2e8f0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  transition: 'all 0.2s ease',
  boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
};

export const shippingSimulationTextColStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.25,
};

export const shippingSimulationOptionNameStyle: SxProps<Theme> = {
  fontWeight: 700,
  color: '#0f172a',
  fontSize: '0.85rem',
  lineHeight: 1.3,
};

export const shippingSimulationOptionDaysStyle: SxProps<Theme> = {
  color: '#64748b',
  fontSize: '0.75rem',
  fontWeight: 500,
};

export const getShippingSimulationPriceStyle = (isFree: boolean): SxProps<Theme> => ({
  fontWeight: 800,
  color: isFree ? '#16a34a' : '#0f172a',
  fontSize: '0.925rem',
  fontFamily: '"Space Grotesk", sans-serif',
});

export const shippingCepConsultButtonStyle: SxProps<Theme> = {
  bgcolor: '#f1f5f9',
  color: '#475569',
  borderRadius: '12px',
  height: '44px',
  minHeight: '44px',
  width: '108px',
  minWidth: '108px',
  fontWeight: 700,
  fontFamily: '"Space Grotesk", sans-serif',
  textTransform: 'none',
  fontSize: '0.875rem',
  boxShadow: 'none',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  '&:hover': { bgcolor: '#e2e8f0', boxShadow: 'none' },
};

export const productActionButtonsContainerStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  mt: 2,
};

export const productBuyButtonStyle: SxProps<Theme> = {
  flexGrow: 1,
  height: 50,
  borderRadius: '12px',
  fontWeight: 700,
  fontFamily: '"Space Grotesk", sans-serif',
  bgcolor: '#2563eb',
  color: '#ffffff',
  textTransform: 'none',
  fontSize: '1rem',
  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: '#1d4ed8',
    boxShadow: '0 6px 18px rgba(37, 99, 235, 0.35)',
  },
};

export const productCartIconButtonStyle: SxProps<Theme> = {
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  width: 50,
  height: 50,
  minWidth: 50,
  minHeight: 50,
  color: '#2563eb',
  bgcolor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: '#f8fafc',
    borderColor: '#cbd5e1',
  },
};

export const productCartBadgeStyle: SxProps<Theme> = {
  '& .MuiBadge-badge': {
    fontFamily: '"Space Grotesk", sans-serif',
    fontWeight: 700,
    fontSize: '0.75rem',
  },
};

