# Composite Eval Red Baseline

Environment: Node 26.4.0. Candidate lineage:
`289dd4499eb3e7b78bc16b380a02ac180dca35bb` plus the uncommitted composite
contracts. This is an inspectable development record, not a passing receipt.

| Command | Result before repair |
| --- | --- |
| `npm run check:knowledge-lifecycle` | 111/113; `KB-006` and `KB-010` failed |
| `npm run check:portfolio-readiness` | 15/20; release enforcement and `PR-001`, `PR-002`, `PR-008`, `PR-009` failed |
| `npm run check:blind-spots` | 0/8; required protocols were absent |
| `npm run check:eval-integrity` | 1/4; control protocols and exact-candidate receipt were absent |
| `npm run test:evals` | Failed; human-protocol fixtures were absent and `KB-006`/`KB-010` remained red |

The red state was preserved before adding human protocols, maintenance
reporting controls, and an exact-candidate receipt. No human result was created
to make the suite pass.
