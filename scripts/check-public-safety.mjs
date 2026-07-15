#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  findWowlistFacebookPublicArtifactRisk,
  hasWowlistFacebookPublicArtifactRisk
} from "./lib/wowlist-facebook-guard.mjs";
import {
  findNycartcFacebookPublicArtifactRisk,
  hasNycartcFacebookPublicArtifactRisk
} from "./lib/nycartc-facebook-guard.mjs";
import {
  findKcSpacesFundFacebookPublicArtifactRisk,
  hasKcSpacesFundFacebookPublicArtifactRisk
} from "./lib/kcspacesfund-facebook-guard.mjs";
import { nycartcFacebookPostsBatch } from "../apps/www/src/data/knowledge-bank/nycartc-facebook-posts-batch-2026-07-14.ts";
import { kcSpacesFundFacebookPostsBatch } from "../apps/www/src/data/knowledge-bank/kcspacesfund-facebook-posts-batch-2026-07-14.ts";

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
const publicSocialLedgerFiles = textFiles.filter((file) =>
  /^docs\/knowledge-bank\/data\/(?:nycartc|callnyc|wowlist|kctownhall|urbanhermit)-public-.*\.json$/i.test(
    relative(file)
  )
);
const urbanHermitPublicLedgerFiles = publicSocialLedgerFiles.filter((file) =>
  /urbanhermit-public-.*\.json$/i.test(relative(file))
);
const nycartcFacebookEventLedgerFiles = publicSocialLedgerFiles.filter((file) =>
  /nycartc-public-facebook-event.*\.json$/i.test(relative(file))
);
const wowlistFacebookPostLedgerFiles = publicSocialLedgerFiles.filter((file) =>
  /wowlist-public-facebook-post-ledger\.json$/i.test(relative(file))
);
const wowlistFacebookArtifactFiles = textFiles.filter((file) =>
  /(?:apps\/www\/src\/data\/knowledge-bank\/wowlist-facebook-posts-batch-2026-07-14\.ts|docs\/knowledge-bank\/(?:data\/wowlist-public-facebook-post-ledger\.json|projects\/wowlist-facebook-post-population-2026-07-14\.md))$/i.test(
    relative(file)
  )
);
const nycartcFacebookPostArtifactFiles = textFiles.filter((file) =>
  /docs\/knowledge-bank\/(?:data\/nycartc-public-facebook-post(?:-route)?-ledger\.json|projects\/nycartc-facebook-post-population-2026-07-14\.md)$/i.test(
    relative(file)
  )
);
const nycartcFacebookPostGovernanceFiles = textFiles.filter((file) =>
  /(?:apps\/www\/src\/data\/knowledge-bank\/nycartc-facebook-posts-batch-2026-07-14\.ts|docs\/knowledge-bank\/(?:data\/nycartc-public-facebook-post(?:-route)?-ledger\.json|projects\/nycartc-facebook-post-population-2026-07-14\.md))$/i.test(
    relative(file)
  )
);
const nycartcFacebookPostLedgerFiles = textFiles.filter((file) =>
  /docs\/knowledge-bank\/data\/nycartc-public-facebook-post-ledger\.json$/i.test(
    relative(file)
  )
);
const kcSpacesFundFacebookArtifactFiles = textFiles.filter((file) =>
  /(?:apps\/www\/src\/data\/knowledge-bank\/kcspacesfund-facebook-posts-batch-2026-07-14\.ts|docs\/knowledge-bank\/(?:data\/kcspacesfund-facebook-post(?:-route)?-ledger\.json|research\/kcspacesfund-facebook-posts-2026-07-14\.md))$/i.test(
    relative(file)
  )
);
const kcSpacesFundFacebookLedgerFiles = textFiles.filter((file) =>
  /docs\/knowledge-bank\/data\/kcspacesfund-facebook-post-ledger\.json$/i.test(
    relative(file)
  )
);

