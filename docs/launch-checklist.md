# Launch Checklist

Use this checklist before promoting a reviewed staging commit to production.

## Local Verification

- [ ] `nvm use 26`
- [ ] `npm ci`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run public-safety`
- [ ] `npm run build`
- [ ] `npm run check`
- [ ] `npm run production-safety` has no approval blockers before production indexing.

## Content Approval

- [ ] Jamie approved the exact resume PDF.
- [ ] Resume PDF download works.
- [ ] Resume PDF noindex behavior is intentional.
- [ ] No phone number appears on website pages.
- [ ] Public email is approved before website display.
- [ ] LinkedIn and GitHub URLs are approved before website display.
- [ ] Proof metrics are approved or softened.
- [ ] Collaborator names, photos, quotes, screenshots, and artifacts are approved or omitted.
- [ ] Collective-work pages use helped / supported / contributed to / co-built where appropriate.

## Public-Safety Review

- [ ] No raw transcripts, private coalition notes, legal-review materials, private correspondence, stakeholder lists, internal analytics, credentials, or raw community records are committed.
- [ ] No private or proprietary font files are committed.
- [ ] Known / Open / Protected appears on sensitive work pages.
- [ ] Representative artifacts are clearly labeled as representative examples or artifact types.
- [ ] Active civic and community pages preserve protected absences.

## Accessibility And QA

- [ ] Keyboard navigation works.
- [ ] Skip link is visible on focus.
- [ ] Focus states are visible.
- [ ] Heading order is logical.
- [ ] Links are descriptive.
- [ ] Mobile layout works at 320px.
- [ ] Reduced motion is respected.
- [ ] Text contrast is readable.
- [ ] All routes load.
- [ ] Internal links are not broken.

## Staging

- [ ] Deploy the reviewed branch to `https://staging.jamieburk.art`.
- [ ] `robots.txt` disallows crawling on staging.
- [ ] HTML responses include `X-Robots-Tag: noindex, nofollow` on staging.
- [ ] Staging sitemap, if present, uses staging URLs only.
- [ ] Canonical URLs use staging URLs on staging.
- [ ] `/api/health` reports non-indexable staging behavior.

## Production Indexing

Production indexing is allowed only after Jamie approves the reviewed staging
commit and these values are present at build and runtime:

```bash
APP_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=index
```

- [ ] Production `robots.txt` allows crawling only when indexable.
- [ ] Production `robots.txt` advertises sitemap only when indexable.
- [ ] Production sitemap uses `https://jamieburk.art` URLs only.
- [ ] Production canonical URLs use `https://jamieburk.art`.
- [ ] `www.jamieburk.art` redirects to `https://jamieburk.art` or is intentionally handled at the Dokku/nginx layer.
- [ ] The exact reviewed staging commit SHA is promoted, not an unreviewed branch tip.
