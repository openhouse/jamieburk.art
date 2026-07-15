import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { knowledgeBank } from "../apps/www/src/data/knowledge-bank/records.ts";
import {
  homepageProofs,
  proofClaims,
  resumeProofHighlights,
  technicalOperationsProofRows
} from "../apps/www/src/data/proofs.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const evalRoot = path.join(repoRoot, "evals/portfolio-system-blind-spots");
const failures = [];

function fail(message) {
  failures.push(message);
}

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function parse(relativePath) {
  try {
    return JSON.parse(read(relativePath));
  } catch (error) {
    fail(`${relativePath} is not valid JSON: ${error.message}`);
    return {};
  }
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function listSourceFiles(relativeDirectory) {
  const absoluteDirectory = path.join(repoRoot, relativeDirectory);
  return readdirSync(absoluteDirectory, { withFileTypes: true })
    .flatMap((entry) => {
      const relativePath = path.posix.join(relativeDirectory, entry.name);
      return entry.isDirectory() ? listSourceFiles(relativePath) : [relativePath];
    })
    .filter((relativePath) => /\.(?:css|json|mdx|ts|tsx)$/.test(relativePath))
    .sort();
}

function listAllFiles(relativeDirectory) {
  return readdirSync(path.join(repoRoot, relativeDirectory), { withFileTypes: true })
    .flatMap((entry) => {
      const relativePath = path.posix.join(relativeDirectory, entry.name);
      return entry.isDirectory() ? listAllFiles(relativePath) : [relativePath];
    })
    .sort();
}

function uniqueIds(records, label) {
  const ids = records.map((record) => record.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) fail(`${label} contains duplicate IDs: ${[...new Set(duplicates)].join(", ")}`);
  return new Set(ids);
}

function strictKeys(record, allowed, label, required = allowed) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    fail(`${label} must be an object`);
    return;
  }
  const extras = Object.keys(record).filter((key) => !allowed.includes(key));
  const missing = required.filter((key) => !(key in record));
  if (extras.length) fail(`${label} has unsupported fields: ${extras.join(", ")}`);
  if (missing.length) fail(`${label} lacks required fields: ${missing.join(", ")}`);
}

function requireString(value, label) {
  if (typeof value !== "string" || !value.trim()) fail(`${label} must be a non-empty string`);
}

function requireBoolean(value, label) {
  if (typeof value !== "boolean") fail(`${label} must be a boolean`);
}

function requireInteger(value, label, minimum = 0) {
  if (!Number.isInteger(value) || value < minimum) fail(`${label} must be an integer of at least ${minimum}`);
}

function requireStringArray(value, label, { allowEmpty = false } = {}) {
  if (!Array.isArray(value) || (!allowEmpty && value.length === 0) || value.some((item) => typeof item !== "string" || !item.trim())) {
    fail(`${label} must be ${allowEmpty ? "an" : "a non-empty"} array of non-empty strings`);
  }
}

function requireDate(value, label) {
  const parsed = new Date(`${value}T00:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(value ?? "") ||
    Number.isNaN(parsed.valueOf()) ||
    parsed.toISOString().slice(0, 10) !== value
  ) {
    fail(`${label} must be a valid ISO date`);
  }
}

function requireSha256(value, label) {
  if (!/^[a-f0-9]{64}$/.test(value ?? "")) fail(`${label} must be a SHA-256 digest`);
}

function requireTimestamp(value, label) {
  const parsed = new Date(value ?? "");
  if (
    typeof value !== "string" ||
    Number.isNaN(parsed.valueOf()) ||
    parsed.toISOString() !== value
  ) {
    fail(`${label} must be a canonical ISO timestamp`);
  }
}

function requireNotFutureDate(value, label) {
  requireDate(value, label);
  if (typeof value === "string" && value > new Date().toISOString().slice(0, 10)) {
    fail(`${label} must not be in the future`);
  }
}

function requireExactMap(actual, expected, label) {
  strictKeys(actual, Object.keys(expected), label);
  for (const [key, value] of Object.entries(expected)) {
    if (actual?.[key] !== value) fail(`${label}/${key} must equal ${value}`);
  }
}

function requireContainedPath(filePath, directoryPath, label) {
  const absoluteFile = path.resolve(filePath);
  const absoluteDirectory = path.resolve(directoryPath);
  const lexicalFromRepo = path.relative(repoRoot, absoluteFile);
  const lexicalFromEval = path.relative(evalRoot, absoluteFile);
  const lexicalFromDirectory = path.relative(absoluteDirectory, absoluteFile);
  if (
    lexicalFromRepo.startsWith("..") || path.isAbsolute(lexicalFromRepo) ||
    lexicalFromEval.startsWith("..") || path.isAbsolute(lexicalFromEval) ||
    lexicalFromDirectory.startsWith("..") || path.isAbsolute(lexicalFromDirectory)
  ) {
    fail(`${label} escapes its governed directory lexically`);
    return;
  }
  const realRepo = realpathSync(repoRoot);
  const realEval = realpathSync(evalRoot);
  const realEvalFromRepo = path.relative(realRepo, realEval);
  if (realEvalFromRepo.startsWith("..") || path.isAbsolute(realEvalFromRepo)) {
    fail("Blind-spot eval root escapes the repository after resolving links");
    return;
  }
  let cursor = repoRoot;
  for (const part of lexicalFromRepo.split(path.sep).filter(Boolean)) {
    cursor = path.join(cursor, part);
    if (existsSync(cursor) && lstatSync(cursor).isSymbolicLink()) {
      fail(`${label} traverses symbolic link ${path.relative(repoRoot, cursor)}`);
      return;
    }
  }
  const realDirectory = realpathSync(absoluteDirectory);
  const realDirectoryFromEval = path.relative(realEval, realDirectory);
  if (realDirectoryFromEval.startsWith("..") || path.isAbsolute(realDirectoryFromEval)) {
    fail(`${label} governed directory escapes the eval root after resolving links`);
    return;
  }
  const realFile = realpathSync(absoluteFile);
  const relative = path.relative(realDirectory, realFile);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    fail(`${label} escapes its governed directory after resolving links`);
  }
}

function stableKey(value) {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 56);
  return slug || sha256(value).slice(0, 12);
}

function mdxClaimKeys(source) {
  return source
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .flatMap((block) => {
      if (/^(?:#{1,6}\s|import\s|export\s|<Cite\b|```|\{\/\*)/.test(block)) return [];
      if (/^(?:[-*]\s|\d+\.\s)/m.test(block)) {
        return block
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => /^(?:[-*]\s|\d+\.\s)/.test(line))
          .map((line) => `mdx-list-${sha256(line).slice(0, 12)}`);
      }
      const claimId = block.match(/claimId="([^"]+)"/)?.[1];
      const occurrenceId = block.match(/occurrenceId="([^"]+)"/)?.[1];
      if (claimId) return [`mdx-claim-${stableKey(claimId)}${occurrenceId ? `-${stableKey(occurrenceId)}` : ""}`];
      return [`mdx-block-${sha256(block).slice(0, 12)}`];
    });
}

