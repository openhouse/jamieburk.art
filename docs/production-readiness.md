# Production Readiness

This PR composes production-readiness and knowledge-bank work from the
`feature/production-readiness-composite+*` family without merging any candidate
branch wholesale.

## What Changed

- Added the Chad Lens professional-legibility standard.
- Added a governed proof-bank data layer and public claims inventory.
- Added public-safety, route-governance, and production preflight scripts.
- Added release, content-safety, typeface, and production-readiness docs.
- Hardened indexing so production indexing is opt-in.
- Kept Source-Backed Team Memory as a Lab / bounded method.
- Aligned public copy with Technical Operations / Product Operations /
  Implementation roles.

## Borrowed From

- A: Chad Lens, proofs-bank direction, public-claims inventory, type direction.
- B/N: production preflight discipline.
- C/E: public-safety and proof-data architecture.
- G: route and canonical redirect checks.
- L: quiet-launch and release-checklist discipline.
- O: bounded Source-Backed Team Memory and contact framing.

## Intentionally Rejected

- No app path rename.
- No CMS, database, auth, search, analytics, or chatbot.
- No private archive browser.
- No public proof-bank browser.
- No unapproved screenshots, photos, quotes, collaborators, or private
  documents.
- No private/proprietary fonts.
- No production indexing by default.

## Checks

```bash
npm ci
npm run typecheck
npm run lint
npm run check:public-safety
npm run check:routes
npm run build
npm run check
```

Production-like preflight:

```bash
APP_ENV=production \
SITE_ENV=production \
NEXT_PUBLIC_DEPLOY_ENV=production \
SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_ROBOTS_POLICY=index \
NEXT_PUBLIC_CONTACT_EMAIL=<approved-email> \
npm run check:production
```

## Remaining Production Blockers

- Jamie approval of exact resume PDF.
- Jamie approval of public contact path.
- Jamie approval of proof metrics and wording.
- Jamie approval or omission of collaborator names, screenshots, quotes, and
  artifacts.
- Accessibility and mobile review.
- Final staging review.
- Written production go from Jamie.
