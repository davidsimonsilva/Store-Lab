# Roadmap de Desenvolvimento e Rotas de Futuro - StoreLab V2

Este documento estabelece as diretrizes estratégicas e as rotas tecnológicas futuras para o StoreLab V2. Ele reúne o planejamento sequencial do sistema focado no valor de dados antes da conversão, integrando as metas técnicas diretamente aos fluxos de negócios.

---

## Visao Geral do Planejamento

O desenvolvimento futuro segue uma linha lógica em que dados estruturados e seguranca de perfil precedem e impulsionam o fluxo de compra. Os objetivos de refinamento técnico e arquitetura foram agrupados diretamente aos objetivos de experiência do usuário aos quais dão suporte, deixando o desenvolvimento mais consistente.

---

# OBJETIVOS INTEGRADOS (Fluxos e Suporte)

## 1. Onboarding Eficiente e Integridade de Dados
Priorizar a captação de dados limpos do cliente antes de qualquer fluxo de checkout para garantir o faturamento seguro e evitar abandonos ou paradas na hora do pagamento.

*   **Objetivos Principais:**
    *   **Coleta de CPF no Cadastro:** Mover a inserção de CPF das configurações do perfil diretamente para o formulário de cadastro (RegisterPage).
    *   **Validação do CPF:** Implementar validação do algoritmo matemático de dígitos verificadores do CPF usando Yup no arquivo /src/schemas/authSchemas.ts.
    *   **Política de Senhas Forte e Validação em Tempo Real:** Aplicar regras de complexidade para a senha no formulário de cadastro (Yup/Formik) exigindo no mínimo 10 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial (`@`, `$`, `!`, `%`, `*`, `#`, `?`, `&`).
    *   **Medidor de Força de Senha:** Exibir indicador visual de complexidade da senha em tempo real na tela de cadastro (RegisterPage).
    *   **Máscaras e Facilidade de Uso:** Garantir máscaras de entrada em tempo real para CPF (000.000.000-00) e formatos explícitos de e-mail e telefone.
*   **Objetivos Secundários de Suporte:**
    *   **Validação de Schemas no Jest:** Atualizar e ampliar a suíte de testes unitários do Jest para cobrir as novas validações e rejeições matemáticas de CPFs inválidos.

## 2. Expansão do Perfil do Usuário e Dados Estruturados
Enriquecer a base de dados do usuário no perfil, garantindo que o sistema possua todas as informações cruciais para faturamento e logística antes de iniciar um pedido.

*   **Objetivos Principais:**
    *   **Múltiplos Endereços Explícitos:** Permitir o cadastro detalhado de mais de um endereço de entrega (residencial, comercial) especificando CEP, Rua, Número, Bairro, Cidade, Estado e Complemento.
    *   **Customização de Avatar/Ícone de Perfil:** Permitir a escolha de avatares/ícones ilustrativos do perfil para melhor engajamento visual.
    *   **Histórico e Status de Pedidos:** Tela de acompanhamento de compras passadas categorizadas por status (Processando, Enviado, Entregue).
    *   **Modularização e Redução da Carga de Código:** Refatorar arquivos monolíticos extensos (como `ProfilePage.tsx`, atualmente com 700+ linhas) dividindo a página em subcomponentes isolados e colocalizados por aba/seção (ex: `ProfileAddresses.tsx`, `ProfileOrders.tsx`, `ProfileAvatar.tsx`), garantindo legibilidade, facilidade de manutenção e baixo acoplamento.
*   **Objetivos Secundários de Suporte:**
    *   **Desacoplamento de Persistência:** Isolar o acesso ao localStorage referente aos dados de múltiplos endereços e avatar dentro de serviços específicos em /src/services/ (evitando acessos diretos dos componentes).

## 3. Cartões de Crédito e Sandbox de Pagamento
Funciona como o intermédio entre os dados ricos do perfil e a conclusão física do fluxo de compra.

*   **Objetivos Principais:**
    *   **Carteira de Cartões Salvando com Segurança:** Permitir o cadastro e gerenciamento de cartões de crédito fictícios dentro do perfil para uso rápido no checkout.
    *   **Validação Algorítmica (Luhn):** Aplicar a validação matemática de Luhn para números de cartão e identificar bandeiras automaticamente com base nos primeiros dígitos.
    *   **Simulador de Gateway (Sandbox):** Implementação de respostas dinâmicas baseadas em cartões de teste:
        *   **Cartão de Sucesso:** Aprovação instantânea que direciona à tela de sucesso.
        *   **Cartão de Recusa:** Simulação de falta de saldo ou crédito negado, emitindo alerta visual elegante.
        *   **Cartão de Timeout/Erro Técnico:** Simulação de queda de comunicação para testar a resiliência de re-tentativa na interface.
*   **Objetivos Secundários de Suporte:**
    *   **Padronização de Estilos de Cartão:** Migrar todos os estilos visuais de componentes de cartões de crédito e carteira para arquivos isolados *.styles.ts* usando SxProps do Material UI.

## 4. Fluxo de Compra e Checkout de Ponta a Ponta
O fechamento da jornada. Agora que o usuário tem cadastro consistente (CPF), endereços válidos e cartões configurados, o checkout é realizado com agilidade e transparência.

