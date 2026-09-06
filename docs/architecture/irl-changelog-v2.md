# IRL changelog v2 runtime

[RFC 0016](../../rfcs/0016-irl-changelog-graph-component.md) is `implementing`.
Jamie authorized implementation on September 6, 2026. Technical installation is
not historical migration, human editorial acceptance, measured orientation
improvement, permission to collect sources, or a release decision.

## Implemented surfaces

| Surface | Behavior | Evidence |
|---|---|---|
| Canonical segment | Opaque UUID identity in a UUID namespace, versioned JSONL, exact hash chain, trusted baseline, stale-write rejection and idempotency | `component.test.mjs` |
| Typed registry | Person/team/project/practice `about` edges; claim/decision/commitment `informs` edges; backward `updates`, `corrects`, `challenges` | `component.test.mjs` |
| Clocks and review | Unknown/approximate event dates, evidence dates, recording times, nullable cited learning perspective, candidate/source-bound human receipt | `component.test.mjs` |
| Projections | Concise/full Markdown, stable anchors, node-oriented sections, all applicable revision links and holds | `component.test.mjs` |
| Currentness | Verify actual source bytes; changed/unavailable becomes stale, withdrawn is withheld; dependent graph views inherit staleness/withdrawal | `storage.test.mjs` |
| Permission boundary | Trusted capability checked before any storage load; denied/error responses reveal no journal metadata | `component.test.mjs` |
| Local admission | Exclusive lock, current recording time, fsync, atomic projection; valid append survives failed rendering | `storage.test.mjs` |
| Compatibility | Immutable v1 segment; read-only alias inventory with every mapping held; divergent branches preserved for reviewed reconciliation | `component.test.mjs` |

All paths above are under [`scripts/irl-changelog/`](../../scripts/irl-changelog/).
The public tests use synthetic records only. Public builds never open a private
journal, registry, source path or protected link. No new route, database, auth
service, crawler, scheduler or participant-authored voice is created.

## Persistence and use

`component.mjs` is the pure contract: `validateSegment`, `appendChange`,
`projectChanges`, `renderChanges`, `readPermissioned`, `reviewFingerprint`,
`rehearseMigration` and `reconcileBranches`. The executable synthetic fixtures
in its test file show complete valid records; copying a private example into
this repository is not an acceptable way to document the schema.

A registry has `schema_version: 2`, a UUID `namespace`, `visibility: private`,
a coverage declaration, typed `nodes`, and revision-specific `sources`. A source
binds `id`, `revision_id`, `sha256`, `locator`, `evidence_class`, `issued_on`,
`captured_at`, `custody` and `transformation_limit`; `state` is present verification
(`current`, `changed`, `unavailable`, `withdrawn`). The local adapter additionally
uses its protected `path`. No state or path is publication permission. Revisions
are immutable; new bytes receive a new revision, not a repointed old citation.

An entry repeats the namespace and uses `irl:<namespace UUID>:<entry UUID>`.
It carries the RFC's account fields, citations, typed relations, explicit analyst
and recording-agent names, `representation: analysis`, `participant_authored:
false`, `visibility: private`, and false work/publication authority. Unknown
fields fail closed. A correction names the affected `assertion`; every revision
edge includes its `reason` and `limits`. `legacy_aliases` cannot collide.

`event_precision` is `exact`, `bounded-approximate`, or `unknown`; an unknown
interval uses null endpoints. Every interval has an `event_basis`. `learned_at`
and `learning_basis` are null together, or the latter binds a named perspective,
explanation and exact citation. Recording chronology is monotone; source capture
and evidence availability cannot postdate the record. Disk admission requires
a current UTC timestamp (five-minute preparation/I/O tolerance), not an old
event/import date. Equal current timestamps are allowed for serialized admission.

Drafts are explicitly provisional, with `review_state: draft`, null receipt and
a visible human-review hold. They may be preserved without pretending to have
passed editorial review. `source-reviewed` requires a human reviewer declaration,
decision, UTC review time, exact candidate fingerprint and sorted source revision
keys. The fingerprint covers all entry fields except the receipt itself. A valid
declaration is not proof of the real person's identity: the trusted private
operator must verify that review actually occurred. Software cannot settle
disagreements; a later reviewed correction preserves the challenge trail.

