# Release Checklist

This site is staging-first. Do not deploy production until Jamie confirms the
content and metadata are ready to be indexed.

## Staging

- Install with `npm ci`.
- Run `npm run typecheck`.
- Run `npm run lint`.
- Run `npm run build`.
- Run `npm run check`.
- Run `npm run check:content`.
- Verify `/`, `/work`, all work pages, `/lab/source-backed-team-memory`,
  `/resume`, `/about`, `/contact`, `/colophon`, `/robots.txt`,
  `/sitemap.xml`, and `/api/health`.
- Confirm staging shows the review marker: `Staging review - not indexed`.
- Confirm `robots.txt` disallows `/`.
- Confirm `X-Robots-Tag: noindex, nofollow` is present outside production.
- Confirm the sitemap uses the configured staging or local URL.

## Production Dry Run

- Set production environment values:

```bash
APP_ENV=production
SITE_ENV=production
NEXT_PUBLIC_DEPLOY_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=index
```

- Run `npm run check:production`.
- Build a local production Docker image with production build args.
- Verify `robots.txt` allows indexing.
- Verify `sitemap.xml` uses `https://jamieburk.art`.
- Verify public HTML does not receive `X-Robots-Tag: noindex, nofollow`.
- Confirm no staging or localhost URLs appear in production metadata.

## Jamie Approvals

Production remains blocked until Jamie approves:

- Final resume PDF.
- Public email.
- LinkedIn URL.
- GitHub URL or a decision to omit it.
- HJE screenshots/artifacts.
- FairRentNYC / CRS public artifacts.
- CallNYC archive links/screenshots/citation.
- Metrics.
- Collaborator names.
- Photos or quotes.
