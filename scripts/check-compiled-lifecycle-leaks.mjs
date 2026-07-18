#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { knowledgeLifecycle } from "../apps/www/src/data/knowledge-bank/lifecycle-records.ts";

const appBarrel = readFileSync("apps/www/src/data/knowledge-bank/index.ts", "utf8");
const failures = [];
if (/lifecycle-(?:records|schema)/.test(appBarrel)) failures.push("Application knowledge-bank barrel exports offline lifecycle data");

const protectedLocators = [
  ...knowledgeLifecycle.leads.map(({ protectedLocatorId }) => protectedLocatorId),
  ...knowledgeLifecycle.mediaLeads.map(({ protectedLocatorId }) => protectedLocatorId)
].filter(Boolean);

function filesUnder(root) {
  if (!existsSync(root)) return [];
  const files = [];
  for (const entry of readdirSync(root)) {
    const target = path.join(root, entry);
    if (statSync(target).isDirectory()) files.push(...filesUnder(target));
    else files.push(target);
  }
  return files;
}

const deployableRoots = [
  "apps/www/.next/server",
  "apps/www/.next/static",
  "apps/www/.next/standalone"
];
for (const file of deployableRoots.flatMap(filesUnder)) {
  const content = readFileSync(file);
  for (const locator of protectedLocators) if (content.includes(Buffer.from(locator))) failures.push(`${locator} leaked into compiled output ${file}`);
}

if (failures.length) {
  console.error("Compiled lifecycle leak check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log(`Compiled lifecycle leak check passed for ${protectedLocators.length} protected locators.`);
