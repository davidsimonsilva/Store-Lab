import { SxProps, Theme } from '@mui/material';

export const passwordRequirementsContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  p: 2,
  borderRadius: '12px',
  bgcolor: 'background.default',
  border: '1px solid',
  borderColor: 'divider',
  mt: 0.5,
};

export const criteriaListStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.75,
};

export const criterionItemStyle = (met: boolean): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  fontSize: '0.75rem',
  color: met ? 'success.main' : 'text.disabled',
  fontWeight: met ? 600 : 400,
  transition: 'color 0.2s ease',
});

