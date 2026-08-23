import React from 'react';
import { Card, Box, Typography, Button } from '@mui/material';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <Card 
      elevation={0}
      sx={{ 
        p: { xs: 4, sm: 6 }, 
        textAlign: 'center', 
        bgcolor: '#ffffff', 
        borderRadius: '16px', 
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '540px',
        mx: 'auto',
        my: 4,
        boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
      }}
    >
      <Box 
        sx={{ 
          bgcolor: '#eff6ff', 
          width: '72px', 
          height: '72px', 
          borderRadius: '50%', 
          mb: 3, 
          color: '#2563eb', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        {icon || <ShoppingBag size={36} strokeWidth={1.8} />}
      </Box>

      <Typography 
        variant="h5" 
        sx={{ 
          fontFamily: '"Space Grotesk", sans-serif', 
          fontWeight: 800, 
          color: '#0f172a', 
          mb: 1.5,
          fontSize: '1.45rem' 
        }}
      >
        {title}
      </Typography>

      <Typography 
        variant="body2" 
        sx={{ 
          color: '#64748b', 
          maxWidth: '420px', 
          lineHeight: 1.6, 
          fontSize: '0.925rem',
          mb: actionText && onAction ? 4 : 0 
        }}
      >
        {description}
      </Typography>

      {actionText && onAction && (
        <Button 
          variant="contained" 
          onClick={onAction}
          startIcon={<ArrowLeft size={18} />}
          sx={{ 
            px: 4, 
            py: 1.2, 
            borderRadius: '9999px', 
            fontWeight: 700, 
            bgcolor: '#2563eb',
            textTransform: 'none',
            fontSize: '0.925rem',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
            '&:hover': {
              bgcolor: '#1d4ed8'
            }
          }}
        >
          {actionText}
        </Button>
      )}
    </Card>
  );
};

