# Citational Care

The portfolio uses citations selectively for dates, metrics, public funding,
official language, legal status, press coverage, quotations, and other factual
propositions an outside reader may reasonably want to verify. Ordinary method,
interpretation, and role-fit statements do not need markers unless they contain
a separately verifiable claim.

The public prose should remain readable without opening a note. Citations add
provenance and limits; they do not turn the site into an evidence repository.

## Record model

The machine-readable layer lives in `apps/www/src/data/knowledge/`:

1. A **Source** records public metadata, public links, what it establishes, and
   what it does not establish.
2. A **Claim** records the exact proposition, status, allowed surfaces,
   boundaries, anti-claims, approval owner, and review date.
3. An **Evidence relationship** says how one source supports one claim, with an
   exact support statement, confidence, limitations, and public-citation flag.
4. A **Research audit** records method, scope, result, interpretation, and what a
   negative search does not prove.

Numbers are page-local presentation, not record IDs. Stable source and claim IDs
remain canonical.

## Source classes and boundaries

Sources may be official pages or posts, archived captures, press, public project
artifacts, public records, photographs, participant archives, or research
audits. Visibility is `public`, `public-metadata-only`, or `protected`.

Never expose a private path, raw transcript, private message, unapproved image,
participant metadata, or protected archive. A protected source may preserve a
knowledge boundary in the bank, but it cannot render or link publicly.

An archival carrier establishes preservation context. It is not silently
presented as the underlying page. A negative search result means only that a
record was not recovered within the documented method and scope; it is not
proof that the record never existed.

## Add and cite a claim

1. Add the source to `sources.json`, including `establishes` and
   `doesNotEstablish`.
2. Add the proposition to `claims.json`, including status, allowed surfaces,
   boundaries, and anti-claims.
3. Add one or more relationships to `evidence.json`, with exact `supportsText`
   and limitations.
4. Add a stable occurrence and claim ID to the route entry in `pages.json`.
5. In MDX, import the resolved page manifest and author the occurrence, never a
   number or URL:

```mdx
import { callnycCitationPage } from "@/data/knowledge";

Supported proposition.<Cite page={callnycCitationPage} occurrence="announced-schedule" />

<SourceNotes page={callnycCitationPage} />
```

The explicit page manifest is the static, server-rendered fallback described in
the implementation brief. It keeps numbering generated, avoids browser state,
requires no external fetch, and makes every occurrence reviewable in the small
current site. A compile-time MDX transform can replace it later if citation
volume makes that simpler.

## Checks

```bash
npm run check:citations
npm run test:citations
npm run report:citations
npm run check
```

The report is written to `reports/citations.md`. Link health is intentionally not
a production-build dependency.

## Implementation references

- [Next.js MDX guide](https://nextjs.org/docs/app/guides/mdx)
- [WAI-ARIA Digital Publishing Roles 1.1](https://www.w3.org/TR/dpub-aria-1.1/)
