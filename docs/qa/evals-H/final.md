# Portfolio Evals H - Final Pre-Release Result

Candidate application commit: `281f6294bab5c068777a184eb601e6aa2d4b66c3`

Base: `origin/develop` at `2ec37fe6e47d11e600ede204d19a98f7d3cff139`

Rubric: `portfolio-production-readiness` version 2

## Result

Weighted score: **0.8625** (version 1 baseline: **0.5125**)

Launch eligible: **No - stopped at the required human and production gates**

All agent-verifiable criteria score at least 3. The remaining blocking criteria
are PR-011, which requires a real public cutover and post-deploy evidence, and
PR-012, which requires Jamie to approve the exact candidate commit and indexing
state. If both gates score 4 without regression, the weighted score becomes
**0.9275**, above the 0.90 threshold.

| Eval | Score | Pass | Final evidence |
| --- | ---: | :---: | --- |
| PR-001 Two-minute comprehension | 4 | Yes | Three independent holdout readers scored 4, identified the target role and operating-structure promise, named accurate proofs, and recommended advancing Jamie. |
| PR-002 Inspectable evidence | 3 | Yes | HJE, FairRentNYC, CallNYC, and the lab each contain a genuine public-safe image with alt text, caption, source or ownership context, and an approval record. |
| PR-003 Role-fit traceability | 3 | Yes | Technical Operations links capability rows to named projects, actions or outcomes, and deeper destinations. Holdout median: 3. |
| PR-004 Voice and compression | 3 | Yes | Lead-case-study narrative copy fell from 1,749 to 834 words; detailed citations and care limits became optional disclosures. Holdout median: 3. |
| PR-005 Claim governance | 4 | Yes | Citation, knowledge-bank, and public-safety checks pass; careful claims retain their guardrails. |
| PR-006 Resume readiness | 4 | Yes | Two-page tagged PDF renders without clipping, contains the approved phone number once, retains public email/portfolio/LinkedIn/GitHub links, and frames AI Evals as professional development. Phone remains absent from HTML. |
| PR-007 CTA integrity | 4 | Yes | HTML resume links say `View resume`; the PDF action says `Download resume PDF`; primary work and contact actions resolve. |
| PR-008 Indexing consistency | 4 | Yes | Staging emits `noindex, nofollow`; production HTML is indexable with apex canonicals; only the phone-bearing resume PDF receives the noindex header. |
| PR-009 Runtime integrity | 4 | Yes | Complete checks and both preflights pass. The production Docker image builds, runs as `nextjs`, and returns 200 on all 18 smoke-tested endpoints. |
| PR-010 Responsive accessibility | 4 | Yes | 56 route/viewport combinations at 360, 375, 768, and 1280 pixels reported no overflow, missing main landmark, heading failure, unlabeled image, or broken requested image. |
| PR-011 Production cutover | 1 | No | Production-mode artifacts and Docker runtime are ready, but the reviewed commit has not been deployed to the public apex and verified with DNS, TLS, `www`, `npr`, health, and rollback evidence. |
| PR-012 Approval ledger | 2 | No | Public decisions and new assets are reconciled; exact-commit production and indexing approval remains intentionally open. |
| PR-013 AI and memory proof | 3 | Yes | The approved certificate, bounded professional-development wording, synthetic Known/Open/Protected example, and explicit non-SaaS limits are visible. |
| PR-014 Chad Lens professional legibility | 4 | Yes | Three fresh HR, public-sector, and technical holdouts scored 4, with 95.0%, 94.4%, and 94.4% statement-audit pass rates and no consequential comprehension failures. |

## Blind Holdout

The final judges received the frozen rubric, rendered visible-text bundle, and
candidate screenshots. They did not receive the patch intent, baseline scores,
or implementation discussion.

| Reader | Perspective | PR-001 | PR-002 | PR-003 | PR-004 |
| --- | --- | ---: | ---: | ---: | ---: |
| A | Public-sector technical hiring manager | 4 | 3 | 4 | 3 |
| B | Product operations and implementation leader | 4 | 3 | 3 | 3 |
| C | Evidence-minded portfolio editor | 4 | 3 | 3 | 3 |
| **Median** |  | **4** | **3** | **3** | **3** |

All three readers identified Technical Project Manager / Product Operations /
Implementation as the role family, described the value as turning ambiguous
work into operating structure, named at least three bounded project proofs, and
recommended a resume review, interview, or screening conversation.

## Chad Lens Holdout

The version 2 suite adds PR-014 as a blocking professional-legibility eval. A
baseline panel scored **4 / 3 / 3**, median **3**. After one focused iteration,
three fresh holdouts scored **4 / 4 / 4**, median **4**. Their sampled
actor-action-purpose-result pass rates were **95.0%**, **94.4%**, and **94.4%**.

The iteration rewrote high-visibility metric and proof-map fragments to name
Jamie, his action, the work's purpose, and the usable result; removed
unexplained `OTI`; spelled out quality assurance and user acceptance testing;
and aligned HJE's lead wording with supported long-running leadership while
retaining careful revenue causality. Full scorecards are recorded in
`chad-holdout-hr.json`, `chad-holdout-public.json`, and
`chad-holdout-technical.json`.

## Iterations

1. **Baseline - 0.5125.** Positioning and governance were strong, but lead work
   had no genuine images, capability proof was weakly linked, CTAs and indexing
   contradicted their destinations, and responsive evidence was incomplete.
2. **Inspectable proof and application paths.** Added approved public-site
   screenshots for HJE, FairRentNYC, and CallNYC; added the approved AI Evals
   certificate and synthetic lab example; linked proof rows to deeper projects;
   corrected CTA labels and the resume-PDF noindex rule.
3. **Responsive correction.** Fixed long mobile headings and CTA wrapping, and
   adjusted narrow grid behavior. The 56-case route/viewport matrix passed.
4. **Editorial compression.** An intermediate blind reader scored PR-004 at 2.
   The lead narratives were cut by 52 percent, repeated governance panels were
   consolidated, and detailed source notes were collapsed. Three fresh holdout
   readers then scored PR-004 at 3.
5. **Chad Lens professional legibility.** The new blocking eval established a
   4 / 3 / 3 baseline. One focused pass converted fast-scan fragments into
   actor-action-purpose-result statements and reconciled supported HJE agency.
   Three fresh holdouts scored 4 / 4 / 4, meeting the criterion.

## Verification

- `npm run preflight:staging`
- `npm run preflight:production`
- production Docker build with explicit production build arguments
- non-root container inspection: `nextjs running`
- 18-endpoint container route smoke, including health, robots, sitemap, and PDF
- 56 route/viewport responsive checks
- PDF metadata, text, URL, and two-page render inspection
- three independent structured blind holdout reviews
- three independent Chad Lens baseline reviews and three fresh Chad Lens
  holdouts

## Required Human Finish

1. Review and approve the exact final PR commit, public contact path, resume,
   metrics, screenshots, certificate, and production indexing state.
2. Execute the bounded production release with recorded prior release and
   routing state, rollback command, build/runtime environment, and deployment
   SHA.
3. Verify apex TLS and content, one-hop `www` redirect, preserved
   `npr.jamieburk.art`, production health, robots, sitemap, resume HTML, and PDF
   noindex behavior.
4. Record the go/no-go decision and post-deploy smoke evidence in the launch
   ledger. Do not mark PR-011 or PR-012 complete before these observations.
