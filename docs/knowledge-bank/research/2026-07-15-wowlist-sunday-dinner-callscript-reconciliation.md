# WOW List, Sunday Dinner, and Call Script reconciliation

**Review date:** July 15, 2026  
**Projection status:** Knowledge-bank depth only; no website change  
**Privacy posture:** Aggregate findings only from protected records; no participant or account-level data

## Question

What can three distinct records add to the professional account of Jamie's
participation-system practice?

1. protected WOW List production database snapshots;
2. a protected Sunday Dinner invitation and response workbook; and
3. the surviving public Call Script Page and discussion for the January 27,
   2017 Department of Cultural Affairs DIY-spaces meeting.

The records are complementary, not interchangeable. The database describes a
digital discovery system at production scale. The workbook describes a bounded
invitation and follow-through practice. The Facebook records describe a public
handoff from a city meeting into continued social and coalition participation.

## Method

- Inspected three WOW List PostgreSQL custom-format snapshots through read-only
  archive listing and data-only extraction.
- Reproduced table-level counts for accounts, indexed posts, tags, follows,
  stars, going records, calendar events, and geocoded city or region labels.
- Compared snapshots dated June 24, 2016; June 1, 2017; and July 22, 2017.
- Read only bounded, aggregation-relevant ranges from the Sunday Dinner
  workbook. Names, contact details, responses, and the underlying link remain
  outside this repository.
- Reviewed the authenticated, currently surviving public interfaces for the
  [Call Script Page](https://www.facebook.com/callscript) and the [January 27,
  2017 event discussion](https://www.facebook.com/events/388137698233507/?active_tab=discussion).
- Reconciled the public sequence with DCLA's official CreateNYC statement that
  its January 2017 DIY-spaces meeting spurred NYC Artist Coalition's
  establishment.

## Findings

### WOW List: production scale and growth

| Snapshot | Account rows | Post-index rows | Tag rows | Follow rows | Star rows |
| --- | ---: | ---: | ---: | ---: | ---: |
| June 24, 2016 | 995 | 10,136 | 14,813 | 18,181 | 12,935 |
| June 1, 2017 | 1,775 | 15,559 | 23,296 | 28,084 | 20,193 |
| July 22, 2017 | 1,846 | 16,142 | 23,864 | 28,837 | 20,927 |

The July 22 snapshot also contains 2,965 going rows, 15,915 calendar-event
rows, and 15,875 post-to-event rows. A geolocation-to-post-index aggregation
recovered:

- 133 city or region labels with at least five geocoded posts or events;
- 79 with at least ten;
- 48 with at least 25; and
- 35 with at least 50.

The last threshold makes the existing phrase **roughly 35 active city
ecosystems** reproducible. It does not turn those labels into official chapters
or establish unique organizers, active users, or event attendance.

### Sunday Dinner: invitation and follow-through system

The protected 2025-2026 workbook contains 24 person-level working rows across
four tracked gathering or participation columns. Aggregate rows preserve 52
invitation instances, 41 non-empty response entries, 11 no-reply entries, and
25 literal yes marks.

Those response columns use mixed modes, including ranked choices and marks that
are not yes/no attendance fields. The workbook therefore supports a narrower,
strong claim: Jamie maintained or participated in a reusable invitation and
follow-through system. It does not independently establish physical attendance,
a complete chronology, 300 or more gatherings, 20 or more resident artists, or
current cadence.

### Call Script: a public participation relay

The surviving Call Script Page describes the project as a way to call
representatives and links to `popular.vote`. Its remaining public surface also
routes to an NYC Artist Coalition general meeting.

The January 27 event discussion preserves a more specific sequence:

1. Call Script and NYC Artist Coalition appear among the event's public
   identities for the DCLA DIY-spaces meeting.
2. A Call Script post invited meeting participants to continue the conversation
   at a nearby social gathering after the meeting.
3. A later NYC Artist Coalition post in the same discussion routed people to a
   February 6 general meeting.
4. Subsequent discussion entries carried later coalition meetings and campaign
   activity back through the same public surface.

The current event interface displays **445 people responded**. That is a
mutable, access-time response label, not an attendance count. It remains useful
as a bounded response signal and is not promoted into a portfolio metric.

Jamie remembers Call Script as his project and describes it as a bridge from
WOW List's cultural-discovery network and `popular.vote` into early coalition
facilitation. The public records corroborate the handoff sequence. They do not
independently establish his authorship of every post, sole project authorship,
sole facilitation, or a claim that Call Script alone created NYC Artist
Coalition.

## Source-to-claim decisions

| Source layer | Supported use | Withheld interpretation |
| --- | --- | --- |
| WOW List database snapshots | Dated production growth, aggregate product activity, transparent 35-label threshold | Unique active humans, current use, official chapters, sole authorship, impact |
| Sunday Dinner workbook | Reusable invitation and follow-through system across four tracked columns | Participant identities, physical attendance, 300+ gatherings, 20+ resident artists |
| Call Script Page | Public identity, representative-contact framing, `popular.vote` connection | Historical authorship of every post, complete account history, audience impact |
| DCLA event discussion | Meeting-to-social-to-general-meeting participation relay and mutable response label | Attendance, individual publisher attribution, sole coalition formation, policy causality |
| Jamie's first-person account | His remembered project role and method bridge | Independent corroboration of sole authorship or causal sufficiency |

## Professional pattern

Together, these records support a reserve interpretation of Jamie's practice:
he builds structures that help people discover activity, understand an
invitation, respond, and continue into a next shared setting. The evidence
shows different instances of that pattern; it does not collapse distinct
projects, collaborators, or periods into one origin story.

## Public-safety boundaries

- No raw database rows, credentials, account data, hashes, or geolocation rows
  enter the repository.
- No Sunday Dinner names, contact details, individual responses, attendance
  formulas, or workbook links enter the repository.
- No Facebook participant identities, comments, friend relationships, or
  authenticated account-management state enter the repository.
- A platform response label is not attendance.
- A public event identity is not proof of who created the event or wrote every
  post.
- A corroborated participation sequence is not proof of sole coalition
  formation or policy causality.

## Projection decision

This pass strengthens the knowledge bank but does not change the website. The
new records remain available for a later, audience-specific projection after
role attribution and editorial fit are separately reviewed. No `/proofs` or
other public knowledge-bank route is created.

## Next research

1. Reconcile surviving WOW List code and collaborator accounts with the dated
   production snapshots to attribute product responsibilities precisely.
2. Build a public-safe Sunday Dinner chronology from invitations, calendars,
   and collaborator accounts without reconstructing a guest list.
3. Recover Call Script repository, domain, design, and account-history records.
4. Ask early collaborators how WOW List, Call Script, the DCLA meeting, and the
   first coalition meetings related in practice.
