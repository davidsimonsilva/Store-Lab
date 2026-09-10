import { SxProps, Theme } from '@mui/material';

export const addressAddButtonStyle: SxProps<Theme> = {
  p: 2.5,
  borderRadius: '14px',
  border: '2px dashed',
  borderColor: 'divider',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  height: '100%',
  minHeight: 180,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  color: 'text.secondary',
  '&:hover': {
    borderColor: 'primary.main',
    color: 'primary.main',
    bgcolor: 'action.hover',
  },
};
