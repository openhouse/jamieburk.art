# Release Checklist

Use this as the small release-readiness checklist for staging and production.

## Staging

- `apps/www` remains canonical.
- `npm ci` passes under Node 26.
- `npm run typecheck` passes.
- `npm run lint` passes.
- `npm run public-safety` passes.
- `npm run check:knowledge-bank` passes.
- `npm run build` passes.
- `npm run check` passes.
- Staging emits `noindex, nofollow`.
- Staging metadata points to `https://staging.jamieburk.art`.
- Public pages contain no raw transcripts, private paths, private fonts, credentials, private notes, or unapproved photos/quotes.

## Production

- Jamie approves production indexing.
- The exact production resume PDF is approved.
- Public email, LinkedIn, and GitHub display rules are approved.
- Phone does not appear on website pages.
- Metrics and collaborator names are approved at their exact wording.
- Sitemap contains canonical production URLs only.
- Resume PDF responses remain `X-Robots-Tag: noindex`.
- `APP_ENV=production SITE_URL=https://jamieburk.art NEXT_PUBLIC_SITE_URL=https://jamieburk.art NEXT_PUBLIC_ROBOTS_POLICY=index npm run preflight:production` passes.
