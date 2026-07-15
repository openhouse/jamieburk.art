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
  home: read("apps/www/src/app/page.tsx"),
  workIndex: read("apps/www/src/app/work/page.tsx"),
  workCard: read("apps/www/src/components/WorkCard.tsx"),
  resume: read("apps/www/src/app/resume/page.tsx"),
  technicalOperations: read(
    "apps/www/src/app/work/technical-operations/page.tsx"
  ),
  fairRent: read("apps/www/src/content/work/fair-rent-nyc.mdx"),
  proofs: read("apps/www/src/data/proofs.ts"),
  workData: read("apps/www/src/data/work.ts"),
  chadLens: read("docs/chad-lens.md"),
  knowledgeBankLens: read("docs/knowledge-bank/chad-lens.md")
};

const checks = [];

function check(dimension, label, points, passes, hard = false) {
  checks.push({ dimension, label, points, passes: Boolean(passes), hard });
}

function includesAll(source, values) {
  return values.every((value) => source.includes(value));
}

check(
  "Actor visibility",
  "The first viewport names Jamie, the target role, and Jamie's action",
  8,
  includesAll(sources.hero, [
    "Jamie Burkart",
    "Technical Project Manager - Product Operations & Implementation",
    "I create operating structure"
  ]),
  true
);
check(
  "Actor visibility",
  "Every work card projects the explicit project role",
  8,
  includesAll(sources.workCard, ["Jamie's role", "item.role"]),
  true
);
check(
  "Actor visibility",
  "The work index frames the transformation as Jamie's work",
  4,
  /\bI\s+(?:turn|build|create|help|translate|coordinate)\b/.test(
    sources.workIndex
  )
);

check(
  "Purpose",
  "The portfolio repeatedly answers what became usable",
  6,
  includesAll(sources.workCard, ["What became usable", "item.whatBecameUsable"])
);
check(
  "Purpose",
  "Technical Operations ties each capability to an end",
  5,
  includesAll(sources.technicalOperations, ["row.toward", "proof.shortWording"])
);
check(
  "Purpose",
  "The hero names usable outputs and durable handoffs",
  4,
  includesAll(sources.hero, ["usable", "launch support", "durable handoffs"])
);

check(
  "Concrete work",
  "The first viewport names specific operating artifacts",
  7,
  includesAll(sources.hero, [
    "requirements",
    "workflows",
    "documentation",
    "decision trails",
    "onboarding"
  ])
);
check(
  "Concrete work",
  "The role-fit page names delivery, risk, records, onboarding, and handoffs",
  7,
  includesAll(sources.technicalOperations, [
    "Coordinate delivery",
    "surface risks",
    "decision records",
    "Onboard collaborators",
    "handoff"
  ])
);
check(
  "Concrete work",
  "Work records carry role, proof, usability, evidence, and role-fit fields",
  6,
  includesAll(sources.workData, [
    "role: z.string()",
    "proofBankIds: z.array(z.string())",
    "whatBecameUsable: z.string()",
    "roleFit: z.string()",
    "evidence: z.array(z.string())"
  ]),
  true
);

check(
  "One-pass legibility",
  "The homepage supplies a short hiring-reviewer path",
  5,
  includesAll(sources.home, [
    "Quick path through the portfolio",
    "hiring managers",
    "/work/technical-operations",
    "/resume"
  ])
);
check(
  "One-pass legibility",
  "Resume and contact actions are visible in the application path",
  5,
  includesAll(sources.resume, ["Download resume PDF", "Contact Jamie"])
);
check(
  "One-pass legibility",
  "Work cards separate role, problem, result, and role fit",
  5,
  includesAll(sources.workCard, [
    "Jamie's role",
    "What was unclear",
    "What became usable",
    "Role fit"
  ])
);

