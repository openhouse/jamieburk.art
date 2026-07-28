# Cost-aware evaluation ladder

The evaluation system protects a public portfolio and a governed knowledge
base. Its cost should buy evidence, not repetition.

## Contract

1. **Iteration uses affected-domain checks.** Changed paths select
   deterministic safety, Knowledge Wiki, photo-governance, or public-site
   suites.
2. **Unclassified and release-critical changes fail upward.** Dependency,
   deployment, workflow, routing-gate, public-safety-gate, or unknown paths
   select the complete release gate.
3. **Release uses the complete gate once.** `npm run check:release` remains an
   alias for the unchanged `npm run check`.
4. **Human gates are never automated away.** Rights, consent, exact credit,
   crop, caption, public claim approval, hands-on QA, production cutover, and
   indexing remain separate decisions.
5. **A changed candidate invalidates candidate-bound evidence.** Browser
   matrices, fingerprints, holdouts, and human review must bind to the same
   unchanged candidate they assess.

## Commands

```sh
npm run report:affected -- --base origin/develop
npm run check:affected -- --base origin/develop
npm run check:release
```

The report prints the changed-path population, selected domains, commands, and
reasons before execution.

## Why this is lossless

The affected path router changes when a suite runs during iteration, not what
the suite checks. The complete release command is preserved. Conservative
fallbacks widen evaluation whenever the mapping cannot safely narrow it.

The photo-history evaluator separately avoids reading files that its own
public-boundary contract excludes. It filters Git history to governed
photo/Wiki/public-projection paths before materializing file contents; the
boundary and candidate set are unchanged.

Browser evidence uses a versioned public-surface fingerprint. It hashes every
tracked or unignored file under `apps/www`, the complete lockfile, and a
runtime projection of the root package manifest: workspace topology, engines,
dependencies, overrides, resolutions, package manager, and the
`build`/`dev`/`start` scripts. Research, archive, and evaluation-only command
aliases do not invalidate a browser matrix when the render-affecting surface is
unchanged. Runtime dependencies, build commands, app files, and public assets
still invalidate it immediately.

## Freshness and expense

Cheap deterministic checks should run often. Candidate-bound browser captures
and independent model judgments should run after the public candidate has
stopped changing, then be invalidated if it changes again. Recording why a
suite ran is part of the evidence.
