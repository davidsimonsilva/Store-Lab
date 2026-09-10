import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';
import { PageContainer } from '../../components/ui/PageContainer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import {
  notFoundContainerStyle,
  notFoundCodeStyle,
  notFoundTitleStyle,
  notFoundDescriptionStyle,
  notFoundActionsStyle,
} from './NotFoundPage.styles';

export interface NotFoundPageProps {
  title?: string;
  message?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  title = 'Página não encontrada',
  message = 'Não encontramos o endereço que você tentou acessar. O link pode estar incorreto ou a página não existe mais.',
}) => {
  const navigate = useNavigate();

  useDocumentTitle(title);

  return (
    <PageContainer>
      <Box sx={notFoundContainerStyle}>
        <Typography sx={notFoundCodeStyle}>404</Typography>
        <Typography variant="h1" sx={notFoundTitleStyle}>
          {title}
        </Typography>
        <Typography sx={notFoundDescriptionStyle}>
          {message}
        </Typography>
        <Box sx={notFoundActionsStyle}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<Home size={20} />}
            onClick={() => navigate('/')}
            sx={{
              borderRadius: 2,
              px: 6,
              py: 1.5,
              minWidth: { xs: '100%', sm: 260 },
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            Voltar ao Início
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default NotFoundPage;
