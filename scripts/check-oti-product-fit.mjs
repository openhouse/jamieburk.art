import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  fingerprintProfessorCandidate,
  professorCandidateRelativePaths
} from "./lib/professor-lens-eval.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(scriptDir, "..");
const finalScorecardRelativePaths = [
  "docs/qa/launch-C/oti-product-fit-final-a.json",
  "docs/qa/launch-C/oti-product-fit-final-b.json",
  "docs/qa/launch-C/oti-product-fit-final-c.json"
];

export function evaluateOtiProductFit(root = defaultRoot, overrides = {}) {
  const read = (file) => overrides[file] ?? readFileSync(path.join(root, file), "utf8");
  const readBuffer = (file) =>
    overrides[file] !== undefined
      ? Buffer.from(overrides[file])
      : readFileSync(path.join(root, file));
  const exists = (file) => overrides[file] !== undefined || existsSync(path.join(root, file));
  const failures = [];
  const requireSignal = (condition, message) => {
    if (!condition) failures.push(message);
  };

  const home = read("apps/www/src/app/page.tsx");
  const hero = read("apps/www/src/components/Hero.tsx");
  const role = read("apps/www/src/app/work/technical-operations/page.tsx");
  const header = read("apps/www/src/components/SiteHeader.tsx");
  const photography = read("apps/www/src/data/photography.ts");
  const fairRent = read("apps/www/src/data/knowledge-bank/fair-rent-recent-advocacy-2026-08.ts");
  const candidateFiles = Object.fromEntries(
    professorCandidateRelativePaths.map((file) => [file, readBuffer(file)])
  );
  const candidateSha256 = fingerprintProfessorCandidate(candidateFiles);

  requireSignal(hero.includes("Jamie Burkart"), "first viewport must name Jamie");
  requireSignal(
    hero.includes("Product leadership for public-facing systems."),
    "first viewport must state the public-product proposition"
  );
  requireSignal(
    ["discovery", "prototyping", "launch", "measurement", "handoff"].every((term) =>
      hero.includes(term)
    ),
    "first viewport must state the full product lifecycle"
  );
  requireSignal(
    hero.includes("/work/technical-operations") && hero.includes("/resume"),
    "first viewport must link product proof and resume"
  );
  requireSignal(header.includes('label: "Product Delivery"'), "navigation must use product-first language");

  for (const product of ["WOW List", "CallNYC", "Fair Rent NYC"]) {
    requireSignal(home.includes(product), `homepage must feature ${product}`);
    requireSignal(role.includes(product), `product-delivery page must map ${product}`);
  }

  for (const stage of ["Frame", "Deliver", "Learn"]) {
    requireSignal(role.includes(`title: "${stage}"`), `product-delivery page must include ${stage}`);
  }

  requireSignal(
    fairRent.includes('id: "CLM-FAIRRENT-REPORT-REVIEW-2026"') &&
      fairRent.includes('key: "case-study"') &&
      fairRent.includes('status: "active"') &&
      fairRent.includes('surfaces: ["/work/fair-rent-nyc"]'),
    "bounded recent Fair Rent report-review evidence must be active on the case study"
  );
  requireSignal(
    fairRent.includes('id: "CLM-FAIRRENT-PUBLIC-SPEECH-2026-07-29"'),
    "bounded recent Fair Rent public-speaking evidence must remain canonical"
  );

  const photoFiles = [
    "public-work-conversation.webp",
    "collective-synthesis.webp",
    "callnyc-interface.webp",
    "fair-rent-materials.webp",
    "material-repair.webp",
    "inventive-logistics.webp"
  ];
  for (const file of photoFiles) {
    requireSignal(
      exists(`apps/www/public/images/portfolio/${file}`),
      `authorized portfolio derivative is missing: ${file}`
    );
  }

  requireSignal(
    (photography.match(/knowledgeStatus: "portfolio-authorized"/g) ?? []).length === 6,
    "exactly six selected photographs must be portfolio-authorized"
  );
  requireSignal(
    (photography.match(/^      production: "approved",$/gm) ?? []).length === 6 &&
      (photography.match(/^      indexing: "approved"$/gm) ?? []).length === 6,
    "selected photographs must record production and indexing authorization"
  );
  requireSignal(
    !/(?:\/Users\/|\/Volumes\/|Photos Library|sourceAssetId|privatePreview)/.test(
      `${home}\n${hero}\n${role}\n${photography}`
    ),
    "public product surfaces must not expose private photo locators"
  );

  const scorecards = finalScorecardRelativePaths.map((file) => JSON.parse(read(file)));
  requireSignal(
    scorecards.length === 3 && scorecards.every((scorecard) =>
      scorecard.phase === "holdout" &&
      scorecard.lensId === "PR-017" &&
      scorecard.score === 4 &&
      scorecard.pass === true &&
      scorecard.candidateSha256 === candidateSha256 &&
      typeof scorecard.tenSecondSummary === "string" &&
      scorecard.tenSecondSummary.trim().length > 0 &&
      Array.isArray(scorecard.inventedClaims) &&
      scorecard.inventedClaims.length === 0
    ),
    `three independent PR-017 holdouts must pass at 4 with no invented claims and match candidate ${candidateSha256}`
  );

  return {
    pass: failures.length === 0,
    failures,
    candidateSha256,
    scorecards
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = evaluateOtiProductFit();
  if (!result.pass) {
    console.error("OTI product-fit evaluation failed:");
    for (const failure of result.failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log(
    `OTI product-fit evaluation passed: deterministic product proof and 3/3 exact-candidate hiring holdouts at 4 (${result.candidateSha256}).`
  );
}
