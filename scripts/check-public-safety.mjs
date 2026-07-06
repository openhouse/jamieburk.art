#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const allowlistPath = path.join(root, "scripts/public-safety-allowlist.json");
const textExtensions = new Set([
  ".css",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mdx",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".yml",
  ".yaml"
]);

const appEnv =
  process.env.APP_ENV ??
  process.env.SITE_ENV ??
  process.env.NEXT_PUBLIC_DEPLOY_ENV ??
  "development";
const siteUrl = stripTrailingSlash(
  process.env.SITE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (appEnv === "production"
      ? "https://jamieburk.art"
      : "https://staging.jamieburk.art")
);
const productionLike =
  appEnv === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production";

const findings = [];
const warnings = [];
const allowlist = readAllowlist();

function stripTrailingSlash(value) {
  return value.replace(/\/$/, "");
}

function readAllowlist() {
  if (!existsSync(allowlistPath)) return [];
  try {
    const entries = JSON.parse(readFileSync(allowlistPath, "utf8"));
    return Array.isArray(entries) ? entries : [];
  } catch (error) {
    findings.push({
      file: "scripts/public-safety-allowlist.json",
      label: "Invalid public-safety allowlist JSON",
      detail: error.message
    });
    return [];
  }
}

function isAllowed(file, label, text) {
  return allowlist.some((entry) => {
    if (entry.file && entry.file !== file) return false;
    if (entry.label && entry.label !== label) return false;
    if (entry.pattern) {
      try {
        return new RegExp(entry.pattern).test(text);
      } catch {
        return text.includes(entry.pattern);
      }
    }
    return false;
  });
}

function addFinding(file, label, detail, text = "") {
  if (isAllowed(file, label, text)) return;
  findings.push({ file, label, detail });
}

function addWarning(file, label, detail, text = "") {
  if (isAllowed(file, label, text)) return;
  warnings.push({ file, label, detail });
}

function gitLsFiles() {
  return execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], {
    cwd: root,
    encoding: "utf8"
  })
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function readText(file) {
  return readFileSync(path.join(root, file), "utf8");
}

function canReadAsText(file) {
  return textExtensions.has(path.extname(file));
}

