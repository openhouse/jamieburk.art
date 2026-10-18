import { spawn, execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  canonicalAccessibilityRoutes, canonicalAccessibilityViewports,
  computePublicSurfaceFingerprint, validateResponsiveAccessibilityEvidence
} from "./accessibility-evidence.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const require = createRequire(import.meta.url);
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const sum = (rows, field) => rows.reduce((total, row) => total + row[field], 0);

export function summarizeRows(rows) {
  return {
    rowCount: rows.length,
    axeViolations: rows.reduce((total, row) => total + row.violations.length, 0),
    criticalAxeViolations: rows.reduce((total, row) => total + row.violations.filter((v) => v.impact === "critical").length, 0),
    overflowElements: sum(rows, "overflowElements"),
    brokenImagesAfterScroll: sum(rows, "brokenImagesAfterScroll"),
    unloadedImagesAfterScroll: sum(rows, "unloadedImagesAfterScroll"),
    unlabeledImages: sum(rows, "unlabeledImages"),
    failedRequests: rows.reduce((total, row) => total + row.failedRequests.length, 0),
    nonSuccessResponses: rows.filter((row) => row.httpStatus < 200 || row.httpStatus >= 400).length,
    invalidHeadingOrLandmarkRows: rows.filter((row) => row.h1Count !== 1 || !row.mainPresent).length,
    lazyImagesObserved: sum(rows, "lazyImagesObserved"),
    unloadedImagesBeforeScroll: sum(rows, "unloadedImagesBeforeScroll"),
    lazyImageFollowUpPerformed: true,
    allImagesLoadedAfterScroll: rows.every((row) => row.brokenImagesAfterScroll === 0 && row.unloadedImagesAfterScroll === 0)
  };
}

export function requireStableSurface(before, after) {
  if (before.fingerprint !== after.fingerprint || before.fileCount !== after.fileCount || before.policy !== after.policy) {
    throw new Error("Public surface changed during capture; discard this run and rebuild before recapture.");
  }
}

