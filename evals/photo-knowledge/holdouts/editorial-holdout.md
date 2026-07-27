---
candidate_fingerprint: "3467feb1203122bd490fddb3cb555165356d6dcc69707576b277ad795f6d4446"
source_commit: "80d910ea27fbb76c3775e170a5d2b33fff1e39c6"
reviewer: "Fresh independent editorial and accessibility photo holdout"
reviewed_at: "2026-07-27T00:22:03Z"
verdict: pass
independent_read_only: true
---

# Editorial And Accessibility Holdout

## Evidence

- Independently reproduced the declared 667-file candidate fingerprint under
  Node 26.5.0 at the specified source commit.
- All 26 deterministic photo-knowledge checks passed. All 22 mutation and
  governance tests passed, including tests for private-locator leakage in
  committed QA evidence, renderer-snapshot drift, revoked occurrences,
  permission expansion, responsive evidence drift, protected absence, and
  non-human selection authority.
- All seven candidate-bound accessibility-evidence tests passed. The bound
  matrix covers 14 canonical routes at 360, 375, 768, and 1280 CSS pixels: 56
  successful observations with no axe violations, horizontal overflow,
  clipped captions, broken images after scrolling, unlabeled images, failed
  requests, or invalid heading and landmark rows.
- An independent live browser pass examined the homepage, About page, and
  FairRentNYC case study at 360 and 1280 pixels. All six route-viewport
  combinations returned HTTP 200. After explicitly scrolling each lazy image
  into view and awaiting decode, every image loaded. No unlabeled images,
  clipped captions, horizontal overflow, failed requests, or WCAG 2.0/2.1
  A/AA axe violations were observed.
- Keyboard sampling on the homepage reached the skip link, identity link, and
  primary navigation in logical order. Each sampled focus target displayed a
  three-pixel solid outline.
- The photographic sequence is editorially coherent. The raft introduces
  collective scale and shared risk; the listening room shows participation
  becoming public work; screen printing reveals material production; the
  self-portrait establishes Jamie's situated presence; and the Fair Rent
  sequence moves from listening through making to public action and field
  materials.
- Captions do interpretive work without asking photographs to prove outcomes.
  The raft caption expressly rejects a captaincy claim, and the Fair Rent
  introduction and captions preserve collective campaign authorship.
- All active photographs have distinct descriptive alt text, contextual
  captions, project-level credits, stable aspect-ratio containers, responsive
  `sizes`, and deliberate crop positions. Priority loading is reserved for
  lead or first-viewport images; remaining images use lazy loading
  successfully.
- Visual inspection found the selected photographs legible, specific, and
  mutually differentiated. Their documentary textures support the portfolio's
  account of operational stewardship without becoming decorative stock
  imagery.
- Metadata inspection of the active derivatives, held East River derivative,
  and committed QA screenshots found no embedded GPS coordinates, owner names,
  serial numbers, creator metadata, or source timestamps in the inspected
  fields.
- Public-safety scanning, including `docs/qa/photo-knowledge`, found no private
  filesystem paths, source filenames, Photos-library locators, source UUIDs,
  exact coordinates, or private-preview fingerprints.
- Protected absence is operational. Intimate gathering photographs remain
  withheld by default. The child-visible Talks Not Raids photograph is absent
  from the active application and current public-image tree pending
  child-specific dignity, represented-person, creator, and rights review.
- The East River photograph remains structurally separate from the active
  Layout E manifest with `candidate-hold` status. Its projection,
  public-display, consent, production, and indexing states remain held or open.
- The historical Layout C occurrence is bound to a checksummed correction
  patch, corrected creator credit, five committed renderer snapshots,
  responsive screenshots, and a production-render receipt.
- Fresh-clone portability was independently verified. A disposable
  `--no-local` clone did not contain the unreferenced corrected Layout C Git
  tree, yet the committed renderer snapshots supported all deterministic
  checks and photo tests. Historical validation therefore does not depend on
  one operator's private Git object database.

## Open Human Gates

- Jamie's final editorial and exact-occurrence approval.
- Creator and rights-holder authorization for each active Layout E photograph.
- Exact creator credit, caption, crop, context, and destination review for the
  active photographic cohort.
- Represented-person dignity, privacy, and depiction review, including
  responsive crops.
- Appropriate child or guardian review before any future Talks Not Raids
  occurrence.
- Human or legal judgment about prior Git distribution, caches, and history
  treatment for withdrawn material.
- East River mobile-crop dignity review and Elana Gordon's exact-crop review.
- Manual assistive-technology and broader human accessibility review.
- Production activation, deployment, and post-deployment verification.
- Indexing approval.

## Recommendation

Accept this exact candidate as an editorial and accessibility **pass** for
continued draft pull-request review.

Commit the 667 reviewed candidate files without modification and reproduce the
fingerprint in hosted CI. Any change to pixels, alt text, caption, credit,
crop, sequence, renderer, responsive behavior, or candidate-bound evidence
requires a new fingerprint and fresh holdout.

This review does not confer rights, consent, exact credit or crop approval,
dignity clearance, production approval, deployment approval, or indexing
approval.
