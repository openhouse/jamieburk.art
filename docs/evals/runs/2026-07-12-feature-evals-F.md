# Feature Evals F Run

**Branch:** `feature/evals-F`

**Base:** `develop` at `2ec37fe`

**Date:** 2026-07-12

## Baseline

The first run scored **73/100** and failed automated readiness.

- Message alignment: pass.
- CallNYC external validation: hard-gate failure because the canonical claim
  had not yet been projected into the case study and proof bank.
- Responsive contracts: pass after repairing the two known narrow-screen
  causes.
- Approved resume artifact: pass.
- Application paths: pass.
- Production cutover readiness: hard-gate failure because the production
  runbook lacked explicit cutover, verification, and rollback commands.
- Release gate wiring: pass.

## Repairs

- Aligned primary messaging around turning emerging work into usable systems.
- Added the bounded, source-backed CallNYC Council-member amplification claim
  to the canonical record, proof bank, case study, resume, and Technical
  Operations projection.
- Repaired long-heading and long-button narrow-screen behavior without global
  overflow concealment.
- Added executable production cutover, verification, and rollback steps.
- Added deterministic evaluator tests, weighted criteria, hard gates, and
  anti-gaming rules.

## Final automated result

The second run scored **100/100**. All automated hard gates passed.

Automated readiness does not authorize production deployment. The remaining
manual gates are:

- hiring-manager 30-second comprehension test;
- resume visual-balance review and Jamie approval before replacing the
  currently approved PDF;
- open-PR ownership and supersession review;
- production postdeploy verification after Jamie approves the exact SHA.

## Chad-lens recursive pass

A follow-up run added Chad's lens as a 16-point automated hard gate. The first
run scored **85/100** and failed because the Technical Operations page required
the reader to infer Jamie's entry condition, coordinating role, usable outputs,
and relationship to the proof map. The homepage also retained one
`ambiguous, high-context` formulation.

The hill climb made three bounded repairs:

- added a role-fit orientation band naming where Jamie enters, what he
  coordinates, and what teams can use afterward;
- rewrote all eight Technical Operations proof summaries in direct,
  contribution-bounded first-person language;
- changed the remaining homepage frame from ambiguous situations to emerging
  work.

The evaluator itself then exposed and repaired one false negative caused by a
JSX line break, normalizing whitespace without weakening the semantic contract.
The final run returned to **100/100**, with the Chad-lens hard gate passing.

## Knowledge-bank lifecycle recursive pass

A second follow-up added an 18-point lifecycle hard gate. Its baseline scored
**85/100** because the bank lacked durable intake, project, publication-decision,
proof-coverage, and photo-research structures.

The implementation then:

- recorded twelve supplied memories and URLs with durable dispositions;
- closely read and integrated four public sources;
- created five bounded canonical claims and ten open inquiries: nine tied to the supplied material plus one cross-proof source-coverage queue;
- separated evidentiary maturity, publication safety, and editorial selection;
- assigned publication decisions to every canonical claim;
- assigned source-coverage status to every public proof;
- added photo-editor questions and rights notes to each project node;
- selected the externally reported Cabaret organizing claim for the existing
  civic case study while keeping Open House, Great Accommodations, and the raft
  expedition in reserve and the longitudinal interpretation on hold.

The semantic validator caught one misplaced project-link block. After repair,
the lifecycle and launch suites returned to **100/100** with all hard gates
passing.

## NYC Artist Coalition government-value recursive pass

The July 15 pass added a 20-point hard gate for the institutional interpretation
of NYC Artist Coalition's relationship to DCLA, the Council, and Rafael
Espinal. Eight additional public records establish the direct sequence:

- Finkelpearl's February 27 CreateNYC testimony described DIY-community formal
  recommendations and continued independent organizing without naming NYC
  Artist Coalition;
- a later DCLA commissioner message explicitly identified New York City Artist
  Coalition as a coalition that Office Hours helped launch;
- coalition recommendations, an Espinal letter, public maps, forums, and
  Council testimony made cultural-space experience legible in administrative
  and legislative forms; and
