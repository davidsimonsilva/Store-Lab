import { SxProps, Theme } from '@mui/material';

export const creditCardCardStyle = (isSelected?: boolean, isDefault?: boolean): SxProps<Theme> => ({
  p: 2.5,
  borderRadius: '14px',
  bgcolor: isSelected ? '#f0f7ff' : '#ffffff',
  border: '2px solid',
  borderColor: isSelected ? '#2563eb' : isDefault ? '#93c5fd' : '#e2e8f0',
  boxShadow: isSelected ? '0 4px 14px rgba(37, 99, 235, 0.12)' : '0 2px 8px rgba(15, 23, 42, 0.04)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 1.5,
  height: '100%',
  transition: 'all 0.2s ease-in-out',
  cursor: isSelected !== undefined ? 'pointer' : 'default',
  '&:hover': {
    borderColor: '#2563eb',
    boxShadow: '0 4px 16px rgba(37, 99, 235, 0.12)',
  },
});

export const creditCardHeaderStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 32,
  minHeight: 32,
  mb: 1.5,
  gap: 1,
};

export const creditCardNumberStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", monospace',
  fontSize: '1.05rem',
  letterSpacing: '0.08em',
  fontWeight: 700,
  color: '#0f172a',
  mt: 1,
  mb: 1.5,
};

export const creditCardFooterStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  mt: 1,
};

export const cardBrandBadgeStyle = (brand: string): SxProps<Theme> => {
  let color = '#2563eb';
  let bgColor = '#eff6ff';
  const b = brand.toLowerCase();
  if (b === 'visa') { color = '#1d4ed8'; bgColor = '#eff6ff'; }
  if (b === 'mastercard') { color = '#dc2626'; bgColor = '#fef2f2'; }
  if (b === 'elo') { color = '#d97706'; bgColor = '#fffbeb'; }
  if (b === 'amex') { color = '#059669'; bgColor = '#ecfdf5'; }
  if (b === 'discover') { color = '#ea580c'; bgColor = '#fff7ed'; }
  if (b === 'hipercard') { color = '#b91c1c'; bgColor = '#fef2f2'; }

  return {
    bgcolor: bgColor,
    color: color,
    fontWeight: 800,
    fontSize: '0.7rem',
    borderRadius: '6px',
    letterSpacing: '0.05em',
    px: 1,
    height: 24,
    display: 'inline-flex',
    alignItems: 'center',
  };
};

export const cardDefaultBadgeStyle: SxProps<Theme> = {
  bgcolor: '#ecfdf5',
  color: '#059669',
  fontWeight: 700,
  fontSize: '0.75rem',
  px: 1.25,
  height: 28,
  boxSizing: 'border-box',
  borderRadius: '20px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0.5,
  border: '1px solid #a7f3d0',
};

export const cardActionsWrapperStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mt: 1.5,
  pt: 1.25,
  borderTop: '1px solid',
  borderColor: 'divider',
};
