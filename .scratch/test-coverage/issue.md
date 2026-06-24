# Test Coverage

## What to build

Current test coverage is ~25% with mostly shallow tests (string-matching GROQ
queries, checking `generateStaticParams` shape). Add meaningful unit tests for
utility functions and component rendering tests for the key shared components.

## Acceptance criteria

- [ ] `src/lib/reading-time/__tests__/reading-time.test.ts` — tests for: empty body → 0min, single word → 1min, known-length text → correct WPM, whitespace-only, very long content
- [ ] `src/lib/sanity/__tests__/image.test.ts` — tests for: null source → null, valid ref → correct CDN URL, valid ref + width → URL with width param, invalid ref shape → falls back gracefully
- [ ] `src/components/__tests__/post-card.test.tsx` — tests for: renders title/date/summary, handles missing summary, handles missing topics, renders reading time, renders topics as links
- [ ] `src/components/__tests__/subscribe-form.test.tsx` — tests for: renders input and button, shows loading state during submit, shows success message, shows error message, clears input on success, validates empty email
- [ ] `src/components/__tests__/theme-toggle.test.tsx` — tests for: renders with theme icon, cycles light→dark→system on click
- [ ] `src/components/__tests__/header.test.tsx` — tests for: renders nav links, highlights active link, opens/closes mobile menu, escape key closes menu
- [ ] All existing 19 tests continue to pass
- [ ] `npm run test` exits 0
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

- `shared-components` (ProjectCard/PostCard should be extracted before writing component tests)
