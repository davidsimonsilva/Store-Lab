# Registro de Alterações e Novas Funcionalidades (Feature Change)

Este documento descreve de forma simples e direta as melhorias visuais, de usabilidade e as novas funcionalidades implementadas no site.

---

## 1. Melhorias de Design e Usabilidade

*   **Banner Principal Responsivo**: O carrossel da página inicial foi ajustado para exibir imagens e textos perfeitamente em celulares e tablets. Aumentamos os botões de paginação para facilitar o toque e estabilizamos a posição do botão de compra para evitar quebras visuais.
*   **URLs Amigáveis de Produtos (Clean Slugs)**: Simplificamos o formato das URLs de produtos. Elas agora contêm apenas o nome descritivo amigável (ex: `/produto/kit-social-de-cadeiras-de-descanso-de-escritorio`), ocultando o ID técnico final do produto para uma navegação limpa, mantendo total compatibilidade retroativa para links antigos.
*   **Hierarquia de Valores no Carrinho**: O resumo de valores do carrinho foi reorganizado de forma lógica (Subtotal -> Frete/Cupom -> Total Geral), melhorando a leitura rápida dos custos antes da finalização da compra.
*   **Visualização Padronizada (PageContainer)**: Todas as telas principais do site agora compartilham a mesma estrutura visual, com espaçamentos harmoniosos e um fundo suave para destacar os produtos.
*   **Alinhamento e Simetria no Checkout**: Redesenhamos os botões de *"Adicionar Novo Endereço"* e *"Inserir Novo Cartão"* para que tenham exatamente o mesmo tamanho e comportamento responsivo das opções preenchidas ao lado. Removemos o ícone supérfluo de `+` do card de cartão, mantendo apenas a bola de seleção para um fluxo limpo e focado.
*   **Remoção de Linhas Duplas no Resumo**: Eliminamos a linha superior das opções de entrega na barra lateral de checkout, garantindo uma transição fluida, espaçada e sem poluição visual.
*   **Harmonização de Rodapé (Footer) e Cabeçalho**: Atualizamos a cor de fundo do rodapé global para a mesma cor do cabeçalho (`background.paper` / branco puro), criando uma moldura visual elegante e consistente em todo o site. Adicionalmente, otimizamos a grade de exibição do rodapé em dispositivos móveis, alterando a largura de `xs: 6` para `xs: 12` nas colunas de *"Categorias"* e *"Institucional & Ajuda"*, fazendo com que empilhem verticalmente de forma legível e sem esmagamento de texto.

---

## 2. Novas Funcionalidades de Checkout e Pagamento

*   **Unificação de Modais**: As janelas de confirmação de pagamento por Pix e Boleto foram simplificadas e agora utilizam um único componente padrão, garantindo a mesma aparência e facilidade de fechamento.
*   **Simulação de Frete Inteligente**: Implementamos uma calculadora de frete mais realista na página do produto e no carrinho, baseada na distância real a partir de São Paulo. Ela oferece as modalidades de "Envio Padrão" e "Envio Expresso", com prazos e valores condizentes, além de conceder frete grátis em compras acima de R$ 1.500,00.

---

## 3. Experiência e Painel do Cliente (Perfil)

*   **Toasts Globais**: Criamos um sistema único de avisos na tela (toasts) que substitui as notificações antigas, dando feedback imediato ao usuário sobre ações de login, cadastro ou atualizações de dados.
*   **Troca de Foto de Perfil**: O usuário agora pode clicar diretamente na sua foto de perfil para escolher um novo avatar interativo.
*   **Confirmação de Ações de Exclusão**: Para evitar remoções acidentais, o sistema agora exibe um aviso de confirmação antes de apagar endereços ou cartões cadastrados.

---

## 4. Avaliações de Produtos (Reviews)

*   **Selo de Compra Verificada**: O site agora exibe de forma automática o selo de "Compra Verificada" para usuários que de fato adquiriram e receberam aquele item.
*   **Controle e Edição**: Cada cliente autenticado pode enviar apenas uma avaliação por produto (com limite de 255 caracteres e contador na tela). O usuário pode editar ou excluir sua própria avaliação a qualquer momento, com atualização em tempo real da média de estrelas do produto.

---

## 5. Rastreamento e Logística em Tempo Real (`/rastreio`)

*   **Consulta Direta**: Criamos uma página dedicada exclusivamente ao rastreamento de entregas. Basta inserir o código de rastreio para ver a evolução do pacote.
*   **URLs Limpas e Privadas**: A busca de pacotes agora é gerenciada de forma assíncrona por estado interno do React. O código de rastreamento pesquisado não é injetado na barra de endereços (mantendo a URL limpa como `/rastreio`), protegendo o código contra olhares indesejados ou históricos de navegação.
*   **Acompanhamento Logístico Realista**: A entrega é dividida em 4 etapas reais (Coleta no Centro de Distribuição, Trânsito, Chegada e Rota de Entrega Final) que atualizam o status automaticamente ao longo do tempo. Quando a entrega é concluída, o status do pedido também é atualizado na aba "Meus Pedidos" do usuário.
*   **Privacidade Garantida (LGPD)**: O rastreamento público oculta intencionalmente dados sensíveis do comprador (como nome, CPF, endereço completo, itens comprados ou valores de pagamento), exibindo apenas o status da entrega e a cidade de destino.

---

## 6. Ajuda, Suporte e Políticas Institucionais

*   **Central de Dúvidas (FAQ)**: Adicionamos uma página de perguntas frequentes dividida em categorias organizadas (como Pagamentos, Frete, Cupons e Devoluções) com barra de pesquisa para localização rápida.
*   **Termos e Privacidade**: Links oficiais para as páginas e termos de uso do site foram adicionados e vinculados diretamente ao rodapé global.
