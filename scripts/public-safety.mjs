import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredIgnoreEntries = [
  "*.local",
  "*.private.*",
  "private/",
  "archive-private/",
  "raw/",
  "transcripts-private/",
  "client-private/",
  "legal-review/"
];

const scanRoots = [
  "apps/www/src",
  "apps/www/public",
  "apps/www/next.config.ts",
  "apps/www/package.json",
  "package.json"
];

const ignoredSegments = new Set([
  ".git",
  ".next",
  "node_modules",
  "coverage",
  "out"
]);

const textExtensions = new Set([
  ".css",
  ".js",
  ".jsx",
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
  {
    label: "visible Jamie approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    label: "placeholder resume copy",
    pattern: /placeholder resume|replace the placeholder PDF|Placeholder resume PDF/i
  },
  {
    label: "private work item visibility",
    pattern: /visibility:\s*["']private["']/i
  },
  {
    label: "draft work item status",
    pattern: /status:\s*["']Draft["']/i
  },
  {
    label: "uppercase private marker",
    pattern: /\bPRIVATE\b/
  },
  {
    label: "uppercase confidential marker",
    pattern: /\bCONFIDENTIAL\b/
  },
  {
    label: "raw Otter marker",
    pattern: /\braw\s+Otter\b|otter\.ai|_otter/i
  },
  {
    label: "raw transcript marker",
    pattern: /\braw\s+transcript\b/i
  },
  {
    label: "private folder marker",
    pattern: /(?:transcripts-private|archive-private|client-private|legal-review|\/private\/|\/raw\/|\/client-private\/|\/legal-review\/)/i
  },
  {
    label: "credential-looking string",
    pattern:
      /\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|bearer[_-]?token|refresh[_-]?token|session[_-]?token|client[_-]?secret|password|secret)\s*[:=]/i
  },
  {
    label: "private key block",
    pattern: /-----BEGIN (?:RSA |OPENSSH |DSA |EC |PGP )?PRIVATE KEY-----/i
  },
  {
    label: "local private source path",
    pattern:
      /\/Volumes\/16TB_SSD\/Work\/Jamie\/Portfolio\/supporting-materials|\/Users\/jburkart\/Library\/Mobile Documents\/com~apple~CloudDocs\/Teams\/(?:Jamie Projects History|job-hunt)/i
  },
  {
    label: "private font file",
    pattern: /\.(?:otf|ttf|woff2?)$/i,
    pathOnly: true
  }
];

const warningPatterns = [
  { label: "context word: transcript", pattern: /\btranscripts?\b/i },
  { label: "context word: source", pattern: /\bsource\b/i },
  { label: "context word: archive", pattern: /\barchive\b/i },
  { label: "context word: legal", pattern: /\blegal\b/i },
  { label: "context word: private", pattern: /\bprivate\b/i },
  { label: "context word: dashboard", pattern: /\bdashboards?\b/i },
  { label: "context word: client", pattern: /\bclient\b/i },
  { label: "context word: AI", pattern: /\bAI\b/ }
];

const warningContextPattern =
  /\b(?:raw|confidential)\b|\/Volumes\/16TB_SSD|\/Users\/jburkart|(?:transcripts-private|archive-private|client-private|legal-review)/i;

const failures = [];
const warnings = [];

function lineFor(content, index) {
  return content.slice(0, index).split("\n").length;
}

function walk(entry) {
  const fullPath = path.join(root, entry);
  if (!existsSync(fullPath)) return [];
  const stat = statSync(fullPath);

  if (stat.isFile()) return [fullPath];
  if (!stat.isDirectory()) return [];

  const files = [];
  for (const child of readdirSync(fullPath)) {
    if (ignoredSegments.has(child)) continue;
    files.push(...walk(path.join(entry, child)));
  }
  return files;
}

function readPdfText(filePath) {
  try {
    return execFileSync("pdftotext", [filePath, "-"], {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    warnings.push(`${path.relative(root, filePath)}: unable to extract PDF text with pdftotext`);
    return "";
  }
}

function readScannableText(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".pdf") return readPdfText(filePath);
  if (!textExtensions.has(extension)) return "";
  return readFileSync(filePath, "utf8");
}

function checkIgnoreFile(relativePath) {
  const content = readFileSync(path.join(root, relativePath), "utf8");
  for (const entry of requiredIgnoreEntries) {
    if (!content.split(/\r?\n/).includes(entry)) {
      failures.push(`${relativePath}: missing required ignore entry ${entry}`);
    }
  }
}

checkIgnoreFile(".gitignore");
checkIgnoreFile(".dockerignore");

const files = scanRoots.flatMap(walk);

for (const filePath of files) {
  const relativePath = path.relative(root, filePath);

  for (const blocker of blockerPatterns.filter((item) => item.pathOnly)) {
    if (blocker.pattern.test(relativePath)) {
      failures.push(`${relativePath}: ${blocker.label}`);
    }
  }

  const content = readScannableText(filePath);
  if (!content) continue;

  for (const blocker of blockerPatterns.filter((item) => !item.pathOnly)) {
    const match = blocker.pattern.exec(content);
    if (match?.index !== undefined) {
      failures.push(`${relativePath}:${lineFor(content, match.index)} ${blocker.label}`);
    }
  }

  for (const warning of warningPatterns) {
    const match = warning.pattern.exec(content);
    if (match?.index !== undefined) {
      const context = content.slice(
        Math.max(0, match.index - 100),
        Math.min(content.length, match.index + 100)
      );
      if (warningContextPattern.test(context)) {
        warnings.push(`${relativePath}:${lineFor(content, match.index)} review ${warning.label}`);
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

console.log("Public-safety scan passed.");
