# Release Checklist

## Local Checks

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run public-safety
npm run preflight:staging
```

## Manual QA

- Homepage copy leads with "I turn under-structured work into usable systems."
- Start-here links are visible and useful.
- Technical Operations page answers what Jamie built, coordinated, clarified,
  documented, handed off, and made usable.
- Work pages preserve Known / Open / Protected boundaries.
- Source-Backed Team Memory stays bounded as lab / method / proof-of-practice.
- Resume page does not pretend production approval is complete.
- Resume PDF downloads from `/resume`.
- Contact page renders public email when env is set.
- Blank LinkedIn / GitHub values do not render placeholder rows.
- Proof metrics are approved, softened, or held in the knowledge bank.
- Collaborator names, credits, photos, screenshots, and quotes are approved.
- `robots.txt` disallows `/` in staging.
- Sitemap contains only canonical public routes.
- Canonical URLs use the expected domain for the environment.
- 320px and 375px mobile widths do not overflow.
- Keyboard navigation works.
- Skip link works.
- Focus states are visible.
- Heading hierarchy is clear.
- Contrast is readable for buttons, badges, proof strips, and notices.
- Reduced motion preference is respected.
- Route redirects work.
- Staging review is complete.
- Production smoke test passes on the reviewed commit.

## Route Checks

Check:

- `/`
- `/work`
- `/work/technical-operations`
- `/work/harry-j-epstein`
- `/work/fair-rent-nyc`
- `/work/callnyc`
- `/work/wowlist`
- `/work/196-sunday-dinner`
- `/work/kc-town-hall`
- `/lab/source-backed-team-memory`
- `/resume`
- `/about`
- `/contact`
- `/colophon`
- `/api/health`
- `/robots.txt`
- `/sitemap.xml`
- `/opengraph-image`

Redirects:

- `/work/source-backed-team-memory` -> `/lab/source-backed-team-memory`
- `/work/196-artists-residency` -> `/work/196-sunday-dinner`
- `/work/fair-rent-crs` -> `/work/fair-rent-nyc`
- `/work/fairrentnyc-commercial-rent-stabilization` -> `/work/fair-rent-nyc`

## Production Approval

Production can only be promoted after:

- `APP_ENV=production`
- `SITE_URL=https://jamieburk.art`
- `NEXT_PUBLIC_SITE_URL=https://jamieburk.art`
- `NEXT_PUBLIC_ROBOTS_POLICY=index`
- `NEXT_PUBLIC_CONTACT_EMAIL` is Jamie's approved public email.
- `npm run check:production` passes.
- Jamie approves the exact reviewed staging commit.
