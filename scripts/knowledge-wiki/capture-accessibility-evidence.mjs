import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import {
  canonicalAccessibilityRoutes as routes,
  canonicalAccessibilityViewports as viewports,
  computePublicSurfaceFingerprint
} from "./accessibility-evidence.mjs";

const repoRoot = process.argv[2];
const baseUrl = process.argv[3];
const outputPath = process.argv[4];

if (!repoRoot || !baseUrl || !outputPath) {
  throw new Error(
    "Usage: capture-accessibility-evidence.mjs <repo> <base-url> <output>"
  );
}

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const axeSource = readFileSync(
  path.join(repoRoot, "node_modules/axe-core/axe.min.js"),
  "utf8"
);
const screenshotDirectory = path.join(
  repoRoot,
  "docs/qa/evals-H/layout-B-screenshots"
);
mkdirSync(screenshotDirectory, { recursive: true });

const screenshotPlan = new Map([
  ["360:/", "home-mobile.png"],
  ["1280:/", "home-desktop.png"],
  ["375:/about", "about-mobile.png"],
  ["1280:/about", "about-desktop.png"],
  ["375:/work/technical-operations", "technical-operations-mobile.png"],
  ["1280:/work/kc-town-hall", "kc-town-hall-desktop.png"]
]);
const rows = [];
const screenshots = [];

function sha256(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

const browser = await chromium.launch({ headless: true });

try {
  for (const viewport of viewports) {
    for (const route of routes) {
      const context = await browser.newContext({
        viewport: { width: viewport, height: 900 },
        reducedMotion: "reduce"
      });
      const page = await context.newPage();
      const failedRequests = [];
      page.on("requestfailed", (request) => {
        const url = request.url();
        if (!url.includes("webpack-hmr")) {
          failedRequests.push({
            url,
            errorText: request.failure()?.errorText ?? "unknown"
          });
        }
      });

      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 30_000
      });
      await page.waitForTimeout(150);
      await page.addScriptTag({ content: axeSource });

      const before = await page.evaluate(() => {
        const images = [...document.images];
        return {
          imageCount: images.length,
          unloadedImages: images.filter(
            (image) => !image.complete || image.naturalWidth === 0
          ).length,
          lazyImages: images.filter((image) => image.loading === "lazy").length,
          skipLinkPresent: Boolean(document.querySelector('a[href="#main-content"]'))
        };
      });

      const keyboardTargets = [];
      await page.evaluate(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        document.body.focus();
      });
      for (let index = 0; index < 12; index += 1) {
        await page.keyboard.press("Tab");
        keyboardTargets.push(
          await page.evaluate(() => {
            const element = document.activeElement;
            if (!(element instanceof HTMLElement)) {
              return { key: "none", visible: false };
            }
            const rect = element.getBoundingClientRect();
            return {
              key: [
                element.tagName,
                element.id,
                element.getAttribute("href"),
                element.getAttribute("aria-label"),
                element.textContent?.trim().slice(0, 40)
              ]
                .filter(Boolean)
                .join("|"),
              visible:
                rect.width > 0 &&
                rect.height > 0 &&
                rect.bottom >= 0 &&
                rect.top <= innerHeight &&
                getComputedStyle(element).visibility !== "hidden"
            };
          })
        );
      }
      const firstKeyboardTarget = keyboardTargets[0]?.key ?? "";
      const keyboardDistinctTargets = new Set(
        keyboardTargets.map((target) => target.key)
      ).size;
      const keyboardInvisibleTargets = keyboardTargets.filter(
        (target) => !target.visible
      ).length;

      const axe = await page.evaluate(async () => {
        const result = await globalThis.axe.run(document, {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]
          }
        });
        return {
          version: globalThis.axe.version,
          violations: result.violations.map((violation) => ({
            id: violation.id,
            impact: violation.impact,
            nodeCount: violation.nodes.length
          }))
        };
      });

      await page.evaluate(async () => {
        const max = document.documentElement.scrollHeight;
        for (let y = 0; y < max; y += Math.max(320, innerHeight * 0.8)) {
          scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 40));
        }
        scrollTo(0, max);
        await new Promise((resolve) => setTimeout(resolve, 250));
      });
      await page
        .waitForFunction(
          () =>
            [...document.images].every(
              (image) => image.complete && image.naturalWidth > 0
            ),
          { timeout: 5_000 }
        )
        .catch(() => {});

      const after = await page.evaluate(() => {
        const clientWidth = document.documentElement.clientWidth;
        const overflowElements = [...document.querySelectorAll("body *")].filter(
          (element) => {
            const style = getComputedStyle(element);
            if (
              style.display === "none" ||
              style.visibility === "hidden" ||
              style.position === "fixed"
            ) {
              return false;
            }
            const rect = element.getBoundingClientRect();
            return rect.left < -1 || rect.right > clientWidth + 1;
          }
        ).length;
        const images = [...document.images];
        return {
          clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          overflowElements,
          h1Count: document.querySelectorAll("h1").length,
          mainPresent: Boolean(document.querySelector("main")),
          brokenImagesAfterScroll: images.filter(
            (image) => !image.complete || image.naturalWidth === 0
          ).length,
          unlabeledImages: images.filter(
            (image) => !image.hasAttribute("alt") || image.alt.trim() === ""
          ).length,
          title: document.title
        };
      });

      const screenshotName = screenshotPlan.get(`${viewport}:${route}`);
      if (screenshotName) {
        await page.evaluate(() => scrollTo(0, 0));
        await page.waitForTimeout(100);
        const absoluteFile = path.join(screenshotDirectory, screenshotName);
        await page.screenshot({ path: absoluteFile, fullPage: false });
        screenshots.push({
          viewport,
          path: route,
          file: path.relative(repoRoot, absoluteFile),
          sha256: sha256(absoluteFile)
        });
      }

      rows.push({
        viewport,
        path: route,
        httpStatus: response?.status() ?? 0,
        imageCount: before.imageCount,
        unloadedImages: before.unloadedImages,
        lazyImages: before.lazyImages,
        axeVersion: axe.version,
        violations: axe.violations,
        skipLinkPresent: before.skipLinkPresent,
        skipLinkWasFirst: firstKeyboardTarget.includes("#main-content"),
        keyboardTargetsObserved: keyboardTargets.length,
        keyboardDistinctTargets,
        keyboardInvisibleTargets,
        keyboardTrapDetected: keyboardDistinctTargets < 3,
        ...after,
        failedRequests
      });
      console.log(`${viewport} ${route} ${axe.violations.length ? "FAIL" : "PASS"}`);
      await context.close();
    }
  }
} finally {
  await browser.close();
}

