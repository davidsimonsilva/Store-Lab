import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  Box, 
  Grid, 
  Typography, 
  Button, 
  IconButton,
  Rating, 
  Divider, 
  Breadcrumbs,
  Link,
  Tooltip,
  Badge,
  Card,
  TextField
} from '@mui/material';
import { 
  Share2, 
  Minus, 
  Plus, 
  ArrowLeft, 
  Check, 
  ShoppingCart,
  Info
} from 'lucide-react';
import { productQuantitySchema } from '../../schemas/commonSchemas';
import { TOOLTIP_MAX_LIMIT_MESSAGE, MAX_PRODUCT_PURCHASE_LIMIT } from '../../services/productQuotaService';
import { useUIState, formatUrlName } from '../../context/UIStateContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { MOCK_PRODUCTS, getProductFallbackImage } from '../../mocks/products';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Product } from '../../types';
import { ProductReviews } from './Reviews/ProductReviews';
import { ProductGallery } from './components/ProductGallery';
import { ProductFreightCalculator } from './components/ProductFreightCalculator';
import { ProductSpecsCards } from './components/ProductSpecsCards';
import { NotFoundPage } from '../NotFound/NotFoundPage';
import { formatCurrencyBRL } from '../../utils/formatters';
import { calculatePixPrice } from '../../utils/pricing';
import { BUSINESS_CONSTANTS } from '../../constants';
import { PageContainer } from '../../components/ui/PageContainer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import {
  productDetailCardStyle,
  purchaseLimitBadgeStyle,
  productActionButtonsContainerStyle,
  productBuyButtonStyle,
  productCartIconButtonStyle,
  productCartBadgeStyle,
} from './ProductDetail.styles';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { selectedProductId, setSelectedProductId } = useUIState();
  const { addToCart, cartItems: cart } = useCart();
  const { user, anonymousUserId } = useAuth();

  const productID = useMemo(() => {
    if (!slug) return undefined;

    const cleanMatch = MOCK_PRODUCTS.find(p => {
      const formatted = formatUrlName(p.name);
      return formatted === slug || formatted.replace(/-/g, '') === slug.replace(/-/g, '');
    });
    if (cleanMatch) return cleanMatch.productID || cleanMatch.id;

    const directMatch = MOCK_PRODUCTS.find(p => p.productID === slug || p.id === slug || String(p.id) === slug);
    if (directMatch) return directMatch.productID || directMatch.id;

    const lastHyphen = slug.lastIndexOf('-');
    if (lastHyphen !== -1) {
      const candidate = slug.substring(lastHyphen + 1);
      const match = MOCK_PRODUCTS.find(p => p.productID === candidate || p.id === candidate || String(p.id) === candidate);
      if (match) return match.productID || match.id;
    }

    const anyMatch = MOCK_PRODUCTS.find(p => slug.includes(p.productID) || slug.includes(p.id));
    return anyMatch ? (anyMatch.productID || anyMatch.id) : undefined;
  }, [slug]);

  const resolvedProductId = productID || (slug ? undefined : selectedProductId);
  const product = useMemo(() => {
    if (!resolvedProductId) return null;
    return (
      MOCK_PRODUCTS.find(
        p =>
          p.productID === resolvedProductId ||
          p.id === resolvedProductId ||
          String(p.id) === String(resolvedProductId)
      ) || null
    );
  }, [resolvedProductId]);

  useDocumentTitle(
    product
      ? {
          title: product.name,
          description: `${product.name} na StoreLab. ${product.category ? `Categoria: ${product.category}. ` : ''}Por apenas ${formatCurrencyBRL(product.price)} com entrega rápida e garantia.`,
          ogTitle: product.name,
          ogDescription: `Compre ${product.name} por ${formatCurrencyBRL(product.price)} na StoreLab. Pagamento facilitado em até 10x e frete expresso.`,
          ogImage: product.image || getProductFallbackImage(product.productID || product.id, product.category),
          ogType: 'product',
        }
      : 'Produto não encontrado'
  );

  const currentUserId = user?.isLoggedIn ? user.id : anonymousUserId;
  const cartItem = product
    ? cart?.find(item => 
        (item.productId === product.productID || item.productId === product.id || item.product?.id === product.id || item.product?.productID === product.productID) && 
        (item.userId === currentUserId || !item.userId)
      )
    : undefined;
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    if (productID && productID !== selectedProductId) {
      if (typeof setSelectedProductId === 'function') {
        setSelectedProductId(productID);
      }
    }
  }, [productID, selectedProductId, setSelectedProductId]);

  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState(false);

  const handleQuantityChange = (val: number | string) => {
    const parsed = Number(val);
    if (isNaN(parsed) || parsed < 1) {
      setQuantity(1);
      setQuantityError('Quantidade mínima é 1 unidade');
      return;
    }
    if (parsed > MAX_PRODUCT_PURCHASE_LIMIT) {
      setQuantity(MAX_PRODUCT_PURCHASE_LIMIT);
      setQuantityError(`Quantidade máxima permitida é de ${MAX_PRODUCT_PURCHASE_LIMIT} unidades por produto`);
      return;
    }
    try {
      productQuantitySchema.validateSync(parsed);
      setQuantity(parsed);
      setQuantityError(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Quantidade inválida';
      setQuantityError(msg);
    }
  };

  const handleShareClick = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          setShareCopied(true);
          setTimeout(() => setShareCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Could not copy page URL:", err);
        });
    }
  };

  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product?.id, product?.productID, slug]);

  const handleBuy = () => {
    if (!product) return;
    try {
      productQuantitySchema.validateSync(quantity);
      addToCart(product, quantity);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Quantidade inválida';
      setQuantityError(msg);
    }
  };

  const getSubImages = (prod: Product): string[] => {
    const mainImg = getProductFallbackImage(prod.id, prod.category);

    const baseImages: Record<string, string[]> = {
      "Eletrônicos / Mobile": [
        "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?q=80&w=600&auto=format&fit=crop"
      ],
      "Móveis / Office": [
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop"
      ],
      "Vestuário / Moda Esportiva": [
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=600&auto=format&fit=crop"
      ],
      "Cuidados Pessoais / Beleza": [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=600&auto=format&fit=crop"
      ]
    };

    const pool = baseImages[prod.category] || baseImages["Eletrônicos / Mobile"];
    return [mainImg, ...pool];
  };

  const imagesList = product ? getSubImages(product) : [];

  const getBrand = (prod: Product): string => {
    if (prod.name.toLowerCase().includes('samsung')) return 'SAMSUNG VISION';
    if (prod.name.toLowerCase().includes('nexus')) return 'NEXUS PRIME';
    if (prod.name.toLowerCase().includes('minimalist')) return 'ERGODESIGN S.A.';
    if (prod.name.toLowerCase().includes('performance')) return 'PULSEWEAR CO.';
    if (prod.name.toLowerCase().includes('skincare') || prod.name.toLowerCase().includes('sérum')) return 'LAB-BIOTECH';
    if (prod.name.toLowerCase().includes('fone')) return 'ACOUSTIC SOUND';
    if (prod.name.toLowerCase().includes('smartwatch')) return 'AURA HR';
    return 'STORE-LAB';
  };

  const brandName = product ? getBrand(product) : '';
  const totalReviews = 12;

  const scrollReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getProductTags = (p: Product): string[] => {
    return p.category
      .toLowerCase()
      .split(/[\/,]+/)
      .map(tag => tag.trim())
      .filter(Boolean);
  };

  const shuffleArray = <T,>(items: T[]): T[] => {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const relatedList = useMemo(() => {
    if (!product) return [];
    const currentTags = getProductTags(product);

    const matchingByTag = MOCK_PRODUCTS.filter(p => {
      if (p.id === product.id || p.productID === product.productID) return false;

      const pTags = getProductTags(p);
      const sharesTag = currentTags.some(tag => pTags.includes(tag));
      const sharesCategory = p.category.trim().toLowerCase() === product.category.trim().toLowerCase();

      return sharesCategory || sharesTag;
    });

    const shuffledMatches = shuffleArray(matchingByTag);

    if (shuffledMatches.length < 4) {
      const otherProducts = MOCK_PRODUCTS.filter(
        p => p.id !== product.id && p.productID !== product.productID && !shuffledMatches.some(m => m.id === p.id)
      );
      const shuffledOthers = shuffleArray(otherProducts);
      return [...shuffledMatches, ...shuffledOthers].slice(0, 4);
    }

    return shuffledMatches.slice(0, 4);
  }, [product?.id, product?.productID, product?.category]);

  if (!product) {
    return (
      <NotFoundPage
        title="Produto não encontrado"
        message="O produto solicitado não foi encontrado em nosso catálogo ou foi descontinuado."
      />
    );
  }

  const basePrice = product.price;
  const pixPrice = calculatePixPrice(basePrice);
  const freeInstallmentValue = basePrice / BUSINESS_CONSTANTS.FREE_INSTALLMENT_LIMIT;

  return (
    <PageContainer maxWidth="lg" py={4}>

      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link 
          underline="hover" 
          color="inherit" 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigate('/'); }}
          sx={{ display: 'flex', alignItems: 'center', fontSize: '0.85rem', fontWeight: 600, color: '#2563eb' }}
        >
          <ArrowLeft size={14} style={{ marginRight: '6px' }} />
          Voltar para E-Commerce
        </Link>
        <Typography color="inherit" sx={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>
          {product.category.split(' / ')[0]}
        </Typography>
        <Typography color="text.primary" sx={{ fontSize: '0.85rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '280px', whiteSpace: 'nowrap' }}>
          {product.name}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={4} sx={{ mb: 6 }}>

        <Grid size={{ xs: 12, md: 6 }}>
          <ProductGallery imagesList={imagesList} productName={product.name} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card 
            elevation={0}
            sx={productDetailCardStyle}
          >

            <Typography variant="caption" sx={{ color: '#2563eb', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.5, fontSize: '0.75rem' }}>
              {brandName}
            </Typography>

            <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', mb: 1.5, fontSize: { xs: '1.5rem', md: '1.85rem' } }}>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              <Rating value={4.9} precision={0.1} readOnly size="small" sx={{ color: '#f59e0b' }} />
              <Typography variant="body2" sx={{ fontWeight: 800, color: '#0f172a', fontSize: '0.85rem' }}>
                4.9
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                Vendido por <strong style={{ color: '#0f172a' }}>Store-lab</strong>
              </Typography>
              <Typography 
                variant="body2" 
                onClick={scrollReviews}
                sx={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', '&:hover': { textDecoration: 'underline' } }}
              >
                {totalReviews} avaliações
              </Typography>
            </Box>

            <Divider sx={{ my: 2, borderColor: '#f1f5f9' }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#94a3b8', textDecoration: 'line-through', fontSize: '0.85rem', display: 'block', mb: 0.25 }}>
                De {formatCurrencyBRL(basePrice)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                <Typography variant="h3" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, color: '#0f172a', fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
                  {formatCurrencyBRL(pixPrice)}
                </Typography>
                <Box sx={{ bgcolor: '#ecfdf5', color: '#059669', fontWeight: 700, fontSize: '0.75rem', px: 1.2, py: 0.5, borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                  <strong>no PIX</strong> <span>{BUSINESS_CONSTANTS.PIX_DISCOUNT_PERCENTAGE}% de desconto</span>
                </Box>
              </Box>
              <Typography variant="caption" sx={{ display: 'block', color: '#64748b', fontSize: '0.825rem', mt: 0.5 }}>
                Ou em até {BUSINESS_CONSTANTS.FREE_INSTALLMENT_LIMIT}x de <strong style={{ color: '#0f172a' }}>{formatCurrencyBRL(freeInstallmentValue)}</strong> sem juros no cartão de crédito.
              </Typography>
            </Box>

            <Divider sx={{ my: 2, borderColor: '#f1f5f9' }} />

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.7rem' }}>
                  QUANTIDADE
                </Typography>
                <Box sx={purchaseLimitBadgeStyle}>
                  <Info size={13} />
                  <span>Limite de {MAX_PRODUCT_PURCHASE_LIMIT} un./pedido</span>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '12px', bgcolor: '#f8fafc', px: 0.5, py: 0.25 }}>
                  <IconButton aria-label="Diminuir quantidade" onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1} size="small" sx={{ color: '#475569' }}>
                    <Minus size={14} />
                  </IconButton>
                  <TextField
                    size="small"
                    variant="standard"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    slotProps={{
                      input: {
                        disableUnderline: true,
                        sx: {
                          width: '40px',
                          '& input': {
                            textAlign: 'center',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            color: '#0f172a',
                            p: 0.5,
                          }
                        }
                      },
                      htmlInput: {
                        min: 1,
                        max: MAX_PRODUCT_PURCHASE_LIMIT,
                        'aria-label': 'Quantidade do produto'
                      }
                    }}
                  />
                  <Tooltip title={quantity >= MAX_PRODUCT_PURCHASE_LIMIT ? TOOLTIP_MAX_LIMIT_MESSAGE : ''}>
                    <span>
                      <IconButton
                        aria-label="Aumentar quantidade"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= MAX_PRODUCT_PURCHASE_LIMIT}
                        size="small"
                        sx={{
                          color: '#475569',
                          '&.Mui-disabled': { color: '#cbd5e1' },
                        }}
                      >
                        <Plus size={14} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
                {quantityError && (
                  <Typography variant="caption" sx={{ color: '#ef4444', width: '100%', mt: 0.5, display: 'block' }}>
                    {quantityError}
                  </Typography>
                )}

                <Tooltip title="Compartilhar Produto">
                  <IconButton
                    aria-label="Compartilhar produto"
                    onClick={handleShareClick}
                    sx={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      p: 1.2,
                      color: shareCopied ? '#16a34a' : '#64748b',
                      '&:hover': { bgcolor: '#f8fafc' }
                    }}
                  >
                    {shareCopied ? <Check size={18} /> : <Share2 size={18} />}
                  </IconButton>
                </Tooltip>
              </Box>

              <Box sx={productActionButtonsContainerStyle}>
                <Button
                  variant="contained"
                  onClick={handleBuy}
                  sx={productBuyButtonStyle}
                >
                  Comprar
                </Button>

                <Tooltip title="Ir para o carrinho">
                  <IconButton
                    aria-label="Ir para o carrinho"
                    onClick={() => navigate('/carrinho')}
                    sx={productCartIconButtonStyle}
                  >
                    <Badge badgeContent={quantityInCart} color="primary" sx={productCartBadgeStyle}>
                      <ShoppingCart size={20} />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Divider sx={{ my: 2, borderColor: '#f1f5f9' }} />

            <ProductFreightCalculator />
          </Card>
        </Grid>
      </Grid>

      <ProductSpecsCards product={product} />

      <Box ref={reviewsRef} sx={{ mb: 6 }}>
        <ProductReviews 
          productId={product.id} 
          productName={product.name}
          productCategory={product.category} 
          productRating={product.rating || 4.9} 
        />
      </Box>

      <Box>
        <Typography variant="h5" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, mb: 3, color: '#0f172a' }}>
          Quem comprou este item também levou
        </Typography>

        <Grid container spacing={3}>
          {relatedList.map((relProduct) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={relProduct.id}>
              <ProductCard product={relProduct} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default ProductDetailPage;
