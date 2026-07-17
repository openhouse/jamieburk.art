# Composite Integration Decision Ledger

Date: 2026-07-16

Working branch: `feature/knowledge-i`

Pull request base: `develop`

Starting content baseline: `793f7262cd3df8d7401d9b3e0f8209240d5fa640`

## Decision Rule

The frozen `feature/evals-*` branches are design evidence, not merge units.
`feature/knowledge-i` retains the canonical knowledge graph, proof records,
policies, corpora, and public registry. A mechanism is adopted only when it
removes a documented failure mode without creating a parallel truth store.

## Branch Decisions

### `feature/evals-A` / PR #220: Adapt

Preserve its clean separation among launch readiness, portfolio effectiveness,
and knowledge maturation. The composite keeps those concerns as coordinated
canonical layers rather than importing A's parallel directories and run files.

Validation: the composite registry must expose four unique layers and reject a
duplicate canonical store.

### `feature/evals-B` / PR #212: Adapt

Preserve composition intent, claim budgets, exact role-evidence accounting,
mosaic privacy, and controls for risks created by the evaluation system itself.
Route-level audience, decision, and claim-budget data now live in the composite
contract. Existing canonical claims and policies remain authoritative.

Deferred: B's large exact rendered-claim manifest and repository-local external
receipts. They are useful designs, but copying them would bind this branch to a
different public-surface fingerprint and duplicate current policy records.

### `feature/evals-C` / PR #221: Adopt

Preserve application-share versus production-launch profiles, diagnostic versus
closure semantics, and candidate/rubric fingerprinting. These distinctions fit
the current I-derived portfolio and knowledge contracts directly.

### `feature/evals-D` / PR #216: Adapt

Preserve measured responsive QA, keyboard and contrast review, genuine visual
proof, semantic iteration, and observer integrity. The composite architecture
requires a route/viewport evidence packet and rejects agent substitution for
human or runtime observations.

Deferred: D's twenty-three historical launch-suite directories and full image
archive. Historical iteration is preserved in the frozen branch; the composite
needs one current contract and a compact exact-candidate receipt.

### `feature/evals-E` / PR #211: Adopt

Preserve lexicographic optimization, smallest coherent patches, independent
judges, blind-reader procedure, iteration ceilings, and external stop
conditions. The objective vector makes safety and hard gates outrank semantic
or cosmetic gains.

### `feature/evals-F` / PR #210: Adapt

Preserve broad launch integration, real target-role specificity, and the
90-minute application cadence. Domain-specific population checks remain
independently runnable rather than becoming one oversized weighted score.

### `feature/evals-G` / PR #222: Adapt

Preserve source-specific baseline, remediation, holdout, and stable-pass
traceability. Durable Markdown records retain decisions and fingerprints;
generated machine output stays under ignored `reports/generated/` paths.

Deferred: bulk import of G's generated QA runs. The frozen PR remains their
audit location and importing them would overwhelm review of the composite.

### `feature/evals-H` / PR #223: Adapt

Preserve release rehearsal, real-artifact inspection, editorial compression,
multi-perspective holdouts, runtime smoke, semantic mutation attacks, and review
locks. Current knowledge policies already pin a frozen external tag; the
composite extends adversarial tests without replacing that baseline.

### `feature/evals-I` / PR #219: Adopt

This is the starting substrate. Retain its batches, corpora, source assertions,
claim and projection model, policy fingerprints, maintenance report, resume
artifact controls, blind-spot suite, and strict knowledge-development threshold.

### `feature/evals-J` / PR #209: Adopt

Preserve claim-development versus projection-candidate states, correction
readiness, read-only independent judges, source limitations, and explicit public
argument selection. The website remains a composition, not the bank's contents
dumped onto pages.

### `feature/evals-K` / PR #217: Adapt

Preserve append-safe intake, bounded query, maintenance reporting, exact-surface
authorization, and operator ergonomics. New commands operate directly on I's
`knowledgeBank` schema. K's separate lifecycle records and schemas are not
imported.

### `feature/evals-L` / PR #213: Adopt

Preserve modular domain gates, `governed_open` as distinct from completion,
independent corpus checks, and the five-minute hiring-reader protocol. A green
machine gate means the risk is controlled, not that external evidence exists.

### `feature/evals-M` / PR #215: Adopt

Preserve P0/P1/P2 triage. P0 blocks application sharing, P1 blocks production,
and P2 remains noncritical depth or refinement. This prevents visual or archive
expansion from outranking a broken application path or unsafe claim.

### `feature/evals-N` / PR #214: Adapt

Preserve human-evidence status, outcome and transfer separation, current
capability, visual proof, artistic continuity, and recursive-method mapping.
These become public-safe protocols and evaluation inputs without importing
protected faculty records or presenting derived lenses as endorsements.

## Canonical Destinations

| Concern | Canonical destination |
| --- | --- |
| Knowledge records | `apps/www/src/data/knowledge-bank/records.ts` and batches |
| Knowledge schema | `apps/www/src/data/knowledge-bank/schema.ts` |
| Public proof layer | `apps/www/src/data/proofs.ts` |
| Knowledge eval | `.agents/evals/knowledge-bank-development.json` |
| Portfolio eval | `.agents/evals/portfolio-production-readiness.json` |
| Blind spots | `.agents/evals/portfolio-blind-spots.json` |
| Composite governance | `.agents/evals/composite-system.json` |
| Generated reports | ignored `reports/generated/` |
| Durable decisions | `docs/evals/` and `docs/knowledge-bank/runs/` |

## Explicit Rejections

- No whole-branch merge from A-N.
- No second canonical claim graph or public registry.
- No committed raw authenticated export or private archive locator.
- No blanket import of generated scorecards and screenshots.
- No automatic publication when a claim matures.
- No simulated human, collaborator, rights, market, or deployment receipt.
- No requirement that every domain check be averaged into one portfolio score.

## Review Units

Review the composite in this order:

1. contracts and architecture;
2. evaluator and adversarial tests;
3. knowledge intake/query operator tools;
4. human and runtime protocols;
5. package command wiring;
6. any later knowledge or website changes produced by failed evals;
7. final exact-candidate run record.
