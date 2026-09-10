import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  MapPin,
  Home,
  Building2,
  Store,
  Edit3,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import { Address } from '../../types';
import {
  addressCardStyle,
  addressCardHeaderStyle,
  addressLabelBadgeStyle,
  addressDefaultBadgeStyle,
  addressSelectedBadgeStyle,
  addressRecipientTextStyle,
  addressDetailTextStyle,
  addressActionsWrapperStyle,
} from './AddressCard.styles';

export interface AddressCardProps {
  address: Address;
  isSelected?: boolean;
  selectable?: boolean;
  onSelect?: (address: Address) => void;
  onEdit?: (address: Address) => void;
  onDelete?: (addressId: string) => void;
  onSetDefault?: (addressId: string) => void;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected = false,
  selectable = false,
  onSelect,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  const getLabelIcon = (label: string) => {
    switch (label) {
      case 'Trabalho':
      case 'Comercial':
        return <Building2 size={15} />;
      case 'Residencial':
      case 'Casa':
        return <Home size={15} />;
      case 'Apartamento':
        return <Store size={15} />;
      default:
        return <MapPin size={15} />;
    }
  };

  const handleCardClick = () => {
    if (selectable && onSelect) {
      onSelect(address);
    }
  };

  const hasRecipientName = address.recipientName && address.recipientName.trim().toLowerCase() !== 'teste';

  return (
    <Box
      sx={addressCardStyle(selectable ? isSelected : false, address.isDefault)}
      onClick={handleCardClick}
    >
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 84 }}>
        <Box sx={addressCardHeaderStyle}>
          <Box sx={addressLabelBadgeStyle}>
            {getLabelIcon(address.label)}
            <span>{address.label}</span>
          </Box>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          {hasRecipientName && (
            <Typography sx={addressRecipientTextStyle}>{address.recipientName}</Typography>
          )}

          <Typography sx={addressDetailTextStyle}>
            {address.street}, {address.number}
            {address.complement ? ` - ${address.complement}` : ''}
          </Typography>
          <Typography sx={addressDetailTextStyle}>
            {address.neighborhood} — {address.city}/{address.state}
          </Typography>
          <Typography sx={{ ...addressDetailTextStyle, fontWeight: 600, mt: 0.5 }}>
            CEP: {address.cep}
          </Typography>

          {address.referencePoint && address.referencePoint.trim() && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: 'block',
                mt: 1.5,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Ref: {address.referencePoint}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={addressActionsWrapperStyle}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {selectable && onSelect ? (
            <Button
              size="small"
              variant={isSelected ? 'contained' : 'outlined'}
              color={isSelected ? 'primary' : 'inherit'}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(address);
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
              Entregar Aqui
            </Button>
          ) : address.isDefault ? (
            <Box sx={addressDefaultBadgeStyle}>
              <CheckCircle2 size={13} />
              <span>Padrão</span>
            </Box>
          ) : onSetDefault ? (
            <Button
              size="small"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                onSetDefault(address.id);
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

        {(onEdit || onDelete) && (
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            {onEdit && (
              <Tooltip title="Editar endereço">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(address);
                  }}
                  sx={{ color: 'text.secondary' }}
                  aria-label="Editar endereço"
                >
                  <Edit3 size={16} />
                </IconButton>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip title="Excluir endereço">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(address.id);
                  }}
                  sx={{ color: 'error.light', '&:hover': { color: 'error.main' } }}
                  aria-label="Excluir endereço"
                >
                  <Trash2 size={16} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
