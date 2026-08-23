# Guia de Arquitetura e Estrutura de Pastas - StoreLab V2

Este documento detalha o mapa estrutural e os padrões arquiteturais que regem o **StoreLab V2**. Projetei cada módulo do diretório `/src/` para atuar de forma independente, garantindo baixo acoplamento, alta coesão e facilidade de manutenção para qualquer escala de projeto.

---

## 1. Topologia de Pastas (`/src/`)

```txt
src/
├── __tests__/         # Garantia de integridade e testes automatizados
├── components/        # Componentes de interface compartilhados e genéricos
├── context/           # Gerenciamento de estado reativo segmentado
├── hooks/             # Funções utilitárias e lógicas de interface (hooks)
├── layout/            # Estrutura visual global da aplicação (molduras)
├── mocks/             # Dados estáticos para simulação de catálogo e avaliações
├── pages/             # Telas principais e seus componentes locais
├── router/            # Configurações de rotas e segurança de acessos
├── schemas/           # Esquemas de validação de formulários de entrada
├── services/          # Camada isolada de persistência e operações de dados
├── theme.ts           # Definição e padronização do Design System
├── types.ts           # Contratos e modelagem de tipos globais
└── main.tsx           # Ponto de entrada e inicialização do sistema
```

---

## 2. Detalhamento e Responsabilidade de Cada Módulo

### 2.1 `/src/context/` (Gerenciamento de Estado Reativo)
Nesta pasta, isolei o fluxo de estados utilizando a técnica de *State Splitting* (Divisão de Estados). Em vez de manter um único contexto global sobrecarregado, dividi as responsabilidades em pequenos provedores de estado altamente especializados. Essa decisão impede redesenhos (re-renders) em cascata desnecessários em toda a aplicação.
- **`AuthContext`:** Centraliza o ciclo de vida do usuário, dados de sessão e perfil.
- **`CartContext`:** Executa todas as regras comerciais e cálculos financeiros (como a validação centralizada dos cupons `LAB10`/`STORELAB10` e a aplicação automática de frete grátis para compras acima de 1500.00).
- **`CheckoutContext`:** Monitora o progresso das etapas de finalização e envio de pedidos.
- **`UIStateContext`:** Gerencia estados puramente visuais e interativos de curta duração, como o valor da busca textual global.
- **`AppStateContext`:** Atua sob o padrão *Fachada* (Facade), agrupando todos os contextos de forma hierárquica no ponto de entrada do sistema.

### 2.2 `/src/services/` (Abstração e Persistência)
Camada responsável por desacoplar a interface das origens físicas de armazenamento. O arquivo `cartService.ts` gerencia as operações de leitura, gravação e sincronização do carrinho de compras diretamente no `localStorage` de forma genérica.
- **Princípio de Evolução:** Ao centralizar o acesso aos dados nesta camada, garanto que a interface nunca acesse a memória do navegador de forma direta. Caso a aplicação migre de um modelo simulado para um banco de dados real via API REST no futuro, apenas o serviço precisará ser alterado.

### 2.3 `/src/pages/` (Visualizações e Co-localização)
Mapeia os principais destinos de navegação da loja (página inicial, detalhes do produto, carrinho, autenticação e perfil). Adotei o princípio de *co-localização*, o que significa que estilos (`*.styles.ts`) e subcomponentes exclusivos de uma tela devem residir estritamente na própria pasta da página.

### 2.4 `/src/components/` (Componentização Comum)
Reúne os elementos de interface comuns que são reutilizados em mais de um domínio (como o `ProductCard` ou o `BrandLogo`).
- **Regra de Promoção:** Componentes nascem localmente em suas respectivas páginas e só são movidos para `/src/components/` quando é comprovada a necessidade de reaproveitamento em múltiplos fluxos de navegação. Toda a estilização de componentes é isolada em arquivos próprios `*.styles.ts` fortemente tipados com `SxProps<Theme>` do Material UI v7.

### 2.5 `/src/__tests__/` (Validação de Regras de Negócio)
Uma suíte completa de testes de unidade e integração escrita sob a biblioteca Jest e React Testing Library (RTL). Ela garante que alterações futuras de layout não quebrem de forma silenciosa regras cruciais de comportamento da aplicação, como regras financeiras de cupons, políticas de desconto e autenticação de usuários.

### 2.6 `/src/schemas/` (Regras de Validação de Dados)
Contém os objetos de validação lógica criados através de Formik e Yup. Eles agem de forma declarativa para validar o formato de entradas em tempo real nos formulários de cadastro de novos clientes e login (`LoginPage` e `RegisterPage`), assegurando consistência nas informações recebidas pelo sistema.

### 2.7 `/src/types.ts` e `/src/theme.ts` (Segurança e Consistência de Design)
- **`types.ts`:** Centraliza as interfaces de dados unificadas do TypeScript, mantendo tipagem estrita (zero `any`) sobre entidades como produtos, usuários e carrinho de compras.
- **`theme.ts`:** Define a folha de estilo oficial e as configurações de tokens de design do Material UI v7 (tipografias, raios de borda e paletas de cores neutras), blindando a aplicação contra variações de layout.

---

## 3. Conclusão da Filosofia de Desenvolvimento
Projetei a arquitetura do StoreLab V2 de forma imparcial e rigorosa, espelhando os melhores padrões de engenharia de software do ecossistema React. A separação clara entre a interface visível, as regras financeiras centrais e a camada de serviços elimina a improvisação e fornece uma base estável, escalável e de alto desempenho comercial.
