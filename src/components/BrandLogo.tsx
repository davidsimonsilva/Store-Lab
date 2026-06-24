import React from 'react';
import { Box } from '@mui/material';
import { FlaskConical as FlaskIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BrandLogoProps {
  size?: 'small' | 'large';
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'small', onClick }) => {
  const navigate = useNavigate();

  const isLarge = size === 'large';
  const containerSize = isLarge ? '56px' : '40px';
  const iconSize = isLarge ? 28 : 20;
  const borderRadius = isLarge ? '12px' : '8px';

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
      sx={{ 
        bgcolor: '#2563eb',
        width: containerSize,
        height: containerSize, 
        borderRadius: borderRadius, 
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        '&:hover': { 
          bgcolor: '#1d4ed8',
          transform: isLarge ? 'scale(1.05) rotate(-4deg)' : 'rotate(-4deg)' 
        }
      }}
    >
      <FlaskIcon size={iconSize} color="#ffffff" strokeWidth={2.5} />
    </Box>
  );
};
