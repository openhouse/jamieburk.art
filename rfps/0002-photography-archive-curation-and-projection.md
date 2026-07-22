---
rfp: 2
title: Photography archive curation and public projection
stage: proposed
start_date: 2026-07-22
authors:
  - Jamie Burkart
  - Codex (AI-assisted drafting)
champion: unassigned
decision_owner: Jamie Burkart
review_areas:
  - privacy-governance
  - research-operations
  - knowledge-architecture
  - public-portfolio
  - editorial
  - accessibility
  - developer-experience
implementation: null
supersedes: []
superseded_by: null
---

# Photography archive curation and public projection

## Summary

Develop a private-first, source-preserving practice for researching Jamie's
lifetime photography archive and selecting a small number of images for
Knowledge Wiki research, portfolio storytelling, applications, and other
specifically approved public uses. Jamie reports that the archive contains
more than 600,000 photographs; that quantity is an orientation, not an audited
corpus claim. The proposed system keeps originals and sensitive metadata
outside public Git, makes selection and exclusion reviewable, and requires
separate human decisions for factual interpretation, rights, consent,
attribution, editing, and publication.

## Motivation

The Knowledge Wiki already identifies visual evidence as a material blind spot.
Its current visual-evidence index distinguishes approved public media,
metadata-only evidence, held cohorts, and missing or research-needed images.
The portfolio would benefit from scenes that show Jamie working, collaborators
using shared systems, artifacts in context, and places changing over time.

The archive may also reveal evidence and questions that textual research has
not surfaced. A photograph can help locate a date, object, place, sequence, or
relationship. It cannot by itself establish authorship, consent, causality,
attendance, impact, or permission to publish.

Without a governed practice, the archive's scale creates predictable risks:
irreproducible selection, loss of provenance, overreading, exposure of private
people or places, accidental publication, duplicate labor, and attractive
images displacing more truthful ones.

## Goals

- Preserve original files, metadata, identifiers, and version history.
- Let Jamie, trusted photo editors, and bounded agents research the archive
  through explicit project and narrative questions.
- Connect visual candidates to Knowledge Wiki projects, claims, inquiries,
  scenes, people, places, and protected boundaries without making the public
  Wiki a photo database.
- Record why an image was selected, held, rejected, or deferred.
- Distinguish visual observation from factual inference and public claim.
- Require asset-specific rights, consent, attribution, crop, caption, context,
  and publication decisions.
- Produce purpose-specific photo-editor briefs and small review sets rather
  than an undifferentiated archive browser.
- Allow visual findings to re-enter the Knowledge Wiki as research leads.

## Non-goals

- Uploading the archive, its full manifest, or private metadata to GitHub.
- Building a public archive browser, private document browser, CMS, search
  product, analytics system, or AI chatbot for V1.
- Replacing Apple Photos or another source library as the original-media
  authority.
- Modifying, deleting, reorganizing, deduplicating, or correcting source media.
- Inferring consent, identity, sensitive traits, or publication permission.
- Using face recognition or biometric indexing.
- Training a model on the archive through this proposal.
- Treating aesthetic quality, model confidence, or relevance as safety
  clearance.
- Requiring comprehensive description of the archive before useful selections
  can begin.

## Terminology

- **Source archive:** The original private media library and its authoritative
  metadata. It remains outside this repository.
- **Archive representation:** A bounded, read-only inventory or index derived
  from the source archive for a declared research purpose.
- **Brief:** A question-led request describing a project, scene, supported
  claim, time or place clues, desired function, and protected boundaries.
- **Candidate:** An image proposed for review. Candidate status grants no
  publication permission.
- **Select:** A candidate Jamie or an authorized editor considers effective for
  a specific use. Selection is not rights or consent clearance.
- **Hold:** A candidate that must not advance because safety, provenance,
  identity, rights, consent, factual, or editorial questions remain.
- **Publication candidate:** A select with recorded provenance, factual scope,
  rights and consent disposition, attribution, caption, crop limits, intended
  surface, and Jamie's approval for that exact use.
- **Public derivative:** The approved exported rendition used on a named public
  surface. It is distinct from the private original.

## Detailed design

Use a private-first pipeline that begins with a brief and ends, only when every
gate is satisfied, with one purpose-specific public derivative and a governed
Knowledge Wiki asset record.

The current portfolio supplies three foundations:

- [`visual-evidence.md`](../docs/knowledge-bank/indexes/visual-evidence.md)
  defines approved, metadata-only, held, and research-needed visual states.
- [`blind-spot-evaluation-controls.md`](../docs/knowledge-bank/projects/blind-spot-evaluation-controls.md)
  calls for a three-project pilot covering rights, consent, provenance,
  caption, and evidentiary function.
