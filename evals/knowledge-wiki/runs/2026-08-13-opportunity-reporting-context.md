# Opportunity and reporting-context hill climb — 2026-08-13

## Candidate

- Branch: `feature/launch-2026-08-13-02-A`
- Base: `develop`
- Objective: represent four current priority opportunities and one closed OTI watch pattern without inventing reporting relationships or hiding qualification gaps.

## Baseline failure modes

- The three newly prioritized external roles were absent from the opportunity graph.
- The OTI Senior Product Manager source existed, but the opportunity was not modeled.
- Current opportunities did not distinguish a posting-named manager, an official-title match, and an unknown day-to-day manager.
- The expired OTI Technical Operations Manager role could be mistaken for a live opening.
- Privacy and accessibility were combined in one requirement, allowing privacy evidence to conceal the absence of public WCAG conformance evidence.

## Bounded changes

- Added current opportunity records for ACLU Senior Project Manager, CodePath Senior AI Operations Lead, CodePath Engineering Project Manager, and NYC OTI Senior Product Manager.
- Preserved the expired OTI Technical Operations Manager role as a closed historical watch pattern.
- Added a typed `reporting_context` contract that separates the nearest public manager from the senior leader whose published vision the role implements.
- Required explicit evidence-basis labels for title matches and prohibited a named manager when no person is publicly identified.
- Split OTI privacy and accessibility requirements so the accessibility experience gap remains visible.
- Added title-blind hiring queries and deterministic mutations for false-live status and invented-manager failure modes.

## Hill-climb observations

1. The first employment test pass exposed four stale exact-count fixtures after the opportunity set grew. The fixtures were changed to assert the priority set and status semantics instead of a brittle global count.
2. The first accessibility-gap model combined privacy and WCAG delivery. It was rejected because it scored the role as fully evidenced while the public record contained no conformance example.
3. The split requirement keeps privacy as visible-qualified and accessibility conformance as an experience gap with a truthful next action.
4. The full evaluator is expected to be run from a clean exact-candidate checkout because unrelated local changes to public-surface files intentionally invalidate candidate-bound accessibility evidence.

## Keep / reject rule

Keep this change only if all deterministic knowledge-wiki tests and evaluator cases pass from the clean exact candidate, the four priority roles remain current, the expired OTI role remains non-live, and no reporting relationship is stated more strongly than its public evidence.
