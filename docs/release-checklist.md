# Release Checklist

## Required Before Staging Review

- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run public-safety`
- local Docker build and run
- staging noindex verified
- `/api/health` verified
- `/robots.txt` verified
- `/sitemap.xml` verified
- core routes verified

## Required Before Production Deploy

- exact same commit reviewed on staging
- approved resume or resume link hidden
- approved contact path or optional contact rows hidden
- no visible internal approval notes
- claims aligned with `docs/proofs-bank.md`
- public-safety check passes
- production preflight passes
- redirects verified
- sitemap and canonical URLs correct
- private materials absent
- private font files absent

## Required Before Production Indexing

- Jamie approves exact public content
- claims approved or softened in `docs/proofs-bank.md`
- artifacts approved or hidden
- canonical URLs final
- robots/indexing intentionally enabled
- production spot check complete
