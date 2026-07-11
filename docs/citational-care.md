# Citational Care

Citational care gives a reader an inspectable path from a consequential public
claim to the evidence that supports or limits it. It is not a demand to cite
every sentence or turn the portfolio into a research database. The sentence
still has to tell the story; the citation opens the record.

The existing proof registry in `apps/www/src/data/proofs.ts` remains the
portfolio-level claim index. The typed records in
`apps/www/src/data/knowledge-bank/` extend it for claims that need source-level
citational care:

- `sources.ts` records source identity, access, visibility, and public notes;
- `claims.ts` records claim wording, status, confidence, evidence links,
  approval, qualifiers, and anti-claims;
- `citation-notes.ts` composes one or more claims and sources into a public
  evidence note;
- `research-runs.ts` records bounded search methods and negative findings;
- `media.ts` records rights, consent, event association, and caption limits;
- `page-citations.ts` declares citation occurrences in reading order;
- `schemas.ts` validates every record with Zod.

The public site is an edited projection of these records. It is not a public
evidence dump, private archive browser, or substitute for editorial review.

## Source, Claim, And Evidence Note

A **source** is the thing inspected: an official post, article, graphic,
repository, participant photograph, or governed research run.

A **claim** is the sentence the portfolio may say. It includes the exact
evidence relationship, confidence, projection surfaces, approval owner,
qualifiers, anti-claims, and protected boundary.

An **evidence note** is what a visible citation number opens. It may bring
several sources together when convergence is the clearest explanation. It says
what those sources establish and preserves the limitation a reader needs.

Evidence and inference remain separate. A placard can establish its visible
wording; it cannot establish a complete agenda or formal event title.

## Visibility

- `public`: safe to describe and link.
- `restricted`: an approved public-safe description may render, but source
  access, paths, metadata, and protected content may not.
- `private`: retained as governed evidence; only an approved aggregate
  description may render.
- `protected`: no public projection beyond an explicitly approved boundary.

A citation is not publication permission. Restricted or private evidence may
support approved wording without exposing a URL, filename, local path, raw
metadata, participant identity, or quotation.

## Evidence Relationships

- `supports`: directly helps establish the claim.
- `qualifies`: narrows the claim or adds a condition a reader needs.
- `contextualizes`: explains surrounding conditions without proving the whole
  claim.
- `contradicts`: provides evidence against the claim.
- `does-not-support`: records a tempting inference the source cannot establish.

Use a limitation note whenever a source could easily be asked to prove too
much.

## Page-Local Numbering

Stable source, claim, and note IDs are never visible numbering. A page manifest
lists citation occurrences in reading order. `buildCitationSet` assigns the
first distinct note number `1`, the next `2`, and so on. Reusing a note ID on
the same page reuses its number. Only notes present in the page manifest appear
under References.

Each occurrence gets a unique anchor. References link back to every occurrence.
Numbers, links, and References render as ordinary server HTML and work without
JavaScript.

## Authoring

Import the page citation set and use note IDs rather than numbers:

```tsx
import { Cite, References } from "@/components/citations";
import { callNYCCitationSet } from "@/lib/page-citations";

<p>
  Civic Hall announced the gathering for January 30, 2016.
  <Cite
    set={callNYCCitationSet}
    noteId="callnyc-event-date-time"
    refId="callnyc-opening-event"
  />
</p>

<References set={callNYCCitationSet} />
```

`refId` identifies a unique occurrence from `page-citations.ts`; authors never
type the visible number. For a note used only once, `refId` may be omitted.
Grouped citations use `noteIds` and, when needed, matching `refIds`.

Place the marker immediately after the clause or sentence it supports. Put
`<References />` after the substantive case-study content.

## Add A Source Safely

1. Choose a stable, non-sensitive ID.
2. Add the source to `sources.ts` with kind, visibility, availability, and an
   accurate public note.
3. Add public URLs only when visibility is `public`.
4. Label archived carrier relationships explicitly; a carrier page is not the
   original source or a recovered event listing.
5. State what the source does not establish in the claim evidence link.
6. Run `npm run check:citations`.

Private source material stays outside this repository. Do not commit raw
captures, transcript text, research exports, photographs, correspondence,
private metadata, local paths, or credentials to make a reference look more
complete.

## Record A Not-Recovered Finding

“Not recovered” is not “did not exist.” Record the purpose, method, reviewed
scope, finding, and at least one limitation in a `ResearchRunRecord`. The public
claim must say that nothing matching was recovered **in the documented search**
and must state that this does not prove the source never existed.

Raw research corpora and working paths remain outside the repository. The
public Knowledge Bank stores only governed counts, method, finding, and limits.

## Photographs, Rights, And Consent

A photograph needs a `SourceRecord` and a `MediaEvidenceRecord`. Record rights
status, consent status, event association, visible evidence, caption limits,
and crop restrictions. Do not add the image, filename, private path, protected
people, raw metadata, or photographer identity unless each item is approved for
this public repository.

Visible content supports only what it actually shows. A timestamp does not
establish an event schedule; a placard does not establish a full agenda.

## Accessibility And Print

- Citation markers are real links inside `sup`, with `role="doc-noteref"` and
  descriptive accessible names.
- References use a native ordered list inside `role="doc-endnotes"`.
- Every note links back to each cited occurrence.
- Focus remains visibly outlined, and anchors use scroll margin for the sticky
  navigation.
- Long titles, qualifications, and URLs wrap on narrow screens.
- Print output keeps bracketed numbers and References legible and prints public
  source URLs.

The feature does not require hovercards, JavaScript, or a public source browser.

## Validation

Run:

```bash
npm run check:citations
npm run check
```

The citation check validates schema shape, duplicate IDs, references among
sources, claims, notes, and pages, approval and evidence requirements, public
projection safety, archive-carrier labels, bounded not-recovered findings,
production-safe URLs, accessible titles, deterministic numbering, unique
anchors, backlinks, restricted-source redaction, and the corrected CallNYC
year. It does not fetch external URLs.

Warnings identify editorial follow-up such as a live URL without an archive
fallback, a high-impact claim with one source, a dead source, incomplete media
rights or consent, or a qualified claim whose public wording needs review.
