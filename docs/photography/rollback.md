# Photograph rollback

Rollback removes a public occurrence without erasing creator credit, correction
history, or private source binding.

For an active or staged placement:

1. mark the occurrence withdrawn or revoked;
2. remove its placement ID from the hand-authored application manifest;
3. create a correction record naming the affected route and edition;
4. preserve creator, custody, permission, and historical occurrence records;
5. verify the route no longer renders the occurrence;
6. review caches and deployed static assets;
7. regenerate usage, impact, health, rights, and placement reports;
8. retain the Git history and record the limits of deletion.

The canary dry run is
`evals/photo-knowledge/rollback/layout-c-home-east-river-drill.json`. It is a
public-safe simulation of process shape, not a real withdrawal request.

Run:

```bash
npm run photos:rollback
npm run photos:test
```
