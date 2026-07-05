# Jamie Burkart Portfolio

Focused, public-safe portfolio for Jamie Burkart: Technical Project Manager - Product Operations & Implementation.

## Stack

Next.js App Router, React, TypeScript, MDX, Tailwind CSS, daisyUI, Node 26, Docker, Dokku.

## Local Development

```bash
nvm install
nvm use
npm ci
npm run dev
```

## Checks

```bash
npm run check
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output. Keep deployment staging-first:

1. Develop locally.
2. Run `npm run check`.
3. Run a Docker smoke test.
4. Deploy the branch to <https://staging.jamieburk.art>.
5. Review staging.
6. Promote the same approved commit to <https://jamieburk.art>.

Use separate Dokku apps and remotes:

```bash
git remote add dokku-staging dokku@DROPLET_HOST_OR_IP:jamieburk-art-staging
git remote add dokku-production dokku@DROPLET_HOST_OR_IP:jamieburk-art
git push dokku-staging HEAD:main
git push dokku-production HEAD:main
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

Full setup notes live in `docs/deployment.md`.

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`
- Do not commit Trade Gothic, Verlag, Gotham Rounded, FondFont RISQUE, Maria handwriting font, or any private/proprietary font files.
- V1 public web font: Karla. See `docs/typefaces.md` before adding fonts.

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.

See `docs/launch-blockers.md` for the full production approval list.
