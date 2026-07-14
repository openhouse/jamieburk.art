# Project social-media archive production

Date: 2026-07-14

Branch: `feature/evals-A`

Starting head: `4dd26e0cd44fbfdb06ed285ed5825723c9434d8f`

## Objective

Treat project social accounts as public identity, engagement, documentation,
and service-routing infrastructure; recover mission-relevant evidence through
Jamie's authenticated X session; and mature significant findings without
turning incomplete timelines, collective accounts, or attention metrics into
overstated impact claims.

## Verified accounts

| Project | Handle | Profile snapshot | Recovered public record |
| --- | --- | --- | --- |
| CallNYC | `@CallNYCapp` | 110 posts | 86 visible statuses; 72 project-authored |
| NYC Artist Coalition | `@NYCArtC` | 5,124 posts | targeted authenticated samples; no complete export |
| WOW List | `@wowlist` | 38 posts | 37 visible statuses; 21 project-authored |
| KC Spaces Fund | `@KCSpacesFund` | 35 posts | 34 visible statuses; 27 project-authored |
| KC Town Hall | `@KCTownHall` | 183 posts | 170 visible statuses; 142 project-authored |

The four NYC Artist Coalition campaign lines use the shared `@NYCArtC`
identity. Its bio explicitly carries `#SaveNYCSpaces`, `#LetNYCDance`,
`#TalksNotRaids`, and `#FairRentNYC`. The current `@fairrentnyc` and
`@sundaydinnernyc` accounts were not attributed to Jamie's projects. This does
not establish that no other account ever existed.

## Archive production

The authenticated pass produced:

- 6 dispositioned intake items;
- 13 located observations;
- 29 public-safe source records;
- 7 bounded claims;
- 3 research inquiries; and
- one selected public projection with six mature or developing claims held.

No direct messages, private analytics, account settings, cookies, security
records, resident addresses, applicant data, or private correspondence entered
the repository.

## Council-account engagement

The CallNYC ledger retains individually linked posts from seven people who were
sitting New York City Council members on the post dates: Peter Koo, Steven
Matteo, Ruben Wills, Rosie Mendez, Helen Rosenthal, Mathieu Eugene, and Margaret
Chin. Term dates were cross-checked against NYC Open Data. CallNYC outreach
tagging an official was not counted as engagement authored by that official,
and Carlina Rivera's 2016 post was excluded from the sitting-member count
because it predates her Council service.

The larger, incomplete NYC Artist Coalition search recovered authored public
posts from at least five sitting members: Stephen Levin, Rafael Espinal, Justin
Brannan, Jimmy Van Bramer, and Brad Lander. That finding remains held. It is a
recoverable floor, not a lifetime total, adoption count, or endorsement count.

## Collective authorship

Jamie states that he established the project accounts so teammates could use
and sustain shared public identities. The public archive supports durable
collective identities and sustained collaborator participation, including
Olympia Kazi's extensive public engagement around `@NYCArtC`; it does not expose
administrator history or identify the human author of a shared-account post.
Jamie's account-establishment memory therefore remains held pending a
collaborator note or minimized public-safe administrative record.

## Selective projection

Only the CallNYC finding enters the website:

> The independent CallNYC prototype Jamie built drew public engagement from
> seven sitting New York City Council members through replies, quote-posts,
> reposts, and direct links.

The visible sentence leads with Jamie's action and the legible result. Its
page-local notes carry the audit method, recovered-floor language, official
term source, and public ledger linking all seven underlying posts. The NYC
Artist Coalition finding remains absent from FairRentNYC.

## Recursive hill climb

The first candidate passed deterministic checks, but a fresh judge rejected
the public composition because the audit note stopped at a profile-level
summary and the FairRentNYC traction sentence did not identify Jamie's action.
The next iteration linked the audit note to the public seven-post ledger and
held the NYC Artist Coalition projection.

A second judge then scored reader burden `3 / 5`: the CallNYC sentence still
carried collection-method language. The final iteration moved method back into
the notes and rewrote the sentence around actor, artifact, and result.

Two consecutive fresh judges accepted every substantive criterion in the final
candidate:

| Suite | Judge A | Judge B | Target | Floors |
| --- | ---: | ---: | ---: | --- |
| Knowledge-bank maturation | 5.00 | 5.00 | 4.50 | all met |
| Launch-readiness judgment | 4.90 | 5.00 | 4.20 | all scored criteria met |

The launch suite remains procedurally unaccepted until Jamie approves the exact
promotion SHA and the deployed production surface passes its required smoke
test. Those are release-time gates, not content defects.

## Verification

- Node `v26.5.0`: passed.
- Citation tests: 10/10 passed.
- Launch-eval tests: 6/6 passed.
- Knowledge maturation and mutation tests: 34/34 passed.
- `npm run check`: passed after the final wording change.
- `npm run preflight:staging`: passed before the wording-only refinement.
- `npm run preflight:production`: passed before the wording-only refinement.
- `npm audit --omit=dev --audit-level=high`: no high or critical advisories;
  two moderate PostCSS advisories remain nested under Next.js, and the proposed
  forced fix is a breaking framework downgrade.
- Authenticated in-app browser QA: the final CallNYC sentence, source ledger,
  official term source, noterefs, backlinks, and absence of the held FairRentNYC
  claim were verified with no console errors.
- Responsive browser QA: CallNYC and FairRentNYC passed at 320, 375, 768, 1024,
  and 1440 px with HTTP 200, one H1, no horizontal overflow, no console errors,
  no broken fragment links, and correct claim visibility.

Generated reports:

- `reports/generated/knowledge-bank-maturation.md`
- `reports/generated/citations.md`

## Decision

Accept the social-media archive-production iteration. It preserves five public
project identities, makes one hiring-relevant CallNYC outcome inspectable,
retains deeper coalition and community findings for future composition, and
keeps authorship, consent, completeness, and institutional-adoption boundaries
intact.
