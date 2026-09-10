import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Rating,
  TextField,
  Button,
  FormHelperText,
} from '@mui/material';
import { X, CheckCircle, MessageSquare } from 'lucide-react';
import { useFormik } from 'formik';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { reviewSchema } from '../../../schemas/reviewSchema';
import { addProductReview } from '../../../services/reviewService';
import { Review } from '../../../types';
import {
  reviewDialogPaperStyle,
  reviewDialogContentStyle,
  reviewDialogHeaderBoxStyle,
  reviewDialogTitleStyle,
  reviewDialogSubtitleStyle,
  reviewDialogCloseButtonStyle,
  reviewDialogRatingBoxStyle,
  reviewDialogRatingStarsStyle,
  reviewDialogRatingLabelStyle,
  reviewDialogRatingErrorStyle,
  reviewDialogCommentBoxStyle,
  reviewDialogCommentHeaderStyle,
  reviewDialogCommentLabelStyle,
  reviewDialogCommentInputStyle,
  reviewDialogFormColumnStyle,
  reviewDialogActionsBoxStyle,
  reviewDialogCancelButtonStyle,
  reviewDialogSubmitButtonStyle,
} from './ProductReviews.styles';

interface ProductReviewFormDialogProps {
  open: boolean;
  onClose: () => void;
  productId: string | number;
  productName: string;
  initialReview?: Review | null;
  onReviewSubmitted: (review: Review) => void;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Péssimo - Muito insatisfeito',
  2: 'Ruim - Abaixo do esperado',
  3: 'Regular - Atendeu o básico',
  4: 'Muito Bom - Recomendo o produto',
  5: 'Excelente - Superou as expectativas!',
};

export const ProductReviewFormDialog: React.FC<ProductReviewFormDialogProps> = ({
  open,
  onClose,
  productId,
  productName,
  initialReview,
  onReviewSubmitted,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [hoverRating, setHoverRating] = useState<number>(-1);

  const isEditing = Boolean(initialReview);

  useEffect(() => {
    if (open && !user) {
      onClose();
      showToast('Você precisa estar logado para avaliar este produto.', 'warning');
      navigate('/login');
    }
  }, [open, user, onClose, showToast, navigate]);

  const formik = useFormik({
    initialValues: {
      rating: initialReview?.rating || 5,
      userName: initialReview?.userName || user?.name || 'Cliente StoreLab',
      comment: initialReview?.comment || '',
    },
    enableReinitialize: true,
    validationSchema: reviewSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      try {
        const savedReview = addProductReview(productId, {
          userId: user?.id,
          userName: user?.name || values.userName || 'Cliente StoreLab',
          userAvatar: user?.avatarUrl,
          rating: values.rating,
          comment: values.comment,
        });

        showToast(
          isEditing
            ? 'Avaliação atualizada com sucesso!'
            : 'Avaliação publicada com sucesso! Obrigado por sua contribuição.',
          'success'
        );
        onReviewSubmitted(savedReview);
        resetForm();
        onClose();
      } catch (error) {
        console.error('Erro ao enviar avaliação:', error);
        showToast('Não foi possível registrar sua avaliação. Tente novamente.', 'error');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const activeRatingValue = hoverRating > 0 ? hoverRating : (formik.values.rating || 5);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: reviewDialogPaperStyle,
        },
      }}
    >
      <DialogContent sx={reviewDialogContentStyle}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={reviewDialogFormColumnStyle}>

            <Box sx={reviewDialogHeaderBoxStyle}>
              <Box>
                <Typography variant="h6" sx={reviewDialogTitleStyle}>
                  {isEditing ? 'Editar Avaliação' : 'Avaliar Produto'}
                </Typography>
                <Typography variant="caption" sx={reviewDialogSubtitleStyle}>
                  {productName}
                </Typography>
              </Box>
              <IconButton
                aria-label="Fechar formulário de avaliação"
                onClick={onClose}
                size="small"
                sx={reviewDialogCloseButtonStyle}
              >
                <X size={20} />
              </IconButton>
            </Box>

            <Box sx={reviewDialogRatingBoxStyle}>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                Sua nota geral para este produto
              </Typography>
              <Rating
                name="rating"
                value={formik.values.rating || 5}
                precision={1}
                onChange={(_, newValue) => {
                  if (newValue !== null && newValue > 0) {
                    formik.setFieldValue('rating', newValue);
                  }
                }}
                onChangeActive={(_, newHover) => {
                  setHoverRating(newHover);
                }}
                size="large"
                sx={reviewDialogRatingStarsStyle}
              />
              <Typography variant="body2" sx={reviewDialogRatingLabelStyle}>
                {RATING_LABELS[activeRatingValue] || 'Selecione uma nota'}
              </Typography>
              {formik.touched.rating && formik.errors.rating && (
                <FormHelperText error sx={reviewDialogRatingErrorStyle}>
                  {formik.errors.rating}
                </FormHelperText>
              )}
            </Box>

            <Box sx={reviewDialogCommentBoxStyle}>
              <Box sx={reviewDialogCommentHeaderStyle}>
                <Typography variant="body2" sx={reviewDialogCommentLabelStyle}>
                  <MessageSquare size={16} />
                  Sua Opinião Sincera
                </Typography>
              </Box>
              <TextField
                fullWidth
                id="comment"
                name="comment"
                placeholder="Conte o que achou do produto, desempenho, acabamento, pontos positivos e dicas de uso..."
                multiline
                rows={4}
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.comment && Boolean(formik.errors.comment)}
                helperText={
                  formik.touched.comment && formik.errors.comment
                    ? formik.errors.comment
                    : `${formik.values.comment.length}/500 caracteres (mínimo de 10)`
                }
                sx={reviewDialogCommentInputStyle}
              />
            </Box>

            <Box sx={reviewDialogActionsBoxStyle}>
              <Button
                variant="text"
                onClick={onClose}
                disabled={formik.isSubmitting}
                sx={reviewDialogCancelButtonStyle}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting || !formik.isValid}
                startIcon={<CheckCircle size={18} />}
                sx={reviewDialogSubmitButtonStyle}
              >
                {formik.isSubmitting
                  ? 'Salvando...'
                  : isEditing
                  ? 'Salvar Alterações'
                  : 'Publicar Avaliação'}
              </Button>
            </Box>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};
