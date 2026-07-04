# Deployment

Production target: `https://jamieburk.art`

Recommended Dokku app name: `jamieburk-art`

## Dokku Setup

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
dokku proxy:ports-set jamieburk-art http:80:3000
```

If the Let's Encrypt plugin is not installed:

```bash
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
dokku letsencrypt:set --global email jamie.burkart@gmail.com
```

After DNS points to the droplet:

```bash
dokku letsencrypt:enable jamieburk-art
dokku letsencrypt:cron-job --add
```

## DNS

Use A records for the apex and `www` host:

```text
A @ [DigitalOcean droplet IPv4]
A www [DigitalOcean droplet IPv4]
```

Do not add IPv6 records until the droplet, Docker, and Dokku paths are verified.

## Local Preflight

```bash
nvm use
npm ci
npm run typecheck
npm run lint
npm run build
```

## Push

```bash
git remote add dokku dokku@[DROPLET_IP_OR_HOSTNAME]:jamieburk-art
git push dokku HEAD:main
```

The root Dockerfile builds the npm workspace and serves the Next.js standalone output.
