# iCloud Teams archive production

**Research date:** 2026-07-14
**Collections:** Jamie Projects History, CRS, and job-hunt
**Method:** anchor-first close reading, source normalization, atomic claim decomposition, public-safety review, editorial selection, and eval-backed validation

## Purpose

This pass treats Jamie's working folders as an archival production surface, not
as a folder to publish. The goal is to recover useful sources and assertions,
record what each source can and cannot establish, and select only the small
subset that improves the public portfolio.

The three collections serve different functions:

- **Jamie Projects History** preserves project-level public traces and media.
- **CRS** preserves active coalition memory, policy lineage, and data-product work.
- **job-hunt** maps role fit, approved language, and evidence gaps that still need research.

## Materialization rule

iCloud metadata can appear before a file's data fork is readable. A logical
filename or size is not enough to call a source reviewed.

During this pass, selected high-signal files were requested and then checked for
readable content. A Sunday Dinner root capture did not materialize, while its
archive and RSVP captures were readable. That result is recorded as **not
materialized in this pass**, not empty, missing, or nonexistent.

## Close-read records

| Collection | Record | What it supports | Where it stops |
| --- | --- | --- | --- |
| CRS | Commercial Rent Stabilization Collaboration running minutes, updated May 14, 2026 | Jamie maintained a shared memory system in active use across recurring meetings, decisions, action ownership, open questions, city/state lanes, consent rules, norms, and templates. | Does not prove sole leadership, unilateral decisions, or completion of every action. Raw collaboration details remain private. |
| CRS | Legislative Provenance Redline, updated May 17, 2026 | Jamie prepared a tracked source-lineage instrument spanning Intro 93, Fair Rent NYC recommendations, Small Business Survival Act lineage, and S8319 revisions. | Unofficial; not legal advice; source-layer labels are not individual drafting authorship. |
| CRS | Toward a Fuller Public Baseline for Commercial Vacancy and Lease Cost in NYC, March 27, 2026 | Jamie scoped a privacy-preserving RPIE-derived pilot with an indicator table, coverage/suppression table, and methods note. | A proposal, not City adoption or a released dataset. |
| CRS | 90-Day Action Plan, April 2026 | Jamie defined a bounded stewardship role and six proposed shared public goods. | An authored plan, not proof of completion or coalition approval. |
| Jamie Projects History | The Kansas City Star raft feature, November 15, 2007 | The newspaper featured the journey on its front page and page A4 and named Jamie as a crew member. | Does not establish every crew role; copyrighted pages are not republished. |
| Jamie Projects History | Sunday Dinner live RSVP page | The project presented a weekly, open, differently themed invitation and named Julia and Jamie as contacts. | Does not establish 300-plus completed gatherings or 20-plus resident artists. |
| job-hunt | Source-Backed Team Memory Sprint proposal, June 26, 2026 | Jamie developed the method into a bounded pilot design with one approved source bundle, human review, reusable artifacts, privacy notes, and a continue/revise/stop decision. | Does not establish a commissioned or completed client engagement. Recipient context, pricing, and correspondence remain protected. |
| job-hunt | Job-Hunt Context Outline, July 2026 | Useful research map for role fit and unresolved metrics. | Synthesis is not independent corroboration of resume claims. |

## Public selections

Three claims were selected for the Fair Rent NYC case study:

1. Jamie built and maintained a shared running-memory system that connected recurring meetings to decisions, ownership, open questions, workstreams, consent boundaries, and reusable templates.
2. Jamie prepared a legislative provenance redline that made policy source layers inspectable for collaborators.
3. Jamie prepared a public, privacy-preserving commercial vacancy and lease-cost pilot proposal for NYC School of Data 2026.

The third claim has a public citation and a complete two-page artifact. The first
two use public-safe summaries backed by non-rendered private evidence.

## Research queue

The archive pass did not silently validate aggregate figures repeated in job-hunt
materials. The following remain separate evidence questions:

- the independent basis for 2x HJE revenue growth;
- WOW List city-scale adoption counts;
- Sunday Dinner and 196 Artists Residency aggregate counts;
- the aggregate page count for CRS campaign-memory infrastructure;
- whether the Source-Backed Team Memory proposal became a commissioned or completed engagement.

## Protected boundaries

This pass does not publish:

- raw collaboration notes or transcripts;
- tenant, business, stakeholder, donor, subscriber, or participant records;
- private correspondence or application strategy;
- legal-review materials beyond public-safe metadata;
- copyrighted newspaper pages;
- machine-local paths;
- family or health circumstances;
- iCloud metadata mistaken for readable source content.

## Records added

- 8 normalized source records
- 7 atomic claim records
- 3 bounded research inquiries
- 9 intake records with explicit disposition and next action
- 1 approved public PDF and first-page visual artifact

The machine-readable records live in
`apps/www/src/data/knowledge-bank/archive-intake-2026-07-14.ts`.
