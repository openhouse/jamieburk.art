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
                                      ^                 |
                                      |---- media lead -|
```

1. **Capture generously.** A URL, memory, metric, document, collaborator note,
   or visual artifact becomes a stable lead with public-safe provenance, known
   project and entity associations when available, a visibility boundary, and
   a next action. Unknown project association remains explicitly `unassigned`.
   The append-only receipt preserves only immutable capture facts; triage state,
   source associations, candidate links, and research tasks may mature later.
2. **Preserve privately held material by reference.** Raw archives, private
   correspondence, and protected media remain outside Git. The repo stores only
   a public-safe description and an opaque locator ID.
3. **Register sources.** Public sources enter the canonical source registry.
   A source describes what it generally supports and what it does not establish.
4. **Decompose before claiming.** Each atomic observation records one useful
   proposition or boundary, its source locator, certainty, evidence role, and
   candidate-claim relationships.
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
   Chad Lens question. The portfolio remains an edited public argument, not a
   database dump.
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
npm run report:knowledge-lifecycle
npm run query:knowledge-lifecycle -- --brief BRIEF-CALLNYC-APPLICATION
npm run query:knowledge-lifecycle -- --entity ENT-JAMIE-BURKART --from-year 2016 --to-year 2016 --evidence-role direct-support
npm run query:knowledge-lifecycle -- --surface /work/callnyc --publication-safe
npm run check:knowledge-integrity
npm run evals:composite
```

A surface query without `--publication-safe` is a planning view: it includes
active decisions that name the surface even when human review is pending. The
publication-safe mode requires an exact surface and returns only candidates with
an active, human-approved `promote` or `correct` decision for that surface. Its
`publicationAuthorizations` result makes the governing decision IDs explicit.

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
selected or explicitly excluded with a reason.

## Current integration seed

The July 16, 2026 composite seed is deliberately small. It exercises the full
lifecycle with two already governed CallNYC claims: a direct event-time
correction and Jamie's independently reported development of the archived,
unofficial prototype. Both retain exact-surface approval and institutional
boundaries.

Jamie's formulation "structure grows from the material" enters as an unassigned
first-person research lead. It is retained because it may explain a recurring
method across otherwise unlike projects. It is not independent proof and cannot
appear in a publication-safe query until cross-project evidence, counterexamples,
and a separate promotion decision exist.

The larger canonical knowledge bank remains in `records.ts` and its source
modules. The lifecycle seed demonstrates the operating protocol without
duplicating the full bank into a second architecture.

## Governed-open status

`governed-open` means the system is useful for ongoing public-safe research and
intake while consequential publication and release gates remain explicit. It
does not mean every claim is publishable, every source is public, or production
has been approved. Exact proof inventories, collective-credit classes,
projection-source bindings, composition budgets, and the mosaic-privacy review
live under `docs/knowledge-bank/governance/`.

## Agent contract

- Preserve the fragment before judging its homepage value.
- Never convert Jamie's memory, source count, chronology, or an AI summary into
  independent corroboration.
- Split compound source affordances into atomic observations.
- Seek contradiction and alternative causation for consequential claims.
- Promote the strongest narrow claim the evidence supports.
- Do not project an unresolved candidate into a public-composition brief.
- Keep citations quiet in the interface but complete in the bank.
- Never publish raw private locators, records, or media through this system.
