# Production Checklist

## Content And Claims

- Claims projected into public pages exist in `docs/proofs-bank/claims.md`.
- Public pages use only `approved` or `public-safe` claims.
- No `/proofs` public route exists.
- Source-Backed Team Memory remains bounded as a lab / method.
- Resume PDF is exact approved file with selectable text.
- Contact email, LinkedIn, and GitHub are approved before production display.
- Exact metrics are approved for the pages where they appear.

## Public Safety

- No private transcripts, emails, coalition notes, legal-review materials,
  stakeholder lists, raw community records, unapproved photos, unapproved
  screenshots, private fonts, or credentials are committed.
- Private-folder ignore patterns are present in `.gitignore` and
  `.dockerignore`.
- Production-facing approval placeholders are absent.

## Accessibility Smoke Checklist

- Keyboard navigation through header, cards, resume CTA, contact links, and
  footer.
- Skip link appears and moves to main content.
- One H1 per page.
- Logical heading order.
- Visible focus styles.
- Contrast for Broadway blue links, proof strip, tags, buttons, and footer.
- Mobile layout checked at 320px, 375px, 768px, and desktop.
- Reduced-motion behavior preserved.
- External link text has enough context.
- PDF selectable text and logical reading order checked before production.

## Technical Checks

- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run check`
- `npm run check:public-safety`
- `npm run check:production`
- `/api/health`
- `/robots.txt`
- `/sitemap.xml`
- Resume PDF route headers
- Canonical redirects

## Sitemap

Canonical routes only:

- `/`
- `/work`
- `/work/technical-operations`
- `/work/harry-j-epstein`
- `/work/fair-rent-nyc`
- `/work/callnyc`
- `/work/wowlist`
- `/work/196-sunday-dinner`
- `/work/kc-town-hall`
- `/resume`
- `/about`
- `/contact`
- `/colophon`

Exclude `/lab/source-backed-team-memory` unless Jamie approves it as indexable
for V1.
