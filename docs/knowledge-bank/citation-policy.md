# Citational Care

The portfolio cites selected dates, metrics, public funding, official language,
legal status, press coverage, quotations, and historical claims when an outside
reader benefits from verification. The public prose remains readable without
opening a note.

## Canonical model

`packages/knowledge-bank/` is the sole machine-readable citation system.

- **Source:** a publication, official post, public record, archive, press item,
  photograph, or other evidentiary object. Every source states what it establishes
  and what it does not establish.
- **Claim:** one atomic proposition with status, allowed surfaces, boundaries,
  anti-claims, review ownership, and optional professional proof-bank linkage.
- **Evidence relationship:** the exact support edge between a claim and a source
  or bounded research run, including confidence and limitations.
- **Citation group:** the proportionate public note. It may combine closely
  related claims and several sources without exposing every internal edge.
- **Page plan:** stable occurrences in reading order. Numbers are generated from
  first appearance and are never stored.
- **Research run:** a bounded method, scope, result, interpretation, and explicit
  statement of what a negative search does not prove.
- **Correction:** a durable record of a superseded and corrected value.
- **Artifact:** rights, consent, credit, visibility, caption limits, crop limits,
  evidentiary value, and publication permission for media or documents.

## States and boundaries

Claims may be `defensible`, `use-with-care`, `open`, `protected`, or
`superseded`. Citation groups may be `public`, `hold`, or `protected`. Sources may
be `public`, `public-metadata-only`, or `protected`.

Open, protected, or superseded claims cannot enter public groups. Protected
sources and artifacts cannot render. Public-metadata-only evidence may display a
reviewed description and `No public asset link`, but never a private locator.

Evidentiary value is not publication permission. A photograph may support an
internal claim while its image, crop, filename, identifier, people, and metadata
remain unavailable for public use.

## Support types

Source evidence may be direct, visible text, metadata, corroborating, contextual,
an archival carrier, participant-archive-only, or contradictory. Research-run
evidence may record a negative search result.

An archival carrier preserves other evidence; it is not silently presented as
the underlying event page. `Not recovered` means only that a record was not found
within the documented method and scope. It is not proof of nonexistence.

## Authoring syntax

The site uses one public API:

```mdx
Supported proposition.<Cite pageId="callnyc" id="stable-occurrence-id" />

<References pageId="callnyc" />
```

The occurrence ID maps to a citation group in the page plan. Repeated groups get
separate occurrence IDs but reuse one page-local number. Authors never write a
number, URL, source object, or second footnote syntax in MDX.

The explicit page plan is resolved on the server at build time. It requires no
client state, browser fetch, or source-site availability.

## Add or revise a citation

1. Add or review the source and its public/protected boundary.
2. Add one atomic claim with boundaries, anti-claims, and `proofId` where relevant.
3. Add exact evidence edges and limitations.
4. Add or revise one coherent public citation group.
5. Add a stable occurrence to the page plan.
6. Place `Cite` beside the exact proposition and render `References` once.
7. Run all citation and repository checks.

When revising a material public fact, add a correction record instead of silently
discarding the former value. Review public projections and the professional proof
bank for stale wording.

## Media workflow

Before a photograph, screenshot, graphic, diagram, or document is published,
review its source association, rights, consent, credit, visibility, caption
limits, crop limits, and what it does not establish. A representative image from
another event never inherits the evidentiary status of the actual event artifact.

## Checks

```bash
npm run check:citations
npm run test:citations
npm run report:citations
npm run check
```

The report is written to `reports/citations.md`. Ordinary builds never fetch X,
Wayback, or other evidence sites. Link-health reporting, if added later, remains a
separate non-blocking operation with short timeouts and no stored response bodies.

## Public-safety boundary

Do not commit raw transcripts, private correspondence, participant metadata,
private filenames or storage paths, unrestricted archive results, legal-review
material, private stakeholder lists, signed URLs, credentials, or unapproved
media. Do not add a public citation, proof, or knowledge-bank browser.

## Implementation references

- [Next.js MDX guide](https://nextjs.org/docs/app/guides/mdx)
- [WAI-ARIA Digital Publishing Roles 1.1](https://www.w3.org/TR/dpub-aria-1.1/)
