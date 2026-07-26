---
id: method.photography-east-river-canary
title: East River photographic knowledge-loop tutorial
kind: method
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-26
review_by: 2027-01-26
canonical_path: docs/knowledge-bank/workflows/photography-east-river-canary.md
summary: Teammate tutorial for tracing, validating, correcting, revoking, and safely extending the first complete photo knowledge occurrence without access to private archive details.
projection:
  status: hold
  surfaces: []
relations:
  - type: related_to
    target: index.knowledge-wiki.photography
    href: ../indexes/photography.md
  - type: related_to
    target: asset.photo.east-river-manhattan-bridge.2022.001
    href: ../assets/photographs/east-river-manhattan-bridge-2022.md
  - type: related_to
    target: projection.photo.layout-c.home.east-river
    href: ../projections/photography/layout-c-home-east-river.md
---

# East River photographic knowledge-loop tutorial

This tutorial is for a teammate with only the public repository. It explains
the public-safe part of the canary and the handoff to an authorized private
Photo Fieldwork operator. It never requires a private source identifier in Git.

## 1. Begin with the occurrence

Open the [homepage occurrence](../projections/photography/layout-c-home-east-river.md).
Confirm the route, component, crop, alt text, caption, credit, permission source,
release states, and rollback action. An occurrence is the approved unit; the
photograph in the abstract is not.

## 2. Follow the asset and assertions

Open the [asset record](../assets/photographs/east-river-manhattan-bridge-2022.md).
Check that:

- the preferred creator statement names Elana Gordon;
- the former missing-credit state is deprecated rather than erased;
- creator and archive custody are separate statements;
- year and place carry declared precision and references;
- visible observations do not become identity or outcome claims;
- the derivative path, dimensions, checksum, and metadata state match.

## 3. Review permission without opening private correspondence

Open the [permission capsule](../sources/permissions/elana-gordon-east-river-portfolio-2026.md).
The public capsule states destination, context, exact credit, transform scope,
revocability, and release gates. It must not contain messages, contact details,
private paths, or protected locators.

An authorized local operator may verify the private binding without printing
its contents:

```bash
node scripts/photo-knowledge/verify-private-binding.mjs "$PHOTO_PRIVATE_BINDING_PATH"
```

Do not add the environment value to `.env.example`, shell history, a pull
request, an issue, or a report. A successful local verification does not grant
production approval.

## 4. Run deterministic checks

Use Node 26, install from the lockfile, and run:

```bash
npm ci
npm run photos:check
npm run photos:test
npm run photos:report
```

The checks cover derivative integrity, metadata stripping, source-binding
opacity, caption assertions, creator credit, permission scope, placement,
revocation, protected absence, recollection holds, and exact-candidate binding.

## 5. Inspect the living return

The homepage encounter prompted a [dated recollection](../sources/recollections/jamie-canoe-commuting-2026-07.md)
and a [research inquiry](../research-inquiries/documented-canoe-bike-journeys.md).
Neither can alter public copy automatically. A future count requires event-level
clustering, duplicate rules, human review, and separate wording approval.

## 6. Exercise revocation

In a test fixture, change the permission state or occurrence approval to
`revoked`. Confirm `npm run photos:test` demonstrates that the active occurrence
fails. Do not perform a production takedown as a test.

The real rollback is simple: remove the Hero image occurrence, retain the
role-first text composition, and preserve the historical asset, correction, and
decision records.

## 7. Add another photograph only when it becomes consequential

Do not generate one page per private asset. Promote a photograph when it is
proposed for public use, prompts consequential research or correction, needs
rights or creator work, preserves a meaningful hold or alternative, or would
otherwise force future teammates to reconstruct the same context.

For each promoted asset:

1. Create or verify the private binding outside Git.
2. Add one public-safe asset record.
3. Separate creator, custody, permission, observation, and interpretation.
4. Record a curatorial proposal before a selection decision.
5. Bind an exact derivative to an exact occurrence and portfolio edition.
6. Preserve production and indexing as human gates.
7. Recompute the candidate receipt and rerun every affected test.

## Human authority

The tooling supports seeing, memory, correction, and reversibility. It does not
select by vote or score, speak for a named artist, confer rights or consent, or
publish. Jamie remains the publication decision owner.
