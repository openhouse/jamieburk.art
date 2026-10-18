import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { computePublicSurfaceFingerprint, validateResponsiveAccessibilityEvidence } from "./accessibility-evidence.mjs";
import { requireStableSurface, createRequestFailureRecorder } from "./capture-accessibility-evidence.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const outputRelative = "docs/qa/evals-H";
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
const sha = (value) => /^[a-f0-9]{64}$/.test(value ?? "");
export const methodTargets = Object.freeze([
  { id: "practical-sequence", selector: 'main p:has-text("The practical sequence is recursive:")' },
  { id: "harry-j-epstein", selector: 'main article:has(h3 a[href="/work/harry-j-epstein"])' },
  { id: "fair-rent-nyc", selector: 'main article:has(h3 a[href="/work/fair-rent-nyc"])' },
  { id: "sunday-dinner", selector: 'main article:has(h3 a[href="/work/196-sunday-dinner"])' }
]);

export function validateMethodEvidence(manifest, surface, readImage) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  require(manifest?.reportVersion === 1 && manifest.route === "/about", "Unexpected method report or route");
  require(manifest?.publicSurfaceFingerprint === surface.fingerprint &&
    manifest.publicSurfaceFingerprintPolicy === surface.policy &&
    manifest.publicSurfaceFileCount === surface.fileCount, "Stale public surface binding");
  require(sha(manifest?.buildAboutHtmlSha256) && sha(manifest?.responsiveMatrixSha256), "Missing build or matrix digest");
  require(Number.isFinite(Date.parse(manifest?.capturedAt)), "Missing capture time");
  const rows = manifest?.rows ?? [];
  const expected = new Set([375, 1280].flatMap((width) => methodTargets.map((target) => `${width}:${target.id}`)));
  const observed = new Set(rows.map((row) => `${row.viewport?.width}:${row.targetId}`));
  require(rows.length === 8 && observed.size === 8 && [...expected].every((key) => observed.has(key)), "Incomplete target and viewport coverage");
  for (const row of rows) {
    const target = methodTargets.find((item) => item.id === row.targetId);
    require(target && row.selector === target.selector, "Unexpected target selector");
    const safeScreenshotPath = typeof row.screenshot === "string" && /^professor-method-[a-zA-Z0-9_-]+\/[a-z0-9-]+\.png$/.test(row.screenshot);
    require(safeScreenshotPath, "Unsafe screenshot path");
    require(row.httpStatus === 200 && row.documentMatchesBuild === true && row.visible === true &&
      row.completeTextInsideBounds === true && row.clippingAncestorCount === 0 && row.horizontalOverflow === false &&
      row.headerOverlap === false && Array.isArray(row.failedRequests) && row.failedRequests.length === 0 &&
      Array.isArray(row.pageErrors) && row.pageErrors.length === 0,
      "Clipped, obscured, failed, or mismatched rendered target");
    require(row.image?.width > 0 && row.image.height > 0 && row.viewport?.height >= row.image.height,
      "Image or viewport dimensions cannot contain the section");
    require(typeof row.text === "string" && row.text.trim().length > 0 && digest(row.text) === row.textSha256,
      "Missing or changed observed text");
    require(Number.isFinite(Date.parse(row.capturedAt)), "Missing section capture time");
    try {
      if (!safeScreenshotPath) throw new Error("Unsafe screenshot path");
      const image = readImage(row.screenshot);
      require(sha(row.sha256) && image.length === row.byteLength && digest(image) === row.sha256, "Missing or changed screenshot bytes");
    } catch { errors.push("Missing screenshot bytes"); }
  }
  return { passed: errors.length === 0, errors };
}

