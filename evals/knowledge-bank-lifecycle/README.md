# Knowledge Bank lifecycle evals

This suite measures whether the Knowledge Bank can retain the full public-safe
range of Jamie's work while keeping evidence, claims, uncertainty, publication,
and visual discovery distinct.

Run the deterministic validator:

```bash
npm run evals:knowledge-bank-lifecycle
```

## Recursive protocol

1. Capture every supplied public-safe fragment as intake.
2. Close-read sources into support and non-support boundaries.
3. Create or revise claims and research inquiries.
4. Set projection intent independently from claim maturity.
5. Run deterministic graph and public-safety checks.
6. Ask independent evidence/governance and editorial/future-use judges to score
   the same graph snapshot.
7. Reject hard-gate failures and regressions.
8. Revise the smallest necessary record or relationship.
9. Stop only after both judges meet the threshold twice consecutively.

The suite intentionally tests material that is strong but bank-only, memories
that remain hypotheses, collective outcomes with direct individual
contributions, existing claims needing source discovery, and photographs that
create research leads.

Committed runs live under `runs/<date>-<branch>/` and must contain the graph
counts, evaluated content clusters, both final judgments, qualifying rounds,
regressions, and unresolved criteria.
