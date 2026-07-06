# Launch Checklist

This is the canonical production go/no-go checklist for `apps/www`.

## Local Checks

- [ ] `npm ci`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run check`
- [ ] `npm run public-safety`
- [ ] `npm run preflight`
- [ ] Docker build completed with staging build args

## Staging Behavior

- [ ] Staging deploy completed at `https://staging.jamieburk.art`
- [ ] `robots.txt` disallows `/` on staging
- [ ] HTML responses include `X-Robots-Tag: noindex, nofollow`
- [ ] `/api/health` reports `appEnv = staging`
- [ ] `/api/health` reports `isProduction = false`
- [ ] `/api/health` reports `robotsIndexable = false`
- [ ] `sitemap.xml` uses staging URLs only, if served
- [ ] Canonical URLs use staging URLs only

## Content And Public Safety

- [ ] Resume page links to approved PDF
- [ ] Resume PDF has selectable text
- [ ] Resume PDF contains no home address
- [ ] Resume PDF contains phone number only because Jamie explicitly approved
      this exact release artifact
- [ ] Contact page does not publish separate unapproved contact values
- [ ] No public page shows visible TODO or placeholder language
- [ ] Public-safety scan has no blockers
- [ ] Metrics, credits, screenshots, and artifacts are approved or framed
      cautiously

## Manual Review

- [ ] Mobile layout reviewed at 320, 375, and 768 px
- [ ] Large desktop reviewed
- [ ] Keyboard navigation reviewed
- [ ] Skip link works
- [ ] Visible focus states reviewed
- [ ] Heading order reviewed
- [ ] Sensitive case studies preserve Known / Open / Protected
- [ ] Final Jamie approval received for production promotion

## Production Configuration

- [ ] `APP_ENV=production`
- [ ] `SITE_ENV=production`
- [ ] `NEXT_PUBLIC_DEPLOY_ENV=production`
- [ ] `SITE_URL=https://jamieburk.art`
- [ ] `NEXT_PUBLIC_SITE_URL=https://jamieburk.art`
- [ ] `NEXT_PUBLIC_ROBOTS_POLICY=index`
- [ ] `NEXT_TELEMETRY_DISABLED=1`
- [ ] Production allows indexing only after Jamie approval
- [ ] Production sitemap and canonical URLs use `https://jamieburk.art`
- [ ] TLS enabled
- [ ] `www.jamieburk.art` redirect or handling is intentional
