#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { loadSuite } from "./lib/launch-readiness.mjs";

const args = process.argv.slice(2);
const valueFor = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index === -1 ? fallback : args[index + 1];
};

const baseUrl = valueFor("--url", "http://127.0.0.1:3000").replace(/\/$/, "");
const profile = valueFor("--profile", "local");
const outputPath = valueFor("--output", "reports/generated/launch-browser.json");

if (!["local", "staging", "production"].includes(profile)) {
  console.error("--profile must be local, staging, or production");
  process.exit(2);
}

const suite = loadSuite();
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
const failures = [];
const observations = [];
const browserErrors = [];

page.on("pageerror", (error) => browserErrors.push({ type: "pageerror", message: error.message }));
page.on("console", (message) => {
  if (message.type() === "error") {
    browserErrors.push({ type: "console", message: message.text(), url: page.url() });
  }
});

for (const viewport of suite.viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  for (const route of suite.routes) {
    const url = `${baseUrl}${route}`;
    let response;
    try {
      response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    } catch (error) {
      failures.push(`canonical-routes-return-200: ${route} navigation failed at ${viewport.name}: ${error.message}`);
      observations.push({ route, viewport: viewport.name, status: 0, navigationError: error.message });
      continue;
    }
    const status = response?.status() ?? 0;
    if (status !== 200) failures.push(`canonical-routes-return-200: ${route} returned ${status}`);

    const measurement = await page.evaluate(() => {
      const root = document.documentElement;
      const clientWidth = root.clientWidth;
      const offenders = Array.from(document.querySelectorAll("body *"))
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.right > clientWidth + 1 || rect.left < -1;
        })
        .slice(0, 8)
        .map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            tag: element.tagName,
            className: typeof element.className === "string" ? element.className.slice(0, 120) : "",
            text: (element.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 120),
            left: Math.round(rect.left),
            right: Math.round(rect.right)
          };
        });

      return {
        title: document.title,
        h1Count: document.querySelectorAll("h1").length,
        clientWidth,
        scrollWidth: root.scrollWidth,
        overflow: root.scrollWidth > clientWidth + 1,
        offenders,
        imageCount: document.querySelectorAll("img, picture, video").length,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
        robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? null
      };
    });

    if (measurement.h1Count !== 1) {
      failures.push(`one-h1-per-route: ${route} has ${measurement.h1Count} h1 elements at ${viewport.name}`);
    }
    if (measurement.overflow) {
      failures.push(
        `no-horizontal-overflow: ${route} is ${measurement.scrollWidth - measurement.clientWidth}px too wide at ${viewport.name}`
      );
    }

    observations.push({ route, viewport: viewport.name, status, ...measurement });
  }
}

let homeHeaders = {};
let robotsBody = "";
try {
  const homeResponse = await page.goto(`${baseUrl}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000
  });
  homeHeaders = homeResponse?.headers() ?? {};
  const robotsResponse = await context.request.get(`${baseUrl}/robots.txt`);
  robotsBody = await robotsResponse.text();
} catch (error) {
  failures.push(`indexing-matches-environment: environment check failed: ${error.message}`);
}

if (profile === "staging") {
  if (!/noindex/i.test(homeHeaders["x-robots-tag"] ?? "")) {
    failures.push("indexing-matches-environment: staging lacks X-Robots-Tag noindex");
  }
  if (!/Disallow:\s*\//i.test(robotsBody)) {
    failures.push("indexing-matches-environment: staging robots.txt does not disallow all crawling");
  }
}

if (profile === "production") {
  if (/noindex/i.test(homeHeaders["x-robots-tag"] ?? "")) {
    failures.push("indexing-matches-environment: production sends X-Robots-Tag noindex");
  }
  if (/Disallow:\s*\/$/im.test(robotsBody)) {
    failures.push("indexing-matches-environment: production robots.txt disallows all crawling");
  }
  const canonical = observations.find(
    (item) => item.route === "/" && item.viewport === suite.viewports[0].name
  )?.canonical;
  if (!canonical?.startsWith(baseUrl)) {
    failures.push(`indexing-matches-environment: production canonical is ${canonical ?? "missing"}`);
  }
}

try {
  const resumeResponse = await context.request.get(
    `${baseUrl}/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf`
  );
  if (!resumeResponse.ok() || !/application\/pdf/i.test(resumeResponse.headers()["content-type"] ?? "")) {
    failures.push(
      `resume-pdf-is-reachable: received ${resumeResponse.status()} ${resumeResponse.headers()["content-type"] ?? "without content type"}`
    );
  }
} catch (error) {
  failures.push(`resume-pdf-is-reachable: request failed: ${error.message}`);
}

if (browserErrors.length) {
  failures.push(`no-browser-errors: ${browserErrors.length} console or page error(s)`);
}

await browser.close();

const report = {
  suiteId: suite.id,
  suiteVersion: suite.version,
  baseUrl,
  profile,
  summary: {
    hardGateFailures: failures.length,
    routes: suite.routes.length,
    viewports: suite.viewports.length,
    observations: observations.length,
    mediaElementsSeen: observations.reduce((sum, item) => sum + item.imageCount, 0)
  },
  failures,
  browserErrors,
  observations
};

const absoluteOutput = path.resolve(outputPath);
mkdirSync(path.dirname(absoluteOutput), { recursive: true });
writeFileSync(absoluteOutput, `${JSON.stringify(report, null, 2)}\n`);

console.log(
  `Browser launch eval: ${failures.length} failure(s) across ${suite.routes.length} routes and ${suite.viewports.length} viewports.`
);
failures.forEach((failure) => console.error(`- ${failure}`));
console.log(`Report: ${path.relative(process.cwd(), absoluteOutput)}`);

if (failures.length) process.exit(1);
