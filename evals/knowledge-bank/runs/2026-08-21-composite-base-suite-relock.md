# Composite base-suite re-lock — 2026-08-21

Jamie explicitly authorized re-locking the composite release evaluator to the
current portfolio suite and commissioning two replacement exact-candidate
holdouts before any commit, pull-request update, or staging-b deployment.

The portfolio suite changed after the prior composite freeze: photo metadata
was removed from the public surface, and the collective working-map requirement
was added. The re-lock preserves the current requirements; it does not remove or
weaken a criterion.

- Portfolio suite canonical SHA-256:
  `b1298fd2c13c8f852bdb9a05ff83f910411fcbd52f69d214b345a48c121d551f`
- Composite rubric SHA-256:
  `0ceae17652026856e816bf6472a4d55977145bd2977fc7e8c2fd7b362b0fc23b`
- Required next gate: two independent replacement holdouts for the final exact
  candidate fingerprint.
- Release boundary: production approval remains a separate human decision.
