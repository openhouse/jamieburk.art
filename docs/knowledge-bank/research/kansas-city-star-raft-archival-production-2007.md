# Kansas City Star Raft Article: Archival Production Record

Date of archival-production pass: 2026-07-16

Project: Water Publics / *Release Yourself onto the Water Until It Tastes of Salt*

Repository: `openhouse/jamieburk.art`

Pull request: `feature/evals-C` to `develop`

## Purpose

This record explains everything changed after Jamie supplied a locally
preserved Kansas City Star article about the 2007 raft project. It is designed
to be public-safe, reviewable without access to Jamie's private filesystem, and
useful for future portfolio composition, source checking, collaborator review,
and photo-editor briefing.

The newspaper reproduction itself is not included in the repository.

## Source Identified

- **Article:** *In the name of art, go with the flow*
- **Author:** Darryl Levings
- **Publication:** The Kansas City Star
- **Publication date:** November 15, 2007
- **Placement:** Front page with continuation on page A4
- **Continuation heading:** *RIVER: Adventure of a lifetime takes three friends from KC to Louisiana*
- **Project named:** *Release Yourself onto the Water Until It Tastes of Salt*
- **Preservation state:** Locally preserved two-page newspaper reproduction
- **Public knowledge-bank visibility:** Bibliographic metadata only
- **Opaque protected locator:** `kc-star-raft-article-pdf-2007`

No stable public Kansas City Star article URL was recovered in the web search
performed during this pass. A related live contemporaneous article was
recovered and close-read:

