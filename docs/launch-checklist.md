# Launch Checklist

## Local Checks

- [ ] `nvm use`
- [ ] Node is 26.x.
- [ ] `npm ci`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run check`
- [ ] `npm run check:production` with production env vars.

## Content Approval

- [ ] Final resume PDF is approved by Jamie.
- [ ] Public contact email is approved by Jamie.
- [ ] LinkedIn and GitHub are approved or omitted.
- [ ] Proof metrics are approved for their exact surfaces or softened.
- [ ] Collaborator names, screenshots, artifacts, photos, and quotes are
  approved or omitted.
- [ ] Unapproved product names are omitted unless explicitly approved for a
  public surface.
- [ ] No visible approval TODOs remain in production-facing pages.
- [ ] Website copy follows the knowledge-bank projection rules.

## Public Safety

- [ ] No placeholder resume remains.
- [ ] No private/proprietary font binaries are tracked.
- [ ] No private docs, credentials, transcripts, raw records, or private paths
  are tracked.
- [ ] Sensitive project pages pass public-safety review.
- [ ] NYC Artist Coalition / CRS language uses collective-work framing.
- [ ] Source-Backed Team Memory is framed as lab/method, not production SaaS.

## Staging QA

- [ ] Staging route check passes.
- [ ] `/api/health` reports `robotsIndexable: false`.
- [ ] `robots.txt` disallows `/`.
- [ ] `sitemap.xml` uses staging URLs if served.
- [ ] Canonicals use `https://staging.jamieburk.art`.
- [ ] HTML responses include `X-Robots-Tag: noindex, nofollow`.

## Accessibility QA

- [ ] Mobile checked at 320px, 375px, 768px, and desktop.
- [ ] Keyboard navigation checked through header, cards, CTAs, and footer.
- [ ] Skip link visible on focus.
- [ ] Every page has one H1.
- [ ] Heading order is sensible.
- [ ] Contrast checked for buttons, tags, proof strip, cards, and banners.
- [ ] Reduced-motion behavior checked.
- [ ] Repeated links have useful accessible names.
- [ ] Resume PDF accessibility checked after final PDF approval.

## Production Release

- [ ] Exact staging-reviewed SHA is recorded.
- [ ] Jamie approves that exact SHA.
- [ ] Docker build/run passes or an explicit skip reason is recorded.
- [ ] Production env vars are set at build and runtime.
- [ ] Production robots, sitemap, canonical, and OpenGraph URLs are verified.
- [ ] Rollback SHA or Dokku rollback path is recorded.
- [ ] Do not promote a different commit than the one reviewed on staging.
