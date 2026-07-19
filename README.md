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
npm run wiki:check
npm run wiki:test
npm run wiki:eval
npm run wiki:report
npm run wiki:query -- --id project.callnyc
npm run public-safety
npm run check:knowledge-lifecycle
npm run check:chad-lens
npm run check:evals
npm run check:routes
npm run check:citations
npm run test:citations
npm run report:citations
npm run preflight:staging
npm run preflight:production
```

## Knowledge Wiki

This repo includes a public-safe **Knowledge Wiki**, formerly called the
Knowledge Bank. Its current compatibility paths are:

- `docs/knowledge-bank/`
- `apps/www/src/data/proofs.ts`
- `apps/www/src/data/knowledge-bank/records.ts`

The Wiki is a Markdown-first editorial and research system with a compiled
semantic graph. The website is a selective projection. Pages select, sequence, and phrase
claims for specific readers. Do not add stronger claims to app copy without
first adding a public-safe proof record.

The Knowledge Wiki is not a private archive. Do not commit raw transcripts,
private coalition notes, legal-review materials, private correspondence,
client-private material, internal analytics, raw community records, unapproved
photos, unapproved screenshots, or unapproved quotes.

There is intentionally no public `/proofs` route. The site should remain a
composed portfolio, not a claims database.

`npm run knowledge-bank` remains the compatibility command for the proof
schema, projection rules, and work metadata. `npm run wiki:check` validates
governed Markdown identity, links, typed relations, canonical references,
rights, and projections; `npm run wiki:test` runs mutation regressions;
`npm run wiki:eval` evaluates the bounded foundation; and
`npm run wiki:report` creates ignored derived graph and health artifacts.
`npm run check:routes` checks canonical routes and legacy redirects.
`npm run check:citations` validates the source-to-projection graph and redacted
public registry; `npm run test:citations` runs citation regressions; and
`npm run report:citations` writes an ignored review report to
`reports/generated/citations.md`.

`docs/qa/recursive-evals-M.md` defines the repeatable launch-readiness loop for
claim review, public-safety boundaries, hiring clarity, web QA, and production
cutover checks. `npm run check:chad-lens` runs the deterministic hiring-clarity
criterion. `npm run check:evals` combines that criterion with the existing
knowledge-lifecycle, public-safety, and route gates; it does not create a second
safety scanner.

`docs/knowledge-bank/intake-and-maturation.md` defines how URLs, memories,
artifacts, repositories, and photo discoveries enter the Knowledge Wiki,
develop through research, and remain available even when they are not selected
for the current public site.

The personal Facebook archival pass is documented through an aggregate-only
[1,243-record census](docs/knowledge-bank/jamie-facebook-post-census-2026-07-13.csv)
and [bounded research report](docs/knowledge-bank/jamie-facebook-posts-2026-07-13.md).
The raw personal corpus stays outside the repository.

## Requests for Proposal

Substantial future architecture, governance, product, and operating-model ideas
develop under [`rfps/`](rfps/README.md) before implementation. RFPs are
public-safe design documents. Proposal or acceptance does not by itself
authorize implementation, publication, source access, migration, or
deployment.

The first proposal, [RFP 0001](rfps/0001-dual-knowledge-wiki-architecture.md),
describes a deferred dual-Wiki architecture with a shared core package, a
private personal Wiki, the current public professional Wiki, a separate source
vault, and a human-gated promotion path. It must not be implemented as part of
the pull request that introduced it.

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

## Launch Readiness Review

- Confirm public email, LinkedIn, GitHub, and resume links.
- Confirm proof metrics use supportable, bounded wording.
- Confirm collaborator names, photos, quotes, and artifacts are public-safe.
- Confirm staging noindex behavior.
- Confirm production metadata points to `https://jamieburk.art`.
- Confirm no private/proprietary fonts are committed or served.
- Confirm public pages contain no TODO, placeholder, pending approval, or
  before-launch language.
