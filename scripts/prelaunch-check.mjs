import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const scanRoots = ["apps/www/src", "apps/www/public"];
const ignoredDirs = new Set([".next", "node_modules"]);

const blockers = [
  { label: "TODO: Jamie approval required", pattern: /TODO:\s*Jamie approval required/i },
  { label: "Placeholder resume PDF", pattern: /Placeholder resume PDF/i },
  { label: "visibility: private", pattern: /visibility:\s*private/i },
  { label: "status: Draft", pattern: /status:\s*Draft/i },
  { label: "PRIVATE", pattern: /\bPRIVATE\b/ },
  { label: "CONFIDENTIAL", pattern: /\bCONFIDENTIAL\b/ },
  { label: "raw Otter", pattern: /raw\s+Otter/i },
  { label: "transcript", pattern: /\btranscript\b/i },
  { label: "api key", pattern: /api\s*key/i },
  { label: "token", pattern: /\btoken\b/i },
  { label: "password", pattern: /\bpasswords?\b/i },
  { label: "secret", pattern: /\bsecrets?\b/i }
];

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

const failures = [];

for (const scanRoot of scanRoots) {
  const absoluteRoot = path.join(root, scanRoot);
  const files = await listFiles(absoluteRoot);

  for (const file of files) {
    const buffer = await readFile(file);
    const text = buffer.toString("utf8");
    const relativeFile = path.relative(root, file);

    for (const blocker of blockers) {
      if (blocker.pattern.test(text)) {
        failures.push({ file: relativeFile, pattern: blocker.label });
      }
    }
  }
}

if (failures.length) {
  console.error("Prelaunch check failed. Review these production blockers:");
  for (const failure of failures) {
    console.error(`- ${failure.file}: ${failure.pattern}`);
  }
  process.exit(1);
}

console.log("Prelaunch check passed. No configured blocker patterns found.");
