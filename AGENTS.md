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
- `npm run evals:portfolio`
- `npm run evals:chad-lens`
- `npm run evals:margaret-morse`
- `npm run evals:warren-sack`
- `npm run evals:knowledge-bank-lifecycle`
- `npm run evals:blind-spots`
- `npm run evals:portfolio-readiness`
- `npm run check:knowledge-intake`
- `npm run knowledge:query -- --help`
- `npm run knowledge:palette -- --surface /exact-route`
- `npm run public-safety`
- `npm run check:routes`
- `npm run check:citations`
- `npm run test:citations`
- `npm run report:citations`

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

The website should read as a composed portfolio, not a claims database.

Do not add `/proofs`, `/knowledge-bank`, or `/public-claims` public routes.

New public-safe fragments may enter through
`docs/knowledge-bank/intake/`. A queue receipt is a lead, not a canonical source
or claim. Mature it into the typed Knowledge Bank before strengthening public
copy. Protected leads use only an opaque locator and public-safe summary.

Publication-safe retrieval requires an exact named surface. A palette is an
editorial candidate set, never an automatic publish command.

## Claim Evals

Use `evals/portfolio-claims/evals.json` when an LLM agent drafts or strengthens
portfolio claims. Hard gates outrank rhetorical quality. Keep the highest-scoring
candidate that passes every gate, compare revisions for regression, and stop
only at the suite's explicit threshold. If the threshold is not reached within
the iteration limit, return the best passing candidate with unresolved criteria
instead of claiming completion.

Use `evals/chad-lens/eval.json` for focused hiring-language revisions. A Chad
Lens pass requires all five dimensions together and two consecutive independent
passes; do not trade collective credit or evidentiary scope for readability.

Use `evals/margaret-morse-lens/eval.json` to preserve embodied inquiry,
sustained tending, material specificity, art-life continuity, and value beyond
organizational utility. Do not make art justify itself only through hiring.

Use `evals/warren-sack-lens/eval.json` to test recursive relational reasoning,
translation across data, media, interfaces, and physical space, accurate
prototype status, source rigor, and collective agency. Do not mistake platform
traces for the relationships they represent.

Use `evals/knowledge-bank-lifecycle/evals.json` when new sources, memories,
artifacts, corrections, or photo leads arrive. Capture first, decompose sources,
separate claim maturity from projection selection, open explicit research paths,
and stop only at the suite's independent two-pass threshold.

Use `evals/portfolio-system-blind-spots/evals.json` to test the portfolio process
against external-validation gaps, inquiry accumulation, individual-role gaps,
platform-shaped evidence, additive composition, mosaic privacy, evaluator
self-certification, and indefinite polishing. A pass confirms the controls, not
an external outcome. Keep hiring-reader, collaborator, and application results
`not-yet-measured` until separately observed.

## Composite Readiness

Use `evals/portfolio-readiness/` to coordinate the existing domain suites. Do
not create another claim, proof, or lifecycle registry inside the composite.

Every readiness run binds to an exact Git revision, public candidate digest,
and rubric digest. Any candidate or rubric change invalidates prior judgment.
Keep failed and superseded iterations.

System readiness requires every deterministic hard gate and two independent
LLM judges across two consecutive non-regressing rounds. LLMs may certify only
`system-ready`. Hiring-reader results, collaborator corroboration, exact
candidate approval, media rights, production indexing, deployment, and
post-deploy verification remain human-owned states in
`evals/portfolio-readiness/human-status.json`.

Do not weaken a rubric, lower a threshold, hide a failure, or relabel an
unmeasured state to improve a score. At the iteration limit, preserve the best
passing candidate and name what remains unresolved.

## Chad Lens

Minimize the reader's burden. Make Jamie visible as the actor, explain what the
work made usable, translate specialized language for hiring and public-sector
readers, and use collective-work language where the work was collective.

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
