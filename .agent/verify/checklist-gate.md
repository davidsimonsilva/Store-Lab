# Checklist de Auditoria e Gate de Verificação

Checklist formal a ser executado pelo modelo de IA local antes de submeter alterações de código para merge.

---

## 1. Verificações de Compilação e Sintaxe
- [ ] O projeto compila sem falhas (`npm run build`).
- [ ] A checagem de tipos estrita do TypeScript conclui sem erros (`tsc --noEmit`).
- [ ] O linter é executado com zero advertências (`npm run lint`).

## 2. Conformidade Arquitetural
- [ ] Estilos isolados em arquivos colocalizados `NomeComponente.styles.ts` com `SxProps<Theme>`.
- [ ] Zero ocorrências de CSS inline nos arquivos JSX/TSX.
- [ ] Zero ocorrências do tipo `any`.
- [ ] Componentes de página em `/src/pages/` e componentes reutilizáveis em `/src/components/`.
- [ ] Operações de estado e persistência isoladas em `/src/services/`.

## 3. Rastreabilidade Spec-Driven
- [ ] A tarefa em execução possui correspondente em `.spec/features/<feature>/tasks.md`.
- [ ] O status da feature em `.spec/features/<feature>/spec.md` reflete o estado real do código.
- [ ] Testes do Jest (criação ou execução de suítes) foram acionados estritamente sob solicitação e autorização explícita do usuário.
