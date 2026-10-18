import assert from "node:assert/strict";
import { test } from "node:test";

import { readFileSync } from "node:fs";

import {
  canonicalAccessibilityRoutes,
  computePublicSurfaceFingerprint,
  validateResponsiveAccessibilityEvidence
} from "./accessibility-evidence.mjs";
import { defaultRepoRoot } from "./lib.mjs";
import { isVerifiedPrefetchCancellation } from "../lib/browser-request-classification.mjs";

const current = validateResponsiveAccessibilityEvidence(defaultRepoRoot);

const prefetchBaseUrl = "http://127.0.0.1:3224";
const prefetchFixture = () => ({
  url: `${prefetchBaseUrl}/work?tag=Open%20Data&_rsc=abc`,
  method: "GET",
  resourceType: "fetch",
  errorText: "net::ERR_ABORTED",
  isNavigationRequest: false,
  headers: { rsc: "1", "next-router-prefetch": "1" },
  verifiedDestination: {
    url: `${prefetchBaseUrl}/work?tag=Open%20Data`,
    status: 200,
    redirected: false,
    contentType: "text/html; charset=utf-8"
  }
});

test("prefetch classification requires affirmative request and destination evidence", () => {
  assert.equal(isVerifiedPrefetchCancellation(prefetchFixture(), { baseUrl: prefetchBaseUrl }), true);
  const mixedCase = prefetchFixture();
  mixedCase.headers = { RSC: "1", "Next-Router-Prefetch": "1" };
  assert.equal(isVerifiedPrefetchCancellation(mixedCase, { baseUrl: prefetchBaseUrl }), true);
});

test("prefetch classification never exempts real resource or unverified failures", () => {
  const mutations = [
    (r) => { r.errorText = "net::ERR_CONNECTION_REFUSED"; },
    ...["document", "image", "script", "stylesheet", "xhr"].map((type) => (r) => { r.resourceType = type; }),
    (r) => { r.method = "POST"; },
    (r) => { r.isNavigationRequest = true; },
    (r) => { delete r.isNavigationRequest; },
    (r) => { r.url = "https://elsewhere.invalid/work?_rsc=abc"; },
    (r) => { r.url = `${prefetchBaseUrl}/work?tag=Open%20Data`; },
    (r) => { r.url = `${prefetchBaseUrl}/work?tag=Open%20Data&_rsc=`; },
    (r) => { delete r.headers.rsc; },
    (r) => { delete r.headers["next-router-prefetch"]; },
    (r) => { r.headers["next-router-prefetch"] = "0"; },
    (r) => { delete r.verifiedDestination; },
    (r) => { r.verifiedDestination.status = 500; },
    (r) => { r.verifiedDestination.status = 302; },
    (r) => { r.verifiedDestination.redirected = true; },
    (r) => { delete r.verifiedDestination.redirected; },
    (r) => { r.verifiedDestination.contentType = "application/json"; },
    (r) => { r.verifiedDestination.url = `${prefetchBaseUrl}/`; },
    (r) => { r.url = "not a URL"; }
  ];
  for (const mutate of mutations) {
    const record = prefetchFixture();
    mutate(record);
    assert.equal(isVerifiedPrefetchCancellation(record, { baseUrl: prefetchBaseUrl }), false);
  }
  assert.equal(isVerifiedPrefetchCancellation(null, { baseUrl: prefetchBaseUrl }), false);
});

test("prefetch report classification is explicit, balanced and fails closed", () => {
  const report = structuredClone(current.report);
  for (const row of report.rows) {
    delete row.prefetchCancellations;
    delete row.rawFailedRequestCount;
  }
  report.baseUrl = prefetchBaseUrl;
  report.rows[0].prefetchCancellations = [prefetchFixture()];
  report.rows[0].rawFailedRequestCount = report.rows[0].failedRequests.length + 1;
  report.summary.prefetchCancellations = 1;
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).requestClassificationPasses, true);
  report.rows[0].rawFailedRequestCount += 1;
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).requestClassificationPasses, false);
  report.rows[0].rawFailedRequestCount -= 1;
  report.rows[0].prefetchCancellations[0].resourceType = "image";
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).requestClassificationPasses, false);
  report.rows[0].prefetchCancellations[0] = prefetchFixture();
  report.summary.prefetchCancellations = 0;
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).requestClassificationPasses, false);
});

test("the responsive accessibility matrix includes every featured project route", () => {
  assert.equal(canonicalAccessibilityRoutes.includes("/work/kc-spaces-fund"), true);
});

test("candidate-bound responsive accessibility evidence passes", () => {
  assert.equal(current.passed, true);
});

test("stale public-surface evidence fails closed", () => {
  const report = structuredClone(current.report);
  report.publicSurfaceFingerprint = "0".repeat(64);
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed, false);
});

test("unrelated root QA scripts do not invalidate visual evidence", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  packageJson.scripts.check = `${packageJson.scripts.check} && npm run unrelated-qa-probe`;
  const mutated = computePublicSurfaceFingerprint(defaultRepoRoot, {
    fileOverrides: { "package.json": JSON.stringify(packageJson) }
  });
  assert.equal(mutated.fingerprint, current.current.fingerprint);
});

