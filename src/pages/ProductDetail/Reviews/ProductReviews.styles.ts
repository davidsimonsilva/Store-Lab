import { SxProps, Theme } from '@mui/material';

export const productReviewsMainBoxStyle: SxProps<Theme> = {
  p: { xs: 2.5, md: 4 },
  bgcolor: '#ffffff',
  borderRadius: '20px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  border: '1px solid',
  borderColor: 'divider',
};

export const productReviewsHeaderStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: 'space-between',
  alignItems: { xs: 'flex-start', sm: 'center' },
  gap: 2,
  mb: 4,
};

export const productReviewsTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  color: 'text.primary',
};

export const productReviewsAddButtonStyle: SxProps<Theme> = {
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 700,
  fontFamily: '"Space Grotesk", sans-serif',
  px: 2.5,
  py: 1,
  bgcolor: 'primary.main',
  color: '#ffffff',
  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  whiteSpace: 'nowrap',
  '&:hover': {
    bgcolor: 'primary.dark',
  },
};

export const productReviewsScoreBoxStyle: SxProps<Theme> = {
  textAlign: 'center',
  mb: 3,
};

export const productReviewsScoreNumberStyle: SxProps<Theme> = {
  fontWeight: 800,
  color: 'text.primary',
  fontFamily: '"Space Grotesk", sans-serif',
};

export const productReviewsScoreRatingStyle: SxProps<Theme> = {
  color: '#f59e0b',
  my: 1,
};

export const productReviewsRatingBarRowStyle = (isSelected: boolean): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  cursor: 'pointer',
  p: 0.75,
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  bgcolor: isSelected ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
  border: isSelected ? '1px solid rgba(37, 99, 235, 0.2)' : '1px solid transparent',
  '&:hover': {
    bgcolor: isSelected ? 'rgba(37, 99, 235, 0.12)' : 'action.hover',
  },
});

export const productReviewsRatingBarProgressStyle: SxProps<Theme> = {
  height: 8,
  borderRadius: 4,
  bgcolor: 'background.default',
  '& .MuiLinearProgress-bar': {
    bgcolor: '#f59e0b',
    borderRadius: 4,
  },
};

export const productReviewsClearFilterButtonStyle: SxProps<Theme> = {
  mt: 2,
  textTransform: 'none',
  fontWeight: 600,
  color: 'primary.main',
  borderColor: 'divider',
  borderRadius: '10px',
  '&:hover': {
    borderColor: 'primary.main',
    bgcolor: 'action.hover',
  },
};

export const productReviewsVerifiedChipStyle: SxProps<Theme> = {
  bgcolor: '#ecfdf5',
  color: '#10b981',
  fontWeight: 700,
  height: 22,
  fontSize: '0.7rem',
  border: '1px solid #a7f3d0',
  '& .MuiChip-icon': { marginLeft: '4px' },
};

export const productReviewsAvatarStyle: SxProps<Theme> = {
  width: 44,
  height: 44,
  bgcolor: 'primary.light',
  color: 'primary.contrastText',
  fontWeight: 700,
  fontSize: '1rem',
  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
};

export const productReviewsYourReviewChipStyle: SxProps<Theme> = {
  bgcolor: 'primary.50',
  color: 'primary.main',
  fontWeight: 700,
  height: 22,
  fontSize: '0.7rem',
  border: '1px solid',
  borderColor: 'primary.200',
};

export const productReviewsActionButtonStyle: SxProps<Theme> = {
  minWidth: 'auto',
  p: 0.5,
  borderRadius: '8px',
  color: 'text.secondary',
  '&:hover': {
    color: 'primary.main',
    bgcolor: 'action.hover',
  },
};

export const productReviewsDeleteActionButtonStyle: SxProps<Theme> = {
  minWidth: 'auto',
  p: 0.5,
  borderRadius: '8px',
  color: 'text.secondary',
  '&:hover': {
    color: 'error.main',
    bgcolor: 'error.50',
  },
};

export const productReviewsCardBoxStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 2,
};

