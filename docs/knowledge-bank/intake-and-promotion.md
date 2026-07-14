# Intake and Promotion

The knowledge bank is a public-safe storehouse, research workbench, claim
registry, and projection source. It is not a public mirror of Jamie's private
archive and it is not a queue in which every item must become website copy.

## Four Rules

1. Nothing potentially meaningful is silently lost at intake.
2. Nothing becomes a claim before a source relationship earns it.
3. Nothing becomes public merely because it is public-safe.
4. Nothing becomes part of a current composition without an audience and
   purpose.

"Nothing lost" applies to the capture record. Raw private archives, private
paths, unapproved photographs, correspondence, credentials, personal records,
and sensitive working material stay outside this public repository.

## Lifecycle

```text
capture -> source -> observation -> claim -> projection
      \          \          \          \
       research task         boundary   correction
```

### Capture

A capture is the smallest public-safe record that something deserves
attention. It may be a URL, memory, artifact, possible metric, correction, or
photo lead. A capture is not proof.

Every capture records:

- who submitted it and when;
- a public-safe summary;
- possible projects and claim families;
- its disposition;
- normalized sources, observations, or research tasks that continue the work.

### Source

A source record normalizes creator or publisher, title, date, URL or protected
locator, preservation state, public citation, general affordances, and explicit
limits. An inaccessible URL remains a capture with a retrieval task. Agents do
not infer article contents from headlines or snippets.

### Observation

An observation says what one source directly says, attributes, displays, or
records. It includes a locator, confidence, and at least one limitation. One
source may afford many observations; one observation should not smuggle in an
entire career narrative.

### Claim

A claim synthesizes observations into a proposition. Claims separately record:

- `epistemicState`: unreviewed, sourced, corroborated, contested, or disproven;
- `publicationState`: private, restricted, public-safe, or approved;
- `selectionState`: dormant, candidate, selected, or retired;
- evidence relationships, boundaries, anti-claims, review history, and
  purpose-specific projections.

These axes must remain independent. A sourced claim may remain restricted. An
approved claim may remain dormant. A candidate may be worth significant
research without being ready for any page.

### Research Task

A task turns uncertainty into bounded work. It names a question, priority,
source and claim context, success criteria, next actions, owner, and current
status. Tasks preserve high-value possibilities without laundering them into
facts.

### Projection

A projection is exact wording selected for a particular surface. The public
website, resume, application packet, biography, proposal, and photo-editor
brief may select different projections from the same claim. No source or claim
automatically creates public copy.

## Promotion Gate

An agent may promote a claim only when:

1. the relevant capture is routed;
2. the source is normalized and public-safe or protected appropriately;
3. source observations are atomic, located, and limited;
4. the claim's evidence relationship matches those observations;
5. collective credit and causality are calibrated;
6. publication clearance is explicit;
7. the selected wording names its intended surface;
8. deterministic validation and a reviewer independent of the editing pass
   accept the candidate.

Memory is always welcome at intake. Memory alone does not satisfy promotion.

## Agent Contract

- Preserve "not recovered" as distinct from "did not exist."
- Preserve direct action as distinct from collective contribution, public
  outcome, and causal influence.
- Never let the optimizer grade its own patch.
- Keep the rubric frozen during one recursive run.
- Record failed and rejected iterations, not only the final score.
- Use correction records rather than silently rewriting history.
- Audit strong claims already on public surfaces for missing citation paths.
- Keep the public citation layer calm and progressively disclosed; source
  traceability may be machine-readable without dominating the page.

The executable criteria live in
`.agents/evals/knowledge-development.json`. Run them with:

```bash
npm run evals:knowledge
npm run test:knowledge-evals
npm run run:knowledge-development -- --judgments path/to/judgments.json
```
