# Portfolio claim eval run: feature/evals-B

**Date:** 2026-07-12

**Base:** `develop` at `2ec37fe6e47d11e600ede204d19a98f7d3cff139`

**Branch:** `feature/evals-B`

**Result:** Passed

## Outcome

All eight fixtures reached the suite's stopping criterion with independent
evidence and hiring-reader judges. Every final candidate passed every hard gate,
scored at least 92 with both judges, kept every scored criterion at 4 or above,
received a 5 for calibration, introduced no accepted-draft regression, and
passed in two consecutive rounds.

## Results

| Fixture | Evidence judge | Hiring-reader judge | Qualifying rounds | Use |
| --- | ---: | ---: | --- | --- |
| `emerging-work-throughline` | 95 | 98 | 2, 3 | Public hiring language |
| `callnyc-member-engagement` | 98 | 92 | 2, 3 | Public claim with citation and account-level limits |
| `callnyc-access-audit` | 93 | 95 | 2, 3 | Supporting public-safe method note |
| `photo-coalition-corroboration` | 92 | 92 | 4, 5 | Private editorial guidance pending asset review |
| `photo-cultural-hosting-material-practice` | 98 | 95 | 2, 3 | Private editorial guidance pending asset review |
| `photo-source-backed-memory-vocabulary` | 98 | 98 | 3, 4 | Private editorial guidance pending asset review |
| `photo-unsupported-project-attribution` | 94 | 96 | 3, 4 | Internal evidence-control guidance |
| `photo-asset-publication-gate` | 94 | 96 | 1, 2 | Internal publication instruction |

## Revision path

The first pass accepted the emerging-work throughline but asked for a more
precise distinction between CallNYC account engagement and institutional action.
The revised CallNYC claim now states the 11-post, 10-account finding while
explicitly excluding commissioning, adoption, partnership, institutional
endorsement, and personal authorship.

The photo pass initially asked photographs to carry too much project meaning.
The accepted version separates documentary proof from visual corroboration:
project records establish Jamie's bounded work, while photographs may
corroborate visible presence, settings, artifacts, and material continuity.
Coalition wording needed four iterations to make that separation fully legible;
an unchanged fifth round verified the result.

## Applied projections

- Replaced pathologizing descriptions of ambiguous work with language about
  emerging work and structure that grows from the material at hand.
- Added the bounded CallNYC Council-member account engagement claim to the
  Knowledge Bank and cited case study.
- Documented the public-source access audit without treating blocked X access
  as an empty timeline or requiring an API credential.
- Added photo-evidence guidance that distinguishes retrieval cues, visible
  corroboration, documentary claims, and publication approval.

The exact selected language and stopping evidence are recorded in
[`result.json`](./result.json).

## Boundaries preserved

- Account interaction is not institutional endorsement or personal authorship.
- Three of 110 reported CallNYC entries remain unrecovered.
- Current social counters are not contemporaneous impact analytics.
- Photographs do not independently prove role, authorship, leadership, or
  outcomes.
- Editor-field membership, People associations, filenames, and embedded dates
  remain retrieval cues rather than publication approval.
- Private images remain offline unless every asset-specific review check passes.
