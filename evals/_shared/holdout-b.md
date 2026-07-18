# Independent holdout B

Review the frozen candidate as a skeptical evaluation engineer and archival
systems reviewer. Do not inspect run records, QA reports, generated reports, or
prior scores. Do not edit the candidate.

Return a `reviewerProvenance` object that identifies this as a `model-context`,
names the tool provider and tool-issued session UUID, binds the exact candidate
commit, candidate tree, governed-input digest, independently computed review-
bundle digest, and this prompt path, records an ISO timestamp, labels the
assurance `self-attested-model-context`, and attests that prior scores, run
records, generated reports, and edits were not part of the review. Compute the
review-bundle digest with `node scripts/digest-review-bundle.mjs --root
<review-bundle>`. This is context separation, not cryptographic proof of human
identity, provider identity, or human approval.

Apply all ten launch-readiness criteria using their frozen definitions, floors,
weights, and anchors. Attack score and command validation, pass sequencing,
reviewer identity, candidate reuse, Unicode and private-path bypasses, registry
drift, protected citations, duplicate intake, report self-reference, and model
authority over human gates. Cite concrete file or route evidence. Acceptance
means ready for pull-request review, never production approval.

Return all ten criterion scores, blocking findings, disagreements, and the full
seven-dimension decision record, authority log, five reopen triggers, reopen and
disagreement reviews, and structured overrides required by the Warren Sack lens.
Every authority entry must include a structured `humanDecision` and
`humanDecisionEvidence`; use `not-invoked` and `[]` unless concrete public-safe
human evidence in the allowed bundle establishes another state.
An accepted judgment must have no blocking findings. A human refusal remains a
refusal even when the numerical score passes.
