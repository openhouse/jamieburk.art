---
id: research.public-testimony.supportive-voices.2026-07-28
title: Supportive public testimony corpus, 2017-2019
kind: research-run
status: governed-open
visibility: public-safe
sensitivity: moderate
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/research-runs/supportive-public-testimony-corpus-2026-07-28.md
summary: >
  Bounded source return of the full attributed contributions of 135 speakers
  supporting issues Jamie championed across five official Council transcripts.
projection:
  status: hold
  surfaces: []
relations:
  - type: related_to
    target: index.knowledge-wiki.public-testimony
    href: ../indexes/public-testimony.md
  - type: related_to
    target: project.nyc-artist-coalition
    href: ../projects/nyc-artist-coalition-2017.md
  - type: related_to
    target: project.fair-rent-nyc
    href: ../projects/fair-rent-nyc.md
---

# Supportive public testimony corpus, 2017-2019

## Result

The bounded return contains:

- five official New York City Council stenographic transcripts;
- 135 attributed supportive contributors;
- 145 official transcript-label variants;
- 581 separate speaking turns;
- 96,892 words; and
- zero unclassified substantive speaker labels.

The [Markdown reading copy](../data/supportive-public-testimony-corpus-2026-07.md)
and [structured corpus](../data/supportive-public-testimony-corpus-2026-07.json)
preserve every recovered contribution and its official page location. The
[scope ledger](../data/supportive-testimony-scope-2026-07.json) records every
inclusion, alias, correction note, exclusion, and uncertainty.

## Declared population

| Date | Event | Included contributors |
| --- | --- | ---: |
| 2017-06-19 | Cabaret Law and nightlife legislation | 41 |
| 2017-09-14 | Cabaret Law repeal | 28 |
| 2018-10-22 | Small Business Jobs Survival Act | 33 |
| 2019-02-11 | M.A.R.C.H. operations | 12 |
| 2019-03-18 | Small-business legislative package and open data | 21 |

This is complete within those five transcripts and the stated classification
rule. It is not a claim that these were the only relevant public events or that
every person who supported the work spoke at a Council hearing.

## Method

1. Recover the official Council transcript and retain its public URL.
2. Segment every labeled speaking turn while tracking official transcript
   pages.
3. Classify every substantive label as supportive, opposition, neutral,
   conditional or unresolved, agency question-and-answer, or fragment.
4. Merge label variants only when the record supplies a defensible identity
   basis.
5. Preserve stenographic wording and apparent errors; normalize line wrapping
   only.
6. Fail the build if a supportive speaker has no words, a source locator is
   missing, or a substantive label remains unclassified.

## Heteroglossia

The record is useful because support does not have one vocabulary. Venue
operators describe enforcement and survival. Dancers describe expression and
tradition. Musicians and workers describe cultural labor. Attorneys describe
regulatory structure. Small-business owners describe rent, harassment,
vacancy, and lease power. Legal-service providers describe the practical route
through fragmented city systems. Advocates describe civil rights, safety,
affordability, and public accountability.

Those voices may converge on a bill or reform while differing in emphasis,
evidence, and theory of change. The corpus keeps those differences available
for future research rather than flattening them into a coalition slogan.

## Boundaries

- Inclusion establishes a supportive position in this event, not endorsement
  of every coalition position.
- Testimony establishes what a speaker said, not that every claim in the
  statement was independently verified.
- The corpus does not assign authorship of a speaker's words to Jamie or NYC
  Artist Coalition.
- Opposition and uncertain testimony remain in the classification ledger but
  are not reproduced as supportive text.
- Exact public quotation still requires editorial review of name, wording,
  context, and page locator.

## Next return

The [Commercial Rent Stabilization testimony queue](commercial-rent-stabilization-testimony-corpus-queue-2026-07-28.md)
extends this method to Int. 1796-2019, Int. 93-2022, the prime sponsors'
introduction statements, and the September 17, 2021 hearing.
