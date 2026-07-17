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
npm run check:knowledge-bank
npm run evals:portfolio
npm run evals:chad-lens
npm run evals:margaret-morse
npm run evals:warren-sack
npm run evals:knowledge-bank-lifecycle
npm run evals:blind-spots
npm run evals:portfolio-readiness
npm run public-safety
npm run check:routes
npm run check:citations
npm run test:citations
npm run check:knowledge-intake
npm run test:knowledge-intake
npm run test:portfolio-readiness
npm run report:citations
npm run preflight:staging
npm run preflight:production
```

## Knowledge Bank

This repo includes a public-safe knowledge bank for professional claims:

- `docs/knowledge-bank/`
- `apps/www/src/data/proofs.ts`
- `apps/www/src/data/knowledge-bank/records.ts`

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

Public-safe fragments that are not yet canonical can enter through the governed
queue documented in `docs/knowledge-bank/intake/README.md`. Inspect a draft with
`npm run knowledge:intake -- --help`, then add `--write` only after review.
`npm run knowledge:query -- --help` searches the canonical bank and queue.
`npm run knowledge:palette -- --surface /exact-route` returns only active
projections authorized for that exact surface; it never edits the site.

## Portfolio Claim Evals

`evals/portfolio-claims/evals.json` expresses the portfolio's editorial intent
as hard gates, scored criteria, public-safe fixtures, and a bounded recursive
revision protocol. It rewards strong evidence-backed language while blocking
overclaiming, underclaiming, unsafe publication, misplaced credit, and
pathologizing descriptions of emerging work.

Run `npm run evals:portfolio` to validate the suite. See
`evals/portfolio-claims/README.md` for the generator/judge loop and stopping
criterion.

`evals/chad-lens/eval.json` separately tests whether a claim minimizes reader
burden, makes Jamie's bounded action visible, explains what became usable,
translates specialist language, and preserves collective credit. Run
`npm run evals:chad-lens` to validate that focused eval and its committed runs.

`evals/margaret-morse-lens/eval.json` tests embodied inquiry, tending and
hospitality, material specificity, art-life continuity, and artistic value that
cannot be reduced to organizational utility. `evals/warren-sack-lens/eval.json`
tests recursive relational reasoning, translation across representations,
prototype maturity, source rigor, and collective agency. Run
`npm run evals:margaret-morse` and `npm run evals:warren-sack` to validate their
independent read-only judge artifacts and two-pass stopping receipts.

`evals/knowledge-bank-lifecycle/evals.json` tests the full
intake-to-source-to-claim-to-projection process, including bank-only material,
open role hypotheses, citation maintenance, and photo discoveries that return
as research leads. Run `npm run evals:knowledge-bank-lifecycle` to validate the
suite, graph, and committed recursive runs.

`evals/portfolio-system-blind-spots/evals.json` tests external-validation gaps,
inquiry accumulation, attribution, platform-shaped evidence, additive
composition, mosaic privacy, evaluator independence, and indefinite polishing.

`evals/portfolio-readiness/` coordinates the existing suites for one exact
candidate and rubric digest. A `system-ready` result requires deterministic
gates and two independent judges across two consecutive rounds. Human checks
separately govern `application-ready` and `production-ready`; an LLM cannot
grant those states. See `docs/evals/composite-integration.md` and
`docs/evals/human-validation.md`.

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

## Launch State

Machine readiness, application readiness, and production readiness are separate.
The canonical human-owned states live in
`evals/portfolio-readiness/human-status.json`; detailed content blockers remain
in `docs/knowledge-bank/launch-blockers.md`. A passing build does not authorize
sharing, media reuse, production deployment, or indexing.
