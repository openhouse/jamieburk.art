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
- `npm run test:evals`
- `npm run test:knowledge-history`
- `npm run test:composite`
- `npm run evals:application`
- `npm run evals:production`
- `npm run evals:composite`
- `npm run test:hiring`
- `npm run evals:hiring`

## Public-Safety Rules

Do not publish private emails, raw transcripts, private coalition notes,
legal-review materials, health/financial details, private correspondence,
unapproved photos, private fonts, credentials, private stakeholder lists,
internal analytics, client-private materials, or raw community records.

Use public-safe summaries, redacted examples, representative diagrams, approved
artifacts, and careful collective-work language.

When uncertain, write: `TODO: Jamie approval required.`

## Knowledge Wiki

Knowledge Wiki is the canonical current product name. Knowledge Bank remains a
historical and command/path compatibility alias during migration.

Markdown is the human record, the Wiki Graph is derived, and the portfolio is a
selective projection. The current canonical Markdown root remains
`docs/knowledge-bank/`; do not create a competing `docs/knowledge-wiki/` tree or
perform a global rename without a reviewed migration.

Use stable IDs, ordinary relative links, and governed typed relations. Paths and
titles may change; stable IDs must survive. Run `npm run wiki:check`, `npm run
wiki:test`, and `npm run evals:wiki` after changing governed records. Regenerate
reports with `npm run wiki:report`; never hand-edit generated Wiki artifacts.

Human comprehension, collaborator consent, rights clearance, editorial
approval, and production observation remain manual gates. Do not translate an
automated pass into human approval.

### Compatibility Layer

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

### Knowledge Lifecycle

- Capture every submitted fragment with a stable intake ID and disposition.
- Keep knowledge maturity, publication safety, and editorial selection separate.
- A memory is a research lead, not a confirmed claim.
- Closely read sources into both support and non-support fields.
- Keep private originals outside the public repo behind opaque locator IDs.
- Do not project every mature claim onto the site.
- Use `npm run record:knowledge -- ...` to preview an append-only lifecycle
  event. Add `--write` only after reviewing the complete event.
- Use `npm run query:knowledge -- ...` for a redacted source, claim, project,
  surface, intake, or history trace. Query output must not expose protected
  locators.
- Do not rewrite or delete a committed line in
  `docs/knowledge-bank/lifecycle/history.jsonl`; add an amendment, retirement,
  or promotion-decision event instead.
- Run `npm run evals:knowledge` before opening or updating a knowledge-bank PR.

## Chad Lens

Minimize the reader's burden. Make Jamie visible as the actor, explain what the
work made usable, translate specialized language for hiring and public-sector
readers, and use collective-work language where the work was collective.

The application eval requires a dedicated `chad-editorial` judgment in addition
to deterministic phrase checks. A generic hiring-manager pass cannot substitute
for this review.

## Employment Acceptance

- Keep one professional frame; do not turn the portfolio into a separate site
  for each employer.
- Govern live opportunity facts with an official URL, verification date,
  reverify date, stable requirement IDs, hard screens, and explicit unknowns.
- The hiring evaluator may see only the public portfolio, public resume,
  sanitized role context, and reader context.
- Run the Wiki gap resolver afterward. Hidden evidence cannot persuade the
  hiring evaluator.
- Named reader profiles are simulated public-context lenses, never actual
  participation, endorsement, private opinion, or hiring decisions.
- Keep private application status, warm paths, work authorization, and
  acceptance decisions outside the public repository.
- Do not delay a live top-priority application more than one working day for
  portfolio optimization.

## Recursive Evals

Use `evals/portfolio-readiness/suite.json` as the frozen contract for an
optimization cycle. Run deterministic gates before model judgment. Change one
highest-value failing criterion at a time, compare against the accepted
baseline, reject public-safety or claim-integrity regressions, and stop when the
selected profile reaches its configured consecutive-pass criterion.

Do not improve a score by editing the eval during a candidate comparison,
hiding a finding, adding unsupported claims, publishing protected evidence, or
moving internal evaluation narration into public copy. Application-ready does
not imply production-ready.

For `feature/evals-*` integration, use
`evals/composite-integration/suite.json` and the A-through-N disposition ledger.
Keep the frozen branches read-only, preserve one canonical architecture, bind
judgments to the exact candidate and contract, and run `npm run
evals:composite` twice without changes before stopping.

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
