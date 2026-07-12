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

## Intake Procedure

1. **Safety check:** Decide whether the fragment itself is safe in a public
   repository. If not, keep it private and write only a bounded summary.
2. **Capture:** Add an `intakeItems` record in
   `apps/www/src/data/knowledge-bank/records.ts`.
3. **Source registration:** Add public sources to `sources`. State both what
   each source supports and what it does not establish.
4. **Decomposition:** Separate project existence, Jamie's role, actions,
   outputs, outcomes, scale, collaborators, and causality. A source may support
   only some of them.
5. **Research:** Add concrete questions. Record `not recovered` separately from
   `did not exist`.
6. **Claim formation:** Draft candidate wording with Chad's lens: Jamie as an
   actor, a concrete action, a useful end, a named output, and no inflated
   ownership.
7. **Governance:** Create or strengthen a governed claim, attach evidence and
   anti-claims, and obtain the required review.
8. **Composition:** Decide separately whether the claim belongs on a particular
   website surface. Most bank depth should remain off the main site.
9. **Validation:** Run `npm run check:citations`, `npm run test:citations`,
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

The initial structured intake records preserve three threads surfaced on July
12, 2026:

- waterways, communal space, and participatory cultural practice;
- NYC Artist Coalition formation and cultural-space policy campaigns;
- NYC Council member engagement with CallNYC on Twitter.

The first has reached `claim-candidate`. The second remains `researching`. The
third remains `captured` until a complete, authenticated or archived engagement
corpus can support defensible metrics. None is approved for direct website
projection.
