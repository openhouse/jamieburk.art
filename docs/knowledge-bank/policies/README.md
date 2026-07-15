# Knowledge-bank policies

These public-safe registries make two editorial contracts inspectable by people
and enforceable by agents.

- `collective-credit-policy.json` classifies every known project as collective,
  individual, or mixed. Every claim in a mixed project is explicitly classified
  too. Unknown projects, unclassified mixed-project claims, and classification
  mismatches fail closed under `KB-007`. Claim project IDs are cross-checked
  against their atomic source assertions; a small named list preserves older
  individual CallNYC facts that predate that assertion layer and pins each
  exception to its original project. A reviewed collective-claim fingerprint
  also fails on silent deletion, project reassignment, or changes to actor,
  boundary, and anti-claim language.
- `projection-surface-bindings.json` maps each approved public route to the
  source files that can render knowledge-bank projections there. An active
  route projection must use a literal `Claim` component or
  `getClaimProjection` call with the same claim ID, projection key, and surface
  in one of those files before it can pass `KB-009`. It inventories shared
  case-study renderers, the full public source surface, and the downloadable
  resume plus its reviewable HTML source and extracted text. Reviewed
  fingerprints fail on silent claim deletion, use-now/hold drift, ungoverned
  public-copy changes, or resume-artifact replacement.

The evaluator rejects missing or duplicate policy targets, blank guardrails,
duplicate projection keys, unknown routes, and known routes without a matching
source binding. Every document projection remains an exact-text contract with
its declared public knowledge-bank document.

Run `npm run report:knowledge-policy-fingerprints` after an intentional review,
then update the policy hashes in the same change. A hash update is an approval
event, not an automatic formatting step.
