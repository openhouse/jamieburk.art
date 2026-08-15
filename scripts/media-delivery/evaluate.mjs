import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  cloudinaryAccount,
  cloudinaryAssets
} from "../../apps/www/src/data/cloudinary-assets.mjs";

const root = path.resolve(import.meta.dirname, "../..");
const read = (relativePath) => readFile(path.join(root, relativePath), "utf8");

const [evalSpec, hillClimbReport, deliverySource, nextConfig, dockerfile, socialPreview, packageJson] =
  await Promise.all([
    read("evals/media-delivery/cloudinary.json"),
    read("evals/media-delivery/hill-climb-2026-08-15.json"),
    read("apps/www/src/lib/cloudinary-image-delivery.mjs"),
    read("apps/www/next.config.ts"),
    read("Dockerfile"),
    read("apps/www/src/data/social-preview.ts"),
    read("package.json")
  ]);

const checks = [];
function check(name, fn) {
  try {
    fn();
    checks.push({ name, pass: true });
  } catch (error) {
    checks.push({ name, pass: false, detail: error.message });
  }
}

check("eval contract parses", () => {
  const parsed = JSON.parse(evalSpec);
  assert.equal(parsed.mode, "deterministic-hard-gates");
  assert.ok(parsed.hardGates.length >= 8);
});

check("public Cloudinary account is bound", () => {
  assert.match(cloudinaryAccount.cloudName, /^[a-z0-9][a-z0-9_-]+$/);
  assert.notEqual(cloudinaryAccount.cloudName, "TODO_CLOUD_NAME");
  assert.equal(cloudinaryAccount.deliveryHost, "res.cloudinary.com");
});

check("every canary URL has an immutable upload version", () => {
  assert.equal(cloudinaryAssets.length, 6);
  for (const asset of cloudinaryAssets) {
    assert.match(asset.version, /^v[1-9][0-9]{9,}$/);
  }
});

check("responsive transform and rollback rules are encoded", () => {
  assert.match(deliverySource, /c_limit,w_\$\{width\}\/f_\$\{policy\.format\}\/q_\$\{policy\.quality\}/);
  assert.match(deliverySource, /photograph: \{ format: "webp", quality: 30 \}/);
  assert.match(deliverySource, /screenshot: \{ format: "webp", quality: 35 \}/);
  assert.match(deliverySource, /mediaDelivery === "local"/);
  assert.match(nextConfig, /deviceSizes:\s*\[/);
  assert.match(nextConfig, /imageSizes:\s*\[/);
});

check("measured performance and visual hill climb stays within budget", () => {
  const report = JSON.parse(hillClimbReport);
  assert.equal(report.decision.includes("production and indexing gates open"), true);
  for (const comparison of report.comparisons) {
    assert.ok(
      comparison.byteRatio <= report.performanceBudget.maximumRepresentativeByteRatio,
      `${comparison.id} exceeds the byte budget`
    );
    assert.equal(comparison.visualResult, "pass");
  }
  assert.ok(report.rejected.some((candidate) => candidate.policy === "f_auto/q_auto:best"));
});

check("staging build exposes only public delivery switches", () => {
  assert.match(dockerfile, /ARG NEXT_PUBLIC_MEDIA_DELIVERY=auto/);
  assert.match(dockerfile, /ENV NEXT_PUBLIC_MEDIA_DELIVERY=\$NEXT_PUBLIC_MEDIA_DELIVERY/);
  assert.doesNotMatch(dockerfile, /CLOUDINARY_URL|API_SECRET|API_KEY/);
});

check("social preview remains a checked-in stable asset", () => {
  assert.match(socialPreview, /path: "\/opengraph-image"/);
  assert.doesNotMatch(socialPreview, /cloudinary/i);
});

check("the media eval is part of the recursive check", () => {
  const parsed = JSON.parse(packageJson);
  assert.equal(parsed.scripts.precheck, "npm run evals:media-delivery && npm run test:media-delivery");
});

const failed = checks.filter((item) => !item.pass);
for (const item of checks) {
  process.stdout.write(`${item.pass ? "PASS" : "FAIL"} ${item.name}`);
  if (item.detail) process.stdout.write(` — ${item.detail}`);
  process.stdout.write("\n");
}

if (failed.length > 0) {
  process.exitCode = 1;
} else {
  process.stdout.write(`PASS ${checks.length}/${checks.length} media-delivery hard gates\n`);
}
