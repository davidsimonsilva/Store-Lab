import React from 'react';
import { Box } from '@mui/material';
import { FlaskConical as FlaskIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { brandLogoContainerStyle } from './BrandLogo.styles';

interface BrandLogoProps {
  size?: 'small' | 'large';
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'small', onClick }) => {
  const navigate = useNavigate();

  const isLarge = size === 'large';
  const iconSize = isLarge ? 28 : 20;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Box 
      onClick={handleClick}
      sx={brandLogoContainerStyle(isLarge)}
    >
      <FlaskIcon size={iconSize} color="#ffffff" strokeWidth={2.5} />
    </Box>
  );
};
