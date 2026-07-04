# Dokku Deployment

## Intended Result

Pushing this monorepo should deploy the production site to:

```text
https://jamieburk.art
```

## DNS

Point DNS to the DigitalOcean droplet.

```text
A      @      [DROPLET_IPV4]
A      www    [DROPLET_IPV4]
```

If IPv6 is configured:

```text
AAAA   @      [DROPLET_IPV6]
AAAA   www    [DROPLET_IPV6]
```

## Dokku App

Use the app name:

```text
jamieburk-art
```

Recommended setup:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
dokku proxy:ports-set jamieburk-art http:80:3000
```

## Let's Encrypt

```bash
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
sudo dokku letsencrypt:cron-job --add
dokku letsencrypt:set jamieburk-art email jamie.burkart@gmail.com
dokku letsencrypt:enable jamieburk-art
```

After DNS resolves and the first deploy succeeds:

```bash
dokku domains:report jamieburk-art
dokku logs jamieburk-art -t
```

## Local Remote

```bash
git remote add dokku dokku@[DROPLET_IP_OR_HOST]:jamieburk-art
git push dokku main
```

If deploying another branch:

```bash
git push dokku your-branch:main
```

## Health Check

```bash
curl https://jamieburk.art/api/health
```

Expected shape:

```json
{
  "ok": true,
  "service": "jamieburk.art",
  "timestamp": "..."
}
```