export function publishMethodEvidence(output, manifest, surface, images) {
  const result = validateMethodEvidence(manifest, surface, (file) => {
    if (!images.has(file)) throw new Error("Missing image");
    return images.get(file);
  });
  if (!result.passed) throw new Error(`Invalid or incomplete method evidence: ${result.errors.join("; ")}`);
  const folders = [...new Set(manifest.rows.map((row) => path.dirname(row.screenshot)))];
  if (folders.length !== 1) throw new Error("Invalid capture directory");
  mkdirSync(output, { recursive: true });
  const destination = path.join(output, folders[0]);
  if (existsSync(destination)) throw new Error("Capture directory already exists; do not overwrite prior evidence");
  const temporary = mkdtempSync(path.join(output, ".professor-method-pending-"));
  const manifestTemporary = path.join(temporary, "manifest.json");
  try {
    const bundle = path.join(temporary, "images");
    mkdirSync(bundle);
    for (const row of manifest.rows) writeFileSync(path.join(bundle, path.basename(row.screenshot)), images.get(row.screenshot));
    writeFileSync(manifestTemporary, `${JSON.stringify(manifest, null, 2)}\n`);
    // An interruption can leave only an unreferenced immutable image directory;
    // the previous canonical manifest and all of its images remain intact.
    renameSync(bundle, destination);
    renameSync(manifestTemporary, path.join(output, "professor-method-manifest.json"));
  } finally { rmSync(temporary, { recursive: true, force: true }); }
}

async function startServer(port) {
  const child = spawn(process.execPath, ["apps/www/.next/standalone/apps/www/server.js"], {
    cwd: root, env: { ...process.env, HOSTNAME: "127.0.0.1", PORT: String(port) }, stdio: ["ignore", "pipe", "pipe"]
  });
  try {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Production server did not become ready")), 30000);
      let output = "";
      const consume = (chunk) => {
        output += chunk;
        if (/Ready in/.test(output)) { clearTimeout(timeout); resolve(); }
      };
      child.stdout.on("data", consume);
      child.stderr.on("data", consume);
      child.once("error", (error) => { clearTimeout(timeout); reject(error); });
      child.once("exit", (code) => { clearTimeout(timeout); reject(new Error(`Production server exited before capture (${code})`)); });
    });
    return child;
  } catch (error) { child.kill("SIGTERM"); throw error; }
}

