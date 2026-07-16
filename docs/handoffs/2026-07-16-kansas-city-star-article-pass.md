# Kansas City Star Article Knowledge-Bank Pass

**Date:** 2026-07-16

**Branch:** `feature/evals-L`

**Pull request:** [#213](https://github.com/openhouse/jamieburk.art/pull/213)

This document records every repository change and validation action made in
response to the supplied two-page Kansas City Star article scan.

## Source Review

- Inspected PDF metadata: two pages, created December 16, 2008, representing
  the November 15, 2007, Kansas City edition.
- Extracted the text with layout preservation.
- Rendered both pages to images and visually reviewed the front page and A4
  continuation.
- Identified the article as Darryl Levings, "In the name of art, go with the
  flow," The Kansas City Star, November 15, 2007, pp. A1 and A4.
- Confirmed that the article was prominently illustrated on the front page.
- Kept the PDF, photographs, published contact details, and local file location
  outside the public repository.

## Corroborating Research

- Located and reviewed Eric Barton's public November 12, 2007, Pitch article,
  ["Artists Turned Huck Finn, Part III"](https://www.thepitchkc.com/artists-turned-huck-finn-part-iii/).
- Used that source as contemporaneous public corroboration, not as proof of the
  later Gulf endpoint.

## Knowledge-Bank Changes

- Added one intake record.
- Added two source records with different governance:
  - the Kansas City Star scan is public metadata with a protected locator and
    held republication rights;
  - The Pitch article is a live public source.
- Added seven atomic observations covering publication prominence, crew,
  construction, route progress, participatory purpose, operational
  interruption and recovery, and corroboration.
- Connected both new sources to the existing
  `CLM-WATERWAYS-RAFT-EXPEDITION` evidence graph.
- Strengthened that claim's boundaries so the in-progress November report
  cannot be mistaken for endpoint proof or a complete participant roster.
- Expanded the waterways project dossier with the newly recovered operating
  detail and failure-recovery history.
- Added an intake receipt explaining what entered the repository and what did
  not.

## Regression Protection

- Added a lifecycle test requiring the intake, both sources, all seven
  observations, media-rights hold, collective-credit boundary, endpoint
  boundary, and evidence wiring.
- Added the new module, intake receipt, run log, and this handoff to the
  recursive protocol's required-file set.

## Website Decision

No website copy or layout changed. The source materially strengthens the
knowledge bank, but it does not by itself improve the current job-facing
composition enough to justify adding another public project surface.

## Evaluation And Release Record

- Knowledge lifecycle: **97/100**, passing its 95-point criterion with no hard
  failures.
- Chad lens: **100/100**.
- CallNYC, WOW List, NYC Artist Coalition, urbanhermit, Facebook, iCloud,
  institutional-interface, seven blind-spot, Margaret Morse, and Warren Sack
  eval criteria: **all met**.
- Citation tests: **9/9 passed**.
- Knowledge-lifecycle tests: **18/18 passed**.
- `npm run check`: **passed**.
- `npm run preflight:staging`: **passed**.
- `npm run preflight:production`: **passed**.
- Public-safety and recursive checks: **passed**.
- Existing careful-claim warnings remain intentional guardrail reminders.

## Resulting Knowledge-Bank Counts

- 38 intake records
- 222 sources
- 262 atomic observations
- 98 claims
- 44 research inquiries
- 82 `confirmed-with-boundary` claims

## Release Boundary

The exact automated candidate is green. Production remains blocked by the
separate human gates for external hiring comprehension, collaborator-sensitive
review, human Chad-lens editorial judgment, and Jamie's approval of the exact
production commit. This source pass does not alter those gates.
