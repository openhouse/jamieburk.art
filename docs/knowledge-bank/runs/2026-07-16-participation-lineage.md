# Participation Lineage Archival-Production Run

**Research date:** July 16, 2026

## Scope

This pass reconciled three evidence surfaces:

- aggregate, read-only analysis of the July 22, 2017, WOW List database
  snapshot;
- a full structural pass over the Drive-hosted Sunday Dinner workbook;
- an authenticated public-safe review of the Call Script Page and January 27,
  2017, DCLA event discussion.

No raw database records, workbook rows, authenticated-session data, screenshots,
participant identities, sensitive stories, or private paths were added to the
repository.

## Findings

The WOW List snapshot contains first-class Popular Vote and NYC Artist
Coalition tags with historical event and calendar associations. The Sunday
Dinner ledger contains 345 prefixed event columns and a substantial aggregate
attendance structure across 2012-2021. Call Script publicly linked to
`popular.vote`; its DCLA event discussion solicited practical asks and later
routed participants to a recurring NYC Artist Coalition meeting.

Together these sources support a bounded lineage of participation
infrastructure moving from recurring cultural gatherings into community
calendar software and civic organizing.

## Recursive Hill Climb

1. Replaced “345 numbered event entries” with “345 prefixed event columns”
   after finding only 340 distinct numeric prefixes.
2. Kept attendance marks distinct from unique people, audited door counts, and
   meals served.
3. Kept event rows, mappings, follows, stars, and response labels distinct from
   people, endorsement, attendance, and impact.
4. Attributed shared Page actions to Call Script or NYC Artist Coalition rather
   than silently assigning them to Jamie.
5. Withheld a sensitive personal account and incomplete text expansions.
6. Promoted one concise website sentence and retained deeper metrics and open
   questions in the knowledge bank.

## Result

- Four typed sources
- Two bounded claims
- Two research inquiries
- Three dispositioned intake records
- One correction record
- One active WOW List case-study projection

## Verification

- `npm run test:knowledge-lifecycle`: 50/50 tests pass.
- `npm run check`: passes all citation, portfolio, lifecycle, corpus,
  TypeScript, lint, production-build, knowledge-bank, public-safety, and route
  checks.
- `npm run preflight:staging`: passes with explicit staging `noindex` policy.
- `npm run preflight:production`: passes with explicit production `index`
  policy.
- Production build: 17 routes generated successfully.
