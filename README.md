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
npm run test:evals
npm run test:knowledge-history
npm run test:composite
npm run test:hiring
npm run evals:application
npm run evals:production
npm run evals:composite
npm run evals:hiring
npm run report:citations
npm run preflight:staging
npm run preflight:production
```

## Knowledge Wiki

This repo includes **Knowledge Wiki**, formerly called Knowledge Bank: a
public-safe, Markdown-first editorial and research system with a compiled Wiki
Graph.

- `docs/knowledge-bank/`
- `apps/www/src/data/proofs.ts`
- `apps/www/src/data/knowledge-bank/records.ts`

The website is a projection of this Wiki. Pages select, sequence, and phrase
claims for specific readers. Do not add stronger claims to app copy without
first adding a public-safe proof record.

The knowledge bank is not a private archive. Do not commit raw transcripts,
private coalition notes, legal-review materials, private correspondence,
client-private material, internal analytics, raw community records, unapproved
photos, unapproved screenshots, or unapproved quotes.

There is intentionally no public `/proofs` or Knowledge Wiki route. The site should remain a
composed portfolio, not a claims database.

The current filesystem root remains `docs/knowledge-bank/` during the naming
compatibility cycle. Stable IDs carry Wiki identity; existing claim, source,
evidence, correction, and citation authority remains in
`apps/www/src/data/knowledge-bank/records.ts` until a separate migration is
reviewed.

```bash
npm run wiki:graph
npm run wiki:report
npm run wiki:check
npm run wiki:test
npm run wiki:tasks
npm run wiki:query -- --project callnyc
npm run evals:wiki
npm run test:hiring
npm run evals:hiring
```

Start with [the Knowledge Wiki](docs/knowledge-bank/README.md), its
[architecture decision](docs/architecture/ADR-knowledge-wiki-name-and-model.md),
the [authoring guide](docs/knowledge-bank/knowledge-wiki-authoring.md), and the
[hiring-acceptance protocol](docs/qa/hiring-acceptance/README.md).

Governed opportunity records preserve official-source freshness, hard screens,
role requirements, public evidence, Wiki gaps, and one-year success and risk
conditions. `npm run evals:hiring` keeps the public-only hiring evaluator
separate from the later Wiki gap resolver. It is an evaluation aid, not a
prediction, application submission, named person's review, or employment
acceptance decision.

`npm run knowledge-bank` checks the proof schema, projection rules, and work
metadata. `npm run check:routes` checks canonical routes and legacy redirects.
`npm run check:citations` validates the source-to-projection graph and redacted
public registry; `npm run test:citations` runs citation regressions; and
`npm run report:citations` writes an ignored review report to
`reports/generated/citations.md`.

`npm run evals:application` runs the deterministic application-readiness gates
and rubric adapters. `npm run evals:production` adds fail-closed deployment and
human-approval requirements. See `docs/evals/portfolio-readiness.md` before
changing evaluation definitions or beginning a recursive optimization run.
Both profiles require the weighted Chad-lens criterion and a dedicated
candidate-bound `chad-editorial` judgment.

The knowledge bank also has a recursive intake and promotion lifecycle. Run
`npm run evals:knowledge` to verify capture coverage, source decomposition,
claim provenance, independent statuses, project context, research honesty, and
projection restraint.

Append-only lifecycle events live in
`docs/knowledge-bank/lifecycle/history.jsonl`. Preview an intake, amendment,
retirement, or promotion decision before writing it:

```bash
npm run record:knowledge -- \
  --id HIST-YYYY-MM-DD-SHORT-ID \
  --type intake-receipt \
  --subject STABLE-SUBJECT-ID \
  --summary "Public-safe description"
```

Add `--write` only after reviewing the dry-run output. Committed history lines
must not be edited or deleted. Use a new amendment or retirement event.

Query the canonical graph without exposing protected locators:

```bash
npm run query:knowledge -- --project callnyc
npm run query:knowledge -- --claim CLM-CALLNYC-INDEPENDENT-FOLLOW-ON
npm run query:knowledge -- --surface /work/callnyc
```

`npm run check:knowledge-history` verifies JSONL structure and append-only Git
history. `npm run evals:composite` checks the frozen A-through-N integration
ledger, canonical architecture, semantic mutation fixtures, lifecycle command
surface, candidate-bound judgments, reviewability accounting, and governance
separation.

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
