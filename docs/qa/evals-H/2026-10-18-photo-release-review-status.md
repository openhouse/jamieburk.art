# Photo-release candidate review status

Date: 2026-10-18

The six fresh independent simulated advisory readings are bound to candidate
`030ca6b4e02c5c94d3d0e008292d65cf383444a98ea4e585e9074d2757f2c398`.
They are recorded in `photo-release-reader-{1,2,3}-20261018-PR-{015,016}.json`.
Earlier readings remain historical; no scores or frozen thresholds changed.

| Lens | Scores | Median | Required median | Result |
| --- | --- | --- | --- | --- |
| PR-015, inhabited systems | 4, 4, 4 | 4 | 4 | Pass |
| PR-016, recursive social systems | 3, 3, 3 | 3 | 4 | Hold |

The professor-lens evaluator reports **17/18 criteria passing** and exits with
failure because PR-016 does not reach the required median. All six reports match
the reviewed candidate. Individual scorecard pass fields do not override the
panel threshold. The remaining evidence gap concerns demonstrated learning and
iteration across project sequences; current, historical, reconstructed, and
synthetic evidence retain their stated limits.

`npm run test:professor-lenses` passes **16/16 tests**. The updated regression
first failed on the stale candidate binding, then passed after rebinding. It
requires an exact candidate match to coexist with the substantive holdout
failure. `npm run evals:professor-lenses` still exits **1** as intended.

The refreshed local browser and interaction receipts report passing checks.
The responsive matrix covers **60 route/viewport combinations** at 360, 375,
768, and 1280 pixels, with no recorded axe violations, overflow, broken images,
or required-content request failures; images completed loading after scrolling.
Canceled speculative prefetches remain separately recorded. These receipts bind
to runtime fingerprint
`16f090d636de8564dac2904b97354cf2d90401b7d665bf5970196cea1ccab601`.
See `professor-lenses-browser-qa.json`, `professor-lenses-interaction-qa.json`,
and `responsive-route-matrix.json` for the observed scope and remaining gates.

**Staging remains held.** No deployment was performed by this review update.
The simulated lenses are not participation or endorsement by the named
professors, and neither these scores nor local QA grants publication rights,
human content approval, production deployment, or indexing authorization.
