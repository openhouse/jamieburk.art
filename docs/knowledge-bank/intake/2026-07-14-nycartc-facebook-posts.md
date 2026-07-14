# NYC Artist Coalition Facebook Posts: Surviving Public Timeline

Date: 2026-07-14  
Surface: [NYC Artist Coalition on Facebook](https://www.facebook.com/nycartc)  
Disposition: integrated with publication and privacy boundaries

## What was counted

An authenticated, checkpointed pass recovered **441 unique records** from the
currently accessible NYC Artist Coalition public Page timeline. The surviving
range begins January 29, 2017, and ends September 15, 2021.

After record 441, 40 additional scrolls and a terminal wait produced no new
records. Page date filters returned no posts in 2015 or 2016 and located the
first surviving record on January 29, 2017. Every recovered record has a row in
the [public-safe census](../data/nycartc-facebook-post-census-2026-07-14.csv).

This is **100 percent of the surviving public owner-timeline population exposed
by the current interface**, not an official Meta export, deletion history, or
complete accounting of all managed Page content. A first-party management
crosscheck exposed later event-maintenance activity outside the 441-record
public timeline.

## Population

| Record form | Records |
| --- | ---: |
| Event route | 148 |
| Standalone post | 136 |
| Original-media post | 78 |
| Reshared story | 53 |
| Source or resource route | 26 |
| **Total** | **441** |

The corpus is not merely an announcement feed. It records a civic publication
system that repeatedly moved among events, public meetings, issue explanation,
campaign action, partner voices, public resources, and press.

## Mission patterns

Primary-theme classification assigns each record one main function:

| Primary theme | Records |
| --- | ---: |
| Nightlife enforcement and governance | 157 |
| General coalition communication | 92 |
| Commercial rent and tenancy | 71 |
| Cultural-space care | 47 |
| Public meetings and participation | 25 |
| Funding and operational resources | 21 |
| Event and cultural distribution | 15 |
| Press and public knowledge | 11 |
| Equity, solidarity, and mutual aid | 2 |

Multi-label review found the same issues crossing record forms: nightlife and
enforcement appeared in 177 records; public meetings and participation in 121;
cultural-space care in 82; Commercial Rent Stabilization or tenancy in 71;
event distribution in 63; funding or operational resources in 44; press or
public knowledge in 24; and equity, solidarity, or mutual aid in 17.

This is the deeper pattern: the account joined cultural and civic codes. A
meeting at a space could become a public record, a source route, a campaign
action, an invitation to testify, or a return of learning to the coalition.

## Stakeholder routing

Record-level references or links recur across important stakeholder groups:

| Referenced group | Records |
| --- | ---: |
| NYC Council members or the Council | 86 |
| NYC cultural or nightlife agencies | 40 |
| Cultural or advocacy partners | 38 |
| NYC business or enforcement agencies | 13 |
| Press or public-information organizations | 11 |

These are **outgoing references and routes**, not evidence that 86 Council
members engaged. They do not establish endorsement, attendance, partnership,
agreement, or policy causality. The separate X archive provides the bounded
inbound public-official engagement claim.

Frequently recurring public references include the New York City Council,
Rafael Espinal, Dance Liberation Network, City Hall, Ali Coleman, Ariel Palitz,
Stephen Levin, Tara Mc Manus, Dance Parade New York, House Coalition, JACK,
Educated Little Monsters, the Department of Cultural Affairs, and Market Hotel.
Those names describe the public information architecture of the corpus, not an
endorser list.

## Sources and public knowledge

The census recovered 64 direct outbound-link occurrences resolving to 39
unique URLs. Direct links most often routed through `nycartc.com`,
`talksnotraids.com`, `council.nyc.gov`, `letnycdance.com`, and
`savenycspaces.com`.

Thirty-nine is a lower bound, not the complete source population. Facebook
often represented attached articles through Facebook-owned attachment links,
so title-level discovery exceeded the directly extracted URL set.

Mission-relevant routes connect the Facebook population with sources already
present in the bank, including:

- New York Times, NPR, Gothamist, WNYC, and other Cabaret Law reporting;
- public reporting and Council records around MARCH raids and Intro 1156-A;
- Office of Nightlife and Save NYC Spaces reporting;
- commercial-rent and storefront-vacancy reporting;
- coalition campaign sites, Council pages, public testimony routes, and
  COVID-19 relief resources.

Representative public Page records preserve a Cabaret Law repeal event route,
an Office of Nightlife event route, a MARCH transparency report route, and the
September 2021 FairRentNYC virtual-house action. Article attachment discovery
enters the existing campaign-press lifecycle; a Facebook share does not itself
verify every proposition in the linked article.

## Visible interaction signals

Three hundred eighty-six of the 441 records display at least one current
interaction. At capture, the aggregate record-level signals were:

| Signal | Current count |
| --- | ---: |
| Reactions | 2,366 |
| Comments | 212 |
| Shares | 611 |

The strongest currently visible record was the October 2017 Cabaret Law repeal
event route, with 95 reactions, four comments, and 60 shares. Other strong
signals appear on the Save NYC Spaces Night Mayor town-hall recap, a COVID-era
rent-rights Q&A, and the Market Hotel meeting recap with the cultural-affairs
commissioner.

These are mutable platform signals, not historical peaks. They are not unique
people, reach, impressions, physical attendance, endorsement, adoption,
causality, or impact. Reactions, comments, and shares must not be summed into a
single people or engagement count.

## Jamie's role and collective credit

Jamie recalls being the predominant person who operated the Page while others
also used it. That recollection belongs in the knowledge bank as a research
lead. It is **not yet a public publisher-attribution claim**.

Neither the public timeline nor the inspected first-party management surface
assigned individual publisher identity to the reviewed records. The defensible
public statement is that Jamie established the coalition's public identity
system and that collaborators used the shared identity across campaigns over
years. The record does not establish that Jamie authored or published all 441
records.

The site therefore projects the operating-system contribution while preserving
team authorship, partner work, and campaign outcomes as collective.

## Public-safe claim

> Across 441 surviving Facebook timeline records from 2017 through 2021, the
> coalition's shared identity connected events, public meetings, campaign
> calls, source routes, and partner voices across Cabaret Law repeal, nightlife
> governance, cultural-space care, MARCH transparency, and Commercial Rent
> Stabilization.

## Protected material

The public repository does not contain raw responses, full post text, comments,
reaction or commenter identities, authentication state, administrative
locators, Page-management context, or per-record publisher data. The census
uses opaque record IDs, classifications, current interaction counts, and public
locators only.

## Open research

- Complete a bounded first-party export in supported date chunks and reconcile
  managed content against the public owner timeline.
- Recover individual publisher attribution only through an approved surface
  that reliably matches each requested record identity.
- Ask collaborators to confirm account-operation roles without treating memory
  as sole authorship of shared messages or campaigns.
- Continue close-reading article attachments and associate verified source
  propositions with existing claims.
- Preserve direct stakeholder reference separately from inbound engagement.

## Knowledge-bank integration

- Model:
  `apps/www/src/data/knowledge-bank/nycartc-facebook-posts-batch-2026-07-14.ts`
- Public-safe census:
  `docs/knowledge-bank/data/nycartc-facebook-post-census-2026-07-14.csv`
- Selected site projection: `/work/fair-rent-nyc`
- Recursive hard gate: `nycartc-facebook-post-archive`
