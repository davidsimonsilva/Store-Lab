import { SxProps, Theme } from '@mui/material';

export const avatarDialogContentStyle: SxProps<Theme> = {
  p: { xs: 2, sm: 3 },
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
};

export const avatarDropzoneStyle = (isDragActive: boolean): SxProps<Theme> => ({
  border: '2px dashed',
  borderColor: isDragActive ? 'primary.main' : 'divider',
  bgcolor: isDragActive ? 'primary.50' : 'background.default',
  borderRadius: '16px',
  p: { xs: 3, sm: 4 },
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1.5,
  '&:hover': {
    borderColor: 'primary.main',
    bgcolor: 'primary.50',
  },
});

export const avatarDropzoneIconBoxStyle: SxProps<Theme> = {
  width: 60,
  height: 60,
  borderRadius: '50%',
  bgcolor: 'primary.50',
  color: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const avatarDropzoneTitleStyle: SxProps<Theme> = {
  fontWeight: 700,
  color: 'text.primary',
};

export const avatarDropzoneSubtitleStyle: SxProps<Theme> = {
  mt: 0.5,
  color: 'text.secondary',
};

export const avatarDropzoneSelectButtonStyle: SxProps<Theme> = {
  textTransform: 'none',
  borderRadius: '10px',
  fontWeight: 600,
  mt: 1,
};

export const cropperContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
};

export const cropperInstructionTextStyle: SxProps<Theme> = {
  textAlign: 'center',
  color: 'text.secondary',
};

export const cropperActionButtonStyle: SxProps<Theme> = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: '8px',
};

export const cropperChangePhotoButtonStyle: SxProps<Theme> = {
  textTransform: 'none',
  borderRadius: '8px',
  fontSize: '0.8rem',
};

export const avatarPreviewTitleStyle: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '0.95rem',
};

export const avatarPreviewSubtitleStyle: SxProps<Theme> = {
  display: 'block',
  mt: 0.25,
  color: 'text.secondary',
};

export const cropperCanvasStageStyle: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  height: { xs: 260, sm: 320 },
  borderRadius: '16px',
  overflow: 'hidden',
  bgcolor: '#0f172a',
  userSelect: 'none',
  touchAction: 'none',
};

export const cropperCircularMaskStyle: SxProps<Theme> = {
  display: 'none',
};

export const cropperControlsRowStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  gap: 2,
  flexWrap: 'wrap',
};

export const cropperZoomSliderWrapperStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  flex: 1,
  minWidth: 200,
};

export const cropperActionButtonsRowStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export const avatarPreviewCardStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: { xs: 'stretch', sm: 'center' },
  justifyContent: 'space-between',
  width: '100%',
  bgcolor: 'background.default',
  p: { xs: 2, sm: 2.5 },
  borderRadius: '16px',
  border: '1px solid',
  borderColor: 'divider',
  gap: 2,
};

export const avatarPreviewInfoGroupStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  minWidth: 0,
  flex: 1,
};

export const avatarPreviewCircleStyle = (size: number = 68): SxProps<Theme> => ({
  width: size,
  height: size,
  minWidth: size,
  minHeight: size,
  flexShrink: 0,
  borderRadius: '50%',
  overflow: 'hidden',
  border: '3px solid',
  borderColor: 'primary.200',
  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: 'background.paper',
});

export const avatarPreviewImageStyle: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

export const avatarRemoveButtonStyle: SxProps<Theme> = {
  textTransform: 'none',
  borderRadius: '10px',
  px: 2.5,
  py: 0.9,
  fontSize: '0.85rem',
  fontWeight: 600,
  flexShrink: 0,
  alignSelf: { xs: 'stretch', sm: 'center' },
  border: '1px solid',
  borderColor: 'rgba(239, 68, 68, 0.35)',
  color: '#dc2626',
  bgcolor: '#fff5f5',
  whiteSpace: 'nowrap',
  minHeight: '38px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: '#fee2e2',
    borderColor: '#dc2626',
  },
};
