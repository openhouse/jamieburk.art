---
rfc: 7
title: NYC Jobs Opportunity Monitor and Hiring Action Digest
stage: proposed
start_date: 2026-08-20
authors:
  - Jamie Burkart
  - Codex, AI-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - research-operations
  - developer-experience
  - privacy-governance
  - deployment
implementation: null
supersedes: []
superseded_by: null
---

# NYC Jobs Opportunity Monitor and Hiring Action Digest

> **Proposal boundary**
>
> This RFC is `proposed`. The pull request contains a read-only, manually
> dispatched prototype and offline evals. It does not authorize a daily
> schedule, repository-writing bot, outbound email provider, canonical
> opportunity promotion, application submission, merge, or deployment.

## Summary

Use the official NYC Open Data `NYC Jobs` feed as a machine-readable discovery
and freshness source. A proposed daily, read-only run would verify the source,
screen and score the full posting population, retain only unusually strong new
matches as provisional intake, and render a hiring-action digest. Model review
would occur only after deterministic gates. Canonical opportunity promotion,
public-material changes, email-provider activation, and application submission
would remain separate human decisions.

## Motivation

Jamie needs a repeatable path from a changing public job market to a short list
of truthful, high-value actions. The City feed exposes a source update timestamp
and structured postings, while the repository already maintains opportunity
lifecycle, reader eval, tailored resume, cover-letter, and application-material
systems. Joining these responsibly reduces repetitive search without turning a
heuristic score into an application decision.

The August 18 source snapshot also exposes two important errors to design for:
some live OTI roles were absent from the feed, and some `External` rows stated
that only current City employees or exam-list candidates could apply. Dataset
membership and labels therefore need checks rather than trust by default.

## Goals

- Detect a source refresh by comparing the official dataset ID, schema, and
  `rowsUpdatedAt` value with stored state.
- Run inexpensive eligibility checks before scoring or model calls.
- Rank all unique job IDs by person-specific fit and estimated screen survival.
- Admit only candidates meeting independent fit, secure, and composite floors.
- Keep admitted candidates in provisional intake until posting-level and named-
  reader review succeeds.
- Preserve active-application precedence for the public resume.
- Render one packet containing all active opportunities on which Jamie can act
  and the next action for each.
- Prepare an exact-recipient email adapter without storing credentials.

## Non-goals

- Submit an application, withdraw one, or change its outcome.
- Treat a score as a probability of interview or offer.
- Close an existing opportunity because it is absent from the dataset.
- Automatically publish a provisional role, alter the public resume, generate a
  canonical opportunity record, merge a branch, or deploy a site.
- Store the complete City job corpus in Git.
- Activate a schedule, third-party sender, or repository-writing bot without
  Jamie's explicit approval of that exact capability.

## Terminology

**Freshness authority**
: The official view metadata used to decide whether a new source pass is due.

**Provisional intake**
: A strong machine-selected lead awaiting factual qualification and named-reader
  review. It is in the opportunity system but is not yet canonical or public.

**Fit score**
: A heuristic measure of overlap between the posting and Jamie's maintained
  evidence.

**Secure score**
: A heuristic measure of likely screen survival. It is not a predicted
  probability and cannot resolve civil-service eligibility.

## Detailed design

### Source and freshness

The monitor reads `https://data.cityofnewyork.us/api/views/pda4-rgn4`. A newer
`rowsUpdatedAt` value triggers full resource retrieval. A changed dataset ID,
missing required field, invalid timestamp, or timestamp regression stops the
run. An unchanged timestamp permits reuse of the stored compact snapshot.

Absence is never a closing signal. Already governed opportunities continue to
use the official posting and application state as lifecycle authority.

### Cost-aware stages

1. Source identity and schema integrity.
2. External/public eligibility, deadline, annual salary ceiling of at least
   $100,000, explicit credential restrictions, and current-City-employee-only
   language.
3. Deduplication and deterministic fit/secure scoring.
4. Strong-match thresholds: composite 78, fit 75, secure 65.
5. Cached named-reader model review for new strong matches only, at no more than
   two readers per new match.
6. Human qualification and application decision.

The scoring weights are versioned code and regression-tested with positive and
negative controls. Error analysis from each real run should add tests before it
changes the evaluator.

