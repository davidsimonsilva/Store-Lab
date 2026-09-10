import { SxProps, Theme } from '@mui/material';

export const pageContainerBoxStyle = (bgcolor: string): SxProps<Theme> => ({
  flexGrow: 1,
  width: '100%',
  bgcolor: bgcolor,
  display: 'flex',
  flexDirection: 'column',
});

export const pageContainerInnerStyle = (py: number | object): SxProps<Theme> => ({
  py: py,
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});
