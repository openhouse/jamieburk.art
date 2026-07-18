# Knowledge Composite Integration Evals

This suite judges whether the strongest durable ideas from the frozen
`feature/evals-*` experiments have been integrated into the canonical N
knowledge lifecycle. It does not replace the 27 portfolio-production evals and
does not authorize application sharing, production launch, or indexing.

## Contract

- Machine contract: `.agents/evals/knowledge-composite-integration.json`
- Baseline: `docs/evals/runs/2026-07-16-knowledge-composite-baseline.md`
- State: `docs/evals/knowledge-composite-integration-state.json`
- Checker: `npm run check:knowledge-composite-evals`
- Mutation tests: `npm run test:knowledge-composite-evals`

The contract is frozen within a scored run. A substantive rubric change
requires a version increment, a new baseline, and new holdouts.

## Evidence Layers

1. **Source and graph:** canonical records, citations, corpus controls, exact
   sets, public-safety checks, and mutation tests.
2. **Browser and accessibility:** route rendering, responsive behavior,
   keyboard flow, metadata, console output, and downloadable artifacts.
3. **Build and runtime:** Node 26 checks, staging and production-mode preflight,
   production Docker build, and route smoke.
4. **Independent semantic judgment:** two read-only judges who did not author
   the patch and did not see its optimization history.
5. **Reserved human decisions:** reader comprehension, hands-on launch QA,
   rights, collaborator consent, and Jamie's exact-candidate release approval.

No evidence layer substitutes for another. In particular, a passing machine or
AI evaluation cannot approve a human gate.

## Recursive Protocol

1. Freeze the contract and baseline.
2. Run deterministic checks and record every failure.
3. Repair the highest-severity blocking failure with the smallest coherent
   patch.
4. Rerun the focused test, then the composite suite, then all existing checks.
5. Record candidate defects separately from evaluator defects.
6. Stop when the implementation profile passes twice on the unchanged
   candidate, or use `stop_human_blocked` when the next valid action is human.

## Threshold

Implementation review requires a weighted score of at least `0.90`, every
criterion at least `3`, and `CI-002`, `CI-003`, and `CI-007` at `4`. Every
deterministic gate and existing suite must pass. Two independent holdouts must
bind the same contract and candidate fingerprints.

The checker resolves the named implementation-changing Git commit, reproduces
the candidate fingerprint from that commit's tree, permits only four exact
evidence files afterward, and requires every receipt evidence path to exist in
the judged commit.

That threshold means ready for code review. Application sharing and production
remain governed by their own human gates.
