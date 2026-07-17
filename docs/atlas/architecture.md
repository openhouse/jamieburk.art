# Atlas architecture decision

**Decision:** Atlas is an in-process monorepo package with service-like
contracts, not a separately deployed application or network service.

## Why a package now

- It gives semantic identity, source ingestion, graph compilation, querying,
  portability, and evaluation one accountable boundary.
- It keeps human knowledge in portable Markdown and structured JSON beside the
  application rather than inside a database or opaque service.
- It lets `apps/www`, future editorial tools, and command-line workflows consume
  one contract without duplicating semantics.
- It avoids a CMS, auth system, service deployment, or public route before a
  demonstrated consumer requires one.

## Component contract

```text
canonical lifecycle records
        +
semantic Markdown pages
        +
source dossiers and Markdown syntheses
        +
ontology, governance, disposition, and projection contracts
        +
versioned machine, mutation, independent, and human eval contracts
        |
        v
@jamie-burkart/atlas
  - schema and stable identities
  - graph compiler and exact candidate fingerprint
  - canonical record and source-dossier service
  - public/protected custody separation
  - query and explain protocols
  - deterministic and adversarial evals
  - clean-room portable bundle
        |
        +--> disposable graph JSON
        +--> private CLI reports
        +--> Git-reviewable knowledge changes
        +--> optional read-only consumers
```

## Knowledge layers

1. Atomic canonical records preserve complete lifecycle and proof structure.
2. Semantic Markdown pages compose navigable situated neighborhoods.
3. Source dossiers preserve canonical source and artifact identity, atomic
   observations, epistemic boundaries, corroborators, governance, projection
   decisions, and evaluation evidence.
4. Content-addressed source objects preserve exact recoverable bytes when
   rights and custody permit them in a portable bundle.
5. Evals govern deterministic invariants, grounded retrieval, adversarial
   mutations, independent certification, and named human judgment.

The generated graph and service expose source dossiers, not processing-tree
associations. A source's identity is bibliographic and fixity-centered. A
processing run is evidence about how Atlas changed, not provenance of what the
source is.

## Conditions for becoming a service

Consider a separately deployed service only when at least two real consumers
require independent release cadence, remote access, permissions-managed
universes, or concurrent writes that cannot be handled safely through the
repository. Even then, Markdown remains an exportable interchange format and
no service may silently become a second canonical source.
