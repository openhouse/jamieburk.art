# ADR: Knowledge Wiki naming and canonicality

**Status:** Accepted for the bounded foundation pilot  
**Date:** 2026-07-18  
**Decision owner:** Jamie Burkart  

## Decision

The current product name is **Knowledge Wiki**. **Knowledge Bank** remains a
historical and compatibility name while the repository learns how to preserve
identity, links, evidence, corrections, and projections across a later physical
rename.

The Knowledge Wiki is a Markdown-first, Git-reviewed editorial and research
system with a compiled semantic graph. It is not a public or anonymously
editable wiki. The public portfolio remains a smaller, audience-specific
projection.

For this pilot, the existing `docs/knowledge-bank` directory remains the single
physical Markdown root. Introducing `docs/knowledge-wiki` now would create a
parallel source tree before the migration rules have been exercised.

## Authority registry

| Domain | Current authority | Pilot relationship | Future decision |
|---|---|---|---|
| Wiki identity, contextual prose, typed relations, and navigation | Governed Markdown records under `docs/knowledge-bank` | Canonical for the bounded pilot | Consider a link-aware physical rename after one clean cycle |
| Existing claims, sources, evidence relationships, inquiries, and corrections | `apps/www/src/data/knowledge-bank/records.ts` and its composed modules | Wiki pages adapt and link to registry IDs; they do not replace the registry | Migrate only through a separate ADR and parity tests |
| Broader professional proof wording and status | `apps/www/src/data/proofs.ts` | Referenced, not copied wholesale | Preserve until a governed selector replaces it |
| Public work/case-study model | `apps/www/src/data/work.ts` | Canonical public projection during transition | Generate or retire only after projection parity is demonstrated |
| Public citation projection | `apps/www/src/data/knowledge-bank/public-registry.json` | Generated from the canonical citation registry | Keep generated and fail closed |
| Markdown claim register and research notes | Existing files under `docs/knowledge-bank` | Transitional donor records unless they carry governed frontmatter | Migrate incrementally, record by record |
| Media rights and consent | Canonical structured media fields plus human approval | The pilot stores only public-safe metadata and an opaque registry ID | Never infer clearance from access or evidence value |
| Generated graph, backlinks, indexes, and health reports | Knowledge Wiki compiler | Derived and reproducible; never edited as canonical source | Future read-only Explorer must consume the same graph |
| Protected evidence | Private Source Vault outside this public repository | Opaque IDs and public-safe boundaries only | Never import raw private material |

## Authored, derived, and projected layers

- **Authored:** governed Markdown records and the existing structured authorities
  named above.
- **Derived:** `reports/wiki-*` and
  `docs/knowledge-bank/_generated/*`. These files are regenerated from authored
  records and carry a generated-file warning.
- **Projected:** portfolio routes, resume language, application packets,
  citations, and captions. Projection is an editorial decision, not an
  automatic result of graph membership.

## Stable identity

Wiki IDs identify concepts and survive path or heading changes. Paths, titles,
aliases, and legacy registry IDs may change independently. A move must preserve
the stable ID, update `canonical_path`, repair prose links and typed relation
`href` values, regenerate the graph, and rerun the checks.

## Public and private boundary

Everything committed here is publicly discoverable. `private`, `restricted`,
or `permission-required` metadata records may describe a boundary, but they may
not contain private paths, raw private text, contact data, participant lists, or
unapproved media. `noindex` is not privacy.

## Human authority

Passing automation does not establish collaborator consent, rights clearance,
editorial approval, production observation, reader comprehension, or hiring
outcomes. These remain explicit human gates.

## Consequences

- No mass directory or package rename occurs in this pull request.
- Existing citation and portfolio systems continue to operate.
- The first compiler reads only Markdown pages with governed frontmatter while
  validating ordinary links across the complete transitional Markdown root.
- The first public UI remains unchanged.
- A future Knowledge Wiki Explorer, if warranted by real use, will be private,
  read-only first, and derived from the canonical graph export.
