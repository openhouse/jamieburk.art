# Kansas City Star knowledge-bank and eval change ledger

**Date:** 2026-07-16  
**Branch:** `feature/evals-D`  
**Pull request:** `openhouse/jamieburk.art#216`  
**Input:** two-page November 15, 2007, Kansas City Star clipping  
**Input fingerprint:** `sha256:8e9821ddccffc062983e3cf38f5a6080a1a5d1ee0cf1d0ff2b38b5ff40b17cd3`

## Purpose

This pass encodes the supplied clipping into the source-aware knowledge bank,
deepens the waterways project record, recursively runs every agent-executable
launch-readiness evaluation, keeps the public website composed rather than
exhaustive, and records the remaining human and deployment gates honestly.

The clipping itself is not committed. The repository contains no local source
path, copyrighted page image, or extracted full article text.

## Source inspection performed

1. Confirmed the PDF is a two-page, unencrypted clipping.
2. Rendered both pages at readable resolution and visually inspected them.
3. Extracted layout-preserving text and checked it against the rendered pages.
4. Confirmed title, author, publication, date, front-page placement, and A4
   continuation.
5. Computed a SHA-256 fingerprint for identity and deduplication.
6. Reconciled the artifact with the existing canonical source instead of
   creating a competing source record.

## Intake disposition

Added:

- `INTAKE-KANSAS-CITY-STAR-RAFT-PDF-2026-07-16`

Disposition:

- maturity: `decomposed`
- public use: `cite-with-care`
- editorial state: `unsurfaced`
- disposition: `linked-duplicate`
- duplicate of: `INTAKE-JPH-KANSAS-CITY-STAR-RAFT-2026`
- canonical source: `SRC-JPH-KANSAS-CITY-STAR-RAFT-2007-11-15`

Why: the supplied PDF matches an already governed clipping, but its fresh close
reading materially increased the source's evidentiary resolution.

## Canonical source changes

Updated `SRC-JPH-KANSAS-CITY-STAR-RAFT-2007-11-15` to retain:

- the artifact fingerprint;
- the July 16 close-read date;
- the three named crew members: Libby Hendon, James Burkart, and Laura
  Mattingly;
- the article's attribution of the initiating dream, vision, or idea to Jamie;
- the reported three-week construction period;
- found-material construction and bicycle-linked paddlewheel propulsion;
- the reported July 21 West Bottoms departure and November position south of
  Baton Rouge;
- the living-experience, open-invitation, and joined-stretches participation
  pattern; and
- Jamie's attributed interpretation of the river as invisible or dividing
  civic space whose cultural connection might be reawakened.

The source explicitly does not establish:

- a completed Gulf endpoint or precise final route;
- sole authorship or sole execution by Jamie;
- the person-by-person division of labor;
- independent corroboration of every reported detail;
- a measured long-term civic or cultural outcome; or
- permission to republish the copyrighted pages.

## Atomic claim changes

Updated:

- `CLM-WATERWAYS-KANSAS-CITY-STAR-FEATURE-2007`

Added:

- `CLM-WATERWAYS-KANSAS-CITY-STAR-ORIGIN-2007`
- `CLM-WATERWAYS-KANSAS-CITY-STAR-CREW-AND-RAFT-2007`
- `CLM-WATERWAYS-KANSAS-CITY-STAR-PARTICIPATORY-METHOD-2007`
- `CLM-WATERWAYS-KANSAS-CITY-STAR-RIVER-INTERPRETATION-2007`

Each claim has:

- one bounded proposition;
- an evidence relationship to the canonical clipping;
- a page or passage locator;
- a confidence level;
- explicit boundaries and anti-claims;
- a July 16 review record; and
- no active public projection.

The initiating-role claim also retains the 2007 Pitch article as corroborating
evidence. Originating the idea is not treated as sole credit for the expedition.

## Documentation changes

Added:

- `docs/knowledge-bank/research/2026-07-16-kansas-city-star-raft-close-read.md`
  - method, source disposition, source affordances, limitations, and claim map;
- `docs/knowledge-bank/research/2026-07-16-kansas-city-star-change-ledger.md`
  - this complete work and verification record.

Updated:

- `docs/knowledge-bank/projects/waterways-participatory-programs.md`
  - adds the Kansas City Star source affordance and all five governed claims;
- `evals/launch-readiness/v23/hill-climb-log.md`
  - records the decomposition and accessibility attempts, results, and stop
    boundaries.

## Validation changes

Updated `scripts/lib/knowledge-intake-validation.mjs` to require:

- the new submitted-fragment intake;
- its duplicate linkage to the canonical intake;
- the exact source fingerprint;
- all five Kansas City Star claim records;
- located, non-rendered source evidence;
- no active projection for the claim cluster; and
- explicit Gulf, sole-credit, labor-allocation, measurement, aspiration, and
  copyright boundaries.

The deterministic denominator changes from:

