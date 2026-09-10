import { SxProps, Theme } from '@mui/material';

export const breadcrumbsContainerStyle: SxProps<Theme> = {
  mb: { xs: 2.5, md: 3 },
  '& .MuiBreadcrumbs-separator': {
    mx: 1,
    display: 'flex',
    alignItems: 'center',
  },
};

export const breadcrumbLinkStyle: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.75,
  fontSize: '0.85rem',
  fontWeight: 600,
  color: 'text.secondary',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'color 0.15s ease',
  '&:hover': {
    color: 'primary.main',
    textDecoration: 'underline',
  },
};

export const breadcrumbCurrentStyle: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.75,
  fontSize: '0.85rem',
  fontWeight: 700,
  color: 'text.primary',
};
