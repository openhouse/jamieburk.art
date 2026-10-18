# Public branch reconciliation — October 18, 2026

This report covers the public `openhouse/jamieburk.art` repository only. Its
[dated inventory](../reports/public-branch-inventory-2026-10-18.json) records all
291 branch refs returned by paginated GitHub retrieval. That is metadata
coverage, not a close reading of every file or a claim that every older branch
has been integrated.

## Selected implementation readings

| Edition | What was read | Decision for A |
| --- | --- | --- |
| A `2441779a40812a477576f24103dc3ff98e621291` | Current instructions, graph compiler, opportunity intake, method/page/claim records and CI failure | Preserve local authority and existing release holds |
| B `6118a99b49bbe2b771ed6c8a48b938d7035e5b15` | Recent changes, graph-delta test/fix, official-deadline propagation, About composition and review aggregation | Adapt two reproducibility/correctness fixes; do not import reviews or loosen A's acceptance criteria |
| C `3178c51fb4c94561935e667bbc095dffd5bca63c` | Recent change metadata and visitor-copy boundary changes | Retain reader-facing wording; no wholesale branch or receipt adoption |

Source implementation: [B graph compiler](https://github.com/openhouse/jamieburk.art/blob/6118a99b49bbe2b771ed6c8a48b938d7035e5b15/scripts/knowledge-wiki/lib.mjs),
[B behavioral regression](https://github.com/openhouse/jamieburk.art/blob/6118a99b49bbe2b771ed6c8a48b938d7035e5b15/scripts/knowledge-wiki/graph-delta-determinism.test.mjs),
[B intake](https://github.com/openhouse/jamieburk.art/blob/6118a99b49bbe2b771ed6c8a48b938d7035e5b15/scripts/opportunities/betanyc-newsletter-monitor.mjs).
Older August/September branches were considered through commit/file metadata;
unique historical content is not certified redundant or fully read.

RFC numbers and filenames collide across sibling branches. Compare purpose,
exact commit, path and contract—not the number alone. Proposed designs do not
authorize a migration. A/B/C remain separately reviewed candidates.

## Bounded hill climb

1. Added two graph-delta behavior tests and one official-deadline projection
   test. Before changes: 6/9 passed; all three new cases failed.
2. Pinned A's existing comparison edition
   `a8fdd57617c3667ac4d9db7d28f57e9022c11a81`, rather than importing B's different
   baseline. A missing baseline now throws instead of pretending the graph is
   empty; the buffer accommodates the retained graph artifact.
3. Propagated the screened official deadline into both intake views, retaining
   the human qualification gate. After changes: 9/9 passed. Broader opportunity
   tests: 47/47; Wiki tests: 347/347 on this bounded implementation pass.

The Lab page now explains version disagreements and distinct evidence states
in visitor-facing language. It does not claim a finished platform, client
adoption, complete corpus review or any newly approved public case study.

## Review boundary

Final verification after the Lab edit: the native Node 26 build, typecheck,
lint, citation checks and public-safety checks pass. The build checked 16
rendered pages and 17 live page requests. A fresh focused regression rerun
passes 9/9. The broader Wiki hill climb is **346/347**, not converged: its
exact-candidate accessibility receipt is stale after the copy changed.
The full check also stops on stale professor-lens review receipts. Neither
old accessibility measurements nor old editorial scores have been rebound
to the new prose. These holds require fresh, properly scoped review.

At the starting A head, hosted `check` failed COMP-009: recursive-stopping
evidence in the composite holdouts was not accepted. Focused green tests do
not repair that gate. Any old exact-candidate review is stale after relevant
bytes change. Fresh local checks, hosted checks, human review and deployment
must be reported separately. No deployment or merge is part of this change.
