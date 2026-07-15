# NTER CHNG archive-production run

Date: 2026-07-15

Branch: `feature/evals-A`

## Objective

Preserve the supplied `NTER CHNG` project record and verify its relationship to
`America: Now and Here` through the exhibition's own archived Kansas City site,
while keeping collective credit, source scope, public safety, and present-day
portfolio composition distinct.

## Research path

The pass close-read the supplied Wayback capture and enumerated a bounded
2009-2012 successful-capture corpus for `nterchng.com`. That corpus recovered
one HTML page and four supporting assets. The press-release link printed on the
page was not recovered.

A live-web search recovered the contemporaneous Pitch event listing. A bounded
2011 CDX enumeration of `kansascity.americanowandhere.org` then recovered both:

- the official Visual Artists index listing Drew Bolton, Jamie Burkart, and
  Garrett Fuselier; and
- the official dedicated trio page presenting the `NTER CHNG` artist
  statement.

KC Studio, the Nerman Museum, and the Smithsonian Archives of American Art were
retained as bounded context sources. They establish the wider Kansas City
launch and exhibition setting; they do not independently establish Jamie's or
`NTER CHNG`'s inclusion.

## Knowledge result

Two public-safe intakes matured into:

- 7 bounded sources;
- 9 proposition-level observations;
- 2 confirmed-with-boundary claims;
- 1 held professional-throughline inference; and
- 1 recovered research inquiry documenting both findings and gaps.

The strongest retained claims are:

1. Drew Bolton, Jamie Burkart, and Garrett Fuselier collaboratively created
   `NTER CHNG`, a 2010 Kansas City installation combining software, a two-sided
   architectural display, and a public many-to-many texting exchange.
2. The official `America: Now and Here Kansas City` site listed the trio as
   visual artists and presented `NTER CHNG` as their work during the 2011
   Kansas City launch.

## Boundaries

The bank explicitly rejects:

- solo authorship by Jamie;
- inferred individual coding, scenic-design, motion-graphics, or production
  assignments;
- participation or impact totals;
- a claim that the work appeared at the Nerman Museum stop;
- a claim that the work traveled to every planned national-tour venue; and
- republication of historical participant phone numbers printed on the
  archived official artist page.

## Hill-climb decision

The first evidentiary framing risked treating the supplied Nerman Museum page as
direct support for `NTER CHNG`. The accepted iteration gives direct support to
the official archived artist page and artist index, then retains Nerman, KC
Studio, and Smithsonian records only for the narrower context each can prove.

The claims remain held from the website. This satisfies projection discipline:
the bank gains depth for future application, timeline, case-study, and
photo-editor work without asking the present portfolio to carry every mature
fact at once.

## Verification

- Node `v26.5.0`.
- Knowledge-bank evaluation: 5/5 across all 19 criteria.
- Knowledge-bank tests: 147/147 passed, including two NTER CHNG archive and
  source-scope regression tests.
- Citation tests: 10/10 passed.
- Launch-evaluation tests: 6/6 passed.
- TypeScript, ESLint, Next.js production build, standalone-asset assembly,
  knowledge-bank validation, public-safety validation, and route checks all
  passed through `npm run check`.
- `git diff --check` passed.
- `reports/generated/knowledge-bank-maturation.md` was regenerated.

## Decision

Accept the archival production when deterministic knowledge-bank, public-safety,
and full repository checks pass. The resulting record preserves a meaningful
early throughline in Jamie's practice while remaining exact about collaboration,
institutional evidence, and what has not been recovered.
