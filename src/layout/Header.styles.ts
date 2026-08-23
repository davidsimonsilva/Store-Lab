import { SxProps, Theme } from '@mui/material';

export const headerAppBarStyles: SxProps<Theme> = {
  bgcolor: 'background.paper',
  color: 'text.primary',
  zIndex: (theme) => theme.zIndex.drawer + 1,
};

export const headerLogoBoxStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  gap: 1.5,
  '&:hover opacity': 0.95,
};

export const searchContainerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  bgcolor: 'background.default',
  px: 2,
  py: 0.75,
  borderRadius: '30px',
  width: '100%',
  maxWidth: '480px',
  border: '1px solid transparent',
  transition: 'all 0.2s',
  '&:focus-within': {
    bgcolor: 'background.paper',
    borderColor: 'primary.main',
    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.15)',
  },
};
