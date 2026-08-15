# Resume versions

Application-specific resumes live under a dated directory and a job-specific
subdirectory:

`resumes/YYYY-MM-DD/organization-role-job-id/`

The durable public resume follows the same dated-version convention under:

`resumes/YYYY-MM-DD/technical-project-manager-product-operations-implementation/`

Its PDF is published at the stable portfolio path
`/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`. It is the shared,
site-visitor resume: it must retain a truthful evidence path for every active,
truthfully hirable opportunity with a modeled public-context reader gate.
Application-specific resumes remain separate artifacts and may be more narrowly
tailored; they do not silently replace the public resume.

Each version must remain truthful, public-safe, ATS-readable, and traceable to
the job source and supporting knowledge-bank records. A role-alignment eval is
not a hiring prediction, civil-service eligibility decision, human proofread,
application submission, or employer endorsement.

Two presentation rules apply to every version and every exported PDF:

- A link inside an experience-section heading remains clickable but must match
  the surrounding heading's font, size, weight, color, and underline state. It
  must not become a visually blue or underlined interruption inside the title.
- WOWList is described publicly as organizer-led work active in 35+ city
  ecosystems. Database user and event-post counts remain governed historical
  evidence and do not appear on public surfaces, because organizer participation
  does not represent the platform's wider readership or civic reach.

The named-reader suite currently maintains versions for:

- ACLU Senior Project Manager, National Campaigns;
- CodePath Senior AI Operations Lead;
- CodePath Engineering Project Manager;
- NYC OTI Senior Product Manager;
- NYC OTI Technical Operations Manager as an expired watch benchmark.

The public-resume active set is status- and freshness-gated separately. As of
August 15, 2026 it covers ACLU National Campaigns, Asana AI Implementation,
CodePath AI Operations, CodePath Engineering Project Management, and PermitFlow
Product Operations across seven fictionalized reader contexts. Closed and
expired opportunities remain useful historical/watch records but cannot pass as
active public-resume gates. A public gate pass means only "advance to a
structured next step" under the modeled public-source lens; no named person
participated or endorsed the result.

Run the OTI-specific gate and the reader-bound portfolio gate with:

```sh
node scripts/resumes/evaluate-tailored-resume.mjs
node scripts/resumes/evaluate-public-resume-pdf.mjs
node --test scripts/resumes/*.test.mjs
node scripts/resumes/evaluate-hiring-reader-portfolio.mjs
```

The opportunity-specific portfolio gate derives required opportunity and reader
coverage from `evals/knowledge-wiki/named-hiring-readers.json`. The public-resume
active gate is declared in `evals/resumes/hiring-reader-portfolio.json` and fails
closed when an opportunity is not live, its status review is stale, a reader
profile is missing, the PDF is not bound to the exact Markdown, or the shared
resume loses a required cross-opportunity signal. The public PDF gate also fails
when an experience-heading link drifts from its surrounding style or when the
WOWList ecosystem-scale projection regresses to user or event-post counts.
