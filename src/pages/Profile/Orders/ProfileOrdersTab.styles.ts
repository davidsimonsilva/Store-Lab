import { SxProps, Theme } from '@mui/material';

export const ordersContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export const orderCardStyle: SxProps<Theme> = {
  borderRadius: '16px',
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'background.paper',
  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
  overflow: 'hidden',
};

export const orderCardHeaderStyle: SxProps<Theme> = {
  p: { xs: 2, sm: 2.5 },
  bgcolor: 'background.default',
  borderBottom: '1px solid',
  borderColor: 'divider',
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: 'space-between',
  alignItems: { xs: 'stretch', sm: 'center' },
  gap: 1.5,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    bgcolor: 'action.hover',
  },
};

export const orderHeaderMetaStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.25,
  flexWrap: 'wrap',
  mb: 0.35,
};

export const orderHeaderActionsStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: { xs: 'space-between', sm: 'flex-end' },
  width: { xs: '100%', sm: 'auto' },
  gap: 2,
};

export const orderPriceStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  fontSize: { xs: '1.15rem', sm: '1.25rem' },
  color: 'primary.main',
  whiteSpace: 'nowrap',
};

export const orderExpandButtonStyle: SxProps<Theme> = {
  borderRadius: '10px',
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'background.paper',
  width: 42,
  height: 42,
  minWidth: 42,
  minHeight: 42,
  p: 0.75,
  color: 'text.primary',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: 'action.hover',
    borderColor: 'primary.main',
    color: 'primary.main',
  },
};

export const orderStepperContainerStyle: SxProps<Theme> = {
  mb: 3,
  pt: 1,
  width: '100%',
  overflowX: { xs: 'visible', sm: 'auto' },
  '&::-webkit-scrollbar': {
    height: 6,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'divider',
    borderRadius: 3,
  },
};

export const orderStepperStyle: SxProps<Theme> = {
  width: '100%',
  '&.MuiStepper-vertical': {
    gap: 0.75,
    py: 0.5,
    '& .MuiStep-vertical': {
      width: '100%',
    },
    '& .MuiStepConnector-vertical': {
      ml: '12px',
      py: '4px',
    },
    '& .MuiStepConnector-lineVertical': {
      minHeight: '22px',
      borderLeftWidth: '2px',
      borderColor: 'divider',
    },
    '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-lineVertical': {
      borderColor: 'primary.main',
    },
    '& .MuiStepLabel-vertical': {
      alignItems: 'flex-start',
    },
    '& .MuiStepLabel-iconContainer': {
      pt: '2px',
      pr: 1.5,
    },
    '& .MuiStepLabel-label': {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: 'text.primary',
      lineHeight: 1.3,
      '&.Mui-active': {
        color: 'primary.main',
        fontWeight: 700,
      },
      '&.Mui-completed': {
        color: 'text.primary',
        fontWeight: 600,
      },
      '&.Mui-error': {
        color: 'error.main',
        fontWeight: 600,
      },
    },
  },
  '&.MuiStepper-horizontal': {
    minWidth: { sm: '540px', md: 'auto' },
    '& .MuiStepLabel-label': {
      fontSize: '0.8rem',
      fontWeight: 600,
    },
    '& .MuiStepConnector-lineHorizontal': {
      borderTopWidth: '2px',
      borderColor: 'divider',
    },
    '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-lineHorizontal': {
      borderColor: 'primary.main',
    },
  },
};

export const orderStepTimestampStyle = (isStepError: boolean): SxProps<Theme> => ({
  fontSize: { xs: '0.75rem', sm: '0.7rem' },
  fontWeight: isStepError ? 600 : 400,
  display: 'block',
  mt: { xs: 0.25, sm: 0 },
});

export const orderTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  fontSize: '1.05rem',
  color: 'text.primary',
  letterSpacing: '-0.01em',
};

export const orderDateStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.78rem',
  lineHeight: 1.4,
  mb: 0.4,
};

export const orderCodeBadgeStyle: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  px: 0.85,
  py: 0.2,
  borderRadius: '4px',
  bgcolor: 'action.hover',
  border: '1px solid',
  borderColor: 'divider',
  fontFamily: 'monospace',
  fontSize: '0.72rem',
  fontWeight: 600,
  color: 'text.secondary',
  lineHeight: 1.2,
  width: 'fit-content',
};

export const orderCardContentStyle: SxProps<Theme> = {
  p: { xs: 2, sm: 2.5 },
};

