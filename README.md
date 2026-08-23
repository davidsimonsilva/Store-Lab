# StoreLab

Aplicação de e-commerce desenvolvida com React, TypeScript e Material UI para demonstrar a construção de uma interface moderna, responsiva e organizada seguindo boas práticas de desenvolvimento Front-end.

O projeto simula uma experiência completa de compra online, incluindo catálogo de produtos, busca, carrinho persistente, autenticação de usuários e área de perfil.

---

## Demo

**Aplicação em produção**

StoreLab: https://store-lab-six.vercel.app/

---

## Funcionalidades

### Catálogo de Produtos

* Listagem de produtos por categorias
* Busca textual de produtos
* Banner promocional rotativo
* Interface responsiva para desktop e dispositivos móveis

### Página de Produto

* Informações detalhadas
* Galeria de imagens
* Avaliações simuladas
* Controle de quantidade para compra

### Carrinho de Compras

* Adição e remoção de produtos
* Atualização de quantidades
* Persistência de dados com localStorage
* Resumo de valores do pedido

### Autenticação

* Cadastro de usuários
* Login e logout
* Proteção de rotas
* Sincronização do carrinho após autenticação

### Área do Cliente

* Gerenciamento de perfil
* Histórico de pedidos
* Atualização de informações cadastrais

---

## Tecnologias Utilizadas

### Front-end

* React
* TypeScript
* Material UI (MUI)
* React Router

### Formulários e Validação

* Formik
* Yup

### Gerenciamento de Estado

* React Context API

### Ferramentas

* Vite
* ESLint
* Jest

---

## Estrutura e Arquitetura

O projeto foi organizado com foco em:

* Componentização reutilizável
* Separação de responsabilidades
* Organização modular de páginas e componentes
* Centralização de estados globais através de Context API
* Padronização visual utilizando Material UI

Principais módulos da aplicação:

* Autenticação
* Carrinho
* Checkout
* Perfil de Usuário
* Catálogo de Produtos
* Componentes Compartilhados

---

## Executando Localmente

### Pré-requisitos

* Node.js 18 ou superior
* npm

### Instalação

```bash
npm install
```

### Ambiente de Desenvolvimento

```bash
npm run dev
```

Após iniciar o servidor, acesse:

```text
http://localhost:3000
```

---

## Documentação Técnica

A documentação complementar do projeto está disponível na pasta `/docs`.

Documentos principais:

* `docs/arquitetura.md`
* `docs/roadmap.md`
* `docs/feature-logs/`

---

## Objetivos do Projeto

Este projeto foi desenvolvido para praticar e demonstrar conhecimentos em:

* React
* TypeScript
* Material UI
* Arquitetura Front-end
* Componentização
* Gerenciamento de Estado
* Desenvolvimento Responsivo
* Boas Práticas de Engenharia de Software

---

## Licença

Projeto desenvolvido para fins educacionais, estudo e demonstração técnica.
