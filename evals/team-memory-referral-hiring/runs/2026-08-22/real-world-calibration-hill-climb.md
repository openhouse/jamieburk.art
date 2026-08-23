# Team-memory referral eval — real-world calibration hill climb

Date: 2026-08-22

## Purpose

Use the minimum professional signal from a later private response to calibrate
the referral-hiring simulation without placing correspondence, identity, or
personal context in the repository or evaluator packet.

## Evidence state

Observed:

- a response was received;
- the reception was positive; and
- the respondent expressed interest in reconnecting.

Not observed or still unknown:

- whether the linked page was opened;
- whether the proposal was read or evaluated;
- whether a current organizational need was qualified;
- whether the respondent holds budget or hiring authority;
- whether an engagement was authorized; and
- whether any hiring decision was made.

The private message body, participant and company identity, and personal
circumstances are absent from this repository and are excluded from future
advisory-model packets.

## Failure mode and change

The earlier evaluator correctly labeled its result as an uncalibrated advisory
simulation, but it had no machine-readable real-world state against which to
catch later narrative escalation. A positive response could therefore be
retold as proposal readership or hiring progress without the evaluator
objecting.

The hill climb adds a deterministic response-state artifact and requires the
evaluator to reject that escalation. It also updates the Knowledge Wiki method
to distinguish immediate operating repair from durable memory work: when
ownership, priority, decisions, or next actions are unstable, those elements
must become usable before a memory layer can sustain them.

## Red-green evidence

- RED: the new regression failed because no calibration artifact or response
  state existed, and the protected opportunity record still treated a
  substantive response as unrecovered.
- GREEN: 8/8 referral-hiring tests passed after adding the minimal calibration,
  mutation rejection, protected-source update, and method refinement.
- The deterministic evaluator passed with `realWorldCalibrationPassed: true`.

The 2026-08-21 fictionalized hiring result was not rerun or relabeled as a real
prediction. It remains advisory, anonymized, synthetic, and uncalibrated.
