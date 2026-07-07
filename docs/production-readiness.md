# Production Readiness

This branch composes a small knowledge-bank / production-readiness layer without
applying any candidate branch wholesale.

## What This Adds

- Chad Lens editorial guidance.
- A canonical internal knowledge bank in `docs/knowledge-bank/`.
- Typed public-safe proof data in `apps/www/src/data/proofs.ts`.
- Public-safety, route, and production preflight scripts.
- Karla + Archivo Narrow via `next/font/google`.
- Contact environment variables and graceful missing-contact handling.
- Production indexing as explicit opt-in.
- Resume PDF noindex behavior.

## Intentionally Omitted

- Public knowledge-bank, proofs, claims, or internal routes.
- CMS, database, auth, search, analytics, chatbot, or contact form.
- Private archive browser.
- Raw evidence files.
- Unapproved screenshots, quotes, photos, or collaborator details.
- Private/proprietary font files.

## Checks

Run before publishing a PR:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run public-safety
npm run check:routes
```

Production-like preflight requires explicit production env values and an
approved contact path:

```bash
APP_ENV=production \
SITE_ENV=production \
NEXT_PUBLIC_DEPLOY_ENV=production \
SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_ROBOTS_POLICY=index \
NEXT_PUBLIC_CONTACT_EMAIL=<approved-public-email> \
npm run preflight:production
```

## Remaining Production Decisions

- Jamie approves exact public contact paths.
- Jamie approves final résumé/public contact surfaces.
- Jamie approves proof metrics and claim wording.
- Collaborator-sensitive claims remain omitted or summary-only until approved.
- Jamie gives written go before production indexing.
