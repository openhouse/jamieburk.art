---
rfc: 7
title: Opportunity Sources and Daily Action Loop
stage: implementing
start_date: 2026-08-20
authors:
  - Jamie Burkart
  - OpenAI Codex
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - knowledge-architecture
  - research-operations
  - privacy-governance
  - deployment
implementation: apply/2026-08-20-A
supersedes: []
superseded_by: null
---

# Opportunity Sources and Daily Action Loop

## Summary

Maintain opportunity sources according to their distinct affordances. The NYC
Jobs Open Data feed has a machine-readable row clock; Civic Match has a
candidate-managed profile and recruiter-discovery surface; the BetaNYC weekly
newsletter has an authenticated edition clock and editorial context. Run
low-cost deterministic screens before scoring, enrich rather than duplicate
cross-source matches, materialize only strong matches as governed Wiki intake
records, and prepare a daily action digest from maintained live opportunities.

## Motivation

Opportunity discovery and application preparation currently require repeated
manual checks across changing official surfaces. The City publishes a
machine-readable dataset with an explicit row-update clock. Jamie wants a system
that notices change, prioritizes plausible roles, prepares an actionable queue,
and learns from real application outcomes while preserving truthful claims and
his control of every application.

The August 18, 2026 dataset edition is useful but not complete: direct CityJobs
research found current OTI roles absent from the feed. The design therefore
combines dataset discoveries with maintained Wiki opportunities.

## Goals

- Detect a new row-data edition without treating metadata-page edits as job changes.
- Detect when the recorded BetaNYC newsletter edition is stale and require an authenticated refresh.
- Remove recipient-specific tracking and private message data before retaining newsletter leads.
- Preserve discovery provenance while binding role facts to official employer postings.
- Enrich an existing opportunity node rather than creating a duplicate across sources.
- Remove ineligible or clearly unsuitable postings before any model evaluation.
- Rank remaining postings by transparent fit and securability evidence.
- Add only strong matches as review-gated opportunity intake records.
- Generate one concrete next action for every active opportunity each day.
- Prepare private email delivery that requires separate operator activation.

## Non-goals

- Automatically submit an application or answer protected application questions.
- Treat a score as a probability of interview, offer, or hire.
- Replace direct review of official job details and civil-service requirements.
- Publish private application status, correspondence, contacts, or credentials.
- Invoke synthetic hiring readers for excluded or below-threshold rows.

## Terminology

- **Row-data edition:** The source snapshot identified by Socrata's
  `rowsUpdatedAt` value.
- **Strong match:** A role that clears the configured fit, securability, and
  combined thresholds after every deterministic screen.
- **Action digest:** A private daily message listing active opportunities and one
  next step for each.

## Detailed design

The source adapter reads Socrata metadata and compares `rowsUpdatedAt` with the
last recorded edition. A newer value releases a refresh. A lower value fails
closed for source review. An unchanged value reuses the qualified snapshot and
does not rerun scoring.

On refresh, the adapter deduplicates internal and external copies by Job ID and
prefers the external row. It then excludes internal-only, expired, sub-$100,000
maximum, licensed-specialist, required-advanced-degree, and construction-
specialist roles. A relevant title family is required so shared City boilerplate
cannot admit an unrelated role. Remaining roles receive separate fit and
securability scores and a weighted combined score.

An admitted role becomes a public-safe Wiki opportunity node containing compact
posting facts, transparent scores, known unknowns, a salary warning when needed,
and a human-review requirement. Raw description and qualification fields are
processed temporarily and omitted from generated artifacts. A later close
reading must map exact requirements to evidence and identify plausible reader
contexts before application materials or synthetic hiring-reader checks run.

The digest merges qualified dataset discoveries with maintained live Wiki
opportunities, removes elapsed deadlines at send time, and assigns one next
action to every survivor. This allows a fresh daily email without re-fetching or
rewriting the weekly source snapshot.

The BetaNYC adapter compares the newest normalized edition date with a ten-day
freshness window. A current edition proceeds to deterministic evaluation. A
stale edition fails before modeled-reader work and routes to an authenticated
mailbox review. The reviewed result retains only clean destinations and
public-safe normalized facts. Because the repository cannot itself exercise an
authenticated mail connector, activating recurring ingestion remains a separate
operator decision; the freshness gate makes that missing review visible rather
than silently treating old data as current.

## Security and privacy

The public repository stores environment-variable names but no email address,
API credential, private application status, or correspondence. Resend delivery
fails closed unless the environment is production, delivery is explicitly set
to `send`, and sender, recipient, and credential secrets are all present.
Staging is always dry-run.

Generated source and opportunity records are public-safe summaries. Source data
is not committed in bulk. Secret values never enter generated files, logs,
pull-request bodies, or public pages.

## Publication workflow

Qualified roles may enter the governed Wiki as intake records through a reviewed
change. That is not publication approval for new portfolio claims, an
application decision, or authority to contact an employer. Jamie reviews role
accuracy, civil-service eligibility, salary compatibility, source availability,
and evidence mappings. Jamie alone decides whether and when to apply.

The daily digest is private operational output. Enabling recurring production
delivery requires a separately reviewed scheduler and configured authorized
single-recipient secrets. Staging deployment does not enable email.

## Rollout plan

1. Commit the source adapter, strong-match rules, generated source edition,
   qualified report, action-digest renderer, tests, and evaluation.
2. Deploy the portfolio candidate to staging with email held in dry-run mode.
3. Review the admitted set and refresh artifacts.
4. Review and activate a least-authority scheduler and configure email secrets
   for the requested recipient.
5. Record false positives, false negatives, applications, and outcomes; adjust
   thresholds only through reviewed tests and evidence.

Rollback consists of disabling `OPPORTUNITY_DIGEST_DELIVERY`, reverting the
scheduler, and retaining the last reviewed Wiki records as an audit trail.

## Decision gates

- The official dataset identity and row-data timestamp agree across config,
  source record, and report.
- Every admitted role clears all deterministic and score thresholds.
- The initial admitted set receives human sampling for material false positives.
- Staging confirms that email delivery remains disabled.
- A least-authority scheduler receives separate review before activation.
- An authorized operator configures the one-recipient delivery secrets.
- Jamie retains final approval over each application and public claim.

## Drawbacks

The dataset can omit current postings, carry repeated boilerplate, lag direct
CityJobs pages, or preserve a posting that has changed. Rule-based scoring can
miss unconventional good fits or admit superficially similar work. Maintaining
another scheduled process, provider account, and review queue adds operational
cost. Daily email can become noise if opportunity status is not maintained.

## Alternatives

Manual search alone avoids automation but makes freshness and coverage
inconsistent. Scoring every row with a language model offers nuance at much
higher cost and still cannot establish eligibility. Treating the dataset as the
complete City inventory is simpler but contradicted by the observed OTI gaps.
Automatic repository mutation would reduce clicks but remove the most useful
accuracy and governance checkpoint.

## Unresolved questions

- Which false-positive and false-negative rates are acceptable after two weeks?
- Should later sources share the same score scale or use source-specific calibration?
- Which private application tracker should update stage-specific digest actions?
- What retention period should apply to delivery logs and provider message IDs?
