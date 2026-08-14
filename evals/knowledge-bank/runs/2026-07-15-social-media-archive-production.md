# Social-media archival production run

**Run date:** 2026-07-15
**Branch:** `feature/evals-H`
**Scope:** public project accounts, attributable public engagement, source
discovery, claim maturation, selective site projection, and eval integration.

**Status note:** the preliminary CallNYC count in the original run was
superseded later the same day by the
[full-population pass](2026-07-15-callnyc-full-social-population.md). Current
CallNYC claims use that later record. The preliminary WOW List finding was also
superseded by its [full-population pass](2026-07-15-wowlist-full-social-population.md),
which reconciles all 38 profile-reported objects and governs current WOW List
claims.

## Objective

Treat public social accounts as project-documentation surfaces without turning
shared account activity into individual authorship or noisy platform metrics
into unsupported impact claims.

The run had five requirements:

1. inventory every currently known project-to-account relationship;
2. recover attributable, mission-relevant interactions and public sources;
3. distinguish complete counts from bounded lower bounds;
4. mature defensible findings through the knowledge-bank lifecycle; and
5. project only the subset that clarifies Jamie's work for portfolio readers.

## Collection method

- Used Jamie's authenticated public X session to inspect profiles, authored
  posts, replies, quote posts, public repost lists, and bounded search results.
- Cross-checked Council-member service against official legislative records.
- Connected social evidence to public reporting and existing project records.
- Excluded likes where liker identities were not reliably exposed.
- Preserved no credentials, cookies, private messages, private account data,
  collaborator drafts, historical phone numbers, or addresses.

The full public-safe inventory and named evidence ledger live in
[`docs/knowledge-bank/projects/social-media-archive-production.md`](../../../docs/knowledge-bank/projects/social-media-archive-production.md).

## Account inventory

Dedicated accounts were recovered for CallNYC (`@CallNYCapp`), WOW List
(`@wowlist`), KC Town Hall (`@KCTownHall`), and KC Spaces Fund
(`@KCSpacesFund`). NYC Artist Coalition and four campaigns used the shared
`@NYCArtC` identity: Let NYC Dance, Talks Not Raids, Save NYC Spaces, and Fair
Rent NYC.

No dedicated account was recovered for Harry J. Epstein Company, Sunday
Dinner, 196, Source-Backed Team Memory, or NTER CHNG. Those are open inquiries,
not claims that no account existed. `@wowlist` supplies adjacent Sunday Dinner
evidence but is not relabeled as the Sunday Dinner account.

## Findings matured

- **CallNYC:** the later full-population pass accounts for all 110
  profile-reported slots by disposition, recovers 107 content objects, and
  establishes a lower bound of at least 19 serving Council-member accounts.
  Six Council-member-authored posts or replies explicitly involved CallNYC.
- **NYC Artist Coalition:** bounded searches recovered authored `@NYCArtC`
  mentions from at least six serving Council-member accounts and 295
  campaign-tagged posts across the two reviewed date windows. The four-campaign
  identity and the six-member lower bound were promoted; individual account
  authorship was not.
- **WOW List:** the first recovered account post credits Richard and Jamie and
  connects the platform to Sunday Dinner calendars. A 2016 support thread
  documents joining, event publishing, profiles, and followed calendars.
- **KC Town Hall:** public posts and external acknowledgments document a wider
  neighborhood-stewardship arc while leaving funding, completion, and
  individual authorship to stronger records.
- **KC Spaces Fund:** 11 distinct public `#FUNDED` grantee highlights were
  recovered. This finding remains held from the website because the social
  record is not a complete grant ledger and does not establish Jamie's role in
  selection, fundraising, or post authorship.

## Public projection

Four source-backed claims were activated on existing case studies:

- CallNYC Council-member engagement;
- NYC Artist Coalition identity continuity and Council-member mentions;
- WOW List provenance and historical organizer workflows; and
- KC Town Hall's public neighborhood-stewardship record.

Follower counts, raw engagement totals, KC Spaces Fund's grantee-highlight
count, incomplete account searches, and account-establishment or post-authorship
claims remain in the bank rather than on the site.

## Eval hill climb

The first climb failed because the existing source-backed holdings had changed
without reviewed approval hashes and because no social-media archive criterion
existed. The implementation added `KB-EVAL-SOCIAL-ARCHIVE`, extended the
deterministic evaluator, added adversarial mutations for double counting and
authorship leakage, and reviewed the intentional source-backed changes.

The final deterministic run reached:

- **5.00 / 5.00 weighted score**;
- **11 / 11 criteria at or above their hard minimums**; and
- **80 / 80 knowledge-eval tests passing**.

Independent holdout acceptance is **0 / 2** because the new eval definition
invalidates the two previously signed holdouts. No protected-support export was
performed and no holdout record was rewritten. The pull request therefore
remains draft until two fresh independent reviewers evaluate the current suite.

## Stopping decision

The deterministic criterion is met. Every recovered account relationship has a
disposition; every promoted count has named public evidence, a bounded method,
and lower-bound language; shared-account authorship remains unassigned; public
office status is cross-checked; and private session or collaborator material is
absent from the repository.

Further collection can expand the corpus, but the remaining release gate is
independent review rather than another deterministic content edit.
