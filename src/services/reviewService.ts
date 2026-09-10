import { Review } from '../types';
import { generateReviewsForProduct } from '../mocks/reviewsMock';
import { getStorageItem, setStorageItem } from './storageService';
import { STORAGE_KEYS } from '../constants';
import { getUserOrders } from './orderService';

const getProductReviewsStorageKey = (productId: string | number): string => {
  return `${STORAGE_KEYS.PRODUCT_REVIEWS_PREFIX}${String(productId)}`;
};

export const checkUserVerifiedPurchase = (productId: string | number, userId?: string): boolean => {
  if (!userId) return false;
  try {
    const orders = getUserOrders(userId);
    const prodIdStr = String(productId);
    return orders.some((order) =>
      order.status !== 'cancelled' &&
      order.items.some((item) => String(item.productId) === prodIdStr || String(item.id) === prodIdStr)
    );
  } catch {
    return false;
  }
};

export const getProductReviews = (
  productId: string | number,
  category: string,
  baseRating: number
): Review[] => {
  const baseMockReviews = generateReviewsForProduct(productId, category, baseRating);
  const userReviews = getStorageItem<Review[]>(getProductReviewsStorageKey(productId), []);

  return [...userReviews, ...baseMockReviews];
};

export const getUserReviewForProduct = (
  productId: string | number,
  userId?: string
): Review | undefined => {
  if (!userId) return undefined;
  const userReviews = getStorageItem<Review[]>(getProductReviewsStorageKey(productId), []);
  return userReviews.find((r) => r.userId === userId);
};

export const addProductReview = (
  productId: string | number,
  data: {
    userId?: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    verified?: boolean;
  }
): Review => {
  const existingUserReviews = getStorageItem<Review[]>(getProductReviewsStorageKey(productId), []);

  if (data.userId) {
    const existingIndex = existingUserReviews.findIndex((r) => r.userId === data.userId);
    if (existingIndex !== -1) {
      const updatedReview: Review = {
        ...existingUserReviews[existingIndex],
        userName: data.userName.trim() || existingUserReviews[existingIndex].userName,
        userAvatar: data.userAvatar ?? existingUserReviews[existingIndex].userAvatar,
        rating: Math.max(1, Math.min(5, data.rating)),
        comment: data.comment.trim(),
        date: new Date().toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        verified: data.verified ?? checkUserVerifiedPurchase(productId, data.userId),
        edited: true,
      };

      existingUserReviews[existingIndex] = updatedReview;
      setStorageItem(getProductReviewsStorageKey(productId), existingUserReviews);
      return updatedReview;
    }
  }

  const newReview: Review = {
    id: `rev_usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    userId: data.userId,
    userName: data.userName.trim() || 'Cliente StoreLab',
    userAvatar: data.userAvatar,
    rating: Math.max(1, Math.min(5, data.rating)),
    date: new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    comment: data.comment.trim(),
    verified: data.verified ?? checkUserVerifiedPurchase(productId, data.userId),
  };

  const updatedReviews = [newReview, ...existingUserReviews];
  setStorageItem(getProductReviewsStorageKey(productId), updatedReviews);

  return newReview;
};

export const updateProductReview = (
  productId: string | number,
  reviewId: string,
  data: {
    rating: number;
    comment: string;
  }
): Review | null => {
  const existingUserReviews = getStorageItem<Review[]>(getProductReviewsStorageKey(productId), []);
  const index = existingUserReviews.findIndex((r) => r.id === reviewId);
  if (index === -1) return null;

  const updatedReview: Review = {
    ...existingUserReviews[index],
    rating: Math.max(1, Math.min(5, data.rating)),
    comment: data.comment.trim(),
    date: new Date().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    edited: true,
  };

  existingUserReviews[index] = updatedReview;
  setStorageItem(getProductReviewsStorageKey(productId), existingUserReviews);
  return updatedReview;
};

export const deleteProductReview = (
  productId: string | number,
  reviewId: string
): boolean => {
  const existingUserReviews = getStorageItem<Review[]>(getProductReviewsStorageKey(productId), []);
  const filtered = existingUserReviews.filter((r) => r.id !== reviewId);
  if (filtered.length === existingUserReviews.length) return false;

  setStorageItem(getProductReviewsStorageKey(productId), filtered);
  return true;
};

export const calculateReviewStats = (reviews: Review[]) => {
  const totalReviews = reviews.length;
  const counts: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  if (totalReviews === 0) {
    return {
      averageRating: 5.0,
      totalReviews: 0,
      counts,
    };
  }

  let ratingSum = 0;
  reviews.forEach((r) => {
    const star = Math.max(1, Math.min(5, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    counts[star] = (counts[star] || 0) + 1;
    ratingSum += r.rating;
  });

  const averageRating = parseFloat((ratingSum / totalReviews).toFixed(1));

  return {
    averageRating,
    totalReviews,
    counts,
  };
};
