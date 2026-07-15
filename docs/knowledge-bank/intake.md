# Knowledge Bank Intake

## Purpose

Intake is the front door for public-safe evidence and memory. It preserves an
article, website, artifact, metric lead, project memory, correction, or possible
claim before research has made it coherent enough for the governed claim bank.

The governing distinction is:

> Capture is not verification. Verification is not projection. Projection is
> not permanence.

Every intake item has `projectionStatus: no-public-projection`. Website copy
must come from a separately reviewed claim, never directly from intake.

## What Belongs Here

- a public article or institutional page;
- a public-safe memory of a project or contribution;
- a metric worth recovering, including its proposed denominator and period;
- a project, collaborator, outcome, or artifact that needs more research;
- a possible correction to an existing claim;
- a candidate synthesis that connects several projects across time.

Do not commit raw private correspondence, private participant records,
credentials, personal addresses, private legal or financial material, raw
transcripts, unapproved photographs, or local archive paths. Keep those outside
the repo and use a protected locator or public-safe summary when appropriate.

## Maturity States

- `captured`: preserved with boundaries; research has not begun.
- `source-associated`: linked to at least one source but not yet synthesized.
- `researching`: questions and source gaps are explicit.
- `claim-candidate`: defensible candidate wording exists, but no publication
  decision has been made.
- `integrated`: incorporated into at least one governed claim. The intake record
  remains as provenance.
- `held`: retained but intentionally paused because of privacy, consent,
  relevance, contradiction, or insufficient evidence.

Maturity is not importance. A large accomplishment may remain `researching`;
a small fact may become `claim-candidate` quickly.

## Proposition Layer

Each developed intake thread is decomposed into atomic propositions. A
proposition records:

- one bounded statement;
- its maturity as direct support, supported with a boundary, bounded synthesis,
  context only, memory lead, or research only;
- the exact source records associated with that statement;
- the specific support those sources provide;
- what the proposition still must not imply;
- the decision the proposition can inform;
- a next research step when it is not claim-ready.

Only direct, bounded, or bounded-synthesis propositions may appear in
`candidateClaims`. Context, memory, and research propositions remain in the
bank but cannot silently become claims. This is how the system preserves depth
without asking one source to prove an entire project history.

## Tensions And Correction Triggers

New research may be narrower than an already approved proof, or may surface
evidence that materially changes it. Intake records therefore link relevant
governed proof IDs and describe the tension without silently downgrading or
reaffirming either record.

Each tension names:

- the intake propositions and governed proofs being compared;
- the current bounded position while research remains open;
- evidence that would confirm the existing wording;
- evidence conditions that would narrow, hold, replace, or retire it;
- exact replacement guidance for every corrective action.

This is a correction mechanism, not an automatic publication pipeline. A
trigger makes the required decision visible; it does not alter a governed proof
without review. The checker enforces that propositions, proof links, and trigger
targets resolve within the same intake context.

## Intake Procedure

1. **Safety check:** Decide whether the fragment itself is safe in a public
   repository. If not, keep it private and write only a bounded summary.
2. **Capture:** Add an `intakeItems` record in
   `apps/www/src/data/knowledge-bank/records.ts`.
3. **Source registration:** Add public sources to `sources`. State both what
   each source supports and what it does not establish.
4. **Decomposition:** Create proposition-level records separating project
   existence, Jamie's role, actions, outputs, outcomes, scale, collaborators,
   and causality. A source may support only some of them.
5. **Research:** Add concrete questions. Record `not recovered` separately from
   `did not exist`.
6. **Claim formation:** Draft candidate wording with Chad's lens: Jamie as an
   actor, a concrete action, a useful end, a named output, and no inflated
   ownership.
7. **Reconciliation:** Compare the intake against related governed proofs. Add
   tensions and exact confirmation or correction triggers where the records do
   not yet align.
8. **Governance:** Create or strengthen a governed claim, attach evidence and
   anti-claims, and obtain the required review.
9. **Composition:** Decide separately whether the claim belongs on a particular
   website surface. Most bank depth should remain off the main site.
10. **Validation:** Run `npm run check:citations`, `npm run test:citations`,
   `npm run knowledge-bank`, and `npm run public-safety`.

## LLM Agent Contract

When Jamie supplies a link, memory, artifact, or possible claim, an agent should:

