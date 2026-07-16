#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  return JSON.parse(read(relativePath));
}

const workSlugs = [
  "harry-j-epstein",
  "fair-rent-nyc",
  "callnyc",
  "wowlist",
  "196-sunday-dinner",
  "kc-town-hall"
];

const expectedDimensionIds = [
  "external-human-validation",
  "outcome-and-adoption-proof",
  "reader-compression",
  "visual-proof",
  "leadership-scale",
  "currentness",
  "audience-specific-conversion",
  "collective-accountability",
  "release-enforcement",
  "application-ready-stop-rule"
];

const protocol = read("docs/qa/portfolio-readiness-M.md");
const readinessRegister = readJson("docs/qa/portfolio-readiness-M.json");
const visualRegister = readJson("docs/qa/visual-proof-register-M.json");
const deliveryRegister = readJson("docs/qa/delivery-dimensions-M.json");
const packageJson = readJson("package.json");
const workData = read("apps/www/src/data/work.ts");
const workCard = read("apps/www/src/components/WorkCard.tsx");
const caseStudyBlocks = read("apps/www/src/components/CaseStudyBlocks.tsx");
const technicalOperations = read(
  "apps/www/src/app/work/technical-operations/page.tsx"
);
const proofData = read("apps/www/src/data/proofs.ts");
const workflow = read(".github/workflows/portfolio-readiness.yml");
const fairRent = read("apps/www/src/content/work/fair-rent-nyc.mdx");
const caseStudies = new Map(
  workSlugs.map((slug) => [
    slug,
    read(`apps/www/src/content/work/${slug}.mdx`)
  ])
);

const dimensionById = new Map(
  readinessRegister.dimensions.map((dimension) => [dimension.id, dimension])
);

function hasDimension(id, allowedStates) {
  const dimension = dimensionById.get(id);
  return Boolean(
    dimension &&
      allowedStates.includes(dimension.state) &&
      dimension.criterion?.trim() &&
      dimension.mode?.trim() &&
      dimension.blockingLevel?.trim()
  );
}

function hasEveryCaseStudyHeading(pattern) {
  return [...caseStudies.values()].every((content) => pattern.test(content));
}

const visualBySlug = new Map(
  visualRegister.projects.map((project) => [project.slug, project])
);
const deliveryBySlug = new Map(
  deliveryRegister.projects.map((project) => [project.slug, project])
);

