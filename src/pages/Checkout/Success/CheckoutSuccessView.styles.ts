import { SxProps, Theme } from '@mui/material';

export const successContainerStyle: SxProps<Theme> = {
  maxWidth: 760,
  mx: 'auto',
  py: { xs: 2.5, sm: 5, md: 7 },
  px: { xs: 1.5, sm: 3 },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box',
};

export const successHeaderCardStyle: SxProps<Theme> = {
  bgcolor: 'background.paper',
  p: { xs: 2.5, sm: 5, md: 6 },
  borderRadius: { xs: '16px', sm: '24px' },
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
  width: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: { xs: 2, sm: 2.5 },
  overflow: 'hidden',
};

export const successBadgeWrapperStyle: SxProps<Theme> = {
  width: { xs: 64, sm: 72 },
  height: { xs: 64, sm: 72 },
  borderRadius: '50%',
  bgcolor: 'rgba(16, 185, 129, 0.12)',
  color: 'success.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 0.5,
};

export const warningBadgeWrapperStyle: SxProps<Theme> = {
  width: { xs: 64, sm: 72 },
  height: { xs: 64, sm: 72 },
  borderRadius: '50%',
  bgcolor: 'rgba(239, 68, 68, 0.1)',
  color: 'error.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 0.5,
};

export const orderNumberChipBoxStyle: SxProps<Theme> = {
  bgcolor: '#f8fafc',
  py: { xs: 1.25, sm: 1.5 },
  px: { xs: 1.75, sm: 3 },
  borderRadius: '16px',
  border: '1.5px dashed #3b82f6',
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: 'center',
  justifyContent: 'center',
  gap: { xs: 1, sm: 1.5 },
  width: '100%',
  maxWidth: 480,
  boxSizing: 'border-box',
};

export const successActionsStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  gap: { xs: 1.5, sm: 2 },
  justifyContent: 'center',
  alignItems: 'stretch',
  width: '100%',
  maxWidth: 480,
  mt: { xs: 1, sm: 1.5 },
};

