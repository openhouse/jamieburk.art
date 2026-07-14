# Knowledge Development Evals

The knowledge-development suite tests whether the portfolio's evidence system
can preserve an incoming fragment, research it, mature it into bounded claims,
and keep public selection separate from evidentiary strength.

Canonical suite: `.agents/evals/knowledge-development.json`

Executable runner: `scripts/run-knowledge-development.mjs`

## Recursive Protocol

1. Freeze the rubric and record the intake-only baseline.
2. Select the highest-severity blocking failure.
3. Make the smallest coherent schema, research, or content improvement.
4. Run deterministic validation.
5. Reject any patch that loses material, weakens provenance, leaks private
   content, or promotes unearned causality.
6. Give collective-credit and Chad-lens criteria to independent judges blind to
   the patch intent.
7. Record the score and accepted or rejected decision.
8. Stop only after two consecutive unchanged-candidate runs meet the threshold,
   or an explicit human or source-retrieval boundary prevents further
   promotion.

The weighted development threshold is `0.85`. Every blocking eval must score at
least `3`; every nonblocking eval must score at least `2`. A passing score means
the knowledge work is structurally sound. It does not approve a held claim for
the website or authorize production deployment.
