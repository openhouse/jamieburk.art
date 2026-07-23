---
rfp: 2
title: Lifetime Photo Archive Fieldwork and Selective Publication
stage: proposed
start_date: 2026-07-22
authors:
  - Jamie Burkart
  - Codex (AI-assisted draft)
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

# Lifetime Photo Archive Fieldwork and Selective Publication

## Summary

Develop a non-destructive, private-first practice for encountering Jamie's
lifetime photographic archive, creating editor-ready fields, connecting visual
leads to the Knowledge Wiki, and publishing only deliberately selected and
cleared photographs. Jamie describes the archive as containing more than
600,000 photographs; the exact accessible population and source identity must
be frozen privately before that scale becomes an operational fact.

## Motivation

The photographic archive may contain visual evidence, project histories,
relationships, places, experiments, and ordinary life that are not legible in
the current portfolio or Knowledge Wiki. It may also contain private homes,
minors, vulnerable people, sensitive records, misleading dates, uncertain
authorship, and images whose evidentiary value does not confer publication
permission.

The immediate need is not a gallery or a mass import. It is a trustworthy way
to look with eyes situated in the present, preserve uncertainty, invite human
editorial judgment, and make small public selections without exposing the
archive that made those selections possible.

## Goals

- Preserve originals, metadata, pre-existing albums, people associations, and
  prior edits.
- Keep source access, previews, manifests, exact locations, and sensitive
  observations in a private local workspace.
- Create repeatable briefs for project, practice, period, relationship, and
  open-ended photographic research.
- Produce editor-ready fields with explicit uncertainty and safety holds.
- Allow visual discoveries to become research inquiries in the Knowledge Wiki
  before they become claims.
- Record rights, consent, credit, context, crop, and destination decisions for
  every photograph considered for publication.
- Publish only approved derivatives and public-safe asset records through the
  portfolio's existing selective-projection model.
- Make machine assistance auditable without assigning it human authority over
  identity, safety, consent, rights, meaning, or publication.

## Non-goals

- Committing the full archive, private previews, or private manifests to Git.
- Building a public archive browser, private document browser, CMS, or search
  service in this proposal.
- Uploading pixels, faces, OCR, GPS coordinates, or private metadata to an
  external model or service.
- Inferring unnamed identities, relationships, sensitive traits, or consent.
- Treating dates, filenames, face associations, visual similarity, or model
  labels as narrative authority.
- Automatically promoting an image, interpretation, or visual lead to the
  public portfolio.
- Modifying source assets or pre-existing Apple Photos organization as part of
  research. Additive albums and membership pointers are permitted only inside
  a separately named workspace that Jamie has explicitly authorized.

## Terminology

- **Source records:** The existing originals, metadata, pre-existing albums,
  edits, favorites, and people associations. These authoritative records are
  read-only for fieldwork.
- **Additive workspace collections:** New folders, albums, and membership
  pointers created only inside an explicitly authorized workspace namespace.
  They organize fieldwork without moving, editing, deleting, or changing an
  original or any pre-existing collection.
- **Private fieldwork workspace:** A local, access-controlled workspace for
  source fingerprints, retrieval plans, previews, manifests, observations,
  safety holds, and evaluation evidence.
- **Editor field:** A bounded, versioned set of photographs prepared for human
  comparison. It is not a publication selection.
- **Visual lead:** An observation that suggests a research question but does
  not yet support a factual claim.
- **HOLD:** A fail-closed state for privacy, safety, rights, consent, credit, or
  contextual uncertainty. Held material cannot enter a publication candidate.
- **Publication candidate:** A small set whose exact files, context, rights,
  consent, credit, crop, and destination are ready for human review.
- **Approved derivative:** A resized, cropped, or otherwise prepared file whose
  exact public use has been approved by the relevant human authorities.

## Detailed design

### Four boundaries

