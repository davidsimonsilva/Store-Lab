import { SxProps, Theme } from '@mui/material';

export const emptyStateCardStyle: SxProps<Theme> = {
  p: { xs: 4, sm: 6 },
  textAlign: 'center',
  bgcolor: '#ffffff',
  borderRadius: '16px',
  border: '1px solid #e2e8f0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '540px',
  mx: 'auto',
  my: 4,
  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
};

export const emptyStateIconBoxStyle: SxProps<Theme> = {
  bgcolor: '#eff6ff',
  width: '72px',
  height: '72px',
  borderRadius: '50%',
  mb: 3,
  color: '#2563eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const emptyStateTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  color: '#0f172a',
  mb: 1.5,
  fontSize: '1.45rem',
};

export const emptyStateDescriptionStyle = (hasAction: boolean): SxProps<Theme> => ({
  color: '#64748b',
  maxWidth: '420px',
  lineHeight: 1.6,
  fontSize: '0.925rem',
  mb: hasAction ? 4 : 0,
});

export const emptyStateButtonStyle: SxProps<Theme> = {
  px: 4,
  py: 1.2,
  borderRadius: '9999px',
  fontWeight: 700,
  bgcolor: '#2563eb',
  textTransform: 'none',
  fontSize: '0.925rem',
  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
  '&:hover': {
    bgcolor: '#1d4ed8',
  },
};
