import React from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import { SavedCard } from '../../types';
import {
  creditCardCardStyle,
  creditCardHeaderStyle,
  creditCardNumberStyle,
  creditCardFooterStyle,
  cardBrandBadgeStyle,
  cardDefaultBadgeStyle,
  cardActionsWrapperStyle,
} from './CreditCardCard.styles';

export interface CreditCardCardProps {
  card: SavedCard;
  isSelected?: boolean;
  selectable?: boolean;
  onSelect?: (card: SavedCard) => void;
  onDelete?: (cardId: string) => void;
  onSetDefault?: (cardId: string) => void;
}

export const CreditCardCard: React.FC<CreditCardCardProps> = ({
  card,
  isSelected = false,
  selectable = false,
  onSelect,
  onDelete,
  onSetDefault,
}) => {
  const handleCardClick = () => {
    if (selectable && onSelect) {
      onSelect(card);
    }
  };

  return (
    <Box
      sx={creditCardCardStyle(selectable ? isSelected : false, card.isDefault)}
      onClick={handleCardClick}
    >
      <Box>
        <Box sx={creditCardHeaderStyle}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CreditCardIcon size={20} color={isSelected ? '#2563eb' : '#64748b'} />
            <Chip
              label={card.brand.toUpperCase()}
              size="small"
              sx={cardBrandBadgeStyle(card.brand)}
            />
          </Box>
        </Box>

        <Typography sx={creditCardNumberStyle}>
          •••• •••• •••• {card.lastFourDigits}
        </Typography>

        <Box sx={creditCardFooterStyle}>
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: 'uppercase', fontSize: '0.65rem', display: 'block' }}
            >
              Titular
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {card.holderName}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ textTransform: 'uppercase', fontSize: '0.65rem', display: 'block' }}
            >
              Validade
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {card.expiryMonth}/{card.expiryYear}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={cardActionsWrapperStyle}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {selectable && onSelect ? (
            <Button
              size="small"
              variant={isSelected ? 'contained' : 'outlined'}
              color={isSelected ? 'primary' : 'inherit'}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(card);
              }}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.8rem',
                height: 32,
                boxSizing: 'border-box',
                lineHeight: 1,
              }}
            >
              Usar este Cartão
            </Button>
          ) : card.isDefault ? (
            <Box sx={cardDefaultBadgeStyle}>
              <CheckCircle2 size={13} />
              <span>Padrão</span>
            </Box>
          ) : onSetDefault ? (
            <Button
              size="small"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                onSetDefault(card.id);
              }}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 28,
                boxSizing: 'border-box',
                px: 1.25,
                lineHeight: 1,
                borderColor: 'divider',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  bgcolor: 'primary.50',
                },
              }}
            >
              Definir como Padrão
            </Button>
          ) : null}
        </Box>

        {onDelete && (
          <Tooltip title="Excluir cartão">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(card.id);
              }}
              sx={{ color: 'error.light', '&:hover': { color: 'error.main' } }}
              aria-label="Excluir cartão"
            >
              <Trash2 size={16} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};
