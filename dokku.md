# Dokku Deployment Notes

Target app name:

```text
jamieburk-art
```

Target domain:

```text
https://jamieburk.art
```

One-time setup on the Dokku host:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku git:set jamieburk-art deploy-branch main
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
dokku ports:set jamieburk-art http:80:3000
```

If `dokku-letsencrypt` is installed:

```bash
dokku letsencrypt:set jamieburk-art email jamie.burkart@gmail.com
dokku letsencrypt:enable jamieburk-art
dokku letsencrypt:cron-job --add
```

Local remote:

```bash
git remote add dokku dokku@[DROPLET_HOST_OR_IP]:jamieburk-art
git push dokku main
```

After launch, confirm:

```bash
curl -I https://jamieburk.art
curl -I https://www.jamieburk.art
```
