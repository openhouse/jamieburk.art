# WOW List Facebook Posts Full-Population Eval Run

Date: 2026-07-16

Candidate: `feature/evals-N` working candidate

Decision: `pass_human_review_pending`

The candidate meets the archive, application-share, and production-readiness
criteria exercised in this run. Production deployment and indexing remain
subject to Jamie's explicit approval of the exact release candidate.

## Population Accounting

The authenticated legacy Lifetime table exposed 54 WOW List Facebook post
records dated April 25, 2015, through March 22, 2018. The final public-safe
ledger preserves:

- 54 canonical public post IDs;
- 54 legacy management content IDs;
- 51 renderable details attributed to Jamie as Page publisher;
- three video redirects without recovered publisher bylines;
- 42 normalized posted destinations;
- 27 native-export calendar-date matches and two bounded one-day interface/timezone shifts;
- a 22/7 split between two Page IDs under the WOW List Page name, held as an unresolved Meta identity or migration artifact; and
- one recovered 29-row native owner-export segment matching canonical ordinals 4-32 exactly.

Complete means complete as materialized by the capture-date surface. Deleted,
removed, or otherwise unexposed history is not inferred.
## Professional Finding

The record supports a stronger, bounded role claim: as one of WOW List's
co-builders, Jamie stewarded the project's Facebook publishing from 2015
through 2018. A Page-publisher byline is not sole authorship of shared sources,
sole ownership of WOW List, or evidence that Jamie alone operated every social
channel. Richard Album retains co-builder credit.

The corpus also supports a mission pattern joining calendar onboarding and
participatory feedback with event distribution, cultural-space recovery and
funding, civic-action calendars, and community care. Theme counts overlap.
Circulation is not source authorship, linked-organization endorsement, or
causation of campaign outcomes.

## Public Safety

The public ledger contains identifiers, dates, public URLs, classifications,
source dispositions, integrity controls, and explicit boundaries. It excludes
raw post text, comments, reactor and commenter identities, administrator
analytics, authenticated-session state, credentials, and machine-local paths.

The protected verifier pins all four input-file digests and reproduces the
management, detail, canonical, attribution, export-ID, Page-ID, and creation-date
reconciliations without publishing protected data.

## Recursive Hill Climb

The first independent archival judge returned `REVISE`. It found that required
substrings could coexist with appended contradictions, owner-export window
dates were not exact, per-record attribution was not reproduced, and the
manifest lacked full fail-closed validation.

The repair:

1. Replaced substring-presence checks with exact canonical boundaries and exact nested schemas.
2. Added exact owner-export windows, Page-ID distribution, and creation-date reconciliation.
3. Added per-record protected attribution, disposition, ID, and date checks.
4. Added strict manifest population, owner-export, privacy, path, date, status, and digest controls.
5. Added a canonical semantic digest over every record's identity, date, disposition, attribution, themes, and links.
6. Anchored canonical, management, semantic-record, whole-corpus, and protected-input digests as complementary controls.
7. Expanded the repository suite to reject 51 unsafe mutations while accepting five harmless reorderings.

A second archival judge passed the repaired candidate but noted that lower-level
validators still accepted self-consistent substitutions if their internal
hashes were recomputed. The semantic digest was then anchored to the protected
derivation and explicit self-consistent date, ID, link, theme, and disposition
mutations were added.

The final fresh judge independently rejected 19 ledger mutations and 12
manifest mutations beyond the bundled suite, while accepting six harmless
reorderings. It returned 4/4 on every criterion.

## Independent Scores

| Judge | Population | IDs / records | Attribution | Sources | Safety | Adversarial | Lifecycle | Verdict |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Archival, first pass | 3 | 3 | 3 | 4 | 4 | 2 | 4 | Revise |
| Archival, repaired pass | 3 | 3 | 4 | 4 | 4 | 3 | 4 | Pass |
| Archival, final confirmation | 4 | 4 | 4 | 4 | 4 | 4 | 4 | Pass |

| Chad-lens judge | Chad lens | Hiring clarity | Role specificity | Evidence depth | Composition | Trust | Lifecycle | Verdict |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Independent hiring review | 4 | 3 | 4 | 4 | 3 | 4 | 4 | Pass |

The Chad-lens judge found no critical issue. Its structured-source note was
addressed by adding the 54-post Facebook stewardship record to WOW List's work
metadata and evidence list.

## Verification

- Dedicated corpus check passed.
- Protected-input verifier passed with explicit local paths.
- Built-in adversarial suite rejected 51 unsafe mutations and accepted five safe mutations.
- Independent final matrix rejected 31 additional unsafe mutations and accepted six safe reorderings.
- Citation, lifecycle, portfolio-eval, TypeScript, ESLint, Next.js build, knowledge-bank, public-safety, and route gates passed.
- The held traction claim remains absent from the public citation registry and website.