export const orderItemRowStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: { xs: 'flex-start', sm: 'center' },
  justifyContent: 'space-between',
  gap: { xs: 1.5, sm: 2 },
  py: 1.5,
  borderBottom: '1px solid',
  borderColor: 'divider',
  '&:last-child': {
    borderBottom: 'none',
  },
};

export const orderItemLeftContainerStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: { xs: 'flex-start', sm: 'center' },
  gap: { xs: 1.5, sm: 2 },
  flex: 1,
  minWidth: 0,
};

export const orderItemImageContainerStyle: SxProps<Theme> = {
  width: { xs: 52, sm: 56 },
  height: { xs: 52, sm: 56 },
  borderRadius: '10px',
  overflow: 'hidden',
  border: '1px solid',
  borderColor: 'divider',
  flexShrink: 0,
};

export const orderItemDetailsContainerStyle: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 0.35,
};

export const orderItemNameStyle: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: '0.875rem',
  lineHeight: 1.35,
  color: 'text.primary',
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
};

export const orderItemQuantityStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.78rem',
  lineHeight: 1.3,
};

export const orderItemMobilePriceContainerStyle: SxProps<Theme> = {
  display: { xs: 'flex', sm: 'none' },
  alignItems: 'center',
  gap: 0.5,
  mt: 0.35,
};

export const orderItemMobilePriceLabelStyle: SxProps<Theme> = {
  fontSize: '0.78rem',
  color: 'text.secondary',
  fontWeight: 500,
};

export const orderItemMobilePriceValueStyle: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '0.875rem',
  color: 'text.primary',
};

export const orderItemDesktopPriceStyle: SxProps<Theme> = {
  display: { xs: 'none', sm: 'block' },
  fontWeight: 700,
  fontSize: '0.9rem',
  color: 'text.primary',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  ml: 2,
};

export const orderFinanceBlockStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 0.75, sm: 0.75 },
  mt: { xs: 1.5, sm: 2 },
  pt: { xs: 1.5, sm: 2 },
  px: { xs: 0, sm: 0.5 },
  width: { xs: '100%', sm: '350px', md: '380px' },
  ml: { xs: 0, sm: 'auto' },
  borderTop: '1px dashed',
  borderColor: 'divider',
};

export const orderFinanceRowStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  gap: 1.5,
};

export const orderFinanceLabelStyle: SxProps<Theme> = {
  fontSize: '0.85rem',
  color: 'text.secondary',
  fontWeight: 500,
  lineHeight: 1.3,
  flex: 1,
  minWidth: 0,
  textAlign: 'left',
};

export const orderFinanceValueStyle: SxProps<Theme> = {
  fontSize: '0.875rem',
  fontWeight: 700,
  color: 'text.primary',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  textAlign: 'right',
  ml: 1.5,
};

export const orderFinanceDiscountLabelStyle: SxProps<Theme> = {
  fontSize: '0.85rem',
  color: 'success.main',
  fontWeight: 600,
  lineHeight: 1.3,
  flex: 1,
  minWidth: 0,
  textAlign: 'left',
};

export const orderFinanceDiscountValueStyle: SxProps<Theme> = {
  fontSize: '0.875rem',
  fontWeight: 700,
  color: 'success.main',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  textAlign: 'right',
  ml: 1.5,
};

export const orderSummaryFooterStyle: SxProps<Theme> = {
  p: { xs: 2, sm: 2.5 },
  bgcolor: 'background.default',
  borderTop: '1px solid',
  borderColor: 'divider',
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: 'space-between',
  alignItems: { xs: 'stretch', sm: 'center' },
  gap: { xs: 1.5, sm: 2 },
};

export const orderSummaryPaymentMethodStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  fontSize: '0.85rem',
  color: 'text.secondary',
};

export const orderSummaryTotalContainerStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: { xs: 'space-between', sm: 'flex-end' },
  gap: 1,
  pt: { xs: 1, sm: 0 },
  borderTop: { xs: '1px dashed', sm: 'none' },
  borderColor: 'divider',
};

export const orderSummaryTotalValueStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  color: 'primary.main',
  fontSize: { xs: '1.05rem', sm: '1.15rem' },
  whiteSpace: 'nowrap',
};

export const ordersLoadingContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
};

export const ordersLoadMoreContainerStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  pt: 2,
  pb: 1,
};

