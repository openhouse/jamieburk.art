import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const scannedRoots = [
  "apps/www/src",
  "apps/www/public",
  "docs"
];

const extensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mdx",
  ".mjs",
  ".pdf",
  ".svg",
  ".ts",
  ".tsx",
  ".txt"
]);

const blockers = [
  {
    label: "visible Jamie approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "placeholder resume copy",
    pattern: /placeholder resume|replace the placeholder PDF/i
  },
  {
    label: "private font filename",
    pattern: /maria[-_\s]?extra[-_\s]?bold\.ttf|trade gothic|verlag|gotham rounded/i
  },
  {
    label: "credential-looking token",
    pattern: /\b(?:sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9_]{20,})\b/
  }
];

const reviewTerms = [
  "raw transcript",
  "private coalition notes",
  "legal-review materials",
  "internal analytics",
  "private correspondence",
  "stakeholder lists",
  "client-private materials",
  "raw community records"
];

async function* walk(dir) {
  let entries;

  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      yield* walk(fullPath);
      continue;
    }

    if (entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase())) {
      yield fullPath;
    }
  }
}

function lineFor(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

const failures = [];
const warnings = [];

for (const scannedRoot of scannedRoots) {
  for await (const filePath of walk(path.join(root, scannedRoot))) {
    const relativePath = path.relative(root, filePath);
    const info = await stat(filePath);

    if (info.size > 2_000_000) {
      continue;
    }

    const content = await readFile(filePath, "utf8");

    for (const blocker of blockers) {
      const match = blocker.pattern.exec(content);
      if (match) {
        failures.push(`${relativePath}:${lineFor(content, match.index)} ${blocker.label}`);
      }
    }

    const lowerContent = content.toLowerCase();
    for (const term of reviewTerms) {
      const index = lowerContent.indexOf(term);
      if (index >= 0) {
        warnings.push(`${relativePath}:${lineFor(content, index)} review sensitive-term context: ${term}`);
      }
    }
  }
}

if (warnings.length > 0) {
  console.warn("Public-safety review warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (failures.length > 0) {
  console.error("Public-safety blockers:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Public-safety scan passed with no blockers.");
