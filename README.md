# StoreLab e-Commerce

O **StoreLab** é uma plataforma de comércio eletrônico (e-commerce), projetada com foco em experiência do usuário, clareza de interface e alta performance de navegação.

Com uma interface responsiva e minimalista, a aplicação cobre quatro departamentos comerciais: **Eletrônicos, Escritório, Moda Esportiva e Cuidados & Beleza**.

---

## Como Executar o Projeto Localmente

Siga os passos abaixo para executar a aplicação em ambiente local:

### Pré-requisitos
* **Node.js** (versão 18 ou superior)
* **npm** (gerenciador de pacotes)

### Passo a Passo
1. **Instalar Dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o Servidor de Desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Acessar a Aplicação**:
   * **URL**: [http://localhost:3000](http://localhost:3000)

---

## Principais Funcionalidades

* **Vitrine e Busca**: Catálogo completo com busca textual em tempo real e ordenação por categorias.
* **Detalhes do Produto**: Visualização de imagens, especificações técnicas e avaliações de compradores.
* **Carrinho de Compras**: Gestão de quantidades com limite de estoque e barra de progresso para frete grátis.
* **Checkout Integrado**: Etapas claras para seleção de endereços, cartões de crédito, PIX com desconto e boleto.
* **Painel do Cliente**: Gestão de dados pessoais, foto de perfil, cartões, endereços salvos e histórico de pedidos.
* **Rastreamento Logístico**: Consulta de entregas com proteção de dados pessoais (LGPD).

---

## Documentação (`/docs`)

O repositório possui documentação detalhada sobre a estrutura e o histórico de evolução do projeto:

* **[Arquitetura do Sistema (`/docs/arquitetura.md`)](docs/arquitetura.md)**: Topologia do repositório, convenções de estilo (`.styles.ts`) com Material UI v7, estado reativo e desacoplamento de serviços.
* **[Histórico de Alterações (`/docs/feature-logs/`)](docs/feature-logs/)**: Registro detalhado das melhorias, correções de bugs e refatorações realizadas nas funcionalidades da aplicação.

---

## Padrões de Desenvolvimento

O repositório adota um fluxo de controle e desenvolvimento orientado a especificações (Spec-Driven):

* **[AGENTS.md](AGENTS.md)**: Ponto central de diretrizes operacionais, regras de engenharia e postura técnica.
* **`.agent/`**: Regras de arquitetura (`rules/`), papéis de revisão (`agents/`) e checklists de verificação (`verify/`).
* **`.spec/`**: Especificações técnicas e tarefas para funcionalidades (`features/`).
