# StoreLab V2 - Diretrizes para Agentes de IA (AGENTS)

Este arquivo define as instruções mandatórias para qualquer agente de IA que atue neste repositório. Ele age como a Fonte Única de Verdade de Instruções e Práticas para garantir integridade arquitetural e evitar regressões.

---

## Diretriz Crítica: Consulta Obrigatória à Arquitetura (Passo 0)
Antes de realizar qualquer alteração de código (seja correção, refatoração ou nova funcionalidade), você DEVE obrigatoriamente ler e analisar os arquivos de documentação para guiar a implementação:
*   `/docs/arquitetura.md`
*   `/docs/roadmap.md`

Esta consulta é um pré-requisito indispensável. Se a tarefa envolver criação ou modificação de componentes, contextos de estado, serviços de dados ou persistência, siga rigorosamente as diretrizes de baixo acoplamento, componentização e a divisão de responsabilidades descritas em `/docs/arquitetura.md`. Não pule esta etapa em nenhuma circunstância.

---

## Stack Tecnológica Consolidada
O projeto utiliza exclusivamente as seguintes ferramentas:
*   Core: React 19 + TypeScript 5
*   Roteamento: React Router (BrowserRouter)
*   Interface: Material UI (MUI) v7
*   Formulários: Formik + Yup
*   Testes: Jest + React Testing Library (RTL)
*   Persistência: LocalStorage (Via serviços desacoplados em /src/services/)

---

## Diretrizes de Organização de Código

### 1. Componentização e Co-localização
*   Componentes e estilos exclusivos de uma página devem residir no próprio diretório da página (ex: /src/pages/ProductDetail/ComponenteExclusivo.tsx).
*   Apenas componentes reaproveitados por duas ou mais páginas de domínios distintos devem ser promovidos para /src/components/.

### 2. Estilização Centralizada e Isolada (*.styles.ts)
*   Toda estilização deve ser isolada em arquivos colocalizados NomeComponente.styles.ts usando SxProps<Theme> do Material UI.
*   Estilos inline e o uso excessivo de propriedades sx no JSX são terminantemente proibidos.

---

## Diretrizes de Código e TypeScript
*   Tipagem Forte (Zero any): O uso de any é proibido. Utilize as interfaces de /src/types.ts.
*   Nomenclatura:
    *   Componentes/Páginas: PascalCase (ex: ProductCard.tsx).
    *   Hooks Customizados: camelCase iniciado com use (ex: useDebounce.ts).
    *   Estilos: NomeComponente.styles.ts.
