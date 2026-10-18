import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:http";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import test from "node:test";

import {
  checkLivePublicLanguage,
  deriveLiveRouteInventory,
  evaluateLivePublicLanguage,
  withStandaloneServer
} from "../check-live-public-language.mjs";

const config = {
  forbiddenStandaloneTerms: ["bounded"],
  forbiddenRenderedPatterns: [
    { id: "editorial-command", pattern: "use\\s+only\\s+public-safe\\s+claims" }
  ]
};

const appPathRoutes = {
  "/page": "/",
  "/work/page": "/work",
  "/work/[slug]/page": "/work/[slug]",
  "/_not-found/page": "/_not-found",
  "/api/health/route": "/api/health",
  "/icon.svg/route": "/icon.svg"
};
const prerenderManifest = {
  routes: {
    "/": { srcRoute: "/" },
    "/work/example": { srcRoute: "/work/[slug]" },
    "/icon.svg": { srcRoute: "/icon.svg" }
  }
};

test("route inventory includes dynamic work index, generated slugs and filter states", () => {
  assert.deepEqual(deriveLiveRouteInventory({ appPathRoutes, prerenderManifest }), {
    routes: ["/", "/work", "/work/example", "/work?tag=Civic%20Technology", "/work?tag=not-a-real-tag"],
    frameworkRoutes: ["/_not-found"],
    parameterRoutes: ["/work/[slug]"]
  });
});

test("a new page is discovered without updating a route allowlist", () => {
  const inventory = deriveLiveRouteInventory({
    appPathRoutes: { ...appPathRoutes, "/new/page": "/new" }, prerenderManifest
  });
  assert.ok(inventory.routes.includes("/new"));
});

test("parameter pages without generated examples hold the check visibly", () => {
  assert.throws(() => deriveLiveRouteInventory({
    appPathRoutes: { ...appPathRoutes, "/journal/[...entry]/page": "/journal/[...entry]" },
    prerenderManifest
  }), /generated.*\/journal\/\[\.\.\.entry\]/i);
});

test("missing or empty manifest inventories cannot produce a pass", () => {
  assert.throws(() => deriveLiveRouteInventory({ appPathRoutes: {}, prerenderManifest: { routes: {} } }), /no.*page routes/i);
  assert.throws(() => deriveLiveRouteInventory({ appPathRoutes, prerenderManifest: {} }), /manifest/i);
});

async function serve(t, handler) {
  const server = createServer(handler);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  t.after(() => new Promise((resolve) => {
    server.closeAllConnections();
    server.close(resolve);
  }));
  return `http://127.0.0.1:${server.address().port}`;
}

test("live requests inspect HTML for every path and query, preserving visitor limitations", async (t) => {
  const visited = [];
  const baseUrl = await serve(t, (request, response) => {
    visited.push(request.url);
    response.setHeader("content-type", "text/html; charset=utf-8");
    response.end(request.url.includes("?tag=")
      ? "<p>Use only <strong>public-safe</strong> claims.</p>"
      : "<p>CallNYC is archived and unofficial. Private records remain private.</p>");
  });
  const routes = ["/", "/work", "/work?tag=Civic%20Technology"];
  const result = await evaluateLivePublicLanguage({ baseUrl, routes, config });
  assert.deepEqual(visited, routes);
  assert.equal(result.checkedRoutes, 3);
  assert.deepEqual(result.findings.map(({ path: route, patternId }) => ({ route, patternId })), [
    { route: "/work?tag=Civic%20Technology", patternId: "editorial-command" }
  ]);
});

for (const [label, status, contentType, body] of [
  ["HTTP failures", 503, "text/html", "<p>Unavailable</p>"],
  ["redirects that hide a missing route", 302, "text/html", "<p>Moved</p>"],
  ["non-HTML responses", 200, "application/json", "{}"],
  ["empty HTML responses", 200, "text/html", ""]
]) {
  test(`live gate rejects ${label}`, async (t) => {
    const baseUrl = await serve(t, (_request, response) => {
      response.writeHead(status, { "content-type": contentType, location: "/" });
      response.end(body);
    });
    await assert.rejects(evaluateLivePublicLanguage({ baseUrl, routes: ["/"], config }), /HTTP|HTML/i);
  });
}

test("live gate rejects no routes and connection failure", async () => {
  await assert.rejects(evaluateLivePublicLanguage({ baseUrl: "http://127.0.0.1:1", routes: [], config }), /no.*routes/i);
  await assert.rejects(evaluateLivePublicLanguage({ baseUrl: "http://127.0.0.1:1", routes: ["/"], config }), /fetch|request|connect/i);
});

test("ordinary HTML documents do not need a paragraph or link to pass", async (t) => {
  const baseUrl = await serve(t, (_request, response) => {
    response.setHeader("content-type", "text/html");
    response.end("<!doctype html><html><body><main>Selected projects</main></body></html>");
  });
  const result = await evaluateLivePublicLanguage({ baseUrl, routes: ["/"], config });
  assert.deepEqual(result.findings, []);
});

test("HTTP request timeout fails instead of leaving an unfinished check", async (t) => {
  const baseUrl = await serve(t, () => {});
  await assert.rejects(evaluateLivePublicLanguage({ baseUrl, routes: ["/"], config, requestTimeoutMs: 30 }), /request failed/i);
});

