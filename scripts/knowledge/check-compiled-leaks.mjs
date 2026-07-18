#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const roots = [
  "apps/www/.next/server",
  "apps/www/.next/static",
  "apps/www/.next/standalone"
];
const ignoredExtensions = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".pdf", ".woff", ".woff2"]);

function walk(root) {
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && entry.name === "node_modules") return [];
    const target = path.join(root, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

const protectedValues = knowledgeBank.sources
  .map((source) => source.protectedLocatorId)
  .filter(Boolean);
const unsafeText = [
  ["", "Users", ""].join("/"),
  ["", "Volumes", ""].join("/"),
  ["", "private", "tmp", ""].join("/"),
  ["Mobile Documents", "com~apple~CloudDocs"].join("/")
];
const failures = [];
const files = roots.flatMap(walk).filter((file) => !ignoredExtensions.has(path.extname(file).toLowerCase()));
const checkoutRoot = path.resolve(process.cwd());

for (const file of files) {
  // Next.js embeds the build checkout in server manifests and source maps. That
  // compiler provenance is not archive content, so normalize only this exact
  // root before looking for any other local path.
  const content = readFileSync(file, "utf8").replaceAll(checkoutRoot, "<repo-root>");
  for (const value of protectedValues) {
    if (content.includes(value)) failures.push(`${value} appears in ${file}`);
  }
  for (const value of unsafeText) {
    if (content.includes(value)) failures.push(`${value} appears in ${file}`);
  }
}

if (failures.length) {
  console.error("Compiled knowledge leak check failed:");
  failures.slice(0, 50).forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`Compiled knowledge leak check passed across ${files.length} files and ${protectedValues.length} protected locators.`);
