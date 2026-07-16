# WOW List full-population recursive eval run

Date: 2026-07-15
Branch: `feature/evals-D`
Evaluated content commit: `647d986f21f48a9aae718e057cd7bcd441e91a10`
Suite: `jamieburk-art-launch-readiness` v11

## Scope and reconciliation

The archival pass reviewed the complete 38-record population reported by the
authenticated `@wowlist` profile control. The Posts timeline yielded 37 unique
records. One account-authored reply appeared only in Replies, bringing the
deduplicated union to 38. Repeated no-growth passes produced no additional
records. The recovered population therefore reconciles to 100 percent of the
profile-reported count for this dated observation.

The 38 records comprise:

- 16 original posts;
- 6 replies;
- 16 reposts;
- 22 account-authored records and 16 redistributed records;
- 31 records containing an external link;
- 35 external-link occurrences representing 35 distinct short URLs;
- 19 of 22 account-authored records containing 23 external-link occurrences.

The repository fixture retains public metadata, URLs, record classifications,
timeline membership, and dated aggregates. It excludes post text, cookies,
authenticated session state, private records, and local machine paths.

## Mission-relevant discoveries

The account functioned as more than a broadcast feed. Its recurring uses
included project-origin documentation, inline product support, circulation of
community-created onboarding, event and calendar distribution, mission-relevant
source curation, and rapid civic or mutual-aid coordination.

Nine posted sources were selected for deeper mission relevance:

- Santa Cruz Good Times, `Zines 2.0`;
- Grasstronaut, `HOMEWORK: In Every Town - An All-Ages Music Manualfesto`;
- Meow Wolf's annual DIY-spaces fund announcement;
- a community-created WOW List tutorial;
- KQED reporting on mourning after the Ghost Ship fire;
- Indian Country Today guidance for supporting Standing Rock;
- the Allied Media Conference;
- `popular.vote`, a rapid civic-coordination surface;
- Sunday Dinner posts tagged `wowlist`, preserving project lineage.

These records support a claim about curation and operating practice, not a claim
that WOW List authored, endorsed, or caused the work described by each source.

## Reception and engagement

A bounded authenticated search recovered 16 incoming records. Ten records from
ten mission-relevant third-party accounts remained after separating one project
contributor's self-documentation, two context-limited greetings, and three false
positives. Nine third-party records independently posted a WOW List event, list,
or project URL.

The stakeholder sample contains seven DIY arts or music accounts, one calendar
community account, one neighborhood-civic account, and one creative-technology
peer. Especially useful public evidence includes:

- Punks & Criminals saying it was putting shows onto WOW List, direct evidence
  of organizer use;
- Music Hackathon identifying WOW List as an event-sharing service made by its
  co-organizer Jamie Burkart, direct but bounded peer attribution;
- an All Ages account responding to a members-meeting invitation, bounded
  evidence of community dialogue.

The dated visible-engagement snapshot found interaction on 12 of 22
account-authored records: 2 displayed replies, 20 displayed reposts, and 21
displayed likes, for 43 displayed interaction units. These volatile interface
counts do not establish unique people, reach, conversion, endorsement,
attendance, adoption, or impact.

## Knowledge-bank production

The pass produced one canonical public-safe fixture, source records, ten atomic
or bounded claim records, evidence relationships with locators, research
inquiries, and source-maturity reconciliation across the older social intake.

Three claims are selected for the public case study:

1. organizer use documented by Punks & Criminals;
2. Jamie's role documented through bounded Music Hackathon attribution;
3. a historical scale snapshot derived from the maintained public-safe project
   aggregate.

The old omnibus origin-and-use claim is disallowed and deprecated. Metadata-only
source leads remain claim-free in a separate candidate intake until close read.
No raw tweet text or authenticated-session artifact is committed.

## Recursive hill climb

The work moved through these corrections:

1. Reconciled the profile count, Posts, and Replies before interpreting content.
2. Replaced the omnibus social claim with atomic claims and anti-claims.
3. Separated Jamie's role from collective outcomes and platform-wide adoption.
4. Rewrote the public page in Jamie's active first-person voice.
5. Replaced a descriptive placeholder with a real 2017 archived product capture.
6. Added citation-backed organizer use, peer attribution, and historical scale.
7. Separated organizer audience from geographic activity in the summary.
8. Added locators to every surviving social evidence edge.
9. Compacted the short proof page's evidence presentation and removed duplicated
   visibility metadata.
10. Reconciled source maturity across social modules and staged metadata-only
    source leads without claims.
11. Deprecated the superseded omnibus claim and aligned human-readable docs with
    the three active public projections.

## Independent results

Two browser runs and four independent semantic grader runs evaluated the same
content commit.

| Criterion | Run A graders | Run B graders | Threshold | Result |
| --- | --- | --- | --- | --- |
| Responsive | 1.00 | 1.00 | hard gate | pass |
| Accessibility | 1.00 | 1.00 | hard gate | pass |
| Priority artifacts | 1.00 | 1.00 | 0.80 | pass |
| Clarity | 0.86 / 0.86 | 0.84 / 0.88 | 0.80 | pass |
| Chad's lens | 0.86 / 0.87 | 0.86 / 0.87 | 0.80 | pass |
| Knowledge decomposition | 0.91 / 0.95 | 0.95 / 0.97 | 0.80 | pass |
| Editorial composition | 0.82 / 0.82 | 0.87 / 0.86 | 0.80 | pass |
| Writer's voice | 0.90 / 0.89 | 0.85 / 0.91 | 0.80 | pass |

Browser evidence covered eleven public routes at desktop and mobile widths,
200-percent-equivalent reflow, real keyboard traversal, CallNYC and Fair Rent
NYC citations, the resume asset, metadata, and two separate WOW List checks at
320, 375, 768, and 1440 pixels. A first browser attempt timed out and was not
counted; both completed reruns passed against the exact recorded SHA.

## Honest stop condition

All repository-deterministic criteria, both machine-observed hard gates, and all
agent-addressable scored criteria pass in both recorded runs. The suite still
reports the release target as not reached because these criteria are correctly
unobserved:

- `RELEASE-001`: requires production deployment and production-domain checks;
- `APPROVAL-001`: requires Jamie's explicit final public-use and launch approval;
- `APPLICATION-001`: requires a named job and Jamie's final role-specific packet
  selection.

An agent may prepare and report those gates but may not fabricate them. Further
recursive editing would optimize against missing human or production state rather
than a failing machine criterion.
