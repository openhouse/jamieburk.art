# Knowledge-bank operations

The knowledge bank is both a repository structure and a recurring editorial
practice. These commands make that practice reproducible without exposing the
private archive or allowing an unreviewed fragment to become website copy.

## Daily sequence

1. Accession a fragment with a dry run.
2. Confirm the public-safe description and intended entities.
3. Write the receipt only when the description is safe.
4. Close-read the source and move it into canonical TypeScript records.
5. Add atomic propositions, evidence relationships, boundaries, anti-claims,
   and research tasks as appropriate.
6. Make a separate projection decision.
7. Remove or disposition the intake receipt through the canonical record change.
8. Run the knowledge report and all validation.

## Intake

Dry run is the default:

```bash
npm run knowledge:intake -- \
  --kind public-url \
  --title "Short public-safe source title" \
  --description "Why this may matter and what still needs review" \
  --url "https://example.org/source" \
  --entity "project-id"
```

After reviewing the dry-run receipt, append it to the queue with `--write`.
Supported intake kinds are:

- `public-url`
- `artifact-description`
- `public-memory`
- `correction`
- `source-lead`
- `photo-observation`

The repository check fails while an intake receipt remains undispositioned.
This is deliberate: the queue is a handoff surface, not a second knowledge
bank. Canonicalize the fragment into records, defer it through an explicit
research task, or reject it with a documented reason.

Never put raw private material, local paths, private filenames, transcripts,
emails, contact details, credentials, or unapproved personal information in an
intake description.

## Query

Query the public-safe graph without exposing protected locators:

```bash
npm run knowledge:query -- --type claim --project callnyc
npm run knowledge:query -- --type source --text "Council"
npm run knowledge:query -- --type task --status open
npm run knowledge:query -- --type decision --surface /work/callnyc
npm run knowledge:query -- --type anti-claim --text "official"
```

Filters can be combined. The command returns JSON so another agent can inspect
or transform the result reproducibly.

## Report

```bash
npm run knowledge:report
npm run knowledge:report -- --json
```

The report summarizes:

- graph population;
- source reading state;
- claim maturity;
- public-ready claims that are not projected;
- high-priority open research tasks;
- projection debt and active corrections; and
- undispositioned intake.

The default is a compact operating summary. Use `--json` for the complete
machine-readable queues and record details.

Counts are diagnostic, not impact claims. A large graph is not automatically a
strong portfolio.

## Validation

```bash
npm run check:knowledge-ops
npm run check:compiled-leaks
npm run eval:knowledge-lifecycle:gate
npm run eval:launch:gate
npm run check
```

`check:knowledge-ops` validates intake safety and blocks an undispositioned
queue. `check:compiled-leaks` scans built server and client output for protected
locator identifiers and local filesystem markers. The assessment gates verify
that qualitative judgments describe the same governed candidate and suite now
under review.

## Candidate snapshots

Before requesting a fresh independent assessment, commit the governed
implementation and run:

```bash
npm run eval:candidate:snapshot
```

Copy the matching suite snapshot into its assessment. A gate fails when the
commit, governed content fingerprint, or suite fingerprint is stale.

Assessment files, generated reports, integration notes, and pull-request prose
do not alter the governed fingerprint. Changes to application source,
knowledge-bank records and documentation, scripts, eval contracts, or package
manifests do.

## Semantic safety

The launch contract includes hostile mutations for recurring inference errors,
including endorsement, delivery, funding, population completeness, unique
engagement, authorship, permission, attendance, agreement, and human
validation. A public assertion or active projection that contains one of these
unsupported transformations fails the gate.

## Stop conditions

An agent may stop successfully when deterministic gates pass and a current
independent assessment reaches the required floors. The run must instead record
`stop_human_blocked` when the remaining action requires rights, consent,
collaborator-sensitive credit, factual corroboration, blind-reader response, or
production approval.

No agent may self-certify a named human gate.
