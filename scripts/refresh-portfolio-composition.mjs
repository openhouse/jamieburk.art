import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checker = path.join(repoRoot, "scripts/check-portfolio-system-blind-spots.mjs");

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function writeJson(relativePath, value) {
  writeFileSync(path.join(repoRoot, relativePath), `${JSON.stringify(value, null, 2)}\n`);
}

function checkerOutput(argument) {
  return execFileSync(process.execPath, [checker, argument], {
    cwd: repoRoot,
    encoding: "utf8"
  }).trim();
}

const inventory = JSON.parse(checkerOutput("--print-composition-inventory"));
const workCompositions = JSON.parse(checkerOutput("--print-work-compositions"));
const workCompositionByPath = new Map(
  workCompositions.map((item) => [`/work/${item.slug}`, item])
);
const publicSurfaceSha256 = checkerOutput("--print-reader-surface-digest");
const compositionPath = "evals/portfolio-system-blind-spots/composition-manifest.json";
const composition = readJson(compositionPath);

composition.publicSurfaceSha256 = publicSurfaceSha256;
for (const page of composition.pages) {
  if (page.path === "/work/[slug]") {
    for (const concrete of page.concretePages) {
      const keys = inventory[concrete.path];
      if (!keys) throw new Error(`No derived composition inventory for ${concrete.path}`);
      const derived = workCompositionByPath.get(concrete.path);
      if (!derived) throw new Error(`No derived work composition for ${concrete.path}`);
      concrete.artifactCount = derived.artifactCount;
      concrete.metadataClaimUnits = derived.metadataClaimUnits;
      concrete.mdxClaimUnits = derived.mdxClaimUnits;
      concrete.currentClaimCount = derived.currentClaimCount;
      concrete.countedClaimKeys = derived.countedClaimKeys;
    }
    continue;
  }
  const keys = inventory[page.path];
  if (!keys) throw new Error(`No derived composition inventory for ${page.path}`);
  page.currentClaimCount = keys.length;
  page.countedClaimKeys = keys;
}
writeJson(compositionPath, composition);

const mosaicPath = "evals/portfolio-system-blind-spots/mosaic-review-2026-07-15.json";
const mosaic = readJson(mosaicPath);
mosaic.publicSurfaceSha256 = publicSurfaceSha256;
writeJson(mosaicPath, mosaic);

const controlsPath = "evals/portfolio-system-blind-spots/control-state.json";
const controls = readJson(controlsPath);
controls.readerStudyProtocol.frozenSurfaceDigest = publicSurfaceSha256;
writeJson(controlsPath, controls);

console.log(`Refreshed semantic composition receipts for ${Object.keys(inventory).length} routes.`);
console.log(`Public surface: ${publicSurfaceSha256}`);
