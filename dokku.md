# Dokku Deployment Notes

Primary app name:

```text
jamieburk-art
```

Expected domains:

```text
jamieburk.art
www.jamieburk.art
```

Initial server setup:

```bash
dokku apps:create jamieburk-art
dokku domains:set jamieburk-art jamieburk.art www.jamieburk.art
dokku config:set jamieburk-art NODE_ENV=production NEXT_TELEMETRY_DISABLED=1
```

Local deploy:

```bash
git remote add dokku dokku@[droplet-hostname-or-ip]:jamieburk-art
git push dokku HEAD:main
```

The Dockerfile is the canonical deployment path so Dokku uses Node 26 and the monorepo build consistently.
