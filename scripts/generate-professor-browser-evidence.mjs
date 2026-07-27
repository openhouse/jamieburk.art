import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright-core";

import { computePublicSurfaceFingerprint } from "./knowledge-wiki/accessibility-evidence.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(repoRoot, "docs/qa/evals-H");
const baseUrl = process.env.PROFESSOR_EVIDENCE_BASE_URL ?? "http://localhost:3045";
const executablePath =
  process.env.CHROME_EXECUTABLE_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const viewports = [
  {
    name: "desktop",
    width: 1440,
    height: 1000,
    screenshot: "professor-lenses-about-desktop.png"
  },
  {
    name: "mobile",
    width: 375,
    height: 812,
    screenshot: "professor-lenses-about-mobile.png"
  }
];

const browser = await chromium.launch({ executablePath, headless: true });
const observations = [];
let homepageAboutLink;
let contentAssertions;

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: "reduce"
    });
    const page = await context.newPage();
    const consoleErrors = [];
    const failedRequests = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));
    page.on("requestfailed", (request) => failedRequests.push(request.url()));

    const homeResponse = await page.goto(baseUrl, {
      waitUntil: "networkidle",
      timeout: 30_000
    });
    const aboutLink = page.getByRole("link", { name: "About", exact: true }).first();
    homepageAboutLink = {
      visible: await aboutLink.isVisible(),
      href: await aboutLink.getAttribute("href")
    };

    const aboutResponse = await page.goto(`${baseUrl}/about`, {
      waitUntil: "networkidle",
      timeout: 30_000
    });
    await page.evaluate(async () => {
      const step = Math.max(500, Math.floor(window.innerHeight * 0.8));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);

    contentAssertions = await page.evaluate(() => ({
      throughLineHeading:
        [...document.querySelectorAll("h2")].find((heading) =>
          heading.textContent?.includes("Systems people can inhabit")
        )?.textContent?.trim() ?? null,
      relationshipRows:
        [...document.querySelectorAll("strong")].filter((node) =>
          node.textContent?.includes("Relationships:")
        ).length,
      modelRows:
        [...document.querySelectorAll("strong")].filter((node) =>
          node.textContent?.includes("Model:")
        ).length,
      interfaceAndUseRows:
        [...document.querySelectorAll("strong")].filter((node) =>
          node.textContent?.includes("Interface and use:")
        ).length,
      learningAndContinuityRows:
        [...document.querySelectorAll("strong")].filter((node) =>
          node.textContent?.includes("Learning and continuity:")
        ).length,
      currentPracticeRows:
        [...document.querySelectorAll("strong")].filter((node) =>
          node.textContent?.includes("Current practice:")
        ).length,
      publicOpenHouseSourceLinks:
        [...document.querySelectorAll("a")].filter((link) =>
          link.href.includes("goodtimes.sc")
        ).length
    }));

    const render = await page.evaluate(() => {
      const images = [...document.images];
      return {
        documentScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        h1Count: document.querySelectorAll("h1").length,
        mainPresent: Boolean(document.querySelector("main")),
        brokenImages: images.filter(
          (image) => !image.complete || image.naturalWidth === 0
        ).length,
        unlabeledImages: images.filter((image) => !image.hasAttribute("alt")).length
      };
    });

    await page.screenshot({
      path: path.join(outputRoot, viewport.screenshot),
      fullPage: true
    });

    observations.push({
      ...viewport,
      homepageStatus: homeResponse?.status() ?? 0,
      aboutStatus: aboutResponse?.status() ?? 0,
      ...render,
      consoleErrors,
      failedRequests
    });
    await context.close();
  }
} finally {
  await browser.close();
}

const publicSurface = computePublicSurfaceFingerprint(repoRoot);
const report = {
  reportVersion: 2,
  checkedAt: new Date().toISOString(),
  sourceCommit: execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: repoRoot,
    encoding: "utf8"
  }).trim(),
  publicSurfaceFingerprint: publicSurface.fingerprint,
  publicSurfaceFileCount: publicSurface.fileCount,
  baseUrl,
  route: "/about",
  homepageAboutLink,
  contentAssertions,
  viewports: observations,
  passed:
    homepageAboutLink?.visible === true &&
    homepageAboutLink?.href === "/about" &&
    contentAssertions?.throughLineHeading === "Systems people can inhabit" &&
    contentAssertions?.relationshipRows === 6 &&
    contentAssertions?.modelRows === 6 &&
    contentAssertions?.interfaceAndUseRows === 6 &&
    contentAssertions?.learningAndContinuityRows === 6 &&
    contentAssertions?.currentPracticeRows === 3 &&
    contentAssertions?.publicOpenHouseSourceLinks >= 1 &&
    observations.every((entry) =>
      entry.homepageStatus >= 200 &&
      entry.homepageStatus < 400 &&
      entry.aboutStatus >= 200 &&
      entry.aboutStatus < 400 &&
      entry.documentScrollWidth === entry.width &&
      entry.bodyScrollWidth === entry.width &&
      entry.h1Count === 1 &&
      entry.mainPresent === true &&
      entry.brokenImages === 0 &&
      entry.unlabeledImages === 0 &&
      entry.consoleErrors.length === 0 &&
      entry.failedRequests.length === 0
    )
};

writeFileSync(
  path.join(outputRoot, "professor-lenses-browser-qa.json"),
  `${JSON.stringify(report, null, 2)}\n`
);

if (!report.passed) {
  throw new Error("Professor browser evidence did not satisfy the exact-candidate contract.");
}

console.log(
  `Professor browser evidence refreshed: ${contentAssertions.relationshipRows} project loops, ` +
    `${observations.length} viewports, public surface ${publicSurface.fingerprint}.`
);
