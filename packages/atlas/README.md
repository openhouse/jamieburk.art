# Atlas package

Atlas is the private semantic Markdown component for Jamie's public-safe
professional knowledge universe. It owns the semantic page contract, graph
compiler, query service, candidate fingerprint, migration coverage, and Atlas
evals. It does not own the private archive, replace the typed canonical claim
bank, or create a public website route.

## Boundary

```text
private archives (outside git)
  -> typed public-safe knowledge bank
  -> docs/atlas semantic Markdown
  -> @jamie-burkart/atlas compiler and query service
  -> optional, purposeful apps/www projections
```

The package is service-like in its contracts but runs in-process. A network
service, database, CMS, authentication layer, or public Atlas application would
require a demonstrated consumer and explicit approval.

## Commands

```bash
npm run atlas:generate
npm run atlas:refresh-sources
npm run atlas:verify-sources
npm run atlas:check
npm run atlas:test
npm run atlas:eval
npm run atlas:query -- --project callnyc
npm run atlas:knowledge -- --id CLM-WATERWAYS-RAFT-EXPEDITION
npm run atlas:explain -- --project callnyc
```

The generated graph is disposable. Markdown, the typed knowledge bank, the
frozen branch manifest, the federated source catalog, and the named stakeholder
credit register bind the candidate. Protected locators remain hashed.