export function recordIncompleteCapture(output, before, rows, error) {
  const directory = path.join(output, "incomplete-runs");
  mkdirSync(directory, { recursive: true });
  const artifact = path.join(directory, `${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  writeFileSync(artifact, `${JSON.stringify({
    status: "incomplete-not-current-evidence", publicSurfaceFingerprint: before.fingerprint,
    completedRows: rows.length, expectedRows: 60, rows, error: error.message,
    boundary: "This interrupted run does not replace candidate-bound evidence or establish a pass."
  }, null, 2)}\n`);
  return artifact;
}

export function createCapturePublication(output) {
  const screenshots = new Map();
  return {
    async captureScreenshot(page, filename) {
      const bytes = await page.screenshot();
      screenshots.set(filename, bytes);
      return bytes;
    },
    publish(reports) {
      mkdirSync(output, { recursive: true });
      for (const [filename, bytes] of screenshots) writeFileSync(path.join(output, filename), bytes);
      for (const [filename, report] of Object.entries(reports)) {
        writeFileSync(path.join(output, filename), `${JSON.stringify(report, null, 2)}\n`);
      }
    }
  };
}

export function classifyRequestFailure(observation, baseUrl) {
  const url = new URL(observation.url);
  return observation.failure === "net::ERR_ABORTED" && observation.resourceType === "fetch" &&
    observation.headers.rsc === "1" && observation.headers["next-router-prefetch"] === "1" &&
    url.origin === new URL(baseUrl).origin && url.searchParams.has("_rsc")
    ? "canceled-prefetch" : "failed";
}

export function createRequestFailureRecorder(page, baseUrl) {
  const failedRequests = [], canceledPrefetchRequests = [];
  const listener = (request) => {
    const headers = request.headers();
    const observation = { url: request.url(), failure: request.failure()?.errorText,
      resourceType: request.resourceType(), headers: { rsc: headers.rsc ?? null, "next-router-prefetch": headers["next-router-prefetch"] ?? null } };
    (classifyRequestFailure(observation, baseUrl) === "canceled-prefetch" ? canceledPrefetchRequests : failedRequests).push(observation);
  };
  page.on("requestfailed", listener);
  return { stop() {
    page.off("requestfailed", listener);
    return structuredClone({ failedRequests, canceledPrefetchRequests });
  } };
}

async function measurements(page) {
  return page.evaluate(() => {
    const images = [...document.images];
    const overflow = [...document.querySelectorAll("body *")].filter((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 &&
        (rect.left < -1 || rect.right > innerWidth + 1);
    });
    return {
      overflowElements: overflow.length,
      brokenImagesAfterScroll: images.filter((image) => image.complete && image.naturalWidth === 0).length,
      unloadedImagesAfterScroll: images.filter((image) => !image.complete).length,
      unlabeledImages: images.filter((image) => !image.hasAttribute("alt")).length,
      h1Count: document.querySelectorAll("h1").length,
      mainPresent: document.querySelectorAll("main").length === 1,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth
    };
  });
}

async function loadAllImages(page) {
  await page.evaluate(async () => {
    for (const image of document.images) {
      image.scrollIntoView({ block: "center" });
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }
  });
  await page.waitForFunction(() => [...document.images].every((image) => image.complete), undefined, { timeout: 30000 });
  await page.evaluate(() => scrollTo(0, 0));
  await page.evaluate(() => document.fonts.ready);
}

async function captionOccurrence(page, viewport) {
  return page.evaluate((width) => {
    const caption = document.querySelector(".jb-hero-caption");
    const parts = caption ? [...caption.children] : [];
    const rect = caption?.getBoundingClientRect();
    const copy = document.querySelector(".jb-hero-content > div")?.getBoundingClientRect();
    const style = caption ? getComputedStyle(caption) : null;
    return {
      viewport: width, captionPresent: Boolean(caption), captionPartCount: parts.length,
      captionText: parts[0]?.textContent?.trim() ?? "", creditText: parts[1]?.textContent?.trim() ?? "",
      computedFontSizePx: parseFloat(style?.fontSize ?? "0"), computedLineHeight: style?.lineHeight ?? null,
      captionWithinViewport: Boolean(rect && rect.left >= 0 && rect.right <= innerWidth),
      captionAndCreditSeparated: parts.length === 2 && parts.every((part) => getComputedStyle(part).display === "block"),
      captionOverlapsPrimaryCopy: Boolean(rect && copy && rect.left < copy.right && rect.right > copy.left && rect.top < copy.bottom && rect.bottom > copy.top)
    };
  }, viewport);
}

async function focusedElement(page) {
  return page.evaluate(() => {
    const element = document.activeElement;
    return { tag: element.tagName.toLowerCase(), text: element.textContent.trim(), href: element.getAttribute("href"),
      focusVisible: element.matches(":focus-visible"), id: element.id || null };
  });
}

async function captureInteractions(browser, baseUrl) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  const desktopTabSequence = [];
  for (let index = 0; index < 7; index++) {
    await page.keyboard.press("Tab");
    desktopTabSequence.push(await focusedElement(page));
  }
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  const skipActivation = await page.evaluate(() => ({ hash: location.hash, activeElementId: document.activeElement.id }));
  const keyboard = { desktopTabSequence, skipLinkIsFirst: desktopTabSequence[0].href === "#main", skipActivation };
  keyboard.passed = keyboard.skipLinkIsFirst && desktopTabSequence.every((item) => item.focusVisible) && skipActivation.activeElementId === "main";
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  let menuFocusBeforeOpen;
  for (let index = 0; index < 12; index++) {
    await page.keyboard.press("Tab");
    menuFocusBeforeOpen = await focusedElement(page);
    if (menuFocusBeforeOpen.tag === "summary") break;
  }
  await page.keyboard.press("Enter");
  const menuOpen = await page.locator("header details").evaluate((element) => element.open);
  await page.keyboard.press("Tab");
  const firstMobileMenuLink = await focusedElement(page);
  const mobileNavigation = { menuFocusBeforeOpen, menuOpen, firstMobileMenuLink,
    passed: menuFocusBeforeOpen.tag === "summary" && menuFocusBeforeOpen.focusVisible && menuOpen && firstMobileMenuLink.href === "/work" && firstMobileMenuLink.focusVisible };
  const rows = [];
  for (const width of [640, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/about"]) {
      const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
      await loadAllImages(page);
      const observed = await measurements(page);
      rows.push({ route, width, httpStatus: response.status(), clientWidth: observed.clientWidth,
        scrollWidth: observed.scrollWidth, overflowElements: observed.overflowElements,
        mainPresent: observed.mainPresent, h1Count: observed.h1Count,
        passed: response.status() === 200 && observed.overflowElements === 0 && observed.scrollWidth <= observed.clientWidth && observed.mainPresent && observed.h1Count === 1 });
    }
  }
  const semanticReadingOrder = await page.evaluate(() => ({
    scope: "/about landmarks and first 20 headings",
    landmarks: [...document.querySelectorAll("header,nav,main,footer")].map((element) => ({ tag: element.tagName.toLowerCase(), ariaLabel: element.getAttribute("aria-label") })),
    headings: [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].slice(0, 20).map((element) => ({ level: Number(element.tagName.slice(1)), text: element.textContent.trim() })),
    passed: document.querySelectorAll("main").length === 1 && document.querySelectorAll("h1").length === 1
  }));
  await page.close();
  return { reportVersion: 4, method: "Fresh Playwright keyboard interaction plus DOM and viewport inspection on a freshly rebuilt production app. This is not a human screen-reader or assistive-technology session.",
    keyboard, mobileNavigation, reflow: { interpretation: "640 CSS pixels approximates a 1280-pixel viewport at 200% zoom; 320 CSS pixels is the more stringent WCAG reflow proxy for 400% zoom.", rows, passed: rows.every((row) => row.passed) },
    semanticReadingOrder,
    residualHumanGates: ["Human screen-reader review", "Human browser zoom review", "Jamie visual and content approval", "Production deployment and indexing approval"],
    passed: keyboard.passed && mobileNavigation.passed && rows.every((row) => row.passed) && semanticReadingOrder.passed };
}

export async function captureAccessibilityEvidence() {
  const before = computePublicSurfaceFingerprint(repoRoot);
  const output = path.join(repoRoot, "docs/qa/evals-H");
  const publication = createCapturePublication(output);
  const port = process.env.ACCESSIBILITY_QA_PORT ?? "3219";
  const baseUrl = `http://127.0.0.1:${port}`;
  const playwright = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : "playwright");
  const axePath = process.env.AXE_CORE_PATH ?? require.resolve("axe-core/axe.min.js");
  execFileSync("npm", ["run", "build"], { cwd: repoRoot, env: process.env, stdio: "inherit" });
  requireStableSurface(before, computePublicSurfaceFingerprint(repoRoot));
  const server = spawn(process.execPath, ["apps/www/.next/standalone/apps/www/server.js"], {
    cwd: repoRoot, env: { ...process.env, HOSTNAME: "127.0.0.1", PORT: port }, stdio: ["ignore", "pipe", "pipe"]
  });
  let serverOutput = "";
  server.stdout.on("data", (data) => { serverOutput += data; });
  server.stderr.on("data", (data) => { serverOutput += data; });
  let browser;
  const rows = [], occurrences = [], diagnostics = [];
  try {
    for (let attempt = 0; attempt < 120; attempt++) {
      if (server.exitCode !== null) throw new Error(`Fresh QA server exited: ${serverOutput}`);
      if (serverOutput.includes("Ready in")) break;
      await new Promise((resolve) => setTimeout(resolve, 250));
      if (attempt === 119) throw new Error("Fresh QA server did not become ready");
    }
    browser = await playwright.chromium.launch({ headless: true, ...(process.env.CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH } : {}) });
    for (const viewport of canonicalAccessibilityViewports) {
      for (const route of canonicalAccessibilityRoutes) {
        const page = await browser.newPage({ viewport: { width: viewport, height: 900 } });
        const requestRecorder = createRequestFailureRecorder(page, baseUrl);
        page.on("pageerror", (error) => diagnostics.push({ viewport, route, type: "pageerror", message: error.message }));
        page.on("console", (message) => { if (["warning", "error"].includes(message.type())) diagnostics.push({ viewport, route, type: message.type(), message: message.text() }); });
        const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
        const initial = await page.evaluate(() => ({ lazyImagesObserved: [...document.images].filter((image) => image.loading === "lazy").length,
          unloadedImagesBeforeScroll: [...document.images].filter((image) => !image.complete).length }));
        await loadAllImages(page);
        await page.addScriptTag({ path: axePath });
        const axe = await page.evaluate(async () => ({ version: window.axe.version, result: await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } }) }));
        const observed = await measurements(page);
        rows.push({ viewport, path: route, httpStatus: response.status(), axeVersion: axe.version,
          violations: axe.result.violations.map((violation) => ({ id: violation.id, impact: violation.impact, nodeCount: violation.nodes.length, targets: violation.nodes.map((node) => node.target) })),
          ...observed, ...initial, ...requestRecorder.stop() });
        if (route === "/") occurrences.push(await captionOccurrence(page, viewport));
        process.stdout.write(`Observed ${viewport} ${route}: ${axe.result.violations.length} axe violations\n`);
        await page.close();
      }
    }
    const visualRoutes = [];
    for (const route of ["/", "/about"]) {
      const captures = [];
      let title, h1Count;
      for (const width of [1280, 375]) {
        const height = route === "/about" && width === 375 ? 1200 : width === 375 ? 812 : 900;
        const page = await browser.newPage({ viewport: { width, height } });
        const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
        await loadAllImages(page);
        title = await page.title(); h1Count = await page.locator("h1").count();
        if (route === "/about") await page.getByRole("heading", { name: "Systems people can inhabit" }).scrollIntoViewIfNeeded();
        const file = route === "/" ? width === 1280 ? "candidate-home-desktop.png" : "candidate-home-viewport.png" : width === 1280 ? "professor-lenses-about-desktop.png" : "professor-lenses-about-mobile.png";
        const bytes = await publication.captureScreenshot(page, file);
        captures.push({ route, name: width === 1280 ? "desktop" : "mobile", requestedViewport: { width, height }, pixelWidth: width, pixelHeight: height,
          httpStatus: response.status(), sha256: sha256(bytes), file });
        await page.close();
      }
      visualRoutes.push({ path: route, title, h1Count, screenshots: captures });
    }
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const response = await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    const link = page.locator('a[href="/about"]').filter({ visible: true }).first();
    const linkVisible = await link.isVisible(), linkText = await link.innerText();
    await link.click(); await page.waitForURL(`${baseUrl}/about`); await loadAllImages(page);
    const navigationBytes = await page.screenshot({ fullPage: true });
    const navigationReview = { startRoute: "/", destinationRoute: "/about", startHttpStatus: response.status(), selector: 'a[href="/about"]', linkVisible, linkText,
      navigationCompleted: new URL(page.url()).pathname === "/about", destinationH1: await page.locator("h1").innerText(), destinationMainPresent: await page.locator("main").count() === 1,
      viewport: { width: 1280, height: 900 }, renderedScreenshot: { sha256: sha256(navigationBytes), byteLength: navigationBytes.length, width: 1280, fullPage: true, retainedInPublicGit: false,
        reviewBoundary: "Fresh browser capture represented in Git by its hash; automated navigation/DOM observations are not human visual approval." } };
    navigationReview.pass = response.status() === 200 && linkVisible && navigationReview.navigationCompleted && navigationReview.destinationH1 === "About" && navigationReview.destinationMainPresent;
    await page.close();
    const interaction = await captureInteractions(browser, baseUrl);
    requireStableSurface(before, computePublicSurfaceFingerprint(repoRoot));
    const common = { checkedAt: new Date().toISOString(), baseUrl, publicSurfaceFingerprint: before.fingerprint, publicSurfaceFingerprintPolicy: before.policy, publicSurfaceFileCount: before.fileCount };
    const focusedVisualReview = { route: "/", expectedCaption: "At the East River beneath the Manhattan Bridge, 2022.", expectedCredit: "Photograph by Elana Gordon. From Jamie Burkart's photo archive.",
      minimumCaptionFontSizePx: 12.48, occurrences, passed: occurrences.every((item) => item.captionPresent && item.captionPartCount === 2 && item.captionAndCreditSeparated && item.computedFontSizePx >= 12.48 && item.captionWithinViewport && !item.captionOverlapsPrimaryCopy) };
    const matrix = { reportVersion: 1, ...common, routes: canonicalAccessibilityRoutes, viewports: canonicalAccessibilityViewports, rows,
      summary: summarizeRows(rows), focusedVisualReview, navigationReview: { checkedAt: common.checkedAt, ...navigationReview }, browserDiagnostics: diagnostics,
      requestObservationPolicy: "Observe requests until row measurement completes, then detach before page-close. Only same-origin fetches with observed rsc=1 and next-router-prefetch=1 headers, an _rsc query, and net::ERR_ABORTED are retained separately as canceledPrefetchRequests. Every other failed request remains gating.",
      canceledPrefetchRequestCount: rows.reduce((count, row) => count + row.canceledPrefetchRequests.length, 0) };
    const matrixPassed = validateResponsiveAccessibilityEvidence(repoRoot, matrix).passed;
    const visual = { reportVersion: 6, ...common, captureMethod: "Fresh Playwright Chromium viewport captures after rebuilding the current production app; paired with all 60 route-width observations. No prior screenshot or observation was rebound.",
      routes: visualRoutes, browserDiagnostics: diagnostics, passed: matrixPassed && diagnostics.length === 0,
      verification: "Automated capture and DOM checks only. Human content approval, human screen-reader review, and browser-zoom review remain separate." };
    publication.publish({
      "responsive-route-matrix.json": matrix,
      "professor-lenses-browser-qa.json": visual,
      "professor-lenses-interaction-qa.json": { ...common, ...interaction }
    });
    console.log(JSON.stringify({ matrixPassed, visualPassed: visual.passed, interactionPassed: interaction.passed, fingerprint: before.fingerprint, summary: matrix.summary }));
    if (!matrixPassed || !visual.passed || !interaction.passed) process.exitCode = 1;
  } catch (error) {
    recordIncompleteCapture(output, before, rows, error);
    throw error;
  } finally {
    await browser?.close();
    server.kill("SIGTERM");
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await captureAccessibilityEvidence();
}
