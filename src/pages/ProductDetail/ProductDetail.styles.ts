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
