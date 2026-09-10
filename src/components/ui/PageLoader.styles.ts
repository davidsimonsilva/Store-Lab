import { SxProps, Theme } from '@mui/material';

export const pageLoaderBoxStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '60vh',
  width: '100%',
  bgcolor: 'background.default',
};

export const pageLoaderSpinnerStyle: SxProps<Theme> = {
  color: 'primary.main',
};
