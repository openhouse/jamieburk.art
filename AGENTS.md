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
- `npm run check:knowledge-evals`
- `npm run test:knowledge-evals`
- `npm run report:knowledge-evals`

## Public-Safety Rules

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health/financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, and careful collective-work language.

When uncertain, write: `TODO: Jamie approval required.`

## Knowledge Wiki

Use `docs/knowledge-bank/` and `apps/www/src/data/proofs.ts` as the
public-safe claim layer.

Citational claims use `apps/www/src/data/knowledge-bank/records.ts` as their
canonical machine-readable source. Do not add or strengthen a public factual
claim without updating the canonical claim, evidence relationship, and source
records.

New fragments enter through stable intake records and atomic observations. Give
every public-safe item a disposition; do not silently discard it. Keep factual
maturity separate from compositional selection: a defensible claim may remain a
held projection with no public surface. Memory and photo leads require research
inquiries before they become claims.

Use `agency-graph.ts` to keep actor, action, purpose, result, and credit scope
explicit. Advocacy, testimony, participation, and coalition work are not
legislative enactment or sole causation. Unresolved agency remains an inquiry.

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

The website should read as a composed portfolio, not a claims database.

Do not add `/proofs`, `/knowledge-bank`, or `/public-claims` public routes.

## Chad Lens

Minimize the reader's burden. Make Jamie visible as the actor, explain what the
work made usable, translate specialized language for hiring and public-sector
readers, and use collective-work language where the work was collective.

## Recursive Evals

Use `.agents/evals/portfolio-production-readiness.json` for recursive launch
improvement. Hard gates are invariants and cannot be averaged away by a high
judge score. Improve the lowest-scoring criterion with one bounded change,
rerun every affected case, and keep the change only when the objective improves
without weakening truth, consent, collective credit, accessibility, or
exact-commit release discipline.

Use `evals/knowledge-bank/evals.json` for recursive intake and claim maturation.
Run its deterministic checks before promoting a claim or source into a public
page. The bank should become deeper with each pass while the public site remains
selective.

## Photography Notebook

- Use `docs/knowledge-bank/notebooks/photography/` for public-safe field notes,
  provisional visual readings, sequence sketches, and version reviews.
- A notebook is not a source, claim, rights record, consent record, or public
  projection. Keep notebook projection status on hold.
- Keep original images, previews, library paths, people tags, face embeddings,
  reconnecting identifiers, and private rights or consent details outside the
  public repository.
- Separate visible observation, reviewed metadata, attributed memory,
  interpretation, research leads, and supported claims.
- Selection is not publication. Evidence value, rights, consent, safety,
  editorial selection, and surface approval remain independent decisions.
- Preserve outliers, contradiction, competing sequences, and protected absence.
  Do not turn the first photo field into a deterministic aesthetic ranking.
- Run `npm run wiki:test` and `npm run evals:wiki` after changing the notebook or
  its governing schema.

## Requests for Comments

Use `rfcs/` for substantial architecture, governance, privacy-boundary, data
model, package, repository, or cross-system proposals. Follow
`rfcs/0000-template.md` and run `node scripts/check-rfcs.mjs`. A merged `proposed` or
`exploring` RFC is preserved for review; it is not implementation authorization.
Agents may draft, critique, prototype, and test an RFC but may not advance a
decision that the RFC reserves for Jamie or another named human decision owner.
## Scope Rules

Do not add a CMS, database, auth, search, analytics, AI chatbot, archive browser,
private document browser, full photo archive, heavy animation, or major framework
change for V1.

## Deployment

Staging first: `staging.jamieburk.art`, noindex.
Production later: `jamieburk.art`, indexable only after Jamie approves content.

## Voice

Precise, warm, modular, ethically grounded. Documentation is care. Do not
overclaim.
