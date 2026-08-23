# Registro de Evolução e Valor Arquitetural - StoreLab V2

## 1. Contexto e Motivação da Evolução
O StoreLab V1 (versão legada) acumulou débitos técnicos significativos relacionados ao acoplamento de estado reativo, falta de modularidade e redundâncias na camada de renderização, impactando a latência de carregamento e dificultando a manutenção do código. 

Este documento descreve as decisões de engenharia que adotei para reestruturar o StoreLab V2, transformando-o em um simulador robusto de alto desempenho, com separação rígida de responsabilidades e código estritamente tipado.

---

## 2. Decisões de Engenharia e Migração Arquitetural (V1 vs. V2)

### 2.1 Otimização da Infraestrutura e Ferramental de Build
- **Antes (V1):** A aplicação utilizava o framework Next.js configurado essencialmente para execução client-side, o que adicionava sobrecarga de bundles e tempos de carregamento desnecessários para um simulador focado na experiência de interface.
- **Agora (V2):** Substituí o Next.js pelo ecossistema Vite integrado ao React 19.
- **Impacto:** Otimização drástica no tamanho do bundle final e inicialização instantânea da aplicação em ambiente local e de preview.

### 2.2 Isolamento de Regras Estéticas e Co-localização
- **Antes (V1):** As definições visuais (estilos e espaçamentos) eram declaradas diretamente na árvore JSX dos componentes, poluindo o código e inviabilizando a consistência visual em novas implementações.
- **Agora (V2):** Separei completamente a estrutura lógica do layout de suas definições estéticas, isolando as regras em arquivos dedicados `NomeComponente.styles.ts` fortemente tipados com `SxProps<Theme>` do Material UI v7.
- **Impacto:** Garantia de conformidade com o Design System do projeto e maior agilidade na refatoração e manutenção estética de qualquer componente.

### 2.3 Segmentação e Desacoplamento de Estado Reativo (State Splitting)
- **Antes (V1):** O gerenciamento de estado era centralizado em um único provedor global (`GlobalStateContext`), provocando renderizações desnecessárias e lentidão em toda a árvore de componentes mediante qualquer alteração pontual (como digitação em campos de busca).
- **Agora (V2):** Dividi o estado unificado em 5 provedores isolados e de escopo único:
  1. **Autenticação (`AuthContext`):** Gerenciamento exclusivo do ciclo de vida e sessão do usuário.
  2. **Carrinho (`CartContext`):** Controle lógico de itens, quantidades e cálculos financeiros.
  3. **Checkout (`CheckoutContext`):** Orquestração dos passos de encerramento do pedido.
  4. **Interface (`UIStateContext`):** Estado de controles puramente cosméticos (filtros e buscas).
  5. **Agregador (`AppStateContext`):** Responsável por injetar de forma hierárquica os provedores através do padrão Facade.
- **Impacto:** Otimização da reatividade e eliminação total de redesenhos redundantes nas telas.

### 2.4 Abstração da Camada de Persistência (Data Access Layer)
- **Antes (V1):** Os componentes de interface manipulavam diretamente APIs imperativas do navegador (como `localStorage`), misturando responsabilidades visuais com regras de gravação física de dados.
- **Agora (V2):** Criei uma camada de serviços dedicada (`cartService.ts` e `authService.ts`) que encapsula e padroniza as operações de leitura e persistência.
- **Impacto:** Blindagem da UI contra falhas de persistência e facilitação da substituição do `localStorage` por APIs assíncronas reais (como fetch ou axios) no futuro, sem impacto nos componentes.

---

## 3. Implementação Centralizada de Regras de Negócio
Para evitar divergências financeiras, centralizei as regras lógicas comerciais no escopo dos serviços e contextos do simulador:
- **Promoções de Cupom:** Validação automática e determinística das chaves `LAB10` ou `STORELAB10`, aplicando o desconto de 10% diretamente sobre o valor total bruto dos produtos do carrinho.
- **Políticas de Envio:** Definição automática de frete fixo de 39.90, convertendo-se em isenção automática (frete grátis) sempre que o subtotal ultrapassar o teto de 1500.00.

---

## 4. Garantia de Estabilidade e Proteção Contra Regressões
- **Testes Automatizados:** Criei uma suíte abrangente de testes sob o diretório `/src/__tests__/` utilizando Jest e React Testing Library (RTL). Eles simulam interações do usuário e cobrem fluxos críticos como login, registro, adição de produtos e cálculo de frete grátis.
- **Manual Preemptivo de Diretrizes (`/AGENTS.md`):** Estabeleci diretrizes severas na raiz do projeto para assegurar que futuras implementações e assistentes automatizados de IA respeitem a arquitetura adotada, prevenindo regressões de design e acoplamento.

---

## 5. Refinamentos Recentes e Otimização da Experiência (StoreLab V2)

### 5.1 Algoritmo de Busca por Equivalência e Sinônimos de Categoria
- **Aprimoramento da Busca (`searchUtils.ts`):** Reformulação completa da lógica de filtragem de produtos, eliminando correspondências falsas-positivas resultantes de substring bidirecional.
- **Mapeamento Semântico (`CATEGORY_SYNONYMS`):** Criação de dicionário de sinônimos por categoria (mapeando "Móveis / Office" para `escritório`, `escritórios`, `home office`, `workstation`, etc.), garantindo que buscas por termos equivalentes retornem a totalidade dos produtos do departamento.
- **Normalização e Stemming:** Normalização de caracteres acentuados, tratamento de plural/singular e imunidade a erros de digitação (fuzzy Levenshtein).

### 5.2 Limpeza e Dados de Teste no Rodapé (`Footer.tsx`)
- **Higienização de Código:** Remoção de comentários redundantes na estrutura JSX do componente `Footer.tsx`.
- **Padronização de Contatos para Homologação:** Definição de telefone de suporte (`(99) 99999-9999`) e e-mail (`teste@teste.com`) com formato explícito de ambiente de teste/sandbox.

### 5.3 Otimização do Fluxo de Carrinho Vazio (`CartPage.tsx`)
- **Foco em Conversão e Usabilidade:** Remoção de cabeçalhos redundantes e blocos de benefícios duplicados quando o carrinho está zerado.
- **Interface Enxuta:** Centralização exclusiva no card modal interativo que orienta o usuário diretamente a explorar o catálogo de produtos.

---

## 6. Conclusão e Próximos Passos
O StoreLab V2 consolida a estrutura de front-end do e-commerce com estados desacoplados, busca inteligente por sinônimos, rotas protegidas e dados padronizados. Com a camada de interface e os serviços de dados organizados, o projeto está pronto para a integração com as rotas do servidor de backend.
