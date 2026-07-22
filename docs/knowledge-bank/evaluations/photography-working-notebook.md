---
id: evaluation.photography-notebook.2026-07-22
title: Photography working notebook evaluation
kind: evaluation
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-22
review_by: 2026-10-22
canonical_path: docs/knowledge-bank/evaluations/photography-working-notebook.md
summary: Executable contract preserving the photography notebook as a generative, source-returnable, private-by-default, human-governed working space rather than an automatic publication pipeline.
projection_status: hold
projection:
  status: hold
  surfaces: []
relations:
  - type: related_to
    target: index.knowledge-wiki.photography-notebook
    href: ../indexes/photography-working-notebook.md
  - type: related_to
    target: method.photographic-archive-fieldwork
    href: ../methods/photographic-archive-fieldwork.md
  - type: related_to
    target: research.photography-notebook-opening.2026-07-22
    href: ../research-runs/photography-notebook-opening-2026-07-22.md
---

# Photography working notebook evaluation

The evaluation protects the conditions for experimentation. It does not score
photographs, prescribe Jamie's taste, require a fixed taxonomy, or decide which
images belong in the portfolio.

## Blocking contracts

- The notebook, method, opening note, and evaluation are materialized and
  reachable from the living archive and visual-evidence indexes.
- The rough-draft field remains explicitly provisional, non-representative,
  revisable, and open to unexplained attraction and contradiction.
- The opening note cannot claim an archive encounter or completed selection
  before material inspection occurs.
- Source identity, duplicates, sequences, bursts, and a stable route back are
  preserved in the protected working layer.
- Discovery, selection, safety, rights, consent, editorial usefulness, and
  publication approval remain separate states.
- Visual observation cannot silently become identity, role, event, date,
  relationship, authorship, consent, or outcome evidence.
- Private paths, locators, filenames, raw metadata, face labels, and protected
  relationship information cannot enter the public-safe notebook.
- No photograph or photo-library export may be committed to the opening
  workstream area.
- All notebook records remain held from portfolio projection.
- Jamie retains specific-use approval, and AI cannot clear safety, consent,
  rights, or publication.
- New entries preserve questions, material access state, close observations,
  contradictions, protected absences, librarian requests, and a publication
  decision.

## Mutation coverage

The test suite removes navigation, converts the provisional field into a final
or representative claim, erases state distinctions, drops source return,
injects a private locator, adds a photo asset, activates projection, substitutes
AI approval, and converts the planned opening into a false completed encounter.
Each mutation must fail the criterion it attacks.

## Commands

```sh
node scripts/knowledge-wiki/photography-notebook-eval.mjs
node --test scripts/knowledge-wiki/photography-notebook-eval.test.mjs
```

The evaluator is also integrated into `npm run wiki:eval`, and its mutations
run through the existing `npm run wiki:test` glob.

A green result confirms that the notebook contract remains intact. It does not
approve an image, clear a human gate, or establish that the private field has
been created or reviewed.
