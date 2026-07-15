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

The structured intake records currently preserve thirteen threads surfaced on
July 12-14, 2026:

- waterways, communal space, and participatory cultural practice;
- Sunday Dinner as recurring open community infrastructure;
- NYC Artist Coalition formation and cultural-space policy campaigns;
- the press and reference architecture across four NYC Artist Coalition
  campaign sites;
- NYC Council member engagement with CallNYC on Twitter;
- the KC Town Hall CCED recommendation, 2019 Council acceptance and
  appropriation, and 2024 reappropriation of the unused allocation.
- Jamie's firsthand account of transitioning KC Town Hall stewardship to a
  mission-aligned organization when his involvement concluded.
- interactive media, sound, and public-memory practice across NTER CHNG, a
  Max/MSP audio experiment, Matmos research, and Claudette's Theatre On Wheels;
- Commercial Rent Stabilization operating plans, shared minutes, and
  privacy-preserving public-data proposals; and
- AI evals completion, bounded source-backed sprint design, and a context-only
  cross-archive job-hunt map;
- 196 Artists Residency selection, onboarding, space configuration, access,
  and reusable handoff operations;
- longitudinal HUD-USPS vacancy-source stewardship and mixed-format archive
  automation; and
- Google Drive project-workspace topology as a bounded research map for future
  handoff and collaborator evidence.

The waterways and Sunday Dinner threads have reached `claim-candidate`. The NYC
Artist Coalition and campaign-press threads remain `researching`; the press
indexes are fully accessioned, while their 45 distinct article bodies remain a
bounded close-reading queue. The CallNYC engagement thread remains `captured`
until a complete, authenticated or archived engagement corpus can support
defensible metrics. The KC Town Hall thread is `researching`: public records
establish recommendation, Council acceptance, appropriation, later withdrawal,
and reappropriation, while agreement execution, any disbursement, and Jamie's
specific contribution remain separate questions. The stewardship transition is
`captured` as a distinct memory lead pending a public-safe handoff record or
receiving-organization confirmation. None is approved for direct website
projection. The three July 14 archive-production threads have reached
`claim-candidate` for their supported propositions while retaining protected
source locators and explicit non-claims. The Google Drive pass adds two more
`claim-candidate` threads and one `researching` thread; all three remain outside
the website and generated public registry.
