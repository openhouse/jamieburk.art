# IRL Change Log runtime (RFC 0016)

Operator-invoked, private-only implementation. Node 26 and local Git; no service,
database, collection, background task, public route, network source retrieval or
LLM judge. Existing schema-1 histories are not automatically migrated.

## Status and trust

The implementation request accepts RFC 0016 for development. Corpus migration,
observer/mapping approval, contextual use and representative human reading remain
separate gates. An eligible result is always **current-candidate**, never truth,
human approval, publication, a task, or an institutional decision.

Keep the operator policy outside the generated store, in restricted storage.
Its SHA-256 canonical digest must be approved independently of the input ledger.
Do not take that digest from an incoming message, authored entry, or unreviewed
configuration. A policy file and digest supplied by the same untrusted author
are not an independent trust root.

The policy declares scope, an independently selected record checkpoint and its
fingerprint, a private absolute store root, write_enabled, resolved typed
entities, and per-source pinned local Git repository/path/revision/SHA-256,
read_allowed and current eligibility. Sources are bounded allowlisted blobs;
the runtime does not materialize iCloud files or contact providers.

Context reviews are Ed25519-signed canonical payload fingerprints. Each payload
binds receipt_id, reviewed_by, decision, source_revision, source_sha256,
source_flow, use and valid_until. The operator trust registry maps key IDs to
reviewer identities and SPKI public keys; context_heads selects the current
signed receipt digest for each source. A held/denied head, missing receipt,
invalid signature, expired review or changed use holds the projection.
Key enrollment, current-head refresh and the authority/appropriateness of the
human decision must be verified outside this tool. No private key or real review
receipt is generated here. Crypto verifies a signed assertion, not consent.

See the synthetic test fixture for the complete policy and intake shape.
Never copy its reviewer identity or permissions into real operational policy.

## API and operator commands

- planAppend creates a CAS-bound append plan; it preserves earlier entry objects
  and stamps new recorded_at fields. commitPlan re-stamps the actual append time.
  Event time and learned_on remain authored; unknown learning stays null.
- openStore explicitly initializes one approved schema-2 checkpoint.
- commitPlan uses a single-writer lock, expected-prior fingerprint and exact
  request idempotency key. Reusing a key with changed content fails.
- inspectStore verifies complete generations and rechecks source eligibility,
  identity and contextual reviews before returning a view.
- rollbackStore accepts only a verified ancestor, keeps all generations, records
  the reason and disables both consumer and subsequent appends.
- planLegacy is a read-only, held crosswalk. It preserves old IDs, fingerprints
  and observed_on; it does not infer learning dates or apply a migration.

Run node scripts/irl-changelog/cli.mjs --help. Commands:

    node scripts/irl-changelog/cli.mjs inspect --policy OPERATOR_JSON --policy-digest APPROVED_DIGEST
    node scripts/irl-changelog/cli.mjs init --policy OPERATOR_JSON --policy-digest APPROVED_DIGEST
    node scripts/irl-changelog/cli.mjs plan --policy OPERATOR_JSON --policy-digest APPROVED_DIGEST --intake INTAKE_JSON --expected-prior LEDGER_DIGEST --idempotency-key REQUEST_ID
    node scripts/irl-changelog/cli.mjs append --policy OPERATOR_JSON --policy-digest APPROVED_DIGEST --intake INTAKE_JSON --expected-prior LEDGER_DIGEST --idempotency-key REQUEST_ID
    node scripts/irl-changelog/cli.mjs rollback --policy OPERATOR_JSON --policy-digest APPROVED_DIGEST --expected-generation CURRENT_ID --target-generation ANCESTOR_ID --reason REASON
    node scripts/irl-changelog/cli.mjs legacy-plan --legacy LEGACY_JSON --revision PINNED_COMMIT --sha256 VERIFIED_FILE_DIGEST

Placeholders are intentionally non-executable. Output may contain private history:
do not paste it into public logs or public pull requests. No implicit write mode.
The CLI append operation is current-state CAS-bound; after an uncertain response,
inspect first and use the preserved plan with commitPlan for an exact retry.

## Reading and integrity

A subject view computes the fixed-point closure of subject entries, their
correction ancestors and later corrections across subjects. Unrelated held
records do not obstruct a supported view; relevant held dependencies do.
Three reading depths retain current interpretations with limitations, changes
and disagreements, and evidence/history. Corrections are shown alongside the
earlier interpretation, not silently folded into a latest-wins claim.

Each immutable generation contains ledger.json, history.md, source-pointers.json,
views.json, receipt.json and a complete manifest of file hashes. A generation ID
is its canonical manifest digest. The CURRENT pointer changes only after all
generation files and directories are flushed and the sealed directory is renamed.
Only read views returned by inspectStore; views.json is a historical receipt,
not a permanently current consumer. No HTML/MDX is executed.

The chosen parent directory must be trusted. Stores must be owner-only; root
and descendant symlinks, including dangling links, are rejected. This is a
single-operator tool, not protection against a malicious process with the same
filesystem privileges. Checksums detect unintended edits, not a maliciously
rewritten entire history. Independent checkpoints remain essential.

## Recovery and migration

A crash before CURRENT changes leaves the previous generation readable. A crash
after the switch leaves one complete new generation. inspectStore reports
unattached generations and incomplete staging/pointer files. Fresh writes stop
when those exist; no lock is silently broken and nothing is deleted.

After a crash, preserve the store and captured plan; verify that no writer is
active before a human repairs a stale lock. Inspect both the chosen generation
and retained work. A normal rollback keeps later generations and disables use.
Re-enabling operation is deliberately not automated: approve a reconciled,
independently pinned checkpoint and a new owner-only store, retaining the old
store and every disposition. Do not delete or edit a generation to pass checks.
Initial-write failure without a CURRENT pointer also requires explicit recovery.

Legacy mapping approval must name the exact corpus/revision, observer, stable
IDs, field/source/entity mappings, independent baseline and unknown treatment.
Schema-1 observed_on is NOT schema-2 learned_on. A migration plan is not a usable
schema-2 ledger; no command upgrades it automatically. Governed deletion or
retention exceptions remain human decisions outside ordinary append/rollback.

## Verification and rollout

npm run hillclimb:irl-changelog-rfc runs synthetic reference cases, real temporary
Git/filesystem runtime tests, RFC validation, public safety and pair checks.
The tests exercise tampering, actual pinned bytes, review signatures/revocation,
cross-subject correction closure, unrelated holds, concurrency, retries, manual
edits, crash recovery, rollback, time provenance and read-only migration.

No real-corpus human review, reviewer enrollment, consent verification,
operational rollout, production release or global repository readiness is
claimed by a deterministic pass. The public build has no private dependency.
