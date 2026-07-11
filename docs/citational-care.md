# Citational Care

Citational care leaves an inspectable path from a significant public claim to
the evidence that supports it. It is not a demand to cite every sentence, and it
does not turn the portfolio into an academic paper. Clear prose remains primary.

The normalized records live in `apps/www/src/data/knowledge-bank/`:

- `sources.ts` describes public and private source records;
- `claims.ts` states the approved claim, evidence relationships, limits, and
  anti-claims;
- `citation-notes.ts` composes one or more sources into a public note;
- `page-citations.ts` declares each in-text reference in reading order;
- `schemas.ts` defines and validates every record with Zod.

Rendering and composition live in `apps/www/src/lib/` and
`apps/www/src/components/citations/`.

## Editorial Rules

1. Put Jamie's agency in the sentence.
2. Explain the purpose of the work and what became usable.
3. Cite significant factual claims, not every clause.
4. State what a source supports and what it does not support.
5. Preserve collective-work language and institutional boundaries.
6. Keep anti-claims beside the positive claim in the knowledge bank.
7. Describe private evidence without exposing it.
8. Correct the record in one place, then review every public projection.

Citations support the prose; they do not substitute for a clear sentence.

## Source Classes

- `official-institutional`: records published through a government or other
  official institutional channel.
- `official-organizational-social`: an organization's public social post or
  public announcement.
- `independent-journalism`: reporting produced independently of the project.
- `primary-project`: the project itself, including a public repository.
- `participant-archive`: first-party or participant evidence that remains in a
  bounded archive.
- `web-archive`: a preserved historical capture.
- `research-reconstruction`: a public-safe synthesis whose inferential status
  must remain explicit.

## Claim Strengths

- `direct`: the source directly shows or states the claim.
- `corroborated`: multiple sources or source types support the claim.
- `reconstructed`: the claim follows from a bounded sequence of evidence but
  is not stated by one source.
- `inferred`: the claim is a reasoned interpretation and needs visible caution.
- `unresolved`: the evidence does not yet support public wording.

## Evidence Relationships

- `supports`: direct positive evidence.
- `corroborates`: independent or additional confirmation.
- `contextualizes`: explains surrounding conditions without proving the whole
  claim.
- `limits`: establishes what the claim cannot responsibly say.
- `contradicts`: records evidence against a proposed claim.

## Publication Statuses

- `public`: safe to link and describe.
- `public-with-caveat`: public, but the note must preserve an interpretive or
  access limitation.
- `private`: safe to describe only at the approved aggregate level; never add a
  public URL.
- `unavailable`: no current public access; preserve a bounded historical note.

## Anti-Claims

Anti-claims are explicit statements the portfolio must not imply. They protect
collective credit, prevent causal overreach, distinguish independent projects
from official services, and keep metrics inside their evidentiary limits.

An anti-claim belongs in the structured claim record even when it is not shown
verbatim on the public page. The page should make the corresponding boundary
legible in ordinary language.

## Per-Page Numbering

`page-citations.ts` records references in first-appearance order. The
`buildCitationSet` helper assigns the first distinct note number `1`, the next
distinct note `2`, and so on. A repeated note ID reuses its original number.
Each marker receives its own reference anchor, while each note renders once and
links back to every occurrence.

Numbers are generated during server rendering. Do not type citation numbers into
prose, calculate them in a client component, or keep a separate hand-numbered
bibliography.

## Add A Source

1. Choose a stable semantic ID.
2. Add the source to `sources.ts`.
3. Record its source class, media type, publication status, and public note.
4. Add canonical, original, or archive URLs only when they are public.
5. State access and verification dates when known.
6. Run `npm run check:citations`.

For a public page with both original and archived evidence, keep the URLs in
their distinct fields. The renderer labels them separately.

## Add A Claim

1. Write the clear public sentence first.
2. Choose status and strength.
3. Set `mustCite` for a significant factual claim.
4. Add evidence relationships with a plain statement of what each source
   supports and, when useful, what it does not support.
5. Add caveats and anti-claims.
6. Declare only approved public surfaces.

Provisional, private, and rejected claims cannot be configured for production
public surfaces.

## Add A Citation Note

1. Group only tightly related claims.
2. Add the corresponding source IDs.
3. Write a note a general reader can understand without seeing the research
   workspace.
4. Put the most important limit in `publicCaveat`.
5. Add one or more page references where the note first becomes useful.

The note list is not a dump of source metadata. It explains why the cited
sentence is defensible.

## Cite A Private Source Safely

A private source receives:

- a stable, non-sensitive ID;
- a generic but accurate title;
- `publicationStatus: "private"`;
- a public-safe description of what is visible or known;
- a limit describing what the source cannot establish;
- no canonical, original, or archive URL.

Do not include private filenames, local paths, participant metadata, raw text,
exact locations, contact details, or an invented link. A private source note is
an evidentiary boundary, not a path into the archive.

## Correct A Claim Later

1. Update the source or claim record.
2. Reassess strength, status, evidence relations, caveat, and anti-claims.
3. Update the public sentence if the correction changes what a reader should
   understand.
4. Review every page listed in `publicSurfaces`.
5. Run citation validation and the full check pipeline.

Stable IDs should survive wording corrections. Create a new ID only when the
meaning of the claim or source has materially changed.

## Accessibility Requirements

- In-text markers are links inside `sup` with `role="doc-noteref"`.
- Every marker has a contextual accessible label.
- Endnotes use a native ordered list inside `role="doc-endnotes"`.
- Every note links back to each marker that cited it.
- Source titles use `cite`; whole notes and citation numbers do not.
- Focus remains visible.
- Reference and note anchors use scroll margin for sticky navigation.
- Long source text and URLs wrap at narrow widths.
- The target highlight does not require animation or JavaScript.

## Complete CallNYC Example

The CallNYC page uses this sequence:

```tsx
import { CitationList, CitationRef } from "@/components/citations";
import { callNYCCitationSet } from "@/lib/page-citations";

<p>
  Civic Hall announced the gathering for January 30, 2016.
  <CitationRef
    set={callNYCCitationSet}
    refId="callnyc-context-event"
  />
</p>

<CitationList set={callNYCCitationSet} />
```

The page reference points to `callnyc-event`. That note connects the approved
claim to Civic Hall, Council, and web-archive source records. Later references
to `callnyc-event` reuse the same number while receiving distinct marker IDs and
backlinks.

## Validation

Run:

```bash
npm run check:citations
npm run check
```

The citation check is local and deterministic. It validates schemas,
referential integrity, privacy boundaries, production status, numbering,
anchors, backlinks, CallNYC year and anti-claims, and a set of pure helper
contracts. It does not fetch external URLs.

Link status is a separate manual editorial responsibility. Unchecked or
archive-dependent links produce warnings without making historical citations
disappear.
