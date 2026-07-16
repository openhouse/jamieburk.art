# Kansas City Star Waterways Ingestion - 2026-07-16

## Decision

The supplied two-page *Kansas City Star* feature materially strengthens the
knowledge bank. It is encoded as public bibliographic metadata plus bounded
public-safe findings. The PDF, newspaper layout, article text, publication
contact details, and credited photographs are not committed or republished.

The pass strengthens the existing raft-expedition claim and creates a separate
participatory-river-practice claim. Both remain held from the current website
composition. This is an editorial decision, not a statement that the work is
unimportant: the current About page already carries the participatory-method
argument through Open House, while the newspaper visual cannot be projected
without rights and consent review.

## Source Reviewed

- Darryl Levings, "In the name of art, go with the flow," *The Kansas City
  Star*, Kansas City edition, November 15, 2007, pp. A1 and A4.
- Artifact extent: two pages; both pages were text-extracted, rendered, and
  visually inspected.
- Artifact SHA-256:
  `8e9821ddccffc062983e3cf38f5a6080a1a5d1ee0cf1d0ff2b38b5ff40b17cd3`.
- Repository treatment: `public-metadata-only`; protected locator
  `ARCHIVE-WATERWAYS-KC-STAR-2007-11-15`.
- No public canonical or archival article URL was recovered in the bounded
  title, author, project-title, and publication searches completed in this
  pass. A live *Pitch* article about the same mid-journey period remains a
  separate public source.

## Findings Encoded

The article independently supports the following bounded propositions:

- the expedition idea originated with Jamie;
- the craft was built in three weeks from reused materials; the article does
  not assign every construction task to an individual crew member;
- the roughly 12-by-13-foot craft used two bicycles linked to a paddlewheel;
- the expedition had passed the 1,000-mile marker by November 2007;
- a Coast Guard interruption stranded the crew for 51 days, after which the
  craft was repaired, safety equipment was added, and travel resumed;
- the project was described as a living experience on the rivers centered on
  meeting people;
- friends joined or left the raft at multiple river cities;
- Jamie invited people encountered along the way to join the raft; and
- Jamie described the river as a possible cultural connection between Kansas
  City's West Bottoms and Delta towns.

The article does **not** independently establish:

- that Jamie acted alone or personally performed every construction task;
- the later Gulf of Mexico terminus;
- a complete route, participant roster, or program corpus;
- that every participant or river community shared Jamie's interpretation;
- lasting cultural, civic, or policy outcomes from the encounters; or
- permission to republish the supplied PDF, layout, text, or photographs.

## Claim Changes

### Strengthened: `CLM-WATERWAYS-RAFT-EXPEDITION`

Added the *Star* as non-rendered corroborating evidence for Jamie's originating
idea, the reported three-week build, craft dimensions and propulsion,
1,000-mile-plus scale, and the 51-day interruption and recovery. Added explicit
sole-authorship and publication-rights boundaries.

### Created: `CLM-WATERWAYS-PARTICIPATORY-RIVER-PRACTICE`

Created a distinct claim for the public-encounter model: stopping to meet
people, friends joining and leaving in river cities, Jamie inviting people
encountered aboard, and his cultural-connection interpretation. The claim
attributes that interpretation to Jamie and does not present it as participant
or community consensus.

### Strengthened: `waterways-participatory-practice` proof

Updated the public-safe proof wording from "conceived and organized" to
"conceived, co-built, and organized"; added implementation, recovery, and
participation detail; added *The Kansas City Star* to the source basis; and
expanded the anti-claims and protected boundaries. The proof remains
`internal-only` and does not automatically change a website page.

### Expanded: `INQ-WATERWAYS-FULL-PROGRAM-CORPUS`

Recorded the full two-page review method, new implementation and participation
findings, rights limits, and unresolved route, roster, and artifact questions.

## Governance Changes

- Added `SRC-WATERWAYS-KC-STAR-2007-11-15` as a typed
  `public-metadata-only` source with private preservation status.
- Added `INT-WATERWAYS-KC-STAR-ARTICLE-2026-07-16` as a matured protected
  intake linked to the source, both claims, the research inquiry, and this run
  record.
- Added document-level rights metadata: permission needed, consent review
  needed, and metadata-only public display.
- Added an approval-register rule allowing bounded bibliographic findings but
  prohibiting republication without rights and consent review.
- Updated the projection map to explain why both waterways claims remain held
  from the current site.
- Added lifecycle regression coverage that rejects a leaked local PDF path,
  publication phone number, or publication email address and verifies the
  source, claim, intake, proof, projection, and rights posture.

## Knowledge-Base And Website Changes

The following knowledge-base surfaces were updated:

- typed source, claims, evidence relationships, and inquiry in
  `apps/www/src/data/knowledge-bank/portfolio-history.ts`;