function workCaseCompositions() {
  const sourceText = read("apps/www/src/data/work.ts");
  const sourceFile = ts.createSourceFile("work.ts", sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const unwrap = (node) => {
    let current = node;
    while (current && (ts.isSatisfiesExpression(current) || ts.isAsExpression(current) || ts.isParenthesizedExpression(current))) {
      current = current.expression;
    }
    return current;
  };
  const propertyMap = (object) => new Map(object.properties.map((property) => [
    property.name?.getText(sourceFile).replace(/["'`]/g, ""),
    property
  ]));
  const arrayLength = (property) => {
    const value = unwrap(property?.initializer);
    return value && ts.isArrayLiteralExpression(value) ? value.elements.length : 0;
  };
  const arrayElements = (property) => {
    const value = unwrap(property?.initializer);
    return value && ts.isArrayLiteralExpression(value) ? [...value.elements] : [];
  };
  const literalValue = (node) => {
    const value = unwrap(node);
    return value && (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value))
      ? value.text
      : value?.getText(sourceFile) ?? "unknown";
  };
  let items;
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && node.name.getText(sourceFile) === "workItemsInput") items = unwrap(node.initializer);
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  if (!items || !ts.isArrayLiteralExpression(items)) {
    fail("Could not derive concrete work-item composition");
    return [];
  }
  return items.elements.map((element) => {
    const properties = propertyMap(element);
    const slug = properties.get("slug")?.initializer?.text;
    const artifacts = arrayLength(properties.get("artifacts"));
    const artifactTypes = arrayLength(properties.get("artifactTypes"));
    const credits = arrayLength(properties.get("credits"));
    const known = unwrap(properties.get("knownOpenProtected")?.initializer);
    const knownCount = known && ts.isObjectLiteralExpression(known) ? known.properties.length : 0;
    const requiredMetadata = ["subtitle", "summary", "role", "years", "series", "status", "visibility", "roleFit", "currentStatus"]
      .filter((key) => properties.has(key)).length;
    const optionalMetadata = ["careNote", "sourceLayer", "publicSafety"]
      .filter((key) => properties.has(key)).length;
    if (!slug) fail("A work item lacks a static slug");
    const metadataKeys = ["subtitle", "summary", "role", "years", "series", "status", "visibility", "roleFit", "currentStatus"]
      .filter((key) => properties.has(key))
      .map((key) => `metadata-${key}`);
    const optionalKeys = ["careNote", "sourceLayer", "publicSafety"]
      .filter((key) => properties.has(key))
      .map((key) => `metadata-${key}`);
    const knownKeys = known && ts.isObjectLiteralExpression(known)
      ? known.properties.map((property) => `known-${property.name?.getText(sourceFile).replace(/["'`]/g, "")}`)
      : [];
    const artifactTypeKeys = arrayElements(properties.get("artifactTypes"))
      .map((element) => `artifact-type-${stableKey(literalValue(element))}`);
    const artifactKeys = arrayElements(properties.get("artifacts")).map((element, index) => {
      const artifactProperties = ts.isObjectLiteralExpression(element) ? propertyMap(element) : new Map();
      return `artifact-${stableKey(literalValue(artifactProperties.get("title")?.initializer ?? element))}-${index + 1}`;
    });
    const creditKeys = arrayElements(properties.get("credits"))
      .map((element, index) => `credit-${stableKey(literalValue(element))}-${index + 1}`);
    const mdxKeys = slug ? mdxClaimKeys(read(`apps/www/src/content/work/${slug}.mdx`)) : [];
    const mdxClaimUnits = mdxKeys.length;
    const metadataClaimUnits = requiredMetadata + optionalMetadata + knownCount + artifactTypes + artifacts + credits;
    const countedClaimKeys = [...metadataKeys, ...optionalKeys, ...knownKeys, ...artifactTypeKeys, ...artifactKeys, ...creditKeys, ...mdxKeys];
    return {
      slug: slug ?? "unknown",
      featured: properties.get("featured")?.initializer?.kind === ts.SyntaxKind.TrueKeyword,
      cardClaimKeys: ["subtitle", "summary", "whatWasUnclear", "whatBecameUsable", "roleFit"]
        .filter((key) => properties.has(key))
        .map((key) => `work-card-${slug ?? "unknown"}-${key}`),
      artifactCount: artifacts,
      metadataClaimUnits,
      mdxClaimUnits,
      total: metadataClaimUnits + mdxClaimUnits,
      countedClaimKeys
    };
  });
}

function staticParagraphKeys(relativePath, prefix, { exclude = [] } = {}) {
  return [...read(relativePath).matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)]
    .map((match) => match[1].replace(/<[^>]+>/g, " ").replace(/\{[^}]+\}/g, " ").replace(/\s+/g, " ").trim())
    .filter((text) => text && !exclude.some((pattern) => pattern.test(text)))
    .map((text) => `${prefix}-${sha256(text).slice(0, 12)}`);
}

function deriveRouteClaimKeys(workCompositions) {
  const workIntroKeys = staticParagraphKeys("apps/www/src/app/work/page.tsx", "work-block", {
    exclude: [/Early research/, /A lab \/ proof-of-practice/]
  });
  const workLabKeys = staticParagraphKeys("apps/www/src/app/work/page.tsx", "work-lab", {
    exclude: [/These case studies/]
  });
  const technicalSource = read("apps/www/src/app/work/technical-operations/page.tsx");
  const operationsBlock = technicalSource.match(/const operationsMap = \[([\s\S]*?)\n\];/)?.[1] ?? "";
  const operations = [...operationsBlock.matchAll(/^\s+"([^"]+)"[,]?$/gm)].map((match) => match[1]);
  const technicalKeys = [
    ...staticParagraphKeys("apps/www/src/app/work/technical-operations/page.tsx", "technical-positioning", {
      exclude: [/\{row\.toward\}/]
    }),
    ...operations.map((operation) => `technical-operation-${sha256(operation).slice(0, 12)}`),
    ...technicalOperationsProofRows.flatMap((row) => [
      `technical-toward-${stableKey(row.capability)}`,
      ...row.proofs.slice(0, 2).map((proof) => `technical-proof-${stableKey(row.capability)}-${stableKey(proof.id)}`)
    ]),
    ...staticParagraphKeys("apps/www/src/components/ResumeCTA.tsx", "resume-cta"),
    ...staticParagraphKeys("apps/www/src/components/ContactCTA.tsx", "contact-cta")
  ];
  const resumeKeys = [
    ...staticParagraphKeys("apps/www/src/app/resume/page.tsx", "resume-block", {
      exclude: [/\{proof\./]
    }),
    ...resumeProofHighlights.map((proof) => `resume-proof-${stableKey(proof.id)}`)
  ];
  const colophonSource = read("apps/www/src/app/colophon/page.tsx");
  const colophonDetailsBlock = colophonSource.match(/const details = \[([\s\S]*?)\n\];/)?.[1] ?? "";
  const colophonDetails = [...colophonDetailsBlock.matchAll(/^\s+"([^"]+)"[,]?$/gm)].map((match) => match[1]);
  const labKeys = [
    "lab-method-proof-source-backed-team-memory-method",
    ...staticParagraphKeys("apps/www/src/app/lab/source-backed-team-memory/page.tsx", "lab-boundary", {
      exclude: [/\{methodProof\.publicWording\}/, /Lab \/ method/]
    }),
    ...mdxClaimKeys(read("apps/www/src/content/lab/source-backed-team-memory.mdx")).map((key) => `lab-${key}`)
  ];
  return {
    "/": deriveHomeClaimKeys(workCompositions),
    "/work": [
      ...workIntroKeys,
      ...workCompositions.flatMap((item) => item.cardClaimKeys),
      ...workLabKeys
    ],
    "/work/technical-operations": technicalKeys,
    "/resume": resumeKeys,
    "/about": [
      ...staticParagraphKeys("apps/www/src/app/about/page.tsx", "about-block"),
      ...staticParagraphKeys("apps/www/src/components/ContactCTA.tsx", "contact-cta")
    ],
    "/contact": staticParagraphKeys("apps/www/src/app/contact/page.tsx", "contact-block"),
    "/colophon": [
      ...staticParagraphKeys("apps/www/src/app/colophon/page.tsx", "colophon-block", { exclude: [/\{detail\}/] }),
      ...colophonDetails.map((detail) => `colophon-detail-${sha256(detail).slice(0, 12)}`)
    ],
    "/lab/source-backed-team-memory": labKeys,
    ...Object.fromEntries(workCompositions.map((item) => [`/work/${item.slug}`, item.countedClaimKeys]))
  };
}

function deriveHomeClaimKeys(workCompositions) {
  const heroSource = read("apps/www/src/components/Hero.tsx");
  const homeSource = read("apps/www/src/app/page.tsx");
  const heroParagraphs = [...heroSource.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)]
    .map((match) => match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
    .filter((text) => text && !text.includes("{label}"));
  const startHereLabels = [...homeSource.matchAll(/^\s+label: "([^"]+)"/gm)].map((match) => match[1]);
  const capabilityTitles = [...read("apps/www/src/components/CapabilityGrid.tsx").matchAll(/^\s+title: "([^"]+)"/gm)].map((match) => match[1]);
  const transformations = [...homeSource.matchAll(/^\s+\["([^"]+)", "([^"]+)"\]/gm)].map((match) => `${match[1]} to ${match[2]}`);
  const selectedParagraphs = [...homeSource.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)]
    .map((match) => match[1].replace(/\s+/g, " ").trim())
    .filter((text) => text.startsWith("These projects show") || text.startsWith("The projects differ") || text.startsWith("I usually enter"));
  return [
    ...heroParagraphs.map((text) => `hero-${sha256(text).slice(0, 12)}`),
    `start-here-intro-${sha256("New to my work").slice(0, 12)}`,
    ...startHereLabels.map((label) => `start-here-${stableKey(label)}`),
    ...homepageProofs.map((proof) => `proof-${stableKey(proof.id)}`),
    ...capabilityTitles.map((title) => `capability-${stableKey(title)}`),
    ...workCompositions.filter((item) => item.featured).flatMap((item) => [
      `featured-${stableKey(item.slug)}-subtitle`,
      `featured-${stableKey(item.slug)}-summary`
    ]),
    ...transformations.map((text) => `transformation-${stableKey(text)}`),
    ...selectedParagraphs.map((text) => `home-block-${sha256(text).slice(0, 12)}`),
    ...staticParagraphKeys("apps/www/src/components/ContactCTA.tsx", "contact-cta")
  ];
}

const suitePath = "evals/portfolio-system-blind-spots/evals.json";
const controlsPath = "evals/portfolio-system-blind-spots/control-state.json";
const compositionPath = "evals/portfolio-system-blind-spots/composition-manifest.json";
const mosaicPath = "evals/portfolio-system-blind-spots/mosaic-review-2026-07-15.json";
const judgeSchemaPath = "evals/portfolio-system-blind-spots/judge-artifact.schema.json";
const historyPath = "evals/portfolio-system-blind-spots/hill-climb-history.json";
const roleEvidencePath = "evals/portfolio-system-blind-spots/role-evidence-classifications.json";
const registerPath = "docs/knowledge-bank/blind-spot-register.md";
const technicalOperationsPath = "apps/www/src/app/work/technical-operations/page.tsx";
const readerSurfacePaths = [
  ...listSourceFiles("apps/www/src"),
  ...listAllFiles("apps/www/public"),
  "apps/www/mdx-components.tsx",
  "apps/www/package.json"
].sort();

const suiteSource = read(suitePath);
const controlsSource = read(controlsPath);
const compositionSource = read(compositionPath);
const mosaicSource = read(mosaicPath);
const registerSource = read(registerPath);
const technicalOperationsSource = read(technicalOperationsPath);
const suite = parse(suitePath);
const controlState = parse(controlsPath);
const composition = parse(compositionPath);
const mosaicReview = parse(mosaicPath);
const judgeSchema = parse(judgeSchemaPath);
const hillClimbHistory = parse(historyPath);
const roleEvidenceClassifications = parse(roleEvidencePath);
const readerSurfaceHash = createHash("sha256");
for (const relativePath of readerSurfacePaths) {
  readerSurfaceHash.update(`${relativePath}\n`);
  readerSurfaceHash.update(readFileSync(path.join(repoRoot, relativePath)));
  readerSurfaceHash.update("\n---\n");
}
const readerSurfaceSha256 = readerSurfaceHash.digest("hex");
const externalReceiptDirectory = "evals/portfolio-system-blind-spots/external-receipts";
const externalReceiptPaths = existsSync(path.join(repoRoot, externalReceiptDirectory))
  ? listAllFiles(externalReceiptDirectory).filter((relativePath) => relativePath.endsWith(".json"))
  : [];
for (const relativePath of externalReceiptPaths) {
  requireContainedPath(
    path.join(repoRoot, relativePath),
    path.join(repoRoot, externalReceiptDirectory),
    `external receipt ${relativePath}`
  );
}

const requiredBlindSpots = [
  "external-reader-validation",
  "inquiry-closure",
  "individual-role-corroboration",
  "countability-and-platform-bias",
  "composition-and-argument",
  "mosaic-privacy",
  "evaluator-independence",
  "action-conversion"
];
const requiredGates = [
  "no-fabricated-external-outcomes",
  "risk-control-traceability",
  "evaluator-independence-disclosure",
  "public-and-relational-safety"
];
const requiredPagePaths = [
  "/",
  "/work",
  "/work/technical-operations",
  "/work/[slug]",
  "/resume",
  "/about",
  "/contact",
  "/colophon",
  "/lab/source-backed-team-memory"
];
const requiredControlFields = [
  "signalSource",
  "currentState",
  "controlArtifact",
  "trigger",
  "owner",
  "nextTest",
  "decisionRule",
  "evidenceReturn",
  "externalOutcomeStatus"
];
const requiredCompositionFields = [
  "audience",
  "readerDecision",
  "governingArgument",
  "primaryAction",
  "claimBudget",
  "selectionRule",
  "omissionRationale"
];

const currentSnapshot = {
  intakeRecords: knowledgeBank.intakeRecords.length,
  sources: knowledgeBank.sources.length,
  claims: knowledgeBank.claims.length,
  researchInquiries: knowledgeBank.researchInquiries.length,
  partiallyRecoveredInquiries: knowledgeBank.researchInquiries.filter(
    (inquiry) => inquiry.resultStatus === "partially-recovered"
  ).length,
  recoveredInquiries: knowledgeBank.researchInquiries.filter(
    (inquiry) => inquiry.resultStatus === "recovered"
  ).length,
  activeProjections: knowledgeBank.claims.flatMap((claim) => claim.projections).filter(
    (projection) => projection.status === "active"
  ).length,
  heldProjections: knowledgeBank.claims.flatMap((claim) => claim.projections).filter(
    (projection) => projection.status === "hold"
  ).length
};
const workCompositionInventory = workCaseCompositions();
const routeClaimKeys = deriveRouteClaimKeys(workCompositionInventory);
const homeClaimKeys = routeClaimKeys["/"];

const bundleFiles = [
  [suitePath, suiteSource],
  [controlsPath, controlsSource],
  [compositionPath, compositionSource],
  [mosaicPath, mosaicSource],
  [registerPath, registerSource],
  ["evals/portfolio-system-blind-spots/README.md", read("evals/portfolio-system-blind-spots/README.md")],
  ["evals/portfolio-system-blind-spots/judge-artifact.schema.json", read("evals/portfolio-system-blind-spots/judge-artifact.schema.json")],
  [historyPath, read(historyPath)],
  [roleEvidencePath, read(roleEvidencePath)],
  ["scripts/check-portfolio-system-blind-spots.mjs", read("scripts/check-portfolio-system-blind-spots.mjs")],
  ["scripts/check-citations.mjs", read("scripts/check-citations.mjs")],
  ["scripts/generate-public-citations.mjs", read("scripts/generate-public-citations.mjs")],
  ["AGENTS.md", read("AGENTS.md")],
  ["package.json", read("package.json")],
  ...listSourceFiles("apps/www/src").map((relativePath) => [relativePath, read(relativePath)]),
  ...externalReceiptPaths.map((relativePath) => [relativePath, read(relativePath)]),
  ["reader-surface-digest", readerSurfaceSha256],
  ["knowledge-bank-graph-snapshot", JSON.stringify(currentSnapshot)]
];
const bundleSha256 = sha256(
  bundleFiles.map(([name, source]) => `${name}\n${source}`).join("\n---\n")
);

if (process.argv.includes("--print-bundle-digest")) {
  console.log(bundleSha256);
  process.exit(0);
}

if (process.argv.includes("--print-reader-surface-digest")) {
  console.log(readerSurfaceSha256);
  process.exit(0);
}

if (process.argv.includes("--print-composition-inventory")) {
  console.log(JSON.stringify(routeClaimKeys, null, 2));
  process.exit(0);
}

if (suite.version !== 1 || suite.evalId !== "portfolio-system-blind-spots") {
  fail("Blind-spot eval version or evalId is invalid");
}
if (!suite.objective || !suite.scopeBoundary) fail("Blind-spot eval lacks objective or scope boundary");
strictKeys(hillClimbHistory, ["version", "reviewedAt", "scope", "iterationBudgetRevision", "iterations", "next"], "hill-climb history");
requireNotFutureDate(hillClimbHistory.reviewedAt, "hill-climb history reviewedAt");
requireString(hillClimbHistory.scope, "hill-climb history scope");
requireString(hillClimbHistory.iterationBudgetRevision, "hill-climb history iterationBudgetRevision");
requireString(hillClimbHistory.next, "hill-climb history next");
if (hillClimbHistory.version !== 1 || (hillClimbHistory.iterations ?? []).length < 6) {
  fail("Blind-spot hill-climb history is incomplete");
}
for (const [index, iteration] of (hillClimbHistory.iterations ?? []).entries()) {
  strictKeys(iteration, ["iteration", "candidate", "evidenceAndGovernanceScore", "hiringAndFieldUseScore", "disposition", "changePrompted"], `hill-climb iteration ${index + 1}`);
  if (iteration.iteration !== index + 1) fail("Blind-spot hill-climb iterations are not contiguous");
  requireString(iteration.candidate, `hill-climb iteration ${index + 1}/candidate`);
  requireString(iteration.disposition, `hill-climb iteration ${index + 1}/disposition`);
  requireString(iteration.changePrompted, `hill-climb iteration ${index + 1}/changePrompted`);
  if (!Number.isInteger(iteration.evidenceAndGovernanceScore) || iteration.evidenceAndGovernanceScore < 0 || iteration.evidenceAndGovernanceScore > 100) {
    fail(`hill-climb iteration ${index + 1}/evidenceAndGovernanceScore is invalid`);
  }
  if (iteration.hiringAndFieldUseScore !== null && (!Number.isInteger(iteration.hiringAndFieldUseScore) || iteration.hiringAndFieldUseScore < 0 || iteration.hiringAndFieldUseScore > 100)) {
    fail(`hill-climb iteration ${index + 1}/hiringAndFieldUseScore is invalid`);
  }
}
if (!/not-yet-measured/i.test(hillClimbHistory.next ?? "")) {
  fail("Hill-climb history confuses internal scores with external outcomes");
}

const blindSpotIds = uniqueIds(suite.blindSpots ?? [], "blindSpots");
for (const id of requiredBlindSpots) {
  if (!blindSpotIds.has(id)) fail(`Blind-spot eval is missing ${id}`);
}
for (const blindSpot of suite.blindSpots ?? []) {
  if (!blindSpot.risk || !blindSpot.observableFailure || !blindSpot.requiredControls?.length || !blindSpot.prohibitedSuccessClaims?.length) {
    fail(`${blindSpot.id} lacks a risk, observable failure, controls, or prohibited success claims`);
  }
}

const gateIds = uniqueIds(suite.hardGates ?? [], "hardGates");
for (const id of requiredGates) {
  if (!gateIds.has(id)) fail(`Blind-spot eval is missing hard gate ${id}`);
}

const criteria = suite.scoredCriteria ?? [];
const criterionIds = uniqueIds(criteria, "scoredCriteria");
const criterionById = new Map(criteria.map((criterion) => [criterion.id, criterion]));
if (criteria.reduce((sum, criterion) => sum + criterion.weight, 0) !== 100) {
  fail("Blind-spot criterion weights must total 100");
}
for (const criterion of criteria) {
  if (!Number.isInteger(criterion.minimumScore) || criterion.minimumScore < 1 || criterion.minimumScore > 5) {
    fail(`${criterion.id} has an invalid minimum score`);
  }
  for (const anchor of ["1", "3", "5"]) {
    if (!criterion.anchors?.[anchor]) fail(`${criterion.id} lacks anchor ${anchor}`);
  }
}

const stop = suite.stopPolicy ?? {};
if (stop.requiredConsecutivePasses < 2 || stop.maxIterations < 1) fail("Blind-spot stop policy is invalid");
if (!/controls, not external outcomes/i.test(stop.successCondition ?? "")) {
  fail("Blind-spot success condition must preserve the external-outcome boundary");
}
if (!/above threshold/i.test(stop.scoreVariancePolicy ?? "") || !/hard gate/i.test(stop.scoreVariancePolicy ?? "")) {
  fail("Blind-spot stop policy lacks an explicit independent-judge variance rule");
}

strictKeys(controlState, ["version", "reviewedAt", "externalOutcomeStatus", "substantialPassDefinition", "polishingCap", "controls", "readerStudyProtocol", "priorityInquiryControls", "roleEvidencePolicy", "sourceBalanceReview", "fieldActionProtocol"], "control state");
if (controlState.version !== 1) fail("Control-state version is invalid");
requireNotFutureDate(controlState.reviewedAt, "control-state reviewedAt");
if (controlState.externalOutcomeStatus !== "not-yet-measured") {
  fail("Control state must preserve external outcomes as not-yet-measured");
}
if (composition.publicSurfaceSha256 !== readerSurfaceSha256) {
  fail("Composition manifest public-surface receipt is stale");
}
if (!controlState.substantialPassDefinition || !controlState.polishingCap) {
  fail("Control state lacks a substantial-pass definition or polishing cap");
}
const controls = controlState.controls ?? [];
const controlIds = uniqueIds(controls, "control-state controls");
for (const id of requiredBlindSpots) {
  if (!controlIds.has(id)) fail(`Control state is missing ${id}`);
}
for (const control of controls) {
  strictKeys(control, ["id", ...requiredControlFields], `control ${control.id ?? "unknown"}`);
  for (const field of requiredControlFields) {
    if (!control[field]) fail(`${control.id} lacks ${field}`);
    requireString(control[field], `${control.id}/${field}`);
  }
  if (!["not-yet-measured", "not-applicable"].includes(control.externalOutcomeStatus)) {
    fail(`${control.id}/externalOutcomeStatus is invalid`);
  }
}
const controlById = new Map(controls.map((control) => [control.id, control]));
const expectedInquiryState = `${currentSnapshot.partiallyRecoveredInquiries} of ${currentSnapshot.researchInquiries} inquiries are partially recovered; ${currentSnapshot.recoveredInquiries === 1 ? "one is" : `${currentSnapshot.recoveredInquiries} are`} recovered.`;
if (controlById.get("inquiry-closure")?.currentState !== expectedInquiryState) {
  fail("Inquiry-closure narrative current state is stale");
}
const inquiriesById = new Map(knowledgeBank.researchInquiries.map((inquiry) => [inquiry.id, inquiry]));
const priorityInquiries = controlState.priorityInquiryControls ?? [];
if (priorityInquiries.length < 6) fail("At least six priority inquiry controls are required");
const priorityIds = uniqueIds(priorityInquiries.map((entry) => ({ ...entry, id: entry.inquiryId })), "priority inquiries");
for (const entry of priorityInquiries) {
  strictKeys(entry, ["inquiryId", "priority", "evidenceTarget", "closureCondition", "boundedDisposition", "owner", "nextReview"], `priority inquiry ${entry.inquiryId ?? "unknown"}`);
  if (!inquiriesById.has(entry.inquiryId)) fail(`Priority inquiry ${entry.inquiryId} does not exist`);
  for (const field of ["priority", "evidenceTarget", "closureCondition", "boundedDisposition", "owner", "nextReview"]) {
    if (!entry[field]) fail(`Priority inquiry ${entry.inquiryId} lacks ${field}`);
  }
  requireInteger(entry.priority, `${entry.inquiryId}/priority`, 1);
  requireDate(entry.nextReview, `${entry.inquiryId}/nextReview`);
}
if (priorityIds.size !== priorityInquiries.length) fail("Priority inquiry controls must be unique");

for (const field of ["strongIndividualWording", "firstPersonOnlyWording", "collectiveOutcomeWording"]) {
  if (!controlState.roleEvidencePolicy?.[field]) fail(`Role evidence policy lacks ${field}`);
}
strictKeys(controlState.roleEvidencePolicy, ["strongIndividualWording", "firstPersonOnlyWording", "collectiveOutcomeWording", "structuredDerivation"], "role evidence policy");
requireString(controlState.roleEvidencePolicy?.structuredDerivation, "role evidence structured derivation");

const kindCounts = new Map();
for (const source of knowledgeBank.sources) kindCounts.set(source.kind, (kindCounts.get(source.kind) ?? 0) + 1);
const socialCount = (kindCounts.get("government-social-post") ?? 0) +
  (kindCounts.get("institutional-social-post") ?? 0) +
  (kindCounts.get("personal-social-post") ?? 0);
const sourceSnapshot = controlState.sourceBalanceReview?.snapshot ?? {};
strictKeys(controlState.sourceBalanceReview, ["snapshot", "populationPassInquiryIds", "requiredInvisibleWorkDimensions", "stopRule", "projectReviews"], "source-balance review");
strictKeys(sourceSnapshot, ["sources", "sourceKinds", "socialPostSources", "projectArchiveSources", "publishedArticleSources", "researchRunSources"], "source-balance snapshot");
requireStringArray(controlState.sourceBalanceReview?.requiredInvisibleWorkDimensions, "source-balance invisible-work dimensions");
requireString(controlState.sourceBalanceReview?.stopRule, "source-balance stop rule");
requireStringArray(controlState.sourceBalanceReview?.populationPassInquiryIds, "source-balance population-pass inquiries");
const derivedPopulationPassInquiries = knowledgeBank.researchInquiries
  .filter((inquiry) => /FULL-POPULATION|FACEBOOK-(?:EVENTS|POSTS|POST-POPULATION)|JAMIE-FACEBOOK-HOSTED-EVENTS/.test(inquiry.id))
  .map((inquiry) => inquiry.id)
  .sort();
if (JSON.stringify([...(controlState.sourceBalanceReview?.populationPassInquiryIds ?? [])].sort()) !== JSON.stringify(derivedPopulationPassInquiries)) {
  fail("Source-balance population-pass inquiry ledger is not derived from the Knowledge Bank");
}
const expectedSourceSnapshot = {
  sources: knowledgeBank.sources.length,
  sourceKinds: kindCounts.size,
  socialPostSources: socialCount,
  projectArchiveSources: kindCounts.get("project-archive") ?? 0,
  publishedArticleSources: kindCounts.get("published-article") ?? 0,
  researchRunSources: kindCounts.get("research-run") ?? 0
};
if (!controlById.get("countability-and-platform-bias")?.currentState.includes(`${expectedSourceSnapshot.sourceKinds}`)) {
  fail("Countability-bias narrative source-kind state is stale");
}
for (const [key, value] of Object.entries(expectedSourceSnapshot)) {
  if (sourceSnapshot[key] !== value) fail(`Source-balance snapshot ${key} is stale`);
}
if ((controlState.sourceBalanceReview?.requiredInvisibleWorkDimensions ?? []).length < 7) {
  fail("Source-balance review lacks invisible-work dimensions");
}

strictKeys(composition, ["version", "reviewedAt", "publicSurfaceSha256", "claimUnitDefinition", "pages"], "composition manifest");
if (composition.version !== 1) fail("Composition-manifest version is invalid");
requireNotFutureDate(composition.reviewedAt, "composition manifest reviewedAt");
requireSha256(composition.publicSurfaceSha256, "composition manifest publicSurfaceSha256");
requireString(composition.claimUnitDefinition, "composition manifest claimUnitDefinition");
const pageIds = uniqueIds((composition.pages ?? []).map((page) => ({ ...page, id: page.path })), "composition pages");
const discoveredPagePaths = listSourceFiles("apps/www/src/app")
  .filter((relativePath) => relativePath.endsWith("/page.tsx"))
  .map((relativePath) => {
    const suffix = relativePath
      .replace(/^apps\/www\/src\/app/, "")
      .replace(/\/page\.tsx$/, "");
    return suffix || "/";
  })
  .sort();
for (const pagePath of requiredPagePaths) {
  if (!pageIds.has(pagePath)) fail(`Composition manifest is missing ${pagePath}`);
}
if (JSON.stringify([...pageIds].sort()) !== JSON.stringify(discoveredPagePaths)) {
  fail(`Composition manifest routes do not match discovered routes: ${discoveredPagePaths.join(", ")}`);
}
const caseTemplate = composition.pages?.find((page) => page.path === "/work/[slug]");
const concreteCases = caseTemplate?.concretePages ?? [];
const concreteCasePaths = new Set(concreteCases.map((page) => page.path));
const effectivePublicRoutes = [
  ...discoveredPagePaths.filter((pagePath) => pagePath !== "/work/[slug]"),
  ...concreteCasePaths
].sort();
if (effectivePublicRoutes.length !== 14 || new Set(effectivePublicRoutes).size !== 14) {
  fail(`Composition manifest must govern 14 concrete public routes, found ${effectivePublicRoutes.length}`);
}
for (const page of composition.pages ?? []) {
  const pageFields = ["path", ...requiredCompositionFields, "currentClaimCount", "countedClaimKeys"];
  strictKeys(page, page.path === "/work/[slug]" ? [...pageFields, "concretePages"] : pageFields, `composition page ${page.path ?? "unknown"}`);
  requireString(page.path, "composition page path");
  for (const field of requiredCompositionFields) {
    if (!page[field]) fail(`Composition page ${page.path} lacks ${field}`);
    if (!["claimBudget"].includes(field)) requireString(page[field], `${page.path}/${field}`);
  }
  if (!Number.isInteger(page.claimBudget) || page.claimBudget < 1) fail(`${page.path} has an invalid claim budget`);
  requireInteger(page.currentClaimCount, `${page.path}/currentClaimCount`);
  if (page.currentClaimCount !== page.countedClaimKeys?.length) fail(`${page.path} claim count lacks a matching count receipt`);
  if (new Set(page.countedClaimKeys ?? []).size !== (page.countedClaimKeys ?? []).length) fail(`${page.path} has duplicate claim keys`);
  requireStringArray(page.countedClaimKeys, `${page.path} counted claim keys`);
  if (page.currentClaimCount > page.claimBudget) fail(`${page.path} exceeds its claim budget`);
}
for (const concrete of concreteCases) {
  strictKeys(concrete, ["path", "artifactCount", "metadataClaimUnits", "mdxClaimUnits", "currentClaimCount", "claimBudget", "countedClaimKeys"], `composition concrete page ${concrete.path ?? "unknown"}`);
  requireString(concrete.path, "composition concrete page path");
  for (const field of ["artifactCount", "metadataClaimUnits", "mdxClaimUnits", "currentClaimCount", "claimBudget"]) {
    requireInteger(concrete[field], `${concrete.path}/${field}`);
  }
  requireStringArray(concrete.countedClaimKeys, `${concrete.path}/countedClaimKeys`);
}
if (technicalOperationsSource.includes("const proofMap")) fail("Technical-operations still contains the duplicate proof map");
if (!technicalOperationsSource.includes("row.proofs.slice(0, 2)")) fail("Technical-operations does not enforce its proof budget");
for (const [pagePath, countedClaimKeys] of Object.entries(routeClaimKeys)) {
  const manifestPage = pagePath.startsWith("/work/") && !["/work/technical-operations"].includes(pagePath)
    ? concreteCases.find((page) => page.path === pagePath)
    : composition.pages?.find((page) => page.path === pagePath);
  if (!manifestPage) {
    fail(`Composition manifest lacks render-derived inventory for ${pagePath}`);
    continue;
  }
  if (manifestPage.currentClaimCount !== countedClaimKeys.length) {
    fail(`${pagePath} manifest counts ${manifestPage.currentClaimCount}, rendered source counts ${countedClaimKeys.length}`);
  }
  if (JSON.stringify(manifestPage.countedClaimKeys) !== JSON.stringify(countedClaimKeys)) {
    fail(`${pagePath} claim-key receipt does not match the render-derived inventory`);
  }
}
for (const actual of workCompositionInventory) {
  const concrete = concreteCases.find((page) => page.path === `/work/${actual.slug}`);
  if (!concrete) {
    fail(`Composition manifest lacks concrete case study /work/${actual.slug}`);
    continue;
  }
  if (concrete.artifactCount !== actual.artifactCount) fail(`/work/${actual.slug} artifact count is stale`);
  if (concrete.metadataClaimUnits !== actual.metadataClaimUnits) fail(`/work/${actual.slug} metadata claim count is stale: expected ${actual.metadataClaimUnits}`);
  if (concrete.mdxClaimUnits !== actual.mdxClaimUnits) fail(`/work/${actual.slug} MDX claim count is stale: expected ${actual.mdxClaimUnits}`);
  if (concrete.currentClaimCount !== actual.total) fail(`/work/${actual.slug} total claim count is stale: expected ${actual.total}`);
  if (JSON.stringify(concrete.countedClaimKeys) !== JSON.stringify(actual.countedClaimKeys)) {
    fail(`/work/${actual.slug} claim-key receipt does not match the render-derived inventory`);
  }
  if (concrete.currentClaimCount > concrete.claimBudget || concrete.claimBudget > caseTemplate.claimBudget) {
    fail(`/work/${actual.slug} exceeds the case-study claim budget`);
  }
}

for (const sourcePath of [
  "apps/www/src/data/proofs.ts",
  "apps/www/src/data/work.ts",
  "apps/www/src/content/work/fair-rent-nyc.mdx"
]) {
  if (/Jamie co-founded NYC Artist Coalition|Co-founded NYC Artist Coalition/.test(read(sourcePath))) {
    fail(`${sourcePath} contains an unqualified active co-founder assertion`);
  }
}

try {
  execFileSync(process.execPath, ["scripts/generate-public-citations.mjs", "--check"], {
    cwd: repoRoot,
    stdio: "pipe"
  });
} catch {
  fail("Generated public citation registry is stale");
}
parse("apps/www/src/data/knowledge-bank/public-registry.json");
strictKeys(roleEvidenceClassifications, ["version", "reviewedAt", "classificationRule", "records", "proofRecords"], "role-evidence classifications");
if (roleEvidenceClassifications.version !== 1) fail("Role-evidence classification version is invalid");
requireNotFutureDate(roleEvidenceClassifications.reviewedAt, "role-evidence classifications reviewedAt");
requireString(roleEvidenceClassifications.classificationRule, "role-evidence classification rule");
const roleClaims = knowledgeBank.claims.filter((claim) =>
  /\bJamie\b/i.test(claim.internalClaim ?? "") ||
  (claim.projections ?? []).some((projection) => /\bJamie\b/i.test(projection.text ?? ""))
);
const roleRecords = roleEvidenceClassifications.records ?? [];
const roleRecordIds = uniqueIds(roleRecords.map((record) => ({ ...record, id: record.claimId })), "role-evidence records");
const expectedRoleIds = roleClaims.map((claim) => claim.id).sort();
if (JSON.stringify([...roleRecordIds].sort()) !== JSON.stringify(expectedRoleIds)) {
  const missing = expectedRoleIds.filter((id) => !roleRecordIds.has(id));
  const extra = [...roleRecordIds].filter((id) => !expectedRoleIds.includes(id));
  fail(`Role-evidence classification must exactly cover every Jamie-naming claim; missing: ${missing.join(", ") || "none"}; extra: ${extra.join(", ") || "none"}`);
}
const claimById = new Map(knowledgeBank.claims.map((claim) => [claim.id, claim]));
const correctionById = new Map(knowledgeBank.corrections.map((correction) => [correction.id, correction]));
for (const record of roleRecords) {
  strictKeys(record, ["claimId", "basis", "sourceIds", "correctionIds", "rationale"], `role-evidence record ${record.claimId ?? "unknown"}`);
  const claim = claimById.get(record.claimId);
  if (!claim) continue;
  if (!["source-corroborated", "first-person", "mixed", "open"].includes(record.basis)) {
    fail(`${record.claimId} has an invalid role-evidence basis`);
  }
  requireStringArray(record.sourceIds, `${record.claimId}/sourceIds`);
  requireStringArray(record.correctionIds, `${record.claimId}/correctionIds`, { allowEmpty: true });
  requireString(record.rationale, `${record.claimId}/rationale`);
  const claimSourceIds = new Set((claim.evidence ?? []).map((relationship) => relationship.sourceId));
  for (const sourceId of record.sourceIds ?? []) {
    if (!claimSourceIds.has(sourceId)) fail(`${record.claimId} classifies a source outside the claim evidence graph: ${sourceId}`);
  }
  for (const correctionId of record.correctionIds ?? []) {
    const correction = correctionById.get(correctionId);
    if (!correction || correction.claimId !== record.claimId) {
      fail(`${record.claimId} classifies an absent or unrelated correction: ${correctionId}`);
    }
  }
  const activeRoleProjections = (claim.projections ?? []).filter(
    (projection) => projection.status === "active" && /\bJamie\b/i.test(projection.text ?? "")
  );
  if (record.basis === "open" && activeRoleProjections.length) {
    fail(`${record.claimId} has an active Jamie-naming projection while its role basis remains open`);
  }
  if (["first-person", "mixed"].includes(record.basis)) {
    for (const projection of activeRoleProjections) {
      if (!/\bJamie (?:reports|describes|states|recalls)\b/i.test(projection.text ?? "")) {
        fail(`${record.claimId}/${projection.key} does not explicitly attribute its ${record.basis} role basis`);
      }
    }
  }
  const classifiedRelationships = (claim.evidence ?? []).filter((relationship) => record.sourceIds.includes(relationship.sourceId));
  if (record.basis === "source-corroborated" && !classifiedRelationships.some((relationship) =>
    relationship.confidence === "high" && ["direct-support", "private-support", "corroborating"].includes(relationship.relationship)
  )) {
    fail(`${record.claimId} lacks a high-confidence supporting relationship for its source-corroborated basis`);
  }
  if (["first-person", "mixed"].includes(record.basis)) {
    const correctionCarriesRole = (record.correctionIds ?? []).some((id) =>
      ["first-person", "mixed"].includes(correctionById.get(id)?.roleBasis)
    );
    const relationshipCarriesRole = classifiedRelationships.some((relationship) =>
      ["first-person", "mixed"].includes(relationship.roleBasis)
    );
    if (!correctionCarriesRole && !relationshipCarriesRole) {
      fail(`${record.claimId} lacks structured first-person or mixed role-basis evidence`);
    }
  }
}

const publicProofClaims = proofClaims.filter((proof) => proof.surfaces.some((surface) => surface !== "internal-only"));
const proofRecords = roleEvidenceClassifications.proofRecords ?? [];
const proofRecordIds = uniqueIds(proofRecords.map((record) => ({ ...record, id: record.proofId })), "proof role-evidence records");
const expectedProofIds = publicProofClaims.map((proof) => proof.id).sort();
if (JSON.stringify([...proofRecordIds].sort()) !== JSON.stringify(expectedProofIds)) {
  const missing = expectedProofIds.filter((id) => !proofRecordIds.has(id));
  const extra = [...proofRecordIds].filter((id) => !expectedProofIds.includes(id));
  fail(`Proof role-evidence classification must exactly cover every public proof claim; missing: ${missing.join(", ") || "none"}; extra: ${extra.join(", ") || "none"}`);
}
const roleRecordByClaimId = new Map(roleRecords.map((record) => [record.claimId, record]));
const proofById = new Map(proofClaims.map((proof) => [proof.id, proof]));
const basisRank = { "source-corroborated": 0, positioning: 0, mixed: 1, "first-person": 2, open: 3 };
for (const record of proofRecords) {
  strictKeys(record, ["proofId", "basis", "rationale"], `proof role-evidence record ${record.proofId ?? "unknown"}`);
  const proof = proofById.get(record.proofId);
  if (!proof) continue;
  if (!["source-corroborated", "first-person", "mixed", "open", "positioning"].includes(record.basis)) {
    fail(`${record.proofId} has an invalid proof role-evidence basis`);
  }
  requireString(record.rationale, `${record.proofId}/rationale`);
  const linkedRoleRecords = (proof.structuredClaimIds ?? []).map((id) => roleRecordByClaimId.get(id)).filter(Boolean);
  const requiredRank = linkedRoleRecords.reduce((maximum, linked) => Math.max(maximum, basisRank[linked.basis]), 0);
  if (basisRank[record.basis] < requiredRank) {
    fail(`${record.proofId} is classified more strongly than its linked canonical role claim`);
  }
  if (record.basis === "open" && proof.surfaces.some((surface) => surface !== "internal-only")) {
    fail(`${record.proofId} remains available to a public surface while its role basis is open`);
  }
  if (["first-person", "mixed"].includes(record.basis)) {
    for (const [field, wording] of Object.entries({ publicWording: proof.publicWording, shortWording: proof.shortWording, detailedPublicWording: proof.detailedPublicWording })) {
      if (wording && !/\bJamie (?:reports|describes|states|recalls)\b/i.test(wording)) {
        fail(`${record.proofId}/${field} does not explicitly attribute its ${record.basis} role basis`);
      }
    }
  }
}

strictKeys(mosaicReview, ["version", "reviewedAt", "publicSurfaceSha256", "graphSnapshot", "reviewerRole", "scope", "combinationSignalsReviewed", "findings", "removalsOrMinimizations", "unresolvedRisks", "nextTrigger"], "mosaic review");
if (mosaicReview.version !== 1) fail("Mosaic-review version is invalid");
requireNotFutureDate(mosaicReview.reviewedAt, "mosaic review reviewedAt");
requireSha256(mosaicReview.publicSurfaceSha256, "mosaic review publicSurfaceSha256");
requireString(mosaicReview.reviewerRole, "mosaic review reviewerRole");
requireStringArray(mosaicReview.scope, "mosaic review scope");
requireStringArray(mosaicReview.combinationSignalsReviewed, "mosaic review combination signals");
requireStringArray(mosaicReview.removalsOrMinimizations, "mosaic review minimizations");
requireStringArray(mosaicReview.unresolvedRisks, "mosaic review unresolved risks");
requireString(mosaicReview.nextTrigger, "mosaic review nextTrigger");
if ((mosaicReview.combinationSignalsReviewed ?? []).length < 6 || (mosaicReview.findings ?? []).length < 3) {
  fail("Mosaic review lacks combination-level scope or findings");
}
for (const [index, finding] of (mosaicReview.findings ?? []).entries()) {
  strictKeys(finding, ["severity", "finding", "decision"], `mosaic finding ${index + 1}`);
  if (!["low", "moderate", "high"].includes(finding.severity)) fail(`mosaic finding ${index + 1} has invalid severity`);
  requireString(finding.finding, `mosaic finding ${index + 1}/finding`);
  requireString(finding.decision, `mosaic finding ${index + 1}/decision`);
}
if (mosaicReview.publicSurfaceSha256 !== readerSurfaceSha256) fail("Mosaic review public-surface receipt is stale");
strictKeys(mosaicReview.graphSnapshot, Object.keys(currentSnapshot), "mosaic review graph snapshot");
for (const [key, value] of Object.entries(currentSnapshot)) {
  if (mosaicReview.graphSnapshot?.[key] !== value) fail(`Mosaic review graph snapshot ${key} is stale`);
}
if (!(mosaicReview.removalsOrMinimizations ?? []).length || !(mosaicReview.unresolvedRisks ?? []).length) {
  fail("Mosaic review lacks minimizations or unresolved risks");
}
if (!/not legal/i.test(mosaicReview.reviewerRole ?? "")) fail("Mosaic review must disclose its review boundary");

const readerStudy = controlState.readerStudyProtocol ?? {};
strictKeys(readerStudy, ["status", "actionClass", "deadline", "frozenSurfaces", "entrySurfaces", "destinationSurfaces", "sample", "exposure", "frozenSurfaceDigest", "taskOrder", "baseline", "dimensions", "clarityThreshold", "integerThresholds", "aggregateFieldMap", "entrySurfaceDecisionRule", "fairRentFollowUpTrigger", "fairRentFollowUpReceiptPath", "decisionLink", "privacyBoundary", "receiptState", "receiptPath", "receiptTransition"], "reader-study protocol");
for (const field of ["status", "actionClass", "deadline", "frozenSurfaces", "entrySurfaces", "destinationSurfaces", "sample", "exposure", "frozenSurfaceDigest", "taskOrder", "baseline", "dimensions", "clarityThreshold", "integerThresholds", "decisionLink", "privacyBoundary", "receiptPath"]) {
  if (!readerStudy[field]) fail(`Reader-study protocol lacks ${field}`);
}
if ((readerStudy.dimensions ?? []).length !== 9 || (readerStudy.taskOrder ?? []).length < 6) {
  fail("Reader-study protocol lacks required dimensions or ordered tasks");
}
requireDate(readerStudy.deadline, "reader-study deadline");
requireSha256(readerStudy.frozenSurfaceDigest, "reader-study frozenSurfaceDigest");
for (const field of ["frozenSurfaces", "entrySurfaces", "destinationSurfaces", "taskOrder", "dimensions"]) {
  requireStringArray(readerStudy[field], `reader-study ${field}`);
}
strictKeys(readerStudy.receiptTransition, ["plannedToAttempted", "attemptedToReviewed", "forbiddenShortcut", "validStates"], "reader-study receipt transition");
strictKeys(readerStudy.receiptTransition?.validStates, ["planned", "attempted", "reviewed"], "reader-study valid states");
if (readerStudy.status === "planned" && readerStudy.frozenSurfaceDigest !== readerSurfaceSha256) {
  fail("Planned reader-study frozen surface digest is stale");
}
if (JSON.stringify(readerStudy.entrySurfaces) !== JSON.stringify(["/", "/work/technical-operations", "/work/fair-rent-nyc"])) {
  fail("Reader-study entry-surface coverage is invalid");
}
if (JSON.stringify(readerStudy.destinationSurfaces) !== JSON.stringify(["/resume", "/contact"])) {
  fail("Reader-study destination coverage is invalid");
}
if (JSON.stringify(Object.keys(readerStudy.integerThresholds ?? {})) !== JSON.stringify(["5"])) {
  fail("Reader-study must use the declared five-reader sample");
}
const thresholdFields = [
  "completedWithinFiveMinutes",
  "accurateRole",
  "proofRecall",
  "roleFitNamed",
  "trustOrConfusionRecorded",
  "resumeWithin90Seconds",
  "contactWithin90Seconds",
  "concreteContactReason"
];
strictKeys(readerStudy.integerThresholds?.["5"], thresholdFields, "reader-study five-person thresholds");
for (const field of thresholdFields) {
  const value = readerStudy.integerThresholds?.["5"]?.[field];
  if (!Number.isInteger(value) || value < 0 || value > 5) fail(`Reader-study threshold ${field} is invalid`);
}
strictKeys(readerStudy.aggregateFieldMap, readerStudy.dimensions, "reader-study aggregate field map");
for (const dimension of readerStudy.dimensions ?? []) {
  requireString(readerStudy.aggregateFieldMap?.[dimension], `reader-study field map/${dimension}`);
}
requireString(readerStudy.entrySurfaceDecisionRule, "reader-study entry-surface decision rule");
requireString(readerStudy.fairRentFollowUpTrigger, "reader-study Fair Rent follow-up trigger");
requireString(readerStudy.fairRentFollowUpReceiptPath, "reader-study Fair Rent follow-up receipt path");
if (!readerStudy.receiptTransition?.forbiddenShortcut) {
  fail("Reader-study protocol lacks a validated external receipt transition");
}
const readerState = readerStudy.receiptTransition?.validStates?.[readerStudy.status];
if (readerState !== readerStudy.receiptState) fail("Reader-study status and receipt state disagree");
requireExactMap(readerStudy.receiptTransition?.validStates, {
  planned: "not-yet-returned",
  attempted: "attempt-recorded",
  reviewed: "aggregate-reviewed"
}, "reader-study valid states");

const fieldAction = controlState.fieldActionProtocol ?? {};
strictKeys(fieldAction, ["status", "actionClass", "owner", "deadline", "timeBox", "completionEvidence", "requiredFollowThrough", "safeStorage", "receiptState", "receiptPath", "receiptTransition", "followThrough"], "field-action protocol");
for (const field of ["status", "actionClass", "owner", "deadline", "timeBox", "completionEvidence", "requiredFollowThrough", "safeStorage", "receiptPath"]) {
  if (!fieldAction[field]) fail(`Field-action protocol lacks ${field}`);
}
if (!fieldAction.receiptTransition?.forbiddenShortcut) {
  fail("Field-action protocol lacks a validated external receipt transition");
}
strictKeys(fieldAction.receiptTransition, ["plannedToAttempted", "attemptedToLearned", "forbiddenShortcut", "validStates"], "field-action receipt transition");
strictKeys(fieldAction.receiptTransition?.validStates, ["planned", "attempted", "learned"], "field-action valid states");
const fieldActionState = fieldAction.receiptTransition?.validStates?.[fieldAction.status];
if (fieldActionState !== fieldAction.receiptState) fail("Field-action status and receipt state disagree");
requireExactMap(fieldAction.receiptTransition?.validStates, {
  planned: "not-yet-returned",
  attempted: "attempt-recorded",
  learned: "coarse-learning-reviewed"
}, "field-action valid states");
const followThrough = fieldAction.followThrough ?? {};
strictKeys(followThrough, ["status", "actionClass", "trigger", "deadline", "receiptState", "receiptPath", "validStates", "privacyBoundary"], "job-search follow-through");
strictKeys(followThrough.validStates, ["planned", "attempted", "learned"], "job-search follow-through valid states");
for (const field of ["status", "actionClass", "trigger", "deadline", "receiptState", "receiptPath", "validStates", "privacyBoundary"]) {
  if (!followThrough[field]) fail(`Job-search follow-through lacks ${field}`);
}
if (followThrough.validStates?.[followThrough.status] !== followThrough.receiptState) {
  fail("Job-search follow-through status and receipt state disagree");
}
requireExactMap(followThrough.validStates, {
  planned: "not-yet-returned",
  attempted: "attempt-recorded",
  learned: "coarse-learning-reviewed"
}, "job-search follow-through valid states");
if (readerStudy.status === "reviewed" && followThrough.status === "planned") {
  fail("Reviewed reader findings require a recorded outward job-search follow-through");
}

const today = new Date().toISOString().slice(0, 10);
for (const [kind, protocol] of [["reader study", readerStudy], ["field action", fieldAction], ["job-search follow-through", followThrough]]) {
  requireDate(protocol.deadline, `${kind} deadline`);
  if (protocol.status === "planned" && protocol.deadline < today) fail(`${kind} remains planned after its deadline`);
}
if (fieldAction.deadline > readerStudy.deadline) fail("Hiring-reader solicitation deadline follows the reader-study deadline");
if (followThrough.deadline < readerStudy.deadline) fail("Job-search follow-through deadline predates the reader-study deadline");
const progressRank = { planned: 0, attempted: 1, reviewed: 2, learned: 2 };
if (progressRank[fieldAction.status] < Math.min(progressRank[readerStudy.status], 1)) {
  fail("Reader study advanced without the hiring-reader solicitation advancing");
}
if (readerStudy.status === "reviewed" && fieldAction.status !== "learned") {
  fail("Reviewed reader findings require the hiring-reader action to reach learned state");
}
if (fieldAction.status === "learned" && readerStudy.status !== "reviewed") {
  fail("Hiring-reader action reached learned state before reader findings were reviewed");
}
if (readerStudy.status !== "reviewed" && followThrough.status !== "planned") {
  fail("Job-search follow-through advanced before reader findings were reviewed");
}

function validateExternalReceipt(protocol, kind) {
  const allowedStatuses = kind === "reader study" ? ["planned", "attempted", "reviewed"] : ["planned", "attempted", "learned"];
  if (!allowedStatuses.includes(protocol.status)) fail(`${kind} protocol has an invalid status`);
  requireString(protocol.actionClass, `${kind} protocol actionClass`);
  requireString(protocol.receiptPath, `${kind} protocol receiptPath`);
  if (!protocol.receiptPath.startsWith("evals/portfolio-system-blind-spots/external-receipts/") || protocol.receiptPath.includes("..")) {
    fail(`${kind} receipt path escapes the governed receipt directory`);
  }
  const receiptPath = path.join(repoRoot, protocol.receiptPath);
  if (protocol.status === "planned") {
    if (existsSync(receiptPath)) fail(`${kind} has a receipt while still planned`);
    return null;
  }
  if (!existsSync(receiptPath)) {
    fail(`${kind} advanced without its external receipt`);
    return null;
  }
  requireContainedPath(receiptPath, path.join(repoRoot, "evals/portfolio-system-blind-spots/external-receipts"), `${kind} receipt`);
  const receiptSource = read(protocol.receiptPath);
  const receipt = parse(protocol.receiptPath);
  const commonFields = ["version", "actionDate", "actionClass", "coarseStatus", "privacyBoundary", "limitations", "testedSurfaceDigest", "postDecisionSurfaceDigest"];
  const requiredCommonFields = commonFields.filter((field) => field !== "postDecisionSurfaceDigest");
  const readerFields = ["sampleSize", "taskConditions", "aggregateCounts", "entrySurfaceResults", "thresholdOutcome", "fairRentConcernRaised", "decisions"];
  const fieldFields = ["aggregateLearning", "contentDecision"];
  const learned = protocol.status === "learned";
  const reviewed = protocol.status === "reviewed";
  strictKeys(
    receipt,
    kind === "reader study" ? [...commonFields, ...readerFields] : [...commonFields, ...fieldFields],
    `${kind} receipt`,
    kind === "reader study"
      ? [...requiredCommonFields, "sampleSize", "taskConditions", ...(reviewed ? ["aggregateCounts", "entrySurfaceResults", "thresholdOutcome", "fairRentConcernRaised", "decisions", "postDecisionSurfaceDigest"] : [])]
      : [...requiredCommonFields, ...(learned ? fieldFields : [])]
  );
  if (receipt.version !== 1) fail(`${kind} receipt version is invalid`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(receipt.actionDate ?? "")) fail(`${kind} receipt has an invalid date`);
  requireDate(receipt.actionDate, `${kind} receipt actionDate`);
  if (receipt.actionDate > today) fail(`${kind} receipt actionDate is in the future`);
  if (receipt.actionDate < controlState.reviewedAt) fail(`${kind} receipt predates the governing control state`);
  if (receipt.actionDate > protocol.deadline) fail(`${kind} receipt actionDate is after the protocol deadline`);
  if (receipt.actionClass !== protocol.actionClass) fail(`${kind} receipt action class is invalid`);
  if (receipt.coarseStatus !== protocol.receiptState) fail(`${kind} receipt coarse status does not match protocol state`);
  if (receipt.testedSurfaceDigest !== readerStudy.frozenSurfaceDigest) fail(`${kind} receipt references a different tested public surface`);
  if (kind === "reader study" && reviewed && receipt.postDecisionSurfaceDigest !== readerSurfaceSha256) {
    fail("Reader-study receipt does not identify the current post-decision surface");
  }
  requireString(receipt.actionDate, `${kind} receipt actionDate`);
  requireString(receipt.actionClass, `${kind} receipt actionClass`);
  requireString(receipt.coarseStatus, `${kind} receipt coarseStatus`);
  requireString(receipt.privacyBoundary, `${kind} receipt privacyBoundary`);
  requireString(receipt.testedSurfaceDigest, `${kind} receipt testedSurfaceDigest`);
  requireSha256(receipt.testedSurfaceDigest, `${kind} receipt testedSurfaceDigest`);
  if (receipt.postDecisionSurfaceDigest !== undefined) {
    requireString(receipt.postDecisionSurfaceDigest, `${kind} receipt postDecisionSurfaceDigest`);
    requireSha256(receipt.postDecisionSurfaceDigest, `${kind} receipt postDecisionSurfaceDigest`);
  }
  requireStringArray(receipt.limitations, `${kind} receipt limitations`);
  if (/"(?:name|email|employer|recipient|application|referral|verbatimFeedback|participants?)"\s*:/i.test(receiptSource)) {
    fail(`${kind} receipt contains an identifying or private field`);
  }
  if (kind === "reader study") {
    if (receipt.sampleSize !== 5) fail("Reader-study receipt sample size is invalid");
    requireString(receipt.taskConditions, "reader-study task conditions");
    if (receipt.aggregateCounts !== undefined) {
      strictKeys(receipt.aggregateCounts, ["surfaceCoverage", ...thresholdFields], "reader-study aggregate counts");
      strictKeys(receipt.aggregateCounts?.surfaceCoverage, readerStudy.frozenSurfaces, "reader-study surface counts");
      const expectedCoverage = { "/": 2, "/work/technical-operations": 2, "/work/fair-rent-nyc": 1, "/resume": 5, "/contact": 5 };
      for (const [surface, expected] of Object.entries(expectedCoverage)) {
        if (receipt.aggregateCounts?.surfaceCoverage?.[surface] !== expected) {
          fail(`Reader-study entry coverage ${surface} must equal ${expected}`);
        }
      }
      for (const field of thresholdFields) {
        const value = receipt.aggregateCounts?.[field];
        if (!Number.isInteger(value) || value < 0 || value > receipt.sampleSize) {
          fail(`Reader-study aggregate ${field} is invalid`);
        }
      }
    }
    const perEntryFields = ["sampleSize", ...thresholdFields];
    if (receipt.entrySurfaceResults !== undefined) {
      strictKeys(receipt.entrySurfaceResults, readerStudy.entrySurfaces, "reader-study entry-surface results");
      const expectedSamples = { "/": 2, "/work/technical-operations": 2, "/work/fair-rent-nyc": 1 };
      for (const [surface, expectedSample] of Object.entries(expectedSamples)) {
        const result = receipt.entrySurfaceResults?.[surface];
        strictKeys(result, perEntryFields, `reader-study result ${surface}`);
        if (result?.sampleSize !== expectedSample) fail(`Reader-study result ${surface} has the wrong sample size`);
        for (const field of perEntryFields.slice(1)) {
          if (!Number.isInteger(result?.[field]) || result[field] < 0 || result[field] > expectedSample) {
            fail(`Reader-study result ${surface}/${field} is invalid`);
          }
        }
      }
      if (receipt.aggregateCounts) {
        for (const field of perEntryFields.slice(1)) {
          const sum = Object.values(receipt.entrySurfaceResults).reduce((total, result) => total + result[field], 0);
          if (receipt.aggregateCounts[field] !== sum) fail(`Reader-study aggregate ${field} does not equal entry-surface results`);
        }
      }
    }
    if (receipt.thresholdOutcome !== undefined) {
      if (!receipt.aggregateCounts) fail("Reader-study threshold outcome lacks aggregate counts");
      strictKeys(receipt.thresholdOutcome, thresholdFields, "reader-study threshold outcome");
      const threshold = protocol.integerThresholds?.[String(receipt.sampleSize)];
      const expectedOutcome = Object.fromEntries(
        thresholdFields.map((field) => [field, receipt.aggregateCounts?.[field] >= threshold?.[field]])
      );
      if (JSON.stringify(receipt.thresholdOutcome) !== JSON.stringify(expectedOutcome)) {
        fail("Reader-study threshold outcome is not recomputed correctly");
      }
    }
    if (receipt.fairRentConcernRaised !== undefined) {
      requireBoolean(receipt.fairRentConcernRaised, "reader-study fairRentConcernRaised");
    }
    if (receipt.decisions !== undefined) requireStringArray(receipt.decisions, "reader-study decisions");
    if (reviewed) {
      if (!receipt.aggregateCounts || !receipt.entrySurfaceResults || !receipt.thresholdOutcome || !receipt.decisions) {
        fail("Reader-study reviewed receipt lacks aggregate counts, entry-surface results, threshold outcome, or decisions");
      }
      const threshold = protocol.integerThresholds?.[String(receipt.sampleSize)];
      if (!threshold) fail("Reader-study reviewed receipt lacks a matching threshold");
    }
  } else if (learned) {
    requireString(receipt.aggregateLearning, `${kind} receipt aggregateLearning`);
    requireString(receipt.contentDecision, `${kind} receipt contentDecision`);
  }
  return receipt;
}
const readerReceipt = validateExternalReceipt(readerStudy, "reader study");
const fieldActionReceipt = validateExternalReceipt(fieldAction, "field action");
const followThroughReceipt = validateExternalReceipt(followThrough, "job-search follow-through");
if (readerReceipt && fieldActionReceipt && fieldActionReceipt.actionDate > readerReceipt.actionDate) {
  fail("Hiring-reader solicitation is dated after the reader-study receipt");
}
if (readerReceipt && followThroughReceipt && followThroughReceipt.actionDate < readerReceipt.actionDate) {
  fail("Job-search follow-through predates the reviewed reader evidence");
}

const fairRentFollowUpRelativePath = readerStudy.fairRentFollowUpReceiptPath ?? "";
if (
  !fairRentFollowUpRelativePath.startsWith("evals/portfolio-system-blind-spots/external-receipts/") ||
  fairRentFollowUpRelativePath.includes("..")
) {
  fail("Fair Rent follow-up receipt path escapes the governed receipt directory");
}
const fairRentFollowUpPath = path.join(repoRoot, fairRentFollowUpRelativePath);
const fairRentResult = readerReceipt?.entrySurfaceResults?.["/work/fair-rent-nyc"];
const fairRentFollowUpRequired = readerStudy.status === "reviewed" && Boolean(
  fairRentResult && (
    fairRentResult.accurateRole < 1 ||
    fairRentResult.proofRecall < 1 ||
    fairRentResult.roleFitNamed < 1 ||
    readerReceipt?.fairRentConcernRaised === true
  )
);
if (readerStudy.status !== "reviewed" && existsSync(fairRentFollowUpPath)) {
  fail("Fair Rent follow-up receipt exists before the baseline reader study was reviewed");
}
if (fairRentFollowUpRequired && !existsSync(fairRentFollowUpPath)) {
  fail("Fair Rent baseline finding triggered a follow-up reader, but no receipt was returned");
}
if (existsSync(fairRentFollowUpPath)) {
  requireContainedPath(
    fairRentFollowUpPath,
    path.join(repoRoot, externalReceiptDirectory),
    "Fair Rent follow-up receipt"
  );
  const receiptSource = read(fairRentFollowUpRelativePath);
  const receipt = parse(fairRentFollowUpRelativePath);
  strictKeys(receipt, ["version", "actionDate", "actionClass", "testedSurfaceDigest", "postDecisionSurfaceDigest", "sampleSize", "taskConditions", "result", "decision", "privacyBoundary", "limitations"], "Fair Rent follow-up receipt");
  strictKeys(receipt.result, ["accurateRole", "proofRecall", "roleFitNamed", "trustOrConfusionRecorded"], "Fair Rent follow-up result");
  if (receipt.version !== 1 || receipt.actionClass !== "fair-rent-follow-up-reader" || receipt.sampleSize !== 1) {
    fail("Fair Rent follow-up receipt has invalid protocol metadata");
  }
  requireDate(receipt.actionDate, "Fair Rent follow-up actionDate");
  if (readerReceipt && receipt.actionDate < readerReceipt.actionDate) fail("Fair Rent follow-up predates the baseline reader receipt");
  if (receipt.actionDate > today || receipt.actionDate > readerStudy.deadline) fail("Fair Rent follow-up actionDate is invalid");
  requireSha256(receipt.testedSurfaceDigest, "Fair Rent follow-up testedSurfaceDigest");
  requireSha256(receipt.postDecisionSurfaceDigest, "Fair Rent follow-up postDecisionSurfaceDigest");
  if (receipt.testedSurfaceDigest !== readerReceipt?.postDecisionSurfaceDigest) fail("Fair Rent follow-up did not test the baseline study's post-decision surface");
  if (receipt.postDecisionSurfaceDigest !== readerSurfaceSha256) fail("Fair Rent follow-up does not identify the current post-decision surface");
  requireString(receipt.taskConditions, "Fair Rent follow-up taskConditions");
  requireString(receipt.decision, "Fair Rent follow-up decision");
  requireString(receipt.privacyBoundary, "Fair Rent follow-up privacyBoundary");
  requireStringArray(receipt.limitations, "Fair Rent follow-up limitations");
  for (const [field, value] of Object.entries(receipt.result ?? {})) {
    if (!Number.isInteger(value) || value < 0 || value > 1) fail(`Fair Rent follow-up ${field} is invalid`);
  }
  if (/"(?:name|email|employer|recipient|application|referral|verbatimFeedback|participant)"\s*:/i.test(receiptSource)) {
    fail("Fair Rent follow-up receipt contains an identifying or private field");
  }
}

const projectSourceReviews = controlState.sourceBalanceReview?.projectReviews ?? [];
if (projectSourceReviews.length < 6) fail("Source-balance control lacks project-level review receipts");
for (const review of projectSourceReviews) {
  strictKeys(review, ["project", "platformTraceRisk", "invisibleWorkDimensions", "evidenceDisposition", "nextDecision"], `source-balance project review ${review.project ?? "unknown"}`);
  for (const field of ["project", "platformTraceRisk", "invisibleWorkDimensions", "evidenceDisposition", "nextDecision"]) {
    if (!review[field]) fail(`Source-balance project review lacks ${field}`);
  }
  if (review.invisibleWorkDimensions?.length < 4) fail(`${review.project} source-balance review is too narrow`);
}
const populationPassProjects = new Set(
  knowledgeBank.researchInquiries
    .filter((inquiry) => derivedPopulationPassInquiries.includes(inquiry.id))
    .map((inquiry) => inquiry.project)
);
const reviewedBalanceProjects = new Set(projectSourceReviews.map((review) => review.project));
for (const project of populationPassProjects) {
  if (!reviewedBalanceProjects.has(project)) {
    fail(`Source-balance control lacks a review for population-pass project ${project}`);
  }
}

const normalizedRegisterSource = registerSource.replace(/\s+/g, " ");
for (const expectedText of [
  `${currentSnapshot.partiallyRecoveredInquiries} of ${currentSnapshot.researchInquiries}`,
  `${currentSnapshot.sources} sources`,
  `${currentSnapshot.claims} claims`,
  `${currentSnapshot.activeProjections} active`,
  `${currentSnapshot.heldProjections} held`
]) {
  if (!normalizedRegisterSource.includes(expectedText)) fail(`Blind-spot register narrative count is stale: ${expectedText}`);
}

for (const heading of [
  "## 1. External Reader Validation",
  "## 2. Inquiry Closure",
  "## 3. Individual Role Corroboration",
  "## 4. Countability And Platform Bias",
  "## 5. Composition And Argument",
  "## 6. Mosaic Privacy",
  "## 7. Evaluator Independence",
  "## 8. Action Conversion"
]) {
  if (!registerSource.includes(heading)) fail(`Blind-spot register is missing ${heading}`);
}
if (!/not-yet-measured/i.test(registerSource) || !/planned, not completed/i.test(registerSource)) {
  fail("Blind-spot register blurs planned actions or external outcomes");
}

const privatePattern = /\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|file:\/\/|\.photoslibrary|private\/tmp/i;
for (const [name, source] of [
  [suitePath, suiteSource],
  [controlsPath, controlsSource],
  [compositionPath, compositionSource],
  [mosaicPath, mosaicSource],
  [registerPath, registerSource]
]) {
  if (privatePattern.test(source)) fail(`${name} contains a private path`);
}

function computeJudgeScore(judgment, label) {
  strictKeys(judgment, Object.keys(judgeSchema.properties ?? {}), label, judgeSchema.required ?? []);
  requireString(judgment.judgeRunId, `${label}/judgeRunId`);
  if (!(suite.judgeProtocol?.independentRoles ?? []).includes(judgment.role)) fail(`${label}/role is invalid`);
  if (!/^[a-f0-9]{64}$/.test(judgment.bundleSha256 ?? "")) fail(`${label}/bundleSha256 is invalid`);
  requireBoolean(judgment.allHardGatesPassed, `${label}/allHardGatesPassed`);
  if (typeof judgment.weightedScore !== "number" || !Number.isFinite(judgment.weightedScore)) fail(`${label}/weightedScore must be finite`);
  requireInteger(judgment.minimumCriterionScore, `${label}/minimumCriterionScore`, 1);
  requireInteger(judgment.calibration, `${label}/calibration`, 1);
  if (!Array.isArray(judgment.hardGateFindings) || judgment.hardGateFindings.length !== 4) {
    fail(`${label} must contain exactly four hard-gate findings`);
  }
  for (const finding of judgment.hardGateFindings ?? []) {
    strictKeys(finding, ["id", "passed", "finding"], `${label}/${finding.id ?? "unknown-gate"}`);
    requireString(finding.id, `${label}/hardGateFinding/id`);
    requireBoolean(finding.passed, `${label}/${finding.id ?? "unknown-gate"}/passed`);
    requireString(finding.finding, `${label}/${finding.id ?? "unknown-gate"}/finding`);
  }
  strictKeys(judgment.scores, [...criterionIds], `${label}/scores`);
  for (const field of ["regressions", "requiredRevisions", "limitations"]) {
    requireStringArray(judgment[field], `${label}/${field}`, { allowEmpty: field !== "limitations" });
  }
  const scoreIds = new Set(Object.keys(judgment.scores ?? {}));
  for (const id of criterionIds) {
    if (!scoreIds.has(id)) fail(`${label} lacks score ${id}`);
  }
  for (const id of scoreIds) {
    if (!criterionIds.has(id)) fail(`${label} has unknown score ${id}`);
  }
  let weighted = 0;
  let minimum = 5;
  for (const [id, criterion] of criterionById) {
    const score = judgment.scores?.[id];
    if (!Number.isInteger(score) || score < 1 || score > 5) {
      fail(`${label}/${id} has invalid score ${score}`);
      continue;
    }
    weighted += (score / 5) * criterion.weight;
    minimum = Math.min(minimum, score);
  }
  const rounded = Math.round(weighted * 10) / 10;
  if (judgment.weightedScore !== rounded) fail(`${label} weighted score is not recomputed correctly`);
  if (judgment.minimumCriterionScore !== minimum) fail(`${label} minimum criterion score is incorrect`);
  if (judgment.calibration !== judgment.scores?.calibration) fail(`${label} calibration summary is incorrect`);
  const findingIds = uniqueIds(judgment.hardGateFindings ?? [], `${label} hard-gate findings`);
  for (const id of requiredGates) {
    if (!findingIds.has(id)) fail(`${label} lacks hard-gate finding ${id}`);
  }
  if (judgment.allHardGatesPassed !== (judgment.hardGateFindings ?? []).every((finding) => finding.passed === true)) {
    fail(`${label}/allHardGatesPassed disagrees with its findings`);
  }
  if (!judgment.limitations?.length) fail(`${label} lacks limitations`);
  return {
    weighted: rounded,
    minimum,
    qualifies:
      judgment.allHardGatesPassed === true &&
      (judgment.hardGateFindings ?? []).every((finding) => finding.passed === true) &&
      rounded >= stop.targetWeightedScore &&
      minimum >= stop.minimumCriterionScore &&
      judgment.scores?.calibration === 5 &&
      (judgment.regressions?.length ?? 0) <= stop.maxRegressions
  };
}

const currentPointerPath = path.join(evalRoot, "runs/current-run.json");
if (!existsSync(currentPointerPath)) fail("Blind-spot eval has no current-run pointer");
if (existsSync(currentPointerPath)) {
  requireContainedPath(currentPointerPath, path.join(evalRoot, "runs"), "current-run pointer");
}
const currentPointer = existsSync(currentPointerPath)
  ? JSON.parse(readFileSync(currentPointerPath, "utf8"))
  : {};
strictKeys(currentPointer, ["run"], "current-run pointer");
if (currentPointer.run !== undefined && !/^[a-z0-9][a-z0-9-]*$/.test(currentPointer.run)) {
  fail("current-run pointer has an invalid run name");
}
const runName = currentPointer.run;
const resultRelativePath = runName
  ? `evals/portfolio-system-blind-spots/runs/${runName}/result.json`
  : "";
if (!runName || !existsSync(path.join(repoRoot, resultRelativePath))) fail("Blind-spot eval has no current result");

if (runName && existsSync(path.join(repoRoot, resultRelativePath))) {
  const runDirectory = path.join(evalRoot, "runs", runName);
  requireContainedPath(runDirectory, path.join(evalRoot, "runs"), `${runName} run directory`);
  requireContainedPath(path.join(repoRoot, resultRelativePath), runDirectory, `${runName} result`);
  const resultSource = read(resultRelativePath);
  const result = parse(resultRelativePath);
  const provenanceRelativePath = `evals/portfolio-system-blind-spots/runs/${runName}/provenance.json`;
  const provenance = existsSync(path.join(repoRoot, provenanceRelativePath))
    ? parse(provenanceRelativePath)
    : {};
  if (existsSync(path.join(repoRoot, provenanceRelativePath))) {
    requireContainedPath(path.join(repoRoot, provenanceRelativePath), runDirectory, `${runName} provenance`);
  }
  strictKeys(result, ["version", "evalId", "systemControlStatus", "externalOutcomeStatus", "bundleSha256", "graphSnapshot", "iterations", "rounds"], `${runName}/result`);
  strictKeys(provenance, ["version", "trustBoundary", "judges"], `${runName}/provenance`);
  strictKeys(result.graphSnapshot, Object.keys(currentSnapshot), `${runName}/graph-snapshot`);
  if (!Array.isArray(result.rounds) || !Array.isArray(provenance.judges)) {
    fail(`${runName} result rounds and provenance judges must be arrays`);
  }
  if (result.version !== 1 || result.evalId !== suite.evalId) fail(`${runName} references the wrong eval`);
  if (result.systemControlStatus !== "passed") fail(`${runName} has not passed the system controls`);
  if (result.externalOutcomeStatus !== "not-yet-measured") fail(`${runName} confuses controls with outcomes`);
  if (result.bundleSha256 !== bundleSha256) fail(`${runName} bundle digest is stale`);
  if (!/^[a-f0-9]{64}$/.test(result.bundleSha256 ?? "")) fail(`${runName} result bundle digest is invalid`);
  requireInteger(result.iterations, `${runName}/iterations`, 1);
  if (provenance.version !== 1) fail(`${runName} provenance version is invalid`);
  requireString(provenance.trustBoundary, `${runName}/provenance trustBoundary`);
  for (const [key, value] of Object.entries(currentSnapshot)) {
    if (result.graphSnapshot?.[key] !== value) fail(`${runName} graph snapshot ${key} is stale`);
  }
  if (result.iterations !== result.rounds?.length || result.iterations > stop.maxIterations) {
    fail(`${runName} has an invalid iteration history`);
  }
  if (!/not cryptographic proof/i.test(provenance.trustBoundary ?? "")) {
    fail(`${runName} provenance must disclose that repository metadata is not cryptographic proof`);
  }
  const provenanceByJudgeId = new Map((provenance.judges ?? []).map((entry) => [entry.judgeRunId, entry]));
  if (provenanceByJudgeId.size !== (provenance.judges ?? []).length) fail(`${runName} provenance has duplicate judgeRunIds`);

  const sessionIds = new Set();
  const qualifying = [];
  const priorByRole = new Map();
  const roundLatestTimestamps = [];
  for (const [index, round] of (result.rounds ?? []).entries()) {
    strictKeys(round, ["round", "result", "judges"], `${runName}/round-${index + 1}`);
    requireInteger(round.round, `${runName}/round-${index + 1}/round`, 1);
    if (round.result !== "qualifying-pass") fail(`${runName} round ${round.round} has an invalid result state`);
    if (!Array.isArray(round.judges) || round.judges.length !== 2) fail(`${runName} round ${round.round} must have exactly two judges`);
    if (round.round !== index + 1) fail(`${runName} round numbers are not contiguous`);
    const judgments = [];
    const roundTimestamps = [];
    for (const judgeRef of round.judges ?? []) {
      strictKeys(judgeRef, ["judgeRunId", "role", "artifact", "sha256"], `${runName}/round-${round.round}/judge-ref`);
      requireString(judgeRef.judgeRunId, `${runName}/round-${round.round}/judgeRunId`);
      if (!(suite.judgeProtocol?.independentRoles ?? []).includes(judgeRef.role)) fail(`${runName}/round-${round.round} has an invalid judge role`);
      requireString(judgeRef.artifact, `${runName}/round-${round.round}/artifact`);
      if (!/^[a-f0-9]{64}$/.test(judgeRef.sha256 ?? "")) fail(`${runName}/round-${round.round} judge digest is invalid`);
      const requiredArtifactPrefix = `evals/portfolio-system-blind-spots/runs/${runName}/judges/`;
      const judgesDirectory = path.resolve(repoRoot, requiredArtifactPrefix);
      const artifactPath = path.resolve(repoRoot, judgeRef.artifact ?? "");
      const artifactWithinRun = path.relative(judgesDirectory, artifactPath);
      if (
        !judgeRef.artifact?.startsWith(requiredArtifactPrefix) ||
        !judgeRef.artifact.endsWith(".json") ||
        artifactWithinRun.startsWith("..") ||
        path.isAbsolute(artifactWithinRun)
      ) {
        fail(`${runName} judge artifact must stay inside the current run`);
      }
      if (!existsSync(artifactPath)) {
        fail(`${runName} is missing judge artifact ${judgeRef.artifact}`);
        continue;
      }
      requireContainedPath(artifactPath, judgesDirectory, `${runName} judge artifact ${judgeRef.artifact}`);
      const artifactSource = readFileSync(artifactPath, "utf8");
      if (sha256(artifactSource) !== judgeRef.sha256) fail(`${judgeRef.artifact} digest does not match`);
      if (privatePattern.test(artifactSource)) fail(`${judgeRef.artifact} contains a private path`);
      let judgment;
      try {
        judgment = JSON.parse(artifactSource);
      } catch (error) {
        fail(`${judgeRef.artifact} is invalid JSON: ${error.message}`);
        continue;
      }
      if (judgment.role !== judgeRef.role || judgment.judgeRunId !== judgeRef.judgeRunId) {
        fail(`${judgeRef.artifact} provenance does not match its round reference`);
      }
      const provenanceEntry = provenanceByJudgeId.get(judgment.judgeRunId);
      strictKeys(provenanceEntry, ["judgeRunId", "role", "artifact", "artifactSha256", "sessionId", "sessionMode", "generatorWasJudge", "commandSurface", "orchestratedAt"], `${judgeRef.artifact}/orchestration-receipt`);
      requireString(provenanceEntry?.judgeRunId, `${judgeRef.artifact}/provenance judgeRunId`);
      requireString(provenanceEntry?.role, `${judgeRef.artifact}/provenance role`);
      requireString(provenanceEntry?.artifact, `${judgeRef.artifact}/provenance artifact`);
      if (!/^[a-f0-9]{64}$/.test(provenanceEntry?.artifactSha256 ?? "")) fail(`${judgeRef.artifact}/provenance artifact digest is invalid`);
      requireString(provenanceEntry?.sessionId, `${judgeRef.artifact}/provenance sessionId`);
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(provenanceEntry?.sessionId ?? "")) fail(`${judgeRef.artifact}/provenance sessionId is invalid`);
      requireBoolean(provenanceEntry?.generatorWasJudge, `${judgeRef.artifact}/provenance generatorWasJudge`);
      requireString(provenanceEntry?.orchestratedAt, `${judgeRef.artifact}/provenance orchestratedAt`);
      requireTimestamp(provenanceEntry?.orchestratedAt, `${judgeRef.artifact}/provenance orchestratedAt`);
      if (Date.parse(provenanceEntry?.orchestratedAt ?? "") > Date.now()) fail(`${judgeRef.artifact}/provenance orchestratedAt is in the future`);
      if (provenanceEntry?.orchestratedAt) roundTimestamps.push(Date.parse(provenanceEntry.orchestratedAt));
      if (
        provenanceEntry?.artifact !== judgeRef.artifact ||
        provenanceEntry?.artifactSha256 !== judgeRef.sha256 ||
        provenanceEntry?.role !== judgeRef.role ||
        provenanceEntry?.sessionMode !== "read-only-independent-agent" ||
        provenanceEntry?.generatorWasJudge !== false ||
        provenanceEntry?.commandSurface !== "codex-exec-read-only" ||
        !provenanceEntry?.orchestratedAt
      ) {
        fail(`${judgeRef.artifact} lacks a matching orchestration receipt`);
      }
      if (!provenanceEntry?.sessionId || sessionIds.has(provenanceEntry.sessionId)) {
        fail(`${judgeRef.artifact} lacks a distinct session ID`);
      }
      sessionIds.add(provenanceEntry.sessionId);
      if (judgment.bundleSha256 !== bundleSha256) {
        fail(`${judgeRef.artifact} was not judged against the current bundle`);
      }
      const computed = computeJudgeScore(judgment, judgeRef.artifact);
      const prior = priorByRole.get(judgment.role);
      if (prior) {
        for (const gateId of requiredGates) {
          const priorGate = prior.hardGateFindings.find((finding) => finding.id === gateId)?.passed;
          const currentGate = judgment.hardGateFindings.find((finding) => finding.id === gateId)?.passed;
          if (priorGate === true && currentGate === false) fail(`${judgeRef.artifact} regresses hard gate ${gateId}`);
        }
        for (const [criterionId, criterion] of criterionById) {
          if (prior.scores[criterionId] >= criterion.minimumScore && judgment.scores[criterionId] < criterion.minimumScore) {
            fail(`${judgeRef.artifact} regresses ${criterionId} below its minimum`);
          }
        }
        if (prior.scores.calibration === 5 && judgment.scores.calibration < 5) {
          fail(`${judgeRef.artifact} regresses calibration`);
        }
      }
      priorByRole.set(judgment.role, judgment);
      judgments.push(computed);
    }
    const roles = new Set((round.judges ?? []).map((judge) => judge.role));
    for (const role of suite.judgeProtocol?.independentRoles ?? []) {
      if (!roles.has(role)) fail(`${runName} round ${round.round} lacks ${role}`);
    }
    const roundQualifies = judgments.length === 2 && judgments.every((judgment) => judgment.qualifies);
    if ((round.result === "qualifying-pass") !== roundQualifies) {
      fail(`${runName} round ${round.round} result disagrees with recomputed judgments`);
    }
    if (roundQualifies) qualifying.push(round.round);
    if (roundTimestamps.length) {
      const latest = Math.max(...roundTimestamps);
      const earliest = Math.min(...roundTimestamps);
      const priorLatest = roundLatestTimestamps.at(-1);
      if (priorLatest !== undefined && earliest < priorLatest) {
        fail(`${runName} round ${round.round} provenance predates the prior round`);
      }
      roundLatestTimestamps.push(latest);
    }
  }

  const expectedFinalRounds = Array.from(
    { length: stop.requiredConsecutivePasses },
    (_, index) => result.iterations - stop.requiredConsecutivePasses + index + 1
  );
  if (JSON.stringify(qualifying.slice(-stop.requiredConsecutivePasses)) !== JSON.stringify(expectedFinalRounds)) {
    fail(`${runName} does not end with ${stop.requiredConsecutivePasses} qualifying rounds`);
  }
  const referencedJudgeCount = (result.rounds ?? []).reduce((total, round) => total + (round.judges?.length ?? 0), 0);
  if (provenanceByJudgeId.size !== referencedJudgeCount) fail(`${runName} provenance contains missing or unreferenced judges`);
  if (privatePattern.test(resultSource)) fail(`${resultRelativePath} contains a private path`);
}

if (failures.length) {
  console.error("Portfolio system blind-spot eval check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `Portfolio system blind-spot eval passed: ${requiredBlindSpots.length} blind spots, ` +
    `${suite.hardGates.length} hard gates, ${criteria.length} criteria, bundle ${bundleSha256.slice(0, 12)}; ` +
    "external outcomes remain not-yet-measured."
);
