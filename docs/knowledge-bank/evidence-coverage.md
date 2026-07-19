# Existing proof-claim evidence coverage

**Reviewed:** 2026-07-12

Every structured claim in `apps/www/src/data/proofs.ts` now has a canonical
coverage disposition in `apps/www/src/data/knowledge-bank/proof-coverage.ts`.

Coverage status is not claim truth status:

- **source-backed:** normalized public sources support the consequential claim;
- **partially-source-backed:** useful public evidence exists, but metrics,
  authorship, chronology, or broader scope still need research;
- **resume-backed:** approved professional wording is available, while project
  component claims should continue to mature independently;
- **protected-support:** the public wording is approved and carefully bounded,
  but supporting records should remain private;
- **research-needed:** the claim remains in the bank with a concrete next source
  action rather than being silently dropped or prematurely promoted.

The current ledger covers all 15 proof claims. It does not mean every claim
should gain a visible citation or appear on the present site. It gives future
agents an explicit research queue and prevents an existing public claim from
falling outside the source-backed maintenance system.
