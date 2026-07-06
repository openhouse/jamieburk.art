#!/usr/bin/env node

import { readdir, readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { extname, join, relative } from "node:path";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));

const scanRoots = ["apps/www/src", "apps/www/public"];
const scanExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mdx",
  ".pdf",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".xml"
]);

const checks = [
  {
    label: "Visible approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "Placeholder resume or launch placeholder",
    pattern: /\b(?:placeholder resume pdf|replace (?:the )?placeholder|replace before launch|public email pending confirmation)\b/i
  },
  {
    label: "Private font path",
    pattern: /\/s\/fonts\//i
  },
  {
    label: "Font-face declaration requiring approval",
    pattern: /@font-face/i
  },
  {
    label: "Raw transcript marker",
    pattern: /(?:otter\.ai|_otter|raw transcript|^\s*[A-Z][A-Za-z .'-]{1,60}\s+\d{1,2}:\d{2}(?::\d{2})?\s*$)/im
  },
  {
    label: "Password-looking assignment",
    pattern: /\b(?:password|passwd)\s*[:=]/i
  },
  {
    label: "Secret-looking assignment",
    pattern: /\b(?:api[_-]?key|secret|access[_-]?token|auth[_-]?token|client[_-]?secret)\s*[:=]/i
  },
  {
    label: "Private key material",
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |)?PRIVATE KEY-----/i
  },
  {
    label: "OpenAI key-looking string",
    pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/i
  },
  {
    label: "Known private local path",
    pattern: /(?:\/Volumes\/|\/Users\/jburkart\/|Library\/Mobile Documents|supporting-materials|iMessage\/|job-hunt\/)/i
  }
];

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        return listFiles(fullPath);
      }

      if (!entry.isFile() || !scanExtensions.has(extname(entry.name))) {
        return [];
      }

      return [fullPath];
    })
  );

  return files.flat();
}

function lineNumberFor(content, index) {
  return content.slice(0, index).split(/\r\n|\r|\n/).length;
}

const findings = [];

for (const root of scanRoots) {
  const absoluteRoot = join(repoRoot, root);

  try {
    await stat(absoluteRoot);
  } catch {
    continue;
  }

  for (const file of await listFiles(absoluteRoot)) {
    const content = await readFile(file, "utf8");
    const relativeFile = relative(repoRoot, file);

    for (const check of checks) {
      const match = check.pattern.exec(content);

      if (match) {
        findings.push({
          file: relativeFile,
          line: lineNumberFor(content, match.index),
          label: check.label
        });
      }
    }
  }
}

if (findings.length > 0) {
  console.error("Public safety check failed. Review these blockers before production:");
  for (const finding of findings) {
    console.error(`- ${finding.file}:${finding.line} - ${finding.label}`);
  }
  process.exit(1);
}

console.log("Public safety check passed.");
