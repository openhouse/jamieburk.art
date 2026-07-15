# Margaret Morse and Warren Sack Lens Hill Climb

- Date: 2026-07-15
- Branch: `feature/evals-G`
- Evals: `KD-022`, `KD-023`
- Final unchanged-candidate fingerprint:
  `9972527ff61604efad974417666657d5dc8f45ec1b45666113806ce09ea6fa51`
- Decision: local threshold met; independent judgments remain open

## Source Boundary

Jamie supplied protected UCSC narrative evaluations from 2004 and 2006 and an
image of a public professional recommendation. Jamie and Codex used those
records to derive contemporary portfolio questions. The new rubrics are not
quotations, testimonials, or evals written, approved, or currently endorsed by
Margaret Morse or Warren Sack.

The source payloads, screenshots, correspondence, identifiers, contact details,
and archival locators remain outside Git. The repository contains only the
public-safe derivation in
[`eval-lenses.md`](../../../knowledge-bank/eval-lenses.md).

## Frozen Criteria

`KD-022` asks whether the hiring path preserves embodied inquiry,
experimentation, participation, memory, place, atmosphere, hospitality, and
the connection among artistic, civic, technical, and social practice. It also
checks that this depth strengthens rather than obscures the future offer.

`KD-023` asks whether the portfolio demonstrates a sequence from relationships
across systems and source-backed analysis to a working interface, prototype,
process, or social situation, followed by learning from situated use. It keeps
technical novelty, source support, impact boundaries, and collective credit in
the same frame.

Both are hybrid evals. The local runner can award at most `3/4`; only an
independent reviewer who did not make the patch can supply the final qualitative
judgment or award `4/4`.

## Baseline

After the rubrics were frozen, the existing About page scored:

| Eval | Baseline | Principal gap |
| --- | ---: | --- |
| `KD-022` | `0/4` | The primary hiring path did not connect embodied and relational intelligence to present operating method. |
| `KD-023` | `0/4` | The primary hiring path did not show the movement from relational analysis to working form and situated learning. |

The baseline also exposed a false positive in the source-safety preflight and a
whitespace-sensitive content matcher. Both evaluator defects were repaired
without weakening the frozen qualitative criteria.

## Accepted Revision

The About page now includes one compact section, “A practice of attention.” It
connects Jamie's participatory-media and social-software formation to his
current operating method, then makes the recursive sequence explicit:
relationships across systems, hidden structure, source-backed analysis,
prototype or usable process, testing with people, and further learning.

The revision does not publish the historical evaluations, attribute the new
language to either professor, or replace the role and next-action statements.

## Result

Two consecutive runs on the unchanged candidate produced:

| Measure | Pass 1 | Pass 2 |
| --- | ---: | ---: |
| Weighted local score | `0.88` | `0.88` |
| Local criteria | pass | pass |
| `KD-022` | `3/4` | `3/4` |
| `KD-023` | `3/4` | `3/4` |
| Full criteria | held | held |

Open external gates remain `KD-006`, `KD-012`, `KD-015`, `KD-018`, `KD-022`,
and `KD-023`. No external judgment or human approval was inferred from a local
pass.

## Verification

- Knowledge-development tests: 74 passed in the focused run; 253 knowledge
  tests passed in the full repository contract.
- Full `npm run check` under Node 26: passed, including citations, application
  contracts, typecheck, lint, 17-route production build, knowledge-bank safety,
  public safety, and route checks.
- About page at 1280 pixels: no horizontal overflow; new section retains a
  726-pixel reading measure.
- About page at 320 pixels: no horizontal overflow, no main-content collision,
  and no browser console warnings.
- Prohibited public routes: none added.

## Evidence

- [Local pass 1](./morse-sack-local-pass-1.json)
- [Local pass 2](./morse-sack-local-pass-2.json)
- [Frozen lens derivation](../../../knowledge-bank/eval-lenses.md)
- [Canonical readiness ledger](../../../knowledge-bank/readiness-ledger.md)
