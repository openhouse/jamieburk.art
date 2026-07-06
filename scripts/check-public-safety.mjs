#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productionMode = process.argv.includes("--production");

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
  ".txt",
  ".yaml",
  ".yml"
]);

const trackedFiles = execFileSync("git", ["ls-files"], {
  cwd: repoRoot,
  encoding: "utf8"
})
  .split("\n")
  .filter(Boolean);

const hardFailures = [];
const productionFailures = [];
const warnings = [];

function addFinding(kind, message) {
  if (kind === "hard") hardFailures.push(message);
  if (kind === "production") productionFailures.push(message);
  if (kind === "warning") warnings.push(message);
}

function isProductionFacing(file) {
  return (
    file.startsWith("apps/www/src/") ||
    file.startsWith("apps/www/public/") ||
    file === "apps/www/mdx-components.tsx"
  );
}

function isTextFile(file) {
  return textExtensions.has(path.extname(file));
}

function readText(file) {
  return readFileSync(path.join(repoRoot, file), "utf8");
}

function lineFor(contents, index) {
  return contents.slice(0, index).split(/\r\n|\r|\n/).length;
}

function scanTextPattern({ file, pattern, label, kind }) {
  const contents = readText(file);
  const match = pattern.exec(contents);

  if (!match) return;

  addFinding(kind, `${file}:${lineFor(contents, match.index)} ${label}`);
}

const fontFiles = trackedFiles.filter((file) => /\.(ttf|otf|woff|woff2)$/i.test(file));
if (fontFiles.length) {
  addFinding("hard", `tracked font binaries are not allowed: ${fontFiles.join(", ")}`);
}

const envFiles = trackedFiles.filter((file) => {
  const basename = path.basename(file);
  return basename.startsWith(".env") && basename !== ".env.example";
});
if (envFiles.length) {
  addFinding("hard", `committed env files are not allowed: ${envFiles.join(", ")}`);
}

const privatePathPattern =
  /(^|\/)(private|archive-private|raw|transcripts-private|client-private|legal-review)(\/|$)|\.private\./i;
const privatePathFiles = trackedFiles.filter((file) => privatePathPattern.test(file));
if (privatePathFiles.length) {
  addFinding("hard", `tracked private-path files are not allowed: ${privatePathFiles.join(", ")}`);
}

const searchableTextFiles = trackedFiles.filter((file) => {
  if (!isTextFile(file)) return false;
  if (!existsSync(path.join(repoRoot, file))) return false;
  return statSync(path.join(repoRoot, file)).isFile();
});

for (const file of searchableTextFiles) {
  const hardPatterns = [
    {
      label: "private key material",
      pattern: /-----BEGIN (?:RSA |OPENSSH |EC |DSA |)?PRIVATE KEY-----/i
    },
    {
      label: "OpenAI key-looking string",
      pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/i
    },
    {
      label: "secret-looking assignment",
      pattern:
        /\b(?:api[_-]?key|secret|access[_-]?token|auth[_-]?token|client[_-]?secret|password|passwd)\s*[:=]\s*["']?[^"'\s]{8,}/i
    },
    {
      label: "private local path",
      pattern:
        /(?:\/Users\/jburkart\/|\/Volumes\/16TB_SSD\/Work\/Jamie\/Portfolio\/supporting-materials|Library\/Mobile Documents|job-hunt\/|Jamie Projects History)/i
    }
  ];

  for (const check of hardPatterns) {
    scanTextPattern({ file, kind: "hard", ...check });
  }

  if (!isProductionFacing(file)) continue;

  const productionPatterns = [
    {
      label: "visible Jamie approval TODO",
      pattern: /TODO:\s*Jamie approval required/i
    },
    {
      label: "placeholder resume or launch placeholder text",
      pattern:
        /\b(?:Placeholder resume PDF|Replace with approved current resume|replace the placeholder|public email pending confirmation)\b/i
    },
    {
      label: "public work entry marked private",
      pattern: /visibility:\s*"private"/i
    },
    {
      label: "public work entry marked draft",
      pattern: /status:\s*"Draft"/i
    },
    {
      label: "raw transcript marker",
      pattern: /(?:otter\.ai|_otter|raw transcript|^\s*[A-Z][A-Za-z .'-]{1,60}\s+\d{1,2}:\d{2}(?::\d{2})?\s*$)/im
    },
    {
      label: "production-facing private source path",
      pattern: /(?:supporting-materials|\/Volumes\/16TB_SSD\/Work\/Jamie|\/Users\/jburkart\/)/i
    }
  ];

  for (const check of productionPatterns) {
    scanTextPattern({
      file,
      kind: productionMode ? "production" : "warning",
      ...check
    });
  }
}

const resumePath =
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
const absoluteResumePath = path.join(repoRoot, resumePath);

if (!existsSync(absoluteResumePath)) {
  addFinding(productionMode ? "production" : "warning", `${resumePath} is missing`);
} else {
  const resumeBytes = readFileSync(absoluteResumePath);
  const resumeText = resumeBytes.toString("latin1");

  if (
    /Placeholder resume PDF|Replace with approved current resume/i.test(resumeText)
  ) {
    addFinding(
      productionMode ? "production" : "warning",
      `${resumePath} still contains placeholder resume text`
    );
  }

  try {
    const extractedText = execFileSync("pdftotext", [absoluteResumePath, "-"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });

    if (
      /Placeholder resume PDF|Replace with approved current resume/i.test(extractedText)
    ) {
      addFinding(
        productionMode ? "production" : "warning",
        `${resumePath} extracts as placeholder resume text`
      );
    }
  } catch {
    warnings.push("pdftotext unavailable; PDF placeholder scan used embedded text only");
  }
}

if (hardFailures.length || (productionMode && productionFailures.length)) {
  console.error("Public-safety check failed:");
  for (const failure of hardFailures) console.error(`- ${failure}`);
  for (const failure of productionFailures) console.error(`- ${failure}`);
  process.exit(1);
}

for (const warning of [...warnings, ...productionFailures]) {
  console.warn(`Warning: ${warning}`);
}

console.log(
  productionMode
    ? "Public-safety production check passed."
    : "Public-safety check passed."
);
