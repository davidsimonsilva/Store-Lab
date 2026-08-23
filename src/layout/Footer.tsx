import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Link, 
  TextField, 
  Button, 
  Alert,
  Tooltip
} from '@mui/material';
import { 
  Mail, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Twitter, 
  MessageCircle, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  Truck, 
  ArrowRight 
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo/BrandLogo';
import { useUIState } from '../context/UIStateContext';
import {
  footerRootStyles,
  newsletterCardStyles,
  newsletterTextContainerStyles,
  newsletterTitleStyles,
  newsletterSubtitleStyles,
  newsletterFormStyles,
  brandContainerStyles,
  logoRowStyles,
  logoTitleStyles,
  brandDescriptionStyles,
  socialGroupStyles,
  socialIconButtonStyles,
  columnTitleStyles,
  linkListStyles,
  linkItemStyles,
  contactRowStyles,
  bottomCopyrightRowStyles,
} from './Footer.styles';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedCategory } = useUIState();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigate('/');
    setTimeout(() => {
      const gridEl = document.getElementById('grid-container');
      if (gridEl) {
        gridEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <Box component="footer" id="main-footer" sx={footerRootStyles}>
      <Container maxWidth="lg">
        <Box sx={newsletterCardStyles}>
          <Box sx={newsletterTextContainerStyles}>
            <Typography variant="h6" sx={newsletterTitleStyles}>
              Fique por dentro das novidades e ofertas
            </Typography>
            <Typography variant="body2" sx={newsletterSubtitleStyles}>
              Cadastre seu e-mail para receber avisos de lançamentos e condições especiais da StoreLab em primeira mão.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleNewsletterSubmit} sx={newsletterFormStyles}>
            {newsletterStatus === 'success' ? (
              <Alert 
                icon={<CheckCircle2 size={18} />} 
                severity="success" 
                sx={{ width: '100%', alignItems: 'center' }}
              >
                Inscrição confirmada com sucesso!
              </Alert>
            ) : (
              <>
                <TextField
                  id="newsletter-email-input"
                  size="small"
                  placeholder="Seu e-mail"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterStatus === 'error') setNewsletterStatus('idle');
                  }}
                  error={newsletterStatus === 'error'}
                  helperText={newsletterStatus === 'error' ? 'Informe um e-mail válido' : undefined}
                  sx={{ flexGrow: 1, bgcolor: 'background.paper', borderRadius: 2 }}
                />
                <Button 
                  id="newsletter-submit-btn"
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  endIcon={<ArrowRight size={16} />}
                >
                  Cadastrar
                </Button>
              </>
            )}
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={brandContainerStyles}>
              <Box sx={logoRowStyles} onClick={() => handleNavClick('/')} style={{ cursor: 'pointer' }}>
                <BrandLogo size="small" onClick={() => handleNavClick('/')} />
                <Typography variant="h6" sx={logoTitleStyles}>
                  Store-lab
                </Typography>
              </Box>

              <Typography variant="body2" sx={brandDescriptionStyles}>
                Catálogo especializado em Eletrônicos, Escritório, Moda Esportiva e Cuidados & Beleza. Tecnologia com foco em qualidade e transparência.
              </Typography>

              <Box sx={socialGroupStyles}>
                <Tooltip title="Instagram">
                  <Box component="a" href="https://instagram.com" target="_blank" rel="noopener noreferrer" sx={socialIconButtonStyles}>
                    <Instagram size={18} />
                  </Box>
                </Tooltip>
                <Tooltip title="LinkedIn">
                  <Box component="a" href="https://linkedin.com" target="_blank" rel="noopener noreferrer" sx={socialIconButtonStyles}>
                    <Linkedin size={18} />
                  </Box>
                </Tooltip>
                <Tooltip title="YouTube">
                  <Box component="a" href="https://youtube.com" target="_blank" rel="noopener noreferrer" sx={socialIconButtonStyles}>
                    <Youtube size={18} />
                  </Box>
                </Tooltip>
                <Tooltip title="Twitter / X">
                  <Box component="a" href="https://twitter.com" target="_blank" rel="noopener noreferrer" sx={socialIconButtonStyles}>
                    <Twitter size={18} />
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <Typography variant="subtitle2" sx={columnTitleStyles}>
              Categorias
            </Typography>
            <Box component="ul" sx={linkListStyles}>
              <li>
                <Link component="button" onClick={() => handleCategoryClick('Eletrônicos / Mobile')} sx={linkItemStyles}>
                  Eletrônicos
                </Link>
              </li>
              <li>
                <Link component="button" onClick={() => handleCategoryClick('Móveis / Office')} sx={linkItemStyles}>
                  Escritório
                </Link>
              </li>
              <li>
                <Link component="button" onClick={() => handleCategoryClick('Vestuário / Moda Esportiva')} sx={linkItemStyles}>
                  Moda Esportiva
                </Link>
              </li>
              <li>
                <Link component="button" onClick={() => handleCategoryClick('Cuidados Pessoais / Beleza')} sx={linkItemStyles}>
                  Cuidados & Beleza
                </Link>
              </li>
            </Box>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2.5 }}>
            <Typography variant="subtitle2" sx={columnTitleStyles}>
              Institucional & Ajuda
            </Typography>
            <Box component="ul" sx={linkListStyles}>
              <li>
                <Box sx={linkItemStyles}>
                  <HelpCircle size={15} />
                  <span>Dúvidas Frequentes (FAQ)</span>
                </Box>
              </li>
              <li>
                <Box sx={linkItemStyles}>
                  <Truck size={15} />
                  <span>Rastreio de Pedidos</span>
                </Box>
              </li>
              <li>
                <Box sx={linkItemStyles}>
                  <FileText size={15} />
                  <span>Política de Privacidade</span>
                </Box>
              </li>
              <li>
                <Box sx={linkItemStyles}>
                  <FileText size={15} />
                  <span>Termos & Condições de Uso</span>
                </Box>
              </li>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 3 }}>
            <Typography variant="subtitle2" sx={columnTitleStyles}>
              Central de Atendimento
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={contactRowStyles}>
                <MessageCircle size={18} color="#2563eb" style={{ flexShrink: 0, marginTop: 2 }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    WhatsApp Suporte
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    (99) 99999-9999
                  </Typography>
                </Box>
              </Box>

              <Box sx={contactRowStyles}>
                <Mail size={18} color="#2563eb" style={{ flexShrink: 0, marginTop: 2 }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    E-mail Oficial
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                    teste@teste.com
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={bottomCopyrightRowStyles}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
            &copy; {new Date().getFullYear()} Store-lab Comércio Digital Ltda. CNPJ: 12.345.678/0001-90.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
