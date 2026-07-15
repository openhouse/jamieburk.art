# Blind Reader Protocol

## Purpose

Test whether a no-context human reader can understand Jamie's professional fit,
trace important claims, preserve collective credit, and find the next action.
This is an audience test, not a substitute for factual verification.

## Reader Independence

- Use a named human who did not implement or edit the release candidate.
- Do not brief the reader on intended conclusions, project history, or known
  weak spots before the session.
- Record the release commit, environment, reader role, date, task results, and
  concise observations.
- A reviewer may stop at any time and may decline public attribution.

## Task Procedure

1. Give the reader only the portfolio URL and one scenario from
   `blind-reader-scenarios.json`.
2. Keep the stated timebox. Do not explain the interface while the task runs.
3. Ask the scenario questions verbatim, then allow open comments.
4. Score each pass criterion as pass, fail, or not observed.
5. Separate comprehension defects from factual challenges, accessibility
   defects, taste, and job-specific preferences.
6. Store public-safe aggregate results under `reports/generated/`; do not commit
   private notes or identifying details without permission.

## Pass Criteria

- Every scenario is run with at least one eligible named human.
- The first-pass hiring scenario identifies Jamie's role, operating throughline,
  two concrete proofs, and a next action without coaching.
- The evidence scenario reaches an appropriate source or bounded source note.
- The credit scenario does not produce a materially stronger ownership or
  causality interpretation than the site states.
- The action-path scenario reaches work, resume, and contact without assistance.
- No critical privacy, safety, accessibility, or factual defect remains open.

## Privacy And Safety

Do not share private archives, authenticated sessions, raw correspondence,
unapproved photographs, hidden research notes, contact lists, or collaborator
records. The reader evaluates only the public release candidate. Reported
results should describe the observed task, not profile the reader.

## Human Gate

An agent may prepare the protocol, collect machine observations, and summarize
responses. Only the named human reader and Jamie may complete the
`blind-hiring-reader-validation` gate. Protocol completeness is not session
completion.
