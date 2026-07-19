# NYC Artist Coalition Council transcript hill climb

**Run date:** 2026-07-15
**Decision:** Accepted after recursive repair
**Public projection:** Held; no website copy added

## Objective

Search recovered official Council hearing transcripts for Finkelpearl
references to NYC Artist Coalition, encode the result with speaker and referent
boundaries, and strengthen the existing DCLA, Council, and Espinal
institutional-capacity interpretation without inventing private motive or
causal weight.

## Initial failure

A targeted budget-hearing set recovered the known May 2017 passage but did not
provide a broad enough Council-side denominator. A phrase-only search also
risked counting a March 2018 transcript in which Jamie, not Finkelpearl,
referred to the coalition. The nearby "huge influence" sentence risked being
misassigned from the Disability Arts NYC task force to NYC Artist Coalition.

## Recursive repairs

1. Expanded the route to all 74 official Cultural Affairs committee meeting
   pages from 2014 through 2019 and their 77 linked Legistar matter pages.
2. Recovered 132 searchable transcript attachments and deduplicated them to 91
   unique PDF hashes.
3. Read both Artist Coalition candidate transcripts for speaker attribution.
4. Classified the May 19, 2017 testimony as the one commissioner-attributed
   occurrence and the March 16, 2018 testimony as Jamie's non-commissioner
   keyword co-occurrence.
5. Recorded the byte-identical Libraries route as a duplicate of the same
   joint hearing.
6. Added a negative control assigning the "huge influence" sentence to the
   Disability Arts NYC task force.
7. Added a content digest, count and attribution gates, bounded-scope checks,
   and mutation tests that reject count drift and the false influence claim.

## Bounded finding

Finkelpearl selected NYC Artist Coalition's formation as a concrete example in
an explanation of reciprocal public engagement, direct feedback, and the
power of convening. Jamie's later testimony described the complementary side
of that interface: safety access for underground artists and better situated
understanding for the City. Together they support an institutional-capacity
interpretation, not private motive, dependency, or sole causation.

## Stopping rule

Stop when the transcript control is source-addressable and hash-sealed; every
candidate is speaker-attributed; duplicate routes do not inflate occurrence
counts; the disability-arts referent is protected; the institutional claim
remains held; mutation tests reject the known overclaims; and every blocking
evaluation again scores 5/5 on two consecutive independent runs.

## Verification

- Council transcript control: 74/74 committee meeting pages recovered, 132
  searchable transcript attachments, 91 unique PDF hashes, two keyword
  candidates, one commissioner-attributed occurrence.
- Knowledge-bank eval: 5/5 across 21 criteria with 2/2 consecutive independent
  holdouts.
- Knowledge-bank mutation tests: 194/194 passing.
- Full repository check: citation validation, 14 portfolio evals, archive and
  social-production suites, typecheck, lint, production build, knowledge-bank,
  public-safety, and route checks all passing.
