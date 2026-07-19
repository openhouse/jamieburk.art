# Knowledge Wiki inventory

**Reviewed:** 2026-07-18
**Primary brief:** `M-knowledge-wiki-product-and-teammate-implementation-brief.md`

## Existing system

| Surface | Role before this change | Decision |
| --- | --- | --- |
| `docs/knowledge-bank/` | Public-safe dossiers, policies, research notes, opportunity lenses | Keep as the authored Knowledge Wiki compatibility root; do not create a second content tree |
| `apps/www/src/data/knowledge-bank/records.ts` and imports | Typed canonical claims, sources, observations, evidence, tasks, inquiries, corrections, and page plans | Preserve as authority for exact records; import IDs and relationships into the derived graph |
| `apps/www/src/data/knowledge-bank/public-registry.json` | Generated public citation projection | Preserve as generated output; never hand-edit from the wiki |
| `apps/www/src/data/proofs.ts` | Structured professional proof layer | Preserve; no conversion or duplication in this bounded release |
| `apps/www/src/data/work.ts` | Current public portfolio projection | Preserve during transition; no automatic rewrite in this release |
| `scripts/query-knowledge-lifecycle.mjs` | Read-only typed-record and intake query | Preserve; the wiki query adds page and graph navigation without replacing it |
| `scripts/check-knowledge-bank.mjs` | Existing proof and route guard | Preserve and compose into `wiki:check` |
| Private archives | Raw and access-controlled source material | Remain outside the public repository |

## Duplication risks found

- A new `docs/knowledge-wiki/` tree would split contextual authority from the
  substantial existing dossier corpus.
- Copying typed claims, source locators, evidence excerpts, rights decisions, or
  corrections into frontmatter would create divergent canonical records.
- Treating generated graph JSON as editable content would invert the authority
  model.
- Automatically publishing every wiki node would confuse archival depth with
  editorial selection and could leak protected context.

## Bounded pilot

The first connected subgraph includes:

- the Knowledge Wiki root;
- CallNYC as a project;
- the January 30, 2016 CouncilStat hackathon as an event;
- Technical Operations as a capability;
- Source-Backed Team Memory as a method;
- the existing OTI Technical Operations opportunity lens;
- schema and authoring policies;
- canonical CallNYC claims, sources, corrections, and one protected source,
  imported by stable ID from the typed registry.

The pilot deliberately includes a correction, negative research, a wanted
page, and protected media governance. These are structural acceptance tests,
not ornament.

## Migration posture

This is report-first and additive. Existing dossier pages without frontmatter
remain valid Markdown and appear in the inventory as migration candidates. A
missing pilot ID, duplicate ID, broken authored link or fragment, unresolved
typed relation, unsafe locator, or protected projection fails closed. The
absence of frontmatter on the rest of the historical corpus is reported, not
silently interpreted as data loss.
