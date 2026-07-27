import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const suitePath = path.join(repoRoot, ".agents/evals/portfolio-production-readiness.json");
const aboutPath = path.join(repoRoot, "apps/www/src/app/about/page.tsx");
const sourceNotePath = path.join(
  repoRoot,
  "docs/knowledge-bank/projects/ucsc-professor-lenses-2026-07-15.md"
);

export const candidateRelativePaths = [
  ".agents/evals/portfolio-production-readiness.json",
  "apps/www/public/artifacts/wowlist/being-there.png",
  "apps/www/public/artifacts/wowlist/project-identity.png",
  "apps/www/public/images/field-v02/artist-coalition-listening-room.jpg",
  "apps/www/public/images/field-v02/cabaret-law-hearing.jpg",
  "apps/www/public/images/field-v02/fair-rent-rally.jpg",
  "apps/www/public/images/field-v02/historic-restoration-work.jpg",
  "apps/www/public/images/field-v02/nightlife-town-hall.jpg",
  "apps/www/public/images/field-v02/raft-in-fog.jpg",
  "apps/www/public/images/field-v02/sunday-dinner-preparation.jpg",
  "apps/www/public/images/field-notes/jamie-east-river.webp",
  "apps/www/src/app/about/page.tsx",
  "apps/www/src/app/globals.css",
  "apps/www/src/app/page.tsx",
  "apps/www/src/app/work/page.tsx",
  "apps/www/src/app/work/technical-operations/page.tsx",
  "apps/www/src/components/CaseStudyLayout.tsx",
  "apps/www/src/components/CaseStudyBlocks.tsx",
  "apps/www/src/components/Hero.tsx",
  "apps/www/src/components/WorkCard.tsx",
  "apps/www/src/content/work/harry-j-epstein.mdx",
  "apps/www/src/content/work/wowlist.mdx",
  "apps/www/src/content/work/callnyc.mdx",
  "apps/www/src/content/work/196-sunday-dinner.mdx",
  "apps/www/src/content/work/fair-rent-nyc.mdx",
  "apps/www/src/app/lab/source-backed-team-memory/page.tsx",
  "apps/www/src/data/photo-placement-registry.json",
  "apps/www/src/data/photography.ts",
  "apps/www/src/data/knowledge-bank/historical-knowledge.ts",
  "apps/www/src/data/knowledge-bank/google-drive-production-2026-07.ts",
  "apps/www/src/data/knowledge-bank/public-registry.json",
  "apps/www/src/data/work.ts",
  "apps/www/src/styles/tokens.css",
  "apps/www/src/types/work.ts",
  "docs/knowledge-bank/notebooks/photography/README.md",
  "docs/knowledge-bank/notebooks/photography/layout-study-d.md",
  "docs/knowledge-bank/assets/photographs/east-river-manhattan-bridge-2022.md",
  "docs/knowledge-bank/corrections/photography/east-river-clearance-scope-2026-07.md",
  "docs/knowledge-bank/decisions/photography/layout-d-home-east-river-v1.md",
  "docs/knowledge-bank/decisions/photography/layout-d-resume-protected-absence.md",
  "docs/knowledge-bank/evaluations/curatorial/layout-d-home-east-river-v1.md",
  "docs/knowledge-bank/indexes/photo-sets/east-river-canoe-2022.md",
  "docs/knowledge-bank/projections/photography/layout-d-home-east-river.md",
  "docs/knowledge-bank/projections/photography/layout-d-portfolio-edition.md",
  "docs/knowledge-bank/projections/photography/layout-d-resume-protected-absence.md",
  "docs/knowledge-bank/events/nyc-diy-spaces-post-ghost-ship-dcla-2017-01-27.md",
  "docs/knowledge-bank/assets/photographs/nycac-dcla-listening-room-2017.md",
  "docs/knowledge-bank/research-runs/nycac-dcla-photograph-source-return-2026-07.md",
  "docs/knowledge-bank/research-inquiries/nycac-dcla-audio-speaker-map.md",
  "docs/knowledge-bank/projections/photography/layout-d-home-dcla-listening-room.md",
  "docs/knowledge-bank/assets/photographs/raft-in-fog-waterways.md",
  "docs/knowledge-bank/assets/photographs/cabaret-law-hearing-2017.md",
  "docs/knowledge-bank/assets/photographs/fair-rent-rally-2019.md",
  "docs/knowledge-bank/assets/photographs/sunday-dinner-preparation.md",
  "docs/knowledge-bank/assets/photographs/nightlife-town-hall-2017.md",
  "docs/knowledge-bank/projections/photography/layout-d-home-raft-in-fog.md",
  "docs/knowledge-bank/projections/photography/layout-d-home-cabaret-law-hearing.md",
  "docs/knowledge-bank/projections/photography/layout-d-work-index-fair-rent-rally.md",
  "docs/knowledge-bank/projections/photography/layout-d-work-fair-rent-rally.md",
  "docs/knowledge-bank/projections/photography/layout-d-home-work-card-fair-rent-rally.md",
  "docs/knowledge-bank/projections/photography/layout-d-home-sunday-dinner-preparation.md",
  "docs/knowledge-bank/projections/photography/layout-d-home-work-card-sunday-dinner-preparation.md",
  "docs/knowledge-bank/projections/photography/layout-d-about-sunday-dinner-preparation.md",
  "docs/knowledge-bank/projections/photography/layout-d-work-index-sunday-dinner-preparation.md",
  "docs/knowledge-bank/projections/photography/layout-d-work-sunday-dinner-preparation.md",
  "docs/knowledge-bank/projections/photography/layout-d-work-index-nightlife-town-hall.md",
  "docs/knowledge-bank/projections/photography/layout-d-work-index-kc-town-hall-collaborator.md",
  "docs/knowledge-bank/assets/photographs/kc-town-hall-hardhat-worksite-2018.md",
  "docs/knowledge-bank/assets/photographs/kc-town-hall-collaborator-worksite-2018.md",
  "docs/knowledge-bank/sources/recollections/kc-town-hall-hardhat-oral-history-2026-07.md",
  "docs/knowledge-bank/sources/recollections/kc-town-hall-collaborator-photo-oral-history-2026-07.md",
  "docs/knowledge-bank/projections/photography/layout-d-home-kc-town-hall-collaborator.md",
  "docs/knowledge-bank/projections/photography/layout-d-work-kc-town-hall-collaborator.md",
  "docs/knowledge-bank/assets/kc-town-hall-proposal-rendering-2019.md",
  "docs/knowledge-bank/assets/photographs/nyc-council-commercial-rent-fieldwork-2026.md",
  "docs/knowledge-bank/sources/recollections/nyc-council-commercial-rent-fieldwork-2026-07.md",
  "docs/knowledge-bank/research-inquiries/nyc-council-commercial-rent-fieldwork-source-return.md",
  "apps/www/public/artifacts/kc-town-hall/proposal-rendering.webp",
  "docs/knowledge-bank/research-inquiries/documented-canoe-bike-journeys.md",
  "docs/knowledge-bank/research-inquiries/hardhat-worksite-oral-history.md",
  "docs/knowledge-bank/projects/ucsc-professor-lenses-2026-07-15.md",
  "docs/knowledge-bank/sources/permissions/elana-gordon-east-river-portfolio-2026.md",
  "docs/knowledge-bank/sources/photo-metadata/east-river-2022-public-safe.md",
  "docs/knowledge-bank/sources/recollections/jamie-canoe-commuting-2026-07.md",
  "docs/knowledge-bank/_generated/photo-impact.md",
  "docs/knowledge-bank/_generated/photo-rights-review.md",
  "docs/knowledge-bank/_generated/photography-index.md",
  "docs/knowledge-bank/_generated/public-photo-placements.md",
  "docs/photography/README.md",
  "docs/photography/oral-history-from-an-image.md",
  "evals/photo-knowledge/suite.json",
  "reports/photo-knowledge.json",
  "rfcs/0003-living-photographic-knowledge-loop.md",
  "scripts/photo-knowledge/lib.mjs",
  "scripts/photo-knowledge/photo-knowledge.test.mjs",
  "docs/qa/evals-H/professor-lenses-about-desktop.png",
  "docs/qa/evals-H/professor-lenses-about-mobile.png",
  "docs/qa/evals-H/responsive-route-matrix.json"
];

