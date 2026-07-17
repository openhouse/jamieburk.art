# Runtime Verification

**Candidate binding:** See the two committed scorecards in
`evals/composite-integration/runs/` for the exact commit and input fingerprint.

## Container

The staging image was built from the repository Dockerfile with explicit
staging environment and robots arguments, then run on local port 3100. The
health response reported `appEnv: staging`, the staging canonical host,
`robotsIndexable: false`, and `ok: true`.

Canonical pages, every current case study, `/api/health`, `/robots.txt`,
`/sitemap.xml`, and the resume PDF returned 200. The three prohibited public
knowledge routes returned 404. Six legacy work routes returned 308 to their
canonical destinations. Staging responses carried `X-Robots-Tag: noindex,
nofollow`; the robots body disallowed `/`; sitemap and canonical links used
`https://staging.jamieburk.art`.

## Browser Matrix

The matrix covered these routes at 320, 375, 768, and 1280 pixels:

- `/`
- `/work`
- `/work/technical-operations`
- `/resume`
- `/about`
- `/contact`
- `/colophon`
- `/lab/source-backed-team-memory`

After two bounded responsive repairs, all 32 checks passed with exactly one H1,
no horizontal overflow, a visible first keyboard focus target, complete page
content, no console or page errors, and 13 healthy internal links from the
homepage. The homepage retained a first-pass role statement plus working Resume
and Contact paths.

## Document And Privacy Review

The two-page resume was rendered at 144 DPI and visually inspected. No clipped
text, overlap, malformed glyph, broken page transition, placeholder, or
internal marker was observed. The approved phone number remains limited to the
downloadable PDF. A compiled-output scan found zero files containing the
private-path and protected-source markers listed in the run history.

This is machine and agent review evidence. It is not hands-on human
accessibility certification, collaborator permission, or production approval.
