# Citational Care

A citation is not a defensive ornament. It is a small act of hospitality toward
the next person who wants to understand how we know.

This site uses citations when a public claim needs more than a confident
sentence can safely carry: dates, numerical claims, institutional
relationships, event identities, published coverage, funding amounts, adoption
counts, public releases, archival reconstructions, and any qualification that
materially affects interpretation.

Do not cite every sentence merely because evidence exists. The main prose should
stay readable. The note should carry the source trail, the qualification, and
the protected boundary.

## Model

- **Source:** a public link, archive, public-safe summary, participant archive,
  dataset, or research finding.
- **Claim:** the sentence we are willing to say publicly, with status,
  confidence, caveat, anti-claims, and protected boundaries.
- **Evidence edge:** the relationship between a source and a claim: directly
  supports, corroborates, contextualizes, qualifies, or records a negative
  search finding.
- **Citation group:** the page-local note a reader sees. It may combine multiple
  claims and sources when the reader needs one coherent explanation.
- **Research run:** a bounded search record. It can say what was reviewed and
  what was not recovered, without turning absence into proof of nonexistence.
- **Research inquiry:** an unresolved question that should remain qualified,
  not inflated into a public claim.
- **Media record:** an asset-evidence boundary. It records what an image,
  screenshot, graphic, or document may responsibly establish and what it must
  not imply.
- **Correction:** a record of prior wording, revised wording, reason, sources,
  and affected claim/page IDs.

Stable IDs live in `apps/www/src/data/knowledge-bank/`. Page-local citation
numbers are assigned by `page-citation-orders.json`; numbers are not stored in
source or claim records.

## Visibility

Public pages may cite:

- public links;
- archived links;
- public-safe labels;
- source summaries whose private evidence remains outside the repo.

Never expose private source paths, raw private records, private image-library
locations, private transcripts, correspondence, legal-review material,
stakeholder lists, or unapproved images.

A private source may support a public-safe note, but the note must state only
what is safe to state. It must not require the reader to see the private record.

## Adding a Citation

1. Add or update a source in `sources.json`.
2. Add or update the public claim in `claims.json`.
3. Link source and claim through the claim's evidence edges.
4. Add a citation group in `citation-groups.json`.
5. Add the group ID to the page order in `page-citation-orders.json`.
6. Add `<Cite pageKey="..." id="..." />` at the sentence.
7. Add `<References pageKey="..." />` at the end of the page.
8. Run `npm run check:citations`.
9. Run `npm run test:citations`.
10. Run `npm run report:citations` when the PR needs a citation inventory.

The visible note should answer: what this source establishes, what it does not
establish, and what remains protected.

## Revising a Claim

When new evidence appears, revise the claim record before revising public copy
and add a correction record when public wording materially changes.
Prefer changing the public wording and caveat over adding another visible hedge
to the page. The future reader needs the current best wording, not the whole
draft history.

If the evidence weakens a claim, mark the claim `careful`, `pending`,
`superseded`, or move it to `internal-only`. Do not leave a stronger public
sentence in the app while the bank says the claim is unresolved.

## Images

Images are evidence only for what they are permitted to prove.

A future photograph record should distinguish:

- what the image depicts;
- who made it, when known;
- whether rights and credit are cleared;
- whether it is direct event evidence, representative context, reconstruction,
  participant-archive evidence, or a public artifact;
- what the image is not allowed to prove.

Visual presence is not automatic proof of every adjacent claim.

## Checker

`npm run check:citations` runs `scripts/check-citations.mjs`. `npm run
test:citations` runs deterministic unit-style regression tests for page-local
numbering, private-source behavior, correction references, negative findings,
and DPUB-ARIA roles. `npm run report:citations` writes
`reports/citational-care-composite-L/citations.md`. None of these commands make
external network requests.

The checker fails on duplicate IDs, unknown source or claim references, public
groups that include not-public sources, public-linkable sources without a public
URL, archived sources without archive URLs, private machine paths, public routes
such as `/proofs` or `/knowledge-bank`, stale CallNYC year data, and missing
accessibility roles.

It warns on public-unlinked summaries, live links without archives, and careful
claims with caveats. Those warnings are intentional: they mark where the public
note is carrying uncertainty responsibly.
