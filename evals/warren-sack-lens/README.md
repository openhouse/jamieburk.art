# Prof Warren Sack Lens eval

This suite asks whether the portfolio makes Jamie's recursive systems
intelligence legible across research, prototypes, interfaces, documentation,
and collective implementation.

Jamie Burkart and Codex derived this contemporary editorial instrument from
historical sources Jamie supplied. It is not written, approved, or currently
endorsed by Warren Sack.

Run deterministic checks while editing:

```sh
npm run eval:warren-sack-lens -- --profile fast
```

Validate two fresh scorecards at the exact revision:

```sh
npm run eval:warren-sack-lens -- --profile release \
  --scorecard path/to/scorecard-a.json \
  --confirming-scorecard path/to/scorecard-b.json
```

The criterion is met only when every gate passes and two distinct evaluators
score the lens at least 4 with stable `criterion-met` recommendations.
Production still requires Jamie's explicit approval.
