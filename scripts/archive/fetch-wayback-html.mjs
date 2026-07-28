import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

function parseArgs(argv) {
  const args = { concurrency: 6 };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--cdx") args.cdx = argv[++index];
    else if (value === "--output") args.output = argv[++index];
    else if (value === "--concurrency") args.concurrency = Number(argv[++index]);
    else throw new Error(`Unknown argument: ${value}`);
  }
  if (!args.cdx || !args.output) {
    throw new Error("Usage: node scripts/archive/fetch-wayback-html.mjs --cdx FILE --output DIR");
  }
  return args;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function fetchWithRetry(url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "Jamie-Burkart-Knowledge-Wiki/1.0 archival research" }
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, attempt * 500));
    }
  }
  throw lastError;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cdx = JSON.parse(await readFile(args.cdx, "utf8"));
  const headers = cdx[0];
  const rows = cdx.slice(1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index]])));
  await mkdir(args.output, { recursive: true, mode: 0o700 });

  const results = new Array(rows.length);
  let cursor = 0;
  async function worker() {
    while (cursor < rows.length) {
      const index = cursor++;
      const row = rows[index];
      const key = sha256(`${row.timestamp}\n${row.original}`);
      const archiveUrl = `https://web.archive.org/web/${row.timestamp}id_/${row.original}`;
      const filename = `${key}.html`;
      try {
        const html = await fetchWithRetry(archiveUrl);
        await writeFile(path.join(args.output, filename), html, { mode: 0o600 });
        results[index] = {
          timestamp: row.timestamp,
          original: row.original,
          digest: row.digest,
          archiveUrl,
          filename,
          sha256: sha256(html),
          status: "recovered"
        };
      } catch (error) {
        results[index] = {
          timestamp: row.timestamp,
          original: row.original,
          digest: row.digest,
          archiveUrl,
          status: "not-recovered",
          error: String(error)
        };
      }
    }
  }

  await Promise.all(Array.from({ length: Math.max(1, args.concurrency) }, () => worker()));
  const manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    sourceCdxSha256: sha256(await readFile(args.cdx)),
    population: results.length,
    recovered: results.filter((result) => result.status === "recovered").length,
    notRecovered: results.filter((result) => result.status !== "recovered").length,
    pages: results
  };
  await writeFile(
    path.join(args.output, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    { mode: 0o600 }
  );
  console.log(JSON.stringify({
    population: manifest.population,
    recovered: manifest.recovered,
    notRecovered: manifest.notRecovered,
    output: args.output
  }));
}

await main();
