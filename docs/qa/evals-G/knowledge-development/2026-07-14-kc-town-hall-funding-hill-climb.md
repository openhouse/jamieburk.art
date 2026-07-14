# KC Town Hall Municipal Funding Hill Climb

- Date: 2026-07-14
- Branch: `feature/evals-G`
- Candidate fingerprint:
  `5c1ab3d7743e8764a33b7288bf2a188b347fd139986315fa74876aea5af74a34`
- Decision: `stop_threshold_met`

## Objective

Locate and ingest the official record that the Kansas City Council acted on the
CCED Sales Tax Board's KC Town Hall recommendation, while distinguishing public
budget authority from an executed agreement, receipt, expenditure, or project
completion.

## Recovered Decision Chain

1. The City's CCED Round Two proposal list names Jamie Burkart as KC Town
   Hall's developer/presenter for Proposal 16 and lists a $490,539 request.
2. Authenticated Resolution 190649 records the Board's July 16, 2019 vote to
   recommend $490,539.
3. On September 26, 2019, the Council accepted the recommendation and
   authorized negotiation of a conditional funding agreement.
4. Authenticated Ordinance 190642 appropriated $490,539 for KC Town Hall in the
   Central City Sales Tax-Projects account.
5. Ordinance 240317 later recorded KC Town Hall's withdrawal and reappropriated
   the full unused amount in 2024.

"Appropriated" is the precise public-record verb. The sources do not establish
that a final agreement was executed or that KC Town Hall received or spent the
money.

## Knowledge-Bank Integration

The pass added one capture, four official sources, five atomic observations,
two claims, one research inquiry, and one correction record. The two active
claims keep Jamie's City-listed proposal role separate from the government
funding chronology. Public wording must retain the 2024 withdrawal and
unused-funds disposition whenever it mentions the 2019 appropriation.

The public case study now presents only the two bounded claims and a concise
implementation narrative. The full inquiry, correction, source-state, and
anti-claim machinery remains in the repository knowledge bank. No `/proofs`,
`/knowledge-bank`, or `/public-claims` page was added.

## Recursive Evaluation

The deterministic pass reconstructed all records and returned zero broken
references, funding-chain integrity violations, projection-safety violations,
private-marker hits, or canonical validation errors. It scored `0.8900` while
awaiting independent judgments.

Two fresh read-only judges reviewed the unchanged candidate. Holdout 1 scored
both LLM-judged criteria `4/4`, producing `1.0000` with no findings. Holdout 2
scored collective-credit calibration `4/4` and Chad's lens `3/4`, producing
`0.9925`. It recorded a future opportunity to add a public-safe artifact
showing a specific collaborator use of Jamie's planning materials, but found no
failed criterion.

Stop condition: two consecutive independent holdouts passed on one unchanged
candidate fingerprint, with every blocking and nonblocking criterion met.

## Verification

```bash
npm run test:knowledge-evals
npm run test:citations
npm run check:citations
npm run check:knowledge-development
npm run check
npm run preflight:production
```
