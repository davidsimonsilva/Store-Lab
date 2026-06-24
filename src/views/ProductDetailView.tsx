import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  IconButton,
  Rating, 
  Divider, 
  Paper,
  Breadcrumbs,
  Link,
  Alert,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  Heart, 
  Share2, 
  Search, 
  Minus, 
  Plus, 
  ArrowLeft, 
  Check, 
  ShoppingCart,
  Maximize2
} from 'lucide-react';
import { useGlobalState } from '../context/GlobalStateContext';
import { MOCK_PRODUCTS, getProductFallbackImage } from '../mock/products';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { TechnicalSpecs } from '../components/TechnicalSpecs';
import { ShippingCalculator } from '../components/ShippingCalculator';
import { ProductReviews } from '../components/ProductReviews';
import { button } from '../utils/buttonStyles';

export const ProductDetailView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { 
    selectedProductId, 
    setSelectedProductId,
    addToCart,
    cart,
    user,
    anonymousUserId
  } = useGlobalState();

  const productID = slug 
    ? (slug.includes('-') ? slug.substring(slug.lastIndexOf('-') + 1) : slug)
    : undefined;

  const resolvedProductId = productID || selectedProductId || MOCK_PRODUCTS[0].productID || MOCK_PRODUCTS[0].id;
  const product = MOCK_PRODUCTS.find(p => p.productID === resolvedProductId || p.id === resolvedProductId) || MOCK_PRODUCTS[0];

  const currentUserId = user?.isLoggedIn ? user.id : anonymousUserId;
  const cartItem = cart?.find(item => (item.productId === product.productID || item.productId === product.id) && item.userId === currentUserId);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    if (productID && productID !== selectedProductId) {
      if (typeof setSelectedProductId === 'function') {
        setSelectedProductId(productID);
      }
    }
  }, [productID, selectedProductId, setSelectedProductId]);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [showSplitButtons, setShowSplitButtons] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

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
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveImageIdx(0);
    setIsZoomed(false);
    setZoomPos({ x: 50, y: 50 });
    setShowSplitButtons(false);
    setQuantity(1);
  }, [selectedProductId]);

  useEffect(() => {
    if (!isZoomed) {
      setZoomPos({ x: 50, y: 50 });
    }
  }, [isZoomed]);

  const handleBuy = () => {
    addToCart(product.productID, quantity);
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

  const imagesList = getSubImages(product);

  const getBrand = (prod: Product): string => {
    if (prod.name.toLowerCase().includes('samsung')) return 'Samsung Vision';
    if (prod.name.toLowerCase().includes('nexus')) return 'Nexus Prime';
    if (prod.name.toLowerCase().includes('minimalist')) return 'ErgoDesign S.A.';
    if (prod.name.toLowerCase().includes('performance')) return 'PulseWear Co.';
    if (prod.name.toLowerCase().includes('skincare') || prod.name.toLowerCase().includes('sérum')) return 'Lab-Biotech';
    if (prod.name.toLowerCase().includes('fone')) return 'Acoustic Sound';
    if (prod.name.toLowerCase().includes('smartwatch')) return 'Aura HR';
    if (prod.name.toLowerCase().includes('stojo')) return 'Stojo Organizers';
    if (prod.name.toLowerCase().includes('cadeira')) return 'Biomecanic Lab';
    if (prod.name.toLowerCase().includes('luminária')) return 'LuxArc Minimal';
    if (prod.name.toLowerCase().includes('garrafa')) return 'FlaskInox';
    if (prod.name.toLowerCase().includes('tênis')) return 'AeroPulse Sports';
    if (prod.name.toLowerCase().includes('vela')) return 'Zen Lab';
    if (prod.name.toLowerCase().includes('teclado')) return 'Tactile Lab Pro';
    if (prod.name.toLowerCase().includes('suporte')) return 'Vesa Arm Corp';
    if (prod.name.toLowerCase().includes('mesa')) return 'Tapered Nordic';
    return 'Store-lab Premium';
  };

  const brandName = getBrand(product);
  const numericId = typeof product.id === 'number' ? product.id : product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const totalReviews = (numericId * 11 + 5) % 40 + 3;

  const scrollReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getRelatedProducts = (): Product[] => {
    const list = MOCK_PRODUCTS.filter(p => p.id !== product.id);
    list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return list.slice(0, 4);
  };

  const relatedList = getRelatedProducts();

  return (
    <Box sx={{ py: 4, bgcolor: '#f8fafc' }}>
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link 
            underline="hover" 
            color="inherit" 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigate('/'); }}
            sx={{ display: 'flex', alignItems: 'center', fontSize: '0.825rem', fontWeight: 550 }}
          >
            <ArrowLeft size={14} style={{ marginRight: '4px' }} />
            Voltar para E-Commerce
          </Link>
          <Typography color="inherit" sx={{ fontSize: '0.825rem', fontWeight: 550 }}>
            {product.category.split(' / ')[0]}
          </Typography>
          <Typography color="text.primary" sx={{ fontSize: '0.825rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '280px', whiteSpace: 'nowrap' }}>
            {product.name}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: { xs: '320px', sm: '420px', md: '480px' }, 
                  bgcolor: '#ffffff', 
                  borderRadius: '24px', 
                  border: '1px solid #e2e8f0', 
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)'
                }}
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={(e) => {
                  if (!isZoomed) return;
                  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                  const rawX = ((e.clientX - left) / width) * 100;
                  const rawY = ((e.clientY - top) / height) * 100;
                  setZoomPos({
                    x: Math.max(0, Math.min(100, rawX)),
                    y: Math.max(0, Math.min(100, rawY))
                  });
                }}
              >
                <img 
                  src={imagesList[activeImageIdx]} 
                  alt={product.name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transition: isZoomed ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.3s ease',
                  }}
                  referrerPolicy="no-referrer"
                />

                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    right: 16, 
                    bgcolor: 'rgba(255, 255, 255, 0.85)', 
                    backdropFilter: 'blur(8px)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    p: 1.2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    zIndex: 2,
                    pointerEvents: 'none'
                  }}
                >
                  {isZoomed ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Maximize2 size={16} color="#334155" />
                      <Typography variant="caption" sx={{ color: '#0f172a', fontWeight: 700 }}>Remover Zoom</Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Search size={16} color="#334155" />
                      <Typography variant="caption" sx={{ color: '#0f172a', fontWeight: 700 }}>Zoom na Imagem</Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box 
                sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: 1.5, 
                  py: 1,
                  width: '100%',
                }}
              >
                {imagesList.map((img, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    sx={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '12px',
                      border: idx === activeImageIdx ? '2.5px solid #2563eb' : '1px solid #cbd5e1',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      flexShrink: 0,
                      transform: idx === activeImageIdx ? 'scale(1.05)' : 'none',
                      '&:hover': {
                        borderColor: '#2563eb'
                      }
                    }}
                  >
                    <img 
                      src={img} 
                      alt={`Thumb ${idx}`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      referrerPolicy="no-referrer"
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 3, sm: 4 }, 
                borderRadius: '24px', 
                border: '1px solid #e2e8f0',
                bgcolor: '#ffffff',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 20px -10px rgba(15, 23, 42, 0.05)'
              }}
            >
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  color: '#2563eb', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  fontFamily: '"Space Grotesk", sans-serif',
                  mb: 1
                }}
              >
                {brandName}
              </Typography>

              <Typography 
                variant="h4" 
                component="h1"
                sx={{ 
                  fontFamily: '"Space Grotesk", sans-serif', 
                  fontWeight: 800, 
                  letterSpacing: '-0.03em', 
                  color: '#0f172a',
                  lineHeight: 1.25,
                  mb: 1.5
                }}
              >
                {product.name}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Rating value={product.rating || 4.5} precision={0.1} readOnly size="small" sx={{ color: '#fbbf24' }} />
                  <Typography variant="body2" sx={{ color: '#0f172a', fontWeight: 700, fontSize: '0.875rem' }}>
                    {product.rating || 4.5}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ height: '16px', my: 'auto' }} />
                
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                  Vendido por <span style={{ fontWeight: 'bold', color: '#1e293b' }}>Store-lab</span>
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ height: '16px', my: 'auto' }} />

                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Link 
                    component="button" 
                    onClick={scrollReviews} 
                    sx={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 650, 
                      color: '#2563eb', 
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' } 
                    }}
                  >
                    {totalReviews} avaliações
                  </Link>
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ mb: 4 }}>
                <Typography variant="caption" sx={{ color: '#94a3b8', textDecoration: 'line-through', display: 'block', mb: 0.5, fontSize: '0.8rem' }}>
                  De {(product.price * 1.15).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: 1 }}>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontFamily: '"Space Grotesk", sans-serif', 
                      fontWeight: 800, 
                      color: '#0f172a', 
                      letterSpacing: '-0.04em' 
                    }}
                  >
                    {(product.price * 0.9).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700, 
                      color: '#16a34a', 
                      fontSize: '1rem',
                      fontFamily: '"Space Grotesk", sans-serif'
                    }}
                  >
                    no PIX <Box component="span" sx={{ bgcolor: '#ecfdf5', color: '#047857', px: '6px', py: '2px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 900 }}>10% de desconto</Box>
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ color: '#475569', mt: 1, fontWeight: 500 }}>
                  Ou em até 12x de <span style={{ fontWeight: 800, color: '#1e293b' }}>{(product.price / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span> sem juros no cartão de crédito.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="caption" sx={{ textTransform: 'uppercase', color: '#94a3b8', fontWeight: 800, letterSpacing: '0.05em' }}>
                    Quantidade
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      bgcolor: '#f1f5f9', 
                      borderRadius: '12px', 
                      p: 0.5,
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <IconButton 
                      size="small" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      sx={{ bgcolor: '#ffffff', '&:hover': { bgcolor: '#e2e8f0' }, p: 0.75 }}
                    >
                      <Minus size={14} />
                    </IconButton>
                    <Typography sx={{ px: 2, fontWeight: 800, fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.95rem', minWidth: '24px', textAlign: 'center' }}>
                      {quantity}
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => setQuantity(quantity + 1)}
                      sx={{ bgcolor: '#ffffff', '&:hover': { bgcolor: '#e2e8f0' }, p: 0.75 }}
                    >
                      <Plus size={14} />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, alignSelf: 'flex-end', height: '46px', ml: 'auto' }}>
                  {!(process.env.NEXT_PUBLIC_HIDE_WISHLIST === 'true') && (
                    <IconButton 
                      onClick={() => setWishlist(!wishlist)}
                      sx={{ 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '12px', 
                        color: wishlist ? '#ef4444' : '#64748b', 
                        bgcolor: wishlist ? '#fef2f2' : 'transparent',
                        px: 2,
                        '&:hover': { bgcolor: wishlist ? '#fcd3d3' : '#f1f5f9' }
                      }}
                    >
                      <Heart size={18} fill={wishlist ? '#ef4444' : 'none'} />
                    </IconButton>
                  )}
                  
                  <Tooltip title={shareCopied ? "Link copiado!" : "Copiar link do produto"} open={shareCopied || undefined} arrow>
                    <IconButton 
                      onClick={handleShareClick}
                      sx={{ 
                        border: '1px solid #e2e8f0', 
                        borderRadius: '12px', 
                        color: shareCopied ? '#2563eb' : '#64748b', 
                        bgcolor: shareCopied ? '#eff6ff' : 'transparent',
                        px: 2,
                        '&:hover': { bgcolor: '#f1f5f9' }
                      }}
                    >
                      <Share2 size={18} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {quantityInCart > 0 ? (
                <Box sx={{ display: 'flex', gap: 1.5, mb: 4, width: '100%', alignItems: 'center' }}>
                  <button 
                    type="button"
                    onClick={handleBuy}
                    className="btn-buy-now"
                    style={{ flex: 3, marginTop: 0 }}
                  >
                    <ShoppingCart size={20} />
                    Comprar
                  </button>

                  <Button
                    onClick={() => {
                      const uid = user?.isLoggedIn ? user.id : anonymousUserId;
                      navigate(`/carrinho/${uid}`);
                    }}
                    sx={{
                      flex: 1,
                      height: '56px',
                      borderRadius: '16px',
                      border: '1.5px solid #cbd5e1',
                      backgroundColor: '#f8fafc',
                      color: '#0f172a',
                      transition: 'all 0.2s ease-in-out',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      minWidth: 'auto',
                      '&:hover': {
                        backgroundColor: '#f1f5f9',
                        borderColor: '#94a3b8',
                        transform: 'translateY(-2px)'
                      },
                      '&:active': {
                        transform: 'translateY(0)'
                      }
                    }}
                    title="Ir para o carrinho"
                  >
                    <ShoppingCart size={22} />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-6px',
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        borderRadius: '50%',
                        minWidth: '22px',
                        height: '22px',
                        padding: '0 4px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #ffffff',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
                      }}
                    >
                      {quantityInCart}
                    </Box>
                  </Button>
                </Box>
              ) : (
                <Box sx={{ mb: 4, width: '100%' }}>
                  <button 
                    type="button"
                    onClick={handleBuy}
                    className="btn-buy-now"
                  >
                    <ShoppingCart size={20} />
                    Comprar
                  </button>
                </Box>
              )}

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ mb: 2 }}>
                <ShippingCalculator />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box ref={detailsRef} sx={{ mb: 6 }}>
          <TechnicalSpecs product={product} />
        </Box>

        <Box ref={reviewsRef} sx={{ mb: 6 }}>
          <ProductReviews 
            productId={product.id} 
            productCategory={product.category} 
            productRating={product.rating || 4.5} 
          />
        </Box>

        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontFamily: '"Space Grotesk", sans-serif', 
              fontWeight: 800, 
              color: '#0f172a', 
              letterSpacing: '-0.03em', 
              mb: 3 
            }}
          >
            Produtos Relacionados
          </Typography>

          <Grid container spacing={3}>
            {relatedList.map((relProduct) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={relProduct.id}>
                <ProductCard product={relProduct} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
