#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const help = `Usage: npm run check:compiled-lifecycle-leaks

Scans redacted public registries, public text assets, and compiled Next.js text
output when present. It rejects protected locators, machine-local paths,
credentials, raw-source markers, and phone-like strings in HTML. PDFs are not
scanned because the approved resume PDF intentionally contains Jamie's phone.
`;

const defaultRoots = [
  "apps/www/src/data/knowledge-bank/public-registry.json",
  "apps/www/public",
  "apps/www/.next/server/app",
  "apps/www/.next/static"
];
const textExtensions = new Set([".html", ".htm", ".js", ".mjs", ".json", ".txt", ".xml", ".css", ".map"]);
function collect(target, files) {
  if (!existsSync(target)) return;
  const stat = statSync(target);
  if (stat.isFile()) {
    const extension = path.extname(target).toLowerCase();
    const isServerImplementation =
      target.includes(`${path.sep}.next${path.sep}server${path.sep}`) &&
      [".js", ".mjs", ".map"].includes(extension);
    if (!isServerImplementation && textExtensions.has(extension) && stat.size <= 15_000_000) files.push(target);
    return;
  }
  for (const entry of readdirSync(target, { withFileTypes: true })) {
    collect(path.join(target, entry.name), files);
  }
}

const forbidden = [
  ["machine-local path", /\/(?:Users|Volumes|private\/tmp)\//i],
  ["protected locator key", /protected(?:Source)?LocatorId/i],
  ["private archive marker", /(?:supporting-materials|Mobile Documents|raw[-_ ]?otter|private transcript|source-captures\/.*(?:browser-extraction|full-population))/i],
  ["credential marker", /(?:-----BEGIN (?:RSA |OPENSSH )?PRIVATE KEY-----|bearer\s+[A-Za-z0-9._~-]{16,}|(?:password|api[_-]?key|client[_-]?secret)["']?\s*[:=]\s*["'][^"']{8,})/i]
];
const phoneLike = /(?:\+?1[ .-]?)?\(?\d{3}\)?[ .-]\d{3}[ .-]\d{4}/;


export function scanCompiledLifecycleLeaks(roots = defaultRoots) {
  const failures = [];
  const files = [];
  roots.forEach((root) => collect(root, files));
  for (const file of files) {
    let content;
    try {
      content = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    for (const [label, pattern] of forbidden) {
      if (pattern.test(content)) failures.push(`${file}: ${label}`);
    }
    if ([".html", ".htm"].includes(path.extname(file).toLowerCase()) && phoneLike.test(content)) {
      failures.push(`${file}: phone-like string in website HTML`);
    }
  }
  return { failures, files };
}

function run() {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(help);
    return;
  }
  const result = scanCompiledLifecycleLeaks();
  if (result.failures.length) {
    console.error("Compiled lifecycle leak check failed:");
    result.failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
  }
  console.log(`Compiled lifecycle leak check passed: ${result.files.length} public or rendered text files scanned.`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) run();
