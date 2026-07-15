import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();

const scanRoots = [
  "apps/www/src",
  "apps/www/public",
  "apps/www/mdx-components.tsx",
  "apps/www/next.config.ts"
];

const ignoredDirectories = new Set([
  ".git",
  ".next",
  "node_modules",
  "coverage",
  "dist",
  "out"
]);

const textExtensions = new Set([
  ".css",
  ".csv",
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
  ".txt",
  ".xml"
]);

const binaryTextExtensions = new Set([".pdf"]);

const rules = [
  {
    name: "approval TODO",
    pattern: /TODO:\s*Jamie approval required/i
  },
  {
    name: "placeholder launch copy",
    pattern: /placeholder|replace before launch|public email pending confirmation/i
  },
  {
    name: "private font reference",
    pattern: /\/s\/fonts\/|@font-face/i
  },
  {
    name: "raw transcript marker",
    pattern:
      /otter\.ai|raw transcript|corrected[- ]working[- ]transcript|speaker\s+\d+\s*:|^\s*\d{1,2}:\d{2}(?::\d{2})?\s/m
  },
  {
    name: "credential-looking string",
    pattern:
      /(?:password|passwd|api[_-]?key|secret|token)\s*[:=]|sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{20,}|-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/i
  },
  {
    name: "private source path",
    pattern:
      /\/Volumes\/16TB_SSD\/Work\/Jamie\/Portfolio|\/Users\/jburkart\/Library\/Mobile Documents|supporting-materials/i
  }
];

async function collectFiles(target) {
  const absoluteTarget = path.join(repoRoot, target);
  const entries = await readdir(absoluteTarget, { withFileTypes: true }).catch(async () => {
    return null;
  });

  if (!entries) {
    return [absoluteTarget];
  }

  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) continue;
      files.push(...(await collectFiles(path.join(target, entry.name))));
      continue;
    }

    if (entry.isFile()) {
      files.push(path.join(absoluteTarget, entry.name));
    }
  }

  return files;
}

function shouldScan(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return textExtensions.has(extension) || binaryTextExtensions.has(extension);
}

function toRelative(filePath) {
  return path.relative(repoRoot, filePath);
}

const files = (await Promise.all(scanRoots.map(collectFiles)))
  .flat()
  .filter(shouldScan);

const findings = [];

for (const filePath of files) {
  const buffer = await readFile(filePath);
  const extension = path.extname(filePath).toLowerCase();
  const content = binaryTextExtensions.has(extension)
    ? buffer.toString("latin1")
    : buffer.toString("utf8");

  for (const rule of rules) {
    if (rule.pattern.test(content)) {
      findings.push({
        file: toRelative(filePath),
        rule: rule.name
      });
    }
  }
}

if (findings.length > 0) {
  console.error("Public-safety check found blockers:");
  for (const finding of findings) {
    console.error(`- ${finding.file}: ${finding.rule}`);
  }
  process.exit(1);
}

console.log(`Public-safety check passed across ${files.length} public files.`);
