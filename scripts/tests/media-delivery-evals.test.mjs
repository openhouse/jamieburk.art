import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { evaluateMediaDelivery } from "../check-media-delivery-evals.mjs";

test("the governed Cloudinary pilot passes every deterministic gate", () => {
  const result = evaluateMediaDelivery();
  assert.equal(result.passed, true, JSON.stringify(result.failures, null, 2));
});

test("a Cloudinary social-preview allowlist entry fails closed", () => {
  const path = "apps/www/src/lib/media-delivery.ts";
  const source = readFileSync(path, "utf8").replace(
    "export const cloudinaryPilotAssets = {",
    'export const cloudinaryPilotAssets = {\n  "/images/social/jamie-east-river-og.jpg": { source: "/images/social/jamie-east-river-og.jpg", publicId: "og", version: 1, sourceWidth: 1200, widths: [1200], quality: "good" },'
  );
  const result = evaluateMediaDelivery(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "local-asset-boundary"));
});

test("an eager artifact gallery fails the loading-policy gate", () => {
  const path = "apps/www/src/components/CaseStudyBlocks.tsx";
  const source = readFileSync(path, "utf8").replace(
    "sizes=\"(min-width: 768px) 66vw, 100vw\"",
    'loading="eager" sizes="(min-width: 768px) 66vw, 100vw"'
  );
  const result = evaluateMediaDelivery(process.cwd(), { [path]: source });
  assert.equal(result.passed, false);
  assert(result.failures.some(({ criterion }) => criterion === "loading-policy"));
});
