# Jamie Burkart and WOW List Facebook event archival production

Reviewed: 2026-07-15
Scope: Jamie Burkart's authenticated personal Facebook Events index and the authenticated WOW List page-owner Events surface
Public fixture: [`personal-wowlist-facebook-events-full-population.json`](../../../apps/www/src/data/knowledge-bank/fixtures/personal-wowlist-facebook-events-full-population.json)

## Answer first

The capture-date personal Events index exposes **511 event-card instances**
representing **502 unique parent events**. Every row has a public-safe
disposition. The public repository identifies only **21 public event pages that
explicitly name Jamie as organizer or co-organizer**; it does not publish the
titles, descriptions, people, exact residential addresses, contact details, or
social graph associated with private and merely personal records.

The current WOW List page-owner Events surface exposes **zero event cards** and
displays "No events to show." That is the complete current owner-visible
surface, not evidence that WOW List never created, cohosted, shared, imported,
or linked historical events.

Two findings merit selective public projection:

- public event pages preserve a 100th Sunday Dinner milestone in 2014 and a
  200th in 2016, naming Jamie as organizer of the former and Julia Fredenburg
  and Jamie as co-organizers of the latter; and
- the 200th Sunday Dinner page links directly to its WOW List event page,
  preserving one concrete route from recurring gathering practice into the
  community-calendar platform.

The numbered event titles are contemporaneous milestone records, not an
independent audit of every Sunday Dinner.

## What 100 percent means

One hundred percent means that every event-card instance exposed by the two
live surfaces received a disposition on the capture date. It does **not** mean
a complete native Meta export or lifetime event history.

| Surface | Current exposed population | Accounting result |
| --- | ---: | --- |
| Jamie personal Events index | 511 instances | 511 anonymous ledger rows |
| Unique personal parent events | 502 | Four recurring parent IDs account for 13 instances |
| WOW List owner Events surface | 0 cards | Empty current surface; historical state unresolved |

Repeated personal-index extraction ended at three consecutive stable counts of
511. The latest exposed date is August 26, 2023; the earliest is December 2,
2006.

## Detail and privacy accounting

| Detail state | Count |
| --- | ---: |
| Recovered detail body | 475 |
| No detail rendered | 35 |
| Unavailable route | 1 |

| Privacy display | Count |
| --- | ---: |
| Public | 437 |
| Private | 33 |
| Not displayed | 41 |

The public ledger uses ordinals, years, detail states, privacy displays,
recurrence flags, and dispositions. It excludes raw event IDs and titles for
held records. Its dispositions reconcile to 511:

| Disposition | Count | Meaning |
| --- | ---: | --- |
| Held: profile association only | 398 | Public card, but presence on Jamie's profile does not establish a role |
| Withheld: private | 33 | Counted without publishing private event content or people |
| Represented in NYCAC census | 23 | Referenced to the stronger page-level coalition record |
| Research gap | 36 | Detail did not render; no event relationship inferred |
| Selected public organizer record | 21 | Public detail page explicitly names Jamie as organizer or co-organizer |

## Role-safe selected chronology

The 21 selected pages span December 2006 through February 2019. They support a
bounded event-page attribution chronology across participatory art, waterways,
community meals, music and touring networks, cultural-space safety, public
discussion, and civic participation.

They do not establish sole authorship or sole production. Examples include:

- **Musicians for a Semantic Web** (2006), a music event explicitly calling
  for development and implementation of Semantic Web standards;
- **Pirate Trolley-In!!** and **Micropop: Nation-Scenes** (2007), combining
  site-specific media, DIY music, and reflection on distributed scenes;
- a raft-design meal and **Release Yourself onto the Water Until it Tastes of
  Salt** (2007), inviting participation in a found-material river project;
- **The Night Walk with Jamie Burkart** (2010), a silent group walk;
- **Bike the Hudson to Beacon** (2011), a three-day group bicycle, camping,
  and museum trip;
- Sunday Dinner's public 100th and 200th milestone pages (2014 and 2016); and
- **Free Venue Fire Safety Course** (2019), co-organized with Tre Mc Manus and
  Combustion Inc. for people who live in, work in, produce, or attend events in
  collective and fringe spaces.

The fixture preserves all 21 selected records with dates, public URLs, bounded
credit, topics, summaries, and historical response labels.

## Source routes

Recovered detail bodies contain 77 external-URL occurrences. Nine
mission-relevant routes are preserved with relationship labels:

- Talks Not Raids and Let NYC Dance links from records already governed by the
  NYC Artist Coalition event census;
- the direct WOW List event route from the 200th Sunday Dinner page;
- River Marvel from the Hudson bicycle trip;
- Semantic Web, imagined-community, and Kansas City DIY references from
  Jamie-attributed events; and
- Chicago Data Collaborative and Current Museum links held only as research
  leads because their event cards do not establish Jamie's role.

A link establishes routing through an event page. It does not establish
agreement with every linked statement, authorship, adoption, or impact.

## Stakeholder and traction boundary

Twenty-three personal-profile cards overlap the separately governed NYC Artist
Coalition census. This report does not duplicate its elected-official, agency,
venue, organizer, or response analysis. The page-level source is better
evidence for those relationships; a personal-profile card adds no new role.

Historical Facebook response labels are retained only for the 21 selected
public Jamie-attributed pages. A Facebook response count is **not verified
attendance**, unique people, reach, endorsement, conversion, mandate, or
impact. Values are not summed.

## WOW List zero result

The WOW List alias and legacy-ID event routes were checked while acting as the
page owner, then the browser identity was restored to Jamie's personal profile.
Both routes exposed zero event cards.

This finding is intentionally phrased as **zero current owner-visible event
cards**. A native page export, archived event index, or historical Meta record
is still needed to determine whether Facebook once held WOW List-created,
cohosted, shared, imported, or linked events.

The 200th Sunday Dinner page supplies a different and affirmative fact: a
public 2016 Facebook event linked directly to a WOW List event page.

## Public-safety contract

The repository does not publish:

- exact residential addresses or access instructions;
- phone numbers, email addresses, or meeting credentials;
- private event titles or descriptions;
- attendee, invitee, responder, friend, or group identities;
- raw authenticated captures, cookies, or session state; or
- a reconstructable personal social graph.

## Research queue

1. Request and review native Meta owner exports for the personal account and
   WOW List page inside a protected workspace.
2. Reconcile removed events, recurring instances, and the 36 detail gaps
   without weakening the public-safety contract.
3. Mature the 21 selected event records against independent publications,
   preserved project sites, code and design archives, photographs, and
   collaborator accounts.
4. Keep the 100th and 200th Sunday Dinner pages as milestone evidence while
   independently corroborating the current 300-plus aggregate claim.
5. Treat Chicago Data Collaborative and Current Museum as research leads, not
   portfolio claims, unless another source establishes Jamie's relationship.
