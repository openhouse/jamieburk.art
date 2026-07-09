# Launch Checklist

## Production Blockers

- [x] Approved resume PDF is in `apps/www/public/resume/`.
- [x] Resume PDF route has `X-Robots-Tag: noindex, nofollow`.
- [x] Contact page has public email, LinkedIn, GitHub, location, and resume.
- [x] Phone number is not shown on the website.
- [x] Homepage thesis uses the final active wording.
- [x] Homepage proof strip uses safer public projections.
- [x] Technical Operations page maps role needs to public proof.
- [x] Source-Backed Team Memory page describes a bounded first sprint.
- [x] Typography uses Karla and Archivo Narrow through `next/font/google`.
- [x] No private/proprietary font files are committed.
- [x] No public `/proofs`, `/knowledge-bank`, or `/public-claims` route exists.

## Verify Before Production

- [ ] `npm ci`
- [ ] `npm run check`
- [ ] `npm run check:knowledge-bank`
- [ ] `npm run public-safety`
- [ ] `npm run check:routes`
- [ ] `npm run preflight:production`
- [ ] `curl -i https://staging.jamieburk.art/api/health`
- [ ] `curl -i https://staging.jamieburk.art/robots.txt`
- [ ] `curl -i https://staging.jamieburk.art/sitemap.xml`
- [ ] `curl -I https://staging.jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`
- [ ] Mobile width at 320px.
- [ ] Keyboard navigation.
- [ ] Skip link visible on focus.
- [ ] Focus states visible.
- [ ] One H1 per page.
- [ ] Resume link clearly labeled as PDF.

## Production Env

Production indexing is allowed only when all are true:

```txt
APP_ENV=production
SITE_ENV=production
NEXT_PUBLIC_DEPLOY_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=index
```
