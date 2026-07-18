# Prof Margaret Morse Lens eval

This suite asks whether the portfolio preserves the embodied artistic practice
that informs Jamie's systems work without sacrificing hiring clarity or public
safety.

Jamie Burkart and Codex derived this contemporary editorial instrument from
historical sources Jamie supplied. It is not written, approved, or currently
endorsed by Margaret Morse.

Run deterministic checks while editing:

```sh
npm run eval:margaret-morse-lens -- --profile fast
```

Validate two fresh scorecards at the exact revision:

```sh
npm run eval:margaret-morse-lens -- --profile release \
  --scorecard path/to/scorecard-a.json \
  --confirming-scorecard path/to/scorecard-b.json
```

The criterion is met only when every gate passes and two distinct evaluators
score the lens at least 4 with stable `criterion-met` recommendations.
Production still requires Jamie's explicit approval.
