import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();

const scanRoots = [
  "apps/www/src",
  "apps/www/public"
];

const patterns = [
  { label: "TODO: Jamie approval required", regex: /TODO: Jamie approval required/ },
  { label: "Placeholder resume PDF", regex: /Placeholder resume PDF/i },
  { label: "visibility: private", regex: /visibility:\s*private/i },
  { label: "status: Draft", regex: /status:\s*Draft/ },
  { label: "PRIVATE", regex: /\bPRIVATE\b/ },
  { label: "CONFIDENTIAL", regex: /\bCONFIDENTIAL\b/ },
  { label: "raw Otter", regex: /raw\s+Otter/i },
  { label: "transcript", regex: /\btranscript\b/i },
  { label: "api key", regex: /api\s+key/i },
  { label: "token", regex: /\btoken\b/i },
  { label: "password", regex: /\bpassword\b/i },
  { label: "secret", regex: /\bsecret\b/i }
];

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectFiles(fullPath));
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function findMatches(filePath, text) {
  const matches = [];
  const lines = text.split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (pattern.regex.test(line)) {
        matches.push({
          file: path.relative(root, filePath),
          line: index + 1,
          pattern: pattern.label
        });
      }
    }
  });

  return matches;
}

const files = [];

for (const scanRoot of scanRoots) {
  files.push(...await collectFiles(path.join(root, scanRoot)));
}

const failures = [];

for (const file of files) {
  const buffer = await readFile(file);
  failures.push(...findMatches(file, buffer.toString("latin1")));
}

if (failures.length > 0) {
  console.error("Prelaunch check failed. Review these production-facing blockers:");
  for (const failure of failures) {
    console.error(`- ${failure.file}:${failure.line} matched "${failure.pattern}"`);
  }
  process.exit(1);
}

console.log("Prelaunch check passed. No obvious production-facing blockers found.");