1. **Private source boundary.** Source records remain authoritative and
   unchanged. A private machine profile identifies access methods and freezes a
   source count plus identifier digest for each research run. A fieldwork run
   may add membership pointers only inside an explicitly authorized workspace;
   this is a bounded catalog addition, not a claim that the whole Photos library
   is unchanged.
2. **Private fieldwork boundary.** Retrieval plans, local previews, exact
   identifiers, faces, raw OCR, locations, and safety decisions remain outside
   the public repository. Every run is versioned and reproducible against its
   frozen source.
3. **Public-safe knowledge boundary.** Git may contain methods, eval contracts,
   redacted aggregate receipts, research inquiries, public-safe asset metadata,
   limitations, and publication decisions. It must not contain protected
   locators or material that reconstructs private records.
4. **Selective publication boundary.** Only approved derivatives enter
   `apps/www/public/`, and only after rights, consent, credit, safety, context,
   crop, and exact-destination review.

### Research loop

1. Preserve Jamie's brief in his words and define the question the images may
   help answer.
2. Freeze the accessible source population privately. Record limitations such
   as cloud-only assets, missing originals, scans with unreliable dates, and
   unsupported media types.
3. Retrieve a broad candidate field using existing metadata and relationships
   without changing source records or pre-existing organization. When Jamie has
   authorized it, write only additive workspace albums and membership pointers
   under the named workspace namespace.
4. Inspect pixels locally. Keep previews offline, stripped of unnecessary
   metadata, and bound to the frozen run.
5. Classify visible fit, uncertainty, safety state, and error category. Keep an
   unclassified field rather than forcing every image into an existing story.
6. Evaluate a deterministic sample across every view, then revise retrieval,
   exclusions, quotas, and hold rules in response to observed errors.
7. Produce an editor field only after source, privacy, safety, uniqueness, and
   coverage checks pass.
8. Let human editors make selects and record what the image contributes. A
   visual lead enters the Knowledge Wiki as an inquiry, not a claim.
9. Build a publication candidate only from selected images with complete human
   review requirements.
10. Publish the smallest sufficient set, then verify the deployed files,
    captions, credits, crops, alt text, routes, and indexing context.

### Public repository artifacts

Permitted public artifacts may include:

- this RFP and later accepted operating documentation;
- evaluation schemas and synthetic fixtures that contain no personal archive
  data;
- redacted aggregate run receipts that cannot identify people or reconstruct
  the source corpus;
- Knowledge Wiki inquiries and asset records with explicit limits;
- approved derivatives and their exact publication records; and
- photo-editor briefs that disclose no protected source coordinates.

Every public artifact remains subject to the repository's existing public
safety, claim, citation, collective-credit, and selective-projection controls.

## Security and privacy

The archive is private by default. Likely leakage paths include EXIF and GPS,
faces and People labels, OCR, filenames, screenshots, contact sheets, private
albums, household interiors, minors, identity documents, medical or financial
records, legal or campaign strategy, and combinations of otherwise innocuous
metadata.

Controls must fail closed:

- no external upload of originals or previews;
- no public source paths, local identifiers, face labels, raw OCR, or exact
  coordinates;
- no direct write access to the Photos database; bounded workspace additions
  must go through the permissioned Photos API helper;
- no moving, deleting, editing, or changing metadata, People associations,
  favorites, or membership in pre-existing albums;
- no release from HOLD by an automated score;
- no claim that matching counts prove matching source membership;
- no use of archive access as evidence of authorship or permission; and
- no public artifact until a decoded-leakage and reconstruction-risk review
  passes.

The private workspace design, credentials, and machine-specific paths must be
specified separately and must not be committed to this public repository.

## Publication workflow

A photograph may reach a public surface only when the exact candidate records:

- source and version identity;
- photographer and credit status;
- depicted-person consent state where applicable;
- rights and license state;
- safety and privacy review;
- supported context and prohibited inferences;
- approved crop or edit limits;
- caption and alt-text review;
- exact destination and duration of use; and
- Jamie's final editorial approval.

