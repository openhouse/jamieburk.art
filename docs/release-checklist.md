# Release Checklist

Production remains blocked until:

- Jamie approves the exact resume PDF.
- Jamie approves exact public contact presentation.
- `npm run check` passes.
- `npm run public-safety` passes.
- `npm run preflight:staging` passes.
- `npm run preflight:production` passes in the intended mode.
- Staging noindex is verified.
- Production sitemap/canonical URLs are verified.
- No visible public TODOs remain.
- No private/draft work items are published.
- No private/proprietary font files are committed or served.
- Proof metrics are approved or softened.
- Collaborator-sensitive language is approved.
- Route redirects are confirmed.
- Jamie approves the exact commit for production promotion.

Production may be deployed as a noindex soft launch before final indexing.
Indexable production additionally requires `NEXT_PUBLIC_ROBOTS_POLICY=index`,
approved public contact values, and an approved resume PDF.