check(
  "Defensible strength",
  "The homepage retains the strongest approved scale and impact proofs",
  6,
  includesAll(sources.proofs, [
    '"career-operating-structure-14-years"',
    '"hje-revenue-growth-contribution"',
    '"fair-rent-campaign-memory"',
    '"wowlist-community-platform"',
    '"sunday-dinner-196-participation-infrastructure"'
  ])
);
check(
  "Defensible strength",
  "Direct NYC Artist Coalition website authorship remains visible",
  5,
  includesAll(sources.proofs, [
    "Co-founded NYC Artist Coalition and built public campaign websites",
    '"nyc-artist-coalition-public-web-infrastructure"'
  ]),
  true
);
check(
  "Defensible strength",
  "Evidence strength is paired with source basis and guardrails",
  4,
  includesAll(sources.proofs, [
    "supportLevel:",
    "sourceBasis:",
    "guardrail:",
    "protectedBoundaries:"
  ]),
  true
);
check(
  "Defensible strength",
  "KC Town Hall advances from recommendation to appropriation without implying receipt",
  6,
  includesAll(sources.proofs, [
    "City Council acceptance and appropriation",
    "project ultimately withdrew",
    "KC Town Hall received or spent $490,539",
    "Jamie personally secured or controlled the Council vote"
  ]) &&
    includesAll(sources.workData, [
      "$490,539 proposal advanced from a unanimous board recommendation to City Council acceptance and appropriation",
      "the full unused appropriation was reclaimed"
    ]),
  true
);

const forbiddenPublicOverclaims = [
  "Jamie single-handedly caused policy outcomes",
  "Jamie alone repealed the Cabaret Law",
  "Jamie authored the legislation",
  "Jamie organized KC Spaces Fund",
  "Jamie is certified by Maven as an AI evaluator"
];
const publicProjection = [
  sources.hero,
  sources.home,
  sources.workIndex,
  sources.workCard,
  sources.resume,
  sources.technicalOperations,
  sources.fairRent
].join("\n");

check(
  "Collective credit",
  "Direct contribution and collective campaign credit coexist",
  6,
  includesAll(sources.fairRent, [
    "Jamie's role was more direct",
    "co-founding NYC Artist Coalition",
    "building campaign websites",
    "campaign work around those sites remains collective"
  ]),
  true
);
check(
  "Collective credit",
  "Careful proofs preserve contribution and stewardship guardrails",
  5,
  includesAll(sources.proofs, [
    "Must stay as contribution language",
    "campaign accomplishments remain collective",
    "public organizer credit remains"
  ]),
  true
);
check(
  "Collective credit",
  "Public projection contains no known inflated claims",
  4,
  forbiddenPublicOverclaims.every((claim) => !publicProjection.includes(claim)),
  true
);

check(
  "Criterion integrity",
  "The evaluator is grounded in both Chad-lens source documents",
  5,
  includesAll(sources.chadLens, [
    "Is Jamie visible as the actor?",
    'answer "toward what end?"',
    "what became usable",
    "courageous precision"
  ]) &&
    includesAll(sources.knowledgeBankLens, [
      "Do not make the reader decode Jamie",
      "neither understatement nor overclaiming"
    ]),
  true
);

const possiblePoints = checks.reduce((total, item) => total + item.points, 0);
const earnedPoints = checks.reduce(
  (total, item) => total + (item.passes ? item.points : 0),
  0
);
const score = Math.round((earnedPoints / possiblePoints) * 100);
const failedChecks = checks.filter((item) => !item.passes);
const failedHardChecks = failedChecks.filter((item) => item.hard);
const threshold = 90;

console.log(`Chad-lens eval: ${score}/100 (criterion: >= ${threshold}, no hard failures)`);

for (const dimension of [...new Set(checks.map((item) => item.dimension))]) {
  const dimensionChecks = checks.filter((item) => item.dimension === dimension);
  const dimensionEarned = dimensionChecks.reduce(
    (total, item) => total + (item.passes ? item.points : 0),
    0
  );
  const dimensionPossible = dimensionChecks.reduce(
    (total, item) => total + item.points,
    0
  );
  console.log(`- ${dimension}: ${dimensionEarned}/${dimensionPossible}`);
}

if (failedChecks.length) {
  console.error("Chad-lens gaps:");
  for (const item of failedChecks) {
    console.error(`- ${item.hard ? "HARD " : ""}${item.dimension}: ${item.label}`);
  }
}

if (score < threshold || failedHardChecks.length) {
  process.exit(1);
}

console.log("Chad-lens criterion met.");
