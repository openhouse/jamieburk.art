# Civic Match candidate-profile evaluation

This evaluation runs inexpensive deterministic gates before any fictionalized
named-reader assessment. The deterministic phase checks source semantics,
field coverage, word limits, privacy, human submission gates, current-resume
selection, reader derivation, and exact guide fingerprints.

Only a deterministic pass permits four public-only assessments:

- the two named reader lenses selected by the current live candidacy;
- Josh Gee and Courtney Kishbaugh as Civic Match program-helper lenses.

These are simulations based on public sources. The named people do not
participate, speak, endorse Jamie, or make a hiring decision through this eval.
The output is advisory; Jamie controls the profile and every submission.

Commands:

```sh
npm run test:civic-match
npm run evals:civic-match:deterministic
npm run materialize:civic-match-readers
npm run evals:civic-match
```