test("base URL mode uses the build inventory without starting or stopping the external server", async (t) => {
  const buildRoot = await mkdtemp(path.join(tmpdir(), "jb-live-manifests-"));
  t.after(() => rm(buildRoot, { recursive: true, force: true }));
  const configPath = path.join(buildRoot, "language.json");
  await Promise.all([
    writeFile(path.join(buildRoot, "app-path-routes-manifest.json"), JSON.stringify(appPathRoutes)),
    writeFile(path.join(buildRoot, "prerender-manifest.json"), JSON.stringify(prerenderManifest)),
    writeFile(configPath, JSON.stringify(config))
  ]);
  const visited = [];
  const baseUrl = await serve(t, (request, response) => {
    visited.push(request.url);
    response.setHeader("content-type", "text/html");
    response.end("<p>Selected work</p>");
  });
  const result = await checkLivePublicLanguage({ buildRoot, configPath, baseUrl });
  assert.deepEqual(visited, ["/", "/work", "/work/example", "/work?tag=Civic%20Technology", "/work?tag=not-a-real-tag"]);
  assert.equal(result.checkedRoutes, 5);
  assert.deepEqual(result.findings, []);
  assert.equal((await fetch(baseUrl)).status, 200);
});

async function standaloneFixture(t, source) {
  const buildRoot = await mkdtemp(path.join(tmpdir(), "jb-live-language-"));
  t.after(() => rm(buildRoot, { recursive: true, force: true }));
  const directory = path.join(buildRoot, "standalone", "apps", "www");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "server.js"), source);
  return buildRoot;
}

const serverSource = `const { createServer } = require("node:http");
createServer((_request, response) => {
  response.setHeader("content-type", "text/html");
  response.end("<p>" + process.pid + "</p>");
}).listen(Number(process.env.PORT), process.env.HOSTNAME);`;

for (const fail of [false, true]) {
  test(`owned standalone server stops after ${fail ? "inspection failure" : "successful inspection"}`, async (t) => {
    const buildRoot = await standaloneFixture(t, serverSource);
    let baseUrl;
    let pid;
    const task = withStandaloneServer({ buildRoot }, async (url) => {
      baseUrl = url;
      assert.match(url, /^http:\/\/127\.0\.0\.1:\d+$/);
      const body = await (await fetch(url)).text();
      pid = Number(body.match(/\d+/)[0]);
      if (fail) throw new Error("inspection failed");
      return "checked";
    });
    if (fail) await assert.rejects(task, /inspection failed/);
    else assert.equal(await task, "checked");
    assert.throws(() => process.kill(pid, 0), { code: "ESRCH" });
    await assert.rejects(fetch(baseUrl));
  });
}

test("standalone startup failure cannot look like a successful inspection", async (t) => {
  const buildRoot = await standaloneFixture(t, 'throw new Error("fixture startup failed");');
  await assert.rejects(withStandaloneServer({ buildRoot }, () => assert.fail("server never started")), /startup.*fixture startup failed/is);
});

test("startup timeout terminates the child that never became ready", async (t) => {
  const buildRoot = await standaloneFixture(t, 'console.log("child-pid:" + process.pid); setInterval(() => {}, 1000);');
  let failure;
  await assert.rejects(withStandaloneServer({ buildRoot, startupTimeoutMs: 400 }, () => assert.fail("server never started")), (error) => {
    failure = error;
    return /startup timed out/.test(error.message);
  });
  const pid = Number(failure.message.match(/child-pid:(\d+)/)?.[1]);
  assert.ok(pid > 0, "the non-serving child started before the timeout");
  assert.throws(() => process.kill(pid, 0), { code: "ESRCH" });
});

for (const termination of ["signal", "exit"]) {
  test(`the owned server is stopped when the checking process ends by ${termination}`, async (t) => {
    const buildRoot = await standaloneFixture(t, serverSource);
    const moduleUrl = new URL("../check-live-public-language.mjs", import.meta.url).href;
    const source = `import { withStandaloneServer } from ${JSON.stringify(moduleUrl)};
      await withStandaloneServer({ buildRoot: ${JSON.stringify(buildRoot)} }, async (url) => {
        const body = await (await fetch(url)).text();
        console.log("child-pid:" + body.match(/\\d+/)[0]);
        ${termination === "exit" ? "process.exit(0);" : "await new Promise(() => {});"}
      });`;
    const checker = spawn(process.execPath, ["--input-type=module", "-e", source], { stdio: ["ignore", "pipe", "pipe"] });
    t.after(() => { if (checker.exitCode === null && checker.signalCode === null) checker.kill("SIGKILL"); });
    let output = "";
    const closed = once(checker, "close");
    const ready = new Promise((resolve, reject) => {
      checker.stdout.on("data", (chunk) => {
        output += chunk;
        if (/child-pid:\d+/.test(output)) resolve();
      });
      checker.once("error", reject);
      checker.once("close", () => /child-pid:\d+/.test(output) ? resolve() : reject(new Error("Checker exited before child was ready")));
    });
    await Promise.race([ready, delay(5_000, undefined, { ref: false }).then(() => { throw new Error("Checker did not become ready"); })]);
    const pid = Number(output.match(/child-pid:(\d+)/)[1]);
    if (termination === "signal") checker.kill("SIGTERM");
    await closed;
    // Synchronous process exit cannot await child reaping; allow the OS one turn.
    await delay(50);
    assert.throws(() => process.kill(pid, 0), { code: "ESRCH" });
  });
}