- Council records establish Espinal's sponsorship of the enacted Office of
  Nightlife and Cabaret Law repeal laws, while his public account separately
  credited NYC Artist Coalition and Dance Liberation Network in the repeal
  effort.

The first complete run scored **96/100** because prose-sensitive checks failed
on Markdown emphasis and a negative-claim sentence was mistaken for an asserted
overclaim. The evaluator was repaired to normalize formatting and distinguish
assertions from explicit prohibitions without weakening its negative tests.

The final pass scored **100/100** with all automated hard gates passing.
Adversarial tests reject testimony-name conflation, private-motive claims, bill
authorship and legislative-causality inflation, and silent projection of the
reserve interpretation onto the current site.

## Ten-source evidence-expansion recursive pass

A third follow-up added an 18-point evidence-expansion hard gate. The baseline
scored **87/100** and failed because none of the ten-source research set, five
bounded claims, three proof-debt reductions, or selected page-local projections
had yet entered the repository.

The criterion rejects source accumulation without use: each source must be
public, bounded, and linked to a claim or inquiry; research must reduce named
proof debt; and only claims selected through publication decisions may reach
the site.

The hill climb integrated the ten-source set, created five bounded claims,
reduced proof debt for NYC Artist Coalition, Sunday Dinner, WOW List, and KC
Town Hall, and selected three useful page projections. The final run returned
to **100/100**, with the evidence-expansion hard gate passing.

## Campaign-press corpus recursive pass

A fourth follow-up added an 18-point campaign-press hard gate. The first run
scored **89/100** after the machine-readable corpus was in place but before a
human-auditable intake note documented the source indexes, reconciliation, and
editorial boundary.

The completed corpus records:

- 21 Let NYC Dance press-index appearances;
- 7 Talks Not Raids appearances;
- 8 Save NYC Spaces appearances;
- 10 Fair Rent NYC appearances across the supplied 2021 Wayback capture and
  current reference library;
- 46 total appearances resolving to 45 unique articles because one NPR article
  appears in both Let NYC Dance and Save NYC Spaces;
- 42 new canonical source records and reuse of three existing close-read
  records.

The semantic validator enforces exact counts, canonical-source membership,
cross-campaign deduplication, and the rule that an unread press-index entry
cannot become claim evidence. The human-readable intake note preserves the
full grouped inventory and its limitations. The final run scored **100/100**
with every automated hard gate passing.

Responsive browser QA at 1440px and 390px then exposed a reader-facing defect
outside the first automated score: Sunday Dinner rendered a citation marker,
but its citation page ID did not match the work-route slug, so the short proof
page could not render its source note. The repair aligned the canonical page
ID and MDX projection with `/work/196-sunday-dinner`. The validator and eval
suite now enforce route-slug alignment. Fair Rent NYC, Sunday Dinner, and KC
Town Hall were rechecked at desktop and mobile widths with no horizontal
overflow and resolvable page-local source notes.

## KC Town Hall Council-allocation recursive pass

A fifth follow-up added an 18-point KC Town Hall Council-allocation hard gate.
The baseline scored **90/100** because the bank stopped at the CCED Board's
recommendation and the public page still said that no later Council record had
been established.

Primary-source review recovered the September 26, 2019 Council sequence:

- Committee Substitute for Ordinance No. 190642 appropriated $490,539 to KC
  Town Hall in the Round Two project table; and
- Second Committee Substitute for Resolution No. 190649 accepted the board's
  recommendation and authorized the City Manager to negotiate a funding
  agreement for up to $490,539.

The hill climb added both government sources, a durable intake record, a
three-source claim, a revised publication decision, source coverage, and an
open inquiry focused on agreement execution, receipt or disbursement,
implementation, and current status. It updated the KC Town Hall proof, case
study, work metadata, source notes, and repository guidance while retaining the
boundary that Council action does not establish those later outcomes or Jamie's
sole causality for the vote.

Negative tests reject a missing appropriation source and reject public wording
that turns allocation into receipt or disbursement. The final evaluator scored
**100/100**, with every automated hard gate passing.

