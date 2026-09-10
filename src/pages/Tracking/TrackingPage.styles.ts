import { SxProps, Theme } from '@mui/material';

export const trackingHeaderBoxStyle: SxProps<Theme> = {
  textAlign: 'center',
  mb: 4,
};

export const trackingTitleStyle: SxProps<Theme> = {
  fontWeight: 800,
  fontFamily: '"Space Grotesk", sans-serif',
  color: 'text.primary',
  mb: 1,
};

export const trackingSubtitleStyle: SxProps<Theme> = {
  color: 'text.secondary',
  maxWidth: 600,
  mx: 'auto',
};

export const trackingSearchCardStyle: SxProps<Theme> = {
  p: { xs: 3, sm: 4 },
  borderRadius: '16px',
  bgcolor: 'background.paper',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  border: '1px solid',
  borderColor: 'divider',
  mb: 4,
};

export const trackingFormBoxStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  gap: 2,
  alignItems: 'stretch',
  width: '100%',
};

export const trackingTextFieldStyle: SxProps<Theme> = {
  flexGrow: 1,
  width: '100%',
  '& .MuiOutlinedInput-root': {
    height: 44,
    minHeight: 44,
    borderRadius: '12px',
  },
};

export const trackingSubmitButtonStyle: SxProps<Theme> = {
  height: 44,
  minHeight: 44,
  px: 4,
  fontWeight: 700,
  borderRadius: '12px',
  textTransform: 'none',
  fontSize: '0.95rem',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  width: { xs: '100%', sm: 'auto' },
  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
  },
};

export const trackingResultCardStyle: SxProps<Theme> = {
  p: { xs: 3, md: 4 },
  borderRadius: '16px',
  bgcolor: 'background.paper',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  border: '1px solid',
  borderColor: 'divider',
  mb: 4,
};

export const trackingHeaderMetaRowStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 2,
  width: '100%',
};

export const trackingHeaderBadgeStyle: SxProps<Theme> = {
  fontWeight: 800,
  fontFamily: '"Space Grotesk", sans-serif',
  color: 'text.primary',
};

export const trackingTableStyle: SxProps<Theme> = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
};

export const trackingTableHeaderStyle: SxProps<Theme> = {
  py: 1.5,
  px: 2,
  bgcolor: 'grey.50',
  color: 'text.secondary',
  fontWeight: 700,
  fontSize: '0.8rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  borderBottom: '1px solid',
  borderColor: 'divider',
};

export const trackingTableRowStyle = (completed: boolean, active: boolean): SxProps<Theme> => ({
  bgcolor: active ? 'primary.50' : completed ? 'background.paper' : 'transparent',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    bgcolor: active ? 'primary.100' : 'grey.50',
  },
});

export const trackingTableCellStyle: SxProps<Theme> = {
  py: 2,
  px: 2,
  borderBottom: '1px solid',
  borderColor: 'divider',
  fontSize: '0.875rem',
};

export const trackingStatusChipDeliveredStyle: SxProps<Theme> = {
  bgcolor: '#f0fdf4',
  color: '#15803d',
  borderColor: '#bbf7d0',
  fontWeight: 700,
};

export const trackingStatusChipShippedStyle: SxProps<Theme> = {
  bgcolor: '#eff6ff',
  color: '#1d4ed8',
  borderColor: '#bfdbfe',
  fontWeight: 700,
};

export const trackingInputSearchIconStyle = {
  marginRight: 8,
  color: '#64748b',
};

export const trackingDestinationColumnStyle: SxProps<Theme> = {
  ml: { sm: 'auto' },
  textAlign: { xs: 'left', sm: 'right' },
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

export const trackingMetaItemStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  color: 'text.secondary',
  justifyContent: { xs: 'flex-start', sm: 'flex-end' },
};

export const trackingPendingChipStyle: SxProps<Theme> = {
  color: 'text.disabled',
  borderColor: 'divider',
};

export const trackingMobileStepCardStyle = (completed: boolean, active: boolean): SxProps<Theme> => ({
  p: 2.5,
  borderRadius: '12px',
  border: '1px solid',
  borderColor: active ? 'primary.300' : completed ? 'success.200' : 'divider',
  bgcolor: active ? 'primary.50' : completed ? 'grey.50' : 'background.paper',
  position: 'relative',
});
