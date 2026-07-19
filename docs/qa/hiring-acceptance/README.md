# Hiring Acceptance Protocol

This directory holds public-safe role and reader context for testing the exact
public portfolio against present-tense opportunities. It is an evaluation
surface, not a second evidence registry and not a record of Jamie's private job
search.

Opportunity facts live in the canonical
[Knowledge Wiki](../../knowledge-wiki/indexes/capabilities-and-opportunities.md).
Claims, sources, proofs, corrections, rights, and public projection remain
governed by the existing typed authorities. These QA files only configure
questions asked of those systems and of the public site.

## Boundary

Never commit application status, referrals, warm paths, private correspondence,
contact graphs, interview notes, or raw communications here. The private source
vault may inform a bounded research inquiry; it does not become evaluator input
or public repository content.

The hiring evaluator may receive only public route content, public opportunity
context, and public reader context. The Wiki gap resolver is a separate operator
that may inspect public-safe Wiki records after a missing public signal has been
identified.

## Operators

```bash
npm run wiki:opportunities
npm run wiki:coverage
npm run wiki:discovery
npm run eval:hiring -- --help
npm run eval:hiring:gaps -- --opportunity opportunity.nyc-oti.technical-operations-manager.782369
npm run eval:hiring:mutations
```

Machine success means the protocol is structurally sound. It does not mean a
named person participated, a hiring reader would advance Jamie, the role is
healthy, an application was submitted, or Jamie has approved the public
candidate.
