# Citation Knowledge Data

This directory is the machine-readable, public-safe citation layer.

- `sources.json` describes public sources and protected source metadata.
- `claims.json` records exact propositions, surfaces, boundaries, and anti-claims.
- `evidence.json` states how a source supports a claim and where support stops.
- `research-audits.json` preserves generalized negative-search methods and limits.
- `pages.json` maps stable claim IDs to page-local citation occurrences.
- `schema.ts` defines the validated record shapes.
- `index.ts` validates the bundle and resolves first-appearance citation numbering.

Citation numbers are never stored. They are generated per page from source order.
Protected sources and non-defensible claims cannot resolve into public citations.

See `docs/knowledge-bank/citation-policy.md` for the authoring workflow.
