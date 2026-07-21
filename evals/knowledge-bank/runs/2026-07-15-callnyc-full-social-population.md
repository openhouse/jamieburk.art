# CallNYC full social-population hill-climb run

**Run date:** 2026-07-15
**Branch:** `feature/evals-H`
**Account:** `@CallNYCapp`

## Objective

Account for the full profile-reported population, preserve every recovered
posted URL, classify mission-relevant sources and issue patterns, audit
attributable stakeholder engagement, and strengthen the selective website
projection without overstating content recovery, authorship, endorsement, or
institutional adoption.

## Population result

| Measure | Result |
| --- | ---: |
| Profile-reported population | 110 |
| Population dispositions | 110 |
| Recovered content objects | 107 |
| Not-recovered population slots | 3 |
| Ordinary CallNYC-authored posts | 86 |
| CallNYC replies | 6 |
| Reposted external posts | 15 |
| Distinct posted short URLs | 84 |

The stopping condition is 100 percent disposition coverage, not 100 percent
content recovery. The three unresolved records remain open without an inferred
cause.

## Mission and traction result

- 71 recognition posts connected 26 Council handles with 61 distinct CallNYC
  issue pages.
- All 41 recovered CallNYC-authored or reply posts with visible reposts were
  audited.
- Those posts displayed 74 reposts; current public lists exposed 63 account
  appearances from 46 distinct accounts.
- Eleven displayed reposts had no currently public account identity.
- At least 19 distinct serving 2016 Council-member accounts appeared in public
  repost lists.
- Six Council-member-authored posts or replies explicitly involved CallNYC.
- City-agency, civic-tech, legal/service, community-network, constituent, and
  press engagement was retained as segmented stakeholder evidence.

## Source roles

The source inventory separates direct project coverage from narrower roles:

- Politico: direct CallNYC coverage;
- Participatory Politics: peer civic-technology context;
- Gizmodo and 311 Buddy: adjacent open-data tools;
- Gothamist: issue context;
- HRA and NYC Rent Freeze: public-service guidance.

Contextual sources cannot be promoted into direct project coverage.

## Hill-climb iterations

### Iteration 1: lifecycle and schema fit

The first run rejected new intake, observation, and source-kind labels that did
not belong to the existing schema vocabulary. The records were normalized to
the bank's established kinds while preserving the more specific source roles
inside bounded descriptions and the population manifest.

### Iteration 2: projection traceability

The second run found that the CallNYC page plan still cited the earlier partial
social inventory. The occurrence was rewired to the full-population manifest
and the official Council roster.

### Iteration 3: anti-gaming language

The new criterion required literal, durable boundaries for disposition versus
content recovery, original-author metrics, and contextual source roles. The
report and anti-claims were tightened until all checks passed.

## New hard criterion

`KB-EVAL-CALLNYC-FULL-POPULATION` requires:

- exactly 110 dispositions, 107 recovered objects, and three unresolved slots;
- unique status IDs and complete relationship counts;
- all 84 posted URLs with recovered parent-status references;
- exact content-system and repost-audit counts;
- 19 unique Council-member reposter identities with public post evidence;
- six unique member-authored interactions;
- one and only one direct-project-coverage role among the classified source
  readings;
- lifecycle records, held archive depth, and a selective public projection;
- explicit anti-claims for unresolved records, original-author metrics, source
  roles, endorsement, and official adoption; and
- no raw tweet bodies, authentication material, private paths, or session data.

Adversarial unit tests fail the criterion when a population row is dropped, a
not-recovered slot is relabeled, a Council identity is duplicated, an
original-author metric boundary is removed, or a contextual article is
promoted into direct CallNYC coverage.

## Deterministic result

- 12 of 12 criteria scored 5.
- Weighted score: 5.0.
- 86 of 86 unit tests passed.
- Canonical validation returned no errors.
- The acceptance gate remains intentionally open because the eval-suite change
  invalidates prior independent holdout runs; zero of two fresh holdouts are
  recorded.

No protected-support source was exported to an external judge during this run.
