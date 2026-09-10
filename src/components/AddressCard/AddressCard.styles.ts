import { SxProps, Theme } from '@mui/material';

export const addressCardStyle = (isSelected?: boolean, isDefault?: boolean): SxProps<Theme> => ({
  p: 2.5,
  borderRadius: '14px',
  bgcolor: isSelected ? '#f0f7ff' : '#ffffff',
  border: '2px solid',
  borderColor: isSelected ? '#2563eb' : isDefault ? '#93c5fd' : '#e2e8f0',
  boxShadow: isSelected ? '0 4px 14px rgba(37, 99, 235, 0.12)' : '0 2px 8px rgba(15, 23, 42, 0.04)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
  transition: 'all 0.2s ease-in-out',
  cursor: isSelected !== undefined ? 'pointer' : 'default',
  '&:hover': {
    borderColor: '#2563eb',
    boxShadow: '0 4px 16px rgba(37, 99, 235, 0.12)',
  },
});

export const addressCardHeaderStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 32,
  minHeight: 32,
  mb: 1.5,
  gap: 1,
};

export const addressLabelBadgeStyle: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.75,
  px: 1.25,
  height: 28,
  boxSizing: 'border-box',
  borderRadius: '20px',
  bgcolor: '#f1f5f9',
  color: '#334155',
  fontWeight: 700,
  fontSize: '0.75rem',
};

export const addressDefaultBadgeStyle: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0.5,
  px: 1.25,
  height: 28,
  boxSizing: 'border-box',
  borderRadius: '20px',
  bgcolor: '#ecfdf5',
  color: '#059669',
  fontWeight: 700,
  fontSize: '0.75rem',
  border: '1px solid #a7f3d0',
};

export const addressSelectedBadgeStyle: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0.5,
  px: 1.25,
  height: 28,
  boxSizing: 'border-box',
  borderRadius: '20px',
  bgcolor: '#eff6ff',
  color: '#2563eb',
  fontWeight: 700,
  fontSize: '0.75rem',
  border: '1px solid #bfdbfe',
};

export const addressRecipientTextStyle: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '0.95rem',
  color: '#0f172a',
  mb: 0.5,
};

export const addressDetailTextStyle: SxProps<Theme> = {
  fontSize: '0.875rem',
  color: '#475569',
  lineHeight: 1.5,
};

export const addressActionsWrapperStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mt: 2,
  pt: 1.5,
  borderTop: '1px solid',
  borderColor: 'divider',
};
