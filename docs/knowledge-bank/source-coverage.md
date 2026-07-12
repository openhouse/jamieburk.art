# Public Proof Source Coverage

The canonical source-coverage ledger lives in
`apps/www/src/data/knowledge-bank/framework.ts`.

Every public proof ID has a coverage status:

- **Source-backed:** canonical sources and claim relationships are present.
- **Partially-backed:** some strands are canonical; additional role, metric, or
  outcome evidence remains open.
- **Research-needed:** the proof may remain public under its existing guardrail,
  but agents should continue converting approved resume, archive-summary, and
  public-artifact support into canonical source relationships.
- **Not-applicable:** reserved for non-factual interface or method statements.

Source debt is not permission to weaken an accurate claim automatically, nor to
invent support. Agents should prioritize metrics, ownership, causality, public
outcomes, and collaborator-sensitive claims, then record sources, boundaries,
and unresolved questions.
