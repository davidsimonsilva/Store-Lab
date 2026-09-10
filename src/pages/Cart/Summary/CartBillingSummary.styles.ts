import { SxProps, Theme } from '@mui/material';

export const cartSummaryCardStyle: SxProps<Theme> = {
  p: { xs: 2, sm: 2.75 },
  borderRadius: '16px',
  border: '1px solid #e2e8f0',
  bgcolor: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

export const cartSummaryTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  fontSize: '1.15rem',
  color: '#0f172a',
  pb: 1.25,
  borderBottom: '1px solid #f1f5f9',
};

export const cartSummarySubtotalBlockStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const cartSummaryRowStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const cartSummaryLabelStyle: SxProps<Theme> = {
  color: '#64748b',
  fontSize: '0.875rem',
};

export const cartSummaryValueStyle: SxProps<Theme> = {
  fontWeight: 600,
  color: '#0f172a',
  fontSize: '0.925rem',
};

export const cartSummaryShippingBoxStyle: SxProps<Theme> = {
  pt: 1.75,
  borderTop: '1px solid #f1f5f9',
};

export const cartSummaryShippingTitleStyle: SxProps<Theme> = {
  color: '#0f172a',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  gap: 0.8,
  mb: 1.25,
  fontSize: '0.8rem',
  letterSpacing: '0.02em',
};

export const cartSummaryShippingInputRowStyle: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  alignItems: 'center',
};

export const cartSummaryShippingTextFieldStyle: SxProps<Theme> = {
  flex: 1,
};

export const cartSummaryShippingConsultButtonStyle: SxProps<Theme> = {
  borderRadius: '12px',
  height: '44px',
  minHeight: '44px',
  width: '108px',
  minWidth: '108px',
  fontWeight: 700,
  fontFamily: '"Space Grotesk", sans-serif',
  fontSize: '0.875rem',
  textTransform: 'none',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
};

export const cartSummaryShippingErrorStyle: SxProps<Theme> = {
  color: '#ef4444',
  display: 'block',
  mt: 1,
  fontWeight: 600,
  fontSize: '0.75rem',
};

export const cartSummaryShippingOptionsBoxStyle: SxProps<Theme> = {
  mt: 1.5,
  display: 'flex',
  flexDirection: 'column',
};

export const cartSummaryShippingOptionsSubtitleStyle: SxProps<Theme> = {
  color: '#475569',
  fontWeight: 600,
  display: 'block',
  mb: 0.75,
  fontSize: '0.75rem',
};

export const getCartSummaryShippingOptionPaperStyle = (isSelected: boolean): SxProps<Theme> => ({
  p: 1.25,
  px: 1.5,
  borderRadius: '10px',
  borderColor: isSelected ? '#2563eb' : '#e2e8f0',
  bgcolor: isSelected ? '#eff6ff' : '#ffffff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: '#2563eb',
    bgcolor: '#f8fafc',
  },
});

export const cartSummaryShippingOptionTextColStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  ml: 0.5,
};

export const cartSummaryShippingOptionNameStyle: SxProps<Theme> = {
  fontWeight: 600,
  color: '#0f172a',
  fontSize: '0.825rem',
  lineHeight: 1.2,
};

export const cartSummaryShippingOptionDaysStyle: SxProps<Theme> = {
  color: '#64748b',
  fontSize: '0.725rem',
  fontWeight: 500,
  mt: 0.2,
};

export const getCartSummaryShippingOptionPriceStyle = (isFree: boolean): SxProps<Theme> => ({
  fontWeight: 700,
  color: isFree ? '#10b981' : '#2563eb',
  fontSize: '0.85rem',
});

export const cartSummaryCouponWrapperStyle: SxProps<Theme> = {
  pt: 1.75,
  borderTop: '1px solid #f1f5f9',
};

export const cartSummaryConsolidationBlockStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1.25,
  pt: 2,
  borderTop: '1px solid #e2e8f0',
};

export const cartSummaryDiscountRowStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: '#10b981',
};

export const cartSummaryTotalRowStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  pt: 1.5,
  borderTop: '2px dashed #e2e8f0',
};

export const cartSummaryTotalLabelStyle: SxProps<Theme> = {
  fontWeight: 800,
  color: '#0f172a',
  fontSize: '1rem',
  fontFamily: '"Space Grotesk", sans-serif',
};

export const cartSummaryTotalAmountStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  color: 'primary.main',
  fontSize: { xs: '1.35rem', sm: '1.5rem' },
};

export const cartSummaryCheckoutButtonStyle: SxProps<Theme> = {
  py: 1.5,
  minHeight: '48px',
  borderRadius: '12px',
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  fontSize: '1rem',
  textTransform: 'none',
  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
};
