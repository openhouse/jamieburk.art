# C preflight repair

This maintenance pass repairs reproducible check failures on the existing C
candidate. It does not approve publication, replace human review, or authorize
production. The registered working copies were preserved; work was performed
in an isolated checkout of public PR #301's verified head.

## Baseline and diagnosis

The initial complete command inventory found 16 failing top-level groups.
The earlier statement of 15 remaining groups counted an employment-report
refresh before a subsequent commit. Its source binding became stale again.
That intermediate count was not a clean-head result.

The failures clustered around stale evidence and evolving interfaces: old
content reviews, an outdated social-preview assertion, the Contact assignment's
proposal-to-implementation transition, a whole-registry Colophon binding,
August browser evidence, a stale public newsletter snapshot, and derived Wiki
and employment reports. Several failures were cascades from the same cause.

## Repairs and safeguards

- Employment reports now refuse to record a dirty source candidate. A real Git
  fixture tests source commit, report generation, report-only commit, and stable
  final checking. Reports must be generated after the source commit.
- The layout evaluator reads the canonical current social-preview contract.
  The build still checks actual rendered bytes. Historical human approval is
  preserved separately; it does not approve a changed render. Independent
  review found that a warning alone lost the old current-byte enforcement.
  The existing photo hard gate now binds the current renderer to that human
  decision, and layout also rejects production/indexing signals with a
  mismatch. Seven photo regressions and two layout regressions cover this
  boundary; a fresh technical receipt cannot substitute for human approval.
- The Contact assignment checker recognizes both its historical proposal and
  its implemented lifecycle. It cannot convert assignment status into modeled
  acceptance or release permission.
- Colophon's original review is preserved. An additive, validated migration
  binds that historical full-registry snapshot to the unchanged required page
  and boundary records. Relevant claim changes still invalidate it.
- Fresh browser evidence exposed and repaired two low-contrast Contact
  paragraphs. The complete 60-row matrix and real retained screenshots were
  recaptured. New tests cover incomplete matrices, unloaded images, interrupted
  capture, screenshot publication order, and precise request classification.
- The public newsletter snapshot was refreshed from its official source.
  Unverified opportunities remain unverified; this is not an application or an
  assertion of present eligibility.
- Four separately commissioned Civic Match model reviews were rerun against
  the current packet. Historical posting and eligibility limits remain open.
- Professor-lens review validation now rejects duplicate reviewer labels and
  an unbalanced roster. Two initial reviews correctly held an incomplete
  evidence packet; both judgments are retained. The complete packet adds the
  required rendered views, Work index, and bounded public source records. Six
  fresh, separately commissioned reviewers accepted that complete packet at
  4/4. Their individual limits and original-judgment hashes are retained in
  the public-safe review manifest; this is model review, not human approval.
- The composite suite's stale base lock was compared to the original bytes and
  relocked to already-landed stronger requirements. No threshold was relaxed.
  Final composite review must follow source and derived-report commits.

The detailed browser account is in
[`evals-H/2026-10-18-accessibility-repair.md`](evals-H/2026-10-18-accessibility-repair.md).
The semantic lock comparison is in
[`../evals/runs/2026-10-18-preflight-base-suite-relock.md`](../evals/runs/2026-10-18-preflight-base-suite-relock.md).

## Remaining release boundary

The photo evaluator still rejects the unavailable governed private binding,
the stale exact-candidate receipt, and current-render approval and placement
coherence. The changed
social-preview render cannot inherit the prior render's verification by simply
replacing a checksum. The required next action is to recover the governed
binding, verify the actual current render and permitted uses, and issue a
properly source-backed receipt. Private source paths and raw photo evidence
must remain outside public Git.

No new Red Hook photographs or other held assets were published. Human
screen-reader and browser-zoom review, content approval, and production/indexing
approval remain separate. Until all required staging gates pass, this repair
is a reviewable PR update, not a staging release.

## Reproducible verification order

1. Run focused failing-then-passing regressions and review the scoped diff.
2. Finish candidate-bound content and browser review. Preserve rejected runs.
3. Commit source changes, excluding generated Wiki and employment outputs.
4. Regenerate Wiki and employment reports, then commit only those outputs.
5. Freeze the complete candidate; commission the two final composite holdouts.
6. Validate all command groups independently to expose downstream failures,
   then run the actual C staging preflight against the final clean commit.
7. Report local tests, independent model review, hosted CI, human holds, PR
   state, and deployment as distinct outcomes. A failing gate remains a hold.

Final counts and the exact tested commit belong in the PR's verification
receipt, after the final source-tree review; this note is not a passing receipt.
