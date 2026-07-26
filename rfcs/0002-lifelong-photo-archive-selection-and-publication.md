---
rfc: 2
title: Lifelong Photo Archive Selection and Publication
stage: proposed
start_date: 2026-07-22
authors:
  - Jamie Burkart
  - Codex, AI-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - privacy-governance
  - research-operations
  - knowledge-architecture
  - public-portfolio
  - editorial
  - accessibility
implementation: null
supersedes: []
superseded_by: null
---

# Lifelong Photo Archive Selection and Publication

## Summary

Create a governed path from Jamie's private lifelong photo archive to carefully
selected, contextualized, rights-aware public images. Jamie reports that the
archive contains more than 600,000 photographs. This proposal treats that
figure as planning context, not an audited public metric. The source archive
would remain private and read-only to the workflow. Public Git would contain
only safe schemas, aggregate receipts, selection briefs, approved metadata,
and explicitly cleared derivatives. The Knowledge Wiki would connect visual
leads to projects, claims, people, places, events, and open questions without
turning archival custody into authorship, consent, or publication permission.

## Motivation

The portfolio currently has a deep source-backed account of Jamie's work but a
comparatively thin visual record. The photo archive may contain evidence of
projects, relationships, places, artifacts in use, recurring practices, and
forms of work that textual records do not make easy to see. It may also contain
private life, sensitive locations, bystanders, minors, collaborators, licensed
artworks, medical or financial context, and photographs whose authorship or
rights are unresolved.

The problem is therefore not simply finding attractive images. It is creating
a repeatable practice that can discover visual evidence while preserving
context, privacy, collective credit, source integrity, and human editorial
authority. The archive should be able to deepen the Knowledge Wiki without
forcing every discovery into the public portfolio.

## Goals

- Preserve the source archive and its original metadata without mutation.
- Create stable private identities for photographs and selection decisions.
- Support project-, claim-, person-, place-, event-, and time-based discovery.
- Give photo editors bounded briefs instead of an undifferentiated archive.
- Distinguish visual evidence, editorial quality, rights, consent, and public
  selection as separate review dimensions.
- Return visual discoveries to the Knowledge Wiki as leads, sources, bounded
  observations, corrections, or open inquiries.
- Publish only deliberately selected derivatives whose exact context and
  surface have received the required human approvals.
- Preserve rejected, deferred, duplicate, missing, and unresolved states so
  future passes do not silently repeat or erase prior work.

## Non-goals

- Do not commit the private photo archive, private catalog, face data, precise
  private locations, or protected identities to this public repository.
- Do not add a full photo archive or private archive browser to the public site.
- Do not move, rename, edit, deduplicate, delete, or reorganize source photos.
- Do not infer authorship, copyright, consent, identity, attendance, role,
  endorsement, causality, or impact from possession or visible content alone.
- Do not use face recognition to identify people without a separately reviewed
  and explicitly accepted proposal.
- Do not treat aesthetic quality, model confidence, or an archive match as
  publication permission.
- Do not automatically promote photographs or photograph-derived claims into
  the portfolio, resume, applications, or social media.
- Do not implement the private/public shared core proposed in RFC 0001 merely
  by merging this proposal.

## Terminology

- **Source archive:** Jamie's original photo library and associated metadata.
- **Private catalog:** A derived, access-controlled index used for search,
  clustering, review, and provenance without changing the source archive.
- **Visual lead:** A photograph or cohort worth researching; not yet evidence
  for a claim and not cleared for display.
- **Candidate select:** A visual lead proposed for a specific editorial use.
- **Approved derivative:** A bounded export approved for one or more named
  public surfaces, with source identity and review history retained privately.
- **Represented person:** A person visible in or materially described by an
  image, whether or not identified by name.
- **Photo-editor brief:** A request naming the project question, supported
  claim, desired scene or artifact, time and place bounds, rights and consent
  state, prohibited inferences, and intended surface.
- **Projection:** A separate editorial decision to use an approved derivative
  on a named public surface.

## Detailed design

### 1. Source and custody orientation

