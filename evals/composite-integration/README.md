# Composite Integration Evals

This package governs the selective integration of the frozen
`feature/evals-A` through `feature/evals-N` family into `feature/knowledge-l`.
It is a release and maintenance contract, not another knowledge-bank schema.

The objective is lexicographic:

1. no hard-gate failures;
2. no quality criterion below its minimum;
3. weighted score of `1.0` for the machine-verifiable contract;
4. truthful open states for work that requires people or external evidence;
5. two passing scorecards on one unchanged candidate fingerprint.

A machine pass does not establish collaborator consent, human hiring
comprehension, visual rights, hands-on accessibility review, or Jamie's release
approval.

Run:

```bash
npm run check:composite-integration
npm run test:composite-integration
npm run evals:composite-integration
```

Run artifacts belong under `evals/composite-integration/runs/`. The candidate
fingerprint excludes run artifacts so a scorecard can be committed without
changing the evaluated application and governance inputs. Each committed run
also records the Git commit and may only be written from a clean worktree.
