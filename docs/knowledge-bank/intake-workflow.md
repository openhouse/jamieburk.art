# Knowledge intake workflow

The intake layer is the front door of the knowledge bank. It preserves a URL,
memory, possible claim, artifact lead, engagement lead, or research lead before
the material is mature enough to become public portfolio copy.

Intake is lossless, but publication is selective. A fragment can remain useful
even when it is not yet verified, publicly linkable, or relevant to the current
site argument.

## Three separate decisions

Every intake records three dimensions that must not be collapsed:

1. **Maturity:** captured, triaged, metadata-reviewed, source-reviewed,
   decomposed, research-needed, or superseded.
2. **Public use:** public-linkable, cite-with-care, approval-required, or
   protected.
3. **Editorial state:** unsurfaced, candidate, selected, or retired.

A source may be public without being selected. A claim may be defensible without
belonging on the current website. A valuable memory may remain approval-required
while research continues.

## Agent protocol

When Jamie supplies a fragment:

1. Assign one stable `INTAKE-` ID and record a public-safe summary.
2. State why the fragment matters and which projects it may concern.
3. If it is a public source, verify its identity and preservation before
   marking it metadata-reviewed.
4. Close-read it before marking it source-reviewed. Normalize the source as
   `SRC-` and decompose only the propositions it can
   support into `CLM-` records.
5. Record source-specific support, locator, evidence role, boundaries, and
   anti-claims.
6. Preserve stronger memories or unresolved questions as `INQ-` research
   inquiries rather than promoting them.
7. Give the intake a disposition pointing to the records created or reused.
8. Leave editorial state unsurfaced unless a separate composition pass selects
   the material for a named audience and surface.
9. Run `npm run check:knowledge-intake`.
10. Report the intake IDs and dispositions so Jamie can find the work again.

Never silently discard a fragment. If it duplicates an existing intake, link
the duplicate. If it is unsafe for the public repository, store only a bounded
description and opaque locator policy, then place it on protected hold.

## Source decomposition

One source is not one claim. Close reading may yield several atomic claims,
contextual relationships, boundaries, and research questions. Each claim should
be independently understandable and independently supportable.

The source record's `supportsGenerally` field is an orientation aid. Claim-level
evidence relationships determine what the source is actually allowed to prove.
The `doesNotEstablish` field prevents a related source from becoming evidence
for every desirable conclusion about a project.

A campaign press index is a finding aid. Its placement edge can establish that
an article appeared in the campaign's Press section, but not what the article
proves. Keep such articles `metadata-reviewed` until a human or agent has read
the source closely enough to create bounded claim relationships.

A cloud-drive inventory is also a finding aid. Inventory every accessible
container for governed coverage, then close-read professionally relevant
records selectively. File presence, revision access, or a drive title does not
by itself establish authorship, role, consent, outcomes, or publication rights.
Keep private Drive and file identifiers, links, credentials, contacts, and
row-level data outside this public repository; use an opaque protected locator.

## Projection gate

An intake-linked claim may receive an active public projection only when the
relevant intake is:

- decomposed;
- public-linkable; and
- explicitly selected.

This is a minimum gate, not an instruction to publish. Composition still asks
whether the claim serves the page, audience, and current argument. The website
is a purposeful projection of the bank, never a dump of everything the bank
knows.

## Public repository boundary

Do not commit raw private material, machine-local paths, private filenames,
signed URLs, credentials, unapproved photographs, raw messages, or full private
transcripts. Keep originals in the private archive. This repository may record
a public-safe summary, evidence class, rights state, limitations, next action,
and opaque protected locator.

## Validation and evals

`npm run check:knowledge-intake` validates required intake coverage, stable
destinations, canonical links, projection discipline, campaign press
provenance, protected cloud-source boundaries, and blocked path or link
markers. AGENTS.md and the active runner identify the current suite; this guide
does not duplicate that mutable version pointer. Its intake and decomposition
criteria include:

- `INTAKE-001` for lossless public-safe capture;
- `DISPOSITION-001` for resolvable destinations;
- `PROJECTION-001` for separation of maturity, public safety, and selection;
- `PRESS-001` for complete, deduplicated, archive-backed campaign indexes;
- `RESEARCH-001` for normalized, close-read public sources;
- `ARCHIVE-001` for bounded iCloud archival production;
- `GDRIVE-001` for governed Shared Drive inventory, close reading, and selective projection;
- `KCTH-001` for the bounded KC Town Hall municipal and stewardship sequence;
- `DECOMP-001` for independent semantic review of source decomposition.

`records.ts` and its imported modules are canonical for citational claims,
atomic evidence relationships, and source limits. `proofs.ts` is a curated
public-safe capability and surface-selection layer. It may summarize approved
claims for hiring-facing composition, but it may not independently strengthen
or contradict the canonical records. The knowledge-bank and public-safety
checks enforce that boundary.

The deterministic gates can prove structural completeness. Two independent
semantic graders must still assess whether the decomposition is accurate,
useful, and neither inflated nor needlessly thin.
