# Blind-Spot Evals

These seven evals turn the current portfolio blind spots into explicit,
independently runnable contracts. A green check means the repository tells the
truth about a risk, preserves its boundary, and names the next action. It does
not mean that automation has supplied missing human testimony, external hiring
research, collaborator consent, or visual approvals.

The statuses are deliberately limited:

- `strengthened`: the repository and public projection now directly answer the
  criterion, while normal review still applies.
- `partially-resolved`: stronger evidence or structure exists, but material
  questions remain open.
- `governed-open`: the missing evidence is truthfully recorded with a protocol,
  boundary, and next action.

Run all seven:

```sh
npm run evals:blind-spots
```

Run one:

```sh
npm run evals:outcomes-adoption
npm run evals:role-corroboration
npm run evals:hiring-comprehension
npm run evals:present-tense-offer
npm run evals:visual-artifact-proof
npm run evals:archival-survivorship
npm run evals:release-governance
```

Human and external gates remain release inputs. These deterministic checks are
regression protection, not substitutes for judgment or research participants.
