import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const scanRoots = ["apps/www/src", "apps/www/public"];

const patterns = [
  { label: "TODO: Jamie approval required", regex: /TODO: Jamie approval required/g },
  { label: "Placeholder resume PDF", regex: /Placeholder resume PDF/g },
  { label: "visibility: private", regex: /visibility\s*:\s*["']private["']/g },
  { label: "status: Draft", regex: /status\s*:\s*["']Draft["']/g },
  { label: "PRIVATE", regex: /PRIVATE/g },
  { label: "CONFIDENTIAL", regex: /CONFIDENTIAL/g },
  { label: "raw Otter", regex: /raw Otter/g },
  { label: "transcript", regex: /\btranscript\b/g },
  { label: "api key", regex: /api\s+key/gi },
  { label: "token", regex: /\btoken\b/gi },
  { label: "password", regex: /\bpasswords?\b/gi },
  { label: "secret", regex: /\bsecrets?\b/gi }
];

const ignoredDirectories = new Set([".git", ".next", "node_modules", "coverage", "out"]);

function listFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return ignoredDirectories.has(entry.name) ? [] : listFiles(absolutePath);
    }

    return entry.isFile() ? [absolutePath] : [];
  });
}

function lineNumberForIndex(content, index) {
  return content.slice(0, index).split(/\r\n|\r|\n/).length;
}

const failures = [];

for (const root of scanRoots) {
  const absoluteRoot = path.join(repoRoot, root);

  for (const file of listFiles(absoluteRoot)) {
    if (statSync(file).size === 0) {
      continue;
    }

    const content = readFileSync(file).toString("utf8");
    const relativeFile = path.relative(repoRoot, file);

    for (const pattern of patterns) {
      pattern.regex.lastIndex = 0;

      for (const match of content.matchAll(pattern.regex)) {
        failures.push({
          file: relativeFile,
          line: lineNumberForIndex(content, match.index ?? 0),
          pattern: pattern.label
        });
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Prelaunch check failed. Found launch blockers:");
  for (const failure of failures) {
    console.error(`- ${failure.file}:${failure.line} matched "${failure.pattern}"`);
  }
  process.exit(1);
}

console.log("Prelaunch check passed. No launch blockers found.");
