import { SxProps, Theme } from '@mui/material';

export const registerCardStyle: SxProps<Theme> = {
  p: { xs: 3, sm: 4, md: 5 },
  borderRadius: '24px',
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: '0 10px 40px -20px rgba(15,23,42,0.1)',
  bgcolor: 'background.paper',
};

export const registerHeaderStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  mb: 3,
};

export const registerLogoWrapperStyle: SxProps<Theme> = {
  mb: 2,
};

export const registerTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  letterSpacing: '-0.03em',
  mb: 0.75,
  color: 'text.primary',
  textAlign: 'center',
};

export const registerSubtitleStyle: SxProps<Theme> = {
  color: 'text.secondary',
  textAlign: 'center',
  maxWidth: '420px',
  fontSize: '0.875rem',
  lineHeight: 1.5,
};

export const registerAlertStyle: SxProps<Theme> = {
  mb: 2.5,
  borderRadius: '12px',
};

export const registerAnonAlertStyle: SxProps<Theme> = {
  mb: 2.5,
  borderRadius: '12px',
  border: '1px solid #bfdbfe',
  bgcolor: '#eff6ff',
  color: '#1e40af',
  fontSize: '0.85rem',
};

export const registerPrivacyAlertStyle: SxProps<Theme> = {
  mb: 2.5,
  borderRadius: '12px',
  border: '1px solid #fef08a',
  bgcolor: '#fefce8',
  color: '#854d0e',
  fontSize: '0.8rem',
};

export const registerFormStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
};

export const registerInputRootStyle: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
  },
};

export const registerSubmitButtonStyle: SxProps<Theme> = {
  py: 1.5,
  borderRadius: '12px',
  fontWeight: 700,
  fontFamily: '"Space Grotesk", sans-serif',
  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
  mt: 0.5,
};

export const registerDividerStyle: SxProps<Theme> = {
  my: 3,
};

export const registerDividerTextStyle: SxProps<Theme> = {
  fontSize: '0.75rem',
  color: 'text.secondary',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

export const registerActionsContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
};

export const registerLoginButtonStyle: SxProps<Theme> = {
  borderRadius: '12px',
  py: 1.2,
  fontWeight: 700,
  borderWidth: '1.5px',
};

export const registerBackButtonStyle: SxProps<Theme> = {
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