Browser QA at 1440px and 390px confirmed three page-local source notes, no
horizontal overflow, no stale pending-source copy, and no console warnings or
errors. The mobile and desktop compositions remained legible after the stronger
claim and adjacent metadata were aligned.

### Lifecycle and privacy correction

Jamie subsequently corrected the KC Town Hall lifecycle record: his involvement
is historical, and he transitioned project stewardship to a mission-aligned
organization. The prior `2019-present` and `active` fields were removed.

The professional handoff now has a no-silent-loss intake record and a separate
corroboration inquiry. It is labeled as firsthand research context, kept out of
the source-backed Council claim, and not selected for site projection. The
receiving organization remains unnamed pending permission and corroboration.
No personal circumstances were entered into the repository.

The existing KC Town Hall hard gate now requires historical lifecycle metadata,
the bounded transition record, and an explicit privacy boundary. A new negative
test demonstrates that the gate fails if the boundary is removed.

## Project social-account recursive pass

A subsequent 18-point hard gate treats project social media as public evidence
and identity infrastructure rather than a loose collection of links. The
authenticated, read-only pass verified three project handles:

- `@CallNYCApp` for CallNYC;
- `@NYCArtC` as the shared identity for NYC Artist Coalition, Let NYC Dance,
  Talks Not Raids, Save NYC Spaces, and FairRentNYC; and
- `@wowlist` for WOW List.

The recovery found 106 of 110 visible-profile items for CallNYC and 37 of 38
for WOW List. The larger active coalition account was sampled through campaign
and public-actor queries, recovering non-exhaustive floors of 53 Let NYC Dance,
40 Save NYC Spaces, 34 Talks Not Raids, and 27 FairRentNYC posts.

The Council-member pass retained two definitions instead of collapsing them.
CallNYC keeps its existing minimum of five sitting member amplifications in
2016. NYC Artist Coalition now has a separate minimum of six contemporaneous
member accounts that directly mentioned, replied to, or quote-amplified
`@NYCArtC`; Brad Lander's additional campaign-level engagement stays outside
that direct-handle count.

The hill climb added a canonical account map, thirteen public social/profile
sources, one protected firsthand establishment source, two newly discovered
public documents, three claims, three inquiries, three publication decisions,
two proof-coverage records, a public-safe accession note, and selected Fair Rent
NYC, WOW List, and Technical Operations projections. Negative tests reject
complete-export inflation, session-material leakage, sole-author attribution,
and official-endorsement inflation.

## Personal social full-population recursive pass

A later archival-production pass added a 20-point hard gate for Jamie's public
personal `@urbanhermit` account. Authenticated full-scroll recovery closed the
current 434-post profile control as 338 authored standalone posts, 15 authored
replies, and 81 reposts. A separate inbound-search floor recovered 26 public
records from 17 accounts while preserving role attribution, mission context,
and general conversation as different dispositions.

The public repository retains aggregate-only 434-row and 26-row ledgers. Full
text, exact dates, handles, status IDs and URLs, media, relationship details,
historic contact or location details, and raw reactions remain outside the
repository. The gate recomputes all relationship, year, theme, link,
stakeholder, and interaction-context totals and deliberately fails on dropped
records, privacy leakage, stakeholder inflation, erased general conversation,
repost-reaction conflation, or silent site projection.

The source-routing pass close-read and promoted three bounded records: NPR
Music's joint maker credit for the Horse Lords `Truthers` video, Music
Hackathon's identification of Jamie as a co-organizer and WOW List as an
event-sharing service, and KCUR's reporting on the 8th Street Tunnel public
history program. The first two remain reserve depth or proof-basis support;
KCUR strengthens a held longitudinal inquiry. No new visible site copy was
selected.

The citation validator then caught and repaired two integration defects:
missing project-to-claim backlinks and accidental use of an unreviewed campaign
press source as claim evidence. After repair, the complete recursive check
returned **100/100** with all automated hard gates passing. The four manual
gates remain explicit under the protocol's stopping rule.

