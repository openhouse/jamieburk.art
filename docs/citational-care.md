# Citational Care

Citational Care is the portfolio's public-safe source system. It lets the site make clear professional claims while keeping the supporting trail inspectable and the private archive protected.

The public reading order is simple:

1. The page says the claim in plain language.
2. An inline page-local citation points to Sources & notes.
3. The note links to an original or archived public source when one is available.
4. The note also says what the source does not establish.

The Knowledge Bank chain is deeper:

1. Source records describe origin, preservation, access status, public notes, what is established, and what is not established.
2. Claim records describe the public wording, status, qualifiers, anti-claims, approval, and allowed surfaces.
3. Evidence relationships connect one claim to one source or research run with a relationship type.
4. Research-run records summarize public-safe findings and negative findings without publishing raw research artifacts.
5. Asset/media records track rights, consent, and publication status.
6. Correction records preserve resolved public-facing changes.
7. Page projections decide which approved claims can appear on which page.

## Current Files

- `apps/www/src/data/knowledge-bank/sources.json`
- `apps/www/src/data/knowledge-bank/claims.json`
- `apps/www/src/data/knowledge-bank/evidence.json`
- `apps/www/src/data/knowledge-bank/research-runs.json`
- `apps/www/src/data/knowledge-bank/assets.json`
- `apps/www/src/data/knowledge-bank/corrections.json`
- `apps/www/src/data/knowledge-bank/projections/*.json`
- `apps/www/src/components/citations/Cite.tsx`
- `apps/www/src/components/citations/References.tsx`
- `apps/www/src/lib/citations/resolve-citation-page.ts`

Do not add public `/proofs`, `/knowledge-bank`, or `/public-claims` routes. The website is a composed projection from the bank, not a public database browser.

## Source Rules

Separate the origin of a source from its preservation layer.

For example, if a Civic Hall post is preserved by the Internet Archive, the source record should still name Civic Hall as the origin. The preservation object can describe the Wayback capture, but the public note must not imply Wayback authored the event information.

Use `publiclyLinkable: false` for private or summary-only evidence. Private sources must not include local file paths, raw metadata, unpublished participant names, or public URLs.

## Claim Rules

Every public claim needs:

- `status`
- `confidence`
- `publiclyUsable`
- `allowedSurfaces`
- approval status
- required qualifiers when needed
- anti-claims

A public page may not strengthen a claim beyond the claim record. If stronger language is warranted, update the claim record first, then update the page projection.

## Evidence Rules

Evidence is not a loose source list. Each relationship connects one claim to one source or research run. The allowed relationship types are:

- `direct_support`
- `corroboration`
- `context`
- `qualification`
- `contradiction`
- `negative_search_result`

Use negative-search relationships carefully. "Not recovered" is an archival finding, not proof that something never existed.

## CallNYC Pilot

The first pilot is `/work/callnyc`. It demonstrates:

- page-local numbering that resets per page
- repeated claim reuse with multiple backlinks
- adjacent citation markers for claims supported by multiple evidence records
- linked public sources
- summary-only private-source notes
- a correction record for the project year
- a research-run record for the Civic Hall Wayback CDX review

The secondary projection is `/work/technical-operations`, where only the narrow CallNYC proof row is cited.

## Adding A Public Claim

1. Add or update the source record.
2. Add or update the claim record with public wording, qualifiers, anti-claims, approval, and allowed surfaces.
3. Add an evidence relationship.
4. Add an occurrence to the relevant page projection.
5. Insert `<Cite page={...} occurrence="..." />` at the public claim.
6. Ensure the page renders `<References page={...} />`.
7. Run `npm run check:citations`, `npm run test:citations`, and `npm run report:citations`.

## Correcting A Claim

When a public field changes because better evidence is available, add a correction record with the old value, corrected value, reason, source claim IDs, status, and resolution date. The public page should show the corrected value, not both values.

## Review Commands

```bash
npm run check:citations
npm run test:citations
npm run report:citations
```

`npm run check` also runs the citation validator.
