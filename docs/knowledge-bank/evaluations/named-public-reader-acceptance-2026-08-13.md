---
id: evaluation.named-public-reader-acceptance.2026-08-13
title: Named public-reader acceptance evaluation - Launch B
kind: evaluation
status: governed-open
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-13
review_by: 2026-08-14
canonical_path: docs/knowledge-bank/evaluations/named-public-reader-acceptance-2026-08-13.md
summary: Public-web-only modeled hiring acceptance gates for eight named reader-opportunity pairs, bounded against false participation, endorsement, prediction, or invented reporting lines.
evaluation_type: named-public-reader-acceptance
candidate_commit: f8d31b0bfb4b3ccb1dda1c26cba00d18c61ab9b2
public_origin: https://staging-b.jamieburk.art
overall_result: fail
required_pair_count: 8
passed_pair_count: 0
failure_modes:
  - A fictionalized lens is presented as the named person's real view, participation, endorsement, or hiring decision.
  - A public operational or vision leader is silently converted into a direct manager.
  - Repository, private Wiki, communication, or source-custody evidence reaches a public-reader evaluator.
  - A deterministic validator converts a modeled failure into a pass.
  - An expired role is presented as live or its future-role benchmark is presented as an available vacancy.
  - A candidate receipt is reused after the public candidate changes.
deterministic_checks:
  - Every required reader-opportunity pair has one verdict bound to an exact candidate commit and public origin.
  - Every recorded page is an HTTPS public web surface.
  - The receipt records that the named people did not participate.
  - The configured relationship and evaluated opportunity match.
  - Overall pass requires every required pair and the availability gate to pass.
human_checks:
  - Treat critique as a modeled reading aid, not a hiring prediction.
  - Recover and review original evidence before strengthening any public claim.
  - Re-run each reader independently after the exact candidate is deployed.
  - Confirm formal qualifications with the employer rather than inferring eligibility from portfolio fit.
relations:
  - type: related_to
    target: index.knowledge-wiki.employment-context
    href: ../indexes/employment-context.md
  - type: related_to
    target: portfolio.work.technical-operations
    href: ../projections/work-technical-operations.md
  - type: related_to
    target: opportunity.codepath.engineering-project-manager.5160542007
    href: ../opportunities/codepath-engineering-project-manager.md
  - type: related_to
    target: opportunity.aclu.senior-project-manager.8620968002
    href: ../opportunities/aclu-senior-project-manager.md
  - type: related_to
    target: opportunity.benepass.product-operations.7f963a7a
    href: ../opportunities/benepass-product-operations.md
  - type: related_to
    target: opportunity.nyc-oti.senior-product-manager.782366
    href: ../opportunities/oti-senior-product-manager-782366.md
  - type: related_to
    target: opportunity.nyc-oti.technical-operations-manager.782369
    href: ../opportunities/oti-technical-operations.md
  - type: related_to
    target: person.zack-parker
    href: ../people/zack-parker.md
  - type: related_to
    target: person.chris-coleman
    href: ../people/chris-coleman.md
  - type: related_to
    target: person.charizma-williams
    href: ../people/charizma-williams.md
  - type: related_to
    target: person.aileen-palmer
    href: ../people/aileen-palmer.md
  - type: related_to
    target: person.jaclyn-chen
    href: ../people/jaclyn-chen.md
  - type: related_to
    target: person.luke-farrell
    href: ../people/luke-farrell.md
  - type: related_to
    target: person.lisa-gelobter
    href: ../people/lisa-gelobter.md
human_review: governed-open
---

# Named public-reader acceptance evaluation

Seven named public-context readers were modeled in separate, sequential,
independent tasks against the public staging site. Lisa Gelobter's task returned
separate verdicts for the current Senior Product Manager role and the expired
Technical Operations Manager benchmark, producing eight required
reader-opportunity pairs.

The real people did not participate. The results are not quotations,
endorsements, private opinions, interview predictions, or hiring decisions.
The evaluator tasks received no repository, private Wiki, correspondence, or
prior evaluator output.

## Baseline result

| Opportunity | Modeled reader context | Result | Primary public-proof gap |
| --- | --- | --- | --- |
| CodePath Engineering Project Manager | Zack Parker, published VP Engineering reporting context | fail | QA and bug-lifecycle proof |
| CodePath Engineering Project Manager | Chris Coleman, product-engineering vision context | fail | QA, operational AI, and education context |
| ACLU Senior Project Manager | Charizma Williams, COO-office vision context | fail | Project controls, budget authority, and accessibility practice |
| Benepass Product Operations Manager | Aileen Palmer, named reporting context | fail | Launch/go-no-go and quantified prioritization |
| Benepass Product Operations Manager | Jaclyn Chen, company-vision context | fail | Launch ownership and sprint-based collaboration |
| OTI Senior Product Manager 782366 | Luke Farrell, nearest public operational lead | fail | End-to-end resident product ownership and formal screen |
| OTI Senior Product Manager 782366 | Lisa Gelobter, initiative vision leader | fail | Senior-product proof and formal screen |
| Expired OTI Technical Operations Manager 782369 | Lisa Gelobter, agency vision leader | pass | Pass is limited to a future materially similar role |

The independent browser assessment initially rendered ten requested routes at
desktop and mobile. It found clear role positioning but delayed case summaries,
late artifact access, repetitive evidence structures, and mobile reading
burden. The origin later returned HTTP 502 across core routes, so availability
also failed.

## Post-hill-climb result

The exact public candidate
`f8d31b0bfb4b3ccb1dda1c26cba00d18c61ab9b2` passed the independent design,
availability, responsive-layout, navigation, image-loading, and basic-usability
checks. Role and value were clear within fifteen seconds, and supported
responsibility, result, evidence, and artifact access now arrive before the long
case narrative.

The stricter named-reader rerun remained **fail: 0 of 8 required pairs**. The
result does not assert that Jamie lacks the underlying ability. It records that
the public candidate alone does not demonstrate every job-specific proof family
needed for a final modeled hire decision. The separate machine-readable receipt
preserves each reader's constructive critique and inspected routes.

## Hill-climb boundary

The first responsible change is compositional: put supported decisions, scope,
and inspectable artifacts before the long evidence narrative. It may not invent
a bug history, budget authority, sprint role, accessibility practice, product
decision right, or civil-service qualification. Source recovery and Jamie
review must precede any stronger claim.

The machine-readable contract and candidate receipt live in
`evals/knowledge-wiki/named-reader-acceptance.json` and its configured run file.
`npm run wiki:hiring:readers:check` validates structure and boundaries;
`npm run wiki:hiring:readers:gate` fails until every required modeled pair and
public availability pass.
