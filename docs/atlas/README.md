# Atlas

Atlas is the canonical private knowledge system for Jamie's public-safe
personal-professional knowledge universe. It joins complete atomic records,
the semantic Markdown wiki, immutable A-N source artifacts, queries, evals, and
a clean-room portable export without exposing the private archive or turning
the portfolio into a database.

Markdown pages live in [`pages/`](pages/). Every page has YAML frontmatter with
a stable Atlas ID, typed reciprocal relations, authority and consent posture,
review ownership, and - for project pages - a complete deterministic slice of
the canonical Atlas record store. Twenty-one project pages jointly cover the
entire canonical lifecycle collection.

## Sources of authority

`records/canonical.json` is authoritative for lifecycle records and proof
claims. The former typed bank is frozen and retained only for migration parity;
new consumers use `@jamie-burkart/atlas/records`.

The generated graph in `generated/atlas.graph.json` is disposable. The
federated source catalog in `generated/feature-evals-knowledge.json` preserves
the knowledge inventory from all fourteen frozen `feature/evals-*` source
trees. See [`source-integration.md`](source-integration.md) for its provenance,
privacy, and merge-history contract.

The ontology, record-disposition ledger, and variant policy are versioned in
`ontology.json`, `record-dispositions.json`, and `variant-policy.json`. The
machine suite, grounded retrieval tasks, run lineage, and human review
contracts live in `evals/atlas/`. These contracts make disagreement,
correction, negative knowledge, temporal precision, rights, credit, and
epistemic boundaries testable without pretending that social interpretation
can be fully automated.

## Operating sequence

1. Preserve the frozen legacy baseline and its exact fingerprint.
2. Freeze external branch knowledge by exact source commit.
3. Refresh and verify the federated source catalog when the source cut changes.
4. Edit or add a complete Atlas record, then its public-safe Markdown page when needed.
5. Declare authority, public-use, consent, correction, and named-credit boundaries.
6. Connect the page through typed reciprocal relations.
7. Run `npm run atlas:generate`, `npm run atlas:check`, and `npm run atlas:test`.
8. Materialize a clean-room package with `npm run atlas:bundle -- --output PATH`
   and verify it without Git using `npm run atlas:verify-bundle -- --input PATH`.
9. Run the full repository `npm run check` before any public projection.
10. Use `npm run atlas:release` to fail closed on automated defects or pending
    human gates. Human review is never converted into a machine pass.

There is intentionally no `/atlas`, `/knowledge-bank`, `/proofs`, or
`/public-claims` application route.
