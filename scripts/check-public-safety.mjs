#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));

const productionLike =
  args.has("--production") ||
  process.env.APP_ENV === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production";

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mdx",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".xml"
]);

const fontExtensions = new Set([".ttf", ".otf", ".woff", ".woff2"]);
const ignoredDirectories = new Set([
  ".git",
  ".next",
  "coverage",
  "node_modules",
  "out"
]);

const publicScanRoots = [
  "apps/www/src/app",
  "apps/www/src/components",
  "apps/www/src/content",
  "apps/www/src/data",
  "apps/www/src/lib",
  "apps/www/public"
];

const productionBlockers = [
  {
    label: "Jamie approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "placeholder resume text",
    pattern: /placeholder r(?:e|\u00e9)sum(?:e|\u00e9)|replace the placeholder/i
  },
  {
    label: "private visibility state",
    pattern: /visibility\s*:\s*["']private["']/i
  },
  {
    label: "draft status state",
    pattern: /status\s*:\s*["']Draft["']/i
  },
  {
    label: "private email marker",
    pattern: /\bprivate emails?\b/i
  },
  {
    label: "raw transcript marker",
    pattern: /\braw transcripts?\b/i
  },
  {
    label: "private coalition notes marker",
    pattern: /\bprivate coalition notes\b/i
  },
  {
    label: "legal-review materials marker",
    pattern: /\blegal-review materials\b/i
  },
  {
    label: "stakeholder list marker",
    pattern: /\bstakeholder lists?\b/i
  },
  {
    label: "internal analytics marker",
    pattern: /\binternal analytics\b/i
  },
  {
    label: "credentials marker",
    pattern: /\bcredentials\b/i
  },
  {
    label: "private client material marker",
    pattern: /\bprivate client materials?\b/i
  },
  {
    label: "raw community records marker",
    pattern: /\braw community records\b/i
  },
  {
    label: "private font reference",
    pattern: /\bmaria\b|maria-extra-bold\.ttf|\.(?:ttf|otf|woff2?)\b/i
  },
  {
    label: "localhost in public source",
    pattern: /\blocalhost\b|127\.0\.0\.1/i
  }
];

const findings = [];
const hardFailures = [];

function toRelative(filePath) {
  return path.relative(repoRoot, filePath);
}

function walkFiles(root, callback) {
  if (!fs.existsSync(root)) return;

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        walkFiles(fullPath, callback);
      }
      continue;
    }

    if (entry.isFile()) {
      callback(fullPath);
    }
  }
}

function lineNumberForMatch(source, index) {
  return source.slice(0, index).split("\n").length;
}

function scanPublicFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (fontExtensions.has(ext)) {
    hardFailures.push({
      label: "font file committed",
      file: toRelative(filePath),
      line: 1
    });
    return;
  }

  if (!textExtensions.has(ext)) return;

  const source = fs.readFileSync(filePath, "utf8");

  for (const blocker of productionBlockers) {
    const match = blocker.pattern.exec(source);
    if (!match) continue;

    findings.push({
      label: blocker.label,
      file: toRelative(filePath),
      line: lineNumberForMatch(source, match.index)
    });
  }
}

function scanForFontFiles() {
  walkFiles(repoRoot, (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (!fontExtensions.has(ext)) return;

    hardFailures.push({
      label: "font file committed",
      file: toRelative(filePath),
      line: 1
    });
  });
}

function scanEnvironment() {
  if (!productionLike) return;

  const urlValues = [
    ["SITE_URL", process.env.SITE_URL],
    ["NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL]
  ];

  for (const [name, value] of urlValues) {
    if (!value) continue;

    if (/staging\.jamieburk\.art|localhost|127\.0\.0\.1/i.test(value)) {
      findings.push({
        label: `${name} is not production-safe`,
        file: "environment",
        line: 1
      });
    }
  }

  if (process.env.NEXT_PUBLIC_ROBOTS_POLICY === "noindex") {
    findings.push({
      label: "production robots policy is noindex",
      file: "environment",
      line: 1
    });
  }
}

scanForFontFiles();

for (const root of publicScanRoots) {
  walkFiles(path.join(repoRoot, root), scanPublicFile);
}

scanEnvironment();

const report = (items) => {
  for (const item of items.slice(0, 80)) {
    console.error(`- ${item.label}: ${item.file}:${item.line}`);
  }

  if (items.length > 80) {
    console.error(`- plus ${items.length - 80} more finding(s)`);
  }
};

if (hardFailures.length) {
  console.error("Public-safety check failed: private/proprietary font files are present.");
  report(hardFailures);
  process.exit(1);
}

if (findings.length && productionLike) {
  console.error("Public-safety production check failed.");
  report(findings);
  process.exit(1);
}

if (findings.length) {
  console.warn(
    "Public-safety staging scan found launch blockers. These are allowed outside production."
  );
  report(findings);
  process.exit(0);
}

console.log(
  `Public-safety scan passed in ${productionLike ? "production" : "non-production"} mode.`
);
