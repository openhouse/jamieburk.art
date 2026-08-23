import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDir, "..");

export function readApprovedRender(source) {
  const block = source.match(/approvedRender:\s*\{([\s\S]*?)\n\s*\}/)?.[1];
  if (!block) {
    throw new Error("The social-preview composition has no approvedRender contract.");
  }

  const readNumber = (field) => {
    const value = block.match(new RegExp(`${field}:\\s*(\\d+)`))?.[1];
    if (!value) throw new Error(`approvedRender.${field} is missing.`);
    return Number(value);
  };
  const readString = (field) => {
    const value = block.match(new RegExp(`${field}:\\s*"([^"]+)"`))?.[1];
    if (!value) throw new Error(`approvedRender.${field} is missing.`);
    return value;
  };

  return {
    width: readNumber("width"),
    height: readNumber("height"),
    contentType: readString("contentType"),
    sha256: readString("sha256")
  };
}

export function inspectPng(bytes) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (bytes.length < 24 || !bytes.subarray(0, 8).equals(signature)) {
    throw new Error("The generated social preview is not a PNG.");
  }
  if (bytes.subarray(12, 16).toString("ascii") !== "IHDR") {
    throw new Error("The generated social preview has no PNG IHDR header.");
  }

  return {
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    contentType: "image/png",
    sha256: createHash("sha256").update(bytes).digest("hex")
  };
}

export function evaluateApprovedRender(observed, approved) {
  return Object.entries(approved).flatMap(([field, expected]) =>
    observed[field] === expected
      ? []
      : [`${field}: expected ${expected}, observed ${observed[field]}`]
  );
}

export function checkSocialPreviewRender(root = repositoryRoot) {
  const sourcePath = path.join(root, "apps/www/src/data/social-preview.ts");
  const renderPath = path.join(root, "apps/www/.next/server/app/opengraph-image.body");
  const approved = readApprovedRender(readFileSync(sourcePath, "utf8"));
  const observed = inspectPng(readFileSync(renderPath));
  const failures = evaluateApprovedRender(observed, approved);
  return { approved, observed, failures, passed: failures.length === 0 };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = checkSocialPreviewRender();
  if (!result.passed) {
    for (const failure of result.failures) console.error(`FAIL ${failure}`);
    process.exitCode = 1;
  } else {
    console.log(
      `PASS social preview ${result.observed.width}x${result.observed.height} ${result.observed.sha256}`
    );
  }
}
