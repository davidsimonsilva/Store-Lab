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
  Card
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
  Truck
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { MOCK_PRODUCTS, getProductFallbackImage } from '../../mocks/products';
import { getBasicDescription, getTechnicalSpecifications } from '../../mocks/specsMock';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Product } from '../../types';
import { ProductReviews } from './ProductReviews';
import { formatCurrencyBRL } from '../../utils/formatters';
import { ProductImage } from '../../components/ui/ProductImage';
import { PageContainer } from '../../components/ui/PageContainer';
import {
  productDetailCardStyle,
  mainImageWrapperStyle,
  specCardStyle,
} from './ProductDetail.styles';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { 
    selectedProductId, 
    setSelectedProductId,
    addToCart,
    cart,
    user,
    anonymousUserId
  } = useAppState();

  const productID = useMemo(() => {
    if (!slug) return undefined;
    // Check direct ID match
    const directMatch = MOCK_PRODUCTS.find(p => p.productID === slug || p.id === slug || String(p.id) === slug);
    if (directMatch) return directMatch.productID || directMatch.id;

    // Check after last hyphen
    const lastHyphen = slug.lastIndexOf('-');
    if (lastHyphen !== -1) {
      const candidate = slug.substring(lastHyphen + 1);
      const match = MOCK_PRODUCTS.find(p => p.productID === candidate || p.id === candidate || String(p.id) === candidate);
      if (match) return match.productID || match.id;
    }

    // Check if slug contains any product's ID
    const anyMatch = MOCK_PRODUCTS.find(p => slug.includes(p.productID) || slug.includes(p.id));
    return anyMatch ? (anyMatch.productID || anyMatch.id) : undefined;
  }, [slug]);

  const resolvedProductId = productID || selectedProductId || MOCK_PRODUCTS[0].productID || MOCK_PRODUCTS[0].id;
  const product = useMemo(() => {
    return MOCK_PRODUCTS.find(p => p.productID === resolvedProductId || p.id === resolvedProductId || String(p.id) === String(resolvedProductId)) || MOCK_PRODUCTS[0];
  }, [resolvedProductId]);

  useEffect(() => {
    document.title = 'Store-lab';
  }, []);

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
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const [cep, setCep] = useState('');
  const [cepCalculated, setCepCalculated] = useState(false);

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
    setActiveImageIdx(0);
    setIsZoomed(false);
    setZoomPos({ x: 50, y: 50 });
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id, product.productID, slug]);

  useEffect(() => {
    if (!isZoomed) {
      setZoomPos({ x: 50, y: 50 });
    }
  }, [isZoomed]);

  const handleBuy = () => {
    addToCart(product.productID || product.id, quantity);
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
    if (prod.name.toLowerCase().includes('samsung')) return 'SAMSUNG VISION';
    if (prod.name.toLowerCase().includes('nexus')) return 'NEXUS PRIME';
    if (prod.name.toLowerCase().includes('minimalist')) return 'ERGODESIGN S.A.';
    if (prod.name.toLowerCase().includes('performance')) return 'PULSEWEAR CO.';
    if (prod.name.toLowerCase().includes('skincare') || prod.name.toLowerCase().includes('sérum')) return 'LAB-BIOTECH';
    if (prod.name.toLowerCase().includes('fone')) return 'ACOUSTIC SOUND';
    if (prod.name.toLowerCase().includes('smartwatch')) return 'AURA HR';
    return 'STORE-LAB';
  };

  const brandName = getBrand(product);
  const totalReviews = 12;

  const scrollReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /**
   * Helper para extrair tags normalizadas de categoria/subcategoria do produto
   */
  const getProductTags = (p: Product): string[] => {
    return p.category
      .toLowerCase()
      .split(/[\/,]+/)
      .map(tag => tag.trim())
      .filter(Boolean);
  };

  /**
   * Algoritmo Fisher-Yates para embaralhamento e ordenação 100% aleatória
   */
  const shuffleArray = <T,>(items: T[]): T[] => {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  /**
   * LÓGICA DE PRODUTOS RELACIONADOS POR TAG & ORDEM ALEATÓRIA:
   * - Filtra apenas produtos que compartilham a mesma categoria ou tags com o produto atual.
   * - Embaralha aleatoriamente todos os produtos encontrados para garantir variedade.
   * - Retorna até 4 itens com seleção e ordem dinâmicas a cada visualização/navegação.
   */
  const relatedList = useMemo(() => {
    const currentTags = getProductTags(product);

    // Filtra produtos candidatos por tag/categoria compartilhada, excluindo o produto em exibição
    const matchingByTag = MOCK_PRODUCTS.filter(p => {
      if (p.id === product.id || p.productID === product.productID) return false;

      const pTags = getProductTags(p);
      const sharesTag = currentTags.some(tag => pTags.includes(tag));
      const sharesCategory = p.category.trim().toLowerCase() === product.category.trim().toLowerCase();

      return sharesCategory || sharesTag;
    });

    // Embaralha aleatoriamente os produtos da mesma tag/categoria
    const shuffledMatches = shuffleArray(matchingByTag);

    // Caso a tag possua menos que 4 produtos no total, complementa com outros produtos aleatórios
    if (shuffledMatches.length < 4) {
      const otherProducts = MOCK_PRODUCTS.filter(
        p => p.id !== product.id && p.productID !== product.productID && !shuffledMatches.some(m => m.id === p.id)
      );
      const shuffledOthers = shuffleArray(otherProducts);
      return [...shuffledMatches, ...shuffledOthers].slice(0, 4);
    }

    return shuffledMatches.slice(0, 4);
  }, [product.id, product.category]);
  const techSpecs = getTechnicalSpecifications(product);

  const originalPrice = product.price * 1.277;
  const installmentValue = product.price / 10.8;

  return (
    <PageContainer maxWidth="lg" py={4}>
      {/* Breadcrumbs */}
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

      {/* Main Product Showcase */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {/* Left Column: Product Gallery */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box 
              sx={{
                ...mainImageWrapperStyle,
                cursor: isZoomed ? 'zoom-out' : 'zoom-in',
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
              <ProductImage 
                src={imagesList[activeImageIdx]} 
                alt={product.name} 
                sx={{
                  width: '100%',
                  height: '100%',
                  transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transition: isZoomed ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.3s ease',
                }}
              />

              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 16, 
                  right: 16, 
                  bgcolor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  px: 1.8,
                  py: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              >
                <Search size={14} color="#334155" style={{ marginRight: '6px' }} />
                <Typography variant="caption" sx={{ color: '#0f172a', fontWeight: 700, fontSize: '0.78rem' }}>
                  {isZoomed ? 'Remover Zoom' : 'Zoom na Imagem'}
                </Typography>
              </Box>
            </Box>

            {/* Thumbnails */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, width: '100%' }}>
              {imagesList.map((img, idx) => (
                <Box
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  sx={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '12px',
                    border: activeImageIdx === idx ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    bgcolor: '#ffffff',
                    transition: 'all 0.2s ease',
                    '&:hover': { opacity: 0.85 }
                  }}
                >
                  <ProductImage 
                    src={img} 
                    alt={`${product.name} miniatura ${idx + 1}`} 
                    sx={{ width: '100%', height: '100%' }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Right Column: Main Product Details White Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card 
            elevation={0}
            sx={productDetailCardStyle}
          >
            {/* Brand tag */}
            <Typography variant="caption" sx={{ color: '#2563eb', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.5, fontSize: '0.75rem' }}>
              {brandName}
            </Typography>

            {/* Product Title */}
            <Typography variant="h4" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', mb: 1.5, fontSize: { xs: '1.5rem', md: '1.85rem' } }}>
              {product.name}
            </Typography>

            {/* Rating and seller row */}
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

            {/* Price section */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#94a3b8', textDecoration: 'line-through', fontSize: '0.85rem', display: 'block', mb: 0.25 }}>
                De {formatCurrencyBRL(originalPrice)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                <Typography variant="h3" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, color: '#0f172a', fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
                  {formatCurrencyBRL(product.price)}
                </Typography>
                <Box sx={{ bgcolor: '#ecfdf5', color: '#059669', fontWeight: 700, fontSize: '0.75rem', px: 1.2, py: 0.5, borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                  <strong>no PIX</strong> <span>10% de desconto</span>
                </Box>
              </Box>
              <Typography variant="caption" sx={{ display: 'block', color: '#64748b', fontSize: '0.825rem', mt: 0.5 }}>
                Ou em até 12x de <strong style={{ color: '#0f172a' }}>{formatCurrencyBRL(installmentValue)}</strong> sem juros no cartão de crédito.
              </Typography>
            </Box>

            <Divider sx={{ my: 2, borderColor: '#f1f5f9' }} />

            {/* Quantity label & Controls */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1, display: 'block', fontSize: '0.7rem' }}>
                QUANTIDADE
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '9999px', bgcolor: '#f8fafc', px: 0.5, py: 0.25 }}>
                  <IconButton aria-label="Diminuir quantidade" onClick={() => setQuantity(Math.max(1, quantity - 1))} size="small" sx={{ color: '#475569' }}>
                    <Minus size={14} />
                  </IconButton>
                  <Typography sx={{ px: 1.5, fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                    {quantity}
                  </Typography>
                  <IconButton aria-label="Aumentar quantidade" onClick={() => setQuantity(quantity + 1)} size="small" sx={{ color: '#475569' }}>
                    <Plus size={14} />
                  </IconButton>
                </Box>

                <Tooltip title={wishlist ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}>
                  <IconButton
                    aria-label={wishlist ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    onClick={() => setWishlist(!wishlist)}
                    sx={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      p: 1.2,
                      color: wishlist ? '#ef4444' : '#64748b',
                      '&:hover': { bgcolor: '#f8fafc' }
                    }}
                  >
                    <Heart size={18} fill={wishlist ? '#ef4444' : 'none'} />
                  </IconButton>
                </Tooltip>

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

              {/* Primary Action Buttons */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleBuy}
                  startIcon={<ShoppingCart size={18} />}
                  sx={{
                    flexGrow: 1,
                    py: 1.3,
                    px: 3.5,
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontFamily: '"Space Grotesk", sans-serif',
                    bgcolor: '#2563eb',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                    '&:hover': { bgcolor: '#1d4ed8' }
                  }}
                >
                  Comprar
                </Button>

                <IconButton
                  aria-label="Ir para o carrinho"
                  onClick={() => navigate('/carrinho')}
                  sx={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    p: 1.3,
                    color: '#2563eb',
                    bgcolor: '#ffffff',
                    '&:hover': { bgcolor: '#f8fafc' }
                  }}
                >
                  <Badge badgeContent={quantityInCart} color="primary">
                    <ShoppingCart size={20} />
                  </Badge>
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ my: 2, borderColor: '#f1f5f9' }} />

            {/* Freight / Zipcode Calculator */}
            <Box sx={{ pt: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Truck size={16} color="#2563eb" />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', fontSize: '0.875rem' }}>
                  Calcular frete e prazo de entrega
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <input 
                  type="text" 
                  value={cep}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '').slice(0, 8);
                    let formatted = clean;
                    if (clean.length > 5) formatted = `${clean.slice(0, 5)}-${clean.slice(5)}`;
                    setCep(formatted);
                  }}
                  placeholder="Ex: 01311-200"
                  style={{
                    flexGrow: 1,
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.875rem',
                    outline: 'none',
                    backgroundColor: '#ffffff'
                  }}
                />
                <Button
                  onClick={() => setCepCalculated(true)}
                  sx={{
                    bgcolor: '#f1f5f9',
                    color: '#475569',
                    borderRadius: '10px',
                    px: 2.5,
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '0.85rem',
                    '&:hover': { bgcolor: '#e2e8f0' }
                  }}
                >
                  Consultar
                </Button>
              </Box>

              {cepCalculated && (
                <Box sx={{ mt: 1.5, p: 1.5, bgcolor: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                  <Typography variant="caption" sx={{ display: 'block', color: '#16a34a', fontWeight: 700 }}>
                    ✓ Entrega Padrão (PAC): Grátis (até 3 dias úteis)
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: '#0f172a', fontWeight: 600, mt: 0.5 }}>
                    • Entrega Expressa (SEDEX): R$ 9,90 (até 1 dia útil)
                  </Typography>
                </Box>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Side-by-side Cards for Descriptions */}
      <Grid container spacing={3.5} sx={{ mb: 6 }}>
        {/* Basic Description Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card 
            elevation={0}
            sx={specCardStyle}
          >
            <Typography variant="h5" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, color: '#0f172a', mb: 2, fontSize: '1.25rem' }}>
              Descrição Básica do Produto
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, fontSize: '0.925rem' }}>
              {getBasicDescription(product)}
            </Typography>
          </Card>
        </Grid>

        {/* Technical Specifications Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card 
            elevation={0}
            sx={specCardStyle}
          >
            <Typography variant="h5" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, color: '#0f172a', mb: 2, fontSize: '1.25rem' }}>
              Descrição Técnica do Produto
            </Typography>
            
            <Box sx={{ border: '1px solid #f1f5f9', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <tbody>
                  {techSpecs.map((spec, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f8fafc' : '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
                      <th style={{ padding: '10px 14px', fontWeight: 600, color: '#64748b', width: '40%' }}>
                        {spec.label}
                      </th>
                      <td style={{ padding: '10px 14px', fontWeight: 500, color: '#0f172a' }}>
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Product Reviews */}
      <Box ref={reviewsRef} sx={{ mb: 6 }}>
        <ProductReviews 
          productId={product.id} 
          productCategory={product.category} 
          productRating={product.rating || 4.9} 
        />
      </Box>

      {/* Related Products */}
      <Box>
        <Typography variant="h5" sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800, mb: 3, color: '#0f172a' }}>
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
    </PageContainer>
  );
};

export default ProductDetailPage;
