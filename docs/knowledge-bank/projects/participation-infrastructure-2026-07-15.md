# Participation Infrastructure: WOW List, Sunday Dinner, and Call Script

Date: 2026-07-15
Status: public-safe archival production report
Public projection: one WOW List scale claim and a strengthened existing NYC Artist Coalition participation claim

## Purpose

This pass asks how three bodies of work relate without collapsing them into a
single origin story:

- Sunday Dinner as recurring in-person gathering infrastructure;
- WOW List as followable community-calendar infrastructure;
- Call Script as a representative-calling interface and public listening
  surface during the early NYC Artist Coalition period.

The result is a public-safe knowledge graph, not a claim that one project
caused the next. It preserves aggregate evidence, chronology, source scope,
collective credit, and open questions while excluding raw community records.

## WOW List database audit

The source material is a set of protected historical PostgreSQL snapshots. The
raw dumps, user rows, event rows, contact data, geolocation rows, and account
identifiers are not in this repository.

The audit used data-only table extraction and aggregate counting. The public
method can be reproduced by an authorized reviewer with commands in this
general form:

```sh
pg_restore -a -t <table> -f - snapshot.dump
```

No ordinary site build reads or fetches the protected snapshots.

### Platform growth

| Snapshot | Users | Posts/events | Tags/lists | List follows | Stars |
| --- | ---: | ---: | ---: | ---: | ---: |
| 2016-06-24 | 995 | 10,136 | 14,813 | 18,181 | 12,935 |
| 2017-07-22 | 1,846 | 16,142 | 23,864 | 28,837 | 20,927 |

The later snapshot also contains 45,562 post-tag relationships, 2,965
`going` relationships, 92,114 activity actions, and 25,938 geolocation rows.
These are database relationships, not physical attendance, active-user totals,
endorsement, or impact.

### Geography convention

Of 16,142 posts/events, 12,433 connect to geolocation rows. Grouping those
records by normalized city, region, and country produces:

| Minimum geocoded posts | Groups |
| ---: | ---: |
| 1 | 709 |
| 5 | 133 |
| 10 | 79 |
| 25 | 48 |
| 50 | 35 |

The public phrase **roughly 35 city ecosystems** uses the conservative
50-post threshold. It does not mean official chapters, equally active scenes,
or organizer-controlled local organizations.

### Popular Vote

The July 22, 2017 snapshot records a Popular Vote calendar created November
12, 2016. It has:

- 933 distinct event relationships;
- 196 follow relationships;
- 196 distinct follower account IDs.

The account IDs and event rows remain protected. A follow is a product
relationship, not movement membership, event attendance, endorsement, or
policy impact.

## Sunday Dinner ledger audit

The source is a protected attendance and operations workbook. This repository
contains no participant rows, names, contacts, invitation history, addresses,
or event-level attendance histories.

The workbook has 345 numbered gathering columns, beginning with `001` on
January 22, 2012, and ending with `345` on March 7, 2021. Four additional
unnumbered sequence columns appear within the same event span.

Public-safe aggregate findings:

- 345 numbered gathering columns;
- 349 total sequence columns;
- median of 7 numeric marks across numbered columns;
- 93 numbered columns with at least 10 marks;
- 2,714 marks across numbered columns;
- 2,769 marks across all sequence columns;
- a separate workbook summary of 2,783 meals served;
- a difference of 14 between the all-sequence mark sum and the workbook
  summary;
- 411 rows with at least one mark.

The 411 rows are not 411 unique people. Rows may be incomplete, duplicated,
shared, or otherwise non-unique. Numeric marks are not assumed to capture every
person physically present or every meal served.

The reason for the 14-mark difference is not recovered. It could reflect
formulas, omitted marks, non-attendee meals, or another workbook convention;
the audit does not choose among those possibilities. Public wording therefore
says the workbook's own summary **records 2,783 meals served**. It does not
present that number as an independently reconstructed headcount.

## Call Script participation bridge

The surviving public Call Script Facebook page says, "Call your
representatives. simply make change" and currently identifies
`popular.vote` as its website. The current field does not establish when that
link was added.

The public `openhouse/callscript-ui` repository contains 24 recovered commits,
all authored by Jamie Burkart, from November 20, 2016, through January 18,
2017. This establishes the surviving Ember UI implementation history. It does
not establish authorship of every project idea, backend service, social post,
collaboration, or outcome.

The January 27, 2017 Facebook event **NYC DIY Spaces post Ghost Ship: Dept of
Cultural Affairs Meeting** names NYC Artist Coalition and Call Script among
its hosts. Its description asks people to pack the room in support of DIY
spaces and artists, and the page currently displays 445 people responded. The
display is a mutable platform signal, not physical attendance or unique reach.

On January 25, the shared Call Script account posted "Brainstorming what we
should ask for at the meeting" and recorded needs for:

- supportive, non-punitive compliance guidance;
- grants for infrastructure and compliance work;
- legal, insurance, and liability guidance;
- a meeting time outside the workday.

This is direct evidence of a pre-meeting listening and routing workflow. It is
not evidence that every participant agreed, that Jamie individually authored
every shared-account sentence, that DCLA adopted the requests, or that the
thread caused a policy outcome.

## What the sources support together

The sources support a bounded cross-project synthesis:

1. Sunday Dinner documents a long-running recurring-gathering practice.
2. WOW List turned event discovery and interest vocabularies into followable
   public calendar surfaces.
3. Popular Vote was one such calendar, with measurable product use by the July
   2017 snapshot.
4. Jamie built the surviving Call Script UI.
5. Call Script's public page points to `popular.vote`.
6. Call Script and NYC Artist Coalition shared a public host relationship for
   the January 2017 DCLA event.
7. The Call Script discussion gathered practical needs before that civic
   meeting.

It is reasonable to retain an interpretive claim that these records show a
continuity in Jamie's participation-infrastructure practice. That synthesis
remains held in the bank until a particular public argument benefits from it.

## What the sources do not support

Do not claim:

- Sunday Dinner caused WOW List or NYC Artist Coalition;
- Jamie alone founded NYC Artist Coalition;
- Jamie authored every shared-account post or produced every coalition event;
- WOW List rows, Popular Vote follows, Facebook responses, workbook marks, or
  workbook rows are physical attendance or unique people;
- DCLA adopted the recorded needs;
- one platform, discussion, or person caused later legislation or agency
  outcomes.

## Selective projection decision

Two existing public arguments benefit now:

- the WOW List case study receives a cited aggregate scale claim;
- the NYC Artist Coalition participation-system claim gains one concrete early
  example of pre-meeting listening.

The exact Popular Vote traction, Sunday Dinner distribution and reconciliation,
and full cross-project continuity synthesis remain knowledge-bank depth for
future applications, briefs, and photo-editor research.
