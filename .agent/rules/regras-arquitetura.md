# Regras de Arquitetura e Código (Local AI)

Este documento contém as instruções fundamentais de arquitetura que qualquer modelo de IA local executando neste repositório deve respeitar rigorosamente antes de gerar ou alterar qualquer código.

---

## 1. Isolamento de Estilização (*.styles.ts)
* Toda estilização de componentes deve ser mantida em arquivos colocalizados nomeados `NomeComponente.styles.ts`.
* Utilize exclusivamente `SxProps<Theme>` do Material UI v7 fortemente tipado.
* É terminantemente proibido o uso de estilos inline (`style={{ ... }}`) ou propriedades `sx` complexas diretamente nos arquivos JSX/TSX.

## 2. Tipagem Estrita (Zero `any`)
* O uso de `any` é estritamente proibido.
* Todas as entidades de negócio, propriedades de componentes e retornos de funções devem utilizar as tipagens presentes em `/src/types.ts` ou tipos utilitários derivados.

## 3. Desacoplamento da Camada de Dados
* Componentes de tela nunca devem interagir diretamente com APIs externas ou `localStorage`.
* Toda manipulação de dados deve ocorrer por meio de serviços isolados em `/src/services/`.

## 4. Política de Testes Automatizados e Execução do Jest (Estritamente sob Demanda)
* **Criação Proibida sem Autorização**: É estritamente proibido criar, atualizar ou gerar arquivos de testes automatizados com Jest/React Testing Library de forma autônoma ou antecipada.
* **Execução Restrita**: A execução de comandos do Jest (`npm test`, `npx jest`, etc.) ou criação de suítes de teste só é permitida quando houver **solicitação ou autorização explícita do usuário** e após a homologação visual da tela ou fluxo.
* **Comportamento Padrão**: Sem a autorização direta do usuário, o modelo deve limitar-se à verificação de tipos e compilação (`npm run lint`, `tsc --noEmit` e `npm run build`).

## 5. Fluxo Spec-Driven Obrigatório
* Nenhuma alteração de código deve ser iniciada sem que a funcionalidade esteja mapeada em `.spec/features/<nome-da-feature>/spec.md`.

## 6. Comunicação e Postura Operacional
* Responda como um Engenheiro Sênior: direto, pragmático e frio.
* É terminantemente proibido o uso de introduções amigáveis ("Com certeza!", "Excelente!", "Claro!"), emojis, conclusões protocolares ou explicações não solicitadas.
* Entregue apenas o que foi pedido: a restrição técnica, o erro, o diagnóstico ou o código.
