---
id: project.callnyc
title: CallNYC
kind: project
status: maintained
visibility: public-safe
sensitivity: low
projection_status: careful
last_reviewed: "2026-07-18"
review_by: "2027-01-18"
human_review_state: not-requested
aliases:
  - Call NYC
  - CallNYC.org
canonical_path: docs/knowledge-wiki/projects/callnyc.md
summary: Independent 2016 civic-data prototype translating CouncilStat records into resident-facing issue pathways.
authority_refs:
  - domain: proof
    id: callnyc-civic-data-guidance
relations:
  - type: informed_by
    target: event.nycc.constituent-services-hackathon.2016
    context: The January gathering established context; CallNYC was an independent follow-on.
  - type: uses_source
    target: source.civichall.hackathon-announcement.2016
    context: Supports the event date, hours, and constituent-services purpose.
  - type: uses_source
    target: source.nycc.councilstat-hackathon-post.2016
    context: Supports the Council's narrower first-CouncilStat wording.
  - type: uses_source
    target: source.politico.callnyc.2016-03-14
    context: Supports Jamie's independent development and product decisions.
  - type: has_asset
    target: asset.photo.callnyc.digital-district.001
    context: Public-safe metadata only; display remains on hold.
  - type: supports
    target: capability.technical-operations
    context: Demonstrates public-data interpretation, implementation, and bounded operational judgment.
  - type: uses_method
    target: method.source-backed-team-memory
    context: The present record preserves sources, correction, and unresolved questions.
  - type: projected_to
    target: projection.portfolio.callnyc
    context: The portfolio selects a smaller approved argument from this record.
wanted:
  - id: event.betanyc.school-of-data.2016
    proposed_title: BetaNYC School of Data presentation
    reason: Needed to complete and independently test the public-launch chronology.
---

# CallNYC

## Orientation

CallNYC is a bounded pilot for the Knowledge Wiki because its record joins a
project, public event, government and press sources, an independently developed
technical artifact, a protected photograph, correction history, public
projection, and current role evidence.

## Current Public-Safe Account

The [January 30, 2016 constituent-services hackathon](../events/nyc-council-constituent-services-hackathon-2016.md)
provided context. After the fuller CouncilStat data became available, Jamie
independently developed CallNYC.org as a public-facing interpretation of those
records. The exact governed proposition is the
[independent follow-on claim](../claims/callnyc-independent-follow-on.md).

## Jamie's Role

Contemporaneous [Politico New York coverage](../sources/politico-callnyc-2016.md)
connects Jamie to the data interpretation, product decisions, and iteration.
The project was not commissioned by the Council and is not presented as an
official Council product.

## What Became Usable

The prototype translated administrative records into issue pages, Council
contact pathways, search-friendly public explanations, and next-step guidance.
This is one bounded example in the
[Technical Operations evidence path](../capabilities/technical-operations.md).

## Evidence And Limits

The [Civic Hall announcement](../sources/civichall-hackathon-announcement-2016.md)
supports the date, 1-3 p.m. hours, and constituent-services purpose. The
[Council event-day post](../sources/nyc-council-councilstat-post-2016.md)
supports the narrower `first CouncilStat hackathon` description. Neither makes
CallNYC an official submission, winner, or Council product.

## Known / Open / Protected

- **Known:** the bounded chronology, independent implementation, surviving
  source repository, press coverage, and approved public projection.
- **Open:** a public-safe BetaNYC School of Data record remains wanted; it is
  not represented as recovered.
- **Protected:** the [Digital District photograph](../assets/digital-district-photo.md)
  remains metadata-only pending rights and consent review.

## Corrections

The [chronology correction](../corrections/callnyc-chronology.md) changed an
earlier `2014-2015` description to `2016` and preserves the affected surfaces.
The [anti-claim](../claims/callnyc-not-official-council-product.md) prevents
compression from turning institutional context into institutional ownership.

## Related Records

- [CallNYC portfolio projection](../projections/callnyc-case-study.md)
- [Source-Backed Team Memory](../methods/source-backed-team-memory.md)
- [NYC OTI opportunity](../opportunities/oti-technical-operations.md)
- [Deeper citational record](../../knowledge-bank/projects/callnyc.md)

## Next Review

Review after a collaborator correction, new primary source, public projection
change, or no later than January 2027.
