# Portfolio Readiness Ledger

The machine-readable
[`readiness-ledger.json`](./readiness-ledger.json) turns eight known blind spots
into maintained controls. It does not declare the portfolio ready to publish.

## Authority

1. The latest knowledge-development runner output controls executable eval
   state.
2. The readiness ledger controls the blind-spot inventory and the evidence or
   task route for each one.
3. The approval register controls public-use permissions.
4. A named human release decision controls production publication.

No lower layer grants authority to a higher one. A passing test cannot grant
image rights, simulate a hiring reader, approve a collaborator-sensitive
claim, or authorize deployment.

## Eight Controls

| Eval | Control | Completion authority |
| --- | --- | --- |
| `KD-014` | Role corroboration and division-of-work routing | Sources, tasks, and claim boundaries |
| `KD-015` | Observed hiring-reader comprehension | Independent human readers |
| `KD-016` | Canonical readiness reconciliation | Runner, ledger, blocker record |
| `KD-017` | Use, adoption, handoff, and decision-impact distinctions | Source-backed claim audit |
| `KD-018` | Rights-cleared visual edit | Rights, consent, caption, and credit approvals |
| `KD-019` | Technical and commercial operating legibility | Executable content contract |
| `KD-020` | Cumulative disclosure and source durability | Safety scanner and corpus-level review |
| `KD-021` | Future-facing offer clarity | Executable content contract |

## Commands

- `npm run check:knowledge-development` runs the maintained local gate. It may
  pass while independent or human gates remain open.
- `npm run run:knowledge-development -- --require-pass` is the complete release
  gate. It must fail when required judgments or approvals are absent.
- `npm run check` runs the broader repository contract.

The public website remains a selective projection of the knowledge bank.
There is no public proofs or knowledge-bank route.
