# KC Town Hall X Full-Population Research Run

Date: 2026-07-15

Account: `@KCTownHall`

## Question

What mission-relevant operating, posted-source, stakeholder-response, and
visible-traction patterns appear across the full profile-reported public
population without exposing contact data or overstating authorship, outcomes,
endorsement, completion, or government causality?

## Acquisition and reconciliation

1. Opened the authenticated profile and recorded the 183-post denominator.
2. Traversed both Posts and Replies through repeated no-growth states.
3. Preserved timeline membership for each primary record.
4. Separated account records from parent and conversation-context cards.
5. Deduplicated by canonical status ID and reconciled against the profile
   denominator.
6. Close-read all primary records for record type, posted links, operating
   patterns, stakeholder response, and dated visible interaction.
7. Removed post text, phone numbers, pickup addresses, authentication identity,
   cookies, and private-account state from the public fixture.

The Posts route yielded 170 primary records. Replies rendered 188 cards: 183
primary records and five other-account conversation-context cards. The primary
union contains 183 unique canonical status IDs, so no profile-counted item
remains unmaterialized.

## Population

- Profile reported: 183
- Recovered and reviewed: 183
- Original posts: 142
- Replies: 13
- Reposts: 28
- Account-authored records: 155
- Conversation-context cards excluded from the population: 5
- Date range: July 2, 2018-September 24, 2022
- By year: 30 in 2018, 85 in 2019, 41 in 2020, 17 in 2021, 10 in 2022

This is complete against the profile-reported public denominator on the capture
date. It cannot reconstruct deleted, private, liked, or platform-suppressed
activity.

## Operating patterns

One hundred records are classified as tire-related, documenting recurring
household pickup and recycling communication from 2019 through 2022. Twelve
records link the neighborhood survey or resident-input process.

These classifications establish recurring public workflows. They do not
independently verify tire quantities, households served, resident savings,
survey response volume, representativeness, health outcomes, or adoption of
every suggestion.

## Posted sources

Across the population, 118 records contain external links, producing 133
occurrences and 31 distinct short URLs. Account-authored records account for
130 occurrences across 115 records and 28 distinct short URLs.

Close-read mission-relevant sources include:

- Kansas City Star reporting on Leon's Thriftway and neighborhood food access;
- Northeast News coverage of local affordable-housing policy;
- Curbed reporting on a proposed federal renter tax credit;
- KCUR's Missouri primary-election guide;
- RideKC Next transit-redesign information;
- Missouri Secretary of State voter-registration lookup;
- historical KCATA ozone-alert information;
- a KC Town Hall COVID-19 relief-resource Q&A; and
- practical bad-latex-paint cleanup documentation.

The project account circulated these sources. Unless separately established,
they are not coverage of KC Town Hall, endorsements, partnerships, current
guidance, or evidence that KC Town Hall caused an outcome.

## Stakeholder response

The bounded response ledger preserves direct mission-relevant responses from
three sitting Kansas City Council-member accounts:

- Quinton Lucas quote-responded to a KC Town Hall alert about Leon's and
  described follow-up with ownership;
- Jolie Justus replied about EDC work, a site visit, and community commitment;
  and
- Melissa Robinson thanked KC Town Hall for work improving community
  conditions.

KCMO 311 responded in a service-resolution thread. A Bridging the Gap
collaborator reported receiving a substantial KC Town Hall tire drop-off. Two
community accounts quote-amplified an Oak Park cleanup notice.

Direct replies, quote responses, and explicit collaborator reports count as
observable response. Tags and mentions alone do not. These records do not
establish blanket endorsement, formal adoption, project completion, or causal
government impact.

## Dated visible interaction

On the capture date, 77 of 155 account-authored records showed at least one
visible interaction. Their displayed totals were 22 replies, 70 reposts, 174
likes, and one bookmark.

These are volatile interface observations, not unique people, reach,
conversion, participation, endorsement, adoption, or impact. Engagement
attached to reposted source records is excluded from the account-authored
totals.

## Knowledge disposition

- The complete operating-surface finding is active on the KC Town Hall case
  study.
- Source-circulation and dated-engagement claims remain held in the bank.
- Exact cumulative tire and savings totals remain pending independent
  corroboration.
- A public-safe survey response count, synthesis, and complete decision trail
  remain open.
- Post-level authorship remains institutional unless separately attributed.
- The social archive remains separate from the municipal funding sequence,
  Phase One role inquiry, and later stewardship-transition lead.

## Reproducibility

- Fixture:
  `apps/www/src/data/knowledge-bank/fixtures/kctownhall-full-population.json`
- Manifest:
  `docs/knowledge-bank/corpora/kctownhall-x-full-population-2026-07-15.manifest.json`
- Validator: `scripts/derive-kctownhall-x-corpus.mjs --check`
