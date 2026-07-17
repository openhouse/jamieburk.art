# Blind-Spot Evals Hill Climb

Date: 2026-07-15

## Scope

This pass converted eight portfolio blind spots into `KD-014` through
`KD-021`: individual-role corroboration, observed hiring-reader comprehension,
canonical readiness state, consequence evidence, visual rights, technical and
commercial legibility, cumulative disclosure and source durability, and a
future-facing offer.

## Iteration Record

| Iteration | Result | Finding | Decision |
| --- | --- | --- | --- |
| Expanded-suite baseline | `0.8100`; local gate failed | The readiness ledger covered all eight controls, but the launch record named only the external subset. | Revise |
| Reconciliation remediation | `0.8500`; local gate passed | The launch record now names every local and external control and preserves the release hold. | Accept |
| Unchanged local pass 1 | `0.8500`; fingerprint `2c6f386a...` | All deterministic and hybrid criteria passed. | Accept |
| Unchanged local pass 2 | `0.8500`; fingerprint `2c6f386a...` | Same candidate and result. | Stop local hill climb |

## New Eval State

| Eval | State | What the pass or hold means |
| --- | --- | --- |
| `KD-014` | Local pass `4/4` | Five priority role claims and six corroboration routes resolve; held wording cannot silently become an unqualified public role claim. |
| `KD-015` | Human hold | No observed independent hiring-reader reports have been recorded. |
| `KD-016` | Local pass `4/4` | Machine, evidence, approval, and release authority are reconciled; release remains held. |
| `KD-017` | Local pass `4/4` | Handoff, institutional use, decision input, and delivery outcome are represented without collapsing into causality. |
| `KD-018` | Human hold | The five-project queue exists, but zero assets have completed rights and consent approval. |
| `KD-019` | Local pass `4/4` | The primary hiring path names the role, operating signals, and technical, commercial, civic, and cultural contexts. |
| `KD-020` | Local pass `4/4` | Five cumulative-disclosure risks and four source-durability classes are controlled; safety and prohibited-route checks pass. |
| `KD-021` | Local pass `4/4` | The site states the role, team condition, owned work, and contact route. |

## External Holds

The complete release gate remains red by design. It still requires:

- `KD-006`: independent collective-credit and causality judgment;
- `KD-012`: independent Chad-lens judgment;
- `KD-015`: at least three observed independent hiring readers;
- `KD-018`: human rights, consent, caption, and credit approval.

No external judge or human approval was simulated in this pass.

## Verification

- `npm run check`: passed.
- Knowledge-development tests: 253 passed.
- Typecheck and lint: passed.
- Next.js production build: passed, 17 routes generated.
- Browser QA: homepage and Technical Operations verified at 1440 x 1000 and
  390 x 844 with no horizontal overflow or browser errors.
- Local run 1: [`blind-spots-local-pass-1.json`](./blind-spots-local-pass-1.json).
- Local run 2: [`blind-spots-local-pass-2.json`](./blind-spots-local-pass-2.json).
