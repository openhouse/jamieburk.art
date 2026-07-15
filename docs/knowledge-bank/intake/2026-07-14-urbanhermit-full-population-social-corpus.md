# @urbanhermit Full-Population Social Corpus

Run date: 2026-07-14

## Answer First

The authenticated [@urbanhermit profile](https://x.com/urbanhermit) displayed
**434 posts**. Profile traversal and bounded searches recovered **425 distinct
public status records** at item level in the private working audit.

The local review used those 425 items to close the population audit. The
[public-safe ledger](../data/urbanhermit-public-post-ledger.json) publishes
item detail only for 141 mission-relevant records, preserves the other 284
recovered items as aggregate-only disposition counts, and retains nine further
profile-count slots as explicit carrier-limited absences. The arithmetic
closes: `425 + 9 = 434`.

This is 100 percent population disposition, not 100 percent item recovery. It
is not a platform export, deletion history, private analytics record, or proof
that the nine unresolved records no longer exist.

## Personal-Account Boundary

The personal account is not a project account, a complete professional record,
or blanket permission to republish other people's lives. Full-population review
therefore does not mean full public reproduction.

Of the 425 recovered records:

| Public-safe disposition | Records |
| --- | ---: |
| Mission-relevant public evidence | 141 |
| Context only | 271 |
| Protected personal or third-party context | 13 |
| **Recovered item records** | **425** |

Mission-relevant records retain public status identifiers, bounded summaries,
project and theme classifications, posted URLs, and bounded observed metrics.
Context-only and protected-context items have no public item-level crosswalk:
no identifier, year, date, author, relationship, metric tuple, length, digest,
link, name, or text fingerprint is retained. Only their aggregate counts remain
in the public repository. The detailed review material stays outside it.

## Method

1. Used the authenticated profile's displayed 434-post count as the control.
2. Traversed the public Posts surface to the oldest exposed profile material.
3. Attempted the Replies surface and recorded its carrier error.
4. Ran broad date-window searches and annual searches from 2008 through 2024.
5. Deduplicated rendered records by canonical status ID in local checkpoints.
6. Separated account posts, account replies, and source-authored native repost
   statuses before computing any reaction aggregate.
7. Classified mission-relevant records by project, practice theme, public
   handles, and posted URLs.
8. Closely read high-signal records and verified selected linked public
   artifacts without making the build dependent on external network access.
9. Committed only the 141-record public-safe evidence ledger, two aggregate-
   only withheld disposition counts, and bounded knowledge records.

Authentication was used only to read public material. No credential, cookie,
session data, direct message, account setting, private analytics, or raw browser
checkpoint is retained in the repository.

## Mission-Relevant Findings

The 141 inspectable evidence records preserve recurring public traces across
the published 2009-2023 evidence timeline:

| Project signal | Records |
| --- | ---: |
| NYC Artist Coalition | 61 |
| Sunday Dinner | 27 |
| WOW List | 14 |
| Waterways and participatory art | 11 |
| Public media making | 3 |
| KC Town Hall | 2 |
| CallNYC | 1 |
| Harry J. Epstein | 1 |

These classifications overlap. They establish surviving public practice
traces, not uninterrupted activity, relative effort, audience, authorship of
every linked project, or impact.

### Waterways, making, and technical continuity

Eleven records carry waterways-practice signals, including public invitations,
material collection, River Marvel routing, and an outside-authored KCUR
quotation about cities and water. Five records carry technical-making signals,
including an early hand-tool website statement and a later legacy-software
workflow for media archaeology.

These are useful source leads for a longer account of Jamie's practice. Most
remain self-authored evidence and should be associated with project,
institutional, or collaborator sources before being promoted into stronger
role or impact claims.

### Public media making

The corpus preserves Jamie's public statement about making a UCP curfew-
discussion video, with its [public Vimeo artifact](https://vimeo.com/41628710).
It also preserves an outside institutional credit from Thrill Jockey naming
Jamie Burkart and Martin Schmidt as makers of the Horse Lords video for
"Truthers," linked to [NPR Music's publication](https://www.npr.org/2016/04/29/476020413/video-horse-lords-hypnotic-truthers-will-blast-your-noodle).

The latter is the stronger claim because outside evidence corroborates the
collective credit. It does not establish sole authorship, every production
role, audience, or impact.

### Civic and coalition circulation

Sixty-one records carry NYC Artist Coalition signals across public calls,
event invitations, campaign routing, Cabaret Law repeal, and Talks Not Raids.
This demonstrates that Jamie's personal account repeatedly carried collective
public-participation pathways. Posting volume does not establish sole
authorship, coalition control, policy causation, or outcome.

### Outside-authored recognition floor

Three source statuses visible in the account carrier publicly name or quote
Jamie in mission-relevant contexts:

- KCUR Central Standard quoted Jamie as a caller reflecting on cities and
  water;
- Thrill Jockey credited Jamie and Martin Schmidt for the Horse Lords video;
  and
- Dawnia Darkstone publicly thanked Jamie for introductions among artist peers.

This is a recoverable floor inside the account carrier, not a comprehensive
mention search, testimonial collection, stakeholder-network measure, or proof
of professional outcomes.

### Posted sources and visible reactions

The evidence records contain 104 posted public URL occurrences representing 87
distinct URLs and 64 case-insensitively distinct mentioned public handles. A posted source may be
a project artifact, public resource, contextual article, or research lead. It
does not automatically establish coverage of Jamie, partnership, endorsement,
adoption, or impact.

At the July 2026 snapshot, 35 of the 81 mission-relevant public account-
authored evidence records displayed at least one reaction, totaling four
replies, 26 reposts, and 67 likes. These counts are mutable current
observations, not historical analytics, unique people, impressions,
clickthrough, or professional impact. All source-status metrics found during
the local review are excluded from Jamie's traction; the 60 source-status
evidence records published in the ledger carry `null` metrics.

## Composition Decision

### Added to the public site

Nothing from this pass is added automatically. Eight bounded claims enter the
knowledge bank with held projections and no public surfaces. The current site
already has a focused hiring argument; historical depth should enter only when
it reduces the reader's burden or provides stronger role evidence for a
specific application.

### Retained for future maturation

- the exact 434-slot population reconciliation;
- a local audit of 425 recovered items and nine explicit carrier gaps;
- 141 inspectable mission-relevant records;
- aggregate-only accounting for 271 context-only and 13 protected-context
  items, with no public item-level crosswalk;
- 87 distinct public source links;
- bounded practice and project signal maps;
- source-specific leads for waterways, public media, coalition campaigns,
  technical making, and community infrastructure;
- an outside-authored recognition floor; and
- a current visible-reaction snapshot with source-status metrics excluded.

## Governing Boundaries

- Say **fully dispositioned** or **population reconciled**, not fully recovered.
- Do not guess what the nine unresolved slots represent.
- The personal account is not a project account or a complete career record.
- A personal public timeline is not blanket consent to republish third-party or
  personal context.
- A self-authored statement is not independent verification.
- A linked article supplies only the propositions it actually establishes.
- A native repost preserves source authorship, and source-status metrics stay
  with the source.
- Current visible reactions are not impact.
- No raw text, private path, credential, direct message, private analytics, or
  browser checkpoint belongs in the public repository.

## Durable Artifacts

- Canonical model: `apps/www/src/data/knowledge-bank/urbanhermit-social-corpus.ts`
- Mission-relevant evidence ledger and aggregate withheld dispositions:
  `docs/knowledge-bank/data/urbanhermit-public-post-ledger.json`
- Wider social inventory: `apps/www/src/data/knowledge-bank/social-media-archive-production.ts`
- Recursive hard gate: `KB-EVAL-URBANHERMIT-FULL-POPULATION`
