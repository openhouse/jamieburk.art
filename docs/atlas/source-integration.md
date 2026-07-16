# Feature-evals knowledge integration

Atlas integrates the `feature/evals-A` through `feature/evals-N` family at a
frozen source cut recorded in `feature-evals-integration.json`. Branch names are
not treated as stable evidence; every source is bound to an exact commit.

## Three retention layers

1. **Canonical operation.** The typed bank from `feature/evals-E` remains the
   V1 source of authority for claims, evidence relationships, corrections,
   projection decisions, and citations.
2. **Federated knowledge.** `generated/feature-evals-knowledge.json` inventories
   every relevant artifact in all fourteen source trees, gives every artifact
   an immutable Git content address, and indexes its semantic identifiers,
   selected public-safe record variants, document abstracts, source locators,
   and named entity records. Full artifact content is available through the
   private Atlas service without requiring a branch ref. Different identifiers
   are preserved without asserting that they are equivalent.
3. **Source history.** The frozen source commits and their complete blobs are incorporated into the
   Atlas branch ancestry. Preserve that ancestry with a merge commit when this
   PR is integrated; a squash merge does not retain the same source-history
   guarantee.

The catalog contains public locators only when they are portable and do not
carry authentication material. Authenticated, private, templated, credential-
bearing, and otherwise nonportable locators are represented only by SHA-256
hashes and provenance.

## Knowledge coverage

The authored semantic wiki contains one page for each of the typed bank's 21
project keys. Their deterministic slices jointly cover all canonical entities,
intake records, sources, readings, claims, research tasks, inquiries,
projection decisions, corrections, and citation pages.

`stakeholder-credit.json` makes named contribution boundaries executable. It
is a public-record attribution register, not collaborator testimony,
endorsement, permission, or consent.

## Refresh and verification

```bash
npm run atlas:refresh-sources
npm run atlas:verify-sources
npm run atlas:generate
npm run atlas:check
npm run atlas:test
```

`atlas:refresh-sources` requires the frozen source commits in the local Git
object database. `atlas:verify-history` proves that every commit and cataloged
blob remains reachable from Atlas itself. Ordinary consumers need neither the
old worktrees nor the remote branch names.
