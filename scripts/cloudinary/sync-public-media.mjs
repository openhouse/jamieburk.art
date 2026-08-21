#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const manifestPath = path.join(
  repoRoot,
  "apps/www/src/data/media-delivery.json"
);
const credentialsPath = process.env.CLOUDINARY_CREDENTIALS_FILE;

if (!credentialsPath) {
  throw new Error("CLOUDINARY_CREDENTIALS_FILE must name a mode-600 JSON file.");
}

const credentials = JSON.parse(readFileSync(credentialsPath, "utf8"));
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

if (credentials.cloudName !== manifest.provider.cloudName) {
  throw new Error("Credential cloud name does not match the governed manifest.");
}

function signature(params) {
  const canonical = Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return createHash("sha1")
    .update(`${canonical}${credentials.apiSecret}`)
    .digest("hex");
}

for (const asset of manifest.assets) {
  const timestamp = Math.floor(Date.now() / 1000);
  const signed = {
    invalidate: "true",
    overwrite: "true",
    public_id: asset.cloudinary.publicId,
    timestamp: String(timestamp)
  };
  const form = new FormData();
  const bytes = readFileSync(path.join(repoRoot, "apps/www/public", asset.source));
  form.append("file", new Blob([bytes]), path.basename(asset.source));
  for (const [key, value] of Object.entries(signed)) form.append(key, value);
  form.append("api_key", credentials.apiKey);
  form.append("signature", signature(signed));

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${credentials.cloudName}/image/upload`,
    { method: "POST", body: form }
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(`${asset.id}: ${result.error?.message ?? response.statusText}`);
  }
  if (result.public_id !== asset.cloudinary.publicId || !Number.isInteger(result.version)) {
    throw new Error(`${asset.id}: Cloudinary returned an unexpected binding.`);
  }
  asset.cloudinary.version = result.version;
  console.log(`uploaded ${asset.id} -> v${result.version}/${result.public_id}`);
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`updated ${path.relative(repoRoot, manifestPath)}`);
