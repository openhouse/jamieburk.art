# Knowledge Wiki Pilot Schema

The executable schema lives in `scripts/lib/knowledge-wiki.mjs`. This page is
the human contract for the bounded foundation.

## Required Fields

- `wiki_record: true`
- `id`
- `title`
- `kind`
- `status`
- `visibility`
- `sensitivity`
- `projection_status`
- `discoverable`
- `last_reviewed`
- `review_state`
- `canonical_path`

Kind-specific records add fields such as `canonical_refs`, `allowed_surfaces`,
`rights_state`, `consent_state`, `knowledge_status`, `previous_claim`,
`corrected_claim`, `affected_surfaces`, and the governed opportunity fields
below.

## Stable Identity

IDs use lowercase letters, digits, dots, and hyphens. Paths, filenames, titles,
and headings may change; IDs remain stable.

## Kinds

The first controlled vocabulary includes project, person, organization, event,
place, source, asset, claim, research run or inquiry, decision, correction,
method, timeline, application, evaluation, index, glossary, anti-claim,
capability, opportunity, and projection.

Add a kind only when it has distinct validation and retrieval value.

## Lifecycle And Publication

Record lifecycle and public projection are independent. `maintained` does not
mean published. `ready` does not imply selected. A supported asset does not
become reproducible without cleared rights.

Everything in this repository is public regardless of frontmatter visibility.
Visibility records editorial and projection boundaries, not repository access.

## Relations

The pilot vocabulary is `part_of`, `informed_by`, `resulted_in`, `supports`,
`contradicts`, `supersedes`, `documents`, `mentions`, `participated_in`,
`organized_by`, `collaborated_with`, `uses_source`, `uses_method`, `has_asset`,
`located_at`, `projected_to`, and `related_to`.

Inverse views are generated. Do not maintain duplicate inverse edges merely for
symmetry.

## Governed Employment Opportunities

A live employment opportunity also records:

- `canonical_url`, `source_type`, `opportunity_status`, `verified_at`, and
  `reverify_by`;
- posted compensation and location without private application decisions;
- stable `role_requirements` with priority, source status, Wiki evidence,
  public evidence, gap type, and next action;
- title-blind `discovery_terms`;
- portfolio routes a real hiring reader can inspect;
- one-year success and risk conditions;
- unknowns and interview questions.

Live priority roles fail closed when their verification window expires. Closed
roles may remain historical benchmarks, but must not surface as current.

Role coverage uses these states:

`visible-proven`, `visible-qualified`, `visible-weak`,
`wiki-proven-not-projected`, `source-needed`, `corroboration-needed`,
`rights-blocked`, `experience-gap`, `hard-screen`, `unknown`, and
`not-applicable`.

These states are not a score. They distinguish missing public communication,
unfinished research, protected evidence, genuine experience gaps, and
application gates so the system can recommend the right next action.
