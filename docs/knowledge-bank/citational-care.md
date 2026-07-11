# Citational Care

Citational care connects a public sentence to an inspectable claim, its evidence
relationships, its sources, and the boundaries that keep the sentence accurate.
The visible superscript is only the reader-facing edge of that system.

## Model

- **Source:** a public, archived, protected, private, or unrecovered record.
- **Claim:** the precise statement the evidence supports, plus qualifiers,
  limitations, anti-claims, approval state, and allowed surfaces.
- **Evidence relationship:** how one source bears on one claim: direct,
  corroborating, contextual, limiting, or contradicting.
- **Research inquiry:** a bounded method and result, including negative findings
  and what the search cannot prove.
- **Correction:** prior wording, corrected wording, reason, production impact,
  and resolution state.
- **Asset:** provenance, visible text, rights, consent, publication status, and
  allowed surfaces for a photograph or artifact.
- **Citation set:** the claims used on one page, ordered by first appearance.

The canonical citation dataset lives in `apps/www/src/data/citations/`. It
extends the professional proof records in `apps/www/src/data/proofs.ts`; a
citation claim may use `proofId` to identify the broader proof it substantiates.

## Evidence And Visibility States

Evidence states distinguish primary verification, corroboration, independent
reporting, archive support, responsible inference, records not recovered, and
unresolved questions. Source visibility distinguishes public,
public-with-limits, protected, and private material. Availability separately
records whether a source is live, archived, unavailable, redirected, or not
recovered.

A protected source may supply safe citation text without exposing a link,
filename, storage location, private metadata, image, or identity record. A
private source should never become public merely because it supports a public
claim.

## Negative Findings

An unsuccessful search is evidence about the defined search, not the whole
world. Record the question, method, corpus, recovered and unrecovered items,
conclusion, and limitation. Use `not_recovered`; do not rewrite it as "never
existed."

## Add A Source

1. Add a stable source record to `sources.json`.
2. Describe only what can safely appear in a public repository.
3. Prefer an archive URL when a social or public source is fragile.
4. For protected material, omit all public URLs and use only an opaque locator.
5. State what the source does not establish in `publicNote` where useful.

## Add A Claim

1. Add the smallest precise statement to `claims.json`.
2. Link each evidence relationship to a source and classify its support.
3. Preserve qualifiers, limitations, and anti-claims.
4. Set approved surfaces and `publicApproved` deliberately.
5. Link to an existing professional proof with `proofId` when applicable.

## Cite In MDX

Add the claim to the page's ordered manifest in `citation-sets.json`, then cite
it explicitly:

```mdx
Supported sentence.<Cite
  setId="callnyc-case-study"
  claimId="callnyc-independent-follow-on"
  occurrence={1}
/>
```

Use the next contiguous occurrence number when the same claim appears again.
The displayed number comes from the manifest order, so repeated uses reuse one
number. End the page with:

```mdx
<References setId="callnyc-case-study" />
```

The components render semantic server-side links and notes without client
state. Protected sources render safe text without a source link.

## Validate And Correct

Run:

```bash
npm run check:citations
npm run test:citations
npm run report:citations
npm run check
```

To correct the record, update the source, evidence relationship, or claim first;
then revise the page projection. Preserve the prior boundary unless stronger
evidence and public-use approval justify changing it.

Corrections remain in `corrections.json` after resolution so the Knowledge Bank
remembers epistemic change. Superseded claims remain inspectable but cannot be
approved or cited. Assets marked `metadata_only` or `withheld` do not render;
their safe descriptions support governance without publishing the artifact.
