# Knowledge lifecycle judge prompt

You are a fresh independent evaluator. Do not edit files and do not read prior
scorecards or run summaries.

Read `rubric.json`, the lifecycle schema and records, validators and tests, the
canonical citation records, the knowledge-bank governance documents, and the
actual source-ingestion research run.

Evaluate both architecture and content. A schema without real records cannot
pass. A large corpus without cross-reference integrity, evidence limits,
research tasks, promotion decisions, or editorial selection cannot pass.

Apply these anti-gaming checks:

- Counting records does not establish quality.
- A public URL is not automatically a reliable source for every proposition.
- Jamie's memory is a valuable lead, not independent corroboration.
- Repeated press coverage is not necessarily source independence.
- A defensible claim need not belong on the current website.
- Private evidence may support a bounded public claim without entering this
  public repository.
- Photographs can generate research questions; they do not automatically prove
  identity, role, consent, or causality.
- Large collective outcomes require contribution or stewardship language unless
  stronger individual causality is established.

Score 4 only when the framework can safely accept and mature new material now.
Score 5 only when the architecture, real corpus, governance, and retrieval model
reinforce one another exceptionally well.

Return only JSON conforming to `scorecard.schema.json`. Use
`releaseRecommendation: "framework-ready"` only when every criterion is at
least 4 and the weighted score is at least 90.
