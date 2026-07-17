# Intake and Maturation

The knowledge bank is a place and a process. It can preserve more public-safe
professional knowledge than the website currently uses without turning the
website into an archive browser or claims database.

## Core Distinction

Nothing should be left unaccounted for. That does not mean everything should be
published, promoted, or committed to the public repository.

- Private source material stays outside git.
- A public-safe intake record can preserve the existence of a lead or memory.
- A source reading decomposes public evidence into atomic assertions and limits.
- Candidate claims can remain unresolved without disappearing.
- Canonical claims require a documented promotion decision.
- Editorial briefs select from canonical claims for a specific audience and
  purpose.
- The public site projects only the selected subset.

## Lifecycle

```text
Capture
  -> triage
  -> source record
  -> close reading
  -> candidate claim
  -> research and corroboration
  -> promote, hold, reject, or retire
  -> editorial selection
  -> public projection
  -> correction or renewed research
```

`Eligible but unselected` is a successful state. A claim can be defensible and
useful in the bank without appearing on the current website.

## Canonical Collections

The machine-readable registry contains:

- `intakeItems`: public-safe URLs, memories, claims, artifacts, repositories,
  and photo leads entering the system;
- `sourceReadings`: atomic assertions, locators, confidence, limitations,
  entities, themes, and candidate-claim relationships;
- `candidateClaims`: captured, research-needed, partially supported, promotable,
  promoted, held, contradicted, or retired propositions;
- `promotions`: explicit promote, hold, and reject decisions;
- `editorialBriefs`: audience-specific selection and restraint;
- `discoveryNotes`: findings from photo editors, archive review, agents, and
  collaborators that feed back into research.

These sit upstream of the existing source, evidence, canonical-claim, inquiry,
correction, projection, and citation-page records.

## Agent Intake Protocol

When Jamie supplies a URL, memory, artifact, repository, or possible claim:

1. Create a public-safe intake item. Never copy private source content into the
   public repo.
2. Preserve the source URL, access date, authorship, organization, publication
   date, preservation status, and a newspaper-safe summary.
3. Read the source closely and extract atomic assertions with locators.
4. Record both what the source supports and what it does not establish.
5. Associate the reading with projects, people, dates, places, and themes.
6. Create or update candidate claims. Keep memories visible as research leads
   even when public evidence is incomplete.
7. Search for corroborating, contextual, contradictory, and boundary evidence.
8. Promote only wording supported by the evidence relationships and stated
   boundaries.
9. Record why stronger wording was held.
10. Use an editorial brief to decide whether the promoted claim belongs on the
    current public surface.
11. Regenerate citations and rerun the lifecycle, Chad-lens, public-safety,
    route, staging, and production checks.

## Photo Feedback

Photo selection is both editorial and evidentiary. A photo brief should be able
to ask for visual sequences related to a claim, missing evidence, participant
role, place, date, or operating pattern. Editors can return a `discoveryNote`
when the visual record suggests a new source, person, event, chronology, or
candidate claim.

Rights, consent, identity, and public-display review still govern whether an
image can appear publicly. A photograph may support research while remaining
metadata-only or held.

## Eval

Run:

```bash
npm run check:knowledge-lifecycle
```

The lifecycle eval requires intake coverage, close readings, explicit
dispositions, unresolved-claim retention, promotion lineage, editorial
selection, photo feedback, rendered citation plans, and public restraint. It is
part of both `npm run check` and `npm run check:evals`.