Begin with a read-only census of accessible libraries, exports, sidecars, and
metadata representations. Record snapshot date, source class, item counts,
coverage limits, duplicate semantics, materialization state, and errors. Do not
equate a library count with unique photographs or complete lifetime coverage.

The orientation should produce aggregate receipts and unresolved questions,
not a public inventory of filenames, paths, coordinates, or people.

### 2. Private catalog and stable identity

The private system should assign stable internal asset IDs and retain source
locators, capture time, available camera metadata, derivative relationships,
and content fingerprints. IDs must survive re-indexing without rewriting the
source library. Exact and perceptual duplicates should remain distinguishable:
one records byte identity, while the other records visual similarity.

Catalog generation must be deterministic for a declared source snapshot. Any
source, count, hash, or metadata drift should fail closed until reconciled.

### 3. Discovery and research return

Search and clustering may propose cohorts by time, place, project, visible
artifact, scene, or visual similarity. Automated labels are navigation aids,
not facts about identity, authorship, emotion, relationship, or event meaning.

Each material visual lead should enter the existing Knowledge Wiki lifecycle
through a governed inquiry before it becomes claim support. A photograph may:

- corroborate a known artifact, place, date, or operating scene;
- challenge or narrow an existing chronology;
- reveal a source, collaborator, project, or event worth researching;
- support a photo-editor brief; or
- remain held, protected, irrelevant, or unresolved.

The existing visual evidence index remains the public-safe orientation layer.
Private source coordinates and person-level review belong outside public Git.

### 4. Selection records

Selection should be recorded at the asset-and-surface level. A candidate select
should include:

- stable private asset ID;
- source snapshot and provenance;
- proposed project, claim, or narrative function;
- visible observations separated from interpretation;
- known and unresolved photographer or rights-holder information;
- represented-person, privacy, location, and sensitivity review;
- crop, caption, context, and derivative constraints;
- prohibited inferences;
- intended public surface;
- reviewer decisions and dates; and
- supersession or withdrawal history.

Public records may expose a redacted decision ID and safe summary, but never a
private locator or identity merely to make the workflow reproducible.

### 5. Photo-editor briefs

Briefs should be generated from the Knowledge Wiki rather than from generic
requests for "good photos." Each brief should state what the portfolio needs to
show, what the record supports, what remains open, which people or contexts
require protection, and what visual cliches or unsupported implications to
avoid.

Editors may surface unexpected evidence. Those discoveries return to research;
they do not bypass claim, rights, consent, or projection review.

### 6. Publication package

An approved derivative should be exported into a bounded publication package
containing the web-ready file, alt text, caption, credit, crop and transform
history, approved surfaces, expiration or review date where needed, and a
private link to the source decision. Public filenames should not expose private
people, events, locations, or source-library structure.

Removing an image from a public surface must not delete the source or erase the
decision history. Corrections, takedowns, and changed consent require an
explicit revocation path.

## Security and privacy

The source archive, private catalog, previews, embeddings, face or object
features, exact locations, person identities, rights correspondence, and review
notes are private data. They must live in an ignored local configuration and
storage boundary or a separately governed private repository. Public Git may
contain only schemas, synthetic fixtures, aggregate receipts, and approved
public derivatives.

Access to an archive is research authority, not publication authority.
Automated systems cannot clear identity, rights, consent, safety, or editorial
appropriateness. Logs and error reports must not leak paths, filenames,
coordinates, tokens, signed URLs, or image-derived sensitive labels.

The workflow should be reversible at the publication layer and non-destructive
at the source layer. A failed, partial, or drifting scan must stop rather than
silently produce a smaller candidate population.

## Publication workflow

1. A governed Knowledge Wiki question or editorial need creates a photo-editor
   brief.
2. The private catalog returns visual leads and complete cohort accounting.
3. A human editor reviews visual quality, relevance, context, and alternatives.
4. Rights, photographer credit, represented-person concerns, privacy, and
   sensitivity receive explicit dispositions.
5. Jamie approves the exact image, crop, caption, credit, alt text, and named
   surface.
6. A bounded derivative is exported; the private source remains unchanged.
7. Public checks confirm the approved package, accessibility, route, and
   projection contract before release.
