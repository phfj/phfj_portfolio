# Contributing

## Getting Started

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run format
```

## Commit Convention

- `feat:` — new feature
- `fix:` — bug fix
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `chore:` — tooling, dependencies, build changes
- `docs:` — documentation only

All commits must pass pre-commit hooks (formatting, linting).

## Branch Strategy

- `main` — production-ready
- `issue-<n>-<slug>` — individual work items
