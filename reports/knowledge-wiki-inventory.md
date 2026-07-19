# Knowledge Wiki foundation inventory

**Inventoried:** 2026-07-18

**Branch baseline:** `feature/knowledge-m`

**Purpose:** record the authority and migration baseline before adding the
bounded Knowledge Wiki foundation

## Current candidate roots

| Path | Current responsibility | Foundation decision |
|---|---|---|
| `docs/knowledge-bank/` | Public-safe authored research, policy, project notes, and lifecycle reports | Current canonical human-facing Wiki root; retain path during the pilot |
| `apps/www/src/data/knowledge-bank/` | Validated source, claim, evidence, inquiry, correction, citation, intake, and maturation records | Preserve as structured canonical authority |
| `apps/www/src/data/proofs.ts` | Broader professional proof records and audience surfaces | Preserve as canonical proof authority during transition |
| `apps/www/src/data/work.ts` | Structured public work-card and case-study projection data | Preserve as public projection authority |
| `apps/www/src/content/work/` | Authored public case-study narratives | Preserve as public projection authority |
| `docs/qa/` and `scripts/check-*.mjs` | Deterministic and human-required evaluation controls | Extend; do not duplicate |

No `docs/knowledge-wiki/`, `packages/knowledge-wiki/`, database, CMS, or public
Wiki route existed at baseline.

## Structured-record baseline

The validated registry contained:

| Collection | Records |
|---|---:|
| Sources | 216 |
| Claims | 65 |
| Research inquiries | 29 |
| Corrections | 3 |
| Citation pages | 5 |
| Intake items | 67 |
| Source readings | 203 |
| Candidate claims | 100 |
| Promotion decisions | 100 |
| Editorial briefs | 23 |
| Discovery notes | 24 |
| Press collections | 4 |

These counts establish scale, not importance or completeness.

## Existing command families

- `knowledge-bank` validates the proof and authored-document layer.
- `knowledge:intake` and `knowledge:query` support the evidence-maturation
  lifecycle.
- `check:citations`, `test:citations`, and `report:citations` own citation
  consistency.
- `check:knowledge-lifecycle` and the composite eval commands own the existing
  archival-production and portfolio-readiness controls.

The new `wiki:*` commands must compile authored navigation and stable Wiki page
identity while calling into, rather than recopying, these authorities.

## Duplicate-system risks

The principal risk is copying canonical claims and source metadata from
TypeScript into Markdown frontmatter. The pilot therefore stores only page
identity, relation intent, governance fields, and `canonical_refs`. Exact claim
wording, evidence posture, source URLs, correction decisions, and citation
occurrences remain canonical in the existing validated registry.

The second risk is creating `docs/knowledge-wiki/` beside the extensive current
root. The pilot retains `docs/knowledge-bank/` and changes the product language
before considering a link-aware path migration.

## Public and protected boundary

This repository is public. Protected raw evidence, local filesystem paths,
private correspondence, participant records, private photographs, credentials,
legal-review material, and private source locators remain outside it. Wiki pages
may preserve a public-safe boundary or rights state, but that label never makes
unsafe content appropriate to commit.

## Bounded pilot

The first pilot covers:

- the CallNYC project;
- the 2016 Council constituent-services hackathon event;
- three public source records;
- one protected-media summary without the media or locator;
- one canonical claim and its anti-claim boundary;
- one chronology correction;
- Technical Operations capability and OTI opportunity lenses;
- two public projection records;
- the Source-Backed Team Memory method.

The pilot is deliberately large enough to exercise links, identity, evidence,
correction, rights, projection, and opportunity retrieval, but small enough to
review as one coherent system.
