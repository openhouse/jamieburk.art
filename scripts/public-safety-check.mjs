import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const scanDirs = [
  "apps/www/src/content",
  "apps/www/src/data",
  "apps/www/src/app"
];

const warningPatterns = [
  { label: "private email", pattern: /\bprivate emails?\b/i },
  { label: "raw transcript", pattern: /\braw transcripts?\b/i },
  { label: "therapy", pattern: /\btherapy\b/i },
  { label: "bank", pattern: /\bbanks?\b|\bbanking\b/i },
  { label: "tax", pattern: /\btax(?:es)?\b/i },
  { label: "trust", pattern: /\btrust\b/i },
  { label: "debt", pattern: /\bdebt\b/i },
  { label: "legal strategy", pattern: /\blegal strategy\b/i },
  { label: "password", pattern: /\bpasswords?\b/i },
  { label: "SSN", pattern: /\bSSN\b/i },
  { label: "home address", pattern: /\bhome address(?:es)?\b/i },
  { label: "attendance list", pattern: /\battendance lists?\b/i },
  { label: "stakeholder list", pattern: /\bstakeholder lists?\b/i },
  { label: "TODO: Jamie approval required", pattern: /TODO: Jamie approval required/i }
];

const failurePatterns = [
  {
    label: "OpenAI API key",
    pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/
  },
  {
    label: "private key block",
    pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/
  },
  {
    label: "environment-style secret",
    pattern: /\b(?:API[_-]?KEY|SECRET|TOKEN|PASSWORD|PRIVATE[_-]?KEY)\b\s*[:=]\s*["']?[A-Za-z0-9_./+=-]{12,}/i
  },
  {
    label: "SSN-like number",
    pattern: /\b\d{3}-\d{2}-\d{4}\b/
  }
];

function listFiles(dir) {
  const absoluteDir = path.join(root, dir);
  const entries = readdirSync(absoluteDir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const absoluteEntry = path.join(absoluteDir, entry.name);
    const relativeEntry = path.relative(root, absoluteEntry);

    if (entry.isDirectory()) {
      return listFiles(relativeEntry);
    }

    if (!entry.isFile()) {
      return [];
    }

    return relativeEntry;
  });
}

const textExtensions = new Set([".md", ".mdx", ".ts", ".tsx"]);
const files = scanDirs
  .flatMap((dir) => listFiles(dir))
  .filter((file) => textExtensions.has(path.extname(file)))
  .filter((file) => statSync(path.join(root, file)).size < 1_000_000);

const warnings = [];
const failures = [];

for (const file of files) {
  const content = readFileSync(path.join(root, file), "utf8");
  const lines = content.split(/\r?\n/);

  for (const [index, line] of lines.entries()) {
    for (const { label, pattern } of warningPatterns) {
      if (pattern.test(line)) {
        warnings.push(`${file}:${index + 1} mentions "${label}"`);
      }
    }

    for (const { label, pattern } of failurePatterns) {
      if (pattern.test(line)) {
        failures.push(`${file}:${index + 1} looks like ${label}`);
      }
    }
  }
}

if (warnings.length > 0) {
  console.log("Public-safety reminders:");
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

if (failures.length > 0) {
  console.error("Public-safety check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Public-safety check passed with ${warnings.length} reminder${warnings.length === 1 ? "" : "s"}.`
);
