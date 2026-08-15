# Professor-lens citation hill climb — August 14, 2026

## Rejected candidate

Candidate `6366d77c6d62a82c03fcf7c0a5f7459af475aee5085f72bc5f7664ad885e9360`
received a 3/4 from the first fresh fictionalized Margaret Morse analytical-lens
holdout. The reviewer found that `/about` rendered the Open House citation marker
without rendering the corresponding public source note.

The rejection remains recorded in
`margaret-morse-rejected-2026-08-14-a.json`. It is not counted as an accepted
holdout and must not be rewritten after the repair.

## Bounded repair

- Added the existing `References` component to `/about` with `pageId="about"`.
- Added a regression test requiring a cited About page to render its one public
  source note.
- Verified the test failed before the implementation and passed after it.
- Changed no Open House claim wording, evidence, credit, or privacy boundary.

## Reset rule

The repaired public candidate has a different fingerprint. Three fresh
public-web-only holdouts for each blocking professor lens must inspect the
repaired staging deployment. The rejected review and all scorecards bound to
earlier candidates remain historical evidence only.

## Second rejected candidate

Candidate `bc0482583da3167092772afa5abf4e0e0c529545b2ca8dfe0c4d66818bfe1cae`
received a 3/4 from a later fresh fictionalized Margaret Morse analytical-lens
holdout. The reviewer found that `/about` grouped HJE under “Three current
systems loops” and marked it “Current” even though the portfolio accurately
dates the engagement `2009-2015`.

The rejection remains recorded in
`margaret-morse-rejected-2026-08-14-c.json`. It is not counted as an accepted
holdout.

## Second bounded repair

- Changed “Three current systems loops” to “Three systems loops.”
- Removed the three redundant “Current” labels rather than adding chronology.
- Added a blocking `project-status-integrity` professor-lens criterion and a
  mutation test that reintroduces the inaccurate HJE status.
- Changed no HJE dates, outcome claims, credit, or evidence boundaries.

The candidate fingerprint must reset again, and every counted final holdout
must review the repaired public staging surface.
