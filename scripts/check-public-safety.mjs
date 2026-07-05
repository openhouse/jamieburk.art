import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const deployEnv = process.env.NEXT_PUBLIC_DEPLOY_ENV ?? "local";
const isProduction = deployEnv === "production";

const repoRoot = findRepoRoot(process.cwd());
const scanRoots = ["apps/www/src", "apps/www/public"]
  .map((scanRoot) => path.join(repoRoot, scanRoot))
  .filter((scanRoot) => existsSync(scanRoot));

const checks = [
  {
    label: "approval TODO",
    pattern: /TODO: Jamie approval required/g
  },
  {
    label: "private visibility flag",
    pattern: /visibility:\s*["']private["']/g
  },
  {
    label: "draft status flag",
    pattern: /status:\s*["']Draft["']/g
  },
  {
    label: "placeholder resume language",
    pattern: /Placeholder resume PDF|placeholder PDF|placeholder resume|Replace with approved current resume/gi
  },
  {
    label: "private-data marker",
    pattern: /PRIVATE_DATA|PRIVATE DATA|DO NOT PUBLISH|CONFIDENTIAL|INTERNAL ONLY/g
  }
];

const findings = [];

for (const filePath of scanRoots.flatMap(walkFiles)) {
  const relativePath = path.relative(repoRoot, filePath);
  const contents = readFileSync(filePath).toString("utf8");

  for (const check of checks) {
    const matches = contents.match(check.pattern);

    if (matches) {
      findings.push({
        filePath: relativePath,
        label: check.label,
        count: matches.length
      });
    }
  }
}

if (findings.length === 0) {
  console.log(`[public-safety] ${deployEnv}: no review markers found.`);
  process.exit(0);
}

const summary = findings
  .map((finding) => `- ${finding.filePath}: ${finding.label} (${finding.count})`)
  .join("\n");

if (isProduction) {
  console.error(
    `[public-safety] Production build blocked. Resolve these public-safety markers before launch:\n${summary}`
  );
  process.exit(1);
}

console.warn(`[public-safety] ${deployEnv}: review markers still visible:\n${summary}`);

function findRepoRoot(startDir) {
  let currentDir = startDir;

  while (currentDir !== path.parse(currentDir).root) {
    if (
      existsSync(path.join(currentDir, "package.json")) &&
      existsSync(path.join(currentDir, "apps"))
    ) {
      return currentDir;
    }

    currentDir = path.dirname(currentDir);
  }

  throw new Error("Unable to find repository root.");
}

function walkFiles(dir) {
  const entries = readdirSync(dir);
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry);
    const stats = statSync(entryPath);

    if (stats.isDirectory()) {
      files.push(...walkFiles(entryPath));
      continue;
    }

    if (stats.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}
