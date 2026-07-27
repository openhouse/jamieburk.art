import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import axe from "axe-core";
import { chromium } from "playwright-core";

import {
  accessibilityEvidencePath,
  canonicalAccessibilityRoutes,
  canonicalAccessibilityViewports,
  computePublicSurfaceFingerprint
} from "./accessibility-evidence.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const baseUrl = process.env.ACCESSIBILITY_BASE_URL ?? "http://127.0.0.1:3041";
const executablePath =
  process.env.CHROME_EXECUTABLE_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!fs.existsSync(executablePath)) {
  throw new Error(`Chrome executable not found at ${executablePath}`);
}

const browser = await chromium.launch({
  executablePath,
  headless: true
});

const rows = [];

try {
  for (const viewport of canonicalAccessibilityViewports) {
    const context = await browser.newContext({
      viewport: { width: viewport, height: 900 }
    });

    for (const route of canonicalAccessibilityRoutes) {
      const page = await context.newPage();
      const failedRequests = new Set();

      page.on("requestfailed", (request) => {
        failedRequests.add(request.url());
      });
      page.on("response", (response) => {
        if (response.status() >= 400) failedRequests.add(`${response.status()} ${response.url()}`);
      });

      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle",
        timeout: 30_000
      });

      await page.addScriptTag({ content: axe.source });

      const before = await page.evaluate(() => {
        const images = Array.from(document.images);
        return {
          imageCount: images.length,
          unloadedImages: images.filter((image) => !image.complete || image.naturalWidth === 0).length,
          lazyImages: images.filter((image) => image.loading === "lazy").length
        };
      });

      const axeResult = await page.evaluate(async () => {
        return window.axe.run(document, {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]
          }
        });
      });

      await page.evaluate(async () => {
        const step = Math.max(500, Math.floor(window.innerHeight * 0.8));
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
        window.scrollTo(0, document.documentElement.scrollHeight);
      });
      await page.waitForTimeout(500);
      await page.waitForFunction(
        () => Array.from(document.images).every(
          (image) => image.complete && image.naturalWidth > 0
        ),
        { timeout: 10_000 }
      ).catch(() => {});

      const after = await page.evaluate(() => {
        const images = Array.from(document.images);
        const overflowElements = Array.from(document.body.querySelectorAll("*")).filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 &&
            (rect.left < -1 || rect.right > document.documentElement.clientWidth + 1);
        }).length;

        return {
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          overflowElements,
          workIndexPhotoCaptionCount: document.querySelectorAll(
            ".jb-work-row-with-image .jb-photo-caption"
          ).length,
          clippedPhotoCaptions: Array.from(
            document.querySelectorAll(".jb-work-row-with-image .jb-photo-caption")
          ).filter((caption) => {
            const figure = caption.closest("figure");
            const link = caption.closest("a");
            const captionRect = caption.getBoundingClientRect();
            const figureRect = figure?.getBoundingClientRect();
            const linkRect = link?.getBoundingClientRect();
            return (
              !figureRect ||
              !linkRect ||
              captionRect.top < figureRect.top - 1 ||
              captionRect.bottom > figureRect.bottom + 1 ||
              captionRect.top < linkRect.top - 1 ||
              captionRect.bottom > linkRect.bottom + 1
            );
          }).length,
          collapsedPhotoCaptionColumns: Array.from(
            document.querySelectorAll(".jb-work-row-with-image .jb-photo-caption")
          ).filter((caption) => {
            const captionRect = caption.getBoundingClientRect();
            return Array.from(caption.children).some((child) => {
              const childWidth = child.getBoundingClientRect().width;
              return childWidth < Math.min(120, captionRect.width * 0.35);
            });
          }).length,
          h1Count: document.querySelectorAll("h1").length,
          mainPresent: Boolean(document.querySelector("main")),
          brokenImagesAfterScroll: images.filter(
            (image) => !image.complete || image.naturalWidth === 0
          ).length,
          unlabeledImages: images.filter((image) => !image.hasAttribute("alt")).length,
          title: document.title
        };
      });

      rows.push({
        viewport,
        path: route,
        httpStatus: response?.status() ?? 0,
        ...before,
        axeVersion: axe.version,
        violations: axeResult.violations.map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          nodeCount: violation.nodes.length,
          nodes: violation.nodes.map((node) => ({
            target: node.target,
            html: node.html,
            failureSummary: node.failureSummary
          }))
        })),
        ...after,
        failedRequests: [...failedRequests].sort()
      });

      await page.close();
    }

    await context.close();
  }
} finally {
  await browser.close();
}

const fingerprint = computePublicSurfaceFingerprint(repoRoot);
const sum = (selector) => rows.reduce((total, row) => total + selector(row), 0);
const report = {
  reportVersion: 1,
  checkedAt: new Date().toISOString(),
  baseUrl,
  publicSurfaceFingerprint: fingerprint.fingerprint,
  publicSurfaceFileCount: fingerprint.fileCount,
  publicSurfaceScope: [
    "apps/www/** except generated apps/www/next-env.d.ts",
    "package.json",
    "package-lock.json"
  ],
  method:
    "Playwright Chromium; 14 canonical routes at 360, 375, 768, 900, 1024, 1100, and 1280 CSS pixels; axe WCAG 2 A/AA and 2.1 A/AA; overflow, work-card caption track collapse, landmarks, headings, alt text, request failures, and explicit full-page scroll before final image decode checks",
  routes: [...canonicalAccessibilityRoutes],
  viewports: [...canonicalAccessibilityViewports],
  rows,
  summary: {
    rowCount: rows.length,
    axeViolations: sum((row) => row.violations.length),
    criticalAxeViolations: sum(
      (row) => row.violations.filter((violation) => violation.impact === "critical").length
    ),
    overflowElements: sum((row) => row.overflowElements),
    clippedPhotoCaptions: sum((row) => row.clippedPhotoCaptions),
    collapsedPhotoCaptionColumns: sum((row) => row.collapsedPhotoCaptionColumns),
    brokenImagesAfterScroll: sum((row) => row.brokenImagesAfterScroll),
    unlabeledImages: sum((row) => row.unlabeledImages),
    failedRequests: sum((row) => row.failedRequests.length),
    nonSuccessResponses: rows.filter(
      (row) => row.httpStatus < 200 || row.httpStatus >= 400
    ).length,
    invalidHeadingOrLandmarkRows: rows.filter(
      (row) => row.h1Count !== 1 || row.mainPresent !== true
    ).length,
    lazyImagesObserved: sum((row) => row.lazyImages),
    unloadedImagesBeforeScroll: sum((row) => row.unloadedImages),
    lazyImageFollowUpPerformed: true,
    allImagesLoadedAfterScroll: rows.every((row) => row.brokenImagesAfterScroll === 0)
  }
};

fs.writeFileSync(
  path.join(repoRoot, accessibilityEvidencePath),
  `${JSON.stringify(report, null, 2)}\n`
);

console.log(
  `Accessibility evidence refreshed: ${report.summary.rowCount} rows, ` +
  `${report.summary.axeViolations} axe violations, ` +
  `${report.summary.overflowElements} overflow elements, ` +
  `${report.summary.brokenImagesAfterScroll} broken images after scroll.`
);
