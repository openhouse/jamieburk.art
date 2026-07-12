#!/usr/bin/env node

import { readFileSync } from "node:fs";

const failures = [];
const read = (file) => readFileSync(file, "utf8");
const requireText = (source, expected, message) => {
  if (!source.includes(expected)) failures.push(message);
};

const homepage = read("apps/www/src/app/page.tsx");
const hero = read("apps/www/src/components/Hero.tsx");
const workCard = read("apps/www/src/components/WorkCard.tsx");
const caseStudy = read("apps/www/src/components/CaseStudyLayout.tsx");
const contactCta = read("apps/www/src/components/ContactCTA.tsx");
const capabilityGrid = read("apps/www/src/components/CapabilityGrid.tsx");
const workData = read("apps/www/src/data/work.ts");
const technicalOperations = read(
  "apps/www/src/app/work/technical-operations/page.tsx"
);

for (const [file, source] of [
  ["apps/www/src/app/page.tsx", homepage],
  ["apps/www/src/app/work/technical-operations/page.tsx", technicalOperations]
]) {
  if (/\b(?:OTI|HJE)\b/.test(source)) {
    failures.push(`${file} contains an unexplained hiring-path abbreviation`);
  }
}

if (/\bQA\/UAT\b/.test(capabilityGrid)) {
  failures.push(
    "Capability language must spell out quality assurance and user-acceptance testing"
  );
}
requireText(
  workData,
  "Historic adaptive reuse planning in Kansas City",
  "KC Town Hall must be immediately contextualized as Kansas City work"
);

for (const [file, source] of [
  ["apps/www/src/components/Hero.tsx", hero],
  ["apps/www/src/components/ContactCTA.tsx", contactCta],
  ["apps/www/src/components/CaseStudyLayout.tsx", caseStudy]
]) {
  if (/href="\/resume"[\s\S]{0,120}>\s*Download resume/i.test(source)) {
    failures.push(`${file} labels an HTML resume-page link as a download`);
  }
}

if (!/make decisions,\s+launch public work,\s+and transfer\s+ownership/.test(hero)) {
  failures.push("Hero must name the practical end served by Jamie's operating work");
}
requireText(
  workCard,
  "My role",
  "Work cards must make Jamie's role visible"
);
requireText(
  workCard,
  "item.role",
  "Work cards must project the documented role"
);
requireText(
  caseStudy,
  "My role",
  "Case-study introductions must make Jamie's role visible"
);
requireText(
  technicalOperations,
  "action:",
  "Technical Operations proof entries must name Jamie's action"
);
requireText(
  technicalOperations,
  "result:",
  "Technical Operations proof entries must name what became usable"
);
requireText(
  technicalOperations,
  "href:",
  "Technical Operations proof entries must link to deeper evidence"
);
requireText(
  technicalOperations,
  "My work",
  "Technical Operations proof map must label Jamie's contribution"
);
requireText(
  technicalOperations,
  "What became usable",
  "Technical Operations proof map must label the usable result"
);

if (failures.length) {
  console.error("Chad-lens check failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  "Chad-lens check passed: actor, action, end, usable result, truthful CTAs, and hiring-path language are explicit."
);
