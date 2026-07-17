# Composite Integration Maintenance

**Owner:** Jamie Burkart

**Active-change cadence:** Run the complete repository check before every pull-request update. Review this governance layer monthly while the portfolio is actively changing.

**Change trigger:** Rerun after any change to claims, sources, routes, public copy, build or deployment configuration, resume assets, policies, evals, or release state.

## Routine

1. Commit the candidate without run artifacts.
2. Run `npm run check:composite-integration -- --write-run evals/composite-integration/runs/<unique-name>.json` twice. Run records are immutable and preserve failures as well as passes.
3. Confirm both passing records bind the same candidate commit and full repository-input fingerprint.
4. Commit the run records without changing candidate inputs.
5. Run `npm run check`, staging and production preflights, container smoke checks, responsive browser QA, compiled-output privacy checks, and resume inspection.
6. Keep application eligibility separate from production approval. Record human observations only after the named humans complete them.

## Drift Controls

- Candidate identity covers every tracked or unignored repository file except immutable scorecard runs and ephemeral generated reports/build output.
- The normal composite check requires two committed passing holdouts for the unchanged candidate. `--write-run` is the only bootstrap path and never overwrites an existing record.
- The scorecard schema is executable validation, not documentation only.
- Exact-route bindings must resolve existing source files, active claims, and proof surface permissions.
- Publication-safe queries omit internal formulations, pending intake, held or inferential claims, protected evidence, and research inquiries.

When the system becomes burdensome, remove duplication before weakening a boundary or human gate.
