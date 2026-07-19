---
wiki_record: true
id: project.callnyc
title: CallNYC
kind: project
status: maintained
visibility: public-safe
sensitivity: low
projection_status: ready
discoverable: true
created: 2016-03-01
last_reviewed: 2026-07-18
review_by: 2027-01-18
review_state: completed
owner: Jamie Burkart
aliases:
  - CallNYC.org
  - Call NYC
canonical_path: docs/knowledge-bank/projects/callnyc.md
canonical_refs:
  - callnyc
relations:
  - type: informed_by
    target: event.nycc.constituent-services-hackathon.2016
    href: ../events/nyc-council-constituent-services-hackathon-2016.md
  - type: uses_source
    target: source.civichall.hackathon-announcement.2016
    href: ../sources/civic-hall-hackathon-announcement-2016.md
  - type: uses_source
    target: source.nycc.councilstat-hackathon-post.2016
    href: ../sources/nyc-council-councilstat-hackathon-post-2016.md
  - type: uses_source
    target: source.politico.callnyc.2016-03-14
    href: ../sources/politico-callnyc-2016-03-14.md
  - type: has_asset
    target: asset.photo.digital-district.001
    href: ../assets/digital-district-photo.md
  - type: supports
    target: capability.technical-operations
    href: ../capabilities/technical-operations.md
  - type: projected_to
    target: portfolio.work.callnyc
    href: ../projections/work-callnyc.md
allowed_surfaces:
  - /work/callnyc
---

# CallNYC citational record

**Reviewed:** 2026-07-15

**Public surface:** `/work/callnyc`

The canonical machine-readable record is
`apps/www/src/data/knowledge-bank/records.ts`. This note explains the research
context and editorial boundaries; it is not a competing source of truth.

## Corrected chronology

- **2015:** Council 2.0 established policy context for open Council data,
  civic-technology collaboration, and user-centered experimentation.
- **January 30, 2016:** the New York City Council held a 1-3 p.m.
  constituent-services hackathon at Civic Hall.
- **Early March 2016:** the fuller CouncilStat constituent-services data became
  available.
- **March 2016:** Jamie independently developed CallNYC.org as a public-facing
  interpretation of those records.
- **March 14, 2016:** Politico New York published coverage of CallNYC and the
  CouncilStat release.

CallNYC is an archived independent prototype. It was not an official Council
product, a documented formal submission, or a documented winner.

## Source inventory

- Civic Hall announcement and its archived embedded-social-feed context.
- New York City Council event-day CouncilStat post.
- New York City Council Hackathon promotional graphic.
- Politico New York coverage dated March 14, 2016.
- Public CallNYC GitHub repository.
- Four recovered 2016 posts in which then-serving Council member accounts
  quote-posted a CallNYC result or directly shared CallNYC.org.
- Participant photograph metadata held outside the public projection.
- Documented Civic Hall Wayback/CDX research run held outside the app build.

The Wayback capture preserves embedded social posts. It is not a recovered
Civic Hall calendar listing or dedicated event-detail page.

## Recovered Council-account amplification

The current social archive recovered public amplification by at least four
then-serving Council member accounts in 2016: Mathieu Eugene, Helen Rosenthal,
Rosie Mendez, and Ydanis Rodriguez. Three quote-posted a CallNYC result and one
directly shared CallNYC.org. Official Council person records support the
officeholder context.

This establishes bounded public amplification. It does not establish formal
endorsement, Council adoption, offline use, constituent outcomes, approval of
every ranking, likes hidden from the current interface, or a complete historic
engagement roster. Three profile-counted CallNYC records remain unavailable.

## Bounded research finding

The deeper Civic Hall review examined:

- 4,630 deduplicated HTML captures;
- 1,240 original URLs;
- 296 distinct event-prefix URL keys;
- 215 successful event pages;
- 74 redirects;
- 7 captured 404s.

No CouncilStat, constituent-services, or NYC Council event slug was recovered.
No dedicated Civic Hall listing or event-detail page was recovered. This is not
proof that no page ever existed. Google Form contents, agenda, breakout roster,
registration contents, and a complete participant list were not recovered.

## Corrections

The correction registry preserves four active decisions:

- project chronology: `2014-2015` to `2016`;
- event superlative: `first civic-data hackathon` to
  the attributed sentence `The Council described the gathering as its first
  CouncilStat hackathon.`;
- resume projection: the unqualified first-CouncilStat formulation to Jamie's
  participation in a January 2016 constituent-services hackathon at Civic Hall;
- event hours: a limited participant-photo timestamp inference to the direct
  Civic Hall announcement of `1-3 p.m.`

The approved resume wording is deliberately separate from the Council's
attributed first-CouncilStat description:

> Built CallNYC.org after participating in a January 2016 New York City Council
> constituent-services hackathon at Civic Hall, translating public data into
> resident-facing issue pages and next-step guidance; covered in Politico New
> York.

## Digital District photograph

The canonical registry stores a safe description and opaque locator only. The
image shows a placard reading "Digital District - Help improve City Council
District office operations." It supports that visible wording and a
collaborative breakout-table context. It does not establish the event title,
agenda, facilitator, event time, or the identity and consent status of everyone
depicted.

Rights require permission, consent requires review, and public display remains
on hold. The photograph is not committed or rendered.
