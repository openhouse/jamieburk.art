---
candidate_fingerprint: "3467feb1203122bd490fddb3cb555165356d6dcc69707576b277ad795f6d4446"
source_commit: "80d910ea27fbb76c3775e170a5d2b33fff1e39c6"
reviewer: "Fresh independent photo-governance holdout"
reviewed_at: "2026-07-26T20:16:41-04:00"
verdict: pass
independent_read_only: true
---

# Photo-Governance Holdout

## Evidence

- Independently reproduced the supplied 667-file candidate fingerprint at the
  declared source commit without consulting existing photo holdouts or final
  professor/composite scorecards.
- `npm run photos:check` passed all 26 governance checks.
- `node --test scripts/photography/photo-knowledge.test.mjs` passed all 22
  mutation tests.
- RFC 0003 clearly separates private source assets, public derivatives,
  observations, recollections, interpretations, permissions, occurrences,
  editions, inquiries, and human release authority.
- The East River derivative has the declared SHA-256, is 1280x960 WebP, and
  contains no EXIF, XMP, IPTC, GPS, source filename, or other sensitive
  embedded metadata.
- The public graph preserves corrected creator attribution, bounded
  non-transferable portfolio permission, deprecated prior uncertainty,
  public-safe metadata, caption assertions, archive custody, curatorial
  interpretation boundaries, research questions, and rollback behavior.
- The permission capsule does not quote private correspondence or claim a
  general license. Public repository and staging delivery are explicitly
  Jamie's destination-bound interpretation of the portfolio-use grant.
- The East River occurrence remains structurally separate from the active
  Layout E manifest as `candidate-hold`. Its image cannot silently enter the
  active composition.
- The child-visible Talks Not Raids derivative is absent from the current
  application tree and active manifest. Intimate gathering photographs remain
  an affirmative protected absence.
- Public-safety validation covers `docs/qa/photo-knowledge`. Independent review
  found no private paths, source filenames, source UUIDs, coordinates, private
  preview fingerprints, Photos-database locators, or reconstructable private
  source bindings.
- The responsive receipt, screenshots, correction patch, derivative, and five
  renderer snapshots match their recorded digests.
- The mobile and desktop screenshots visibly contain the corrected Elana
  Gordon credit, role identity, value proposition, and primary actions. The
  mobile crop's heightened facial emphasis is appropriately retained as an
  open dignity question.
- Clean-clone portability was tested in a disposable `--no-local` clone. The
  unreferenced corrected tree `3059ab62...` was absent, yet all 26 checks and
  22 tests passed under Node 26 using the committed renderer snapshots.
- Reconstructing Layout C from base commit `fea303e5...` plus the committed
  correction patch produced the declared tree
  `3059ab6209621cfbca60d352dd83cc596675600a`. The reconstructed renderer
  digests matched the committed snapshots.
- The source commit alone produces a different candidate fingerprint because
  ten candidate-affecting generated reports remain uncommitted. This verdict
  is bound to the exact supplied worktree bytes, not to a clean checkout of the
  source commit alone.

## Open Human Gates

- Jamie's exact-occurrence editorial approval.
- Mobile-crop dignity review.
- Elana Gordon's exact-crop review.
- Represented-person dignity, depiction, and consent authority.
- Creator and rights-holder attribution and use authority.
- Asset-level rights, creator, credit, crop, dignity, and occurrence review for
  the eight active Layout E legacy photographs.
- Resolution of any prior Talks Not Raids repository-history or cache treatment
  requiring human or legal judgment.
- Production approval.
- Deployment approval.
- Indexing approval.
- Renewed review for any changed crop, route, context, repository, purpose, or
  future unrelated use.

No automated review, passing check, responsive receipt, draft pull request,
staging surface, or holdout judgment confers any of these approvals.

## Recommendation

Pass this exact candidate as an inactive, governed RFC 0003 canary.

Before relying on the holdout in CI or merging its evidence, commit the
reviewed candidate-affecting generated reports unchanged and reproduce the
667-file fingerprint. Any change to pixels, captions, credits, crops,
permissions, renderer snapshots, routes, occurrence state, or
candidate-affecting generated evidence requires a new fingerprint and fresh
independent review.

Keep the East River occurrence and every unresolved legacy occurrence held
until their named human gates are affirmatively closed.
