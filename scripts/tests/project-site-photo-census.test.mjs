import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const censusPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/project-site-photograph-census-2026-07-28.json"
);
const configPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/project-site-photograph-census.config.json"
);

test("the project-site image population has a complete disposition", () => {
  assert.ok(existsSync(censusPath), "run npm run wiki:photos:census first");
  const census = JSON.parse(readFileSync(censusPath, "utf8"));
  assert.equal(census.undispositionedImageUrlPopulation, 0);
  assert.equal(
    census.archivedImageUrlPopulation,
    census.photographUrlPopulation + census.excludedImageUrlPopulation
  );
});

test("every photograph family is a default-held Wiki asset without a private binding", () => {
  const census = JSON.parse(readFileSync(censusPath, "utf8"));
  assert.equal(census.entries.length, census.heldPhotoFamilyPopulation);
  for (const entry of census.entries) {
    assert.equal(entry.publicDisplayStatus, "hold");
    assert.equal(entry.rightsState, "review-needed");
    assert.equal(entry.applePhotosMatchState, "unresolved");
    assert.ok(existsSync(path.join(repoRoot, entry.canonicalPath)), entry.canonicalPath);
    const markdown = readFileSync(path.join(repoRoot, entry.canonicalPath), "utf8");
    assert.doesNotMatch(markdown, /\/Volumes\/|\/Users\/|Photos\.sqlite|ZUUID|PHAsset/i);
  }
});

test("the census is bound to exact checked-in CDX and HTML capture receipts", () => {
  const census = JSON.parse(readFileSync(censusPath, "utf8"));
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  assert.equal(census.inputReceipt.sites.length, config.sites.length);

  for (const site of config.sites) {
    const sourceReceipt = site.captureReceipt;
    const censusReceipt = census.inputReceipt.sites.find((entry) => entry.id === site.id);
    assert.ok(censusReceipt, `missing census receipt for ${site.id}`);
    assert.deepEqual(
      censusReceipt,
      { id: site.id, domain: site.domain, ...sourceReceipt },
      `receipt drift for ${site.id}`
    );

    const imageCdx = JSON.parse(
      readFileSync(path.join(repoRoot, sourceReceipt.imageCdxPath), "utf8")
    );
    const htmlCdx = JSON.parse(
      readFileSync(path.join(repoRoot, sourceReceipt.htmlCdxPath), "utf8")
    );
    const htmlManifest = JSON.parse(
      readFileSync(path.join(repoRoot, sourceReceipt.htmlManifestPath), "utf8")
    );
    assert.equal(imageCdx.length - 1, sourceReceipt.imageRowCount);
    assert.equal(htmlCdx.length - 1, sourceReceipt.htmlPageCount);
    assert.equal(htmlManifest.population, sourceReceipt.htmlPageCount);
    assert.equal(htmlManifest.pages.length, sourceReceipt.htmlPageCount);
    assert.equal(htmlManifest.sourceCdxSha256, sourceReceipt.htmlCdxSha256);
    for (const page of htmlManifest.pages.filter((entry) => entry.status === "recovered")) {
      assert.match(page.archiveUrl, /^https:\/\/web\.archive\.org\/web\/\d+id_\//);
      assert.match(page.sha256, /^[a-f0-9]{64}$/);
    }
  }
});
