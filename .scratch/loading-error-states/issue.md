# Loading, Error, and Not-Found States

## What to build

The site has zero loading states, error boundaries, or custom 404 pages. Add
`loading.tsx` skeleton screens to each route segment, an `error.tsx` boundary
for runtime failures, and a `not-found.tsx` custom 404 page.

Even though the site is statically exported (so loading states only matter in
`next dev`), the error and not-found boundaries are critical for production
resilience.

## Acceptance criteria

- [ ] `src/app/loading.tsx` — skeleton layout matching the site shell (header placeholder, content pulse)
- [ ] `src/app/posts/loading.tsx` — post list skeleton (3-5 card placeholders)
- [ ] `src/app/posts/[slug]/loading.tsx` — post detail skeleton (title bar, content lines)
- [ ] `src/app/projects/loading.tsx` — project grid skeleton
- [ ] `src/app/projects/[slug]/loading.tsx` — project detail skeleton
- [ ] `src/app/error.tsx` — error boundary with "Something went wrong" message and retry/home links
- [ ] `src/app/not-found.tsx` — custom 404 page with "Page not found" message, search/back-to-home links
- [ ] Loading skeletons use pulse animation (respects `prefers-reduced-motion`)
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
