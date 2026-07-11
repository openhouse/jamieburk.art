# Citational Care

## Purpose

Citational care connects consequential factual, quantitative, and historical
claims to inspectable public evidence without turning the portfolio into a
database or exposing protected records. Public prose remains primary.

## Canonical model

The canonical machine-readable records live in
`apps/www/src/data/knowledge-bank/`.

- A **source** describes a publication, record, post, image, repository, or
  public-safe research summary, including visibility, links, rights, and limits.
- An **assertion** is one separately supportable proposition.
- An **evidence relationship** says how one source bears on one assertion and
  identifies its locator and public-use status.
- A **research run** records a bounded search and the limits of a negative
  finding.
- An **artifact** distinguishes direct, contextual, and representative media,
  as well as rights and public-use status.
- A **correction** preserves a material public revision and its resolution or
  follow-up state.
- A **citation note** composes tightly related evidence relationships into one
  concise public note without erasing their boundaries.
- A **page manifest** defines first-appearance order and unique occurrence
  anchors. Public numbers are computed, never stored.

Stable IDs use `SRC-`, `ASSERT-`, `EVID-`, `RUN-`, `ART-`, `CORR-`, `NOTE-`, and
`PAGE-` prefixes.

## Public policy

The evidence relationship is the epistemic unit; the citation note is the
presentation unit. A source supports only the assertions named by its evidence
records. Notes may combine evidence only when it bears on one coherent sentence
or paragraph.

Sources are public, public-metadata-only, or protected. Rights status and public
citation policy are independent: a source's existence does not create
permission to link, quote, or publish it. Original and archived links remain
distinct. A Wayback carrier preserving an embedded post is not automatically a
recovered event page.

Representative media cannot directly prove a specific event. "Not recovered"
describes a bounded research outcome and never means "did not exist."

## Authoring workflow

1. Write one atomic assertion.
2. Add or reuse a source and evidence relationship.
3. Confirm visibility, rights, locator, support, and limitation.
4. Compose or reuse a public citation note.
5. Add the note and unique occurrence to the page manifest.
6. Place `<Cite note="NOTE-ID" occurrence="unique-id" />` after punctuation.
7. Render `<References />` once.
8. Run `npm run check:citations`, `npm run test:citations`, and
   `npm run report:citations`.
9. Review the public wording and boundary as a human.

Authors never type citation numbers. Reusing a note ID reuses its page-local
number; each occurrence retains a unique anchor and backlink.

## CallNYC pilot

The pilot records the January 30, 2016 event, Civic Hall's announced 1-3 p.m.
window, the Council-attributed first CouncilStat characterization, promotional
branding, the independent follow-on chronology, CouncilStat interpretation
limits, Politico coverage, and the public repository.

The participant photograph remains metadata-only with pending rights review and
cannot enter a public note. The archival research run records that no dedicated
event page or complete agenda was recovered, not that none ever existed. First-
class correction records preserve the year and chronology revision, including
the remaining resume-PDF regeneration task.
