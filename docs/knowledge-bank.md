# Knowledge Bank

The canonical knowledge bank lives in `docs/knowledge-bank/` and
`apps/www/src/data/proofs.ts`.

The public website is a composed projection of that bank. The bank stores
claim language, evidence posture, public-use boundaries, and review status. The
site selects and rewrites the safest useful subset for a reader, role, or
conversation.

## Rules

- Keep private source material out of this repo.
- Add strong claims to `apps/www/src/data/proofs.ts` before projecting them on
  a public page.
- Keep collective work in collective language.
- Keep metrics tied to guardrails.
- Use the homepage for clarity, not exhaustive proof.
- Use case pages for richer context.
- Use docs for governance, checklists, and launch decisions.

## Canonical Files

- `apps/www/src/data/proofs.ts` - structured proof graph.
- `docs/knowledge-bank/claims.md` - human-readable claim register.
- `docs/knowledge-bank/sources.md` - source classes, not private source files.
- `docs/knowledge-bank/source-policy.md` - source-policy entrypoint.
- `docs/knowledge-bank/projection-map.md` - where claims can appear.
- `docs/public-claims-inventory.md` - public page projection inventory.
- `docs/content-safety.md` - publication boundaries.
