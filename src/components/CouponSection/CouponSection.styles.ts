import { SxProps, Theme } from '@mui/material';

export const couponContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};

export const couponHeaderTitleStyle: SxProps<Theme> = {
  color: '#0f172a',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  gap: 0.8,
  fontSize: '0.8rem',
  letterSpacing: '0.02em',
};

export const couponInputRowStyle: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  alignItems: 'center',
};

export const couponTextFieldStyle: SxProps<Theme> = {
  flex: 1,
  bgcolor: 'background.paper',
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    fontSize: '0.875rem',
    height: '44px',
    '& fieldset': {
      borderColor: 'divider',
    },
    '&:hover fieldset': {
      borderColor: '#94a3b8',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
      borderWidth: '2px',
    },
  },
  '& input': {
    textTransform: 'uppercase',
    fontSize: '0.875rem',
    color: 'text.primary',
    '&::placeholder': {
      color: 'text.secondary',
    },
  },
};

export const couponApplyButtonStyle: SxProps<Theme> = {
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 700,
  fontFamily: '"Space Grotesk", sans-serif',
  fontSize: '0.875rem',
  height: '44px',
  minHeight: '44px',
  width: '108px',
  minWidth: '108px',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
};

export const couponRemoveActionButtonStyle: SxProps<Theme> = {
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 700,
  fontFamily: '"Space Grotesk", sans-serif',
  fontSize: '0.875rem',
  height: '44px',
  minHeight: '44px',
  width: '108px',
  minWidth: '108px',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  color: 'error.main',
  borderColor: 'rgba(239, 68, 68, 0.5)',
  '&:hover': {
    borderColor: 'error.main',
    bgcolor: 'rgba(239, 68, 68, 0.08)',
  },
};

export const couponErrorTextStyle: SxProps<Theme> = {
  fontWeight: 500,
  color: 'error.main',
  px: 0.5,
  fontSize: '0.75rem',
};

export const couponHintTextStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontWeight: 500,
  fontSize: '0.75rem',
  display: 'block',
  cursor: 'pointer',
  transition: 'color 0.15s ease',
  lineHeight: 1.4,
  '&:hover': {
    color: 'primary.main',
  },
};

export const couponHintCodeStyle: SxProps<Theme> = {
  fontWeight: 700,
  color: 'primary.main',
};

