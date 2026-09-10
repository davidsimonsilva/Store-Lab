import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Search } from 'lucide-react';
import { ProductImage } from '../../../components/ui/ProductImage';
import { mainImageWrapperStyle } from '../ProductDetail.styles';

interface ProductGalleryProps {
  imagesList: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  imagesList,
  productName,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setActiveImageIdx(0);
    setIsZoomed(false);
    setZoomPos({ x: 50, y: 50 });
  }, [imagesList]);

  useEffect(() => {
    if (!isZoomed) {
      setZoomPos({ x: 50, y: 50 });
    }
  }, [isZoomed]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          ...mainImageWrapperStyle,
          cursor: isZoomed ? 'zoom-out' : 'zoom-in',
        }}
        onClick={() => setIsZoomed(!isZoomed)}
        onMouseMove={(e) => {
          if (!isZoomed) return;
          const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
          const rawX = ((e.clientX - left) / width) * 100;
          const rawY = ((e.clientY - top) / height) * 100;
          setZoomPos({
            x: Math.max(0, Math.min(100, rawX)),
            y: Math.max(0, Math.min(100, rawY)),
          });
        }}
      >
        <ProductImage
          src={imagesList[activeImageIdx]}
          alt={productName}
          sx={{
            width: '100%',
            height: '100%',
            transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transition: isZoomed
              ? 'none'
              : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.3s ease',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            px: 1.8,
            py: 0.8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <Search size={14} color="#334155" style={{ marginRight: '6px' }} />
          <Typography variant="caption" sx={{ color: '#0f172a', fontWeight: 700, fontSize: '0.78rem' }}>
            {isZoomed ? 'Remover Zoom' : 'Zoom na Imagem'}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, width: '100%' }}>
        {imagesList.map((img, idx) => (
          <Box
            key={idx}
            onClick={() => setActiveImageIdx(idx)}
            sx={{
              width: '72px',
              height: '72px',
              borderRadius: '12px',
              border: activeImageIdx === idx ? '2px solid #2563eb' : '1px solid #e2e8f0',
              overflow: 'hidden',
              cursor: 'pointer',
              bgcolor: '#ffffff',
              transition: 'all 0.2s ease',
              '&:hover': { opacity: 0.85 },
            }}
          >
            <ProductImage
              src={img}
              alt={`${productName} miniatura ${idx + 1}`}
              sx={{ width: '100%', height: '100%' }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
