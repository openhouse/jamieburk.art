# Production Cutover

This runbook moves the reviewed Next.js portfolio onto `jamieburk.art` without
turning a green local build into implicit production approval.

## Human Authorization

Jamie must identify the reviewed commit and explicitly confirm the
`jamie-production-approval` gate. An agent may prepare and verify the release,
but it may not infer human authorization from a merge, passing check, or prior
statement of general intent.

## Preconditions

1. The reviewed branch is merged and the exact production commit is recorded.
2. `npm run check` and `npm run preflight:production` pass at that commit.
3. The staging browser report has zero hard-gate failures.
4. The independent launch assessment reaches threshold.
5. Media rights, collaborator-sensitive credit, corroboration, and blind-reader
   human gates have the release-appropriate status.
6. The current primary-domain routing and legacy application target are recorded
   as the rollback point.

## Cutover

1. Deploy the recorded commit through the repository's existing production
   application path.
2. Route `jamieburk.art` to the reviewed Next.js application rather than the
   legacy redirect target.
3. Set the production environment explicitly, including
   `NEXT_PUBLIC_ROBOTS_POLICY=index` and `NEXT_PUBLIC_SITE_URL=https://jamieburk.art`.
4. Do not modify the staging noindex policy.

## Verification

Run the production browser gate against the primary domain:

```bash
npm run eval:launch:browser -- \
  --url https://jamieburk.art \
  --profile production \
  --output reports/generated/launch-browser-production.json
```

Confirm all canonical routes return 200, the resume PDF opens, the homepage
contains the `jamieburk-art-next` portfolio marker, and the
`primary-domain-serves-current-portfolio` check passes. Verify that the
canonical URL uses `https://jamieburk.art`, `X-Robots-Tag` does not contain
`noindex`, and `robots.txt` does not disallow the whole site.

## Rollback

1. If identity, route, indexing, resume, browser-error, or overflow checks fail,
   restore the recorded pre-cutover primary-domain route.
2. Preserve the failed deployment and generated reports for diagnosis; do not
   erase historical evidence or force-push the reviewed branch.
3. Return production indexing to the known prior state associated with the
   restored target.
4. Repair and rerun the full preflight, staging browser gate, and production
   verification before attempting another authorized cutover.