export const productReviewsCommentTextStyle: SxProps<Theme> = {
  color: 'text.secondary',
  lineHeight: 1.6,
  mt: 0.5,
  wordBreak: 'break-word',
};

export const productReviewsLoadMoreButtonStyle: SxProps<Theme> = {
  textTransform: 'none',
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  bgcolor: 'primary.main',
  color: '#ffffff',
  borderRadius: '10px',
  px: 3,
  py: 1.2,
  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
  '&:hover': {
    bgcolor: 'primary.dark',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
  },
};

export const reviewDialogPaperStyle: SxProps<Theme> = {
  borderRadius: '20px',
  p: 0,
  maxWidth: 520,
  width: '100%',
  overflow: 'hidden',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
  border: '1px solid',
  borderColor: 'divider',
};

export const reviewDialogHeaderBoxStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%',
  pb: 2,
  borderBottom: '1px solid',
  borderColor: 'divider',
};

export const reviewDialogTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  fontSize: '1.25rem',
  color: 'text.primary',
  lineHeight: 1.3,
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export const reviewDialogSubtitleStyle: SxProps<Theme> = {
  display: 'block',
  mt: 0.5,
  fontWeight: 500,
  color: 'text.secondary',
  fontSize: '0.85rem',
};

export const reviewDialogCloseButtonStyle: SxProps<Theme> = {
  color: 'text.secondary',
  p: 0.75,
  borderRadius: '10px',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: 'text.primary',
    bgcolor: 'action.hover',
  },
};

export const reviewDialogRatingBoxStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1,
  py: 3,
  px: 2.5,
  bgcolor: '#f8fafc',
  borderRadius: '16px',
  border: '1px solid',
  borderColor: '#e2e8f0',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'all 0.2s ease',
};

export const reviewDialogRatingStarsStyle: SxProps<Theme> = {
  fontSize: '2.5rem',
  color: '#f59e0b',
  my: 0.5,
};

export const reviewDialogRatingLabelStyle: SxProps<Theme> = {
  fontWeight: 700,
  color: 'primary.main',
  fontSize: '0.875rem',
  minHeight: 22,
  textAlign: 'center',
  bgcolor: 'rgba(37, 99, 235, 0.08)',
  py: 0.5,
  px: 2,
  borderRadius: '20px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const reviewDialogRatingErrorStyle: SxProps<Theme> = {
  textAlign: 'center',
  fontWeight: 600,
};

export const reviewDialogFormColumnStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
  width: '100%',
};

export const reviewDialogContentStyle: SxProps<Theme> = {
  p: { xs: 2.5, sm: 3.5 },
  width: '100%',
  boxSizing: 'border-box',
};

export const reviewDialogCommentBoxStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  width: '100%',
};

export const reviewDialogCommentHeaderStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
};

export const reviewDialogCommentLabelStyle: SxProps<Theme> = {
  fontWeight: 700,
  color: 'text.primary',
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export const reviewDialogCommentInputStyle: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    bgcolor: '#ffffff',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.main',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.main',
      borderWidth: '2px',
    },
  },
};

export const reviewDialogActionsBoxStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: 1.5,
  pt: 1,
  width: '100%',
};

export const reviewDialogCancelButtonStyle: SxProps<Theme> = {
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 600,
  color: 'text.secondary',
  px: 2.5,
  height: '44px',
  fontSize: '0.9rem',
  '&:hover': {
    bgcolor: 'action.hover',
    color: 'text.primary',
  },
};

export const reviewDialogSubmitButtonStyle: SxProps<Theme> = {
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 700,
  fontFamily: '"Space Grotesk", sans-serif',
  bgcolor: 'primary.main',
  color: '#ffffff',
  px: 3,
  height: '44px',
  fontSize: '0.9rem',
  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
  transition: 'all 0.2s ease',
  '&:hover': {
    bgcolor: 'primary.dark',
    boxShadow: '0 6px 16px rgba(37, 99, 235, 0.35)',
  },
  '&.Mui-disabled': {
    bgcolor: 'action.disabledBackground',
    color: 'action.disabled',
  },
};
