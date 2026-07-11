# Citation knowledge bank

This directory is the canonical machine-readable citation layer for the
portfolio. It contains only public-safe metadata. The public website projects
selected records through explicit server-rendered citation components.

- `sources.json`: public, metadata-only, and protected source descriptions.
- `claims.json`: precise claims, publication status, boundaries, and anti-claims.
- `evidence.json`: typed relationships between claims and sources.
- `citation-notes.json`: authored multi-source public notes.
- `pages.json`: stable page occurrence IDs; numbers are never stored.
- `artifacts.json`: media rights, publication status, and evidentiary limits.
- `research-runs.json`: bounded methods and negative findings.
- `corrections.json`: open, production-blocking, resolved, and superseded corrections.

Do not commit non-public source material, filesystem locations, identifying
participant details, or uncleared media. The existing
`apps/www/src/data/proofs.ts` remains the public proof projection for broader
portfolio claims; citation checks enforce parity for the CallNYC projection so
the two layers cannot silently disagree.
