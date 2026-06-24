# Social Share Buttons

## What to build

Add "Share on X/Twitter" and "Copy link" buttons to blog post detail pages.
Low effort, high visibility — makes it easy for readers to share your content.

## Acceptance criteria

- [ ] Social share bar on post detail pages (below title or at the bottom after content)
- [ ] "Share on X" button: opens `https://x.com/intent/tweet?text={title}&url={encodedUrl}` in a new window
- [ ] "Copy link" button: copies `window.location.href` to clipboard, shows "Copied!" feedback for 2 seconds
- [ ] Uses `navigator.clipboard.writeText()` with fallback for older browsers
- [ ] Buttons are icon-only (minimal, inline with the page chrome)
- [ ] `rel="noopener noreferrer"` on external share links
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

None — can start immediately.
