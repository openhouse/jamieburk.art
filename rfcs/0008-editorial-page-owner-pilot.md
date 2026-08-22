---
rfc: 8
title: Editorial page-owner pilot
stage: proposed
start_date: 2026-08-22
authors:
  - Jamie Burkart
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - editorial-governance
  - evaluation
  - public-safety
implementation: colophon-pilot
supersedes: []
superseded_by: null
---

# Editorial page-owner pilot

## Summary

Pilot a magazine-like editorial review pattern on the portfolio colophon. Each
participating page has a declared purpose, a small set of named fictionalized
editorial lenses, one specific question per lens, deterministic prerequisites,
and an all-pass modeled review. Modeled review remains advisory. Jamie Burkart
is the publication owner and the only person authorized to approve publication.

## Motivation

The portfolio already evaluates claims, public safety, accessibility, and
release discipline. Those checks do not fully answer whether an individual page
is coherent, useful, and editorially complete. A page-owner desk makes those
questions explicit and preserves constructive criticism when a candidate does
not pass. The colophon is the first pilot because it explains the system itself.

## Goals

- Give each pilot page one explicit purpose and acceptance rule.
- Run deterministic checks before any model call.
- Give each editorial lens one distinct, auditable question.
- Bind modeled assessments to exact public render evidence.
- Preserve constructive criticism for subsequent revisions.
- Keep human publication authority and modeled feedback unmistakably separate.

## Non-goals

- Do not claim that a named person participated, consented, approved, or endorsed.
- Do not make a model verdict sufficient for publication or deployment.
- Do not assign owners to every route during this pilot.
- Do not expose repository code, private sources, or protected archives to a
  public-surface reviewer.
- Do not replace claim, consent, rights, accessibility, or release gates.

## Terminology

**Page owner:** A registered fictionalized editorial lens used to test one
defined property of a page. It is not the named person and holds no authority.

**Editorial desk:** The aggregate modeled gate. It passes only when every
registered lens passes.

**Publication owner:** Jamie Burkart, who retains final editorial and deployment
authority.

**Public packet:** The rendered page text, responsive screenshots, and public
resume or other public artifact explicitly named by an evaluation. It excludes
the repository and private sources. A lens may receive the default public state
or a named expanded public interaction when its question requires that view;
the registry records the state, and the run receipt binds both renderings.

## Detailed design

The registry is the source for the colophon eval, not a public-facing feature.
This keeps the modeled editorial desk from becoming the subject of the page or
suggesting that the named people participated. Each owner record contains a
stable ID, public biographical basis, editorial focus, question, and pass
definition. The public colophon should lead with purpose and demonstrate its
method concisely; governance detail belongs here and in the private evaluation
record rather than accumulating as defensive public copy.

### Transferable editorial decisions

- **Tell the method through one artifact.** The pilot follows one approved
  photograph through selection, observation, writing, and revision rather than
  presenting an inventory of the system. This artifact-led story makes the
  method intuitive while keeping the public page composed.
- **Compress public prose intentionally.** Public copy should carry only the
  purpose, concrete evidence, credit, refusal path, and revision mechanism a
  reader needs. The registry, RFC, and evaluation record retain the fuller
  governance explanation.
- **Authorize each public occurrence.** Library access or general clearance is
  not enough. The deterministic gate must confirm that the public asset record
  explicitly permits the photograph's colophon placement and constrains its
  use to the approved occurrences.
- **Model perspective, not authority.** A named page owner is an isolated,
  fictionalized editorial lens. Its result can reveal reader burden and guide
  revision, but it cannot grant consent, certify a fact, approve publication,
  or stand in for the person named.
- **Spend model calls only after deterministic gates pass.** Route, registry,
  public-language, privacy, asset-occurrence, and packet-materialization checks
  must succeed before any modeled review runs.
- **Bind review to the exact public experience.** The receipt covers rendered
  text and responsive screenshots as well as page and registry inputs. A change
  to any covered artifact invalidates the modeled sign-off.
- **Keep the final decision human.** An all-pass modeled desk is advisory.
  Jamie alone decides whether the exact candidate is ready to publish and
  deploy after reviewing truth, consent, rights, credit, metadata, and context.

The eval runs in two stages:

1. Deterministic checks validate the route, purpose, owner order, distinct
   questions, public boundary, required page signals, and exact public packet.
2. One isolated model call per lens receives only that public packet and returns
   `Pass` or `Fail`, evidence, critique, requested revisions, and a no-endorsement
   boundary.

For this pilot, the web-form and infrastructure lenses inspect the expanded
public source-note interaction. The editorial-clarity lens inspects the default
first-read state. This is an explicit division of editorial jurisdiction, not a
change in the page or access to backstage material.

The aggregate passes only when all results pass. Any page, registry, rendered
text, or screenshot change invalidates the run receipt.

## Security and privacy

Review packets fail closed when required public artifacts are absent. They may
not contain private locators, source archives, raw transcripts, correspondence,
signed URLs, or repository access. A modeled result must state that the named
person did not participate. Access, evidence, consent, publication permission,
and editorial usefulness remain separate questions.

## Publication workflow

The pilot page and its eval are joined by an exact candidate receipt rather than
by visible page-owner copy. The receipt records hashes for the page source,
registry, default and expanded rendered text, responsive screenshots, and three
modeled results.
Passing the desk does not publish anything. Jamie reviews the public page,
rights, consent, credit, metadata, and release candidate before authorizing a
deployment.

## Rollout plan

1. Pilot the registry and review desk on `/colophon`.
2. Observe whether the three questions produce useful, non-duplicative edits.
3. Review cost, false-pass risk, maintenance burden, and reader value.
4. If Jamie accepts the broader pattern, define criteria for assigning page
   owners to additional routes and advance this RFC in a separate decision.

Rollback is deletion of the pilot registry and eval scripts; the page remains an
ordinary authored colophon.

## Decision gates

- Deterministic contract and privacy tests pass.
- Each fictionalized lens returns a well-evidenced result.
- Jamie confirms that the private editorial desk improves rather than burdens
  the public page.
- Jamie separately decides whether to extend page ownership beyond the colophon.

## Drawbacks

Named lenses can create an accidental impression of endorsement, even with a
clear disclaimer. Model calls add cost and can reward surface polish over truth.
Exact-candidate receipts add maintenance work. An all-pass rule can encourage
unnecessary convergence among genuinely different editorial perspectives.

## Alternatives

- **Ordinary editorial checklist:** cheaper and less anthropomorphic, but offers
  less distinct critique and no simulated reader conversation.
- **One generalist judge:** simpler, but collapses web form, infrastructure, and
  editorial selection into one ambiguous score.
- **Human-only review:** remains the final authority, but is not always available
  for every iteration and does not produce repeatable preflight feedback.
- **Do nothing:** avoids new machinery but leaves page-level editorial coherence
  implicit.

## Unresolved questions

- When does a route merit page owners instead of deterministic checks alone?
- Should owners attach to a page, a claim family, an audience, or a release?
- How often should the named lenses change as the opportunity set changes?
- What evidence would justify accepting this pattern beyond the colophon pilot?
