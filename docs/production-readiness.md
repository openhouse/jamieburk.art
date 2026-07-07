# Production Readiness

This PR introduces a public-safe Knowledge Bank and claim-governance layer,
then projects selected approved claims into the existing V1 portfolio.

## What This PR Adds

- A canonical public-safe Knowledge Bank under `docs/knowledge-bank/`.
- Chad Lens copy rules for professional legibility.
- Public-safety rules and private-source exclusion patterns.
- Production-aware robots/indexing controls.
- Route, public-safety, knowledge-bank, and production-preflight scripts.
- Karla + Archivo Narrow via `next/font/google`.
- Clearer Technical Operations and Product Operations positioning.

## What Is Intentionally Not Changed

- No CMS, database, auth, search, analytics, AI chatbot, or archive browser.
- No app rename; `apps/www` remains canonical.
- No package-manager switch.
- No new public `/proofs` or `/knowledge-bank` page.
- No publication of raw private source material.
- No automatic production indexing.
- No replacement of the resume PDF unless exact approval is already supplied.

## Preserved

- `apps/www` canonical app path.
- Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26,
  Dockerfile, and Dokku posture.
- Staging-first release behavior.
- Bounded V1: no CMS, database, auth, search, analytics, contact form, AI
  chatbot, public proofs route, or private archive browser.

## Adopted From Composite Family

- composite+F: private-directory ignores, contact environment fields, Karla +
  Archivo Narrow typography, deployment/public-safety/release/proofs docs, and
  public-safety workflow.
- composite+A: Chad Lens, professional-legibility rules, claims-inventory
  mindset, and typography migration away from League Spartan.
- composite+M: `docs/knowledge-bank/chad-lens.md`, proof hierarchy, and stronger verbs for
  stewardship, synthesis, coordination, and analysis.
- composite+K / G / J: claim register, Knowledge Bank projection logic,
  private-material exclusions, opt-in production indexing, and public-safety
  gates.
- composite+N: structured contact source-of-truth pattern and no visible public
  approval placeholders.
- composite+O: route compatibility redirects, key/font/private-file exclusions,
  and route smoke-test thinking.

## Launch Gates

- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run check`
- `npm run knowledge-bank`
- `npm run public-safety`
- `npm run preflight:staging`
- `npm run preflight:production`
- Manual review of contact, resume, Technical Operations, FairRentNYC,
  Source-Backed Team Memory, mobile labels, and long-page reading.
- Chad Lens review for purpose, agency, legibility, precision, contribution, and
  reader burden.
- Knowledge Bank review for claim status, evidence class, website projection, and
  protected boundaries.

## Remaining Launch Blockers

- Jamie approval of public email/contact path if any contact value is displayed.
- Jamie approval of resume PDF and phone-in-PDF behavior.
- Jamie approval of proof metrics that remain `Pending` or `Careful`.
- Collaborator consent for any future names, credits, quotes, screenshots, or
  photos.
- Staging smoke tests against the deployed domain.
- Production smoke tests immediately after deploy.

## Indexing and Routes

Production indexing is explicit opt-in:

```txt
NEXT_PUBLIC_ROBOTS_POLICY=index
```

Anything else defaults to noindex/nofollow. The resume PDF remains noindex and
noarchive for V1.

Canonical V1 routes:

- `/work/fair-rent-nyc`
- `/work/196-sunday-dinner`
- `/lab/source-backed-team-memory`
- `/work/technical-operations`

Route compatibility redirects are temporary in this PR. Permanent redirects can
be revisited after production behavior is verified.
