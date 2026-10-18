# Ecosystem refresh — October 18, 2026

This public-safe engineering note concerns the C candidate based on
`3178c51fb4c94561935e667bbc095dffd5bca63c`. It is not a private repository
inventory, new portfolio claim, or release approval.

## What changed

The historical ecosystem profile could pass a check called “exact and current”
without a remote observation. Remote mode requested only the branches already
in that profile, so newly listed branches could not reopen review.

The evaluator now separates historical consistency from observation-time remote
coverage. Remote mode reads all branch heads. Missing, moved and unreviewed heads
remain distinct gaps. Partial, undated, malformed and future-dated observations
cannot certify current coverage. An unavailable source returns an explicit hold.
The historical review is retained rather than relabeled as today's complete review.

The graph delta now uses the original immutable comparison snapshot instead of
the moving `origin/develop` reference. This narrowly adapts the mechanism from
public B revision `a2ea9d1fce74a17adccf87381be7bcb66c35e2c5`. Missing baseline
history stops generation instead of silently turning the prior graph into an
empty graph. Tests move the remote reference and remove the baseline to exercise
both boundaries.

The footer also loses an internal classification and future-product promise.
No replacement claim is added. The language checks cover source and rendered
text while preserving legitimate discussions of archives and evidence classes.

## Review scope and next decisions

Current public A, B and C revisions were inventoried and compared. They are
divergent lines of work, not a sequence in which the newest date selects a
winner. Older branch metadata was inventoried; not every historical branch or
underlying source received a new semantic reading. Detailed private source
returns stay in the private knowledge layer. There is no automatic public
projection or wholesale sibling-branch integration.

Tests establish only the behavior they execute. Historical receipts, newly run
local checks, hosted checks, source coverage and human approval remain separate.
A successful bounded review cannot be reported as a complete stricter review;
a job that never started cannot be reported as a failing test.

This increment does not merge, deploy, contact anyone, migrate source records,
or resolve reserved human decisions. Exact test results and candidate hashes
are recorded with the pull-request update after verification.

## Verification limits

The full public check is not green. The professor-lens candidate/holdout gate,
the knowledge-bank scorecard, and the responsive-accessibility receipt were
already held on the untouched C starting revision. They remain holds on this
changed candidate; none has been rebound or promoted without a fresh review.
Passing focused regression tests and a build do not replace those reviews.

The live remote-profile check also correctly returns a review-required hold:
the retained historical profile does not cover all currently observed heads.
The private source return records which heads received selected close readings
and which received metadata inventory only.
