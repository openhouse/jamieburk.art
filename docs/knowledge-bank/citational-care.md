# Citational care

Citational care keeps a public sentence connected to the evidence, boundary,
editorial decision, and correction path that make the sentence defensible.
The reader should encounter a calm sentence, a small numbered reference, and a
readable Sources and notes section. The repository should retain the fuller
reasoning without exposing private evidence.

## Canonical flow

```text
intake -> source -> close reading -> evidence relationship -> claim maturity
       -> publication decision -> approved projection -> page occurrence
       -> page-local number -> public note
```

See `lifecycle.md` for accession, research-task, maturity, and publication
rules. Citational care governs the final evidence-to-reader path; the lifecycle
governs how a fragment becomes eligible for that path.

Stable IDs belong to sources, claims, inquiries, corrections, pages, and
occurrences. Citation numbers are deliberately local to a page and are assigned
by first source appearance. Reusing a source reuses its number while creating a
unique backlink for each occurrence.

The canonical machine-readable records live in
`apps/www/src/data/knowledge-bank/records.ts`. The generated, redacted public
projection is `public-registry.json`. The app imports only the redacted
projection; validators and reports inspect the canonical registry.

Run `npm run generate:citations` after changing canonical records. Never edit
the generated registry by hand.

## Claims and projections

A claim stores an internal proposition, status, evidence relationships,
boundaries, anti-claims, review history, and one or more surface-specific
projections. A projection can be active, held, deprecated, or disallowed.

Use `<Claim>` for atomic wording where drift would create factual risk. It
refuses missing, inactive, or unauthorized projections. Use `<Cite>` for
supported prose that reads better as an authored paragraph. Never type citation
numbers manually.

```mdx
<Claim
  claimId="CLM-CALLNYC-FIRST-COUNCILSTAT-HACKATHON"
  projection="case-study"
  surface="/work/callnyc"
  pageId="callnyc"
  occurrenceId="first-councilstat-hackathon"
/>
```

`CaseStudyLayout` renders `<References>` automatically when a page plan exists.
`SourceNote` is the shared formatter for original, archived, asset, and
boundary links.

## Adding evidence

1. Add or reuse one stable source record.
2. Describe what the source supports and what it does not establish.
3. Add an evidence relationship to the exact claim proposition it supports.
4. Add an approved projection for each permitted surface.
5. Add a page occurrence and place its sources in first-appearance order.
6. Regenerate the public registry.
7. Run the citation checks, tests, and report.

One claim may use several sources with distinct roles: direct support,
corroboration, context, boundary support, contradiction, or private support.
The page plan preserves their editorial order.

## Research inquiries

An unsuccessful search is a finding about a documented search, not proof that
the missing object never existed. A public `not-recovered` projection requires
an inquiry record with method, result, limitations, and explicit surface
permission. Use “not recovered,” never “did not exist.”

## Corrections

Correction records preserve previous wording, replacement wording, reason,
decision date, and affected surfaces. Retired wording may remain inside
correction history, anti-claims, tests, and research documentation. It may not
remain in active public projections.

## Media and private sources

Photographs and archival artifacts may support an internal claim while being
unavailable for display. Record media kind, rights status, consent status,
display status, safe visible-text description, limitations, and an opaque
locator when necessary.

Never commit local paths, private cloud URLs, signed URLs, raw photos, private
emails, transcripts, CDX dumps, credentials, or coalition-private materials.
Opaque protected locators may exist only in canonical records used by offline
tools. They must not enter `public-registry.json`, `.next`, HTML, RSC payloads,
or client bundles.

There is no public Knowledge Bank, proofs, or citation API route.

## Commands

```bash
npm run generate:citations
npm run check:citations
npm run test:citations
npm run report:citations
```

The generated report is written to the ignored path
`reports/generated/citations.md`.
