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

The hiring evaluator may receive only live public route content, official role
facts decomposed from the linked employer posting, and public reader context.
Wiki-authored organizational interpretation, proof mappings, gap analysis,
success conditions, and interview questions stay out of its packet. The Wiki
gap resolver is a separate operator that may inspect public-safe Wiki records
after a missing public signal has been identified.

Evaluator packets require a clean Git worktree and a freshly captured live-HTTP
snapshot with complete role routes and a content-derived hash. The server's
health response, pre-capture worktree, and post-capture worktree must bind to the
same candidate SHA. Offline snapshot files cannot be promoted into review
packets.

Reviewed role facts and requirement-to-proof mappings have contract
fingerprints. Reverification may update a role record and its fingerprint only
in the same reviewed change; silent fact or mapping drift fails the suite.

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
