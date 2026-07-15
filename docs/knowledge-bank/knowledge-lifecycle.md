# Knowledge lifecycle

The knowledge bank is a place and a process. It preserves useful fragments,
matures them through research, and supplies a deep but selective palette for
the public portfolio. Entry into the bank is not publication. Defensibility is
not the same as relevance to the current site.

There is no public `/proofs`, `/knowledge-bank`, or `/public-claims` route.

## The lifecycle

```text
lead -> source -> atomic observation -> candidate claim -> research task
     -> promotion decision -> canonical claim -> editorial brief -> page
     -> proof record -> approved surface manifest -> composed proof surface
                                      ^                 |
                                      |---- media lead -|
```

1. **Capture generously.** A URL, memory, metric, document, collaborator note,
   or visual artifact becomes a stable lead with public-safe provenance, a
   visibility boundary, and a next action. A lead may enter an explicit
   `unassigned` inbox before its project is known; assignment or project-stub
   creation then becomes its first triage action.
   The append-only receipt preserves only immutable capture facts; triage state,
   source associations, candidate links, and research tasks may mature later.
2. **Preserve privately held material by reference.** Raw archives, private
   correspondence, and protected media remain outside Git. The repo stores only
   a public-safe description and an opaque locator ID.
3. **Register sources.** Public sources enter the canonical source registry.
   A source describes what it generally supports and what it does not establish.
4. **Decompose before claiming.** Each atomic observation records one useful
   proposition or boundary, its source locator, certainty, evidence role, and
   candidate-claim relationships. When an observation serves multiple
   candidates, each relationship separately states what it supports, its role,
   and its limitations for that proposition.
5. **Research uncertainty.** Memories and ambitious causal claims are valuable
   leads. Research tasks state the decisive question, methods, sources,
   findings, limitations, and next actions. `Not recovered` never means
   `did not exist`.
6. **Promote explicitly.** A decision records why the strongest narrow claim is
   defensible, its threshold, reviewer, date, canonical target, allowed
   surfaces, and guardrails. `Research`, `hold`, and `reject` are successful
   outcomes when the evidence requires them.
7. **Compose for purpose.** Editorial briefs select claims for an audience and
   argument. They identify exclusions, citation posture, media needs, and the
   Chad Lens question. Human-approved proof surface manifests separately select
   the structured proof records allowed on each exact public route, including
   its audience, purpose, exclusions, and guardrails. The portfolio remains an
   edited public argument, not a database dump.
8. **Return visual discoveries to research.** Photo editors receive bounded
   prompts. A visual discovery becomes a lead or observation only after date,
   place, identity, role, rights, consent, and meaning are separately reviewed.

## Commands

Capture a public-safe lead in the append-only receipt queue:

```bash
npm run knowledge:intake -- \
  --title "A useful memory or artifact" \
  --kind memory \
  --summary "A public-safe sentence describing why it may matter." \
  --project PRJ-CALLNYC \
  --write true
```

A bare public URL can enter before source registration:

```bash
npm run knowledge:intake -- \
  --title "New source to review" \
  --kind source-url \
  --summary "Public page requiring source decomposition." \
  --project PRJ-CALLNYC \
  --url "https://example.org/source" \
  --write true
```

An uncategorized fragment can be preserved before its project is known by
omitting `--project`; the receipt records an `unassigned` project state and the
default next action requires assignment or project-stub creation.
The first retained example is Jamie's public-safe method fragment, "Structure
grows out of the material," which remains unassigned until review determines
whether it belongs to professional method, writer's voice, or a future
cross-project principle.

When the item duplicates an existing lead, repeat the command with
`--duplicate-of LEAD-ID`; the intake command rejects likely duplicates that do
not declare that relationship.

The command validates graph associations, generates a collision-resistant ID,
and appends immutable capture facts to
`docs/knowledge-bank/intake/receipts.jsonl`. Then review the receipt, add a
mutable lead to `lifecycle-records.ts`, associate sources or create a research
task, and run:

```bash
npm run check:knowledge-lifecycle
npm run check:social-archive
npm run report:knowledge-lifecycle
npm run query:knowledge-lifecycle -- --brief BRIEF-NIGHTLIFE-FUTURE
npm run query:knowledge-lifecycle -- --entity ENT-JAMIE-BURKART --from-year 2006 --to-year 2009 --evidence-role direct-support
npm run query:knowledge-lifecycle -- --audience public-interest-operations --purpose cultural-infrastructure --source-kind government-record --research-priority high
npm run query:knowledge-lifecycle -- --surface /work/callnyc --publication-safe
npm run query:knowledge-lifecycle -- --proof-surface / --publication-safe
npm run eval:knowledge-lifecycle -- --profile fast
```

A surface query without `--publication-safe` is a planning view: it includes
active decisions that name the surface even when human review is pending. The
publication-safe mode requires an exact surface and returns only candidates with
an active, human-approved `promote` or `correct` decision for that surface. Its
`publicationAuthorizations` result makes the governing decision IDs explicit.
All publication-safe query modes omit research tasks and media; those records
remain available only to internal planning queries.
For the parallel proof layer, `--proof-surface` accepts an exact public route
and returns only the records selected by that route's Jamie-approved manifest.

