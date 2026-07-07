# Release Checklist

## Staging

- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run check`
- `npm run check:content`
- Verify `/`, `/work`, each case-study route, `/lab/source-backed-team-memory`,
  `/resume`, `/about`, `/contact`, `/colophon`, `/robots.txt`, `/sitemap.xml`,
  and `/api/health`.
- Confirm staging shows `Staging review - not indexed`.
- Confirm `/robots.txt` disallows `/`.
- Confirm non-production responses include `X-Robots-Tag: noindex, nofollow`.
- Confirm sitemap URLs use `https://staging.jamieburk.art` or the configured
  local/staging URL.

## Production

Do not start production until Jamie approves the launch blockers below.

- Final resume PDF.
- Public email.
- LinkedIn URL.
- GitHub URL or decision to omit.
- Approved HJE screenshots/artifacts.
- Approved FairRentNYC / CRS public artifacts.
- Approved CallNYC archive links/screenshots/citation.
- Approved metrics.
- Approved collaborator names.
- Approved photos or quotes.

Before production:

- `npm run check:production`
- Production Docker dry run with `APP_ENV=production` and
  `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- Confirm canonical URLs use `https://jamieburk.art`.
- Confirm sitemap URLs use `https://jamieburk.art`.
- Confirm robots allows indexing.
- Confirm public HTML pages do not send `X-Robots-Tag: noindex, nofollow`.
- Confirm no public approval TODOs, placeholder resume text, private markers, or
  private/proprietary font files remain.
