import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

// Run against a built local app. Browser dependencies are supplied by the
// caller; this check adds no runtime dependency to the portfolio.
const baseUrl = process.env.JB_NAV_BASE_URL ?? "http://127.0.0.1:3000";
const evidenceDirectory = process.env.JB_NAV_EVIDENCE_DIR;
const playwrightModule = process.env.JB_NAV_PLAYWRIGHT_MODULE;
const browserExecutable = process.env.JB_NAV_BROWSER_EXECUTABLE;

async function assertUnobscured(locator) {
  await locator.waitFor({ state: "visible" });
  // Hash navigation can continue smooth-scrolling after the route is ready.
  // Wait for the observable destination, without scrolling it on the test's behalf.
  await locator.page().waitForFunction((element) => {
    const box = element.getBoundingClientRect();
    const x = Math.min(innerWidth - 1, Math.max(0, box.left + box.width / 2));
    const y = Math.min(innerHeight - 1, Math.max(0, box.top + box.height / 2));
    const front = document.elementFromPoint(x, y);
    return box.top >= 0 && box.bottom <= innerHeight &&
      Boolean(front && (front === element || element.contains(front)));
  }, await locator.elementHandle(), { timeout: 5_000 });
}

const { chromium } = await import(playwrightModule ? pathToFileURL(playwrightModule).href : "playwright");
const browser = await chromium.launch({ headless: true, ...(browserExecutable ? { executablePath: browserExecutable } : {}) });
const results = [];
if (evidenceDirectory) mkdirSync(evidenceDirectory, { recursive: true });

try {
  for (const scenario of [
    { id: "different-route", start: "/", destination: "/about" },
    { id: "same-route", start: "/about", destination: "/about" }
  ]) {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
    page.setDefaultTimeout(10_000);
    const result = { ...scenario, viewport: "375x812", passed: false };
    try {
      const response = await page.goto(new URL(scenario.start, baseUrl).href, { waitUntil: "networkidle" });
      assert.equal(response?.status(), 200, "The built app must serve the starting page");
      const disclosure = page.locator("header details");
      const summary = disclosure.locator("summary");
      await summary.focus();
      await page.keyboard.press("Enter");
      assert.equal(await disclosure.evaluate((element) => element.open), true, "Enter opens the native menu");
      const about = page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "About", exact: true });
      await about.focus();
      await page.keyboard.press("Enter");
      await page.waitForURL(new URL(scenario.destination, baseUrl).href);
      await page.waitForLoadState("networkidle");
      result.menuOpenAfterNavigation = await disclosure.evaluate((element) => element.open);
      assert.equal(result.menuOpenAfterNavigation, false, "Mobile navigation must close after activating a route, including the current route");
      await assertUnobscured(page.getByRole("heading", { name: "About", exact: true, level: 1 }));
      result.aboutNavigation = {
        path: new URL(page.url()).pathname,
        heading: "About",
        headingUnobscured: true,
        menuOpen: result.menuOpenAfterNavigation
      };
      if (evidenceDirectory) {
        result.aboutNavigation.screenshot = `${scenario.id}-about.png`;
        await page.screenshot({ path: path.join(evidenceDirectory, result.aboutNavigation.screenshot), fullPage: false });
      }

      const caseLink = page.getByRole("link", { name: "From audio editions to printed labels", exact: true });
      await caseLink.focus();
      await page.keyboard.press("Enter");
      await page.waitForURL(new URL("/work/technical-operations#audio-print-production", baseUrl).href);
      await page.waitForLoadState("networkidle");
      assert.equal(await page.locator("header details").evaluate((element) => element.open), false, "The subsequent case destination must not inherit an open menu");
      await assertUnobscured(page.getByRole("heading", { name: "From audio editions to printed labels", exact: true }));
      const finalUrl = new URL(page.url());
      result.caseNavigation = {
        path: finalUrl.pathname + finalUrl.hash,
        heading: "From audio editions to printed labels",
        headingUnobscured: true,
        menuOpen: false,
        screenshot: evidenceDirectory ? `${scenario.id}.png` : null
      };
      result.passed = true;
    } catch (error) {
      result.error = error.message;
    } finally {
      if (evidenceDirectory) await page.screenshot({ path: path.join(evidenceDirectory, `${scenario.id}.png`), fullPage: false });
      results.push(result);
      await page.close();
    }
  }
} finally {
  await browser.close();
}

const report = { baseUrl, checkedAt: new Date().toISOString(), passed: results.every((result) => result.passed), results };
if (evidenceDirectory) writeFileSync(path.join(evidenceDirectory, "mobile-navigation.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