test("root build-script changes still invalidate visual evidence", () => {
  const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
  packageJson.scripts.build = "node unreviewed-build-probe.mjs";
  const mutated = computePublicSurfaceFingerprint(defaultRepoRoot, {
    fileOverrides: { "package.json": JSON.stringify(packageJson) }
  });
  assert.notEqual(mutated.fingerprint, current.current.fingerprint);
});

test("public source changes still invalidate visual evidence", () => {
  const relativePath = "apps/www/src/components/Hero.tsx";
  const mutated = computePublicSurfaceFingerprint(defaultRepoRoot, {
    fileOverrides: {
      [relativePath]: `${readFileSync(relativePath, "utf8")}\n// visual mutation probe`
    }
  });
  assert.notEqual(mutated.fingerprint, current.current.fingerprint);
});

test("an axe violation fails closed", () => {
  const report = structuredClone(current.report);
  report.rows[0].violations.push({ id: "color-contrast", impact: "serious", nodeCount: 1 });
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed, false);
});

test("measured axe incomplete contrast failures fail closed, including equal text/background colors", () => {
  const report = structuredClone(current.report);
  for (const row of report.rows) row.incompleteChecks = [];
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).rowsPass, true);
  report.rows[0].incompleteChecks.push({ id: "color-contrast", impact: "serious", nodeCount: 1,
    nodes: [{ target: ["a[download]"], checks: [{ id: "color-contrast", data: {
      messageKey: "equalRatio", contrastRatio: 1, expectedContrastRatio: "4.5:1"
    }}] }] });
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).rowsPass, false);
  report.rows[0].incompleteChecks[0].impact = "critical";
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).rowsPass, false);
});

test("unmeasurable photo backgrounds stay visible as manual-review needs, not measured failures or passes", () => {
  const report = structuredClone(current.report);
  for (const row of report.rows) row.incompleteChecks = [];
  report.rows[0].incompleteChecks = [{ id: "color-contrast", impact: "serious", nodeCount: 1,
    nodes: [{ target: [".hero"], checks: [{ id: "color-contrast", data: {
      messageKey: "bgImage", contrastRatio: 0, expectedContrastRatio: "4.5:1"
    }}] }] }];
  const result = validateResponsiveAccessibilityEvidence(defaultRepoRoot, report);
  assert.equal(result.rowsPass, true);
  assert.equal(result.manualReviewFindings.length, 1);
  assert.equal(result.manualReviewComplete, false);
});

test("missing axe incomplete coverage is not evidence of no unresolved findings", () => {
  const report = structuredClone(current.report);
  for (const row of report.rows) row.incompleteChecks = [];
  delete report.rows[0].incompleteChecks;
  const result = validateResponsiveAccessibilityEvidence(defaultRepoRoot, report);
  assert.equal(result.rowsPass, false);
  assert.equal(result.manualReviewComplete, false);
});

test("contrast classifications cannot lose their measurement fields and keep passing coverage", () => {
  const report = structuredClone(current.report);
  for (const row of report.rows) row.incompleteChecks = [];
  const check = { id: "color-contrast", data: {} };
  report.rows[0].incompleteChecks = [{ id: "color-contrast", impact: "serious", nodeCount: 1,
    nodes: [{ target: ["a[download]"], checks: [check] }] }];
  for (const data of [{}, {messageKey:"equalRatio"}, {messageKey:"bgImage"},
    {messageKey:"unknown",expectedContrastRatio:"4.5:1"}]) {
    check.data = data;
    assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).rowsPass, false);
  }
  check.data = {messageKey:"contrastRatio",contrastRatio:4.32,expectedContrastRatio:"4.5:1"};
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).rowsPass, false);
});

test("an unverified lazy-image follow-up fails closed", () => {
  const report = structuredClone(current.report);
  report.summary.lazyImageFollowUpPerformed = false;
  report.summary.allImagesLoadedAfterScroll = false;
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed, false);
});

test("an overlapping photo credit occurrence fails closed", () => {
  const report = structuredClone(current.report);
  report.focusedVisualReview.occurrences[0].captionOverlapsPrimaryCopy = true;
  report.focusedVisualReview.passed = false;
  const result = validateResponsiveAccessibilityEvidence(defaultRepoRoot, report);
  assert.equal(result.focusedVisualReviewPasses, false);
  assert.equal(result.passed, false);
});

test("an unobserved homepage-to-About path fails closed", () => {
  const report = structuredClone(current.report);
  report.navigationReview.navigationCompleted = false;
  report.navigationReview.pass = false;
  const result = validateResponsiveAccessibilityEvidence(defaultRepoRoot, report);
  assert.equal(result.navigationReviewPasses, false);
  assert.equal(result.passed, false);
});

test("a coordinated canonical-route substitution fails closed", () => {
  const report = structuredClone(current.report);
  report.routes[0] = "/noncanonical-replacement";
  for (const row of report.rows) {
    if (row.path === "/") row.path = "/noncanonical-replacement";
  }
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed, false);
});

test("a coordinated canonical-viewport substitution fails closed", () => {
  const report = structuredClone(current.report);
  report.viewports[0] = 1024;
  for (const row of report.rows) {
    if (row.viewport === 360) row.viewport = 1024;
  }
  assert.equal(validateResponsiveAccessibilityEvidence(defaultRepoRoot, report).passed, false);
});
