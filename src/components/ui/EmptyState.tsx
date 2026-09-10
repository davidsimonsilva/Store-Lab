import React from 'react';
import { Card, Box, Typography, Button } from '@mui/material';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import {
  emptyStateCardStyle,
  emptyStateIconBoxStyle,
  emptyStateTitleStyle,
  emptyStateDescriptionStyle,
  emptyStateButtonStyle,
} from './EmptyState.styles';

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
  const hasAction = Boolean(actionText && onAction);

  return (
    <Card 
      elevation={0}
      sx={emptyStateCardStyle}
    >
      <Box sx={emptyStateIconBoxStyle}>
        {icon || <ShoppingBag size={36} strokeWidth={1.8} />}
      </Box>

      <Typography 
        variant="h5" 
        sx={emptyStateTitleStyle}
      >
        {title}
      </Typography>

      <Typography 
        variant="body2" 
        sx={emptyStateDescriptionStyle(hasAction)}
      >
        {description}
      </Typography>

      {actionText && onAction && (
        <Button 
          variant="contained" 
          onClick={onAction}
          startIcon={<ArrowLeft size={18} />}
          sx={emptyStateButtonStyle}
        >
          {actionText}
        </Button>
      )}
    </Card>
  );
};

