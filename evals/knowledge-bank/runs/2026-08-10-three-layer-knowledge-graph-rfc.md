# Three-layer Knowledge Graph RFC hill climb

- Date: 2026-08-10
- RFC: `rfcs/0005-three-layer-knowledge-graph.md`
- Stage: `exploring`
- Decision owner: Jamie Burkart
- Implementation authorized: no

## Evaluation object

The candidate consists of the public-safe RFC, its machine-readable proposal
contract, the synthetic scenario suite, and the deterministic evaluator. The
evaluation tests proposed behavior; it does not certify a production graph,
source adapter, private packet, public projection, or implementation decision.

## Baseline

- Candidate fingerprint:
  `f91a49b1c2b3d3b9cbdbc9775819fb2a1ff2e056d41b06db452ca371c8a3276a`
- Score: `0.90`
- Hard failures: none
- Synthetic cases: `10/10`
- Lowest criterion: `retrieval_quality`

The first draft kept semantic traversal, evidence attachment, custody capture,
and projection authority distinct. It did not yet require independent packet
families for each seed and the seed union, or require an explicit artifact
budget before expanding a high-degree evidence hub.

## Bounded change

Added one behavior-first packet-planning case and the minimum proposal contract
needed to satisfy it:

- produce a cumulative packet family for each seed and one for the seed union;
- report per-seed coverage so a strongly connected seed cannot conceal a thin
  one; and
- defer high-degree evidence expansion until the recipient contract supplies an
  explicit artifact budget.

## Result

- Candidate fingerprint:
  `c87b348621e9c9e8eb4384654a7f239e92f6396428cd8616a7735fd7bec1ef4e`
- Rubric fingerprint:
  `62bcc59c28ac222dd72d2c769f202c9e4bd4e809ff999c3272c277d964603a7e`
- Score: `1.00`
- Hard failures: none
- Synthetic cases: `11/11`
- Lowest criteria: none

The score does not advance the RFC, authorize implementation, establish
editorial adequacy, clear rights or consent, or approve publication. It shows
only that the unchanged proposal candidate satisfies its deterministic design
contract and synthetic transition cases.

The candidate now includes an explicitly bounded read-only evaluation
prototype. That prototype is implementation evidence permitted during
exploration; it does not change the RFC stage or the implementation authority
record.

## August 12 knowledge-practice hill climbs

The proposal now preserves attributed lenses and temporal handoff states,
composes scoped permissions by intersection, and supports append-only
participant correction. An unresolved request to restrict projection holds the
affected projection; a correction that would replace the governed original
fails closed. The RFC also records its generic architecture relationship to the
protected opportunity classification in PR #272 without importing protected
source context.

- Candidate fingerprint:
  `5502515b290cca95bb3e1368fc7daa37febc5e3c971988478d8ae793cd7ef687`
- Rubric fingerprint:
  `0defb500c013b992a7e5382262d898c3ac9cbc97652bf23e413486f83b0310d4`
- Score: `1.00`
- Hard failures: none
- Synthetic cases: `15/15`
- Behavior-first tests: `11/11`
- Lowest criteria: none

## Repository verification

The RFC structure check and the current fifteen synthetic scenarios and eleven
behavior-first tests pass. The complete repository check reaches the
independent professor-lens holdout gate and then fails closed, as designed:
none of the six final scorecards match the branch's exact current public
candidate `e3d01eda…`. Fresh human commissioning remains an orchestration gate
outside public Git; this run does not manufacture or carry forward those
judgments.