const finalScorecardRelativePaths = [
  "docs/qa/evals-H/margaret-morse-final-a.json",
  "docs/qa/evals-H/margaret-morse-final-b.json",
  "docs/qa/evals-H/margaret-morse-final-c.json",
  "docs/qa/evals-H/warren-sack-final-a.json",
  "docs/qa/evals-H/warren-sack-final-b.json",
  "docs/qa/evals-H/warren-sack-final-c.json"
];

const approvedCandidateSha256 = "f4530b135bb432928181b6a2bd8bdcdc7487c131df06490fe1aff2ee0a82e202";

const forbiddenPublicPatterns = [
  { label: "student identifier", pattern: /student id.{0,12}\b\d{7}\b/i },
  { label: "private absolute path", pattern: /\/(?:users|volumes)\//i },
  { label: "educational email address", pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.edu\b/i },
  { label: "raw narrative-evaluation filename", pattern: /narrative[-_]evals?\.txt/i }
];

function criterion(id, description, pass, evidence) {
  return { id, description, pass, evidence };
}

function joined(entry) {
  return JSON.stringify(entry ?? {}).toLowerCase();
}

function loadCandidateFiles() {
  return Object.fromEntries(candidateRelativePaths.map((relativePath) => [
    relativePath,
    readFileSync(path.join(repoRoot, relativePath))
  ]));
}

function fingerprintCandidate(candidateFiles) {
  const hash = createHash("sha256");
  for (const relativePath of candidateRelativePaths) {
    hash.update(relativePath).update("\0").update(candidateFiles[relativePath] ?? "").update("\0");
  }
  return hash.digest("hex");
}

export function evaluateProfessorLenses({
  suite = JSON.parse(readFileSync(suitePath, "utf8")),
  aboutText = readFileSync(aboutPath, "utf8"),
  sourceNoteText = readFileSync(sourceNotePath, "utf8"),
  candidateFiles = loadCandidateFiles(),
  finalScorecards = finalScorecardRelativePaths.map((relativePath) =>
    JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"))
  )
} = {}) {
  const morse = suite.evals.find((entry) => entry.id === "PR-015");
  const sack = suite.evals.find((entry) => entry.id === "PR-016");
  const morseText = joined(morse);
  const sackText = joined(sack);
  const combinedPublicText = `${aboutText}\n${sourceNoteText}`;
  const totalWeight = suite.evals.reduce((sum, entry) => sum + entry.weight, 0);
  const candidateSha256 = fingerprintCandidate(candidateFiles);
  const relationshipRows = aboutText.match(/Relationships:<\/strong>/g)?.length ?? 0;
  const interfaceRows = aboutText.match(/Interface and use:<\/strong>/g)?.length ?? 0;
  const learningRows = aboutText.match(/Learning and continuity:/g)?.length ?? 0;

  const criteria = [
    criterion(
      "blocking-lenses",
      "Both professor lenses are distinct blocking LLM-judge evals.",
      morse?.blocking === true && sack?.blocking === true &&
        morse?.grader === "llm_judge" && sack?.grader === "llm_judge",
      `${morse?.id ?? "missing"}; ${sack?.id ?? "missing"}`
    ),
    criterion(
      "lens-thresholds",
      "Both holdout medians must reach the suite maximum.",
      suite.launch_thresholds?.margaret_morse_lens_median_minimum === 4 &&
        suite.launch_thresholds?.warren_sack_lens_median_minimum === 4,
      "Margaret Morse and Warren Sack median thresholds checked."
    ),
    criterion(
      "morse-rubric",
      "The Morse rubric joins artistic, civic, technical, and social practice while testing participation, attention, care, and inhabited systems.",
      [
        "artistic, civic, technical, and social",
        "experimentation",
        "hospitality",
        "attention",
        "documentation",
        "care",
        "inhabit"
      ].every((fragment) => morseText.includes(fragment)),
      "Seven required practice dimensions checked."
    ),
    criterion(
      "sack-rubric",
      "The Sack rubric tests the complete recursive systems sequence and its anti-overclaims.",
      [
        "observe relationships",
        "model a system",
        "prototype an interface",
        "social or collective use",
        "document a handoff",
        "structural equivalence",
        "production deployment",
        "sole authorship",
        "current max/jitter proficiency"
      ].every((fragment) => sackText.includes(fragment)),
      "Five sequence stages and four overclaim boundaries checked."
    ),
    criterion(
      "visible-threshold",
      "The About page includes an unframed through-line where artistic, civic, technical, and social practice remains connected.",
      aboutText.includes("The through line") &&
        aboutText.includes("Systems people can inhabit") &&
        aboutText.includes("artistic, civic, technical,") &&
        aboutText.includes("and social"),
      "/about through-line section checked."
    ),
    criterion(
      "project-continuity",
      "The through-line links to at least four public-safe continuities.",
      [
        "/work/harry-j-epstein",
        "/work/wowlist",
        "/work/196-sunday-dinner",
        "/work/fair-rent-nyc",
        "/lab/source-backed-team-memory"
      ].every((href) => aboutText.includes(`href=\"${href}\"`)),
      "HJE, WOWList, Sunday Dinner / 196, NYC Artist Coalition, and team-memory links checked."
    ),
    criterion(
      "project-specific-loops",
      "Four examples distinguish relationship models, actual interfaces and use, and learning and continuity.",
      relationshipRows >= 4 && interfaceRows >= 4 && learningRows >= 4,
      `${relationshipRows} relationship rows; ${interfaceRows} interface-and-use rows; ${learningRows} learning-and-continuity rows.`
    ),
    criterion(
      "open-house-boundary",
      "The public Open House lineage states initiation, ten-day form, and collective governance without solo-production language.",
      aboutText.includes("Open House") &&
        aboutText.includes("ten-day UCSC gallery experiment I initiated") &&
        aboutText.includes("participants collectively governed") &&
        sourceNoteText.includes("CLM-OPEN-HOUSE-PARTICIPATORY-GALLERY"),
      "Public article and governed claim linkage checked."
    ),
    criterion(
      "recursive-sequence",
      "The public surface names the recursive systems sequence in plain language.",
      [
        "observe relationships",
        "model a system",
        "prototype an interface",
        "test it with people",
        "document enough for others to continue"
      ].every((fragment) => aboutText.includes(fragment)),
      "Five public sequence stages checked."
    ),
    criterion(
      "protected-source-boundary",
      "The source note withholds raw educational records, private correspondence, identifiers, paths, and testimonial projection.",
      sourceNoteText.includes("protected educational records") &&
        sourceNoteText.includes("not reproduced") &&
        sourceNoteText.includes("not quoted or projected") &&
        sourceNoteText.includes("private archive paths") &&
        sourceNoteText.includes("related correspondence"),
      "Protected-source exclusions checked."
    ),
    criterion(
      "no-private-fragments",
      "The public-safe implementation contains no supplied student ID, private path, email domain, or raw-record filename.",
      forbiddenPublicPatterns.every(({ pattern }) => !pattern.test(combinedPublicText)),
      `${forbiddenPublicPatterns.length} private-data patterns checked.`
    ),
    criterion(
      "weight-budget",
      "Adding the lenses preserves the frozen 100-point suite weight budget.",
      totalWeight === 100,
      `Weight total: ${totalWeight}`
    ),
    criterion(
      "candidate-fingerprint",
      "The holdout result remains bound to the exact evaluated rubric and public candidate files.",
      candidateSha256 === approvedCandidateSha256,
      `Candidate SHA-256: ${candidateSha256}`
    ),
    criterion(
      "unanimous-holdouts",
      "Three final holdouts per lens score the bound candidate at 4 with no failing judge.",
      finalScorecards.length === 6 &&
        finalScorecards.every((scorecard) => scorecard.phase === "holdout" &&
          scorecard.score === 4 && scorecard.pass === true &&
          scorecard.candidateSha256 === candidateSha256),
      `${finalScorecards.filter((scorecard) => scorecard.score === 4 && scorecard.pass === true).length}/6 final scorecards pass at 4.`
    )
  ];

  return {
    pass: criteria.every((item) => item.pass),
    passed: criteria.filter((item) => item.pass).length,
    total: criteria.length,
    criteria
  };
}
