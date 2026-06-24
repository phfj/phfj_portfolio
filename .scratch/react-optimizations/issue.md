# React Performance Optimizations

## What to build

Apply React performance patterns to reduce unnecessary re-renders: wrap
`PostCard` and `ProjectCard` with `React.memo`, convert inline functions in
client component JSX to `useCallback` hooks, and add a proper justification
comment for the existing `eslint-disable` in `theme-toggle.tsx`.

## Acceptance criteria

- [ ] `PostCard` wrapped with `React.memo(PostCard)` — export at bottom of `src/components/post-card.tsx`
- [ ] `ProjectCard` wrapped with `React.memo(ProjectCard)` — export at bottom (after `shared-components` extraction)
- [ ] `header.tsx:76` — `onClick` handler extracted to `useCallback`:
  `const toggleMenu = useCallback(() => setOpen((v) => !v), [])`
- [ ] `theme-toggle.tsx:58` — `onClick` handler extracted to `useCallback`:
  `const cycleTheme = useCallback(() => setTheme(/* ... */), [setTheme, theme])`
- [ ] `subscribe-form.tsx:49` — `onChange` handler extracted to `useCallback`:
  `const handleEmailChange = useCallback((e) => setEmail(e.target.value), [])`
- [ ] `theme-toggle.tsx:24` — `eslint-disable-next-line` comment expanded to explain: "Intentional: setState in effect is the standard pattern for theme providers to avoid hydration mismatch. The mount flag must be set after first render."
- [ ] No visual or behavioral regressions
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

- `shared-components` (needs `ProjectCard` to exist before wrapping)
