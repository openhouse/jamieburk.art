import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const suitePath = path.join(repoRoot, ".agents/evals/portfolio-production-readiness.json");
const aboutPath = path.join(repoRoot, "apps/www/src/app/about/page.tsx");
const sourceNotePath = path.join(
  repoRoot,
  "docs/knowledge-bank/projects/ucsc-professor-lenses-2026-07-15.md"
);
export const professorCandidateReceiptPath =
  "docs/qa/evals-H/professor-candidate-receipt.json";

const recursiveTracePath =
  "docs/knowledge-bank/methods/recursive-social-systems-trace.md";

function walk(relativeDirectory) {
  const directory = path.join(repoRoot, relativeDirectory);
  return readdirSync(directory).flatMap((name) => {
    const relativePath = path.join(relativeDirectory, name);
    return statSync(path.join(repoRoot, relativePath)).isDirectory()
      ? walk(relativePath)
      : [relativePath];
  });
}

export const professorCandidateRelativePaths = [...new Set([
  ".agents/evals/portfolio-production-readiness.json",
  "docs/design/layout-E-photo-integration.md",
  "docs/knowledge-bank/projects/ucsc-professor-lenses-2026-07-15.md",
  "docs/knowledge-bank/projects/harry-j-epstein.md",
  "docs/knowledge-bank/projects/fair-rent-nyc.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition-2017.md",
  "docs/knowledge-bank/projects/sunday-dinner-196-orientation.md",
  "docs/knowledge-bank/projects/wowlist-orientation.md",
  "docs/knowledge-bank/decisions/hje-continuity-modernization.md",
  "docs/knowledge-bank/methods/maintenance-handoff-and-stewardship.md",
  "docs/knowledge-bank/methods/participation-and-relational-infrastructure.md",
  recursiveTracePath,
  "docs/knowledge-bank/sources/hje-research-brief-2026-07.md",
  "docs/knowledge-bank/sources/nycac-running-minutes-2026.md",
  "docs/knowledge-bank/sources/wowlist-repaired-transcript-2026.md",
  "docs/qa/evals-H/professor-lenses-about-desktop.png",
  "docs/qa/evals-H/professor-lenses-about-mobile.png",
  "docs/qa/evals-H/professor-lenses-browser-qa.json",
  "docs/qa/evals-H/responsive-route-matrix.json",
  "rfcs/0003-living-photographic-knowledge-loop.md",
  "scripts/generate-professor-browser-evidence.mjs",
  ...walk("apps/www/src"),
  ...walk("apps/www/public/images/photo-fieldwork"),
  ...walk("apps/www/public/images/field-notes"),
  ...walk("docs/photography"),
  ...walk("docs/knowledge-bank/assets/photographs"),
  ...walk("docs/knowledge-bank/indexes/photo-sets"),
  ...walk("docs/knowledge-bank/sources/photo-metadata"),
  ...walk("docs/knowledge-bank/sources/permissions"),
  ...walk("docs/knowledge-bank/sources/recollections"),
  ...walk("docs/knowledge-bank/evaluations/curatorial"),
  ...walk("docs/knowledge-bank/decisions/photography"),
  ...walk("docs/knowledge-bank/projections/photography"),
  "docs/knowledge-bank/research-inquiries/documented-canoe-bike-journeys.md",
  ...walk("docs/qa/photo-knowledge"),
  ...walk("docs/qa/layout-E")
])].sort();

const finalScorecardRelativePaths = [
  "docs/qa/evals-H/margaret-morse-final-a.json",
  "docs/qa/evals-H/margaret-morse-final-b.json",
  "docs/qa/evals-H/margaret-morse-final-c.json",
  "docs/qa/evals-H/warren-sack-final-a.json",
  "docs/qa/evals-H/warren-sack-final-b.json",
  "docs/qa/evals-H/warren-sack-final-c.json"
];

const approvedCandidateSha256 = "3fa95fe76a1327db9385abdd166c2c554a07a3a3f29a352ba357bd0aa8313489";

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

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.floor(sorted.length / 2)] ?? 0;
}

