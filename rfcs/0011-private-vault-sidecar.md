---
rfc: 11
title: Paired Public Portfolio and Private Vault Sidecar
stage: implementing
start_date: 2026-09-04
authors:
  - Jamie Burkart
  - Codex, AI-assisted implementation
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - privacy-governance
  - research-operations
  - developer-experience
  - public-portfolio
  - deployment
implementation: docs/operations/paired-public-private-workspaces.md
supersedes: []
superseded_by: null
---

# Paired Public Portfolio and Private Vault Sidecar

> **Authorization and publication boundary**
>
> Jamie Burkart directly authorized creation of the private sidecar and this
> initial paired implementation on 2026-09-04. That authorizes the repository,
> scaffold, matching development lane, and draft review—not publication of
> private material, either merge, deployment, production indexing, or future
> access grants.

## Summary

Operate the public-safe portfolio and a separately permissioned private
knowledge-vault sidecar as one paired development lane. Active work uses the
same head branch name, base branch name, pull-request title, and draft posture
in both repositories. Each repository retains its own commits, content,
visibility, checks, description, approval, merge, and rollback.

The public repository records only an opaque pair identifier and policy. It
does not name or link the private repository, pull request, checkout, records,
or source locators and never requires the private side to build. The private
graph may reference stable public records and projections, giving authorized
operators a direct route from public meaning to protected context without
creating a public backlink.

This RFC implements one authorized operational slice of
[RFC 0001](./0001-shared-core-public-private-knowledge-wikis.md),
[RFC 0006](./0006-federated-knowledge-exchange-and-release-receipts.md),
and [RFC 0010](./0010-minimum-viable-federation-canary.md). It does not accept
their broader package, exchange, or platform designs.

## Motivation

The portfolio must stay safe to publish, yet career operations, client
opportunities, proposals, relationship state, unresolved interpretations, and
protected source routes need durable structure. Keeping that work in unrelated
folders makes public composition safer only by making the private reasoning
harder to retrieve, verify, correct, and continue.

A paired workspace makes the mental model smaller: one development intention,
one branch name, two visibility planes. The public plane shows what may be
reviewed publicly. The private plane retains the backstage record required to
understand and responsibly update it. The pair must reduce coordination burden
without turning convenience into disclosure or automated publication.

## Goals

- Create a private GitHub sibling repository only after its private visibility
  is confirmed.
- Use exact matching head and base branch names for active paired work.
- Use exact matching pull-request titles and draft posture.
- Keep commit identities, checks, descriptions, merge decisions, and rollback
  independent.
- Provide one coordinated local branch-switch command plus a best-effort
  post-checkout guard.
- Preserve public build independence from the private repository.
- Let private records reference stable public IDs without public backlinks or
  private-topology leakage.
- Keep raw sensitive sources and credentials outside Git by default.
- Fail closed on dirty worktrees, visibility drift, branch mismatch, missing
  paired review, or forbidden public locator fields.

## Non-goals

- Do not mirror, subtree, vendor, symlink, or import private content into the
  public repository.
- Do not make GitHub the source vault or credential store.
- Do not promise transactional atomicity across two independent Git
  repositories.
- Do not make a private merge publish anything or a public merge approve the
  private record.
- Do not grant automation authority to merge, publish, deploy, index, contact a
  third party, accept work, or resolve a relationship state.
- Do not expose the private repository name, URL, pull request, local path,
  record count, hash, or topology in a public file or review.
- Do not require private-repository credentials in public CI.
- Do not implement the shared core package proposed by RFC 0001.

## Terminology

**Paired development lane**
: One bounded change represented by corresponding branches and reviews in the
  public and private repositories.

**Public plane**
: The public-safe repository, knowledge graph, review, and portfolio surface.

**Private plane**
: The separately permissioned sidecar containing governed backstage knowledge
  and source-vault pointers.

**Opaque pair ID**
: A non-resolving public identifier for the coordination policy. It is not a
  repository locator or private record identity.

**Operator-local mapping**
: An ignored configuration file that resolves the private checkout only on an
  authorized machine.

**Lockstep**
: Equality of active head branch, base branch, pull-request title, and review
  posture—not equality of commits or content.

## Detailed design

### Repository roles

The public repository remains canonical for public-safe claims, methods,
projections, application code, and deployable output. The private sidecar is
canonical for governed backstage context appropriate to durable private Git
history. A separate source vault remains canonical for credentials, raw
communications, unrestricted exports, databases, and sensitive binaries.

```text
source vault --governed pointers--> private sidecar
                                      |
                                      | reviewed public candidate
                                      v
                              public-safe portfolio
```

There is no reverse runtime dependency. Public readers and builders cannot
resolve the private side through committed public metadata.

### Branch coordination

The canonical interface is:

```bash
npm run pair:switch -- <branch>
```

It resolves the counterpart through ignored local configuration, validates the
branch name, requires both worktrees to be clean, then creates or selects the
branch in the private and public repositories. If the public switch fails after
the private switch, the coordinator attempts to restore the prior private
branch and exits nonzero.

A tracked `post-checkout` hook provides a guard when an operator uses raw Git.
Because Git has no distributed transaction across repositories, the hook is
best effort. A hook failure leaves the pair held until `pair:status` reports
matching branches. Operators should use the coordinated command.

