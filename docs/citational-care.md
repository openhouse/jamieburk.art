# Citational Care

Citational care lets a reader inspect why a public claim is supportable, how
strongly, and where the evidence stops. The website remains a composed
portfolio. It is not a public evidence browser.

## Canonical records

- `apps/www/src/data/knowledge-bank/sources.json` records public-safe sources,
  their availability, what they support, and what they do not establish.
- `apps/www/src/data/knowledge-bank/claims.json` records exact claim wording,
  evidence relationships, qualifications, anti-claims, publication status, and
  allowed surfaces.
- `apps/www/src/data/knowledge-bank/research-runs.json` records the method,
  scope, limitations, and public-safe result of bounded research.
- `apps/www/src/data/proofs.ts` is a compatibility projection from the claim
  bank. Do not add factual records directly to it.

Claim status describes what is known: confirmed, attributed, corroborated,
reconstructed, inferred, unresolved, or a negative research finding.
Publication status describes whether and how that knowledge may appear:
ready, ready with attribution, qualified, internal only, or protected.

## MDX authoring

Place the stable claim ID immediately after the clause or sentence it supports:

```mdx
The Council described the gathering as its first CouncilStat
hackathon.[^callnyc-first-councilstat-hackathon]
```

Do not write a footnote definition. The build resolves the ID, validates its
public status and evidence, and generates the reference note. Repeated IDs on a
page share a number; numbering starts at 1 on every page. Do not cite headings,
combine unrelated claims under one marker, or treat the displayed number as an
identifier.

## TSX authoring

TSX surfaces use a server-rendered scope:

```tsx
const citations = createCitationScope(["hje-revenue-growth-contribution"]);

<CitationMark
  claimId="hje-revenue-growth-contribution"
  number={citations.numberFor("hje-revenue-growth-contribution")}
/>
<References claimIds={citations.ids} />
```

The array establishes first-use order. Duplicate IDs collapse to one note. The
helpers throw during rendering for unknown or non-public claims and require no
client-side JavaScript.

## Source links and uncertainty

Add a live URL when a public source is available. Add archived and media URLs
when they help a reader inspect the same evidence. Link text should identify
the source or artifact; never use a bare URL or "click here." A URL is only one
part of provenance: every source must also state its evidentiary scope and what
it does not establish.

Write `publicCitationNote` editorially. Keep it concise, name attribution when
required, and include qualifications that materially limit the claim. Put
known overstatements in `antiClaims` so deterministic checks can catch direct
conflicts.

A negative research finding requires a `research-runs.json` record with method,
scope, finding, and limitations. It describes what a bounded search did not
recover; it does not prove that the missing artifact never existed. A private
artifact ID may map to research outside the repo, but no local path belongs in
the public bank.

## Photographs

A participant photograph can directly support visible wording, visible
relationships, and reviewed metadata. It does not by itself establish an
institution's official title, agenda, complete attendance, start time,
facilitator, or formal deliverable. Rights, credit, consent, and public-use
review remain separate from evidentiary review.

## Public boundaries

Never commit private correspondence, raw transcripts, private strategy,
credentials, private contact lists, applicant or donor records, protected
source detail, unapproved images, or absolute local filesystem paths. A public
citation note may explain that evidence exists without exposing it.

## Checks and editorial review

Run:

```bash
npm run check:citations
npm run check
```

Before publication, read the sentence and note together. Confirm that each
source supports the exact nearby wording, attribution survives projection,
qualifications remain meaningful, links have useful labels, anti-claims are not
implied, and protected details are absent. Then test the marker, note, backlink,
keyboard focus, narrow layout, and 200 percent zoom.

The production build uses webpack because local remark and rehype function
plugins cannot be serialized through Turbopack's Rust boundary.
