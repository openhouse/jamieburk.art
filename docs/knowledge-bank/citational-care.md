# Citational Care

Citational care is the portfolio's public practice for claims that depend on
dates, historical events, public records, press coverage, or externally
verifiable outcomes.

The goal is not academic decoration. The goal is to help a future reader see:

- what is being claimed;
- which public source supports it;
- how the source relates to the claim;
- what the source does not establish;
- where the wording remains qualified;
- how the claim can be corrected later.

## Public Architecture

The public registry lives in:

```text
apps/www/src/data/knowledge-bank/sources.json
apps/www/src/data/knowledge-bank/claims.json
apps/www/src/data/knowledge-bank/page-citations.json
apps/www/src/data/knowledge-bank/media.json
apps/www/src/data/knowledge-bank/research-runs.json
apps/www/src/data/knowledge-bank/corrections.json
```

The app validates those records with Zod and renders page-local numbered
references through reusable citation components.

The stable unit is the claim ID, not the visible number. A claim may be citation
1 on one page and citation 3 on another page. The visible number belongs to the
page; the claim ID belongs to the knowledge bank.

Public authoring uses:

- `<Cite />` when an editor writes natural prose and attaches one governed note;
- `<Claim />` only when canonical wording must stay identical across surfaces;
- `<References />` once near the end of the cited narrative.

The section label is "Notes & sources" because the public experience should
feel readable, not academic. The component still renders native same-page links,
DPUB noteref/backlink roles, and a bibliography section without requiring
client-side JavaScript.

## Evidence Relations

A citation records the relationship between a source and a claim:

- `supports`
- `corroborates`
- `qualifies`
- `contextualizes`
- `contradicts`
- `documents-negative-search`

Do not attach a reputable source to a sentence it only partially supports. A
source can be strong and still not prove the thing a page wants to say.

## Public Boundaries

Private material may inform Jamie's review, but it does not become a public
source merely because it exists.

Do not publish raw research exports, private correspondence, raw transcripts,
private coalition material, legal-review material, credentials, participant
photos without approval, or local filesystem paths.

When a source is useful but limited, the public reference should say so. A reader
should not have to guess whether a Wayback capture is a dedicated event listing,
an embedded social feed, or a negative search result.

## First Coverage

The first implementation covers:

- `/work/callnyc`
- `/work/technical-operations`
- `/colophon`

Future work can extend the same pattern to public records, metrics, archival
captions, press citations, and case-study outcomes across the rest of the site.

## Composite Lifecycle Records

The composite registry also carries records that may never render publicly:

- media records for rights, consent, public captions, archival captions, crop
  restrictions, and protected people;
- research-run records for bounded negative findings, including method, scope,
  result, and limitation;
- correction records for material wording changes such as `2014-2015` to
  `2016` and `first civic-data hackathon` to `first CouncilStat hackathon`.

A correction record keeps historical editing visible to reviewers. It is not a
public apology banner and it should not clutter the portfolio page.

## Validation Commands

```bash
npm run check:citations
npm run test:citations
npm run report:citations
```

The checker fails on duplicate IDs, missing references, protected evidence in
public projections, private/local paths, manual display numbers, unapproved
participant-photo projection, non-recovery used as positive proof, and unapplied
required corrections. It warns on source limits such as link-only or live-only
public sources.
