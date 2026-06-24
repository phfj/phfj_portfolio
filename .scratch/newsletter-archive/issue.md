# Newsletter Archive Page

## What to build

The site has a subscribe form but no way to browse past newsletter issues. Add
a `/newsletter` page that shows past issues (if using Buttondown's newsletter
feature) or links to the external archive.

## Acceptance criteria

- [ ] `/newsletter` route renders a page with heading "Newsletter"
- [ ] If Buttondown provides an issues API, fetch and display issue list with titles, dates, and links
- [ ] If no API available, embed Buttondown's public archive page via link or iframe
- [ ] Subscribe CTA at the bottom: "Get these in your inbox" + subscribe form
- [ ] Link to `/newsletter` in the footer alongside the subscribe form
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
