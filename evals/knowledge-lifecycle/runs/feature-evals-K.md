# feature/evals-K knowledge lifecycle run

Date: 2026-07-13

Decision sought: whether the repository can safely preserve professional
fragments, develop them into defensible claims, and compose selective public
arguments without turning the website into an archive or claims database. This
decision does not authorize production publication.

## Score history

| Pass | Criterion scores | Weighted score | Result |
| --- | --- | --- | --- |
| Baseline | 2 / 3 / 3 / 2 / 3 / 2 | 51 | The intent was present, but intake, maturation, promotion, retrieval, and media feedback were not yet a durable system. |
| First implemented loop | 3 / 3 / 3 / 3 / 3 / 3 | 60 | Real records existed, but independent reviews exposed missing receipts, weak graph semantics, incomplete query dimensions, and publication-governance gaps. |
| Final judge A | 4 / 4 / 5 / 5 / 4 / 5 | 90 | Framework-ready. |
| Final judge B | 4 / 5 / 5 / 4 / 4 / 5 | 90 | Framework-ready. |

The final pair is stable with no weighted-score difference. A separate fresh
judge scored the same corpus 93 and also returned `framework-ready`.

## Accepted repairs

- Added immutable intake receipts plus mutable lead records, duplicate
  disposition, bare-URL capture, public/private boundaries, stable IDs, and
  actionable next steps.
- Added atomic source observations with locators, evidence roles, certainty,
  limitations, and reciprocal candidate-claim links.
- Added candidate maturity, counterevidence posture, source-independence notes,
  append-only history, research tasks, and explicit promote, research, hold,
  and correct decisions.
- Required an active, exact-surface, human-approved `promote` or `correct`
  decision before a public composition can resolve.
- Added editorial briefs and purpose-specific retrieval by project, entity,
  period, capability, maturity, confidence, evidence role, source kind,
  research priority, audience, purpose, and surface.
- Added a publication-safe retrieval mode that excludes pending or ineligible
  decisions and reports the governing decision IDs.
- Added media leads that preserve rights, consent, display, research, and claim
  boundaries while allowing visual discoveries to flow back into research.
- Kept lifecycle records out of the application barrel and added a compiled
  artifact scan for opaque protected locators.

## Content developed

The run ingested and decomposed public material about Jamie's early
participatory practice, waterways work, NYC Artist Coalition advocacy, and
CallNYC. It promoted narrow, bounded claims about:

- the collective Missouri raft expedition and Jamie's originating role;
- Great Accommodations and its participatory methods;
- Open House and Jamie's instigating role within a collaborative practice;
- Jamie's Cabaret Law repeal advocacy and cultural-space safety work;
- Talks Not Raids advocacy and coalition work on MARCH transparency and data;
- three existing CallNYC claims already approved for the current case study.

The Gulf endpoint, instrumental causality for Cabaret Law repeal, MARCH
phaseout, Office of Nightlife creation, town-hall production and influence, and
Council-member social engagement remain captured or researching. A protected
participant photograph remains held; its visible text became bounded research
evidence without authorizing image display.

## Verification evidence

- Knowledge lifecycle validation and all 21 lifecycle regression tests passed.
- Citation registry validation and all 9 citation tests passed.
- Eval-runner tests, TypeScript, lint, public-safety, knowledge-bank, and route
  checks passed.
- The production-configured Next.js build generated all 17 expected routes.
- The compiled-output scan found none of the 7 protected locator IDs in
  deployable application artifacts.
- Release profile: all five deterministic gates passed, final scores were
  90 / 90, stable pair was `yes`, and stop condition was `yes`.

## Boundaries and next research

- Live public pages should gain independent preservation where lawful and
  useful; current verification dates and locators protect against silent drift
  but do not replace preservation.
- Near-duplicate detection can become more assistive without making fuzzy
  similarity an automatic rejection rule.
- The intake report can make unincorporated receipts more visible as a backlog
  while preserving the distinction between immutable capture and mutable work.
- Existing portfolio surfaces should enter lifecycle governance incrementally,
  with a purpose-specific brief and exact-surface human decision for each use.

## Decision

The recursive stop condition for **framework-ready** is reached. The knowledge
bank can accept incomplete material now, preserve uncertainty, mature claims
through research, and supply selective public compositions. There is still no
public `/proofs`, `/knowledge-bank`, or `/public-claims` route. Production
publication remains Jamie's explicit human decision.