## NYC Artist Coalition Facebook event recursive pass

The July 14 follow-up added a 20-point hard gate for the coalition's Facebook
event practice. The authenticated host surface displayed 34 past events. A
terminal traversal recovered 33 distinct event IDs; a second authenticated pass
recovered the exact same 33-ID set. The resulting 34-slot ledger therefore
retains 33 recovered records and one unresolved control slot. It does not call
the interface an official Meta export or infer the missing event's title, date,
host, or topic.

The recovered chronology spans 2017 through 2021. Twelve recurring-meeting
records include ten named physical cultural spaces and two virtual meetings.
The wider population records public hearings, fire-safety training, legal and
architectural Q&A, venue-support actions, panels, rallies, workshops,
small-business advocacy, and relief coordination. Thirty-two pages expose
Facebook response displays ranging from nine to 1.7K; the gate rejects summing
them or treating them as unique people, attendance, reach, endorsement, or
impact.

Expanded descriptions produced 61 outbound-link occurrences across 38
normalized URL rows on 25 events, including seven published-article
destinations. Every row has a public, protected, or research-needed
disposition. Working-document locators, meeting-access paths, guest identities,
comments, participant profiles, contact details, and private account context
remain outside the repository. Posted links are source routes, not automatic
corroboration.

The hill climb added a full-population intake record, sixteen source records,
four claims, one inquiry, four publication decisions, a source-backed proof,
two machine-readable ledgers, human-readable archive guidance, anti-claims, and
six negative tests. New Yorker and Baffler campaign sources were promoted from
index-only metadata after close reading; Village Voice town-hall reporting and
Gothamist Commercial Rent Stabilization reporting entered as bounded public
sources.

The Fair Rent / NYC Artist Coalition case study now selects one concise claim:
Jamie helped establish and produce the recurring participation system that
connected cultural-space meetings, practical support, public hearings, and
campaign action. The public copy preserves collective credit and does not assign
him every event page, facilitation decision, or policy outcome.

The first recursive launch run scored **95/100** because the new public proof
was not yet visible to the lifecycle evaluator's modular coverage scan. Adding
the event module to that scan restored **100/100** with every automated hard
gate passing. Local browser QA at 1280px confirmed the selected claim, eleven
working citation backlinks to ten source notes, no missing fragment targets,
no horizontal overflow, and no console warnings or errors.

## Personal And WOW List Facebook Event Recursive Pass

The July 14 pass added a 20-point hard gate spanning two deliberately different
Facebook event surfaces. Two terminal traversals of Jamie's personal events
surface returned the exact same 502 event IDs. The archive retains aggregate
accounting only: 20 cards displayed Jamie as host, 482 displayed another host,
and 295 distinct displayed host labels appeared. Association remains explicitly
different from attendance, endorsement, participation, production, authorship,
and professional significance.

A separate host control displayed 21 Jamie-hosted past-event slots. Twenty
pages were recovered and close-read; one historical slot remains unresolved.
The recovered pages span December 2006 through February 2017 and received one
of five primary-form dispositions: seven cultural performance and production,
four recurring hospitality and care, four participatory place, travel, and
water, three networked culture and public history, and two civic learning and
making. Selected public pages add source depth around the 8th Street Tunnel,
river travel, Night Walk, Sunday Dinner, civic sign making, and public
documentary discussion while preserving collective credit.

While authenticated as the WOW List Page, the current Facebook event surface
displayed zero records. Exact Facebook event search and the personal
association control also produced zero WOW List event records; bounded Wayback
queries recovered none. The stored disposition is not recovered, not did not
exist, and says nothing about WOW List's own platform or wider event community.

The hill climb added one intake record, fourteen source records, four claims,
two inquiries, four reserve publication decisions, aggregate JSON and CSV
controls, project and proof backlinks, source and anti-claim guidance, and six
negative tests. No new visible site claim was selected. The Sunday Dinner proof
basis now includes public pages documenting the hundredth dinner, a rotating
eight-week New York City format, and a civic sign-making potluck without using
those pages to verify protected aggregate counts or attendance.

