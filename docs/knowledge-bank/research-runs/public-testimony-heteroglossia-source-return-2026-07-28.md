---
id: research.public-testimony-heteroglossia.2026-07-28
title: Public testimony heteroglossia source return, July 28, 2026
kind: research-run
status: maintained
visibility: public
sensitivity: moderate
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/research-runs/public-testimony-heteroglossia-source-return-2026-07-28.md
summary: Reproducible, public-safe return to seven official Council transcripts to preserve full attributed supportive and aligned testimony without flattening qualifications or collective credit.
relations:
  - type: related_to
    target: index.knowledge-wiki.public-testimony-heteroglossia
    href: ../indexes/public-testimony-heteroglossia.md
  - type: related_to
    target: index.knowledge-wiki.public-testimony
    href: ../indexes/public-testimony.md
---

# Public testimony heteroglossia source return, July 28, 2026

## Question

Can the Wiki preserve the many-voiced public record surrounding Jamie's
testimony without treating coalition speech as his individual authorship,
silently erasing qualification, or republishing private material?

## Method

1. Return to the six official New York City Council transcript PDFs identified
   in the Jamie testimony inventory and the 2021 Commercial Rent Stabilization
   hearing transcript.
2. Parse named speaker turns from the complete transcript text.
3. Manually identify the issue-bounded cohort whose testimony supported,
   qualified, or materially developed the issue Jamie championed.
4. Preserve every recovered turn under each included official label.
5. Keep official labels alongside normalized display names.
6. Record role, position, issue scope, turn count, and source digest.
7. Retain unselected parsed labels in the machine-readable coverage ledger.
8. Remove page furniture and reflow lines without silently correcting the
   Council transcript.
9. Scan the public corpus for direct email addresses and telephone numbers.
10. Compile one readable event record per hearing and evaluate the corpus.

## Result

- 7 official hearing transcripts;
- 187 included contributors;
- 736,679 characters of attributed transcript text;
- 0 direct email or telephone redactions required;
- 6 readable event records;
- 1 machine-readable coverage and transcript corpus; and
- 1 explicit evaluation suite with 11 hard criteria.

## What this makes possible

The corpus supports:

- preparation for future public testimony;
- research into how arguments developed across people and institutions;
- better collective-credit language in portfolio and application materials;
- source-backed event chronologies;
- comparison of supportive and qualified policy positions; and
- later linkage among speakers, events, campaign artifacts, photographs, and
  outcomes.

## Limits

- The Council transcript is a contractor-produced record and contains apparent
  name and wording errors.
- Display names are normalized only where the transcript or the speaker's own
  introduction supplies enough evidence. Official labels remain visible.
- Inclusion is an editorial classification. It does not verify every assertion
  or establish that no supportive speaker was missed.
- The corpus includes aligned critique where it materially defines the issue,
  but does not reproduce opposition merely to create artificial balance.
- Written submissions not spoken into the record, unavailable attachments, and
  testimony outside these seven hearings remain separate source-return cohorts.
- No inclusion authorizes portfolio quotation, endorsement claims, or
  attribution beyond what the official transcript supports.

## Reproduction

The public corpus and generated event files are checked with:

```sh
npm run testimony:heteroglossia:check
npm run testimony:heteroglossia:test
```

The local ingestion command additionally requires transcript text extracted
from the seven official PDFs and verifies each source-text SHA-256 digest before
writing:

```sh
node scripts/knowledge-wiki/testimony-heteroglossia.mjs \
  --ingest-raw-dir /path/to/local/official-transcript-text
```
