---
rfc: 16
title: IRL Changelog as a Source-Bound Knowledge Graph Component
stage: implementing
start_date: 2026-09-06
authors:
  - Jamie Burkart
  - Codex, AI-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - research-operations
  - privacy-governance
  - editorial
  - developer-experience
implementation: ../docs/architecture/irl-changelog-v2.md
supersedes: []
superseded_by: null
---

# IRL Changelog as a Source-Bound Knowledge Graph Component

> Accepted for implementation by Jamie's September 6, 2026 instruction,
> “Implement the IRL Change Log RFC.” The version-two runtime and local adapter
> contract are implemented. Historical migration, source-grounded human review,
> selection and evaluation of a real canary, publication, merge and deployment
> retain their separate gates. Stage is `implementing`, not `operational`.

## Summary

Make the IRL changelog the Knowledge Wiki's durable account of **material changes
in the world and material changes in our understanding**. An entry explains the
earlier picture, what changed, why it matters, a possible working implication,
and what its evidence does not establish. It connects to sources and relevant
people, teams, projects, practices, claims, decisions, and commitments through
typed relations. It owns the change account, not those other records.

Preserve earlier entries and their evidence revisions. Distinguish a later
development from a correction of an earlier account. Keep disagreements and
unknown dates visible. Offer chronological and topic-oriented reading views
without silently converting an interpretation into a person's identity, a task,
a public claim, or participant-authored speech. The detailed journal stays
private; the public repository contains only method, generic code, and synthetic
examples. Broad retention is not an obligation to retain unsafe material forever.

## Motivation

The [existing additive-journal note](../docs/architecture/additive-irl-changelog.md)
and [shared utility](../scripts/irl-changelog/journal.mjs) establish a useful
foundation: byte-preserving append, backward correction links, evidence-bound
citations, stale-write rejection, and no action or publication authority.
Their [regressions](../scripts/irl-changelog/journal.test.mjs) exercise those
behaviors. A hash chain is not a substitute for a trusted historical baseline.

A close reading exposes boundaries that the component needs to make explicit:

| Existing design | Consequence | Revision proposed here |
|---|---|---|
| Only `correction` may use `supersedes` | A changed situation can look like proof the earlier account was false | Separate `updates`, `corrects`, and `challenges` |
| Event dates, evidence date, recording time | These do not prove when a particular person learned something | Nullable, evidence-bound learning time and an explicit perspective |
| Sequential `IRL-` identifiers | A local sequence cannot safely identify records across journals or branches | Stable namespace plus collision-resistant identity; old IDs remain aliases |
| `related_pages` holds paths | Navigation does not establish an edge's meaning or a stable identity | Typed edges resolved through a permissioned node registry |
| Citation hashes and class labels | Matching metadata alone does not prove current source bytes or a fair reading | Separate binding, availability, freshness, and editorial-review states |
| Additive history | Preservation alone does not define dispute, withdrawal, or retention handling | Non-destructive revision by default; separately authorized remediation when necessary |

These are observations about the code contract, not claims about private events
or the completeness of anyone's life record. The expected benefit—less repeated
orientation work—is a canary hypothesis, not a measured result.

## Goals

- Answer “What changed?”, “What was recorded then?”, “What later evidence revised
  this account?”, and “What remains uncertain?” with inspectable citations.
- Keep a source's provenance, its contribution to an interpretation, and the
  authority to act on or publish that interpretation distinct.
- Preserve previous understandings without presenting them as current advice.
- Support both a dated changelog and evolving topic/person/project pages from
  one canonical set of entries, without duplicate hand-maintained histories.
- Make migration and concurrency fail closed and keep existing records readable.
- Keep the public system independent of private access.

## Non-goals

- A complete-life claim, inbox-completeness claim, personality dossier,
  productivity score, employee monitoring, or a ranking of people's worth.
- A task manager, autonomous collector, reminder service, new credential use,
  mailbox/audio ingest, or an automatic publishing pipeline.
