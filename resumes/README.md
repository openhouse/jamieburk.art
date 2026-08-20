# Resume versions

Application-specific resumes live under a dated directory and a job-specific
subdirectory:

```text
resumes/YYYY-MM-DD/organization-role-job-id/
```

Each version must remain truthful, public-safe, ATS-readable, and traceable to
the maintained portfolio and Knowledge Wiki. Tailoring may change emphasis,
order, and terminology; it must not invent experience, metrics, authority, or
individual credit for collective work.

## Current hiring suite

`evals/resumes/hiring-reader-portfolio.json` requires one dated resume for every
priority opportunity in `evals/knowledge-wiki/hiring-suites.json` and for its
explicitly expired benchmark role. It evaluates each version through the same
public-context reader/opportunity pairs maintained by the Knowledge Wiki.

These are fictionalized, public-source analytical lenses. A passing resume-stage
result means **advance to a structured interview or practical work sample**. It
does not mean that a named person participated, endorsed Jamie, promised an
interview, or made a final hiring decision. Work samples, structured interviews,
references, formal eligibility checks, and the employer's own judgment remain
human gates.

## Public resume contract

The resume installed at
`apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`
is a stable public URL whose content follows the lifecycle selection model in
`evals/resumes/public-resume-selection.json`.

Its authoritative Markdown source is:

```text
resumes/2026-08-15/public-active-opportunity-portfolio/Jamie-Burkart-Resume-Technical-Project-Manager.md
```

The selector applies these tiers in order:

1. Every submitted, interviewing, or offer-stage application with a pending
   outcome, even if its application deadline has passed.
2. If no candidacy is active, every fresh, open, unapplied opportunity that
   remains considered and has no failed or unknown hard screen.
3. If neither current tier has members, the ceiling of the top quarter of
   eligible historical opportunities by frozen fit score.

The public resume must pass every isolated fictionalized hiring-reader gate
attached to the exact selected set. A live role with an unmet hard screen
remains discoverable in the Knowledge Wiki but is excluded. An expired or
closed role remains only as an explicitly labeled benchmark.

When an opportunity changes lifecycle, update the Knowledge Wiki and selector
state first. Deterministic date, eligibility, artifact, exact-copy, safety, and
reader-coverage checks run before any model review. Only the selected reader
pairs become model-eligible; unchanged results are cached by opportunity,
reader, resume hash, public-context hash, posting-review date, and prompt
version. A role-specific application resume may be more narrowly tailored; it
becomes the public resume only when the selector makes it the exact current set.

The model reviews are explicitly fictionalized public-source analytical lenses.
Named people do not participate or endorse Jamie. A pass means advance to a
structured interview or practical work sample, not a final hiring decision.

## Markdown, Google Docs, and PDF contract

The Markdown file is the authoritative opportunity-tailored content. Every
Markdown resume must have a PDF sibling with the same basename in the same
directory.

The PDF is produced through a private Google Docs working copy:

1. Treat the established resume-style source as read-only.
2. Make or reuse one private working copy for the opportunity.
3. Import the authoritative Markdown without inventing date precision or
   changing claim scope.
4. Apply the public-safe style signature recorded in
   `evals/resumes/pdf-portfolio.json`.
5. Export the working copy as PDF beside the Markdown.
6. Rasterize and inspect every page.
7. Commit a visual receipt that binds the exact Markdown and PDF SHA-256 hashes.

Private Google document IDs, URLs, revision IDs, and other protected locators
must never enter this public repository. A Markdown edit, PDF replacement,
missing link, failed page inspection, or stale receipt fails:

```sh
npm run evals:resumes
npm run test:resumes
```
