import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Chip,
  useTheme,
  useMediaQuery,
  Card
} from '@mui/material';
import { 
  Plus, 
  FilterX, 
  Sparkles,
  LayoutGrid, 
  Tv, 
  Pocket, 
  Smile, 
  Briefcase 
} from 'lucide-react';
import { useGlobalState } from '../context/GlobalStateContext';
import { MOCK_PRODUCTS } from '../mock/products';
import { BannerRotativo } from '../components/BannerRotativo';
import { ProductCard } from '../components/ProductCard';

export const HomeView: React.FC = () => {
  const { searchQuery, setSearchQuery } = useGlobalState();
  const theme = useTheme();
  
  const isMobile = useMediaQuery('(max-width:600px)');
  
  const [mobileLimit, setMobileLimit] = useState<number>(10);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const categories = [
    { id: 'all', label: 'Tudo', icon: <LayoutGrid size={16} /> },
    { id: 'Eletrônicos / Mobile', label: 'Eletrônicos', icon: <Tv size={16} /> },
    { id: 'Móveis / Office', label: 'Escritório', icon: <Briefcase size={16} /> },
    { id: 'Vestuário / Moda Esportiva', label: 'Moda Esportiva', icon: <Pocket size={16} /> },
    { id: 'Cuidados Pessoais / Beleza', label: 'Cuidados & Beleza', icon: <Smile size={16} /> }
  ];

  useEffect(() => {
    setMobileLimit(10);
  }, [searchQuery, selectedCategory]);

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedProducts = (isMobile && filteredProducts.length > mobileLimit)
    ? filteredProducts.slice(0, mobileLimit)
    : filteredProducts;

  const handleShowMore = () => {
    setMobileLimit((prev) => prev + 10);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 3, pb: 8 }}>
      <BannerRotativo />

      <Box sx={{ mb: 5 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontFamily: '"Space Grotesk", sans-serif', 
            fontWeight: 700, 
            color: 'text.primary',
            mb: 2.5,
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Sparkles size={20} color={theme.palette.primary.main} />
          <span>Nossos Ambientes Científicos</span>
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: { xs: 1, sm: 1.5 }, 
            width: '100%',
          }}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <Chip
                key={cat.id}
                icon={cat.icon}
                label={cat.label}
                onClick={() => setSelectedCategory(cat.id)}
                color={isActive ? 'primary' : 'default'}
                variant={isActive ? 'filled' : 'outlined'}
                sx={{
                  flexShrink: 0,
                  px: 1,
                  py: 2.2,
                  borderRadius: '12px', 
                  fontWeight: 650,
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: isActive ? 'none' : '1px solid',
                  borderColor: 'divider',
                  bgcolor: isActive ? 'primary.main' : 'background.paper', 
                  color: isActive ? 'primary.contrastText' : 'text.secondary',
                  '& .MuiChip-icon': {
                    color: isActive ? 'primary.contrastText' : 'text.secondary'
                  },
                  '&:hover': {
                    bgcolor: isActive ? 'primary.dark' : 'action.hover',
                    transform: 'translateY(-1px)'
                  }
                }}
              />
            );
          })}
        </Box>
      </Box>

      <Box id="grid-container" sx={{ scrollMarginTop: '100px' }}>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontFamily: '"Space Grotesk", sans-serif', 
              fontWeight: 800, 
              color: 'text.primary',
              letterSpacing: '-0.03em'
            }}
          >
            {searchQuery ? 'Resultados da Pesquisa' : 'Catálogo Disponível'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Exibindo <strong>{displayedProducts.length}</strong> de <strong>{filteredProducts.length}</strong> formulações premium
          </Typography>
        </Box>

        {filteredProducts.length === 0 ? (
          <Card 
            sx={{ 
              p: 6, 
              textAlign: 'center', 
              bgcolor: 'background.paper', 
              borderRadius: '16px', 
              border: '1px dashed',
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'none'
            }}
          >
            <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: '50px', mb: 2, color: 'error.main' }}>
              <FilterX size={36} />
            </Box>
            <Typography variant="h6" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: 'text.primary', mb: 1 }}>
              Nenhum componente encontrado
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: '420px', mb: 3 }}>
              Não conseguimos localizar produtos correspondentes a "{searchQuery || selectedCategory}". Tente reformular seu termo de busca ou limpar filtros.
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleClearFilters}
              sx={{ px: 3, py: 1, borderRadius: '30px' }}
            >
              Limpar Filtros de Busca
            </Button>
          </Card>
        ) : (
          <>
            <Grid container spacing={3}>
              {displayedProducts.map((product) => (
                <Grid 
                  key={product.id} 
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }} 
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>

            {isMobile && filteredProducts.length > mobileLimit && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  mt: 5,
                  p: 3,
                  bgcolor: 'action.hover',
                  borderRadius: '16px',
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700, mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Restam {filteredProducts.length - mobileLimit} produtos
                </Typography>
                <Button
                  id="mobile-show-more-button"
                  variant="contained"
                  color="primary"
                  onClick={handleShowMore}
                  startIcon={<Plus size={16} />}
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    fontFamily: '"Space Grotesk", sans-serif',
                    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)'
                  }}
                >
                  Mostrar Mais Produtos
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};
