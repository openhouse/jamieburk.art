import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const failures = [];

const fail = (message) => {
  failures.push(message);
};

const formatList = (items, limit = 8) => {
  if (items.length <= limit) return items.join(", ");
  return `${items.slice(0, limit).join(", ")} ... and ${items.length - limit} more`;
};

const toRepoPath = (filePath) => path.relative(repoRoot, filePath).split(path.sep).join("/");

const envValue = (name) => process.env[name]?.trim() ?? "";

const envNames = ["APP_ENV", "SITE_ENV", "NEXT_PUBLIC_DEPLOY_ENV"];
const productionEnvNames = envNames.filter((name) => envValue(name) === "production");
const nonProductionEnvNames = envNames.filter((name) => {
  const value = envValue(name);
  return value && value !== "production";
});

if (productionEnvNames.length === 0) {
  fail("Set APP_ENV, SITE_ENV, or NEXT_PUBLIC_DEPLOY_ENV to production.");
}

if (nonProductionEnvNames.length > 0) {
  fail(
    `Production preflight found non-production environment values: ${nonProductionEnvNames.join(
      ", "
    )}.`
  );
}

const siteUrlNames = ["SITE_URL", "NEXT_PUBLIC_SITE_URL"];
const configuredSiteUrls = siteUrlNames
  .map((name) => [name, envValue(name)])
  .filter(([, value]) => value);

if (configuredSiteUrls.length === 0) {
  fail("Set SITE_URL or NEXT_PUBLIC_SITE_URL to https://jamieburk.art.");
}

for (const [name, value] of configuredSiteUrls) {
  if (value.replace(/\/$/, "") !== "https://jamieburk.art") {
    fail(`${name} must be https://jamieburk.art for production.`);
  }
}

if (envValue("NEXT_PUBLIC_ROBOTS_POLICY") !== "index") {
  fail("NEXT_PUBLIC_ROBOTS_POLICY must be index for production.");
}

const contactEmail = envValue("NEXT_PUBLIC_CONTACT_EMAIL");
if (!contactEmail) {
  fail("NEXT_PUBLIC_CONTACT_EMAIL must be set before production.");
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
  fail("NEXT_PUBLIC_CONTACT_EMAIL does not look like a valid email address.");
}

for (const name of ["NEXT_PUBLIC_LINKEDIN_URL", "NEXT_PUBLIC_GITHUB_URL"]) {
  const value = envValue(name);
  if (!value) continue;

  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) {
      fail(`${name} must use http or https.`);
    }
  } catch {
    fail(`${name} must be an absolute URL when configured.`);
  }
}

const getTrackedFiles = () => {
  try {
    return execFileSync("git", ["ls-files"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    })
      .split("\n")
      .filter(Boolean);
  } catch {
    return [];
  }
};

const trackedFiles = getTrackedFiles();

const envFiles = trackedFiles.filter((filePath) => {
  const basename = path.basename(filePath);
  return basename.startsWith(".env") && basename !== ".env.example";
});

if (envFiles.length > 0) {
  fail(`Only .env.example may be committed. Remove: ${formatList(envFiles)}.`);
}

const fontFiles = trackedFiles.filter((filePath) => /\.(ttf|otf|woff|woff2)$/i.test(filePath));
if (fontFiles.length > 0) {
  fail(`Committed font binaries need explicit approval/licensing: ${formatList(fontFiles)}.`);
}

const readTextFile = (filePath) => readFileSync(filePath, "utf8");

const walkFiles = (rootPath, files = []) => {
  if (!existsSync(rootPath)) return files;

  for (const entry of readdirSync(rootPath)) {
    if ([".git", ".next", "node_modules"].includes(entry)) continue;
    const entryPath = path.join(rootPath, entry);
    const stats = statSync(entryPath);

    if (stats.isDirectory()) {
      walkFiles(entryPath, files);
    } else {
      files.push(entryPath);
    }
  }

  return files;
};

const sourceRoots = [
  "apps/www/src/app",
  "apps/www/src/components",
  "apps/www/src/content",
  "apps/www/src/data",
  "apps/www/src/lib",
  "apps/www/mdx-components.tsx"
];

const textExtensions = new Set([".css", ".js", ".jsx", ".json", ".md", ".mdx", ".ts", ".tsx"]);
const todoAllowlist = new Set(["apps/www/src/data/contact.ts"]);
const todoMatches = [];

for (const root of sourceRoots) {
  const rootPath = path.join(repoRoot, root);
  const files = statSafe(rootPath)?.isDirectory() ? walkFiles(rootPath) : [rootPath];

  for (const filePath of files) {
    const repoPath = toRepoPath(filePath);
    if (todoAllowlist.has(repoPath)) continue;
    if (!textExtensions.has(path.extname(filePath))) continue;

    const contents = readTextFile(filePath);
    if (contents.includes("TODO: Jamie approval required")) {
      todoMatches.push(repoPath);
    }
  }
}

if (todoMatches.length > 0) {
  fail(`Production-facing source still contains approval TODOs: ${formatList(todoMatches)}.`);
}

const buildRoots = ["apps/www/.next", ".next"].map((root) => path.join(repoRoot, root));
const buildTodoMatches = [];
const buildStagingMatches = [];
const renderedBuildExtensions = new Set([".html", ".rsc", ".txt", ".xml"]);

for (const rootPath of buildRoots) {
  for (const filePath of walkFiles(rootPath)) {
    if (!renderedBuildExtensions.has(path.extname(filePath))) {
      continue;
    }

    const contents = readTextFile(filePath);
    if (contents.includes("TODO: Jamie approval required")) {
      buildTodoMatches.push(toRepoPath(filePath));
    }

    if (
      contents.includes("Staging preview - not final publication.") ||
      contents.includes("https://staging.jamieburk.art")
    ) {
      buildStagingMatches.push(toRepoPath(filePath));
    }
  }
}

if (buildTodoMatches.length > 0) {
  fail(`Production build output contains approval TODOs: ${formatList(buildTodoMatches)}.`);
}

if (buildStagingMatches.length > 0) {
  fail(
    `Production build output contains staging markers. Rebuild with production env: ${formatList(
      buildStagingMatches
    )}.`
  );
}

const resumePdfPath =
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
const resumeAbsolutePath = path.join(repoRoot, resumePdfPath);

if (!existsSync(resumeAbsolutePath)) {
  fail(`Resume PDF is missing: ${resumePdfPath}.`);
} else {
  const resumeText = readFileSync(resumeAbsolutePath).toString("latin1").toLowerCase();
  const placeholderNeedles = [
    "placeholder resume pdf",
    "replace with approved current resume before launch"
  ];

  if (placeholderNeedles.some((needle) => resumeText.includes(needle))) {
    fail("Resume PDF still contains placeholder launch-blocker text.");
  }
}

if (failures.length > 0) {
  console.error("Production preflight failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Production preflight passed.");

function statSafe(filePath) {
  try {
    return statSync(filePath);
  } catch {
    return null;
  }
}
