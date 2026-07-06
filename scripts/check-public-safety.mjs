import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const args = new Set(process.argv.slice(2));

const productionLike =
  args.has("--production") ||
  process.env.APP_ENV === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production";

const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".turbo",
  "coverage",
  "node_modules",
  "out"
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
  ".txt",
  ".xml",
  ".yaml",
  ".yml"
]);

const fontExtensions = new Set([".ttf", ".otf", ".woff", ".woff2"]);

const publicScanRoots = [
  "apps/www/src",
  "apps/www/public",
  "apps/www/next.config.ts",
  "Dockerfile",
  "package.json",
  "README.md",
  "docs"
];

const appFacingRoots = ["apps/www/src", "apps/www/public"];

const productionBlockers = [
  {
    label: "Jamie approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "placeholder resume text",
    pattern: /placeholder r(?:e|\u00e9)sum(?:e|\u00e9)|replace (?:with|the) approved current resume|replace the placeholder/i
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
    label: "raw transcript marker",
    pattern: /(?:otter\.ai|_otter|raw transcript|^\s*[A-Z][A-Za-z .'-]{1,60}\s+\d{1,2}:\d{2}(?::\d{2})?\s*$)/im
  },
  {
    label: "local private source path",
    pattern: /(?:\/Volumes\/16TB_SSD\/Work\/|\/Users\/jburkart\/Library\/Mobile Documents|supporting-materials|job-hunt\/|iMessage\/)/i
  }
];

const hardSecretPatterns = [
  {
    label: "OpenAI key-looking string",
    pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/i
  },
  {
    label: "GitHub token-looking string",
    pattern: /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/i
  },
  {
    label: "private key material",
    pattern: /-----BEGIN (?:RSA |OPENSSH |EC |)?PRIVATE KEY-----/i
  },
  {
    label: "secret-looking assignment",
    pattern: /\b(?:api[_-]?key|secret|access[_-]?token|auth[_-]?token|client[_-]?secret|password|passwd)\s*[:=]/i
  }
];

const warningPatterns = [
  {
    label: "phone-like value in public artifact",
    pattern: /\b(?:\+?1[-.\s]?)?(?:\([2-9]\d{2}\)|[2-9]\d{2})[-.\s]?\d{3}[-.\s]?\d{4}\b/
  },
  {
    label: "address-like value in public artifact",
    pattern: /\b\d{1,6}\s+[A-Z][A-Za-z0-9.'-]*(?:\s+[A-Z][A-Za-z0-9.'-]*){0,5}\s+(?:Street|St\.|Avenue|Ave\.|Road|Rd\.|Boulevard|Blvd\.|Drive|Dr\.|Lane|Ln\.|Place|Pl\.)\b/
  }
];

const hardFailures = [];
const productionFindings = [];
const warnings = [];

const toRelative = (filePath) => path.relative(repoRoot, filePath);

const lineNumberForMatch = (source, index) => source.slice(0, index).split("\n").length;

function walkFiles(root, callback) {
  if (!fs.existsSync(root)) return;

  const stat = fs.statSync(root);
  if (stat.isFile()) {
    callback(root);
    return;
  }

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

function readPdfText(filePath) {
  try {
    return execFileSync("pdftotext", [filePath, "-"], {
      encoding: "utf8",
      maxBuffer: 8 * 1024 * 1024
    });
  } catch {
    return fs.readFileSync(filePath).toString("latin1");
  }
}

function readSearchableText(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".pdf") return readPdfText(filePath);
  if (!textExtensions.has(ext)) return "";
  return fs.readFileSync(filePath, "utf8");
}

function isInsideAny(relativePath, roots) {
  return roots.some((root) => relativePath === root || relativePath.startsWith(`${root}/`));
}

function scanFile(filePath) {
  const relativePath = toRelative(filePath);
  const ext = path.extname(filePath).toLowerCase();

  if (fontExtensions.has(ext)) {
    hardFailures.push({
      label: "font file committed",
      file: relativePath,
      line: 1
    });
    return;
  }

  const basename = path.basename(filePath);
  if (basename.startsWith(".env") && basename !== ".env.example") {
    hardFailures.push({
      label: "committed env file",
      file: relativePath,
      line: 1
    });
    return;
  }

  const source = readSearchableText(filePath);
  if (!source) return;

  for (const blocker of hardSecretPatterns) {
    const match = blocker.pattern.exec(source);
    if (!match) continue;

    hardFailures.push({
      label: blocker.label,
      file: relativePath,
      line: lineNumberForMatch(source, match.index)
    });
  }

  if (isInsideAny(relativePath, appFacingRoots)) {
    for (const blocker of productionBlockers) {
      const match = blocker.pattern.exec(source);
      if (!match) continue;

      productionFindings.push({
        label: blocker.label,
        file: relativePath,
        line: lineNumberForMatch(source, match.index)
      });
    }

    if (ext === ".pdf") {
      for (const warning of warningPatterns) {
        const match = warning.pattern.exec(source);
        if (!match) continue;

        warnings.push({
          label: warning.label,
          file: relativePath,
          line: lineNumberForMatch(source, match.index)
        });
      }
    }
  }
}

function checkProductionEnvironment() {
  if (!productionLike) return;

  const expectedUrl = "https://jamieburk.art";
  const urlValues = [
    ["SITE_URL", process.env.SITE_URL],
    ["NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL]
  ];

  for (const [name, value] of urlValues) {
    if (!value || value.replace(/\/$/, "") !== expectedUrl) {
      productionFindings.push({
        label: `${name} must be ${expectedUrl}`,
        file: "environment",
        line: 1
      });
    }
  }

  if (process.env.SITE_URL && process.env.NEXT_PUBLIC_SITE_URL) {
    const siteUrl = process.env.SITE_URL.replace(/\/$/, "");
    const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    if (siteUrl !== publicSiteUrl) {
      productionFindings.push({
        label: "SITE_URL and NEXT_PUBLIC_SITE_URL must match",
        file: "environment",
        line: 1
      });
    }
  }

  if (process.env.NEXT_PUBLIC_ROBOTS_POLICY !== "index") {
    productionFindings.push({
      label: "NEXT_PUBLIC_ROBOTS_POLICY must be index",
      file: "environment",
      line: 1
    });
  }
}

function report(items, logger = console.error) {
  for (const item of items.slice(0, 80)) {
    logger(`- ${item.label}: ${item.file}:${item.line}`);
  }
  if (items.length > 80) {
    logger(`- plus ${items.length - 80} more finding(s)`);
  }
}

for (const root of publicScanRoots) {
  walkFiles(path.join(repoRoot, root), scanFile);
}

checkProductionEnvironment();

if (warnings.length) {
  console.warn("Public-safety warnings for review. Values are intentionally not printed:");
  report(warnings, console.warn);
}

if (hardFailures.length) {
  console.error("Public-safety check failed.");
  report(hardFailures);
  process.exit(1);
}

if (productionFindings.length && productionLike) {
  console.error("Public-safety production check failed.");
  report(productionFindings);
  process.exit(1);
}

if (productionFindings.length) {
  console.warn(
    "Public-safety scan found production launch blockers. These are allowed outside production:"
  );
  report(productionFindings, console.warn);
}

console.log(
  `Public-safety scan passed in ${productionLike ? "production" : "non-production"} mode.`
);
