# NYC Artist Coalition Population-Reconciled Social Corpus

Run date: 2026-07-14

## Answer First

The authenticated [@NYCArtC profile](https://x.com/NYCArtC) displayed **5,124
posts**. This pass recovered **1,026 distinct public status records** at item
level:

- 309 account posts;
- 33 account replies; and
- 684 source statuses from 216 public accounts, observed as native reposts.

The [public-safe ledger](../data/nycartc-public-post-ledger.json) explicitly
retains the other **4,098 profile-count slots as unresolved**. The arithmetic
closes exactly: `1,026 + 4,098 = 5,124`.

This is 100 percent **population disposition**, not 100 percent item-level
recovery. It is not a platform export, deletion history, withheld-status log,
or statistically representative sample. The unresolved population is part of
the result, not an invitation to guess.

## Method

1. Used the profile's displayed 5,124-post count as the population control.
2. Traversed the authenticated public Posts surface until X stopped advancing.
3. Ran bounded authenticated Latest searches by date to repair older
   account-authored material.
4. Deduplicated every rendered record by canonical status ID and checkpointed
   each bounded pass locally.
5. Classified records by account relationship, campaign signal, primary theme,
   public handles, posted destinations, media signals, and metric ownership.
6. Resolved all 408 unique `t.co` links with timeouts: 384 currently resolve
   to 345 unique public destinations; 24 did not resolve.
7. Closely read ten high-signal linked articles and added bounded source records.
8. Kept project-authored outreach, outside-authored direct mention, coalition-
   selected amplification, source-post metrics, and coalition-post metrics as
   separate relationships.

Authentication was used only to read public material. No credential, cookie,
session data, direct message, private analytics, account-recovery material, or
administrator record was captured or committed. The ledger stores metadata,
classifications, public URLs, bounded summaries, and content digests rather
than raw post text.

## Carrier Limit

The recovered item-level years are 2017-2018 and 2023-2026. Ordinary profile
traversal stopped before 2023. Earlier bounded searches recovered account-
authored 2017-2018 material, but repeated historical search later returned a
visible error before the 2019-2022 gap could be repaired.

That gap does **not** establish inactivity. Historical search also does not
reliably reconstruct native repost actions, even when a source status remains
public. No complete native account archive or public archival carrier was
recovered in this pass.

## Population

| Disposition | Records |
| --- | ---: |
| Account posts recovered | 309 |
| Account replies recovered | 33 |
| Native-repost source statuses recovered | 684 |
| **Item-level records recovered** | **1,026** |
| Explicit unresolved profile-count slots | 4,098 |
| **Displayed population disposition** | **5,124** |

## Findings

### Four campaign lines remain legible

Within the recovered item-level corpus:

| Campaign signal | Records |
| --- | ---: |
| FairRentNYC | 104 |
| LetNYCDance | 101 |
| SaveNYCSpaces | 98 |
| TalksNotRaids | 16 |

These are editorial text and hashtag classifications. A record may carry more
than one signal, and the counts cannot be extrapolated to the 4,098 unresolved
slots.

The material also extends beyond the original named campaigns into related
artist-worker organizing, cultural-space survival, public policy, civic
participation, cultural opportunities, tenant rights, and community care.
That continuity describes the account's public editorial field. It does not
identify one author or administrator across the account's life.

### The account operated as a source network

The recovered profile contains 684 source statuses from 216 public accounts
observed as native reposts. Frequent source accounts include Future of Music
Coalition, Street Vendor Project, Writers Guild of America East, Western Queens
Community Land Trust, Olympia Kazi, Local 802 AFM, United Musicians and Allied
Workers, People's Plan NYC, Artist Studio Affordability Project, and Music
Workers Alliance.

A native repost is coalition-selected amplification. The source account retains
authorship, and the source status retains its visible metrics. Reposting does
not establish partnership, endorsement, account access, causality, or impact.

### Direct mention is narrower than amplification

Twenty-five recovered source statuses from 13 outside accounts directly mention
`@NYCArtC`. That is an item-level direct-mention floor inside this corpus. It is
separate from the earlier bounded audit that recovered authored public
engagement by at least five sitting City Council members between 2018 and 2021.

The two counts answer different questions. Neither is a complete lifetime
engagement count, and neither turns a mention into adoption or formal
partnership.

### Public knowledge routing

The ledger preserves 536 posted short-link occurrences:

| Link measure | Count |
| --- | ---: |
| Unique short URLs | 408 |
| Currently resolving short URLs | 384 |
| Unresolved short URLs | 24 |
| Unique current destinations | 345 |

The destinations include the four campaign sites, government records, public
meetings and hearings, journalism, organizing tools, voter information,
libraries, grants, fellowships, cultural opportunities, and artist-worker
resources.

Ten closely read destinations were promoted into source records:

- [Liz Pelly on M.A.R.C.H.](https://thebaffler.com/latest/cut-the-music-pelly),
  *The Baffler*, 2018;
- [Isabelia Herrera on queer nightlife and political violence](https://pitchfork.com/features/article/the-fight-for-queer-nightlife-in-an-era-of-political-violence/),
  *Pitchfork*, 2023;
- [ABC7 on Morscher's rent-driven closure](https://abc7ny.com/post/morschers-pork-store-ridgewood-queens-business-closing-nyc/14357620/),
  2024;
- [Christopher Robbins on Lucy's eviction](https://hellgatenyc.com/lucys-east-village-evicted-do-the-landlords-care/),
  *Hell Gate*, 2024;
- [Adlan Jackson on Saint Vitus and nightlife enforcement](https://hellgatenyc.com/saint-vitus-dob-nypd-nightlife-raid-shutdown/),
  *Hell Gate*, 2024;
- [Jason Koebler on the Ticketmaster antitrust case](https://www.404media.co/the-monopoly-case-against-ticketmaster-explained/),
  *404 Media*, 2024;
- [Adlan Jackson on 2025 CURE inspections](https://hellgatenyc.com/cure-march-raids-2025-report/),
  *Hell Gate*, 2025;
- [Rebecca C. Lewis on the Small Business Rent Stabilization Act](https://www.cityandstateny.com/policy/2026/02/socialists-take-aim-commercial-rent/411572/),
  *City & State New York*, 2026;
- [Alec Meeker on commercial lease renewal rights](https://bushwickdaily.com/news/new-bill-seeks-to-guarantee-lease-renewals-for-nyc-small-bus/),
  *Bushwick Daily*, 2026; and
- [Walter Wuthmann on commercial rent protections](https://gothamist.com/news/new-york-lawmakers-seek-rent-control-to-protect-small-businesses),
  *Gothamist*, 2026.

Most of these are mission context, not coverage of NYC Artist Coalition. Their
value is that they preserve the public knowledge field the account assembled,
not that they prove coalition influence over every later development.

### Visible reactions stay bounded

At the July 2026 interface snapshot, 311 of the 342 recovered account-authored
statuses displayed at least one reaction. Visible totals were 11 replies, 544
reposts, and 1,111 likes.

These are mutable current observations, not historical analytics. They do not
establish unique people, impressions, clickthrough, adoption, causality, or
impact. Metrics on all 684 source statuses are excluded from coalition traction.

## Composition Decision

### Added to the public site

Nothing from this pass is added automatically. The current portfolio already
makes the stronger, more useful role and campaign claims through direct press,
official records, public testimony, and campaign artifacts. Adding social
volume to the visible pages would increase the reader's burden without yet
improving the central argument.

### Retained in the knowledge bank

- the exact 5,124-item population reconciliation;
- 1,026 item-level public records and 4,098 explicit carrier gaps;
- all 408 posted short URLs and their current resolution states;
- the four-campaign signal map;
- the 216-account amplification network;
- the 13-account direct-mention floor;
- ten proposition-level public sources, including one canonical source reused
  from the campaign press archive;
- the bounded reaction snapshot; and
- future research paths for a native export or collaborator-provided archive.

## Boundaries

- Say **fully dispositioned** or **reconciled**, not fully recovered.
- The 2019-2022 gap is a carrier gap, not a claim of inactivity.
- The account is collective unless post-level or period-level authorship is
  separately established.
- A repost preserves source authorship and source-status metric ownership.
- A mention, reply, link, reaction, or repost is not automatically partnership,
  endorsement, adoption, causality, or impact.
- Current redirects do not prove historical destination content.
- No raw post text, private path, credential, direct message, private analytics,
  or account-administration record belongs in the public repository.

## Durable Artifacts

- Canonical model: `apps/www/src/data/knowledge-bank/nycac-social-corpus.ts`
- Item-level ledger: `docs/knowledge-bank/data/nycartc-public-post-ledger.json`
- Wider account inventory: `apps/www/src/data/knowledge-bank/social-media-archive-production.ts`
- Recursive hard gate: `KB-EVAL-NYCAC-POPULATION-DISPOSITION`