## Promotion thresholds

- **Promote:** the narrow proposition is supported at the stated threshold,
  uncertainty and collective credit are bounded, and a canonical claim exists.
- **Research:** the proposition matters, but a decisive source, chronology,
  definition, or independence check remains open.
- **Hold:** support may be adequate, but consent, rights, authority, audience,
  or contextual-integrity concerns prevent current use.
- **Reject or disallow:** the proposition is contradicted, misleading, unsafe,
  or not worth preserving as an active research direction.
- **Retire or correct:** later evidence changes an existing decision; the new
  decision supersedes rather than silently erases the old one.

Candidate maturity changes are recorded separately as append-only events. A
public-composition brief may use only a claim whose latest decision is human
approved for that exact surface; every claim already on the target page must be
selected or explicitly excluded with a reason. Independently of briefs, every
active canonical projection is rejected unless it resolves to current human
approval for every destination. Excluding a claim from a brief cannot bypass
that requirement. Every Ready or Careful proof used publicly must appear in an
approved exact-destination manifest. The validator inventories all rendered
routes and the downloadable resume, compares complete proof sets rather than
accepting a page-category fallback, and requires any consequential canonical
link named by a proof record on every destination that selects it.

`docs/knowledge-bank/projection-map.md` is generated from those manifests. The
lifecycle check fails if the readable map drifts from the governed records.
The public-safety gate parses the shipped resume PDF, and the visual-evidence
gate binds checked-in screenshots to the application-source digest that
produced them.

Publication-safe proof-destination retrieval is fail-closed: canonical claims
come only from the exact manifest, candidates must both target a selected claim
and hold current approval for that destination, and research tasks or media do
not enter the public palette without their own future explicit selection path.

## Current research run

The July 12, 2026 run ingested the five sources Jamie supplied plus public NYC
government records. Its completed research record promoted narrow, defensible claims about the Missouri
raft expedition, Great Accommodations, Open House, Cabaret Law advocacy and
safety education, and Talks Not Raids advocacy and MARCH transparency work.

It intentionally kept broader propositions in research: the raft's exact Gulf
endpoint; Jamie's instrumental causal role in Cabaret Law repeal, creation of
the Office of Nightlife, and the MARCH phaseout; and the scale and influence of
nightlife town halls. Each has a defined evidence threshold and next action.

The same run completed two additional feedback cases. A protected CallNYC
participant photograph produced a visible-text observation and a held candidate,
while rights, consent, identity, event title, and event time remained explicitly
unestablished. A separate correction replaced a photograph-time inference with
the direct 1-3 p.m. Civic Hall announcement and retained the correction trail.

The July 15 social-media archive run then resolved the bounded CallNYC metric
question through authenticated public-web review. It recovered 107 of 110
profile-counted content objects, recorded three explicit not-recovered slots,
audited the visible repost lists on all 41 CallNYC-authored or reply posts with
displayed repost activity, and established a lower bound of 19 distinct serving
2016 Council-member accounts. The same run inventoried the shared @NYCArtC
identity and dedicated WOW List, KC Town Hall, and KC Spaces Fund accounts.
It promoted four narrow exact-route claims while holding Jamie's account-
establishment memory and the KC Spaces Fund grantee-highlight count from the
current public composition. See the
[project social-media archival production inventory](research/2026-07-15-project-social-media-archive-production.md).

## Campaign press collections

The July 14, 2026 press-corpus run treats each campaign Press section as a
source collection with its own index source, capture method, displayed order,
expected count, completeness status, and interpretation boundary. It recovered
21 Let NYC Dance listings, seven Talks Not Raids listings, eight Save NYC
Spaces listings, and nine listings from the specified December 1, 2021 Fair
Rent NYC Wayback capture. These 45 listings resolve to 44 unique article
records because one NPR article appears in two collections. A frozen public-
safe extraction fixture preserves the captured order and is checked against
the typed collections during citation validation.

Collection provenance and article support remain distinct. A campaign's choice
to list an article does not establish Jamie's role, the article's accuracy,
source independence, or causation. Unreviewed articles remain available as
source depth; only close-read articles may produce atomic observations or
change a candidate claim. Run `npm run generate:campaign-press` after changing
the collection records and `npm run check:campaign-press` to reject drift.

## Agent contract

- Preserve the fragment before judging its homepage value.
- Never convert Jamie's memory, source count, chronology, or an AI summary into
  independent corroboration.
- Split compound source affordances into atomic observations.
- Seek contradiction and alternative causation for consequential claims.
- Promote the strongest narrow claim the evidence supports.
- Do not project an unresolved candidate into a public-composition brief.
- Do not add an active canonical destination or proof surface without exact
  human approval and the corresponding manifest or promotion decision.
- Keep citations quiet in the interface but complete in the bank.
- Treat social interaction as a dated public edge, not endorsement, adoption,
  individual authorship, or a complete lifetime census.
- Never publish raw private locators, records, or media through this system.
