import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { EventEmitter } from "node:events";
import * as capture from "./capture-accessibility-evidence.mjs";
import { summarizeRows, requireStableSurface, recordIncompleteCapture, classifyRequestFailure, createRequestFailureRecorder } from "./capture-accessibility-evidence.mjs";

test("capture summary exposes row failures instead of recording a predetermined pass", () => {
  const rows = [{ httpStatus: 200, violations: [], overflowElements: 0, brokenImagesAfterScroll: 0,
    unloadedImagesAfterScroll: 0, unlabeledImages: 0, failedRequests: [], h1Count: 1, mainPresent: true,
    lazyImagesObserved: 2, unloadedImagesBeforeScroll: 1 },
  { httpStatus: 404, violations: [{ impact: "critical" }], overflowElements: 2, brokenImagesAfterScroll: 1,
    unloadedImagesAfterScroll: 1, unlabeledImages: 1, failedRequests: ["failed-image"], h1Count: 2, mainPresent: false,
    lazyImagesObserved: 3, unloadedImagesBeforeScroll: 2 }];
  assert.deepEqual(summarizeRows(rows), {
    rowCount: 2, axeViolations: 1, criticalAxeViolations: 1, overflowElements: 2,
    brokenImagesAfterScroll: 1, unloadedImagesAfterScroll: 1, unlabeledImages: 1,
    failedRequests: 1, nonSuccessResponses: 1, invalidHeadingOrLandmarkRows: 1,
    lazyImagesObserved: 5, unloadedImagesBeforeScroll: 3,
    lazyImageFollowUpPerformed: true, allImagesLoadedAfterScroll: false
  });
});

test("capture refuses to label observations with a surface that changed during the run", () => {
  const before = { fingerprint: "a", fileCount: 1, policy: "v2-runtime-build-inputs" };
  assert.throws(() => requireStableSurface(before, { ...before, fingerprint: "b" }), /changed during capture/);
  assert.doesNotThrow(() => requireStableSurface(before, { ...before }));
});

test("an interrupted browser run retains its observations without replacing canonical evidence", () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "accessibility-capture-test-"));
  try {
    const canonical = path.join(directory, "responsive-route-matrix.json");
    writeFileSync(canonical, "previous canonical evidence\n");
    const artifact = recordIncompleteCapture(directory, { fingerprint: "frozen-input" },
      [{ viewport: 360, path: "/", violations: [] }], new Error("navigation timed out"));
    assert.equal(typeof artifact, "string", "The interrupted run needs a retained receipt");
    const receipt = JSON.parse(readFileSync(artifact, "utf8"));
    assert.equal(receipt.status, "incomplete-not-current-evidence");
    assert.equal(receipt.completedRows, 1);
    assert.equal(receipt.expectedRows, 60);
    assert.equal(receipt.publicSurfaceFingerprint, "frozen-input");
    assert.equal(receipt.error, "navigation timed out");
    assert.equal(readFileSync(canonical, "utf8"), "previous canonical evidence\n");
  } finally { rmSync(directory, { recursive: true, force: true }); }
});

test("a failure after screenshot capture cannot replace canonical image bytes or reports", async () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "accessibility-image-publication-"));
  try {
    const imagePath = path.join(directory, "candidate-home-desktop.png");
    const reportPath = path.join(directory, "professor-lenses-browser-qa.json");
    writeFileSync(imagePath, "previous image");
    writeFileSync(reportPath, "previous report");
    const pending = capture.createCapturePublication(directory);
    const page = { async screenshot(options) {
      assert.equal(options?.path, undefined, "A capture must not write the canonical path early");
      return Buffer.from("new image");
    } };
    await pending.captureScreenshot(page, "candidate-home-desktop.png");
    recordIncompleteCapture(directory, { fingerprint: "same" }, [], new Error("interaction failed"));
    assert.equal(readFileSync(imagePath, "utf8"), "previous image");
    assert.equal(readFileSync(reportPath, "utf8"), "previous report");
    pending.publish({ "professor-lenses-browser-qa.json": { complete: true } });
    assert.equal(readFileSync(imagePath, "utf8"), "new image");
    assert.deepEqual(JSON.parse(readFileSync(reportPath, "utf8")), { complete: true });
  } finally { rmSync(directory, { recursive: true, force: true }); }
});

test("only explicitly identified same-origin canceled RSC prefetches are separated from failures", () => {
  const base = "http://127.0.0.1:3219";
  const prefetch = { url: `${base}/work?_rsc=observed-token`, failure: "net::ERR_ABORTED", resourceType: "fetch", headers: { rsc: "1", "next-router-prefetch": "1" } };
  assert.equal(classifyRequestFailure(prefetch, base), "canceled-prefetch");
  for (const different of [
    { headers: { rsc: "1" } }, // Actual client navigation, not a prefetch.
    { failure: "net::ERR_CONNECTION_REFUSED" }, // A broken prefetch is still a failure.
    { resourceType: "document" }, { resourceType: "image" }, { resourceType: "font" },
    { url: "https://example.test/work?_rsc=token" }, { url: `${base}/work` }
  ]) assert.equal(classifyRequestFailure({ ...prefetch, ...different }, base), "failed");
});

test("request observations are frozen before page-close and genuine failures remain visible", () => {
  const page = new EventEmitter();
  const recorder = createRequestFailureRecorder(page, "http://127.0.0.1:3219");
  const request = (url, failure, resourceType = "image", headers = {}) => ({
    url: () => url, failure: () => ({ errorText: failure }), resourceType: () => resourceType, headers: () => headers
  });
  page.emit("requestfailed", request("http://127.0.0.1:3219/broken.jpg", "net::ERR_FAILED"));
  page.emit("requestfailed", request("http://127.0.0.1:3219/work?_rsc=token", "net::ERR_ABORTED", "fetch", { rsc: "1", "next-router-prefetch": "1" }));
  const observed = recorder.stop();
  page.emit("requestfailed", request("http://127.0.0.1:3219/closed.jpg", "net::ERR_ABORTED"));
  assert.equal(observed.failedRequests.length, 1);
  assert.equal(observed.failedRequests[0].url, "http://127.0.0.1:3219/broken.jpg");
  assert.equal(observed.canceledPrefetchRequests.length, 1);
  assert.equal(page.listenerCount("requestfailed"), 0);
});
