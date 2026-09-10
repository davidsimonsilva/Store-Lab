import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  Grid,
} from '@mui/material';
import {
  Search,
  ChevronDown,
  HelpCircle,
  Truck,
  CreditCard,
  RefreshCw,
  ShieldCheck,
  MessageCircle,
  Mail,
  FileText,
} from 'lucide-react';
import { PageContainer } from '../../components/ui/PageContainer';
import {
  institutionalHeaderBoxStyle,
  institutionalTitleStyle,
  institutionalSubtitleStyle,
  institutionalNavTabsBoxStyle,
  institutionalNavTabButtonStyle,
  institutionalContentPaperStyle,
  faqAccordionStyle,
} from './Institutional.styles';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq_1',
    category: 'Pedidos & Entregas',
    question: 'Como faço para rastrear o meu pedido?',
    answer: 'Você pode rastrear seu pedido em tempo real acessando a nossa página dedicada de Rastreio (/rastreio) informando o número do pedido (ex: ORD#8429...) ou código de rastreamento enviado por e-mail.',
  },
  {
    id: 'faq_2',
    category: 'Pedidos & Entregas',
    question: 'Qual é o prazo de entrega dos produtos?',
    answer: 'O prazo varia de acordo com o CEP e a modalidade de envio escolhida no checkout. Em geral, entregas para capitais e regiões metropolitanas levam entre 2 a 5 dias úteis após a confirmação do pagamento.',
  },
  {
    id: 'faq_3',
    category: 'Pedidos & Entregas',
    question: 'Vocês oferecem Frete Grátis?',
    answer: 'Sim! Oferecemos Frete Grátis em compras acima de R$ 1.500,00 para todo o Brasil.',
  },
  {
    id: 'faq_4',
    category: 'Pagamentos & Pix',
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos PIX com 5% de desconto à vista, Cartão de Crédito em até 12x (sendo até 6x sem juros) e Boleto Bancário.',
  },
  {
    id: 'faq_5',
    category: 'Pagamentos & Pix',
    question: 'O desconto do PIX é aplicado automaticamente?',
    answer: 'Sim, ao selecionar a opção PIX na tela de checkout, o desconto de 5% é aplicado na hora no valor final dos produtos.',
  },
  {
    id: 'faq_6',
    category: 'Trocas & Devoluções',
    question: 'Como solicitar a troca ou devolução de um produto?',
    answer: 'De acordo com o Código de Defesa do Consumidor, você tem até 7 dias corridos após o recebimento para solicitar o cancelamento ou devolução por arrepencimento com estorno 100% garantido.',
  },
  {
    id: 'faq_7',
    category: 'Trocas & Devoluções',
    question: 'O que fazer se o produto chegar com defeito?',
    answer: 'Entre em contato imediatamente com o nosso suporte via WhatsApp ou e-mail com fotos/vídeos do item. Providenciaremos a logística reversa sem custos.',
  },
  {
    id: 'faq_8',
    category: 'Conta & Segurança',
    question: 'A StoreLab é uma loja real? Como meus dados são armazenados?',
    answer: 'A StoreLab é um ambiente de simulação. Todos os dados (pedidos, cartões de teste e endereços) são gravados unicamente no localStorage do seu próprio navegador. Recomendamos não inserir dados pessoais ou financeiros reais. Você pode apagar todos os dados acumulados limpando os dados de navegação/localStorage a qualquer momento.',
  },
];

const CATEGORIES = ['Todos', 'Pedidos & Entregas', 'Pagamentos & Pix', 'Trocas & Devoluções', 'Conta & Segurança'];

export const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [expandedId, setExpandedId] = useState<string | false>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim() && selectedCategory !== 'Todos') {
      setSelectedCategory('Todos');
    }
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleChangeAccordion = (id: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedId(isExpanded ? id : false);
  };

  return (
    <PageContainer maxWidth="lg" py={{ xs: 3, md: 5 }}>

      <Box sx={institutionalHeaderBoxStyle}>
        <Typography variant="h4" component="h1" sx={institutionalTitleStyle}>
          Central de Ajuda & Suporte
        </Typography>
        <Typography variant="body1" sx={institutionalSubtitleStyle}>
          Tire suas dúvidas rapidamente ou entre em contato com nossa equipe.
        </Typography>
      </Box>

      <Box sx={institutionalNavTabsBoxStyle}>
        <Button sx={institutionalNavTabButtonStyle(true)} onClick={() => navigate('/faq')}>
          <HelpCircle size={18} style={{ marginRight: 6 }} />
          Dúvidas Frequentes (FAQ)
        </Button>
        <Button sx={institutionalNavTabButtonStyle(false)} onClick={() => navigate('/privacidade')}>
          <ShieldCheck size={18} style={{ marginRight: 6 }} />
          Política de Privacidade
        </Button>
        <Button sx={institutionalNavTabButtonStyle(false)} onClick={() => navigate('/termos')}>
          <FileText size={18} style={{ marginRight: 6 }} />
          Termos de Uso
        </Button>
      </Box>

      <Paper sx={institutionalContentPaperStyle}>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Digite a sua dúvida (ex: frete, pix, troca, devolução)..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 44,
                borderRadius: '12px',
              },
            }}
            slotProps={{
              input: {
                startAdornment: <Search size={20} style={{ marginRight: 10, color: '#64748b' }} />,
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              clickable
              color={selectedCategory === cat ? 'primary' : 'default'}
              variant={selectedCategory === cat ? 'filled' : 'outlined'}
              onClick={() => setSelectedCategory(cat)}
              sx={{ fontWeight: 600, py: 0.5 }}
            />
          ))}
        </Box>

        {filteredFaqs.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <HelpCircle size={48} style={{ color: '#94a3b8', marginBottom: 12 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Nenhuma pergunta encontrada
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Tente buscar com outros termos ou entre em contato direto com o suporte.
            </Typography>
          </Box>
        ) : (
          filteredFaqs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={expandedId === faq.id}
              onChange={handleChangeAccordion(faq.id)}
              sx={faqAccordionStyle}
            >
              <AccordionSummary expandIcon={<ChevronDown size={20} />}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        )}

        <Box sx={{ mt: 5, pt: 4, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, fontFamily: '"Space Grotesk", sans-serif' }}>
            Ainda precisa de ajuda?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Nossa equipe de atendimento está disponível para resolver qualquer questão com prioridade.
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '12px',
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <MessageCircle size={28} style={{ color: '#2563eb', flexShrink: 0 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Suporte via WhatsApp
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    (99) 99999-9999 &bull; Seg a Sex das 08h às 18h
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: '12px',
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Mail size={28} style={{ color: '#2563eb', flexShrink: 0 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    E-mail de Atendimento
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    teste@teste.com &bull; Resposta em até 24h úteis
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </PageContainer>
  );
};

export default FAQPage;
