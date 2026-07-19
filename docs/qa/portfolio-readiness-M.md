# Portfolio Readiness Evals M

This layer operationalizes ten portfolio blind spots without treating automated
checks as a substitute for factual review, collaborator judgment, accessibility
testing, or hiring-market feedback.

Run:

```sh
npm run check:portfolio-readiness
```

The command checks the repository controls for all ten dimensions. A passing
control means the risk has a truthful, reviewable treatment. It does not mean an
unperformed human review occurred or an uncleared visual became publishable.

## 1. External human validation

Use an unbriefed first pass. Send the staging URL without explaining the desired
answer. Record the reader's words before discussing intent.

| Reviewer lens | Status | Required question |
| --- | --- | --- |
| Job-search / referral | Not yet recorded | What role would you refer Jamie for? |
| Public-safety / collaborator | Not yet recorded | Did anything feel too private, unfairly credited, or overclaimed? |
| Design / accessibility | Not yet recorded | Does the site feel legible and distinct, and can you complete the primary paths? |

No result is recorded until a real reviewer has seen the reviewed commit. Do
not record an AI role-play, Codex judgment, or Jamie's predicted answer as an
external human result.

For each completed review, record only public-safe metadata: review date,
reviewed commit, reviewer lens, first-pass answer, repeated friction, severity,
and disposition. Keep private correspondence and personal details outside git.

## 2. Outcome and adoption proof

Every case study must separately expose:

- what was unclear;
- what became usable;
- what Jamie did;
- outcome or evidence;
- transferable proof.

Outcome wording must distinguish a delivered output, observed use, documented
institutional response, and causal inference. Unknown impact stays unknown.

## 3. Reader compression

Role, dates, context, role fit, and the usable result must appear before the
reader reaches archival detail. Case studies may contain deep evidence, but the
first screen and heading sequence must answer who, what, why, and what changed.

Human review should measure time to answer the referral question and identify
sentences readers skip. Revise recurring friction, not isolated taste.

## 4. Visual proof

The visual register covers every public project. Artifact descriptions are not
visual evidence. A photograph, screenshot, document image, or diagram may move
onto the site only after attribution, rights, consent, visible text, privacy,
and contextual accuracy are reviewed.

Visual refinement is P2 unless the absence makes a claim unintelligible. A
rights-safe diagram can be preferable to a photograph containing people or
private operational context.

## 5. Leadership scale

The delivery register records coordination, constraints, continuity, and a
scale boundary for every project. Exact team counts, budgets, decision authority,
and reporting relationships must not be inferred from a long archive or a broad
collaborator list. Add precise scale only through a defensible claim lifecycle.

## 6. Currentness

The Technical Operations surface must show current and 2026 practice alongside
historical depth. Current evidence includes coalition operating planning,
source-backed team-memory development, and AI-evaluation professional
development. It must not imply production SaaS, client deployment, or instructor
status.

## 7. Audience-specific conversion

Use existing routes before adding new public pages:

| Priority audience | Start | Supporting proof | Action |
| --- | --- | --- | --- |
| OTI / technical operations | `/work/technical-operations` | HJE, CallNYC, KC Town Hall, FairRentNYC | `/resume`, then `/contact` |
| Civic and public-interest implementation | `/work` | FairRentNYC, CallNYC, KC Town Hall | `/contact` |
| Knowledge systems / AI operations | `/lab/source-backed-team-memory` | Technical Operations and FairRentNYC | `/resume`, then `/contact` |
| Referrer / hiring generalist | `/` | Featured work and role-focused proof | `/resume`, then `/contact` |

Tailor application messages and selected links to the audience. Do not add
audience-specific landing pages until external review shows a repeated routing
failure.

## 8. Collective accountability

Credits, contribution language, and protected boundaries must remain visible in
collective work. Consequential changes to collaborator roles, shared outcomes,
or sensitive civic history should receive collaborator review when feasible.

No AI role-play counts as collaborator approval. No missing reply counts as
consent. A review request may remain open while bounded, already public, and
fairly attributed material is shared.

## 9. Release enforcement

`npm run check` is the local and pull-request gate. It includes citation,
knowledge-bank, lifecycle, Chad-lens, portfolio-readiness, public-safety, route,
type, lint, and build checks. Staging and production preflights remain separate
because robots and canonical-host policy differ.

Promote the reviewed commit. Do not rebuild a different content commit for
production after review.

## 10. Application-ready stopping rule

Applications may proceed when the exact commit being shared passes
`npm run check`, has no P0 blocker, serves a working resume and contact path, and
contains no known public-safety violation. External reviews may continue in
parallel when their status is truthfully recorded.

P2 visual refinement, broader archive recovery, additional source discovery,
and unrecorded human reviews do not block applications. Reopen the public
composition only for a new P0, a repeated P1 finding, a factual correction, or
a specific application need. This is the stopping rule that keeps the knowledge
bank alive without making employment wait for archival completeness.

## Hill-Climb Rule

1. Run the automated suite.
2. Fix failed controls without inventing evidence or approval.
3. Run a bounded human review when the finding requires human judgment.
4. Change the site only for a factual correction, P0, or repeated P1 finding.
5. Rerun the full suite and record the reviewed commit.

The score is computed at runtime. Do not hand-edit a passing total into this
document.
