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

If `npm ci` reports that the lockfile and package files are out of sync, run
`npm install` and commit the updated lockfile with a note explaining why.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

This app deploys to Dokku using Dockerfile deployment and Next.js standalone output.

Likely Dokku app name: `jamieburk-art`.

Target domains:

- <https://jamieburk.art>
- <https://www.jamieburk.art>

One-time Dokku setup to confirm on the host:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku proxy:ports-set jamieburk-art http:80:3000
```

Confirm the intended deploy branch before pushing. If Dokku should deploy from
`develop`, set it explicitly:

```bash
dokku git:set jamieburk-art deploy-branch develop
```

Local deploy examples:

```bash
git remote add dokku dokku@<DROPLET_HOSTNAME_OR_IP>:jamieburk-art
git push dokku develop
```

If the Dokku app expects `main` instead:

```bash
git push dokku develop:main
```

The app serves on port `3000`; Dokku/nginx should proxy the public domain to that container.

Post-deploy checks:

```bash
curl -I https://jamieburk.art
curl -I https://jamieburk.art/api/health
curl -I https://jamieburk.art/sitemap.xml
curl -I https://jamieburk.art/robots.txt
curl -I https://www.jamieburk.art
```

## Content Rules

- Do not publish private emails, raw transcripts, private coalition notes, health or financial details, private correspondence, unapproved photos, private fonts, or credentials.
- Use public-safe summaries, redacted screenshots, representative diagrams, and approved public artifacts.
- Use precise collective-work language: co-built, stewarded, supported, contributed to.
- When uncertain, mark: `TODO: Jamie approval required.`

## Launch Review Claims

These public proof points are currently present in the scaffold and need explicit Jamie approval before launch:

- 14+ years building operating structure.
- 2x revenue growth contribution for a legacy e-commerce business.
- 30+ pages of civic campaign-memory infrastructure.
- 35 city ecosystems reached through WOWList.org.
- 300+ hosted gatherings / 20+ resident artists supported.

Keep contribution language unless stronger causal wording is explicitly approved.

## Launch Inputs Still Needed

- Approved public email address.
- LinkedIn URL and public-ready GitHub URL.
- Current resume PDF to replace the placeholder file at `apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`.
- Public-safe screenshots or artifacts for HJE, FairRentNYC / CRS, and CallNYC.
