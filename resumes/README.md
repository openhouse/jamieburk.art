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
   In every numbered or bulleted list, set the marker character or numeral
   exactly one point smaller than the associated item text (for example, a
   9-point bullet for 10-point item text). Keep the item text itself at the
   established size.
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

## Signed cover-letter PDF siblings

Every letter in `evals/cover-letters/hiring-reader-portfolio.json` also requires
a same-basename `.pdf` and `.pdf.review.json` beside its Markdown. New maintained
opportunities inherit this requirement automatically; there is no second list
of PDF targets to keep synchronized. The Markdown remains the content source
of truth. The résumé and cover letter remain separate upload files.

The house-style policy is `evals/cover-letters/pdf-policy.json`. It records only
the typography and public-safe workflow facts from Jamie's read-only letter
specimen. The specimen's private URL, title, body, and other protected locators
do not belong in this repository. Its observed type palette is Palatino
Linotype for the name, Oswald for accents, and Karla for body text. Preserve
the actual native document formatting, including paragraph overrides, rather
than reconstructing the layout from those few recorded tokens.

**Current state (2026-08-31): pending signature image.** Inspection of the native
document objects and exported PDF found a typed closing but no signature image.
No signed cover-letter PDFs or passing visual receipts have been generated.
The readiness gate must fail until the actual image and reviewed exports exist.
This implementation adds the contract and checks; it is not an unattended
Google Docs exporter. Do not point application guides at missing PDF files.

### Native Google Docs rendering workflow

1. Read the current opportunity-specific Markdown. Reuse its approved wording;
   a layout operation must not introduce new claims or rewrite the letter.
2. Use a private native Google Docs copy of the Jamie-authorized specimen.
   Keep the original read-only and verify it is unchanged after the work.
   Before sharing or exporting the copy, replace all specimen content and
   inspect its headers, footers, links, tabs, comments, and embedded objects
   for anything unrelated to this application. Keep the working copy private.
3. Apply the native house style to the letter's header, date, exact role,
   paragraphs, closing, and typed name. Keep a single US Letter page; solve
   overflow through layout review, not silently truncated or rewritten prose.
4. Insert Jamie's actual authorized signature image between the closing and
   typed name. Do not generate handwriting, substitute another signature, or
   crop the typed closing and describe it as signed. Keep the standalone image
   in private custody; only the authorized finished letter is a publication
   artifact. Record its SHA-256 in the policy once the exact image is available.
5. Export the working copy through Google Docs' native PDF export. Save the
   PDF beside the Markdown with the same basename, below the 10 MB upload limit.
   Use the separate cover-letter attachment field when the application offers
   one. Do not append the letter to the résumé by default.
6. Rasterize and visually inspect every page. Compare the content with the
   Markdown, the typography and layout with the specimen, and the rendered
   signature with the authorized image. Check hyperlinks, clipping, readable
   spacing, page count, and absence of specimen content. Extract PDF text as a
   second content/privacy check; extracted text alone is not visual inspection.
7. Write the strict redacted receipt only after those checks. Bind the exact
   Markdown bytes, PDF bytes, `JSON.stringify(policy.style)`, and signature
   image bytes to their SHA-256 hashes. The receipt schema is enforced in
   `scripts/cover-letters/evaluate-cover-letter-pdfs.mjs`; it allows no free-form
   private notes, source URLs, document IDs, paths, or embedded image bytes.
   A new Markdown, PDF, style, or signature invalidates the old receipt.
8. Run the PDF gate, then the existing content, opportunity-lifecycle, and
   named-reader checks. Historical benchmarks retain their visible
   `Historical benchmark — do not submit` warning and are never applications.
   PDF readiness does not authorize submission or establish a hiring decision.

```sh
npm run evals:cover-letter-pdfs
npm run evals:cover-letter-pdfs -- --json
npm run test:cover-letters
npm run evals:cover-letters
```

The normal cover-letter evaluator runs this deterministic PDF gate before the
model-review gate, and therefore fails while signed siblings are missing.
The structural PDF preflight is deliberately limited to native exports. Finding
an image resource does not identify a signature; native-export provenance and
signature identity require the exact-artifact inspection receipt. The test
fixtures exercise that contract, not a substitute PDF renderer or a claim that
an actual candidate has been visually approved. No model call, signature,
account write, or submission is performed by this evaluator.

## Field-by-field application guides

Maintain `Application-Guide.md` beside an opportunity's tailored résumé and
cover letter. Start with the [OTI Product Manager 784450 guide](./2026-08-20/nyc-oti-product-manager-784450/Application-Guide.md).
Each enrolled guide has a sibling `application-guide.json`, listed in
`evals/application-guides/registry.json`. Enrollment is explicit; this registry
does not yet cover every opportunity.

The guide follows the observed form order and supplies plain-text paste blocks
from the existing application materials. Keep the exact résumé PDF filename,
upload instructions, optional fields, source references for contact details,
date-confirmation requirements, and final human submission step explicit.
Distinguish screenshots of this opportunity from inherited platform fields and
unseen later pages. Do not invent dates, consent, credentials, or eligibility.

The deterministic check rejects missing or stale guides, changed résumé/letter/
PDF hashes, wrong-job files, missing field coverage, omitted experience entries,
unsupported profile values, and PDFs outside the observed upload constraint.
It also requires email and phone fields to refer to the existing résumé instead
of creating another tracked copy of contact data. No model call is needed for
this mechanical projection; a passing check is not a hiring decision, live-form
validation, or submission receipt.

After a source changes, review it, update only its verified hash in the sibling
configuration, regenerate, inspect the guide, and run the checks. Regeneration
does not silently accept changed source hashes.

```sh
npm run generate:application-guides
npm run evals:application-guides
npm run test:application-guides
```
