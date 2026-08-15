import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const repoRoot = process.cwd();
const evaluatorPath = path.join(repoRoot, "scripts/evaluate-media-delivery.mjs");
const manifestPath = "apps/www/src/data/media-delivery.json";

async function loadEvaluator() {
  assert.equal(
    existsSync(evaluatorPath),
    true,
    "The governed media-delivery evaluator must exist."
  );
  return import(`${pathToFileURL(evaluatorPath).href}?test=${Date.now()}`);
}

test("the current governed media delivery system passes every blocking gate", async () => {
  const { evaluateMediaDelivery } = await loadEvaluator();
  const result = evaluateMediaDelivery(repoRoot);
  assert.equal(result.passed, true, JSON.stringify(result.failures, null, 2));
});

test("an unversioned Cloudinary binding fails closed", async () => {
  const { evaluateMediaDelivery } = await loadEvaluator();
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  manifest.assets[0].cloudinary.version = null;
  const result = evaluateMediaDelivery(repoRoot, {
    [manifestPath]: `${JSON.stringify(manifest, null, 2)}\n`
  });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "immutable-versioned-delivery"));
});

test("a source checksum drift fails the repository-authority gate", async () => {
  const { evaluateMediaDelivery } = await loadEvaluator();
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  manifest.assets[0].sourceSha256 = "0".repeat(64);
  const result = evaluateMediaDelivery(repoRoot, {
    [manifestPath]: `${JSON.stringify(manifest, null, 2)}\n`
  });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "repository-source-authority"));
});

test("an unknown governance identifier fails the repository-authority gate", async () => {
  const { evaluateMediaDelivery } = await loadEvaluator();
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  manifest.assets[0].governanceId = "asset.unregistered.synthetic-reference";
  const result = evaluateMediaDelivery(repoRoot, {
    [manifestPath]: `${JSON.stringify(manifest, null, 2)}\n`
  });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "repository-source-authority"));
});

test("a protected local locator fails the public-safety gate", async () => {
  const { evaluateMediaDelivery } = await loadEvaluator();
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  manifest.assets[0].source = "/Users/jburkart/Library/Photos/private.jpg";
  const result = evaluateMediaDelivery(repoRoot, {
    [manifestPath]: `${JSON.stringify(manifest, null, 2)}\n`
  });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "public-safe-upload-boundary"));
});

test("removing the local rollback switch fails closed", async () => {
  const { evaluateMediaDelivery } = await loadEvaluator();
  const sourcePath = "apps/www/src/components/MediaImage.tsx";
  const source = readFileSync(sourcePath, "utf8").replace(
    'NEXT_PUBLIC_MEDIA_DELIVERY === "cloudinary"',
    "true"
  );
  const result = evaluateMediaDelivery(repoRoot, { [sourcePath]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "reversible-delivery-switch"));
});

test("removing the Docker build-time delivery switch fails closed", async () => {
  const { evaluateMediaDelivery } = await loadEvaluator();
  const dockerfilePath = "Dockerfile";
  const source = readFileSync(dockerfilePath, "utf8").replaceAll(
    "ARG NEXT_PUBLIC_MEDIA_DELIVERY=local\n",
    ""
  );
  const result = evaluateMediaDelivery(repoRoot, { [dockerfilePath]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "reversible-delivery-switch"));
});

test("removing the Cloudinary preconnect fails the LCP delivery gate", async () => {
  const { evaluateMediaDelivery } = await loadEvaluator();
  const layoutPath = "apps/www/src/app/layout.tsx";
  const source = readFileSync(layoutPath, "utf8").replace(
    '<link crossOrigin="anonymous" href="https://res.cloudinary.com" rel="preconnect" />',
    ""
  );
  const result = evaluateMediaDelivery(repoRoot, { [layoutPath]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "responsive-performance-contract"));
});

test("removing the image sitemap route fails the SEO discovery gate", async () => {
  const { evaluateMediaDelivery } = await loadEvaluator();
  const routePath = "apps/www/src/app/image-sitemap.xml/route.ts";
  const result = evaluateMediaDelivery(repoRoot, { [routePath]: "" });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "image-search-discovery"));
});
