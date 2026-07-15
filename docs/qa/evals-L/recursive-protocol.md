# Recursive Eval Protocol

This is the branch-level evaluation protocol for moving the portfolio from
staging confidence toward job-application and production readiness.

The core rule: do not evaluate the website once. Re-enter the same loop after
any material change to claims, routes, resume projection, public-safety posture,
or deployment configuration.

Run:

```sh
npm run evals:knowledge-lifecycle
npm run evals:chad
npm run evals:callnyc-x
npm run evals:wowlist-x
npm run check:nycartc-corpus
npm run evals:nycartc-x
npm run evals:urbanhermit-x
npm run evals:nycac-facebook-events
npm run evals:nycac-institutional-interface
npm run evals:recursive
```

`npm run check`, `npm run preflight:staging`, and `npm run
preflight:production` also include this gate.

## Loop 1: Application-Readiness

Read the site as a hiring reviewer who has five minutes and no prior context.
The first pass should answer:

- What role is Jamie seeking?
- What concrete operating work has Jamie done?
- Which proof points make the role fit defensible?
- Where can the reviewer get the resume and contact path?

The resume page, Technical Operations page, work index, selected case studies,
about page, contact page, and Source-Backed Team Memory lab page are the minimum
review surface.

### Chad-Lens Criterion

`npm run evals:chad` scores the public projection against six dimensions:
actor visibility, purpose, concrete work, one-pass legibility, defensible
strength, and collective credit. Passing requires at least 90/100 and no hard
failure. Hard failures cover hidden project roles, unsupported ownership,
weakened source/guardrail structure, and inflated public claims.

Treat the score as a regression gate, not a substitute for editorial judgment.
If it fails, improve the claim bank or public projection, rerun the evaluator,
and repeat until the criterion is met without weakening public-safety rules.

### Knowledge-Lifecycle Criterion

`npm run evals:knowledge-lifecycle` scores capture integrity, source quality,
atomic observations, claim maturity, research recursion, projection discipline,
and the photo-feedback loop. Passing requires at least 95/100 and no hard
failure.

The criterion deliberately permits a deep, mature knowledge bank with no new
website projection. It fails when evidence is orphaned, inference is promoted,
source limitations disappear, or unselected depth leaks into the public
citation layer.

### CallNYC X Corpus Criterion

`npm run evals:callnyc-x` recomputes the archival findings from the public
JSON corpus, reconciles the displayed population, checks every posted URL, and
enforces privacy and projection boundaries. Passing requires 100/100 and no
hard failure.

### WOW List X Corpus Criterion

`npm run evals:wowlist-x` recomputes the 38-record surviving-profile census,
relationship and theme counts, all posted URLs, account-authored public
counters, lifecycle wiring, source positioning, and projection boundaries.
Passing requires 100/100 and no hard failure.

### NYC Artist Coalition X Corpus Criterion

`npm run check:nycartc-corpus` reproduces the sanitized corpus from its source
capture and verifies both artifact hashes. `npm run evals:nycartc-x` then
hard-gates population accounting, authored/repost separation, campaign-marker
and link inventories, stakeholder directionality, source positioning, privacy,
held traction, and selective projection. Passing requires 100/100 and no hard
failure.

### Urbanhermit X Corpus Criterion

`npm run evals:urbanhermit-x` recomputes the complete 434-record live-profile
census, account-authorship split, posted-link inventory, mission-signal counts,
bounded incoming-response sample, and account-authored visible counters. It
also hard-gates raw-text exclusion, identity-free redaction of irrelevant
personal context, collaborator attribution, source positioning, hash integrity,
and the deliberate decision not to project the personal corpus onto the current
website. Passing requires 100/100 and no hard failure.

### NYC Artist Coalition Facebook Events Criterion

`npm run evals:nycac-facebook-events` reconciles the 34-slot Facebook Past
Events control as 33 recovered records plus one unresolved slot, locks the
event-ID digest and metadata-only fixture, and reproduces chronology, organizer
and cohost relationships, recurring cultural-space meetings, topic and response
thresholds, source routes, public-safety exclusions, lifecycle integration,
and the bounded participation-system projection selected for the website.
Passing requires 100/100 and no hard failure.

### NYC Artist Coalition Institutional Interface Criterion

`npm run evals:nycac-institutional-interface` hard-gates the bounded Council
transcript denominator, the May 2017 Finkelpearl reference, direct-source and
inference separation, DCLA/Council/Espinal institutional analysis, collective
credit and causality boundaries, and the selective case-study projection.
Passing requires 100/100 and no hard failure.

## Loop 2: Claim Projection

Every public claim must reconcile with the knowledge bank before it reaches the
website.

- Structured claims live in `apps/www/src/data/proofs.ts`.
- Human-readable claim posture lives in `docs/knowledge-bank/claims.md`.
- Projection rules live in `docs/knowledge-bank/projection-map.md`.
- Page and work metadata must carry proof IDs for strong or metric-bearing
  claims.

If a public page needs stronger language, strengthen the proof first. If the
proof cannot support the stronger language, soften or omit the public language.

## Loop 3: Public-Safety

The public repository must not contain material that should stay private.

Before job-application sharing or production launch, confirm:

- no raw transcripts, private correspondence, stakeholder lists, applicant
  records, donor/list exports, payment files, billing records, credentials,
  private screenshots, or private photos are committed;
- collaborator-sensitive names, credits, screenshots, quotes, and photos are
  approved or omitted;
- phone stays out of website HTML and may remain only in the approved resume
  PDF;
- Source-Backed Team Memory stays framed as a bounded lab / method / consulting
  practice, not production SaaS or a private archive browser.

## Loop 4: Production Mechanics

The production pass is not only content review. It must also verify release
mechanics:

- route checks pass;
- legacy redirects remain in place;
- sitemap contains canonical routes only;
- staging preflight uses `NEXT_PUBLIC_ROBOTS_POLICY=noindex`;
- production preflight uses `NEXT_PUBLIC_ROBOTS_POLICY=index`;
- resume PDF noindex headers remain active;
- Jamie has approved the final reviewed commit for production release.

## Exit Criteria

The site is ready to share with job applications when:

- `npm run check` passes;
- the five-minute reviewer path is clear;
- the resume PDF, contact path, and selected proof points are coherent;
- no unresolved public-safety blockers apply to the pages being shared.

The site is ready for production only when:

- `npm run preflight:production` passes with explicit production environment
  values;
- launch blockers are resolved or consciously accepted by Jamie;
- the final commit has been reviewed as the exact production candidate.

Run the loop again after any material change.
