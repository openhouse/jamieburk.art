#!/usr/bin/env node

import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import {
  buildPhotoReports,
  defaultRepoRoot
} from "./lib.mjs";

const sectionIndex = process.argv.indexOf("--section");
const section = sectionIndex >= 0 ? process.argv[sectionIndex + 1] : null;
const photoIndex = process.argv.indexOf("--photo");
const impactPhotoId =
  photoIndex >= 0 ? process.argv[photoIndex + 1] : undefined;
const editionIndex = process.argv.indexOf("--edition");
const editionId =
  editionIndex >= 0 ? process.argv[editionIndex + 1] : undefined;
const compareIndex = process.argv.indexOf("--compare");
const compareEditionId =
  compareIndex >= 0 ? process.argv[compareIndex + 1] : undefined;
const outputs = buildPhotoReports({ impactPhotoId });

if (section) {
  const report = JSON.parse(outputs["reports/photo-knowledge.json"]);
  if (section === "impact" && !report.impact.found) {
    console.error(`Unknown photo: ${impactPhotoId}`);
    process.exit(1);
  }
  if (section === "edition" && editionId && editionId !== report.edition.id) {
    console.error(`Unknown edition: ${editionId}`);
    process.exit(1);
  }
  const value =
    section === "edition"
      ? {
          selected: report.edition,
          comparison: compareEditionId
            ? {
                id: compareEditionId,
                found: compareEditionId === report.edition.id,
                added: [],
                removed: [],
                changed: [],
                automaticSelection: false
              }
            : null
        }
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
