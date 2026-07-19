# Hiring Acceptance

This test harness asks how an exact public portfolio reads in a current hiring
context. It does not predict an employer decision.

## Separation

1. The hiring evaluator receives captured public route text, official public
   role facts, and a sourced reader profile. It receives no Knowledge Wiki
   evidence, private archive, warm-path note, or application status.
2. The Wiki gap resolver runs only after the hiring report exists. It may map a
   missing signal to public-safe Wiki evidence, a source inquiry, a rights
   boundary, or a real experience gap.
3. Human application, publication, rights, and release decisions remain human.

Named profiles are simulated lenses. They are not the named person's actual
opinion, participation, endorsement, or hiring decision.

## Commands

- `npm run eval:hiring:context -- --base-url http://127.0.0.1:3000`
- `npm run eval:hiring -- --context <context.json> --judgments <judgments.json>`
- `npm run eval:hiring:gaps -- --report reports/hiring/current/reader-consensus.json`
- `npm run eval:hiring:mutations`

Detailed run bundles may remain local or in CI. The repository retains only a
concise candidate-bound summary when it materially aids review.

`candidateSha` is a SHA-256 content fingerprint over the public application
source, canonical public-safe Knowledge Wiki context, reader profiles, suite,
and rubric. Public snapshot, role context, reader context, and prompt hashes
are recorded separately. Evaluator tooling is tested as its own contract; a
report-formatting-only change does not rewrite the public candidate a reader
actually saw.