function loadCandidateFiles() {
  return Object.fromEntries(professorCandidateRelativePaths.map((relativePath) => [
    relativePath,
    readFileSync(path.join(repoRoot, relativePath))
  ]));
}

export function fingerprintProfessorCandidate(candidateFiles = loadCandidateFiles()) {
  const hash = createHash("sha256");
  for (const relativePath of professorCandidateRelativePaths) {
    hash.update(relativePath).update("\0").update(candidateFiles[relativePath] ?? "").update("\0");
  }
  return hash.digest("hex");
}

export function buildProfessorCandidateReceipt() {
  const candidateSha256 = fingerprintProfessorCandidate();
  const publicSurface = JSON.parse(readFileSync(
    path.join(repoRoot, "docs/qa/evals-H/responsive-route-matrix.json"),
    "utf8"
  ));
  const photoCandidate = JSON.parse(readFileSync(
    path.join(repoRoot, "reports/photo-knowledge/candidate.json"),
    "utf8"
  ));
  return {
    receiptVersion: 1,
    generatedAt: "2026-07-26",
    sourceCommit: execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: repoRoot,
      encoding: "utf8"
    }).trim(),
    candidateSha256,
    candidateFileCount: professorCandidateRelativePaths.length,
    algorithm:
      "SHA-256 over each sorted relative path, NUL, file bytes, NUL.",
    candidateFiles: professorCandidateRelativePaths,
    distinctCandidateScopes: {
      professorLens: {
        sha256: candidateSha256,
        fileCount: professorCandidateRelativePaths.length,
        purpose:
          "Binds PR-015 and PR-016 to the rubric, application source, selected derivatives, design record, photography governance, and rendered layout evidence."
      },
      responsivePublicSurface: {
        sha256: publicSurface.publicSurfaceFingerprint,
        fileCount: publicSurface.publicSurfaceFileCount,
        purpose:
          "Binds the 98-row browser and axe matrix to apps/www plus package manifests."
      },
      photoKnowledge: {
        sha256: photoCandidate.candidate_fingerprint,
        fileCount: photoCandidate.candidate_file_count,
        purpose:
          "Binds the broader RFC 0003 source-tree candidate while excluding circular generated reports and holdouts."
      }
    },
    exactCandidateNote:
      "These three digests intentionally differ because they certify different scopes. A scorecard must reproduce the professorLens digest."
  };
}