`recorded_as_of` uses an inclusive UTC cutoff. `occurred_by` uses the event
interval's start; it retains full approximate intervals and unknown dates.
Present access and withdrawal rules apply to every historical view. Source
badges describe the bytes checked now, not what anyone knew then. Dependent
nodes declare `depends_on` IDs; invalidation is transitive and does not mutate
their canonical claims, decisions or commitments.

`storage.mjs` supplies `inspectSources`, `appendToFile` and `rebuildFile`.
Source resolution must stay within explicit approved custody roots, including
after symlink resolution. Existing withdrawals are never reactivated by a hash
match. Append holds on a stale/absent source, exclusive lock, stale expected
digest, invalid revision or trusted-prefix mismatch. Repair a stale projection
by rebuilding; never delete a valid record to make checks pass. Truncated JSONL
fails closed. An abandoned lock or partial record needs exact-target human
recovery review. Rebuilds must be serialized with writers by the local adapter.

## Permission and retention boundary

`readPermissioned` accepts a trusted `authorize` callback and a lazy `load`.
Authorization must come from the host boundary, not a user-controlled JSON flag.
An explicit denial or authorization error returns only `decision: unavailable`
before loading data. The local CLI uses existing OS/repository access; it is not
a multi-user authorization service. Exposing it over a network needs a separately
verified adapter. The public app imports none of this private state.

Withheld projections omit account prose, citations, names and graph context;
dependent revision prose is withheld as well. Original Git bytes may still
exist. This is restricted presentation, not erasure. Retention remediation,
backup/history cleanup and recipient notification require separate exact-target
authority. Do not claim a tombstone deletes history.

## Migration, reconciliation and rollback

The installed migration helper inventories v1 aliases and binds the exact old
segment hash. It does **not** choose v2 IDs, infer learning dates, convert
`supersedes`, or admit historical entries. Every item is held for human mapping;
old links and bytes continue to work. This is a compatibility inventory, not a
completed historical migration. Source registry ownership and the real canary
window must be selected privately before such admissions.

Writers are serialized. Identical/prefix branches can fast-forward. Divergent
tails—even disjoint IDs—return a hold and hashes of both original artifacts;
same-ID/different-payload collisions are named for the authorized reviewer. There
is no automatic concatenation/rebase/last-write-wins. Preserve both artifacts,
review the exact payloads and relation semantics, and record an explicit ID map
before making fresh admissions at their actual recording times. Automated
historical conversion or distributed reconciliation is deliberately not enabled.

Rollback restores the legacy entrypoint and quarantines the new segment; it
does not erase it. If v2 already contains new evidence, reconcile that evidence
before resuming legacy writes. The migration-complete and human-canary gates
remain unsatisfied until their real decisions and review have been recorded.

## Evaluation and hill climb

Run `npm run test:irl-changelog`, `npm run test:irl-rfc`, and
`npm run evals:irl-rfc`. The dedicated workflow runs all three. The RFC receipt
now fingerprints the runtime, tests and this guide as well as the review model.
The model's contract records operator authorization separately from what an
evaluation can grant: tests grant no implementation, migration or publication
authority. Run the tests too; the 33-case proposal model is not runtime coverage.

An adversarial pass found that authorization exceptions could escape the opaque
denial boundary and unknown persisted fields could carry contradictory legacy
authority. New behavioral tests failed on both, then passed after bounded fixes.
The storage adapter also gained atomic governed-frontmatter support. That pass
improved the 46-case v2 suite from 43 passing to 46, without weakening any gate.
Two subsequent regressions exposed a renderer racing the append lock and a
withdrawn correction leaking its existence through an older entry's badge.
Rendering now shares the admission lock; revision badges derive only from
presently permitted revisions. Both reproductions pass after the fixes.
Exact-candidate receipts record final full-suite results separately. These are
software regressions, not a calibrated editorial judge or a personal score.
