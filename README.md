# Store-lab e-Commerce

## 🌐 Link do Site
Acesse a aplicação publicada em produção:
* **Produção:** [https://vercel.com/](https://vercel.com/)

## Como Rodar e Acessar o Projeto

Este projeto utiliza o ambiente moderno de desenvolvimento em React com TypeScript. Siga os passos abaixo para executá-lo em sua máquina local:

### Pré-requisitos
* **Node.js** (versão 18 ou superior recomendado)
* **npm** (gerenciador de pacotes do Node)

### Passo a Passo para Inicialização

1. **Instalar Dependências**
   Instale todas as dependências declaradas no projeto executando no seu terminal:
   ```bash
   npm install
   ```

2. **Iniciar o Servidor de Desenvolvimento**
   Execute o script de desenvolvimento para iniciar a aplicação:
   ```bash
   npm run dev
   ```

3. **Acessar a Aplicação**
   Por padrão, a aplicação estará exposta no endereço abaixo. Abra seu navegador de preferência e acesse:
   * **URL:** [http://localhost:3000](http://localhost:3000)

---

## Explicação do Projeto

O **Store-lab e-Commerce** é uma plataforma moderna e completa de comércio eletrônico, projetada para oferecer uma experiência de compra ágil, segura e fluida em quatro grandes departamentos: **Eletrônicos, Escritório, Moda Esportiva e Cuidados & Beleza**.

O aplicativo apresenta uma interface elegante, com foco em usabilidade, animações fluidas e fluxos de compras integrados:

### 🛍️ Funcionalidades e Telas Principais

1. **Vitrine Digital (`HomeView`)**:
   * Ampla lista de produtos organizados com imagens de alta qualidade.
   * Filtros inteligentes por Categorias (Eletrônicos, Escritório, Moda Esportiva e Cuidados & Beleza) e busca textual instantânea.
   * Banner rotativo dinâmico destacando promoções e ofertas especiais.

2. **Ficha de Detalhes do Produto (`ProductDetailView`)**:
   * Detalhamento estruturado das características do produto, preços, avaliações e opiniões de clientes.
   * Módulo de avaliações formatado com visualização de barras de porcentagem por quantidade de estrelas.
   * Galeria de fotos responsiva e seletor de quantidades para adicionar produtos livremente ao carrinho.

3. **Carrinho Híbrido (`CartView`)**:
   * **Fluxo de Convidado:** Permite adicionar itens ao carrinho livremente sem necessidade de cadastro imediato.
   * **Autenticação Obrigatória no Checkout:** Ao finalizar a compra no carrinho, caso o usuário não esteja autenticado, um diálogo amigável é exibido para solicitar o login ou cadastro de conta.
   * **Sincronização Inteligente:** Consolida e vincula automaticamente os produtos do carrinho à conta do usuário no momento em que ele faz login ou cadastro.
   * Persistência garantida localmente com `localStorage` para manter os itens salvos ao atualizar ou retornar ao site.

4. **Autenticação Segura (`LoginView` & `RegisterView`)**:
   * Telas de login e cadastro intuitivas, polidas e otimizadas para conversão.
   * Formulários modernos com validação dinâmica de campos.

5. **Portal do Cliente (`ProfileView`)**:
   * Painel geral para atualizar dados cadastrais e de entrega.

### 🛠️ Decisões de Arquitetura e Engenharia

* **Single-Page Application (SPA) em React**: Navegação instantânea e suave entre as visões com roteamento interno eficiente.
* **Componentização Reutilizável**: UI organizada e modular (carrinho, cartões de produtos, rodapé e cabeçalho dinâmicos).
* **Identidade Visual Personalizada**: Uso consistente do logo com ícone de frasco de laboratório (`FlaskConical`) e paleta de cores moderna (azul e ardósia) configurada sob o Material-UI.
* **Camada de Estado Centralizada (React Context)**: Sincronização em tempo real de produtos, carrinho, status de autenticação e fluxos de usuário.
* **MUI (Material-UI)**: Design system robusto, garantindo consistência visual, total responsividade em smartphones, tablets e desktops, além de ótimos padrões de acessibilidade.
* **Formik & Yup**: Gerenciamento de formulários e validações de dados limpos, declarativos e consistentes.

---

## 📸 Créditos das Imagens

Para garantir uma interface visual de altíssimo nível, profissional e sem a necessidade de armazenar arquivos estáticos pesados dentro do repositório, o **Store-lab** utiliza imagens dinâmicas e de alta resolução obtidas de forma determinística diretamente do **[Unsplash](https://unsplash.com)**.

Cada produto e categoria faz uso de fotografias profissionais licenciadas gratuitamente para uso comercial pela plataforma Unsplash:
* **Eletrônicos**: Imagens de smartphones, fones de ouvido e smartwatches de alta tecnologia.
* **Escritório**: Estações de trabalho minimalistas, cadeiras ergonômicas e luminárias elegantes.
* **Moda Esportiva**: Roupas e calçados esportivos premium com alta definição de detalhes.
* **Cuidados & Beleza**: Produtos estéticos, séruns faciais, velas perfumadas e kits de skincare refinados.

