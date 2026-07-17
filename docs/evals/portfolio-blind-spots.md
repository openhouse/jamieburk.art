# Portfolio Blind-Spot Evals

These evals address the gap between a deep, internally consistent evidence
system and an externally successful job-search artifact.

**Automated protocol readiness is not a human outcome.** A passing automated
gate means the criterion has a structured register entry, owner, evidence
requirements, anti-gaming rule, stop rule, next action, and honest manual-gate
status. It does not mean a reviewer understood the site, a collaborator
confirmed a role, a right was cleared, an application was submitted, a pull
request was merged, or production was deployed.

Every manual result must be recorded from new evidence. Until then, the
structured status remains `required-not-run` and `completionEvidence` remains
empty.

## Target-role specificity is tested against real opportunities

Manual gate: `five-real-role-fit-review`

Collect **five dated, real job descriptions**. Freeze the public site during
the scoring round and evaluate each opportunity for role vocabulary, must-have
responsibilities, proof match, proof gap, and next action. Record the posting
date, role, organization, required capabilities, strongest matching portfolio
proofs, material gaps, and whether the gap blocks application.

Archetypes do not count as market evidence. Do not invent postings, rewrite a
posting to fit the portfolio, or let the portfolio's own language define the
employer's needs. The human gate passes only after all five real roles have
scores and every material gap has a disposition.

## Independent holdouts test comprehension without author briefing

Manual gate: `independent-hiring-holdout`

Recruit at least three unfamiliar reviewers. Give each reviewer only the public
site and 30 seconds across the homepage, Technical Operations, and Resume. No
briefing, archive context, role-play transcript, or preferred answer is allowed.

Ask:

1. What role is Jamie seeking?
2. What differentiated value does Jamie provide?
3. Which three proofs support that answer?
4. What should the reader do next?

Agents or people who authored the evaluated material are not independent
holdouts. Retain anonymous answers and aggregate scores, not reviewer names or
private commentary. Pass only when all four questions are recoverable by at
least three unfamiliar reviewers.

## Individual contribution provenance remains distinct from project existence

Manual gate: `collaborator-contribution-confirmation`

For each priority project, maintain separate fields for what proves the project
existed, what proves what Jamie did, what remains firsthand, what has
independent support, and what needs collaborator confirmation. A project-level
article or government record cannot silently become Jamie-role evidence.

Request bounded proof notes that identify project context, Jamie's role,
concrete work, collective context, observed change, limitations, and permission
for public paraphrase or attribution. Do not inherit individual credit from a
collective project's success.

## Outputs, observed outcomes, and causality boundaries remain separate

Manual gate: `outcome-chain-review`

Every leading case study needs a four-part row: output, observed outcome,
attribution boundary, and open outcome question. Record dates and units where
available. State whether the outcome is directly measured, independently
reported, institutionally recorded, protected-source-backed, or still a
research lead.

Sequence is not causality. Do not convert use, response, allocation, or
enactment into Jamie's sole impact. An outcome enters public copy only when its
source, unit, date, and attribution boundary can travel together.

## Technical claims point to inspectable implementation evidence

Manual gate: `technical-evidence-review`

For each leading technical system, recover architecture, implementation
decision, operating constraint, failure recovery, and inspectable artifact.
Where direct public inspection is unsafe, preserve a bounded protected review
and a public-safe diagram or explanation. Include current tools and methods
only when the dated record supports them.

A source list is not an implementation account. Neither a technology list,
repository name, user count, nor database count substitutes for explaining a
decision, tradeoff, dependency, operating consequence, and Jamie's role.

## Collaboration maps preserve shared credit and Jamie's bounded role

Manual gate: `collaborator-role-map-review`

For every priority collective project, record who contributed what, what Jamie
was trusted to carry, where responsibility was shared, what remains uncertain,
and whether there is permission to publish names or quotations. Use project-
level groups when individual naming is unnecessary or unapproved.

Do not make Jamie legible by making collaborators disappear. Conversely, do
not let collective-credit care erase Jamie's concrete responsibility. A role
map passes only when both are specific and publication permissions are known.

## Visual proof requires evidence, rights, consent, and caption readiness

Manual gate: `visual-proof-rights-review`

Build one unmistakable visual proof package for each leading case study. Every
package tracks candidate, evidence value, rights, consent, and caption status,
plus crop, alt text, visible private information, participant vulnerability,
and collective credit.

No image becomes ready merely because it is visually strong. Archive custody,
public display, historical importance, or the presence of Jamie in a frame does
not establish republication rights, participant consent, evidentiary relevance,
or a defensible caption.

## The longitudinal practice thesis remains useful without flattening projects

Manual gate: `longitudinal-thesis-editorial-review`

The participatory-systems interpretation remains on hold. Test one diagram and
one 150-word synthesis against at least five separately sourced projects. Name
both the shared practice and the material differences in period, place,
community, collaborator structure, medium, power, and intended outcome.

Promotion requires a specific audience need, cross-project corroboration, and
independent editorial review. Do not flatten distinct projects, collaborators,
places, or communities into one continuous program merely because a thematic
resemblance is persuasive.

## Archive work has a stopping rule that returns effort to applications

Manual gate: `application-cadence-review`

Apply a 90-minute research and composition timebox to each real opportunity.
Stop sooner when all material public claims are source-backed or bounded, the
role fit is clear, and no factual, privacy, or safety blocker remains. At the
timebox, convert noncritical proof debt into an inquiry and return to an
application, outreach, or conversation.

Track qualified applications, direct outreach, professional conversations, and
interview movement. Archive volume is not a job-search outcome. Sources found,
claims matured, pages edited, and eval points gained may improve quality, but
they do not substitute for outward action.

## Agency language is direct without erasing collective boundaries

Manual gate: `agency-language-review`

Review the primary hiring path and five leading case studies for language that
states what Jamie initiated, designed, built, coordinated, maintained,
produced, and made possible. Each sentence should use a direct verb, name the
object or system, state the purpose, and retain the strongest necessary
collective, authority, title, or causality boundary.

Do not repair understatement by weakening collective-credit or causality
boundaries. Also do not hide a documented initiating, designing, building,
coordinating, maintaining, or producing role behind actorless systems language.

## Branch-local readiness remains distinct from merged and deployed reality

Manual gate: `branch-pr-production-integration-review`

Treat branch-local 100/100 as evidence about one commit, not about `develop` or
production. Every pull request targeting `develop` needs a pull-request owner
and supersession decision. Select an exact candidate SHA only after the intended
changes are integrated and reviewed.

Do not call an unmerged branch production-ready. Jamie must approve the exact
candidate SHA; deployment must complete; then health, robots, sitemap,
canonical-host behavior, key routes, and resume delivery must pass postdeploy
verification.

## Recursive Protocol

1. Run `npm run evals:launch` and retain the baseline.
2. Address each failed blind-spot gate without weakening its anti-gaming rule.
3. Run the focused adversarial tests.
4. Run the full repository check.
5. Keep every human result at `required-not-run` until new external evidence is
   actually collected.
6. Add real completion evidence only through a reviewed follow-up change.
