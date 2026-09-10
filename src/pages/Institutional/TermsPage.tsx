import React from 'react';
import { useNavigate } from 'react-router';
import { Box, Typography, Paper, Button, Divider } from '@mui/material';
import { HelpCircle, FileText, ShieldCheck } from 'lucide-react';
import { PageContainer } from '../../components/ui/PageContainer';
import {
  institutionalHeaderBoxStyle,
  institutionalTitleStyle,
  institutionalSubtitleStyle,
  institutionalNavTabsBoxStyle,
  institutionalNavTabButtonStyle,
  institutionalContentPaperStyle,
  legalSectionBoxStyle,
  legalHeadingStyle,
  legalParagraphStyle,
} from './Institutional.styles';

export const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer maxWidth="lg" py={{ xs: 3, md: 5 }}>

      <Box sx={institutionalHeaderBoxStyle}>
        <Typography variant="h4" component="h1" sx={institutionalTitleStyle}>
          Termos & Condições de Uso
        </Typography>
        <Typography variant="body1" sx={institutionalSubtitleStyle}>
          Regras gerais e condições de serviços da plataforma StoreLab.
        </Typography>
      </Box>

      <Box sx={institutionalNavTabsBoxStyle}>
        <Button sx={institutionalNavTabButtonStyle(false)} onClick={() => navigate('/faq')}>
          <HelpCircle size={18} style={{ marginRight: 6 }} />
          Dúvidas Frequentes (FAQ)
        </Button>
        <Button sx={institutionalNavTabButtonStyle(false)} onClick={() => navigate('/privacidade')}>
          <ShieldCheck size={18} style={{ marginRight: 6 }} />
          Política de Privacidade
        </Button>
        <Button sx={institutionalNavTabButtonStyle(true)} onClick={() => navigate('/termos')}>
          <FileText size={18} style={{ marginRight: 6 }} />
          Termos de Uso
        </Button>
      </Box>

      <Paper sx={institutionalContentPaperStyle}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3, fontWeight: 600 }}>
          Última atualização: 07 de Setembro de 2026
        </Typography>

        <Box sx={legalSectionBoxStyle}>
          <Typography variant="h6" sx={legalHeadingStyle}>
            1. Ambiente de Simulação e Aceitação dos Termos
          </Typography>
          <Typography variant="body2" sx={legalParagraphStyle}>
            A StoreLab é uma plataforma e-commerce projetada como um <strong>ambiente de simulação e demonstração técnica</strong>. Todos os dados de pedidos, carrinhos, cupons, endereços e cartões salvos são mantidos unicamente no <strong>localStorage do navegador do usuário</strong>.
          </Typography>
          <Typography variant="body2" sx={legalParagraphStyle}>
            Recomendamos que os usuários evitem utilizar dados sensíveis ou reais sobre sua persona. O usuário pode apagar completamente todos os registros salvos a qualquer momento limpando os dados de navegação do seu browser.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={legalSectionBoxStyle}>
          <Typography variant="h6" sx={legalHeadingStyle}>
            2. Cadastro e Dados da Conta
          </Typography>
          <Typography variant="body2" sx={legalParagraphStyle}>
            Para efetuar compras e acessar funcionalidades exclusivas, o usuário declara que as informações fornecidas são verdadeiras, exatas e atualizadas. A guarda do login e senha de acesso é de inteira responsabilidade do usuário.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={legalSectionBoxStyle}>
          <Typography variant="h6" sx={legalHeadingStyle}>
            3. Preços, Cupons e Formas de Pagamento
          </Typography>
          <Typography variant="body2" sx={legalParagraphStyle}>
            Os preços e condições de pagamento exibidos são válidos exclusivamente para compras realizadas diretamente no site. Os cupons promocionais (como LAB10) possuem regras de elegibilidade e validade específicas e não são cumulativos, salvo indicação em contrário.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={legalSectionBoxStyle}>
          <Typography variant="h6" sx={legalHeadingStyle}>
            4. Entrega e Política de Frete
          </Typography>
          <Typography variant="body2" sx={legalParagraphStyle}>
            As entregas são efetuadas através de transportadoras parceiras e Correios. Os prazos de entrega informados são estimativas e passam a contar a partir do momento da aprovação do pagamento. Oferecemos condição de Frete Grátis para pedidos acima de R$ 1.500,00.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={legalSectionBoxStyle}>
          <Typography variant="h6" sx={legalHeadingStyle}>
            5. Direito de Arrependimento e Devoluções
          </Typography>
          <Typography variant="body2" sx={legalParagraphStyle}>
            Em atendimento ao Artigo 49 do Código de Defesa do Consumidor, o cliente tem o prazo de até 7 (sete) dias corridos a contar do recebimento do produto para solicitar a devolução sem custos adicionais.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={legalSectionBoxStyle}>
          <Typography variant="h6" sx={legalHeadingStyle}>
            6. Foro e Legislação Aplicável
          </Typography>
          <Typography variant="body2" sx={legalParagraphStyle}>
            Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Fica eleito o Foro da Comarca de São Paulo/SP para dirimir eventuais controvérsias oriundas deste contrato.
          </Typography>
        </Box>
      </Paper>
    </PageContainer>
  );
};

export default TermsPage;
