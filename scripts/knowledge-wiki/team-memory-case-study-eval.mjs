import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");
export const configPath =
  "evals/knowledge-wiki/team-memory-anonymized-case-study.json";

function readJson(root, relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function loadTeamMemoryCaseStudyCandidate(root = repoRoot) {
  const config = readJson(root, configPath);
  const documents = {
    index: readFileSync(path.join(root, config.indexPath), "utf8"),
    prospectiveSponsor: readFileSync(
      path.join(root, config.perspectivePaths.prospectiveSponsor),
      "utf8"
    ),
    jamie: readFileSync(path.join(root, config.perspectivePaths.jamie), "utf8"),
    voice: readFileSync(path.join(root, config.perspectivePaths.voice), "utf8")
  };
  return {
    config,
    documents,
    run: existsSync(path.join(root, config.currentRunPath))
      ? readJson(root, config.currentRunPath)
      : null
  };
}

export function caseStudySource(candidate) {
  return Object.entries(candidate.documents)
    .map(([name, value]) => `--- ${name} ---\n${value}`)
    .join("\n");
}

function normalized(value) {
  return value.replace(/\s+/g, " ").trim();
}

function hasNegatedCommercialLimits(value) {
  return (
    /does not (?:establish|end with)[^\n]{0,80}(?:offer|contract|budget approval|completed)/i.test(
      value
    ) &&
    /(?:not|No recovered source)[^\n]{0,100}(?:offer|contract|authorization|completed work)/i.test(
      value
    )
  );
}

export function evaluateTeamMemoryCaseStudy(
  candidate,
  { deterministicOnly = false } = {}
) {
  const { config, documents, run } = candidate;
  const combined = caseStudySource(candidate);
  const committedSurface = JSON.stringify({ config, documents, run });
  const failures = [];
  const checks = [];
  const check = (id, pass, detail) => {
    checks.push({ id, pass, detail });
    if (!pass) failures.push(detail);
  };

  check(
    "required-file-set",
    Object.keys(documents).sort().join(",") ===
      "index,jamie,prospectiveSponsor,voice",
    "The case-study packet must contain its index and all three requested perspective files."
  );

  for (const [name, relativePath] of [
    ["index", config.indexPath],
    ...Object.entries(config.perspectivePaths)
  ]) {
    check(
      `canonical-path-${name}`,
      documents[name].includes(`canonical_path: ${relativePath}`),
      `The ${name} document is not tied to its canonical path.`
    );
  }

  check(
    "deterministic-before-model",
    config.deterministicStages.at(-1) ===
      "source-informed-model-reader-evaluation" &&
      config.modelGate.maximumCallsPerCandidate === 1 &&
      config.modelGate.privateSourcesAvailableAtRuntime === true &&
      config.modelGate.privateSourcesMayBeCommitted === false,
    "Deterministic privacy and coverage checks must precede the single source-informed model call."
  );

  for (const [name, patterns] of Object.entries(config.requiredSignals)) {
    const searchable = normalized(documents[name]).toLowerCase();
    const missing = patterns.filter(
      (pattern) => !searchable.includes(pattern.toLowerCase())
    );
    check(
      `coverage-${name}`,
      missing.length === 0,
      missing.length === 0
        ? `${name} coverage is present.`
        : `${name} is missing required interpretive coverage: ${missing.join(", ")}.`
    );
  }

  check(
    "identity-and-source-safety",
    !/(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|https?:\/\/|\/Users\/|\/Volumes\/|Mobile Documents|otter\.ai|\b(?:eleven-person|five to ten engineers)\b)/i.test(
      committedSurface
    ),
    "The committed packet or eval exposes an email, URL, private locator, transcript artifact, exact date, or identifying company detail."
  );

  check(
    "no-transcript-quotation",
    !/^\s*>/m.test(combined) &&
      !/(?:verbatim transcript|direct quotation from|exact words were)/i.test(combined),
    "The anonymized derivative must not reproduce or advertise private transcript quotations."
  );

  check(
    "interpretive-and-audio-boundary",
    /careful interpretations/i.test(normalized(documents.index)) &&
      /not audio-certified/i.test(normalized(documents.index)) &&
      /actual person has not reviewed or approved/i.test(
        normalized(documents.voice)
      ),
    "The packet must state its interpretive, audio-certification, and human-review limits."
  );

  check(
    "no-impersonation-contract",
    /not permission to impersonate/i.test(normalized(documents.voice)) &&
      /does not identify the speaker or employer/i.test(
        normalized(documents.voice)
      ) &&
      /invented language as quotation/i.test(normalized(documents.voice)),
    "The voice profile must prohibit impersonation, identification, and invented quotation."
  );

  check(
    "commercial-state-not-inflated",
    hasNegatedCommercialLimits(combined) &&
      !/(?:the company hired Jamie|the proposal was accepted|budget was approved|we completed the pilot|the client adopted)/i.test(
        combined
      ),
    "The packet must retain the unresolved commercial state and avoid implying hire, acceptance, adoption, or completed work."
  );

  check(
    "human-gates-remain-open",
    Object.values(config.humanGates).every((value) => value === "pending") &&
      /Only the actual source participant/i.test(normalized(documents.index)),
    "Jamie, source-participant, and publication review must remain explicit human gates."
  );

  if (!deterministicOnly) {
    const result = run?.result;
    const required = config.modelGate.requiredPerspectiveVerdicts;
    const selfReviewPromptSha256 = sha256(
      `authoring-model-source-informed-self-review\n${config.modelGate.promptVersion}\n${config.publicSafeScenario}\n${combined}`
    );
    const reviewMethodIntegrity =
      (run?.reviewMethod === "authoring-model-source-informed-self-review" &&
        run.independentReview === false &&
        run.promptSha256 === selfReviewPromptSha256 &&
        run.promptHashBasis ===
          "authoring-model-source-informed-self-review + promptVersion + publicSafeScenario + caseStudySource") ||
      (run?.reviewMethod === "independent-source-informed-model-review" &&
        run.independentReview === true &&
        /^[0-9a-f]{64}$/.test(run.promptSha256 ?? ""));
    check(
      "current-source-informed-run",
      run?.status === "complete" &&
        run.caseStudySha256 === sha256(combined) &&
        run.scenarioSha256 === sha256(config.publicSafeScenario) &&
        run.promptVersion === config.modelGate.promptVersion &&
        reviewMethodIntegrity &&
        config.modelGate.allowedReviewMethods.includes(run.reviewMethod) &&
        Number.isInteger(run.privateSourceCount) &&
        run.privateSourceCount >= 1 &&
        run.actualPersonParticipated === false &&
        run.sourceParticipantReviewed === false,
      "The source-informed self-review receipt is missing, stale, mislabeled, or not tied to the current packet and scenario."
    );
    check(
      "modeled-accuracy-pass",
      result?.readerId === "reader.anonymized-team-knowledge-case-study" &&
        result?.verdict === config.modelGate.requiredVerdict &&
        result?.prospectiveSponsorAccuracy === required.prospectiveSponsorAccuracy &&
        result?.jamieAccuracy === required.jamieAccuracy &&
        result?.voiceFidelity === required.voiceFidelity &&
        result?.anonymizationSafety === required.anonymizationSafety &&
        result?.actualPersonParticipated === false &&
        result?.sourceParticipantReviewed === false,
      "The current source-informed model review does not pass all perspective, voice, and anonymization gates."
    );
    check(
      "constructive-modeled-record",
      Array.isArray(result?.strengths) &&
        result.strengths.length >= 3 &&
        Array.isArray(result?.accuracyRisks) &&
        typeof result?.constructiveCritique === "string" &&
        result.constructiveCritique.length >= 60 &&
        typeof result?.validateNext === "string" &&
        result.validateNext.length >= 60 &&
        /did not participate/i.test(result?.boundary ?? "") &&
        /not .*endorsement/i.test(result?.boundary ?? ""),
      "The modeled record must preserve critique, residual accuracy risks, next validation, and the no-participation boundary."
    );
  }

  return {
    passed: failures.length === 0,
    stage: deterministicOnly ? "deterministic" : "full",
    failures,
    checks,
    boundary: config.modelGate.humanMeaning
  };
}

function main() {
  const deterministicOnly = process.argv.includes("--deterministic-only");
  const result = evaluateTeamMemoryCaseStudy(
    loadTeamMemoryCaseStudyCandidate(),
    { deterministicOnly }
  );
  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
