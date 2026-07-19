# Knowledge Wiki Foundation Inventory

**Branch baseline:** `feature/knowledge-c` at `e42d6a14`
**Inventory date:** 2026-07-18

## Existing Authorities

| Area | Current authority | Notes |
|---|---|---|
| Public-safe narrative knowledge | `docs/knowledge-bank/` | Human research, project, policy, lifecycle, and governance records |
| Citation graph | `apps/www/src/data/knowledge-bank/records.ts` | Canonical source, claim, evidence, inquiry, correction, and page-plan data |
| Redacted citation delivery | `public-registry.json` | Generated public-safe subset; protected locators excluded |
| Professional proof | `apps/www/src/data/proofs.ts` | Structured claims and public-use guardrails |
| Public work model | `apps/www/src/data/work.ts` | Current public project cards and metadata |
| Public case studies | `apps/www/src/content/work/` | Audience-specific MDX projections |
| Knowledge intake | `lifecycle-records.ts` and related archive-production modules | Structured capture, source, claim, inquiry, and promotion state |
| Append-only history | `docs/knowledge-bank/lifecycle/history.jsonl` | Immutable event ledger with amendment and retirement events |
| Evaluation | `evals/` and `scripts/lib/*evals.mjs` | Knowledge, application, blind-spot, and composite contracts |
| Protected evidence | Outside the repository | Raw archives, correspondence, images, private locators, and rights materials |

## Existing Command Families

- `knowledge-bank`, `check:citations`, and `report:citations` validate the
  canonical proof and citation layers.
- `record:knowledge`, `query:knowledge`, `check:knowledge-history`, and
  `evals:knowledge` govern lifecycle operations.
- `evals:application`, `evals:production`, and `evals:composite` govern public
  composition and integration.

The `wiki:*` family introduced by this foundation governs the Markdown document
and semantic graph. It calls the current authorities by stable reference rather
than reimplementing them.

## Current Markdown State

The existing root contains project notes, research productions, policies,
opportunity maps, lifecycle documentation, and public-safety guidance. Most are
valuable narrative records but do not yet have stable Wiki frontmatter.

The foundation deliberately governs only the CallNYC and Technical Operations
pilot. Existing pages without `wiki_record: true` remain unchanged and outside
the compiled graph until reviewed individually.

## Duplicate-System Finding

There is no existing Markdown graph compiler. There are overlapping narrative
and structured descriptions, but the repository already states which is
canonical. The main risk is not a literal duplicate database; it is future
drift between narrative Markdown, canonical TypeScript records, résumé copy,
and portfolio projections.

The pilot addresses that risk through `canonical_refs`, typed projection
records, correction records, and deterministic checks. It does not declare
Markdown source receipts to be a second source registry.

## Naming Inventory

“Knowledge Bank” appears throughout historical research, scripts, IDs, and
current documentation. These occurrences are retained where they identify
existing commands, paths, quotations, or historical work. New current-facing
documentation uses **Knowledge Wiki**, with the former name stated explicitly.

## Public And Private Boundary

Everything committed here is public. Frontmatter values such as `internal` or
`summary-only` guide editorial use but do not make a file private. The compiler
fails on machine-local paths, signed URLs, protected media identifiers, public
projection of restricted records, and public media projection without cleared
rights.

## Foundation Decision

- Canonical root for this cycle: `docs/knowledge-bank/`
- Governed pilot marker: `wiki_record: true`
- Canonical identity: stable dot-separated ID
- Canonical evidence registry: existing `records.ts`
- Derived output: `reports/knowledge-wiki/generated/`
- Future UI: deferred, admin-only and read-only first
