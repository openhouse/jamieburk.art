# Feature Evals F Run

**Branch:** `feature/evals-F`  
**Base:** `develop` at `2ec37fe`  
**Date:** 2026-07-12

## Baseline

The first run scored **73/100** and failed automated readiness.

- Message alignment: pass.
- CallNYC external validation: hard-gate failure because the canonical claim
  had not yet been projected into the case study and proof bank.
- Responsive contracts: pass after repairing the two known narrow-screen
  causes.
- Approved resume artifact: pass.
- Application paths: pass.
- Production cutover readiness: hard-gate failure because the production
  runbook lacked explicit cutover, verification, and rollback commands.
- Release gate wiring: pass.

## Repairs

- Aligned primary messaging around turning emerging work into usable systems.
- Added the bounded, source-backed CallNYC Council-member amplification claim
  to the canonical record, proof bank, case study, resume, and Technical
  Operations projection.
- Repaired long-heading and long-button narrow-screen behavior without global
  overflow concealment.
- Added executable production cutover, verification, and rollback steps.
- Added deterministic evaluator tests, weighted criteria, hard gates, and
  anti-gaming rules.

## Final automated result

The second run scored **100/100**. All automated hard gates passed.

Automated readiness does not authorize production deployment. The remaining
manual gates are:

- hiring-manager 30-second comprehension test;
- resume visual-balance review and Jamie approval before replacing the
  currently approved PDF;
- open-PR ownership and supersession review;
- production postdeploy verification after Jamie approves the exact SHA.

## Chad-lens recursive pass

A follow-up run added Chad's lens as a 16-point automated hard gate. The first
run scored **85/100** and failed because the Technical Operations page required
the reader to infer Jamie's entry condition, coordinating role, usable outputs,
and relationship to the proof map. The homepage also retained one
`ambiguous, high-context` formulation.

The hill climb made three bounded repairs:

- added a role-fit orientation band naming where Jamie enters, what he
  coordinates, and what teams can use afterward;
- rewrote all eight Technical Operations proof summaries in direct,
  contribution-bounded first-person language;
- changed the remaining homepage frame from ambiguous situations to emerging
  work.

The evaluator itself then exposed and repaired one false negative caused by a
JSX line break, normalizing whitespace without weakening the semantic contract.
The final run returned to **100/100**, with the Chad-lens hard gate passing.
