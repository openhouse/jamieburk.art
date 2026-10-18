# Refreshing candidate-bound browser evidence

Run `node scripts/knowledge-wiki/capture-accessibility-evidence.mjs` under the
repository's declared Node runtime. The runner rebuilds the current app, starts
its own loopback-only production server, captures the evidence, and stops that
server. It refuses to bind the observations if public runtime inputs change
during the run. A failed build does not refresh the evidence.

The capture requires Playwright Chromium and axe-core 4. Install or provision
those QA dependencies outside the public app's runtime. `PLAYWRIGHT_MODULE` and
`AXE_CORE_PATH` can point to provisioned modules; `CHROMIUM_EXECUTABLE_PATH` can
select an available Chromium executable. `ACCESSIBILITY_QA_PORT` defaults to
3219. A port conflict fails instead of silently using another server.

The run observes all 15 canonical routes at 360, 375, 768, and 1280 CSS pixels.
Each row includes axe results, image loading after scrolling, horizontal
overflow, image labels, heading/landmark counts, and request failures. It also
recaptures the four retained homepage/About screenshots, homepage photo-credit
geometry at all four widths, the homepage-to-About link, keyboard/skip-link and
mobile-menu behavior, and 640/320-pixel reflow proxies.

Request observation stops before closing each page, so closing the test's tab
cannot mutate a completed row. Canceled speculative requests remain visible in
`canceledPrefetchRequests`: separation requires the exact `net::ERR_ABORTED`
error, a same-origin fetch with an `_rsc` query, and observed `rsc: 1` and
`next-router-prefetch: 1` headers. Failed images, fonts, documents, actual RSC
navigations, and genuine prefetch errors still fail the gate. Interrupted runs
retain their partial observations separately and never replace canonical
evidence.

Generated evidence:

- `responsive-route-matrix.json`
- `professor-lenses-browser-qa.json` and its four referenced screenshots
- `professor-lenses-interaction-qa.json`

Inspect the newly captured screenshots before describing them as visually
reviewed. Capturing pixels is not visual approval. Browser measurements and axe
results are not a human screen-reader session, a human browser-zoom review,
Jamie's content approval, or production/indexing permission. Those gates remain
explicitly open in the interaction report.

After capture, run `npm run test:accessibility-evidence` and
`node --test scripts/tests/visual-evidence-freshness.test.mjs` against the final
candidate. The capture helper's regression tests are also included by
`npm run wiki:test`.

## Capture the About method sections

The four viewport screenshots show the top of Home and About. They do not show
the full recursive method paragraph or the three systems examples farther down
About. Supply those sections separately when a review needs to assess them.

After the full browser capture passes for the current source, run:

```sh
node scripts/knowledge-wiki/capture-professor-method-evidence.mjs
node scripts/knowledge-wiki/capture-professor-method-evidence.mjs --check
node --test scripts/knowledge-wiki/capture-professor-method-evidence.test.mjs
```

Use the same provisioned `PLAYWRIGHT_MODULE` and `CHROMIUM_EXECUTABLE_PATH` as
the full capture. This runner reuses the existing production build; it does not
rebuild or repeat the 60 route checks. It starts and stops its own loopback-only
server on port 3221. Set `PROFESSOR_METHOD_QA_PORT` to use another free port.
A port conflict stops the capture.

The runner captures four complete sections at 375 and 1280 CSS pixels:

- The practical recursive sequence paragraph.
- The Harry J. Epstein Company systems example.
- The NYC Artist Coalition and FairRentNYC systems example.
- The Sunday Dinner and 196 systems example.

It verifies that the served About HTML matches the build, waits for fonts, and
checks each section for clipped text, horizontal overflow, and header overlap.
It does not hide the header or change site styles. A taller viewport keeps each
full section visible without changing its width or text layout.

The runner buffers all eight images before saving a complete set in a new dated
`professor-method-*` directory. It then replaces `professor-method-manifest.json`.
An interrupted capture cannot replace the previous manifest or its images.
The manifest records the source hash, build HTML hash, capture times, selectors,
viewports, text, and each screenshot's hash. It contains no local machine paths.

Open all eight images before saying they have been visually reviewed. The
current-manifest test runs as part of `npm run wiki:test`, so later source
changes, missing images, changed image bytes, or incomplete coverage fail the
check. These observations support a fresh review; they do not approve the
content, photography rights, deployment, or production indexing.
