# Knowledge Wiki C evaluation record

This directory records the bounded recursive hill climb for the Knowledge Wiki
foundation. It is evaluation evidence, not a canonical knowledge source and not
publication approval.

## Exact implementation candidate

- candidate fingerprint:
  `dfe1f8b5b3a81454d0597f421e82c5cbd7c955ed9da698e374fb70be46c3ca6d`
- rubric fingerprint:
  `36198cf9a9eb5c5467c14146dd990f20107455f0e5579c7dd3b05db8e2569e74`
- graph fingerprint:
  `cd159c65d2060039cbcb6545ea5e24db2becca62f7e55cbea7c16374c0e4b387`
- implementation weighted score: `1.0000`
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
- `iteration-4-source-rereading-holdout.json`: fresh independent read-only
  judgment bound to the expanded project-page and source-rereading candidate.
- `iteration-4-source-rereading-pass-1.json`: first exact-candidate pass with
  all deterministic and external implementation criteria at score 4.
- `iteration-4-source-rereading-pass-2.json`: second unchanged pass; the
  expanded implementation criterion is reached at weighted score 1.0000.

## Expanded candidate

This iteration adds authored overview pages for NYC Artist Coalition, WOW List,
KC Town Hall, and Fair Rent NYC; a cross-project transition-and-handoff method;
and an original-source rereading protocol. New blocking evals require those
pages to remain traversable, bounded, and tied to canonical records. They also
require each materially researched priority page to retain its present
question, inspected original, actual scope, changed and unchanged
understanding, access boundary, and next return.

The exact-candidate evidence does not assert that the accessible archive is
complete, that every source should be processed, or that access authorization
grants permission to quote, retain, publish, or promote source material.

## What remains open

- Jamie's exact-candidate release decision;
- collaborator-credit review where stronger individual role wording is sought;
- rights and consent decisions for protected media;
- actual consented reader studies;
- broader semantic migration, including a future artistic-practice subgraph.

The absence of these human decisions keeps release readiness held. It does not
invalidate the implementation result.
