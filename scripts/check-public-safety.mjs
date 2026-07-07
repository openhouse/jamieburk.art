#!/usr/bin/env node

import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const repoRoot = process.cwd();
const appEnv =
  process.env.APP_ENV ??
  process.env.SITE_ENV ??
  process.env.NEXT_PUBLIC_DEPLOY_ENV ??
  "staging";
const siteUrl =
  process.env.SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  (appEnv === "production"
    ? "https://jamieburk.art"
    : "https://staging.jamieburk.art");
const isProduction = appEnv === "production" || siteUrl === "https://jamieburk.art";
const robotsPolicy =
  process.env.NEXT_PUBLIC_ROBOTS_POLICY ?? (isProduction ? "index" : "noindex");

const ignoredDirs = new Set([
  ".git",
  ".next",
  ".turbo",
  "coverage",
  "dist",
  "node_modules",
  "out"
]);
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mdx",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt"
]);
const fontExtensions = new Set([".otf", ".ttf", ".woff", ".woff2"]);

const publicSurfaceTargets = [
  "apps/www/src/app",
  "apps/www/src/content",
  "apps/www/src/data",
  "apps/www/src/lib/metadata.ts",
  "apps/www/public"
];

const productionBlockers = [
  {
    label: "approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "placeholder resume text",
    pattern: /(placeholder\s+r[eé]sum[eé]|r[eé]sum[eé]\s+placeholder|replace\s+the\s+placeholder)/i
  },
  {
    label: "unconfirmed public email",
    pattern: /public email pending confirmation/i
  },
  {
    label: "private visibility marker",
    pattern: /visibility\s*:\s*["']private["']/i
  },
  {
    label: "draft status marker",
    pattern: /status\s*:\s*["']Draft["']/i
  },
  {
    label: "private or proprietary font reference",
    pattern: /\b(maria|trade gothic|verlag|gotham rounded|maria-extra-bold\.ttf)\b/i
  },
  {
    label: "font file reference",
    pattern: /\.(ttf|otf|woff2?)\b/i
  }
];

const sensitiveMaterialTerms = [
  /private email/i,
  /raw transcript/i,
  /private coalition notes/i,
  /legal-review materials/i,
  /stakeholder lists?/i,
  /internal analytics/i,
  /credentials/i,
  /private client material/i,
  /raw community records/i
];

const allowedSafetyContext = /(do not publish|does not publish|omitted|offline|stay offline|stays offline|intentionally omitted|protect|protected|requires? approval|public-safe)/i;

function walk(path) {
  let stats;

  try {
    stats = statSync(path);
  } catch {
    return [];
  }

  if (stats.isFile()) {
    return [path];
  }

  if (!stats.isDirectory()) {
    return [];
  }

  return readdirSync(path).flatMap((entry) => {
    if (ignoredDirs.has(entry)) {
      return [];
    }

    return walk(join(path, entry));
  });
}

function readTextFile(path) {
  const extension = extname(path).toLowerCase();

  if (!textExtensions.has(extension)) {
    return null;
  }

  return readFileSync(path, "utf8");
}

function formatFinding({ path, lineNumber, label, line }) {
  const location = lineNumber ? `${path}:${lineNumber}` : path;
  const excerpt = line ? `\n    ${line.trim()}` : "";

  return `- ${location} (${label})${excerpt}`;
}

const repoFiles = walk(repoRoot);
const fontFiles = repoFiles.filter((path) => fontExtensions.has(extname(path).toLowerCase()));
const publicSurfaceFiles = publicSurfaceTargets.flatMap((target) => walk(join(repoRoot, target)));
const findings = [];

for (const path of publicSurfaceFiles) {
  const text = readTextFile(path);

  if (!text) {
    continue;
  }

  const relativePath = relative(repoRoot, path);
  const lines = text.split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const blocker of productionBlockers) {
      if (blocker.pattern.test(line)) {
        findings.push({
          path: relativePath,
          lineNumber: index + 1,
          label: blocker.label,
          line
        });
      }
    }

    for (const term of sensitiveMaterialTerms) {
      if (term.test(line) && !allowedSafetyContext.test(line)) {
        findings.push({
          path: relativePath,
          lineNumber: index + 1,
          label: "sensitive material marker outside safety context",
          line
        });
      }
    }
  });
}

for (const path of fontFiles) {
  findings.push({
    path: relative(repoRoot, path),
    label: "font file committed to repository"
  });
}

if (isProduction) {
  if (siteUrl.includes("staging.jamieburk.art") || siteUrl.includes("localhost")) {
    findings.push({
      path: "environment",
      label: "production URL points at staging or localhost",
      line: `SITE_URL=${siteUrl}`
    });
  }

  if (robotsPolicy === "noindex") {
    findings.push({
      path: "environment",
      label: "production robots policy is noindex",
      line: "NEXT_PUBLIC_ROBOTS_POLICY=noindex"
    });
  }
}

if (findings.length > 0) {
  const heading = isProduction
    ? "Production public-safety check failed."
    : "Public-safety check found launch blockers that are allowed outside production.";

  console.error(heading);
  console.error(findings.map(formatFinding).join("\n"));

  if (isProduction || fontFiles.length > 0) {
    process.exit(1);
  }

  process.exit(0);
}

console.log("Public-safety check passed.");
