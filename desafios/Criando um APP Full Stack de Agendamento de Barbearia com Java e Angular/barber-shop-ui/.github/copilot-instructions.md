# Instruções para GitHub Copilot

## Mensagens de Commit

Gere mensagens de commit concisas no formato `<tipo>(<escopo>): <ação curta>` ou `<tipo>(<escopo>)!: <ação curta>` para breaking changes. Use apenas os tipos e escopos listados abaixo. Mantenha a descrição curta e objetiva (máximo 50 caracteres, se possível). O corpo e footer são opcionais; use `BREAKING CHANGE:` no footer para detalhar alterações críticas, se necessário.

### Tipos permitidos

- `feat`: Nova funcionalidade (ex.: MINOR no SemVer)
- `fix`: Correção de bug (ex.: PATCH no SemVer)
- `docs`: Atualização de documentação
- `style`: Mudanças de formatação (sem alterar lógica)
- `refactor`: Refatoração de código (sem feat ou fix)
- `test`: Adição ou atualização de testes
- `chore`: Tarefas rotineiras (ex.: manutenção)
- `build`: Mudanças no sistema de build
- `ci`: Alterações na integração contínua
- `cd`: Alterações na entrega contínua (deploy)
- `perf`: Melhorias de desempenho
- `revert`: Reversão de um commit anterior
- `env`: Mudanças em variáveis de ambiente
- `data`: Alterações em dados ou banco de dados
- `deps`: Atualização ou adição de dependências
- `security`: Correções de segurança
- `wip`: Trabalho em progresso (temporário)
- `improvement`: Melhoria de implementação existente (sem feat ou fix)

### Escopos permitidos

- `auth`: Autenticação
- `api`: API/backend
- `frontend`: Interface de usuário
- `deps`: Dependências
- `db`: Banco de dados (adicionei como exemplo comum)
- `config`: Configurações (adicionei como exemplo comum)

### Regras

- Use `!` antes do `:` para indicar breaking changes (ex.: `feat(api)!: remove old endpoint`).
- Adicione `BREAKING CHANGE:` no footer (em maiúsculas) para detalhar alterações críticas, se não usar `!`.
- Tipos são case-insensitive, exceto `BREAKING CHANGE`, que deve ser em maiúsculas.
- Não exceda 50 caracteres na descrição, a menos que essencial.

### Exemplos

- `feat(auth): add login`
- `fix(api): resolve timeout`
- `docs(readme): update install steps`
- `style(frontend): format CSS`
- `refactor(api): simplify routing`
- `test(auth): add login tests`
- `chore(deps): bump lodash`
- `build(api): update webpack config`
- `ci(frontend): add lint step`
- `cd(api): automate deploy to staging`
- `perf(frontend): optimize image loading`
- `revert(api): undo last endpoint change`
- `env(auth): add JWT secret`
- `data(db): migrate user table`
- `deps(frontend): upgrade react`
- `security(auth): patch XSS vulnerability`
- `wip(api): draft new endpoint`
- `improvement(api): enhance error handling`
- `feat(api)!: remove legacy endpoint`
- `fix(auth): fix login bug`
