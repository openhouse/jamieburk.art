# Citational Care

Citational care is the portfolio's practice for turning archival knowledge into
public-safe claims without overstating Jamie's role, exposing private material,
or flattening collective work.

The machine-readable citation layer lives in `packages/knowledge-bank/`. The
public website imports from that package and renders page-local citation numbers
through MDX components:

```mdx
<Cite pageId="work.callnyc" citationId="citation.callnyc.follow-on" />
<ReferenceList pageId="work.callnyc" />
```

Do not type manual citation numbers into MDX. The page plan controls numbering.

## Source Records

Each source record states what the source is, whether it is publicly linkable,
what it supports, and what it does not support. Public sources may expose public
URLs. Private sources must not expose URLs, private paths, raw metadata, images,
or private filenames.

For CallNYC, the current source layer includes public Civic Hall and New York
City Council posts, a public Wayback embedded-feed capture, Politico New York
coverage, the public GitHub repository, and a private participant photograph
summarized without publication.

## Claims And Anti-Claims

Every significant public claim should have a claim record, a support level,
source evidence, and anti-claims. Anti-claims are not timid caveats; they are
guardrails that preserve accuracy under pressure.

For CallNYC, do not say:

- Jamie organized, led, or officially represented the New York City Council
  event.
- CallNYC was an official Council product, commissioned Council service, or
  formal hackathon submission.
- "Digital District" was the overall event title.
- A participant photograph timestamp was the event start time.
- Jamie caused the CouncilStat release.
- CouncilStat counts were simple measures of office quality or measured service
  improvement.

## Public Page Rules

Use citations for chronology, institutional context, role claims, project
sequence, metrics, and limits.

Keep private evidence summarized and unlinked. A private source can support a
bounded public claim without becoming a public artifact.

Use page-local reference lists so public pages stay readable. The website is a
projection of the knowledge bank, not the whole archive.

## Checks

Run:

```bash
npm run citations:check
```

The check fails duplicate IDs, broken source/claim/citation references,
public-linkable sources without URLs, private sources that expose URLs, manual
citation numbers, restricted path markers, missing page-plan citations, missing
accessibility contracts, and CallNYC chronology regressions.
