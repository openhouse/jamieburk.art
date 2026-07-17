# Blind-spot evaluation protocol

## Purpose

This protocol evaluates concerns the existing archive, code checks, and known
rubrics are structurally weak at observing. It does not treat a new criterion
as evidence that the underlying concern has been resolved.

## Observer integrity

| Layer | Who or what may observe it | What an agent may do |
| --- | --- | --- |
| Deterministic | Repository validator | Implement and run the check. |
| Browser | Instrumented browser reviewer | Prepare the build and capture protocol. |
| Semantic | Two independent LLM graders | Supply the same commit and evidence packet. |
| Human | Actual reader, collaborator, rights holder, or Jamie | Prepare a minimized prompt or review packet. |
| Runtime | Exact deployed environment | Prepare preflight, health, and rollback checks. |

An agent cannot relabel its own judgment as a human, collaborator, rights, or
deployment observation.

## Required blind-spot record

Every entry in `blind-spots.json` must contain:

- a stable blind-spot ID;
- a risk statement;
- one or more current criterion IDs;
- the required observer;
- a concrete failure signal;
- the next evidence action; and
- an agent stop boundary.

## Hill-climb rule

1. Start with the lowest observed score or a deterministic failure.
2. State one causal hypothesis.
3. Make one bounded change.
4. Re-run the targeted observation and every hard gate.
5. Keep the change only when the lexicographic objective improves and no
   protected invariant regresses.
6. Record the attempt in `hill-climb-log.md`.
7. Stop when the remaining evidence requires a person, permission, rights
   decision, deployed runtime, or unavailable source.

## Data minimization

Reader and collaborator records use codes, aggregates, and dispositions. Do
not commit names, contact details, recordings, private correspondence, raw
comments, interpersonal context, or authenticated-session material.
