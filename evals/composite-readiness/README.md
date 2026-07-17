# Composite readiness eval

This suite governs the integration of the frozen `feature/evals-A` through
`feature/evals-N` family into `feature/knowledge-k`.

It does not replace the focused portfolio, knowledge-lifecycle, lens, archive,
public-safety, or route evaluators. It proves that their strongest distinct
behaviors have one coherent home, that donor material received an explicit
disposition, and that agent-verifiable readiness remains separate from human
or external closure.

## Profiles

Run the deterministic development loop:

```bash
npm run eval:composite-readiness -- --profile fast
```

Validate two fresh independent scorecards against the exact candidate:

```bash
npm run eval:composite-readiness -- --profile release \
  --scorecard path/to/scorecard-a.json \
  --confirming-scorecard path/to/scorecard-b.json
```

## Stop condition

The framework is ready only when:

- every deterministic gate passes;
- the weighted score is at least 90;
- every criterion is at least 4;
- two distinct evaluators return the same passing recommendation on one exact
  revision with totals no more than two points apart;
- every frozen donor branch has a final disposition;
- governance reaches 100/100 with zero false closures; and
- two unchanged-candidate runs reproduce the result.

Production still requires Jamie's explicit approval. A completed protocol is
not collaborator corroboration, rights clearance, hiring-reader evidence,
market response, or production observation.

## Anti-gaming rules

- Donor branches are implementation provenance, not professional evidence.
- The optimizing agent cannot edit the active rubric during a run.
- A branch is not integrated merely because similarly named files exist.
- Evidence maturity never authorizes publication by itself.
- Human and external gates remain open until qualifying evidence exists.
- No authoring evaluator may serve as its own confirming evaluator.

