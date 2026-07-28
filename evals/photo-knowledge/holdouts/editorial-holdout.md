---
candidate_fingerprint: e02ef866ab95d2eb064a89a37e6abc6ed0d20fc316ceb51d9a69fcb38aebe23a
source_commit: 27b69086a6c4f4ee0b025dfe8fef04c8b8f9dee4
reviewer: "Independent editorial, accessibility, hiring-reader, privacy, and photo-governance holdout"
reviewed_at: 2026-07-28T15:31:24Z
verdict: pass
independent_read_only: true
---

# Independent Photo Holdout

## Evidence

### Exact candidate binding

I independently reproduced the algorithm in `scripts/photography/photo-knowledge.mjs`: enumerate cached and untracked non-ignored files, apply the declared exclusions, sort paths, and hash each path, NUL separator, file bytes, and final NUL separator.

- Candidate files: **933**
- Candidate SHA-256: **e02ef866ab95d2eb064a89a37e6abc6ed0d20fc316ceb51d9a69fcb38aebe23a**
- Source commit: **27b69086a6c4f4ee0b025dfe8fef04c8b8f9dee4**
- The independent result matched the stored candidate receipt.
- The exact fingerprint remained unchanged at the end of review.

### Branch-history scanner repair

The repaired branch-history scanner removes UUID-shaped public image basenames only when followed by a recognized image extension, while retaining the standalone UUID check.

An independent in-memory probe confirmed:

- A UUID-shaped basename ending in `.jpeg` produced no privacy finding.
- The same UUID-shaped token used as a standalone identifier produced the expected blocking finding.
- The complete branch-history public-safety check passed.

This is appropriately narrow for the declared repair: an image extension may identify a public web filename, but an unqualified UUID-shaped token remains prohibited.

### Active photography and hiring-reader judgment

I inspected all eight active derivatives, their manifest entries, crop positions, and the available desktop and mobile browser evidence.

- The raft hero establishes project scale without presenting Jamie as captain or sole author.
- Role, product-operations, implementation, selected-work, and resume paths remain immediately legible.
- The meeting-room and production images support participation and operational labor without replacing evidence with atmosphere.
- The self-portrait humanizes the About page while retaining a work-focused hierarchy.
- The Fair Rent sequence moves coherently through listening, production, public action, and field materials.
- The campaign sequence explicitly rejects sole-authorship implications and preserves collective agency.

The alt text accurately describes visible content without merely repeating captions. Captions supply context and boundaries rather than unsupported identity or outcome claims. Credits are visible and do not contradict the records. I found no materially misleading crop, obscured subject, dignity failure, or hiring-path obstruction.

All eight JPEGs returned no EXIF, XMP, IPTC, or GPS payloads.

### Accessibility and browser evidence

The candidate-bound accessibility receipt matches the current **119-file** public surface. It covers **14 canonical routes** at seven widths, producing **98 complete route/viewport rows**.

The receipt and fail-closed tests report:

- zero axe violations;
- zero overflow elements;
- zero clipped or collapsed photo captions;
- zero broken or unlabeled images;
- zero failed requests or non-success responses;
- zero invalid heading or landmark rows; and
- successful lazy-image follow-up with all images loaded after scrolling.

Manual review of the homepage desktop/mobile, About, and Fair Rent browser captures found readable hierarchy, intact captions, usable calls to action, and no incoherent overlap.

### Deterministic checks

| Check | Result |
|---|---:|
| Photo-governance canary | 26/26 pass |
| Layout photography evaluation | 10/10 pass |
| Layout tests | 3/3 pass |
| Accessibility receipt tests | 8/8 pass |
| Campaign census tests | 3/3 pass |
| Campaign generated-record comparison | 181/181 exact |

No writer, report generator, or evidence-refresh command was run.

### Campaign census holds

The census reproducibly contains **82 pages, 529 image occurrences, 413 unique public image URLs, 181 photo records, 29 matched entries, and 57 local retrieval candidates**.

All 181 generated records retain:

- `rights_state: permission-needed`;
- `consent_state: review-needed`;
- `public_display_status: hold`;
- `projection.status: hold`;
- no projection surfaces; and
- `network_upload: false`.

The public index excludes private identifiers and capture-time fields. Its local-match objects contain only match state and count. Public occurrence, filename matching, or archive custody remains retrieval evidence rather than creator, identity, consent, quality, or publication proof.

### Protected absences and transcript research

The intimate-gathering class remains absent by default. Aesthetic strength and project relevance cannot advance its consent gate.

The child-visible campaign derivative is absent from both the active tree and manifest. Any future occurrence remains subject to creator, rights-holder, represented-person or guardian, dignity, caption, crop, destination, history, and cache review.

The transcript-linked workflow correctly requires a named, hash-bound public event; distinguishes recording and capture uncertainty; requires local pixel confirmation; preserves earlier selection decisions and alternatives; and treats temporal proximity, private face-association metadata, and nested selection depth only as retrieval or prior-curation evidence.

## Open Human Gates

- Jamie's approval of the exact final candidate, editorial composition, and occurrence.
- Creator and rights-holder confirmation for each exact derivative and use.
- Accurate creator, project, and collective credit.
- Represented-person dignity, safety, context, and consent review.
- Guardian or appropriate represented-person authority for any child-visible use.
- Exact caption, crop, responsive crop, route, and destination approval.
- Production configuration and final production approval.
- Deployment, domain, TLS, smoke-test, and rollback verification.
- Explicit indexing approval.
- Fresh fingerprint, receipts, and independent review after any candidate-affecting change.

## Recommendation

**Pass this exact candidate as a pre-launch independent holdout.** The required commit, 933-file population, and SHA-256 match exactly, and I found no blocking editorial, accessibility, hiring-reader, privacy, or photo-governance flaw.

This verdict does not grant rights, consent, dignity clearance, publication authority, production approval, deployment approval, or indexing approval. Those human gates remain open and controlling.
