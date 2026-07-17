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
- `npm run atlas:bundle -- --output PATH`
- `npm run atlas:verify-bundle -- --input PATH`
- `npm run atlas:release`

## Public-Safety Rules

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health/financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, and careful collective-work language.

When uncertain, write: `TODO: Jamie approval required.`

## Atlas Knowledge Authority

Use `docs/atlas/records/canonical.json` as the canonical machine-readable
record and proof-claim layer. Use `docs/atlas/pages/` for the semantic Markdown
wiki and `@jamie-burkart/atlas` for all record, query, provenance, and
projection access.

The former `feature/evals-*` banks, `docs/knowledge-bank/`,
`apps/www/src/data/knowledge-bank/records.ts`, and the embedded legacy array in
`apps/www/src/data/proofs.ts` are frozen migration and audit sources. Do not add
new knowledge or new consumers there. Do not import the deprecated canonical
bank directly.

Do not add or strengthen a public factual claim without updating its Atlas
record, evidence relationship, source records, proof boundary, and projection
decision.

Use `<Claim>` for high-risk canonical wording and `<Cite>` for supported
authored prose. Do not type citation numbers manually.

Do not expose private source paths, private assets, protected locators, signed
URLs, or raw research artifacts. Regenerate the redacted public registry and
Atlas graph after changing canonical records.

Website copy should project from the knowledge bank and stay optimized for
clarity, audience, and purpose.

Do not strengthen a claim in a public page unless the stronger claim exists in
the bank with source basis, status, guardrail, and public-use boundary.

Every structured claim needs status, support level, evidence class, public
wording, guardrail, protected boundaries, and last-reviewed date.

## Atlas

Use `packages/atlas/` for the knowledge component,
`docs/atlas/records/canonical.json` for complete atomic records, and
`docs/atlas/pages/` for authored semantic pages. Atlas is canonical;
deprecated banks are reference-only and parity-checked migration inputs.

Every Atlas page needs stable identity, typed reciprocal relations, authority,
consent, public-use, correction-route, and review metadata. Regenerate and
check the disposable graph after semantic page or package changes.

Use `docs/atlas/feature-evals-integration.json` as the immutable A-N source cut,
`docs/atlas/generated/feature-evals-knowledge.json` as the federated inventory,
and `docs/atlas/stakeholder-credit.json` for named public-record contribution
boundaries. Do not convert a catalog entry into equivalence, endorsement,
permission, or a stronger public claim. Hash protected locators rather than
publishing them.

Before accepting canonical changes, run `npm run atlas:verify-legacy`,
`npm run atlas:verify-deprecation`, `npm run atlas:verify-history`,
`npm run atlas:generate`, `npm run atlas:check`, `npm run atlas:test`, and the
full `npm run check`. For release work, also materialize and verify a portable
bundle. Do not self-certify Atlas's three human gates or weaken the suite,
tasks, lineage, mutation probes, ontology, disposition, or variant contracts
to make a candidate pass.

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
