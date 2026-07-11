# Citational Care

Citational care makes the path from claim to source visible while preserving the limits, context, people, and uncertainty that make the claim trustworthy.

This site is a portfolio, not a public evidence database. Citations should help a reader inspect the strongest factual claims without making private archives, source files, or protected community context public.

## Records

The machine-readable records live in `apps/www/src/data/knowledge-bank/`.

- `sources.json` describes artifacts or publications.
- `claims.json` describes what the site can say and what each source supports.
- `research-runs.json` records documented searches, especially negative findings.
- `corrections.json` preserves material public corrections instead of silently overwriting them.
- `projections/*.json` maps page-local citation keys to stable claim IDs.

Stable IDs belong to records. Numerical citation marks belong to a page. A source may be `SRC-POLITICO-NEUBAUER-2016-03-14` globally and render as `[4]` on one page, then `[2]` on another.

## Source Classes

- `primary`: public source close to the event or institution.
- `primary-attachment`: attached artifact such as a promotional graphic.
- `secondary`: reporting or analysis by another publication.
- `participant-archive`: private or participant-held evidence that must be described carefully.

Private sources may support an internal claim, but public references must render only a truthful safe description such as "Private source; no public asset URL." Do not commit private paths, raw archives, transcripts, credentials, private correspondence, or unapproved media.

## Support

Use the narrowest relationship that fits:

- `direct`: the source states the claim.
- `visible-text`: the claim comes from visible text in the source.
- `metadata`: the claim comes from source metadata.
- `corroborating`: the source supports the claim alongside another source.
- `contextual`: the source provides context but should not carry the claim alone.

An inference must say that it is an inference. A negative-search finding must say "not recovered," not "did not exist," unless stronger evidence is later added.

## Adding A Citation

1. Add or update a source, claim, research run, or correction record.
2. Add the claim to the page projection in first-appearance order.
3. Import `Cite`, `References`, and the page projection.
4. Place `<Cite projection={...} citationKey="..." />` directly after the supported clause.
5. Render `<References projection={...} />` near the end of the narrative.
6. Run `npm run check:citations`.

Citation components use native links, same-page anchors, `role="doc-noteref"`, `role="doc-backlink"`, and a native ordered list in a `role="doc-bibliography"` section. They must work without client-side JavaScript.

## Commands

```bash
npm run check:citations
npm run check
```

## Non-Goals

This system is not a CMS, public knowledge-bank browser, citation popover package, client-side graph, private-archive viewer, or sitewide scholarly apparatus. For now, it is reusable infrastructure piloted on the CallNYC case study.