The first focused run exposed two boundary phrases that were implied but not
explicit enough for the evaluator; both were tightened. The final recursive
suite passed all 60 eval tests, all 19 citation tests, schema and public-safety
checks, route validation, TypeScript, lint, production build, and the launch
evaluator at **100/100** with every automated hard gate passing.

## KC Town Hall Phase One And Neighborhood Practice Pass

The July 15 follow-up close-read the protected 2019 KC Town Hall CCED proposal
packet and integrated Jamie's firsthand account of Phase One field delivery,
the resident survey system, initial Tired of Tires operations, and Cleveland
Ave Unify to Beautify design support. The packet remains outside the repository
because it mixes public-safe project evidence with banking, credit, contact,
property, and private financing details.

Four new reserve claims keep the evidence layers distinct. The packet names
Jamie founder and project manager, identifies the multidisciplinary team,
reproduces the 4-by-6 survey, documents 2018 cold-shell progress, and states
planned 2019 completion. Jamie's firsthand source supplies the day-to-day
general-contractor function and actual 2019 completion. The record does not
convert that function into licensure or a formal contractual title and does not
absorb specialist or collective credit.

The neighborhood practice is modeled separately from the building project.
Jamie's initial Tired of Tires operating role is joined to the public recurring-
program record without assigning him every later pickup or converting 99 posts
into 99 events. Cleveland Avenue remains a bounded firsthand research lead;
Pastor Lee retains credit for the corridor concept, and any claim about capital-
allocation influence remains open pending proposition-level public records.

A new 20-point hard gate requires protected-source handling, completion and
title boundaries, survey limits, operator and scale boundaries, Pastor Lee's
credit, four open research inquiries, and reserve publication decisions. It
fails on private-path or contact leakage, licensure inflation, sole credit,
capital causality, 99-pickup inflation, or silent site projection. Four new
negative tests bring the deterministic eval suite to **100 passing tests**; the
launch evaluator remains **100/100** with all automated hard gates passing.

## NTER CHNG Protected Artifact Pass

The July 15 pass close-read two contemporaneous-origin Google Docs supplied by
Jamie. An April 2011 America: Now and Here installer plan adds protected
evidence of the intended production system across permissions, software queue
behavior, hosting, display hardware, architectural fabrication, wiring,
networking, and gallery tuning. A second project-text document preserves
shared Drew Bolton, Jamie Burkart, and Garrett Fuselier credit and describes
the interaction as transforming private one-to-one texting into public
many-to-many exchange.

The underlying links and raw documents remain outside the public repository.
One contains phone numbers and participant messages; both were modified in
July 2026, so Drive creation dates establish contemporaneous origin without
making the current text an immutable 2011 snapshot. The installer is a plan and
task inventory, not proof of completion or individual task ownership. The
project text may preserve press language but does not establish recovery of the
final linked press-release PDF.

The hill climb added two protected sources, one bounded reserve claim, one
reserve publication decision, updated project and intake records, and two
negative evals. The hard gate now rejects raw Drive links, public promotion of
protected sources, plan-to-completion inflation, immutable-document inflation,
sole credit, and silent site projection. The deterministic suite passes all
**102 tests**; schema, citation, and public-safety checks pass; and the launch
evaluator remains **100/100** with every automated hard gate passing.

## WOW List, Sunday Dinner, And Call Script Proof-Debt Pass

The July 15 pass treated three long-running portfolio assertions as separate
evidence problems rather than one general request for stronger numbers. Each
now has a public-safe aggregate ledger, a close-reading intake, source and claim
records, explicit anti-claims, a reserve publication decision, and its own
20-point hard gate.

The WOW List gate verifies the final unique July 2017 database snapshot while
keeping raw people and event rows outside the repository. The bounded result is
1,846 users, 16,142 posts/events, 23,864 tags/lists, 28,837 tag follows, 20,927
stars, and 15,915 Google Calendar event records. It also verifies 35 city/region
labels with at least 50 geocoded posts/events, but rejects translations of that
threshold into 35 official chapters, current communities, distinct organizer
groups, or complete global coverage.

