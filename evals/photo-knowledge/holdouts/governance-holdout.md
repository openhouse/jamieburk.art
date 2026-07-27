---
candidate_fingerprint: 73ddca0031cf3fe79a5228e277a82e672451243b00e8260758206bbdcbacbbba
source_commit: 1134d17895009653d4525375ca82cca44f2b8841
reviewer: "Fresh independent photo-governance holdout"
reviewed_at: "2026-07-26T22:17:53-04:00"
verdict: pass
independent_read_only: true
---

# Independent Photo-Governance Holdout

## Evidence

- Recomputed the sorted 700-file candidate as SHA-256 over repeated `relative path + NUL + raw bytes + NUL`; result exactly matched `73ddca0031cf3fe79a5228e277a82e672451243b00e8260758206bbdcbacbbba`.
- `HEAD` exactly matched source commit `1134d17895009653d4525375ca82cca44f2b8841`. Before/after worktree status was unchanged; the two pre-existing modified receipt files are explicitly excluded from the candidate digest.
- Under supported Node `v26.5.0`: photo checks passed 26/26, photo tests 22/22, layout evaluation 10/10, layout tests 3/3, accessibility evidence tests 7/7, contrast tests 3/3, RFC validation passed, and public-safety validation passed.
- The current 119-file public-surface fingerprint independently reproduced as `8be191e5d04214d3a2e71190ca3ed4f2984c5a9011cce4316d221e77a68182ac`. Its 56-row browser/axe matrix covers 14 routes at four viewports with zero accessibility violations, overflow, clipped photo captions, broken post-scroll images, unlabeled images, failed requests, or invalid heading/landmark rows.
- RFC 0003 boundaries are preserved: private source authority remains outside public Git; source asset, public derivative, occurrence, edition, permission evidence, custody, creator attribution, and recollection remain distinct.
- Permission is destination-bound, non-transferable, non-sublicensable, and not granted for unrelated future use. Public records retain only bounded summaries and opaque private references.
- Protected absence remains affirmative and fail-closed: intimate gatherings and the child-visible legacy image remain held without public surfaces or automated promotion.
- Rollback is checksummed and tested as a public-safe simulation: placement removal, withdrawal state, correction, cache review, report regeneration, preserved credit/history, and unchanged private binding are explicit.
- Artistic selection, dignity, rights, production, and indexing cannot be authorized by scores, RCV, panels, agents, tests, or this holdout. Existing holdouts and final professor/composite scorecards were not read; `photos:eval` was not run because it reads holdouts.

## Open Human Gates

Jamie exact-occurrence and final editorial approval; creator and rights authority for the exact use; exact credit, crop, caption, context, route, and sequence; represented-person dignity and consent; production; deployment; and indexing all remain open.

## Recommendation

Pass as draft PR evidence for this exact unchanged candidate only. Do not treat this verdict as publication clearance or as authority to merge, deploy, index, or broaden permission. Reproduce the fingerprint and rebind all evidence after any candidate-affecting change; preserve protected absences and rollback capability.
