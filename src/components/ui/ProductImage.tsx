import React, { useState, useEffect, useRef } from 'react';
import { Box, BoxProps, Skeleton } from '@mui/material';
import {
  productImageWrapperStyle,
  productImageSkeletonStyle,
  productImageStyle,
} from './ProductImage.styles';

export interface ProductImageProps extends Omit<BoxProps<'img'>, 'src'> {
  src?: string;
  alt: string;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK_IMAGE = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" fill="none"><rect width="400" height="400" fill="%23f1f5f9"/><path d="M160 170C160 181.046 151.046 190 140 190C128.954 190 120 181.046 120 170C120 158.954 128.954 150 140 150C151.046 150 160 158.954 160 170Z" fill="%23cbd5e1"/><path d="M110 270L170 190L220 240L260 200L310 270H110Z" fill="%23cbd5e1"/><text x="200" y="320" font-family="sans-serif" font-size="14" font-weight="600" fill="%2394a3b8" text-anchor="middle">Imagem Indisponível</text></svg>';

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  onError,
  onLoad,
  sx,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const targetSrc = src || fallbackSrc;
    setImgSrc(targetSrc);
    setHasError(false);

    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }

    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(safetyTimer);
  }, [src, fallbackSrc]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
    if (onError) {
      onError(e);
    }
  };

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    if (onLoad) {
      onLoad(e);
    }
  };

  return (
    <Box sx={productImageWrapperStyle}>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={productImageSkeletonStyle}
        />
      )}
      <Box
        component="img"
        ref={imgRef}
        src={imgSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        decoding="async"
        sx={productImageStyle(isLoading, sx)}
        {...rest}
      />
    </Box>
  );
};
