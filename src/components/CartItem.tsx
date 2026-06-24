import React from 'react';
import { Box, Paper, Typography, IconButton, Tooltip } from '@mui/material';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { getProductFallbackImage } from '../mock/products';

interface CartItemProps {
  item: CartItemType;
  updateCartQuantity: (id: string | number, qty: number) => void;
  removeFromCart: (id: string | number) => void;
  onNavigateToProduct: (id: string, name: string) => void;
  formatBRL: (val: number) => string;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  updateCartQuantity,
  removeFromCart,
  onNavigateToProduct,
  formatBRL,
}) => {
  const pId = item.product.productID || item.product.id;
  const pIdStr = String(pId);

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 2.5, 
        borderRadius: '16px', 
        border: '1px solid #f1f5f9',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2.5,
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <Box 
        onClick={() => onNavigateToProduct(pIdStr, item.product.name)}
        sx={{ 
          width: { xs: '100%', sm: '110px' }, 
          height: '110px', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          bgcolor: '#f8fafc',
          position: 'relative',
          flexShrink: 0,
          cursor: 'pointer',
          transition: 'opacity 0.2s',
          '&:hover': {
            opacity: 0.82
          }
        }}
      >
        <img 
          src={getProductFallbackImage(pIdStr, item.product.category)} 
          alt={item.product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          referrerPolicy="no-referrer"
        />
      </Box>

      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.725rem', textTransform: 'uppercase' }}>
          {item.product.category}
        </Typography>
        <Typography 
          variant="h6" 
          onClick={() => onNavigateToProduct(pIdStr, item.product.name)}
          sx={{ 
            fontFamily: '"Space Grotesk", sans-serif', 
            fontWeight: 700, 
            color: '#0f172a',
            mb: 0.5,
            fontSize: '1.05rem',
            lineHeight: 1.3,
            cursor: 'pointer',
            transition: 'color 0.2s',
            '&:hover': {
              color: '#2563eb'
            }
          }}
        >
          {item.product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#3b82f6', fontWeight: 700, mb: 1.5 }}>
          {formatBRL(item.product.price)} / unidade
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Box 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              bgcolor: '#f1f5f9', 
              borderRadius: '20px', 
              border: '1px solid #e2e8f0',
              px: 1,
              py: 0.25
            }}
          >
            <IconButton 
              size="small" 
              onClick={() => updateCartQuantity(pId, item.quantity - 1)}
              sx={{ color: '#475569' }}
            >
              <Minus size={14} strokeWidth={2.5} />
            </IconButton>
            <Typography variant="body2" sx={{ mx: 2, fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif', color: '#0f172a' }}>
              {item.quantity}
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => updateCartQuantity(pId, item.quantity + 1)}
              sx={{ color: '#475569' }}
            >
              <Plus size={14} strokeWidth={2.5} />
            </IconButton>
          </Box>

          <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b', fontSize: '0.95rem' }}>
            Subtotal: {formatBRL(item.product.price * item.quantity)}
          </Typography>
        </Box>
      </Box>

      <Tooltip title="Remover item">
        <IconButton 
          onClick={() => removeFromCart(pId)}
          sx={{ 
            position: { sm: 'absolute' }, 
            top: { sm: 16 }, 
            right: { sm: 16 },
            color: '#94a3b8',
            '&:hover': { color: '#ef4444', bgcolor: '#fef2f2' }
          }}
        >
          <Trash2 size={18} />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default CartItem;
