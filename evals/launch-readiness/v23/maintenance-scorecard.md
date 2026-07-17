# Evaluation and knowledge-bank maintenance scorecard

Status: prepared for newcomer semantic review

## Current control surface

- Current launch-readiness suite: `v23`.
- Current suite size: 43 criteria, comprising 26 hard gates and 17 scored
  criteria.
- Canonical citational claim store:
  `apps/www/src/data/knowledge-bank/records.ts` and its imported modules.
- Public-safe proof layer: `apps/www/src/data/proofs.ts`.
- Human-readable research and governance: `docs/knowledge-bank/`.
- Intake validation: `npm run check:knowledge-intake`.
- Full repository validation: `npm run check`.
- Release evaluation: `npm run eval:launch-readiness:strict` with two
  independent observation files for one commit.

## Growth budget

1. Strengthen or map an existing criterion before adding another.
2. Create a new suite version only when the evaluation contract changes, not
   for ordinary source ingestion.
3. Keep historical versions immutable; only one version may be referenced by
   AGENTS.md and active runner scripts.
4. Give new source populations dedicated validators only when they introduce a
   distinct denominator, privacy boundary, or reconciliation rule.
5. Prefer one canonical record with several evidence relationships over
   duplicate source or claim records.
6. Treat warnings, open inquiries, and held projections as maintained states,
   not failures to hide.

## Staleness and pruning

- Re-review mutable platform counts and current-role statements before public
  reuse.
- Archive obsolete templates only after the current workflow names their
  replacement.
- Remove active-script references to superseded versions, but preserve the
  historical files for auditability.
- When a check becomes redundant, document which stronger check subsumes it
  before retiring it.

## New-contributor test

A contributor with no prior conversation should be able to answer within ten
minutes:

1. Where does a new fragment enter?
2. Which record is canonical for a public claim?
3. What may never be projected?
4. Which eval suite is current?
5. Which command establishes repository and release status?
