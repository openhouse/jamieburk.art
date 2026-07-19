# Knowledge Composite Integration Baseline

Date: 2026-07-16

Branch: `feature/knowledge-n`

Baseline commit: `10d20ecd5d8d9f3b94b403fbecf483fef92b5dfe`

## Scope

This is the pre-integration baseline for the approved composite instructions.
The `feature/evals-*` family was treated as read-only design research. No donor
branch was merged or cherry-picked.

## Environment

- Node: `v26.4.0`
- npm: `11.17.0`
- Install: `npm ci` passed
- Dependency audit: two moderate findings reported; no forced dependency
  mutation was attempted

## Canonical State

- 76 intake records
- 307 source records
- 103 claim records
- 68 research inquiries
- 54 mature claims intentionally held from website routes
- 18 proof records linked to canonical claims
- 4 proof records retained as explicit research debt
- 27 frozen portfolio evals, including two honest human-pending gates

## Baseline Commands

All of the following passed before implementation:

- `npm run check`
- `npm run preflight:staging`
- `npm run preflight:production`

The Next.js production build completed with 18 routes. Staging remained
`noindex`; production-mode indexing required the explicit index policy.

## Baseline Findings

- The canonical knowledge bank, citation graph, corpus ledgers, route checks,
  and public-safety scanner were healthy.
- Sixteen careful-claim warnings remained visible by design.
- `PR-019` and `PR-025` remained `pending-human-review`; a prepared protocol
  was not counted as completed human evidence.
- The baseline lacked one integrated contract for agency, operator tooling,
  selective composition, survivorship, evaluator calibration, and unchanged-
  candidate holdouts. Those are the bounded integration targets.

## Decision

Proceed with a separate `knowledge-composite-integration` suite. Preserve the
27-eval portfolio suite and all existing corpus fixtures and validators without
changing their scoring contract.
