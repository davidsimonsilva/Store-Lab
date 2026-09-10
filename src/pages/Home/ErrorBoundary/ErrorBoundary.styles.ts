import { SxProps, Theme } from '@mui/material';

export const errorBoundaryBoxStyle: SxProps<Theme> = {
  p: 3,
  textAlign: 'center',
  bgcolor: '#fef2f2',
  border: '1px solid #fecaca',
  borderRadius: '12px',
  my: 2,
};

export const errorBoundaryTitleStyle: SxProps<Theme> = {
  color: '#dc2626',
  fontWeight: 700,
  mb: 1,
};

export const errorBoundarySubtitleStyle: SxProps<Theme> = {
  color: '#7f1d1d',
  mb: 2,
};

export const errorBoundaryButtonStyle: SxProps<Theme> = {
  borderRadius: '20px',
  textTransform: 'none',
  fontWeight: 600,
};