for (const file of allFiles) {
  const rel = relative(file);
  const base = path.basename(file);
  const ext = path.extname(file).toLowerCase();

  if (base.startsWith(".env") && base !== ".env.example") {
    addFailure(file, "environment file must not be committed");
  }

  if (fontExtensions.has(ext)) {
    addFailure(file, "font file must not be committed or served from the repo");
  }

  if (privatePathPattern.test(rel) || /\.private\./i.test(rel)) {
    addFailure(file, "private/source-material path must not be committed");
  }

  if (/\.(key|pem|p12|crt|cer)$/i.test(rel)) {
    addFailure(file, "key or certificate material must not be committed");
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
  shippedContentFiles,
  "all-caps private/confidential marker appears in production-facing content",
  /\b(?:PRIVATE|CONFIDENTIAL)\b/
);

scanPattern(
  publicSocialLedgerFiles,
  "public social ledger exposes raw outbound-link or mutable-metric fields",
  /"(?:outboundLinks|visibleMetricsObserved2026)"\s*:/
);

scanPattern(
  urbanHermitPublicLedgerFiles,
  "personal social ledger exposes raw post, author, URL, date, or per-record metric fields",
  /"(?:statusId|statusUrl|fullText|authorHandle|postedAt|publishedAt|exactDate|visibleMetricsObserved2026)"\s*:/i
);

scanPattern(
  nycartcFacebookEventLedgerFiles,
  "public Facebook event ledger exposes raw participant, description, private-metric, meeting-access, or account-admin fields",
  /"(?:detailsText|fullText|guestIdentities|attendeeIdentities|friendContext|inviteContext|comments|reactions|profileUrl|email|phone|meetingUrl|zoomUrl|passcode|dialIn|accountAdmin|workingDocumentUrl|privateAnalytics)"\s*:/i
);

scanPattern(
  wowlistFacebookPostLedgerFiles,
  "public WOW List Facebook post ledger exposes raw capture, comment, private-metric, or account-admin fields",
  /"(?:messages|profiles|labels|buttons|comments|commentText|commenterIdentity|fullText|rawText|privateAnalytics|accountAdmin|authenticatedAccount)"\s*:/i
);

for (const file of wowlistFacebookArtifactFiles) {
  const risk = findWowlistFacebookPublicArtifactRisk(readText(file));
  if (risk) addFailure(file, `WOW List Facebook public artifact contains ${risk}`);
}

for (const file of nycartcFacebookPostArtifactFiles) {
  const risk = findNycartcFacebookPublicArtifactRisk(readText(file));
  if (risk) addFailure(file, `NYC Artist Coalition Facebook public artifact contains ${risk}`);
}

for (const file of kcSpacesFundFacebookArtifactFiles) {
  const risk = findKcSpacesFundFacebookPublicArtifactRisk(readText(file));
  if (risk) addFailure(file, `KC Spaces Fund Facebook public artifact contains ${risk}`);
}

scanPattern(
  kcSpacesFundFacebookLedgerFiles,
  "KC Spaces Fund Facebook ledger exposes raw text, identity, URL, per-record metric, or account-state fields",
  /"(?:rawText|fullText|message|commentText|commenterIdentity|actorIdentity|publisherIdentity|publicLocator|postUrl|statusUrl|reactionCount|commentCount|shareCount|accountState|authenticatedAccount|privateAnalytics)"\s*:/i
);

const nycartcTypedSemanticStatements = [
  ...nycartcFacebookPostsBatch.intakeRecords.flatMap((record) => [
    record.publicSummary
  ]),
  ...nycartcFacebookPostsBatch.sources.flatMap((source) => [
    source.publicCitation,
    source.publicNote,
    ...source.supportsGenerally
  ]),
  ...nycartcFacebookPostsBatch.claims.flatMap((claim) => [
    claim.internalClaim,
    ...claim.projections.map((projection) => projection.text),
    ...claim.evidence.flatMap((evidence) => evidence.supports),
    ...claim.boundaries
  ]),
  ...nycartcFacebookPostsBatch.researchInquiries.flatMap((inquiry) => [
    inquiry.publicSummary,
    ...inquiry.findings
  ])
].filter(Boolean);

for (const statement of nycartcTypedSemanticStatements) {
  const risk = findNycartcFacebookPublicArtifactRisk(statement);
  if (risk) {
    addFailure(
      path.join(
        repoRoot,
        "apps/www/src/data/knowledge-bank/nycartc-facebook-posts-batch-2026-07-14.ts"
      ),
      `NYC Artist Coalition Facebook typed knowledge-bank record contains ${risk}: ${statement.slice(0, 120)}`
    );
  }
}

const kcSpacesFundFacebookTypedSemanticStatements = [
  ...kcSpacesFundFacebookPostsBatch.intakeRecords.flatMap((record) => [
    record.publicSummary,
    ...record.nextActions
  ]),
  ...kcSpacesFundFacebookPostsBatch.sources.flatMap((source) => [
    source.publicCitation,
    source.publicNote,
    ...source.supportsGenerally,
    ...source.doesNotEstablish
  ]),
  ...kcSpacesFundFacebookPostsBatch.claims.flatMap((claim) => [
    claim.internalClaim,
    ...claim.projections.map((projection) => projection.text),
    ...claim.evidence.flatMap((evidence) => evidence.supports),
    ...claim.boundaries
  ]),
  ...kcSpacesFundFacebookPostsBatch.researchInquiries.flatMap((inquiry) => [
    inquiry.publicSummary,
    ...inquiry.findings,
    ...inquiry.limitations
  ])
].filter(Boolean);

for (const statement of kcSpacesFundFacebookTypedSemanticStatements) {
  const risk = findKcSpacesFundFacebookPublicArtifactRisk(statement);
  if (risk) {
    addFailure(
      path.join(
        repoRoot,
        "apps/www/src/data/knowledge-bank/kcspacesfund-facebook-posts-batch-2026-07-14.ts"
      ),
      `KC Spaces Fund Facebook typed knowledge-bank record contains ${risk}: ${statement.slice(0, 120)}`
    );
  }
}

scanPattern(
  nycartcFacebookPostGovernanceFiles,
  "NYC Artist Coalition Facebook governance artifact exposes authenticated account or management state",
  /\b(?:authenticated (?:account|session|dashboard|Meta|Page)|Meta Business Suite|signed[- ]in|logged[- ]in|current account access|current Page-management controls?|current administrator|task access)\b/i
);

scanPattern(
  nycartcFacebookPostLedgerFiles,
  "NYC Artist Coalition Facebook population ledger exposes record-level text, URL, metric, identity, or account-state fields",
  /"(?:postUrl|statusUrl|publicUrl|rawText|fullText|message|actorIdentity|publisherIdentity|accountState|privateAnalytics)"\s*:/i
);

const wowlistPinnedArtifacts = [
  "docs/knowledge-bank/data/wowlist-public-facebook-post-ledger.json",
  "docs/knowledge-bank/projects/wowlist-facebook-post-population-2026-07-14.md"
];
const wowlistBatchSourcePath = path.join(
  repoRoot,
  "apps/www/src/data/knowledge-bank/wowlist-facebook-posts-batch-2026-07-14.ts"
);
if (existsSync(wowlistBatchSourcePath)) {
  const batchSource = readText(wowlistBatchSourcePath);
  for (const artifactPath of wowlistPinnedArtifacts) {
    const escapedPath = artifactPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pinnedUrlPattern = new RegExp(
      `https://github\\.com/openhouse/jamieburk\\.art/blob/([0-9a-f]{40})/${escapedPath}`
    );
    const match = batchSource.match(pinnedUrlPattern);
    if (!match) {
      addFailure(wowlistBatchSourcePath, `WOW List public artifact lacks an immutable Git citation: ${artifactPath}`);
      continue;
    }

    const commit = match[1];
    try {
      execFileSync("git", ["merge-base", "--is-ancestor", commit, "HEAD"], {
        cwd: repoRoot,
        stdio: "ignore"
      });
      const pinnedText = execFileSync("git", ["show", `${commit}:${artifactPath}`], {
        cwd: repoRoot,
        encoding: "utf8"
      });
      const currentPath = path.join(repoRoot, artifactPath);
      if (pinnedText !== readText(currentPath)) {
        addFailure(currentPath, "WOW List immutable citation does not match the current public-safe artifact");
      }
      if (hasWowlistFacebookPublicArtifactRisk(pinnedText)) {
        addFailure(currentPath, "WOW List immutable citation contains prohibited account-state or participation wording");
      }
    } catch {
      addFailure(wowlistBatchSourcePath, `WOW List immutable citation is not reachable from HEAD: ${commit}:${artifactPath}`);
    }
  }
}

const nycartcFacebookPinnedArtifacts = [
  "docs/knowledge-bank/data/nycartc-public-facebook-post-ledger.json",
  "docs/knowledge-bank/data/nycartc-public-facebook-post-route-ledger.json",
  "docs/knowledge-bank/projects/nycartc-facebook-post-population-2026-07-14.md"
];
const nycartcFacebookBatchSourcePath = path.join(
  repoRoot,
  "apps/www/src/data/knowledge-bank/nycartc-facebook-posts-batch-2026-07-14.ts"
);
if (existsSync(nycartcFacebookBatchSourcePath)) {
  const batchSource = readText(nycartcFacebookBatchSourcePath);
  for (const artifactPath of nycartcFacebookPinnedArtifacts) {
    const escapedPath = artifactPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pinnedUrlPattern = new RegExp(
      `https://github\\.com/openhouse/jamieburk\\.art/blob/([0-9a-f]{40})/${escapedPath}`
    );
    const match = batchSource.match(pinnedUrlPattern);
    if (!match) {
      addFailure(
        nycartcFacebookBatchSourcePath,
        `NYC Artist Coalition Facebook public artifact lacks an immutable Git citation: ${artifactPath}`
      );
      continue;
    }

    const commit = match[1];
    try {
      execFileSync("git", ["merge-base", "--is-ancestor", commit, "HEAD"], {
        cwd: repoRoot,
        stdio: "ignore"
      });
      const pinnedText = execFileSync("git", ["show", `${commit}:${artifactPath}`], {
        cwd: repoRoot,
        encoding: "utf8"
      });
      const currentPath = path.join(repoRoot, artifactPath);
      if (pinnedText !== readText(currentPath)) {
        addFailure(
          currentPath,
          "NYC Artist Coalition Facebook immutable citation does not match the current public-safe artifact"
        );
      }
      if (hasNycartcFacebookPublicArtifactRisk(pinnedText)) {
        addFailure(
          currentPath,
          "NYC Artist Coalition Facebook immutable citation contains prohibited population, authorship, engagement, or impact wording"
        );
      }
      const originRefs = execFileSync(
        "git",
        ["for-each-ref", "--format=%(refname)", "--contains", commit, "refs/remotes/origin"],
        { cwd: repoRoot, encoding: "utf8" }
      ).trim();
      if (!originRefs) {
        addFailure(
          currentPath,
          "NYC Artist Coalition Facebook immutable citation is not reachable from a fetched origin ref"
        );
      }
    } catch {
      addFailure(
        nycartcFacebookBatchSourcePath,
        `NYC Artist Coalition Facebook immutable citation is not reachable from HEAD: ${commit}:${artifactPath}`
      );
    }
  }
}

const kcSpacesFundFacebookPinnedArtifacts = [
  "docs/knowledge-bank/data/kcspacesfund-facebook-post-ledger.json",
  "docs/knowledge-bank/data/kcspacesfund-facebook-post-route-ledger.json"
];
const kcSpacesFundFacebookBatchSourcePath = path.join(
  repoRoot,
  "apps/www/src/data/knowledge-bank/kcspacesfund-facebook-posts-batch-2026-07-14.ts"
);
if (existsSync(kcSpacesFundFacebookBatchSourcePath)) {
  const batchSource = readText(kcSpacesFundFacebookBatchSourcePath);
  for (const artifactPath of kcSpacesFundFacebookPinnedArtifacts) {
    const escapedPath = artifactPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pinnedUrlPattern = new RegExp(
      `https://github\\.com/openhouse/jamieburk\\.art/blob/([0-9a-f]{40})/${escapedPath}`
    );
    const match = batchSource.match(pinnedUrlPattern);
    if (!match) {
      addFailure(
        kcSpacesFundFacebookBatchSourcePath,
        `KC Spaces Fund Facebook public artifact lacks an immutable Git citation: ${artifactPath}`
      );
      continue;
    }

    const commit = match[1];
    try {
      execFileSync("git", ["merge-base", "--is-ancestor", commit, "HEAD"], {
        cwd: repoRoot,
        stdio: "ignore"
      });
      const pinnedText = execFileSync("git", ["show", `${commit}:${artifactPath}`], {
        cwd: repoRoot,
        encoding: "utf8"
      });
      const currentPath = path.join(repoRoot, artifactPath);
      if (pinnedText !== readText(currentPath)) {
        addFailure(
          currentPath,
          "KC Spaces Fund Facebook immutable citation does not match the current public-safe artifact"
        );
      }
      if (hasKcSpacesFundFacebookPublicArtifactRisk(pinnedText)) {
        addFailure(
          currentPath,
          "KC Spaces Fund Facebook immutable citation contains prohibited population, authorship, engagement, or impact wording"
        );
      }
    } catch {
      addFailure(
        kcSpacesFundFacebookBatchSourcePath,
        `KC Spaces Fund Facebook immutable citation is not reachable from HEAD: ${commit}:${artifactPath}`
      );
    }
  }
}

scanPattern(
  nycartcFacebookEventLedgerFiles,
  "public Facebook event ledger contains an invalid aggregate response or attendance field",
  /"(?:responseSum|totalResponses|peopleReached|attendance|uniqueResponders)"\s*:/i
);

scanPattern(
  publicSocialLedgerFiles,
  "public social ledger exposes a Google working-document or Zoom session URL",
  /https?:\\?\/\\?\/(?:docs|drive)\.google\.com|https?:\\?\/\\?\/(?:[^\/"\\\s]+\.)?zoom\.us\//i
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

if (!/\/resume\/:path\*/.test(nextConfigSource) || !/X-Robots-Tag/.test(nextConfigSource)) {
  addFailure(nextConfigPath, "resume PDF noindex header is missing");
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
