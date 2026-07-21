# Blind-Spot Control Hill Climb

Date: 2026-07-15
Suite: `evals/knowledge-bank/evals.json`
Machine-readable controls:
`docs/knowledge-bank/data/blind-spot-controls-2026-07.json`

## Objective

Convert the portfolio review's eleven largest blind spots into acceptance gates
without pretending that missing corroboration, human feedback, outcome data,
permissions, or job-search evidence already exists.

The resulting criterion semantics are deliberately narrow: a score of five
means the gap has an honest baseline, evidence plan, stopping rule, anti-gaming
constraints, next action, and public-projection boundary. It does not mean the
gap is resolved.

## Initial candidate

The first candidate added eleven zero-weight criteria and a public-safe control
manifest. Deterministic evaluation scored all 32 criteria at five, but the
material change correctly reset holdout acceptance to `0/2`.

The first fresh data-integrity reviewer rejected all eleven new criteria. The
reviewer demonstrated that hostile rewrites could keep required words while
reversing their meaning, refresh the editable approval checksum, and still
pass. Examples included AI review relabeled as collaborator testimony, silence
as endorsement, a proposal as delivered work, social response as impact,
internal agents as human validation, and archive custody as image permission.

## Repair

The next iteration:

- replaced polarity-insensitive whole-record token checks with frozen SHA-256
  review locks for the parsed manifest, human-readable control note, and each
  of the eleven controls;
- retained structured exact checks for honest zero baselines, proof IDs,
  evidence levels, role tracks, private raw-data location, and visual/voice
  dimensions;
- added a mutation test for each rejected semantic attack;
- required every attack to fail even after the editable manifest approval hash
  is refreshed;
- preserved the rejected review and material-change reset in the holdout
  ledger.

The targeted mutation run passed `2/2` tests. Each hostile rewrite kept the
editable checksum current, broke the immutable review lock, reduced the target
criterion to one, and forced rejection.

## Fresh holdouts

After the repair, two read-only reviewers independently accepted the complete
32-criterion candidate:

1. `blind-spot-holdout-hiring-credit-2026-07-15-final-a` reviewed hiring
   clarity, collective credit, evidence posture, open baselines, visual rights,
   and voice.
2. `blind-spot-holdout-data-integrity-2026-07-15-final-b` replayed all eleven
   checksum-refresh attacks and verified the public-safety and privacy
   boundaries.

Both returned 32 criterion scores of five with no blockers.

## Stopping result

The knowledge-bank suite reached its stopping rule:

- weighted score: `5/5`;
- criteria meeting minimum: `32/32`;
- consecutive accepted independent holdouts: `2/2`;
- known unresolved evidence gaps: still explicitly `open` or
  `partially-controlled`, never relabeled as complete.

The final `npm run check` passed. It included 196/196 knowledge-bank mutation
tests, the 14-eval portfolio suite, citation tests, participation and archive
guards, the production TypeScript/lint/Next.js build, public-safety checks, and
route validation.
