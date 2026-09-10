import { matchPath } from 'react-router';
import { SEOOptions } from '../hooks/useDocumentTitle';

export interface RouteSEOItem {

  pathPattern: string;

  seo: SEOOptions;
}

export const ROUTE_SEO_CONFIG: RouteSEOItem[] = [
  {
    pathPattern: '/',
    seo: {
      title: 'Store-lab',
      description:
        'Descubra produtos inovadores, tecnologia de ponta e equipamentos premium com frete grátis e entrega rápida na StoreLab.',
      ogTitle: 'Store-lab',
      ogDescription:
        'Descubra produtos inovadores e tecnologia de ponta com as melhores condições e entrega rápida.',
      ogType: 'website',
    },
  },
  {
    pathPattern: '/carrinho',
    seo: {
      title: 'Carrinho',
      description:
        'Revise os produtos adicionados ao seu carrinho, aplique cupons promocionais e calcule o frete na StoreLab.',
      ogTitle: 'Carrinho',
      ogDescription: 'Revise seus itens e finalize sua compra com segurança na StoreLab.',
      ogType: 'website',
    },
  },
  {
    pathPattern: '/rastreio',
    seo: {
      title: 'Rastreio de Pedidos',
      description:
        'Acompanhe em tempo real o status de entrega do seu pedido na StoreLab.',
      ogTitle: 'Rastreio de Pedidos',
      ogDescription: 'Acompanhe a localização e prazos de entrega do seu pedido na StoreLab.',
      ogType: 'website',
    },
  },
  {
    pathPattern: '/faq',
    seo: {
      title: 'Dúvidas Frequentes',
      description:
        'Tire suas dúvidas sobre entregas, pagamentos, trocas e segurança na StoreLab.',
      ogTitle: 'Dúvidas Frequentes (FAQ)',
      ogDescription: 'Central de ajuda e suporte ao cliente da StoreLab.',
      ogType: 'website',
    },
  },
  {
    pathPattern: '/termos',
    seo: {
      title: 'Termos de Uso',
      description:
        'Confira os termos e condições de uso do site e compras na StoreLab.',
      ogTitle: 'Termos & Condições de Uso',
      ogDescription: 'Termos e regras de utilização dos serviços da StoreLab.',
      ogType: 'website',
    },
  },
  {
    pathPattern: '/privacidade',
    seo: {
      title: 'Política de Privacidade',
      description:
        'Entenda como tratamos e protegemos seus dados pessoais de acordo com a LGPD na StoreLab.',
      ogTitle: 'Política de Privacidade & LGPD',
      ogDescription: 'Compromisso com a segurança e proteção de dados dos clientes StoreLab.',
      ogType: 'website',
    },
  },
  {
    pathPattern: '/checkout',
    seo: {
      title: 'Finalizar Compra',
      description:
        'Finalize sua compra com segurança na StoreLab. Pagamento disponível via Cartão de Crédito, PIX e Boleto Bancário.',
      ogTitle: 'Finalizar Compra',
      ogDescription: 'Ambiente seguro e criptografado para conclusão do seu pedido.',
      ogType: 'website',
    },
  },
  {
    pathPattern: '/produto/:slug',
    seo: {
      title: 'Produto',
      description:
        'Confira especificações técnicas, fotos em alta resolução, avaliações e condições especiais de pagamento na StoreLab.',
      ogTitle: 'Produto',
      ogType: 'product',
    },
  },
  {
    pathPattern: '/perfil',
    seo: {
      title: 'Meu Perfil',
      description:
        'Gerencie seus dados de cadastro, endereços de entrega, cartões de crédito e histórico de compras na StoreLab.',
      ogTitle: 'Meu Perfil',
      ogDescription: 'Painel do cliente StoreLab para gestão de conta e pedidos.',
      ogType: 'website',
    },
  },
  {
    pathPattern: '/perfil/:userName',
    seo: {
      title: 'Meu Perfil',
      description:
        'Gerencie seus dados de cadastro, endereços de entrega, cartões de crédito e histórico de compras na StoreLab.',
      ogTitle: 'Meu Perfil',
      ogDescription: 'Painel do cliente StoreLab para gestão de conta e pedidos.',
      ogType: 'website',
    },
  },
  {
    pathPattern: '/login',
    seo: {
      title: 'Entrar',
      description:
        'Faça login na sua conta StoreLab para gerenciar seus pedidos, endereços e compras com rapidez e segurança.',
      ogTitle: 'Entrar',
      ogDescription: 'Acesse sua conta para conferir seus pedidos e ofertas exclusivas na StoreLab.',
      ogType: 'website',
    },
  },
  {
    pathPattern: '/cadastro',
    seo: {
      title: 'Criar Conta',
      description:
        'Cadastre-se na StoreLab e tenha acesso a produtos com tecnologia de ponta, cupons exclusivos e entrega ágil.',
      ogTitle: 'Criar Conta',
      ogDescription: 'Crie sua conta na StoreLab e comece a comprar com vantagens especiais.',
      ogType: 'website',
    },
  },
];

export function checkRouteSEO(pathname: string): SEOOptions | null {
  for (const item of ROUTE_SEO_CONFIG) {
    const match = matchPath({ path: item.pathPattern, end: true }, pathname);
    if (match) {
      return item.seo;
    }
  }
  return null;
}
