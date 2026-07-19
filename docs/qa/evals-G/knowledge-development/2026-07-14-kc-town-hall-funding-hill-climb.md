# KC Town Hall Funding and Transition Hill Climb

- Date: 2026-07-14
- Branch: `feature/evals-G`
- Candidate fingerprint:
  `0e50340382c93104ff84d53ae136716f403d224e2af202cabf8d0874f4b96eb7`
- Decision: `stop_threshold_met`

## Objective

Locate and ingest the official record that the Kansas City Council acted on the
CCED Sales Tax Board's KC Town Hall recommendation, while distinguishing public
budget authority from an executed agreement, receipt, expenditure, or project
completion. Integrate Jamie's approved first-hand account that he transitioned
the project to a mission-aligned organization, while keeping private
circumstances outside the repository and separating that account from the City
record.

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

The pass now contains two captures, four official sources plus one metadata-only
first-hand source, six atomic observations, three claims, one research inquiry,
and two correction records. The active claims keep Jamie's City-listed proposal
role, the government funding chronology, and his first-hand transition account
distinct. Public wording must retain the 2024 withdrawal and unused-funds
disposition whenever it mentions the 2019 appropriation.

The first-hand source stores only the approved professional fact and its
boundaries. It does not publish a transcript, identify the receiving
organization, infer transfer mechanics or assumed obligations, or encode the
private circumstances behind the transition.

The public case study now presents only the three bounded claims and a concise
implementation narrative. The full inquiry, correction, source-state, and
anti-claim machinery remains in the repository knowledge bank. No `/proofs`,
`/knowledge-bank`, or `/public-claims` page was added.

## Recursive Evaluation

The deterministic pass reconstructed all records and returned zero broken
references, funding-chain integrity violations, projection-safety violations,
private-marker hits, or canonical validation errors. It scored `0.8900` while
awaiting independent judgments.

An adversarial review first caught an unsupported temporal modifier and a work
card where the first-hand attribution did not travel with the claim. The wording
and regression test were corrected. A later review caught a role-date range that
could imply continuous service and an unattributed continuity phrase. The final
candidate labels 2019 as the proposal date and 2024 as the City disposition,
and carries first-hand attribution into the work-card continuity language. Each
revision produced a new fingerprint and made prior judgments inapplicable.

Two fresh read-only judges then reviewed the unchanged final candidate. Both
scored collective-credit calibration `4/4` and Chad's lens `3/4`, producing
`0.9925`. Each recorded a future opportunity to add a public-safe artifact
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
