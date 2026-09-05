# Governed audio-to-knowledge workflow RFC hill climb

## Decision

Jamie Burkart accepted RFC 0013 and authorized its implementation. The exact
public-safe candidate is now `implementing`, with a bounded command runner and
regression suite. This stage does not make the workflow operational by itself
and does not authorize an upload, source-access job, transcription job, speaker
assignment, graph promotion, publication, deployment, merge, contact, or
deletion; those authorities remain per-job or separately human-gated.

## Exact candidate

- RFC: `rfcs/0013-governed-audio-to-knowledge-workflow.md`
- Contract: `rfcs/0013-governed-audio-to-knowledge-workflow.contract.json`
- Provisional cases:
  `evals/knowledge-bank/audio-to-knowledge-workflow-rfc-evals.json`
- Evaluator: `scripts/rfcs/audio-to-knowledge-workflow-eval.mjs`
- Focused regressions:
  `scripts/rfcs/audio-to-knowledge-workflow-eval.test.mjs`,
  `scripts/rfcs/audio-to-knowledge-workflow-rfc.test.mjs`, and
  `scripts/rfcs/audio-to-knowledge-revisit-queue-rfc.test.mjs`, plus
  `scripts/audio-workflow/audio-workflow.test.mjs`
- Candidate SHA-256:
  `73e4a3ebd65122b51d9363380d682571d33879f8db5d58751fb2ed2e7c0737f2`

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

## Implementation evaluation

The evaluator ran 28 visible development cases:

- 1 complete private workflow eligible for private Knowledge Wiki review;
- 12 incomplete or stale states that must hold; and
- 15 forbidden states that must be denied.

Observed result:

- deterministic hard checks: 15 of 15 passed;
- development scenarios: 28 of 28 passed;
- focused regressions: 30 of 30 passed;
- implementation authorization: true;
- external-transfer authorization from the RFC: false; and
- publication authorization: false.

These labels were visible during development. There is no independent human
holdout, so the result establishes exact-candidate contract conformance and
runner behavior, not operational reliability or production transcription
quality.

## Hill-climb interpretation

The retained candidate improves the governing model in seven bounded ways:

- separates `hold` from `deny` rather than treating every failure alike;
- adds provider-neutral collection and exact-export custody;
- adds historical discovery without turning the queue into processing
  authority;
- replaces brittle remembered totals with candidate-to-summary consistency,
  the complete RFC disposition vocabulary, and a shared discovery cutoff;
- distinguishes cloud listing, confirmed emptiness, recovered-and-hashed
  private custody, and download timeout under a read-only fallback;
- distinguishes technical media readability from transcription completion,
  diarization, speaker review, and content certification; and
- evaluates uncertainty, repair lineage, public/private projection, retries,
  credentials, and human gates together.

No LLM judge is used because these are structural invariants. Narrative
faithfulness, usefulness, speaker recognition, and adoption remain human review
questions.

## Open validation

Before the implementing runtime can advance to `operational`, add independently
reviewed natural holdouts for dropped calls, multiple fragments, crosstalk,
noise, speaker-count uncertainty, multilingual speech, code-switching, provider
interruption, partial exports, chunk overlap, later context corrections,
participant restrictions, source recovery, and downstream invalidation.

Run:

```bash
npm run hillclimb:audio-to-knowledge-rfc
```

A green run verifies only the exact implementation candidate. It does not
satisfy any per-job source, transfer, speaker, publication, merge, or deployment
gate.
