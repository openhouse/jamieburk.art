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
  `342a03cf7214b9297c1f47c9a6972744b4ff164786043ebc5b2ff96dbd0cd5a4`
- Score: `1.00`
- Hard failures: none
- Synthetic cases: `11/11`
- Lowest criteria: none

The score does not advance the RFC, authorize implementation, establish
editorial adequacy, clear rights or consent, or approve publication. It shows
only that the unchanged proposal candidate satisfies its deterministic design
contract and synthetic transition cases.

## Repository verification

The RFC structure check, the eleven synthetic scenarios, the seven
behavior-first tests, the knowledge-bank eval check, and the public-safety check
pass. The complete repository check reaches the composite integration holdout
gate and then fails closed, as designed: adding this proposal creates a new
source-tree candidate, so two semantic judgments bound to the prior candidate
cannot be reused. Fresh human commissioning remains an orchestration gate
outside public Git; this run does not manufacture or carry forward those
judgments.
