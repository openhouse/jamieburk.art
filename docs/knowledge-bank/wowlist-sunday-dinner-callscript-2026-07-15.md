# WOWList, Sunday Dinner, and Call Script Archival Production

Date: 2026-07-15

## Scope

This pass tested three different kinds of evidence:

1. historic WOWList PostgreSQL production snapshots;
2. the exact Sunday Dinner workbook Jamie shared for this review; and
3. public Call Script and Facebook event records connecting `popular.vote` to
   early NYC Artist Coalition formation.

The raw database and workbook remain outside the repository. This note records
only public-safe aggregates, source boundaries, and promotion decisions. It
does not reproduce people, contact data, row values, relationship notes,
formulas, private locators, or checksums.

## WOWList production scale

Three distinct PostgreSQL custom-format snapshots were verified from June 24,
2016; June 1, 2017; and July 22, 2017. A read-only audit streamed selected
tables through `pg_restore` and counted `COPY` rows without restoring a live
database.

| Snapshot | Users | Posts / events | Tags / lists | List follows | Saved / starred |
| --- | ---: | ---: | ---: | ---: | ---: |
| 2016-06-24 | 995 | 10,136 | 14,813 | 18,181 | 12,935 |
| 2017-06-01 | 1,775 | 15,559 | 23,296 | 28,084 | 20,193 |
| 2017-07-22 | 1,846 | 16,142 | 23,864 | 28,837 | 20,927 |

The July 2017 snapshot also contains 15,915 Google Calendar event rows and
15,875 post-calendar links.

### Geography boundary

The latest snapshot contains:

- 35 city labels with at least 50 geocoded posts or events;
- 48 city labels with at least 25;
- 79 city labels with at least 10;
- 133 city labels with at least 5; and
- 709 city labels with at least 1.

This is the explicit basis for the phrase **roughly 35 city ecosystems**. It is
not evidence of 35 official chapters, equivalent community depth, attendance,
or unique reach.

## Sunday Dinner participation system

The exact shared workbook contains 17 sheets and 21,617 formula cells. Its
primary sheet contains 340 distinct numbered gathering identifiers through
345. It explicitly labels a 300th Sunday Dinner and includes later entries.
All 340 distinct numbered identifiers have associated operating data.

The numbering is not perfectly sequential: five identifiers are absent and
four are duplicated. The defensible public phrase remains **300+ gatherings**,
not 340 unique verified events.

The workbook makes Jamie's operating work concrete. It links numbered
gatherings with invitation, response, attendance, theme, host, contact, and
follow-through structures. A separate revision-attributed tracker corroborates
Jamie's ongoing creation and maintenance of this practice.

The workbook is not a public attendance database. No attendee total was
calculated or promoted. Invitations and responses are not relabeled as
attendance, and the workbook does not establish the 20+ resident-artist total.

## Call Script to NYC Artist Coalition

[Call Script's public page](https://www.facebook.com/callscript) links to
`popular.vote`, the WOWList calendar surface. In the public discussion for the
[January 27, 2017 Department of Cultural Affairs meeting](https://www.facebook.com/events/388137698233507/?active_tab=discussion),
Call Script asked participants to choose a name the emerging group could carry
forward while finding solutions and advocating for creative community. NYC
Artist Coalition is the leading visible result in the authenticated July 2026
poll capture.

The Call Script page later directed people to NYC Artist Coalition's March 6,
2017 general meeting. [Contemporaneous VICE reporting](https://www.vice.com/en/article/nyc-artist-coalition-dance-liberation-network-diy-spaces/)
independently places the coalition's early formation and DIY-space safety
purpose in early 2017.

The defensible claim is that Jamie established and facilitated a public action
surface that connected the popular.vote calendar with participatory naming and
continued coalition convening. This does not make Jamie the coalition's sole
founder, make the poll a legal founding instrument, or erase participant and
collaborator agency.

Historical Facebook reach language and event-response counts were not
promoted. They do not establish audited unique reach, attendance, endorsement,
or impact.

## Promotion decisions

Promoted to public site composition:

- `CLM-WOWLIST-ARCHIVED-PRODUCTION-SCALE`
- `CLM-SUNDAY-DINNER-LONGITUDINAL-PARTICIPATION-SYSTEM`

Promoted to canonical bank depth, held from current site composition:

- `CLM-CALLSCRIPT-POPULAR-VOTE-NYCAC-LINEAGE`

Rejected or held:

- official WOWList city chapters;
- a public Sunday Dinner attendee total; and
- Call Script reach, event attendance, or sole-founder claims.

## Public-safety boundary

Do not publish raw database rows, private user data, geolocation records,
participant names, phone numbers, email addresses, relationship notes,
invitations, responses, attendance indicators, formulas, source locators, or
checksums. Future visuals should be public-safe reconstructions, not screenshots
of protected systems.
