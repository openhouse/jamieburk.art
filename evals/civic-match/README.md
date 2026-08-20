# Civic Match candidate-profile reader eval

This eval tests the exact Civic Match signup guide against two audiences:

1. every named reader selected by the current governed public-resume manifest;
2. Josh Gee and Courtney Kishbaugh as fictionalized public-context Civic Match
   program lenses.

The tests do not claim that any named person participated, spoke, endorsed
Jamie, recommended Jamie, or made a real hiring decision.

## Cost-staged flow

1. Run `npm run evals:civic-match:deterministic` and
   `npm run test:civic-match`.
2. Stop if source modeling, field coverage, word limits, public safety, resume
   lineage, or reader derivation fails.
3. Materialize isolated, public-only reader packets outside the repository:
   `npm run materialize:civic-match-readers -- --out-dir <temporary-directory>`.
4. Evaluate one packet at a time. A hiring-reader lens passes only when it can
   answer “I would hire this person for this job.” A Civic Match helper lens
   passes only when it would actively match the candidate to a current role
   supported by the evidence.
5. Stop on the first failure, improve the guide or governed resume, update
   every affected digest, and restart the affected reader sequence.
   Preserve a current stopped run with `--allow-partial`; never relabel it as a
   complete pass.
6. Ingest a complete set of exact-guide results with
   `npm run ingest:civic-match-readers -- --input-dir <temporary-directory>`.
7. Run `npm run evals:civic-match` for the unanimous final gate.

The reader receives only the signup guide, the current public resume, the
relevant public opportunity, and public role context. Repository code, private
sources, and authenticated account state are excluded.

Jamie alone controls protected-category answers, relocation, media consent,
profile visibility, terms acceptance, and final submission.
