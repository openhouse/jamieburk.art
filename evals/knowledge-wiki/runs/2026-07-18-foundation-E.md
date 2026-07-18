# Knowledge Wiki foundation E recursive evaluation

**Date:** 2026-07-18  
**Authority:** M product and teammate implementation brief, with N and D used
only where M left implementation detail open  
**Branch:** `feature/knowledge-wiki-E`  

## Baseline

The inherited `feature/knowledge-h` candidate passed its complete Node 26
`npm run check` before implementation. The repository had substantial citation,
proof, lifecycle, public-safety, and evaluation infrastructure, but no governed
Markdown compiler, stable wiki identity contract, `wiki:*` command family,
generated Wiki Graph, or VS Code-first start surface.

## Iteration 1: compiler rejection

The first real compiler pass found eight blocking issues:

- six false-positive privacy findings in existing safety instructions that
  prohibited raw transcripts or email archives;
- two genuinely over-traversed links from project notes to public-safe fixture
  files.

Repair:

- narrowed the privacy detector to observable protected locators and file/path
  markers rather than generic language about what must remain private;
- corrected both inherited relative paths;
- regenerated the graph and reports.

Result: 16 records, 45 semantic/evidence edges, 107 prose links, zero blocking
compiler failures, zero type-aware orphans.

## Iteration 2: mutation-suite rejection

The first mutation run passed 20 of 22 tests. Two fixtures attacked the wrong
surface:

- the rights mutation changed `public_display_status` instead of the projection
  state;
- the generated-file mutation placed its marker before frontmatter, preventing
  the parser from observing the canonical ID.

Repair:

- targeted the projection field exactly;
- made generated markers fail anywhere in an authored source file;
- reran all mutations.

Result: 22 of 22 mutation and regression fixtures passed.

## Iteration 3: lens-eval rejection

The first lens pass rejected two of 33 criteria because Markdown line wrapping
split the exact strings `public-facing interpretation` and `This is not proof
that no page ever existed`.

Repair:

- normalized prose whitespace before testing meaning-bearing phrases;
- left the authored language unchanged;
- reran every lens.

## Iteration 4: independent holdout rejection

The first public-value holdout rejected the exact candidate after discovering
that the full repository check did not pass. One inherited NYC Artist Coalition
Facebook report contained a repaired repository-relative fixture link, while
its byte-level report and paragraph review locks still described the prior
broken link.

Repair:

- reviewed the change as a navigation correction with no factual or
  publication-scope change;
- updated only the whole-report and changed-paragraph review digests;
- required the knowledge eval, its adversarial tests, the complete repository
  check, and both exact-candidate holdouts to pass before release.

The rejected judgment is not reused: both holdouts must bind to the repaired
candidate fingerprint.

## Final deterministic result

| Lens | Result |
|---|---:|
| Architecture | 7/7 |
| Abby / information architecture | 8/8 |
| Chad / professional argument | 4/4 |
| Gerdes / provenance | 4/4 |
| Governance and citational care | 6/6 |
| Engineering | 4/4 |
| Mutation and regression fixtures | 22/22 |

The system deliberately does not average these into a synthetic health score.
Every deterministic criterion blocks independently.

## Current pilot health

- Governed records: 16
- Typed relations: 44
- Evidence relations: 1
- Prose links: 107
- Root-reachable governed records: 16
- Type-aware orphans: 0
- Type-aware dead ends: 0
- Wanted pages: 1
- Active corrections: 1
- Rights-review records: 1

## Human authority gates

The following remain open and are not converted into automated success:

- collaborator review;
- media rights and consent;
- fresh-reader retrieval study;
- editorial projection approval;
- production observation;
- hiring-reader and employment outcomes.

## Stopping decision

Stop this foundation hill-climb when deterministic gates, mutations, and lens
criteria pass on the unchanged authored pilot and full repository regressions
remain green. Do not continue adding ontology or public UI merely to increase
graph size. The next useful evidence is real VS Code use, a human authoring task,
and a friction log.
