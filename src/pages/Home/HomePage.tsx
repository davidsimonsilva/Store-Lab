import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Chip,
  useTheme,
  useMediaQuery
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
import { useUIState } from '../../context/UIStateContext';
import { MOCK_PRODUCTS } from '../../mocks/products';
import { BannerRotativo } from './BannerRotativo';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorBoundary } from './ErrorBoundary';
import { PageContainer } from '../../components/ui/PageContainer';
import { productMatchesSearch } from '../../utils/searchUtils';
import {
  categoryHeadingStyle,
  categoryContainerStyle,
  gridTitleStyle,
  showMoreBoxStyle,
  showMoreButtonStyle,
} from './Home.styles';

export const HomePage: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useUIState();
  const theme = useTheme();
  
  const isMobile = useMediaQuery('(max-width:600px)');
  
  const [mobileLimit, setMobileLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Store-lab';
  }, []);

  useEffect(() => {
    setMobileLimit(10);
  }, [searchQuery, selectedCategory]);

  const categories = [
    { id: 'all', label: 'Tudo', icon: <LayoutGrid size={16} /> },
    { id: 'Eletrônicos / Mobile', label: 'Eletrônicos', icon: <Tv size={16} /> },
    { id: 'Móveis / Office', label: 'Escritório', icon: <Briefcase size={16} /> },
    { id: 'Vestuário / Moda Esportiva', label: 'Moda Esportiva', icon: <Pocket size={16} /> },
    { id: 'Cuidados Pessoais / Beleza', label: 'Cuidados & Beleza', icon: <Smile size={16} /> }
  ];

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = productMatchesSearch(product, searchQuery);
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
    <PageContainer maxWidth="lg" py={{ xs: 3, md: 6 }}>
      <ErrorBoundary fallbackTitle="Erro ao carregar o Banner de Destaques">
        <BannerRotativo />
      </ErrorBoundary>

      <Box sx={{ mb: 5 }}>
        <Typography 
          variant="h5" 
          sx={categoryHeadingStyle}
        >
          <Sparkles size={20} color={theme.palette.primary.main} />
          <span>Categorias em Destaque</span>
        </Typography>

        <Box 
          sx={categoryContainerStyle}
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
            sx={gridTitleStyle}
          >
            {searchQuery ? 'Resultados da Pesquisa' : 'Catálogo Disponível'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Exibindo <strong>{displayedProducts.length}</strong> de <strong>{filteredProducts.length}</strong> produtos selecionados
          </Typography>
        </Box>

        {isLoading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCardSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            icon={<FilterX size={36} />}
            title="Nenhum produto encontrado"
            description={`Não conseguimos localizar produtos correspondentes a "${searchQuery || selectedCategory}". Tente reformular seu termo de busca ou limpar filtros.`}
            actionText="Limpar Filtros de Busca"
            onAction={handleClearFilters}
          />
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
                sx={showMoreBoxStyle}
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
                  sx={showMoreButtonStyle}
                >
                  Mostrar Mais Produtos
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </PageContainer>
  );
};

export default HomePage;
