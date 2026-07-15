#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

const sources = {
  hero: read("apps/www/src/components/Hero.tsx"),
  technicalOperations: read("apps/www/src/app/work/technical-operations/page.tsx"),
  resume: read("apps/www/src/app/resume/page.tsx"),
  workPage: read("apps/www/src/app/work/page.tsx"),
  workCard: read("apps/www/src/components/WorkCard.tsx"),
  workData: read("apps/www/src/data/work.ts"),
  proofData: read("apps/www/src/data/proofs.ts"),
  fairRent: read("apps/www/src/content/work/fair-rent-nyc.mdx")
};

const usableOutputs = [
  "action trackers",
  "analytics",
  "campaign memory",
  "cold shell",
  "documentation",
  "event distribution",
  "facilitation",
  "guidance",
  "handoffs",
  "issue pathways",
  "onboarding",
  "planning materials",
  "platform",
  "public-benefit documentation",
  "source maps",
  "survey",
  "web",
  "workflow",
  "workflows"
];

const outcomeStatements = [
  ...sources.workData.matchAll(/whatBecameUsable:\s*\n?\s*"([^"]+)"/g)
].map((match) => match[1].toLowerCase());

const collectiveSources = `${sources.workData}\n${sources.fairRent}`;

const criteria = [
  {
    id: "hero-actor",
    label: "Homepage names Jamie's action in first person",
    pass: /I create operating structure/.test(sources.hero)
  },
  {
    id: "hero-end",
    label: "Homepage says what the structure lets people do",
    pass: /so (?:people|teams) can/i.test(sources.hero)
  },
  {
    id: "technical-operations-actor",
    label: "Technical Operations names Jamie's action in first person",
    pass: /\bI build\b/.test(sources.technicalOperations)
  },
  {
    id: "technical-operations-end",
    label: "Technical Operations states the team's resulting agency",
    pass: /so teams can/i.test(sources.technicalOperations)
  },
  {
    id: "resume-actor",
    label: "Resume page names Jamie's action in first person",
    pass: /I create operating structure/.test(sources.resume)
  },
  {
    id: "resume-end",
    label: "Resume page states the team's resulting agency",
    pass: /so teams can/i.test(sources.resume)
  },
  {
    id: "work-introduction",
    label: "Work index connects Jamie's role to a practical result",
    pass: /\bI (?:help|build|create)\b[\s\S]{0,240}\bso (?:people|teams|collaborators) can\b/i.test(
      sources.workPage
    )
  },
  {
    id: "work-card-role",
    label: "Every work card exposes Jamie's role and dates before project detail",
    pass:
      /Jamie(?:'|&apos;)s role/.test(sources.workCard) &&
      /\{item\.role\}/.test(sources.workCard) &&
      /\{item\.years\}/.test(sources.workCard)
  },
  {
    id: "usable-outcomes",
    label: "Every structured work item names a concrete usable output",
    pass:
      outcomeStatements.length === 6 &&
      outcomeStatements.every((statement) =>
        usableOutputs.some((output) => statement.includes(output))
      )
  },
  {
    id: "collective-credit",
    label: "Collective civic work retains contribution and stewardship language",
    pass:
      /collective-work language|collective campaign|work remains collective/i.test(
        collectiveSources
      ) && /helped|contributed|steward/i.test(collectiveSources)
  },
  {
    id: "crs-operating-plan-specificity",
    label: "Fair Rent makes Jamie's planning action and the usable operating outputs concrete",
    pass:
      /CLM-CRS-90-DAY-OPERATING-PLAN/.test(sources.fairRent) &&
      /fair-rent-90-day-operating-plan/.test(sources.proofData) &&
      /sequenced 90-day coalition operating plan/.test(sources.proofData) &&
      /concrete deliverables, success conditions, consent boundaries, and decision infrastructure/.test(
        sources.proofData
      )
  },
  {
    id: "nycac-government-interface-result",
    label: "Fair Rent explains what coalition infrastructure made usable to government",
    pass:
      /CLM-NYCAC-GOVERNMENT-INTERFACE-2017-2019/.test(sources.fairRent) &&
      /CLM-NYCAC-PUBLIC-TESTIMONY-2017-2019/.test(sources.fairRent) &&
      /co-founding NYC Artist Coalition, creating its logo and shared public identity, building campaign websites/.test(
        sources.fairRent
      )
  }
];

const passed = criteria.filter((criterion) => criterion.pass).length;

console.log(`Chad lens eval: ${passed}/${criteria.length}`);
for (const criterion of criteria) {
  console.log(`${criterion.pass ? "PASS" : "FAIL"} ${criterion.id}: ${criterion.label}`);
}

if (passed !== criteria.length) {
  console.error(
    "Chad lens criterion not met. Revise the failing public surfaces and rerun npm run check:chad-lens."
  );
  process.exit(1);
}

console.log("Chad lens criterion met.");
