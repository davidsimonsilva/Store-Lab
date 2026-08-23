import React from 'react';
import { useNavigate } from 'react-router';
import { 
  Card, 
  Typography, 
  Box, 
  Rating
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from 'lucide-react';
import { Product } from '../../types';
import { getProductFallbackImage } from '../../mocks/products';
import { useUIState, formatUrlName } from '../../context/UIStateContext';
import { formatCurrencyBRL } from '../../utils/formatters';
import { ProductImage } from '../ui/ProductImage';
import {
  cardContainerStyle,
  cardImageWrapperStyle,
  ratingBadgeStyle,
  categoryTagStyle,
  productTitleStyle,
  productDescStyle,
  cardFooterStyle,
  priceTextStyle
} from './ProductCard.styles';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { setSelectedProductId } = useUIState();

  const formattedPrice = formatCurrencyBRL(product.price);

  const handleCardClick = () => {
    const id = product.productID || product.id;
    const namePart = formatUrlName(product.name);
    setSelectedProductId(id);
    navigate(`/produto/${namePart}-${id}`);
    window.scrollTo(0, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <Card 
      id={`product-card-${product.id}`}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalhes do produto ${product.name}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      sx={cardContainerStyle}
    >
      <Box sx={cardImageWrapperStyle}>
        <ProductImage
          src={getProductFallbackImage(product.id, product.category)}
          alt={product.name}
          sx={{
            width: '100%',
            height: '100%',
            transition: 'transform 0.4s ease',
          }}
        />
        
        <Box sx={ratingBadgeStyle}>
          <Rating 
            value={product.rating || 4.5} 
            precision={0.1} 
            readOnly 
            size="small" 
            sx={{ color: '#fbbf24', fontSize: '0.65rem' }}
          />
          <Typography variant="caption" sx={{ color: '#0f172a', fontWeight: 700, fontSize: '0.6rem' }}>
            {product.rating || 4.5}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography variant="caption" sx={categoryTagStyle}>
          {product.category.split(' / ')[0]}
        </Typography>

        <Typography 
          id={`product-title-${product.id}`}
          variant="subtitle1" 
          component="h3"
          sx={productTitleStyle}
        >
          {product.name}
        </Typography>

        <Typography variant="body2" sx={productDescStyle}>
          {product.description}
        </Typography>

        <Box sx={cardFooterStyle}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="caption" sx={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.05em' }}>
              A partir de
            </Typography>
            <Typography variant="body1" sx={priceTextStyle}>
              {formattedPrice}
            </Typography>
          </Box>

          <Box sx={{ color: '#2563eb', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 600, userSelect: 'none' }}>Ver mais</Typography>
            <ArrowRightIcon size={14} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
