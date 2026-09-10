import React from 'react';
import { useNavigate } from 'react-router';
import { Box, Typography, Paper, Button, Divider } from '@mui/material';
import { HelpCircle, FileText, ShieldCheck, Lock, UserCheck, Mail } from 'lucide-react';
import { PageContainer } from '../../components/ui/PageContainer';
import { CustomAlert } from '../../components/ui/CustomAlert';
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

export const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer maxWidth="lg" py={{ xs: 3, md: 5 }}>

      <Box sx={institutionalHeaderBoxStyle}>
        <Typography variant="h4" component="h1" sx={institutionalTitleStyle}>
          Política de Privacidade & LGPD
        </Typography>
        <Typography variant="body1" sx={institutionalSubtitleStyle}>
          Transparência total no tratamento e proteção dos seus dados pessoais.
        </Typography>
      </Box>

      <Box sx={institutionalNavTabsBoxStyle}>
        <Button sx={institutionalNavTabButtonStyle(false)} onClick={() => navigate('/faq')}>
          <HelpCircle size={18} style={{ marginRight: 6 }} />
          Dúvidas Frequentes (FAQ)
        </Button>
        <Button sx={institutionalNavTabButtonStyle(true)} onClick={() => navigate('/privacidade')}>
          <ShieldCheck size={18} style={{ marginRight: 6 }} />
          Política de Privacidade
        </Button>
        <Button sx={institutionalNavTabButtonStyle(false)} onClick={() => navigate('/termos')}>
          <FileText size={18} style={{ marginRight: 6 }} />
          Termos de Uso
        </Button>
      </Box>

      <Paper sx={institutionalContentPaperStyle}>
        <CustomAlert severity="warning" icon={<ShieldCheck size={20} />} sx={{ mb: 4, borderRadius: '12px' }}>
          <strong>Aviso sobre o Simulador:</strong> Esta plataforma é um e-commerce de simulação. Todos os dados (endereços, cartões de teste, cupons e pedidos) são mantidos exclusivamente no <strong>localStorage do seu próprio navegador</strong>. Recomendamos evitar a inserção de dados pessoais e financeiros reais sobre sua persona. Você pode apagar todos os seus dados salvos a qualquer momento limpando os dados de navegação do seu browser.
        </CustomAlert>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3, fontWeight: 600 }}>
          Última atualização: 07 de Setembro de 2026
        </Typography>

        <Box sx={legalSectionBoxStyle}>
          <Typography variant="h6" sx={legalHeadingStyle}>
            1. Coleta de Dados Pessoais
          </Typography>
          <Typography variant="body2" sx={legalParagraphStyle}>
            Coletamos apenas os dados estritamente necessários para o processamento de pedidos e emissão de notas fiscais, tais como: nome completo, CPF, e-mail, telefone e endereço de entrega.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={legalSectionBoxStyle}>
          <Typography variant="h6" sx={legalHeadingStyle}>
            2. Finalidade do Uso dos Dados
          </Typography>
          <Typography variant="body2" sx={legalParagraphStyle}>
            Seus dados são utilizados para:
          </Typography>
          <Box component="ul" sx={{ color: 'text.secondary', fontSize: '0.9rem', pl: 3, mb: 1.5, lineHeight: 1.7 }}>
            <li>Processar e entregar seus pedidos com segurança;</li>
            <li>Emitir documentos fiscais e manter registros contábeis obrigatórios;</li>
            <li>Enviar atualizações em tempo real do status de entrega via e-mail ou WhatsApp;</li>
            <li>Oferecer suporte personalizado através de nossos canais oficiais.</li>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={legalSectionBoxStyle}>
          <Typography variant="h6" sx={legalHeadingStyle}>
            3. Compartilhamento Seguro com Terceiros
          </Typography>
          <Typography variant="body2" sx={legalParagraphStyle}>
            Não vendemos nem comercializamos seus dados em nenhuma hipótese. O compartilhamento é restrito aos parceiros essenciais para a operação (como operadores logísticos para entrega e gateways de pagamento autorizados).
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={legalSectionBoxStyle}>
          <Typography variant="h6" sx={legalHeadingStyle}>
            4. Seus Direitos como Titular de Dados (LGPD)
          </Typography>
          <Typography variant="body2" sx={legalParagraphStyle}>
            De acordo com o Art. 18 da LGPD, você tem o direito de a qualquer momento solicitar:
          </Typography>
          <Box component="ul" sx={{ color: 'text.secondary', fontSize: '0.9rem', pl: 3, mb: 1.5, lineHeight: 1.7 }}>
            <li>A confirmação e o acesso aos seus dados pessoais;</li>
            <li>A correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>A eliminação ou anonimização de dados desnecessários;</li>
            <li>A revogação do consentimento para envio de novidades por e-mail.</li>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={legalSectionBoxStyle}>
          <Typography variant="h6" sx={legalHeadingStyle}>
            5. Encarregado de Proteção de Dados (DPO)
          </Typography>
          <Typography variant="body2" sx={legalParagraphStyle}>
            Para exercer seus direitos de titular ou esclarecer qualquer dúvida sobre nossa política de privacidade, entre em contato direto com o nosso Encarregado de Dados através do e-mail: <strong>teste@teste.com</strong>.
          </Typography>
        </Box>
      </Paper>
    </PageContainer>
  );
};

export default PrivacyPage;
