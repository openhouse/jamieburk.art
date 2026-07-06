import { existsSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");

const appEnv =
  process.env.APP_ENV ??
  process.env.SITE_ENV ??
  process.env.NEXT_PUBLIC_DEPLOY_ENV ??
  "staging";

const strictProduction =
  appEnv === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production" ||
  process.argv.includes("--production");

const stripTrailingSlash = (value) => value.replace(/\/$/, "");
const siteUrl = stripTrailingSlash(
  process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (strictProduction ? "https://jamieburk.art" : "https://staging.jamieburk.art")
);
const publicSiteUrl = stripTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL ?? siteUrl
);

const publicTargets = [
  "apps/www/src/app",
  "apps/www/src/content",
  "apps/www/src/data",
  "apps/www/src/lib/metadata.ts",
  "apps/www/public"
];

const skipDirs = new Set([
  ".git",
  ".next",
  "coverage",
  "dist",
  "node_modules"
]);

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

const fontExtensions = new Set([".otf", ".ttf", ".woff", ".woff2"]);

const productionChecks = [
  {
    label: "unresolved Jamie approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "placeholder resume text",
    pattern: /placeholder r[eé]sum[eé]/i
  },
  {
    label: "private visibility in public data",
    pattern: /visibility:\s*["']private["']/i
  },
  {
    label: "draft status in public data",
    pattern: /status:\s*["']Draft["']/i
  },
  {
    label: "staging URL in public route/content",
    pattern: /staging\.jamieburk\.art/i
  },
  {
    label: "localhost URL in public route/content",
    pattern: /\b(?:localhost|127\.0\.0\.1)\b/i
  },
  {
    label: "private font reference",
    pattern: /\b(?:maria|maria-extra-bold\.ttf|trade gothic|verlag|gotham rounded)\b|\.(?:ttf|otf|woff2?)\b/i
  },
  {
    label: "private email marker",
    pattern: /private emails?/i
  },
  {
    label: "raw transcript marker",
    pattern: /raw transcripts?/i
  },
  {
    label: "private coalition notes marker",
    pattern: /private coalition notes?/i
  },
  {
    label: "legal-review materials marker",
    pattern: /legal-review materials?/i
  },
  {
    label: "private correspondence marker",
    pattern: /private correspondence/i
  },
  {
    label: "stakeholder list marker",
    pattern: /stakeholder lists?/i
  },
  {
    label: "internal analytics marker",
    pattern: /internal analytics/i
  },
  {
    label: "credentials marker",
    pattern: /credentials/i
  },
  {
    label: "private client material marker",
    pattern: /private client materials?/i
  },
  {
    label: "raw community records marker",
    pattern: /raw community records?/i
  }
];

async function walk(target) {
  if (!existsSync(target)) return [];

  const targetStat = await stat(target);
  if (targetStat.isFile()) return [target];

  const entries = await readdir(target, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && skipDirs.has(entry.name)) continue;
    const fullPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    if (entry.isFile()) files.push(fullPath);
  }

  return files;
}

async function findRepoFontFiles() {
  const files = await walk(repoRoot);
  return files.filter((filePath) => fontExtensions.has(path.extname(filePath).toLowerCase()));
}

function lineNumberForMatch(source, index) {
  return source.slice(0, index).split("\n").length;
}

async function scanTextFile(filePath) {
  if (!textExtensions.has(path.extname(filePath).toLowerCase())) return [];

  const source = await readFile(filePath, "utf8");
  const findings = [];

  for (const check of productionChecks) {
    const match = check.pattern.exec(source);
    if (!match) continue;
    findings.push({
      label: check.label,
      filePath,
      line: lineNumberForMatch(source, match.index)
    });
  }

  return findings;
}

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

const publicFiles = (
  await Promise.all(publicTargets.map((target) => walk(path.join(repoRoot, target))))
).flat();

const fontFiles = await findRepoFontFiles();
const findings = [];

for (const fontFile of fontFiles) {
  findings.push({
    label: "font file committed in repository",
    filePath: fontFile,
    line: 1
  });
}

if (strictProduction) {
  if (/staging\.jamieburk\.art|\b(?:localhost|127\.0\.0\.1)\b/i.test(siteUrl)) {
    findings.push({
      label: `unsafe production SITE_URL (${siteUrl})`,
      filePath: path.join(repoRoot, ".env"),
      line: 1
    });
  }

  if (/staging\.jamieburk\.art|\b(?:localhost|127\.0\.0\.1)\b/i.test(publicSiteUrl)) {
    findings.push({
      label: `unsafe production NEXT_PUBLIC_SITE_URL (${publicSiteUrl})`,
      filePath: path.join(repoRoot, ".env"),
      line: 1
    });
  }

  const scannedFindings = (await Promise.all(publicFiles.map(scanTextFile))).flat();
  findings.push(...scannedFindings);
}

if (findings.length > 0) {
  const mode = strictProduction ? "production" : "content";
  console.error(`[public-safety] ${mode} check failed with ${findings.length} finding(s).`);

  for (const finding of findings.slice(0, 60)) {
    console.error(
      `- ${finding.label}: ${relative(finding.filePath)}:${finding.line}`
    );
  }

  if (findings.length > 60) {
    console.error(`- ${findings.length - 60} additional finding(s) omitted.`);
  }

  process.exit(1);
}

const mode = strictProduction ? "production" : "staging/content";
console.log(
  `[public-safety] ${mode} check passed (${publicFiles.length} public file(s) scanned; no repository font files found).`
);

if (!strictProduction) {
  console.log(
    "[public-safety] Staging mode permits approval TODOs; run npm run check:production before release."
  );
}
