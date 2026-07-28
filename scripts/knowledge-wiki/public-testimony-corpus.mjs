#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const testimonyDir = path.join(root, "docs/knowledge-bank/sources/testimony");
const indexPath = path.join(root, "docs/knowledge-bank/indexes/public-testimony.md");

export const expectedRecords = [
  ["jamie-cabaret-law-2017-06-19.md", "4DB6965B-EC69-4863-B461-DF449A04AE9F", "200-202"],
  ["jamie-cabaret-law-2017-09-14.md", "6DBE5276-1842-4693-843F-18667D2D6EBC", "71-74"],
  ["jamie-sbjsa-2018-10-22.md", "3BAD981A-69D8-4D99-A882-52442F36F5A2", "346-348"],
  ["jamie-march-2019-02-11.md", "2582E680-452D-46B1-8DE1-C5C5168F5D63", "91-93"],
  ["jamie-small-business-open-data-2019-03-18.md", "A217E78A-034D-4EE7-ACF4-F4A8DC1F9B16", "142-144"],
];

export function validateTestimonyCorpus() {
  const failures = [];
  const index = fs.readFileSync(indexPath, "utf8");

  for (const [filename, guid, pages] of expectedRecords) {
    const filepath = path.join(testimonyDir, filename);
    if (!fs.existsSync(filepath)) {
      failures.push(`${filename}: missing`);
      continue;
    }

    const source = fs.readFileSync(filepath, "utf8");
    const words = source
      .split("## Full official reading copy")[1]
      ?.split("## Evidentiary boundary")[0]
      ?.trim()
      .split(/\s+/).length ?? 0;

    if (!source.includes(`GUID=${guid}`)) failures.push(`${filename}: official transcript GUID missing`);
    if (!source.includes(`source_pages: ${pages}`)) failures.push(`${filename}: source page range missing`);
    if (!source.includes("public_use_status: source-backed-unselected")) failures.push(`${filename}: use state missing`);
    if (!source.includes("projection:\n  status: hold")) failures.push(`${filename}: projection hold missing`);
    if (words < 100) failures.push(`${filename}: reading copy is unexpectedly short (${words} words)`);
    if (!index.includes(filename)) failures.push(`${filename}: absent from public-testimony index`);
    if (/\/(Users|Volumes|private)\//.test(source)) failures.push(`${filename}: contains a local absolute path`);
  }

  if (!index.includes("bounded completeness statement")) {
    failures.push("index: bounded completeness language missing");
  }
  if (!index.includes("collective statements")) {
    failures.push("index: collective-credit boundary missing");
  }

  return failures;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const failures = validateTestimonyCorpus();
  if (failures.length) {
    console.error("Public testimony corpus FAIL");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log(`Public testimony corpus PASS: ${expectedRecords.length} governed personal records.`);
}
