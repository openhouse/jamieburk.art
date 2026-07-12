# Chad Lens eval

This focused suite asks whether a busy application reader can understand
Jamie's action, practical end, usable result, and bounded role without decoding
the portfolio's internal language.

Run deterministic checks while editing:

```sh
npm run eval:chad-lens -- --profile fast
```

Validate two fresh scorecards:

```sh
npm run eval:chad-lens -- --profile release \
  --scorecard path/to/scorecard-a.json \
  --confirming-scorecard path/to/scorecard-b.json
```

The criterion is met only when all gates pass, both independent judges score at
least 4, the pair is stable, and both recommend `criterion-met`. Production
still requires Jamie's explicit approval.