*   **Objetivos Principais:**
    *   **Tela de Revisão do Pedido (Checkout Page):** Tela intermediária dedicada que impede a compra automática instantânea.
    *   **Seletores Logísticos e Financeiros:** Permitir escolher um dos endereços já salvos e um cartão já cadastrado no perfil, ou escolher Pix/Boleto.
    *   **Cálculo e Resumo Completo:** Detalhamento exato de itens, valor do frete e incidência de cupons ativos.
*   **Objetivos Secundários de Suporte:**
    *   **Centralização de Constantes:** Criar um arquivo centralizado /src/constants/index.ts contendo valores globais que apoiam as regras financeiras do checkout (ex: cupom padrão LAB10, custo fixo de frete 19.90, frete grátis a partir de 1500.00).

## 5. Engenharia de Qualidade (QA e Testes de Interface)
Garantir que as regras de negócio integradas e o funil completo de dados construídos acima funcionem perfeitamente em qualquer atualização futura.

*   **Objetivos Principais:**
    *   **Testes de Componentes e Fluxos de Interface com Jest + React Testing Library (RTL):** Automação e validação do funil de forma sequencial: Cadastro com CPF válido -> Login -> Gerenciamento de Endereços -> Inclusão no Carrinho -> Fluxo de Checkout -> Pagamento com Cartão Sandbox de Sucesso e de Erro.
*   **Objetivos Secundários de Suporte:**
    *   **Expansão do Jest:** Expandir os testes unitários de lógica do CartContext e CheckoutContext para certificar que o cálculo do carrinho está alinhado às constantes unificadas.

## 6. Diretrizes de Segurança e Proteção de Dados (Client-Side e LocalStorage)
Estabelecer critérios rígidos de segurança no navegador para proteger a integridade dos dados e preparar a aplicação para os padrões de produção, mesmo utilizando `localStorage`.

*   **Objetivos Principais:**
    *   **Política Rígida de Senhas (Requisitos Mínimos):**
        *   Tamanho mínimo de **10 caracteres**.
        *   Pelo menos **1 letra maiúscula** e **1 letra minúscula**.
        *   Pelo menos **1 número**.
        *   Pelo menos **1 caractere especial** (ex: `@`, `#`, `$`, `%`, `!`, `&`, `*`, `?`).
        *   Confirmação de senha obrigatória com validação de correspondência exata.
    *   **Não Armazenamento de Dados Sensíveis em Texto Puro:**
        *   **Cartões de Crédito:** Proibido armazenar o número completo e o CVV no `localStorage`. Armazenar apenas os últimos 4 dígitos (ex: `**** 1234`), nome impresso e bandeira para exibição visual.
        *   **Senhas:** Proibido salvar senhas em texto puro no storage local; utilizar hash de simulação no client-side durante a fase de protótipo.
    *   **Prevenção contra Injeção e XSS (Cross-Site Scripting):** Sanitizar todas as entradas de texto vindas do usuário (nome, endereço, complemento) antes da renderização e do salvamento local.
    *   **Tratamento Seguro de Leitura do Storage (Parsing Defensivo):** Implementar validação de schema e tratamento de exceção em todo `JSON.parse()` do `localStorage` para proteger a aplicação contra dados corrompidos ou alterados manualmente no DevTools do navegador.
    *   **Isolamento de Dados por Usuário:** Garantir que chaves de persistência no `localStorage` sejam escopadas pelo ID do usuário logado (ex: `storelab_addresses_<userId>`), impedindo vazamento de dados entre perfis no mesmo navegador.
*   **Objetivos Secundários de Suporte:**
    *   **Auditoria de Dependências:** Executar rotinas periódicas de `npm audit` e manter dependências atualizadas para prevenir vulnerabilidades de terceiros.
    *   **Requisitos para Transição ao Back-End:** Definir o uso de autenticação JWT com armazenamento seguro (cookies `HttpOnly` e `SameSite`) no momento da migração para a API Node.js.

---

# OBJETIVO DE VIRADA: Planejamento do Back-End Node.js

Esta etapa marca a transição da aplicação de um modelo client-side estático para uma arquitetura full-stack integrada. O desenvolvimento do servidor terá início assim que todo o ecossistema do front-end e suas regras de interface estiverem 100% concluídos, testados e validados pela suíte de testes do Jest e RTL.

### Por que iniciar o Back-End somente ao fim do Front-End?
1. **Garantia de Payloads Estáveis:** Com o front-end validado, sabemos exatamente quais dados e formatos o back-end precisará receber e salvar (ex: o formato do CPF higienizado, a estrutura de múltiplos endereços e as flags de transação do sandbox).
2. **Facilidade de Integração:** Substituir as chamadas isoladas que hoje utilizam localStorage por requisições assíncronas reais (axios ou fetch) será extremamente simples e direto, já que os dados estarão completamente desacoplados em serviços.

### O que o Planejamento do Back-End irá cobrir quando iniciado:
*   Mapeamento de rotas unificadas para /api/auth (com JWT persistente real), /api/profile, /api/products e /api/orders.
*   Estruturação de banco de dados relacional e migrações para múltiplos endereços e pedidos históricos usando um ORM.
