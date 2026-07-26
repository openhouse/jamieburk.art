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

## Repository RFCs

Substantial architecture, governance, privacy-boundary, or cross-system changes
begin as versioned requests for comments under [`rfcs/`](./rfcs/README.md).
Merging an RFC in `proposed` or `exploring` state preserves the idea for
discussion; it does not authorize implementation. Run `npm run check:rfcs` to
validate the RFC index, metadata, required design sections, and public-safety basics. The root
`npm run check` command and pull-request CI both enforce this contract.

## Photographic Knowledge Loop

RFC 0003 is implemented through the public-safe photo records in
`docs/knowledge-bank/data/photo-knowledge.json` and the local commands under
`scripts/photo-knowledge/`. Source pixels, private archive identifiers,
permission correspondence, and protected locators remain outside public Git.

Use `npm run photos:report` to regenerate the governed report, then
`npm run photos:check` and `npm run photos:test` to verify it. The
`photos:placements`, `photos:permissions`, `photos:usage`, `photos:impact`,
`photos:health`, and `photos:edition` commands query the current verified
state. `photos:curatorial:run`, `photos:recollection`, and
`photos:withdrawal-plan` produce named advisory packets; none may publish,
withdraw, restore, deploy, or index a photograph.

An implemented withdrawal remains authoritative across branch history. A later
active projection requires a later canonical restoration decision that names
the photo and prior withdrawal, contains Jamie's completed human review,
accounts for every authority gate with gate-specific evidence, and binds
regenerated occurrence evidence. Always-applicable gates cannot be waived,
open production gates remain open, and each evidence record must be connected
to the named photograph. The canonical restoration decision uses constrained
generated semantics, so contradictory additions and future-dated records fail
closed. Manifest fields alone cannot authorize restoration; checking out older
content is never a publication decision.

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
