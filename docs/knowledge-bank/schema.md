# Knowledge Wiki pilot record contract

The Knowledge Wiki currently lives at the compatibility path
`docs/knowledge-bank`. Governed records begin with YAML frontmatter and remain
understandable as ordinary Markdown documents.

## Shared required fields

```yaml
id: project.callnyc
title: CallNYC
kind: project
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-07-18
canonical_path: docs/knowledge-bank/projects/callnyc.md
summary: A bounded public-safe orientation sentence.
```

Active records use a stable ID independent of the file path. Supported lifecycle
values are `inbox`, `draft`, `maintained`, `governed-open`, `superseded`,
`archived`, and `retired`.

Visibility describes editorial use, not repository secrecy:

```text
public
public-safe
summary-only
internal
restricted
private
permission-required
```

Everything committed to this public repository must remain public-safe.

## Typed relations

```yaml
relations:
  - type: informed_by
    target: event.nycc.constituent-services-hackathon.2016
    href: ../events/nycc-constituent-services-hackathon-2016.md
    context: The event established the project context.
```

The initial relation vocabulary is:

```text
part_of, informed_by, resulted_in, supports, contradicts, supersedes,
documents, mentions, participated_in, organized_by, collaborated_with,
uses_source, uses_method, has_asset, located_at, projected_to, related_to
```

`target` provides stable machine meaning. `href` provides ordinary human
navigation. Both must resolve to the same governed record.

## Claims and evidence

Claim pages use bounded propositions and explicit evidence relationships:

```yaml
evidence:
  - target: source.politico.callnyc.2016-03-14
    relationship: direct-support
    confidence: high
    supports:
      - Jamie's independent development of CallNYC
```

Claims may also carry `anti_claims`, boundaries, and a projection object. A
`hold`, `disallowed`, protected, superseded, or rights-pending record cannot be
projected as active.

## Sources and assets

A source is the publication or artifact. An asset is a particular image,
graphic, document, audio file, or video. Evidence value and publication rights
are separate. Rights-pending assets stay metadata-only and must not contain a
private path or media payload.

Official job sources also record the state of the employer-controlled listing:

```yaml
source_kind: official-job-posting
url: https://example.org/jobs/role-id
retrieved_at: 2026-07-26
availability_state: available
availability_checked_at: 2026-07-26
```

`retrieved_at` records the most recent successful reading of the posting.
`availability_checked_at` records the latest official-source liveness check.
They may differ when a previously retrieved posting is no longer listed.
Opportunity freshness must match the official source's availability review. A
`live` opportunity requires `availability_state: available`; a closed
opportunity cannot retain that state. This keeps a date-only record edit from
turning stale external state into a current hiring claim.

## Wanted pages

`wanted` records name deliberate research needs without creating broken links.
`not-recovered` means a bounded search did not recover something. It never means
the thing did not exist.

## Situated source encounters

A `research-run` may record a dated return to original or near-original
material. The structured `source_encounter` contract records the reader,
question, access and materialization state for every source, prior readings,
new observations, changed interpretations, contradictions, limitations,
affected records, and actionable librarian requests.

Research authority and publication authority are separate required fields.
Authorization to inspect a source never grants permission to quote, reproduce,
attribute, or publish it. Contradictions remain explicit until a stronger
source or authorized human review resolves them.

## Working notebooks

A `notebook` is a public-safe editorial workspace for provisional observations,
questions, vocabulary, and experiments. It is not a source, claim, asset-rights
record, or public projection. Notebook records require a `notebook_state` and a
non-active projection boundary:

```yaml
kind: notebook
notebook_state: assembling
field_version: v01
target_population: 1000
current_population: 0
projection:
  status: hold
  surfaces: []
```

Population fields describe the governed working field, not a claim that an
archive search is complete. A notebook may link to source, asset, project, and
claim records, but its observations do not become evidence merely because they
were written down. Raw photographs, private source coordinates, people-tag
exports, face embeddings, and unreviewed identifying metadata remain outside
the public repository.

## Decision records

A `decision` is a bounded reconstruction of a consequential choice, not a
success story written backward. Decision records require:

```yaml
decision_period: 2016-03
decision_state: documented-with-boundary
decision_question: What needed to become usable, and for whom?
decision_actors:
  - Jamie as independent implementer
constraints:
  - The public data was difficult for residents to interpret directly.
options_considered:
  - option: Organize records as resident-facing issue pathways.
    disposition: chosen
    evidence_state: documented
  - option: Publish an undifferentiated mirror of the source data.
    disposition: not-observed
    evidence_state: not-observed
chosen_course: Build an independent interpretation layer around issue pathways.
resulting_artifacts:
  - project.callnyc
outcome_boundary: The surviving implementation documents the choice, not every deliberation that preceded it.
unknowns:
  - No complete contemporaneous product-decision log has been recovered.
credit_scope: individual
projection:
  status: hold
  surfaces: []
```

Every resulting artifact must exist and have a typed relation from the decision
record. Exactly one option is marked `chosen`. An alternative may be
`not-observed`; recording that absence is preferable to inventing a tradeoff.
Decision pages remain held until a separate editorial projection review.

## Generated files

Files under `_generated` and `reports/wiki-*` begin with a generated warning.
Regenerate them with `npm run wiki:graph` and `npm run wiki:report`; do not edit
them as authored records.
