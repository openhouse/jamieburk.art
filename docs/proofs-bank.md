# Proofs Bank

The canonical proof bank is:

```text
docs/knowledge-bank/claims.md
apps/www/src/data/proofs.ts
```

This file exists as a public, stable pointer for collaborators and reviewers who
look for a "proofs bank" at the docs root. Do not create a second claim
register here.

## Operating Model

- `docs/knowledge-bank/claims.md` holds public-safe claim language, evidence
  posture, guardrails, protected boundaries, projection surfaces, review owner,
  and review date.
- `apps/www/src/data/proofs.ts` is the machine-readable layer used by the
  website.
- `docs/knowledge-bank/projection-map.md` explains which claims are projected to
  homepage, resume, Technical Operations, work pages, lab pages, and internal
  surfaces.
- `docs/knowledge-bank/source-policy.md` explains how private sources can
  support public-safe claims without entering the repo.

## Contribution Guidance

Contributors should not add private proof material to this repo. A useful proof
note should describe:

- the project context;
- what Jamie did;
- what became usable because of the work;
- evidence that is already public or safe to summarize;
- boundaries around private records, client data, collaborators, and sensitive
  context;
- whether the contributor is comfortable with public attribution.

Private records can inform future wording, but only public-safe summaries should
enter this repo.
