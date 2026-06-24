# Pagination for Posts and Projects

## What to build

Both `/posts` and `/projects` currently render every item in a single list
with no limit, offset, or page controls. Add pagination to both listing pages
with numbered page controls and prev/next navigation.

Since the site is statically exported, pagination must be pre-computed at build
time. Update the GROQ queries to support `limit` and `offset` parameters.

## Acceptance criteria

- [ ] `getPosts()` and `getProjects()` queries accept `limit` and `offset` params
- [ ] `/posts` page renders max 9 posts per page
- [ ] `/projects` page renders max 9 projects per page
- [ ] `generateStaticParams` for listing pages produces paths for each page number (e.g., `/posts/page/2`)
- [ ] OR use query params: `?page=2` — choose whichever works better with static export
- [ ] Page navigation component with: prev button (disabled on page 1), page numbers, next button (disabled on last page)
- [ ] Current page visually highlighted
- [ ] Empty state: "No posts yet." when a page has no results (edge case)
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
