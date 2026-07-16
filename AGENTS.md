# AGENTS.md - jamieburk.art

## Mission

Build and maintain a focused, public-safe portfolio that makes Jamie legible as a
Technical Project Manager - Product Operations & Implementation lead who creates
operating structure for complex public-facing teams.

## Current Canonical App

Use `apps/www`. Do not rename it to `apps/site`, `apps/web`, or another path
without explicit approval.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, npm
workspaces, Dockerfile, Dokku.

## Commands

- `npm ci`
- `npm run dev`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run check`
- `npm run knowledge-bank`
- `npm run public-safety`
- `npm run check:routes`
- `npm run check:citations`
- `npm run test:citations`
- `npm run report:citations`
- `npm run atlas:generate`
- `npm run atlas:check`
- `npm run atlas:test`
- `npm run atlas:eval`

## Public-Safety Rules

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health/financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, and careful collective-work language.

When uncertain, write: `TODO: Jamie approval required.`

## Knowledge Bank

Use `docs/knowledge-bank/` and `apps/www/src/data/proofs.ts` as the
public-safe claim layer.

Citational claims use `apps/www/src/data/knowledge-bank/records.ts` as their
canonical machine-readable source. Do not add or strengthen a public factual
claim without updating the canonical claim, evidence relationship, and source
records.

Use `<Claim>` for high-risk canonical wording and `<Cite>` for supported
authored prose. Do not type citation numbers manually.

Do not expose private source paths, private assets, protected locators, signed
URLs, or raw research artifacts. Regenerate the redacted public registry after
changing canonical records.

Website copy should project from the knowledge bank and stay optimized for
clarity, audience, and purpose.

Do not strengthen a claim in a public page unless the stronger claim exists in
the bank with source basis, status, guardrail, and public-use boundary.

Every structured claim needs status, support level, evidence class, public
wording, guardrail, protected boundaries, and last-reviewed date.

## Atlas

Use `packages/atlas/` for the semantic Markdown component and
`docs/atlas/pages/` for authored Atlas pages. During the transition,
`apps/www/src/data/knowledge-bank/records.ts` remains canonical and Atlas
compiles complete, loss-checked project slices from it.

Every Atlas page needs stable identity, typed reciprocal relations, authority,
consent, public-use, correction-route, and review metadata. Regenerate and
check the disposable graph after semantic page or package changes.

Atlas is an in-process package, not a network service, CMS, database, or public
application. Do not add a public Atlas route without explicit approval.

The website should read as a composed portfolio, not a claims database.

Do not add `/proofs`, `/knowledge-bank`, or `/public-claims` public routes.

## Chad Lens

Minimize the reader's burden. Make Jamie visible as the actor, explain what the
work made usable, translate specialized language for hiring and public-sector
readers, and use collective-work language where the work was collective.

## Scope Rules

Do not add a CMS, database, auth, search, analytics, AI chatbot, archive browser,
private document browser, full photo archive, heavy animation, or major framework
change for V1.

## Recursive Launch Evals

For launch-readiness work, use `evals/launch-readiness/suite.json` as the
objective contract and follow `evals/launch-readiness/agent-loop.md`.

- Run `npm run eval:launch` before and after each iteration.
- Run the browser eval at the target environment and supported viewports.
- Use a fresh independent judge pass; an implementation agent must not grade
  its own patch as the only judge.
- Never self-certify Jamie approval, collaborator approval, rights, or consent.
- Accept a patch only when the lexicographic objective improves and existing
  knowledge-bank guardrails still pass.
- Stop after two plateau iterations or eight total iterations and request human
  input rather than widening scope indefinitely.

## Deployment

Staging first: `staging.jamieburk.art`, noindex.
Production later: `jamieburk.art`, indexable only after Jamie approves content.

## Voice

Precise, warm, modular, ethically grounded. Documentation is care. Do not
overclaim.
