import { SxProps, Theme } from '@mui/material';

export const paymentMethodTabStyle = (isSelected: boolean): SxProps<Theme> => ({
  flex: 1,
  py: 2.2,
  px: 2,
  borderRadius: '14px',
  border: '2px solid',
  borderColor: isSelected ? '#2563eb' : '#e2e8f0',
  bgcolor: isSelected ? '#f0f7ff' : '#ffffff',
  boxShadow: isSelected ? '0 4px 14px rgba(37, 99, 235, 0.12)' : '0 2px 8px rgba(15, 23, 42, 0.04)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  transition: 'all 0.2s ease-in-out',
  textAlign: 'center',
  '&:hover': {
    borderColor: '#2563eb',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.1)',
  },
});

export const paymentOptionCardStyle = (isSelected: boolean): SxProps<Theme> => ({
  p: 2.5,
  borderRadius: '14px',
  border: isSelected ? '2px solid #2563eb' : '2px dashed #e2e8f0',
  bgcolor: isSelected ? '#f0f7ff' : '#ffffff',
  boxShadow: isSelected ? '0 4px 14px rgba(37, 99, 235, 0.12)' : '0 2px 8px rgba(15, 23, 42, 0.04)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1.5,
  height: '100%',
  minHeight: 180,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: '#2563eb',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.1)',
  },
});

export const paymentInfoBoxStyle: SxProps<Theme> = {
  p: 2.5,
  borderRadius: '14px',
  bgcolor: '#ffffff',
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
};

export const sandboxNoticeBoxStyle: SxProps<Theme> = {
  p: 2,
  borderRadius: '12px',
  bgcolor: 'rgba(37, 99, 235, 0.06)',
  border: '1px dashed #2563eb',
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
};
