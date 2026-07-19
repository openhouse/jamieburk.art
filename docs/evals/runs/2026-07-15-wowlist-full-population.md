# WOW List Full-Population Archive Eval Run

Date: 2026-07-15

Candidate: `94858761`

Decision: `stop_human_blocked`

The candidate meets the archive, application-share, and production-readiness
criteria exercised in this run. Production deployment and indexing remain
blocked on Jamie's explicit approval of the exact candidate.

## Population Accounting

The authenticated replies-inclusive `@wowlist` profile reported 38 posts.
Three independent bottom-of-timeline passes recovered the same 38 canonical
status IDs, with no population gap. The repository preserves a public-safe
source capture, the derived corpus, SHA-256 manifest, deterministic derivation
script, per-pass ID inventories, reconciliation checks, and reproducible
aggregates.

The corpus contains:

- 22 authored posts and 16 reposts;
- 5 authored replies;
- 35 posted short-URL occurrences, all resolved to immediate destinations;
- 19 authored posts containing links;
- 23 authored outgoing-link occurrences: 12 WOW List destinations, 2 NYCdiy
  destinations, and 9 external destinations;
- 3 recovered public product-support conversations;
- 12 authored posts with visible interaction; and
- dated visible authored-post totals of 2 replies, 20 reposts, and 21 likes.

Visible interaction labels are dated archival observations, not lifetime
analytics, conversion data, adoption measures, or evidence of causation.

## Mission-Relevant Findings

The corpus supports three distinct, bounded findings:

1. Product use: organizers publicly added shows, linked event records, tagged
   collaborators, and asked for help with geography, list discovery, and event
   entry.
2. Product operations: the account answered those questions, explained scope,
   linked a tutorial, and exposed recurring points of adoption friction.
3. Civic and care practice: nine items connected event infrastructure to
   mutual aid, vigils, DIY funds, civic assemblies, and community curation.

The source inventory also recovered or preserved field-learning leads,
including Good Times' 2015 `Zines 2.0` article, Grasstronaut's `HOMEWORK: In
Every Town`, a WOW List tutorial, the Allied Media Conference, Popular Vote,
the Meow Wolf DIY Fund, and a KQED Ghost Ship vigil video. These sources are
classified as field context or leads unless they directly support a WOW List
claim; linked context is not converted into Jamie authorship or causal credit.

The portfolio separately cites public-safe technical and database archive
reviews for the platform's co-builder role, Django/PostgreSQL/PostGIS/Ember
stack, organizer-facing features, 1,800+ users, 16,000+ event records, and
roughly 35 city ecosystems. The X corpus does not carry those claims.

## Recursive Correction

Blind review and deterministic checks produced several substantive repairs:

- separated the social-population inquiry from archive-scale and technical
  implementation inquiries;
- replaced adoption language with observable activity and organizer use;
- created a dedicated technical-contribution claim and citation chain;
- divided social provenance, product-support, and civic/care projections so
  one source record does not do several rhetorical jobs;
- removed an unnecessary collaborator name from editorial prose while
  preserving public source text and collective-attribution boundaries;
- added actual `--check` support to the derivation script;
- added three complete pass-level status-ID inventories and a canonical-ID-set
  hash to make the 38/38 stopping condition auditable;
- clarified that governed, already-public social corpora may be committed only
  when population accounting requires them and session identity, private
  analytics, follower exports, private surfaces, and media binaries are absent;
- expanded proof evidence classes to distinguish public sources from approved
  resumes, public-safe archives, and firsthand context; and
- removed repeated case-study language after a compression review.

## Verification

- `node scripts/derive-wowlist-x-corpus.mjs --check` reconciled 38/38 items and
  all exact aggregates.
- Two consecutive `npm run preflight:production` runs passed on the unchanged
  candidate with Node 26 and the explicit production indexing policy.
- Citation tests: 10/10.
- Portfolio eval tests: 9/9.
- Knowledge-lifecycle tests: 42/42.
- TypeScript, ESLint, Next.js production build, knowledge-bank, public-safety,
  citation, and route checks passed.
- The production build generated all 17 routes.
- Authenticated browser QA at desktop and 390-by-844 mobile viewports confirmed
  the WOW List claims and source notes, working citation targets, no console
  errors or warnings, and no horizontal overflow.

## Blind Regression

Three independent read-only judges inspected the final capture, corpus,
manifest, derivation script, generated registry, lifecycle records, case-study
projection, and validation results.

| Judge | WP-001 | WP-002 | WP-003 | PR-002 | PR-004 | PR-015 | PR-017 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| A | 4 | 3 | 4 | 4 | 4 | 4 | 4 |
| B | 4 | 4 | 4 | 4 | 4 | 4 | 4 |
| C | 4 | 4 | 4 | 4 | 4 | 4 | 4 |
| Median | **4** | **4** | **4** | **4** | **4** | **4** | **4** |

All three judges passed the candidate and reported no critical finding. Judge A
held URL discovery at 3 because some immediate destinations are themselves
secondary shorteners and final disposition remains open; the corpus states
that boundary directly. The final human decision is whether this exact
candidate is approved for production deployment and indexing.
