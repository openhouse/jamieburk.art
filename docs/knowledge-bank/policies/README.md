# Knowledge-bank policies

These public-safe registries make two editorial contracts inspectable by people
and enforceable by agents.

- `collective-credit-policy.json` identifies projects whose claims always need
  collective-credit boundaries and the individual claim exceptions from mixed
  projects. A new collective project or claim must be added here before it can
  pass `KB-007`.
- `projection-surface-bindings.json` maps each approved public route to the
  source files that can render knowledge-bank projections there. An active
  route projection must use a literal `Claim` component or
  `getClaimProjection` call with the same claim ID, projection key, and surface
  in one of those files before it can pass `KB-009`.

The evaluator rejects missing policy targets, collective claims omitted from
the policy, duplicate projection keys, unknown routes, and known routes without
a matching source binding. Archive-note projections remain exact-text
contracts with their declared public knowledge-bank documents.