- preserve it as intake rather than forcing an immediate publication decision;
- inspect existing records before creating duplicates;
- register and closely read public sources when access is available;
- label memory as memory and inference as inference;
- identify missing evidence and contradictory evidence;
- keep collective credit and protected boundaries visible;
- never promote intake directly into the generated public citation registry;
- update the website only after an explicit projection decision.

An agent may submit intake through a pull request. The PR should explain what
entered the bank, which sources were read, what remains unresolved, and whether
any governed claim or public surface changed.

## Current Intake Threads

The structured intake records currently preserve twenty-four threads surfaced on
July 12-15, 2026:

- waterways, communal space, and participatory cultural practice;
- Sunday Dinner as recurring open community infrastructure;
- NYC Artist Coalition formation and cultural-space policy campaigns;
- the press and reference architecture across four NYC Artist Coalition
  campaign sites;
- the full @CallNYCapp population, its issue-pathway publishing record, and
  typed NYC Council member engagement;
- the cross-project social identity system and Jamie's bounded account-
  establishment memory lead;
- NYC Artist Coalition's 5,124-slot profile-population disposition, 3,123
  recovered public records, 2,001 platform-limited unresolved slots, posted-URL
  source trail, shared-identity pattern, strict direct Council-member
  engagement, and larger bounded stakeholder mention corpora;
- WOW List's social record connecting the calendar to Sunday Dinner and one
  external event-sharing specimen;
- KC Spaces Fund's 40-of-40 surviving Facebook Page disposition, collective
  relief-cycle, public funded-space spotlights, fundraising and source trail,
  uniform public identity, protected technical-role evidence, and bounded
  naming-support research lead;
- KC Town Hall's 183-of-183 public-account census, resident-input and recurring
  service operating patterns, source trail, three direct then-serving Council-
  member account responses, and post-transition identity continuity;
- the KC Town Hall CCED recommendation, 2019 Council acceptance and
  appropriation, and 2024 reappropriation of the unused allocation.
- KC Town Hall Phase One field coordination, the neighborhood survey system,
  TiredOfTires operations, and Cleveland Avenue / pro bono design research
  leads;
- Jamie's firsthand account of transitioning KC Town Hall stewardship to a
  mission-aligned organization when his involvement concluded.
- interactive media, sound, and public-memory practice across a 2006 BAPLab
  New Media Program credit, a held Time Is Long identity lead, NTER CHNG and its
  America: Now and Here exhibition record, protected production and interaction
  working records, a Max/MSP audio experiment, Matmos research, and Claudette's
  Theatre On Wheels;
- Commercial Rent Stabilization operating plans, shared minutes,
  privacy-preserving public-data proposals, and a legislative-provenance
  redline; and
- AI evals completion, bounded source-backed sprint design, and a context-only
  cross-archive job-hunt map;
- 196 Artists Residency selection, onboarding, space configuration, access,
  and reusable handoff operations;
- longitudinal HUD-USPS vacancy-source stewardship and mixed-format archive
  automation; and
- Google Drive project-workspace topology as a bounded research map for future
  handoff and collaborator evidence; and
- the 434-of-434 live @urbanhermit profile population, its 321-link source
  inventory, bounded incoming-response set, and source-backed Horse Lords,
  8th Street Tunnel, and KC Town Hall participation claims.

