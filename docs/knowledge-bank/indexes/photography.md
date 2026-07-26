---
id: index.knowledge-wiki.photography
title: Living photographic knowledge
kind: index
status: governed-open
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-26
review_by: 2026-10-26
canonical_path: docs/knowledge-bank/indexes/photography.md
summary: >
  Start-here record for RFC 0003's public-safe photographic asset, occurrence,
  curatorial, rights, recollection, correction, and portfolio-edition loop.
relations:
  - type: related_to
    target: asset.photo.jamie-council-chamber.layout-a
    href: ../assets/photographs/jamie-council-chamber-layout-a.md
    context: Layout A's homepage image is the first governed canary.
  - type: related_to
    target: index.photo-set.layout-a.council-chamber
    href: photo-sets/layout-a-council-chamber.md
    context: Public-safe set record for the current canary and withheld private population.
  - type: related_to
    target: evaluation.curatorial.layout-a.home-council-chamber.v1
    href: ../evaluations/curatorial/layout-a-home-council-chamber-v1.md
    context: Simulated-lens curatorial proposal with human authority preserved.
  - type: related_to
    target: decision.photography.layout-a.home-council-chamber.v1
    href: ../decisions/photography/layout-a-home-council-chamber-v1.md
    context: Bounded branch-review selection decision and its open gates.
  - type: related_to
    target: projection.photo.layout-a.home.hero.council-chamber
    href: ../projections/photography/layout-a-home-hero-council-chamber.md
    context: Exact homepage occurrence for the governed public derivative.
  - type: related_to
    target: projection.edition.layout-a.branch-review.2026-07
    href: ../projections/photography/layout-a-branch-review-edition-2026-07.md
    context: First partial portfolio edition, bound to the frozen Layout A donor.
  - type: related_to
    target: method.photography.artist-led-curatorial-loop
    href: ../methods/artist-led-photographic-curation.md
    context: Artist-led selection and source-return method.
  - type: related_to
    target: research-inquiry.photography.layout-a.council-chamber
    href: ../research-inquiries/photography/layout-a-council-chamber.md
    context: Photographer, permission, exact-event, and source-binding questions.
---

# Living photographic knowledge

Artists choose. Archival production supports. The Knowledge Wiki remembers.
Rights govern. The portfolio composes. Jamie decides what becomes public.

This index implements the first bounded loop described in
[RFC 0003](../../../rfcs/0003-living-photographic-knowledge-loop.md). The public
site remains a selective composition. The Wiki preserves the asset,
derivative, proposal, selection, exact occurrence, partial portfolio edition,
recollection, and open research state without treating branch review as
production clearance.

## Current canary

[Jamie in a Council chamber](../assets/photographs/jamie-council-chamber-layout-a.md)
is the first governed Layout A photograph. It is already present in the frozen
donor as the homepage hero. The implementation adds identity and provenance
bindings without changing the visible composition.

The governed loop includes:

- the [public-safe photo set](photo-sets/layout-a-council-chamber.md);
- the [public derivative visual review](../sources/photo-metadata/layout-a-council-chamber-visual-review-2026-07.md);
- the [branch-review register source](../sources/photo-metadata/layout-a-photo-review-register-2026-07.md);
- the [permission research status](../sources/permissions/layout-a-council-chamber-permission-status-2026-07.md);
- the [first-person recollection](../sources/recollections/jamie-public-facing-civic-work-2026-07.md);
- the [source-return inquiry](../research-inquiries/photography/layout-a-council-chamber.md);
- the [artist-led curatorial method](../methods/artist-led-photographic-curation.md);
- the [simulated-lens proposal](../evaluations/curatorial/layout-a-home-council-chamber-v1.md);
- the [branch-review decision](../decisions/photography/layout-a-home-council-chamber-v1.md);
- the [exact homepage occurrence](../projections/photography/layout-a-home-hero-council-chamber.md);
- the [partial portfolio edition](../projections/photography/layout-a-branch-review-edition-2026-07.md).

The RFC's original East River example belonged to Layout C. Because Jamie
selected Layout A as this branch's exact donor, the implementation uses Layout
A's actual lead photograph rather than silently importing a different layout or
image. East River remains a future migration candidate.

## State

- Public derivative and visible observation: recorded.
- Public Git branch-review authorization: recorded.
- Exact private source binding: pending private verification.
- Photographer identity and permission: open.
- Exact event identification: open.
- Caption, credit, crop, staging, production, and indexing approval: open.
- Final Jamie approval of an unchanged candidate: open.

Machine-green means the open states are represented and enforced. It does not
mean those human gates are complete.

## Operational views

Run `npm run photos:report` to rebuild the public-safe photo index, placement,
rights, impact, and health views. Run `npm run photos:check` and
`npm run photos:test` before committing.
