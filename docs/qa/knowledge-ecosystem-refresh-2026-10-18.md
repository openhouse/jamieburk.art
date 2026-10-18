# October 18 public candidate verification

This record concerns the public B candidate based on `6118a99b49bbe2b771ed6c8a48b938d7035e5b15`, not a deployed site. The review and source boundaries are in [the implementation review](../knowledge-bank/projects/knowledge-ecosystem-refresh-2026-10.md).

## Bounded changes and observed hill climb

- Public-language regressions: the expanded suite first passed 8 and failed 8; after repairing source exemption scope and rendered phrase extraction, all 16 pass. The existing policy and valid metadata remain intact.
- Portfolio graph regressions: three new controls first failed; all 23 now pass. The prototype claim must retain its citation, synthetic-only scope and human-validation caveat; known facts are not automatically public-safe.
- The unchanged reader-return reference implementation passes 39 synthetic tests. This is development evidence, not human semantic accuracy.
- Knowledge-bank checks and 245 tests pass after an independent [source-and-boundary review](evals-H/archive-production-boundary-2026-10-18.json). The original archive claim review dates and protected projections remain unchanged; only the reviewed lab-page binding and citation list are refreshed.
- `wiki:hillclimb` passes: 350 wiki tests and 174 blocking criteria across 15 deterministic lenses. Human authority gates remain open.

## Current rendered candidate

The app typecheck, lint and production build pass. Source-language inspection covers 76 files; rendered-language inspection covers 16 built HTML pages. These are bounded corpora, not universal live-route coverage.

The stable browser run observes 15 routes at four viewports: 60/60 rows, no recorded axe, overflow, required-request, broken-image or landmark failures. All 112 observed lazy images loaded after scroll. Keyboard, mobile navigation, source disclosure, resume contrast/focus and reflow observations pass. Accessibility/freshness controls pass 19 tests; pre-launch checks pass 17. Photo checks pass 18 controls and six criteria. Human screen-reader, visual acceptance and actual-browser-zoom review remain separate.

An earlier run overlapped a rebuild and encountered real missing-image/asset failures. Its incomplete observation is preserved in `evals-H/history-2026-10-18-pre-refresh/`; the separate stable rerun does not erase it.

Public runtime/build-input fingerprint: `93db784e753d99f1bba4077c5b8de3fc6a259d4cdde61805b8d3dd07998fc56d` (157 paths). Rubric/public-source fingerprint: `80b8e9aed465c6c7085eeb5f22b1a6db2d886c3b5e18a5aa59b01e1a1fb39606` (159 paths).

## Advisory reading, not human validation

Three separately commissioned read-only model reviewers assessed the same public-source candidate without prior scorecards or optimizer intent. PR-015 scores are 4/4/4. PR-016 scores are 3/4/4, satisfying the unchanged median-four/minimum-three rule but not unanimity. Reader one's historical-versus-current interpretation and HJE coverage correction remain preserved in the original judgment and addendum. No score was replaced to obtain agreement.

The separate single-call fictionalized proposal reader chose a bounded discovery/prototype pilot while identifying missing real-team usefulness and maintenance evidence. Its input was the local rendered build, not deployed staging. The represented person did not participate or endorse the result.

These component records do not establish the whole-tree composite gate, hosted CI, human approval, merge, deployment or indexing. The composite must bind its own final frozen candidate; existing earlier judgments are preserved as history. Final command and hosted states are reported separately in the pull request.
