import React from 'react';
import { Box, Paper, Typography, IconButton, Tooltip } from '@mui/material';
import { Minus, Plus, X } from 'lucide-react';
import { CartItem as CartItemType } from '../../../types';
import { getProductFallbackImage } from '../../../mocks/products';
import { formatCurrencyBRL } from '../../../utils/formatters';
import { ProductImage } from '../../../components/ui/ProductImage';
import {
  TOOLTIP_MAX_LIMIT_MESSAGE,
  MAX_PRODUCT_PURCHASE_LIMIT,
} from '../../../services/productQuotaService';
import {
  cartItemPaperStyle,
  cartItemImageWrapperStyle,
  cartItemContentStyle,
  cartItemTitleStyle,
  cartItemRemoveButtonStyle,
  quantityControlsStyle,
} from './CartItem.styles';

interface CartItemProps {
  item: CartItemType;
  updateCartQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  onNavigateToProduct: (id: string, name: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  updateCartQuantity,
  removeFromCart,
  onNavigateToProduct,
}) => {
  const pId = item.product.id;
  const pIdStr = String(pId);

  return (
    <Paper elevation={0} sx={cartItemPaperStyle}>
      <Box 
        onClick={() => onNavigateToProduct(pIdStr, item.product.name)}
        sx={cartItemImageWrapperStyle}
      >
        <ProductImage 
          src={getProductFallbackImage(pIdStr, item.product.category)} 
          alt={item.product.name}
          sx={{ width: '100%', height: '100%' }}
        />
      </Box>

      <Box sx={cartItemContentStyle}>
        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.725rem', textTransform: 'uppercase' }}>
          {item.product.category}
        </Typography>
        <Typography 
          variant="h6" 
          onClick={() => onNavigateToProduct(pIdStr, item.product.name)}
          sx={cartItemTitleStyle}
        >
          {item.product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#3b82f6', fontWeight: 700, mb: 1.5 }}>
          {formatCurrencyBRL(item.product.price)} / unidade
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={quantityControlsStyle}>
            <IconButton 
              size="small" 
              aria-label="Diminuir quantidade"
              onClick={() => updateCartQuantity(pId, item.quantity - 1)}
              sx={{ color: '#475569' }}
            >
              <Minus size={14} strokeWidth={2.5} />
            </IconButton>
            <Typography variant="body2" sx={{ mx: 2, fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif', color: '#0f172a' }}>
              {item.quantity}
            </Typography>
            <Tooltip title={item.quantity >= MAX_PRODUCT_PURCHASE_LIMIT ? TOOLTIP_MAX_LIMIT_MESSAGE : ''}>
              <span>
                <IconButton 
                  size="small" 
                  aria-label="Aumentar quantidade"
                  onClick={() => updateCartQuantity(pId, item.quantity + 1)}
                  disabled={item.quantity >= MAX_PRODUCT_PURCHASE_LIMIT}
                  sx={{ 
                    color: '#475569',
                    '&.Mui-disabled': { color: '#cbd5e1' }
                  }}
                >
                  <Plus size={14} strokeWidth={2.5} />
                </IconButton>
              </span>
            </Tooltip>
          </Box>

          <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b', fontSize: '0.95rem' }}>
            Subtotal: {formatCurrencyBRL(item.product.price * item.quantity)}
          </Typography>
        </Box>
      </Box>

      <Tooltip title="Remover do carrinho">
        <IconButton 
          aria-label="Remover item do carrinho"
          onClick={() => removeFromCart(pId)}
          sx={cartItemRemoveButtonStyle}
          size="small"
        >
          <X size={18} strokeWidth={2.2} />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default CartItem;

