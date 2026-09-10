# Guia de Arquitetura e Engenharia de Software - StoreLab

Este documento detalha o mapa estrutural, os padrões de engenharia e as diretrizes arquiteturais que regem o ecossistema do **StoreLab**. A arquitetura foi desenhada com base em separação de conceitos, baixo acoplamento, alta coesão, simetria geométrica e estrita tipagem estática.

---

## 1. Topologia do Repositório

```txt
storelab/
├── .agent/              # Camada de controle e regras para automação de código
│   ├── agents/          # Personas de auditoria técnica (ex: revisor-arquitetura)
│   ├── commands/        # Procedimentos operacionais padronizados (nova-rota, nova-feature)
│   ├── rules/           # Regras mandatórias de código e isolamento de escopo
│   ├── skills/          # Habilidades de engenharia (spec-driven, arquitetura)
│   └── verify/          # Critérios formais do gate mecânico de compilação e qualidade
├── .spec/               # Memória técnica e especificações formais de produto
│   └── features/        # Diretórios por funcionalidade contendo spec.md e tasks.md
├── docs/                # Documentação técnica perene e histórico de decisões
│   ├── feature-logs/    # Registro cronológico de refatorações e auditorias
│   └── arquitetura.md   # Este documento
├── src/                 # Código-fonte da aplicação front-end (React 19 + TypeScript)
│   ├── assets/          # Recursos visuais estáticos
│   ├── components/      # Componentes compartilhados por 2 ou mais telas
│   ├── constants/       # Constantes globais e valores fixos
│   ├── context/         # Provedores de estado reativo segmentado (State Splitting)
│   ├── hooks/           # Ganchos de ciclo de vida e lógicas utilitárias reutilizáveis
│   ├── layout/          # Molduras estruturais globais (Header, Footer, MainLayout)
│   ├── mocks/           # Base mockada de catálogo e dados operacionais
│   ├── pages/           # Telas colocalizadas com estilos isolados (*.styles.ts)
│   ├── router/          # Configurações de rotas limpas (URLs amigáveis por slugs)
│   ├── schemas/         # Esquemas de validação declarativos (Formik + Yup)
│   ├── services/        # Camada desacoplada de dados e persistência (LocalStorage/API)
│   ├── utils/           # Funções puras utilitárias
│   ├── theme.ts         # Design system centralizado no Material UI v7
│   ├── types.ts         # Contratos e tipos estritos do TypeScript (Zero any)
│   ├── index.css        # Ponto de entrada de estilo global
│   └── main.tsx         # Entry-point da aplicação
├── AGENTS.md            # Ponto de ignição e diretrizes mandatórias para desenvolvimento
└── package.json         # Dependências do projeto e scripts de compilação
```

---

## 2. Pilares de Desenvolvimento e Responsabilidade

### 2.1 `/src/context/` (Divisão de Estados e Performance)
Para mitigar re-renderizações (re-renders) desnecessárias, adotamos a técnica de **State Splitting** (Divisão de Estados). Em vez de centralizar dados em um único provider pesado, a aplicação divide-se em pequenos provedores de estado altamente especializados:
* **`AuthContext`**: Gerencia autenticação do cliente, sessões e persistência de dados de perfil.
* **`CartContext`**: Implementa regras de negócio financeiras exclusivas, aplicando de forma automatizada frete grátis para compras que excedam o limiar configurado (R$ 1.500,00) e calculando cupons válidos (ex: `LAB10` ou `STORELAB10`).
* **`CheckoutContext`**: Rege o progresso linear das telas de endereço e inserção de dados financeiros de pagamento.
* **`UIStateContext`**: Controla interações rápidas de interface, como a barra de busca flutuante global.
* **`AppStateContext`**: Atua sob o padrão *Fachada* (Facade), envelopando todos os provedores e simplificando a inicialização no entry-point do React.

### 2.2 `/src/services/` (Abstração e Desacoplamento)
Projetei uma camada dedicada de serviços (`cartService.ts`, etc.) para intermediar e blindar a interface do acesso direto à memória persistente do navegador (`localStorage`).
* **Contrato de Evolução**: Os componentes do React nunca realizam chamadas diretas ao `localStorage`. Caso o projeto migre no futuro para um banco de dados real com API REST (como NestJS + PostgreSQL), **somente** os arquivos dentro de `/src/services/` precisarão ser modificados. Todo o front-end permanecerá intacto.

