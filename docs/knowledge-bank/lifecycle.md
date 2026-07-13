# Knowledge Bank lifecycle

The Knowledge Bank is a place and a process. It retains public-safe fragments,
sources, memories, claim hypotheses, research questions, mature claims,
anti-claims, and projection decisions without treating them as interchangeable.

Its job is to preserve depth while making every promotion in confidence
reviewable.

## Lifecycle

```text
fragment or lead
  -> intake record
  -> source object or protected locator
  -> research inquiry
  -> evidence relationship
  -> bounded claim
  -> surface-specific projection decision
  -> page citation when selected
  -> correction, further research, or photo feedback
```

Nothing needs to reach the public site to remain valuable. A confirmed claim
may stay bank-only because the current public argument does not need it. A
memory may remain a hypothesis while source discovery continues. A private
artifact may be represented by an opaque locator without entering this public
repository.

## Intake

Every public-safe fragment receives a stable intake record before it can be
lost. Intake records store:

- what kind of thing arrived;
- a public-safe summary;
- privacy posture;
- maturation state;
- linked sources, claims, and research inquiries;
- projection intent;
- the next action needed.

Do not commit raw private memories, correspondence, transcripts, photographs,
or local paths. Store a bounded public-safe summary and, when necessary, an
opaque protected locator whose underlying material remains outside the repo.

## Source decomposition

A URL is not a claim. Close-read it into a source record that states:

- authorship, organization, date, and preservation state;
- what the source can generally support;
- what it cannot establish;
- whether it is independent reporting, an institutional record, a government
  record, a project artifact, or another evidence class.

Self-published project sources are useful for intent, chronology, and the
project's own account. They are not automatically independent proof of impact
or causality.

## Claim maturation

Claims mature through these states:

- `inference`: a useful hypothesis with an explicit research path;
- `use-with-care`: support exists, but the claim requires visible limits;
- `confirmed-with-boundary`: the core proposition is supported and its limits
  are part of the record;
- `confirmed`: strong direct support at the stated precision;
- `not-recovered`: a bounded search result, never proof of nonexistence;
- `disallowed`: wording the bank has explicitly rejected.

Each claim stores evidence relationships, boundaries, anti-claims, and review
history. Collective outcomes remain collective. Direct work should not be
hidden when it is supported.

## Projection

Claim maturity and publication selection are separate decisions.

A projection can be:

- `active`: selected for a named public surface;
- `hold`: mature or promising bank material not currently composed into the
  site;
- `deprecated`: once used, now replaced;
- `disallowed`: unsafe or inaccurate wording.

The public site is a composed argument, not a dump of everything known. Chad's
lens governs active public language: minimize reader burden, make Jamie's
bounded action visible, say what became usable and for whom, translate specialist
language, and preserve collective credit.

## Citation contract

Consequential public claims should resolve to Knowledge Bank claim and source
IDs. Citation markers may remain visually quiet, but the build must enforce the
relationship among public wording, source support, boundary, and page plan.

An active cited projection needs renderable public evidence. Bank-only claims
can link sources without entering a page citation plan.

## Photo feedback

Photo review is bidirectional:

1. Claims and inquiries provide photo editors with dates, places, projects,
   artifacts, people, and visual questions.
2. Photographs may corroborate visible settings, objects, text, and presence.
3. A surprising image can create a new intake record or research inquiry.
4. It cannot become proof of role, authorship, leadership, outcome, identity,
   rights, or consent without separate review.
5. Asset publication approval remains image- and placement-specific.

Retrieval metadata and editor-field membership are leads, not publication
approval.

## Recursive eval

The lifecycle eval tests capture completeness, source precision, claim/evidence
separation, status calibration, collective credit, projection restraint,
citational integrity, privacy, and photo feedback.

Agents revise the smallest necessary span. They stop only after independent
evidence and editorial judges pass every hard gate, meet the score threshold,
and repeat the pass without regression. If the threshold is not reached, the
best bounded result remains in the bank with unresolved criteria.

Run:

```bash
npm run evals:knowledge-bank-lifecycle
```
