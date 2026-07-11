# Citation Policy

Citational care makes consequential public claims inspectable without turning
the portfolio into a research database or exposing protected evidence.

## Citation Placement

- Place citations immediately after the precise claim they support.
- Do not collect unrelated citations at the end of a long paragraph.
- Cite consequential facts, dates, metrics, press coverage, official actions,
  and reconstructed historical claims.
- Do not cite ordinary positioning language merely to make it look scholarly.

## Source Precision

- State what a source supports and what it does not support.
- A source can be official and still be incomplete.
- An archive capture can preserve embedded evidence without being the original
  event page.
- A timestamp is not automatically a schedule.
- A promotional graphic is not automatically a formal event title.
- Project-album membership and People associations are retrieval cues, not
  proof of identity, consent, role, or authorship.

## Negative Research

Use “not recovered in this search.” Do not convert that bounded finding into
“did not exist.” Store the search scope, finding, and limitations in a
research-run record.

## Private Evidence

Private evidence may support a bounded public claim. Never expose private paths,
unapproved files, location records, face tags, or raw metadata. A private source
receives a text-only reference entry. Public citation does not imply public
access to the underlying source.

## Photographs

Distinguish evidentiary photographs from representative photographs. Caption
representative images explicitly. Do not use a generic photograph as though it
documents a specific event. Rights and consent review is separate from factual
relevance.

## Numbering

Stable semantic IDs live in the Knowledge Bank. Visible numbers are generated
per page from first evidence appearance. Never hardcode citation numbers into
prose or canonical records.

## Access and Linking

- A public-link source must provide a verified public or archived URL.
- A private source must not contain a public URL.
- The ordinary checker is offline and deterministic.
- Link availability may be reviewed separately, but a temporary source outage
  must not block the normal build.

## Public Repository Rule

Everything committed to this repository is public. Knowledge Bank records and
research notes must themselves be public-safe. Private research and source
artifacts remain outside the repository.

## Contributor Workflow

1. Add or update stable source, evidence, and claim records.
2. State support and boundaries at the evidence and claim levels.
3. Add the claim to a page projection only when that surface is allowed.
4. Place `<Cite />` immediately after the matching MDX claim.
5. Confirm the case-study metadata selects the same citation page.
6. Run `npm run check:citations` and the full `npm run check` suite.
