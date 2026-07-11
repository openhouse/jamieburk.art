# Citational Care

Citational care connects a concise public claim to an inspectable evidence
record without turning the portfolio into a public archive browser.

The governing relationship is:

```text
claim -> evidence relationship -> source -> boundary -> public projection -> correction path
```

The superscript number is presentation. The durable system is the relationship
among the claim, the evidence that supports it, the evidence that does not, and
the public surface where the wording is allowed.

## Canonical Data

Machine-readable records live in `apps/www/src/data/knowledge-bank/`:

- `sources.ts` describes each source and its publication boundary.
- `claims.ts` describes what may be said and what must not be inferred.
- `citation-pages.ts` defines page-local source order and citation occurrences.
- `schema.ts` validates record shape with Zod.
- `index.ts` resolves citations and backlinks for server rendering.

The existing `apps/www/src/data/proofs.ts` remains the hiring-facing proof
projection. When a proof has a citation-backed claim, its source note should
point to the canonical citation record instead of creating an independent
historical account.

## Source Visibility

- `public`: title, citation, and approved public URLs may render.
- `public-metadata-only`: a bounded description may be stored, but no underlying
  asset or URL may render.
- `private`: a safe description and opaque locator may exist; the material stays
  outside the repository and deploy image.
- `protected`: the source is intentionally withheld because privacy, consent,
  legal, safety, or client-trust obligations require it.

An opaque `protectedLocatorId` is a lookup key, not a path. Never place local
paths, private URLs, email IDs, signed links, or unapproved names in that field.

## Claim Status

- `confirmed`: direct evidence supports the public projection.
- `confirmed-with-boundary`: evidence supports the projection only at the stated
  scope.
- `use-with-care`: useful internal knowledge that requires additional review or
  should remain off public surfaces.
- `inference`: a reasoned interpretation, not a direct fact.
- `not-recovered`: a bounded research result recording that a sought source was
  not found. This does not prove the source never existed.
- `disallowed`: wording that must not be projected publicly.

## Evidence Relationships

Evidence is not a flat URL list. Each relationship records:

- which source is involved;
- whether it directly supports, corroborates, contextualizes, limits, or
  contradicts the claim;
- which part of the claim it supports;
- confidence;
- whether the source may render as a public citation;
- and any public boundary note.

Private support may strengthen internal understanding without becoming a public
citation.

## Page-Local Numbering

Source IDs are stable. Citation numbers are not. Each page manifest defines a
`sourceOrder`, and the first item is `[1]`, the second `[2]`, and so on for that
page only. Reusing a source reuses its number. Every citation occurrence gets a
unique anchor so one endnote can link back to every place it was cited.

Authors never type a citation number. In MDX, place the component immediately
after the supported clause or sentence:

```mdx
The Council described the gathering as its first CouncilStat hackathon.
<Cite pageId="callnyc" occurrenceId="first-councilstat-hackathon" />
```

`CaseStudyLayout` renders `<References pageId={item.slug} />` at the bottom of
the case study. Pages without a manifest receive no endnotes section.

## Adding A Source

1. Assign a stable source ID.
2. Record source kind, visibility, preservation status, and public citation.
3. Add only URLs that are already public and appropriate for publication.
4. State what the source generally supports and what it does not establish.
5. For non-public material, keep the asset elsewhere and use only a safe
   description plus an opaque locator.

## Adding A Claim

1. Write the internal claim precisely.
2. Add a shorter public projection only when it is defensible.
3. Assign status, approved surfaces, and review date.
4. Connect each evidentiary relationship and state exactly what it supports.
5. Add boundaries and anti-claims.
6. Add page occurrences only for renderable public evidence.
7. Run the citation and public-safety checks.

## Checks

```bash
npm run check:citations
npm run check
npm run public-safety
```

`check:citations` is deterministic and offline. It validates IDs, references,
surface permissions, renderability, private-source boundaries, CallNYC wording,
and the public PDF. External URL health should remain an optional warning-only
process and must not run during builds.

## Correction Path

Public endnotes state source boundaries and link to the site's contact route.
Corrections should update the source record, evidence relationship, claim,
affected page occurrences, and projected copy together. The record remains
inspectable and correctable; a correction is maintenance, not failure.

## Never Commit

- local filesystem or Photos-library paths;
- raw research dumps or temporary captures;
- private participant photographs;
- private emails, transcripts, or coalition materials;
- signed URLs, credentials, or private cloud links;
- unapproved identification or face-recognition data;
- a public knowledge-bank browser.

AI may assist. Humans review. Claims remain inspectable. Sources retain
boundaries.
