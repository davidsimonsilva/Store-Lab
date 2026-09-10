# spec-driven - A Especificação que Guia a Implementação

Esta habilidade orienta o modelo de IA local no fluxo rigoroso de desenvolvimento orientado por especificações (Spec-Driven Development), garantindo rastreabilidade, prevenção de regressões e auditoria contínua de código.

---

## Passo a Passo Operacional

### 1. Ler e Validar a Especificação
* Antes de qualquer alteração de código, consulte o arquivo `.spec/features/<feature>/spec.md`.
* Confirme o status da especificação (`rascunho`, `em-desenvolvimento`, `homologado`, `bloqueada`).
* Se a spec estiver `bloqueada`, informe a dependência impeditiva e não realize edições em `/src/`.

### 2. Mapear o Checklist de Tarefas
* Consulte `.spec/features/<feature>/tasks.md`.
* Identifique a próxima tarefa pendente `[ ]` e execute apenas o escopo estritamente delimitado por ela.

### 3. Implementação Cirúrgica
* Aplique o código respeitando a colocalização e o isolamento de estilos em `*.styles.ts`.
* Utilize tipagem forte sem o uso de `any`.
* Mantenha componentes desacoplados de serviços de persistência.

### 4. Verificar e Auditar (O Gate)
* Execute a validação de tipos TypeScript (`tsc --noEmit`).
* Execute o linter de conformidade.
* Verifique se as restrições arquiteturais de `.agent/rules/regras-arquitetura.md` foram integralmente respeitadas.
* Se a auditoria falhar: analise o erro, realize a correção e re-audite em no máximo 3 iterações. Se persistir, escale para o desenvolvedor com os problemas ranqueados.

### 5. Atualizar o Rastro e Fechar o Ciclo
* Marque a tarefa concluída em `tasks.md` (`[x]`).
* Atualize o status em `spec.md` para `homologado` quando todas as tarefas forem concluídas e aprovadas no gate.
