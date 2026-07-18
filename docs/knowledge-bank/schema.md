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

## Generated files

`npm run wiki:graph` and `npm run wiki:report` write ignored, reproducible files
under `reports/`. They are derived views and must not be edited as canonical
source.
