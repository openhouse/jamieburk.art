# Portfolio Readiness Model Judge

Use this prompt only after deterministic checks pass. Judge the rendered site,
not a prose description of it. Do not inspect private archives.

## Inputs

- Evaluation suite: `evals/portfolio-readiness/suite.json`
- Candidate content and evaluation-contract fingerprints from the deterministic report
- Exact profile: `application_ready` or `production_ready`
- Desktop and mobile renders of the declared public routes
- Public knowledge-bank records and approved resume PDF
- Deterministic evaluation JSON from `reports/generated/`
- Candidate-bound browser evidence from `evals/portfolio-readiness/evidence/`

## Instructions

1. Verify the candidate fingerprint, evaluation-contract fingerprint, browser evidence, and selected profile.
2. Inspect the homepage, work index, Technical Operations, resume, contact, and
   at least three case studies. Include CallNYC.
3. Score every rubric from 0 to 4 using the suite definitions.
4. Cite rendered text, route, and visible behavior for every score below 4.
5. Preserve public-safety, attribution, collective-work, and anti-claim
   boundaries. More disclosure is not automatically better.
6. Score `chad_lens` separately: Jamie must be visible as the actor, the actual
   work and useful outcome must be legible in one pass, specialized language
   must be translated, and collective credit must remain right-sized.
7. Score `morse_lens` separately using `margaret-morse-lens-judge.md`: embodied,
   artistic, material, social, and place-based inquiry must remain connected to
   professional practice without exposing private educational records.
8. Score `sack_lens` separately using `warren-sack-lens-judge.md`: recursive
   relational thinking must become legible across sources, prototypes,
   interfaces, physical-digital situations, and collaborative systems.
9. Identify one highest-value failing criterion and one smallest defensible
   patch. Do not propose a redesign unless the evidence requires it.
10. Compare the candidate with the preceding accepted run without being told
   which version is newer. Reject a candidate that improves one score by
   causing a public-safety, claim-integrity, accessibility, or reader-effort
   regression.

Return JSON:

```json
{
  "judgeId": "stable-agent-or-reviewer-id",
  "lens": "distinct-review-lens",
  "candidate": "immutable candidate identifier",
  "contract": "immutable evaluation-contract identifier",
  "profile": "application_ready",
  "scores": {
    "role_clarity": 0,
    "role_fit": 0,
    "proof_defensibility": 0,
    "citational_care": 0,
    "reader_effort": 0,
    "chad_lens": 0,
    "morse_lens": 0,
    "sack_lens": 0,
    "visual_evidence": 0,
    "resume_alignment": 0,
    "responsive_quality": 0,
    "sharing_quality": 0,
    "operational_confidence": 0
  },
  "evidence": [
    {
      "rubric": "reader_effort",
      "route": "/resume",
      "observation": "Concise public-safe observation"
    }
  ],
  "regressions": [],
  "highestValueFailure": "rubric-id or null",
  "smallestDefensiblePatch": "Bounded recommendation or null",
  "passes": false,
  "confidence": "high"
}
```

Never improve a score by changing this suite, suppressing a finding, adding an
unsupported claim, exposing protected evidence, or narrating the evaluation
process in public-facing copy.
