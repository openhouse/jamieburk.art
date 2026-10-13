# Paired public and private workspaces

The portfolio is always public-safe. A separately permissioned private sidecar
may hold governed backstage knowledge, protected relationship context, and
source-vault pointers. The two repositories form one **paired development
lane**, not one content store.

## What lockstep means

For an active change, both repositories use:

- the same head branch name;
- the same base branch name;
- the same pull-request title and draft posture;
- separate commits, checks, access controls, descriptions, and merge decisions.

The public repository never names a private repository, URL, pull request,
filesystem path, protected locator, or private record. Its checked-in manifest
identifies only an opaque pair and an operator-local resolution policy. The
private side may point to stable public record and projection IDs so an
authorized operator can move from public meaning to private context without a
public backlink.

## Local setup

Create an ignored `.workspace-pair.local.json` at the public repository root:

```json
{
  "schema_version": 1,
  "pair_id": "portfolio-public-private-v1",
  "counterpart_path": "../your-authorized-sidecar-checkout"
}
```

Do not commit this file. Enable the checked-in hook with
`git config core.hooksPath .githooks` on an authorized machine.

Use the coordinated command for branch changes:

```bash
npm run pair:switch -- work/YYYY-MM-DD-X
```

This command checks that both worktrees are clean before changing either one,
then creates or selects the same branch in both repositories. The post-checkout
hook is a best-effort guard for a direct `git switch`; it cannot make two Git
repositories transactionally atomic. If the hook cannot switch the private
side, treat the pair as held and reconcile it with `npm run pair:status` before
committing or updating either pull request.

## Pull-request workflow

1. Confirm matching head and base branch names.
2. Run each repository's own deterministic checks.
3. Open or update two draft pull requests with the same title.
4. Keep visibility-appropriate descriptions: the public review describes the
   protocol without a private locator; the private review may link to the public
   review and describe protected changes for authorized readers.
5. Re-run pair-state verification after either candidate changes.
6. Merge each review only through its own human decision. One merge never
   authorizes the other.

## Knowledge-graph relationship

The join direction is private-to-public. A private record may carry a
`public_projection_id` or another stable public record ID. The public record
does not carry a private backlink, count, hash, tombstone, or missing-edge hint.
This preserves public opacity while making private context searchable to a
person who already has private access.

The private sidecar is not the source vault. Credentials, browser state, raw
mailboxes, message databases, unrestricted exports, and sensitive source
binaries remain outside Git by default. Prefer governed pointers, bounded
derived records, and explicit source dispositions.

## Complete private call records

For a bounded call Jamie explicitly directs the system to preserve, “nothing
on the cutting-room floor” means disposition completeness: every captured
artifact is retained in the appropriate custody plane or recorded as an
explicit gap. Raw audio and provider exports remain in source custody. After a
private-access review, the sidecar may retain a complete repaired transcript
and private interpretation, including passages withheld from a shareable
edition.

A participant restriction controls disclosure and outward projection; it does
not require the private working record to be silently discarded. The complete
record remains unavailable to the public and to participant-facing or
coalition-facing returns unless a new use receives its own authority. Private
preservation creates no quotation, attribution, publication, representation,
legal-reliance, or access-grant permission.

This is a bounded-record rule, not authority to bulk-acquire unrelated calls,
mailboxes, messages, or archives. Inaccessible, missing, corrupt, duplicate,
or intentionally pointer-only material must be named rather than disappearing
from the record.

## Build and release boundary

Public builds, tests, deployments, and rollback must work with the private
repository absent. Pair checks coordinate development and review; they do not
grant publication, deployment, indexing, rights, consent, or merge authority.
