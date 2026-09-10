import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Chip,
  useTheme
} from '@mui/material';
import { 
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
import { BannerRotativo } from './Banner/BannerRotativo';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductCardSkeleton } from './Skeleton/ProductCardSkeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';
import { PageContainer } from '../../components/ui/PageContainer';
import { productMatchesSearch } from '../../utils/searchUtils';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import {
  categoryHeadingStyle,
  categoryContainerStyle,
  gridTitleStyle,
} from './Home.styles';

export const HomePage: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useUIState();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useDocumentTitle({
    title: 'Store-lab',
    description: 'Descubra produtos inovadores, tecnologia de ponta e equipamentos premium com frete grátis e entrega rápida na StoreLab.',
    ogTitle: 'Store-lab',
    ogDescription: 'Descubra produtos inovadores e tecnologia de ponta com as melhores condições e entrega rápida.',
    ogType: 'website',
  });

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
            Exibindo <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'produto selecionado' : 'produtos selecionados'}
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
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid 
                key={product.id} 
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }} 
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </PageContainer>
  );
};

export default HomePage;
