# Release Checklist

## Required Before Staging Review

- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run public-safety`
- local Docker build and run
- staging noindex verified
- core routes verified
- `/api/health` verified
- `/robots.txt` verified
- `/sitemap.xml` verified

## Required Before Production Deploy

- same reviewed commit from staging
- approved resume or resume hidden
- approved contact path or optional contact rows hidden
- no visible TODOs
- public-safety production check passes
- production preflight passes
- redirects verified
- sitemap and canonical URLs correct
- private materials absent
- private font files absent

## Required Before Indexing

- Jamie approves exact content
- claims approved or softened
- artifacts approved or hidden
- canonical URLs final
- robots/indexing intentionally enabled
- production spot check complete
