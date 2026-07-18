# Knowledge Wiki Foundation Run

Date: 2026-07-18

Branch: `feature/knowledge-wiki-B`

Base: `feature/knowledge-n` at
`575332e042f6a217ffa71b5b6fa69c99f70b7d13`

Primary brief: `M-knowledge-wiki-product-and-teammate-implementation-brief.md`

Guidance precedence: M, then N, then D

## Decision

`ready-for-code-review`

The bounded Knowledge Wiki foundation passes every machine gate defined for
this implementation. It is not a human usability finding, rights clearance,
consent decision, editorial approval, application approval, or production
approval.

## What Was Built

- `docs/knowledge-wiki/` is the canonical Markdown reading and navigation
  surface for Wiki-page identity.
- Existing typed claims, sources, evidence, corrections, citations, proofs,
  rights records, and portfolio projections remain authoritative in their
  existing locations.
- The former name, Knowledge Bank, remains a compatibility alias. No global
  path, command, import, or historical-record rename occurred.
- A 23-record public-safe CallNYC and OTI pilot exercises projects, events,
  sources, claims, an anti-claim, a correction, media governance, capability,
  method, opportunity, evaluation, and selective projection.
- One compiler derives the Wiki Graph, index, backlinks, search rows, health
  reports, and pull-request graph delta under the ignored
  `.artifacts/knowledge-wiki/` directory.
- Eight bounded `wiki:*` commands support checking, testing, graph generation,
  reporting, retrieval tasks, and read-only queries.
- No public Wiki route, Explorer, CMS, database, editor, or automatic
  publication path was added.

## Recursive Hill Climb

Four substantive passes were completed against the same implementation scope.

1. The first compiler pass found three unexplained document dead ends. The
   authored evaluation, schema, and projection records gained purposeful prose
   links rather than metric-only links. The next run reached 23 of 23 records
   and zero dead ends.
2. The first complete deterministic eval reached 100/100. A manual adversarial
   review then found under-tested boundaries despite the passing score.
3. The validator was strengthened to check relation origins as well as targets,
   reject repository-escaping links, reject private or restricted records in
   the public Wiki, require explicit media rights/consent/display fields,
   validate wanted-record lifecycle, and include aliases and governance changes
   in derived artifacts and graph deltas.
4. Five new mutation cases fixed those blind spots. The 20-test Wiki suite,
   focused health gate, deterministic eval, query tasks, derived artifacts, and
   complete repository gate then passed without changing the public app.

## Final Pilot Health

| Dimension | Result |
| --- | ---: |
| Wiki records | 23 |
| Ordinary prose links | 61 |
| Typed semantic relations | 35 |
| Root-reachable records | 23 / 23 |
| Unexplained orphans | 0 |
| Dead ends | 0 |
| Wanted records | 1 |
| Rights holds | 1 |
| Canonical authority references | 13 |
| Wiki mutation and invariant tests | 20 passing |
| Deterministic foundation criteria | 10 / 10 passing |

The current semantic fingerprint begins `2358c7f881fe`. Generated files state
their source commit and source-tree fingerprint, identify themselves as
generated, and are not committed as canonical records.

## Retrieval Proof

The read-only query pilot successfully retrieves:

- CallNYC chronology and the consequential 2016 correction;
- the event date and source trail;
- the anti-claim preventing official-Council-product wording;
- public-data translation and Technical Operations capability;
- the OTI opportunity relationship;
- the Digital District photograph's permission, consent, and display hold.

The task protocol contains ten retrieval prompts. It remains a protocol rather
than a fabricated human-study result.

## Verification

The following commands passed:

```text
npm run wiki:build
npm run wiki:check
npm run wiki:test
npm run wiki:eval
npm run wiki:graph
npm run wiki:report
npm run wiki:tasks -- --json
npm run wiki:query -- --question callnyc-chronology --json
npm run wiki:query -- --rights-pending --json
npm run check
```

The complete `npm run check` included the existing citation, portfolio,
blind-spot, knowledge-lifecycle, knowledge-composite, social-corpus,
TypeScript, ESLint, Next.js production-build, knowledge-bank, public-safety,
and route gates. It completed successfully. The existing knowledge-bank check
reported its 16 intentional careful-claim warnings and no failure.

## Human Gates

The eval contract records the following evaluations as `not-requested` and
excludes them from the machine result:

- Jamie and Chad lens;
- Abby Covert information-architecture lens;
- Audrey Tang and Sara Hendren governance lens;
- Jennifer Pahlka and Lisa Gelobter role-evidence lens.

Rights and consent for the held photograph also remain unresolved. The valid
next action is code review and teammate navigation, followed by separately
recorded human decisions where the resulting material is considered for an
application or public projection.