- A database, distributed event-sourcing platform, CRDT, public archive browser,
  new website route, or replacement for the current application stack.
- Repeating every transcript or correspondence reading in the changelog.
- Accepting [RFC 0014](./0014-weekly-practice-review-and-commitment-protocol.md),
  upgrading a source's evidence class, resolving consent, or appointing the
  real people used as analytical lenses.

## Terminology

**Development:** a subsequent change in circumstances. An earlier account may
have been defensible at the time.

**Evidence return:** new access to evidence, which may concern an older event.
Recovery today is not a second occurrence of that event.

**Interpretation:** the analyst's situated account of the evidence. It is not
automatically the subject's self-description or a shared conclusion.

**Correction:** an explicit claim that an earlier assertion or interpretation
needs correction. It names the affected assertion and its replacement limits.

**Challenge:** counterevidence or a disputed interpretation that has not been
settled. A newer entry is not automatically the winning account.

**Recording time:** when this journal recorded the entry. A historical view
describes the journal at a cutoff, not everything Jamie or another person knew.

**Learning time:** when a named perspective demonstrably learned something. It
may be unknown. Do not derive it from an event date, file date, or import time.

**Projection:** a rebuildable reading view of canonical entries, filtered by
permissions and accompanied by source/currentness and revision information.

## Detailed design

### 1. Component ownership and integration

The component owns stable change-entry identities, source-revision bindings,
typed relations, revision history, coverage declarations, and reading views.
The existing source registry owns source custody and provenance. Person and
team pages own their situated, cited analysis. Claim records own factual and
public-use status. Decision and commitment records own authority and opt-in.
The changelog links to these records; it cannot mutate their states by inference.

The intended connection is:

```text
permitted source revision -> situated reading -> reviewed change entry
                                                 | about -> person/project/practice
                                                 | informs -> claim/decision/commitment
                                                 | revises -> earlier change entry
                                                 +-> chronological and topic views
```

Here `revises` is explanatory shorthand; stored edges use the explicit vocabulary
below. Audio and correspondence workflows may propose candidate entries only
after their existing source/reading gates. A mention is not authorship. A summary
does not create a new own-speaker specimen. Existing cited situated-voice entries
are linked, not impersonated or silently replaced.

This proposal composes with [RFC 0005](./0005-three-layer-knowledge-graph.md),
[RFC 0006](./0006-federated-knowledge-exchange-and-release-receipts.md),
[RFC 0009](./0009-wiki-as-shared-memory-protocol.md),
[RFC 0011](./0011-private-vault-sidecar.md),
[RFC 0013](./0013-governed-audio-to-knowledge-workflow.md), and
[RFC 0015](./0015-source-bound-correspondence.md). It does not advance their stages.

### 2. Admission: material change, not artifact volume

During user-authorized work, propose an entry if a source materially changes an
outcome, constraint, relationship route, working hypothesis, or understanding of
existing accepted/returned work. Read the relevant earlier record and available
later returns before reopening an old implication. Preserve entrusted context
in its governed location, including context not selected for a short reflection.

Routine tool runs, another commit, unchanged checks, or a duplicated source do
not require an IRL entry. A candidate with no consequential change can receive a
disposition in the intake record instead. Do not manufacture busywork or discard
useful source context because it does not fit the changelog.

Every review declares its event window, evidence window, actual recording time,
source coverage, and material gaps. “No reviewed evidence” is not “nothing
happened.” A short initial retrospective must not masquerade as a contemporaneous
diary or a complete inventory of the period.

### 3. Proposed version-two record

The persisted schema is implemented in the [version-two component](../scripts/irl-changelog/component.mjs)
and specified in the [runtime guide](../docs/architecture/irl-changelog-v2.md).
Required field groups are:

