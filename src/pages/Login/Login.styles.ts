import { SxProps, Theme } from '@mui/material';

export const loginCardStyle: SxProps<Theme> = {
  p: { xs: 3, sm: 4, md: 5 },
  borderRadius: '24px',
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: '0 10px 40px -20px rgba(15,23,42,0.1)',
  bgcolor: 'background.paper',
};

export const loginHeaderStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  mb: 3,
};

export const loginLogoWrapperStyle: SxProps<Theme> = {
  mb: 2,
};

export const loginTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  letterSpacing: '-0.03em',
  mb: 0.75,
  color: 'text.primary',
  textAlign: 'center',
};

export const loginSubtitleStyle: SxProps<Theme> = {
  color: 'text.secondary',
  textAlign: 'center',
  maxWidth: '420px',
  fontSize: '0.875rem',
  lineHeight: 1.5,
};

export const loginAlertStyle: SxProps<Theme> = {
  mb: 2.5,
  borderRadius: '12px',
};

export const loginAnonAlertStyle: SxProps<Theme> = {
  mb: 2.5,
  borderRadius: '12px',
  border: '1px solid #bfdbfe',
  bgcolor: '#eff6ff',
  color: '#1e40af',
  fontSize: '0.85rem',
  alignItems: 'center',
  '& .MuiAlert-icon': {
    alignSelf: 'center',
    py: 0,
    my: 'auto',
    color: '#2563eb',
  },
  '& .MuiAlert-message': {
    alignSelf: 'center',
    py: 0.5,
  },
};

export const loginFormStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
};

export const loginInputRootStyle: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
  },
};

export const loginSubmitButtonStyle: SxProps<Theme> = {
  py: 1.5,
  borderRadius: '12px',
  fontWeight: 700,
  fontFamily: '"Space Grotesk", sans-serif',
  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
  mt: 0.5,
};

export const loginDividerStyle: SxProps<Theme> = {
  my: 3,
};

export const loginDividerTextStyle: SxProps<Theme> = {
  fontSize: '0.75rem',
  color: 'text.secondary',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

export const loginActionsContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
};

export const loginRegisterButtonStyle: SxProps<Theme> = {
  borderRadius: '12px',
  py: 1.2,
  fontWeight: 700,
  borderWidth: '1.5px',
};

export const loginBackButtonStyle: SxProps<Theme> = {
  borderRadius: '12px',
  py: 1,
  fontWeight: 600,
  color: 'text.secondary',
  textTransform: 'none',
  '&:hover': {
    color: 'text.primary',
    backgroundColor: 'action.hover',
  },
};