export function evaluateProfessorLenses({
  suite = JSON.parse(readFileSync(suitePath, "utf8")),
  aboutText = readFileSync(aboutPath, "utf8"),
  sourceNoteText = readFileSync(sourceNotePath, "utf8"),
  candidateFiles = loadCandidateFiles(),
  candidateReceipt = JSON.parse(readFileSync(
    path.join(repoRoot, professorCandidateReceiptPath),
    "utf8"
  )),
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
  const candidateSha256 = fingerprintProfessorCandidate(candidateFiles);
  const responsiveEvidence = JSON.parse(readFileSync(
    path.join(repoRoot, "docs/qa/evals-H/responsive-route-matrix.json"),
    "utf8"
  ));
  const professorBrowserEvidence = JSON.parse(readFileSync(
    path.join(repoRoot, "docs/qa/evals-H/professor-lenses-browser-qa.json"),
    "utf8"
  ));
  const photoCandidateReceipt = JSON.parse(readFileSync(
    path.join(repoRoot, "reports/photo-knowledge/candidate.json"),
    "utf8"
  ));
  const relationshipRows = aboutText.match(/Relationships:<\/strong>/g)?.length ?? 0;
  const interfaceRows = aboutText.match(/Interface and use:<\/strong>/g)?.length ?? 0;
  const learningRows = aboutText.match(/Learning and continuity:/g)?.length ?? 0;
  const currentRows = aboutText.match(/Current practice:<\/strong>/g)?.length ?? 0;
  const holdoutGroups = Object.fromEntries(
    ["PR-015", "PR-016"].map((lensId) => [
      lensId,
      finalScorecards.filter((scorecard) =>
        (scorecard.lensId ?? scorecard.lens) === lensId
      )
    ])
  );
  const holdoutsMeetFrozenThreshold = Object.values(holdoutGroups).every(
    (scorecards) =>
      scorecards.length === 3 &&
      scorecards.every((scorecard) =>
        scorecard.phase === "holdout" &&
        scorecard.pass === true &&
        scorecard.candidateSha256 === candidateSha256 &&
        Number.isInteger(scorecard.score) &&
        scorecard.score >= 3 &&
        scorecard.score <= 4
      ) &&
      median(scorecards.map((scorecard) => scorecard.score)) >= 4
  );

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
      "Six examples distinguish relationship models, interfaces and use, and learning and continuity; three are explicitly current.",
      relationshipRows >= 6 && interfaceRows >= 6 && learningRows >= 6 &&
        currentRows >= 3,
      `${relationshipRows} relationship rows; ${interfaceRows} interface-and-use rows; ${learningRows} learning-and-continuity rows; ${currentRows} current-practice rows.`
    ),
    criterion(
      "rendered-current-systems-trace",
      "Candidate-bound browser evidence confirms six complete loops, three current-practice labels, and a usable two-click About surface.",
      professorBrowserEvidence.passed === true &&
        professorBrowserEvidence.publicSurfaceFingerprint ===
          responsiveEvidence.publicSurfaceFingerprint &&
        professorBrowserEvidence.homepageAboutLink?.visible === true &&
        professorBrowserEvidence.homepageAboutLink?.href === "/about" &&
        professorBrowserEvidence.contentAssertions?.relationshipRows === 6 &&
        professorBrowserEvidence.contentAssertions?.modelRows === 6 &&
        professorBrowserEvidence.contentAssertions?.interfaceAndUseRows === 6 &&
        professorBrowserEvidence.contentAssertions?.learningAndContinuityRows === 6 &&
        professorBrowserEvidence.contentAssertions?.currentPracticeRows === 3,
      "Candidate-bound desktop and mobile browser trace checked."
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
      "The holdout result remains bound to the exact evaluated rubric, full application source, selected image derivatives, design record, and rendered layout evidence.",
      candidateSha256 === approvedCandidateSha256,
      `Candidate SHA-256: ${candidateSha256}`
    ),
    criterion(
      "candidate-receipt",
      "A reproducible receipt distinguishes the professor, responsive-public-surface, and photo-knowledge candidate scopes.",
      candidateReceipt.receiptVersion === 1 &&
        candidateReceipt.candidateSha256 === candidateSha256 &&
        candidateReceipt.candidateFileCount === professorCandidateRelativePaths.length &&
        JSON.stringify(candidateReceipt.candidateFiles) ===
          JSON.stringify(professorCandidateRelativePaths) &&
        candidateReceipt.distinctCandidateScopes?.professorLens?.sha256 === candidateSha256 &&
        candidateReceipt.distinctCandidateScopes?.responsivePublicSurface?.sha256 ===
          responsiveEvidence.publicSurfaceFingerprint &&
        candidateReceipt.distinctCandidateScopes?.responsivePublicSurface?.fileCount ===
          responsiveEvidence.publicSurfaceFileCount &&
        candidateReceipt.distinctCandidateScopes?.photoKnowledge?.sha256 ===
          photoCandidateReceipt.candidate_fingerprint &&
        candidateReceipt.distinctCandidateScopes?.photoKnowledge?.fileCount ===
          photoCandidateReceipt.candidate_file_count &&
        candidateReceipt.exactCandidateNote.includes("intentionally differ"),
      `${candidateReceipt.candidateFileCount}/${professorCandidateRelativePaths.length} files documented in ${professorCandidateReceiptPath}.`
    ),
    criterion(
      "independent-holdouts",
      "Three final holdouts per lens meet the frozen median-4 threshold with no judge below 3.",
      finalScorecards.length === 6 &&
        holdoutsMeetFrozenThreshold,
      `PR-015 scores: ${holdoutGroups["PR-015"].map((scorecard) => scorecard.score).join(", ")}; PR-016 scores: ${holdoutGroups["PR-016"].map((scorecard) => scorecard.score).join(", ")}.`
    )
  ];

  return {
    pass: criteria.every((item) => item.pass),
    passed: criteria.filter((item) => item.pass).length,
    total: criteria.length,
    criteria
  };
}
