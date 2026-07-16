# Feature-evals knowledge integration

Atlas integrates the `feature/evals-A` through `feature/evals-N` family at a
frozen source cut recorded in `feature-evals-integration.json`. Branch names are
not treated as stable evidence; every source is bound to an exact commit.

## Four native retention layers

1. **Canonical operation.** `records/canonical.json` is the Atlas authority for
   claims, evidence relationships, corrections, projection decisions, and
   citations. The former typed bank is a parity fixture, not a future source of
   authority.
2. **Semantic components.** `generated/feature-evals-knowledge.json` gives
   semantic identities, variants, documents, source locators, and stakeholders
   deterministic `atlas://` addresses while retaining every situated accession
   location. Different identifiers and variants are not silently merged.
3. **Native source objects and profiles.** Every artifact association has a
   SHA-256 `atlas://source-objects/...` address, a format-aware structural
   profile, declared knowledge classes, native targets, and a migration
   disposition. `accession-migration-policy.json` governs the protocols; the
   generated Markdown migration report makes the aggregate diff inspectable.
4. **Accession provenance.** Historical branch, commit, path, and Git blob
   identities remain provenance and one-time materialization inputs. They are
   not Atlas content addresses. Preserve the source ancestry with a merge
   commit; a squash merge does not retain that additional recovery path.

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
blob remains reachable for initial materialization. `atlas:bundle` writes the
native objects under `objects/sha256/`; `atlas:verify-bundle` and
`atlas:source-object -- --bundle PATH --content` then operate without Git,
the old worktrees, or remote branch names.
