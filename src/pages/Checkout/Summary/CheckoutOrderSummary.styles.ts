import { SxProps, Theme } from '@mui/material';

export const summaryContainerStyle: SxProps<Theme> = {
  bgcolor: 'background.paper',
  p: { xs: 2, sm: 2.25 },
  borderRadius: '20px',
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: 1.25,
};

export const summaryTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  fontSize: '1.05rem',
  color: 'text.primary',
  pb: 0.75,
  borderBottom: '1px solid',
  borderColor: 'divider',
};

export const summaryLineRowStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'text.secondary',
  fontSize: '0.875rem',
};

export const summaryTotalRowStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  pt: 1.25,
  borderTop: '2px dashed',
  borderColor: 'divider',
  color: 'text.primary',
};

export const summaryTotalAmountStyle: SxProps<Theme> = {
  fontWeight: 800,
  fontFamily: '"Space Grotesk", sans-serif',
  color: 'primary.main',
  fontSize: '1.25rem',
};

export const summaryFinanceBlockStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.85,
  pt: 1.25,
  borderTop: '1px solid',
  borderColor: 'divider',
};

export const summaryShippingSectionStyle: SxProps<Theme> = {
  pt: 0.5,
};

export const summaryCouponSectionStyle: SxProps<Theme> = {
  pt: 1,
  borderTop: '1px solid',
  borderColor: 'divider',
};

export const summaryCheckoutButtonStyle: SxProps<Theme> = {
  py: 1.4,
  borderRadius: '12px',
  fontWeight: 800,
  fontFamily: '"Space Grotesk", sans-serif',
  fontSize: '0.95rem',
  textTransform: 'none',
  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
};
