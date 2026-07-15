# Launch Readiness Evals

These evals turn the publication intentions into a recursive protocol an LLM
agent can execute without converting judgment into false certainty.

## Objective

Prepare `jamieburk.art` to support job applications and trusted professional
sharing by making Jamie's value legible, claims defensible, paths usable, and
production operations reversible.

The canonical positioning sentence is:

> I turn emerging work into usable systems for complex public-facing teams.

## Recursive protocol

1. Start from a clean branch based on the requested upstream commit.
2. Run `npm run evals:launch` and retain the baseline score and failures.
3. Inspect each failed criterion against its named evidence and source files.
4. Make the smallest coherent repair that improves the criterion without
   weakening another gate.
5. Run the focused test, then rerun the full evaluator.
6. Stop when automated score is at least 94, all hard gates pass, no
   anti-gaming rule is violated, and remaining manual gates are explicit.
7. Run staging and production preflights. Production deployment still requires
   Jamie's approval of the exact reviewed SHA.

## Automated criteria

| Criterion | Weight | Hard gate | Passing condition |
| --- | ---: | :---: | --- |
| Message alignment | 14 | No | Primary public surfaces use the emerging-work positioning consistently. |
| CallNYC external validation | 14 | Yes | The five-member verified minimum is canonical, cited, projected, and bounded against official-endorsement claims. |
| Responsive contracts | 14 | Yes | Known narrow-screen failures are repaired at their source without global overflow hiding. |
| Resume application artifact | 14 | Yes | The approved PDF exists, is readable, remains two pages, and contains exactly one phone number. |
| Application paths | 10 | Yes | Resume, contact, LinkedIn, and GitHub destinations remain explicit and approved. |
| Production cutover | 10 | Yes | The runbook names candidate, verification, and rollback commands. |
| Release gate wiring | 12 | Yes | Citation, knowledge-bank, public-safety, route, eval-test, and prelaunch commands exist. |
| Chad-lens legibility | 16 | Yes | Jamie is the actor; entry condition, purpose, usable outputs, bounded proof, and next actions are explicit. |
| Knowledge-bank lifecycle | 18 | Yes | Intake has no silent loss; evidence maturity, safety, and editorial selection remain separate; every public proof has source-coverage status. |
| Target-role specificity | 16 | Yes | The system requires five dated real job descriptions, rejects archetypes as market evidence, and keeps the unrun market test explicit. |
| Independent comprehension holdout | 16 | Yes | The protocol requires three unfamiliar, unbriefed reviewers and prohibits authoring agents from counting as independent evidence. |
| Individual contribution provenance | 18 | Yes | Five priority projects separately track project evidence, Jamie-role evidence, external corroboration, permissions, and next proof. |
| Outcome-chain evidence | 18 | Yes | Five leading projects keep output, observed outcome, attribution boundary, and open outcome distinct. |
| Technical implementation depth | 18 | Yes | Five systems track architecture-level artifact and decision evidence without treating source lists or counts as implementation accounts. |
| Collaboration role mapping | 18 | Yes | Five collective projects track shared credit, Jamie's role, collaborator confirmation, and publication permission without assuming consent. |
| Visual proof readiness | 16 | Yes | Five leading case studies track candidate, evidence value, rights, consent, and caption status without inventing a cleared package. |
| Longitudinal thesis boundary | 16 | Yes | The cross-project thesis remains on hold pending audience need, corroboration, and independent anti-flattening review. |
| Application execution cadence | 16 | Yes | A 90-minute opportunity timebox returns noncritical proof debt to the inquiry queue and effort to applications, outreach, or conversations. |
| Agency without inflation | 16 | Yes | Direct contribution verbs remain visible while collective-credit, authority, title, and causality boundaries stay intact. |
| Integration governance | 16 | Yes | Branch-local scores remain distinct from PR ownership, supersession, exact-SHA approval, deployment, and postdeploy verification. |
| NYC Artist Coalition government value | 20 | Yes | DCLA testimony, later named recognition, coalition recommendations, Council testimony, Espinal's policy sequence, and enacted-law functions remain linked while institutional interpretation stays distinct from motive, authorship, and causality. |
| Portfolio evidence expansion | 18 | Yes | Ten new, non-orphan public sources mature bounded claims, reduce proof debt, and selectively strengthen cited portfolio surfaces. |
| KC Town Hall Council allocation and lifecycle | 18 | Yes | Board recommendation, Council appropriation, and resolution are primary-sourced; Jamie's involvement is historical; allocation remains distinct from agreement execution, receipt, and disbursement; private transition context stays omitted. |
| Campaign press corpus | 18 | Yes | All four campaign press indexes retain complete membership, deduplicate to canonical articles, and keep unreviewed sources out of claim support. |
| Project social archive production | 18 | Yes | Verified account identities, authenticated recovery floors, direct engagement definitions, collective authorship boundaries, and selected public projections remain linked and privacy-safe. |
| CallNYC full-population archive | 20 | Yes | All 110 observed profile-count slots reconcile to 107 item-level recoveries and three explicit unresolved slots; post types, stakeholder patterns, issue links, external URLs, claims, and boundaries recompute from the ledger. |
| NYC Artist Coalition full-population archive | 20 | Yes | All 5,124 current profile-count slots reconcile to 3,367 item-level recoveries and 1,757 unresolved slots; themes, links, inbound engagement floors, Council-member interactions, claims, and collective-authorship boundaries recompute from the ledgers. |
| NYC Artist Coalition Facebook event archive | 20 | Yes | All 34 current past-event control slots reconcile to 33 recovered records and one unresolved slot; recurring-meeting, venue, response, posted-link, source-routing, role, collective-credit, and privacy boundaries recompute from the ledgers. |
| Personal and WOW List Facebook event archive | 20 | Yes | Both authenticated personal traversals reconcile to the same 502 association IDs; all 21 hosted-event slots reconcile as 20 recovered and one unresolved; WOW List's current zero display remains distinct from historical nonexistence; privacy, attribution, response-signal, and reserve-publication boundaries remain enforced. |
| Personal social full-population archive | 20 | Yes | All 434 records in the current `@urbanhermit` live-profile control reconcile as 338 authored posts, 15 authored replies, and 81 reposts; aggregate years, themes, links, inbound stakeholder groups, and interaction contexts recompute without exposing the personal timeline or misassigning repost reactions. |
| WOWList full-population archive | 20 | Yes | All 38 current-profile items reconcile at item level; account posts, support replies, reposts, themes, links, claims, and collective-authorship boundaries recompute from the ledger. |
| KC Town Hall full-population archive | 20 | Yes | All 183 observed profile-count slots reconcile to 181 item-level recoveries and two explicit unresolved slots; account relationships, themes, links, reactions, stakeholder patterns, shared authorship, later stewardship, and selected public projections recompute from the ledger. |

