# Jamie Burkart Facebook Post Archival Production

Date: 2026-07-13

## Result

An authenticated review accounted for **100 percent of the surviving records
returned by Facebook's `Manage Posts > Posted by: You` population control** in
this session.

The terminal cursor run returned:

- 621 cursor pages;
- 3,728 returned nodes;
- 1,243 unique stable story records after deduplication;
- 998 records with readable message text; and
- 245 records whose text was unavailable or whose recoverable content was
  primarily media-led.

Facebook returned `has_next_page: false` at the end of the run. The result is
complete for that surviving filtered surface on July 13, 2026. It is not a
claim that the interface contains every post Jamie ever created.

See the
[1,243-row aggregate-only census](jamie-facebook-post-census-2026-07-13.csv).

## Population Control

Jamie's ordinary profile timeline is not a reliable full-population control.
It mixes authored records with other social surfaces, renders a moving window,
and does not expose a simple total.

The authenticated `Manage Posts` interface provided three useful authorship
controls: `Anyone`, `You`, and `Others`. This pass selected `You`. The
underlying request state identified the corresponding owner filter and did not
select tagged-only records. The crawler then followed Facebook's server cursor
until the terminal flag.

This distinction matters. The resulting 1,243 records are records Facebook
placed in Jamie's owner-authored surface, not posts by other people, a list of
everything in which Jamie was tagged, or a reconstruction of his full social
graph.

## Replay And Deduplication Audit

The cursor did not return a simple one-pass sequence. Facebook replayed nearly
the entire unique population before finally terminating:

- 1,242 unique records appeared three times;
- one unique record appeared twice; and
- repeated records generally reappeared roughly 207 and 414-415 cursor pages
  after their first occurrence.

This makes the distinction between `returned nodes` and `unique records`
essential. The archive preserves both numbers. It does not inflate 3,728
returned nodes into 3,728 posts.

Every census row corresponds to one stable unique record. The public ledger
replaces the underlying identifier with a sequential aggregate-only ledger ID.

## Complete Record Accounting

### Years

| Year | Records |
| --- | ---: |
| 2006 | 2 |
| 2007 | 5 |
| 2008 | 4 |
| 2009 | 218 |
| 2010 | 82 |
| 2011 | 88 |
| 2012 | 153 |
| 2013 | 184 |
| 2014 | 109 |
| 2015 | 68 |
| 2016 | 122 |
| 2017 | 118 |
| 2018 | 27 |
| 2019 | 42 |
| 2020 | 19 |
| 2022 | 2 |

No record was returned for 2021 or after June 2022. That is a property of the
surviving filtered population exposed in this session. It is not proof that no
such post was ever created.

### Primary record form

| Form | Records |
| --- | ---: |
| Text | 335 |
| Shared story | 244 |
| Photo | 221 |
| Media or text unavailable | 159 |
| Photo album | 135 |
| Event | 58 |
| External link | 55 |
| Video | 36 |

Each record receives one primary form so the accounting sums to 1,243. A
single Facebook story may have contained more than one kind of content.

### Broad research themes

| Theme | Records |
| --- | ---: |
| Everyday life and observation | 620 |
| Media-only or text unavailable | 235 |
| Culture, art, and performance | 134 |
| Community and hospitality | 97 |
| Civic and public-interest work | 78 |
| Care, memory, and relationships | 45 |
| Waterways, place, and ecology | 21 |
| Technical and digital practice | 12 |
| Small business and commerce | 1 |

These broad themes are deterministic research aids. They help locate records
for close reading; they are not objective descriptions of a life and do not
measure time, effort, priority, value, reach, or impact.

### Professional-relevance disposition

| Disposition | Records |
| --- | ---: |
| Contextual | 1,021 |
| Project-specific | 158 |
| Practice-related | 64 |

The 222 project-specific or practice-related records formed a second-stage
candidate set. `Contextual` does not mean unimportant. It means the record was
not selected as professional evidence in this pass.

## Close-Reading Findings

### A recurring implementation practice

Across the candidate set, Jamie's record repeatedly moves from an emerging
purpose to a usable public structure. The recurring actions include:

- translating a goal into a clear invitation or call to action;
- creating a route through which people can join, contribute, learn, respond,
  or attend;
- maintaining a recognizable project identity across websites, social
  accounts, events, and documentation;
- turning recurring activity into a format people can understand and repeat;
- sharing instructions, scripts, training, and process updates;
- crediting collaborators and community contributors; and
- preserving enough documentation for work to continue and be understood.

This is first-person, contemporaneous role evidence. It helps describe what
Jamie was doing. Independent sources remain necessary for external outcomes,
policy causality, attendance, audience, and contested credit.

