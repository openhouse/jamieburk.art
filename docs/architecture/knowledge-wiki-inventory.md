# Knowledge Wiki Architecture Inventory

**Inventory date:** 2026-07-18  
**Baseline branch:** `feature/knowledge-n`  
**Baseline commit:** `575332e042f6a217ffa71b5b6fa69c99f70b7d13`

## Decision Summary

The repository already has a mature, public-safe knowledge lifecycle. This
foundation adds a human reading and navigation layer; it does not create a
second claim bank, source registry, citation system, rights registry, or public
projection model.

## Existing Authorities

| Domain | Canonical authority | Knowledge Wiki role |
|---|---|---|
| Wiki-page identity, orientation, and authored links | `docs/knowledge-wiki/**/*.md` | Canonical |
| Professional proof records | `apps/www/src/data/proofs.ts` | Link and explain by stable authority reference |
| Sources, claims, evidence, inquiries, corrections, and citation pages | `apps/www/src/data/knowledge-bank/records.ts` and its imported modules | Link and explain; do not recopy as a parallel registry |
| Claim/source schema | `apps/www/src/data/knowledge-bank/schema.ts` | Reuse through authority-reference validation |
| Public citation projection | `apps/www/src/data/knowledge-bank/public-registry.json` and citation components | Existing public authority |
| Public work model | `apps/www/src/data/work.ts` | Transitional canonical public projection |
| Agency and collective credit | `apps/www/src/data/knowledge-bank/agency-relations.json` | Existing governed authority |
| Route composition | `docs/evals/composition-manifest.json` | Existing governed authority |
| Archival survivorship | `docs/knowledge-bank/archival-survivorship-register.json` | Existing governed authority |
| Rights, consent, and mosaic review | source media records plus `docs/evals/mosaic-privacy-review.json` | Existing governed authority |
| Raw or protected evidence | Source Vault / private archive outside Git | Opaque identifiers and public-safe summaries only |
| Generated Wiki Graph, backlinks, and health reports | `.artifacts/knowledge-wiki/` | Derived; ignored; never hand-edited |

## Current Shape

- `apps/www` is the only public application.
- `docs/knowledge-bank/` contains 81 tracked public-safe research and
  governance artifacts at this baseline.
- The typed lifecycle contains 76 intake records, 307 sources, 103 claims, 68
  inquiries, and the correction and citation-page registries.
- The proof layer has 18 canonically linked proofs and four explicit research
  backlog items.
- Existing operator commands provide intake, query, report, citation, safety,
  corpus, and release checks.
- The site has no public proof-database or Wiki route, and this foundation does
  not add one.

## Legacy Name Inventory

The terms `Knowledge Bank`, `knowledge-bank`, and `knowledge:*` remain in
historical documents, stable paths, imports, scripts, IDs, and command names.
They are compatibility surfaces, not instructions for a mass rename.

Current-facing documentation should say **Knowledge Wiki** and explain the
former name once. Historical research notes and stable implementation paths
remain unchanged until a separate migration decision proves link, identity,
citation, and projection safety.

## Duplicate-System Findings

No second canonical store is needed. The Markdown pilot therefore stores:

- stable Wiki-page IDs;
- task-oriented prose and ordinary relative links;
- typed relations among Wiki pages;
- explicit references to existing canonical authority IDs;
- public-safe status and projection guidance.

It does not restate the complete source, claim, evidence, correction, rights,
or projection objects.

## Public Boundary

Everything committed here is discoverable because the repository is public.
`private`, `restricted`, `unlinked`, `staging`, and `noindex` are not security
boundaries. Protected material stays outside Git; a Wiki record may retain only
an opaque authority identifier and a newspaper-safe summary.

## Proposed Canonical Root

`docs/knowledge-wiki/` is canonical for Wiki-page identity and human
navigation. `docs/knowledge-bank/` remains the compatibility path for the
existing evidence and governance notes. The typed application records remain
canonical in their present locations.
