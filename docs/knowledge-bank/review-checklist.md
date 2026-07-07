# Knowledge-Bank Review Checklist

Use this checklist before strengthening public copy or moving from staging to
production.

## Files

- `docs/knowledge-bank/README.md`
- `docs/knowledge-bank/chad-lens.md`
- `docs/knowledge-bank/claims.md`
- `docs/knowledge-bank/claims.json`
- `docs/knowledge-bank/proofs.md`
- `docs/knowledge-bank/anti-claims.md`
- `docs/knowledge-bank/source-policy.md`
- `docs/knowledge-bank/publication-rules.md`
- `docs/knowledge-bank/opportunities/oti-technical-operations.md`
- `docs/knowledge-bank/opportunities/source-backed-team-memory.md`

## Checks

- `npm run knowledge-bank`
- `npm run public-safety`
- `npm run preflight:staging`
- `npm run preflight:production`

## Editorial Questions

- Can future edits strengthen public claims through the bank, not directly in
  components?
- Are high-impact metrics softened or approval-gated?
- Are exact claims supported by an allowed source class?
- Are private source contents excluded from the repo?
- Is Jamie visible as the actor without overstating sole ownership?
- Are collective civic and cultural efforts described with collective-work
  language?
- Does the public page say what became usable?
- Does the fallback wording still work if the exact claim is not approved?

## Production Questions

- Contact email is visible and clickable.
- LinkedIn is omitted unless exact approved URL is supplied.
- Phone does not appear in HTML.
- Resume PDF is noindexed.
- Resume PDF content, metadata, phone, dates, links, and claims have Jamie
  approval before production.
- Production indexing is explicitly enabled only for `https://jamieburk.art`
  with `NEXT_PUBLIC_ROBOTS_POLICY=index`.
