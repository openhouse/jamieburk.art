import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configRelativePath = "evals/anonymized-team-memory-case-study/current.json";

function read(root, relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

export function anonymizedTeamMemoryCaseStudyDigest(root = defaultRoot, config) {
  const candidate = config ?? JSON.parse(read(root, configRelativePath));
  const hash = createHash("sha256");
  hash.update("anonymized-team-memory-case-study-v1\0");
  for (const relativePath of [...candidate.target.files].sort()) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(read(root, relativePath).replace(/\r\n/g, "\n"));
    hash.update("\0");
  }
  return hash.digest("hex");
}

export function evaluateAnonymizedTeamMemoryCaseStudy(root = defaultRoot) {
  const failures = [];
  const config = JSON.parse(read(root, configRelativePath));
  const documents = config.target.files.map((relativePath) => read(root, relativePath));
  const publicSafeCaseStudy = documents.join("\n");
  const digest = anonymizedTeamMemoryCaseStudyDigest(root, config);
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };

  check(config.schemaVersion === 1, "schemaVersion must be 1");
  check(config.target.files.length === 3, "exactly three case-study documents are required");
  check(config.sourceBoundary.privateTranscriptInRepository === false, "private transcripts cannot enter the repository");
  check(config.sourceBoundary.directTranscriptQuotesInCaseStudy === false, "direct transcript quotations are not allowed");
  check(config.sourceBoundary.participantIdentityInCaseStudy === false, "participant identity cannot enter the case study");
  check(config.sourceBoundary.companyIdentityInCaseStudy === false, "company identity cannot enter the case study");
  check(config.sourceBoundary.protectedIdentifierCorpusInRepository === false, "protected identifiers cannot enter the repository");
  check(config.sourceBoundary.protectedIdentifierComparison?.performedInPrivateWorkspace === true, "private identifier comparison is required");
  check(config.sourceBoundary.protectedIdentifierComparison?.persistedIdentifierCorpus === false, "private identifier corpus cannot be persisted");
  check(config.sourceBoundary.protectedIdentifierComparison?.result === "no-known-identifiers-found", "private identifier review did not pass");
  check(config.policy.deterministicChecksBeforeLlm === true, "deterministic checks must precede advisory simulations");
  check(config.policy.stopOnDeterministicFailure === true, "advisory simulations must stop after deterministic failure");
  check(config.policy.calibrationStatus === "uncalibrated-advisory-simulation", "calibration boundary changed");
  check(config.humanValidation.prospectiveCollaboratorApproved === false, "participant approval has not been recorded");
  check(config.humanValidation.jamieApproved === false, "Jamie approval has not been recorded");

  for (const [index, document] of documents.entries()) {
    check(document.includes("visibility: public-safe"), `document ${index + 1} must be public-safe`);
    check(document.includes("human_review: requested"), `document ${index + 1} must retain requested human review`);
    check(/Jamie's\s+(?:direct\s+)?approval\s+is\s+(?:also\s+)?(?:still\s+)?required/i.test(document), `document ${index + 1} must retain Jamie approval as a human gate`);
    check(/not\s+participant-approved/i.test(document), `document ${index + 1} must disclose missing participant approval`);
    check(!/^> /m.test(document), `document ${index + 1} contains a quotation block`);
  }

  for (const criterion of config.deterministicCriteria) {
    const document = documents[criterion.fileIndex];
    for (const needle of criterion.needles) {
      check(document?.includes(needle), `document ${criterion.fileIndex + 1} missing: ${needle}`);
    }
  }

  for (const forbidden of config.forbiddenPatterns) {
    const pattern = new RegExp(forbidden.pattern, "i");
    check(!pattern.test(publicSafeCaseStudy), `prohibited ${forbidden.id} pattern found`);
  }

  const deterministicPassed = failures.length === 0;
  if (deterministicPassed) {
    for (const evaluator of config.evaluators) {
      const result = JSON.parse(read(root, evaluator.resultPath));
      check(result.schemaVersion === 1, `${evaluator.id}: schemaVersion must be 1`);
      check(result.evaluatorId === evaluator.id, `${evaluator.id}: evaluator binding changed`);
      check(result.candidateDigest === digest, `${evaluator.id}: result does not bind to the exact case study`);
      check(result.question === evaluator.question, `${evaluator.id}: evaluation question changed`);
      check(result.calibrationStatus === "uncalibrated-advisory-simulation", `${evaluator.id}: calibration boundary changed`);
      check(result.inputScope?.anonymizedCaseStudyOnly === true, `${evaluator.id}: only the anonymized case study may be inspected`);
      check(result.inputScope?.rawTranscriptAccess === false, `${evaluator.id}: raw transcript access is forbidden`);
      check(result.inputScope?.participantIdentityAccess === false, `${evaluator.id}: participant identity access is forbidden`);
      check(/not participant approval.*not endorsement/i.test(result.nonEndorsementBoundary ?? ""), `${evaluator.id}: non-endorsement boundary is missing`);
      check(typeof result.critique === "string" && result.critique.trim(), `${evaluator.id}: critique is required`);
      check(Array.isArray(result.strengths) && result.strengths.length > 0, `${evaluator.id}: strengths are required`);
      check(Array.isArray(result.risks) && result.risks.length > 0, `${evaluator.id}: risks are required`);
      check(result.result === "pass", `${evaluator.id}: advisory simulation did not pass`);
    }
  }

  const advisorySimulationsPassed = deterministicPassed && failures.length === 0;
  return {
    passed: deterministicPassed && advisorySimulationsPassed,
    deterministicPassed,
    advisorySimulationsPassed,
    candidateDigest: digest,
    humanValidationPending:
      !config.humanValidation.prospectiveCollaboratorApproved ||
      !config.humanValidation.jamieApproved,
    failures
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const report = evaluateAnonymizedTeamMemoryCaseStudy(defaultRoot);
    process.stdout.write(`${JSON.stringify(report)}\n`);
    if (!report.passed) process.exitCode = 1;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