Selection, model confidence, evidentiary usefulness, prior public appearance,
or presence in an editor field does not substitute for these gates.

## Rollout plan

1. **Proposal:** Review this public design and identify which decisions belong
   in a private companion specification.
2. **Private orientation:** Establish the machine profile, access method,
   source freeze, source-record guarantees, authorized workspace namespace,
   and recovery procedure.
3. **Bounded pilot:** Choose one small, low-risk question and create a private
   candidate field without publishing images.
4. **Evaluation:** Test retrieval quality, sensitive-material holds, duplicate
   handling, uncertainty, and source-drift failure modes with a separate
   holdout.
5. **Editorial field:** Invite human review of a versioned set and preserve
   corrections, disagreement, and non-selection.
6. **Publication pilot:** Prepare a very small exact candidate and complete all
   rights, consent, credit, context, accessibility, and deployment gates.
7. **Observation:** Review the deployed use and record corrections before this
   practice becomes a recommended default.

Rollback means removing the public derivative and projection while preserving
the private source and decision record. Rollback does not erase a rights or
consent issue that has already occurred; publication must therefore remain
conservative.

## Decision gates

Before advancing from `proposed`:

- Jamie approves the intended relationship between the private archive,
  Knowledge Wiki, portfolio, and any future private repository.
- The private workspace owner, storage boundary, backup posture, and access
  method are named outside public Git.
- The first pilot question and exclusion boundaries are chosen.
- The workflow demonstrates that it cannot mutate source records or
  pre-existing organization and cannot write outside the authorized workspace
  namespace.
- Synthetic tests demonstrate fail-closed behavior for source drift, sensitive
  material, holdout contamination, and publication-boundary leakage.
- Human authorities for identity, rights, consent, credit, safety, and final
  publication are explicit.

No automated test, agent panel, or merged proposal can advance a decision
reserved for Jamie or another rights holder.

## Drawbacks

- Private-first fieldwork is slower than bulk export or automated gallery
  generation.
- Rights, consent, and authorship may remain unresolved for historically
  important images.
- The archive's scale can create false confidence in comprehensiveness while
  cloud state, duplicates, missing assets, and metadata drift remain real.
- Human review at meaningful scale requires time, attention, and emotional
  capacity.
- A public/private split creates maintenance work and requires disciplined
  redaction and candidate binding.
- Visual discovery can tempt editors to narrate beyond what an image supports.

## Alternatives

- **Do nothing:** Safest for privacy, but leaves a major lifetime record
  unavailable to Jamie's present work.
- **Manual browsing only:** Valuable and should remain part of the practice,
  but difficult to reproduce or hand off across a very large archive.
- **Bulk public upload:** Fast, but unacceptable for privacy, consent, rights,
  context, and editorial quality.
- **Cloud-first AI cataloging:** Potentially convenient, but conflicts with the
  default prohibition on uploading protected pixels and metadata.
- **Project-by-project folders without a shared method:** Lower initial cost,
  but likely to duplicate work and lose corrections, uncertainty, and rights
  history.

The proposed direction combines human looking with bounded local computation
because neither is sufficient alone.

## Unresolved questions

- Which private repository or workspace should hold machine profiles, manifests,
  previews, and publication-clearance records?
- What is the exact accessible still-photo population after cloud materialization
  and media-type filtering?
- Which project or question is the safest and most useful first pilot?
- Which existing albums, People associations, edits, favorites, and prior
  selections may guide retrieval without becoming narrative authority?
- Who should participate in the first human editorial review?
- How should collaborator corrections and withdrawal requests propagate to
  private fields, Knowledge Wiki records, and public derivatives?
- Which aggregate run facts are useful enough to retain publicly without
  increasing reconstruction risk?
- How should approved photo derivatives be versioned when a crop, caption,
  credit, consent state, or destination changes?
