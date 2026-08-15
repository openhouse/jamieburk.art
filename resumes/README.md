# Resume versions

Application-specific resumes live under a dated directory and a job-specific
subdirectory:

`resumes/YYYY-MM-DD/organization-role-job-id/`

The durable public resume follows the same dated-version convention under:

`resumes/YYYY-MM-DD/technical-project-manager-product-operations-implementation/`

Its PDF is published at the stable portfolio path
`/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`. Application-specific
resumes remain separate artifacts; they do not silently replace the public
resume or broaden its positioning.

Each version must remain truthful, public-safe, ATS-readable, and traceable to
the job source and supporting knowledge-bank records. A role-alignment eval is
not a hiring prediction, civil-service eligibility decision, human proofread,
application submission, or employer endorsement.

The named-reader suite currently maintains versions for:

- ACLU Senior Project Manager, National Campaigns;
- CodePath Senior AI Operations Lead;
- CodePath Engineering Project Manager;
- NYC OTI Senior Product Manager;
- NYC OTI Technical Operations Manager as an expired watch benchmark.

Run the OTI-specific gate and the reader-bound portfolio gate with:

```sh
node scripts/resumes/evaluate-tailored-resume.mjs
node scripts/resumes/evaluate-public-resume-pdf.mjs
node --test scripts/resumes/*.test.mjs
node scripts/resumes/evaluate-hiring-reader-portfolio.mjs
```

The portfolio gate derives required opportunity and reader coverage from
`evals/knowledge-wiki/named-hiring-readers.json`. A new named-reader gate makes
the suite fail until its job-specific resume and evidence criteria are added.
