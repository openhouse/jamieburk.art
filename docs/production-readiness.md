# Production Readiness

This repo is staging-first. Production at `jamieburk.art` becomes indexable
only after Jamie approves the exact public surfaces.

## Release Principles

- The website projects from `docs/proofs-bank/claims.md`.
- Public pages use only `approved` or `public-safe` claims.
- Missing approvals are recorded in docs and PR notes, not hidden in public
  copy.
- Production indexing requires `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- Production contact requires `NEXT_PUBLIC_CONTACT_EMAIL`; optional LinkedIn
  and GitHub rows remain hidden unless configured.
- Staging and local builds remain `noindex`.

## Production Gate

Run:

```bash
npm run check
npm run check:routes
npm run check:public-safety
npm run check:production
```

If the approved resume PDF is not present, `check:public-safety` and
`check:production` should block launch.

## Current Expected Blockers

- Placeholder resume PDF.
- Public contact details pending approval.
- Exact metrics and screenshots pending approval.
