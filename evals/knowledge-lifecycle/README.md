# Knowledge lifecycle eval

This suite evaluates the public-safe system that accepts fragments, decomposes
sources, develops candidate claims through research, promotes defensible claims
without automatically projecting them, and composes selective public arguments.
The social-archive criterion additionally requires authenticated collection
methods, deduplicated public interaction ledgers, lower-bound language,
collective-authorship restraint, and held administrator-history claims.
It also requires universal exact-surface authorization for active canonical
projections and Jamie-approved manifests for every rendered route and
downloadable proof destination. Consequential PDF wording must retain canonical
claim linkage, exact-destination approval, and deterministic artifact checks.

Run the deterministic loop:

```sh
npm run eval:knowledge-lifecycle -- --profile fast
```

Validate two fresh independent scorecards and the production gate:

```sh
npm run eval:knowledge-lifecycle -- --profile release \
  --scorecard path/to/scorecard-a.json \
  --confirming-scorecard path/to/scorecard-b.json
```

The framework is ready only when every criterion is at least 4, the weighted
score is at least 90, both judges recommend `framework-ready`, all deterministic
gates pass, and the pair is stable. Production still requires Jamie's explicit
approval.
