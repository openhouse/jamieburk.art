# Civic Match New York-area review - September 1, 2026

This was a read-only review of the authenticated Civic Match board. No role was
saved, marked applied, submitted, shared, or used for outreach during the
review.

## Coverage

The board was sorted by distance from New York, New York. Both result pages
were reviewed to the terminal page: 27 public job cards in total. Each card
received a retained disposition in the
[machine-readable inventory](../../../evals/opportunity-intake/civic-match-discovery.json).
Private profile fields, account identifiers, messages, and session data were
not copied.

The inventory is complete only for this exact rendered search state and review
date. It is not a promise of unattended synchronization or a complete census of
every role Civic Match may expose under other locations or filters.

## New governed opportunity

The strongest new lead was
[NYC PEU Chief Strategy Officer 787960](../../../docs/knowledge-bank/opportunities/peu-chief-strategy-officer-787960.md).
It combines outreach operations, goal setting, field learning, outcome data,
staff leadership, and interagency partnerships.

Its central unresolved qualification is not general seniority. The PEU
interest form says candidates must have direct supervisory experience and asks
for exact direct, indirect, manager-of-managers, and years-of-management
figures. That evidence must be fact-checked before drafting the answer.

## Yes, it is on the normal NYC Jobs site

The source routes do not collapse into one link:

| Source | Observed route | Authority |
| --- | --- | --- |
| Civic Match card | PEU Google interest form | Discovery and agency-specific interest route |
| [Official NYC Jobs record](https://cityjobs.nyc.gov/job/chief-strategy-officer-in-manhattan-jid-45904) | City SmartRecruiters | Canonical Job ID 787960 and formal application route |
| PEU interest form | Three required 200-word narrative screens plus resume or URL | Useful supplemental screen; relationship to SmartRecruiters remains unstated |
| NYC Jobs Open Data | No row returned for Job ID 787960 on September 1 | Bulk-feed absence; not evidence that the official posting is closed or invalid |

The official City Jobs page supplies the decisive identity fields: Job ID
787960, HRA/DSS, Director of Management Planning title code 95684, one Manager
M1 position at 253 Broadway, $120,000-$140,000, no exam required, and a
September 27 posted-until date.

Civic Match displayed closes when filled. Preserve that observation, but use
the official September 27 date for formal deadline control and plan to act
earlier.

## What the full board added

The review separated four classes:

- one new governed opportunity: PEU Chief Strategy Officer;
- two roles already tracked as submitted: OTI Operations Manager and OTI
  Senior Product Manager;
- a small held-review set, including Executive Director of Product Management
  and Senior Advisor, Programs, where senior-management or domain evidence is
  not yet strong enough; and
- excluded roles with legal credentials, workforce-development subject-matter
  requirements, technical architecture or cybersecurity requirements,
  finance/law-enforcement specialization, or salary ceilings below Jamie's
  target.

A disposition is a search decision, not a statement about another person's
value or a prediction of employer interest.

## Why PEU is a real fit and not a title match

PEU's own public description says the unit uses community-organizing
principles, proactive outreach, and case management to connect New Yorkers with
services. The job asks its CSO to make that operating model learn:

- outreach staff should understand and believe in their goals;
- outcome capture should help staff improve rather than merely report upward;
- leaders should see what works and change strategy; and
- City Hall and agency relationships should turn into better service outcomes.

Jamie has public-safe evidence for the outreach, facilitation, resident
service, stakeholder-synthesis, civic-data translation, and documentation
parts. The management facts remain open.

## Application-form observations

The PEU form is titled PEU Chief Strategy Officer Interest Form and states an
in-office expectation of three to four days weekly, with one to two remote
days. It asks for:

- name, email, and phone;
- a resume upload or an online-resume URL;
- a 200-word fit answer;
- a 200-word example of using data to shape program goals or strategy; and
- a 200-word factual management-experience answer.

The form was inspected without entering or submitting data. Contact
information, account identity, and upload state are protected and are not
retained here.

## Hill-climb result

This pass repaired three source-system weaknesses:

1. A complete board review can no longer pass the situated-source evaluator
   without one uniquely indexed disposition for every listing.
2. An independently verified official posting can reconcile a Civic Match card
   whose discovery Apply route is a distinct agency form, while preserving
   both URLs and never treating either as submission evidence.
3. The NYC Jobs scorer now recognizes Chief Strategy Officer, public-engagement
   outreach, hyphenated continuous-improvement language, and data synthesis as
   fit signals while retaining human qualification review and the seniority
   penalty.

The exact candidate clears the deterministic fit floor but not the secure
threshold. That is the intended state: worth governed consideration, still
blocked on direct-supervision and formal-title evidence.

## Regression checks

Run:

- npm run evals:situated-sources
- npm run test:opportunities
- npm run wiki:graph
- npm run wiki:check
- npm run knowledge-wiki
- npm run public-safety

A green check validates source identity, complete-inventory accounting, graph
integrity, and public-safety boundaries. It does not submit either application
route, establish a referral, satisfy the management screen, or predict a hiring
decision.
