# Kansas City Star Raft Evidence Update

Date: July 16, 2026

Branch: `feature/evals-B`

Pull request: [openhouse/jamieburk.art#212](https://github.com/openhouse/jamieburk.art/pull/212)

## Purpose

This pass reviewed a privately held scan of a contemporaneous Kansas City Star
article about the 2007 raft project, encoded its public-safe findings in the
Knowledge Bank, strengthened the existing waterways proof, and recursively ran
the portfolio evaluation system. The scan and its photographs were not copied
into the public repository.

## Source Reviewed

- Darryl Levings, "In the name of art, go with the flow," *The Kansas City
  Star*, November 15, 2007, pages A1 and A4.
- The two-page PDF was inspected as a document and as rendered page images.
- Text extraction was compared against both page renders before claims were
  encoded.
- The repository stores citation metadata, bounded findings, and a protected
  locator ID. It does not store the local path, article scan, or photographs.

## What The Article Establishes

The source supports the following bounded account:

- Jamie originated the idea for *Release Yourself onto the Water Until it
  Tastes of Salt*.
- Jamie Burkart, Libby Hendon, and Laura Mattingly were the three-person
  traveling crew named by the article.
- The crew departed Kansas City's West Bottoms on July 21, 2007.
- They built an approximately 12-by-13-foot raft in three weeks from discarded
  housing material, civic refuse, and 30-gallon soda-syrup drums.
- Two bicycles linked to a paddlewheel provided propulsion when wind or current
  required it.
- By November 15, 2007, the crew had passed the 1,000-mile marker and traveled
  south of Baton Rouge.
- Jamie described inviting people encountered along the route to join the raft.
- Jamie described the project as an effort to awaken cultural connection
  between Kansas City's West Bottoms and towns along the Mississippi Delta.
- The crew adapted to a Coast Guard interruption, legal review, and additional
  safety-equipment requirements before continuing.

## What The Article Does Not Establish

The source does not establish:

- sole construction, navigation, or authorship by Jamie;
- a complete builder, host, passenger, or support roster;
- the exact route before or after publication;
- arrival at the Gulf of Mexico or the exact final landing place;
- measured community impact or institutional endorsement; or
- permission to republish the scanned article or photographs.

The November article documents the voyage while it was underway. Later 2009
sources, not this article alone, support the broader four-month journey to the
Gulf. The exact landing place remains unresolved.

## Knowledge Bank Changes

### Intake and source governance

Added:

- `INTAKE-2026-07-16-KC-STAR-RAFT-EXPEDITION`
- `SRC-KC-STAR-RAFT-EXPEDITION-2007-11-15`

The intake is `bank-only`. The source is `public-metadata-only`, carries a
protected locator ID, and marks the scan and photographs `do-not-publish` with
rights and consent review still required.

### Claims

Strengthened `CLM-WATERWAYS-RAFT-EXPEDITION` to:

- name the project;
- credit Libby Hendon and Laura Mattingly as traveling crew;
- anchor the July 21 departure and November 15 progress;
- describe the found-material bicycle-paddlewheel craft; and
- distinguish contemporaneous progress from the later retrospective Gulf
  endpoint.

Added `CLM-WATERWAYS-RAFT-PARTICIPATORY-METHOD` to preserve Jamie's reported
invitation practice and attributed cultural-connection intent without turning
either into a claim of measured impact.

Both claims remain held with no public surfaces. The portfolio now has better
material available for future composition, but this pass did not make the
public site carry another story simply because the story is vivid.

### Proof and documentation

Updated the internal `waterways-participatory-practice` proof to name the crew,
state the chronology precisely, add the participatory-method claim, and preserve
the distinction between the November report, later Gulf reporting, and the
unrecovered exact landing place.

Updated:

- `apps/www/src/data/proofs.ts`
- `docs/knowledge-bank/claims.md`
- `docs/knowledge-bank/sources.md`
- `docs/knowledge-bank/blind-spot-register.md`

### Research inquiry

Expanded `INQ-WATERWAYS-FULL-ROUTE-AND-ROLES` with the newly recovered crew,
craft, chronology, invitation, and safety-adaptation evidence. The inquiry
remains `partially-recovered` because the complete builder and support roles,
route, host and passenger network, handoff record, and exact final landing place
are not yet recovered.

## Blind-Spot Controls

The new record changed the Knowledge Bank graph from 59 to 60 intake records,
232 to 233 sources, and 103 to 104 claims. Active projections remain 61; held
projections rise from 44 to 45.

Updated the source-balance, role-evidence, composition, and mosaic controls so
that the article's drama cannot silently eclipse:

- the crew's shared labor;
- local hosts and passengers;
- maintenance, coordination, repair, and safety adaptation;
- the difference between Jamie's reported intent and demonstrated impact; or
- the rights and relational risks of combining route detail, crew identities,
  encounter patterns, and photographs.

The public-site composition digest was refreshed, but no public page selected
the new claims.

## Recursive Evaluation Results

All deterministic suites passed after the Knowledge Bank and control records
were updated:

| Evaluation | Result |
| --- | --- |
| Knowledge Bank validation | Passed with 27 expected careful-claim warnings |
| Portfolio claim evals | Passed |
| Chad lens | Passed |
| Margaret Morse lens | Passed |
| Warren Sack lens | Passed |
| Knowledge Bank lifecycle | Passed: 9 hard gates, 7 criteria, 15 fixtures, 60 intake records |
| Public safety | Passed |
| Citation integrity | Passed |

The materially affected blind-spot suite received two fresh, independent judge
rounds against bundle
`f67058bc52fbc867f7c6cd59713f41cbe46f2b7783f2d7b54cb420a0d45f2086`:

| Round | Evidence and governance | Hiring and field use |
| --- | --- | --- |
| 1 | 100/100, minimum criterion 5 | 98/100, minimum criterion 4 |
| 2 | 100/100, minimum criterion 5 | 100/100, minimum criterion 5 |

The first hiring judge held actionability at 4 because external reader study,
outreach, and job-search receipts remain planned rather than observed. The
second round confirmed the repository controls had reached the suite threshold
after the next actions and evidence-return paths were made fully explicit. This
does not fabricate an external outcome: reader comprehension, collaborator
agreement, hiring effectiveness, application outcomes, and community impact
remain `not-yet-measured`.

## Files Added

- `apps/www/src/data/knowledge-bank/kc-star-raft-batch-2026-07-16.ts`
- `docs/knowledge-bank/updates/2026-07-16-kc-star-raft-evidence-update.md`
- `evals/portfolio-system-blind-spots/runs/2026-07-16-kc-star-raft-evidence-b/result.json`
- `evals/portfolio-system-blind-spots/runs/2026-07-16-kc-star-raft-evidence-b/provenance.json`
- Four independent judge artifacts under the run's `judges/` directory

## Files Updated

- `apps/www/src/data/knowledge-bank/records.ts`
- `apps/www/src/data/proofs.ts`
- `docs/knowledge-bank/blind-spot-register.md`
- `docs/knowledge-bank/claims.md`
- `docs/knowledge-bank/sources.md`
- `evals/portfolio-system-blind-spots/composition-manifest.json`
- `evals/portfolio-system-blind-spots/control-state.json`
- `evals/portfolio-system-blind-spots/mosaic-review-2026-07-15.json`
- `evals/portfolio-system-blind-spots/role-evidence-classifications.json`
- `evals/portfolio-system-blind-spots/runs/current-run.json`

## Future Research

Useful next evidence would include:

- a licensed or publisher-controlled public copy of the article;
- project records that distinguish construction and navigation roles;
- a bounded route and chronology assembled without exposing private hosts;
- collaborator review by Libby Hendon and Laura Mattingly;
- a participant- and rights-reviewed image set; and
- evidence about public encounters and later project handoff that does not
  confuse stated intent with measured outcome.

These are research opportunities, not prerequisites for preserving the current
bounded record.