| Group | Required meaning |
|---|---|
| Identity | `schema_version`, stable journal namespace, collision-resistant entry ID, legacy aliases where applicable |
| Account | Title, earlier picture, change, significance, working implication, boundary, entry kind |
| Time | Event interval and precision, evidence-as-of date, actual UTC `recorded_at`, nullable `learned_at` and its cited basis |
| Perspective | Identified interpreter/recording agent; whether a passage is analysis or an attributed source quotation |
| Evidence | Source ID, immutable revision ID, SHA-256, locator, evidence class, transformation/custody limitation |
| Relations | Typed edges to stable node IDs or earlier entry IDs, not paths alone |
| Governance | Private visibility, draft/review state, review receipt, false work/publication authorization |

Use collision-resistant opaque IDs (for example, a UUID within a journal
namespace); human-friendly sequence labels are optional aliases. Do not encode
people's names, account identifiers, or repository names into a public namespace.
Same ID plus different bytes is a conflict, not last-write-wins. Version-one
records remain immutable and resolvable through a private migration map.

Source binding is revision-specific. A corrected transcript becomes another
source revision; it does not change the bytes an older reading cites. Multiple
notes derived from one underlying record are not independent corroboration.
Neither a hash nor the label `primary-record` certifies original custody,
audio accuracy, consent, or truthful interpretation.

### 4. Time without false certainty

Store real event dates separately from evidence availability and recording time.
If the event date is unknown, retain an explicitly unknown interval. Do not fill
it with the import date. Approximate intervals retain their precision and basis;
ordering such an interval is not proof of its exact day. The learning field is
null unless a cited source supports a specific perspective's learning time.

A scheduling announcement is an event that occurred when announced. Its
`scheduled_for` date belongs to the referenced planned-event record; the date
does not establish attendance or completion. A future event cannot be recorded
as an already occurred event. Draft, invited, accepted, scheduled, occurred,
contracted, delivered, deployed, and adopted remain distinct states elsewhere.

Two reading filters have explicit semantics:

- `recorded_as_of`: include only entries recorded at or before the UTC cutoff.
  It answers what the journal contained then, not what a person's mind contained.
- `occurred_by`: include accounts whose event interval begins at or before the
  date; show the full interval. Unknown dates remain visibly uncertain rather
  than disappearing or receiving invented placement.

This is a time-aware account, not a general bitemporal database or an oracle of
the world's true state. Current access/retention controls always apply, even to
historical queries. Source-currentness badges describe the present verification
state; they must not be mistaken for historical knowledge of a later withdrawal.

### 5. Typed relations and revision semantics

| Edge | Target | What it establishes—and does not |
|---|---|---|
| `about` | Person, team, project, practice | Subject/context, not authorship or a permanent trait |
| `informs` | Claim, decision, commitment | Relevant evidence, not adoption, acceptance, or assignment |
| `updates` | Earlier entry | Later development; does not assert the earlier account was false |
| `corrects` | Earlier entry | Explicit correction of a specified assertion, not deletion |
| `challenges` | Earlier entry | An unresolved disagreement, not automatic adjudication |

Revision edges point backward in the admitted record sequence. Self, future,
missing, unknown-type, and wrong-target-type edges fail closed. Context links
must resolve through the permissioned node registry; a path is a locator, not
the identity. Source derivation is represented by revision-bound citations and
the source registry's provenance relations, not a fabricated direct-witness edge.

**Synthetic example:** an entry records that a workshop is planned. A later
announcement moves it to another date: `development` + `updates`. If the original
reading misidentified which workshop the announcement concerned, use `correction`
with `corrects`. If sources disagree and the conflict is unresolved, use `challenge`
with `challenges`. Preserve all accounts, identify the affected assertion, and keep
the uncertainty visible. Do not silently enlarge a narrow change into a broader
cancellation, rejection, endorsement, or commitment.

A newer development must not erase a correction warning. A correction must not
silently resolve an outstanding challenge. The synthetic model presents the
highest-priority warning: withheld, stale, contested, corrected, updated, recorded;
all hold reasons remain visible. A future full reading view must expose all
applicable revision links, not merely its headline badge. Dispute adjudication
requires a separate source-grounded human return; automatic settlement is out
of scope for this prototype.

