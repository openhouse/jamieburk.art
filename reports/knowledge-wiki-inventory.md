# Knowledge Wiki inventory

**Inventory date:** 2026-07-18
**Branch baseline:** `feature/knowledge-h` at `a28f3167`
**Physical Markdown root:** `docs/knowledge-bank`

## Baseline

The inherited root contained 56 files: 49 Markdown records or notes, seven JSON
data files, and 26 project notes. It had no `.vscode` configuration, no
`docs/architecture` directory, no governed Markdown-frontmatter compiler, and no
`wiki:*` command family. The complete inherited `npm run check` passed under
Node 26 before implementation.

## Existing authorities

| Concern | Existing location | Current posture |
|---|---|---|
| Public project projection | `apps/www/src/data/work.ts` | Canonical during the pilot |
| Professional proofs | `apps/www/src/data/proofs.ts` | Canonical structured proof layer |
| Sources, claims, evidence, corrections, and page plans | `apps/www/src/data/knowledge-bank/records.ts` and composed modules | Canonical citation and evidence registry |
| Public citation output | `apps/www/src/data/knowledge-bank/public-registry.json` | Generated public-safe projection |
| Contextual research and governance | `docs/knowledge-bank` | Transitional Markdown donor root |
| Existing validation | `scripts/check-knowledge-bank.mjs`, citation checks, public-safety checks, and eval suites | Preserved without replacement |

## Duplicate and competing concepts

Project and claim language currently appears in `work.ts`, `proofs.ts`, the
structured citation registry, and Markdown notes. These records serve different
jobs, but their authority was previously implicit. The canonicality ADR makes
that division explicit. The pilot does not copy the whole corpus or add another
database.

## Current-facing decision

`docs/knowledge-bank` becomes the transitional physical home of the **Knowledge
Wiki**. Only pages with governed frontmatter enter the compiled graph. Existing
pages without frontmatter remain public-safe donor notes until a deliberate,
record-by-record migration.

## Generated outputs

The new compiler owns:

- `reports/wiki-graph.json`;
- `reports/wiki-health.json` and `reports/wiki-health.md`;
- `reports/wiki-graph-delta.md`;
- `docs/knowledge-bank/_generated/index-by-kind.md`;
- `docs/knowledge-bank/_generated/backlinks/*.md`;
- orphan, dead-end, wanted-page, correction, and rights-review views.

Generated files are deterministic for a source commit and are never canonical
editorial records.

## Public/private boundary

The public repository may contain public sources, public-safe summaries, opaque
protected IDs, rights states, anti-claims, and projection decisions. It may not
contain raw private evidence, private paths, contact details, participant lists,
credentials, or unapproved media. The existing public-safety suite remains a
required regression gate.

## Migration recommendation

Do not rename the physical root yet. Use the pilot in VS Code, collect a friction
log, and require one clean move/rename exercise before deciding whether
`docs/knowledge-bank` should become `docs/knowledge-wiki`.
