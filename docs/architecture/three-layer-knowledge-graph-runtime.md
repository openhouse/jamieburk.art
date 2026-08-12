# Three-layer Knowledge Wiki evaluation prototype

RFC 0005 has a read-only prototype for testing the proposed separation among
semantic meaning, evidentiary support, source custody, and recipient-specific
projection. The RFC remains `exploring`; this code is implementation evidence,
not a stage-advancement record.

## Components

- `config/knowledge-wiki/graph-layers.json` freezes kind classification, mixed
  record overrides, semantic traversal relations, evidence attachment
  relations, and custody defaults.
- `scripts/knowledge-wiki/layers.mjs` compiles a layered view and exposes pure
  traversal, packet-planning, custody-request, and projection-eligibility
  functions.
- `scripts/knowledge-wiki/layered-graph.mjs` exposes the current public-safe
  Wiki as a read-only JSON snapshot or packet plan.
- `scripts/knowledge-wiki/layers-eval.mjs` evaluates the real Wiki seed set and
  the prototype's hard boundaries.

## Read-only use

Inspect the complete derived layer snapshot:

```sh
node scripts/knowledge-wiki/layered-graph.mjs snapshot
```

Plan cumulative packets for one or more semantic seeds:

```sh
node scripts/knowledge-wiki/layered-graph.mjs plan \
  --seeds opportunity.nyc-oti.technical-operations-manager.782369 \
  --max-degree 2
```

An unbudgeted plan emits counts and digests for evidence attachments, not the
full deferred evidence inventory. A caller may supply `--artifact-budget` and
`--select-evidence` only after making an explicit recipient-specific selection.

The CLI writes JSON to standard output. It does not authenticate, inspect a
private source, execute an adapter, copy an artifact, mutate the Wiki, or write
a packet directory. Source workflows must separately establish current
authorization and a bounded request before `planCustodyRequests` can return a
ready request. Even a ready request is not a completed materialization.

## Authority boundaries

- Access is not disclosure or publication permission.
- Evidence attachment does not increase semantic degree.
- A custody request never enters a recipient projection directly.
- Projection eligibility requires recipient, purpose, wording, rights,
  consent, credit, and editorial decisions.
- The prototype always reports `publicationAuthorized: false`.
- Private-full packets and minimum-necessary recipient projections remain
  separate artifacts.

## Known coverage gap

The implementation eval exercises the Knowledge Wiki root and the six
opportunity records currently present in this repository. It does not claim the
wider private opportunity set is complete. Missing opportunities require
governed intake and public-safe modeling before they can become semantic seeds.
