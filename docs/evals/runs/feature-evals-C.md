# Recursive Eval Run: feature/evals-C

Date: 2026-07-12

## Scope

- Base: `origin/develop` at `2ec37fe6e47d11e600ede204d19a98f7d3cff139`
- Candidate fingerprint: `sha256:c472c001210026abc05f1aac0c0ced64e4559677bb0597bfa80460b01142366f`
- Evaluation-contract fingerprint: `sha256:7ca78fd9e3d96878b6fa75dd38bfe6878ddc1e370e23534cd97f42f341691ec7`
- Target profile: `application_ready`

## Baseline

The immutable develop baseline scored 84.5 and failed the application-ready
profile. The highest-value deterministic failure was reader effort: the public
resume page narrated an internal phone-in-PDF decision, and Harry J. Epstein
metadata described screenshot approval as work required before launch.

## Iterations

1. Removed internal resume-governance narration from the public resume page.
2. Reframed the HJE open field as a durable public-evidence boundary rather
   than launch-process narration.
3. Rejected the first self-scored pass after independent public-safety review
   found that the candidate, baseline, citation coverage, browser evidence, and
   model judgments were not bound strongly enough.
4. Added immutable candidate and contract fingerprints, occurrence-level
   citation coverage, baseline no-regression checks, candidate-bound browser
   evidence, and two independent judgment lenses.
5. Rejected the second pass until 200%-equivalent reflow and real keyboard Tab
   traversal were verified and the eval contract itself was fingerprinted.
6. Applied baseline regression protection consistently across application and
   production profiles without weakening production requirements.
7. Replaced the literal phone-number assertion in executable source with a
   generic phone-pattern boundary check; the approved PDF still passes and
   evaluated public HTML sources remain phone-free.

## Result

The application-ready profile scored 88 and passed twice consecutively. Both
candidate-bound independent judgments passed:

- hiring-manager lens;
- public-safety-editorial lens.

Browser evidence covers eight desktop and mobile routes, eight routes at a
200%-equivalent viewport with no horizontal overflow, and 24 real Tab events
with visible focus, including nine CallNYC citation markers.

The production-ready profile remains correctly blocked. It requires a score of
90, approved visual evidence, production-specific model judgments, matching
reviewed and deployed SHAs, production smoke and rollback evidence, indexing
verification, staging noindex verification, and Jamie's approval of the exact
candidate and deployment.

## Next Cycle

The highest-value content improvement is one rights-approved, public-safe image
of actual project work, beginning with CallNYC if the archived interface asset
and its rights can be verified. That work belongs in a new optimization cycle.
