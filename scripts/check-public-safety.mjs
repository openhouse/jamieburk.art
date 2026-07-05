#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const deployEnv = process.env.NEXT_PUBLIC_DEPLOY_ENV ?? "development";
const isProduction = deployEnv === "production";

const trackedFiles = execFileSync("git", ["ls-files", "-z"], {
  cwd: repoRoot,
  encoding: "utf8"
})
  .split("\0")
  .filter(Boolean);

const allowedEnvFiles = new Set([".env.example"]);
const privatePathChecks = [
  {
    label: "private env file",
    test: (filePath) => {
      const basename = path.basename(filePath);
      return basename.startsWith(".env") && !allowedEnvFiles.has(basename);
    }
  },
  {
    label: "private key material",
    test: (filePath) =>
      /(^|\/)(id_rsa|id_dsa|id_ecdsa|id_ed25519|\.netrc)$|(\.pem|\.key|\.p12|\.pfx)$/i.test(
        filePath
      )
  },
  {
    label: "credential material",
    test: (filePath) =>
      /(^|\/)(credentials?|secrets?|api[-_]?keys?)(\.|\/|$)/i.test(filePath)
  }
];

const textExtensions = new Set([
  ".css",
  ".js",
  ".json",
  ".md",
  ".mdx",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".yml",
  ".yaml"
]);

const productionBlockers = [
  "TODO: Jamie approval required",
  "placeholder resume PDF",
  "Public email pending confirmation",
  "private phone"
];

const pathErrors = [];
const contentFindings = [];

for (const filePath of trackedFiles) {
  for (const check of privatePathChecks) {
    if (check.test(filePath)) {
      pathErrors.push(`${filePath} (${check.label})`);
    }
  }

  if (!filePath.startsWith("apps/www/src/")) {
    continue;
  }

  const absolutePath = path.join(repoRoot, filePath);

  if (!existsSync(absolutePath) || !textExtensions.has(path.extname(filePath))) {
    continue;
  }

  const contents = readFileSync(absolutePath, "utf8");

  for (const marker of productionBlockers) {
    if (contents.includes(marker)) {
      contentFindings.push(`${filePath}: ${marker}`);
    }
  }
}

if (pathErrors.length > 0) {
  console.error("[public-safety] Blocked private or credential-like files:");
  for (const finding of pathErrors) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

if (contentFindings.length === 0) {
  console.log(`[public-safety] No content blockers found for ${deployEnv}.`);
  process.exit(0);
}

if (isProduction) {
  console.error("[public-safety] Production content blockers found:");
  for (const finding of contentFindings) {
    console.error(`- ${finding}`);
  }
  process.exit(1);
}

console.warn(
  `[public-safety] ${contentFindings.length} production blocker(s) remain for ${deployEnv}; allowed before production.`
);
for (const finding of contentFindings) {
  console.warn(`- ${finding}`);
}
