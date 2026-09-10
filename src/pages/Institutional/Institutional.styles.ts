import { SxProps, Theme } from '@mui/material';

export const institutionalHeaderBoxStyle: SxProps<Theme> = {
  textAlign: 'center',
  mb: 4,
};

export const institutionalTitleStyle: SxProps<Theme> = {
  fontWeight: 800,
  fontFamily: '"Space Grotesk", sans-serif',
  color: 'text.primary',
  mb: 1,
};

export const institutionalSubtitleStyle: SxProps<Theme> = {
  color: 'text.secondary',
  maxWidth: 640,
  mx: 'auto',
};

export const institutionalNavTabsBoxStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  gap: 1.5,
  mb: 4,
  flexWrap: 'wrap',
};

export const institutionalNavTabButtonStyle = (active: boolean): SxProps<Theme> => ({
  px: 3,
  py: 1,
  borderRadius: '20px',
  fontWeight: 700,
  textTransform: 'none',
  fontSize: '0.9rem',
  bgcolor: active ? 'primary.main' : 'background.paper',
  color: active ? '#ffffff' : 'text.primary',
  border: '1px solid',
  borderColor: active ? 'primary.main' : 'divider',
  boxShadow: active ? '0 2px 8px rgba(37, 99, 235, 0.25)' : 'none',
  '&:hover': {
    bgcolor: active ? 'primary.dark' : 'grey.100',
  },
});

export const institutionalContentPaperStyle: SxProps<Theme> = {
  p: { xs: 3, sm: 5 },
  borderRadius: '16px',
  bgcolor: 'background.paper',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  border: '1px solid',
  borderColor: 'divider',
};

export const faqAccordionStyle: SxProps<Theme> = {
  mb: 1.5,
  borderRadius: '12px !important',
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    borderColor: 'primary.200',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.08)',
  },
};

export const legalSectionBoxStyle: SxProps<Theme> = {
  mb: 4,
  '&:last-child': {
    mb: 0,
  },
};

export const legalHeadingStyle: SxProps<Theme> = {
  fontWeight: 700,
  fontFamily: '"Space Grotesk", sans-serif',
  color: 'text.primary',
  mb: 1.5,
};

export const legalParagraphStyle: SxProps<Theme> = {
  color: 'text.secondary',
  lineHeight: 1.7,
  mb: 1.5,
};
