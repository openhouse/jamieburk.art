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

const expectedLensIds = ["margaret-morse", "warren-sack"];
const register = readJson("docs/qa/professor-lenses-M.json");
const protocol = read("docs/qa/recursive-evals-M.md");
const lensGuide = read("docs/qa/professor-lenses-M.md");
const packageJson = readJson("package.json");
const aboutPage = read("apps/www/src/app/about/page.tsx");
const evidenceBatch = read(
  "apps/www/src/data/knowledge-bank/evidence-batch-2026-07-12.ts"
);
const developmentRecords = read(
  "apps/www/src/data/knowledge-bank/development-records.ts"
);
const publicRegistry = read(
  "apps/www/src/data/knowledge-bank/public-registry.json"
);

const lensById = new Map(register.lenses.map((lens) => [lens.id, lens]));

function hasLens(id, criterionPattern, failurePattern) {
  const lens = lensById.get(id);
  return Boolean(
    lens &&
      lens.state === "controlled" &&
      lens.mode === "source-bounded editorial and automated" &&
      lens.publicSurface === "/about" &&
      criterionPattern.test(lens.criterion) &&
      failurePattern.test(lens.failureMode) &&
      Array.isArray(lens.sourceBasis) &&
      lens.sourceBasis.length >= 2
  );
}

const sharedControlsPass = Boolean(
  lensById.size === expectedLensIds.length &&
    expectedLensIds.every((id) => lensById.has(id)) &&
    /Codex-authored evaluation lenses/i.test(register.sharedBoundary) &&
    /not a fresh review, testimonial, or approval/i.test(
      register.sharedBoundary
    ) &&
    /Protected academic records and private correspondence stay outside/i.test(
      register.sharedBoundary
    ) &&
    /not simulated testimonials/i.test(lensGuide) &&
    /does not represent a\s+fresh review, endorsement, or approval/i.test(
      lensGuide
    ) &&
    /check:professor-lenses/.test(protocol) &&
    /Prof\. Margaret Morse/.test(protocol) &&
    /Prof\. Warren Sack/.test(protocol) &&
    packageJson.scripts["check:professor-lenses"] ===
      "node scripts/check-professor-lenses.mjs" &&
    packageJson.scripts.check.includes("check:professor-lenses") &&
    packageJson.scripts["check:evals"].includes("check:professor-lenses") &&
    publicRegistry.includes("SRC-OPEN-HOUSE-GOOD-TIMES-2006") &&
    publicRegistry.includes("CLM-PARTICIPATORY-PUBLIC-SYSTEMS-THROUGHLINE")
);

const criteria = [
  {
    id: "margaret-morse",
    label:
      "Artistic, civic, technical, and social practice remains visibly connected",
    pass: Boolean(
      sharedControlsPass &&
        hasLens(
          "margaret-morse",
          /artistic, civic, technical, and social practices/i,
          /organizational utility/i
        ) &&
        /artistic, civic, technical, and social practice/i.test(evidenceBatch) &&
        /participation, shared responsibility, documentation, and care for how people inhabit a place/i.test(
          evidenceBatch
        ) &&
        /participation,\s+hospitality, memory, and attention/i.test(
          aboutPage
        ) &&
        /AST-OPEN-HOUSE-TENDING/.test(developmentRecords) &&
        /AST-OPEN-HOUSE-ART-LIFE/.test(developmentRecords) &&
        /technical project manager and implementation\s+lead/i.test(aboutPage)
    )
  },
  {
    id: "warren-sack",
    label:
      "Original social-technical pattern finding and prototyping remains visible",
    pass: Boolean(
      sharedControlsPass &&
        hasLens(
          "warren-sack",
          /patterns connecting people, information, and place/i,
          /only as an implementer of settled requirements/i
        ) &&
        /patterns connecting\s+people, information, and place/i.test(
          aboutPage
        ) &&
        /interfaces,\s+workflows, and prototypes/i.test(aboutPage) &&
        /AST-OPEN-HOUSE-SOCIAL-SOFTWARE/.test(developmentRecords) &&
        /social[- ]software/i.test(developmentRecords) &&
        /technical project manager and implementation\s+lead/i.test(aboutPage)
    )
  }
];

const passed = criteria.filter((criterion) => criterion.pass).length;

console.log(`Professor lens eval: ${passed}/${criteria.length}`);
for (const criterion of criteria) {
  console.log(
    `${criterion.pass ? "PASS" : "FAIL"} ${criterion.id}: ${criterion.label}`
  );
}

if (passed !== criteria.length) {
  console.error(
    "Professor lens criterion not met. Preserve source boundaries while restoring the missing public-practice signals."
  );
  process.exit(1);
}

console.log("Professor lens criterion met.");
