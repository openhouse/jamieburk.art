#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { values } = parseArgs({
  options: {
    "base-url": { type: "string", default: "http://127.0.0.1:3041" },
    output: { type: "string", default: "docs/qa/evals-K/route-matrix.json" }
  }
});
const baseUrl = values["base-url"];
const axePath = path.join(repoRoot, "node_modules/axe-core/axe.min.js");
const sourceSha256 = execFileSync(process.execPath, ["scripts/check-visual-evidence.mjs", "--print-source-hash"], {
  cwd: repoRoot,
  encoding: "utf8"
}).trim();

const expectedH1 = new Map([
  ["/", "Jamie Burkart"],
  ["/work", "Selected work"],
  ["/work/technical-operations", "Technical Operations & Implementation"],
  ["/resume", "Resume"],
  ["/contact", "Contact"],
  ["/about", "About"],
  ["/work/harry-j-epstein", "Harry J. Epstein Company"],
  ["/work/callnyc", "CallNYC.org"],
  ["/work/fair-rent-nyc", "NYC Artist Coalition / FairRentNYC"],
  ["/work/wowlist", "WOWList.org"],
  ["/work/196-sunday-dinner", "196 Artists Residency / Sunday Dinner"],
  ["/work/kc-town-hall", "KC Town Hall LLC"],
  ["/lab/source-backed-team-memory", "Source-Backed Team Memory"],
  ["/colophon", "Colophon"]
]);
const capturePaths = new Map([
  ["/|1440x1000", "home-desktop.png"],
  ["/|320x740", "home-mobile-320.png"],
  ["/work/technical-operations|1440x1000", "technical-operations-desktop.png"],
  ["/work/technical-operations|320x740", "technical-operations-mobile-320.png"],
  ["/resume|1440x1000", "resume-desktop.png"],
  ["/resume|320x740", "resume-mobile-320.png"],
  ["/contact|1440x1000", "contact-desktop.png"],
  ["/contact|320x740", "contact-mobile-320.png"],
  ["/about|1440x1000", "about-desktop.png"],
  ["/about|320x740", "about-mobile-320.png"],
  ["/work/harry-j-epstein|1440x1000", "harry-j-epstein-desktop.png"],
  ["/work/harry-j-epstein|320x740", "harry-j-epstein-mobile-320.png"],
  ["/work/callnyc|1440x1000", "callnyc-desktop.png"],
  ["/work/callnyc|320x740", "callnyc-mobile-320.png"],
  ["/work/fair-rent-nyc|1440x1000", "fair-rent-nyc-desktop.png"],
  ["/work/fair-rent-nyc|320x740", "fair-rent-nyc-mobile-320.png"],
  ["/work/wowlist|1440x1000", "wowlist-desktop.png"],
  ["/work/wowlist|320x740", "wowlist-mobile-320.png"],
  ["/work/kc-town-hall|1440x1000", "kc-town-hall-desktop.png"],
  ["/work/kc-town-hall|320x740", "kc-town-hall-mobile-320.png"],
  ["/lab/source-backed-team-memory|1440x1000", "source-backed-team-memory-desktop.png"],
  ["/lab/source-backed-team-memory|320x740", "source-backed-team-memory-mobile-320.png"]
]);
const viewports = [
  { name: "1440x1000", width: 1440, height: 1000 },
  { name: "390x844", width: 390, height: 844 },
  { name: "320x740", width: 320, height: 740 }
];

