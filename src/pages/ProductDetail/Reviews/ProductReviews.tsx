import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  Box, 
  Typography, 
  Rating, 
  LinearProgress, 
  Grid, 
  Avatar, 
  Divider, 
  Button,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { Check, Star, MessageSquarePlus, Pencil, Trash2 } from 'lucide-react';
import { Review } from '../../../types';
import { EmptyState } from '../../../components/ui/EmptyState';
import { getProductReviews, calculateReviewStats, deleteProductReview } from '../../../services/reviewService';
import { ProductReviewFormDialog } from './ProductReviewFormDialog';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import {
  productReviewsMainBoxStyle,
  productReviewsHeaderStyle,
  productReviewsTitleStyle,
  productReviewsAddButtonStyle,
  productReviewsScoreBoxStyle,
  productReviewsScoreNumberStyle,
  productReviewsScoreRatingStyle,
  productReviewsRatingBarRowStyle,
  productReviewsRatingBarProgressStyle,
  productReviewsClearFilterButtonStyle,
  productReviewsVerifiedChipStyle,
  productReviewsDeleteActionButtonStyle,
  productReviewsAvatarStyle,
  productReviewsCardBoxStyle,
  productReviewsCommentTextStyle,
  productReviewsLoadMoreButtonStyle,
} from './ProductReviews.styles';

interface ProductReviewsProps {
  productId: string | number;
  productName?: string;
  productCategory: string;
  productRating: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ 
  productId, 
  productName = 'Produto',
  productCategory, 
  productRating 
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleOpenReviewForm = () => {
    if (!user) {
      showToast('Você precisa estar logado para avaliar este produto.', 'warning');
      navigate('/login');
      return;
    }
    setIsFormOpen(true);
  };

  useEffect(() => {
    const loaded = getProductReviews(productId, productCategory, productRating);
    setReviewsList(loaded);
  }, [productId, productCategory, productRating]);

  const userReview = useMemo(() => {
    if (!user?.id) return null;
    return reviewsList.find((r) => r.userId === user.id) || null;
  }, [reviewsList, user?.id]);

  const stats = useMemo(() => {
    return calculateReviewStats(reviewsList);
  }, [reviewsList]);

  const filteredReviews = useMemo(() => {
    if (selectedRating === null) return reviewsList;
    return reviewsList.filter((r) => Math.round(r.rating) === selectedRating);
  }, [reviewsList, selectedRating]);

  const displayedReviews = useMemo(() => {
    return filteredReviews.slice(0, visibleCount);
  }, [filteredReviews, visibleCount]);

  const handleRatingFilter = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
    setVisibleCount(4);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleReviewSubmitted = (savedReview: Review) => {
    setReviewsList((prev) => {
      const existsIndex = prev.findIndex(
        (r) => r.id === savedReview.id || (savedReview.userId && r.userId === savedReview.userId)
      );
      if (existsIndex !== -1) {
        const updated = [...prev];
        updated[existsIndex] = savedReview;
        return updated;
      }
      return [savedReview, ...prev];
    });
    setSelectedRating(null);
    setVisibleCount(4);
  };

  const handleDeleteUserReview = (reviewId: string) => {
    const success = deleteProductReview(productId, reviewId);
    if (success) {
      setReviewsList((prev) => prev.filter((r) => r.id !== reviewId));
      showToast('Sua avaliação foi removida com sucesso.', 'info');
    }
  };

  return (
    <Box sx={productReviewsMainBoxStyle}>

      <Box sx={productReviewsHeaderStyle}>
        <Box>
          <Typography variant="h5" sx={productReviewsTitleStyle}>
            Avaliações dos Clientes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Opiniões reais de quem já comprou e testou este produto.
          </Typography>
        </Box>

        <Button
          variant={userReview ? 'outlined' : 'contained'}
          startIcon={userReview ? <Pencil size={18} /> : <MessageSquarePlus size={18} />}
          onClick={handleOpenReviewForm}
          sx={productReviewsAddButtonStyle}
        >
          {userReview ? 'Editar Sua Avaliação' : 'Avaliar Produto'}
        </Button>
      </Box>

      <Grid container spacing={4}>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={productReviewsScoreBoxStyle}>
            <Typography variant="h2" sx={productReviewsScoreNumberStyle}>
              {stats.averageRating.toFixed(1)}
            </Typography>
            <Rating
              value={stats.averageRating}
              precision={0.1}
              readOnly
              size="large"
              sx={productReviewsScoreRatingStyle}
            />
            <Typography variant="body2" color="text.secondary">
              Com base em {stats.totalReviews} {stats.totalReviews === 1 ? 'avaliação' : 'avaliações'}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {([5, 4, 3, 2, 1] as const).map((stars) => {
              const count = stats.counts[stars] || 0;
              const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
              const isSelected = selectedRating === stars;

              return (
                <Box
                  key={stars}
                  onClick={() => handleRatingFilter(stars)}
                  sx={productReviewsRatingBarRowStyle(isSelected)}
                  title={`Filtrar por ${stars} estrelas`}
                >
                  <Typography
                    variant="body2"
                    sx={{ width: 75, minWidth: 75, fontWeight: 600, color: 'text.primary', whiteSpace: 'nowrap' }}
                  >
                    {stars} estrelas
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={productReviewsRatingBarProgressStyle}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ width: 25, textAlign: 'right', fontWeight: 600, color: 'text.secondary' }}
                  >
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
              onClick={() => {
                setSelectedRating(null);
                setVisibleCount(4);
              }}
              sx={productReviewsClearFilterButtonStyle}
            >
              Limpar Filtro ({selectedRating} {selectedRating === 1 ? 'estrela' : 'estrelas'})
            </Button>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {displayedReviews.length === 0 ? (
              <EmptyState
                icon={<Star size={32} />}
                title="Sem avaliações neste filtro"
                description={`Nenhuma avaliação com ${selectedRating} estrelas encontrada para este produto.`}
                actionText="Limpar Filtro"
                onAction={() => {
                  setSelectedRating(null);
                  setVisibleCount(4);
                }}
              />
            ) : (
              displayedReviews.map((review, idx) => (
                <Box key={review.id}>
                  {idx > 0 && <Divider sx={{ mb: 3 }} />}
                  <Box sx={productReviewsCardBoxStyle}>
                    <Avatar
                      src={review.userAvatar}
                      alt={review.userName}
                      sx={productReviewsAvatarStyle}
                    >
                      {review.userName.charAt(0).toUpperCase()}
                    </Avatar>

                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                            {review.userName}
                          </Typography>
                          {review.verified && (
                            <Chip
                              icon={<Check size={12} style={{ color: '#10b981' }} />}
                              label="Compra verificada"
                              size="small"
                              sx={productReviewsVerifiedChipStyle}
                            />
                          )}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {review.date}{review.edited ? ' (editado)' : ''}
                          </Typography>

                          {user?.id && review.userId === user.id && (
                            <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                              <Tooltip title="Excluir sua avaliação">
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteUserReview(review.id)}
                                  sx={productReviewsDeleteActionButtonStyle}
                                >
                                  <Trash2 size={15} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          )}
                        </Box>
                      </Box>

                      <Rating
                        value={review.rating}
                        readOnly
                        size="small"
                        sx={{ color: '#f59e0b', my: 0.75 }}
                      />

                      <Typography variant="body2" sx={productReviewsCommentTextStyle}>
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
                  sx={productReviewsLoadMoreButtonStyle}
                >
                  Carregar Mais Avaliações
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      <ProductReviewFormDialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        productId={productId}
        productName={productName}
        initialReview={userReview}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </Box>
  );
};
