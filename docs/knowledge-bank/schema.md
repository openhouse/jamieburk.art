---
id: policy.knowledge-wiki-schema
title: Knowledge Wiki schema and authority contract
kind: policy
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-18
review_by: 2026-10-18
relations:
  - type: governs
    target: index.knowledge-wiki
  - type: related_to
    target: policy.knowledge-wiki-authoring
---

# Knowledge Wiki schema and authority contract

The Knowledge Wiki is a Markdown-first semantic wiki with a compiled knowledge
graph and governed public projections. Markdown is the human record. The graph
is derived. The portfolio is selective.

## Authority by layer

| Concern | Canonical owner |
| --- | --- |
| Page identity, orientation, authored links, and narrative context | Markdown and frontmatter in `docs/knowledge-bank/` |
| Exact claims, sources, observations, evidence, anti-claims, and research tasks | `apps/www/src/data/knowledge-bank/records.ts` and its imported typed records |
| Citation rendering and page plans | Existing citation registry and generated public registry |
| Rights, consent, custody, and source visibility | Existing typed source and evidence records |
| Corrections and superseded wording | Existing correction register |
| Public portfolio copy | Governed projections in the application data layer |
| Graphs, indexes, backlinks, health, and query output | Generated reports; never canonical |
| Raw, private, or access-controlled material | Outside this public repository |

No wiki page may create a second claim, source, evidence, citation, rights, or
correction system. It may point to canonical record IDs and explain their
context without reproducing protected locators or unapproved content.

## Required frontmatter

Pilot pages require:

```yaml
id: project.callnyc
title: CallNYC
kind: project
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-18
review_by: 2027-01-18
```

Optional fields are `aliases`, `canonical_refs`, `relations`, and `wanted`.
Relations use `{ type, target }`; both values are stable identifiers. A wanted
page records a deliberate gap with `{ id, title, reason, status }`.

## Controlled values

- `kind`: `index`, `project`, `event`, `capability`, `method`, `opportunity`,
  `person`, `organization`, `place`, `policy`, or `note`.
- `status`: `seed`, `active`, `maintained`, `needs-review`, `held`, or
  `deprecated`.
- `visibility`: `public-safe`, `restricted`, or `private`.
- `sensitivity`: `low`, `moderate`, `high`, or `protected`.
- relation types: `indexes`, `informed_by`, `informed`, `demonstrates`,
  `demonstrated_by`, `developed_through`, `uses_method`, `documented_by`,
  `governed_by`, `governs`, `supports`, `corrected_by`, `projects_to`, or
  `related_to`.

## Stable identity

Wiki IDs do not change when files move. Existing structured record IDs retain
their current forms. Aliases are search aids, not alternate identities.

## Generated artifacts

`reports/wiki-graph.json`, `reports/wiki-health.json`,
`reports/wiki-health.md`, and `reports/wiki-backlinks.json` are deterministic
build products. Each is marked generated and names the command that produced
it. Edit the authored Markdown or typed registry, then regenerate.
