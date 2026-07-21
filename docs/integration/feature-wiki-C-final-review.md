# feature/wiki-C Final Review

Date: 2026-07-21

Pull request: `feature/wiki-C` into `develop`

## Decision

Use `feature/knowledge-wiki-E` as the sole Knowledge Wiki architecture. Preserve
the strongest distinctive contributions from A through D by adapting them into
E's governed Markdown graph, not by merging five parallel systems.

## What enters develop

- E's canonical compiler, schema, graph, generated views, decision records,
  source-return practice, employment context, and selective projection model.
- A's source-to-story practice, public knowledge in participants' own terms,
  and visual-rights sequence.
- B's shared-identity, learning-through-making, and human-authored-stakes
  methods.
- C's Jamie-at-work account, participation method, delivery/use/adoption
  distinctions, and claim-maturity tests.
- D's readable relation semantics and maintenance, handoff, and stewardship
  distinctions.
- A family-closure decision, exact donor register, contradictory-census
  reconciliation, adversarial evals, and pull-request CI.

The public-site code remains the bounded projection selected in E. The closure
layer after E adds no new public application source.

## What does not enter develop

- Parallel Wiki roots, compilers, schemas, lifecycle stores, or explorers.
- A universal NYC Artist Coalition shared-folder count. The five run-specific
  observations remain separate and unresolved.
- Raw private archives, protected source paths, secrets, stakeholder records,
  or unreviewed personal material.
- A public `/proofs`, `/wiki`, `/knowledge`, `/knowledge-bank`, or
  `/knowledge-wiki` route.
- Automated approval of first-person language, collaborator credit, consent,
  media rights, production deployment, or hiring outcomes.
- Implementation of the proposed shared public/private Wiki core. RFP 0001
  remains a proposal for later review.

## Review path

1. Read the [family decision](../knowledge-bank/decisions/knowledge-wiki-family-closure.md).
2. Inspect the [donor and destination register](knowledge-wiki-family-closure.md).
3. Review the [census reconciliation](../knowledge-bank/data/knowledge-wiki-family-census-reconciliation.json).
4. Sample the [canonical story bank](../knowledge-bank/indexes/canonical-story-bank.md),
   [Jamie at work](../knowledge-bank/methods/jamie-at-work.md), and
   [outcomes and adoption](../knowledge-bank/methods/outcomes-and-adoption.md).
5. Confirm the pull-request check is green and inspect any intentional human
   gates in the [Wiki health report](../../reports/wiki-health.md).

## Machine acceptance

The pull-request workflow installs the declared Node and npm dependencies and
runs the complete blocking suite:

```bash
npm ci
npm run check
```

The full check includes citation, public-safety, route, portfolio, professor,
accessibility, composite, lifecycle, archival, Knowledge Wiki, hiring, build,
lint, and type checks. The family-closure layer is also directly inspectable:

```bash
npm run wiki:eval:family-closure
node --test scripts/knowledge-wiki/family-closure-eval.test.mjs
```

## Human acceptance still open

Jamie retains final editorial and merge authority. Collaborators and rights
holders retain authority over their roles, words, identities, and media.
Production deployment and indexing remain separate decisions. Employer
judgment, hiring validation, and employment outcomes remain unobserved.

Machine success means the candidate is internally consistent, source-bounded,
public-safe under the encoded controls, and ready for human review. It does not
mean every human gate has been completed.
