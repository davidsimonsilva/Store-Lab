import { SxProps, Theme } from '@mui/material';

export const profileDataContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export const profileDataSectionTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  color: 'text.primary',
  fontSize: '1.1rem',
  lineHeight: 1.3,
};

export const profileDataSectionDescStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.875rem',
  mt: 0.25,
};

export const profileDataInputStyle: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
  },
};

export const profileDataAlertStyle: SxProps<Theme> = {
  borderRadius: '12px',
};

export const profileDataActionsWrapperStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  mt: 3,
};

export const profileDataSubmitButtonStyle: SxProps<Theme> = {
  py: 0,
  px: 3.5,
  borderRadius: '12px',
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '0.925rem',
  height: 44,
  minHeight: 44,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
  },
};

