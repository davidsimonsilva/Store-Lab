import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Rating
} from '@mui/material';
import { ArrowRight as ArrowRightIcon } from 'lucide-react';
import { Product } from '../types';
import { getProductFallbackImage } from '../mock/products';
import { useGlobalState, formatUrlName } from '../context/GlobalStateContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { setSelectedProductId } = useGlobalState();

  const formattedPrice = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleCardClick = () => {
    const id = product.productID || product.id;
    const namePart = formatUrlName(product.name);
    setSelectedProductId(id);
    navigate(`/produto/${namePart}-${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <Card 
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        p: 2,
        bgcolor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: '#cbd5e1',
          boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.05)',
        }
      }}
    >
      <Box 
        sx={{ 
          height: '160px',
          bgcolor: '#f1f5f9',
          borderRadius: '12px',
          overflow: 'hidden', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          position: 'relative',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            bgcolor: '#e2e8f0'
          }
        }}
      >
        <img
          src={getProductFallbackImage(product.id, product.category)}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          referrerPolicy="no-referrer"
        />
        
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 8, 
            right: 8, 
            bgcolor: 'rgba(255, 255, 255, 0.85)', 
            backdropFilter: 'blur(4px)',
            borderRadius: '6px',
            px: 0.75,
            py: 0.25,
            display: 'flex',
            alignItems: 'center',
            gap: 0.25
          }}
        >
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
        <Typography 
          variant="caption" 
          sx={{ 
            textTransform: 'uppercase', 
            fontWeight: 800, 
            color: '#2563eb',
            fontSize: '10px', 
            letterSpacing: '0.075em',
            display: 'block',
            mb: 0.5
          }}
        >
          {product.category.split(' / ')[0]}
        </Typography>

        <Typography 
          id={`product-title-${product.id}`}
          variant="subtitle1" 
          component="h3"
          sx={{ 
            fontFamily: '"Space Grotesk", sans-serif',
            fontSize: '0.95rem', 
            fontWeight: 700, 
            lineHeight: 1.3,
            mb: 0.5,
            color: '#0f172a',
            height: '2.5rem',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {product.name}
        </Typography>

        <Typography 
          variant="body2" 
          sx={{ 
            color: '#64748b', 
            lineHeight: 1.4,
            mb: 2.5,
            fontSize: '0.75rem',
            height: '2.2rem',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {product.description}
        </Typography>

        <Box 
          sx={{ 
            mt: 'auto', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            pt: 1.5,
            borderTop: '1px solid #f1f5f9'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="caption" sx={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.05em' }}>
              A partir de
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, color: '#0f172a', fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
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
