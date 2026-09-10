# Comando: Nova Feature (Spec-Driven)

Instrução operacional para iniciar qualquer nova funcionalidade no StoreLab seguindo a abordagem Spec-Driven antes de qualquer edição de código.

---

## Procedimento de Execução

1. **Definição de Identificador**:
   Defina o nome da feature em formato kebab-case (ex: `carrinho-cupom-desconto`).

2. **Criação da Pasta de Especificação**:
   Criar a pasta `.spec/features/<nome-da-feature>/` contendo:
   - `spec.md`
   - `tasks.md`

3. **Preenchimento do `spec.md`**:
   Estruturar com:
   - Título e identificador da feature.
   - Status (`rascunho`, `em-desenvolvimento`, `homologado`, `bloqueada`).
   - Contexto de negócio e objetivo técnico.
   - Defeitos conhecidos / legados relacionados.
   - Critérios de aceitação.

4. **Preenchimento do `tasks.md`**:
   Estruturar o checklist de passos sequenciais que a IA e o desenvolvedor devem executar.
