# Governed audio-to-knowledge workflow RFC hill climb

## Decision

The exact public-safe RFC 0013 candidate is ready for Jamie Burkart's review.
It remains `proposed`: the runtime is not implemented, and this RFC does not
authorize an upload, transcription job, speaker assignment, graph promotion,
publication, deployment, merge, contact, or deletion.

## Exact candidate

- RFC: `rfcs/0013-governed-audio-to-knowledge-workflow.md`
- Contract: `rfcs/0013-governed-audio-to-knowledge-workflow.contract.json`
- Provisional cases:
  `evals/knowledge-bank/audio-to-knowledge-workflow-rfc-evals.json`
- Evaluator: `scripts/rfcs/audio-to-knowledge-workflow-eval.mjs`
- Focused regressions:
  `scripts/rfcs/audio-to-knowledge-workflow-eval.test.mjs`,
  `scripts/rfcs/audio-to-knowledge-workflow-rfc.test.mjs`, and
  `scripts/rfcs/audio-to-knowledge-revisit-queue-rfc.test.mjs`
- Candidate SHA-256:
  `64a6c0ecedcec49ee89f23dbca796478927e13cdcc7fa43a54bd743ab10e1dec`

The candidate fingerprint binds the RFC, contract, case suite, evaluator,
regressions, package commands, RFC checker, and index. Changed candidate bytes
invalidate this receipt.

## Problem observed

Audio work had been expressed across call-specific preservation, provider,
repair, and Knowledge Wiki practices without one resumable state machine. That
left recurring risks: a fragment could be omitted, a provider panel could be
mistaken for a collected export, diarization could be mistaken for identity,
repair could silently exceed the evidence, and private interpretation could be
collapsed into a public claim.

Historical discovery created a second risk. A useful lead could be lost, but a
queue could also become an unauthorized processing order or disclose private
record counts. The reconciled candidate therefore treats discovery as a
body-free, private, dispositioned planning layer rather than authorization.

## Kept change

The proposal now specifies one provider-adaptable ten-stage workflow:

1. intake;
2. inventory;
3. preservation;
4. preparation;
5. transcription;
6. diarization;
7. repair;
8. close reading;
9. projection; and
10. verification.

Each stage is receipt-bound, resumable, and invalidates dependent receipts when
its inputs change. Source originals, provider inputs, exact provider returns,
machine output, conservative repair, private close reading, graph candidates,
and public projection remain distinct artifact classes. Human review and
authority gates remain explicit.

The historical revisit queue adds five explicit dispositions, requires a method
version, evidence basis, dependencies, and a defect-specific revisit trigger,
and prohibits a priority score from authorizing source access, preservation,
external transfer, transcription, voice-reference use, quotation, contact, or
publication.

## Provisional evaluation

The evaluator ran 23 visible development cases:

- 1 complete private workflow eligible for private Knowledge Wiki review;
- 10 incomplete or stale states that must hold; and
- 12 forbidden states that must be denied.

Observed result:

- deterministic hard checks: 14 of 14 passed;
- development scenarios: 23 of 23 passed;
- focused regressions: 25 of 25 passed;
- implementation authorization: false;
- external-transfer authorization from the RFC: false; and
- publication authorization: false.

These labels were visible during development and are pending Jamie's review.
There is no independent human holdout, so the result establishes exact-candidate
contract conformance, not production transcription quality.

## Hill-climb interpretation

The retained candidate improves the governing model in four bounded ways:

- separates `hold` from `deny` rather than treating every failure alike;
- adds provider-neutral collection and exact-export custody;
- adds historical discovery without turning the queue into processing
  authority;
- replaces brittle remembered totals with candidate-to-summary consistency,
  the complete RFC disposition vocabulary, and a shared discovery cutoff; and
- evaluates uncertainty, repair lineage, public/private projection, retries,
  credentials, and human gates together.

No LLM judge is used because these are structural invariants. Narrative
faithfulness, usefulness, speaker recognition, and adoption remain human review
questions.

## Open validation

Before an operational runtime can be called reliable, add independently
reviewed natural holdouts for dropped calls, multiple fragments, crosstalk,
noise, speaker-count uncertainty, multilingual speech, code-switching, provider
interruption, partial exports, chunk overlap, later context corrections,
participant restrictions, source recovery, and downstream invalidation.

Run:

```bash
npm run hillclimb:audio-to-knowledge-rfc
```

A green run approves only the exact proposal for human RFC review.
