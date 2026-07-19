# Knowledge Wiki page contract

The current canonical Wiki root remains `docs/knowledge-bank/` during the
foundation pilot. The product is now called **Knowledge Wiki**; the directory
name is a compatibility path.

## Minimum governed frontmatter

```yaml
---
id: project.callnyc
title: CallNYC
kind: project
status: maintained
visibility: public-safe
sensitivity: low
owner: jamie
last_reviewed: "2026-07-18"
review_by: "2027-01-18"
canonical_path: docs/knowledge-bank/projects/callnyc.md
discoverable: true
aliases:
  - Call NYC
canonical_refs:
  - CLM-CALLNYC-INDEPENDENT-FOLLOW-ON
relations:
  - type: informed_by
    target: event.nycc.constituent-services-hackathon.2016
    context: The event and later data release established the project context.
---
```

## Authority rule

Frontmatter owns Wiki page identity and authored semantic relations. It does
not replace the validated claim, source, evidence, correction, proof, or
citation registries. `canonical_refs` must resolve to an existing structured
record or proof ID.

## Controlled values

Initial kinds:

`project`, `person`, `organization`, `event`, `place`, `source`, `asset`,
`claim`, `research-run`, `research-inquiry`, `decision`, `correction`, `method`,
`timeline`, `application`, `evaluation`, `index`, `glossary`, `anti-claim`,
`capability`, `opportunity`, and `projection`.

Initial relations:

`part_of`, `informed_by`, `resulted_in`, `supports`, `contradicts`,
`supersedes`, `documents`, `mentions`, `participated_in`, `organized_by`,
`collaborated_with`, `uses_source`, `uses_method`, `has_asset`, `located_at`,
`projected_to`, and `related_to`.

Use `related_to` only when a more precise relation would be misleading.

## Writing and linking

- Use ordinary relative Markdown links, not proprietary wikilinks.
- Give links descriptive labels that explain why the destination matters.
- Preserve stable `id` values when a page moves.
- Update `canonical_path`, preserve an alias when useful, and run
  `npm run wiki:check` after a move or heading change.
- Do not hand-author inverse relations merely to increase edge count; backlinks
  are generated.

## Absence and correction

Keep `not recovered`, `unknown`, `protected`, `did not occur`, and `retired`
distinct. A bounded negative search finding must never become a universal claim
of nonexistence.

Material corrections link the previous record, corrected record, reason,
evidence authority, affected surfaces, and review state. Do not silently erase
consequential wording or chronology changes.

## Wanted pages

Use a `wanted` entry on an index when a page is important but not ready to
write:

```yaml
wanted:
  - id: project.example
    proposed_title: Example project
    reason: A governed chronology is needed after the original records are recovered.
```

The ID, title, and reason are required. A wanted ID must be unique and must be
removed from the queue when the governed page is created. `Not recovered` is a
research state; it is not evidence that the project or source never existed.

## Advisory wishlist accounting

When a review names a bounded set of pages to create, record every proposed
stable ID in the applicable evaluation contract before implementation. The
contract should test that each requested ID is either:

- present as a governed, reachable page with a source return; or
- still visible in the wanted-page queue with a reason.

Completed advisory lists may remain in the evaluation contract as regression
coverage. This prevents a green check from silently forgetting a requested page
that was never entered into the queue. The wanted-page queue itself contains
only unresolved work; resolved IDs must not remain there.

## Present-grounded source return

Use `source_return` when a page is created or materially reconsidered by
returning to its evidence:

```yaml
source_return:
  encountered_on: "2026-07-19"
  return_by: "2027-01-19"
  mode: original-source-reread
  access_state: available
  source_classes:
    - official hearing transcript
    - original project website
  changed_or_confirmed: "The current reading confirmed the implementation role and narrowed the outcome claim."
  unresolved:
    - "Collaborator review could further distinguish shared authorship."
```

Allowed modes are `original-source-reread`, `source-family-reread`, and
`canonical-record-reread`. Allowed access states are `available`, `partial`,
`public-only`, and `blocked`.

If access is blocked, add a public-safe `librarian_request` stating what Jamie
can help locate or authorize. Do not put local paths, cloud IDs, credentials,
private filenames, participant details, or protected coordinates in this
repository. The exact access method belongs in the authorized private source
registry described by the dual-Wiki RFP.

Source return does not grant publication permission, settle collective credit,
clear media rights, prove causality, or replace Jamie's approval. `return_by`
creates a review queue so a prior summary does not permanently substitute for
looking again.

## Generated files

`npm run wiki:graph` and `npm run wiki:report` write ignored, reproducible files
under `reports/`. They are derived views and must not be edited as canonical
source.
