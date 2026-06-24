# Reading Progress Bar

## What to build

Add a thin animated progress bar at the top of the page (below the header) that
fills horizontally as the user scrolls through a blog post. This is a ubiquitous
developer blog feature that improves perceived UX and demonstrates attention to
detail.

## Acceptance criteria

- [ ] Reading progress bar rendered on post detail pages (`/posts/[slug]`)
- [ ] Bar is fixed below the header, thin (3-4px height), accent color
- [ ] Width reflects scroll progress: 0% at top, 100% when scrolled past content end
- [ ] Uses `useEffect` + `scroll` event listener (throttled with `requestAnimationFrame`)
- [ ] Progress calculated as: `scrollY / (documentHeight - viewportHeight)`
- [ ] Bar transitions smoothly (CSS `transition: width 100ms linear`)
- [ ] Bar is invisible at 0% (or `opacity-0`), visible when scroll starts
- [ ] Respects `prefers-reduced-motion` (disable animation if user prefers)
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately. Consider after `loading-error-states` if both
touch post detail page layout.
