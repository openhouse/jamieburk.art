# KC Star Raft Article Knowledge-Bank Update

**Date:** 2026-07-16
**Branch:** `feature/evals-F`
**Pull request:** `openhouse/jamieburk.art#210`

This record explains the complete repository change prompted by a privately
supplied two-page newspaper PDF. It is public-safe: no scan, photograph,
article body, reporter contact detail, or private source locator is reproduced.

## Source Review

The source is Darryl Levings's November 15, 2007, Kansas City Star report, "In
the name of art, go with the flow," published on the front page and continued
on page A4.

A close read established that the report:

- attributes the expedition's originating idea to Jamie Burkart;
- identifies Jamie, Libby Hendon, and Laura Mattingly as the three-person crew
  then traveling, while noting that friends joined for stretches;
- reports a July 21, 2007, departure from Kansas City's West Bottoms;
- describes a roughly 12-by-13-foot raft built in three weeks from discarded
  building materials and soda-syrup drums;
- describes two bicycles linked to a paddlewheel for propulsion when needed;
- reports progress beyond the 1,000-mile marker and a 51-day interruption near
  Vicksburg;
- places the crew south of Baton Rouge by publication; and
- describes a participatory purpose involving river experience, meeting
  people, and cultural connection among river places.

The report was published before the voyage ended. It does not establish the
final endpoint, completed arrival at salt water, final duration, exact complete
route, complete participant population, or Coast Guard approval.

## Claims Added Or Strengthened

1. Added a reserve claim for the contemporary Kansas City Star record. It
   preserves the originating-role attribution, crew-at-publication context,
   build, propulsion, route progress, interruption, and participatory purpose.
2. Strengthened the existing expedition claim with protected contemporary
   corroboration while retaining the later institutional sources for the
   four-month and salt-water account.
3. Moved the exact-route inquiry from `open` to `partially-recovered`, recording
   what the article establishes and what remains unknown.
4. Added an explicit reserve publication decision. No new public-site copy was
   selected.

## Knowledge-Bank Files Changed

- `apps/www/src/data/knowledge-bank/framework.ts`: added the intake lead,
  protected source metadata, proposition-level support, claim, updated project
  relationships, partially recovered inquiry, and reserve publication decision.
- `docs/knowledge-bank/intake/2026-07-16-kc-star-river-raft.md`: added the
  public-safe close-read and lifecycle disposition.
- `docs/knowledge-bank/projects/participatory-public-programs.md`: added a
  bounded contemporary record to the raft-project narrative.
- `docs/knowledge-bank/claims.md`: added the human-readable claim, use
  guidance, guardrails, and prohibited formulations.
- `docs/knowledge-bank/sources.md`: recorded the source basis and protected
  custody boundary.
- `docs/knowledge-bank/source-coverage.md`: documented the newly recovered
  propositions and remaining proof debt.
- `docs/knowledge-bank/projection-map.md`: kept the source as reserve depth and
  prevented silent public projection.
- `docs/knowledge-bank/approval-register.md`: approved metadata and bounded
  paraphrase only.
- `docs/knowledge-bank/anti-claims.md`: prohibited endpoint inflation,
  collective-credit erasure, Coast Guard inference, and unauthorized media use.
- `docs/knowledge-bank/README.md`: documented the protected-source intake
  pattern.
- `docs/evals/launch-readiness.md`: added executable and human criteria plus an
  anti-gaming rule.
- `docs/knowledge-bank/launch-blockers.md`: recorded the automated gate and the
  still-unrun media-rights gate.
- `scripts/lib/launch-readiness-evals.mjs`: added the executable hard gate,
  public-site non-projection check, private-locator scan, and manual rights gate.
- `scripts/tests/launch-evals.test.mjs`: added passing and adversarial coverage
  for evidence completeness, endpoint and roster inflation, public projection,
  protected PDF custody, and source-boundary loss.
- `scripts/tests/citations.test.mjs`: advanced the explicit intake-population
  control and added a direct no-silent-loss assertion for the new intake ID.
- `docs/evals/runs/2026-07-12-feature-evals-F.md`: recorded the baseline,
  repair, final score, test count, and remaining human gate.
- `docs/knowledge-bank/2026-07-16-kc-star-article-update.md`: created this
  comprehensive change record.

## Eval Hill Climb

The first run after introducing the new hard gate produced **98/100**. Every
pre-existing hard gate passed; the new Kansas City Star gate failed because the
source had not yet been represented across the complete lifecycle.

The hill climb added structured records, human-readable registers, projection
restraint, anti-claims, and adversarial tests. Final verification results are
**138/138 deterministic eval tests passed**, including five tests specific to
this source. The portfolio-wide launch evaluator reached **100/100**, with the
new hard gate and every prior hard gate passing. The complete repository check
also passed: citation validation and tests, deterministic eval tests,
TypeScript, lint, production build, standalone assets, knowledge-bank
integrity, public-safety scan, route validation, and launch readiness.

The first complete-check run found one integration omission: the citation test
still expected the previous intake population. The test was advanced by one and
given an explicit assertion for the new intake ID. The complete check was run
again and passed with all 19 citation tests and all 138 deterministic eval tests.

The human `kc-star-river-raft-media-rights-review` gate remains unrun. The
automated result is protocol readiness, not permission to publish media.

## Public-Safety And Copyright Decisions

- The newspaper PDF is not copied into the repository.
- Newspaper photographs and page reproductions are not published.
- Article body text is not reproduced; the knowledge bank uses metadata and
  bounded paraphrase.
- Reporter contact details and private filesystem locators are excluded.
- A protected locator ID records source custody without revealing location.
- A human media-rights gate remains required before any future visual use.
- Archive possession is not treated as publication permission.

## What Did Not Change

- No public website route, case-study copy, resume text, contact data, or
  visible portfolio claim changed.
- The current hiring composition remains focused on technical project
  management, product operations, and implementation.
- The expedition remains collective work; the new source does not make Jamie
  sole author or sole operator.
- The later institutional account of a four-month journey until the water
  tasted salt remains distinct from what the pre-completion newspaper report
  itself establishes.
- No claim of a documented final Gulf of Mexico endpoint was added.

## Remaining Research Questions

- What primary record establishes the final endpoint and final date?
- What was the exact day-by-day route and complete stop chronology?
- Who participated, joined for stretches, hosted, built, repaired, advised, or
  otherwise supported the expedition across its full duration?
- Which records document the Vicksburg interruption and restart in more detail?
- Is there a rights-cleared public archive or canonical publisher record for
  the article and its photographs?
- Which route logs, correspondence, photographs, or collaborator accounts can
  close the remaining inquiry without exposing private or vulnerable material?
