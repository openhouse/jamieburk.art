# Resume versions

Application-specific resumes use this path contract:

```text
resume-versions/YYYY-MM-DD/job-application-slug/Jamie-Burkart-Resume.md
resume-versions/YYYY-MM-DD/job-application-slug/Jamie-Burkart-Resume-<organization-and-role>.pdf
resume-versions/YYYY-MM-DD/job-application-slug/Cover-Letter.md
resume-versions/YYYY-MM-DD/job-application-slug/Application-Instructions.md
resume-versions/YYYY-MM-DD/job-application-slug/artifact.json
```

The Markdown is the tailored source of truth. Its PDF sibling is rendered from
a native copy of the please-read-only Google Docs resume style example. The
copy preserves the established Palatino Linotype, Oswald, and Karla system,
page geometry, hierarchy, links, native lists, and spacing. After Google Docs
export, run `scripts/normalize-resume-list-markers.mjs` on each PDF. It preserves
the tagged list structure and reduces only each list label's text operator until
the marker renders exactly one point smaller than its associated item text.
Google Docs locators are working metadata and are never committed.

`artifact.json` binds the opportunity source, Markdown, and PDF by SHA-256 and
records page geometry, embedded typography, native-copy provenance, and the
completed page-by-page visual inspection. Any opportunity-source edit,
Markdown edit, missing PDF, changed PDF byte, or incomplete inspection fails
the resume-artifact eval until the tailored resume and PDF are reviewed and
regenerated together.

Each version must remain truthful, source-supported, ATS-readable, and independently reviewable. Tailoring may use a clearly labeled target-role headline and reorder governed experience; it may not present that headline as a past employment title or invent a qualification, outcome, formal authority, accessibility certification, user-research program, sole authorship, or policy causation.

Every application-specific resume has a role-specific `Cover-Letter.md` sibling.
The living Google Doc titled *My Writer's Voice* is the source of truth for
Jamie’s voice. Its protected locator and raw contents are supplied only through
an authenticated authoring session and are never committed. The repository
stores a public-safe voice contract tied to an exact digest at
`evals/cover-letters/voice-contract.json`; it is a tested projection, not a
replacement authority. A material letter revision requires a fresh
authenticated read of the living source.

Cover letters add motive and connective tissue rather than repeating the full
resume. They stay between 250 and 400 words, begin from one concrete operating
problem, preserve collective credit and evidentiary limits, and end with a
usable invitation. Each exact letter is tied to its exact opportunity,
resume, voice-contract digest, and named-reader assessments. Deterministic
freshness, structure, role-language, lineage, and public-safety checks run
before isolated reader simulations. A changed letter, resume, opportunity, or
voice contract invalidates earlier reader judgments.

Every opportunity represented in `evals/hiring-readers/current.json` must have
one exact dated resume in `evals/resume-hiring-readers/current.json`. Each
resume is linked by SHA-256 to its named public-context reader assessments.
External resume-review guidance remains subordinate to the repository's truth,
privacy, collective-credit, and human-approval rules.

These are application artifacts, not replacements for the canonical public resume. Jamie retains final review and submission authority, and the employer retains eligibility and hiring authority.

The site-facing resume has a separate portfolio lineage:

```text
resume-versions/YYYY-MM-DD/active-opportunity-portfolio/Jamie-Burkart-Resume.md
resume-versions/YYYY-MM-DD/active-opportunity-portfolio/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
resume-versions/YYYY-MM-DD/active-opportunity-portfolio/artifact.json
evals/public-resume/current.json
```

Selection follows three deterministic tiers: private active-application IDs
supplied at runtime; otherwise officially live, unexpired, truthfully hirable
opportunities; otherwise the top quarter of the governed all-time fit ranking.
Private application state is not committed to the public repository.

The public-resume eval fails when the selected set changes, official-role
verification becomes stale, required role language disappears, or the
Markdown, styled PDF sibling, and public PDF fall out of step. Only after those
cheaper deterministic gates pass may an isolated, public-surface-only hiring-
reader LLM eval run. Every named reader must pass the exact current Markdown
digest; a resume change invalidates all prior reader judgments. Closed,
expired, evidence-gap, and do-not-pursue roles may remain in the research graph
but cannot shape this public artifact unless a private active application is
still genuinely under consideration.

Reader runs are cached by exact résumé digest and preserved under
`evals/public-resume/runs/`. A complete baseline may collect every reader's
critique. Subsequent unanimous-pass hill climbs evaluate the highest-priority
reader first and stop at the first failure, because additional model calls
cannot change the aggregate result after one exact-digest reader has failed.
The current manifest records incomplete coverage and the failed decision; it
must never turn a short-circuited run into a pass.
