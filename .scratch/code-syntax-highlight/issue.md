# Code Block Syntax Highlighting

## What to build

The Sanity Post schema supports `code` blocks (via `@sanity/code-input` plugin)
but `portable-text.tsx` has no custom renderer for the `code` type. Code blocks
fall back to default paragraph rendering — losing syntax, language labels, and
visual distinction. Add a proper code block renderer with syntax highlighting.

## Acceptance criteria

- [ ] Custom `types.code` renderer added to `portable-text.tsx` components
- [ ] Code blocks render with a dark background, monospace font, and proper padding
- [ ] Language label displayed (from `value.language`) in a top-right badge
- [ ] Syntax highlighting applied (use `shiki` or `prism-themes` with `refractor` — choose the lightest-weight option compatible with static export)
- [ ] Inline `<code>` already works correctly — confirm no regression
- [ ] Code blocks are readable in both light and dark mode
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
