import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
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
const publicRegistryPath = path.join(
  repoRoot,
  "apps/www/src/data/knowledge-bank/public-registry.json"
);
const hjeContentPath = path.join(
  repoRoot,
  "apps/www/src/content/work/harry-j-epstein.mdx"
);
const sundayDinnerContentPath = path.join(
  repoRoot,
  "apps/www/src/content/work/196-sunday-dinner.mdx"
);
const approvalRegisterPath = path.join(
  repoRoot,
  "docs/knowledge-bank/approval-register.md"
);

const professorRubricRelativePaths = [
  ".agents/evals/portfolio-production-readiness.json",
  "DESIGN.md"
];

const publicSurfaceRelativePaths = execFileSync(
  "git",
  ["ls-files", "apps/www", "package.json", "package-lock.json"],
  { cwd: repoRoot, encoding: "utf8" }
)
  .trim()
  .split("\n")
  .filter(Boolean);

export const professorCandidateRelativePaths = [
  ...new Set([...professorRubricRelativePaths, ...publicSurfaceRelativePaths])
].sort();

const finalScorecardRelativePaths = [
  "docs/qa/evals-H/margaret-morse-current-2026-08-21-a.json",
  "docs/qa/evals-H/margaret-morse-current-2026-08-21-b.json",
  "docs/qa/evals-H/margaret-morse-current-2026-08-21-c.json",
  "docs/qa/evals-H/warren-sack-current-2026-08-21-a.json",
  "docs/qa/evals-H/warren-sack-current-2026-08-21-b.json",
  "docs/qa/evals-H/warren-sack-current-2026-08-21-c.json"
];

const approvedCandidateSha256 = "a57dfe0ff6103ecb3d271a6827dac66e7160947d1d33199190e808968bc5e198";
const requiredHoldoutCount = 6;

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
  return Object.fromEntries(professorCandidateRelativePaths.map((relativePath) => [
    relativePath,
    readFileSync(path.join(repoRoot, relativePath))
  ]));
}

export function fingerprintProfessorCandidate(candidateFiles) {
  const hash = createHash("sha256");
  for (const relativePath of professorCandidateRelativePaths) {
    const content = candidateFiles[relativePath] ?? Buffer.alloc(0);
    hash.update(relativePath).update("\0").update(content).update("\0");
  }
  return hash.digest("hex");
}

export function evaluateProfessorLenses({
  suite = JSON.parse(readFileSync(suitePath, "utf8")),
  aboutText = readFileSync(aboutPath, "utf8"),
  sourceNoteText = readFileSync(sourceNotePath, "utf8"),
  publicRegistryText = readFileSync(publicRegistryPath, "utf8"),
  hjeContentText = readFileSync(hjeContentPath, "utf8"),
  sundayDinnerContentText = readFileSync(sundayDinnerContentPath, "utf8"),
  approvalRegisterText = readFileSync(approvalRegisterPath, "utf8"),
  candidateFiles = loadCandidateFiles(),
  finalScorecards = finalScorecardRelativePaths.map((relativePath) =>
    JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"))
  )
} = {}) {
  const morse = suite.evals.find((entry) => entry.id === "PR-015");
  const sack = suite.evals.find((entry) => entry.id === "PR-016");
  const morseText = joined(morse);
  const sackText = joined(sack);
  const combinedPublicText = `${aboutText}\n${sourceNoteText}\n${publicRegistryText}`;
  const normalizedAboutText = aboutText.replace(/\s+/g, " ");
  const totalWeight = suite.evals.reduce((sum, entry) => sum + entry.weight, 0);
  const candidateSha256 = fingerprintProfessorCandidate(candidateFiles);
  const featuredLoopsText = aboutText.match(
    /Three systems loops[\s\S]*?Additional continuities/
  )?.[0] ?? "";
  const countStage = (stage) => featuredLoopsText.split(stage).length - 1;
  const stageCounts = Object.fromEntries([
    "Relationships:",
    "Model:",
    "Prototype / testable increment:",
    "Social or collective use:",
    "Learning and revision:",
    "Documented handoff:"
  ].map((stage) => [stage, countStage(stage)]));

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
      "Three delimited examples expose every recursive stage without implying structural equivalence.",
      normalizedAboutText.includes(
        "not equivalent in scale, maturity, authority, adoption, risk, or"
      ) && Object.values(stageCounts).every((count) => count === 3),
      `${JSON.stringify(stageCounts)}; explicit non-equivalence boundary checked.`
    ),
    criterion(
      "open-house-boundary",
      "The public Open House lineage states initiation, ten-day form, and collective governance without solo-production language.",
      aboutText.includes("CLM-OPEN-HOUSE-PARTICIPATORY-GALLERY") &&
        aboutText.includes('occurrenceId="open-house-participatory-gallery"') &&
        publicRegistryText.includes("I initiated Open House, a ten-day UCSC gallery experiment") &&
        publicRegistryText.includes("participants used communal decision-making") &&
        publicRegistryText.includes("many-perspective documentation") &&
        sourceNoteText.includes("became collectively governed") &&
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
      "inspectable-handoff-specimens",
      "Two current project pages expose bounded workflow specimens without publishing protected source records.",
      [
        "From recurring question to maintainable release",
        "It is not an original company document",
        "Reusable patterns, ownership, and next actions"
      ].every((fragment) => hjeContentText.includes(fragment)) &&
        [
          "A resident artist can arrive and work independently",
          "A recurring gathering can continue without exposing its participants",
          "withholding every participant-level value"
        ].every((fragment) => sundayDinnerContentText.includes(fragment)),
      "HJE maintenance and Sunday Dinner / 196 handoff specimens checked."
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
      "exact-photo-occurrence-clearance",
      "A human approval record clears the exact portfolio-album occurrences while keeping broader reuse and release decisions separate.",
      approvalRegisterText.includes(
        "is cleared by Jamie for publication on the `jamieburk.art` professional"
      ) &&
        approvalRegisterText.includes(
          "Shoestring Press facilitation frame and the Save NYC Spaces town-hall"
        ) &&
        approvalRegisterText.includes("dignity review") &&
        approvalRegisterText.includes(
          "Approval of an exact production commit and the indexing state"
        ),
      "Exact-occurrence portfolio clearance, dignity review, and separate release gates checked."
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
      finalScorecards.length === requiredHoldoutCount &&
        finalScorecards.every((scorecard) => scorecard.phase === "holdout" &&
          scorecard.score === 4 && scorecard.pass === true &&
          scorecard.candidateSha256 === candidateSha256),
      `${finalScorecards.filter((scorecard) => scorecard.phase === "holdout" &&
        scorecard.score === 4 && scorecard.pass === true &&
        scorecard.candidateSha256 === candidateSha256).length}/${requiredHoldoutCount} final scorecards pass at 4; ` +
        `${finalScorecards.length}/${requiredHoldoutCount} holdout receipts are present; exact-candidate matching is evaluated separately against ${candidateSha256}.`
    )
  ];

  return {
    pass: criteria.every((item) => item.pass),
    passed: criteria.filter((item) => item.pass).length,
    total: criteria.length,
    criteria
  };
}