### WOW List

Forty-seven recovered authored records were selected as WOW List-related.
Together they document product and community operations rather than only
promotion:

- recruiting and supporting local calendar stewards;
- inviting people to join calendars, add events, and receive community lists;
- recognizing contributors and member-created tutorials;
- explaining the relationship between community values and product design;
- supporting calendars and organizers across cities; and
- routing issue-based gatherings and cultural-space care through the same
  event-distribution infrastructure.

The population is useful evidence of Jamie's operational participation in the
shared project. It does not establish that he authored WOW List's shared Page,
managed every social channel alone, or caused the adoption and impact described
by project sources.

### Sunday Dinner

Forty-three recovered authored records were selected as Sunday Dinner-related.
They preserve the program's repeatable participation structure:

- a recurring open invitation;
- a changing weekly theme;
- shared contribution through food and presence;
- repeated photo and video documentation;
- continuity across locations and city variants;
- collaborative cultural production; and
- a documented 100th-gathering milestone.

The personal archive also contains private addresses, phone numbers,
relationships, and media context that are not appropriate for the public
knowledge bank. The claim is therefore retained as a public-safe pattern, not a
published reconstruction of gatherings or participants.

### NYC Artist Coalition and campaigns

Thirty-three recovered authored records were selected as NYC Artist Coalition
or campaign-related. The record makes Jamie's implementation contribution
especially legible:

- convening and promoting general meetings, panels, town halls, and City Hall
  hearings;
- translating legislation and public process into plain-language call scripts
  and participation routes;
- organizing fire-safety study sessions and public-input workflows;
- soliciting meeting priorities and survey participation;
- communicating movement from public testimony to Council action;
- connecting safety, affordability, culture, and public administration; and
- naming coalition partners and public participants rather than claiming sole
  credit.

This strengthens the knowledge bank's understanding of Jamie as an
implementation lead and public-facing systems builder. Campaign outcomes remain
grounded in independent press and government sources already in the bank.

### Place, waterways, culture, and technical work

Smaller clusters preserve additional continuity across Jamie's practice:

- participatory programs organized around waterways, movement, and public
  encounter;
- technical support and web practice as enabling infrastructure;
- cultural documentation through photo, video, and event records; and
- public-history and place-based inquiry that link research with participation.

These clusters are research leads. They should be paired with project archives,
published reporting, collaborator context, and reviewed visual material before
stronger public projection.

## What The Pass Does Not Measure

The Manage Posts query used for population accounting did not recover complete
interaction metrics. No reaction, comment, or share total is asserted here,
and absent metrics must not be described as zero.

Post counts do not measure:

- hours or difficulty of work;
- professional priority;
- unique people reached;
- attendance or participation;
- endorsement;
- adoption;
- policy or cultural impact; or
- Jamie's share of credit in collective work.

Counts are useful for population control and research navigation. Meaning comes
from close reading and corroboration.

## Public-Safety Boundary

Privacy labels were recovered for only a minority of records. The raw corpus is
therefore protected as a whole rather than presumed public.

The repository includes only an aggregate census with:

- a sequential ledger ID;
- year;
- primary record form;
- broad research theme;
- professional-relevance disposition;
- accounting status; and
- public-detail status.

It excludes raw responses, request tokens, stable story IDs, Facebook URLs,
exact dates, post text, names, locations, addresses, phone numbers, privacy
labels, relationship context, comments, interaction data, and media.

The protected corpus is a research source, not a new dossier. Ordinary life,
relationships, care, grief, health, home, and unreviewed visual context remain
outside the public repository even when they helped Jamie understand his own
history.

## Editorial Disposition

This pass makes no immediate change to the public website. Existing portfolio
claims about NYC Artist Coalition campaigns, WOW List, Sunday Dinner, and
Jamie's operating practice are already supported by stronger public or
independently reviewable sources.

The new value is depth:

- clearer first-person evidence of Jamie's implementation contribution;
- new source-discovery leads;
- a stronger basis for future role-specific compositions;
- a more precise brief for photo and archive editors; and
- explicit limits that prevent frequency and personal disclosure from becoming
  false professional proof.

There is no public Facebook archive route, proofs route, knowledge-bank route,
or personal-timeline route.

## Next Research

1. Use selected records as leads to locate independent public sources,
   collaborator confirmation, project repositories, and archived websites.
2. Request an authorized Facebook account export if a future research question
   requires testing deleted, hidden, or omitted records.
3. Separately verify the public visibility and publication value of any
   individual post before citing it.
4. Review visual material only through a rights, consent, context, and
   public-safety workflow.
5. Recompose the public portfolio only when a stronger source-backed claim
   materially improves clarity for a defined audience.