- [Eric Barton, *Artists Turned Huck Finn, Part III*, The Pitch, November 12,
  2007](https://www.thepitchkc.com/artists-turned-huck-finn-part-iii/)

## Inspection Performed

1. Inspected PDF metadata and confirmed a two-page, unencrypted newspaper
   artifact.
2. Rendered both pages to images and visually reviewed the front-page layout,
   photograph captions, byline, date, article jump, and A4 continuation.
3. Extracted the text with layout preservation and compared important wording
   against the rendered pages.
4. Searched for a stable public Kansas City Star copy and did not recover one.
5. Recovered and close-read the related live Pitch update.
6. Decomposed the evidence into atomic claims, source relationships,
   qualifications, and anti-claims.
7. Kept the newspaper reproduction, credited photographs, unrelated front-page
   material, reporter contact information, and the private filesystem location
   outside the repository.

## What The Star Article Supports

### Project identity and Jamie's role

The article names the project and independently credits its originating idea to
Jamie. This strengthens the existing origination record, which was already
supported by contemporaneous Pitch reporting.

The article does **not** convert origination into sole authorship, sole
construction, sole travel, or ownership of every participant's contribution.

### Collective crew and chronology

The article names Jamie Burkart, Libby Hendon, and Laura Mattingly as the three
crew members at the reported stage. It describes a July 21 departure from
Kansas City, travel beyond the 1,000-mile marker, and the crew being south of
Baton Rouge in mid-November.

The related Pitch update independently corroborates the July 21 Kaw Point
departure, recycled-material craft, travel beyond 1,000 miles, Coast Guard
interruption, and Vicksburg repair period.

### Built artifact

The Star describes a roughly 12-by-13-foot raft powered by two bicycles linked
to a paddlewheel. It reports that the craft was built in three weeks from
discarded building remnants, civic refuse, and reused syrup drums.

This supports the existence and character of the collective technical artifact.
It does not allocate every design, fabrication, repair, and operating task
among the crew and supporters, and it is not an engineering certification.

### Civic and artistic premise

The article attributes to Jamie a view of the river as an overlooked or
distanced part of Kansas City civic life and a hope that the journey might make
cultural relationships between the West Bottoms and Delta river towns more
perceptible.

This is preserved as Jamie's attributed artistic-civic premise. It is not
converted into measured community impact, representation of river residents,
or an institutional endorsement by the newspaper.

## What The Article Does Not Establish

- Gulf or salt-water completion;
- an uninterrupted route or complete voyage log;
- Jamie as the sole traveler, builder, designer, operator, or author;
- a complete participant, supporter, repair, or labor roster;
- measured cultural, civic, educational, or community outcomes;
- engineering certification of the craft;
- permission to republish the newspaper pages;
- permission to republish photographs credited to Vicksburg Post
  photographers or licensors.

The later Gulf-completion claim remains supported by a separately reviewed
2009 Pitch follow-up. The Star article is deliberately represented as a
mid-voyage source and as boundary evidence for that later claim.

## Knowledge Graph Changes

### Intake records

- `INT-2026-07-16-KC-STAR-RAFT`
- `INT-2026-07-16-PITCH-RAFT-PART-III`

### Source records

- `SRC-WATER-KC-STAR-GO-WITH-FLOW-2007`
- `SRC-WATER-PITCH-HUCK-FINN-PART-III-2007`

### Entity records

- `kansas-city-star`
- `libby-hendon`
- `laura-mattingly`

### Existing claims strengthened

- `CLM-WATER-RAFT-ORIGINATION`
- `CLM-WATER-RAFT-VOYAGE`
- `CLM-WATER-RAFT-GULF-COMPLETION`

### New atomic claims

- `CLM-WATER-RAFT-CONTEMPORANEOUS-VOYAGE`
- `CLM-WATER-RAFT-RECYCLED-BICYCLE-DESIGN`
- `CLM-WATER-RAFT-CIVIC-PREMISE`

All three new claims are mature, qualified, and editorially unused. They are
available for a future Water Publics composition without automatically entering
the current portfolio.

## Editorial Decisions

- **Contemporaneous voyage:** promote for a future Water Publics composition
  because it supplies independent chronology and collective credit.
- **Recycled bicycle-powered design:** promote for a future composition because
  it makes the built technical artifact legible.
- **Civic premise:** defer until a Water Publics page can connect the attributed
  premise to the artifact, route, collaborators, and later participatory river
  practice without overstating effects.
- **Current public website:** no new project page or homepage claim in this
  cycle. The knowledge bank gains depth while the current hiring composition
  remains focused.

## Public-Safety And Rights Decisions

- The PDF is not committed.
- Rendered page images are not committed.
- Full article text is not committed.
- Reporter contact information and unrelated newspaper content are omitted.
- The source record is `public-metadata-only` with a protected opaque locator.
- Photograph and page-reproduction rights remain `permission-needed` and
  `metadata-only`.
- Claims preserve Libby Hendon and Laura Mattingly as named crew members.
- Source language is paraphrased except for titles and the project name.

## Files Changed

- `apps/www/src/data/knowledge-bank/records.ts`
  - Added two intake records and three public entity records.
- `apps/www/src/data/knowledge-bank/lifecycle-records.ts`
  - Added two source records, strengthened two existing claims, and added three
    atomic claims.
- `apps/www/src/data/knowledge-bank/personal-facebook-posts-archive-production.ts`
  - Added the Star article as boundary evidence for the later Gulf-completion
    claim.
- `docs/knowledge-bank/README.md`
  - Added a public-safe summary of the source pass.
- `docs/knowledge-bank/anti-claims.md`
  - Added Water Publics prohibitions covering completion, sole credit,
    engineering, impact, representation, and rights.
- `docs/knowledge-bank/claims.md`
  - Added human-readable entries for the three new atomic claims.
- `docs/knowledge-bank/sources.md`
  - Added the protected Star citation and live Pitch corroboration.
- `docs/knowledge-bank/projects/water-publics.md`
  - Updated the project dossier, source boundaries, and projection decision.
- `evals/blind-spots/evidence/promotion-decisions.json`
  - Added current editorial decisions for every new mature unused claim.
- `evals/knowledge-lifecycle/baselines/feature-evals-C-1c89df56.json`
  - Rebound the frozen historical baseline to the expanded candidate file set
    without changing its recorded score.
- `evals/knowledge-lifecycle/model-judge.md`
  - Added explicit questions for protected newspaper handling, mid-voyage
    chronology, collective artifact credit, and premise-versus-impact limits.
- `scripts/run-knowledge-lifecycle-evals.mjs`
  - Added this research note to the candidate-bound lifecycle surface.
- `scripts/tests/knowledge-lifecycle.test.mjs`
  - Added regression tests for source metadata, collective credit, mid-voyage
    limits, construction attribution, civic-premise attribution, and private
    path or media leakage.
- `evals/knowledge-lifecycle/judgments/*.json`
  - Rebound independent lifecycle judgments to the final candidate and
    evaluation contract.
- `docs/evals/runs/feature-evals-C-knowledge-lifecycle.md`
  - Recorded this recursive source-ingestion cycle and its final results.
- `docs/knowledge-bank/research/kansas-city-star-raft-archival-production-2007.md`
  - Created this complete, public-safe production record.

## Recursive Evaluation Record

The source pass added deterministic regression coverage for rights handling,
private-path exclusion, crew credit, chronology, design attribution, civic
premise attribution, and the separation between mid-voyage reporting and later
completion evidence. It also added three model-judge questions covering the
same boundaries.

The knowledge-lifecycle candidate must score 100, receive passing independent
archival-editorial and public-safety-composition judgments, and pass twice with
the exact candidate and contract fingerprints. The unchanged public portfolio
must retain its application-ready score and pass twice. Blind-spot diagnostics
must account for all mature unused claims, including the three new Water
Publics claims. Exact final fingerprints and command results live in the pull
request and the versioned evaluation run log so this candidate-bound note does
not create a self-referential hash cycle.

## Recommended Future Composition

When Water Publics enters the public portfolio, compose these sources as a
sequence rather than a credential list:

1. an overlooked civic relationship to the river;
2. a collective recycled-material technical artifact;
3. a long journey through connected river communities;
4. interruptions, repairs, negotiation, and adaptation;
5. later participatory programs that returned the river to public imagination.

The composition should keep Jamie's originating and framing contribution
visible while preserving crew, supporter, community, publication, and image
credits. It should not become an adventure myth detached from the technical,
relational, and civic practice the evidence actually supports.
