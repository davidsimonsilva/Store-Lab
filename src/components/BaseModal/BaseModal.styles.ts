import { SxProps, Theme } from '@mui/material';

export const baseModalPaperStyle = (customMaxWidth?: number | string): SxProps<Theme> => ({
  borderRadius: '24px',
  width: '100%',
  maxWidth: customMaxWidth || '580px',
  mx: { xs: 1.5, sm: 2 },
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
});

export const baseModalTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  fontSize: '1.25rem',
  p: { xs: 2.5, sm: 3 },
  pb: 1.5,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'text.primary',
};

export const baseModalContentStyle: SxProps<Theme> = {
  p: { xs: 2.5, sm: 3 },
  pt: { xs: 2.5, sm: 3 },
  maxHeight: 'calc(85vh - 130px)',
  overflowY: 'auto',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    bgcolor: '#cbd5e1',
    borderRadius: '4px',
  },
};

export const baseModalActionsStyle: SxProps<Theme> = {
  p: { xs: 2, sm: 2.5 },
  px: { xs: 2.5, sm: 3 },
  pt: 2,
  borderTop: '1px solid',
  borderColor: 'divider',
  display: 'flex',
  flexDirection: { xs: 'column-reverse', sm: 'row' },
  alignItems: 'stretch',
  justifyContent: 'flex-end',
  gap: 1.5,
};

export const modalSecondaryButtonStyle: SxProps<Theme> = {
  height: '44px',
  minHeight: '44px',
  boxSizing: 'border-box',
  borderRadius: '12px',
  px: 3,
  py: 0,
  width: { xs: '100%', sm: 'auto' },
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.925rem',
  lineHeight: 1,
  color: 'text.secondary',
  bgcolor: '#f1f5f9',
  border: 'none',
  '&:hover': {
    bgcolor: '#e2e8f0',
    border: 'none',
  },
};

export const modalPrimaryButtonStyle: SxProps<Theme> = {
  height: '44px',
  minHeight: '44px',
  boxSizing: 'border-box',
  borderRadius: '12px',
  px: 3.5,
  py: 0,
  width: { xs: '100%', sm: 'auto' },
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '0.925rem',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  minWidth: { xs: '100%', sm: 'max-content' },
  boxShadow: 'none',
  bgcolor: '#2563eb',
  color: '#ffffff',
  '&:hover': {
    bgcolor: '#1d4ed8',
    boxShadow: 'none',
  },
};
