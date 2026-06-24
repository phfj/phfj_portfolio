# Interactive Demo / CodeSandbox Embed

## What to build

Static project descriptions tell but don't show. Embed a live interactive widget
on the homepage or a featured project page — a CodeSandbox, a live API call
result widget, or an interactive code visualization. This is the strongest
signal to a technical hiring manager that you can write working code.

## Acceptance criteria

- [ ] Embedded interactive element on the homepage (below hero, above projects) or on a featured project detail page
- [ ] Options (choose one): CodeSandbox embed of a small component, a live "try the API" widget with a fetch button + JSON response display, or an interactive terminal-style widget
- [ ] Lazy-loaded: the embed only loads when scrolled into view (Intersection Observer)
- [ ] Fallback: static screenshot + "Launch demo" link when JS is disabled
- [ ] The widget is lightweight — no heavy framework import in the main bundle
- [ ] The demo showcases something real, not a toy example
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
