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
The current complete universe is eight tracked open or pending opportunities
plus one explicitly expired benchmark: nine tailored Markdown resumes, nine
styled PDF siblings, nine role-specific cover letters, and sixteen governed
reader–opportunity pairs.

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

## Cover-letter contract

Every opportunity-specific Markdown resume in the maintained hiring-reader
portfolio has one role-specific Markdown cover letter in the same directory.
The letter complements its sibling resume; it does not convert the resume into
first-person paragraphs.

Jamie’s living [My Writer’s Voice](https://docs.google.com/document/d/18y6sZKaGGuHPBm7KGv5jENqAQJHlahxG-MPXQ0Kuwrc/edit?usp=sharing)
Google Doc is the source of truth for voice. Read it in place, read-only, before
drafting, materially revising, or model-evaluating a letter. The repository
stores only its Jamie-authorized source pointer, modification and review
timestamps, and a bounded working profile—not a copy of the full working
document. If the source has changed since the recorded read, deterministic
preflight blocks model evaluation until the profile is refreshed.

Each letter must:

1. Stay between 250 and 400 words, including its compact header.
2. Give the reader one concrete encounter, human stake, hidden system, ethical
   distinction, and durable possibility.
3. Name the exact role and organization without generic application boilerplate.
4. Preserve source, authority, collective-credit, consent, and endorsement
   boundaries.
5. Pass the same exact named reader–opportunity coverage as its sibling resume.

An expired benchmark letter must say `Historical benchmark — do not submit`
and is never model-eligible. Deterministic checks run across all maintained
letters. Only reader pairs selected by the public-resume lifecycle policy may
consume model calls; unchanged, unselected, and expired artifacts remain
model-free.

The reader simulations are fictionalized public-source lenses. No named person
participates or endorses Jamie. A pass means only that the letter and resume are
worth advancing to a normal structured hiring step.

```sh
npm run evals:cover-letters
npm run test:cover-letters
```