| Measure | Before | After |
| --- | ---: | ---: |
| Required submitted fragments | 43 | 44 |
| Total intake records | 141 | 142 |
| Required archive claims | 10 | 14 |
| Required archive intakes | 12 | 13 |

All existing deterministic hard gates remain passing.

## Website selection decision

No waterways case study, new public page, or Kansas City Star artifact was
added. The claims remain in the bank as compositional depth.

This is deliberate:

- a defensible claim does not automatically belong on the hiring-facing site;
- a public citation is not publication permission for the clipping;
- the current four-proof Technical Operations path remains the stronger first
  argument for job applications; and
- future editorial needs may select these records without having to rediscover
  or overstate them.

## Recursive eval pass

### Baseline

At the starting commit, all 22 deterministic gates passed. Browser, semantic,
human, and runtime criteria required observation evidence.

### First bounded hypothesis: source decomposition

The article moved from one coarse claim to five located claims without a new
source record, public clipping, or website projection. After the change:

- `INTAKE-001`, `ARCHIVE-001`, `ARCHIVE-002`, `DISPOSITION-001`, and
  `PROJECTION-001` pass;
- knowledge-bank and public-safety checks pass; and
- two independent semantic graders score every semantic criterion at or above
  the `0.8` threshold.

Conservative semantic scores, using the lower of the two independent grades:

| Criterion | Score |
| --- | ---: |
| `CLARITY-001` | 0.8 |
| `CHAD-001` | 0.8 |
| `DECOMP-001` | 0.8 |
| `EDITORIAL-001` | 0.8 |
| `VOICE-001` | 1.0 |
| `MORSE-001` | 1.0 |
| `SACK-001` | 1.0 |
| `SELECT-001` | 1.0 |
| `ARCHBIAS-001` | 0.8 |
| `CONSEQUENCE-001` | 0.8 |
| `CURRENT-001` | 0.8 |
| `MAINTAIN-001` | 0.8 |

### Second bounded hypothesis: compact-text contrast

The first browser pass found seven compact labels or provenance lines on
CallNYC at about `3.86:1` to `3.87:1`, below `A11Y-001`'s `4.5:1` normal-text
requirement.

Updated `apps/www/src/components/CaseStudyBlocks.tsx`:

- At-a-glance labels: `text-jb-paper/70` to `text-jb-paper/80`;
- Tags label: `text-jb-paper/70` to `text-jb-paper/80`;
- artifact provenance: `text-jb-ink/64` to `text-jb-ink/72`.

Fresh browser results after the fix:

- 56 of 56 route-width checks pass at 320, 375, 768, and 1440 pixels;
- 14 of 14 200-percent-equivalent reflow checks pass;
- 128 CallNYC text specimens have zero contrast failures;
- minimum measured contrast is `4.53:1`;
- 48 of 48 traversed controls expose visible focus;
- 13 of 13 citation links and 13 of 13 backlinks have accessible names and
  local targets; and
- HJE, FairRentNYC, and CallNYC retain legible, captioned, alt-described public
  artifacts at mobile width.

## Verification performed

Passed:

- `npm run check:knowledge-intake`
- `npm run knowledge-bank`
- `npm run public-safety`
- `npm run eval:launch-readiness`
- `npm run build`
- `npm run check`
- `git diff --check`
- fresh Playwright route, reflow, focus, citation, contrast, screenshot, and
  artifact inspection
- two independent semantic grading passes

The complete `npm run check` includes launch-eval contract checks, all current
social-archive corpus checks and evals, citation validation and tests,
TypeScript, ESLint, the production Next.js build, knowledge-bank checks,
public-safety checks, and route checks.

## Open gates and next actions

The work stops at the protocol's human and deployment boundary. This pass does
not self-certify:

- `READER-001`: unprimed hiring-reader observation;
- `COLLAB-001`: collaborator review of social truth;
- `HOLDOUT-001`: outside-rubric holdout review;
- `APPLICATION-001`: role-specific application selection;
- `APPROVAL-001`: Jamie's explicit launch and public-use approval; or
- `RELEASE-001`: deployed production-runtime verification.

For the clipping specifically, future research may seek a stable article URL,
library citation, or licensed clipping use. A structured route, endpoint,
labor-allocation, or rights inquiry should be added if the claim cluster enters
active editorial consideration. Until then, the source and claims remain
useful, governed, and unsurfaced.

## Files changed in this pass

- `apps/www/src/components/CaseStudyBlocks.tsx`
- `apps/www/src/data/knowledge-bank/archive-intake-2026-07-14.ts`
- `docs/knowledge-bank/projects/waterways-participatory-programs.md`
- `docs/knowledge-bank/research/2026-07-16-kansas-city-star-raft-close-read.md`
- `docs/knowledge-bank/research/2026-07-16-kansas-city-star-change-ledger.md`
- `evals/launch-readiness/v23/hill-climb-log.md`
- `scripts/lib/knowledge-intake-validation.mjs`
