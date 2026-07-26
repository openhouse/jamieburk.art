#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import {
  buildPhotoReports,
  defaultRepoRoot
} from "./lib.mjs";

const sectionIndex = process.argv.indexOf("--section");
const section = sectionIndex >= 0 ? process.argv[sectionIndex + 1] : null;
const outputs = buildPhotoReports();

if (section) {
  const report = JSON.parse(outputs["reports/photo-knowledge.json"]);
  const value =
    section === "health"
      ? report.evaluation
      : section === "edition"
        ? report.edition
        : section === "usage"
          ? report.placements
          : report[section];
  if (value === undefined) {
    console.error(`Unknown report section: ${section}`);
    process.exit(1);
  }
  console.log(JSON.stringify(value, null, 2));
  process.exit(0);
}

for (const [relative, content] of Object.entries(outputs)) {
  const absolute = path.join(defaultRepoRoot, relative);
  mkdirSync(path.dirname(absolute), { recursive: true });
  writeFileSync(absolute, content);
  console.log(`WROTE ${relative}`);
}
