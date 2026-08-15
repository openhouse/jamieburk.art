#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const failures = [];
const warnings = [];

const ignoredDirs = new Set([
  ".git",
  ".next",
  ".turbo",
  "coverage",
  "dist",
  "node_modules"
]);

const textExtensions = new Set([
  ".css",
  ".example",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mdx",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml"
]);

const privatePathPattern =
  /(^|\/)(private|archive-private|raw|raw-otter|transcripts-private|client-private|legal-review|support-private|support-materials-private|job-hunt-private|screenshots-private|private-screenshots|resume-private|resumes-private|supporting-materials)(\/|$)/i;
const fontExtensions = new Set([".eot", ".otf", ".ttf", ".woff", ".woff2"]);
const approvedFontFiles = new Map([
  [
    "apps/www/public/fonts/tex-gyre-pagella/texgyrepagella-regular.otf",
    "44e64260716d8f2bbe412baa1ee99b7c995190ac4573177c24def0b9200438c7"
  ],
  [
    "apps/www/public/fonts/karla/Karla-Regular.ttf",
    "1a4e409e44eb3c3c541cac5e885219bd66d43262214186634f5811449100a090"
  ],
  [
    "apps/www/public/fonts/karla/Karla-Bold.ttf",
    "aea96b84cfc4265c73b56caa9cb205d63bebfb26cb15ccccf0f237530cf8d231"
  ]
]);
const requiredFontSupportFiles = new Map([
  [
    "apps/www/public/fonts/tex-gyre-pagella/GUST-FONT-LICENSE.txt",
    "2bd69affc3da00715116f713f57eab9707e96daf3562ad0215987b15b9c16f73"
  ],
  [
    "apps/www/public/fonts/tex-gyre-pagella/README-TeX-Gyre-Pagella.txt",
    "6fc4c72a8754f7e04ffbbec99167a568c0a3d21e231318ed624b58ddfeb1f896"
  ],
  [
    "apps/www/public/fonts/tex-gyre-pagella/MANIFEST-TeX-Gyre-Pagella.txt",
    "6ac4bc1448a1d71a3a7ad5fd13566f00855b37ca4db5b20451c88806ac3f5242"
  ],
  [
    "apps/www/public/fonts/karla/OFL.txt",
    "edf2c840acb9570fe02f40721126aa0da4e4011a0030cc6dce30780569f609b6"
  ],
  [
    "apps/www/public/fonts/karla/METADATA.pb",
    "6bf0bf977bd80e6d6655a302450bd4fc566857b577f056db4d8d054bbc7c67dd"
  ],
  [
    "apps/www/public/fonts/karla/upstream_info.md",
    "efdf6f9407c52a5c425117ee5d19dfe2400f072e516f9bfc047442b7bf453c57"
  ]
]);

const isProduction =
  process.env.APP_ENV === "production" ||
  process.env.SITE_ENV === "production" ||
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production" ||
  process.env.NODE_ENV === "production";

const resumePath = path.join(
  repoRoot,
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"
);

function walk(dir) {
  if (!existsSync(dir)) return [];

  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) files.push(...walk(absolute));
      continue;
    }

    if (entry.isFile()) files.push(absolute);
  }

  return files;
}

function relative(file) {
  return path.relative(repoRoot, file);
}

function addFailure(file, message, line) {
  failures.push(`${relative(file)}${line ? `:${line}` : ""} - ${message}`);
}

function addWarning(file, message, line) {
  warnings.push(`${relative(file)}${line ? `:${line}` : ""} - ${message}`);
}

function lineForMatch(content, index) {
  return content.slice(0, index).split("\n").length;
}

function readText(file) {
  return readFileSync(file, "utf8");
}

function sha256(file) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

function scanPattern(files, label, pattern, severity = "failure") {
  for (const file of files) {
    const content = readText(file);
    const match = pattern.exec(content);

    if (match?.index !== undefined) {
      const line = lineForMatch(content, match.index);
      if (severity === "warning") addWarning(file, label, line);
      else addFailure(file, label, line);
    }
  }
}

