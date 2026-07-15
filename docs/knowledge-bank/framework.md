# Knowledge Development Framework

The knowledge bank is a place and a process. It preserves more evidence and
claim depth than the public portfolio should display at any one time.

The operating rule is:

> Capture generously. Research rigorously. Promote deliberately. Compose
> selectively. Preserve provenance throughout.

## Layers

1. **Intake item** - the public-safe receipt for a URL, memory, metric,
   document, photograph, repository, or proposed claim.
2. **Source** - a canonical artifact record with provenance, preservation
   status, public citation, supported scope, and explicit limits.
3. **Observation** - one atomic, source-linked paraphrase of what an artifact
   demonstrates. Observations are not automatically claims.
4. **Claim** - a proposition assembled from one or more observations and
   evidence relationships, with status, boundaries, anti-claims, and possible
   projections.
5. **Research inquiry** - an inspectable question, method, finding set, and
   limitation set. An inquiry may be queued before research begins.
6. **Projection** - selected wording for a particular surface. A defensible
   claim may remain knowledge-bank-only indefinitely.

Canonical structured records live in
`apps/www/src/data/knowledge-bank/records.ts`. Human-readable intake receipts
and project dossiers live under `docs/knowledge-bank/`.

## Lifecycle

### 1. Capture

Create an intake item immediately. A fragment does not need to arrive as a
finished claim. Record a public-safe summary, likely projects, and the next
research action. Keep private raw material outside the public repository.

### 2. Triage

Classify each item as a URL, memory, metric, document, photograph, repository,
or claim. Determine whether it can be represented publicly, only by metadata,
or only through a protected locator outside the repo.

### 3. Inspect Sources

Create one source record per artifact. Record what the source supports and what
it does not establish. Prefer primary government or institutional records for
formal outcomes and independent reporting for role attribution and context.

For collaborative workspaces such as Shared Drives, treat access and artifact
presence as research leads rather than authorship. Keep workspace names, file
metadata, collaborators, raw structures, and contents outside the public repo
unless they are independently public and necessary. Establish role, authorship,
rights, consent, adoption, and outcomes as separate propositions.

### 4. Decompose

Write atomic observations. Separate direct action, collective accomplishment,
formal outcome, later consequence, and causal inference. Do not make one source
carry more of the argument than it can support.

### 5. Develop Claims

Connect observations into bounded claims. Use the strongest wording the
evidence supports. Mark unresolved propositions as inference and attach a
research inquiry rather than polishing uncertainty out of the sentence.

### 6. Promote

A claim may become eligible when:

- its source records are public-safe and inspectable;
- direct-role language has direct or strong corroborating support;
- collective outcomes preserve collective credit;
- causal language does not exceed the evidence;
- boundaries and anti-claims are explicit;
- Chad's lens is satisfied without weakening public safety.

Eligibility does not require website publication.

### 7. Compose

The website, resume, application, proposal, and photo brief are purpose-built
projections. They select from the bank according to audience and moment. A
claim's absence from the website is a compositional decision, not archival
erasure.

### 8. Re-enter

New evidence may strengthen, split, qualify, contradict, or retire a claim.
Run the lifecycle and recursive evals after every material change.

## Photo Feedback Loop

A photograph may serve four distinct roles:

- **evidence** of a person, place, object, action, or sequence;
- **artifact** produced by or within the project;
- **projection candidate** for a page, caption, or photo brief;
- **research lead** that reveals something worth identifying or corroborating.

Photo-editor annotations return to intake. They do not become facts
automatically. Record rights, consent, provenance, and public-display status
before a photograph or `photo-caption` projection can be promoted.

## Agent Receipt

Every ingestion pass should report:

- intake items created or updated;
- sources inspected;
- observations extracted;
- claims created, strengthened, held, or retired;
- research inquiries opened or advanced;
- projection decisions;
- website changes, including an explicit statement when there were none;
- eval results and remaining limitations.

Run:

```sh
npm run knowledge-bank:status
npm run evals:knowledge-lifecycle
npm run evals:recursive
```
