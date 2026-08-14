# NYC Artist Coalition campaign press close-reading hill climb

Date: 2026-07-14

Branch: `feature/evals-H`

## Objective

Aggregate every article listed in the Press sections of Let NYC Dance, Talks
Not Raids, Save NYC Spaces, and Fair Rent NYC; mature each article into a
public-safe knowledge-bank record; preserve archival availability and campaign
provenance; and project only what improves the current portfolio argument.

## Corpus

The four campaign indexes contain 45 placements representing 44 distinct
articles:

| Campaign | Placements |
| --- | ---: |
| Let NYC Dance | 21 |
| Talks Not Raids | 7 |
| Save NYC Spaces | 8 |
| Fair Rent NYC | 9 |

The September 20, 2017 NPR article appears in both Let NYC Dance and Save NYC
Spaces. The bank retains both campaign memberships and one canonical article
identity.

Every distinct article now has:

- a canonical source record and an explicit Wayback route;
- one source-specific reading with review date and content fingerprint;
- a bounded paraphrase, locator, supported propositions, and non-claims;
- campaign-placement and reading observations;
- separate observations for every direct attribution retained from the source.

The reading pass used 32 publisher pages and 12 Wayback captures. Forty-three
records contain recovered article or program-page text. The Crain's record is
explicitly limited to its archived headline and deck because the body remained
behind a continuation prompt. The CityLab record uses the archived 2017 article
rather than a misleading generic Bloomberg redirect.

The repository retains no copyrighted article bodies. It stores public routes,
fingerprints, bounded paraphrases, propositions, attributions, and limitations.

## Findings

Thirty direct attributions are separately inspectable. Nineteen readings name
NYC Artist Coalition or a reported variant; three explicitly name Jamie:

- Gothamist reports Jamie's fire-code study groups, City Hall rally, coalition
  affiliation, and public safety analysis;
- Bedford + Bowery identifies Jamie among coalition speakers at the Office of
  Nightlife town hall;
- NPR identifies Jamie as a founding member of the organization it prints as
  `NYC Arts Coalition` and reports his support for repeal.

The NPR wording remains attributed and exact. It is not silently normalized or
used to imply sole founding, leadership, or causation.

## Recursive climb

An initial close-reading candidate passed deterministic content checks but a
skeptical policy-editor holdout rejected its statement that all 44 articles had
Wayback routes: five verified routes existed in the research artifacts but had
not been committed to the campaign inventory.

The next candidate added those routes, the duplicated NPR route, and a hard
44-identity route gate. A further audit found that three reused canonical source
records still lacked the same archive metadata. The final candidate unified
inventory and canonical provenance, regenerated the public citation registry,
and made complete route coverage a deterministic requirement in both layers.

Two fresh independent holdouts then accepted all ten criteria at 5 / 5 with no
blockers or regressions:

1. `nycac-press-holdout-policy-editor-final-2026-07-14`
2. `nycac-press-holdout-archivist-final-2026-07-14`

## Projection decision

The aggregate press-archive claim remains held with no public surface. The
current case study already cites the strongest sources for Jamie's direct role,
including Gothamist, NPR, Bedford + Bowery, official testimony, repository
history, and government records. Publishing the complete bibliography would
increase reader burden without improving the present hiring argument.

This is selective composition, not discarded evidence. The deeper corpus is
available for future applications, research, collaborator review, and new
public arguments.

## Verification

- campaign corpus: 4 indexes, 45 placements, 44 identities;
- archive coverage: 44 / 44 inventory routes and 44 / 44 canonical routes;
- reading closure: 44 / 44, including 43 recovered bodies or pages and one
  explicit partial record;
- attribution observations: 30 / 30;
- final independent holdouts: 2 / 2 at 5 / 5 across all ten criteria;
- public projection: held; no new reader-facing claim added.

## Decision

Accept the iteration. The campaign press corpus is complete as an archival and
research layer, honest about partial recovery, protected against redirect and
provenance regressions, and available for selective future recomposition.