8. Post-publication correction, revocation, or takedown remains available.

No automated score, model judgment, archive membership, or merged proposal may
substitute for the human decisions in steps 3 through 5.

## Rollout plan

### Phase 0: orientation

- Confirm accessible source classes and read-only behavior.
- Define private storage and local secret/configuration patterns.
- Produce a public-safe aggregate census contract and synthetic test fixtures.

### Phase 1: bounded pilot

- Select one project with known chronology and manageable rights questions.
- Index a declared cohort without changing source files.
- Produce a small photo-editor brief and keep every candidate off public
  surfaces.

### Phase 2: human review exercise

- Conduct selection, context, rights, consent, caption, credit, and alt-text
  review with Jamie and, where needed, collaborators or represented people.
- Test revocation and correction before publication.

### Phase 3: one controlled projection

- Publish one approved derivative to staging.
- Verify responsive rendering, accessibility, provenance, and rollback.
- Observe the result before expanding the workflow.

### Phase 4: repeatable portfolio practice

- Add project cohorts and photo-editor briefs only after the pilot's failure
  modes and human burden are understood.
- Keep the private archive and public portfolio separate at every stage.

## Decision gates

- Jamie approves the private/public boundary and source non-mutation contract.
- The source census and stable-ID method pass deterministic drift tests.
- Public fixtures demonstrate that private locators and identities cannot leak.
- Jamie selects the pilot project and defines its intended editorial question.
- Rights and represented-person review responsibilities are assigned.
- A human editor confirms that the brief produces useful, non-extractive
  choices.
- Jamie approves any exact derivative, caption, credit, alt text, and surface.
- Staging review, accessibility checks, correction, and rollback pass before
  production consideration.
- Production publication and indexing remain separate Jamie decisions.

## Drawbacks

- Cataloging and review may require substantial storage, compute, and human
  attention before producing any public image.
- Rights and consent may remain unresolved for photographs with high editorial
  value.
- Automated clustering can reproduce bias, miss important images, or encourage
  false confidence in incomplete cohorts.
- Rich metadata can create privacy risk even when image files remain private.
- A highly governed process may feel slow compared with ad hoc selection.
- The archive's scale may tempt the project toward a public archive product,
  distracting from the portfolio's immediate purpose.
- Maintaining private decisions and public derivatives across corrections and
  takedowns creates continuing operational responsibility.

## Alternatives

### Select manually from memory

Jamie could choose familiar photographs without a catalog. This is fast and
may produce strong initial images, but it favors remembered projects, offers
weak cohort accounting, and does not create a durable research return.

### Hire a photo editor with direct archive access

A trusted editor could browse the source library without new software. Human
judgment would be central, but search, provenance, privacy, and decision records
would still need a shared operating method.

### Use only already-public images

This sharply reduces immediate rights and privacy risk. It also leaves much of
the lifetime record unavailable for discovery and may overrepresent projects
that already received institutional documentation.

### Build a public archive browser

This would maximize visibility but conflicts with the portfolio's current
scope, public/private boundary, and human review capacity. It is not preferred.

### Do nothing

The existing text-led portfolio can continue. This avoids new risk but leaves a
major source of evidence, atmosphere, practice, and historical understanding
underused.

## Unresolved questions

- Which photo libraries, exports, and sidecars constitute the first declared
  source population?
- What does the reported archive count include, and how should edited versions,
  bursts, screenshots, scans, videos, and duplicates be counted?
- Where should the private catalog and review decisions live before RFC 0001 is
  accepted or implemented?
- Which project offers the best bounded pilot with useful images and tractable
  rights questions?
- Which review states require Jamie alone, a photographer or rights holder, a
  represented person, a collaborator, or legal advice?
- What level of location and timestamp precision is safe to retain in each
  private and public layer?
- How should family photographs, minors, deceased people, public crowds, and
  culturally sensitive material be handled?
- Which image-analysis features are useful enough to justify their privacy and
  maintenance costs?
- What is the smallest publication package that supports accessibility,
  correction, revocation, and long-term provenance?
