# Atlas

Atlas is the private semantic Markdown wiki for Jamie's public-safe
personal-professional knowledge universe. It makes the existing knowledge bank
easier to enter, connect, query, evaluate, and hand off without exposing the
private archive or turning the public portfolio into a claims database.

Markdown pages live in [`pages/`](pages/). Every page has YAML frontmatter with
a stable Atlas ID, typed reciprocal relations, authority and consent posture,
review ownership, and - for project pages - a complete deterministic slice of
the canonical typed knowledge bank. Twenty-one project pages jointly cover the
entire canonical record collection.

## Sources of authority

Atlas is initially a semantic projection, not a replacement for
`apps/www/src/data/knowledge-bank/records.ts`. This preserves the existing
canonical claim, evidence, correction, publication-decision, and citation
contracts while the Markdown authoring model is evaluated.

The generated graph in `generated/atlas.graph.json` is disposable. The
federated source catalog in `generated/feature-evals-knowledge.json` preserves
the knowledge inventory from all fourteen frozen `feature/evals-*` source
trees. See [`source-integration.md`](source-integration.md) for its provenance,
privacy, and merge-history contract.

## Operating sequence

1. Preserve the typed bank and its exact fingerprint.
2. Freeze external branch knowledge by exact source commit.
3. Refresh and verify the federated source catalog when the source cut changes.
4. Edit or add a public-safe Markdown page.
5. Declare authority, public-use, consent, correction, and named-credit boundaries.
6. Connect the page through typed reciprocal relations.
7. Run `npm run atlas:generate`, `npm run atlas:check`, and `npm run atlas:test`.
8. Run the full repository `npm run check` before any public projection.

There is intentionally no `/atlas`, `/knowledge-bank`, `/proofs`, or
`/public-claims` application route.
