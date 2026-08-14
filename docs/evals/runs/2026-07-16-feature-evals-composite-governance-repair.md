# Composite governance repair before final holdouts

**Date:** 2026-07-16
**Branch:** `feature/knowledge-h`
**Status:** Candidate repaired; fresh final holdouts required

## Recursive progression

1. The first composite implementation scored **28/36**. Append-safe lifecycle
   queries, professor-lens relocking, and independent stopping evidence were
   incomplete.
2. Lifecycle query coverage and the bounded professor-lens lock raised the
   deterministic candidate to **32/36**. Only the holdout criterion remained.
3. Two independent, read-only holdouts inspected that candidate. Both rejected
   the stopping decision while affirming the current architecture, public
   safety, collective credit, selective composition, and honest human gates.

## Independent findings

The judges identified two blocking governance defects:

- the content fingerprint covered a selected evidence list rather than the
  complete effective source candidate; and
- the rubric relied on its mutable, self-declared checksum, so arbitrary
  semantic weakening plus checksum refresh was not independently pinned.

One judge also demonstrated that fabricated branch heads and decorative
one-character decision explanations could satisfy their narrow local checks.
Both judges asked for stronger process provenance before independence could be
accepted.

## Repair

- Candidate identity now hashes every tracked or unignored Git source-tree file
  and excludes only the two declared holdout result records.
- The evidence bundle now explicitly includes all canonical records plus key
  public rendering, accessibility, indexing, validation, runtime, and release
  dependencies.
- The rubric and frozen A-N head set have separately pinned digests in the
  evaluator.
- Inspectable decisions require substantive strength, rationale, destination,
  and verification records.
- Holdouts must carry distinct read-only process-session and prompt identifiers,
  model and timing fields, and a digest of the judgment payload.
- The composite mutation suite now probes all of these failure modes.

After repair, criteria `COMP-001` through `COMP-008` pass. The mutation suite
passes every adversarial probe; its single bootstrap failure is the deliberately
absent exact-candidate holdout pair. Two fresh judges must inspect the repaired
candidate before `COMP-009` can pass.

## Second independent round

The first repaired candidate was submitted to two native, read-only subagents.
The public-value judge accepted it, but the architecture judge rejected it, so
the candidate remained rejected. The architecture review found that:

- one local short branch name differed from its frozen `origin` ref;
- long decorative strings could still satisfy decision-record checks;
- the base portfolio suite was not included in the semantic rubric digest;
- structurally complete synthetic instructions could replace human-evidence
  controls;
- UTF-8 decoding made the source-tree hash non-byte-exact for binary files; and
- run version and process provenance were not included in the judgment digest.

The next repair resolves source heads through the explicit
`refs/remotes/origin` namespace, pins reviewed digests for the complete base
suite, integration register, and blind-spot controls, hashes every candidate file
as raw bytes, and binds full prompt and process provenance into each judgment
digest. The repository describes native process receipts as auditable evidence,
not as cryptographic authentication of the Codex platform.

Fourteen adversarial probes now pass before final holdout installation. As in
the earlier round, the exact-candidate acceptance test remains deliberately red
until two new judges accept the newly fingerprinted source tree.

## Boundary

This repair does not infer collaborator approval, hiring-reader validation,
production approval, deployment verification, or indexing approval. Those
human and external gates remain open.