The waterways and Sunday Dinner threads have reached `claim-candidate`. The
campaign-press and several social-evidence threads remain `researching`; the
press indexes are fully accessioned, while their 45 distinct
article bodies remain a bounded close-reading queue. The authenticated CallNYC
thread is now `integrated`: a 110-slot population census recovered 107 timeline
objects, preserves three not-recovered slots, and supports the approved
71-post / 61-page / 26-account issue-pathway projection. Its separate
eight-account interaction recovery floor remains knowledge-bank depth. The
NYC Artist Coalition social threads are now `integrated`: a 5,124-slot
disposition ledger recovered 3,123 public-interface records, keeps 2,001 slots
explicitly unresolved, and supports the shared-identity and strict five-Council-
account / 15-direct-interaction projections. Wider thread matches remain
excluded from the strict count, and raw access-time engagement totals remain
outside website projection. The KC Town Hall social and allocation threads are
now `integrated`: all 183 profile-counted account records were recovered, the
public operating-surface and three-Council-response claim is approved, and the
governed funding wording now separates recommendation, Council acceptance,
appropriation, and later reappropriation from receipt, spending, and
completion. Individual shared-account authorship, post-transition operation,
agreement execution, any disbursement, and Jamie's specific causal contribution
to the Council action remain separate questions. The stewardship transition is
`captured` as a distinct memory lead pending a public-safe handoff record or
receiving-organization confirmation. The three July 14 archive-production threads have
reached `claim-candidate` for their supported propositions while retaining
protected source locators and explicit non-claims. The interactive-media
thread now links one governed reserve claim for NTER CHNG's 2011 America: Now
and Here inclusion; that claim remains outside the current website and public
citation registry. Two protected NTER CHNG working records add bounded
installation-operations and conceptual evidence without exposing Drive links,
participant phone numbers, submitted messages, or private logistics. They do
not change the governed public claim or current website. The Google Drive pass
adds two more
`claim-candidate` threads and one `researching` thread; all three remain outside
the website and generated public registry. The personal-account pass is
`integrated` into four governed reserve claims, but raw historical post text
remains protected and no `/proofs`, `/urbanhermit`, or other public route is
created.

The July 15 iCloud reconciliation strengthens those same non-projecting
threads. Two institutional program records now support Jamie's 2006 BAPLab New
Media Program credit, while the Time Is Long description remains
`research-only` because its source prints `Jamie Burkhart`. The CRS thread adds
Jamie's discussion-only legislative-provenance redline as direct evidence of
policy version traceability, not legal advice or adoption. The NYC Artist
Coalition thread now connects DCLA listening, a coalition priority vote, the
collective recommendation set, its preservation in the official CreateNYC
appendix, and DCLA's final-plan recognition. That sequence establishes
collective institutional value but does not assign Jamie's role or policy
causality.

The NYC Artist Coalition Facebook event thread is now `integrated` as
`INTAKE-NYCAC-FACEBOOK-EVENT-POPULATION-2026-07-15`. It accounts for all 34
displayed control slots as 33 recovered public event records and one unresolved
historical slot, associates the event graph with seven posted source articles,
and promotes bounded participation-system and response-signal claims. Jamie's
democracy-lab framing remains attributed interpretation. The intake itself is
non-projectable; attendee identities, comments, raw event bodies, credentials,
private working links, and authenticated-session data remain protected.

The personal and WOWList Facebook event pass adds two more integrated,
non-projecting records. `INTAKE-JAMIE-FACEBOOK-EVENT-POPULATION-2026-07-15`
reconciles 21 displayed personal control slots as 20 recovered event pages and
one unresolved slot, preserving a 2006-2019 organizer and co-organizer ledger.
`INTAKE-WOWLIST-FACEBOOK-EVENT-POPULATION-2026-07-15` records the current
WOWList zero-state separately from two externally hosted event routes in the
preserved page-post corpus. Neither intake creates a public archive route, and
residential, contact, participant, comment, administration, and session data
remain protected.

The WOW List Facebook post pass is now `integrated` as
`INTAKE-WOWLIST-FACEBOOK-POSTS-2026-07-15`. It gives all 57 records in the
terminal 19-page protected capture a public-safe census and live disposition,
associates 51 manager-only Jamie publisher labels with the recovered corpus,
keeps six publisher attributions unresolved, inventories 65 distinct public
URLs, and develops bounded operating-practice and care-infrastructure claims.
The intake does not assign attached-source authorship, erase Richard Caceres's
shared project credit, infer cross-platform control, or publish an engagement
total. It remains non-projecting until a separate hiring-site composition
decision calls for one of its governed claims.

The KC Town Hall Phase One pass is now `integrated` as
`INTAKE-KCTH-PHASE-ONE-NEIGHBORHOOD-PRACTICE-2026-07-15`. It promotes three
governed reserve claims: bounded Phase One field coordination, a neighborhood
survey system, and TiredOfTires program operations. The 2019 proposal
corroborates Jamie's founder/project-manager context, named team, scope, survey
artifact, and displayed total; his general-contractor, individual design, and
deeper program-operation details remain explicitly first-person where the
proposal and public sources are silent. Cleveland Avenue Unify to Beautify and
pro bono neighborhood print production remain memory leads pending artifact,
city, neighborhood, or collaborator evidence. No website route or hiring-site
copy is created.