const current = computePublicSurfaceFingerprint(repoRoot);
const keyboardRowsPassed = rows.filter(
  (row) =>
    row.skipLinkPresent &&
    row.skipLinkWasFirst &&
    row.keyboardDistinctTargets >= 3 &&
    row.keyboardInvisibleTargets === 0 &&
    !row.keyboardTrapDetected
).length;
const report = {
  reportVersion: 1,
  checkedAt: new Date().toISOString(),
  baseUrl,
  publicSurfaceFingerprint: current.fingerprint,
  publicSurfaceFileCount: current.fileCount,
  publicSurfaceScope: [
    "tracked and unignored apps/www/**",
    "package.json",
    "package-lock.json"
  ],
  method:
    "Playwright Chromium; 14 canonical routes at 360, 375, 768, and 1280 CSS pixels; axe WCAG 2 A/AA and 2.1 A/AA; 12-step keyboard traversal with skip-link-first assertion; six candidate-bound viewport screenshots; overflow, landmarks, headings, alt text, request failures, and explicit full-page scroll before final image decode checks",
  routes,
  viewports,
  screenshots,
  rows,
  summary: {
    rowCount: rows.length,
    axeViolations: rows.reduce((sum, row) => sum + row.violations.length, 0),
    criticalAxeViolations: rows.reduce(
      (sum, row) =>
        sum + row.violations.filter((violation) => violation.impact === "critical").length,
      0
    ),
    overflowElements: rows.reduce((sum, row) => sum + row.overflowElements, 0),
    brokenImagesAfterScroll: rows.reduce(
      (sum, row) => sum + row.brokenImagesAfterScroll,
      0
    ),
    unloadedImagesBeforeScroll: rows.reduce(
      (sum, row) => sum + row.unloadedImages,
      0
    ),
    lazyImagesObserved: rows.reduce((sum, row) => sum + row.lazyImages, 0),
    unlabeledImages: rows.reduce((sum, row) => sum + row.unlabeledImages, 0),
    failedRequests: rows.reduce((sum, row) => sum + row.failedRequests.length, 0),
    nonSuccessResponses: rows.filter(
      (row) => row.httpStatus < 200 || row.httpStatus >= 400
    ).length,
    invalidHeadingOrLandmarkRows: rows.filter(
      (row) => row.h1Count !== 1 || row.mainPresent !== true
    ).length,
    keyboardRowsChecked: rows.length,
    keyboardRowsPassed,
    screenshotsCaptured: screenshots.length,
    lazyImageFollowUpPerformed: true,
    allImagesLoadedAfterScroll: rows.every(
      (row) => row.brokenImagesAfterScroll === 0
    )
  }
};

writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);