const criteria = [
  {
    id: "external-human-validation",
    label: "Blinded human review is operationalized without synthetic results",
    pass: Boolean(
      hasDimension("external-human-validation", ["controlled-open"]) &&
        (protocol.match(/Not yet recorded/g) ?? []).length === 3 &&
        /What role would you refer Jamie for\?/i.test(protocol) &&
        /Did anything feel too private, unfairly credited, or overclaimed\?/i.test(
          protocol
        ) &&
        /Does the site feel legible and distinct/i.test(protocol) &&
        /Do\s+not record an AI role-play, Codex judgment, or Jamie's predicted answer/i.test(
          protocol
        )
    )
  },
  {
    id: "outcome-and-adoption-proof",
    label: "Every case study separates usable output, contribution, evidence, and transfer",
    pass: Boolean(
      hasDimension("outcome-and-adoption-proof", ["controlled"]) &&
        hasEveryCaseStudyHeading(/^## What became usable$/im) &&
        hasEveryCaseStudyHeading(/^## What I did$/im) &&
        hasEveryCaseStudyHeading(/^## Outcome (?:\/|and) evidence$/im) &&
        hasEveryCaseStudyHeading(/^## Transferable proof$/im) &&
        (workData.match(/^    whatBecameUsable:/gm) ?? []).length ===
          workSlugs.length &&
        (workData.match(/^    evidence: \[$/gm) ?? []).length === workSlugs.length
    )
  },
  {
    id: "reader-compression",
    label: "Role and result precede the deeper archive on every project",
    pass: Boolean(
      hasDimension("reader-compression", ["controlled"]) &&
        hasEveryCaseStudyHeading(/^## Context$/im) &&
        hasEveryCaseStudyHeading(/^## What was unclear$/im) &&
        /\["Role", item\.role\]/.test(caseStudyBlocks) &&
        /\["Role fit", item\.roleFit\]/.test(caseStudyBlocks) &&
        /Jamie(?:'|&apos;)s role/.test(workCard) &&
        /\{item\.role\}/.test(workCard)
    )
  },
  {
    id: "visual-proof",
    label: "Every project has a rights-aware visual candidate without false completion",
    pass: Boolean(
      hasDimension("visual-proof", ["controlled-open"]) &&
        visualBySlug.size === workSlugs.length &&
        workSlugs.every((slug) => {
          const project = visualBySlug.get(slug);
          return (
            ["linked-public-artifact", "candidate-rights-review"].includes(
              project?.state
            ) &&
            project?.candidate?.trim() &&
            project?.rightsGuardrail?.trim()
          );
        }) &&
        /Artifact descriptions are not\s+visual evidence/i.test(protocol) &&
        /attribution, rights, consent, visible text, privacy/i.test(protocol)
    )
  },
  {
    id: "leadership-scale",
    label: "Delivery dimensions are visible while unsupported scale remains bounded",
    pass: Boolean(
      hasDimension("leadership-scale", ["controlled-open"]) &&
        deliveryBySlug.size === workSlugs.length &&
        workSlugs.every((slug) => {
          const project = deliveryBySlug.get(slug);
          return (
            project?.status === "bounded" &&
            project.coordination?.trim() &&
            project.constraints?.trim() &&
            project.continuity?.trim() &&
            /^Do not infer/i.test(project.scaleBoundary ?? "")
          );
        }) &&
        /Exact team counts, budgets, decision authority/i.test(protocol)
    )
  },
  {
    id: "currentness",
    label: "Technical Operations visibly connects historical depth to current practice",
    pass: Boolean(
      hasDimension("currentness", ["controlled"]) &&
        /currentPracticeProofs/.test(technicalOperations) &&
        /Recent practice/.test(technicalOperations) &&
        /Current work extends the same operating discipline/i.test(
          technicalOperations
        ) &&
        [
          "fair-rent-90-day-operating-plan",
          "source-backed-team-memory-method",
          "ai-evals-professional-development"
        ].every((id) => proofData.includes(`proofId: "${id}"`)) &&
        /id: "ai-evals-professional-development"[\s\S]*?surfaces: \["resume", "technical-operations", "lab", "about"\]/.test(
          proofData
        )
    )
  },
  {
    id: "audience-specific-conversion",
    label: "Priority audiences have bounded routes, proof paths, and actions",
    pass: Boolean(
      hasDimension("audience-specific-conversion", ["controlled"]) &&
        [
          "OTI / technical operations",
          "Civic and public-interest implementation",
          "Knowledge systems / AI operations",
          "Referrer / hiring generalist",
          "`/work/technical-operations`",
          "`/lab/source-backed-team-memory`",
          "`/resume`",
          "`/contact`"
        ].every((text) => protocol.includes(text)) &&
        /Do not add\s+audience-specific landing pages/i.test(protocol)
    )
  },
  {
    id: "collective-accountability",
    label: "Collective credit is visible and collaborator approval cannot be fabricated",
    pass: Boolean(
      hasDimension("collective-accountability", ["controlled-open"]) &&
        (workData.match(/^    credits: \[/gm) ?? []).length === workSlugs.length &&
        /Collective-work language is required/i.test(workData) &&
        /campaign work.*remains collective/is.test(fairRent) &&
        /No AI role-play counts as collaborator approval/i.test(protocol) &&
        /No missing reply counts as\s+consent/i.test(protocol)
    )
  },
  {
    id: "release-enforcement",
    label: "The full check is enforced locally and on pull requests",
    pass: Boolean(
      hasDimension("release-enforcement", ["controlled"]) &&
        packageJson.scripts.check.includes("check:portfolio-readiness") &&
        packageJson.scripts["check:evals"].includes("check:portfolio-readiness") &&
        packageJson.scripts["preflight:staging"].includes("npm run check") &&
        packageJson.scripts["preflight:production"].includes("npm run check") &&
        /pull_request:/.test(workflow) &&
        /run: npm ci/.test(workflow) &&
        /run: npm run check/.test(workflow)
    )
  },
  {
    id: "application-ready-stop-rule",
    label: "A factual stopping rule prevents P2 work from delaying applications",
    pass: Boolean(
      hasDimension("application-ready-stop-rule", ["controlled"]) &&
        /Applications may proceed when the exact commit being shared passes/i.test(
          protocol
        ) &&
        /has no P0 blocker/i.test(protocol) &&
        /External reviews may continue in\s+parallel/i.test(protocol) &&
        /P2 visual refinement, broader archive recovery, additional source discovery/i.test(
          protocol
        ) &&
        /employment\s+wait for archival completeness/i.test(protocol)
    )
  }
];

const registerIsComplete =
  dimensionById.size === expectedDimensionIds.length &&
  expectedDimensionIds.every((id) => dimensionById.has(id));

if (!registerIsComplete) {
  console.error("Portfolio readiness register must contain each expected dimension exactly once.");
  process.exit(1);
}

const passed = criteria.filter((criterion) => criterion.pass).length;

console.log(`Portfolio readiness eval: ${passed}/${criteria.length}`);
for (const criterion of criteria) {
  console.log(`${criterion.pass ? "PASS" : "FAIL"} ${criterion.id}: ${criterion.label}`);
}

if (passed !== criteria.length) {
  console.error(
    "Portfolio readiness criterion not met. Resolve failed controls without inventing evidence, approval, or human-review results."
  );
  process.exit(1);
}

console.log("Portfolio readiness criterion met.");
