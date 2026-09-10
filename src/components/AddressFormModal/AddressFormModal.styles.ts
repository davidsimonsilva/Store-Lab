import { SxProps, Theme } from '@mui/material';

export const addressDialogPaperStyle: SxProps<Theme> = {
  maxWidth: 560,
  width: '100%',
  borderRadius: '24px',
  mx: 2,
};

export const addressDialogTitleStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: { xs: 2.5, sm: 3 },
  pb: 1.5,
  fontWeight: 700,
  fontSize: '1.25rem',
  color: 'text.primary',
};

export const addressDialogContentStyle: SxProps<Theme> = {
  p: { xs: 2.5, sm: 3 },
  pt: 1,
  maxHeight: 'calc(80vh - 120px)',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    bgcolor: '#cbd5e1',
    borderRadius: '4px',
  },
};

export const addressFormInputStyle: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
    bgcolor: '#ffffff',
    px: 0.5,
    borderRadius: '4px',
  },
};

export const addressTypeButtonStyle = (isSelected: boolean): SxProps<Theme> => ({
  width: '100%',
  justifyContent: 'flex-start',
  px: 2.5,
  py: 1.25,
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: isSelected ? 700 : 500,
  fontSize: '0.925rem',
  color: isSelected ? '#2563eb' : '#334155',
  bgcolor: isSelected ? '#eff6ff' : '#ffffff',
  border: '1.5px solid',
  borderColor: isSelected ? '#2563eb' : '#e2e8f0',
  boxShadow: 'none',
  transition: 'all 0.15s ease',
  '&:hover': {
    border: '1.5px solid',
    borderColor: isSelected ? '#2563eb' : '#cbd5e1',
    bgcolor: isSelected ? '#dbeafe' : '#f8fafc',
    boxShadow: 'none',
  },
});

export const addressDialogActionsStyle: SxProps<Theme> = {
  p: { xs: 2, sm: 2.5 },
  px: { xs: 2.5, sm: 3 },
  pt: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 1.5,
  borderTop: '1px solid',
  borderColor: 'divider',
};

export const addressCancelButtonStyle: SxProps<Theme> = {
  px: 3,
  py: 1.25,
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.925rem',
  color: 'text.secondary',
  '&:hover': {
    bgcolor: '#f1f5f9',
  },
};

export const addressSaveButtonStyle: SxProps<Theme> = {
  px: 3.5,
  py: 1.25,
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '0.925rem',
  lineHeight: 1.25,
  whiteSpace: 'nowrap',
  minWidth: 'max-content',
  bgcolor: '#2563eb',
  color: '#ffffff',
  boxShadow: 'none',
  '&:hover': {
    bgcolor: '#1d4ed8',
    boxShadow: 'none',
  },
};

