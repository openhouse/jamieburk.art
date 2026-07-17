# Atlas package

Atlas is the private semantic Markdown component for Jamie's public-safe
professional knowledge universe. It owns complete canonical lifecycle and
proof records, the semantic page contract, graph compiler, query service,
full-fidelity source access, candidate fingerprint, migration coverage, and
Atlas evals. It does not own the private archive or create a public route.

## Boundary

```text
private archives (outside git)
  -> Atlas canonical records
  -> Atlas semantic Markdown
  -> @jamie-burkart/atlas compiler and query service
  -> optional, purposeful apps/www projections
```

The package is service-like in its contracts but runs in-process. A network
service, database, CMS, authentication layer, or public Atlas application would
require a demonstrated consumer and explicit approval.

## Commands

```bash
npm run atlas:generate
npm run atlas:migrate-legacy
npm run atlas:verify-legacy
npm run atlas:verify-deprecation
npm run atlas:verify-history
npm run atlas:refresh-sources
npm run atlas:verify-sources
npm run atlas:check
npm run atlas:test
npm run atlas:eval
npm run atlas:query -- --project callnyc
npm run atlas:knowledge -- --id CLM-WATERWAYS-RAFT-EXPEDITION
npm run atlas:records -- --id CLM-CALLNYC-INDEPENDENT-FOLLOW-ON
npm run atlas:bundle -- --output /path/to/atlas-portable
npm run atlas:verify-bundle -- --input /path/to/atlas-portable
npm run atlas:source-object -- --id atlas://source-objects/sha256/ID
npm run atlas:source-object -- --id atlas://source-objects/sha256/ID --bundle /path/to/atlas-portable --content
npm run atlas:release
npm run atlas:explain -- --project callnyc
```

The generated graph is disposable. Canonical records, Markdown, the frozen
branch manifest, the federated source catalog, and the named stakeholder credit
register bind the candidate. Deprecated banks remain audit sources only.
Protected locators remain hashed in ordinary Atlas projections.

The versioned v5 suite executes 50 hard gates and 12 quality targets, plus 6
explicit human gates. Its accession-exit layer tests census parity, native
dispositions, knowledge-form support, semantic and variant preservation,
datasets, procedures, evaluations, narratives, credit, correction lineage,
privacy, provenance, fixity, consumer continuity, Git-independent execution,
and a human-readable changeset. Portable export includes every semantic page,
canonical and federated component, governance contract, eval lineage, and
native SHA-256 source object. Bundle verification needs neither a Git
repository nor deprecated branch refs.
