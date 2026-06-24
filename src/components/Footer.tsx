import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, Link } from '@mui/material';
import { FlaskConical as FlaskIcon } from 'lucide-react';
import { useGlobalState } from '../context/GlobalStateContext';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { isHeaderVisible, user, anonymousUserId } = useGlobalState();

  if (!isHeaderVisible()) {
    return null;
  }

  const userId = user?.isLoggedIn ? user.id : anonymousUserId;

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#0f172a', 
        color: '#94a3b8', 
        pt: 8, 
        pb: 5,
        borderTop: '1px solid #1e293b',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box 
                sx={{ 
                  bgcolor: '#1e293b', 
                  p: 1, 
                  borderRadius: '8px', 
                  display: 'inline-flex',
                  border: '1px solid #334155'
                }}
              >
                <FlaskIcon size={20} color="#3b82f6" />
              </Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700, 
                  color: '#ffffff',
                  letterSpacing: '-0.02em'
                }}
              >
                Store-lab
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.7, color: '#94a3b8' }}>
              O e-commerce completo para o seu dia a dia. Oferecemos as melhores soluções e produtos de alta qualidade em Eletrônicos, Escritório, Moda Esportiva e Cuidados & Beleza.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }} sx={{ ml: { md: 'auto' } }}>
            <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 600, mb: 2.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Navegação
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
              <li><Link href="#" onClick={(e) => { e.preventDefault(); navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} color="inherit" underline="hover">Home</Link></li>
              <li><Link href="#" onClick={(e) => { e.preventDefault(); navigate(`/carrinho/${userId}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }} color="inherit" underline="hover">Meu Carrinho</Link></li>
              <li><Link href="#" onClick={(e) => { e.preventDefault(); navigate(`/perfil/${userId}`); window.scrollTo({ top: 0, behavior: 'smooth' }); }} color="inherit" underline="hover">Perfil</Link></li>
              {process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true' && (
                <li><Link href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} color="inherit" underline="hover">Entrar / Registrar</Link></li>
              )}
            </ul>
          </Grid>
        </Grid>

        <Box 
          sx={{ 
            borderTop: '1px solid #1e293b', 
            pt: 4, 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            &copy; {new Date().getFullYear()} Store-lab Ltda. Todos os direitos reservados. CNPJ: 00.000.000/0001-00.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
