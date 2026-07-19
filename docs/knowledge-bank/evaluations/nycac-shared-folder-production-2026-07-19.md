---
id: evaluation.nycac.shared-folder-production.2026-07-19
title: NYC Artist Coalition shared-folder production evals
kind: evaluation
status: governed-open
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-19
review_by: 2026-08-19
canonical_path: docs/knowledge-bank/evaluations/nycac-shared-folder-production-2026-07-19.md
summary: Deterministic and human criteria for complete accounting, safe promotion, collective credit, application usefulness, and selective public projection.
relations:
  - type: related_to
    target: research.nycac.shared-folder.2026-07-19
    href: ../research-runs/nycac-shared-folder-2026-07-19.md
  - type: related_to
    target: project.nyc-artist-coalition
    href: ../projects/nyc-artist-coalition-2017.md
human_review: governed-open
---

# NYC Artist Coalition shared-folder production evals

## Deterministic criteria

- `population_total = inventoried_total = classified_total = dispositioned_total`
- `root_items = root_folders + root_files`
- every public disposition count sums to the population total;
- all accessible folders have a recorded capture or error disposition;
- the priority-review count and character total match the private export ledger;
- public files contain no Drive identifiers, resource keys, authenticated URLs,
  private paths, raw exports, participant rows, contact data, or media payloads;
- protected sources expose only opaque locators and public-safe summaries;
- every promoted claim has evidence, boundaries, anti-claims, credit scope, and
  a projection decision;
- the archive coverage claim remains held from public website projection;
- the site changes only by strengthening already public-corroborated role
  claims;
- graph links, source relationships, citations, and generated outputs close on
  the same candidate.

## Recursive hill-climb protocol

1. Run `npm run evals:nycac-shared-folder`.
2. Run the Knowledge Wiki graph, health, and mutation suites.
3. Run citation, knowledge-bank, public-safety, route, type, lint, and build
   checks through `npm run check`.
4. Treat each failure as a specific revision target.
5. Re-run the narrow failed check, then the complete suite.
6. Stop only when all deterministic criteria pass on one unchanged candidate.

## Human criteria

Automation cannot complete Jamie review, collaborator attribution review,
quotation permission, rights and represented-person review, hiring-manager
comprehension, interview usefulness, application selection, or production
approval. Those gates remain open and must not be converted into passing
booleans by an agent.
