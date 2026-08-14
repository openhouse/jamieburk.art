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
