# Knowledge Bank Development Evals

## Objective

This suite recursively develops public-safe fragments into coherent,
source-associated professional knowledge. It does not require every mature
claim to appear on the website.

The suite is stored at
`.agents/evals/knowledge-bank-development.json`. Its deterministic contracts
are enforced by `scripts/check-knowledge-bank-evals.mjs`; complete scored runs
can be checked with `scripts/score-knowledge-bank-eval-run.mjs`.

## Two Targets

- `claim-development`: the material is strong enough to remain in the governed
  knowledge bank or become a governed claim. No public projection is implied.
- `projection-candidate`: the claim is strong enough for a separate editorial
  decision about a public surface. This requires holdout regression, two
  unchanged passing runs, and Jamie's approval of the exact candidate.

## Recursive Protocol

1. Freeze the rubric in a commit and record its SHA.
2. Freeze the candidate content and record its SHA.
3. Run deterministic source, intake, privacy, and projection checks.
4. Have a fresh read-only judge score every criterion without being told the
   intended patch.
5. Select one primary failure: first a failed blocker, then the largest weighted
   gap, then the highest-value unresolved claim with evidence available.
6. Make the smallest coherent research or content patch that addresses that
   failure. Do not change the rubric during the run.
7. Re-run deterministic checks and use a fresh judge that did not author the
   patch.
8. Accept the iteration only when the selected score improves, no blocker
   regresses, public-safety checks pass, and useful project texture remains.
9. Repeat until thresholds are met, the iteration limit is reached, two rounds
   show no improvement, or the next step requires human memory, consent, access,
   or unavailable evidence.
10. Confirm success with two passing judgments on the unchanged candidate.

## Evaluation Order

The suite prioritizes:

1. public safety and provenance;
2. source decomposition and epistemic fit;
3. Jamie's role, causality, and collective credit;
4. maturity and projection discipline;
5. contradictions and correction readiness;
6. Chad-lens usefulness, chronology, research quality, and compositional range;
7. recursive-process integrity.

This order prevents polished language from compensating for unsafe or
unsupported content.

## Agent Rules

- Treat memory as a lead, never as documentary proof.
- Split compound claims when different sources establish different parts.
- State what each source cannot establish.
- Preserve named collaborators and institutional actors.
- Keep historical and current status separate.
- Stop human-blocked rather than inventing missing evidence.
- Never move an intake record directly into website copy.
- Preserve unusual artistic, civic, technical, and relational details even when
  they are not selected for a current hiring narrative.

## Commands

```text
npm run evals:knowledge-bank
npm run test:knowledge-bank-evals
npm run evals:knowledge-bank:score -- path/to/run.json
```

The standard repository `check` command runs the suite validator and tests.
