import React from 'react';
import { Container, Box, ContainerProps } from '@mui/material';
import { pageContainerBoxStyle, pageContainerInnerStyle } from './PageContainer.styles';

interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: ContainerProps['maxWidth'];
  py?: number | object;
  bgcolor?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  maxWidth = 'lg',
  py = { xs: 4, md: 6 },
  bgcolor = '#f8fafc',
}) => {
  return (
    <Box sx={pageContainerBoxStyle(bgcolor)}>
      <Container 
        maxWidth={maxWidth} 
        sx={pageContainerInnerStyle(py)}
      >
        {children}
      </Container>
    </Box>
  );
};

export default PageContainer;
