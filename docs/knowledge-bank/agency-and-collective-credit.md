# Agency And Collective Credit

The portfolio must show Jamie's work clearly without absorbing the work of
collaborators, communities, elected officials, agencies, institutions, or
participants into a single-person success story.

`apps/www/src/data/knowledge-bank/agency-relations.json` is the exact-set
attribution layer for `apps/www/src/data/proofs.ts`. It does not create a new
claim and does not decide publication. Each relation records:

- the actor;
- Jamie's bounded action;
- the object and purpose of that action;
- the usable result supported by the record;
- the relationship type and credit scope;
- canonical claim IDs or an explicit proof-debt state;
- confidence; and
- anti-claims that define what the evidence does not support.

Use distinct relationship types for implementation, stewardship, contribution,
advocacy, testimony, publishing, coalition action, qualification, and inferred
causality. Never collapse institutional action, legislative enactment, or a
collective outcome into an individual implementation claim.

Every proof record is classified, including records held from the website and
records that still carry proof debt. The composite checker rejects missing or
extra relations and mutation-tests sole-causality drift, title inflation,
collaborator erasure, and endorsement drift.
