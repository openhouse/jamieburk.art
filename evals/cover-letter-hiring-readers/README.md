# Cover-letter hiring-reader eval

This eval maintains one role-specific `Cover-Letter.md` beside every
application-specific tailored resume governed by
`evals/resume-hiring-readers/current.json`.

## Source and artifact boundaries

- Jamie's authenticated, living Google Doc remains the source of truth for the
  writer's voice.
- `evals/cover-letters/voice-contract.json` is a public-safe, revision-bound
  projection used for deterministic checks; it is not a replacement authority.
- The protected source locator and source text are not committed.
- Each letter is bound to one opportunity record, one exact resume, and one
  exact voice-contract revision by SHA-256.
- Named readers are simulated public-context analytical lenses. Their results
  are not participation, quotation, endorsement, or real hiring decisions.

## Cost-staged acceptance flow

1. Run `npm run evals:cover-letters:deterministic`.
2. Stop before model work if coverage, lineage, freshness, public safety,
   structure, specificity, or reader assignment fails.
3. Materialize isolated packets outside the repository with
   `npm run materialize:cover-letter-readers -- --out-dir <temporary-directory>`.
4. Evaluate packets sequentially, one named reader per read-only task, stopping
   after the first failure.
5. Hill climb the failing letter, update its digest bindings, and start that
   letter's reader sequence again.
6. Record unanimous exact-artifact results in `current.json`.
7. Run `npm run evals:cover-letters` and `npm run test:cover-letters`.

Any change to an opportunity, resume, cover letter, voice contract, named-reader
set, or acceptance question invalidates the affected cached assessment. Jamie's
approval remains required before an application is submitted.
