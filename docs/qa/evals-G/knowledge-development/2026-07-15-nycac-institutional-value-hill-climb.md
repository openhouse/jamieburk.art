# NYC Artist Coalition Institutional-Value Hill Climb

- Date: 2026-07-15
- Branch: `feature/evals-G`
- Scope: DCLA, NYC Council, Council Member Rafael Espinal, and NYC Artist Coalition
- Decision: deterministic criteria stable; independent judgments pending

## Objective

Answer why NYC Artist Coalition's work was useful to DCLA, the NYC Council,
and Council Member Rafael Espinal without claiming private motive, personal
dependence, institutional endorsement, or sole causality.

## Public Record Recovered

Five public records were normalized and decomposed into atomic observations:

1. Tom Finkelpearl's February 27, 2017 CreateNYC testimony described DIY
   participants producing formal recommendations, continuing to organize
   independently, and remaining a community from which DCLA wanted to learn.
   It did not name NYC Artist Coalition.
2. In May 19, 2017 Council budget testimony, Finkelpearl described CreateNYC
   as a close reciprocal relationship with the public and explicitly said NYC
   Artist Coalition formed after DCLA's January DIY meeting.
3. The July 2017 CreateNYC plan said Office Hours helped launch the coalition
   and carried related concerns into strategies for community networks, safe
   and open DIY spaces, and a Night Life Ambassador.
4. The coalition's April 18, 2017 letter to Espinal supplied mapped license and
   zoning evidence, a civil-rights and safety frame, and a requested repeal
   roadmap.
5. The June 19, 2017 Cabaret Law hearing placed Jamie's coalition testimony in
   the Council record. Espinal thanked the panel for its stories and testimony.

## Developed Claim

`CLM-NYCAC-CIVIC-INTERMEDIARY-VALUE` identifies a reciprocal exchange of
capacities. DCLA and the Council held formal planning, oversight, hearing, and
legislative authority. The coalition brought organized situated knowledge,
maps, recommendations, public convenings, testimony, and relationships with
small cultural spaces into those processes.

The public projection therefore describes the coalition as making informal
cultural-space conditions more legible for planning, oversight, and
legislation. It does not say Finkelpearl personally depended on the coalition,
that government could not act without it, that DCLA controlled it, that every
coalition proposal was adopted, or that Jamie or NYC Artist Coalition alone
caused CreateNYC, the Office of Nightlife, Cabaret Law repeal, or later policy.

The exact private motives of Finkelpearl, Espinal, and Council staff remain
unresolved. `RT-NYCAC-INSTITUTIONAL-USE-CORROBORATION` seeks public or on-record
recollections and staff records that could clarify how the work was used in
planning, oversight, legislation, or implementation.

## Recursive Improvements

The first new regression test failed because its chronology matcher did not
cross a Markdown line break. The matcher was repaired, not the evidence. The
expanded 248-test knowledge suite then passed in full.

The public citation registry initially failed because it was stale, then
because the Fair Rent page's new sources preceded sources introduced by
earlier claims. Regeneration and first-appearance ordering repaired both
conditions. Citation validation, public-safety validation, route validation,
application contracts, portfolio eval contracts, app typechecking, linting,
and the production build all passed.

## Evaluation Result

Two deterministic runs on the unchanged candidate produced the same SHA-256
fingerprint:

`370218ee39146fe8111e3ed79d3a187629cc49fa44639e57b0d782b5690ae536`

Each run scored `0.89` against the `0.85` threshold. All eleven executable
deterministic or hybrid criteria scored `4/4`, including zero NYC Artist
Coalition institutional-value integrity or public-safety violations and zero
canonical validation errors.

The formal stop threshold is not yet met. `KD-006` and `KD-012` require fresh
independent LLM judgments bound to this fingerprint. Those judgments were not
requested because exporting the public-repository candidate to an external
Codex judge remains subject to Jamie's explicit authorization. The existing
`check:knowledge-development` package entry also points to a missing judgment
file from a preceding candidate. That is a judgment-maintenance dependency,
not a deterministic content failure.

## Evidence

- [Deterministic run 1](./nycac-institutional-value-deterministic-1.json)
- [Deterministic run 2](./nycac-institutional-value-deterministic-2.json)
- [NYC Artist Coalition research dossier](../../../knowledge-bank/projects/nyc-artist-coalition-research.md)
- [Canonical claim register](../../../knowledge-bank/claims.md)
- [Public projection map](../../../knowledge-bank/projection-map.md)