### 6. Reading experience: one log, several ways in

Keep one stable Markdown entrypoint and one canonical journal. The concise view
shows the date/uncertainty, change, significance, and limit, with a stable anchor
to the full entry and its evidence. The full view preserves the earlier picture,
working implication, citations, and revision history. A short view never deletes
detail from the governed source plane.

Person, project, and practice pages can show derived “changes in understanding”
sections using the same entry IDs. They do not copy a mutable interpretation
into a second authoritative biography. Explain when an observation belongs to
this meeting or message, not to the person's character in general. Show analyst
attribution and interpretive limits alongside links to existing situated readings.

The human reader should be able to return from an entry to its source, recognize
later revisions, and distinguish current working implications from historical
ones. Plain Markdown, meaningful link labels, heading hierarchy, and explicit
textual status remain sufficient; a new visual application is not required.

### 7. Lifecycle, stale evidence, and concurrency

The intended lifecycle is candidate -> structural review -> source-grounded
editorial review -> append -> rebuild permissioned projections. Revisions are
new entries; generated projections can be rebuilt, canonical entries cannot be
silently edited. Reviewer identity and exact candidate/source revisions belong
in a receipt. A model-generated recommendation is not a human review receipt.

Source changes, missing source bytes, and withdrawals are different states.
Changed/unavailable evidence marks dependent views stale; it does not prove the
earlier reading was false. Withdrawal withholds affected readings pending
retention review. Propagate dependency staleness to downstream views, including
person and project views, before calling them current. Automation must not
silently rewrite prose or reactivate historical tasks during this process.

Keep the existing expected-digest, lock, idempotent retry, final-newline, and
trusted-Git-baseline checks. Verify source bytes separately when access is
available; a portable metadata check must never claim it did that verification.
Render failures after a valid append leave a repairable stale projection: rebuild
and recheck without deleting the new canonical entry.

For the first implementation, serialize admission to each canonical journal.
Two divergent branch tails create a hold, not an automatic concatenation or
history rewrite. A reviewed reconciliation preserves both original branch
artifacts and their provenance. Any new canonical admissions use their actual
admission/recording time, retain original drafting time separately, and preserve
explicit identity mappings. Final reconciliation mechanics and collision tests
are an implementation gate; this RFC does not authorize rebasing private history.

### 8. Analytical review and prior art

The following are **fictionalized analytical lenses**, not quotations, actual
reviews, appointments, authorship, availability, or endorsements. Their proposed
design contributions are this draft's interpretations.

- **Vivian Gornick:** Keep event and interpretation distinct. The account needs
  both an earlier picture and an explicit account of why it changed.
- **Zora Neale Hurston:** Preserve situation, context, and contradictory evidence.
  A person's words in one encounter must not become a permanent personality label.
- **Deborah Treisman:** State the consequential change without exaggeration, and
  keep the narrow evidence boundary beside the claim rather than in a distant caveat.
- **Abby Covert:** Give the component a precise job. `About`, `informs`, and a
  revision edge must not mean the same thing merely because they are all links.