### Pull-request coordination

Paired reviews require:

- identical head branch names;
- identical base branch names;
- identical titles;
- matching draft posture;
- both reviews open while the paired candidate is active.

Descriptions intentionally differ. The public description records architecture,
tests, limits, and the existence of an opaque private role. The private
description may link the public review and summarize protected records for
authorized readers. Neither description substitutes for the repository's own
diff or checks.

### Reference direction

Private records may store `public_projection_id`, public record IDs, and public
URLs. Authorized private search can therefore recover backstage context for a
public claim. Public records never store private IDs, backlinks, counts,
fingerprints, tombstones, repository locators, or missing-edge diagnostics.

Promotion creates a separately reviewed public candidate. It does not move or
rename the private record, and it does not make the public wording inherit all
private assertions.

### Candidate binding

Each repository computes its own candidate fingerprint because its commits and
content are deliberately different. A pair-state receipt records the two
fingerprints, branch and base names, review titles, visibility states, and check
results. Changing either candidate invalidates the pair receipt and requires
both reviews to be refreshed.

## Security and privacy

The private repository's GitHub visibility must be read and confirmed as
`PRIVATE` before protected content enters it. Visibility drift is a hard denial,
not a warning. Access remains case by case and does not imply consent,
publication permission, or authority to invite additional collaborators.

The public manifest forbids private repository names and URLs, private pull
requests, local paths, protected locators, source bodies, and private graph
topology. Operator-local mappings are ignored and contain paths only, never
passwords, tokens, cookies, or authenticated browser state.

The private sidecar is not an unrestricted archive. Raw correspondence,
mailboxes, message databases, contact records, financial or health material,
credentials, and large exports remain vault-only by default. Private Git should
prefer pointers, bounded derived records, explicit dispositions, and
minimum-necessary detail.

Public CI receives no secret granting private-repository access. Public builds,
tests, deployment, and rollback succeed with the private repository absent.

## Publication workflow

1. Research and backstage operations remain in the private plane.
2. A private record may relate itself to an existing public ID.
3. A proposed outward change becomes a bounded publication candidate with
   public wording, sources, limits, consent and rights state, collective credit,
   intended surfaces, and a named human decision owner.
4. The public branch receives only the public-safe candidate.
5. Both reviews are updated under the same branch, base, title, and draft
   posture.
6. Deterministic checks run independently; human gates remain separate.
7. Jamie decides whether either review advances. A private merge does not
   publish, and a public merge does not erase or validate private context.

## Rollout plan

1. Create the empty remote and verify private visibility.
2. Establish matching base and head branches for the active public review.
3. Add the governed private scaffold, source pointers, and a minimal
   source-backed-team-memory relationship record.
4. Add the public opaque manifest, coordinator, hook, operating guide, contract,
   and evaluator.
5. Exercise red-green tests for mismatch, visibility drift, locator leakage,
   missing review, dirty worktrees, and coordinated switching.
6. Open matching draft reviews and record independent candidate fingerprints.
7. Observe the workflow before considering `operational` or `recommended`.

Rollback removes the local hook configuration, ignored mapping, coordinator,
and public opaque manifest. The private repository remains private archival
history unless Jamie separately authorizes deletion. No rollback may copy its
contents into public.

## Decision gates

- Jamie has authorized repository creation and this initial implementation.
- Private access grants remain Jamie decisions.
- Every private record requires classification and source disposition.
- Rights, consent, quotation, attribution, and public-interest review remain
  distinct from access.
- Each pull request requires its own merge decision.
- Public projection, deployment, and production indexing remain separate human
  gates.
- Advancing this RFC to `operational` requires observed use, fresh pair-state
  evidence, and Jamie's explicit stage decision.

## Drawbacks

- Two repositories still require two commits, two reviews, and two sets of
  checks.
- Raw Git commands cannot be made fully atomic across repositories.
- Matching names can create false confidence if the contents or receipts are
  stale.
- A private Git remote remains a disclosure surface for authorized members and
  is inappropriate for credentials or indiscriminate raw archives.
- Public opacity makes troubleshooting dependent on authorized local context.
- Review descriptions must differ, adding a small editorial burden even when
  titles match.

## Alternatives

**One mixed-visibility repository** was rejected because Git history and access
controls cannot safely make selected paths public while keeping other history
private.

**A private Git submodule in the public repository** was rejected because its
locator and commit would reveal private topology and risk a public runtime
dependency.

**A public submodule in the private repository** remains technically possible,
but a stable public ID or pinned source edition is simpler and less coupled for
the first implementation.

**A monorepo with encrypted private files** was rejected because encryption
does not remove metadata leakage, key-management risk, accidental publication,
or build coupling.

**Manual coordination only** was rejected because branch and review drift are
predictable operational failures that deterministic checks can catch.

## Unresolved questions

- After an observation period, should the coordinator become a standalone tool
  shared by multiple paired repositories?
- Should a private-only CI job verify paired GitHub state using narrowly scoped
  credentials, or should live pair verification remain local and manual?
- What retention and backup policy should govern the private repository beyond
  GitHub's availability?
- Which private record families belong in durable Git, and which should remain
  vault-only pointers?
- What evidence is sufficient to advance this RFC from `implementing` to
  `operational`?
