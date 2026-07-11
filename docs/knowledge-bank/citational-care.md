# Citational Care

## Purpose

Citational care connects selected factual, quantitative, and historical public
claims to inspectable evidence without turning the portfolio into a database or
exposing protected records. Public prose remains primary. A reader can ignore a
citation and still understand the sentence.

## Data model

The canonical machine-readable records live in
`apps/www/src/data/knowledge-bank/`.

- A **source** describes one public, archived, withheld, or private source.
- An **assertion** is one proposition that can be supported or rejected on its
  own.
- An **evidence relationship** says how a source bears on one assertion, where
  the evidence appears, what may be said publicly, and where it stops.
- A **research run** records a bounded search, including negative findings and
  method limitations.
- An **artifact** records an image, document, diagram, or screenshot together
  with evidence scope and rights status.

The evidence relationship, not the source record, is the public citation unit.
Use stable IDs with `SRC-`, `ASSERT-`, `EVID-`, `RUN-`, and `ART-` prefixes.
CallNYC records use the project code `CALL`.

## Citation-required claims

Exact dates and times, quantities, money, quotations, "first" claims, official
status, historical sequences, press claims, and institutional outcomes require
citations. Attribution must remain visible when a source supports only an
institution's characterization.

## Publication policy

Sources may link to a canonical URL, an archival preservation, both, or neither.
Original and archived URLs are related links, not interchangeable evidence. A
public source can still require approval, and a citable private source never
creates permission to expose its file.

Photographs may be direct, contextual, or representative evidence. A
representative image cannot prove a specific event. Rights and credit review are
separate from evidentiary relevance.

"Not recovered" describes the result of a bounded research pass. It must never
be rewritten as "did not exist" or "never happened."

## MDX authoring

```mdx
The Council described the gathering as its first CouncilStat
hackathon.<Cite evidence="EVID-CALL-NYCCOUNCIL-FIRST-COUNCILSTAT" />

<References />
```

The page companion manifest determines local numbering. Internal IDs do not
appear in visible prose.

## Authoring workflow

1. Write one atomic assertion.
2. Determine whether it needs a citation.
3. Add or reuse a source record.
4. Add an evidence relationship.
5. Add the evidence ID to the page manifest.
6. Place `<Cite>` after the supported sentence.
7. Render `<References />`.
8. Run `npm run check:citations`.
9. Review the public note and limitations as a human.

## CallNYC pilot map

The CallNYC pilot records the January 30, 2016 event date, Civic Hall venue,
Civic Hall's announced 1-3 p.m. hours, the Council-attributed first CouncilStat
hackathon description, promotional branding, the previewed dataset and purpose,
the independent follow-on chronology, data limitations, Politico coverage, and
the public repository.

The participant photograph and its "Digital District" placard remain protected
pending photographer credit and rights review. The Wayback capture preserves
embedded social posts; it is not represented as a recovered dedicated event
listing. The research run records that no dedicated page or complete agenda was
recovered, not that none ever existed.
