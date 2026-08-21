import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configRelativePath = "evals/team-memory-proposal/current.json";

function read(root, relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

export function teamMemorySurfaceDigest(root = defaultRoot, config) {
  const candidate = config ?? JSON.parse(read(root, configRelativePath));
  const hash = createHash("sha256");
  hash.update("team-memory-public-page-v1\0");
  for (const relativePath of [...candidate.target.files].sort()) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(read(root, relativePath).replace(/\r\n/g, "\n"));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function evaluateTeamMemoryProposal(root = defaultRoot) {
  const failures = [];
  const config = JSON.parse(read(root, configRelativePath));
  const publicSurface = config.target.files.map((relativePath) => read(root, relativePath)).join("\n");
  const digest = teamMemorySurfaceDigest(root, config);
  const result = JSON.parse(read(root, config.evaluator.resultPath));
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };

  check(config.schemaVersion === 1, "schemaVersion must be 1");
  check(config.target.route === "/lab/source-backed-team-memory", "target route changed");
  check(config.sourceBoundary.visibility === "summary-only", "protected source boundary changed");
  check(config.sourceBoundary.privateTranscriptInRepository === false, "private transcript cannot enter the repository");
  check(config.sourceBoundary.namedPrivateReaderInRepository === false, "private reader identity cannot enter the repository");
  check(config.policy.deterministicChecksBeforeLlm === true, "deterministic checks must precede role play");
  check(config.policy.stopOnDeterministicFailure === true, "role play must stop after deterministic failure");
  check(config.policy.calibrationStatus === "uncalibrated-advisory-simulation", "calibration boundary changed");

  for (const criterion of config.deterministicCriteria) {
    check(publicSurface.includes(criterion.needle), `${criterion.id}: missing ${criterion.needle}`);
  }
  for (const forbidden of config.forbiddenPublicStrings) {
    check(!publicSurface.includes(forbidden), `protected public string found: ${forbidden}`);
  }

  const deterministicPassed = failures.length === 0;
  if (deterministicPassed) {
    check(result.schemaVersion === 1, "role-play result schemaVersion must be 1");
    check(result.surfaceDigest === digest, "role-play result does not bind to the exact public page");
    check(result.acceptanceQuestion === config.acceptanceQuestion, "role-play acceptance question changed");
    check(result.readerIdentity === config.evaluator.readerIdentity, "role-play reader binding changed");
    check(result.simulatedPublicFigureLens === true, "role-play simulation disclosure is required");
    check(/not participation.*endorsement/i.test(result.nonEndorsementBoundary ?? ""), "role-play non-endorsement boundary is required");
    check(result.inputScope?.publicPageOnly === true, "role play must inspect only the public page");
    check(result.inputScope?.repositoryAccess === false, "role play cannot inspect repository evidence");
    check(result.inputScope?.rawTranscriptAccess === false, "role play cannot inspect the raw transcript");
    check(result.inputScope?.scenarioContext === "public-safe requirements only", "role play may receive only public-safe scenario requirements");
    check(typeof result.critique === "string" && result.critique.trim(), "role-play critique is required");
    check(Array.isArray(result.strengths) && result.strengths.length > 0, "role-play strengths are required");
    check(Array.isArray(result.risks) && result.risks.length > 0, "role-play risks are required");
    check(result.result === "pass" && result.wouldHire === true, "fictionalized prospect did not accept the proposal");
  }

  const simulatedAcceptancePassed = deterministicPassed && failures.length === 0;
  return {
    passed: deterministicPassed && simulatedAcceptancePassed,
    deterministicPassed,
    simulatedAcceptancePassed,
    surfaceDigest: digest,
    failures
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const report = evaluateTeamMemoryProposal(defaultRoot);
    process.stdout.write(`${JSON.stringify(report)}\n`);
    if (!report.passed) process.exitCode = 1;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
