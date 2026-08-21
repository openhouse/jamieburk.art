import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync
} from "node:fs";
import os from "node:os";
import path from "node:path";

function arg(name, fallback) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

const baseUrl = arg("--base-url", "http://127.0.0.1:3017").replace(/\/$/, "");
const outputPath = arg("--output", "/tmp/team-memory-referral-browser-receipt.json");
const screenshotDir = arg(
  "--screenshot-dir",
  "/tmp/team-memory-referral-browser-screenshots"
);
const chromeBin =
  arg("--chrome-bin", process.env.CHROME_BIN) ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const startRoute = "/lab/source-backed-team-memory";
const resumeRoute = "/resume";
const resumePdfRoute = "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
const allowedRoutes = new Set([startRoute, resumeRoute, resumePdfRoute]);

function decodeHtml(value) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, digits) => String.fromCodePoint(Number(digits)))
    .replace(/&#x([0-9a-f]+);/gi, (_, digits) => String.fromCodePoint(Number.parseInt(digits, 16)));
}

function visibleTextFromDom(dom) {
  const body = dom.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? dom;
  return decodeHtml(
    body
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

function titleFromDom(dom) {
  return decodeHtml(dom.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
}

function h1FromDom(dom) {
  const h1 = dom.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "";
  return visibleTextFromDom(h1);
}

function discoverAllowedLinks(dom, route) {
  const discovered = new Set();
  for (const match of dom.matchAll(/\shref=(?:"([^"]+)"|'([^']+)')/gi)) {
    const href = match[1] ?? match[2];
    try {
      const url = new URL(href, `${baseUrl}${route}`);
      if (url.origin === new URL(baseUrl).origin && allowedRoutes.has(url.pathname)) {
        discovered.add(url.pathname);
      }
    } catch {
      // Ignore malformed or non-navigation href values.
    }
  }
  return [...discovered];
}

function captureScreenshot(route, filename) {
  mkdirSync(screenshotDir, { recursive: true });
  const screenshotPath = path.join(screenshotDir, filename);
  const profileDir = mkdtempSync(path.join(os.tmpdir(), "team-memory-referral-chrome-"));
  const capture = spawnSync(
    chromeBin,
    [
      "--headless=new",
      "--disable-gpu",
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-default-apps",
      "--disable-extensions",
      "--disable-sync",
      "--hide-scrollbars",
      "--metrics-recording-only",
      "--no-first-run",
      "--no-default-browser-check",
      "--force-device-scale-factor=1",
      "--window-size=1440,1200",
      `--user-data-dir=${profileDir}`,
      "--virtual-time-budget=2500",
      `--screenshot=${screenshotPath}`,
      `${baseUrl}${route}`
    ],
    {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 15_000,
      killSignal: "SIGTERM"
    }
  );
  rmSync(profileDir, { recursive: true, force: true });
  if (!existsSync(screenshotPath)) {
    throw new Error(
      `Headless Chrome did not return a screenshot for ${route}: ${capture.error?.message ?? capture.stderr ?? "unknown error"}`
    );
  }
  const bytes = readFileSync(screenshotPath);
  if (bytes.toString("ascii", 1, 4) !== "PNG") {
    throw new Error(`Browser screenshot for ${route} is not a PNG.`);
  }
  return {
    filename,
    format: "png",
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    bytes: bytes.byteLength,
    sha256: createHash("sha256").update(bytes).digest("hex")
  };
}

async function capturePage(route, screenshotFilename) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: "manual" });
  const profileDir = mkdtempSync(path.join(os.tmpdir(), "team-memory-referral-chrome-"));
  const capture = spawnSync(
    chromeBin,
    [
      "--headless=new",
      "--disable-gpu",
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-default-apps",
      "--disable-extensions",
      "--disable-sync",
      "--metrics-recording-only",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${profileDir}`,
      "--virtual-time-budget=2000",
      "--dump-dom",
      `${baseUrl}${route}`
    ],
    {
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 15_000,
      killSignal: "SIGTERM"
    }
  );
  const dom = capture.stdout ?? "";
  rmSync(profileDir, { recursive: true, force: true });
  if (!dom.includes("<body")) {
    throw new Error(
      `Headless Chrome did not return rendered DOM for ${route}: ${capture.error?.message ?? capture.stderr ?? "unknown error"}`
    );
  }
  const visibleText = visibleTextFromDom(dom);
  return {
    route,
    status: response.status,
    title: titleFromDom(dom),
    h1: h1FromDom(dom),
    visibleText,
    visibleTextSha256: createHash("sha256").update(visibleText).digest("hex"),
    discoveredAllowedLinks: discoverAllowedLinks(dom, route),
    screenshot: captureScreenshot(route, screenshotFilename)
  };
}

const firstPage = await capturePage(startRoute, "team-memory-desktop.png");
if (!firstPage.discoveredAllowedLinks.includes(resumeRoute)) {
  throw new Error(`The start page did not expose ${resumeRoute} as a public link.`);
}
const resumePage = await capturePage(resumeRoute, "resume-desktop.png");
if (!resumePage.discoveredAllowedLinks.includes(resumePdfRoute)) {
  throw new Error(`The resume page did not expose ${resumePdfRoute} as a public link.`);
}
const pdfResponse = await fetch(`${baseUrl}${resumePdfRoute}`);
const pdfBytes = Buffer.from(await pdfResponse.arrayBuffer());
const pages = [firstPage, resumePage];
const surfaceHash = createHash("sha256");
surfaceHash.update("headless-browser-public-render-with-screenshot-v2\0");
for (const page of pages) {
  surfaceHash.update(page.route);
  surfaceHash.update("\0");
  surfaceHash.update(page.visibleText);
  surfaceHash.update("\0");
  surfaceHash.update(page.screenshot.sha256);
  surfaceHash.update("\0");
}

const receipt = {
  schemaVersion: 1,
  captureProtocol: "headless-browser-public-render-with-screenshot-v2",
  capturedAt: new Date().toISOString(),
  localOrigin: baseUrl,
  startRoute,
  routeChain: [startRoute, resumeRoute, resumePdfRoute],
  repositoryAccess: false,
  sourceCodeAccess: false,
  navigationRule: "Begin at the team-memory page and follow only discovered, same-origin public links.",
  linkDiscovery: {
    [startRoute]: firstPage.discoveredAllowedLinks,
    [resumeRoute]: resumePage.discoveredAllowedLinks
  },
  pages,
  resumeArtifact: {
    route: resumePdfRoute,
    status: pdfResponse.status,
    contentType: pdfResponse.headers.get("content-type"),
    bytes: pdfBytes.byteLength,
    sha256: createHash("sha256").update(pdfBytes).digest("hex")
  },
  publicSurfaceDigest: surfaceHash.digest("hex")
};

writeFileSync(outputPath, `${JSON.stringify(receipt, null, 2)}\n`);
process.stdout.write(`${outputPath}\n`);