### Persistence and scheduling

The repository holds source state, a compact current snapshot, a readable
ranking report, and a rendered digest. The prototype GitHub Actions job has
read-only repository permission and is manually dispatched. It performs a fresh
run and retains the outputs as a 14-day workflow artifact; it does not push,
open a pull request, or merge.

If accepted, a separate change may add a once-daily schedule. Repository-writing
automation would require another explicit decision because it has a different
authority and rollback surface.

### Email boundary

The prototype adapter can send plain-text mail only to `jamie@ohai.us` through
the proposed Resend HTTPS endpoint. It requires `RESEND_API_KEY` and a verified
`JOB_DIGEST_FROM` value at runtime. No credential, provider account,
sender-domain approval, or scheduled outbound call is included. Activation
requires Jamie to approve Resend (or a replacement) and authorize the exact
secret configuration.

## Security and privacy

The source is public. The committed snapshot includes only ranking metadata for
strong matches, not the full job descriptions. Secrets never enter source,
reports, artifacts, logs, or eval fixtures. Delivery is restricted to the exact
recipient `jamie@ohai.us`. The digest does not include private communications or
protected career evidence.

If the provider rejects a message, required configuration is missing, the
schema changes, or an eligibility contradiction is detected, the relevant step
fails instead of sending partial or misleading output.

## Publication workflow

The source and research records may enter the public-safe Knowledge Wiki. The
generated snapshot and digest are internal repository artifacts, not public
site routes. A provisional match must receive posting-level review, evidence
mapping, named-reader evaluation, and Jamie's editorial decision before it can
become a canonical opportunity or change a public resume, cover letter, or
portfolio page.

## Rollout plan

1. Review the source record, current snapshot, evaluator, error-analysis tests,
   and manually dispatched read-only workflow.
2. Jamie decides whether to accept this RFC and activate a daily schedule.
3. Observe at least one later City source update and inspect false positives,
   false negatives, runtime, and workflow artifact usability.
4. Jamie chooses and approves an email provider and sender identity.
5. Add the approved delivery step in a separate reviewed change and verify one
   test message before scheduling it.
6. Consider review-branch automation only after specifying branch ownership,
   permissions, rollback, and notification behavior.

Rollback removes or disables the workflow; the maintained opportunity records
and current public resume continue to function independently.

## Decision gates

- **Prototype in this pull request:** source integration, deterministic
  refresh/scoring, compact provisional intake, digest rendering, offline evals,
  and a manually dispatched read-only workflow.
- **Awaiting Jamie approval:** RFC acceptance, daily scheduling, Resend or
  another outbound provider, verified sender, repository secret installation,
  and scheduled email activation.
- **Awaiting observation:** a later dataset update and human review of the next
  generated packet.
- **Always human:** civil-service qualification judgment, canonical promotion,
  public projection, application submission, interview response, and offer
  decision.

## Drawbacks

Lexical heuristics can overrate repeated mission language and underrate an
unusually titled role. The feed may lag or omit jobs. Exact numeric scores can
look more certain than they are. Daily artifacts require review, and an email
can become noise if every open role receives equal emphasis. The system adds
maintenance for schema drift, threshold calibration, and provider operations.

## Alternatives

- **Manual search only:** lowest technical risk, but slower and less consistent.
- **Model-first ranking of every row:** more semantic flexibility, much higher
  cost, poor reproducibility, and unnecessary calls on obvious exclusions.
- **Direct automatic canonical records:** faster propagation, but confuses a
  machine lead with qualification and publication authority.
- **Direct repository-writing bot:** keeps files current but adds branch and
  pull-request mutation authority that has not been approved.
- **Gmail OAuth:** avoids another email vendor but requires a more complex token
  and refresh lifecycle for scheduled execution.

## Unresolved questions

- Should Jamie accept this RFC and enable the once-daily read-only schedule?
- Which approved sender and provider should deliver the daily message?
- After one real update, which admitted and rejected examples should become the
  first human-labeled calibration set?
- Should the digest show every actionable role in full or lead with three tasks
  and place the complete roster below them?
- Should a later reviewed automation open a pull request when source state
  changes, and what exact branch permissions should it receive?
