import { SxProps, Theme } from '@mui/material';

export const shippingContainerStyle: SxProps<Theme> = {
  p: 2.5,
  borderRadius: '16px',
  bgcolor: 'action.hover',
  border: '1px solid',
  borderColor: 'divider',
};

export const shippingLabelStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '0.875rem',
  color: 'text.primary',
  mb: 1.5,
};

export const shippingFormGroupStyle: SxProps<Theme> = {
  display: 'flex',
  gap: 1.5,
  alignItems: 'flex-start',
};

export const shippingResultsContainerStyle: SxProps<Theme> = {
  mt: 2.5,
  pt: 2,
  borderTop: '1px solid',
  borderColor: 'divider',
};

export const shippingResultItemStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  py: 1,
  '&:not(:last-child)': {
    borderBottom: '1px solid',
    borderColor: 'divider',
  },
};
