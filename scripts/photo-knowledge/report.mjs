#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} from "node:fs";
import path from "node:path";

import {
  buildPhotoImpact,
  buildPhotoReports,
  comparePhotoEditions,
  compilePhotoEdition,
  defaultRepoRoot,
  loadPhotoKnowledge
} from "./lib.mjs";
import { compileWiki } from "../knowledge-wiki/lib.mjs";

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
const changeIndex = process.argv.indexOf("--change");
const impactChangeType =
  changeIndex >= 0 ? process.argv[changeIndex + 1] : undefined;
if (section) {
  const report = JSON.parse(
    readFileSync(
      path.join(defaultRepoRoot, "reports/photo-knowledge.json"),
      "utf8"
    )
  );
  const manifest = loadPhotoKnowledge();
  const impact =
    section === "impact"
      ? buildPhotoImpact({
          manifest,
          wiki: compileWiki(),
          photoId: impactPhotoId,
          changeType: impactChangeType
        })
      : null;
  if (section === "impact" && !impact.found) {
    console.error(`Unknown photo: ${impactPhotoId}`);
    process.exit(1);
  }
  if (
    section === "impact" &&
    impactChangeType &&
    !["record-change", "withdrawal"].includes(impactChangeType)
  ) {
    console.error(`Unknown impact change type: ${impactChangeType}`);
    process.exit(1);
  }
  const selectedEdition =
    section === "edition" ? compilePhotoEdition(manifest) : null;
  if (
    section === "edition" &&
    editionId &&
    editionId !== selectedEdition.id
  ) {
    console.error(`Unknown edition: ${editionId}`);
    process.exit(1);
  }
  const value =
    section === "edition"
      ? (() => {
          if (!compareEditionId) {
            return { selected: selectedEdition, comparison: null };
          }
          let comparison;
          if (compareEditionId === selectedEdition.id) {
            comparison = selectedEdition;
          } else {
            const absolute = path.resolve(defaultRepoRoot, compareEditionId);
            const allowedRoot = path.join(
              defaultRepoRoot,
              "docs/knowledge-bank/data/photo-editions"
            );
            if (
              !absolute.startsWith(`${allowedRoot}${path.sep}`) ||
              !existsSync(absolute)
            ) {
              console.error(
                `Unknown comparison edition: ${compareEditionId}. ` +
                "Use the current edition ID or a JSON snapshot under " +
                "docs/knowledge-bank/data/photo-editions/."
              );
              process.exit(1);
            }
            const parsed = JSON.parse(readFileSync(absolute, "utf8"));
            comparison = parsed.edition ?? parsed;
            if (
              typeof comparison.id !== "string" ||
              !Array.isArray(comparison.occurrences)
            ) {
              console.error(`Invalid comparison edition: ${compareEditionId}`);
              process.exit(1);
            }
          }
          return {
            selected: selectedEdition,
            comparison: comparePhotoEditions(selectedEdition, comparison)
          };
        })()
      : section === "impact"
        ? impact
        : report[section];
  if (value === undefined) {
    console.error(`Unknown report section: ${section}`);
    process.exit(1);
  }
  console.log(JSON.stringify(value, null, 2));
  process.exit(0);
}

const outputs = buildPhotoReports({ impactPhotoId, impactChangeType });
for (const [relative, content] of Object.entries(outputs)) {
  const absolute = path.join(defaultRepoRoot, relative);
  mkdirSync(path.dirname(absolute), { recursive: true });
  writeFileSync(absolute, content);
  console.log(`WROTE ${relative}`);
}