- [`intake-and-maturation.md`](../docs/knowledge-bank/intake-and-maturation.md)
  allows photographs to enter as research leads without becoming claims.

The repository does not currently contain a governed representation of the
full archive, a visual selection ledger, a private rights-and-consent register,
or an approved cross-project photo-editing workflow. Those absences are honest
current states.

The public-safe
[`photography/` working notebook](../docs/knowledge-bank/photography/README.md)
is an authorized documentation and editorial experiment within the existing
Knowledge Wiki. It can hold questions, methods, and aggregate observations, but
it does not implement archive access, a private representation, candidate
selection, rights review, or public projection. Those remain governed by this
proposal's later decision gates.

### Components and ownership

| Component | Canonical owner | Purpose | Must never contain |
| --- | --- | --- | --- |
| Source archive | Jamie | Original media and authoritative metadata | Agent-authored destructive edits |
| Private archive representation | Jamie | Read-only discovery, stable private identity, and reproducibility | Public URLs or implied publication status |
| Brief | Knowledge Wiki plus Jamie | Project question, claim scope, desired scene, and boundaries | Private locators or unsupported claims |
| Candidate set | Jamie or authorized editor | Small purpose-specific review collection | Automatic approval or public projection |
| Private review ledger | Jamie | Selection, provenance, safety, rights, consent, caption, and use decisions | Public-repository secrets or unnecessary sensitive detail |
| Public asset record | Knowledge Wiki | Public-safe identity, evidentiary function, attribution, boundaries, and approval state | Private paths, faces-as-identifiers, or protected metadata |
| Public derivative | Portfolio asset surface | Exact approved rendition for an exact approved use | Unapproved people, context, crop, or metadata |

The public repository may contain aggregate method documentation, public-safe
asset records, approved derivatives, and reproducibility contracts that reveal
no private locators. It must not contain the private master manifest, rejected
or held previews, faces or names used for private discovery, precise private
locations, device identifiers, or source-library credentials.

### Data and control flow

1. Start from a Knowledge Wiki project, claim, inquiry, scene, or application
   need and write a bounded brief.
2. Jamie authorizes a specific archive representation and access scope.
3. A read-only process proposes a small candidate set with private stable IDs
   and reproducibility receipts.
4. Jamie or an authorized photo editor reviews visual quality, narrative
   function, duplication, chronology, and context.
5. Held candidates stop. No ranking pressure, quota, or model score can clear a
   hold.
6. Remaining candidates receive separate provenance, factual-scope, rights,
   consent, attribution, caption, crop, and intended-use review.
7. A visual observation may create or update a research inquiry. It does not
   promote itself into a claim.
8. Jamie approves an exact rendition for an exact surface.
9. Only the approved derivative and public-safe asset record enter the public
   repository.
10. Any change to image, crop, caption, claim, surface, or audience returns to
    review.

### Interfaces and contracts

An implementation proposal should define structured contracts for brief
identity and purpose, source-representation identity and date, exact candidate
membership, selection state, visual observations and prohibited inferences,
related Knowledge Wiki record IDs, creator and contributor attribution,
depicted-person and place sensitivity, rights and consent status, caption and
crop approval, intended surface and audience, exact derivative checksum, and
the human reviewer, decision date, and bounded rationale.

The contracts should fail closed when source identity, membership, previews,
receipts, or approvals drift. Matching counts alone must not establish matching
candidate membership.

## Security and privacy

Photographs may reveal homes, workplaces, children, health, relationships,
protests, legal or financial circumstances, private rituals, precise location,
community membership, or other facts that were never offered for publication.
Context collapse is a safety risk even when an image was once public.

Rights, consent, factual relevance, aesthetic strength, and publication are
separate dimensions. Ownership of a file does not necessarily establish
copyright, consent of represented people, trademark clearance, property
permission, or ethical fitness for a new context. A private repository would
reduce exposure risk but would not grant universal permission.

The minimum public state is an opaque asset identity and bounded summary.
Detailed private decisions remain outside public Git. Any uncertainty that
could materially affect a person or community results in a hold until an
authorized human resolves it.

Archive access must be explicit, purpose-limited, and revocable. Implementations
must be read-only against the source by default, minimize copied metadata, keep
private previews and manifests out of logs and Git, and provide recovery from
interrupted or stale runs. Agents may not clear safety, rights, consent, or
publication holds.

## Publication workflow

Publication begins only after a candidate survives editorial review and has an
asset-specific provenance, factual-scope, attribution, rights, consent, caption,
crop, surface, and audience decision.

The public commit may contain only the approved derivative and a public-safe
Knowledge Wiki asset record. It must not contain source locators, private
previews, rejected candidates, sensitive metadata, or the private review
ledger. Alt text must describe the relevant visible content without introducing
unsupported identity or factual claims.

