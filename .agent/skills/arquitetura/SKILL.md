# Habilidade: Arquitetura StoreLab

Esta skill orienta o modelo de IA local a tomar decisões de arquitetura e design de código que respeitem o ecossistema React 19 + TypeScript + Material UI v7.

---

## Passo a Passo de Decisão

### 1. Triagem de Componentes
* O componente será usado apenas nesta tela? -> Crie dentro de `/src/pages/<Pagina>/Componente.tsx`.
* O componente será compartilhado por duas ou mais telas independentes? -> Crie em `/src/components/Componente/Componente.tsx`.

### 2. Estilização Centralizada
* Crie sempre o arquivo colocalizado `Componente.styles.ts`.
* Importe `SxProps<Theme>` do `@mui/material`.
* Exporte um objeto tipado `export const styles: Record<string, SxProps<Theme>> = { ... }`.

### 3. Gestão de Estado
* Estado puramente visual da tela? -> `useState` ou hook local na pasta `/hooks/` da própria página.
* Estado compartilhado de domínio da loja (carrinho, autenticação, checkout)? -> Utilize o contexto correspondente em `/src/context/` desacoplado.

### 4. Persistência e Integrações
* Nunca realize chamadas a APIs ou `localStorage` dentro do corpo do componente ou de um `useEffect`.
* Delegue a operação para uma função exportada em `/src/services/<dominio>Service.ts`.
