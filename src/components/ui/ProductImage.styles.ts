import { SxProps, Theme } from '@mui/material';

export const productImageWrapperStyle: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

export const productImageSkeletonStyle: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  borderRadius: 'inherit',
};

export const productImageStyle = (isLoading: boolean, customSx?: SxProps<Theme>): SxProps<Theme> => ({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
  opacity: isLoading ? 0 : 1,
  transition: 'opacity 0.2s ease-in-out',
  ...(customSx as object),
});
