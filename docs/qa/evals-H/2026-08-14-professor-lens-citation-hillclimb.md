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

## Accepted candidate

Candidate `7812ae0a29ed91b6a2a9782af5e14b7b112c26305fafd83d13ad722b4dcf6c52`
received six fresh public-web-only holdout reviews after the second repair:

- PR-015, fictionalized Margaret Morse analytical lens: 4/4, 4/4, 4/4.
- PR-016, fictionalized Warren Sack analytical lens: 4/4, 4/4, 4/4.

All six reviews used the public staging surface only, were performed
independently and sequentially, and were bound to the exact candidate above.
They are analytical role-play records, not statements, participation, or
endorsements by the named people.

The earlier passing scorecards remain in the repository as historical records,
but the deterministic release gate reads only the six August 14 scorecards
bound to the accepted candidate.

## Exact-candidate reset after lifecycle repair

The six reviews above remain accurate records of candidate `7812ae0a…`, but
they no longer authorize release. A later full-suite run found one orphaned
Tired of Tires evidence-review source. The bounded repair attached that
AI-assisted synthesis record to the intake that produced it without promoting
the synthesis into claim evidence or changing public copy.

Because the professor-lens fingerprint intentionally binds every `apps/www`
source file, that data-lineage repair changed the candidate to
`8b816ff698d986d4753c0d9c694edcd8c118bdc2929d136ccbbdd5ccb32651e6`.
All counted PR-015 and PR-016 holdouts must therefore reset once more and review
the exact repaired staging deployment.

## Final accepted candidate after lifecycle repair

Candidate `8b816ff698d986d4753c0d9c694edcd8c118bdc2929d136ccbbdd5ccb32651e6`
was deployed to noindex Staging-B at commit `a41fcab03` and received six new,
sequential, public-web-only reviews:

- PR-015, fictionalized Margaret Morse analytical lens: 4/4, 4/4, 4/4.
- PR-016, fictionalized Warren Sack analytical lens: 4/4, 4/4, 4/4.

The active deterministic gate reads only the `g`, `h`, and `i` scorecards bound
to this candidate. All earlier scorecards remain historical records. None of
these fictionalized analytical reviews represents participation, a statement,
or endorsement by a named person.