The executable implementation is `scripts/lib/launch-readiness-evals.mjs`.
Generated reports are written to `reports/generated/` and are ignored by Git.

## Manual criteria

- **Hiring-manager 30-second test:** the reviewer can state Jamie's role,
  differentiated value, three supporting proofs, and the next action.
- **Resume visual balance:** rendered pages have no clipping or overlap and no
  role begins with an orphaned continuation bullet. Replacing the approved PDF
  requires Jamie's approval.
- **Repository hygiene:** open PRs targeting `develop` are active and owned, or
  closed/labeled as superseded.
- **Postdeploy verification:** production health, indexing, sitemap,
  canonical-host behavior, key routes, and resume delivery pass after the
  explicitly approved deploy.
- **Five-real-role fit review:** five dated real job descriptions receive blind
  scorecards; archetypes do not count.
- **Independent hiring holdout:** three unfamiliar, unbriefed reviewers recover
  Jamie's role, differentiated value, three proofs, and next action.
- **Contribution, outcome, technical, and collaboration reviews:** project
  existence, Jamie's role, observed outcomes, implementation evidence,
  collaborator confirmation, and permissions are reviewed separately.
- **Visual and longitudinal editorial reviews:** rights and consent are cleared
  before visual use, and the cross-project thesis is tested against flattening.
