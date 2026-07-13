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

## Knowledge-bank lifecycle recursive pass

A second follow-up added an 18-point lifecycle hard gate. Its baseline scored
**85/100** because the bank lacked durable intake, project, publication-decision,
proof-coverage, and photo-research structures.

The implementation then:

- recorded twelve supplied memories and URLs with durable dispositions;
- closely read and integrated four public sources;
- created five bounded canonical claims and ten open inquiries: nine tied to the supplied material plus one cross-proof source-coverage queue;
- separated evidentiary maturity, publication safety, and editorial selection;
- assigned publication decisions to every canonical claim;
- assigned source-coverage status to every public proof;
- added photo-editor questions and rights notes to each project node;
- selected the externally reported Cabaret organizing claim for the existing
  civic case study while keeping Open House, Great Accommodations, and the raft
  expedition in reserve and the longitudinal interpretation on hold.

The semantic validator caught one misplaced project-link block. After repair,
the lifecycle and launch suites returned to **100/100** with all hard gates
passing.

## Ten-source evidence-expansion recursive pass

A third follow-up added an 18-point evidence-expansion hard gate. The baseline
scored **87/100** and failed because none of the ten-source research set, five
bounded claims, three proof-debt reductions, or selected page-local projections
had yet entered the repository.

The criterion rejects source accumulation without use: each source must be
public, bounded, and linked to a claim or inquiry; research must reduce named
proof debt; and only claims selected through publication decisions may reach
the site.

The hill climb integrated the ten-source set, created five bounded claims,
reduced proof debt for NYC Artist Coalition, Sunday Dinner, WOW List, and KC
Town Hall, and selected three useful page projections. The final run returned
to **100/100**, with the evidence-expansion hard gate passing.

## Campaign-press corpus recursive pass

A fourth follow-up added an 18-point campaign-press hard gate. The first run
scored **89/100** after the machine-readable corpus was in place but before a
human-auditable intake note documented the source indexes, reconciliation, and
editorial boundary.

The completed corpus records:

- 21 Let NYC Dance press-index appearances;
- 7 Talks Not Raids appearances;
- 8 Save NYC Spaces appearances;
- 10 Fair Rent NYC appearances across the supplied 2021 Wayback capture and
  current reference library;
- 46 total appearances resolving to 45 unique articles because one NPR article
  appears in both Let NYC Dance and Save NYC Spaces;
- 42 new canonical source records and reuse of three existing close-read
  records.

The semantic validator enforces exact counts, canonical-source membership,
cross-campaign deduplication, and the rule that an unread press-index entry
cannot become claim evidence. The human-readable intake note preserves the
full grouped inventory and its limitations. The final run scored **100/100**
with every automated hard gate passing.

Responsive browser QA at 1440px and 390px then exposed a reader-facing defect
outside the first automated score: Sunday Dinner rendered a citation marker,
but its citation page ID did not match the work-route slug, so the short proof
page could not render its source note. The repair aligned the canonical page
ID and MDX projection with `/work/196-sunday-dinner`. The validator and eval
suite now enforce route-slug alignment. Fair Rent NYC, Sunday Dinner, and KC
Town Hall were rechecked at desktop and mobile widths with no horizontal
overflow and resolvable page-local source notes.
