#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const productionUrl = "https://jamieburk.art";
const scanRoots = ["apps/www/src", "apps/www/public"];
const args = new Set(process.argv.slice(2));

const isProduction =
  args.has("--production") ||
  process.env.APP_ENV === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production" ||
  process.env.SITE_URL === productionUrl ||
  process.env.NEXT_PUBLIC_SITE_URL === productionUrl;

const hardBlockers = [
  "TODO: Jamie approval required before launch",
  "TODO: Jamie approval required if public-ready",
  "TODO: Jamie approval required",
  "Placeholder resume PDF",
  "placeholder resume",
  "Public email pending confirmation",
  "Public email pending"
];

const hardBlockersBySpecificity = [...hardBlockers].sort((a, b) => {
  return b.length - a.length;
});

const sensitiveTerms = [
  "private email",
  "raw transcript",
  "private coalition notes",
  "legal-review",
  "stakeholder list",
  "private stakeholder",
  "credentials",
  "password",
  "private analytics",
  "dashboard",
  "customer data",
  "attendance list",
  "guest data",
  "therapy",
  "medical",
  "medication",
  "financial details",
  "banking",
  "tax",
  "trust"
];

const privateFontNames = [
  "maria",
  "maria-extra-bold",
  "Trade Gothic",
  "Verlag",
  "Gotham Rounded"
];

const committedFontExtensions = new Set([".ttf", ".otf", ".woff", ".woff2"]);

const secretPatterns = [
  {
    label: "possible plaintext credential assignment",
    pattern:
      /\b(?:password|passwd|secret|api[_-]?key|access[_-]?token|auth[_-]?token)\s*[:=]\s*["']?[^"'\s]{8,}/i
  },
  {
    label: "possible GitHub token",
    pattern: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{20,}\b/
  },
  {
    label: "possible OpenAI API key",
    pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/
  }
];

const failures = [];
const warnings = [];

function walk(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (["node_modules", ".next", "out", "dist"].includes(entry.name)) {
        return [];
      }

      return walk(fullPath);
    }

    return entry.isFile() ? [fullPath] : [];
  });
}

function formatPath(filePath) {
  return path.relative(repoRoot, filePath);
}

function includesTerm(content, term) {
  return content.toLowerCase().includes(term.toLowerCase());
}

function specificMatches(content, terms) {
  const matches = [];

  for (const term of terms) {
    const lowerTerm = term.toLowerCase();
    const alreadyCovered = matches.some((match) => {
      return match.toLowerCase().includes(lowerTerm);
    });

    if (!alreadyCovered && includesTerm(content, term)) {
      matches.push(term);
    }
  }

  return matches;
}

function fontNamePattern(name) {
  if (name === "maria") {
    return /\bmaria\b/i;
  }

  return new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

function checkEnvironment() {
  if (!isProduction) {
    return;
  }

  const expectations = [
    ["APP_ENV", "production"],
    ["SITE_ENV", "production"],
    ["NEXT_PUBLIC_DEPLOY_ENV", "production"],
    ["SITE_URL", productionUrl],
    ["NEXT_PUBLIC_SITE_URL", productionUrl],
    ["NEXT_PUBLIC_ROBOTS_POLICY", "index"]
  ];

  for (const [name, expected] of expectations) {
    if (process.env[name] !== expected) {
      failures.push(
        `${name} must be ${expected} for a production safety check.`
      );
    }
  }
}

function checkWorkData() {
  if (!isProduction) {
    return;
  }

  const workFile = path.join(repoRoot, "apps/www/src/data/work.ts");
  if (!fs.existsSync(workFile)) {
    return;
  }

  const content = fs.readFileSync(workFile, "utf8");
  if (/visibility:\s*["']private["']/.test(content)) {
    failures.push(
      "apps/www/src/data/work.ts contains a published work item with visibility: \"private\""
    );
  }

  if (/status:\s*["']Draft["']/.test(content)) {
    failures.push(
      "apps/www/src/data/work.ts contains a published work item with status: \"Draft\""
    );
  }
}

function checkFiles(files) {
  for (const file of files) {
    const relativePath = formatPath(file);
    const extension = path.extname(file).toLowerCase();

    if (committedFontExtensions.has(extension)) {
      failures.push(`${relativePath} is a committed font file.`);
      continue;
    }

    const content = fs.readFileSync(file, "utf8");

    for (const fontName of privateFontNames) {
      if (fontNamePattern(fontName).test(content)) {
        failures.push(
          `${relativePath} references private or uncleared font name "${fontName}"`
        );
      }
    }

    for (const secretPattern of secretPatterns) {
      if (secretPattern.pattern.test(content)) {
        failures.push(`${relativePath} contains ${secretPattern.label}.`);
      }
    }

    if (isProduction) {
      for (const blocker of specificMatches(content, hardBlockersBySpecificity)) {
        failures.push(`${relativePath} contains ${blocker}`);
      }

      for (const term of sensitiveTerms) {
        if (includesTerm(content, term)) {
          warnings.push(`${relativePath} contains sensitive-content term "${term}"`);
        }
      }
    }
  }
}

const files = scanRoots.flatMap((root) => walk(path.join(repoRoot, root)));

checkEnvironment();
checkFiles(files);
checkWorkData();

if (failures.length > 0) {
  console.error("Public-safety check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  if (warnings.length > 0) {
    console.error("Sensitive-content warnings:");
    for (const warning of warnings) {
      console.error(`- ${warning}`);
    }
  }

  process.exit(1);
}

console.log("Public-safety check passed.");

if (warnings.length > 0) {
  console.log("Sensitive-content warnings:");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}
