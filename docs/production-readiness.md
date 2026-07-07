# Production Readiness

## Summary

This PR adds a governed knowledge/proofs bank and production-readiness gate for
`jamieburk.art`.

It keeps `apps/www`, preserves the current Next.js / React / TypeScript / MDX /
Tailwind / daisyUI / Node 26 / Docker / Dokku architecture, and makes public
claims harder to overstate or misuse.

## What Changes

- Adds Chad-lens editorial guidance.
- Adds a narrative knowledge bank.
- Adds a public-safe proofs bank and public claims inventory.
- Adds structured proof data at `apps/www/src/data/proofs.ts`.
- Projects proof data into the homepage proof strip, resume page, and Technical
  Operations page.
- Updates homepage positioning to: "I turn under-structured work into usable
  systems."
- Uses Karla and Archivo Narrow as the served V1 typefaces.
- Centralizes contact data in `apps/www/src/data/site.ts`.
- Keeps LinkedIn and GitHub optional.
- Adds public-safety, staging preflight, production preflight, and route checks.
- Keeps staging noindex and production indexing opt-in.
- Adds redirects for likely alternate work URLs.

## What Remains Blocked

Production remains blocked until Jamie approves:

- Public email.
- Resume page and resume PDF for production promotion.
- Proof metrics and wording.
- Screenshots, artifacts, photos, and quotes.
- Collaborator names and credits.
- Final staging review.

## Staging Behavior

Staging may be honest about pending approvals. It must remain noindex:

```bash
APP_ENV=staging \
SITE_URL=https://staging.jamieburk.art \
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art \
NEXT_PUBLIC_ROBOTS_POLICY=noindex \
npm run preflight:staging
```

## Production Behavior

Production must be clean and explicitly indexable:

```bash
APP_ENV=production \
SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_SITE_URL=https://jamieburk.art \
NEXT_PUBLIC_ROBOTS_POLICY=index \
NEXT_PUBLIC_CONTACT_EMAIL=<approved-public-email> \
npm run check:production
```

Production indexing is never inferred from the production URL alone.

## Smoke-Test Commands

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run public-safety
npm run preflight:staging
```

After starting the built app:

```bash
npm run check:routes -- http://127.0.0.1:3015
```

## Approval Checklist

- Jamie approves public email.
- Jamie approves resume page and resume PDF.
- Jamie approves proof metrics.
- Jamie approves collaborator names / credits.
- Jamie approves screenshots / artifacts / photos / quotes.
- Jamie approves staging review.
- Production preflight passes on the reviewed commit.
