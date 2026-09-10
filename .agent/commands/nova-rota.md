# Comando: Nova Rota

Instrução operacional para a criação de novas páginas e rotas no StoreLab seguindo as convenções de roteamento amigável e componentização.

---

## Parâmetros de Entrada
* `NomeDaPagina`: PascalCase (ex: `ProductDetail`, `Checkout`)
* `CaminhoDaRota`: kebab-case sem IDs técnicos (ex: `/produto/:slug`, `/rastreio`)

---

## Procedimento de Execução

1. **Criação do Diretório de Página**:
   Criar a pasta colocalizada `/src/pages/<NomeDaPagina>/` com:
   - `<NomeDaPagina>Page.tsx`
   - `<NomeDaPagina>Page.styles.ts`
   - Subcomponentes exclusivos da página diretamente na mesma pasta.

2. **Registro de Rota em `/src/App.tsx`**:
   - Adicionar o import da nova página no topo de `/src/App.tsx`.
   - Adicionar a rota dentro do `<Routes>` do `react-router-dom`.
   - Garantir que a URL utilize slugs semânticos e não IDs técnicos.

3. **Validação**:
   - Rodar validação de tipos TypeScript.
   - Confirmar que a página renderiza dentro do layout global com Header e Footer.
