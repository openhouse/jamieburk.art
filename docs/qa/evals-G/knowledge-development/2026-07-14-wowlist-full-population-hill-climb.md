# WOW List full-population archival hill climb

Reviewed: 2026-07-14

## Objective

Review every displayed `@wowlist` record, preserve a public-safe metadata
inventory, develop mission-relevant sources and claims, and require two fresh
independent holdouts before treating the candidate as complete.

## Population reconciliation

- Profile counter: 38 posts.
- Posts timeline: 37 primary status records.
- Replies timeline: 38 primary status records.
- Deduplicated union: 38 records, all reviewed.
- Unmaterialized profile-counted records: 0.
- Record types: 16 originals, 6 replies, and 16 reposts.
- Account-authored records: 22.
- Distinct posted short URLs: 35.
- Row-level `recoveredFrom` values reproduce both timeline denominators.
- Status `665520472461860864` materialized only in Replies and reconciled the
  prior 37-record inventory to the 38-record profile counter.

The public fixture stores status URLs, dates, author handles, record types,
posted-link metadata, bounded classifications, recovery provenance, and dated
interaction observations. It does not store post text, cookies, credentials,
or authenticated-session state.

## Developed findings

- The account functioned as part of the product and community practice through
  direct support, community-created onboarding, event distribution, source
  curation, Sunday Dinner lineage, and rapid civic coordination.
- A separate bounded incoming search retained 16 classified records. Ten were
  mission-relevant third-party accounts across DIY arts and music,
  calendar-community, neighborhood-civic, and creative-technology contexts.
- Nine of those ten independently posted a WOW List URL. The row-level
  provenance is membership in the `url-domain` query result.
- Direct examples distinguish organizer use, peer attribution, and community
  response: Punks & Criminals said it was adding shows; Music Hackathon
  described the service as made by co-organizer Jamie Burkart; and All Ages
  responded to a members-meeting invitation.
- The remaining six incoming records stay visible as contributor
  self-documentation, context-limited greetings, an unrelated handle result,
  or false positives rather than becoming traction.
- Seven newly normalized context sources preserve mission-relevant reporting
  and resources circulated by the account. Context sources do not establish
  WOW List coverage, partnership, event ownership, attendance, adoption, or
  impact.
- Dated interaction totals remain research context, not unique people, reach,
  conversion, endorsement, attendance, or impact.

The aggregate fixture is publicly auditable at immutable commit
`cdf5d08798f1d5dbd516ac826e4537b07ab1bbf9`.

## Hill-climb history

1. The prior social-media pass recovered 37 timeline records but did not
   reconcile them to the 38-post profile counter.
2. Traversing Posts and Replies to repeated no-growth states recovered the
   replies-only record and established a complete displayed population.
3. The population was decomposed into record types, authorship, posted URLs,
   source classes, product functions, stakeholder classifications, and explicit
   exclusions before any public interpretation was strengthened.
4. The first independent holdout scored collective-credit calibration at
   `4/4` and Chad's lens at `3/4`; it found one dangling sentence in the
   methodology note. The sentence was repaired without strengthening the
   calibrated claim, which changed the candidate fingerprint and invalidated
   that judgment for stopping purposes.
5. Two fresh independent judges then recomputed the revised, unchanged
   candidate and each scored both LLM-judged criteria at `4/4`.

## Final result

Candidate fingerprint:
`19fff12f055bbde9bac22a596635d5dfd5e1f05ea382e258a3dbe2b0485ed748`

Both final holdouts reproduced the fingerprint and independently checked the
population, incoming classifications, source roles, public claim resolution,
collective credit, personal-versus-institutional authorship, and anti-impact
boundaries. The lifecycle evaluator passed all 13 criteria at weighted score
`1.0` in two consecutive runs, with no blocking or nonblocking failures.

Artifacts:

- `wowlist-full-population-final-holdout-1-judge.json`
- `wowlist-full-population-final-holdout-1-run.json`
- `wowlist-full-population-final-holdout-2-judge.json`
- `wowlist-full-population-final-holdout-2-run.json`

No `/proofs`, `/knowledge-bank`, or `/public-claims` page was added.
