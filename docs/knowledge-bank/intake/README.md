# Intake

This directory holds public-safe receipts for new evidence, memories, metrics,
documents, photographs, repositories, and candidate claims.

Do not paste private correspondence, raw transcripts, private filesystem paths,
credentials, unapproved participant names, or sensitive photo metadata into an
intake packet. Keep raw private evidence outside the public repository and use a
protected locator only in the canonical structured registry.

## Agent Workflow

When Jamie supplies material:

1. Create or update an intake packet.
2. Add canonical source records for public artifacts.
3. Close-read sources into atomic observations.
4. Create or update bounded claims.
5. Open research inquiries for unresolved identity, metric, chronology,
   attribution, or causality questions.
6. Record the projection decision, including `knowledge-bank-only`.
7. Run the lifecycle, citation, public-safety, Chad-lens, and recursive evals.
8. Return an ingestion receipt.

Begin with a dry-run public-safe receipt when the material is a new lead:

```sh
npm run knowledge:intake -- \
  --title "Public article about a project" \
  --kind url \
  --project callnyc \
  --url "https://example.org/article" \
  --summary "Public article to close-read for bounded role and outcome claims."
```

Review the JSON, then append it with the same command plus `--write`. The
receipt log is append-only; corrections and maturation happen in canonical
records, not by silently rewriting the received lead. The command rejects
common private paths, email addresses, phone numbers, credentials, signed or
secret URL parameters, and explicit legal, stakeholder, health, or financial
detail. Regex guards are not a substitute for human review: if a summary would
be harmful in a newspaper, do not write it to this public repository.

Query the canonical lifecycle without adding a public database route:

```sh
npm run knowledge:query -- --project callnyc --publication-safe
npm run knowledge:query -- --surface /work/callnyc --claim-status confirmed-with-boundary --publication-safe
npm run knowledge:query -- --entity "New York City Council" --date 2016-05-03 --publication-safe
npm run knowledge:query -- --evidence-role corroborating --audience hiring --purpose evidence --publication-safe
```

`--publication-safe` is allowlisted: it returns only eligible or projected
intake, public or public-metadata sources, verified observations, bounded
public claim statuses with active projections, and public evidence fields. It
omits pending or knowledge-bank-only leads, internal claim formulations,
protected evidence, held or inferential claims, and research inquiries.

For a photograph, record its role as evidence, artifact, projection candidate,
or research lead. Do not create a `photo-caption` projection until rights,
consent, identity, provenance, and public-display status have been reviewed.

## Packet Template

```md
# Intake - <short title>

**Received:** YYYY-MM-DD
**Intake IDs:** `INTAKE-...`
**Projects:** `project-id`
**Research status:** Captured / Triaged / Researched / Needs more research
**Publication status:** Pending / Knowledge-bank-only / Eligible / Projected / Private

## Inputs

- URL, public-safe memory summary, metric description, or protected-source class

## Sources Registered

- `SRC-...` - source and scope

## Observations

- `OBS-...` - atomic paraphrase

## Claims

- `CLM-...` - status and boundary

## Research Queue

- `INQ-...` - question and next method

## Projection Decision

State where the material may be used now and where it must not yet appear.

## Receipt

Summarize what matured, what remains open, whether the website changed, and
which evals passed.
```
