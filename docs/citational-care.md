# Citational Care

Citational care gives a reader an inspectable path from a consequential public
claim to the evidence that supports or limits it. It is not a demand to cite
every sentence or turn the portfolio into a public research database. The
sentence tells the story; the citation opens the record.

The existing portfolio proof registry remains in
`apps/www/src/data/proofs.ts`. The canonical source-level records in
`apps/www/src/data/knowledge-bank/` extend it for claims that need citations:

- `sources.ts`: source identity, public access, establishment, and limits;
- `claims.ts`: approved wording, evidence relationships, qualifiers,
  anti-claims, approval, and protected boundaries;
- `evidence-notes.ts`: public notes that may synthesize several sources;
- `page-manifests.ts`: allowed notes and ordered citation occurrences;
- `research-runs.ts`: bounded search methods and negative findings;
- `media.ts`: rights, consent, event association, captions, and crop limits;
- `corrections.ts`: dated changes to public wording as evidence evolves;
- `schemas.ts`: the Zod contracts for every record.

The public site is an edited projection. It is not a public source browser,
private archive interface, or substitute for human review.

## The Record Chain

A **source** is the thing inspected. Its `establishes` and
`doesNotEstablish` fields prevent later claims from silently exceeding it.

A **claim** is public wording the portfolio may say. An **evidence link** states
whether a source supports, qualifies, contextualizes, contradicts, or does not
support that claim.

An **evidence note** is what a visible citation number opens. One note may
explain converging sources and one necessary qualification. A **page manifest**
controls which notes may appear and their exact occurrence order.

A **correction** preserves the previous wording, revised wording, reason,
evidence added, and review status. Do not silently rewrite the governed record.

## Visibility

- `public`: safe to describe and link.
- `restricted`: an approved summary may render, but access and source details
  remain governed.
- `private`: retained as evidence; only an approved aggregate summary renders.
- `protected`: no public projection beyond an explicitly approved boundary.

A citation is not publication permission. A restricted photograph, email,
transcript, or internal record can support approved wording without exposing a
URL, path, filename, quotation, identity, or metadata.

## Page-Local Numbers

Source, claim, note, research, media, page, and correction IDs are stable.
Visible numbers are assigned from the manifest by first appearance on each
page. A repeated note reuses its number, while every occurrence receives its
own anchor and backlink. Numbers reset on a new page.

Authors never type visible numbers manually.

## Authoring

For a note used once on a page:

```tsx
The Council described the gathering as its first CouncilStat hackathon
<Cite noteId="callnyc-event-branding-councilstat" />.
```

When the same note appears more than once, add its stable manifest occurrence:

```tsx
<Cite noteId="callnyc-product-method" refId="callnyc-data-limits" />
```

Render the final same-page notes with:

```tsx
<References pageId="callnyc" />
```

Attach a marker to the exact sentence or clause it supports. Keep the public
sentence understandable without opening the note.

## Add A Source Or Claim

1. Choose a stable, non-sensitive ID.
2. Record visibility, availability, establishment, non-establishment, and an
   accurate public note.
3. Add URLs only to public sources. Label original posts, archived copies,
   images, and contextual carriers distinctly.
4. Add evidence links with plain support and limitation notes.
5. Add an evidence note and its ordered page-manifest occurrence.
6. Run citation validation, tests, and the report.

## Summary-Only Citations

Use `renderMode: "summary-only"` when an approved public summary can be shown
but the underlying evidence should not be itemized or linked. The Digital
District photograph and private archival research use this mode. Summary-only
does not weaken validation: source and claim IDs still resolve internally.

## Bounded Negative Findings

“Not recovered” is not “did not exist.” A `ResearchRunRecord` must preserve the
purpose, date, method, query scope, tools, reviewed counts, finding, and at
least one limitation. Public wording must say that nothing matching was
recovered **in the documented search** and that the result does not prove the
source never existed.

Raw corpora and working paths remain outside Git and Docker.

## Photographs, Rights, And Consent

Photographic evidence needs both a `SourceRecord` and a
`MediaEvidenceRecord`. Record event association, visible evidence, rights and
consent status, public and archival captions, protected people when approved,
and crop restrictions. Do not commit the image, filename, private path, raw
metadata, or identities merely to make the citation appear complete.

Visible text supports only what it shows. A placard does not establish a full
agenda; a timestamp does not establish an event schedule.

## Add A Correction

Add a `CorrectionRecord` with the affected object IDs, date, previous and
revised public text, reason, evidence added, and status. `recorded` corrections
warn until reviewed. Publish revised wording only after the evidence and
projection surfaces have been checked together.

## Accessibility And Print

- Markers and backlinks are real anchors with DPUB-ARIA link roles.
- Accessible names describe the note while visible labels remain compact.
- Ordered references, focus outlines, target highlighting, sticky-header
  offsets, and source boundaries do not depend on color alone.
- Forward and return navigation work in server-rendered HTML without client
  JavaScript.
- Long links wrap at narrow widths and print with their full URLs.

## Commands

```bash
npm run check:citations
npm run test:citations
npm run report:citations
npm run check
```

`check:citations` validates records, projections, manifest/MDX parity,
privacy, anti-claims, corrections, and the CallNYC chronology. The unit tests
cover numbering, reset, repeated notes, anchors, backlinks, labels, redaction,
summary-only mode, bounded negative findings, correction resolution, and
server-rendered semantics. The report provides a human-readable review trail
without fetching external URLs.