The Sunday Dinner gate verifies the protected workbook as a substantial event
operations record without publishing guest data. It contains 345 event-specific
columns spanning January 2012 through March 2021, with positive cached RSVP
marks in 340 columns. The gate rejects treating spreadsheet columns as unique
events, people, attendance, in-person dinners, or proof of the separate 20-plus
artist claim; numbering gaps and duplicates remain visible rather than silently
normalized.

The Call Script gate records a bounded formation lineage: Jamie established the
Call Script participation surface; a November 2016 WOW List post routed readers
to popular.vote; the January 27, 2017 post-Ghost Ship DCLA event named Call
Script and NYC Artist Coalition among its hosts; and its discussion linked a
February 6 general meeting while inviting participants to shape what the
coalition should work on. This supports facilitation and continuity, not sole-
founder credit, a complete founding record, a single-cause origin story, or the
conversion of 445 Facebook responses into attendance.

The first focused run failed four checks because important boundaries were only
implied: one legacy WOW List guardrail, two Sunday Dinner semantic/privacy
anchors, and one exact formation-lineage statement. The hill climb strengthened
the records and narrowed the privacy scan to the protected source bundle without
weakening any criterion. Twelve new adversarial tests bring the deterministic
suite to **114 passing tests**. Citation, knowledge-bank, and public-safety
checks pass, and the launch evaluator remains **100/100** with the three new
hard gates and every prior automated hard gate passing.

The complete `npm run check` gate also passes: citation registry validation,
19 citation tests, 114 deterministic eval tests, TypeScript, lint, the
production build and standalone asset copy, knowledge-bank integrity,
public-safety scanning, route validation, and launch readiness.

## Portfolio Blind-Spot Recursive Pass

The July 15 follow-up converted ten interpretive blind spots plus integration
governance into eleven independent hard gates. They cover target-role
specificity, independent comprehension, individual contribution provenance,
outcome chains, technical depth, collaboration maps, visual proof,
longitudinal synthesis, application cadence, agency language, and the boundary
between branch-local evidence and merged or deployed reality.

The first run after adding the executable gates scored **76/100**. Every prior
gate passed; all eleven new gates failed because no structured register or
operating protocol existed. This established a real baseline rather than
backfilling a success narrative.

The hill climb added a public-safe JSON control with eleven owned risks, five-
project contribution, outcome, collaboration, and visual matrices, a five-
system technical queue, a market-test control, an independent-holdout control,
a bounded longitudinal hypothesis, a 90-minute application timebox, an agency-
language contract, and integration governance. Each entry has at least three
evidence requirements, an anti-gaming rule, a stop rule, a next action, a
linked manual gate, `required-not-run` human status, and empty completion
evidence.

The second run reached **93/100**. It exposed two missing source-coverage
statements and one evaluator false positive that treated the explicit boundary
`not sole causality` as a causal assertion. The source-coverage narrative was
strengthened, and the detector was narrowed to asserted causal language without
weakening the prohibition.

The final automated run returned to **100/100** with all eleven new and all
prior hard gates passing. Twelve adversarial tests ensure that the system fails
on fictional role evidence, coached or authoring-agent holdouts, silently
completed contribution corroboration, causal inflation, falsely complete
technical evidence, assumed collaborator permission, invented visual
clearance, silent longitudinal promotion, archive volume as job-search outcome,
erased collective boundaries, and branch-to-production conflation. The focused
deterministic suite now passes **126 tests**.

No human result was invented to achieve the score. Fifteen manual gates remain
explicit, including five real-job scorecards, three unfamiliar reviewer
holdouts, collaborator and technical review, visual rights and consent,
application-cadence evidence, branch-family ownership, exact-SHA approval, and
postdeploy verification. No new public-site copy was selected in this pass.

The complete `npm run check` gate passes with 19 citation tests, 126
deterministic eval tests, TypeScript, lint, the production build, standalone
assets, knowledge-bank integrity, public safety, route validation, and launch
readiness.

