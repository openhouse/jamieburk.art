# Hiring acceptance evaluation

This system asks whether an exact public portfolio candidate makes relevant
evidence visible for a current role. It does not predict a hiring decision.

## Authority boundary

The deterministic evaluator may inspect only the public route files listed in
`public-route-sources.json`; it extracts text from the public resume PDF. The
source snapshot is a conservative proxy, not a browser or human-comprehension
result. It does not read `docs/knowledge-bank/`, private archives, relationship
history, email, messages, or source-vault material.

After that blind assessment, the separate gap resolver may compare missing
public signals with the governed opportunity record. It can classify a gap; it
cannot publish a hidden fact or turn an inference into evidence.

Named reader profiles are public-context simulations. They are not the actual
views, participation, recommendations, or endorsements of the named people.

## Commands

- `npm run hiring:check`: validate opportunity contracts and the target public
  acceptance threshold.
- `npm run hiring:test`: run adversarial and boundary tests.
- `npm run hiring:report`: generate ignored, candidate-bound diagnostic reports.
- `npm run hiring:discover -- "query"`: rank current Tier 1 roles without
  requiring an exact title.

Machine success leaves human reader sessions, role reverification, application
review, collaborator corroboration, and real hiring outcomes open.