function pdftotext(file) {
  try {
    return execFileSync("pdftotext", [file, "-"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    addWarning(file, "pdftotext unavailable or failed; using binary string fallback");
    return readFileSync(file).toString("latin1");
  }
}

try {
  execFileSync(process.execPath, [path.join(repoRoot, "scripts/check-knowledge-bank.mjs")], {
    cwd: repoRoot,
    stdio: "inherit"
  });
} catch {
  failures.push("scripts/check-knowledge-bank.mjs - knowledge-bank gate failed");
}

try {
  execFileSync(process.execPath, [path.join(repoRoot, "scripts/sourcebook/check.mjs")], {
    cwd: repoRoot,
    stdio: "inherit"
  });
} catch {
  failures.push("scripts/sourcebook/check.mjs - Sourcebook public-boundary gate failed");
}

const allFiles = walk(repoRoot);
const textFiles = allFiles.filter((file) => textExtensions.has(path.extname(file)));
const shippedTextFiles = textFiles.filter((file) => {
  const rel = relative(file);
  return (
    rel.startsWith("apps/www/src/") ||
    rel.startsWith("apps/www/public/") ||
    rel === "apps/www/next.config.ts" ||
    rel === "apps/www/mdx-components.tsx" ||
    rel === "Dockerfile"
  );
});

const scannerFiles = new Set([
  path.join(repoRoot, "scripts/check-public-safety.mjs"),
  path.join(repoRoot, "scripts/check-knowledge-bank.mjs")
]);
const shippedContentFiles = shippedTextFiles.filter((file) => !scannerFiles.has(file));
const publicContentFiles = shippedContentFiles.filter((file) => {
  return relative(file) !== "apps/www/src/data/proofs.ts";
});
const publicKnowledgeTranscriptIndexes = textFiles.filter((file) => {
  const rel = relative(file);
  return (
    rel.startsWith("docs/knowledge-bank/data/public-hearing-speakers/") ||
    rel ===
      "docs/knowledge-bank/data/hearing-heteroglossia-corpus-2026-07-28.json" ||
    rel.startsWith("docs/knowledge-bank/testimony/heteroglossia/") ||
    rel.startsWith(
      "docs/knowledge-bank/testimony/commercial-rent-public-support/"
    )
  );
});
const publishedEvaluationEvidence = textFiles.filter((file) => {
  const rel = relative(file);
  return (
    rel.startsWith("docs/evals/runs/") ||
    rel.startsWith("docs/qa/")
  );
});

for (const file of allFiles) {
  const rel = relative(file);
  const base = path.basename(file);
  const ext = path.extname(file).toLowerCase();

  if (base.startsWith(".env") && base !== ".env.example") {
    addFailure(file, "environment file must not be committed");
  }

  if (fontExtensions.has(ext)) {
    const expectedHash = approvedFontFiles.get(rel);
    if (!expectedHash) {
      addFailure(file, "font file is not on the approved public-license allowlist");
    } else if (sha256(file) !== expectedHash) {
      addFailure(file, "approved font file checksum does not match its reviewed asset");
    }
  }

  if (privatePathPattern.test(rel) || /\.private\./i.test(rel)) {
    addFailure(file, "private/source-material path must not be committed");
  }

  if (
    rel.startsWith(
      "docs/knowledge-bank/data/public-hearing-transcripts/"
    )
  ) {
    addFailure(
      file,
      "raw public-hearing transcript derivative must remain outside public Git"
    );
  }

  if (/\.(key|pem|p12|crt|cer)$/i.test(rel)) {
    addFailure(file, "key or certificate material must not be committed");
  }
}

for (const [rel, expectedHash] of requiredFontSupportFiles) {
  const file = path.join(repoRoot, rel);
  if (!existsSync(file)) {
    failures.push(`${rel} - approved font license or provenance file is missing`);
  } else if (sha256(file) !== expectedHash) {
    addFailure(file, "approved font license or provenance checksum does not match");
  }
}

scanPattern(
  shippedContentFiles,
  "production-facing approval marker requires resolution before launch",
  /TODO:\s*Jamie approval required/i
);

scanPattern(
  shippedContentFiles,
  "placeholder text appears in production-facing content",
  /\b(?:Placeholder resume PDF|Replace with approved current resume|lorem ipsum|replace this)\b/i
);

scanPattern(
  publicContentFiles,
  "raw/private transcript exposure appears in production-facing content",
  /\b(?:otter(?:\.ai|_ai)?|raw\s+(?:meeting\s+)?transcripts?|private\s+transcript\s+excerpt|corrected[_ -]?(?:working[_ -]?)?transcripts?|repaired[_ -]?transcripts?)\b/i
);

scanPattern(
  publicKnowledgeTranscriptIndexes,
  "public Knowledge Wiki transcript index contains republished raw speech",
  /(?:"text"\s*:|^#{2,4}\s+Transcript(?:\s+turns)?\s*$)/im
);

scanPattern(
  publishedEvaluationEvidence,
  "published evaluation evidence contains a private local filesystem locator",
  /(?:\/private\/tmp\/|\/Users\/|\/Volumes\/)/i
);

scanPattern(
  publishedEvaluationEvidence,
  "published evaluation evidence contains a raw internal process identifier",
  /"processSession(?:Id|Digest)"\s*:/i
);

scanPattern(
  shippedContentFiles,
  "all-caps private/confidential marker appears in production-facing content",
  /\b(?:PRIVATE|CONFIDENTIAL)\b/
);

const credentialPatterns = [
  ["OpenAI or secret key", /\b(?:sk-proj-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16})\b/],
  ["Private key block", /-----BEGIN (?:RSA |OPENSSH |EC |DSA )?PRIVATE KEY-----/],
  ["Bearer token", /\bbearer\s+[A-Za-z0-9._-]{20,}/i],
  ["Secret assignment", /\b(?:api[_-]?key|secret|password)\s*[:=]\s*["'][^"'\n]{12,}["']/i],
  ["Token assignment", /\b(?:auth|access|refresh|session)[_-]?token\s*[:=]\s*["'][^"'\n]{12,}["']/i]
];

for (const file of textFiles.filter((item) => !scannerFiles.has(item))) {
  const content = readText(file);
  for (const [label, pattern] of credentialPatterns) {
    const match = pattern.exec(content);
    if (match?.index !== undefined) {
      addFailure(file, label, lineForMatch(content, match.index));
    }
  }
}

const siteDataPath = path.join(repoRoot, "apps/www/src/data/site.ts");
let siteHasDefaultContactEmail = false;
if (existsSync(siteDataPath)) {
  const siteData = readText(siteDataPath);

  if (/Public email pending confirmation|LinkedIn pending|GitHub pending/i.test(siteData)) {
    addFailure(siteDataPath, "unapproved public contact placeholder appears in site data");
  }

  siteHasDefaultContactEmail = /jamie\.burkart@gmail\.com/.test(siteData);
}

if (!existsSync(resumePath)) {
  failures.push(
    "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf - approved resume PDF is missing"
  );
} else {
  const stats = statSync(resumePath);

  if (stats.size < 10_000) {
    addFailure(resumePath, "resume PDF is unexpectedly small");
  }

  const resumeText = pdftotext(resumePath);
  if (!/Jamie\s+Burkart/i.test(resumeText)) {
    addFailure(resumePath, "resume PDF text does not include Jamie Burkart");
  }

  if (!/Technical Project Manager/i.test(resumeText)) {
    addFailure(resumePath, "resume PDF text does not include the target role");
  }

  if (/\b(?:TODO|Placeholder resume PDF|lorem ipsum|replace this)\b/i.test(resumeText)) {
    addFailure(resumePath, "resume PDF contains placeholder or TODO text");
  }

  if (/first civic-data hackathon|first civic-tech hackathon/i.test(resumeText)) {
    addFailure(resumePath, "resume PDF contains retired CallNYC hackathon wording");
  }

  if (
    !/CallNYC\.org as an independent follow-on to the New York City\s+Council['’]s first CouncilStat hackathon/i.test(
      resumeText
    )
  ) {
    addFailure(resumePath, "resume PDF is missing the approved CallNYC projection");
  }

  if (
    isProduction &&
    !process.env.NEXT_PUBLIC_CONTACT_EMAIL &&
    !siteHasDefaultContactEmail &&
    !/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/.test(resumeText)
  ) {
    addFailure(resumePath, "production contact email env is unset and resume PDF does not expose a contact email");
  } else if (isProduction && !process.env.NEXT_PUBLIC_CONTACT_EMAIL && !siteHasDefaultContactEmail) {
    addWarning(resumePath, "production contact email env is unset; contact page relies on resume PDF");
  }
}

const siteUrlPath = path.join(repoRoot, "apps/www/src/lib/site-url.ts");
const nextConfigPath = path.join(repoRoot, "apps/www/next.config.ts");
const siteUrlSource = existsSync(siteUrlPath) ? readText(siteUrlPath) : "";
const nextConfigSource = existsSync(nextConfigPath) ? readText(nextConfigPath) : "";

if (/NEXT_PUBLIC_ROBOTS_POLICY\s*!==\s*["']noindex["']/.test(siteUrlSource + nextConfigSource)) {
  addFailure(siteUrlPath, "robots policy is permissive by default");
}

if (!/NEXT_PUBLIC_ROBOTS_POLICY\s*===\s*["']index["']/.test(siteUrlSource + nextConfigSource)) {
  addFailure(siteUrlPath, "production indexing is not explicit opt-in");
}

const resumePdfRoute = "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";

if (!nextConfigSource.includes(`source: "${resumePdfRoute}"`) || !/X-Robots-Tag/.test(nextConfigSource)) {
  addFailure(nextConfigPath, "resume PDF noindex header is missing");
}

if (nextConfigSource.includes('source: "/resume/:path*"')) {
  addFailure(nextConfigPath, "resume HTML route must remain eligible for indexing");
}

if (isProduction && process.env.NEXT_PUBLIC_ROBOTS_POLICY !== "index") {
  failures.push(
    `production env requires NEXT_PUBLIC_ROBOTS_POLICY=index (got ${process.env.NEXT_PUBLIC_ROBOTS_POLICY ?? "unset"})`
  );
}

if (warnings.length) {
  console.warn("Public-safety warnings:");
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (failures.length) {
  console.error("Public-safety check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Public-safety check passed${warnings.length ? ` with ${warnings.length} warning(s)` : ""}.`
);