### 2.3 `/src/pages/` (Princípio de Co-localização)
Cada página em `/src/pages/` é um ecossistema autossuficiente:
* Toda estilização local, subcomponentes e lógicas auxiliares exclusivas de uma página devem residir **estritamente dentro da sua própria pasta** (ex: `ProductReviews.tsx` dentro de `ProductDetail/`).
* Estilos locais são isolados em arquivos específicos `.styles.ts` fortemente tipados com `SxProps<Theme>` do Material UI v7. Estilos em linha (inline styles) ou uso abusivo de propriedades `sx` diretamente no JSX são terminantemente vetados para manter o código limpo e legível.

### 2.4 `/src/components/` (Simetria Visual e Reutilização)
Os elementos reutilizados por dois ou mais módulos distintos são promovidos para `/src/components/`.
* **Simetria de Grid**: Componentes alternativos (como o botão pontilhado de *"Adicionar Novo Endereço"* ou o de *"Inserir Novo Cartão"*) são construídos com flexbox verticalizado, forçando-os a esticar via Grid e assumir **exatamente a mesma altura e comportamento de borda** (raio de borda idêntico a `14px`) dos cartões preenchidos ao lado, garantindo harmonia geométrica.
* **Visual de Baixo Acoplamento**: Evitamos o acavalamento de bordas. No resumo financeiro de checkout, eliminamos linhas divisórias duplas ou redundantes em favor de um espaçamento natural e limpo.

---

## 3. Fluxo de Engenharia Orientado a Especificações (Spec-Driven)

Para novas funcionalidades e evoluções do sistema, o repositório segue um ciclo de 4 etapas atômicas:

1. **Especificação (`.spec/features/<feature>/spec.md`)**: Registro formal de contexto, problemas a resolver e critérios de aceitação.
2. **Decomposição em Tarefas (`tasks.md`)**: Quebra do escopo em passos atômicos e auditáveis.
3. **Execução Cirúrgica**: Modificações de código restritas ao escopo da tarefa, mantendo isolamento de estilos e tipagem estrita.
4. **Gate Mecânico de Validação**: Checagem de integridade via `tsc --noEmit` e `npm run build` antes de considerar a funcionalidade homologada.

---

## 4. Diretrizes de Segurança, UX e Código Limpo

1. **Sem Chaves Técnicas Relacionadas à Marca**: Conforme estabelecido no guia de conduta, o nome da marca (`StoreLab`) é reservado exclusivamente para textos de interface e marca. Identificadores técnicos, chaves de armazenamento de sessão e hashes no `localStorage` devem utilizar nomenclaturas genéricas de mercado (ex: `user_session`, `registered_users`).
2. **LGPD e Privacidade**: Nas páginas de acompanhamento (`/tracking`), dados altamente sensíveis do cliente (nomes, números e endereços) são camuflados de forma amigável para proteção no monitoramento público de entregas.
3. **URLs Amigáveis (Slugs)**: A rota de detalhes do produto utiliza slugs puros baseados no nome do item (ex: `/produto/cadeira-ergonomica-premium`), eliminando IDs numéricos artificiais da URL.
4. **Responsividade Total do Rodapé (Footer)**: Para garantir legibilidade em dispositivos móveis ultra-compactos, as colunas do rodapé mudam de largura para `xs: 12` no celular, gerando um empilhamento vertical sem esmagamentos ou truncamento de textos importantes.
5. **Tipagem Rígida (Strict TypeScript)**: O uso de tipo `any` é estritamente proibido. Todas as estruturas e payloads devem possuir contratos válidos no arquivo centralizado `src/types.ts`.
6. **Testes Sob Demanda**: A criação de testes automatizados ocorre estritamente de forma reativa após validação manual e homologação da interface.

---

## 5. Conclusão

Esta arquitetura reflete práticas de engenharia consolidadas para ecossistemas React modernos. O front-end encontra-se estabilizado, com responsabilidades delimitadas, fluxo Spec-Driven ativo e pronto para futura integração com a API de back-end.
