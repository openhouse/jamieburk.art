# Resume versions

Application-specific resumes live under a dated directory and a job-specific
subdirectory:

`resumes/YYYY-MM-DD/organization-role-job-id/`

Each version must remain truthful, public-safe, ATS-readable, and traceable to
the job source and supporting knowledge-bank records. A role-alignment eval is
not a hiring prediction, civil-service eligibility decision, human proofread,
application submission, or employer endorsement.

Run the current OTI resume gate with:

```sh
node scripts/resumes/evaluate-tailored-resume.mjs
node --test scripts/resumes/*.test.mjs
```
