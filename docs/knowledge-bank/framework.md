# Knowledge Bank Framework

The knowledge bank is a private-to-public research and composition process
implemented in a public-safe repository. It lets fragments accumulate without
forcing every fragment onto the website or treating every recollection as a
fact.

## Canonical Flow

1. **Capture:** record a public URL, public-safe memory, artifact, claim
   hypothesis, photo lead, reader response, or correction in intake.
2. **Source:** describe what an artifact is, where it came from, what survived,
   what it generally supports, and what it does not establish.
3. **Observation:** keep extracted details bounded by source and method. An
   observation is not yet a public accomplishment claim.
4. **Claim or inquiry:** connect support to a carefully worded claim, or open a
   research inquiry when support is incomplete, conflicting, or absent.
5. **Agency:** make Jamie's bounded action and usable result visible while
   preserving collaborator, participant, legislative, institutional, and
   collective credit.
6. **Projection:** decide whether a mature claim belongs on a particular public
   surface, with audience, purpose, claim budget, and omission rationale.
7. **Citation:** render only approved public evidence, never protected locators
   or private source material.
8. **Correction and re-entry:** preserve supersession history and route new
   sources, photo observations, collaborator corrections, and reader feedback
   back through intake.

## Separate Decisions

These decisions must never collapse into one another:

- a source can support a fact without granting quotation or image permission;
- a claim can be mature without being useful in the current website argument;
- an image can be rights-cleared without participant consent or contextual
  approval;
- a protocol can be ready without human review being complete;
- a historical page can be not recovered without having never existed.

## Public Composition

The website is a selective projection, not a query interface over the bank.
`docs/evals/composition-manifest.json` records the purpose and claim budget for
each route or route template. Eligible but unselected knowledge stays in the
bank with an explicit hold or composition rationale.
Proof selections and direct canonical projections must match the public
composition registry exported from `apps/www/src/data/proofs.ts`; this keeps
the manifest aligned with what route code actually renders.

## Operating Surfaces

- Schema and canonical records: `apps/www/src/data/knowledge-bank/`
- Public proof layer: `apps/www/src/data/proofs.ts`
- Agency exact set: `apps/www/src/data/knowledge-bank/agency-relations.json`
- Projection decisions: `docs/knowledge-bank/projection-map.md`
- Survivorship: `docs/knowledge-bank/archival-survivorship-register.json`
- Photo re-entry: `docs/knowledge-bank/photo-feedback-loop.md`
- Composite evals: `.agents/evals/knowledge-composite-integration.json`

The CLI validates the canonical graph before intake or query work and rejects
unknown project and graph references. It reports lifecycle debt and checks
compiled-output leaks, but does not create public claims or add a database,
CMS, or public archive browser.
