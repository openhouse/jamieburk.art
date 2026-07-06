# Launch Checklist

## Referrer-Safe Staging

- [ ] Approved resume PDF is live.
- [ ] Approved contact path is live or the resume/application channel fallback is intentional.
- [ ] No public TODO or placeholder language remains.
- [ ] Staging metadata robots are noindex/nofollow.
- [ ] Staging responses include `X-Robots-Tag: noindex, nofollow`.
- [ ] Staging `robots.txt` disallows `/`.
- [ ] Staging sitemap uses staging URLs only.
- [ ] Homepage explains Jamie in 30 seconds.
- [ ] Selected work pages are public-safe.
- [ ] All links work.
- [ ] Mobile and keyboard QA pass.
- [ ] Jamie has reviewed the staging surface.

## Commands

```bash
npm ci
npm run typecheck
npm run lint
npx next build --webpack
npm run standalone:assets -w @jamie-burkart/www
npm run public-safety
npm run preflight
```

Production-mode configuration check:

```bash
APP_ENV=production \
SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_ROBOTS_POLICY=index \
npm run check:production
```

## Production Blockers

- [ ] Placeholder resume present.
- [ ] Public TODO present.
- [ ] Missing approved contact path.
- [ ] Staging noindex unverified.
- [ ] Production indexing not explicit opt-in.
- [ ] Private/proprietary font present.
- [ ] Private folders not ignored.
- [ ] Public-safety scan fails.
- [ ] Claim/credit approval incomplete.
- [ ] Unapproved screenshot/photo present.
- [ ] All links not verified.
- [ ] Mobile/keyboard QA incomplete.
- [ ] Rollback path undocumented.
- [ ] Jamie has not reviewed every public page.

## Staging Curl Checks

```bash
curl -i https://staging.jamieburk.art/api/health
curl -i https://staging.jamieburk.art/robots.txt
curl -i https://staging.jamieburk.art/sitemap.xml
curl -I https://staging.jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

## Rollback

If production is wrong, set production robots policy back to noindex if needed,
redeploy the previous known-good SHA or Dokku release, then verify
`/api/health`, `/robots.txt`, `/sitemap.xml`, `/`, `/resume`, and `/contact`.
