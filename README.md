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
npm run check:evals
npm run test:evals
npm run eval:launch
npm run check:knowledge-lifecycle
npm run test:knowledge-lifecycle
npm run eval:knowledge-lifecycle
npm run eval:knowledge-lifecycle:gate
npm run eval:launch:browser -- --url http://127.0.0.1:3000 --profile local
npm run preflight:staging
npm run preflight:production
```

## Launch Readiness Evals

`evals/launch-readiness/` turns the portfolio's launch intentions into a
recursive improvement contract for implementation and judge agents. It keeps
deterministic source gates, browser behavior, LLM-judged editorial quality, and
human approvals separate so an agent cannot award itself consent or production
approval.

```bash
# Report source-level release blockers and quality targets.
npm run eval:launch

# Test a running build at the supported routes and viewports.
npm run eval:launch:browser -- \
  --url https://staging.jamieburk.art \
  --profile staging

# Compare two complete reports lexicographically.
npm run eval:launch:compare -- before.json after.json
```

Read `evals/launch-readiness/agent-loop.md` before recursive work. A full
release decision also needs an independent assessment based on
`judge-prompt.md`, a passing browser report, and named confirmation of every
human gate. `npm run preflight:production` intentionally enforces the
source-level launch gate.

The suite maps eight recurring blind spots to deterministic, browser, judge,
and human evaluations. See
`evals/launch-readiness/blind-reader-protocol.md`,
`docs/knowledge-bank/corroboration-register.json`, and
`docs/production-cutover.md` for human handoff paths that agents may prepare but
may not self-certify.

## Knowledge Bank

This repo includes a public-safe knowledge bank for professional claims:

- `docs/knowledge-bank/`
- `apps/www/src/data/proofs.ts`
- `apps/www/src/data/knowledge-bank/records.ts`

The website is a projection of this bank. Pages select, sequence, and phrase
claims for specific readers. Do not add stronger claims to app copy without
first adding a public-safe proof record.

`docs/knowledge-bank/lifecycle.md` defines the loss-resistant path from intake
through source reading, claim maturity, research, and an independent
publication decision. The recursive checks live in
`evals/knowledge-lifecycle/`.

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
