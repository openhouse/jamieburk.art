---
rfc: 3
title: Living Photographic Knowledge Loop and Artist-Led Curatorial System
stage: implementing
start_date: 2026-07-24
authors:
  - Jamie Burkart
  - ChatGPT, AI-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - privacy-governance
  - research-operations
  - public-portfolio
  - editorial
  - accessibility
  - developer-experience
implementation: feature/photo-knowledge-B
supersedes: []
superseded_by: null
---

# Living Photographic Knowledge Loop and Artist-Led Curatorial System

> **Repository note**
>
> This repository uses Ember-inspired **Requests for Comments (RFCs)**. This
> document is **RFC 0003**, a durable, reviewable proposal for a substantial
> cross-system design.
>
> This proposal complements, rather than supersedes,
> [RFC 0002: Lifelong Photo Archive Selection and Publication](./0002-lifelong-photo-archive-selection-and-publication.md).
> RFC 0002 establishes the private-archive, selection, rights, and publication
> boundary. RFC 0003 specifies the living knowledge loop among the private photo
> field, artist-led curation, the Knowledge Wiki, public derivatives, page
> placements, visitor encounters, recollection, correction, and future research.

> **Composite revision note**
>
> This revision keeps draft O as the canonical base because it uses the correct
> RFC number, complements RFC 0002 instead of competing with it, and provides a
> complete East River canary. It integrates the strongest compatible ideas from
> drafts A–N: A's multidimensional state and verification model; B's editorial
> doctrine and blind/contextual passes; C's additive-archive/subtractive-portfolio
> rule; D's operating choreography; E's studio/publication-table separation; F's
> protected absence and caption assertions; G's maintenance and usage health;
> H's Photo File Page and selective-materialization thresholds; I's artist-first
> pedagogy, adjacency and wildcard discovery, and pull-request template; J's
> cross-repository publication packet and portfolio editions; K's
> destination-bound workflow and exact-candidate acceptance; L's concise
> edition-centered language; M's implementation and edge-case detail; and N's
> explicit local-agent authority contract and rejection of automated voting as
> artistic decision.
>
> The donor drafts remain useful design history. This document is intended to be
> the single proposal reviewed for acceptance.

> **Implementation authorization**
>
> On 2026-07-26 Jamie Burkart explicitly requested implementation of RFC 0003
> on `feature/photo-knowledge-B`. The RFC is therefore `implementing`. This
> records authority to build and evaluate the canary; it does not close
> production, indexing, rights, consent, final editorial, or deployment gates.

## Summary