- **Martin Fowler:** Separate event history from record history and resist
  unnecessary infrastructure. His [Bitemporal History](https://martinfowler.com/articles/bitemporal-history.html)
  explains retroactive knowledge changes and the complexity they introduce.
  Here the influence is explicit time semantics, not adoption of a database pattern.
- **Luc Moreau:** Make derivation and attribution inspectable. [W3C PROV-DM](https://www.w3.org/TR/prov-dm/),
  which Moreau co-edited, distinguishes entities, activities, agents, and their
  relationships. It informs the provenance vocabulary; this draft does not claim
  PROV conformance or treat provenance as proof of consent or truth.
- **Maggie Appleton:** Join chronology to an evolving, contextual reading space.
  Her [digital-garden essay](https://maggieappleton.com/garden-history) emphasizes
  interconnection and continuing development. We apply that reading principle
  privately; a public-gardening model is not permission to publish relationships.

### 9. Evaluation contract and observed failure categories

The [contract](./0016-irl-changelog-graph-component.contract.json),
[synthetic cases](../evals/knowledge-bank/irl-changelog-rfc-cases.mjs), and
[review model](../scripts/rfcs/irl-changelog-eval.mjs) test temporal selection,
typed relations, source-revision binding, uncertainty, revision warnings,
private-only review, and non-activation. They are a finite semantic abstraction,
not a complete version-two schema, a production authorization boundary, a source
collector, or evidence that private migration happened.

The model returns `deny`, `hold`, or `ready-for-human-review`; none grants
implementation, migration, action, or publication. It returns no entry IDs for
a public-output request. The version-one append tests continue to exercise the
real utility's history and stale-write behavior independently.

The close reading and eval audit identified these concrete failure categories:
temporal conflation; ambiguous revision edges; unbound or relabeled citations;
unstable identity; broken graph targets; stale evidence presented as current;
private/public leakage; implied action/voice authority; and warnings lost when
a newer edge overwrites an older one. During the hill climb, compound revision
cases exposed that last failure even after simple cases passed. A precedence
rule now preserves contested/corrected warnings; the cases stay in regression.

Run:

```sh
npm run test:irl-changelog
npm run test:irl-rfc
npm run evals:irl-rfc
npm run check:rfcs
npm run public-safety
```

An exact-candidate receipt fingerprints the RFC, contract, evaluator, cases,
tests, integration points, and existing journal utility. Changing any bound
input invalidates reuse of that receipt. Synthetic cases may run in public CI;
private source checks remain local and independently authorized. Existing
release and human gates remain independent of focused success.

**Editorial evaluation is separate.** There is no calibrated LLM judge or
held-out human-labeled corpus for this new component. Passing finite synthetic
cases is not an accuracy rate for real readings. In an authorized private canary,
Jamie reviews the source, earlier entry, later evidence, interpretation, and
proposed implication together. Binary questions are: Is the change material?
Is each consequential assertion supported? Is counterevidence represented? Are
event/learning/recording times honest? Does the account preserve agency and
privacy? Does the entry reduce orientation work? Record failures and revise the
lowest-performing category without weakening a hard gate. Do not invent reviewer
ballots or convert a fictionalized lens into human validation.

## Security and privacy

Detailed journal records, private source identities/hashes/locators, relationship
states, negotiation context, and private graph topology remain permissioned.
Public code and tests must use invented fixtures only. Private Git holds governed,
minimum-necessary derived knowledge; it is not an unrestricted raw-source vault.
Do not put credentials, raw account exports, or unnecessary sensitive details
into either repository. Existing source-custody rules still apply.

Permission checks precede graph expansion and rendering. An unauthorized reader
must not learn private counts, names, IDs, hashes, paths, titles, link existence,
or the shape of the private graph. This semantic prototype does not implement
authentication; a future permissioned adapter must prove these properties before
exposure. Public builds never open the journal, require private access, or emit
“locked” backlinks that reveal its topology.

Append-only is the normal historical rule, not an absolute retention rule.
Source withdrawal, accidental secrets, or a binding removal obligation requires
an exact-target, explicitly authorized remediation process. Restrict exposure,
preserve a minimum-necessary remediation receipt, invalidate downstream copies,
and use separately approved history remediation where required. Never claim a
tombstone erased Git history; never use append-only policy to refuse an authorized
safety correction. This RFC grants no deletion or history-rewrite authority.

## Publication workflow

This RFC, generic code, and synthetic cases are public-safe design artifacts.
Actual entries have no automatic public export. A separately authored public
summary requires canonical claim/evidence updates where applicable, exact-candidate
source and collective-credit review, privacy/rights/consent checks, and Jamie's
explicit publication approval. It must reveal no protected locator or topology.
Paired branches and PRs coordinate development; they do not grant publication or
require corresponding private facts to appear publicly.

## Rollout plan

Implementation status: the generic v2 runtime, local serialized storage adapter,
synthetic behavioral regressions, and candidate-bound review receipt are present.
Version one remains readable and byte-preserved. A read-only migration inventory
does not assign new IDs, infer learning dates or choose revision relations.
Actual historical admission and the human canary remain held. See the
[implementation coverage and stop gates](../docs/architecture/irl-changelog-v2.md).

1. **Review now:** publish this proposed RFC and synthetic model in the existing
   review lane. Leave the live journal, its source pointers, and runtime unchanged.
2. **Acceptance gate:** Jamie approves or revises ownership, revision vocabulary,
   temporal semantics, and the migration/retention boundaries. Finalize the
   versioned persistence schema, permissions, and branch reconciliation design.
3. **Isolated migration rehearsal:** after explicit authorization, preserve the
   old segment and its trusted digest. Build a new versioned segment and private
   alias map. Review each old `supersedes` relation: do not mechanically assume
   correction when it may represent development. Ambiguous mappings remain held.
   Preserve unknown learning dates; no fabricated backfill.
4. **Compatibility verification:** old links resolve, old bytes remain unchanged,
   current views show revision history, stale dependencies cannot pass currentness,
   and unauthorized views disclose nothing. Test parallel writers, crashes,
   source changes, unknown versions, and rollback on synthetic fixtures first.
5. **Bounded private canary:** Jamie selects one authorized review window. Compare
   orientation effort and substantive corrections, not person-level productivity.
   Inspect full source-to-interpretation traces before proposing wider adoption.

Rollback before migration is removal of the unadopted prototype. After a rehearsal,
restore the approved old entrypoint and keep the new segment quarantined for review;
do not erase newly admitted evidence. Reconcile valid new entries before resuming
old writes. Keep release receipts candidate-bound and repository-specific.

## Decision gates

- Jamie accepted implementation on September 6, 2026; this does not grant the
  remaining migration, editorial, publication or release authorities.
- Jamie authorizes any private source access, migration rehearsal, or canary.
- The persistence schema, unknown-date representation, identity mapping, typed
  registry, permission boundary, and concurrency behavior are specified and tested.
- Source-grounded human review approves consequential interpretations and any
  dispute resolution; model output does not substitute for that review.
- Retention exceptions receive exact-target authorization under existing policy.
- Public claims, publication, merge, deployment, and indexing retain separate gates.

## Drawbacks

More explicit metadata can become clerical work. A temporal view can imply more
certainty than its evidence supports. A compact warning badge can hide nuance;
the full revision links must remain accessible. Private aggregation increases
sensitivity even if every item was legitimately accessed. Namespace and migration
machinery can exceed the needs of a single writer. These costs justify a small,
Markdown-first canary and no new database or automatic collector.

## Alternatives

**Keep the current journal unchanged.** Lowest implementation cost; retains its
append protections but leaves ambiguous revision semantics and untyped links.

**One freeform weekly note.** Excellent for composition and low overhead, but
does not reliably preserve source revisions, links, or dated changes of account.
Keep such notes as authored views rather than the only canonical history.

**Use a task manager as the changelog.** Records action status well but risks
turning preservation into commitment and leaving interpretive change unmodeled.

**Adopt full event sourcing or a bitemporal database.** More powerful queries and
concurrency machinery, with greater cost and a misleading appearance of objective
world-state reconstruction. Not justified for this bounded component yet.

## Unresolved questions

- What is the minimum date-precision vocabulary needed in real entries beyond
  exact, bounded-approximate, and unknown?
- What human review receipt should settle a challenge without hiding disagreement?
- Which existing graph registry should own cross-project stable aliases without
  exposing protected topology? Resolve privately before migration.
- Is serialized admission sufficient for the canary? If not, specify and test
  reconciliation before supporting simultaneous journal writers.
- What retention obligations apply to the selected private canary? Resolve them
  before copying sources or making persistence promises.
- Does the concise view actually reduce orientation effort for Jamie? Only real,
  authorized use can answer this; synthetic tests cannot.
