# Additive IRL changelog

This narrow, user-requested journal utility preserves changes in understanding
without rewriting earlier observations. It is separate from adoption of the
[proposed weekly-practice RFC](../../rfcs/0014-weekly-practice-review-and-commitment-protocol.md).
The RFC remains proposed; its commitment slate, priorities and human gates are
not activated by this implementation.

[RFC 0016](../../rfcs/0016-irl-changelog-graph-component.md) is accepted for
implementation. The [version-two runtime guide](irl-changelog-v2.md) covers typed
relations, temporal views, source currentness and safe migration holds. The v1
utility below remains for legacy history; installing v2 does not rewrite it.
No live historical migration or human editorial approval is implied by tests.

The public repository contains the generic utility and synthetic regression
cases only. Actual life events, relationship states, source pointers, citations
and interpretations remain in permissioned custody. A public build never reads
the private journal. No new public route, archive browser, database or scheduler
is introduced.

## Record contract

Each entry has a stable ID; event interval; evidence-as-of date; actual UTC
recording time; event/interpretation/historical-reconstruction/correction kind;
earlier picture; change; significance; working implication; boundary; graph
links; and revision-bound citations. Corrections point backward without deleting
the old entry. Historical reconstruction must not pretend to be a diary written
at the time.

`activates_work` and `public_projection_authorized` must both be false. Recording
an existing accepted action is not permission to create or execute another one.
An invitation is not acceptance, a delivery is not a reply, and a preserved
possibility is not an obligation.

`scripts/irl-changelog/journal.mjs` supplies validation and an append operation
over canonical JSONL. Each line binds the preceding byte-prefix digest and its
own canonical entry. An expected current digest detects stale concurrent writes;
identical retries are idempotent. A private adapter supplies local locking,
source binding, graph checks and the human-readable Markdown projection.

Git-baseline comparison is essential: someone who can rewrite a journal can
also recompute its hashes. A hash chain is not a tamper-proof security boundary.
Review against the actual PR base, not just the candidate itself. Source labels
and hashes constrain representation; they do not prove a human interpretation.

## Evals and limits

Run `npm run test:irl-changelog`. Adversarial cases exercise historical editing,
deletion, reordering, stale append, changed duplicate ID, invalid correction
targets, impossible/backdated chronology, missing or relabeled evidence and
authority promotion. The same checks run in the main precheck and a dedicated CI
job using synthetic data. No private corpus is downloaded or indexed by public CI.

Behavioral tests are not a productivity score or a calibrated editorial judge.
Source-grounded human review must still inspect whether the before/after account
is fair, whether a later reply changes it, and whether an implication is useful.
Complete private memory and selective action are different operating functions.
