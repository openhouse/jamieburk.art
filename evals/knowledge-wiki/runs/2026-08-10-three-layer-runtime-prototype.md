# Three-layer Knowledge Wiki runtime prototype hill climb

- Date: 2026-08-10
- RFC: `rfcs/0005-three-layer-knowledge-graph.md`
- RFC stage: `exploring`
- Prototype under evaluation: yes
- Implementation stage authorized: no
- Public projection authorized: no

## Evaluation object

The evaluated candidate is the versioned layer policy, derived compiler,
semantic-radius traversal, per-seed and union packet planner, custody-request
planner, projection-eligibility check, read-only CLI, and implementation eval.
It operates on the public-safe Knowledge Wiki and performs no authenticated
source read, protected artifact copy, deployment, or publication.

The current repository fixture contains 386 Wiki nodes. The policy classifies
107 as semantic, 274 as evidence, and 5 as projections. Source custody remains
unmaterialized and outside public Git. Five mixed photo-set indexes have
explicit evidence-layer overrides.

The real-graph suite uses the Knowledge Wiki root and the six opportunity nodes
currently materialized in this repository. This is a current in-repository
population, not a claim that the wider private opportunity seed set is
complete. In particular, the separately discussed OTI PIT Crew opportunity and
other protected opportunity context are not silently invented here; they need
governed intake before they can become public-safe Wiki seeds.

## Baseline

- Candidate fingerprint:
  `a9494dc84f0731a8a980e71510f0dbe79d0b3333ac504549ec580677e8afe7a4`
- Score: `0.90`
- Hard failures: none
- Lowest criterion: `deferred_hub_is_bounded`
- Deferred evidence IDs serialized by the union plan: `269`

Semantic traversal correctly stopped at the evidence boundary, but the
unbudgeted plan still serialized every deferred evidence ID. That recreated a
high-degree evidence inventory inside a supposedly bounded plan.

## Bounded change

The planner now replaces deferred evidence inventories with:

- a candidate count;
- a deterministic digest; and
- per-degree attachment summaries.

Only evidence IDs explicitly selected by a recipient contract appear in an
allowed expansion, and their count must remain within an explicit artifact
budget. The change preserves internal membership validation without emitting
the unselected inventory.

## Result

- Candidate fingerprint:
  `c0be943eabbeff8043924b3ea46f1704d07e3f4611d607233309869a5e9760cb`
- Score: `1.00`
- Hard failures: none
- Deferred evidence IDs serialized by an unbudgeted plan: `0`
- Lowest criteria: none

The score establishes deterministic prototype behavior only. It does not make
the RFC accepted or implementing, establish editorial relevance, authorize a
private packet run, clear source access, or approve publication.
