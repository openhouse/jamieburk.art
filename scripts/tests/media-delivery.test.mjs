import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

import {
  buildCloudinaryImageUrl,
  getCloudinaryAsset,
  shouldUseCloudinaryDelivery
} from "../../apps/www/src/lib/cloudinary-image-delivery.mjs";
import { cloudinaryAssets } from "../../apps/www/src/data/cloudinary-assets.mjs";

const root = path.resolve(import.meta.dirname, "../..");

test("the delivery manifest contains only the approved staging canary", () => {
  assert.deepEqual(
    cloudinaryAssets.map((asset) => asset.localSrc).sort(),
    [
      "/artifacts/hje/public-site.png",
      "/images/field-notes/coalition-facilitation-shoestring.webp",
      "/images/field-notes/jamie-east-river.webp",
      "/images/field-notes/kc-town-hall-roof-work.webp",
      "/images/field-notes/save-nyc-spaces-town-hall.webp",
      "/images/field-notes/sunday-dinner-shared-map.webp"
    ]
  );

  for (const asset of cloudinaryAssets) {
    assert.equal(asset.releaseState.publicGit, "approved");
    assert.equal(asset.releaseState.staging, "approved");
    assert.equal(asset.releaseState.cloudinaryPublicDelivery, "approved");
    assert.equal(asset.releaseState.production, "open");
    assert.equal(asset.releaseState.indexing, "open");
    assert.match(asset.kind, /^(photograph|screenshot)$/);
    assert.match(asset.sha256, /^[a-f0-9]{64}$/);
    assert.match(asset.publicId, /^[a-z0-9][a-z0-9/-]+$/);
    assert.match(asset.version, /^v[1-9][0-9]*$/);
    assert.match(
      asset.bindingMethod,
      /^(reused-exact-sha256-match|uploaded-from-approved-public-url)$/
    );
    assert.equal(asset.remoteOriginalVerifiedAt, "2026-08-15");
    assert.ok(asset.publicUseBoundary.length > 40);
  }
});

test("every delivery binding matches the exact checked-in derivative", async () => {
  for (const asset of cloudinaryAssets) {
    const bytes = await readFile(path.join(root, "apps/www/public", asset.localSrc));
    const digest = createHash("sha256").update(bytes).digest("hex");
    assert.equal(digest, asset.sha256, asset.localSrc);
  }
});

test("the loader rounds to a bounded responsive width and keeps immutable identity", () => {
  const asset = {
    localSrc: "/images/example.webp",
    kind: "photograph",
    publicId: "jamieburk-art/staging-canary/example",
    version: "v1786824000"
  };

  assert.equal(
    buildCloudinaryImageUrl({
      asset,
      cloudName: "example-cloud",
      requestedWidth: 641
    }),
    "https://res.cloudinary.com/example-cloud/image/upload/c_limit,w_750/f_webp/q_30/v1786824000/jamieburk-art/staging-canary/example"
  );

  assert.equal(
    buildCloudinaryImageUrl({
      asset,
      cloudName: "example-cloud",
      requestedWidth: 4000
    }),
    "https://res.cloudinary.com/example-cloud/image/upload/c_limit,w_1920/f_webp/q_30/v1786824000/jamieburk-art/staging-canary/example"
  );
});

test("screenshots retain a slightly higher measured quality policy", () => {
  assert.equal(
    buildCloudinaryImageUrl({
      asset: {
        kind: "screenshot",
        publicId: "jamieburk-art/portfolio/artifacts/example",
        version: "v1786824000"
      },
      cloudName: "example-cloud",
      requestedWidth: 750
    }),
    "https://res.cloudinary.com/example-cloud/image/upload/c_limit,w_750/f_webp/q_35/v1786824000/jamieburk-art/portfolio/artifacts/example"
  );
});

test("the manifest lookup fails closed for an unbound local source", () => {
  assert.equal(getCloudinaryAsset("/not-approved.jpg"), null);
});

test("staging defaults to the reversible canary while production defaults local", () => {
  assert.equal(
    shouldUseCloudinaryDelivery({ deployEnv: "staging", mediaDelivery: undefined }),
    true
  );
  assert.equal(
    shouldUseCloudinaryDelivery({ deployEnv: "production", mediaDelivery: undefined }),
    false
  );
  assert.equal(
    shouldUseCloudinaryDelivery({ deployEnv: "staging", mediaDelivery: "local" }),
    false
  );
  assert.equal(
    shouldUseCloudinaryDelivery({ deployEnv: "production", mediaDelivery: "cloudinary" }),
    true
  );
});

test("secrets and ungoverned upload surfaces never enter the public delivery code", async () => {
  const [deliverySource, dockerfile] = await Promise.all([
    readFile(path.join(root, "apps/www/src/lib/cloudinary-image-delivery.mjs"), "utf8"),
    readFile(path.join(root, "Dockerfile"), "utf8")
  ]);
  const combined = `${deliverySource}\n${dockerfile}`;

  assert.doesNotMatch(combined, /API_SECRET|CLOUDINARY_URL|upload_preset/i);
  assert.doesNotMatch(combined, /auto-upload|upload widget/i);
});