- **Application cadence and agency-language reviews:** archival work returns to
  outward action, and direct agency remains bounded by evidence and collective
  credit.
- **Branch/PR/production integration review:** owners, supersession, exact SHA,
  deployment approval, and postdeploy results are recorded.

## Anti-gaming rules

- Do not delete claims, evidence, routes, or useful content merely to reduce
  failures.
- Do not conceal overflow globally instead of repairing the responsible
  element.
- Do not strengthen public wording before updating canonical evidence,
  boundaries, and prohibited formulations.
- Do not publish private evidence to satisfy a citation check.
- Do not treat an automated score as approval to deploy production.
- Do not reduce reader burden by erasing Jamie as actor, omitting the purpose,
  or replacing concrete outputs with generic systems language.
- Do not satisfy no-silent-loss by auto-publishing intake, treating memories as
  corroboration, or moving every mature reserve claim onto the current site.
- Do not satisfy evidence expansion with duplicate, orphaned,
  self-authored-only, or boundary-free source records.
- Do not use fictional role archetypes as real market evidence or let an
  authoring agent count as an independent reviewer.
- Do not inherit individual contribution from collective project evidence,
  convert sequence or outputs into causality, or treat source lists and counts
  as technical implementation depth.
- Do not erase collaborators, assume quotation or image permission, invent
  rights or consent clearance, flatten distinct projects, count archive volume
  as a job-search outcome, or call a branch-local score production approval.
- Do not say Finkelpearl's February testimony named NYC Artist Coalition,
  convert institutional value into an official's private motive, infer bill
  authorship from functional alignment, or turn participation and public credit
  into sole legislative causality.
- Do not equate a Council appropriation or funding-negotiation authorization
  with an executed agreement, receipt, disbursement, project completion, or
  current status.
- Do not encode private personal context to explain a professional transition or
  silently convert an uncorroborated stewardship memory into a selected claim.
- Do not satisfy press-corpus completeness by dropping cross-campaign
  duplicates, treating index membership as claim support, or marking
  unreviewed articles as close-read.
- Do not treat an authenticated visible social timeline as a complete export,
  count one-way tags as reciprocal engagement, attribute every team post to
  Jamie, expose authentication material, or convert individual-account
  interaction into endorsement, funding support, or measured impact.
- Do not erase unresolved social-profile slots, assign later KC Town Hall
  operations to Jamie, or promote project-reported Tired of Tires outcomes as
  independently audited results.
- Do not satisfy CallNYC population completeness by erasing unresolved slots,
  inventing missing status IDs, trusting stored aggregates without item-level
  recomputation, converting Council tags into responses, converting issue rows
  into unique people or outcomes, promoting unreconstructed historical
  metrics, or treating announced API behavior as independently recovered.
- Do not satisfy personal-account completeness by calling the current 434-post
  control every post Jamie ever made, publishing raw personal records, treating
  search as a platform export, promoting ordinary conversation as professional
  evidence, assigning repost statements or reactions to Jamie, or converting
  link and mention counts into reach, endorsement, causality, or impact.
- Do not satisfy Facebook event completeness by erasing the unresolved control
  slot, treating response displays as attendance or unique people, summing
  responses, assigning every event page to Jamie, treating posted links as
  automatic corroboration, publishing participant or access data, or converting
  an event chronology into sole policy causality.
- Do not convert a personal Facebook event association into attendance,
  endorsement, authorship, production, or professional proof; expose the
  record-level relationship graph; erase the unresolved hosted-event slot;
  sum unstable response displays; infer that WOW List never had an event from
  a current zero display; or silently promote reserve event claims onto the
  public site.
