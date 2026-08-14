# Portfolio Evals H - Baseline

Candidate: `2ec37fe6e47d11e600ede204d19a98f7d3cff139`

Surface: `https://staging.jamieburk.art`

Rubric: `portfolio-production-readiness` version 1

## Baseline Result

Weighted score: **0.5125**

Launch eligible: **No**

| Eval | Score | Pass | Baseline evidence |
| --- | ---: | :---: | --- |
| PR-001 Two-minute comprehension | 3 | No | Two blind readers scored 4; the third grader result was not observed, so the three-reader evidence requirement was not met. |
| PR-002 Inspectable evidence | 0 | No | All 14 reviewed routes contained zero project images; artifact galleries were descriptive cards. |
| PR-003 Role-fit traceability | 2 | No | The Technical Operations page named relevant proof but did not consistently link capability, project, action, outcome, and deeper evidence. |
| PR-004 Voice and compression | 2 | No | Voice was strong; lead pages repeated central claims and exposed substantial internal editorial scaffolding. |
| PR-005 Claim governance | 4 | Yes | Citation, knowledge-bank, and public-safety checks passed. |
| PR-006 Resume readiness | 4 | Yes | Two-page, machine-readable PDF rendered correctly, contained the approved phone number, and used working public links. Phone was absent from HTML. |
| PR-007 CTA integrity | 1 | No | Several controls said `Download resume` while linking to the resume HTML page. |
| PR-008 Indexing consistency | 1 | No | Production mode placed `/resume` in the sitemap while the broad `/resume/:path*` header rule marked the HTML page noindex. |
| PR-009 Runtime integrity | 4 | Yes | Full check, both preflights, Docker production build/run, canonical route smoke tests, and browser-console review passed. |
| PR-010 Responsive accessibility | 2 | No | Primary layouts were readable, but the complete viewport and accessibility evidence matrix was not yet collected. |
| PR-011 Production cutover | 0 | No | Apex and `www` still redirected to the prior NPR project. Production deployment requires explicit human approval. |
| PR-012 Approval ledger | 1 | No | The approval register contained approved decisions while the launch-blocker document remained entirely unchecked. |
| PR-013 AI and memory proof | 1 | No | Course completion appeared in copy; the public credential and a worked Known/Open/Protected example were absent. |

## Blind Readers

- `blind-reader-b.json`: private-sector product-operations recruiter, score 4.
- `blind-reader-c.json`: civic-technology program leader, score 4.
- Public-sector operations reader: `not_observed` because the CLI did not
  persist a final structured result after reading the packet. This is recorded
  as missing evidence, not replaced with an inferred pass.

## First Move

PR-002 was the highest-weight failed blocker. The first iteration will add one
approved, inspectable public artifact to each lead project and a bounded lab
example before addressing smaller deterministic blockers.