function commandOutput(command, args) {
  try {
    return execFileSync(command, args, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    return "";
  }
}

const trackedFiles = gitLsFiles();

for (const file of trackedFiles) {
  const normalized = file.replaceAll("\\", "/");

  if (/^(\.agents|\.codex)\//.test(normalized)) {
    continue;
  }

  if (/^\.env($|\.)/.test(normalized) && normalized !== ".env.example") {
    addFinding(file, "Tracked env file", "Only .env.example may be tracked.");
  }

  if (
    /(^|\/)(private|archive-private|raw|transcripts-private|client-private|legal-review|support-materials-private)(\/|$)/i.test(
      normalized
    )
  ) {
    addFinding(file, "Tracked private source path", "Private source paths must stay outside git and Docker context.");
  }

  if (/\.(ttf|otf|woff|woff2)$/i.test(normalized)) {
    addFinding(file, "Tracked font file", "Private, proprietary, or unlicensed font files must not be committed.");
  }

  if (canReadAsText(file)) {
    const text = readText(file);

    const secretPatterns = [
      ["OpenAI API key", /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/],
      ["Private key block", /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/],
      ["Credential assignment", /\b(?:api[_-]?key|secret|token|password)\s*[:=]\s*["'][^"']{8,}["']/i]
    ];

    for (const [label, pattern] of secretPatterns) {
      if (pattern.test(text)) {
        addFinding(file, label, "Credential-looking content must not be tracked.", text);
      }
    }

    if (/\/Volumes\/16TB_SSD\/Work\/Jamie\/Portfolio\/supporting-materials/i.test(text)) {
      addFinding(file, "Private supporting-materials path", "Private local source paths must not ship in public source.", text);
    }

    if (/\/Users\/jburkart\/Library\/Mobile Documents/i.test(text)) {
      addFinding(file, "Private iCloud local path", "Private local source paths must not ship in public source.", text);
    }

    if (/^(apps\/www\/src|apps\/www\/public)\//.test(file)) {
      const publicBlockers = [
        ["Visible approval TODO", /TODO: Jamie approval required/i],
        ["Public contact placeholder", /Public email pending confirmation|LinkedIn pending|GitHub pending/i],
        ["Raw transcript marker", /\b(?:raw transcript|Otter transcript|otter\.ai transcript)\b/i],
        ["Private source marker", /\b(?:CONFIDENTIAL|client-private)\b/i],
        ["Private font reference", /Trade Gothic|Verlag|Gotham Rounded|maria-extra-bold/i]
      ];

      for (const [label, pattern] of publicBlockers) {
        if (pattern.test(text)) {
          const report = productionLike ? addFinding : addWarning;
          report(file, label, "Public app/source content needs review before production.", text);
        }
      }
    }

    if (file === "apps/www/src/data/work.ts") {
      const workBlockers = [
        ["Private work visibility", /visibility:\s*"private"/],
        ["Draft work status", /status:\s*"Draft"/],
        ["Unapproved work item", /approval:\s*"(?:needs-review|staging-only|do-not-publish)"/]
      ];

      for (const [label, pattern] of workBlockers) {
        if (pattern.test(text)) {
          addFinding(file, label, "Production may not publish private, draft, or unapproved work items.", text);
        }
      }
    }
  }
}

const resumePdf = "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";
if (!existsSync(path.join(root, resumePdf))) {
  addFinding(resumePdf, "Missing resume PDF", "The public resume PDF path must exist.");
} else {
  const pdfText = commandOutput("pdftotext", [resumePdf, "-"]);
  const pdfInfo = commandOutput("pdfinfo", [resumePdf]);
  const fallbackPdfText = pdfText || readFileSync(path.join(root, resumePdf)).toString("latin1");

  if (/Placeholder resume PDF|Replace with approved current resume/i.test(fallbackPdfText)) {
    addFinding(resumePdf, "Placeholder resume PDF", "Replace the placeholder resume before production.");
  }

  if (!/Pages:\s+2\b/.test(pdfInfo)) {
    addWarning(resumePdf, "Unexpected resume page count", "Expected the approved two-page resume PDF.");
  }

  if (!/Tagged:\s+yes\b/i.test(pdfInfo)) {
    addWarning(resumePdf, "Resume PDF not tagged", "The approved candidate PDF is tagged; verify accessibility if this changes.");
  }
}

const siteUrlSource = readText("apps/www/src/lib/site-url.ts");
if (!/NEXT_PUBLIC_ROBOTS_POLICY\s*===\s*"index"/.test(siteUrlSource)) {
  addFinding(
    "apps/www/src/lib/site-url.ts",
    "Unsafe robots policy",
    "Production indexing must require NEXT_PUBLIC_ROBOTS_POLICY=index."
  );
}

if (productionLike) {
  if (appEnv !== "production") {
    addFinding("environment", "Production env mismatch", "APP_ENV must be production for production checks.");
  }
  if (siteUrl !== "https://jamieburk.art") {
    addFinding("environment", "Production URL mismatch", "Production SITE_URL/NEXT_PUBLIC_SITE_URL must be https://jamieburk.art.");
  }
  if (process.env.NEXT_PUBLIC_ROBOTS_POLICY !== "index") {
    addFinding("environment", "Production indexing not explicit", "Production requires NEXT_PUBLIC_ROBOTS_POLICY=index.");
  }
}

const nextConfig = readText("apps/www/next.config.ts");
const requiredRedirects = [
  "/work/fairrentnyc-commercial-rent-stabilization",
  "/work/fairrentnyc",
  "/work/nyc-artist-coalition-fair-rent",
  "/work/196-artists-residency",
  "/work/source-backed-team-memory"
];
for (const route of requiredRedirects) {
  if (!nextConfig.includes(route)) {
    addFinding("apps/www/next.config.ts", "Missing canonical redirect", `Missing redirect source ${route}.`);
  }
}

const sitemap = readText("apps/www/src/app/sitemap.ts");
if (/resumePath|\.pdf|source-backed-team-memory.*\/work\//i.test(sitemap)) {
  addFinding("apps/www/src/app/sitemap.ts", "Sitemap includes noncanonical asset", "Sitemap must exclude the resume PDF and /work/source-backed-team-memory.");
}

if (warnings.length) {
  console.log("Public-safety warnings:");
  for (const warning of warnings) {
    console.log(`- ${warning.file}: ${warning.label} - ${warning.detail}`);
  }
}

if (findings.length) {
  console.error("Public-safety blockers:");
  for (const finding of findings) {
    console.error(`- ${finding.file}: ${finding.label} - ${finding.detail}`);
  }
  process.exit(1);
}

console.log(
  `Public-safety check passed (${productionLike ? "production" : appEnv}; ${trackedFiles.length} tracked files scanned).`
);
