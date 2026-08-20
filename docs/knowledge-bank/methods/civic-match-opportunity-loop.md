---
id: method.civic-match-opportunity-loop
title: Civic Match opportunity relationship loop
kind: method
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-20
review_by: 2026-09-20
canonical_path: docs/knowledge-bank/methods/civic-match-opportunity-loop.md
summary: A consent-aware loop for profile discovery, invitations, saved roles, applications, staff matching, and events.
relations:
  - type: uses_source
    target: source.civic-match.candidate-network
    href: ../sources/civic-match-candidate-network-2026-08-20.md
---

# Civic Match opportunity relationship loop

Civic Match is modeled as an authenticated relationship source rather than a
bulk posting feed. Its useful signals arrive through a candidate profile,
employer discovery, invitations, saved roles, staff-assisted matching,
application tracking, and events.

The loop is intentionally staged:

1. Confirm the candidate profile remains accurate, current, public-safe, and
   intentionally visible.
2. Review new-role alerts, invitations, saved roles, applied-role state, and
   relevant events without treating any signal as an application or offer.
3. Reject expired, below-floor, location-incompatible, or credential-blocked
   opportunities through deterministic checks.
4. Verify a promising role against the employer's current posting and add it
   to governed opportunity intake only when its evidence-backed fit clears the
   established threshold.
5. Update the shared public resume, role-specific materials, and named-reader
   set only after the selected opportunity state changes.
6. Apply through the employer's external process, then mark the role applied
   in Civic Match so the tracking state remains accurate.
7. Bring invitations, interviews, feedback, and outcomes back into the
   opportunity system as private evidence for the next iteration.

The candidate-profile guide runs deterministic field, word-limit, artifact,
source, privacy, and audience checks before any language-model evaluation.
Named hiring-reader lenses evaluate fit for the selected opportunities. Civic
Match program-lead lenses evaluate whether the profile is clear and supported
enough to merit an active match. Those simulations are tests, not statements
by the named people.

Jamie alone controls protected-category answers, relocation, media consent,
profile visibility, terms acceptance, and final submission.

No automated check may cross those human decision gates.
