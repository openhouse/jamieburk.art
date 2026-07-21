# Hiring Acceptance Evaluations

This system asks whether an exact public portfolio helps Jamie advance for a
current role and whether the role could support good work after acceptance. It
does not predict a hiring decision or impersonate a named person.

## Two Separate Evaluators

1. **Hiring evaluator:** receives only public portfolio routes, public resume,
   sanitized role context, and a reader profile. It cannot see hidden Wiki
   evidence.
2. **Wiki gap resolver:** receives the hiring report, role requirements, and the
   public-safe Knowledge Wiki. It classifies each missing signal as a projection
   gap, source need, corroboration need, rights boundary, experience gap, hard
   screen, uncertainty, or stale role.

This separation prevents private or merely catalogued evidence from persuading
a simulated hiring reader who could not see it.

## Reader Profiles

Profiles are configuration, not testimony. Named profiles are simulated review
lenses based on public sources or supplied approved context. They are not the
person's opinion, participation, endorsement, or hiring decision. Unknown
internal readers stay generic.

## Exact Candidate

Every run binds:

- the evaluated public-site and resume files;
- the governed opportunity records;
- reader profiles;
- the frozen suite and mutations;
- a candidate fingerprint and contract fingerprint.

After any candidate-affecting change, regenerate the report and rebind human or
model judgments. Do not carry a prior verdict onto a new candidate.

## Recursive Protocol

1. Run deterministic safety, freshness, separation, coverage, discovery, and
   mutation gates.
2. Review the highest-priority failing criterion in this order: safety and
   rights, factual support, collective credit, hard requirements, Wiki coverage,
   public coverage, simulated advancement, one-year fit, clarity, voice, and
   concision.
3. Change one bounded thing.
4. Re-run against the unchanged contract and compare with the accepted
   baseline.
5. Reject a change that weakens safety, support, credit, or an earlier
   lexicographic criterion.
6. Stop after two unchanged passes, when the next change would add reader burden
   without changing the decision, when only human authority can resolve the
   issue, or when further work would delay a live application.

The first bounded climb uses the OTI Technical Operations Manager context. It
shortens the Technical Operations introduction while keeping the broader
portfolio intact.

## Commands

```bash
npm run test:hiring
npm run evals:hiring
npm run evals:hiring -- --opportunity opportunity.nyc-oti.technical-operations-manager.782369
```

Normal checks never depend on a live network request. Official posting
availability is verified separately, then recorded with `verified_at` and
`reverify_by` in the governed opportunity file.
