# Subscribe form & Cloudflare Worker

## What to build

The email subscribe flow: a form in the site footer (and at the bottom of each
Post) that POSTs to a Cloudflare Worker. The Worker validates the email format,
forwards it to Buttondown's API, and returns success or error. Double opt-in is
handled by Buttondown automatically. This is the only dynamic behavior on the
otherwise static site.

## Acceptance criteria

- [ ] Subscribe form renders in site footer with email input and submit button
- [ ] Subscribe form renders at the bottom of each Post page
- [ ] Client-side form validates non-empty email before POSTing
- [ ] Cloudflare Worker created at `/api/subscribe` (or dedicated Worker route)
- [ ] Worker validates email format server-side, rejects malformed
- [ ] Worker forwards valid email to Buttondown API
- [ ] Worker returns structured success/error response
- [ ] Success response shown to user: "Check your inbox to confirm"
- [ ] Error responses shown to user appropriately
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

- `site-shell` (subscribe form lives in the footer and Post bottom, which are part of the shell)