## Margaret Morse And Warren Sack Lens Pass

The July 15 follow-up added two independent 18-point hard gates grounded in a
protected, unofficial UCSC narrative-evaluation copy and a protected 2014
recommendation screenshot. The records remain source context; the executable
lenses are AI-authored editorial controls, not present-day professor opinions,
endorsements, testimonials, or professor-authored criteria.

The Margaret Morse lens tests whether the portfolio system preserves
embodiment, attention, experimentation, hospitality, atmosphere, media
archaeology, participation, memory, place, and continuity across artistic,
civic, technical, and social practice. The Warren Sack lens tests whether a
reviewer can trace recursive relations, implementation, interface or embodied
interaction, multimodal documentation, use context, dialogue, and collective
authorship rather than receiving a technology list or engagement totals.

The first executable run scored **96/100**. Every prior gate passed; both new
hard gates failed because the bounded register and protocols did not yet exist.
After adding the register, source note, projection rules, and knowledge-bank
context, a second 96/100 run exposed one wording mismatch, two evidence checks
aimed at the wrong public file, and a faulty grade detector that matched normal
hyphenated prose. The evaluator was corrected to test the intended public
surfaces and protected concepts without weakening the source boundary.

The final focused run reached **100/100** with both new and every prior hard
gate passing. Seven adversarial tests reject present-endorsement and professor-
authorship inflation, auto-projection, utility-only scoring, broken practice-
domain continuity, erased embodied signals, historical-to-current skill
inflation, engagement totals as sufficient social-system evidence, promoted
structural-equivalence wording, lost implementation or collective credit,
private locators, and silent public professor copy. The deterministic suite now
passes **133 tests**.

No raw evaluation, grade, student identifier, private correspondence, contact
detail, private locator, or protected screenshot entered the repository. No
professor material or new creative-practice claim was added to the public site.
The independent `embodied-practice-editorial-review` and
`recursive-social-systems-editorial-review` remain `manual-required` and
unrun.

## Kansas City Star River-Raft Evidence Pass

The July 16 pass close-read a privately supplied two-page Kansas City Star
report from November 15, 2007. The source entered the public-safe knowledge bank
as metadata, bounded paraphrase, proposition-level support, explicit
non-affordances, and a protected locator ID. The PDF, article body, newspaper
photographs, reporter contact details, and private source location did not enter
the repository.

The first executable run scored **98/100**. Every prior hard gate passed; the
new `kc-star-river-raft-evidence` gate failed because its complete intake,
claim, source, inquiry, publication, coverage, approval, anti-claim, and change-
record lifecycle did not yet exist.

The hill climb added that lifecycle and moved the exact-route inquiry from
`open` to `partially-recovered`. The report now supports a July 21 West Bottoms
departure, the three-person crew then traveling, discarded-material
construction, bicycle-linked paddlewheel propulsion, progress beyond 1,000
miles, a 51-day Vicksburg interruption, and the participatory river-and-
community purpose. The complete route, complete participant population, final
duration, and final endpoint remain open because the report was published
before the voyage ended.

Five adversarial tests reject endpoint and roster inflation, silent public-site
projection, protected-PDF publication, weakened source custody, and private-
locator leakage. The deterministic suite now passes **138 tests**. The final
launch evaluation reaches **100/100**, with the new gate and every prior hard
gate passing.

The first complete-check run then exposed one stale citation-test population
constant: intake had correctly grown by one, while the no-silent-loss test still
expected the previous total. The control was advanced and given a direct
assertion for `LEAD-RIVER-RAFT-KC-STAR-2007`; the complete check rerun passed.

No new website or resume copy was selected. The source remains reserve depth,
and `kc-star-river-raft-media-rights-review` remains a required, unrun human
gate. The complete `npm run check` gate passes with citation validation and 19
citation tests, 138 deterministic eval tests, TypeScript, lint, the production
build, standalone assets, knowledge-bank integrity, public safety, route
validation, and launch readiness.
