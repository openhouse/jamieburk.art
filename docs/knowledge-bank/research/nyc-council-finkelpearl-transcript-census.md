# NYC Council Finkelpearl Transcript Census

Run date: 2026-07-15

## Result

One direct occurrence was recovered in which Tom Finkelpearl named NYC Artist
Coalition in Council testimony: the May 19, 2017, joint Executive Budget
hearing for Finance, Cultural Affairs, and Libraries.

A second transcript contained both the coalition and Finkelpearl, but the
speaker relationship was reversed. At the March 16, 2018, Cultural Affairs
Preliminary Budget hearing, Jamie Burkart testified as a coalition member and
described CreateNYC office hours with Finkelpearl.

## Corpus

- 74 official Cultural Affairs committee calendar records from 2014 through
  2019
- 74 meeting pages recovered
- 77 distinct legislative items traversed
- 132 hearing transcript attachments recovered and converted to searchable
  text
- 2 transcripts containing an Artist Coalition phrase
- 1 transcript in which Finkelpearl directly named the coalition

The machine-readable ledger preserves the meeting, legislative-item, and
transcript URLs:
[`nyc-council-finkelpearl-transcript-census.json`](nyc-council-finkelpearl-transcript-census.json).

## Method

1. Enumerate the official Cultural Affairs committee calendar records for each
   Council session overlapping Finkelpearl's DCLA tenure.
2. Traverse every meeting page to its distinct legislative items.
3. Recover every attachment labeled Hearing Transcript.
4. Convert each PDF to text and search case-insensitively for NYC Artist
   Coalition, New York City Artist Coalition, Artist Coalition, Finkelpearl,
   and the common Finklepearl misspelling.
5. Close-read every Artist Coalition match and classify who referred to whom.

## Boundaries

- The census covers the Cultural Affairs committee calendar. It is not a
  complete census of all Council committees.
- A missing search result is not proof that no other reference exists.
- OCR and official indexing can miss misspellings or image-only content.
- The ledger preserves public URLs and dispositions, not copied transcript
  bodies.
- The direct reference is evidence of institutional recognition, not sole
  credit, endorsement of every coalition position, or policy causation.
