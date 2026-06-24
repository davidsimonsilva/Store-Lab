import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Rating, 
  LinearProgress, 
  Grid, 
  Avatar, 
  Divider, 
  Button,
  Chip
} from '@mui/material';
import { Check } from 'lucide-react';
import { generateReviewsForProduct, Review } from '../mock/reviewsMock';

interface ProductReviewsProps {
  productId: string | number;
  productCategory: string;
  productRating: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ productId, productCategory, productRating }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(3);

  const allReviews = useMemo(() => {
    return generateReviewsForProduct(productId, productCategory, productRating);
  }, [productId, productCategory, productRating]);

  const ratingCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    allReviews.forEach(r => {
      const ratingKey = Math.min(5, Math.max(1, Math.round(r.rating))) as 5 | 4 | 3 | 2 | 1;
      counts[ratingKey]++;
    });
    return counts;
  }, [allReviews]);

  const filteredReviews = useMemo(() => {
    if (selectedRating === null) return allReviews;
    return allReviews.filter(r => Math.round(r.rating) === selectedRating);
  }, [allReviews, selectedRating]);

  const displayedReviews = useMemo(() => {
    return filteredReviews.slice(0, visibleCount);
  }, [filteredReviews, visibleCount]);

  const handleRatingFilter = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
    setVisibleCount(3);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const totalReviews = allReviews.length;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#ffffff', borderRadius: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
      <Typography 
        variant="h5" 
        sx={{ 
          fontFamily: '"Space Grotesk", sans-serif', 
          fontWeight: 700, 
          color: '#0f172a', 
          mb: 4 
        }}
      >
        Avaliações dos Clientes
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, color: '#0f172a' }}>
              {productRating.toFixed(1)}
            </Typography>
            <Rating value={productRating} precision={0.1} readOnly size="large" sx={{ color: '#fbbf24', my: 1 }} />
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Com base em {totalReviews} avaliações
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {([5, 4, 3, 2, 1] as const).map((stars) => {
              const count = ratingCounts[stars];
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              const isSelected = selectedRating === stars;

              return (
                <Box 
                  key={stars} 
                  onClick={() => handleRatingFilter(stars)}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1.5, 
                    cursor: 'pointer',
                    p: 0.5,
                    borderRadius: 1,
                    transition: 'all 0.2s',
                    bgcolor: isSelected ? '#eff6ff' : 'transparent',
                    '&:hover': {
                      bgcolor: isSelected ? '#eff6ff' : '#f8fafc'
                    }
                  }}
                >
                  <Typography variant="body2" sx={{ width: 75, minWidth: 75, fontWeight: 600, color: '#334155', whiteSpace: 'nowrap' }}>
                    {stars} estrelas
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={percentage} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4, 
                        bgcolor: '#f1f5f9',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: '#fbbf24',
                          borderRadius: 4
                        }
                      }} 
                    />
                  </Box>
                  <Typography variant="body2" sx={{ width: 25, textAlign: 'right', fontWeight: 550, color: '#64748b' }}>
                    {count}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {selectedRating !== null && (
            <Button 
              fullWidth 
              variant="outlined" 
              onClick={() => { setSelectedRating(null); setVisibleCount(3); }}
              sx={{ 
                mt: 2, 
                textTransform: 'none', 
                color: '#2563eb', 
                borderColor: '#e2e8f0',
                '&:hover': { borderColor: '#cbd5e1', bgcolor: '#f8fafc' } 
              }}
            >
              Limpar Filtro ({selectedRating} estrelas)
            </Button>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {displayedReviews.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4, bgcolor: '#f8fafc', borderRadius: 2 }}>
                <Typography variant="body1" sx={{ color: '#64748b' }}>
                  Nenhuma avaliação com {selectedRating} estrelas encontrada.
                </Typography>
              </Box>
            ) : (
              displayedReviews.map((review, idx) => (
                <Box key={review.id}>
                  {idx > 0 && <Divider sx={{ mb: 3 }} />}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#eff6ff', color: '#2563eb', fontWeight: 'bold' }}>
                      {review.userName.charAt(0)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 650, color: '#0f172a' }}>
                            {review.userName}
                          </Typography>
                          {review.verified && (
                            <Chip 
                              icon={<Check size={12} style={{ color: '#10b981' }} />}
                              label="Compra verificada" 
                              size="small" 
                              sx={{ 
                                bgcolor: '#ecfdf5', 
                                color: '#10b981', 
                                fontWeight: 600, 
                                height: 20, 
                                fontSize: '10px',
                                '& .MuiChip-icon': { marginLeft: '4px' }
                              }} 
                            />
                          )}
                        </Box>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                          {review.date}
                        </Typography>
                      </Box>
                      <Rating value={review.rating} readOnly size="small" sx={{ color: '#fbbf24', my: 1 }} />
                      <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>
                        {review.comment}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))
            )}

            {filteredReviews.length > visibleCount && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                  variant="contained" 
                  onClick={handleLoadMore}
                  sx={{ 
                    textTransform: 'none', 
                    bgcolor: '#1e293b', 
                    color: '#ffffff',
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    '&:hover': { bgcolor: '#0f172a' }
                  }}
                >
                  Carregar Mais Avaliações
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
