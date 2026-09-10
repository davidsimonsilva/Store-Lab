import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Box, Typography, Button, IconButton, Fade } from '@mui/material';
import { ChevronLeft, ChevronRight, ArrowRight, Activity, Cpu, Sparkles } from 'lucide-react';
import { useUIState } from '../../../context/UIStateContext';
import { formatUrlName } from '../../../utils/formatters';
import { MOCK_PRODUCTS } from '../../../mocks/products';
import {
  bannerMainContainerStyle,
  bannerSlideWrapperStyle,
  bannerTextContainerStyle,
  bannerBadgeStyle,
  bannerBadgeTextStyle,
  bannerSubtitleStyle,
  bannerTitleStyle,
  bannerDescriptionStyle,
  bannerCtaContainerStyle,
  bannerCtaButtonStyle,
  bannerImageWrapperStyle,
  bannerImageBackdropCircleStyle,
  bannerImageCardStyle,
  bannerNavButtonStyle,
  bannerDotsContainerStyle,
  bannerDotHitboxStyle,
  bannerDotIndicatorStyle,
} from './BannerRotativo.styles';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeIcon: React.ReactNode;
  imageUrl: string;
  ctaText: string;
  productTargetId: string;
  bgColor: string;
}

export const BannerRotativo: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { setSelectedProductId } = useUIState();

  const handleNavigateToProduct = (targetId: string) => {
    const prod = MOCK_PRODUCTS.find((p: { productID?: string; id?: string | number }) => p.productID === targetId || p.id === targetId || String(p.id) === targetId);
    const namePart = prod ? formatUrlName(prod.name) : 'produto';
    setSelectedProductId(targetId);
    navigate(`/produto/${namePart}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const slides: Slide[] = [
    {
      id: 0,
      title: "Próxima Geração de Dispositivos Móveis",
      subtitle: "NEXUS PRIME SMARTPHONE",
      description: "Desempenho redefinido com tela LTPO 120Hz, câmera de 200MP com estabilização ótica inteligente e bateria para o dia todo.",
      badge: "Inovação Tech",
      badgeIcon: <Cpu size={14} color="#2563eb" style={{ marginRight: '4px' }} />,
      imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
      ctaText: "Ver Smartphone",
      productTargetId: "nxp7s9h1p2",
      bgColor: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    },
    {
      id: 1,
      title: "Escritório Minimalista Premium",
      subtitle: "MINIMALIST WORKSTATION 2.0",
      description: "Mesa ergonômica em carvalho maciço com sistema de gestão de cabos invisível e acabamento premium acetinado.",
      badge: "Estilo & Foco",
      badgeIcon: <Activity size={14} color="#059669" style={{ marginRight: '4px' }} />,
      imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1200&auto=format&fit=crop",
      ctaText: "Ver Workstation",
      productTargetId: "mnw2o8s3t4",
      bgColor: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    },
    {
      id: 2,
      title: "Nécessaire Organizadora de Viagem",
      subtitle: "ORGANIZADOR COMPACTO",
      description: "Nécessaire sofisticada em lona encerada impermeável com divisórias internas elásticas e acabamento refinado para dia a dia e viagens.",
      badge: "Beleza & Viagem",
      badgeIcon: <Sparkles size={14} color="#d97706" style={{ marginRight: '4px' }} />,
      imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
      ctaText: "Ver Nécessaire",
      productTargetId: "snc1k4o7l2",
      bgColor: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [mounted, current, slides.length]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[current];

  return (
    <Box sx={bannerMainContainerStyle()}>
      <Fade in={true} timeout={800} key={slide.id}>
        <Box sx={bannerSlideWrapperStyle(slide.bgColor)}>
          <Box sx={bannerTextContainerStyle}>
            <Box sx={bannerBadgeStyle}>
              {slide.badgeIcon}
              <Typography component="span" sx={bannerBadgeTextStyle}>
                {slide.badge}
              </Typography>
            </Box>

            <Typography variant="caption" sx={bannerSubtitleStyle}>
              {slide.subtitle}
            </Typography>

            <Typography variant="h3" sx={bannerTitleStyle}>
              {slide.title}
            </Typography>

            <Typography variant="body1" sx={bannerDescriptionStyle}>
              {slide.description}
            </Typography>

            <Box sx={bannerCtaContainerStyle}>
              <Button 
                variant="contained" 
                onClick={() => handleNavigateToProduct(slide.productTargetId)}
                endIcon={<ArrowRight size={16} />}
                sx={bannerCtaButtonStyle}
              >
                {slide.ctaText}
              </Button>
            </Box>
          </Box>

          <Box sx={bannerImageWrapperStyle}>
            <Box sx={bannerImageBackdropCircleStyle} />

            <Box
              onClick={() => handleNavigateToProduct(slide.productTargetId)}
              sx={bannerImageCardStyle}
            >
              <img 
                src={slide.imageUrl} 
                alt={slide.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'rotate(-12deg) scale(1.23)'
                }}
                referrerPolicy="no-referrer"
              />
            </Box>
          </Box>
        </Box>
      </Fade>

      <IconButton 
        onClick={handlePrev}
        aria-label="Slide anterior"
        sx={bannerNavButtonStyle('left')}
      >
        <ChevronLeft size={20} />
      </IconButton>

      <IconButton 
        onClick={handleNext}
        aria-label="Próximo slide"
        sx={bannerNavButtonStyle('right')}
      >
        <ChevronRight size={20} />
      </IconButton>

      <Box sx={bannerDotsContainerStyle}>
        {slides.map((_, i) => (
          <Box 
            key={i}
            component="button"
            type="button"
            aria-label={`Ir para o slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            sx={bannerDotHitboxStyle}
          >
            <Box sx={bannerDotIndicatorStyle(i === current)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