Create a living, artist-led photographic knowledge loop connecting Jamie
Burkart's private Apple Photos library, the local-first
[`openhouse/photo-fieldwork`](https://github.com/openhouse/photo-fieldwork)
workflow, the public-safe Markdown-first Knowledge Wiki in this repository, and
the public portfolio application.

The system will keep the private photo archive and its sensitive metadata
outside public Git. Artist-led agentic curatorial teams may work locally against
authorized private image and metadata surfaces, the Knowledge Wiki, and a local
development checkout. Their selections, sequence proposals, crop proposals,
captions, questions, and holds will be recorded as versioned curatorial work,
not as automatic publication decisions.

A photograph that becomes consequential to research, curation, or publication
will receive a stable Knowledge Wiki asset record. That record will distinguish:

- source identity from the public derivative;
- documented metadata from visible observation;
- first-person recollection from curatorial interpretation;
- creator attribution from archive custody;
- permission evidence from public permission status;
- a photograph from a particular page placement;
- staging selection from production approval;
- public use from future unrestricted use.

The public site will remain a selective, composed present-tense experience.
The Knowledge Wiki will preserve the deeper and changing understanding around
the image. Encounters with staging or production may prompt Jamie,
photographers, collaborators, or other authorized people to add recollections,
correct attribution, identify related frames, or open new research inquiries.
Those returns may inform later curatorial work without automatically changing
the current site.

The first complete canary will be the 2022 East River photograph currently used
as the Layout C homepage hero. The first iteration will preserve its current
composition, add the newly confirmed photographer credit to Elana Gordon,
record the permission scope privately and safely, create a first-class Wiki
asset record and placement record, and record Jamie's canoe-commuting
recollection as a distinct dated source.

The governing principle is:

> **Artists choose. Archival production supports. The Knowledge Wiki remembers.
> Rights govern. The portfolio composes. Jamie decides what becomes public.**


The archive expands additively; the portfolio composes subtractively. The
primary evaluative object is not an isolated photograph but a complete
occurrence:

```text
image + crop + typography + copy + caption + credit + sequence + viewport + action
```

The public site is one dated **portfolio edition**, not the final interpretation
of the archive. A strong photograph may remain unused, a modest photograph may
become extraordinary in one exact composition, and a new recollection may deepen
the Wiki without changing the current page.

## Motivation

### The repository now has the right constituent systems, but not yet one living loop

The repository already contains a public-safe Knowledge Wiki, structured claim
and evidence records, selective public projections, evaluation tooling,
photographic experiments, and several strong frontend candidates.

The adjacent `photo-fieldwork` repository already provides a local-first,
private-by-default workflow for:

- large-archive retrieval;
- deduplication and burst control;
- editor-view assignment;
- safety holds;
- verified local visual review;
- evaluation sampling;
- default-closed publication clearance;
- destination-bound publication handoff;
- read-only Apple Photos verification.

Its central distinction is already correct:

```text
Metadata answers: Why might this photograph be relevant?
Visible evidence answers: What can an editor actually see here?
Provenance answers: What can we responsibly claim about it?
```

The current portfolio branches also establish important precedents:

- `feature/photos-B` proves that one image can be encountered and selected
  privately without publishing the image or leaking source fingerprints.
- `feature/photos-D` creates a 1,000-image editor-ready private field while
  committing no photographs.
- `features/layout-C` demonstrates a restrained public composition with four
  manifest-bound photographs and a strong role-first East River hero.
- `features/layout-E` demonstrates a richer public photographic sequence,
  asset-level caption and dignity review, collective-credit language, and
  deliberate withholding of intimate gathering images.

What is missing is a canonical architecture for the relationships among these
systems over time.

### Layout C surfaced a complete example of the desired behavior

The Layout C homepage uses
`apps/www/public/images/field-notes/jamie-east-river.webp` as the lead image.
The first viewport joins:

- the East River and Manhattan Bridge;
- Jamie's body and canoe equipment;
- the literal professional identity
  "Technical Project Manager — Product Operations & Implementation";
- the sentence "I create operating structure for complex public-facing teams";
- immediate Work and Résumé actions;
- the factual caption "At the East River beneath the Manhattan Bridge, 2022."

The composition works because the photograph and the writing do different jobs.
The image creates presence, public landscape, movement, materiality, and
memory. The text gives a hiring reader role clarity and a path forward.

The current Layout C manifest says the image is from Jamie's archive and avoids
asserting third-party authorship. Since that manifest was written, Elana Gordon
has directly confirmed in a private conversation that she made the photographs.
When Jamie asked whether the photographs could be used on his portfolio site,
Elana replied affirmatively and said credit was optional. Jamie chose to credit
her.

That is a model correction:

```text
former state:
  creator unknown or unasserted
  archive custody known

new preferred state:
  creator Elana Gordon
  source first-person confirmation
  permission granted for the portfolio use discussed
  archive custody Jamie Burkart photo archive
```

The private conversation must not be committed. A public-safe record may state
the bounded result and retain only an opaque pointer to private permission
evidence.

### The composition also generated new first-person knowledge

Seeing the selected image in the composed homepage prompted Jamie to remember
and articulate a recurring practice of bicycle–canoe travel:

- a small trailer built from part of an IKEA futon;
- two front forks from children's bicycles;
- a canoe lashed to the trailer;
- a paddle handle fitting beneath the bicycle saddle;
- the paddle lashed to the canoe's nose to create a useful offset;
- one part performing several transportation and coupling functions;
- people, bikes, canoe, land, and water forming a lightweight participatory
  operating system for moving through the city differently.

This recollection was not available to the curatorial team when it selected the
image. The selection was still excellent. The later recollection deepens the
Knowledge Wiki and may inform future queries, sequences, writing, or research.
It does not require enlarging the homepage caption.

This is the central opportunity:

> A public composition can become a research encounter. The encounter can
> return new first-person knowledge to the Wiki. The enriched Wiki can help
> future artists see relationships that earlier artists could not yet know.

### A static website cannot carry the full life of the archive

The public portfolio is necessarily a snapshot and an edit.

A stable photograph may acquire:

- a corrected creator;
- a more precise date;
- a safer location description;
- new related frames;
- a first-person recollection;
- a collaborator's correction;
- a changed rights scope;
- a better crop;
- a new sequence;
- a different public function;
- a revocation or takedown;
- a new relation to another project.

If the only authoritative record is a TypeScript object embedded in one layout,
future work must reconstruct the deeper context from scratch.

A resilient Knowledge Wiki allows the current public page to remain short while
the understanding around it remains open to revision.

### The archive is far larger than the public site should ever be

Jamie reports a private library of more than 600,000 photographs. This is
planning context, not an audited public metric. The scale makes manual memory
alone insufficient, but it does not justify one Markdown record per source
asset or a public archive browser.

The architecture must support:

```text
hundreds of thousands of private source assets
→ bounded private retrieval fields
→ tens or hundreds of consequential Wiki records
→ a few dozen public candidates
→ a smaller, carefully composed live portfolio
```

### The curatorial process should remain artist-led

The system should enable an agentic role-play curatorial studio informed by
publicly grounded perspectives associated with:

- Prof. Ingeborg Gerdes;
- Prof. Margaret Morse;
- Zora Neale Hurston;
- Jonas Mekas;
- Vivian Gornick;
- Deborah Treisman.

These are simulated reading lenses, not the actual people, endorsements, or
private beliefs. The system should not imitate private speech or claim that a
named person made a selection.

The panel's purpose is not to assign a universal score. It is to help an
artist-led team look closely, surface alternatives, preserve dissent, and make a
strong compositional proposal.

Archival and technical systems should amplify the artists' looking rather than
pre-decide the edit.

## Goals

- Preserve Apple Photos as the private source authority without mutating source
  media or private human organization.
- Use `photo-fieldwork` as the local retrieval, selection, review, provenance,
  and destination-bound handoff layer.
- Create a first-class Knowledge Wiki asset record for every photograph or
  image set that becomes materially relevant to research, curation, correction,
  or public use.
- Maintain a durable private binding between a public-safe Wiki asset ID and the
  corresponding source asset in Apple Photos.
- Distinguish source asset, public derivative, curatorial proposal, selection
  decision, page placement, permission evidence, and first-person recollection.
- Support factual statements with property-level references, qualifiers,
  precision, and preferred/deprecated status.
- Allow committed public derivatives to render directly in VS Code and GitHub
  Markdown previews from their Wiki pages.
- Allow private local previews in an ignored or private companion workspace
  without making private pixels or locators part of public Git.
- Keep artist-led page composition manual and intentional.
- Give artist agents powerful local affordances for retrieval, comparison,
  sequence-building, crop testing, and source return.
- Preserve curatorial alternatives, dissent, and holds without forcing them
  onto the public site.
- Support exact-surface rights, permission, credit, represented-person, and
  dignity review.
- Record visitor, collaborator, photographer, and Jamie encounters as dated
  recollections, corrections, or inquiries.
- Permit future bounded claims about recurring practices or documented events,
  such as a lower-bound count of distinct canoe journeys, only after
  event-level clustering and human review.
- Make public attribution and caption corrections durable and auditable.
- Support revocation, takedown, supersession, and rollback.
- Produce a visitor experience that is memorable, warm, accessible, role-clear,
  and substantially lighter than the archive behind it.
- Keep final editorial and publication authority human.
- Preserve a two-pass curatorial method: blind visual encounter before deep
  contextual return.
- Balance context-rich retrieval with adjacency and wildcard discovery so the
  existing Wiki does not select only what it already understands.
- Treat the complete page occurrence and the dated portfolio edition as
  first-class editorial objects.
- Preserve protected absence when an image, identity, place, or story is
  intentionally withheld.
- Generate usage, correction-impact, stale-review, permission, and placement
  health views without turning generated views into authored truth.
- Provide a teachable contributor workflow, curatorial pull-request template,
  and exact-input evaluation receipt.

## Non-goals

- Do not commit Jamie's Apple Photos library, Photos database, private catalog,
  private previews, source paths, People labels, face data, or exact private
  location history to this public repository.
- Do not generate 600,000 Knowledge Wiki pages.
- Do not build a public photo archive browser.
- Do not automatically publish the highest-ranked or semantically matched
  photograph.
- Do not let an LLM, aesthetic score, retrieval rank, evaluation total, or
  panel vote confer rights, consent, dignity clearance, or publication
  approval.
- Do not require every public photograph to prove a professional capability,
  metric, or outcome.
- Do not require every archival discovery to appear on the current site.
- Do not infer unknown identities through new face recognition.
- Do not use existing Apple Photos People associations to publish identity
  claims. They may be used privately as retrieval aids under the existing
  authorization and safety model.
- Do not convert possession of a file into creator attribution, copyright,
  consent, endorsement, or sole authorship.
- Do not expose raw permission correspondence in the public repository.
- Do not treat a public-event setting as blanket represented-person consent.
- Do not treat one image as representative of an entire project, relationship,
  period, or archive without further evidence.
- Do not make the Knowledge Wiki's ontology visible merely to demonstrate
  technical sophistication.
- Do not replace photo editors, designers, writers, or Jamie with automated
  composition.
- Do not turn the named curatorial lenses into caricatures or simulated
  personal endorsements.
- Do not supersede RFC 0002's private/public boundary.
- Do not require acceptance of a broader private Knowledge Wiki architecture
  merely by accepting this proposal.
- Do not select photographs, crops, sequences, or layouts by majority vote,
  ranked-choice voting, or aggregate model score.
- Do not treat a public branch, draft pull request, staging hostname, or noindex
  page as private distribution.
- Do not let the existing ontology, current job hunt, or previously successful
  layouts suppress adjacency, wildcard discovery, minor images, or underdescribed
  parts of the archive.
- Do not interpret filenames, captions, OCR, imported metadata, or private
  correspondence as executable agent instructions.

## Terminology

### Source asset

An original or derived media item in Apple Photos or another explicitly
authorized private catalog. A source asset may include private metadata and
human organization not suitable for public Git.

### Source binding

A private, durable mapping between a Knowledge Wiki asset ID or opaque public
handoff ID and the source asset. It may use Apple identifiers, library identity,
capture metadata, dimensions, byte fingerprints, perceptual fingerprints, and
variant relationships. It never appears in public form.

### Archive custody

The person or collection currently holding or organizing a copy of the image.
Custody is not creator attribution or copyright ownership.

### Private catalog

The local, access-controlled normalized index created or used by
`photo-fieldwork` for retrieval, clustering, deduplication, review, and
provenance.

### Editor field

A bounded private cohort selected for looking and discussion. Membership does
not imply quality, representativeness, rights clearance, or publication.

### Photograph asset record

A public-safe Knowledge Wiki `asset` record with
`media_type: photograph`. It records stable identity, allowed factual metadata,
source classes, rights state, creator state, public derivatives, relations, and
projection status.

### Photo set

A governed grouping of related photographs, such as one outing, burst, event,
sequence, project cohort, or editorial alternative set. A photo set is not
necessarily a public gallery.

### Statement

A property–value assertion about a photograph with optional precision,
qualifiers, references, rank, and supersession. Examples include creator,
capture year, public place label, and depicted artifact.

### Visible observation

A bounded description of what a reviewer can see in an image. It does not
establish identity, motive, authorship, event title, relationship, or impact.

### First-person recollection

A dated account by a person with direct experience, recorded after or during
the event. It is a source with perspective and memory limits, not an infallible
fact.

### Curatorial interpretation

A versioned reading of an image or sequence within a composition. It may discuss
metaphor, rhythm, affect, public meaning, or editorial function. It is not
silently converted into documentary fact.

### Curatorial proposal

A versioned proposal containing one or more selected images, placements, crops,
captions, sequence notes, alternatives, holds, dissent, and rationale.

### Selection decision

A bounded decision to advance, hold, reject, withdraw, or supersede a
curatorial proposal for a named purpose.

### Public derivative

A metadata-stripped, web-ready image file exported from a private source asset
for named allowed uses. It has stable public identity, dimensions, checksum,
alt text, caption, credit, crop information, and review state.

### Placement

A use of one public derivative on one named surface, route, component, and
responsive crop. Publication is placement-specific rather than one global
Boolean on the photograph.

### Permission capsule

A public-safe summary of private permission evidence, linked by an opaque
private reference. The underlying message, email, or contract remains private.

### Represented-person review

A human review of dignity, privacy, context, and potential harm for people
depicted in an image. It is separate from photographer copyright permission.

### Visitor encounter

A dated response to a public or staging composition that may produce
recollection, correction, discomfort, recognition, or new inquiry.

### Research return

New knowledge or a new question generated by archival or curatorial work and
returned to the canonical Knowledge Wiki.

### Documented-instance lower bound

A count of distinct, human-reviewed event or practice instances recoverable from
the declared archive scope. It is stated as "at least" and is not a claim about
everything that occurred.

### Canary

A deliberately bounded first implementation used to validate architecture,
privacy, correction, publication, and rollback before wider adoption.

### Curatorial session

A versioned artistic working process bound to a brief, bounded candidate field,
input receipt, page context, panel configuration, model configuration,
proposals, alternatives, dissent, source-return requests, and human gates.

### Source return

The deliberate move from a candidate or public derivative back to its private
source asset, neighboring frames, metadata, related records, and unresolved
questions.

### Caption assertion

One independently reviewable factual proposition contained in a caption or
credit. A public sentence may contain several caption assertions with different
sources and confidence.

### Protected absence

An image, identity, location, story, or relationship intentionally withheld from
one or more public surfaces. Protected absence is a governed state, not a missing
record to be automatically filled.

### Public occurrence

One exact use of a public derivative in a named composition, including route,
component, crop family, caption, credit, sequence position, viewport behavior,
and approval state. A public occurrence is the photography-specific subtype of
a Knowledge Wiki projection.

### Portfolio edition

A named, dated, Git-versioned public composition assembled for one present
audience and purpose. A later edition may make different choices without
silently rewriting the earlier edition's decision history.

### Publication packet

A destination-bound, default-closed handoff from the private Photo Fieldwork
trust domain to the public repository. It contains only allowlisted derivative,
identity, provenance, transform, caption, credit, permission-summary, and
placement data needed for one proposed public use.

### Visitor problem

The concrete comprehension, orientation, memory, or action need that motivates
a photographic commission. Curatorial work begins by naming the visitor problem,
not by asking for a generically attractive image.

### Development panel and holdout panel

A development panel may inform iterative composition. A holdout panel reviews a
frozen exact candidate without supplying revision guidance during the same
iteration. Both are simulated diagnostic tools unless real named humans perform
the review.

## Detailed design

### 1. Architectural principles

#### 1.1 Artists author; systems support

The intended direction is:

```text
artist asks
→ archive producer retrieves
→ artist looks
→ knowledge steward contextualizes
→ artist composes
→ frontend team realizes
→ independent gates protect
→ visitor encounters
→ recollection or correction returns
```

It must not become:

```text
classifier scores
→ system declares winners
→ artists decorate the result
```

The system may block an unsafe, unsupported, inaccessible, or rights-invalid
proposal. It may not determine taste by score.

#### 1.2 Compose pages, not isolated winners

The primary artistic object is the complete composition:

```text
image + crop + typography + copy + caption + credit + sequence + viewport + action
```

A strong source image may be wrong for a homepage. A quiet photograph may be
indispensable in one exact page. The same derivative may have several public
occurrences with different editorial functions.

#### 1.3 Sequence before emblem

Before elevating one frame as representative, preserve and inspect:

- neighboring frames;
- bursts and variants;
- preparation and aftermath;
- arrivals and departures;
- tools, repair, and maintenance;
- alternate points of view;
- the images that resist the current story.

The workflow should make it possible to understand the sequence even when only
one image is ultimately public.

#### 1.4 The archive expands additively; the portfolio composes subtractively

The private catalog and Knowledge Wiki may gain records, relations,
recollections, alternatives, and corrections. The public portfolio should use
only what its current visitor and editorial purpose require.

Factual maturity does not imply public selection. Public safety does not imply
compositional necessity. A rich record may remain absent from the site.

#### 1.5 The source remains private and non-destructive

Apple Photos remains the source authority for media and existing human
organization. The workflow reads from approved interfaces and never writes
directly to the Photos database.

`photo-fieldwork` may create approved version folders and albums through a
reviewed writer adapter. The source media, earlier albums, and pre-existing
organization remain unchanged. Every write is planned, idempotent, receipted,
and independently verified.

#### 1.6 Full local capability does not imply total disclosure

An authorized local curatorial run may use available metadata, Places, dates,
albums, variants, existing Apple People associations, local pixels, and the
Knowledge Wiki. It must retrieve iteratively into bounded fields rather than
load or transmit the whole private archive.

The public repository receives only allowlisted, destination-specific material.

#### 1.7 The private archive and the public repository have separate trust domains

The private domain may contain:

- source pixels;
- exact asset identifiers;
- original filenames;
- EXIF and Apple metadata;
- GPS;
- People associations;
- private albums;
- private previews;
- permission correspondence;
- full recollections;
- source fingerprints;
- local paths;
- unresolved sensitive interpretations.

The public repository may contain:

- schemas;
- synthetic fixtures;
- public-safe aggregate receipts;
- approved public derivatives;
- public-safe asset records;
- factual captions;
- credits;
- safe place and date precision;
- public-safe permission status;
- curatorial decisions and rationales that are themselves safe to publish;
- explicit open questions and human gates.

A fact being useful to a local agent does not make it safe to commit.

#### 1.8 Public Git is publication

A derivative committed to a public branch is already distributed, even if:

- the branch is unmerged;
- the pull request is a draft;
- the site is staging-only;
- the page is noindex;
- the asset is not linked from navigation.

An uncleared candidate remains in Photo Fieldwork, an ignored local review
workspace, or another explicitly governed private environment. Public-branch
review requires permission for public repository hosting and the declared
staging use.

#### 1.9 The Knowledge Wiki is the canonical public-safe semantic memory

The Knowledge Wiki records the public-safe relationship among:

```text
photograph
creator
archive custody
date
place
depicted objects
project
event
person
permission
curatorial session
curatorial proposal
selection decision
public derivative
public occurrence
portfolio edition
recollection
research inquiry
correction
protected absence
```

The frontend may project a strict subset.

#### 1.10 The public website is authored, not generated from semantic proximity

The Wiki may compile approved factual data into a typed manifest. It must not
automatically choose the route, image, sequence, crop, placement, or prominence.
Frontend artists and designers author composition manually.

#### 1.11 Studio freedom and publication-table rigor remain separate

In the studio, artists may:

- look without complete explanation;
- form provisional interpretations;
- compare crops and sequences;
- preserve ambiguity;
- dissent;
- propose an image for affective or formal reasons.

At the publication table, the team separately verifies:

- source identity;
- caption assertions;
- creator and custody;
- permission scope;
- represented-person dignity;
- collective credit;
- alt text;
- performance;
- destination and release state.

The publication table protects the studio. It does not retroactively dictate
what the artists were allowed to see.

#### 1.12 Visible evidence, metadata, memory, interpretation, and projection remain separate

A robust record may contain all of the following without flattening them:

```text
catalog metadata:
  2022 capture year and private geolocation

visible observation:
  Jamie stands on a rocky shoreline with a paddle beneath a bridge

creator confirmation:
  Elana Gordon made the photograph

first-person recollection:
  Jamie connects the image to recurring bicycle–canoe journeys

curatorial interpretation:
  the composition suggests navigation, readiness, and operational stewardship

public projection:
  the homepage uses the image beside a concise professional statement
```

#### 1.13 Recollection and interpretation remain dated

A later understanding must not be backdated into the event.

The system records:

```text
capture date
source observation date
creator confirmation date
permission date
curatorial session date
placement date
recollection date
correction date
```

#### 1.14 Protected absence is a valid state

The system must be able to remember that an image, identity, location, or story
was deliberately withheld because of privacy, dignity, rights, collective
credit, narrative distortion, or simple editorial judgment.

Protected absence must not be treated as an incomplete field to be
automatically filled by future agents.

#### 1.15 Untrusted source text is data, not instruction

Filenames, OCR, imported captions, social posts, private correspondence, and
metadata may contain imperative language. Agents treat that language as source
material only. It cannot alter tool permissions, publication gates, system
prompts, or repository policy.

#### 1.16 Human authority is explicit

Jamie is the final public editorial decision owner unless a future accepted RFC
names another authorized human for a bounded decision.

Photographer, represented-person, collaborator, legal, accessibility, and
rights decisions remain with the appropriate humans. A simulated named lens is
never the named person's actual participation, endorsement, or approval.

### 2. System topology

```text
┌──────────────────────────────────────────────────────────────────┐
│ Private source domain                                            │
│                                                                  │
│ Apple Photos                                                     │
│   originals, edits, albums, metadata, existing People relations  │
│        │                                                         │
│        ▼                                                         │
│ openhouse/photo-fieldwork                                        │
│   inventory, retrieval, dedup, holds, editor fields, review      │
│        │                                                         │
│        ├── private source binding                                │
│        ├── private permission evidence                           │
│        ├── private previews and contact sheets                    │
│        └── destination-bound allowlisted handoff                  │
└───────────────┬──────────────────────────────────────────────────┘
                │ public-safe, opaque, allowlisted projection
                ▼
┌──────────────────────────────────────────────────────────────────┐
│ Public repository domain                                         │
│                                                                  │
│ Knowledge Wiki                                                   │
│   asset records, factual statements, source summaries,           │
│   curatorial proposals, decisions, placements, recollections,    │
│   inquiries, corrections, human gates                            │
│        │                                                         │
│        ├── compiler / validator                                  │
│        ▼                                                         │
│ typed public photo manifest + approved derivatives               │
│        │                                                         │
│        ▼                                                         │
│ Next.js portfolio composition                                    │
│   image, text, type, sequence, crop, caption, visitor path        │
└───────────────┬──────────────────────────────────────────────────┘
                │ encounter, correction, recollection
                ▼
┌──────────────────────────────────────────────────────────────────┐
│ Research return                                                   │
│                                                                  │
│ Jamie / creator / collaborator / visitor review                   │
│        │                                                         │
│        ▼                                                         │
│ new source, correction, recollection, question, or hold           │
│        │                                                         │
│        └──────────────► Knowledge Wiki and future curatorial run  │
└──────────────────────────────────────────────────────────────────┘
```

### 3. Repository structure

This proposal extends the existing compatibility path
`docs/knowledge-bank` rather than creating a parallel `docs/knowledge-wiki`
root.

Proposed authored locations:

```text
docs/knowledge-bank/
├── assets/
│   └── photographs/
│       └── east-river-manhattan-bridge-2022.md
├── indexes/
│   ├── photography.md
│   └── photo-sets/
│       └── east-river-canoe-2022.md
├── evaluations/
│   └── curatorial/
│       └── layout-c-home-east-river-v1.md
├── decisions/
│   └── photography/
│       └── layout-c-home-east-river-v1.md
├── projections/
│   └── photography/
│       └── layout-c-home-east-river.md
├── sources/
│   ├── photo-metadata/
│   │   └── east-river-2022-public-safe.md
│   ├── permissions/
│   │   └── elana-gordon-east-river-portfolio-2026.md
│   └── recollections/
│       └── jamie-canoe-commuting-2026-07.md
└── research-inquiries/
    └── documented-canoe-bike-journeys.md
```

Generated locations:

```text
docs/knowledge-bank/_generated/
├── photography-index.md
├── rights-review.md
├── public-photo-placements.md
└── backlinks/
```

Application locations:

```text
apps/www/public/images/
├── field-notes/
└── photo-fieldwork/

apps/www/src/data/
└── photography.ts
```

During the pilot, `photography.ts` remains human-readable and reviewed but gains
a required `wikiId` and `placementIds` field. After the pilot, the team may
choose to generate its factual asset subset from the Knowledge Wiki while
keeping page composition authored in React and MDX.

Private locations are defined by `photo-fieldwork` and remain outside this
repository.

### 4. Stable source binding

#### 4.1 Private binding requirements

A private binding should survive re-indexing and should not rely on a single
mutable identifier.

It may combine:

- source library identity;
- Apple PhotoKit or Photos asset identifier;
- media type;
- capture timestamp;
- pixel dimensions;
- original or resource filename where available;
- byte fingerprint of a private export;
- perceptual fingerprint;
- original/edited/Live Photo relationships;
- prior source-binding aliases.

The exact fields remain private.

#### 4.2 Public opaque binding

The public-safe Wiki record may contain:

```yaml
private_source_binding:
  provider: photo-fieldwork
  opaque_id: pfwpub_8H4D8B0Z2
```

The opaque ID:

- is generated with private salt or random assignment;
- is not derived from a source filename, count, asset ID, or digest;
- does not reveal library structure;
- resolves only inside the private studio;
- may be rotated through an explicit correction if compromised.

The public repository validator scans current files and branch-introduced
history for protected locators and source fingerprints.

#### 4.3 Selective materialization and promotion threshold

The private catalog may index hundreds of thousands of assets. The Knowledge
Wiki materializes only consequential photographs or photo sets.

Promote an asset to a first-class Wiki record when one or more of the following
is true:

- it is proposed for a public occurrence;
- it becomes significant to a project, chronology, person, place, or practice;
- creator, permission, or represented-person research is underway;
- it prompts a consequential recollection or correction;
- it is needed to preserve a curatorial alternative, dissent, hold, or
  withdrawal;
- it supports a bounded research inquiry;
- it is repeatedly retrieved across independent briefs;
- future teammates would otherwise have to reconstruct the same context.

Do not promote an asset merely because a model assigned a high aesthetic score
or because the private catalog can describe it.

### 5. Photograph asset record

The existing `asset` kind is extended rather than creating a new top-level
`photograph` kind.

Example:

```yaml
---
id: asset.photo.east-river-manhattan-bridge.2022.001
title: East River beneath the Manhattan Bridge, 2022
kind: asset
media_type: photograph
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-24
review_by: 2027-01-24
canonical_path: docs/knowledge-bank/assets/photographs/east-river-manhattan-bridge-2022.md
summary: >
  Public-safe record for a 2022 East River photograph of Jamie Burkart,
  made by Elana Gordon and used as the Layout C homepage hero.

private_source_binding:
  provider: photo-fieldwork
  opaque_id: pfwpub_REPLACE_WITH_PRIVATE_GENERATED_ID

public_derivatives:
  - id: derivative.photo.east-river.layout-c.v1
    path: apps/www/public/images/field-notes/jamie-east-river.webp
    media_type: image/webp
    width: 1280
    height: 960
    checksum: RECOMPUTE
    metadata_stripped: true
    status: staging-candidate

statements:
  - id: statement.photo.east-river.creator.v2
    property: creator
    value: person.elana-gordon
    rank: preferred
    confidence: high
    references:
      - source.permission.elana-gordon.east-river.2026-07
    supersedes:
      - statement.photo.east-river.creator.unknown.v1

  - id: statement.photo.east-river.capture-year.v1
    property: capture_year
    value: 2022
    precision: year
    rank: preferred
    confidence: high
    references:
      - source.photo-metadata.east-river.2022.public-safe

  - id: statement.photo.east-river.place.v1
    property: public_place_label
    value: place.east-river-beneath-manhattan-bridge
    precision: landmark
    rank: preferred
    confidence: high
    references:
      - source.photo-metadata.east-river.2022.public-safe
      - source.visual-review.east-river.layout-c

  - id: statement.photo.east-river.custody.v1
    property: archive_custody
    value: collection.jamie-burkart-photo-archive
    rank: preferred
    confidence: high
    references:
      - source.jamie-photo-archive-custody

visible_observations:
  - A person in a life vest holds a canoe paddle on a rocky shoreline.
  - The Manhattan Bridge, water, shoreline, and city buildings are visible.

interpretation_boundary: >
  The photograph may support a curatorial reading of public landscape,
  readiness, navigation, and operational stewardship. It does not by itself
  prove a recurring practice, professional role, leadership status, event
  identity, or outcome.

relations:
  - type: part_of
    target: index.photo-set.east-river-canoe.2022
    href: ../../indexes/photo-sets/east-river-canoe-2022.md
    context: One of several photographs from the same outing.

  - type: projected_to
    target: projection.photo.layout-c.home.east-river
    href: ../../projections/photography/layout-c-home-east-river.md
    context: Homepage hero placement in Layout C.

  - type: resulted_in
    target: source.recollection.jamie-canoe-commuting.2026-07
    href: ../../sources/recollections/jamie-canoe-commuting-2026-07.md
    context: Seeing the composed placement prompted a later first-person recollection.
---
```

The body contains:

- the approved public derivative;
- a concise orientation;
- statement provenance;
- current public uses;
- curatorial history;
- open questions;
- correction history;
- links to the photo set, permission summary, and placement.

### 6. Photo File Page and Markdown preview

A promoted public-safe photograph receives a human-readable Photo File Page in
the Knowledge Wiki. The page remains useful even when the image itself is held.

The page should answer:

```text
What is this photograph?
What is established?
What can a reviewer visibly observe?
What metadata and source basis support the record?
Who made it?
Who holds the archive copy?
What permission and credit apply?
What does it relate to?
Which curatorial interpretations have been proposed?
Which recollections or corrections has it prompted?
Where is it used?
What does it not establish?
What remains protected or open?
```

When a public derivative is committed, the asset page may render it using an
ordinary relative Markdown image link:

```markdown
![Jamie Burkart in a life vest holding a canoe paddle on the East River shoreline beneath the Manhattan Bridge.](../../../apps/www/public/images/field-notes/jamie-east-river.webp)
```

This should render in:

- VS Code Markdown Preview;
- GitHub's Markdown renderer;
- local static documentation tools.

Private photographs are not linked from public Markdown. A private companion
workspace may render private previews, but that is a separate trust boundary and
is not authorized by this proposal alone.

The page should not become a wall of metadata. It begins with orientation and
current public uses, then provides provenance, curatorial history, recollection,
open questions, and correction history in progressively deeper sections.

### 7. Statement model

Wikimedia prior art demonstrates the value of separating a media entity from
the pages that use it, and of attaching references, qualifiers, and ranks to
individual statements.

This proposal adopts a limited local version rather than a general RDF or
Wikibase implementation.

Each photo statement contains:

```text
id
property
value
precision or qualifiers
rank
confidence
references
supersedes / superseded_by
```

Allowed initial ranks:

```text
preferred
normal
deprecated
```

Allowed unknown states:

```text
unknown
not-recovered
not-applicable
withheld
```

Examples:

- `creator: Elana Gordon` may be preferred after direct confirmation.
- `creator: unknown` may remain deprecated as historical state.
- `capture_year: 2022` may be preferred from Apple Photos metadata.
- `capture_date: exact day` may remain withheld or not recovered.
- `public_place_label` may intentionally use landmark precision even if the
  private source contains coordinates.
- a curatorial interpretation is never stored as a factual `creator`, `date`,
  or `place` statement.

The compiler validates references and rank conflicts but does not select a
preferred value automatically when the authored record leaves a conflict open.

### 8. Permission and rights model

#### 8.1 Permission capsule

A public-safe permission summary is a `source` record:

```yaml
---
id: source.permission.elana-gordon.east-river.2026-07
title: Elana Gordon permission for East River portfolio photographs
kind: source
source_class: private-permission-summary
status: maintained
visibility: summary-only
sensitivity: moderate
last_reviewed: 2026-07-24
canonical_path: docs/knowledge-bank/sources/permissions/elana-gordon-east-river-portfolio-2026.md
summary: >
  Elana Gordon confirmed that she made the East River photographs shared in a
  private July 2026 exchange and granted Jamie permission to use the shared
  photographs on his portfolio site. Elana said credit was optional; Jamie
  elected to credit her.

private_evidence:
  system: source-vault
  opaque_ref: permission_REPLACE_WITH_PRIVATE_ID

permission:
  holder: person.elana-gordon
  status: granted
  scope:
    - portfolio-site-use
    - photographs-shared-in-the-referenced-exchange
  credit_required_by_holder: false
  jamie_credit_decision: credit
  transferable: false
  sublicensable: false
  future_unrelated_uses: not-granted

anti_claims:
  - This is not a general Creative Commons license.
  - This does not publish the private conversation.
  - This does not cover unrelated photographs.
  - This does not establish represented-person consent for every future crop or context.
---
```

#### 8.2 Separate review dimensions

Every public placement tracks independently:

- creator attribution;
- copyright or use permission;
- archive custody;
- represented-person dignity and privacy;
- visible artwork or third-party rights;
- collective-credit accuracy;
- caption accuracy;
- crop acceptability;
- exact destination;
- staging approval;
- production approval;
- indexing approval.

A single green `rights: approved` Boolean is insufficient.

#### 8.3 Revocation

A permission or dignity decision may change.

Revocation:

- blocks future builds for affected placements;
- opens a correction record;
- removes or replaces the public derivative through an explicit PR;
- preserves the private source and decision history;
- does not erase the earlier fact that a placement once existed;
- may require cache or CDN purge procedures;
- never exposes the reason publicly unless authorized.

### 9. Photo-set and event records

A photo set may represent:

- one outing;
- one burst;
- one event;
- one project cohort;
- one visual motif;
- one sequence proposal;
- one group of alternative frames.

Example:

```yaml
---
id: index.photo-set.east-river-canoe.2022
title: East River canoe outing, 2022
kind: index
status: maintained
visibility: public-safe
sensitivity: low
summary: >
  Public-safe set record for related East River photographs made during one
  canoe outing in 2022.

private_population:
  status: known-privately
  count_publication: withheld

public_members:
  - asset.photo.east-river-manhattan-bridge.2022.001

relations:
  - type: related_to
    target: source.recollection.jamie-canoe-commuting.2026-07
    href: ../../sources/recollections/jamie-canoe-commuting-2026-07.md
    context: Later recollection about the recurring bicycle–canoe practice.
---
```

The private field may know all related frames. The public set need expose only
approved members and safe aggregate context.

### 10. Curatorial studio

#### 10.1 Purpose

The artist-led curatorial studio produces page, sequence, and portfolio-edition
proposals by looking at photographs in relation to:

- the private editor field;
- related frames and source returns;
- the Knowledge Wiki;
- the current portfolio;
- typography, layout, crop, and responsive behavior;
- the intended visitor problem;
- current employment and public communication needs;
- the integrity of the artistic practice.

It is not a ranking service.

#### 10.2 Begin with a commission and visitor problem

A curatorial session starts from a bounded brief, not "find the best photos."
The brief names:

- the page or portfolio edition;
- the visitor and their likely time budget;
- the comprehension, feeling, memory, or action problem;
- the current text and artifacts;
- relevant Wiki context;
- known rights and sensitivity boundaries;
- visual clichés and unsupported implications to avoid;
- what is allowed to remain unresolved.

#### 10.3 Discovery lanes and diversity budget

A private field should contain at least three retrieval lanes:

1. **Context-rich** — photographs already related to the named project, people,
   place, period, artifact, or known capability.
2. **Adjacency** — neighboring frames, nearby times and places, related bursts,
   preparation, aftermath, and alternate viewpoints.
3. **Wildcard** — images selected to challenge the current ontology and surface
   underdescribed periods, minor moments, unexpected materials, or formally
   compelling photographs with no known project relation.

The brief may define a diversity budget across periods, places, project types,
public/private contexts, people-centered and object-centered images, and known
versus unknown relations. The budget is a retrieval aid, not an aesthetic quota
for the final page.

#### 10.4 Blind and contextual passes

##### Blind pass

The panel receives pixels and only the minimum technical context necessary to
render them. It records:

- where attention goes;
- formal structure;
- image time;
- apparent agency;
- atmosphere and ambiguity;
- what it wants to see before or after;
- whether the image behaves as evidence, threshold, interruption, field, or
  counterpoint;
- whether Jamie is overcentered;
- whether the image invites or closes interpretation.

##### Contextual pass

The panel then receives:

- generalized date and place;
- neighboring frames;
- relevant project and method records;
- creator and rights state;
- first-person recollections;
- prior captions and occurrences;
- counterevidence;
- unresolved questions.

The contextual pass may revise the blind reading. Both remain in the curatorial
session record.

#### 10.5 Default panel

The initial configurable panel uses public-context simulated lenses associated
with:

```json
{
  "panelId": "portfolio-photography-artists-v1",
  "members": [
    "Prof. Ingeborg Gerdes",
    "Prof. Margaret Morse",
    "Zora Neale Hurston",
    "Jonas Mekas",
    "Vivian Gornick",
    "Deborah Treisman"
  ]
}
```

Every run includes:

```text
This is an AI-generated simulation of public-context curatorial lenses.
It is not the named person's actual feedback, private belief, participation,
endorsement, or permission.
```

The panel is configurable. No named lens is permanent or authoritative.

#### 10.6 Lens responsibilities

The initial panel is taught as follows:

- **Ingeborg Gerdes lens:** What structure is already latent in the material?
- **Margaret Morse lens:** What happens to a visitor over time across image,
  interface, text, and movement?
- **Zora Neale Hurston lens:** Whose vernacular account or lived knowledge would
  an outside description erase?
- **Jonas Mekas lens:** Which minor, ordinary, or fragmentary moment gains force
  through duration, sequence, and memory?
- **Vivian Gornick lens:** How does the present narrator reshape the earlier
  situation, and can that movement remain visible?
- **Deborah Treisman lens:** What must be selected, ordered, compressed, or
  omitted for the whole composition to carry?

These descriptions are project-authored heuristics, not comprehensive
biographies or claims about the named people's private judgment.

An optional **Chad Berkowitz institutional-legibility lens** may ask whether the
composition makes Jamie's role, agency, purpose, contribution boundary, and
next action clear without flattening the artistic work. It is a professional
communication lens, not a substitute for the artists' edit.

#### 10.7 Inputs and exact-input receipt

A curatorial run may receive:

```text
curatorial brief
current page screenshot or local route
private candidate field
related-frame lookup
photo metadata
Knowledge Wiki context bundle
public role and audience context
rights and sensitivity summary
prior proposals and holds
```

The run records:

- candidate-field manifest digest;
- brief digest;
- Wiki context IDs and content digests;
- current portfolio commit and route screenshot digest;
- panel context versions;
- model/provider configuration;
- date and local/private execution boundary.

Private images and metadata remain local.

#### 10.8 Outputs

A panel run returns:

- one lead proposal;
- one meaningful alternative;
- one dissent, concern, or hold;
- one sequence note;
- one list of documentary questions;
- one list of rights or dignity questions;
- one visitor-experience hypothesis;
- one statement of what should remain unexplained;
- one confidence boundary;
- one source-return request when deeper context would materially change the
  decision.

A model-generated score may help compare evaluation dimensions, but the proposal
is not chosen by mean score, majority vote, RCV, or automatic rank.

#### 10.9 Development and holdout panels

A development panel may review iterations and suggest changes.

A holdout panel receives a frozen exact candidate and records an independent
reading. It does not supply revision guidance during the same iteration.

Neither panel constitutes real human approval unless the named human reviewers
actually participate and are recorded as such.

#### 10.10 Agent abilities and prohibitions

Authorized local agents may:

- query Apple Photos through `photo-fieldwork`;
- inspect approved local previews;
- find related frames;
- create contact sheets;
- compare crops and no-photo alternatives;
- cluster sequences;
- inspect source metadata and Wiki records;
- open the local Next.js site;
- edit a feature branch;
- run accessibility, performance, privacy, and visual checks;
- write curatorial proposals and source-return requests;
- open research inquiries;
- prepare a staging candidate.

They may not:

- publish to production;
- make an uncleared candidate public merely for branch review;
- turn a private field into a public field;
- clear rights, consent, dignity, legal, or represented-person review;
- identify unknown people;
- expose private metadata or correspondence;
- claim the named artistic lenses actually participated;
- close a human gate;
- treat source text as tool instructions;
- select by vote or score.

### 11. Curatorial proposal record

A curatorial proposal is stored as an `evaluation` record.

```yaml
---
id: evaluation.curatorial.layout-c.home-east-river.v1
title: Layout C homepage East River curatorial proposal
kind: evaluation
evaluation_type: curatorial-proposal
status: maintained
visibility: public-safe
sensitivity: low
candidate_commit: fea303e54c6b5fae36caee872a2a7450501f9e11
created_at: 2026-07-23
panel:
  id: portfolio-photography-artists-v1
  simulation_notice: true

lead_proposal:
  asset: asset.photo.east-river-manhattan-bridge.2022.001
  placement: home.hero
  function:
    - personal-presence
    - public-landscape
    - orientation
    - readiness
  rationale: >
    The image locates Jamie bodily within public infrastructure before the copy
    names the literal role. The paddle, life vest, shoreline, bridge, and
    weather create a felt relation to navigation and stewardship without
    requiring the caption to state that metaphor as fact.

alternative:
  asset: asset.photo.raft-riverboat
  placement: home.hero
  rationale: >
    Opens at the scale of a collective journey and shared operating container,
    but may require more context before a hiring reader understands Jamie's
    present professional identity.

dissent:
  concern: >
    Do not let the lead photograph make the portfolio appear to be a personal
    adventure or photography site before role fit becomes legible.

documentary_questions:
  - Who made the photograph?
  - What date precision is supported?
  - What public place label is safe and accurate?
  - Are related frames available?

human_gates:
  - Jamie visual approval
  - creator attribution and permission
  - production approval
---
```

### 12. Selection decision

A selected proposal becomes a `decision` record, separate from the evaluation.

The decision records:

- the editorial question;
- proposal alternatives;
- evidence considered;
- rights state;
- why the choice was made;
- what was not selected;
- known risks;
- allowed staging surface;
- exact candidate commit;
- unresolved production gates;
- supersession path.

This preserves creative history without pretending the chosen image was
inevitable.

### 13. Projection, public occurrence, and portfolio edition

This proposal introduces a generalized `projection` record kind.

A projection maps governed knowledge to a public surface. A photography
placement is a **public occurrence** subtype. It binds one exact derivative to
one composition, route, component, crop family, caption, credit, sequence
position, viewport behavior, and release state.

The same source photograph may therefore have:

- several derivative versions;
- several crops;
- several public occurrences;
- several historical captions;
- different permission scopes;
- staging, production, retired, revoked, or superseded states.

Approval never attaches to the photograph in the abstract.

Example:

```yaml
---
id: projection.photo.layout-c.home.east-river
title: Layout C homepage East River occurrence
kind: projection
projection_type: photo-occurrence
status: maintained
visibility: public-safe
sensitivity: low

portfolio_edition: edition.layout-c.2026-07
asset: asset.photo.east-river-manhattan-bridge.2022.001
derivative: derivative.photo.east-river.layout-c.v1
route: /
component: Hero
purpose:
  - orientation
  - personal-presence
  - role-context

sequence:
  position: 1
  follows: null
  precedes: section.start-here

crop:
  desktop: 50% 50%
  mobile: 73% 50%

alt_text: >
  Jamie Burkart in a life vest holding a canoe paddle on the East River
  shoreline beneath the Manhattan Bridge.

caption:
  text: At the East River beneath the Manhattan Bridge, 2022.
  assertions:
    - statement.photo.east-river.place.v1
    - statement.photo.east-river.capture-year.v1

credit:
  text: Photograph by Elana Gordon. From Jamie Burkart's photo archive.
  assertions:
    - statement.photo.east-river.creator.v2
    - statement.photo.east-river.custody.v1

permission_source: source.permission.elana-gordon.east-river.2026-07

approval:
  public_git: approved
  staging: approved
  production: open
  indexing: open

relations:
  - type: resulted_in
    target: source.recollection.jamie-canoe-commuting.2026-07
    href: ../../sources/recollections/jamie-canoe-commuting-2026-07.md
    context: Encountering this occurrence prompted the recollection.
---
```

#### 13.1 Portfolio edition

A portfolio edition is a dated, Git-bound set of public occurrences and page
compositions, for example:

```yaml
---
id: edition.layout-c.2026-07
title: Layout C photographic portfolio edition
kind: projection
projection_type: portfolio-edition
candidate_commit: fea303e54c6b5fae36caee872a2a7450501f9e11
status: staging
purpose:
  - hiring-orientation
  - personal-presence
  - editorial-coherence
occurrences:
  - projection.photo.layout-c.home.east-river
  - projection.photo.layout-c.about.raft-riverboat
human_gates:
  - Jamie production approval
  - indexing approval
---
```

An edition makes it possible to compare Layout A, Layout C, Layout E, or future
composites without treating one as the timeless final meaning of the archive.

#### 13.2 Caption assertions

Every factual element in a caption or credit resolves to one or more statement
IDs. Interpretive copy may appear adjacent to the image but must not be smuggled
into a factual caption without being labeled as interpretation.

#### 13.3 Protected absence and no-photo occurrences

A page decision may explicitly record that no photograph is used. That decision
may preserve:

- rights or dignity concerns;
- a stronger artifact-based proof;
- collective-credit risk;
- the desire to prevent repetitive atmosphere;
- the conclusion that the image weakened task completion.

The absence itself may belong to the portfolio edition's decision history.

The application manifest includes occurrence and edition IDs.

### 14. Public derivative and application manifest

#### 14.1 Destination-bound publication packet

Before a public derivative enters this repository, `photo-fieldwork` produces a
publication packet bound to:

- one private source binding;
- one exact derivative;
- one destination and repository;
- one staging or production purpose;
- one permission scope;
- one caption and credit proposal;
- one set of approved public-safe statements;
- one transform receipt;
- one packet checksum;
- named human clearance states.

The import process rejects packets that contain private paths, source IDs,
People associations, exact GPS, raw correspondence, or fields outside the
allowlist.

#### 14.2 Phase-one compatibility

The existing `apps/www/src/data/photography.ts` structure remains in place
during the pilot.

Each entry gains:

```ts
type PortfolioPhoto = {
  wikiId: string;
  derivativeId: string;
  placementIds: readonly string[];
  // existing fields continue
};
```

The validator confirms that:

- `wikiId` resolves to one governed asset;
- the derivative path and dimensions match;
- the checksum matches the committed file;
- the creator and credit match preferred current statements;
- all placement IDs resolve;
- every current route is allowed;
- no revoked or rights-blocked placement is referenced.

#### 14.3 Future generated factual manifest

After the pilot, a compiler may generate the factual portion of
`photography.ts` from accepted asset and projection records.

The generated layer may include:

- file path;
- dimensions;
- alt text;
- caption;
- credit;
- crop;
- route allowlist;
- current status.

It must not generate:

- page order;
- prominence;
- component choice;
- the narrative sequence;
- whether the image should appear.

The frontend remains authored.

### 15. First-person recollection

A recollection is a `source` record with
`source_class: first-person-recollection`.

Example:

```yaml
---
id: source.recollection.jamie-canoe-commuting.2026-07
title: Jamie Burkart recollection of bicycle–canoe journeys
kind: source
source_class: first-person-recollection
status: governed-open
visibility: internal
sensitivity: moderate
author: person.jamie-burkart
recorded_at: 2026-07-24
prompted_by: projection.photo.layout-c.home.east-river

time_scope:
  value: recurring-practice
  precision: approximate

aliases:
  - canoe commuting
  - canoe-bicycle commuting
  - canoeting
  - cannuting

summary: >
  Seeing the Layout C East River photograph prompted Jamie to recall a recurring
  practice of transporting a canoe by bicycle using a handmade trailer and
  using the coupled bicycle, paddle, canoe, and trailer as a lightweight
  participatory land–water travel system.

projection:
  status: hold
  surfaces: []
---
```

The body preserves the full recollection, its uncertainty, and follow-up
questions.

The record may remain private or internal. Acceptance of this RFC does not
authorize publication of the recollection.

### 16. Visitor and collaborator feedback

A visitor encounter may become:

- a correction;
- a recollection;
- an attribution update;
- a permission update;
- a curatorial response;
- an accessibility finding;
- a research inquiry;
- a takedown request;
- no action.

The intake process records:

```text
who supplied the response
what they directly know
what prompted it
when it was recorded
whether it is private
what it may support
what it does not support
whether the public site should change
```

A meaningful response may enrich the Wiki while leaving the site unchanged.

### 17. Event and practice-instance clustering

The archive may support bounded future questions such as:

- How many distinct bicycle–canoe journeys are documented?
- In which years and places do they appear?
- Which related equipment or participants recur?
- Which images show preparation, travel, arrival, or maintenance?

The system must count event instances, not image files.

Proposed process:

1. Query by private metadata, object terms, albums, known related frames, and
   existing Apple People associations where authorized.
2. Build candidate clusters by time and location.
3. Use visual review to distinguish one journey from multiple bursts.
4. Record one governed event or practice-instance record per confirmed cluster.
5. Keep uncertain clusters separate.
6. Report a lower bound over a declared source scope.

An allowed public claim would be:

> At least N distinct bicycle–canoe journeys are documented in the reviewed
> portion of the archive between YEAR and YEAR.

It must include:

- source scope;
- date of review;
- clustering method;
- duplicate rules;
- unresolved candidates;
- human reviewer;
- precision boundary.

It must not claim the total number of journeys that occurred.

### 18. Wikimedia prior art

This system is not a Wikimedia implementation, but it adopts several mature
separations from Wikimedia Commons and Wikidata.

#### 18.1 File page separate from article or placement

Wikimedia Commons gives each media file its own file-information and structured
data page. The same media can then be used in many contexts.

Local adaptation:

```text
Knowledge Wiki asset record
≠ page placement
```

#### 18.2 Caption separate from depicted entities

Structured Data on Commons distinguishes a short factual file caption from
"depicts" statements and other structured claims.

Local adaptation:

```text
caption:
  At the East River beneath the Manhattan Bridge, 2022.

visible observations:
  person
  life vest
  paddle
  shoreline
  bridge
  water

curatorial interpretation:
  operational stewardship in public landscape
```

#### 18.3 Statements carry references, qualifiers, and ranks

Wikidata statements may include qualifiers, references, multiple values,
unknown values, and preferred or deprecated ranks.

Local adaptation:

- creator attribution can be corrected without erasing earlier uncertainty;
- location can be published at landmark precision while private coordinates
  remain withheld;
- creator, custody, and permission remain separate properties;
- a factual statement can be preferred while an interpretation remains a
  versioned evaluation.

#### 18.4 Private permission correspondence, public review status

Wikimedia's Volunteer Response Team stores permission correspondence privately
and exposes a public review state associated with a ticket.

Local adaptation:

- raw Elana messages remain private;
- the public-safe Wiki states the permission scope;
- an opaque private permission reference permits later reinspection;
- the public record does not expose contact details or message content.

#### 18.5 Selection discussion separate from the file record

Commons Featured Picture Candidates preserves nomination, critique, decision,
withdrawal, and archive separately from the media file itself.

Local adaptation:

- curatorial proposal is separate from asset;
- selection decision is separate from proposal;
- rejected and withdrawn alternatives remain inspectable;
- an accepted layout may later be superseded without rewriting the file's
  documentary record.

This project does not adopt majority voting. The portfolio is an authored work.

#### 18.6 Browse relations rather than one folder

Commons categories provide multi-hierarchical discovery.

Local adaptation:

A photograph may relate simultaneously to:

```text
East River
Manhattan Bridge
canoe journeys
bicycle systems
waterways
participatory art
public infrastructure
friendship
artist at work
New York City
```

It should not be forced into one project folder.

### 19. Curatorial evaluation and photo-system health

Evaluation supports artistic work but does not replace it.

#### 19.1 Exact-candidate binding

Every automated or model-based review records:

- repository commit;
- portfolio edition ID;
- route and viewport;
- derivative checksum;
- crop and transform version;
- caption and credit content;
- Wiki context digest;
- curatorial brief digest;
- panel context and model configuration;
- review date;
- public/private execution boundary.

A judgment about one crop, caption, or edition cannot silently certify another.

#### 19.2 Development and holdout review

Use development panels to improve a candidate and holdout panels to review a
frozen candidate. Preserve disagreement. Do not tune until every simulated
voice gives the same answer.

A simulated panel is diagnostic. It is never photographer permission,
represented-person consent, a real hiring-reader response, or Jamie approval.

#### 19.3 Documentary integrity

- Does each factual caption assertion have a referenced basis?
- Are creator, custody, permission, date, and place distinct?
- Is public precision no greater than evidence and safety permit?
- Are visible observations separated from identity and interpretation?
- Are preferred and deprecated statements legible?

#### 19.4 Rights, dignity, and protected absence

- Does the current occurrence fall inside the granted permission scope?
- Is creator credit correct?
- Is represented-person review appropriate?
- Is visible artwork or third-party material addressed?
- Does the caption preserve collective credit?
- Is protected absence respected?
- Can the use be revoked?

#### 19.5 Placement coherence

- Does the photograph perform a distinct role on this page?
- Does the image deepen rather than duplicate the text?
- Does the first viewport still establish Jamie's literal role?
- Would removing the image materially weaken orientation, understanding,
  feeling, memory, or action?
- Would a different image or no image serve the visitor better?

#### 19.6 Sequence integrity

- Does each adjacent image add a new scale, time, material, or relation?
- Does the sequence become repetitive atmosphere?
- Is there an intentional movement through people, places, tools, work, and
  consequence?
- Have neighboring frames, preparation, and aftermath been considered before
  selecting one emblem?

#### 19.7 Visitor acceptance

After a short viewing, can a reader answer:

- Who is Jamie?
- What does he do?
- What specific proof is memorable?
- What feeling or image remains?
- What should the reader do next?

Visitor review should include relevant hiring readers, collaborators, artists,
and fresh no-context readers where appropriate. Their real observations remain
human evidence and must not be synthesized by an agent.

#### 19.8 Counterfactual comparison

Compare:

```text
current select
meaningful alternative
no-photo version
```

The panel receives the findings. The findings do not select the image.

#### 19.9 Serendipity and underdescription

Report whether retrieval and curation repeatedly favor:

- projects already well documented;
- periods with abundant metadata;
- public events over quiet maintenance;
- portraits over tools and materials;
- current role-fit proof over artistic continuity.

Track the share of candidate and selected images originating from context-rich,
adjacency, and wildcard lanes. This is a diagnostic, not a quota.

#### 19.10 Curatorial disagreement

Preserve:

- minority readings;
- unresolved alternatives;
- reasons for hold;
- what a panel member believed should remain unexplained;
- differences between blind and contextual passes.

High agreement is not automatically a sign of quality. It may indicate prompt
convergence or overdetermination.

#### 19.11 Recollection and correction yield

Did the composition prompt useful:

- first-person knowledge;
- creator attribution;
- correction;
- new source;
- new inquiry;
- relationship repair?

This is diagnostic, not a requirement for every image.

#### 19.12 Health and maintenance

Generate diagnostics for:

- public derivatives without Wiki asset records;
- asset records with broken source bindings;
- active occurrences with stale rights or dignity review;
- preferred creator statements not reflected in credits;
- captions with unsupported assertions;
- revoked or withdrawn occurrences still referenced by the app;
- one derivative used outside its allowed destination;
- unused approved derivatives;
- images overused across routes;
- stale portfolio editions;
- recollections or corrections that affect current public copy;
- permissions approaching a review date;
- public images without rollback instructions.

#### 19.13 Non-compensable hard gates

A high visual, narrative, hiring, or model score cannot compensate for:

- private-source leakage;
- invalid or missing permission;
- unsafe represented-person use;
- incorrect attribution;
- unsupported caption assertions;
- broken accessibility;
- revoked status;
- missing public-Git, staging, production, or indexing approval;
- a partial or drifting private source scan;
- an exact-candidate mismatch.

### 20. Agentic curatorial run contract

Suggested configuration:

```json
{
  "runId": "layout-c-home-east-river-v2",
  "panelContextPaths": [
    "evals/curatorial-perspectives/ingeborg-gerdes.md",
    "evals/curatorial-perspectives/margaret-morse.md",
    "evals/curatorial-perspectives/zora-neale-hurston.md",
    "evals/curatorial-perspectives/jonas-mekas.md",
    "evals/curatorial-perspectives/vivian-gornick.md",
    "evals/curatorial-perspectives/deborah-treisman.md"
  ],
  "briefPath": "docs/photography/briefs/homepage-orientation.md",
  "wikiContextIds": [
    "person.jamie-burkart",
    "capability.technical-operations",
    "method.structure-grows-from-material",
    "project.waterways-participatory-art"
  ],
  "privateFieldRef": "photo-fieldwork:field-set-001",
  "portfolioPaths": [
    "/",
    "/about",
    "/work/technical-operations"
  ],
  "outputPath": "docs/knowledge-bank/evaluations/curatorial/layout-c-home-east-river-v2.md"
}
```

The panel context files:

- use public-source summaries;
- describe a bounded reading lens;
- contain a simulation notice;
- prohibit claims of private opinion or participation;
- may be corrected or retired;
- are versioned and hashed with each run.

### 21. Proposed commands

Repository commands:

```text
npm run photos:check
npm run photos:report
npm run photos:placements
npm run photos:permissions
npm run photos:curatorial:check
npm run photos:curatorial:run
npm run photos:manifest
npm run photos:usage
npm run photos:impact
npm run photos:health
npm run photos:edition
npm run photos:withdrawal-plan
npm run photos:recollection
npm run photos:test
```

Private `photo-fieldwork` commands remain in its repository.

Suggested responsibilities:

#### `photos:check`

Validate:

- Wiki asset records;
- statement references and ranks;
- derivative existence, dimensions, checksum, and EXIF stripping;
- public manifests;
- creator/credit consistency;
- placement existence and surface allowlists;
- permission scope;
- revocation;
- private locator patterns;
- Markdown image paths;
- public-safety boundaries.

#### `photos:report`

Generate:

- current public derivatives;
- placements by route;
- creator-attribution gaps;
- permission and represented-person review;
- stale review dates;
- caption factual-source coverage;
- unused approved derivatives;
- public images without first-class Wiki records;
- Wiki photo records without valid public derivatives.

#### `photos:placements`

Generate a human-readable matrix:

```text
asset
derivative
route
component
crop
caption
credit
staging status
production status
indexing status
```

#### `photos:permissions`

Report exact-surface permission state without exposing correspondence.

#### `photos:curatorial:run`

Run a local, authorized curatorial proposal process. It never publishes.

#### `photos:manifest`

During the pilot, validate the hand-authored manifest. In a future accepted
amendment, generate the factual manifest from accepted Wiki projections.

#### `photos:usage`

List every staging, production, retired, withdrawn, or superseded public
occurrence of an asset or derivative.

#### `photos:impact`

Given a changed creator, permission, caption assertion, derivative, or protected
state, list all affected Wiki records, manifests, routes, portfolio editions,
reports, and human reviews.

#### `photos:health`

Generate the maintenance and serendipity diagnostics defined in section 19.

#### `photos:edition`

Compile and compare the exact occurrence set for a named portfolio edition
without choosing the edition automatically.

#### `photos:withdrawal-plan`

Compile the current routes, derivatives, historical-occurrence obligations,
regeneration steps, rollback boundary, and human review gates for withdrawing a
named photo. The command is advisory and applies no writes.

An implemented withdrawal or non-rendering withdrawn tombstone is monotonic
across repository history. A revert or checkout may not silently reactivate the
photograph. Any later restoration must materialize in a later commit as a new
canonical decision record whose own content identifies the photo and prior
implemented withdrawal, records Jamie's completed human review, accounts for
creator, rights, consent, exact-credit, crop, caption, represented-person,
editorial, production, deployment, and indexing review, and binds the exact
restored occurrences to regenerated public-surface evidence. Every gate names
its authority and supporting Knowledge Wiki records. Creator, rights,
exact-credit, crop, caption, editorial, production, deployment, and indexing
cannot be waived as not applicable; open production, deployment, and indexing
reviews remain separate gates rather than synthetic approvals. A restoration
record must be internally affirmative, materialized after the withdrawal, and
no later than the actual review time. Contradictory prose, future dates, and
manifest approval fields alone are not authority.

#### `photos:recollection`

Create a dated recollection, correction, or no-action scaffold for a named asset
and occurrence.

#### `photos:test`

Test:

- source ID leakage guards;
- permission-scope mismatch;
- creator correction;
- deprecated versus preferred statements;
- missing image;
- modified derivative checksum;
- revoked placement;
- unsafe GPS precision;
- private path in Markdown;
- alt/caption duplication;
- missing production gate;
- repeated layout crop mismatch;
- curatorial simulation notice;
- branch-history fingerprint leakage;
- source text or OCR attempting prompt injection;
- protected absence being auto-promoted;
- public occurrence added outside its portfolio edition;
- RCV or aggregate panel score being used as publication authority.

### 22. East River canary

The first implementation is deliberately narrow.

#### 22.1 Source facts

From the current record:

- a public derivative already exists in Layout C;
- the public place label is East River beneath the Manhattan Bridge;
- capture year is 2022;
- archive custody is Jamie's photo archive;
- Elana Gordon confirmed creator attribution;
- Elana granted permission for the portfolio use discussed;
- Jamie chose to credit her;
- several related frames exist.

#### 22.2 Public change

The first public correction should be limited to the credit:

```text
At the East River beneath the Manhattan Bridge, 2022.

Photograph by Elana Gordon. From Jamie Burkart's photo archive.
```

The homepage composition and concise caption need not otherwise change.

#### 22.3 Wiki changes

Create:

- one asset record;
- one photo-set record;
- one public-safe metadata source;
- one public-safe permission summary;
- one curatorial proposal record;
- one selection decision;
- one placement record;
- one first-person recollection;
- one research inquiry for documented bicycle–canoe journeys.

#### 22.4 Private changes

Create or verify:

- private source bindings for the shared East River images;
- private permission evidence capsule;
- related-frame set;
- no new public exposure of private message screenshots.

#### 22.5 Canary acceptance

The canary passes when:

```text
[ ] the public derivative resolves to one asset record
[ ] the asset resolves privately to the source image
[ ] Elana is the current preferred creator statement
[ ] the former unknown attribution remains historically legible
[ ] permission scope is accurately summarized
[ ] raw messages remain outside public Git
[ ] the public credit is corrected
[ ] date and place claims have declared bases and precision
[ ] Layout C still works at required viewports
[ ] the placement has staging, production, and indexing states
[ ] the recollection is recorded without automatically expanding the homepage
[ ] revocation and rollback are tested
[ ] no private locators appear in current tree or introduced branch history
```

### 23. Frontend experience

#### 23.1 First viewport contract

A photo-led homepage must still communicate within the first viewport:

- Jamie's name;
- literal role family;
- concise operating proposition;
- primary Work action;
- Résumé action;
- enough of the next section to imply depth and scroll.

#### 23.2 Photographs have distinct jobs

Allowed compositional functions include:

```text
orientation
personal-presence
public-scale
material-process
collective-context
artifact-proof
place
duration
transition
counterpoint
closure
```

An image should not be added merely because it is attractive.

#### 23.3 Absence is allowed

A task-focused page may remain image-light when:

- no rights-cleared image strengthens the task;
- a photograph would overpersonalize collective work;
- an available image would imply unsupported authorship;
- the artifact itself is stronger evidence;
- the page is clearer without visual interruption.

#### 23.4 Caption contract

The public caption should normally be one or two short factual sentences.

Deeper interpretation belongs in:

- adjacent prose;
- a project note;
- the asset page;
- a curatorial proposal;
- a recollection;
- a future essay.

#### 23.5 Credit contract

Credit is visually distinct from caption and contains:

```text
Photograph by CREATOR.
From ARCHIVE CUSTODY.
```

Use only the parts relevant to the image.

#### 23.6 Performance and accessibility

Every public derivative must have:

- declared width and height;
- responsive `sizes`;
- stable crop;
- descriptive alt text;
- caption distinct from alt text;
- lazy loading unless it is the lead image;
- no EXIF, GPS, private filename, or source locator;
- route and viewport testing;
- keyboard and screen-reader integrity around surrounding controls;
- no cumulative layout shift attributable to missing geometry.

### 24. How we teach this

The top-level photography documentation begins with:

> **Artists choose. Archival production supports. The Knowledge Wiki remembers.
> Rights govern. The portfolio composes. Jamie decides what becomes public.**

It then teaches three distinctions:

```text
Metadata asks: Why might this photograph be relevant?
Visible evidence asks: What can an editor actually see?
Provenance asks: What can we responsibly claim?
```

And five public-facing records:

```text
asset
public derivative
curatorial proposal / decision
public occurrence
portfolio edition
```

Create:

```text
docs/photography/README.md
docs/photography/east-river-canary.md
docs/photography/curatorial-studio.md
docs/photography/rights-and-permission.md
docs/photography/source-binding.md
docs/photography/portfolio-editions.md
docs/photography/recollection-and-correction.md
docs/photography/contributor-pull-request-template.md
```

The onboarding path teaches the East River canary first.

A new teammate should be able to answer:

- Where is the original?
- Why is it not in Git?
- Which public derivative is used?
- Who made it?
- How do we know?
- What permission covers it?
- Which occurrence and portfolio edition use it?
- Which caption assertions are factual?
- Which interpretations are curatorial?
- What recollection did it prompt?
- Which human decisions remain open?
- How would we remove, replace, or correct it?

#### 24.1 Curatorial pull-request template

Every photo-composition PR answers:

```text
What visitor problem is this image or sequence solving?
Why this image?
Why this page and this position?
What can the image establish?
What does it evoke or open?
What does it not establish?
Which related frames and alternatives were considered?
What changed between blind and contextual review?
What rights, dignity, and credit states apply?
What changed in the Knowledge Wiki?
What remains protected or unresolved?
How can the occurrence be withdrawn or corrected?
```

#### 24.2 Teaching by edition rather than finality

The team refers to Layout C, Layout E, and later compositions as portfolio
editions. This teaches that public form is intentional and reviewable without
presenting one arrangement as the final truth of the archive.

#### 24.3 Vocabulary consistency

The same words must mean the same things in:

- Photo Fieldwork;
- the Knowledge Wiki;
- TypeScript and MDX;
- reports and tests;
- pull requests;
- human review packets.

The project should not alternate casually among `published photo`, `approved
image`, `asset`, `select`, and `placement` when those states carry different
authority.

### 25. Compatibility and migration

#### 25.1 Current Layout C and Layout E manifests

The current manifests remain valid authored sources during migration.

Add `wikiId`, `derivativeId`, and `placementIds` incrementally.

Do not require all existing images to migrate before the East River canary is
accepted.

#### 25.2 Existing RFC 0002

RFC 0002 remains the broader archive-selection and publication authority.

RFC 0003 adds:

- artist-led curatorial proposals;
- statement-level metadata provenance;
- first-class page placements;
- feedback and recollection return;
- Wikimedia-inspired media-entity separation;
- frontend binding and visitor experience.

If the two documents later become difficult to maintain separately, a future
RFC may supersede both with a consolidated recommendation after real use.

#### 25.3 Existing Knowledge Wiki records

Existing `asset`, `evaluation`, `decision`, `source`, `research-inquiry`, and
`index` kinds remain.

This proposal adds:

- `media_type: photograph` contract for assets;
- statement-level photo metadata;
- `evaluation_type: curatorial-proposal`;
- `source_class: first-person-recollection`;
- `source_class: private-permission-summary`;
- the new generalized `projection` kind.

#### 25.4 Rollback

Rollback of a public image:

1. remove or replace the application placement;
2. keep asset, decision, correction, and history records;
3. mark the projection withdrawn or revoked;
4. verify route and cache state;
5. update public reports;
6. retain source binding privately unless deletion is required by a separate
   human decision.

## Security and privacy

### Trust boundaries

The system contains at least four trust boundaries:

1. Apple Photos and private catalog;
2. local curatorial agent workspace;
3. public Git repository and CI;
4. deployed public site and caches.

No boundary is crossed implicitly.

### Public Git and staging

Public Git is publication. A draft PR or staging-only page is not a private
review surface. The rights and public-distribution state must therefore permit
repository hosting before a derivative is committed.

### Untrusted metadata and prompt injection

Metadata, OCR, filenames, captions, imported notes, and correspondence are
untrusted content. Tooling must quote or structurally delimit them and must not
allow them to alter system prompts, execute shell commands, request credentials,
change scope, or advance publication gates.

Curatorial output that cites source text must identify it as source material.

### Private pixel handling

The default is:

```text
private pixels stay on the authorized local machine
```

Sending private pixels to a cloud model requires a separately recorded
authorization that states:

- provider;
- data retention;
- training policy;
- account and workspace;
- source cohort;
- purpose;
- expiration;
- reviewer;
- output handling.

Acceptance of this RFC does not grant such authorization.

### People metadata

Existing Apple Photos People associations may help private retrieval. They are
not exported into public records and do not establish public identity claims.

New face identification is out of scope.

### Location

Private exact GPS may be used locally for clustering.

Public location is reduced to the least precision that supports the editorial
use and protects people and private places.

The East River canary publishes landmark-level location, not coordinates.

### Source fingerprints

Public code, fixtures, tests, reports, and branch history must not contain:

- exact private counts used as secret fingerprints;
- private digests;
- segmented source identifiers;
- original filenames;
- Apple IDs;
- local paths.

Tests use synthetic fixtures and generic leakage patterns.

### Permission correspondence

Raw messages, email, and contact information stay private.

The public-safe record states only the bounded permission result and opaque
private reference.

### Represented people

Public-event context may reduce privacy expectation but does not eliminate:

- dignity review;
- context review;
- risk of misrepresentation;
- rights in visible artwork;
- correction and takedown.

### Children, medical context, financial context, intimate gatherings, and homes

These are held by default and require specific later policy or human review.

### Repository history

Deleting a secret from the current tree is not sufficient if it entered branch
history.

Photo-related privacy checks scan the full set of commits introduced by the PR.

### Fail-closed behavior

The build or publication check fails when:

- a placement lacks current permission;
- a creator credit conflicts with the preferred statement;
- a derivative checksum changes unexpectedly;
- a public record contains a private path or prohibited identifier;
- a revoked placement remains active;
- a required human gate is absent;
- exact factual caption support cannot be found;
- a private catalog scan is partial or drifting.

## Publication workflow

1. **Name the visitor problem.** A portfolio need or artistic question creates a
   destination-bound curatorial brief.
2. **Freeze the commission.** Record page, audience, current portfolio commit,
   known context, prohibitions, and stop condition.
3. **Retrieve a bounded private field.** `photo-fieldwork` uses context-rich,
   adjacency, and wildcard lanes while preserving holds and cohort accounting.
4. **Conduct blind artistic review.** Artists look before receiving exhaustive
   metadata or narrative context.
5. **Request source return.** Retrieve related frames, metadata, relevant Wiki
   records, creator and permission state, recollections, and counterevidence.
6. **Conduct contextual review.** Preserve what changed and what remained alive
   from the blind pass.
7. **Prepare compositions.** Record a lead proposal, meaningful alternative,
   dissent or hold, sequence note, and no-photo counterfactual where useful.
8. **Run the publication table.** Archival production verifies source binding,
   statement support, creator, custody, permission, dignity, visible artwork,
   collective credit, and public precision.
9. **Update the Knowledge Wiki.** Create or amend asset, source, evaluation,
   decision, protected-absence, and inquiry records.
10. **Jamie approves the exact public-Git and staging package.** Approval binds
    derivative, transform, caption, credit, alt text, crop, route, component,
    and staging purpose.
11. **Issue a destination-bound publication packet.** The private system emits
    only allowlisted public-safe content.
12. **Import and validate.** The monorepo checks the packet, creates or verifies
    the derivative, binds the public occurrence and portfolio edition, and
    rejects private leakage or stale approvals.
13. **Frontend artists compose the page.** Composition remains authored rather
    than generated from semantic proximity.
14. **Run exact-candidate acceptance.** Static, accessibility, privacy,
    performance, responsive, documentary, and holdout reviews bind to the exact
    candidate.
15. **Review staging as a whole experience.** Compare the selected image,
    meaningful alternative, and no-photo version where useful.
16. **Record the encounter.** Jamie, creator, collaborator, or reviewer may add a
    correction, recollection, inquiry, hold, or no-action response.
17. **Decide whether the page changes.** Knowledge return does not automatically
    revise the current occurrence.
18. **Jamie separately approves production.** Staging approval does not confer
    production approval.
19. **Jamie separately approves indexing.** Production availability does not
    automatically make the page indexable.
20. **Maintain the afterlife.** Correction, revocation, withdrawal, replacement,
    and portfolio-edition supersession remain available.

No step automatically advances the next human gate.

## Rollout plan

### Phase 0 — RFC review

- Review this RFC against RFC 0002 and the current Knowledge Wiki schema.
- Decide whether the `projection` kind is sufficiently general.
- Review the public/private source-binding contract.
- Review the artist-panel simulation boundary.
- Do not change the site.

### Phase 1 — East River canary

- Create the private source binding.
- Create the public-safe permission capsule.
- Create the asset, set, evaluation, decision, projection, recollection, and
  inquiry records.
- Add `wikiId` and placement binding to the existing Layout C manifest.
- Correct the public creator credit.
- Add validation and rollback tests.
- Keep production and indexing open.

### Phase 2 — Existing public photo reconciliation

Apply the architecture to:

- the other three Layout C photographs;
- the nine Layout E photographs;
- current public artifacts that function as images.

For each, assign:

- asset ID;
- creator state;
- custody;
- rights state;
- derivative ID;
- placement ID;
- caption basis;
- open human gates.

Do not publish new images merely to complete the matrix.

### Phase 3 — Curatorial studio runner

- Add panel context files.
- Add curatorial-run config and output schema.
- Add local-only integration with `photo-fieldwork`.
- Run one new proposal against an existing page.
- Preserve alternative and dissent.
- Evaluate the runner for privacy leakage and named-person overclaiming.

### Phase 4 — Recollection and correction intake

- Add a lightweight command or template for staging-triggered recollection.
- Add contributor and photographer correction paths.
- Verify that new recollections do not automatically change public pages.
- Add the canoe-commuting research inquiry.

### Phase 5 — Practice-instance research

- Run a bounded search for related bicycle–canoe journeys.
- Create event-level candidate clusters.
- Human-review duplicates and uncertainty.
- Produce a private report and a public-safe lower-bound proposal.
- Do not publish a numerical claim until separately approved.

### Phase 6 — Repeatable portfolio practice

- Use the 1,000-image editor field as a source for project-specific briefs.
- Add new fields only for real editorial needs.
- Observe human review burden.
- Advance the RFC only after several successful, corrected, or withdrawn uses.

## Decision gates

### Proposed → Exploring

Required:

- Jamie confirms the governing principle and scope.
- The team identifies no contradiction with RFC 0002.
- The public/private source-binding design receives privacy review.
- The East River canary fields are sufficient to express the known facts,
  permission, placement, and recollection.
- The simulated panel boundary is accepted for experimentation.

### Exploring → Accepted

Required:

- A complete East River canary prototype exists on a branch.
- Private source binding is independently verified without public leakage.
- The permission capsule accurately reflects the private source.
- Creator correction and deprecated historical state work.
- The public derivative and placement validate.
- Rollback and revocation tests pass.
- Jamie confirms that the Wiki page is useful in VS Code or GitHub preview.
- At least one artist-led review finds the tooling supportive rather than
  overdetermining.
- The implementation plan and maintenance owner are named.
- All remaining concerns are either resolved or governed as open human gates.

### Accepted → Implementing

Required:

- Jamie explicitly advances the RFC.
- Implementation PR links this RFC.
- Deviations are recorded.
- No expansion beyond the canary is bundled without justification.

### Implementing → Operational

Required:

- East River credit correction is live or deliberately held with reason.
- Source, Wiki, manifest, placement, and public route remain connected.
- At least one staging encounter is successfully recorded as recollection,
  correction, or no-action feedback.
- Rights and rollback operations are documented.
- No private leakage is detected.
- Teammates can follow the workflow without reconstructing it from chat.

### Operational → Recommended

Required:

- Several photographs or sequences have passed through the loop.
- At least one proposal was rejected or withdrawn and remained legible.
- At least one attribution, caption, or interpretation was corrected.
- At least one wildcard or adjacency discovery materially improved a later
  brief, sequence, or research inquiry.
- The system demonstrably improved future curation or research.
- Human review burden is sustainable.
- The public site remains role-clear, performant, and selective.
- Jamie prefers this workflow after an observation period.

## Acceptance criteria

The first accepted implementation must demonstrate:

```text
[ ] one canonical public-safe photo asset record
[ ] one independently verified private source binding
[ ] one corrected preferred creator statement with deprecated prior state
[ ] one bounded permission capsule with private evidence outside Git
[ ] one exact public derivative and transform receipt
[ ] one curatorial session with blind and contextual passes
[ ] one lead proposal, alternative, and dissent or hold
[ ] one selection decision
[ ] one public occurrence and one portfolio edition
[ ] one caption-assertion map
[ ] one first-person recollection that does not automatically alter the page
[ ] one research inquiry generated from the encounter
[ ] one generated usage and impact report
[ ] one revocation or rollback exercise
[ ] one no-photo or protected-absence decision represented correctly
[ ] exact-candidate deterministic and holdout evaluation
[ ] no private identifiers, messages, paths, or fingerprints in tree or branch history
[ ] a new teammate can follow the East River tutorial without chat reconstruction
```

## Stop rules

Stop a curatorial or archival iteration when:

- the remaining decision belongs to Jamie, a photographer, a represented person,
  a collaborator, legal counsel, or another named human;
- additional retrieval is unlikely to change the current page decision;
- the time box ends;
- the visitor problem is already solved by the current composition;
- the strongest action is to publish, withdraw, apply for a job, contact a
  collaborator, or conduct a real reader study rather than continue internal
  analysis;
- the system is beginning to force the archive to explain more than the page
  needs;
- the panel is converging because of prompt repetition rather than new seeing.

A rich Wiki is not permission to delay the public or professional action the
portfolio exists to support.

## Drawbacks

### Added conceptual and maintenance complexity

The design introduces several linked entities and workflows. A simple image
change can require updates to:

- private binding;
- asset record;
- source record;
- decision;
- projection;
- manifest;
- frontend;
- reports.

This cost is justified only for consequential images and recurring practice.

### Risk of bureaucratizing art

Too much schema, evaluation, or explanation may make curators feel watched by
the system or pressured to justify intuition before looking.

Mitigation:

- proposals may contain poetic and provisional readings;
- not every selection requires complete ontology before staging;
- artists retain compositional authority;
- the system records rather than pre-decides;
- only facts and publication gates are hard-blocking.

### Risk of overdetermining one photograph

A strong image may accumulate so much contextual writing that it becomes unable
to remain ambiguous.

Mitigation:

- keep public captions short;
- separate factual, recollective, and interpretive layers;
- permit the public placement to remain unchanged;
- preserve alternative readings.

### Privacy risk from rich relationships

Even public-safe individual records can create mosaic risk when combined.

Mitigation:

- public precision minimization;
- private binding and permission evidence;
- no People export;
- role- and destination-specific projections;
- human review of relationship graphs.

### Historical figure simulation can become reductive

Named artistic lenses may flatten complex bodies of work into one project
heuristic.

Mitigation:

- clear simulation notice;
- human-reviewed public-context files;
- multiple lenses;
- ability to revise or retire lenses;
- no public claim that the person participated;
- no optimization toward pleasing a named simulation.

### Source binding may drift

Apple Photos identifiers or catalog representations may change.

Mitigation:

- multi-signal private binding;
- independent verification;
- aliases and correction;
- public ID independent of source path;
- fail-closed drift handling.

### Public repository growth

Approved derivatives add binary weight.

Mitigation:

- strict selectivity;
- web-appropriate formats and dimensions;
- do not commit private alternates;
- consider Git LFS or an approved asset host only if repository size becomes a
  demonstrated problem.

### Rights work may block strong images

The best visual photograph may remain unusable.

That is an inherent condition, not a workflow bug.

### Agent cost and latency

Curatorial runs and local visual inspection may be expensive and slow.

Mitigation:

- bounded briefs;
- small candidate fields;
- synthetic tests;
- reuse of verified source data;
- human selection of when a run is worth doing.

### Hiring optimization may distort the artistic edit

A system connected to the job hunt may overvalue immediately legible
professional proof.

Mitigation:

- artists lead the edit;
- role comprehension is one eval, not the only value;
- ordinary and non-instrumental images remain eligible;
- the panel can preserve dissent;
- Jamie can choose artistic continuity over short-term optimization.

### Recollection is fallible

Later memory may be mistaken or compressed.

Mitigation:

- date the recollection;
- label it as first-person memory;
- seek corroboration where consequential;
- preserve uncertainty;
- do not silently convert it into a factual event record.

## Alternatives

### Keep the current TypeScript photo manifest as the only record

This is simple and works for a small public edit.

It fails to preserve private source binding, creator corrections, permission
scope, curatorial history, recollection, and reuse across placements.

### Keep all photo knowledge in `photo-fieldwork`

This keeps private material together and reduces public-schema complexity.

It makes the public Knowledge Wiki unable to explain or validate current
placements and makes future non-private teammates dependent on a private
workspace for ordinary public facts.

### Store one Markdown record for every Apple Photos asset

This maximizes local Wiki coverage.

It is operationally impractical, creates unacceptable privacy and repository
risk, and confuses private indexing with curated knowledge.

### Use a commercial digital asset management system

A DAM may provide mature metadata, rights, and derivative management.

It may not integrate with Apple Photos, the Knowledge Wiki, private local agent
workflow, versioned curatorial reasoning, or the public/private constraints.
It also introduces vendor and migration dependence.

### Use Wikimedia Commons or Wikibase directly

Wikimedia provides excellent media-entity, statement, reference, category, and
permission precedents.

The private archive is not a freely licensed public collection. Uploading it to
Commons or operating a full Wikibase would add major privacy, infrastructure,
and governance burdens. The project should borrow concepts rather than deploy
the platform.

### Let the agentic panel automatically rank and publish

This would be fast and demonstrably scalable.

It would collapse aesthetic judgment, publication authority, rights, and
context into model output. It is rejected.

### Let Jamie select every image manually from memory

This is fast for an initial pass and remains an important human input.

It overrepresents remembered projects, misses unexpected relationships, and
does not create a reusable source-return loop.

### Hire a human photo editor and use no new architecture

A trusted human editor may make an excellent public edit.

The source-binding, rights, correction, and knowledge-return problems still
exist. This proposal is intended to support human editors, not replace them.

### Publish only photographs already public elsewhere

This reduces some rights and privacy questions.

It overrepresents projects already well documented and excludes much of the
private archive's artistic and historical value.

### Do nothing

The current text-led or minimally photographic portfolio can function.

This would leave a major source of presence, memory, evidence, and artistic
continuity underused, and the current creator-attribution correction would
remain detached from a durable model.

## Unresolved questions

- Should the repo accept the new generalized `projection` kind, or should photo
  placements remain a subtype of `decision` during the pilot?
- Should `apps/www/src/data/photography.ts` eventually be generated, partially
  generated, or remain authored with validation?
- Where exactly should the private source-binding registry and permission
  capsules live before or after RFC 0001?
- Which private binding signals are stable enough across Apple Photos upgrades?
- Should the public-safe opaque binding be random, salted, or assigned through a
  registry, and how is it rotated?
- What is the canonical public identifier format for derivatives?
- What public date and location precision defaults should apply?
- How should creator confirmation be handled when several people may have used
  one camera or phone?
- How should screenshots, scans, Live Photos, videos, RAW+JPEG pairs, edited
  variants, and shared-album copies relate?
- When is a photo set an event, a burst, a motif, or a curatorial sequence?
- Which records may safely be `public-safe` in a public repo when the derivative
  itself remains held?
- How should represented-person review differ for public crowds, close portraits,
  intimate gatherings, minors, homes, medical contexts, and deceased people?
- How should visible artworks, banners, screens, and copyrighted objects be
  reviewed?
- When is photographer permission sufficient for portfolio use, and when is
  broader legal review needed?
- Should curatorial panel context files live in this repository or in a shared
  public-lens library?
- Which public sources are sufficient to construct responsible named artistic
  lenses?
- How should disagreement among simulated curatorial lenses be summarized
  without reducing it to voting?
- Should a human curator be required before advancing from `exploring` to
  `accepted`, or can Jamie serve as the initial human editor?
- How should browser screenshots and responsive review be stored without
  bloating Git?
- How long should a staging placement remain observable before production
  review?
- How should site analytics, hiring-reader studies, or visitor recollections
  influence selection without turning the site into an optimization target?
- What makes a recollection mature enough to link publicly?
- How should a future lower-bound count of documented journeys define one
  distinct journey?
- Which parts of the canoe-commuting recollection belong in a future public
  essay, About page, project record, or nowhere public?
- Should Layout C remain the canonical canary after attribution correction, or
  should Layout E provide a second canary for multi-image sequence governance?
- When should RFC 0002 and RFC 0003 be consolidated or superseded?
- What observation period and number of completed loops are sufficient for the
  `recommended` stage?

## Prior art and source basis

### Repository sources

- [Knowledge Wiki README](../docs/knowledge-bank/README.md)
- [Knowledge Wiki schema](../docs/knowledge-bank/schema.md)
- [RFC 0002: Lifelong Photo Archive Selection and Publication](./0002-lifelong-photo-archive-selection-and-publication.md)
- [Photo Fieldwork](https://github.com/openhouse/photo-fieldwork)
- [Photo Fieldwork architecture](https://github.com/openhouse/photo-fieldwork/blob/main/docs/architecture.md)
- [Layout C branch](https://github.com/openhouse/jamieburk.art/tree/features/layout-C)
- [Layout E branch](https://github.com/openhouse/jamieburk.art/tree/features/layout-E)
- [Layout E photo integration record](../docs/design/layout-E-photo-integration.md)
- [Layout C PR](https://github.com/openhouse/jamieburk.art/pull/256)
- [Layout E PR](https://github.com/openhouse/jamieburk.art/pull/255)
- [Photos B PR](https://github.com/openhouse/jamieburk.art/pull/250)
- [Photos D PR](https://github.com/openhouse/jamieburk.art/pull/249)

### Process prior art

- [Ember RFC process](https://rfcs.emberjs.com/create-rfc/)
- [Ember RFC stages](https://rfcs.emberjs.com/stages/)
- [Ember RFC template](https://github.com/emberjs/rfcs/blob/master/0000-template.md)

### Media-knowledge prior art

- [Structured Data on Wikimedia Commons](https://commons.wikimedia.org/wiki/Commons:Structured_data)
- [Wikidata statements](https://www.wikidata.org/wiki/Help:Statements)
- [Wikimedia Commons Volunteer Response Team](https://commons.wikimedia.org/wiki/Commons:Volunteer_Response_Team)
- [Wikimedia Commons Featured Picture Candidates](https://commons.wikimedia.org/wiki/Commons:Featured_picture_candidates)
- [Wikimedia Commons categories](https://commons.wikimedia.org/wiki/Commons:Categories)

## Final principle

The archive should remain generous enough to surprise the artists.

The artists should remain free enough to make choices the ontology did not
predict.

Archival production should make those choices more grounded, reversible, and
responsible.

The Knowledge Wiki should preserve what is learned without forcing all of it
onto the visitor.

The public site should carry only what the composition needs:

```text
the right image
the right words
the right credit
the right context
the right next step
```

A living system succeeds when the current page becomes clearer while the future
remains open.

In operational shorthand:

```text
artists author
→ archives return context
→ the Wiki preserves change
→ independent gates protect
→ the frontend composes one edition
→ visitors encounter
→ memory and correction return
```

The system should make room for the right image, the right words, the right
credit, the right amount of context, and the right next action—while preserving
the deeper material from which another future edition may grow.
