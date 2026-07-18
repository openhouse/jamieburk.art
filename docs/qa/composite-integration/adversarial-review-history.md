# Adversarial Review History

The composite integration was not permitted to certify itself. Four clean,
read-only qualitative reviews attacked successive candidate commits before any
evidence-only commit was accepted. Each review reproduced the candidate
identity, ran relevant checks, constructed adversarial mutations, and returned
`FAIL` with no P0 finding but blocking P1 enforcement defects.

These rejected candidates remain part of the decision record. Their failed
bootstrap runs were not committed as release evidence.

## Review 1

- Candidate: `22b33ca7f36a299d0b718b5e18950f354abac3b6`
- Verdict: `FAIL`
- Principal findings: candidate identity and holdouts were not enforced;
  publication-safe tools failed open; active collective projects escaped the
  credit registry; proof provenance and surface approval were not resolvable;
  several quality gates were presence checks; human-gate registries drifted.
- Response: bind scores to a full repository-input fingerprint and clean
  candidate, make run records immutable and schema-checked, classify active
  collective projects, use structured source and claim IDs, constrain public
  output, execute underlying quality programs, and align human-gate records.

## Review 2

- Candidate: `f458771c680ba17a72db2ebfdc1b8cb949d95281`
- Fingerprint:
  `da33663c1f18788b57034029d0608df8d94cf6d30e9210b84fe1cc22eeeaa903`
- Verdict: `FAIL`
- Principal findings: credit coverage still omitted active projection
  projects and accepted nonsense; public-safe queries leaked unrelated and
  protected records; route checks skipped public pages; protected and held
  evidence could be selected; scorecard schema enforcement was incomplete;
  human owners and non-self-certification were not compared exactly.
- Response: derive policy coverage from active claims, build publication-safe
  query results from closed allowlists, validate every registered route,
  require active route-specific claim approval, validate the full scorecard
  contract, and require exact rubric/release human-gate agreement.

## Review 3

- Candidate: `b3a01c8812b61eb31a2478c0d617ba5e54914b13`
- Fingerprint:
  `ae71999c72f1f7142152c35d8f59944354d39bf3d5aee25fab994ab31058d57c`
- Verdict: `FAIL`
- Principal findings: internally contradictory scorecards could be forged;
  intake and source output missed identifiers and health data; credit policy
  validation did not apply semantic overclaim detection; the route universe
  was hardcoded and accepted hollow metadata; proofs were not bound to claims
  on the selecting route; donor, evidence, corpus, and correction checks were
  partly presence-only; candidate exclusions were too broad; the intake CLI
  treated `--write false` as write mode and accepted hollow receipts.
- Response: recompute and cross-check scorecards, strengthen sensitive-data
  rejection and receipt substance, apply semantic risk checks to credit
  policy, discover routes from the App Router, require exact proof-to-claim
  route bindings, execute and structurally validate underlying evidence gates,
  narrow evidence exclusions, and make CLI write intent unambiguous.

## Review 4

- Candidate: `8b14fad7d64a81087c17e6b98f9fcaaf411777bd`
- Fingerprint:
  `8937571f92aa9b2920187901ba8476d990300b0dcbc4b7bd255c5a2653de29fe`
- Verdict: `FAIL`
- Principal findings: invalid query flags could silently return internal data;
  sensitive health, identifier, credential, and address variants passed intake;
  non-TSX Next pages escaped route discovery; proof selection could bypass
  surface authorization; citation-required claims could lack renderable
  evidence; route queries returned projections from other surfaces; policy and
  evidence semantics remained lexically gameable; stored scorecards were not
  compared with fresh evaluator output; and prior run files could be rewritten.
- Response: make publication-safe query behavior the default and raw output
  explicit, reject ambiguous flags and additional sensitive classes, bind
  route query output to route manifests, discover every configured page
  extension, forbid proof selection on unclassified surfaces, require
  renderable public evidence for required citations, version policy and eval
  content with SHA-256 contracts, recompute holdout results, and permit
  evidence commits to add but never modify run files.

## Acceptance Rule

A later candidate may proceed to evidence runs only when a fresh independent
review returns no P0 or P1 enforcement defect. Two committed, schema-valid
passing scorecards must then bind the same unchanged candidate commit and
fingerprint. Those machine results do not close any human gate or authorize a
production launch.
