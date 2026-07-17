# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager -
Product Operations & Implementation.

The site should make this believable: Jamie creates operating structure for
complex public-facing teams.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, npm
workspaces, Docker, and Dokku. The canonical app is `apps/www`.

## Local Development

```bash
nvm install
nvm use
npm ci
npm run dev
```

Use `.env.example` for local environment defaults.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run check
npm run knowledge-bank
npm run public-safety
npm run check:routes
npm run check:citations
npm run test:citations
npm run report:citations
npm run evals:composite
npm run evals:portfolio
npm run test:portfolio-evals
npm run evals:knowledge-bank
npm run evals:blind-spots
npm run check:knowledge-lifecycle
npm run check:knowledge-integrity
npm run preflight:staging
npm run preflight:production
```

The composite contract lives at `.agents/evals/composite-integration.json` and
references the three canonical suites under `.agents/evals/`. Run
`npm run evals:composite` to verify the four profiles, grader separation,
immutable run bindings, A-N source dispositions, and mutation requirements.
Validate the portfolio source contracts with `npm run evals:portfolio`. Score
a complete application-share or production-launch run with:

```bash
npm run evals:portfolio:score -- path/to/run.json
```

See `docs/evals/portfolio-production-readiness.md`,
`docs/evals/feature-evals-composite-decision-ledger.md`, and
`instructions-j.md` for grader separation, evidence requirements, stopping
rules, and the recursive improvement protocol.

## Knowledge Bank

This repo includes a public-safe knowledge bank for professional claims:

- `docs/knowledge-bank/`
- `apps/www/src/data/proofs.ts`
- `apps/www/src/data/knowledge-bank/records.ts`
- `apps/www/src/data/knowledge-bank/lifecycle-records.ts`
- `docs/knowledge-bank/governance/`

The website is a projection of this bank. Pages select, sequence, and phrase
claims for specific readers. Do not add stronger claims to app copy without
first adding a public-safe proof record.

The knowledge bank is not a private archive. Do not commit raw transcripts,
private coalition notes, legal-review materials, private correspondence,
client-private material, internal analytics, raw community records, unapproved
photos, unapproved screenshots, or unapproved quotes.

There is intentionally no public `/proofs` route. The site should remain a
composed portfolio, not a claims database.

`npm run knowledge-bank` checks the proof schema, projection rules, and work
metadata. `npm run check:routes` checks canonical routes and legacy redirects.
`npm run check:citations` validates the source-to-projection graph and redacted
public registry; `npm run test:citations` runs citation regressions; and
`npm run report:citations` writes an ignored review report to
`reports/generated/citations.md`.

The lifecycle workbench is offline and repository-only. Use
`npm run knowledge:intake` to emit or append an immutable public-safe receipt,
`npm run check:knowledge-lifecycle` to validate maturity and decisions,
`npm run report:knowledge-lifecycle` for a maintenance summary, and
`npm run query:knowledge-lifecycle` for a bounded research or exact-surface
palette. `npm run check:knowledge-integrity` enforces collective-credit classes,
exact proof inventories, projection-source bindings, composition budgets, and
mosaic-privacy review. None of these commands creates a public knowledge-bank
route.

## Environment

Staging is the first deployment target and is non-indexable by default:

```bash
APP_ENV=staging
SITE_ENV=staging
NEXT_PUBLIC_DEPLOY_ENV=staging
SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_SITE_URL=https://staging.jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=noindex
NEXT_TELEMETRY_DISABLED=1
```

Production should only be enabled after staging review:

```bash
APP_ENV=production
SITE_ENV=production
NEXT_PUBLIC_DEPLOY_ENV=production
SITE_URL=https://jamieburk.art
NEXT_PUBLIC_SITE_URL=https://jamieburk.art
NEXT_PUBLIC_ROBOTS_POLICY=index
NEXT_TELEMETRY_DISABLED=1
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone
output.

Staging first:

```txt
jamieburk-art-staging -> staging.jamieburk.art
```

Production later:

```txt
jamieburk-art -> jamieburk.art
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to the
container. See `docs/deployment.md` for the staging and production command
drafts, Docker build args, and verification checklist.

## Typeface Policy

Use Karla for body/UI text and League Spartan for display headings. Do not commit
or serve private, proprietary, or unlicensed font files.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes,
  legal-review materials, health or financial details, private correspondence,
  unapproved photos, private fonts, credentials, stakeholder lists, internal
  analytics, client-private materials, or raw community records.
- Use public-safe summaries, redacted screenshots, representative diagrams,
  approved public artifacts, and careful collective-work language.
- When uncertain, mark: `TODO: Jamie approval required.`
  Do not render that marker in production-facing pages; keep launch blockers in
  `docs/knowledge-bank/launch-blockers.md`.

## Launch Blockers

- Confirm public email.
- Confirm LinkedIn and GitHub links.
- Confirm screenshots/artifacts.
- Confirm exact proof metrics.
- Confirm collaborator names, photos, and quotes.
- Confirm staging noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.