Jamie approves the exact rendition, caption, crop, claim relationship, surface,
and reviewed commit. Rights holders and represented people retain their own
authority. Automated checks may verify completeness and drift; they cannot
grant permission or determine that publication is worthwhile.

Revocation or materially changed consent must remove the public projection and
update the asset record without erasing the decision history that can safely
remain public.

## Rollout plan

### Stage 0: Proposal review

Agree on pilot questions, projects, private access method, reviewers, and
stopping conditions. No archive access occurs in this stage.

### Stage 1: Read-only technical probe

With explicit authorization for a named source representation and bounded
sample, demonstrate nonmutation, stable private identity, reproducible
membership, material previews, and no public leakage. The sample is discarded
or retained according to Jamie's private custody decision.

### Stage 2: Three-project pilot

Jamie selects three briefs that test different narrative and safety problems.
Each project receives a complete candidate disposition, explicit holds, and a
documented decision about whether any image should advance. A pilot can succeed
with zero publication candidates.

### Stage 3: Public projection trial

At least one fully reviewed publication candidate is rendered on noindex
staging. Verify the exact derivative, alt text, caption, crop, responsive
behavior, claim relationship, and surrounding page composition.

### Stage 4: Practice decision

Accept, revise, defer, or close the practice. Scaling beyond the pilot requires
a separate decision based on measured review burden, source integrity, safety,
editorial usefulness, and actual maintenance experience.

Migration must not reorganize the source archive. Existing public screenshots
and metadata-only records remain under their present governance unless
separately reviewed. New public asset records should use stable Knowledge Wiki
IDs and typed relations.

## Decision gates

The RFP may advance from `proposed` to `exploring` only when Jamie approves the
three pilot questions, private access boundary, authorized reviewers, and probe
stopping conditions.

It may advance to `accepted` only when a bounded probe establishes read-only
operation, exact source and candidate identity, reproducible membership,
material preview integrity, private-output custody, and public-leak prevention;
the implementation and rollback plan must also be reviewable.

The pilot may begin only under explicit implementation authorization. Public
projection requires asset-specific human review and Jamie's approval of the
exact staging candidate. Production use remains separate from staging review.

Deterministic evaluation should verify source and representation identity,
exact candidate membership rather than counts alone, missing or unreadable
material, public/private leakage, valid Knowledge Wiki relationships,
publication-candidate receipt integrity, exact derivative checksums, and
responsive accessible rendering.

Human review must determine truthfulness, narrative usefulness, prohibited
inferences, collective credit, creator attribution, privacy, dignity, safety,
rights, consent, caption, crop, sequence, and whether publication should happen
at all. A safety hold is a human gate and cannot be cleared by an aggregate
score or agent.

## Drawbacks

- The practice introduces private operational infrastructure that requires
  maintenance and careful access control.
- Rights and consent review may be slow or impossible for older images.
- Large-scale indexing can create privacy risks even without publication.
- Automated similarity or quality scoring can reproduce narrow aesthetic
  assumptions and hide meaningful outliers.
- Review receipts can create false confidence if their source or membership
  drifts.
- A technically successful system may impose more editorial burden than it
  removes.
- Portfolio demand can pressure the process toward flattering rather than
  truthful selections.
- The archive may contain difficult personal material whose value is not
  professional or public.

## Alternatives

### Do nothing

Keep the archive private and use only already approved public media. This is
the safest and least costly option, but it leaves an acknowledged evidence and
storytelling gap.

### Manual project-by-project selection

Jamie and a photo editor could search manually without a durable manifest or
workflow. This may be appropriate for urgent needs, but provenance, repeated
labor, holds, and feedback into the Knowledge Wiki would be harder to maintain.

### Public archive product

Publish a browsable archive or full visual chronology. This is rejected for V1
because it would reverse the repository's public/private boundary and create
major rights, consent, privacy, maintenance, and editorial obligations.

### Fully automated ranking

Use computer vision or multimodal models to rank the whole archive. Automated
assistance may later help form candidate sets, but ranking cannot safely replace
source verification, context, human editing, rights, consent, or publication
judgment.

## Unresolved questions

- Which three projects should form the pilot, and what distinct risk or
  narrative problem should each test?
- What source representation can be inspected read-only and reproducibly
  without changing the authoritative library?
- Which private identifiers remain stable across library migrations and edits?
- Who may review private candidate images, and how is access revoked?
- How should photographer, collaborator, and depicted-person attribution be
  represented when authorship or consent is uncertain?
- What is the minimum private rights-and-consent register that remains useful
  without becoming a universal source vault?
- Which selection tasks benefit from automation, and which must remain manual?
- How will removal or changed consent propagate to public derivatives and
  Knowledge Wiki records?
- What review-set size is humane and productive for Jamie and a photo editor?
- What conditions would justify scaling beyond three projects?
