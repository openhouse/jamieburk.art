# Resume versions

Application-specific resumes use this path contract:

```text
resume-versions/YYYY-MM-DD/job-application-slug/Jamie-Burkart-Resume.md
resume-versions/YYYY-MM-DD/job-application-slug/Jamie-Burkart-Resume-<organization-and-role>.pdf
resume-versions/YYYY-MM-DD/job-application-slug/artifact.json
```

The Markdown is the tailored source of truth. Its PDF sibling is rendered from
a native copy of the please-read-only Google Docs resume style example. The
copy preserves the established Palatino Linotype, Oswald, and Karla system,
page geometry, hierarchy, links, bullets, and spacing. Google Docs locators are
working metadata and are never committed.

`artifact.json` binds the opportunity source, Markdown, and PDF by SHA-256 and
records page geometry, embedded typography, native-copy provenance, and the
completed page-by-page visual inspection. Any opportunity-source edit,
Markdown edit, missing PDF, changed PDF byte, or incomplete inspection fails
the resume-artifact eval until the tailored resume and PDF are reviewed and
regenerated together.

Each version must remain truthful, source-bounded, ATS-readable, and independently reviewable. Tailoring may use a clearly labeled target-role headline and reorder governed experience; it may not present that headline as a past employment title or invent a qualification, outcome, formal authority, accessibility certification, user-research program, sole authorship, or policy causation.

Every opportunity represented in `evals/hiring-readers/current.json` must have
one exact dated resume in `evals/resume-hiring-readers/current.json`. Each
resume is bound by SHA-256 to its named public-context reader assessments.
External resume-review guidance remains subordinate to the repository's truth,
privacy, collective-credit, and human-approval rules.

These are application artifacts, not replacements for the canonical public resume. Jamie retains final review and submission authority, and the employer retains eligibility and hiring authority.
