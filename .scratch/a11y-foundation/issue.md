# Accessibility Foundation

## What to build

Fix the critical WCAG violations across the site. Add a skip-to-content link as
the first focusable element. Give the subscribe form a proper `<label>` element
with `htmlFor` association and an `aria-live` region for status messages. Add
`aria-hidden="true"` and `focusable="false"` to all decorative SVG icons. Guard
all hover/toggle animations behind a `prefers-reduced-motion: reduce` media
query.

## Acceptance criteria

- [ ] Skip-to-content link as first tabbable element: visually hidden, appears on focus, targets `<main>`
- [ ] Subscribe form has `<label htmlFor="subscribe-email">` with proper text (visually hidden is fine if design prefers placeholder)
- [ ] Subscribe form status message container has `role="status"` or `aria-live="polite"`
- [ ] All decorative SVG icons in `footer.tsx`, `header.tsx` (hamburger spans), `about/page.tsx` have `aria-hidden="true"` and `focusable="false"`
- [ ] `globals.css` has `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
