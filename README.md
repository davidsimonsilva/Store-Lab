# 🧪 Store-lab

### E-commerce Sandbox para estudos, experimentação e evolução contínua

## 🌐 Aplicação

Acesse a versão publicada do projeto:

**Produção:** https://store-lab-six.vercel.app

---

# 🧪 Sobre o Projeto

O **Store-lab** é um laboratório de desenvolvimento criado para simular um e-commerce moderno utilizando tecnologias do ecossistema React.

O projeto foi concebido como um ambiente prático de aprendizado, experimentação e evolução contínua, onde novas funcionalidades, arquiteturas, integrações e boas práticas podem ser implementadas à medida que novos conhecimentos são adquiridos.

Diferentemente de uma loja virtual real, o foco principal do Store-lab é servir como um espaço seguro para validar ideias, testar abordagens técnicas e reproduzir desafios encontrados em aplicações de comércio eletrônico do mercado.

Todas as funcionalidades presentes possuem caráter educacional e experimental, sendo utilizadas para prática, estudo e aprimoramento técnico.

## 🎯 Objetivos

- Aplicar conhecimentos adquiridos em estudos e projetos pessoais.
- Simular cenários reais encontrados em plataformas de e-commerce.
- Evoluir continuamente a arquitetura da aplicação.
- Experimentar bibliotecas, ferramentas e padrões de desenvolvimento.
- Explorar boas práticas de Front-end moderno.
- Construir um projeto de longo prazo para aprendizado contínuo.
- Servir como portfólio técnico da evolução do desenvolvimento ao longo do tempo.

## 🚀 Conceitos Explorados

Ao longo da evolução do projeto, são explorados temas como:

- Autenticação e autorização de usuários.
- Gerenciamento de estado global.
- Fluxos de carrinho e checkout.
- Componentização e reutilização de código.
- Arquitetura Front-end escalável.
- Validação de formulários.
- Responsividade e acessibilidade.
- Integrações com APIs externas.
- Qualidade de código e boas práticas.
- Deploy e monitoramento de aplicações.

---

# Como Rodar o Projeto

Este projeto utiliza React + TypeScript e pode ser executado localmente seguindo os passos abaixo.

## Pré-requisitos

- Node.js (versão 18 ou superior recomendada)
- npm

## Instalação

Instale todas as dependências:

```bash
npm install
```

## Executando o Projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Acessando a Aplicação

Após iniciar o projeto, acesse:

http://localhost:3000

---

# 🛍️ Funcionalidades Implementadas

## Home (`HomeView`)

- Catálogo de produtos organizado por categorias.
- Busca textual instantânea.
- Filtros por departamento.
- Banner promocional dinâmico.
- Navegação rápida pelos produtos.

## Detalhes do Produto (`ProductDetailView`)

- Informações detalhadas do produto.
- Exibição de avaliações.
- Galeria de imagens.
- Controle de quantidade.
- Adição ao carrinho.

## Carrinho (`CartView`)

### Fluxo para Visitantes

- Adição de produtos sem necessidade de login.
- Persistência local utilizando localStorage.

### Fluxo de Checkout

- Login obrigatório para finalizar a compra.
- Solicitação automática de autenticação quando necessário.
- Sincronização do carrinho após autenticação.

## Autenticação (`LoginView` e `RegisterView`)

- Cadastro de usuários.
- Login de usuários.
- Validação de formulários.
- Feedback visual para erros e sucesso.

## Perfil (`ProfileView`)

- Gerenciamento de informações do usuário.
- Atualização de dados cadastrais.
- Área dedicada ao cliente autenticado.

---

# 🏗️ Arquitetura e Tecnologias

## React + TypeScript

Aplicação construída como uma Single Page Application (SPA), proporcionando navegação rápida e experiência fluida.

## React Context

Centralização do gerenciamento de estado para:

- Autenticação.
- Carrinho.
- Produtos.
- Fluxos globais da aplicação.

## Material UI (MUI)

Design System utilizado para garantir:

- Consistência visual.
- Responsividade.
- Acessibilidade.
- Produtividade no desenvolvimento.

## Formik + Yup

Utilizados para:

- Construção de formulários.
- Validações declarativas.
- Melhor experiência do usuário.

## Componentização

Estrutura modular com foco em:

- Reutilização.
- Manutenibilidade.
- Escalabilidade.

## Identidade Visual

O projeto utiliza a simbologia de um laboratório através do ícone de frasco (`FlaskConical`), reforçando sua proposta de ambiente experimental para aprendizado e evolução contínua.

---

# 📸 Créditos das Imagens

Para manter o repositório leve e focado no desenvolvimento da aplicação, o Store-lab utiliza imagens obtidas dinamicamente através do Unsplash.

As imagens são utilizadas apenas para compor a experiência visual e simular um catálogo de produtos semelhante ao encontrado em plataformas de e-commerce reais.

Categorias atualmente representadas:

- Eletrônicos
- Escritório
- Moda Esportiva
- Cuidados & Beleza

Todas as imagens seguem os termos de uso disponibilizados pela plataforma Unsplash.

---

# 📌 Observação

O Store-lab é um projeto em constante evolução.

Novas funcionalidades, refatorações, melhorias arquiteturais e experimentos podem ser adicionados a qualquer momento, acompanhando a evolução dos estudos, experiências e objetivos de aprendizado.
