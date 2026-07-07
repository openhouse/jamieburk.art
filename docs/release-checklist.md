# Release Checklist

The goal is the smallest production-safe release that helps Jamie get referred,
interviewed, and hired.

## Phase 1: Staging Review

- Deploy to `staging.jamieburk.art`.
- Keep staging noindex through robots, metadata, and `X-Robots-Tag`.
- Run:

```bash
npm run typecheck
npm run lint
npm run build
npm run public-safety
npm run check:routes
npm run preflight:staging
```

- Review all public pages for claims, credits, contact paths, screenshots, and
  private-material boundaries.

## Phase 2: Trusted Referrer Review

The site can be shared with trusted referrers when:

- The homepage explains Jamie in 30 seconds.
- The approved contact path is live.
- The resume page does not expose a placeholder PDF.
- No public TODO or placeholder language remains.
- Selected work pages are public-safe.
- Staging noindex is verified by headers, metadata, and robots.
- Jamie has reviewed the staging surface.

## Phase 3: Production Release, Possibly Noindex

Production may be deployed with:

```bash
APP_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=noindex
```

This supports an unannounced production smoke test without indexing.

## Phase 4: Production Indexing

Production indexing requires all of:

- approved resume PDF;
- approved public contact path;
- approved LinkedIn / GitHub URLs or omitted rows;
- final claim and credit approval;
- no private/proprietary fonts;
- no unapproved screenshots, photos, or artifacts;
- public-safety production preflight passing;
- route, sitemap, robots, health, canonical metadata, OpenGraph, mobile, and
  keyboard QA complete;
- Jamie review of every public page.

Only then set:

```bash
NEXT_PUBLIC_ROBOTS_POLICY=index
```

## Production Blockers

- Placeholder resume present.
- Public TODO present.
- Missing approved contact path.
- Staging noindex unverified.
- Production indexing not explicit opt-in.
- Private/proprietary font present.
- Private folders not ignored.
- Public-safety scan fails.
- Claim/credit approval incomplete.
- Unapproved screenshot/photo present.
- PDF contains unapproved phone or contact detail.
- Links, mobile, keyboard, or rollback QA incomplete.

## Rollback

If privacy, contact, resume, robots, sitemap, or content issues appear,
immediately set production robots policy back to `noindex` if indexing risk
exists, redeploy the previous known-good SHA or Dokku release, then verify
`/api/health`, `/robots.txt`, `/sitemap.xml`, `/resume`, and `/contact`.

## Current Known Blocker

The committed resume PDF is still a placeholder in this branch. Production
preflight should fail until the approved current resume is added.
