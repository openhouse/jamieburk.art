# Knowledge Wiki C evaluation record

This directory records the bounded recursive hill climb for the Knowledge Wiki
foundation. It is evaluation evidence, not a canonical knowledge source and not
publication approval.

## Exact implementation candidate

- candidate fingerprint:
  `b4d409c0497e8857fc92afc7c3b8f6c420ca1519230b8af4590be56ca190fe6c`
- rubric fingerprint:
  `5621d7b3e8f95713d0e76ce1b25c9c6964bb78811035cbb1457e5bc3de2eccf4`
- graph fingerprint:
  `5aa51ddca50a192af564f9e05f99beed56768f40dc91d594d5713459cd16385f`
- implementation weighted score: `0.9368`
- decision: `implementation_ready_human_held`

## Iterations

- `iteration-0.json`: deterministic baseline; exposed an evaluator assumption
  about duplicate authored paths to one correction.
- `iteration-1-pre-holdout.json`: repaired deterministic gate; external lenses
  remained open.
- `iteration-2-pre-holdout.json`: improved reader orientation, protected-media
  semantics, and multi-hop query traversal.
- `holdout-2.json`: independent review of the semantic implementation before
  the final whitespace-only hygiene correction.
- `iteration-3-pre-holdout.json`: exact final candidate before rebinding.
- `holdout-3.json`: independent internal read-only judgment bound to the final
  candidate and frozen rubric.
- `iteration-3-holdout-pass-1.json`: first final implementation pass.
- `iteration-3-holdout-pass-2.json`: second unchanged final implementation
  pass; criterion reached.

## What remains open

- Jamie's exact-candidate release decision;
- collaborator-credit review where stronger individual role wording is sought;
- rights and consent decisions for protected media;
- actual consented reader studies;
- broader semantic migration, including a future artistic-practice subgraph.

The absence of these human decisions keeps release readiness held. It does not
invalidate the implementation result.
