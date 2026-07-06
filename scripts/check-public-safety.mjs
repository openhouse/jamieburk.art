import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const scanRoots = ["apps/www/src", "apps/www/public"];
const ignoredDirectories = new Set([
  ".git",
  ".next",
  "coverage",
  "dist",
  "node_modules",
  "out"
]);
const fontExtensions = new Set([".otf", ".ttf", ".woff", ".woff2"]);
const sourceExtensions = new Set([
  ".css",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mdx",
  ".ts",
  ".tsx"
]);

const productionFlag = process.argv.includes("--production");
const environmentValues = [
  process.env.APP_ENV,
  process.env.SITE_ENV,
  process.env.NEXT_PUBLIC_DEPLOY_ENV
];
const siteUrlValues = [process.env.SITE_URL, process.env.NEXT_PUBLIC_SITE_URL];
const isProduction =
  productionFlag ||
  environmentValues.some((value) => value === "production") ||
  siteUrlValues.some((value) => value === "https://jamieburk.art") ||
  process.env.NEXT_PUBLIC_ROBOTS_POLICY === "index";

const productionBlockerPatterns = [
  /TODO:\s*Jamie approval required(?: before launch| if public-ready)?/gi,
  /placeholder resume(?: PDF)?/gi,
  /Public email pending(?: confirmation)?/gi
];

const privateFontPatterns = [
  /\bmaria\b/gi,
  /\bmaria-extra-bold\b/gi,
  /\bTrade Gothic\b/gi,
  /\bVerlag\b/gi,
  /\bGotham Rounded\b/gi
];

const sensitiveWarningTerms = [
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

const obviousSecretPatterns = [
  /\b(?:api[_-]?key|secret|token|password|credential)s?\s*[:=]\s*["'][^"']{8,}["']/gi
];

const failures = [];
const warnings = [];

function toRelative(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join("/");
}

async function collectFiles(directory) {
  const absoluteDirectory = path.join(repoRoot, directory);

  try {
    await stat(absoluteDirectory);
  } catch {
    return [];
  }

  const entries = await readdir(absoluteDirectory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (ignoredDirectories.has(entry.name)) {
      continue;
    }

    const absolutePath = path.join(absoluteDirectory, entry.name);
    const relativePath = toRelative(absolutePath);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(relativePath)));
    } else if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

function uniquePush(collection, message) {
  if (!collection.includes(message)) {
    collection.push(message);
  }
}

function findMatches(content, patterns) {
  const matches = [];

  for (const pattern of patterns) {
    pattern.lastIndex = 0;
    for (const match of content.matchAll(pattern)) {
      matches.push(match[0]);
    }
  }

  return [...new Set(matches)];
}

function makeTermPattern(term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(escaped, "i");
}

function extractWorkItemObjects(content) {
  const startMarker = "const workItemsInput = [";
  const start = content.indexOf(startMarker);

  if (start === -1) {
    return [];
  }

  const arrayStart = content.indexOf("[", start);
  const arrayEndMarker = "\n] satisfies WorkMeta[]";
  const arrayEnd = content.indexOf(arrayEndMarker, arrayStart);

  if (arrayStart === -1 || arrayEnd === -1) {
    return [];
  }

  const arrayContent = content.slice(arrayStart + 1, arrayEnd);
  const objects = [];
  let depth = 0;
  let objectStart = -1;
  let quote = null;
  let escaped = false;

  for (let index = 0; index < arrayContent.length; index += 1) {
    const character = arrayContent[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        quote = null;
      }

      continue;
    }

    if (character === "\"" || character === "'" || character === "`") {
      quote = character;
      continue;
    }

    if (character === "{") {
      if (depth === 0) {
        objectStart = index;
      }
      depth += 1;
    } else if (character === "}") {
      depth -= 1;
      if (depth === 0 && objectStart !== -1) {
        objects.push(arrayContent.slice(objectStart, index + 1));
        objectStart = -1;
      }
    }
  }

  return objects;
}

function readWorkItemLabel(objectText, fallback) {
  const title = objectText.match(/title:\s*"([^"]+)"/);
  const slug = objectText.match(/slug:\s*"([^"]+)"/);

  if (title?.[1]) {
    return title[1];
  }

  if (slug?.[1]) {
    return slug[1];
  }

  return fallback;
}

const files = (await Promise.all(scanRoots.map((root) => collectFiles(root)))).flat();

for (const file of files) {
  const relativePath = toRelative(file);
  const extension = path.extname(file);

  if (fontExtensions.has(extension)) {
    failures.push(`${relativePath} is a committed font file`);
    continue;
  }

  const buffer = await readFile(file);
  const content = buffer.toString("utf8");

  if (sourceExtensions.has(extension)) {
    for (const match of findMatches(content, privateFontPatterns)) {
      failures.push(`${relativePath} references uncleared font name "${match}"`);
    }
  }

  for (const match of findMatches(content, obviousSecretPatterns)) {
    failures.push(`${relativePath} appears to contain a secret-like value near "${match}"`);
  }

  if (isProduction) {
    for (const match of findMatches(content, productionBlockerPatterns)) {
      failures.push(`${relativePath} contains ${match}`);
    }

    for (const term of sensitiveWarningTerms) {
      if (makeTermPattern(term).test(content)) {
        uniquePush(warnings, `${relativePath} contains sensitive review term "${term}"`);
      }
    }
  }
}

if (isProduction) {
  const workPath = path.join(repoRoot, "apps/www/src/data/work.ts");
  const workContent = await readFile(workPath, "utf8");
  const workObjects = extractWorkItemObjects(workContent);

  workObjects.forEach((objectText, index) => {
    const label = readWorkItemLabel(objectText, `work item ${index + 1}`);

    if (/visibility:\s*"private"/.test(objectText)) {
      failures.push(`apps/www/src/data/work.ts has private published work item: ${label}`);
    }

    if (/status:\s*"Draft"/.test(objectText)) {
      failures.push(`apps/www/src/data/work.ts has draft published work item: ${label}`);
    }
  });
}

if (failures.length > 0) {
  console.error("Public-safety check failed:");
  for (const failure of [...new Set(failures)]) {
    console.error(`- ${failure}`);
  }

  if (warnings.length > 0) {
    console.warn("\nPublic-safety warnings:");
    for (const warning of warnings) {
      console.warn(`- ${warning}`);
    }
  }

  process.exit(1);
}

if (warnings.length > 0) {
  console.warn("Public-safety check passed with warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
} else {
  console.log("Public-safety check passed.");
}
