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
