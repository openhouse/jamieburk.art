---
id: project.callnyc
title: CallNYC
kind: project
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-14
review_by: 2027-01-18
aliases:
  - Call NYC
  - CallNYC.org
canonical_path: docs/knowledge-bank/projects/callnyc.md
summary: >
  Independent civic-technology prototype translating CouncilStat
  constituent-services records into resident-facing issue pathways.
authority: contextual-wiki
registry_ids:
  - callnyc
  - CLM-CALLNYC-INDEPENDENT-FOLLOW-ON
relations:
  - type: informed_by
    target: event.nycc.constituent-services-hackathon.2016
    href: ../events/nycc-constituent-services-hackathon-2016.md
  - type: uses_source
    target: source.politico.callnyc.2016-03-14
    href: ../sources/politico-callnyc-2016-03-14.md
  - type: uses_source
    target: source.councilstat.fuller-release.2016
    href: ../sources/nycc-constituent-services-data-2016-05-27.md
  - type: uses_source
    target: source.callnyc.source-repository
    href: ../sources/callnyc-source-repository.md
  - type: uses_source
    target: source.callnyc.live-site.2026-08-14
    href: ../sources/callnyc-live-site-2026-08-14.md
  - type: uses_source
    target: source.screenshot.callnyc.launch-interface.2016-05-04
    href: ../sources/photo-metadata/callnyc-launch-interface-2016-05-04.md
  - type: related_to
    target: decision.callnyc.issue-pathways
    href: ../decisions/callnyc-issue-pathways.md
  - type: uses_method
    target: method.source-backed-team-memory
    href: ../methods/source-backed-team-memory.md
  - type: supports
    target: capability.technical-operations
    href: ../capabilities/technical-operations.md
    context: Public-data interpretation, implementation, correction, and archival continuity.
  - type: has_asset
    target: asset.photo.digital-district.001
    href: ../assets/digital-district-photo.md
  - type: projected_to
    target: portfolio.work.callnyc
    href: ../projections/work-callnyc.md
---

# CallNYC citational record

**Reviewed:** 2026-07-11

**Public surface:** `/work/callnyc`

The canonical machine-readable record is
`apps/www/src/data/knowledge-bank/records.ts`. This note explains the research
context and editorial boundaries; it is not a competing source of truth.

## Corrected chronology

The chronology is also traversable through the
[Council constituent-services hackathon](../events/nycc-constituent-services-hackathon-2016.md#source-basis),
the [bounded independent-development claim](../claims/callnyc-independent-follow-on.md),
and the [active chronology correction](../corrections/callnyc-years-2026.md).

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
- Official May 2016 Council page documenting the fuller public-data release,
  daily updates, the January Civic Hall hackathon, and participant suggestions
  being implemented.
- Participant photograph metadata held outside the public projection.
- Documented Civic Hall Wayback/CDX research run held outside the app build.

The Wayback capture preserves embedded social posts. It is not a recovered
Civic Hall calendar listing or dedicated event-detail page.

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

The correction registry preserves three active decisions:

- project chronology: `2014-2015` to `2016`;
- event superlative: `first civic-data hackathon` to
  `first CouncilStat hackathon`;
- event hours: a limited participant-photo timestamp inference to the direct
  Civic Hall announcement of `1-3 p.m.`

The approved resume wording is:

> Built CallNYC.org as an independent follow-on to the New York City Council's
> first CouncilStat hackathon, translating constituent-services data into
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
on hold. The photograph is not committed or rendered. Its canonical feedback
chain is recorded as a protected photo lead, a visual observation limited to
the placard and generic table context, and a research inquiry covering
corroboration, rights, consent, and any appropriate future crop. The held claim
cannot enter the public registry merely because the visible text was verified.

The separate
[media record](../assets/digital-district-photo.md#what-it-does-not-establish)
keeps evidentiary value distinct from rights, consent, and display permission.

## Cleared project mark

The public source repository preserves a non-participant graphic reading
"CALL NYC." It is cleared for display as the archived independent prototype's
project mark. It does not establish Council ownership, affiliation, formal
submission, or current-service status.

## Restored public site

The restored [CallNYC public site](https://callnyc.org/) is available as an
archived, unofficial prototype. The [August 2026 close
reading](../sources/callnyc-live-site-2026-08-14.md) documents its substantial
issue-pathway information architecture and the remaining tension between the
footer archive disclaimer and current-sounding guidance. Availability does not
make its people, data, phone actions, or resident guidance current.
