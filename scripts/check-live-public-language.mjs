import { spawn } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import { createServer } from "node:net";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

import { defaultConfigPath, repositoryRoot } from "./check-public-language.mjs";
import { evaluateRenderedMarkup } from "./check-rendered-public-language.mjs";

const defaultBuildRoot = path.join(repositoryRoot, "apps/www/.next");
// These framework error documents are checked by the static HTML gate. Their
// internal URLs are not successful public page requests.
const frameworkPages = new Set(["/_not-found", "/_global-error"]);
const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const hasParameters = (route) => /[\[\]]/.test(route);

function validateRoute(route) {
  if (typeof route !== "string" || !route.startsWith("/") || route.startsWith("//") || /[?#\\]/.test(route)) {
    throw new Error(`Invalid page route in build manifest: ${JSON.stringify(route)}`);
  }
}

export function deriveLiveRouteInventory({ appPathRoutes, prerenderManifest }) {
  if (!isRecord(appPathRoutes) || !isRecord(prerenderManifest?.routes)) {
    throw new Error("Both app-path-routes and prerender manifests are required.");
  }
  const pages = new Set(Object.entries(appPathRoutes)
    .filter(([entry]) => entry.endsWith("/page"))
    .map(([, route]) => route));
  for (const route of pages) validateRoute(route);
  const frameworkRoutes = [...pages].filter((route) => frameworkPages.has(route)).sort();
  const parameterRoutes = [...pages].filter(hasParameters).sort();
  const routes = new Set([...pages].filter((route) => !hasParameters(route) && !frameworkPages.has(route)));
  const generated = new Set();
  for (const [route, entry] of Object.entries(prerenderManifest.routes)) {
    if (!pages.has(entry?.srcRoute) && !pages.has(route)) continue;
    validateRoute(route);
    if (hasParameters(route) || frameworkPages.has(route)) continue;
    routes.add(route);
    if (hasParameters(entry?.srcRoute ?? "")) generated.add(entry.srcRoute);
  }
  const unresolved = parameterRoutes.filter((route) => !generated.has(route));
  if (unresolved.length) {
    throw new Error(`Live-language coverage held: no generated examples for parameter page routes: ${unresolved.join(", ")}`);
  }
  if (!routes.size) throw new Error("No public page routes were discovered in the build manifests.");
  if (routes.has("/work")) {
    routes.add("/work?tag=Civic%20Technology");
    routes.add("/work?tag=not-a-real-tag");
  }
  return { routes: [...routes].sort(), frameworkRoutes, parameterRoutes };
}

export async function evaluateLivePublicLanguage({ baseUrl, routes, config, requestTimeoutMs = 15_000 }) {
  if (!Array.isArray(routes) || routes.length === 0) throw new Error("No routes supplied to the live-language check.");
  const origin = new URL(baseUrl);
  if (!/^https?:$/.test(origin.protocol) || origin.username || origin.password || origin.pathname !== "/" || origin.search || origin.hash) {
    throw new Error("--base-url must be an HTTP(S) origin without credentials, a path, query or fragment.");
  }
  const findings = [];
  for (const route of routes) {
    const url = new URL(route, origin);
    if (!route.startsWith("/") || url.origin !== origin.origin) throw new Error(`Invalid live route: ${route}`);
    let response;
    let html;
    try {
      response = await fetch(url, {
        redirect: "manual",
        headers: { accept: "text/html" },
        signal: AbortSignal.timeout(requestTimeoutMs)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (!/^text\/html(?:;|$)/i.test(response.headers.get("content-type") ?? "")) {
        throw new Error(`Expected HTML, received ${response.headers.get("content-type") ?? "no content type"}`);
      }
      html = await response.text();
      if (!html.trim() || !/<[a-z][a-z0-9:-]*(?:\s|>)/i.test(html)) throw new Error("Empty or invalid HTML response");
    } catch (error) {
      await response?.body?.cancel().catch(() => {});
      throw new Error(`Live-language request failed for ${route}: ${error.message}`, { cause: error });
    }
    findings.push(...evaluateRenderedMarkup({ config, html, relativePath: route }));
  }
  return { findings, checkedRoutes: routes.length, routes };
}

async function reserveLocalPort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const port = server.address().port;
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  return port;
}

export async function withStandaloneServer({ buildRoot = defaultBuildRoot, startupTimeoutMs = 20_000 }, inspect) {
  const candidates = ["standalone/apps/www/server.js", "standalone/server.js"];
  let entry;
  for (const candidate of candidates) {
    const filename = path.join(buildRoot, candidate);
    try { await access(filename); entry = filename; break; } catch { /* Try the other supported layout. */ }
  }
  if (!entry) throw new Error(`No production standalone server in ${buildRoot}; build the app first.`);
  const port = await reserveLocalPort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, [entry], {
    cwd: path.dirname(entry),
    env: { ...process.env, NODE_ENV: "production", HOSTNAME: "127.0.0.1", PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"]
  });
  let log = "";
  let spawnError;
  let closed = false;
  const exited = new Promise((resolve) => child.once("close", () => { closed = true; resolve(); }));
  child.once("error", (error) => { spawnError = error; });
  const capture = (chunk) => { log = (log + chunk).slice(-6_000); };
  child.stdout.on("data", capture);
  child.stderr.on("data", capture);
  let stopping;
  const stop = () => stopping ??= (async () => {
    if (closed) return;
    child.kill("SIGTERM");
    await Promise.race([exited, delay(2_000, undefined, { ref: false })]);
    if (!closed) { child.kill("SIGKILL"); await exited; }
  })();
  const exitHandler = () => { if (!closed) child.kill("SIGKILL"); };
  const signalHandlers = new Map(["SIGINT", "SIGTERM"].map((signal) => [signal, () => {
    void stop().finally(() => {
      process.removeListener(signal, signalHandlers.get(signal));
      process.kill(process.pid, signal);
    });
  }]));
  process.once("exit", exitHandler);
  for (const [signal, handler] of signalHandlers) process.once(signal, handler);
  try {
    const deadline = Date.now() + startupTimeoutMs;
    let ready = false;
    while (Date.now() < deadline) {
      if (spawnError || child.exitCode !== null || child.signalCode !== null) {
        throw new Error(`Standalone startup failed: ${spawnError?.message ?? log.trim() ?? "server exited"}`);
      }
      try {
        const response = await fetch(baseUrl, { redirect: "manual", signal: AbortSignal.timeout(500) });
        await response.body?.cancel();
        ready = true;
        break;
      } catch { await delay(100); }
    }
    if (!ready) throw new Error(`Standalone startup timed out after ${startupTimeoutMs}ms. ${log.trim()}`);
    return await inspect(baseUrl);
  } finally {
    await stop();
    process.removeListener("exit", exitHandler);
    for (const [signal, handler] of signalHandlers) process.removeListener(signal, handler);
  }
}

export async function checkLivePublicLanguage({ buildRoot = defaultBuildRoot, configPath = defaultConfigPath, baseUrl } = {}) {
  const [appPathRoutes, prerenderManifest, config] = await Promise.all([
    "app-path-routes-manifest.json", "prerender-manifest.json", configPath
  ].map(async (filename, index) => JSON.parse(await readFile(index === 2 ? filename : path.join(buildRoot, filename), "utf8"))));
  const inventory = deriveLiveRouteInventory({ appPathRoutes, prerenderManifest });
  const inspect = async (url) => ({
    ...await evaluateLivePublicLanguage({ baseUrl: url, routes: inventory.routes, config }),
    frameworkRoutes: inventory.frameworkRoutes,
    parameterRoutes: inventory.parameterRoutes
  });
  return baseUrl ? inspect(baseUrl) : withStandaloneServer({ buildRoot }, inspect);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 2 || args[0] !== "--base-url")) {
    throw new Error("Usage: node scripts/check-live-public-language.mjs [--base-url https://staging.example.com]");
  }
  const result = await checkLivePublicLanguage({ baseUrl: args[1] });
  if (result.findings.length) {
    console.error(`Live public-language eval failed with ${result.findings.length} prohibited occurrence(s):`);
    for (const finding of result.findings) console.error(`- ${finding.path} [${finding.term}] ${finding.excerpt}`);
    process.exitCode = 1;
  } else {
    console.log(`Live public-language eval passed: ${result.checkedRoutes} page requests, including dynamic routes and filter states.`);
  }
  console.log(`Checked routes: ${result.routes.join(", ")}`);
  if (result.frameworkRoutes.length) console.log(`Framework error documents covered by static HTML gate: ${result.frameworkRoutes.join(", ")}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