async function capture() {
  const surface = computePublicSurfaceFingerprint(root);
  const matrixFile = path.join(root, outputRelative, "responsive-route-matrix.json");
  const matrixBytes = readFileSync(matrixFile);
  if (!validateResponsiveAccessibilityEvidence(root, JSON.parse(matrixBytes)).passed) {
    throw new Error("A complete current-surface browser matrix is required; rebuild and recapture that evidence first");
  }
  const buildHtml = readFileSync(path.join(root, "apps/www/.next/server/app/about.html"));
  const port = Number(process.env.PROFESSOR_METHOD_QA_PORT ?? 3221);
  if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error("Invalid loopback port");
  const playwrightPath = process.env.PLAYWRIGHT_MODULE ?? "playwright";
  const { chromium } = await import(path.isAbsolute(playwrightPath) ? pathToFileURL(playwrightPath).href : playwrightPath);
  const server = await startServer(port);
  let browser;
  const rows = [], images = new Map();
  const startedAt = new Date().toISOString();
  const directory = `professor-method-${startedAt.replace(/[:.]/g, "-")}`;
  try {
    browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined });
    for (const width of [375, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 1200 }, deviceScaleFactor: 1 });
      const pageErrors = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));
      const requests = createRequestFailureRecorder(page, `http://127.0.0.1:${port}`);
      const response = await page.goto(`http://127.0.0.1:${port}/about`, { waitUntil: "networkidle" });
      const responseBytes = await response.body();
      if (!responseBytes.equals(buildHtml)) throw new Error("Served About HTML differs from the current production build");
      await page.evaluate(() => document.fonts.ready);
      for (const target of methodTargets) {
        const locator = page.locator(target.selector);
        if (await locator.count() !== 1) throw new Error(`Target must resolve once: ${target.id}`);
        const height = Math.ceil((await locator.boundingBox())?.height ?? 0);
        await page.setViewportSize({ width, height: Math.max(1200, height + 300) });
        await locator.evaluate((element) => {
          element.scrollIntoView({ block: "center" });
        });
        await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const geometry = await locator.evaluate((element) => {
          const rect = element.getBoundingClientRect();
          const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
          const textRects = [];
          while (walker.nextNode()) {
            if (!walker.currentNode.textContent.trim()) continue;
            const range = document.createRange(); range.selectNodeContents(walker.currentNode);
            textRects.push(...range.getClientRects());
          }
          let clippingAncestorCount = 0;
          for (let parent = element.parentElement; parent; parent = parent.parentElement) {
            const style = getComputedStyle(parent), bounds = parent.getBoundingClientRect();
            if (/(hidden|clip|scroll|auto)/.test(`${style.overflowX} ${style.overflowY}`) &&
              (rect.left < bounds.left - 1 || rect.right > bounds.right + 1 || rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1)) clippingAncestorCount++;
          }
          const header = document.querySelector("header")?.getBoundingClientRect();
          return { text: element.innerText.trim(), visible: rect.width > 0 && rect.height > 0,
            completeTextInsideBounds: textRects.length > 0 && textRects.every((item) => item.left >= rect.left - 1 && item.right <= rect.right + 1 && item.top >= rect.top - 1 && item.bottom <= rect.bottom + 1),
            clippingAncestorCount, horizontalOverflow: rect.left < 0 || rect.right > innerWidth,
            headerOverlap: Boolean(header && rect.left < header.right && rect.right > header.left && rect.top < header.bottom && rect.bottom > header.top),
            image: { width: Math.ceil(rect.width), height: Math.ceil(rect.height) } };
        });
        const bytes = await locator.screenshot({ type: "png" });
        const screenshot = `${directory}/${target.id}-${width}.png`;
        images.set(screenshot, bytes);
        rows.push({ targetId: target.id, selector: target.selector, viewport: page.viewportSize(),
          ...geometry, textSha256: digest(geometry.text), screenshot, sha256: digest(bytes), byteLength: bytes.length,
          httpStatus: response.status(), documentMatchesBuild: true, capturedAt: new Date().toISOString() });
        process.stdout.write(`Captured ${width}px ${target.id}\n`);
      }
      const observedRequests = requests.stop();
      for (const row of rows.filter((item) => item.viewport.width === width)) {
        row.failedRequests = observedRequests.failedRequests.map(({ failure, resourceType }) => ({ failure, resourceType }));
        row.canceledPrefetchCount = observedRequests.canceledPrefetchRequests.length;
        row.pageErrors = [...pageErrors];
      }
      await page.close();
    }
    requireStableSurface(surface, computePublicSurfaceFingerprint(root));
    if (digest(readFileSync(matrixFile)) !== digest(matrixBytes) || !readFileSync(path.join(root, "apps/www/.next/server/app/about.html")).equals(buildHtml)) {
      throw new Error("Build or prerequisite evidence changed during capture");
    }
    const manifest = { reportVersion: 1, route: "/about", capturedAt: new Date().toISOString(),
      publicSurfaceFingerprint: surface.fingerprint, publicSurfaceFingerprintPolicy: surface.policy, publicSurfaceFileCount: surface.fileCount,
      buildAboutHtmlSha256: digest(buildHtml), responsiveMatrixSha256: digest(matrixBytes),
      captureMethod: "Fresh Chromium element screenshots at unmodified 375px and 1280px page layouts. The capture uses a current complete browser matrix, checks served HTML against the production build, and records full section bounds without changing site styles.",
      boundary: "Observed pixels and geometry are review evidence, not human review, factual approval, rights clearance, or release authority.", rows };
    publishMethodEvidence(path.join(root, outputRelative), manifest, surface, images);
    process.stdout.write(`Published ${rows.length} complete sections for ${surface.fingerprint}\n`);
  } finally {
    if (browser) await browser.close();
    server.kill("SIGTERM");
    if (server.exitCode === null) await new Promise((resolve) => server.once("exit", resolve));
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.includes("--check")) {
    const output = path.join(root, outputRelative);
    const manifest = JSON.parse(readFileSync(path.join(output, "professor-method-manifest.json"), "utf8"));
    const result = validateMethodEvidence(manifest, computePublicSurfaceFingerprint(root), (file) => readFileSync(path.join(output, file)));
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    if (!result.passed) process.exitCode = 1;
  } else {
    await capture();
  }
}
