# Citational Care

Citational care is the practice of making public claims inspectable without
turning the portfolio into an evidence dump. A reader should be able to learn
why a claim is supportable, how strongly, in what sense, and where the evidence
stops.

The first complete vertical slice is `/work/callnyc`.

## Architecture

The canonical citation data lives in
`apps/www/src/data/knowledge-bank/`:

- `sources.json` describes public and protected source records;
- `claims.json` stores canonical claims, public projections, boundaries, and
  anti-claims;
- `evidence.json` states the exact relationship between a claim and a source;
- `citation-notes.json` contains authored public reference prose;
- `pages.json` maps page occurrences to stable note IDs;
- `artifacts.json` keeps rights and representation boundaries for media;
- `research-runs.json` records bounded research methods and negative findings;
- `corrections.json` tracks contradictions that must be resolved before
  production.

`apps/www/src/data/proofs.ts` remains the broader public proof projection. When
a proof is migrated into the citation layer, its public wording must match the
canonical claim projection. `npm run check:citations` enforces that parity for
the first CallNYC migration.

Citation numbers are not stored. They are generated in first-use order for each
page. Stable IDs belong to claims, sources, evidence relationships, notes, and
occurrences.

## Source, Claim, And Evidence

A **source** is a public or protected record. It must say both what it
establishes and what it does not establish. A URL alone is not provenance.

A **claim** is a bounded assertion. It includes its allowed surfaces,
publication posture, citation policy, boundaries, and anti-claims.

An **evidence relationship** explains how one source bears on one claim. Direct,
corroborating, contextual, archival-carrier, visual, negative-search, and
does-not-support relationships are not interchangeable.

A **citation note** is concise public editorial prose. It may combine several
public sources into one note, but only when they support the same bounded claim
or tightly related clause. Citation prose is authored, not generated from link
titles.

## Authoring In MDX

Import the explicit server components and resolved page manifest:

```mdx
import { Cite, References } from "@/components/citations"
import { callnycCitationPage } from "@/data/knowledge-bank"

The Council described the gathering as its first CouncilStat
hackathon.<Cite
  page={callnycCitationPage}
  occurrence="councilstat-framing"
/>

<References page={callnycCitationPage} />
```

The occurrence ID is stable and declared in `pages.json`. The resolver assigns
the page-local number. Repeated occurrences of the same note reuse one number
and receive separate backlinks.

Place a citation immediately after the clause or sentence it supports. Split
unrelated claims rather than asking one note to carry several propositions. Do
not cite headings. The prose must remain readable when citations are ignored.

## Authoring In TSX

The same `Cite` and `References` components can be used from server-rendered
TSX. Add the route and occurrence to the page manifest first, then resolve and
pass that page object. Do not introduce client state merely to assign numbers.

## Public Status And Uncertainty

Only a `ready` citation note composed from `defensible` claims and public
evidence may render. Claims marked `use-with-care`, `open`, `protected`, or
`superseded` fail closed in a public note.

Preserve attribution in the claim itself. For example:

> New York City Council described the gathering as its first CouncilStat
> hackathon.

Do not shorten this to an unattributed assertion or broaden it to the Council's
first civic-data event of every kind.

Use `boundaries` for qualifications a reader should understand. Use
`antiClaims` for plausible but unsupported formulations that checks and editors
must prevent.

## Negative Research Findings

A negative search result describes a method and a bounded result. It does not
prove nonexistence.

Record:

- the subject and date;
- the search method;
- quantitative scope where available;
- what was not recovered;
- limitations and `doesNotProve` statements;
- an opaque private artifact ID when private research materials exist.

Never commit the private filesystem location behind that opaque ID.

## Photographs And Other Media

Participant photographs are not interchangeable with institutional records. A
photo may support visible wording, spatial arrangement, or capture time. By
itself it does not establish an official event title, organizer role, agenda,
attendance, or institutional claim.

Before publication, record rights status, creator or credit, represented-people
review, crop boundaries, alt text, and what the image does not establish. The
Digital District photograph remains protected and unlinked until that workflow
is complete.

## Corrections

When current public artifacts contradict newly bounded evidence, add a
correction record. A `required-before-production` correction may remain visible
to maintainers while staging is reviewed, but `npm run preflight:production`
must fail until it is resolved.

The current CallNYC résumé correction is intentional: the PDF uses the broader
phrase "first civic-data hackathon." The approved editable résumé source is not
in this repo, so the binary is not silently rewritten here.

## What Never Belongs Here

Do not commit private paths, raw transcripts, private correspondence,
credentials, subscriber or donor data, private coalition records, client-private
materials, uncleared images, unapproved quotes, legal-review materials, or a
private research archive. Store public-safe descriptions and opaque external
artifact IDs instead.

There is intentionally no public `/sources`, `/proofs`, `/knowledge-bank`, or
`/public-claims` route. The website is a purposeful projection from the bank.

## Checks And Reports

```bash
npm run check:citations
npm run test:citations
npm run report:citations
npm run check:citation-links
```

`check:citations` and `test:citations` run inside `npm run check`.
`report:citations` regenerates `reports/citations.md`.
`check:citation-links` is an optional, non-blocking network audit and must not
run during a build or production startup.

Review citations editorially as well as mechanically:

1. Read the public sentence and note together.
2. Open every linked source and inspect the relevant locator.
3. Confirm the source supports the exact words, not merely the topic.
4. Check attribution, chronology, causality, collective credit, and current
   status.
5. Read `doesNotEstablish`, boundaries, and anti-claims.
6. Verify keyboard, zoom, mobile, print, and no-JavaScript behavior.
7. Resolve every production correction before an indexable deployment.