- intake lifecycle in `apps/www/src/data/knowledge-bank/intake.ts`;
- public-safe proof bank in `apps/www/src/data/proofs.ts`;
- claim register in `docs/knowledge-bank/claims.md`;
- source policy in `docs/knowledge-bank/sources.md`;
- approval policy in `docs/knowledge-bank/approval-register.md`;
- projection decisions in `docs/knowledge-bank/projection-map.md`; and
- the public-safe historical project note in
  `docs/knowledge-bank/projects/participatory-public-practice.md`.

No visible website copy, routes, navigation, images, or downloadable assets
were changed. That omission is deliberate: the website remains a projection
of the bank optimized for its current hiring audience, while the richer
evidence remains available for future compositions.

## Files Changed

- `apps/www/src/data/knowledge-bank/portfolio-history.ts`
- `apps/www/src/data/knowledge-bank/intake.ts`
- `apps/www/src/data/proofs.ts`
- `docs/knowledge-bank/approval-register.md`
- `docs/knowledge-bank/claims.md`
- `docs/knowledge-bank/projection-map.md`
- `docs/knowledge-bank/projects/participatory-public-practice.md`
- `docs/knowledge-bank/sources.md`
- `scripts/tests/knowledge-lifecycle.test.mjs`
- `docs/evals/runs/2026-07-16-kc-star-waterways-ingestion.md`

## Recursive Hill Climb

### Baseline

The prior bank had strong public reporting for Jamie's originating idea, more
than 1,000 miles traveled, the Gulf terminus, and *Great Accommodations*. It did
not encode the *Star* feature, the three-week craft details, the 51-day recovery
sequence, or the expedition's reported public-encounter model as a distinct
claim.

### Move

The smallest material move was to add one protected source, strengthen one
existing claim, create one semantically distinct claim, mature the intake and
inquiry, update the proof and governance records, and add a focused regression
test. No site projection was needed to meet the evidence, credit, privacy, and
composition criteria.

### Verification

The first holdout round rejected the initial encoding. All three judges found
that the new regression test itself contained the exact local path and
publication contact values it was intended to prohibit. Two also asked for
tighter source-specific attribution: the *Star* reports that the craft was
built in three weeks but does not assign every construction task; the recovery
involved substantial local help; and cultural connection remained Jamie's
stated possibility rather than community consensus.

The repair:

- replaced sensitive denylist literals with generic absolute-path, email, and
  phone detection across every changed text surface, including the test and
  this run record;
- separated the *Star*'s passive three-week build finding from the combined
  source basis for Jamie's co-building role;
- retained local assistance in the recovery account;
- restored the possible and attributed character of the cultural-connection
  statement; and
- removed an unverified rights-holder chain while retaining
  `permission-needed`, `review-needed`, and `metadata-only` controls.

Three fresh independent read-only holdouts then scored all seven criteria
`4/4`, with no critical issues and no recommendations:

| Criterion | Judge 1 | Judge 2 | Judge 3 |
| --- | ---: | ---: | ---: |
| Factual fidelity | 4 | 4 | 4 |
| Courageous specificity | 4 | 4 | 4 |
| Collective credit and causality | 4 | 4 | 4 |
| Source rights and privacy | 4 | 4 | 4 |
| Knowledge-lifecycle integration | 4 | 4 | 4 |
| Composition and positioning | 4 | 4 | 4 |
| Artistic and recursive continuity | 4 | 4 | 4 |

Final deterministic verification on the unchanged repaired candidate:

- `npm run check`: passed under Node `26.4.0`, including 27 portfolio evals,
  19 blocking eval definitions, 52 knowledge-lifecycle tests, citation tests,
  every configured social-corpus check and scored eval, TypeScript, ESLint, an
  optimized 18-route Next.js build, the knowledge-bank check, public safety,
  and route validation;
- `npm run preflight:staging`: passed with explicit staging URLs and
  `NEXT_PUBLIC_ROBOTS_POLICY=noindex`;
- `npm run preflight:production`: passed with production URLs and
  `NEXT_PUBLIC_ROBOTS_POLICY=index`;
- `git diff --check`: passed; and
- the citation registry remained current and redacted.

The worktree initially lacked the platform-native `lightningcss` binary. A
lockfile-clean `npm ci` under the repository's required Node `26.4.0` / Apple
Silicon runtime restored the correct dependency and changed no tracked package
file. `npm ci` reported two existing moderate dependency advisories; no
breaking automatic audit fix was applied.

The automated suite continues to report `PR-019` target-reader review and
`PR-025` hands-on launch QA as pending human work. Those gates were not changed
or represented as complete by this pass.

## Remaining Research

- Recover a complete route and dated stop chronology.
- Recover a complete, consent-aware collaborator and participant roster.
- Inventory surviving photographs, video, correspondence, plans, code, and
  physical artifacts with rights and consent status.
- Seek a stable public or archived copy of the *Star* article metadata or page.
- Seek collaborator corroboration for specific construction and organizing
  roles.
- Find a rights-clearable visual that makes the craft and participation model
  inspectable without reproducing the newspaper pages.
- Evaluate this historical depth again when a future audience, application, or
  editorial composition benefits from it.
