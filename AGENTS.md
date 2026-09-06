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
- `npm run knowledge-wiki`
- `npm run knowledge-bank` (compatibility alias)
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
public-safe claim layer. The directory and TypeScript module names are
compatibility locators; the reader-facing product name is Knowledge Wiki.

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

Website copy should project from the Knowledge Wiki and stay optimized for
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
page. The Wiki should become deeper with each pass while the public site remains
selective.

## Repository Feature Proposals

Use `rfcs/` for substantial architecture, governance, privacy-boundary, data
model, package, repository, or cross-system proposals. Follow
`rfcs/0000-template.md` and run `node scripts/check-rfcs.mjs`. A merged `proposed` or
`exploring` RFC is preserved for review; it is not implementation authorization.
Agents may draft, critique, prototype, and test an RFC but may not advance a
decision that the RFC reserves for Jamie or another named human decision owner.

## Paired Private Workspace

For every permitted transcript ingest or repair, the audio workflow must refresh
one cited situated writer's voice entry per attributed speaker. Use the
source-bound `wiki` stage and its explicit private-root/voice-manifest inputs.
Complete generated reading tasks from permitted source context; do not mark
pending entries as close readings. Preserve source hashes, fragment/time/line
citations, attribution uncertainty, and interpretive limits. Never treat a
person mentioned in a transcript as its speaker, impersonate a participant,
or publish a private person page. Run `npm run test:audio-runtime` for changes
to this contract.

When `.workspace-pair.local.json` is present, this checkout participates in the
paired public/private development protocol defined by RFC 0011.

- Use `npm run pair:switch -- <branch>` instead of a raw branch switch.
- Run `npm run pair:status` before committing, pushing, or updating a pull
  request.
- Keep head branch, base branch, pull-request title, and draft posture aligned.
- Keep commits, checks, descriptions, approvals, merges, and rollback
  independent.
- Never commit the counterpart repository name, URL, pull request, local path,
  private IDs, source locators, or protected topology here.
- Never make a public build, test, deployment, or rollback depend on private
  access.
- A paired branch or review is coordination evidence, not publication, merge,
  deployment, consent, rights, or relationship authority.
## Scope Rules

Correspondence runtime changes use synthetic fixtures only in this repository.
Never add private mailbox inventories, coverage counts, source identifiers,
subjects, people mappings, or excerpts to public code, eval receipts, or PRs.
The private adapter owns source custody and per-message readings. Run
`npm run test:mail-runtime` after changing the shared protocol. A recipient is
not an author; a quoted reply is not a separately recovered outgoing message.
New or revised sources require cited analysis before their entries are current.
The runtime projects approved-for-private-analysis inputs; it does not grant
source access, perform autonomous mailbox collection, or approve publication.

Do not add a CMS, database, auth, search, analytics, AI chatbot, archive browser,
private document browser, full photo archive, heavy animation, or major framework
change for V1.

## Deployment

Staging first: `staging.jamieburk.art`, noindex.
Production later: `jamieburk.art`, indexable only after Jamie approves content.

## Voice

Precise, warm, modular, ethically grounded. Documentation is care. Do not
overclaim.