export const ordersLoadMoreButtonStyle: SxProps<Theme> = {
  textTransform: 'none',
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  fontSize: '0.875rem',
  borderRadius: '10px',
  px: 3,
  py: 1,
  borderColor: 'divider',
  color: 'text.primary',
  '&:hover': {
    bgcolor: 'action.hover',
    borderColor: 'text.secondary',
  },
};

export const orderStatusChipBaseStyle: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '0.75rem',
  height: '24px',
  '& .MuiChip-icon': { ml: '6px' },
};

export const orderStatusChipCancelledStyle: SxProps<Theme> = {
  ...orderStatusChipBaseStyle,
  bgcolor: '#fef2f2',
  color: '#b91c1c',
  border: '1px solid #fecaca',
};

export const orderStatusChipDeliveredStyle: SxProps<Theme> = {
  ...orderStatusChipBaseStyle,
  bgcolor: '#f0fdf4',
  color: '#15803d',
  border: '1px solid #bbf7d0',
};

export const orderStatusChipShippedStyle: SxProps<Theme> = {
  ...orderStatusChipBaseStyle,
  bgcolor: '#eff6ff',
  color: '#1d4ed8',
  border: '1px solid #bfdbfe',
};

export const orderStatusChipPreparingStyle: SxProps<Theme> = {
  ...orderStatusChipBaseStyle,
  bgcolor: '#fffbeb',
  color: '#b45309',
  border: '1px solid #fde68a',
};

export const orderStatusChipPaidStyle: SxProps<Theme> = {
  ...orderStatusChipBaseStyle,
  bgcolor: '#ecfdf5',
  color: '#047857',
  border: '1px solid #a7f3d0',
};

export const orderStatusChipPendingStyle: SxProps<Theme> = {
  ...orderStatusChipBaseStyle,
  bgcolor: '#f8fafc',
  color: '#475569',
  border: '1px solid #e2e8f0',
};

export const orderSectionHeaderTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  fontSize: '1.1rem',
  lineHeight: 1.3,
};

export const orderSectionHeaderSubtitleStyle: SxProps<Theme> = {
  fontSize: '0.875rem',
  color: 'text.secondary',
  mt: 0.25,
};

export const ordersEmptyBoxStyle: SxProps<Theme> = {
  py: { xs: 4, sm: 6 },
  px: 3,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  border: '1px solid',
  borderColor: 'divider',
  flex: 1,
  minHeight: { xs: '260px', sm: '280px' },
};

export const ordersEmptyIconContainerStyle: SxProps<Theme> = {
  width: 56,
  height: 56,
  borderRadius: '50%',
  bgcolor: 'primary.50',
  color: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 2,
};

export const ordersEmptyTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  fontSize: '1.1rem',
  mb: 0.5,
};

export const ordersEmptyDescriptionStyle: SxProps<Theme> = {
  maxWidth: 420,
  fontSize: '0.875rem',
  lineHeight: 1.5,
};

export const ordersListWrapperStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
};

export const orderCodeBadgePrefixStyle: SxProps<Theme> = {
  fontSize: '0.68rem',
  color: 'text.secondary',
  fontWeight: 600,
};

export const orderCodeBadgeCodeStyle: SxProps<Theme> = {
  fontSize: '0.72rem',
  fontWeight: 700,
  color: 'text.primary',
  letterSpacing: '0.02em',
};

export const orderStatusSectionHeadingStyle: SxProps<Theme> = {
  fontWeight: 700,
  mb: 2,
};

export const orderAddressRowStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  mb: 2,
};

export const orderAddressIconBoxStyle: SxProps<Theme> = {
  width: 38,
  height: 38,
  borderRadius: '10px',
  bgcolor: 'rgba(37, 99, 235, 0.08)',
  color: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

export const orderAddressTitleStyle: SxProps<Theme> = {
  fontWeight: 700,
};

export const orderItemsHeadingStyle: SxProps<Theme> = {
  fontWeight: 700,
  mb: 1.5,
};

export const orderItemsListStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

export const orderItemProductImgStyle: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export const orderSummaryMobileTotalLabelStyle: SxProps<Theme> = {
  display: { xs: 'block', sm: 'none' },
  fontWeight: 600,
};

export const orderSummaryDesktopTotalLabelStyle: SxProps<Theme> = {
  display: { xs: 'none', sm: 'inline' },
  fontWeight: 700,
  mr: 0.5,
  color: 'text.primary',
  fontSize: '0.95rem',
};

