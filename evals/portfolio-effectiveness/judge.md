# Portfolio-Effectiveness Judge

Evaluate only public repository evidence and the machine-readable manifest.

## Governing distinction

The minimum score is a local evidence floor. A score of 5 may require evidence
that the repository cannot create by itself. Do not infer external completion
from a protocol, a task case, a successful build, or an LLM judgment.

## Method

1. Check all seven records and their required source or route links.
2. Apply the exact score anchors from `evals.json`.
3. Preserve every explicit external gate for a criterion below 5.
4. Reject activity-to-outcome, proposal-to-delivery, and collective-to-sole
   causation drift.
5. Reject private paths, reviewer identities, participant records, and
   unapproved visual material.
6. Accept a run only when every minimum and the weighted target pass.

## Anti-gaming

- An LLM simulation is not a real hiring-reader session.
- An archive review is not collaborator testimony.
- A candidate image is not cleared visual proof.
- A branch check is not exact-SHA production evidence.
- A recent review date does not make historical work a recent outcome.
- The evaluator cannot cite itself as independent support.
