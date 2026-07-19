# Personal and WOW List Facebook Events Full-Population Run

**Research date:** July 16, 2026

**Access posture:** Jamie's authenticated Facebook session

**Publication posture:** protected full index; public-safe minimized ledger

## Result

The personal Past Events surface exposed 511 cards representing 502 distinct
base event IDs. Twenty cards explicitly identified Jamie as organizer; 491
were profile-associated only. Nine cards carried recurring event-time IDs.

The current WOW List Events surface exposed zero event-detail anchors and no
Events section. Historical completeness remains unresolved.

## Method

1. Loaded the authenticated personal Past Events surface to terminal stability,
   defined as repeated scroll-to-end and settle cycles until neither page
   height nor event-card count increased. This was one complete traversal, not
   an independent replay or native owner export.
2. Parsed every visible card into event ID, recurring instance ID, date, title,
   venue, city, organizer display, organizer route, and relationship to the
   profile.
3. Separated explicit organizer records from profile association before any
   mission or stakeholder interpretation.
4. Reviewed all 20 explicit organizer detail routes for title, date, host,
   response display, and external destination anchors.
5. Compared the 20 explicit cards with a separate 21-past-events host display
   and retained the one-count discrepancy without inferring a missing record.
6. Reviewed one authenticated rendering of the current WOW List Events
   surface, profile statement, public routes, event anchors, and
   profile-section labels. Lazy loading, permissions, personalization, locale,
   and later interface changes remain possible sources of present-render
   variation.
7. Preserved the full 309,467-byte record outside the repository and published
   only a minimized ledger with a non-locating integrity digest.
8. Searched selected mission-relevant event titles for independent sources and
   close-read the recovered 2007 *Pitch* article.

## Integrity

| Control | Value |
| --- | --- |
| Protected capture SHA-256 | abcfdd059a87217fe671e9a9ff2d364768c2861ca3013f2e7159e94696c9e6ad |
| Personal event-identity SHA-256 | a434043aafbbe20f6f23f2c77022b8807dc76d277568d558757829f8e5ccd77b |
| Explicit organizer-identity SHA-256 | 8ce5db11955e039666d5d0ac4697641120c022d63028e8ed387e2cf826486336 |
| Public ledger SHA-256 | 6d0801464836c6cb41711426e8d5aff80d634962510b4f2179a4fa19bb7810ae |

The protected capture file was finalized at `2026-07-16T06:51:25-04:00`.

The protected locator is intentionally absent from the public repository. The
integrity controls were recomputed with
`scripts/verify-facebook-personal-wowlist-events-protected-capture.mjs`; the
identity digests use sorted `eventId:eventTimeId` rows, with a blank value for
a null recurring-instance ID.

## Traction Boundary

Seventeen of 20 explicit organizer pages displayed a response count. Six
displayed at least 20 responses; the largest display was 119. These values are
not summed and are not treated as attendance, unique people, reach,
stakeholder identity, endorsement, conversion, mandate, or impact.

## Source Result

No external article destination was exposed on the 20 event-detail renders.
Title-led research recovered one new independent article: *The Pitch*,
"Artists Turned Huck Finn, Part III" (November 12, 2007). It reports that
Jamie Burkart and Libby Hendon spent weeks constructing the recycled-material
raft and that the collaborative group had traveled more than 1,000 miles
before a Coast Guard interruption.

## Recursive Evaluation Return

The first public candidate was narrowed before publication:

- the complete 511-record personal index moved to protected storage;
- profile association was separated from participation and authorship;
- the 21-versus-20 result remained a one-count discrepancy between controls
  that may not share a denominator;
- six ordinary-life organizer records were withheld from the selected ledger;
- response labels were retained only as event-level dated signals;
- current WOW List zero-card rendering was kept distinct from historical zero;
- profile-associated organizer displays remained protected research leads,
  not a public relationship graph or stakeholder-engagement claim.

The dedicated checker and evaluation suite enforce these boundaries and test
hostile substitutions before this run can remain in the public knowledge bank.
