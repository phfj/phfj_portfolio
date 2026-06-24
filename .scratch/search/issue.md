# Search

## What to build

Add client-side search across all blog posts and projects. Use `fuse.js` for
fuzzy search over titles, summaries, and tech stacks. Render results in a
dropdown or dedicated search page with highlighted matches.

This demonstrates a real, interactive feature beyond static content — exactly
the kind of dynamic behavior recruiters look for.

## Acceptance criteria

- [ ] Search input in the header (desktop) or a dedicated `/search` page
- [ ] `fuse.js` installed and configured with searchable fields: `title`, `summary`, `topic names`, `tech stack` (for projects)
- [ ] Search data embedded at build time — all posts/projects passed as JSON to a client component
- [ ] Results appear in a dropdown below the search input (or on `/search` page with query param)
- [ ] Results show: type badge (Post/Project), title (linked), matching summary excerpt with highlighted match
- [ ] Keyboard navigation: arrow keys to move, Enter to open, Escape to close
- [ ] Empty state: "No results for '{query}'"
- [ ] Debounced input (300ms) to avoid excessive re-renders
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
