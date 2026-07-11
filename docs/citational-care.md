# Citational Care

Citational care is the portfolio practice for keeping public claims, supporting
evidence, limits, rights, corrections, and human review close together without
turning the site into a public archive browser.

The public page should stay clear for a hiring reader. The knowledge bank keeps
the evidence relationship inspectable for Jamie and future maintainers.

## Product Purpose

Use citational care when a public sentence is factual, quantitative,
historical, institutional, or externally verifiable. The goal is not to cite
everything. The goal is to cite the claims where overstatement, ambiguity,
rights, or historical drift would create risk.

## Model

The canonical model lives in `packages/knowledge-bank`.

- Sources describe public, archived, private-primary, or restricted records.
- Artifacts describe media or objects whose rights and consent need their own
  state.
- Claims define approved public wording, confidence, risk, guardrails, and
  anti-claims.
- Evidence edges describe how a source, artifact, or research run relates to a
  claim: supports, corroborates, preserves, contextualizes, qualifies,
  contradicts, or does-not-support.
- Citation groups are the page-visible notes that combine bounded claims and
  evidence edges.
- Research runs record bounded searches, including negative findings.
- Corrections preserve material revisions without keeping old wording public.
- Page projections define which citation groups appear on which page and in
  what order.

Stable IDs live in the bank. Visible citation numbers are page-local and are
computed from the page projection.

## Public Rendering

In MDX, use explicit server-rendered components:

```mdx
<Cite
  pageId="work.callnyc"
  occurrenceId="callnyc-outcome-follow-on"
  citationGroupId="citation.callnyc.independent-follow-on"
/>

<References pageId="work.callnyc" />
```

Do not type manual citation numbers into prose. Do not add hover cards,
popovers, runtime fetching, or a public graph browser for V1.

## Adding Records

To add a source, create a source record with visibility, linkability, authority,
rights, review state, and public-safe description. Public links are allowed only
for public or public-archived sources.

To add private primary evidence, summarize only what is needed for the public
claim. Do not commit private paths, cloud locators, raw metadata, filenames,
images, transcripts, contact lists, credentials, or unpublished correspondence.

To add a claim, write the approved public sentence, set confidence and risk,
define allowed or prohibited pages, and list anti-claims. Add evidence edges for
what supports the claim and what the evidence explicitly does not support.

To add a correction, record prior wording, revised wording, reason, supporting
evidence edges, review state, and date. Corrections are inspectable in reports
but are not automatically projected as public prose.

To add a page projection, add ordered occurrences. Repeated uses of the same
citation group reuse the same number, but each occurrence must have a unique ID.

## Commands

Run these from the repository root:

```bash
npm run check:citations
npm run test:citations
npm run report:citations
```

The checker enforces graph integrity, page restrictions, rights restrictions,
private-output boundaries, CallNYC chronology, and citation-component
accessibility contracts. The tests cover projection behavior and regression
risks. The report is a safe review surface for humans.

## CallNYC Pilot

CallNYC is the complete pilot. The public page now uses a 2016 chronology,
describes CallNYC as an archived independent prototype, cites the New York City
Council's first CouncilStat hackathon language, preserves the Wayback
embedded-feed limitation, summarizes the private Digital District photograph
without publishing it, and keeps current-service disclaimers visible.

The research-run rule is important: "not recovered within this search" is not
"never existed." Negative findings must keep that boundary.

## Never Commit

Do not commit private research paths, raw archive exports, raw transcripts,
private correspondence, legal-review materials, stakeholder lists, guest lists,
resident records, client-private documents, internal analytics, credentials,
tokens, unapproved screenshots, unapproved quotes, unapproved photos, or private
financial/personal records.
