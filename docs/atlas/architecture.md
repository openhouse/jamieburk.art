# Atlas architecture decision

**Decision:** Atlas is an in-process monorepo package with service-like
contracts, not a separately deployed application or network service.

## Why a package now

- It gives semantic identity, parsing, graph compilation, querying, migration,
  and evaluation one accountable boundary.
- It keeps authored knowledge in portable Markdown rather than inside an app.
- It lets `apps/www`, future editorial tools, and command-line workflows consume
  the same contract without duplicating semantics.
- It avoids a database, CMS, auth system, service deployment, or public route
  before one of those has a demonstrated consumer.

## Component contract

```text
docs/atlas/records/canonical.json
        +
docs/atlas/pages/*.md
        +
frozen legacy migration baseline
        +
feature/evals integration manifest
        +
federated A-N knowledge catalog
        +
named stakeholder credit register
        +
ontology, disposition, and variant contracts
        +
versioned machine, task, and human eval contracts
        |
        v
@jamie-burkart/atlas
  - semantic schema
  - graph compiler
  - canonical lifecycle and proof records
  - complete project-slice migration
  - immutable source-artifact inventory
  - public/protected locator separation
  - named-credit boundary checks
  - query/explain service
  - exact candidate fingerprint
  - deterministic and adversarial evals
  - clean-room portable bundle and fixity verification
        |
        +--> disposable graph JSON
        +--> private CLI reports
        +--> branch-independent portable package
        +--> optional read-only consumers
```

## Conditions for becoming a service

A separately deployed service should be considered only when at least two real
consumers require independent release cadence, remote access, or concurrent
writes that cannot be handled safely through the repository. Even then,
Markdown remains an exportable interchange format and no service may silently
become a second canonical source.

## Authority

Atlas owns the complete canonical record store. The former typed bank and A-N
branch banks are frozen reference sources. Lossless migration parity proves
that every legacy record entered Atlas unchanged; future records belong only in
Atlas. Semantic Markdown remains the human composition layer, while atomic
JSON records retain exact nested lifecycle structure.

Branch-specific knowledge is federated rather than silently coerced into the
base schema. Exact source artifacts remain attributable to their frozen commit;
selected public-safe records and document abstracts become queryable through
Atlas. This preserves disagreement and schema variation while creating one
loss-aware discovery surface.

## Knowledge and evaluation layers

Atlas separates five responsibilities that the earlier banks frequently
combined:

1. Atomic canonical records preserve exact lifecycle structure.
2. Semantic Markdown pages compose navigable, situated neighborhoods.
3. The federated catalog preserves branch-local variants and immutable source
   artifacts without silently resolving disagreement.
4. Ontology, disposition, rights, credit, and projection contracts state how
   records may be related and used.
5. Versioned evals test machine invariants, grounded retrieval, adversarial
   mutations, clean-room reconstruction, and named human judgments.

This is a component architecture inside the monorepo: the human-authored wiki,
machine graph, full-fidelity evidence, and eval system remain independently
inspectable while sharing stable identifiers and one release contract.
