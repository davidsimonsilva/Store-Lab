import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, IconButton, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight, ArrowRight, Activity, Cpu, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useGlobalState, formatUrlName } from '../context/GlobalStateContext';
import { MOCK_PRODUCTS } from '../mock/products';

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
  const theme = useTheme();
  const { setSelectedProductId } = useGlobalState();

  const slides: Slide[] = [
    {
      id: 0,
      title: "Próxima Geração de Dispositivos Móveis",
      subtitle: "NEXUS PRIME SMARTPHONE",
      description: "Desempenho redefinido com inteligência laboratorial. Câmera de 200MP com estabilização ótica inteligente e display de alta fluidez.",
      badge: "Inovação Tech",
      badgeIcon: <Cpu size={14} color="#2563eb" style={{ marginRight: '4px' }} />,
      imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop",
      ctaText: "Descubra a Tecnologia",
      productTargetId: "nxp7s9h1p2",
      bgColor: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
    },
    {
      id: 1,
      title: "Escritório Minimalista Premium",
      subtitle: "WORKSTATION ERGONÔMICA 2.0",
      description: "Ergonomia avançada para focar no que realmente importa. Feita com madeira nobre sustentável e guias de cabos invisíveis instalados.",
      badge: "Estilo & Foco",
      badgeIcon: <Activity size={14} color="#059669" style={{ marginRight: '4px' }} />,
      imageUrl: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=1200&auto=format&fit=crop",
      ctaText: "Explore o Design",
      productTargetId: "mnw2o8s3t4",
      bgColor: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    },
    {
      id: 2,
      title: "Fórmulas Certificadas e Hidratação",
      subtitle: "BIOTECNOLOGIA EXCLUSIVA",
      description: "Fórmula de ácido hialurônico de alta biocompatibilidade idealizada em pesquisas microscópicas de última geração científica.",
      badge: "Formulação Lab",
      badgeIcon: <Sparkles size={14} color="#d97706" style={{ marginRight: '4px' }} />,
      imageUrl: "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=1200&auto=format&fit=crop",
      ctaText: "Ver Cuidados",
      productTargetId: "lfs4k2s7t8",
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
    }, 6000);
    return () => clearInterval(timer);
  }, [mounted, slides.length]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!mounted) {
    const slide = slides[0];
    return (
      <Box 
        sx={{ 
          position: 'relative', 
          width: '100%', 
          height: { xs: '450px', sm: '500px', md: '530px' }, 
          borderRadius: '24px', 
          overflow: 'hidden',
          mb: 6,
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
          background: slide.bgColor,
        }}
      >
        <div style={{ width: '100%', height: '100%', display: 'flex' }}>
          <Box 
            sx={{ 
              flex: { xs: '1', md: '0.55' }, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              px: { xs: 2.5, sm: 6, md: 8 }, 
              py: 4, 
              color: '#0f172a', 
              zIndex: 3,
              position: 'relative'
            }}
          >
            <Box 
              sx={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                bgcolor: 'rgba(255, 255, 255, 0.6)', 
                px: 2, 
                py: 0.75, 
                borderRadius: '20px', 
                width: 'fit-content',
                mb: 3,
                border: '1px solid rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)'
              }}
            >
              {slide.badgeIcon}
              <Typography 
                component="span" 
                sx={{ 
                  fontSize: '0.75rem', 
                  fontFamily: 'monospace', 
                  fontWeight: 700, 
                  letterSpacing: '0.05em', 
                  textTransform: 'uppercase', 
                  color: '#334155' 
                }}
              >
                {slide.badge}
              </Typography>
            </Box>

            <Typography 
              variant="caption" 
              sx={{ 
                fontFamily: '"Space Grotesk", sans-serif',
                letterSpacing: '0.25em', 
                fontWeight: 700, 
                color: '#2563eb', 
                display: 'block',
                mb: 1.5,
                textTransform: 'uppercase'
              }}
            >
              {slide.subtitle}
            </Typography>

            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800, 
                letterSpacing: '-0.04em', 
                mb: 2.5,
                lineHeight: 1.15,
                fontFamily: '"Space Grotesk", sans-serif',
                color: '#0f172a',
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.125rem' }
              }}
            >
              {slide.title}
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4.5, 
                color: '#475569', 
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: '480px',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              {slide.description}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                sx={{ 
                  px: { xs: 3, sm: 4.5 }, 
                  py: 1.8,
                  borderRadius: '12px', 
                  fontWeight: 800,
                  bgcolor: '#0f172a', 
                  color: '#ffffff',
                  fontFamily: '"Space Grotesk", sans-serif',
                }}
              >
                {slide.ctaText}
              </Button>
            </Box>
          </Box>

          <Box 
            sx={{ 
              flex: { xs: '0', md: '0.45' }, 
              position: 'relative', 
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            <Box 
              sx={{
                width: '320px',
                height: '320px',
                bgcolor: 'rgba(255, 255, 255, 0.45)',
                backdropFilter: 'blur(12px)',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                position: 'absolute',
                zIndex: 1
              }}
            />
            <Box
              sx={{
                width: '240px',
                height: '240px',
                borderRadius: '24px',
                bgcolor: '#ffffff',
                border: '6px solid #ffffff',
                transform: 'rotate(12deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 2,
              }}
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
        </div>
      </Box>
    );
  }

  const slide = slides[current];

  return (
    <Box 
      sx={{ 
        position: 'relative', 
        width: '100%', 
        height: { xs: '450px', sm: '500px', md: '530px' }, 
        borderRadius: '24px', 
        overflow: 'hidden',
        mb: 6,
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            height: '100%',
            background: slide.bgColor,
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Box 
            component={motion.div}
            sx={{ 
              flex: { xs: '1', md: '0.55' }, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              px: { xs: 2.5, sm: 6, md: 8 }, 
              py: 4, 
              color: '#0f172a', 
              zIndex: 3,
              position: 'relative'
            }}
          >
            <Box 
              component={motion.div}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              sx={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                bgcolor: 'rgba(255, 255, 255, 0.6)', 
                px: 2, 
                py: 0.75, 
                borderRadius: '20px', 
                width: 'fit-content',
                mb: 3,
                border: '1px solid rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
              }}
            >
              {slide.badgeIcon}
              <Typography 
                component="span" 
                sx={{ 
                  fontSize: '0.75rem', 
                  fontFamily: 'monospace', 
                  fontWeight: 700, 
                  letterSpacing: '0.05em', 
                  textTransform: 'uppercase', 
                  color: '#334155' 
                }}
              >
                {slide.badge}
              </Typography>
            </Box>

            <Typography 
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              variant="caption" 
              sx={{ 
                fontFamily: '"Space Grotesk", sans-serif',
                letterSpacing: '0.25em', 
                fontWeight: 700, 
                color: '#2563eb', 
                display: 'block',
                mb: 1.5,
                textTransform: 'uppercase'
              }}
            >
              {slide.subtitle}
            </Typography>

            <Typography 
              component={motion.h1}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              variant="h3" 
              sx={{ 
                fontWeight: 800, 
                letterSpacing: '-0.04em', 
                mb: 2.5,
                lineHeight: 1.15,
                fontFamily: '"Space Grotesk", sans-serif',
                color: '#0f172a',
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3.125rem' }
              }}
            >
              {slide.title}
            </Typography>

            <Typography 
              component={motion.p}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              variant="body1" 
              sx={{ 
                mb: 4.5, 
                color: '#475569', 
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: '480px',
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              {slide.description}
            </Typography>

            <Box 
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              sx={{ display: 'flex', gap: 2 }}
            >
              <Button 
                variant="contained" 
                onClick={() => {
                  const prod = MOCK_PRODUCTS.find(p => p.productID === slide.productTargetId || p.id === slide.productTargetId);
                  const namePart = prod ? formatUrlName(prod.name) : 'produto';
                  setSelectedProductId(slide.productTargetId);
                  navigate(`/produto/${namePart}-${slide.productTargetId}`);
                  window.scrollTo(0, 0);
                }}
                endIcon={<ArrowRight size={16} />}
                sx={{ 
                  px: { xs: 3, sm: 4.5 }, 
                  py: 1.8,
                  borderRadius: '12px', 
                  fontWeight: 800,
                  bgcolor: '#0f172a', 
                  color: '#ffffff',
                  boxShadow: '0 4px 12px 0 rgba(15, 23, 42, 0.15)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontFamily: '"Space Grotesk", sans-serif',
                  '&:hover': {
                    bgcolor: '#2563eb', 
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px 0 rgba(37, 99, 235, 0.3)',
                  }
                }}
              >
                {slide.ctaText}
              </Button>
            </Box>
          </Box>

          <Box 
            sx={{ 
              flex: { xs: '0', md: '0.45' }, 
              position: 'relative', 
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            <Box 
              sx={{
                width: '320px',
                height: '320px',
                bgcolor: 'rgba(255, 255, 255, 0.45)',
                backdropFilter: 'blur(12px)',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                position: 'absolute',
                zIndex: 1,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)'
              }}
            />

            <Box
              sx={{
                width: '240px',
                height: '240px',
                borderRadius: '24px',
                bgcolor: '#ffffff',
                border: '6px solid #ffffff',
                transform: 'rotate(12deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 2,
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'rotate(8deg) scale(1.02)'
                }
              }}
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
        </motion.div>
      </AnimatePresence>

      <IconButton 
        onClick={handlePrev}
        sx={{ 
          position: 'absolute', 
          left: '16px', 
          top: '50%', 
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.75)',
          color: '#0f172a',
          backdropFilter: 'blur(8px)',
          border: '1px solid #e2e8f0',
          zIndex: 4,
          display: { xs: 'none', sm: 'inline-flex' },
          '&:hover': { bgcolor: '#ffffff' }
        }}
      >
        <ChevronLeft size={20} />
      </IconButton>
      
      <IconButton 
        onClick={handleNext}
        sx={{ 
          position: 'absolute', 
          right: '16px', 
          top: '50%', 
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255, 255, 255, 0.75)',
          color: '#0f172a',
          backdropFilter: 'blur(8px)',
          border: '1px solid #e2e8f0',
          zIndex: 4,
          display: { xs: 'none', sm: 'inline-flex' },
          '&:hover': { bgcolor: '#ffffff' }
        }}
      >
        <ChevronRight size={20} />
      </IconButton>

      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: '16px', 
          left: { xs: '50%', sm: '24px' },
          transform: { xs: 'translateX(-50%)', sm: 'none' },
          display: 'flex',
          gap: 1,
          zIndex: 4
        }}
      >
        {slides.map((_, i) => (
          <Box 
            key={i}
            onClick={() => setCurrent(i)}
            sx={{ 
              cursor: 'pointer',
              backgroundColor: i === current ? '#3b82f6' : '#cbd5e1',
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              transition: 'all 0.3s ease-in-out'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
