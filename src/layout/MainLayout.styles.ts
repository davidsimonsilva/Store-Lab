import { SxProps, Theme } from '@mui/material';

export const mainLayoutRootStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100%',
  bgcolor: 'background.default',
};

export const mainLayoutMainContentStyle: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
};
