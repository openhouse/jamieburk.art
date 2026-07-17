# WOW List, Sunday Dinner, and Call Script archival production

Reviewed: 2026-07-15

## Why these records belong together

The three records show one operating practice moving through different forms.
WOW List made cultural events discoverable through community language and
followable lists. Sunday Dinner made gathering repeatable through a durable
coordination system. Call Script carried event-sharing infrastructure into a
more explicitly civic form: public naming, collaborative drafting, meeting
documentation, and representative contact.

This is a source-backed continuity claim, not a claim that one product caused
the next project or that Jamie alone authored collective work.

## Aggregate findings

### WOW List

A historical database snapshot created July 22, 2017, records:

| Measure | Aggregate |
| --- | ---: |
| Users | 1,846 |
| Posts or events | 16,142 |
| Tags or lists | 23,864 |
| List follows | 28,837 |
| Stars or saves | 20,927 |
| Going marks | 2,965 |
| Calendar events | 15,915 |

The snapshot also supports at least 35 active city or regional scenes under a
defined threshold of 50 or more geocoded posts or events. The source digest is
`6987cc78a4b307487150642f17be66e7779999d308a2080abe5fedf9a7122695`.

Logical rows were reconstructed from multiline database records and reconciled
to distinct primary identifiers before counting. These are historical archive
rows, not unique active users, attendance, current use, revenue, or impact.

### Sunday Dinner

The longitudinal coordination workbook contains 345 numbered entries from
January 22, 2012, through March 7, 2021. It displays a formula-backed project
total of 2,783 meals served. The source digest is
`8d04b588d731191f82e08430c4f314d3cb8ae2985714bef4c3b16cbd7c4f13f7`.

The review inspected the workbook read-only and reconciled the numbered
chronology, cached summary values, and displayed formula. The public record
does not retain names, contacts, invitation notes, or person-level
participation. Numbered entries are not asserted as a complete event census;
the meals-served total is not a unique-person or independently audited
attendance measure.

### Call Script and NYC Artist Coalition

The public Call Script Page describes a representative-calling project and
links directly to `popular.vote`. A December 2016 archive identifies
`popular.vote` as a WOW List event-sharing and community-building surface.

The discussion for the January 27, 2017 DCLA meeting then shows that
coordination practice operating as civic facilitation:

- Call Script invited participants to help choose a group name before the
  meeting.
- NYC Artist Coalition received 57% of the displayed naming-poll share, ahead
  of six alternatives.
- Participants were invited to review, edit, and sign a letter to the
  Commissioner.
- A participant offered to take and share meeting notes.

The displayed poll does not expose a vote denominator. The event interface is
not historical attendance evidence. The record supports a participatory
formation process, not sole authorship, a complete formation chronology, or
individual causality for later government action.

Jamie states that he established Call Script and used it to help facilitate
the process through which NYC Artist Coalition emerged. That attributed role
is preserved as a high-value candidate and routed to dated-record and
collaborator corroboration before website selection.

## Public-safety boundary

The repository retains only aggregate counts, source digests, methods,
limitations, public URLs, and bounded claim records. It excludes raw database
records, person-level workbook rows, names and contact details, private
messages, participant quotations, credentials, authenticated state, and local
archive locations.

The structured aggregate fixture is at
`apps/www/src/data/knowledge-bank/fixtures/wowlist-sunday-dinner-callscript-aggregate.json`.
