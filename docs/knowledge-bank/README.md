# Knowledge Bank

This directory is the public-safe editorial and proof source of truth for jamieburk.art.

It answers:

- What can the site say?
- What evidence supports it?
- Where may the claim appear?
- What wording is safe?
- What is too strong?
- What is open?
- What is protected?
- What blocks production?

## Rules

- The website projects from the Knowledge Bank; it does not invent claims inside components.
- Claims must be public-safe, evidence-backed, or clearly marked as open.
- Private source material may be named by class but not exposed.
- Collective work must use collective-credit language.
- Exact metrics require approval.
- Public TODOs do not belong in public UI.
- Missing or protected evidence is not a defect when exposure would violate privacy, consent, client trust, law, civic sensitivity, or community safety.

## Canonical Public Frame

Jamie builds the operating backbone that helps complex public-facing teams plan, document, decide, onboard, report, and ship.

## Support Frame

Preferred public wording:

> Jamie helps teams give resilient form to emerging, stakeholder-heavy work: clear requirements, workflows, decision records, status rhythms, runbooks, onboarding materials, launch support, and durable handoffs.

Operational fallback for technical project management contexts that explicitly
ask about ambiguity:

> Jamie helps teams translate work that is still taking shape into clear requirements, workflows, decision records, status rhythms, runbooks, onboarding materials, launch support, and durable handoffs.

Use "emerging" where it removes shame and better reflects work that is already taking shape. Use "ambiguous" only when the reader explicitly expects operational or implementation language, and avoid making ambiguity sound like a team failure.

## Knowledge Bank States

### Known

Public-safe and evidence-backed enough to say.

### Open

Needs approval, citation, screenshot, stronger evidence, or revised wording.

### Protected

Intentionally omitted because privacy, consent, law, civic sensitivity, client trust, or community safety requires it.

## Hierarchy

- `docs/knowledge-bank/README.md` explains the system.
- `docs/proofs-bank.md` stores reusable public-safe proof claims.
- `docs/public-claims-inventory.md` maps claims to public pages and approval state.
- `docs/knowledge-bank/source-classes.md` describes evidence classes without exposing private paths.
- `docs/knowledge-bank/approval-register.md` records production review items.
- `docs/knowledge-bank/projection-guide.md` explains how claims move to pages.
- `docs/knowledge-bank/anti-claims.md` records what not to say.
- `docs/content-safety.md` describes what must stay protected.
- `docs/launch-blockers.md` records what blocks production.

## Relationship To Production

Production may only become indexable after all production blockers are resolved and Jamie approves the exact reviewed staging commit.

The Knowledge Bank may live in the public repo as a public-safe editorial/proof system. It must not expose private supporting material.
