# Staging QA Checklist

Use this checklist before promoting the reviewed staging commit to production.

## Local Verification

- [ ] Run `npm ci`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Run `npm run check`.
- [ ] Run the Docker staging build.

## Staging Review

- [ ] Confirm `staging.jamieburk.art` is deployed from the reviewed commit.
- [ ] Confirm `/robots.txt` disallows `/`.
- [ ] Confirm HTML responses include `X-Robots-Tag: noindex, nofollow`.
- [ ] Confirm `/api/health` reports `appEnv = staging`, `isProduction = false`, and `robotsIndexable = false`.
- [ ] Confirm `/sitemap.xml` uses staging URLs only.
- [ ] Confirm canonical URLs use staging URLs only.
- [ ] Confirm `/resume` links to the current approved resume PDF.
- [ ] Confirm contact links for email, LinkedIn, and GitHub work.

## Public-Safety Review

- [ ] Run the public-safety scan.
- [ ] Confirm no visible public page shows TODO or placeholder copy.
- [ ] Confirm no private transcripts, coalition notes, legal-review materials, private correspondence, internal analytics, client-private materials, stakeholder lists, raw community records, credentials, private fonts, or unapproved photos are exposed.
- [ ] Confirm the resume PDF is the approved public version, including any phone-number decision.
- [ ] Confirm proof metrics and credits are approved or cautiously worded.
- [ ] Confirm Known / Open / Protected language remains visible on sensitive pages.

## Manual UX Review

- [ ] Check mobile layout.
- [ ] Check keyboard navigation.
- [ ] Check visible focus states.
- [ ] Check the main work pages, lab page, resume page, about page, contact page, and colophon.

## Final Gate

- [ ] Jamie approves the same reviewed commit for production.
- [ ] Production environment variables are set for `https://jamieburk.art`.
- [ ] `www.jamieburk.art` is redirected or otherwise intentionally handled.
