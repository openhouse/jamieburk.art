# Staging QA Checklist

Use this checklist before promoting the reviewed staging commit to production.

## Local Checks

- [ ] `npm ci`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run check`
- [ ] Docker build completed with staging build args.

## Staging Behavior

- [ ] Staging deploy completed at `https://staging.jamieburk.art`.
- [ ] `robots.txt` disallows `/` on staging.
- [ ] HTML responses include `X-Robots-Tag: noindex, nofollow` on staging.
- [ ] `/api/health` reports `appEnv = staging`.
- [ ] `/api/health` reports `isProduction = false`.
- [ ] `/api/health` reports `robotsIndexable = false`.
- [ ] `sitemap.xml` uses staging URLs only.
- [ ] Canonical URLs use staging URLs only.

## Content And Public Safety

- [ ] Resume page links to the approved PDF.
- [ ] Resume PDF has selectable text.
- [ ] Resume PDF contains no home address.
- [ ] Resume PDF contains no phone number unless Jamie explicitly approves that final PDF.
- [ ] Contact links use the approved public email, LinkedIn, and GitHub.
- [ ] No public page shows visible TODO or placeholder language.
- [ ] Public-safety scan has no blockers.
- [ ] Private-material scan found no private emails, raw transcripts, private coalition notes, legal-review materials, health or financial details, private correspondence, stakeholder lists, internal analytics, client-private materials, or raw community records.
- [ ] Metrics, credits, screenshots, and artifacts have Jamie approval or remain framed cautiously.

## Manual Review

- [ ] Mobile layout reviewed.
- [ ] Keyboard navigation reviewed.
- [ ] Visible focus states reviewed.
- [ ] Sensitive case studies preserve Known / Open / Protected.
- [ ] Final Jamie approval received for production promotion.

## Production Configuration To Confirm Later

Do not release production until Jamie approves the reviewed staging commit.

- [ ] `APP_ENV=production`
- [ ] `SITE_ENV=production`
- [ ] `NEXT_PUBLIC_DEPLOY_ENV=production`
- [ ] `SITE_URL=https://jamieburk.art`
- [ ] `NEXT_PUBLIC_SITE_URL=https://jamieburk.art`
- [ ] `NEXT_PUBLIC_ROBOTS_POLICY=index`
- [ ] `NEXT_TELEMETRY_DISABLED=1`
- [ ] Production allows indexing.
- [ ] Production sitemap and canonical URLs use `https://jamieburk.art`.
- [ ] TLS is enabled.
- [ ] `www.jamieburk.art` redirect or handling is intentional.
