# Kansas City Star article integration

**Date:** 2026-07-16
**Branch:** `feature/evals-A`
**Pull request:** [#220](https://github.com/openhouse/jamieburk.art/pull/220)

## Purpose

This pass integrates a participant-held two-page *Kansas City Star* article
about the 2007 raft expedition into the public-safe knowledge bank. The goal is
to preserve everything professionally and historically useful while keeping
copyrighted source material, private paths, personal details, and unsupported
interpretation out of the public repository.

No portfolio page was changed in this pass. The resulting depth is held for
future composition rather than automatically promoted onto the website.

## Source reviewed

- Darryl Levings, “In the name of art, go with the flow,” *The Kansas City
  Star*, November 15, 2007.
- The supplied carrier is a two-page print PDF held outside the repository.
- Both pages were extracted with Poppler and visually reviewed as newspaper
  layouts.
- The source-artifact SHA-256 is
  `8e9821ddccffc062983e3cf38f5a6080a1a5d1ee0cf1d0ff2b38b5ff40b17cd3`.
- The layout-text SHA-256 is
  `7dd0ce52eb9e550f56cdb606760a29026f6a8d25c0a04f43a9f4aa949fd75967`.
- A bounded exact-title and byline search did not recover a live canonical
  article URL. That does not prove that no URL ever existed.
- The copyrighted PDF and extracted article text were not committed.

## Knowledge encoded

The integration adds one intake, one public-metadata-only source, 47 atomic
observations, two factual claims, one explicitly interpretive claim, and a
refined route inquiry.

The observations preserve, among other things:

- the article’s printed name `James Burkart`, with an explicit rule for the
  current public name `Jamie Burkart`;
- Libby Hendon, James Burkart, and Laura Mattingly as the named core travelers;
- Laura Mattingly’s steering credit in the front-page photograph;
- the three-week build, recycled materials, dimensions, bicycle-and-paddlewheel
  propulsion, operating practice, pace, and departure;
- friends joining route segments, provisioning and interaction stops, and
  Burkart’s reported practice of inviting people met along the way;
- separate, attributed Chain of Rocks accounts by Mattingly and Hendon;
- 14 reported Coast Guard encounters, kept separate from uncounted contacts
  with police, fire, sheriff, state conservation, and Army Corps authorities;
- the Vicksburg boarding, assessment, beaching, 51-day interruption, community
  support, legal help, raft retrieval, job-finding support, and sendoff;
- publication-time locations, delays, expected route, and uncertainty about
  salt water and seeing the Gulf from the raft;
- Burkart’s attributed interpretations of the river and his hope for cultural
  connection.

## Claims and boundaries

The factual record supports a collective expedition claim and a bounded
operations claim. It also supports a separate, held hiring interpretation:
Jamie’s later work can be read in continuity with rapid prototyping, public
encounter, adaptive logistics, and place-based inquiry.

That interpretation is not language used by *The Kansas City Star*. The bank
therefore keeps it at `use-with-care`, with no active website surface.

The records explicitly do not claim:

- that Jamie designed, built, steered, operated, navigated, or completed the
  expedition alone;
- that the newspaper establishes completed arrival at salt water;
- an exact Gulf terminus;
- a complete participant, route, legal, safety, or agency-contact record;
- that 14 was a combined count across every named authority class;
- measured cultural or community outcomes;
- current endorsement by any person quoted in 2007.

## Material held back

Eleven source areas received explicit `omit`, `protected`, or `defer`
dispositions, including family context, personal loss, private correspondence,
hazard anecdotes, participant biography, literary framing, disputed
interpretations, later equipment changes, a historical admiration quotation,
and anticipated future tow support.

These dispositions preserve future research leads without making the public
repository carry details that are not needed for the professional argument.

## Evaluation framework

The new source-coverage fixture is a co-versioned regression contract, not an
independent authority. It binds:

- the complete intake record;
- the complete source record;
- all 47 observation records;
- all three claim records, including identity, project, review metadata,
  projections, evidence, boundaries, and anti-claims;
- the route inquiry;
- the project documentation;
- the exact set of records linked to the newspaper source;
- the artifact and extraction receipts;
- the 11 explicit non-inclusion dispositions.

The evaluator rejects unreviewed source-linked records and fails on mutations
to source metadata, source support language, intake rationale, observation
kind, claim project or text, held projection text, inquiry summary, locators,
collective credit, terminus boundaries, and projection status. It follows both
sides of intake-to-observation relationships and rejects claims that name the
newspaper while omitting its evidence edge. After independent mutation review
found indirect claim/inquiry and Unicode-whitespace bypasses, the contract was
expanded to a sealed bidirectional frontier of connected waterways intakes,
observations, claims, and inquiries. Every claim on that frontier must remain
held, absent from page plans, and absent from the public citation registry.

Later review expanded this further. The frontier now includes every record
labeled for the `waterways-raft` project, including otherwise disconnected
source/intake/observation/claim/inquiry/page sets. Source attribution is checked
globally across projects; normalization covers ordinary and nonbreaking spaces,
zero-width and combining formatting characters, repeated whitespace, Markdown
punctuation, and the `Kansas City Star`, `KC Star`, and context-qualified `The
Star` forms. Registry checks parse valid JSON before inspecting identifiers, so
Unicode-escaped held IDs cannot evade the publication hold.

Independent judgment is procedural: fresh read-only agents inspect the source,
records, evaluator, and mutation behavior outside this co-versioned contract.

## Recursive hill-climb history

The integration changed materially through adversarial review:

1. The first source pass decomposed the article into atomic observations and
   separated facts from a present-day hiring interpretation.
2. Review corrected printed-name handling, invitation attribution, collaborator
   credit, participant boundaries, and cross-column locators.
3. Review added artifact and extraction receipts, explicit source dispositions,
   exact work-support wording, Natchez and fog separation, and publication-time
   terminus qualifiers.
4. A judge demonstrated that false text appended to a canonical claim could
   pass. All complete claim records were then digest-bound, with regression
   tests for claim and projection drift.
5. A second judge demonstrated that false source metadata and extra
   source-linked records could still pass. The contract was expanded to the
   complete intake/source/observation/claim/inquiry/documentation surface and
   exact linked-record population.
6. The same judge caught a factual conflation between the reported Coast Guard
   count and other authority contacts. That statement was split into two
   separately bounded observations.
7. Language calling the in-repo fixture an independent “oracle” was removed.
   The repository now describes it accurately as a co-versioned regression
   contract.
8. Review found that an observation could be hidden behind the article intake
   while pointing at another source, and that a claim could name the source
   while omitting its evidence edge. Bidirectional intake membership and source
   consistency checks were added.
9. Review found indirect claim/inquiry paths, Unicode whitespace, and active
   projections outside the initial source-linked set. The complete related
   graph was sealed and all connected claims were placed under page-plan and
   registry holds.
10. A fresh judge showed that a cross-project claim could name the newspaper
    without entering the related graph. Source attribution became a global
    provenance rule, with regressions for cross-project publication.
11. Another judge found combining-character, Markdown, source-alias,
    JSON-escape, and disconnected project-graph variants. Normalization,
    decoded-registry inspection, and project-wide graph closure were added.
12. A final independent read-only judge repeated all eight attribution forms,
    a source-name-free project graph, and an escaped registry identifier. Every
    mutation reduced the criterion to `1`; the restored baseline returned to
    `5`, and all eight review dimensions received `5/5` with an `ACCEPT`
    verdict.

## Files changed

- `apps/www/src/data/knowledge-bank/historical-knowledge.ts`
- `docs/knowledge-bank/projects/waterways-and-participatory-art.md`
- `evals/knowledge-bank/evals.json`
- `evals/knowledge-bank/fixtures/kc-star-2007-source-coverage.json`
- `package.json`
- `scripts/lib/citation-validation.mjs`
- `scripts/lib/knowledge-evals.mjs`
- `scripts/tests/knowledge-evals.test.mjs`
- `scripts/verify-source-receipt.mjs`
- `docs/knowledge-bank/handoffs/2026-07-16-kc-star-article-integration.md`

## Verification

All verification used Node `26.4.0`.

- Source receipt: supplied PDF and layout-text SHA-256 digests passed.
- `npm run check:knowledge-evals`: `5/5` across 28 criteria.
- KC-focused knowledge tests: `26/26` passed.
- Full knowledge-eval suite: `253/253` passed.
- Citation tests: `10/10` passed.
- `npm run knowledge-bank`: passed with the 10 pre-existing careful-claim
  guardrail warnings.
- `npm run public-safety`: passed.
- Independent read-only acceptance review: eight dimensions at `5/5`, verdict
  `ACCEPT`.
- No knowledge from this source was automatically promoted to a public website
  surface.

## Open research

- Recover a canonical or licensed archival carrier for the article.
- Reconstruct the complete route, guest/helper chronology, and exact terminus.
- Seek additional Vicksburg records without turning a newspaper account into a
  complete legal or safety history.
- Identify public-safe photographs, program materials, and participant
  accounts with appropriate credit and consent.

## Links

- [Pull request #220](https://github.com/openhouse/jamieburk.art/pull/220)
- [Raw Markdown on GitHub](https://raw.githubusercontent.com/openhouse/jamieburk.art/feature/evals-A/docs/knowledge-bank/handoffs/2026-07-16-kc-star-article-integration.md)
