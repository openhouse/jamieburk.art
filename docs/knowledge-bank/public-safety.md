# Public Safety

The knowledge bank is public-safe, not private. It may describe defensible
professional claims, evidence posture, public wording, guardrails, and protected
boundaries. It must not contain raw source material.

## Scanner Model

`npm run public-safety` is the canonical public-safety gate. It calls
`npm run knowledge-bank` through `scripts/check-knowledge-bank.mjs`, then checks
production-facing content, contact and resume readiness, indexing policy,
secrets, committed private paths, and font-file hygiene.

`npm run check` runs the application checks, the knowledge-bank checker, the
public-safety checker, and route checks.

## Prohibited Materials

Do not commit raw transcripts, private correspondence, private coalition notes,
legal-review materials, client-private documents, raw community records,
unapproved screenshots, unapproved photos, unapproved quotes, credentials,
private stakeholder lists, internal analytics, private font files, or raw
spreadsheets with private rows.

## Public Routes

There is intentionally no public `/proofs`, `/knowledge-bank`, or
`/public-claims` route. The site should remain a composed portfolio.

## Production Review-Marker Behavior

Production-facing content must not render visible approval markers. When a claim
needs approval, put the issue in `docs/knowledge-bank/launch-blockers.md` or keep
the claim out of public projection until it is reviewed.

## Source Handling

Private sources may support a public-safe claim, but the private source itself
stays outside the repo. Describe aggregate patterns, approved public artifacts,
and public-safe summaries rather than private record inventories.

People associations, face detection, project-album membership, filenames, and
embedded dates are retrieval cues, not publication approval. Every proposed
image needs asset-specific identity, project, date, creator, rights, consent,
caption, crop, and contextual review before it reaches the public site.
