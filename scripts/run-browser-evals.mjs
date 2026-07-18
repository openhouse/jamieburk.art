#!/usr/bin/env node
import { createHash } from "node:crypto";
import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadLaunchEvalSuite } from "./lib/launch-evals.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const suite = loadLaunchEvalSuite();
const candidateCommit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: repoRoot, encoding: "utf8" }).trim();
const expectedOrigin = "https://staging.jamieburk.art";
const chromePath = process.env.CHROME_BIN ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outputPath = path.join(repoRoot, "reports/generated/browser-evals.json");

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");

async function availablePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });
}

async function waitForServer(baseUrl, processState) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (processState.exited) throw new Error(`Staging server exited before readiness:\n${processState.output}`);
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return response.json();
    } catch {}
    await sleep(250);
  }
  throw new Error(`Timed out waiting for staging server:\n${processState.output}`);
}

async function launchChrome() {
  const profile = mkdtempSync(path.join(tmpdir(), "jamieburk-browser-evals-"));
  const processState = { output: "", exited: false };
  const child = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--disable-extensions",
    "--no-first-run",
    "--remote-allow-origins=*",
    "--remote-debugging-port=0",
    `--user-data-dir=${profile}`,
    "about:blank"
  ], { detached: true, stdio: ["ignore", "pipe", "pipe"] });
  let resolveWebSocket;
  let rejectWebSocket;
  const websocketUrl = new Promise((resolve, reject) => {
    resolveWebSocket = resolve;
    rejectWebSocket = reject;
  });
  const capture = (chunk) => {
    const text = chunk.toString();
    processState.output += text;
    const match = processState.output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
    if (match) resolveWebSocket(match[1]);
  };
  child.stdout.on("data", capture);
  child.stderr.on("data", capture);
  child.once("exit", (code) => {
    processState.exited = true;
    rejectWebSocket(new Error(`Chrome exited ${code}:\n${processState.output}`));
  });
  return {
    child,
    profile,
    websocketUrl: await Promise.race([
      websocketUrl,
      sleep(15_000).then(() => { throw new Error(`Timed out starting Chrome:\n${processState.output}`); })
    ])
  };
}

class CdpClient {
  constructor(url) {
    this.nextId = 1;
    this.pending = new Map();
    this.waiters = new Map();
    this.listeners = new Map();
    this.socket = new WebSocket(url);
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
        else pending.resolve(message.result);
        return;
      }
      const key = `${message.sessionId ?? "root"}:${message.method}`;
      for (const waiter of this.waiters.get(key) ?? []) waiter(message.params);
      this.waiters.delete(key);
      for (const listener of this.listeners.get(key) ?? []) listener(message.params);
    });
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, method });
      this.socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }

  waitFor(method, sessionId, timeoutMs = 15_000) {
    const key = `${sessionId ?? "root"}:${method}`;
    return Promise.race([
      new Promise((resolve) => this.waiters.set(key, [...(this.waiters.get(key) ?? []), resolve])),
      sleep(timeoutMs).then(() => { throw new Error(`Timed out waiting for ${method}`); })
    ]);
  }

  on(method, sessionId, listener) {
    const key = `${sessionId ?? "root"}:${method}`;
    this.listeners.set(key, [...(this.listeners.get(key) ?? []), listener]);
  }

  close() {
    this.socket.close();
  }
}

async function evaluate(client, sessionId, expression) {
  const result = await client.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }, sessionId);
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text ?? "Browser evaluation failed");
  return result.result.value;
}

