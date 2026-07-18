# Feature evals A: Chad-lens hill climb

## Criterion

`LR-JUDGE-CHAD` asks whether a hiring reader can quickly see Jamie as the actor,
understand what his work made usable, and connect that contribution to the
target role without carrying specialized archival or publication-governance
complexity. The minimum score is `4 / 5`.

The criterion cannot be improved by deleting evidence, collective credit,
consent boundaries, source limitations, or protected-state information. Those
records must remain accurate and available.

## Baseline

A fresh judge scored the pre-change candidate **3 / 5**, below the floor.

Public observations:

- the homepage immediately named Jamie's target role and contribution;
- Technical Operations connected practices to named proof;
- CallNYC clearly named Jamie's action and independent status;
- FairRentNYC preserved collective ownership language;
- the post-Sources sequence repeated artifacts and publication governance,
  requiring a mobile reader to carry more archive complexity than the hiring
  argument needed.

The judge's bounded next action was to consolidate the post-Sources record while
preserving every unique source, credit, protected status, and unofficial-service
warning.

## Hypothesis

Removing the duplicated artifact-type list, keeping representative artifact
cards visible, and placing secondary publication-governance material in one
native collapsed project record will raise the Chad lens from 3 to at least 4
without weakening evidence, accessibility, collective credit, or public safety.

## Iteration 1

The change:

- replaces `Artifact gallery` with the clearer `Representative artifacts`;
- removes the duplicative `Primary artifacts` label list;
- keeps representative artifact cards, public links, and credits visible;
- groups Known / Open / Protected, care notes, public-safety notes, and source
  boundaries in a native `details` element;
- gives the disclosure a visible keyboard focus state;
- adds deterministic source checks, a dedicated runtime case, and a regression
  test proving that a Chad score below 4 rejects the run.

## Measured result

- CallNYC at 320 px: `11,306` to `9,795` document pixels, a reduction of `1,511`
  pixels or approximately `13%` in the default scan.
- One H1, no horizontal overflow, no console errors, and correct production
  canonical/robots metadata across 9 routes and 5 viewports.
- The project record begins collapsed, expands and collapses by keyboard, and
  retains Known / Open / Protected plus care, safety, and source boundaries.
- Citations, backlinks, the cleared CallNYC artifact, public links, credits, and
  archive disclaimer remain visible and functional.

## Hard gates

- `npm run check`: passed.
- `npm run preflight:staging`: passed.
- `npm run preflight:production`: passed.
- `npm audit --omit=dev --audit-level=high`: passed with no high or critical
  advisory; two moderate PostCSS advisories remain inside Next.js.
- Production Docker build: passed as `jamieburk-art:evals-A-chad-iter1`.
- Responsive, keyboard, citation, artifact, and Chad-lens browser QA: passed.

## Fresh-judge decision

Two fresh judge contexts independently returned the same scorecard:

| Criterion | Judge A | Judge B |
| --- | ---: | ---: |
| Role legibility | 5 | 5 |
| Evidence and epistemic care | 4 | 4 |
| Emerging-work framing | 5 | 5 |
| Reader burden and hierarchy | 3 | 3 |
| Chad lens | 4 | 4 |
| Collective credit and protected boundaries | 5 | 5 |
| Visual proof and credibility | 4 | 4 |
| Operational credibility | 5 | 5 |

The deterministic scorer accepted both runs at **4.4 / 5** with no missing
scores, no below-minimum criteria, and no regressions. Chad's lens rose from
**3 to 4**, meeting its criterion floor in two consecutive fresh-judge runs.

## Decision

**Accept iteration 1.** The hiring argument now leads while the complete
publication-governance record remains available. No claim, citation, artifact,
credit, public link, consent boundary, or protected-state description was
removed.

Both judges identify reader burden as the next hill-climb target. The next pass
should test whether the complete CallNYC Sources section can follow the visible
professional proof path or use a compact accessible mobile presentation without
weakening noterefs, backlinks, source limitations, or desktop inspectability.