const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const viewport of viewports) {
    for (const [route, expectedHeading] of expectedH1) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: "reduce"
      });
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });
      page.on("pageerror", (error) => pageErrors.push(error.message));
      const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
      await page.addScriptTag({ path: axePath });

      const inspection = await page.evaluate(async ({ expectedHeading }) => {
        const headings = [...document.querySelectorAll("h1")];
        const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
        const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
        const refs = [...document.querySelectorAll('a[role="doc-noteref"]')];
        const backlinks = [...document.querySelectorAll('a[role="doc-backlink"]')];
        const sourceHeading = [...document.querySelectorAll("h2")].some(
          (heading) => heading.textContent?.trim() === "Sources and notes"
        );
        const contrast = await window.axe.run(document, {
          runOnly: { type: "rule", values: ["color-contrast"] }
        });
        const disruptiveAnimation = document.getAnimations().some((animation) => {
          const timing = animation.effect?.getComputedTiming();
          return animation.playState === "running" &&
            (timing?.iterations === Infinity || Number(timing?.duration ?? 0) > 1000);
        });
        return {
          h1Count: headings.length,
          h1Text: headings[0]?.textContent?.trim() ?? "",
          expectedCopyPassed: headings.length === 1 && headings[0]?.textContent?.trim() === expectedHeading,
          horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
          duplicateIdCount: new Set(duplicateIds).size,
          emptyLinks: document.querySelectorAll('a:not([href]), a[href=""], a[href="#"]').length,
          contrastPassed: contrast.violations.length === 0,
          contrastViolations: contrast.violations.map((violation) => violation.id),
          sourceDisclosurePassed: refs.length === 0 || (
            sourceHeading &&
            document.querySelectorAll(".jb-endnotes ol > li").length > 0 &&
            backlinks.length > 0 &&
            refs.every((link) => link.getAttribute("href")?.startsWith("#")) &&
            backlinks.every((link) => link.getAttribute("href")?.startsWith("#")) &&
            refs.every((link) => Boolean(link.getAttribute("aria-label")))
          ),
          reducedMotionPassed: window.matchMedia("(prefers-reduced-motion: reduce)").matches && !disruptiveAnimation,
          developmentIndicatorCount: document.querySelectorAll("nextjs-portal, [data-next-badge], [data-nextjs-toast]").length
        };
      }, { expectedHeading });

      const captureName = capturePaths.get(`${route}|${viewport.name}`);
      if (captureName) {
        await page.screenshot({
          path: path.join(repoRoot, "docs/qa/evals-K", captureName),
          fullPage: new Set(["/work/fair-rent-nyc", "/work/wowlist"]).has(route)
        });
      }

      await page.keyboard.press("Tab");
      const firstTab = await page.evaluate(() => ({
        href: document.activeElement?.getAttribute?.("href") ?? null,
        text: document.activeElement?.textContent?.trim() ?? ""
      }));
      const focusChecks = [];
      for (let index = 0; index < 10; index += 1) {
        await page.keyboard.press("Tab");
        focusChecks.push(await page.evaluate(() => {
          const element = document.activeElement;
          const style = element ? getComputedStyle(element) : null;
          return {
            tag: element?.tagName ?? null,
            visible: Boolean(style && style.outlineStyle !== "none" && style.outlineWidth !== "0px")
          };
        }));
      }
      const focusable = focusChecks.filter(({ tag }) => ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(tag));
      const checks = {
        status: response?.status() === 200,
        h1: inspection.h1Count === 1,
        expectedCopy: inspection.expectedCopyPassed,
        horizontalOverflow: !inspection.horizontalOverflow,
        brokenImages: inspection.brokenImages === 0,
        duplicateIds: inspection.duplicateIdCount === 0,
        emptyLinks: inspection.emptyLinks === 0,
        contrast: inspection.contrastPassed,
        sourceDisclosure: inspection.sourceDisclosurePassed,
        skipLink: firstTab.href === "#main" && /skip/i.test(firstTab.text),
        keyboardTraversal: focusable.length > 0 && focusable.every(({ visible }) => visible),
        reducedMotion: inspection.reducedMotionPassed,
        productionRuntime: inspection.developmentIndicatorCount === 0,
        consoleErrors: consoleErrors.length === 0,
        pageErrors: pageErrors.length === 0
      };
      const failures = Object.entries(checks).filter(([, passed]) => !passed).map(([name]) => name);
      results.push({
        route,
        viewport: viewport.name,
        passed: failures.length === 0,
        failures,
        status: response?.status() ?? 0,
        h1Count: inspection.h1Count,
        expectedCopyPassed: inspection.expectedCopyPassed,
        horizontalOverflow: inspection.horizontalOverflow,
        brokenImages: inspection.brokenImages,
        duplicateIdCount: inspection.duplicateIdCount,
        emptyLinks: inspection.emptyLinks,
        contrastPassed: inspection.contrastPassed,
        sourceDisclosurePassed: inspection.sourceDisclosurePassed,
        firstTabStopIsSkipLink: checks.skipLink,
        keyboardTraversalPassed: checks.keyboardTraversal,
        reducedMotionPassed: inspection.reducedMotionPassed,
        developmentIndicatorCount: inspection.developmentIndicatorCount,
        consoleErrorCount: consoleErrors.length,
        pageErrorCount: pageErrors.length
      });
      await context.close();
    }
  }
} finally {
  await browser.close();
}

const matrix = {
  version: 1,
  generatedAt: new Date().toISOString(),
  mode: "production",
  runtime: "next-start",
  sourceSha256,
  results
};
await writeFile(path.resolve(repoRoot, values.output), `${JSON.stringify(matrix, null, 2)}\n`);

const manifestPath = path.join(repoRoot, "docs/qa/evals-K/manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
manifest.capturedAt = matrix.generatedAt.slice(0, 10);
manifest.sourceSha256 = sourceSha256;
manifest.captureRuntime.runtime = matrix.runtime;
manifest.captureRuntime.mode = matrix.mode;
manifest.captureRuntime.developmentIndicatorCount = results.reduce(
  (total, result) => total + result.developmentIndicatorCount,
  0
);
manifest.qaMatrix.observations = results.length;
manifest.qaMatrix.failures = results.filter((result) => !result.passed).length;
for (const capture of manifest.captures) {
  const artifact = await readFile(path.join(repoRoot, capture.artifactPath));
  capture.artifactSha256 = createHash("sha256").update(artifact).digest("hex");
}
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const failures = results.filter((result) => !result.passed);
console.log(`Wrote ${results.length} production observations with ${failures.length} failure(s).`);
for (const failure of failures) console.log(JSON.stringify(failure));
if (failures.length) process.exit(1);