async function main() {
  const port = await availablePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const serverState = { output: "", exited: false };
  const server = spawn("npm", ["run", "start", "-w", "@jamie-burkart/www"], {
    cwd: repoRoot,
    env: {
      ...process.env,
      PORT: String(port),
      HOSTNAME: "127.0.0.1",
      APP_ENV: "staging",
      SITE_ENV: "staging",
      NEXT_PUBLIC_DEPLOY_ENV: "staging",
      SITE_URL: expectedOrigin,
      NEXT_PUBLIC_SITE_URL: expectedOrigin,
      NEXT_PUBLIC_ROBOTS_POLICY: "noindex"
    },
    detached: true,
    stdio: ["ignore", "pipe", "pipe"]
  });
  const captureServer = (chunk) => { serverState.output += chunk.toString(); };
  server.stdout.on("data", captureServer);
  server.stderr.on("data", captureServer);
  server.once("exit", () => { serverState.exited = true; });

  let chrome;
  let client;
  try {
    const health = await waitForServer(baseUrl, serverState);
    if (health.appEnv !== "staging" || health.robotsIndexable !== false) throw new Error(`Browser eval requires a staging, nonindexable build: ${JSON.stringify(health)}`);

    chrome = await launchChrome();
    client = new CdpClient(chrome.websocketUrl);
    await client.connect();
    const { targetId } = await client.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await client.send("Target.attachToTarget", { targetId, flatten: true });
    await client.send("Page.enable", {}, sessionId);
    await client.send("Runtime.enable", {}, sessionId);
    await client.send("Log.enable", {}, sessionId);

    const browserErrors = [];
    client.on("Runtime.exceptionThrown", sessionId, (params) => browserErrors.push({ method: "Runtime.exceptionThrown", params }));
    client.on("Log.entryAdded", sessionId, (params) => browserErrors.push({ method: "Log.entryAdded", params }));

    const navigate = async (route, [width, height]) => {
      browserErrors.length = 0;
      await client.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 768 }, sessionId);
      const loaded = client.waitFor("Page.loadEventFired", sessionId);
      await client.send("Page.navigate", { url: `${baseUrl}${route}` }, sessionId);
      await loaded;
      await sleep(100);
      const response = await fetch(`${baseUrl}${route}`, { redirect: "manual" });
      const evidence = await evaluate(client, sessionId, `(() => {
        const h1s = [...document.querySelectorAll('h1')];
        const h1 = h1s[0];
        const canonical = document.querySelector('link[rel="canonical"]')?.href ?? null;
        const robots = document.querySelector('meta[name="robots"]')?.content ?? null;
        return {
          h1Count: h1s.length,
          overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          h1Overflow: h1 ? h1.scrollWidth > h1.clientWidth + 2 || h1.scrollHeight > h1.clientHeight + 4 : true,
          h1Metrics: h1 ? { scrollWidth: h1.scrollWidth, clientWidth: h1.clientWidth, scrollHeight: h1.scrollHeight, clientHeight: h1.clientHeight } : null,
          canonical,
          robots,
          title: document.title
        };
      })()`);
      const consoleErrors = browserErrors.filter(({ method, params }) => method === "Runtime.exceptionThrown" || params?.entry?.level === "error");
      const expectedCanonical = `${expectedOrigin}${route === "/" ? "/" : route}`;
      const passed = response.status === 200 && evidence.h1Count === 1 && !evidence.overflow && !evidence.h1Overflow && evidence.canonical === expectedCanonical && /noindex/.test(evidence.robots ?? "") && /noindex/.test(response.headers.get("x-robots-tag") ?? "") && consoleErrors.length === 0;
      return { route, width, height, status: response.status, expectedCanonical, ...evidence, consoleErrorCount: consoleErrors.length, passed };
    };

    const responsiveCase = suite.runtimeCases.find((item) => item.id === "LR-RUNTIME-RESPONSIVE");
    const responsive = [];
    const responsiveRoutes = process.env.BROWSER_EVAL_DEBUG_ROUTE ? [process.env.BROWSER_EVAL_DEBUG_ROUTE] : responsiveCase.routes;
    const responsiveViewports = process.env.BROWSER_EVAL_DEBUG_ROUTE ? [responsiveCase.viewports[0]] : responsiveCase.viewports;
    for (const route of responsiveRoutes) for (const viewport of responsiveViewports) responsive.push(await navigate(route, viewport));

    const keyboardCase = suite.runtimeCases.find((item) => item.id === "LR-RUNTIME-KEYBOARD");
    const keyboard = [];
    for (const route of process.env.BROWSER_EVAL_DEBUG_ROUTE ? [] : keyboardCase.routes) for (const viewport of keyboardCase.viewports) {
      await navigate(route, viewport);
      await evaluate(client, sessionId, "document.activeElement?.blur(); document.body.focus(); true");
      await client.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 }, sessionId);
      await client.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 }, sessionId);
      const focus = await evaluate(client, sessionId, `(() => {
        const active = document.activeElement;
        const style = getComputedStyle(active);
        return {
          tag: active?.tagName ?? null,
          href: active?.getAttribute('href') ?? null,
          text: active?.textContent?.trim() ?? null,
          mainExists: Boolean(document.querySelector('#main')),
          visibleFocus: style.outlineStyle !== 'none' && style.outlineWidth !== '0px'
        };
      })()`);
      keyboard.push({ route, width: viewport[0], height: viewport[1], ...focus, passed: focus.tag === "A" && focus.href === "#main" && focus.mainExists && focus.visibleFocus });
    }

    const citationCase = suite.runtimeCases.find((item) => item.id === "LR-RUNTIME-CITATIONS");
    const citations = [];
    for (const route of process.env.BROWSER_EVAL_DEBUG_ROUTE ? [] : citationCase.routes) for (const viewport of citationCase.viewports) {
      await navigate(route, viewport);
      const semantics = await evaluate(client, sessionId, `(() => {
        const refs = [...document.querySelectorAll('a[role="doc-noteref"]')];
        const endnotes = [...document.querySelectorAll('section[role="doc-endnotes"]')];
        const notes = [...document.querySelectorAll('section[role="doc-endnotes"] ol > li')];
        const backlinks = [...document.querySelectorAll('a[role="doc-backlink"]')];
        const ids = [...document.querySelectorAll('[id]')].map((item) => item.id);
        return {
          referenceCount: refs.length,
          endnotesCount: endnotes.length,
          noteCount: notes.length,
          backlinkCount: backlinks.length,
          uniqueIds: ids.length === new Set(ids).size,
          labelsPresent: refs.every((ref) => Boolean(ref.getAttribute('aria-label'))),
          targetsExist: refs.every((ref) => document.querySelector(ref.getAttribute('href'))),
          backlinkTargetsExist: backlinks.every((link) => document.querySelector(link.getAttribute('href'))),
          firstRef: refs[0]?.getAttribute('href') ?? null,
          firstBacklink: backlinks[0]?.getAttribute('href') ?? null
        };
      })()`);
      let navigationPassed = false;
      if (semantics.firstRef && semantics.firstBacklink) {
        await evaluate(client, sessionId, `document.querySelector(${JSON.stringify(`a[href="${semantics.firstRef}"]`)})?.click(); true`);
        const refHash = await evaluate(client, sessionId, "location.hash");
        await evaluate(client, sessionId, `document.querySelector(${JSON.stringify(`a[href="${semantics.firstBacklink}"]`)})?.click(); true`);
        const backlinkHash = await evaluate(client, sessionId, "location.hash");
        navigationPassed = refHash === semantics.firstRef && backlinkHash === semantics.firstBacklink;
      }
      citations.push({ route, width: viewport[0], height: viewport[1], ...semantics, navigationPassed, passed: semantics.referenceCount > 0 && semantics.endnotesCount === 1 && semantics.noteCount > 0 && semantics.backlinkCount >= semantics.noteCount && semantics.uniqueIds && semantics.labelsPresent && semantics.targetsExist && semantics.backlinkTargetsExist && navigationPassed });
    }

    const report = {
      schemaVersion: "1.0.0",
      candidateCommit,
      environment: "staging",
      performedAt: new Date().toISOString(),
      method: "Local Node runner, Next.js standalone staging server, and headless Chrome DevTools Protocol with real navigation and keyboard events.",
      runtimeCaseIds: [responsiveCase.id, keyboardCase.id, citationCase.id],
      responsive,
      keyboard,
      citations,
      passed: responsive.every((item) => item.passed) && keyboard.every((item) => item.passed) && citations.every((item) => item.passed),
      limitations: [
        "This is a local browser gate for pull-request review, not post-deployment production smoke.",
        "Human screen-reader and real-reader sessions remain external gates."
      ]
    };
    mkdirSync(path.dirname(outputPath), { recursive: true });
    const content = `${JSON.stringify(report, null, 2)}\n`;
    writeFileSync(outputPath, content);
    console.log(`Browser eval ${report.passed ? "passed" : "failed"}: ${responsive.length} responsive cases, ${keyboard.length} keyboard cases, ${citations.length} citation cases.`);
    console.log(`Report: ${path.relative(repoRoot, outputPath)} (${sha256(content)})`);
    if (!report.passed) process.exitCode = 1;
  } finally {
    client?.close();
    if (chrome?.child && !chrome.child.killed) {
      try { process.kill(-chrome.child.pid, "SIGTERM"); } catch { chrome.child.kill("SIGTERM"); }
      await Promise.race([new Promise((resolve) => chrome.child.once("exit", resolve)), sleep(2_000)]);
    }
    if (chrome?.profile) rmSync(chrome.profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    if (!server.killed) {
      try { process.kill(-server.pid, "SIGTERM"); } catch { server.kill("SIGTERM"); }
      await Promise.race([new Promise((resolve) => server.once("exit", resolve)), sleep(2_000)]);
    }
  }
}

await main();
