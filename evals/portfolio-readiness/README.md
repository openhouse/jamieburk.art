# Portfolio Readiness Evals

This suite expresses the portfolio's editorial, hiring, public-safety, and
production intentions as repeatable evaluations for human and LLM agents.

It has two layers:

- deterministic gates test facts the repository can decide directly;
- scored criteria test rendered clarity, credibility, reader effort, narrative
  finish, accessibility, and contextual integrity.

Run the fast loop while editing:

```sh
npm run eval:portfolio -- --profile fast
```

Write the deterministic result for a judge or CI artifact:

```sh
npm run eval:portfolio -- --profile fast --output /tmp/portfolio-eval.json
```

Use `judge-prompt.md` and `scorecard.schema.json` to create a JSON scorecard,
then validate and calculate its weighted score:

```sh
npm run eval:portfolio -- --profile fast --scorecard path/to/scorecard.json
```

Before a release decision, run the complete build and environment gates:

```sh
npm run eval:portfolio -- --profile release \
  --scorecard path/to/scorecard-a.json \
  --confirming-scorecard path/to/scorecard-b.json
```

`--skip-commands` is useful only for inspecting or comparing scorecards. Skipped
gates fail closed and can never satisfy the stop condition.

The target is not a perfect model score. The target is all deterministic gates
passing, a weighted score of at least 90, every criterion at least 4, two stable
passing runs, and explicit human approval before production.

See `agent-loop.md` for the recursive improve-measure-accept procedure.
