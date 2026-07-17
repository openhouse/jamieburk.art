# Composite Eval Green Run

Exact candidate commit:
`999b6ceb10cb777358f85643875f45a6fb4a0220`

Candidate content hash:
`f1c7f5491b2c5aa168230dc9dabf102f91bdab39cc9bcf8e695b930f62d38033`

## Deterministic Results

| Gate | Result |
| --- | --- |
| Knowledge lifecycle | 113/113 |
| Chad lens | 12/12 |
| Portfolio readiness | 20/20 |
| Professor lenses | 2/2 |
| Blind-spot controls | 8/8 |
| Focused composite tests | 17/17 |
| Semantic mutation attacks | 12/12 rejected |
| Eval integrity | 4/4 |
| `npm run check` | Pass |
| Staging noindex preflight | Pass |
| Production indexable preflight | Pass; does not authorize release |

## Container And Browser Evidence

- Docker image built from the candidate with Node 26.
- Container listened on internal `PORT=3000` and returned `200` for health,
  robots, sitemap, the resume PDF, and a generated static JavaScript asset.
- Staging health reported `appEnv: staging`, the staging site URL, and
  `robotsIndexable: false`.
- `robots.txt` disallowed `/`, and responses carried
  `X-Robots-Tag: noindex, nofollow`.
- The first 320-pixel browser run found a 65-pixel overflow on the Technical
  Operations title. The heading was repaired and the candidate was re-frozen.
- The final Playwright run passed 14 desktop routes and six 320-pixel mobile
  routes with no horizontal overflow, no console errors, and a working skip
  link.
- Screenshots were kept in `/private/tmp/knowledge-m-browser` and were not
  committed.

## Open Human And External Gates

- Unfamiliar-reader sessions: pending.
- Five real-job comparisons: pending.
- Collaborator corroboration where consequential: pending or held.
- Hands-on screen-reader and launch QA: pending.
- Visual rights and consent review: open where recorded.
- Staging deployment verification: pending.
- Production deployment and indexing approval: not granted.

The application-share deterministic threshold is met. Production remains
human-blocked; this receipt is not deployment or indexing authorization.
