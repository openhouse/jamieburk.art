# Jamie Burkart Portfolio

Next.js portfolio site for Jamie Burkart.

## Stack

- Next.js App Router
- React
- TypeScript
- MDX
- Tailwind CSS
- daisyUI
- Node 26
- pnpm
- Docker
- Dokku

## Local Setup

```bash
nvm use
corepack enable
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Docker

```bash
docker build -t jamie-portfolio .
docker run --rm -p 3000:3000 jamie-portfolio
```

## Dokku Deploy

Run on the Dokku host:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku proxy:ports-set jamieburk-art http:80:3000
dokku checks:enable jamieburk-art
```

Configure Let's Encrypt if needed:

```bash
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
dokku letsencrypt:set --global email jamie.burkart@gmail.com
dokku letsencrypt:enable jamieburk-art
dokku letsencrypt:cron-job --add
```

From the local repo:

```bash
git remote add dokku dokku@<droplet-host-or-ip>:jamieburk-art
git push dokku main
```

## Content

Work pages live in `apps/web/content/work`.

The V1 content model is intentionally file-backed. There is no database, CMS, authentication, contact-form storage, or private archive browser.

## Privacy

Do not commit private documents, raw notes, client-sensitive material, health or financial information, unapproved photos, private coalition materials, private analytics dashboards, credentials, or private stakeholder lists.

## Node 26 Note

This project pins Node 26 because the deployment brief requests it. If any production dependency, buildpack, or Dokku environment proves unstable before Node 26 is LTS, deploy V1 on Node 24 LTS temporarily and revisit Node 26 when it becomes the appropriate production target.

## Open Launch Questions

- What is the DigitalOcean droplet hostname or IP?
- Is DNS for `jamieburk.art` already pointed at the droplet?
- Should `www.jamieburk.art` redirect to the apex domain or also serve?
- Which resume PDF is current?
- Which public email, LinkedIn URL, and GitHub URL should be used?
- Which metrics, screenshots, and images are approved for publication?
