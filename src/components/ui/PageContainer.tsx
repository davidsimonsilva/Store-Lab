import React from 'react';
import { Container, Box, ContainerProps } from '@mui/material';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: ContainerProps['maxWidth'];
  py?: number | object;
  bgcolor?: string;
}

/**
 * Componente de layout corporativo reutilizável que padroniza o tamanho,
 * espaçamento e cor de fundo do "body" de todas as páginas da plataforma.
 * Resolve o problema de rodapé desalinhado e inconsistências de altura.
 */
export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxWidth = 'lg',
  py = { xs: 4, md: 6 },
  bgcolor = '#f8fafc',
}) => {
  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        width: '100%',
        bgcolor: bgcolor,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container 
        maxWidth={maxWidth} 
        sx={{ 
          py: py,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default PageContainer;
