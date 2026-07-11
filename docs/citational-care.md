# Citational Care

Citational care is the portfolio's public-safe way to show why a claim is
supportable without turning the site into a raw archive.

The knowledge bank holds stable claim IDs, source IDs, research-run IDs,
qualifications, protected boundaries, and page manifests. Public pages render
only page-local numbered citations and reader-facing source notes.

## Rules

- Stable IDs live in `apps/www/src/data/knowledge-bank/` and must not appear in
  rendered public pages.
- Inline citations link only to page-local references.
- References may link to public sources, but private or public-safe archival
  summaries must not expose local paths, identities, files, metadata, or raw
  research exports.
- Negative archival findings must say `not recovered`; do not assert
  nonexistence from absence.
- Citation numbers are generated from page manifests; do not store them as
  source identity.
- Do not create `/proofs`, `/knowledge-bank`, or `/public-claims` routes.

## Current Implementation

`/work/callnyc` is the first complete cited case study.

The public page uses:

- `apps/www/src/data/knowledge-bank/sources.json`
- `apps/www/src/data/knowledge-bank/claims.json`
- `apps/www/src/data/knowledge-bank/research-runs.json`
- `apps/www/src/data/knowledge-bank/assets.json`
- `apps/www/src/data/knowledge-bank/pages/callnyc.json`
- `apps/www/src/components/citations/Cite.tsx`
- `apps/www/src/components/citations/References.tsx`
- `apps/www/src/lib/citations/resolve-citation-page.ts`

Run `npm run check:citations` before strengthening or projecting sourced public
claims.
