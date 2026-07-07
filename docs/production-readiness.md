# Production Readiness

The goal is not a bigger site. The goal is a site Jamie can trust.

## Launch Gates

- `apps/www` remains the canonical app.
- npm workspaces remain the package manager.
- Node 26 is used for final verification.
- The public-safe knowledge bank exists at `docs/knowledge-bank/`.
- App proof projection exists at `apps/www/src/data/proofs.ts`.
- Public-safety and knowledge-bank checks pass.
- Staging is reviewed before production.
- Production indexing is opt-in with `NEXT_PUBLIC_ROBOTS_POLICY=index`.
- The resume PDF is noindexed unless Jamie later approves indexing.
- The exact reviewed commit is approved before production deploy.
- Private source material is not committed or deployed.

## Required Commands

```bash
nvm install
nvm use
node --version
npm ci
npm run typecheck
npm run lint
npm run build
npm run check
npm run knowledge-bank
npm run public-safety
npm run preflight:staging
npm run preflight:production
```

## Browser QA

Before production, review:

- 320px width
- Desktop width
- Keyboard navigation through top-level routes
- Skip-link focus and movement
- Visible focus states on nav, buttons, cards, and footer links
- Proof-strip readability
- Contact and resume one-click actions
- Reduced-motion behavior

## Smoke Checks

Staging:

```bash
curl -i https://staging.jamieburk.art/api/health
curl -i https://staging.jamieburk.art/robots.txt
curl -i https://staging.jamieburk.art/sitemap.xml
curl -I https://staging.jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
curl -I https://staging.jamieburk.art/opengraph-image
```

Production after Jamie approval:

```bash
curl -i https://jamieburk.art/api/health
curl -i https://jamieburk.art/robots.txt
curl -i https://jamieburk.art/sitemap.xml
curl -I https://jamieburk.art/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
curl -I https://jamieburk.art/opengraph-image
curl -I https://www.jamieburk.art
```

Production must receive the exact reviewed staging commit.
