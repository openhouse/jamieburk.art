# Citational Care

Citational care is the small evidence layer that lets the public site make
stronger claims without overclaiming. It is not a public evidence database and it
is not a replacement for human approval.

## Current Scope

The V1 pilot is CallNYC on `/work/callnyc`, with one reused proof citation on
`/work/technical-operations`.

The structured records live in `apps/www/src/data/knowledge-bank/`:

- `sources.json`: public or private source descriptions.
- `assets.json`: media or document assets, including rights and visibility.
- `claims.json`: bounded claims with public wording and prohibited wording.
- `evidence.json`: relationships between claims and sources, assets, or research
  runs.
- `research-runs.json`: documented searches, including negative findings.
- `corrections.json`: resolved or deferred corrections to site claims.
- `citation-groups.json`: public note groups that can be projected onto pages.
- `page-projections/*.json`: page-local citation placement.

The page components are `Cite` and `References` in
`apps/www/src/components/citations/`. They render same-page notes with
`doc-noteref`, `doc-endnotes`, `doc-footnote`, and `doc-backlink`.

## Rules

1. A public page may cite only public citation groups.
2. A citation group may include private evidence only through public-safe
   description, with a boundary note, and without publishing private file paths,
   asset URLs, images, raw metadata, or research artifacts.
3. Negative searches must stay bounded. "Not recovered in this search" is not
   the same claim as "never existed."
4. A correction with `required-before-production` blocks citation checks.
5. Reused citation groups get page-local numbering; each page starts at `[1]`.
6. Prohibited wording can live inside claim records, but not in public page copy.
7. The site should remain a composed portfolio. Do not add a public `/proofs`,
   `/knowledge-bank`, or `/citations` route for V1.

## Commands

```bash
npm run check:citations
npm run test:citations
npm run report:citations
```

`npm run check` includes the citation check and citation tests before the
standard app, knowledge-bank, public-safety, and route checks.

`npm run report:citations` writes `reports/citations.md`, a public-safe summary
for review. The report may be committed when it helps reviewers see the citation
state, but it must not contain private paths, raw private sources, private
images, or credential-like strings.

## CallNYC Pilot Decisions

- Use `2016`, not `2014-2015`.
- Civic Hall supports the January 30, 2016, 1-3 p.m. advertised session.
- The Council described the gathering as its first CouncilStat hackathon.
- "Digital District" is supported as visible breakout/table text only.
- The approximately 2:10 p.m. photograph timestamp is not the event start time.
- CallNYC is an independent follow-on after the complete dataset release, not an
  official Council product, commission, current service, legal guidance, or
  emergency guidance.
- A documented Wayback CDX pass did not recover a dedicated Civic Hall calendar
  listing or event-detail page. That does not prove one never existed.
