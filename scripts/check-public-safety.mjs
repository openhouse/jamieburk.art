import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const scanRoots = [
  "apps/www/src",
  "apps/www/public",
  "apps/www/mdx-components.tsx",
  "apps/www/next.config.ts"
];

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mdx",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt"
]);

const blockerPatterns = [
  { label: "visible Jamie approval TODO", pattern: /TODO:\s*Jamie approval required/i },
  { label: "placeholder resume copy", pattern: /Placeholder resume|placeholder PDF|placeholder resume/i },
  { label: "private font filename", pattern: /maria-extra-bold\.ttf|trade gothic|verlag|gotham rounded/i },
  { label: "credential-shaped token", pattern: /\b(sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9_]{20,})\b/ },
  { label: "phone number in website source", pattern: /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/ }
];

const sensitivePhrases = [
  "raw transcript",
  "private coalition notes",
  "legal-review materials",
  "private correspondence",
  "private stakeholder lists",
  "internal analytics",
  "client-private materials",
  "raw community records"
];

const safeContext =
  /\b(not published|does not publish|omitted|offline|stay private|stays private|intentionally withheld|intentionally omitted|protected|protecting)\b/i;

async function collectFiles(target) {
  const absolute = path.join(repoRoot, target);
  const targetStat = await stat(absolute).catch(() => null);

  if (!targetStat) {
    return [];
  }

  if (targetStat.isFile()) {
    return [absolute];
  }

  const entries = await readdir(absolute, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const next = path.join(target, entry.name);

      if (entry.isDirectory()) {
        return collectFiles(next);
      }

      return [path.join(repoRoot, next)];
    })
  );

  return files.flat();
}

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

function lineNumberFor(content, index) {
  return content.slice(0, index).split("\n").length;
}

function lineFor(content, index) {
  const start = content.lastIndexOf("\n", index) + 1;
  const end = content.indexOf("\n", index);
  return content.slice(start, end === -1 ? undefined : end);
}

const allFiles = (await Promise.all(scanRoots.map(collectFiles))).flat();
const blockers = [];
const warnings = [];

for (const filePath of allFiles) {
  const ext = path.extname(filePath).toLowerCase();
  const shouldScanText = textExtensions.has(ext);
  const shouldScanPdfForBlockers = ext === ".pdf";

  if (!shouldScanText && !shouldScanPdfForBlockers) {
    continue;
  }

  const content = await readFile(filePath, shouldScanText ? "utf8" : "latin1");

  for (const { label, pattern } of blockerPatterns) {
    if (ext === ".pdf" && label === "phone number in website source") {
      continue;
    }

    const match = content.match(pattern);
    if (match?.index !== undefined) {
      blockers.push({
        file: relative(filePath),
        line: shouldScanText ? lineNumberFor(content, match.index) : null,
        label
      });
    }
  }

  if (!shouldScanText) {
    continue;
  }

  for (const phrase of sensitivePhrases) {
    const pattern = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig");
    for (const match of content.matchAll(pattern)) {
      if (match.index === undefined) {
        continue;
      }

      const line = lineFor(content, match.index);
      if (!safeContext.test(line)) {
        warnings.push({
          file: relative(filePath),
          line: lineNumberFor(content, match.index),
          phrase
        });
      }
    }
  }
}

if (warnings.length > 0) {
  console.warn("Public-safety warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning.file}:${warning.line} sensitive phrase "${warning.phrase}" needs review`);
  }
}

if (blockers.length > 0) {
  console.error("Public-safety blockers:");
  for (const blocker of blockers) {
    const location = blocker.line ? `${blocker.file}:${blocker.line}` : blocker.file;
    console.error(`- ${location} ${blocker.label}`);
  }
  process.exit(1);
}

console.log("Public-safety scan passed.");
