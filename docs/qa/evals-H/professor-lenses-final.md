# Professor lens hill climb

Date: 2026-07-15
Branch: `feature/evals-H`
Candidate fingerprint: `c35cfd3851b2c73766bb2ba313bf86bea95783c01aaeb0cee0dd8df97635f849`

## Frozen criteria

- `PR-015`: Prof. Margaret Morse lens: inhabited systems
- `PR-016`: Prof. Warren Sack lens: recursive social systems
- Both are blocking LLM-judge evals with a median target of 4 and no judge below 3.
- Protected UCSC educational records informed rubric design only; their text,
  identifiers, archive paths, and private correspondence remain outside the
  repository and public site.

## Scores

| Lens | Baseline | Iteration 1 | Final holdout |
| --- | ---: | ---: | ---: |
| Margaret Morse | 2 | 4, 2, 4 | **4, 4, 4** |
| Warren Sack | 2 | 2, 3, 3 | **4, 4, 4** |

The first iteration established the central through-line but did not make
reciprocal agency or project-specific learning loops explicit enough for every
judge. The final iteration added an unframed comparison on `/about` that keeps
four situations distinct while showing, for each, relationships, interface and
use, and learning and continuity.

## Final evidence

- The About page is reachable from the homepage navigation and explicitly joins
  the artistic, civic, technical, and social dimensions of Jamie's practice.
- Open House is grounded in contemporaneous public reporting and remains
  collectively governed in the wording.
- HJE, NYC Artist Coalition / FairRentNYC, WOWList, and Sunday Dinner / 196 each
  expose a bounded relationship-to-interface-to-use-to-learning sequence.
- Collective credit, participant privacy, source scope, and current-versus-
  historical status remain explicit.
- The approved public Maven completion certificate remains professional-
  development evidence, not instructor endorsement or production-product proof.
- Six final scorecards are bound to the exact evaluated rubric and public
  candidate files by the candidate fingerprint above.
- Desktop (`1440 x 1000`) and mobile (`375 x 812`) browser checks found no
  horizontal overflow or console errors; all four comparison sequences and the
  public Open House source link rendered as expected.

## Deterministic result

- Professor lens controls: **14 / 14**
- Mutation tests: **6 / 6**
- Portfolio suite: **16 evals, 13 blocking, weights total 100**
- Knowledge-bank suite after review-lock repair: **5 / 5 across 32 criteria,
  2 / 2 consecutive independent holdouts**
