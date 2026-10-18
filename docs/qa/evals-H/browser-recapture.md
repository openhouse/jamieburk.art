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
