# Jamie Burkart Sourcebook pilot

This directory is the bounded, public-safe implementation of
[RFC 0004](../rfcs/0004-jamie-burkart-sourcebook-and-knowledge-ecosystem.md).
It is a Git-native source index, not a testimonial wall and not a mirror of a
private archive.

Begin with [START-HERE.md](START-HERE.md). The authored contract is
`catalog.json`; the browse pages, validation report, dependency report, and
`public-export.json` are deterministic outputs of that contract. Run:

```bash
npm run sourcebook:hillclimb
```

## Pilot boundary

The denominator is the three recovered full-text statements in the governed
public-testimony corpus as reviewed on July 28, 2026. All three are Jamie's own
words in official New York City Council hearings and were already public in
this repository before the Sourcebook pilot. Their bodies remain at their
existing canonical paths and are not copied here.

No protected donor package, recommendation letter, private communication,
private source locator, third-party quotation, or unapproved photograph is
included. The site receives no new public route or copy from this pilot.

## Authorities

- `catalog.json`: perspective metadata, body binding, context, stance,
  publication state, anti-claims, and browse facets.
- Existing testimony Markdown: the one canonical public body for each record.
- `publication-packets/*.json`: allowlisted proposals crossing into this
  public pilot.
- `public-export.json` and `browse/`: rebuildable, reviewable projections.
- Knowledge Wiki: bounded claims and interpretation, beginning at
  [`docs/knowledge-bank/indexes/jamie-sourcebook.md`](../docs/knowledge-bank/indexes/jamie-sourcebook.md).

Validation cannot grant rights, consent, endorsement, editorial approval,
deployment approval, or production indexing.
