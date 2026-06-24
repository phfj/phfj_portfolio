# Contact Form

## What to build

The site currently has no dedicated contact mechanism — only a subscribe form
and raw `mailto:` links. Add a contact form on the About page (or a dedicated
`/contact` route) with name, email, subject, and message fields. Form
submissions should be routed through the existing Cloudflare Worker pattern to
an email service or notification webhook.

This removes friction for recruiters who want to reach out quickly.

## Acceptance criteria

- [ ] Contact form with fields: Name (required), Email (required, validated), Subject (optional), Message (required, min 50 chars)
- [ ] Client-side validation: all required fields checked before submit, email format validated, message length min check
- [ ] Server-side validation in Cloudflare Worker: same checks, reject malformed with 400
- [ ] Worker sends notification via email service (Buttondown transactional, Resend, or webhook to Slack/Discord)
- [ ] Form states: idle, submitting (disabled inputs + spinner), success ("Thanks, I'll get back to you soon"), error ("Something went wrong, try emailing directly")
- [ ] Success state includes fallback email address for the user
- [ ] Form reuses styling from `subscribe-form.tsx` for consistency
- [ ] Spam protection: honeypot hidden field that rejects if filled
- [ ] `npm run build` succeeds
- [ ] `npm run typecheck` exits 0
- [ ] `npm run lint` exits 0

## Blocked by

- `shared-components` (uses `EmailIcon` from icons module)
