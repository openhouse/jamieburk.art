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
- `npm run check:launch-evals`
- `npm run test:launch-evals`
- `npm run report:launch-evals`
- `npm run check:knowledge-evals`
- `npm run test:knowledge-evals`
- `npm run report:knowledge-evals`
- `npm run knowledge:intake -- --help`
- `npm run knowledge:query -- --type claim --active`
- `npm run knowledge:report -- --write`
- `npm run knowledge:projection-map -- --write`
- `npm run check:projections`
- `npm run check:eval-contract`
- `npm run certify:eval-contract`
- `npm run check:eval-records`
- `npm run test:eval-contract`
- `npm run test:browser-evals`
- `npm run eval:run`
- `npm run eval:record-holdout`

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

New fragments enter through stable intake records and atomic observations. Give
every public-safe item a disposition; do not silently discard it. Keep factual
maturity separate from compositional selection: a defensible claim may remain a
held projection with no public surface. Memory and photo leads require research
inquiries before they become claims.

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

## Launch-Readiness Evals

Use `evals/launch-readiness/evals.json` for recursive launch improvement. Hard
gates are invariants and cannot be averaged away by a high judge score. Improve
the lowest-scoring criterion with one bounded change, rerun every affected
case, and keep the change only when the objective improves without weakening
truth, consent, collective credit, accessibility, or exact-commit release
discipline. Follow `evals/launch-readiness/judge.md`; do not expose private
evidence to an evaluator.

Use `evals/knowledge-bank/evals.json` for recursive intake and claim maturation.
Run its deterministic checks before promoting a claim or source into a public
page. The bank should become deeper with each pass while the public site remains
selective.

Use `evals/_shared/contract.json` as the frozen contract joining the three eval
suites. Every certifying run must record the contract digest, governed-input
digest, candidate commit and tree, actual command exit codes, criterion evidence,
judge independence, prior-score visibility, disagreements, overrides, and open
external gates. A rubric change requires a version change and resets the streak.
Do not edit the rubric while optimizing the candidate. Two independent holdouts
must review the same unchanged governed candidate without prior scores.

Deterministic run records must carry all seven decision dimensions, evidence,
unresolved risks, the human-authority log, disagreements, overrides, and every
reopen trigger. Describe automated coverage honestly; do not present a
deterministic assessment as a human or editorial judgment.

For high-risk claims, bind each public surface to the canonical claim projection
and required boundary language. Do not duplicate or weaken that language in a
page-local string.

Use the canonical runner only after committing a frozen candidate. Preserve
failed and rejected runs in the hash chain. A holdout must use a governed prompt,
a distinct stable session ID, all ten criteria, and evidence for every score.
The validator recomputes candidate identity, score floors, and weighted results;
do not hand-author a passing decision.

Retain raw and human-readable canonical runner logs plus versioned prompts. A
holdout must attest its model context, provider, candidate, prompt, and process
separation. That attestation is not human identity proof. A human refusal,
blocking finding, or later rejected holdout resets the current acceptance phase
and cannot be averaged away. Use `check:eval-contract` for structural validation
and `certify:eval-contract` only after the recursive stop condition is expected
to pass.

Use `npm run knowledge:intake` for public-safe leads. It is dry-run by default;
`--write` appends an intake receipt, not a claim. Keep duplicate receipts with a
duplicate disposition. Use the query, report, and projection-map commands to
inspect the one canonical graph. Never promote held depth merely to improve an
eval score.

`npm run check:projections` guards authorized surfaces, held-claim leakage,
superseded wording, protected citation sources, and generated-registry drift.
Treat a model's accepted-for-review result as advisory. Jamie retains final
truth, consent, collaborator-credit, and production-promotion authority.

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
