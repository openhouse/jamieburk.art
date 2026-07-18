# KC Town Hall Phase One archival-production run

**Date:** 2026-07-15
**Branch:** `feature/evals-A`
**Input:** Jamie's first-person account plus a 24-page CCED proposal packet

## Starting weakness

The portfolio described KC Town Hall mainly as planning and documentation
support. It did not expose Jamie's construction role, the Phase One cold-shell
scope, the neighborhood survey system, or the day-to-day coordination practice.

## Pass 1: extract the record

The proposal packet was text-extracted and all 24 pages were visually inspected.
The first pass recovered:

- founder/project-manager designations;
- a multidisciplinary team roster;
- the Phase One cold-shell definition and reported 2018 progress;
- a $189,629 Phase One budget table;
- the reproduced neighborhood survey card;
- applicant-described local-workforce and masonry-training practices; and
- a support letter describing a listening-driven neighborhood process.

## Pass 2: separate evidence classes

The initial temptation was to treat the packet as proof of completed work. A
close reading showed mixed temporal language: it reports Phase One at 66 percent,
says completion was planned for 2019, and labels the budget table completed 2019.
The packet is therefore retained as contemporaneous applicant-authored evidence,
not a final inspection certificate.

Jamie's general-contractor title, 2019 completion, daily site practice, exact
technical sequence, and survey-system authorship are retained as direct
participant testimony. The proposal corroborates role context, scope, budget,
and the survey artifact without being asked to prove more than it proves.

## Pass 3: add official corroboration

The official City CCED meeting packet independently lists Jamie as KC Town Hall's
developer/presenter and records three public speakers in support of the project.
This became a public source and a citation-bearing claim. The official record is
not stretched into proof of the general-contractor title.

## Pass 4: strengthen the portfolio

The public case study now leads with Jamie's role and what became usable:

- co-founder and project manager;
- Phase One general contractor;
- specialist construction coordination across a $189,629 proposal scope;
- a four-by-six neighborhood survey and backing contact workflow;
- construction and participation systems before the later funding lifecycle.

The local-workforce claim and exact TPO/parapet sequencing remain held for
future corroboration. The raw proposal packet remains protected.

## Recursive result

The accepted knowledge structure contains:

- 2 intake items;
- 4 source records, including one official public source and three protected
  source identities;
- 10 atomic observations;
- 5 claims, with three selected for the current portfolio and two held;
- 2 partially recovered inquiries;
- 1 new public citation occurrence; and
- 1 strengthened existing proof-coverage target.

## Guardrails retained

- proposal is not audit;
- proposed budget is not audited final cost;
- direct testimony is not independent corroboration;
- Phase One is not the full redevelopment;
- coordination is not sole trade labor;
- survey artifact is not representative sampling;
- private packet attachments and respondent data remain outside the repository;
- the later City funding lifecycle remains fully visible.

## Verification

- `npm run check:citations`: passed;
- `npm run test:citations`: 10 of 10 passed;
- `npm run check:launch-evals`: passed;
- `npm run test:launch-evals`: 6 of 6 passed;
- `npm run check:knowledge-evals`: 5/5 across 23 criteria;
- `npm run test:knowledge-evals`: 185 of 185 passed;
- TypeScript, ESLint, and the Next.js production build passed;
- knowledge-bank and route checks passed; and
- public-safety passed with the existing careful-claim guardrail warnings; and
- local Playwright QA passed at 1440 by 1000 and 375 by 812 with citation
  semantics, required content, horizontal overflow, console errors, and page
  errors checked.
