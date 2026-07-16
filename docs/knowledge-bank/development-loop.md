# Knowledge Development Loop

The knowledge bank is a versioned evidentiary commons. It remembers public-safe
leads, develops defensible claims, preserves boundaries, and supplies selected
claims to public arguments. It is not a public dump of the private archive and
not a mirror of the portfolio website.

## Flow

`capture -> triage -> decompose -> connect -> research -> adjudicate -> mature -> approve -> project -> monitor`

### Capture

Create an intake record for every supplied URL, recollection, artifact lead,
photo observation, collaborator note, candidate claim, or research question.
Record who supplied it, when, the relevant project, and a public-safe summary.

Raw private material remains outside this repository. Use only an aggregate
summary or opaque protected locator when a private source matters.

### Decompose

A source is not one indivisible proof. Closely read it into atomic assertions:

- what it directly supports;
- what it corroborates;
- what it contextualizes;
- what it bounds;
- what it contradicts;
- what question it raises.

One source may support several claims. One claim may require several sources.
Supplying a URL does not make it evidence for the claim that prompted it.

### Adjudicate

Claim maturity is independent from projection eligibility:

- `research-needed`: an important lead with an actionable research path;
- `partially-supported`: some elements are evidenced, but the public sentence
  would still outrun the record;
- `confirmed`: direct evidence supports the proposition;
- `confirmed-with-boundary`: the proposition is supported when its explicit
  scope, collective-credit, or current-status boundary is preserved;
- `disallowed`: contradicted, unsafe, or structurally misleading.

Research-needed material stays on hold. Recollections can initiate research but
cannot independently confirm a claim.

### Project

Eligibility means a claim may be used. It does not mean it should appear now.
Every audience receives a composition made from the bank:

- portfolio and case studies;
- resume and application packet;
- interview preparation;
- collaborator verification request;
- photo-editor brief;
- future public argument.

The public citation layer should remain visually calm while preserving a
machine-checkable relationship between source, claim, projection, page
occurrence, and correction.

## Recursive Evaluation

Run:

```bash
npm run eval:knowledge-bank
npm run test:knowledge-development
```

The frozen suite lives at
`.agents/evals/knowledge-bank-development.json`. It checks intake coverage,
public safety, source decomposition, maturity integrity, graph integrity,
research discipline, collective credit, projection discipline, public-claim
coverage, and the photo-to-research feedback loop.

The optimizer addresses blocking failures first, makes the smallest coherent
change, re-runs all evals, and rejects regressions. Threshold requires two
consecutive passing runs. Human judgment remains necessary for factual
interpretation, collaborator-sensitive credit, editorial selection, and public
approval.

## Photo Feedback

A photo editor may identify an unfamiliar person, apparatus, gathering, place,
or recurring pattern. That observation enters as metadata-only intake and may
create a research task. It does not become a claim merely because a photograph
exists. Rights, consent, date, context, subject identification, and public
display all receive separate review before evidentiary or editorial use.
