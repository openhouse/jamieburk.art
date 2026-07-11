# Citational care

Citational care leaves an inspectable path from a significant public claim to the evidence that supports it. It is not an effort to cite every sentence or make the portfolio look academic. Clear prose comes first; notes quietly show why the prose is defensible.

The citation system is part of the repo-internal, public-safe knowledge bank. The website is a purposefully composed projection of that bank. There is intentionally no public knowledge-bank route.

## Editorial rules

1. Put Jamie's agency in the sentence.
2. Explain the end toward which the work existed.
3. State what became usable.
4. Reduce the interpretive burden on a busy reader.
5. Translate specialized language where needed.
6. Describe collective work precisely.
7. Make the strongest defensible claim, no stronger and no weaker.
8. Record anti-claims alongside positive claims.
9. Keep private evidence protected while describing its evidentiary role accurately.

## Records

The canonical system lives in `apps/www/src/data/knowledge-bank/`:

- `sources.ts` describes public, caveated, protected, and unavailable sources.
- `claims.ts` stores approved public wording, strength, surfaces, caveats, and anti-claims.
- `evidence.ts` states how a source relates to a claim, what it supports, and what it does not support.
- `citation-notes.ts` composes one or more claims and sources into reader-facing notes.
- `pages.ts` declares citation occurrences in page-reading order.
- `research-runs.ts` records bounded research methods, results, and limitations.
- `corrections.ts` records changes that need to remain consistent across surfaces.
- `assets.ts` records provenance, rights, consent, evidence role, and public-use boundaries.

All records are Zod-validated in `schema.ts`.

## Controlled vocabularies

### Source classes

- `official-institutional`: a government or institutional record.
- `official-organizational-social`: a post or public record from an involved organization.
- `independent-journalism`: reporting independent of Jamie and the project.
- `primary-project`: the project itself, such as a public repository.
- `participant-archive`: evidence retained by a participant.
- `web-archive`: a preserved public page or embedded record.
- `research-reconstruction`: a bounded synthesis whose method and limits are documented.

### Claim strengths

- `direct`: the source directly establishes the claim.
- `corroborated`: more than one source or source class supports the claim.
- `reconstructed`: a bounded research process supports the claim.
- `inferred`: the claim is reasoned from evidence but not directly stated.
- `unresolved`: the evidence does not yet support public wording.

### Evidence relationships

- `supports`: directly establishes the governed part of a claim.
- `corroborates`: independently reinforces a claim.
- `contextualizes`: explains setting without proving the central claim.
- `limits`: establishes a boundary or anti-claim.
- `contradicts`: supplies evidence against a claim.

### Public-use statuses

- `public`: link and describe normally.
- `public-with-caveat`: link publicly while keeping the caveat visible.
- `protected`: describe only the safe evidentiary role; publish no URL or asset.
- `unavailable`: retain a note without implying public access.

## Anti-claims

An anti-claim is a statement the evidence does not support. Anti-claims are required where a strong positive claim could invite a stronger but inaccurate interpretation. They are not necessarily rendered verbatim, but validation and editorial review treat them as durable boundaries.

For CallNYC, anti-claims prevent the portfolio from implying that Jamie organized the hackathon, caused the CouncilStat release, built an official Council service, produced a winning hackathon entry, or demonstrated measured improvements in constituent-service outcomes.

## Page numbering

Each `PageProjection` declares occurrences in reading order. The resolver assigns a number when a note first appears. Later occurrences of the same note reuse that number. Numbers are never typed into prose.

```tsx
<p>
  Jamie independently developed CallNYC.
  <Cite pageId="callnyc" occurrenceId="summary-follow-on" />
</p>

<References pageId="callnyc" />
```

Every occurrence gets a unique `cite-ref-*` anchor. Each note gets one page-scoped `cite-note-*` anchor and returns to every occurrence that cited it. Numbering is server-rendered and deterministic.

## Add a source

1. Add a stable, semantic ID to `sources.ts`.
2. Choose its source class, media type, public-use status, and link status.
3. Write a public-safe source note stating what the source is.
4. Add a canonical, archive, or original URL only when public use is appropriate.
5. Record the access and manual verification dates for public links.
6. Never add a local path, private filename, raw transcript text, or sensitive metadata.

When both original and archive URLs exist, store them separately. The rendered note gives each link a distinct label.

## Add a claim and evidence

1. Add the claim to `claims.ts` with public wording, status, strength, citation requirement, allowed surfaces, and anti-claims.
2. Add separate evidence relationships in `evidence.ts`.
3. For each relationship, say exactly what the source supports and what it does not support.
4. Project only approved claims to public surfaces.

## Add a note and citation

1. Add a note to `citation-notes.ts` with the governed claim and source IDs.
2. Write a concise reader-facing note and, where needed, a visible caveat.
3. Add an occurrence to the appropriate page in `pages.ts`.
4. Use `<Cite pageId occurrenceId />` at the end of the governed sentence.
5. Add `<References pageId />` once, after the page's evidence-bearing prose.

## Cite a protected source

Create a `protected` source record with no URL. Describe only the public-safe evidence role. If an asset is involved, create a separate asset record covering rights, consent, visible evidence, and the do-not-publish boundary. Do not add the asset ID to a public page projection until its status changes through review.

## Correct a claim

1. Add or update a correction record with the prior wording, revised wording, reason, affected surfaces, and status.
2. Update the governed claim and every active public projection.
3. Run cross-surface checks, including separately generated artifacts such as PDFs.
4. Keep the correction `partially-applied` when a governed artifact remains stale.

## Validation

```bash
npm run check:citations
npm run test:citations
npm run report:citations
npm run check
```

Validation is local and deterministic. It does not fetch external URLs during build. It checks graph references, statuses and surfaces, protected evidence, local-path leakage, generated anchor uniqueness, CallNYC wording and year, and cross-surface risks. Link availability remains a manual editorial review.

## Accessibility

- Render a semantic link inside `sup` with `role="doc-noteref"`.
- Give every marker a specific accessible label.
- Render endnotes as a native ordered list inside `role="doc-endnotes"`.
- Link each note back to all of its in-text occurrences.
- Preserve visible keyboard focus and comfortable target offsets.
- Keep notes in the document without requiring JavaScript.
- Keep references visible in print while hiding redundant backlinks.

## Complete example

CallNYC is the first full pilot. Its source, claim, evidence, note, occurrence, research, correction, and protected-asset records demonstrate the complete workflow. The public page uses the same governed `callnyc-product-method` claim again on Technical Operations, where numbering begins at 1 for that page.
