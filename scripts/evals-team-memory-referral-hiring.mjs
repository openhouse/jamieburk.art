import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const configRelativePath = "evals/team-memory-referral-hiring/current.json";
const publicResumeRelativePath =
  "apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";

function read(root, relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function parse(root, relativePath) {
  return JSON.parse(read(root, relativePath));
}

function nonEmptyStrings(value) {
  return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === "string" && item.trim());
}

export function teamMemoryReferralCandidateDigest(root = defaultRoot, config, receipt) {
  const candidate = config ?? parse(root, configRelativePath);
  const browserReceipt = receipt ?? parse(root, candidate.inputBoundary.browserReceiptPath);
  const hash = createHash("sha256");
  hash.update("team-memory-referral-restricted-candidate-v1\0");
  for (const relativePath of candidate.inputBoundary.anonymizedArtifacts) {
    hash.update(relativePath);
    hash.update("\0");
    hash.update(read(root, relativePath).replace(/\r\n/g, "\n"));
    hash.update("\0");
  }
  hash.update(browserReceipt.publicSurfaceDigest);
  hash.update("\0");
  hash.update(browserReceipt.resumeArtifact.sha256);
  return hash.digest("hex");
}

export function evaluateTeamMemoryReferralHiring(root = defaultRoot) {
  const failures = [];
  const calibrationFailures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };
  const checkCalibration = (condition, message) => {
    if (!condition) calibrationFailures.push(message);
  };
  const config = parse(root, configRelativePath);
  const calibration = parse(root, config.realWorldCalibration.path);
  const receipt = parse(root, config.inputBoundary.browserReceiptPath);
  const result = parse(root, config.evaluator.resultPath);
  const routeRecords = new Map(receipt.pages.map((page) => [page.route, page]));

  check(config.schemaVersion === 1, "schemaVersion must be 1");
  check(config.inputBoundary.anonymizedArtifacts.length === 2, "exactly two anonymized artifacts are allowed");
  check(config.inputBoundary.repositoryAccess === false, "advisory model cannot access the repository");
  check(config.inputBoundary.rawTranscriptAccess === false, "advisory model cannot access raw transcripts");
  check(config.inputBoundary.participantIdentityAccess === false, "participant identity cannot enter the packet");
  check(config.inputBoundary.companyIdentityAccess === false, "company identity cannot enter the packet");
  check(config.inputBoundary.privateCorrespondenceAccess === false, "private correspondence cannot enter the packet");
  check(config.realWorldCalibration.inputToAdvisoryModel === false, "real-world response cannot enter the advisory packet");
  check(config.browser.startRoute === "/lab/source-backed-team-memory", "browser must begin at the team-memory page");
  check(config.browser.sameOriginPublicNavigationOnly === true, "browser navigation must remain same-origin and public");
  check(config.browser.requireLinkDiscovery === true, "later routes must be discovered through public links");
  check(config.browser.sourceCodeAccess === false, "browser packet cannot include source code");
  check(config.policy.deterministicChecksBeforeLlm === true, "deterministic checks must run before advisory review");
  check(config.policy.stopOnDeterministicFailure === true, "advisory review must stop on deterministic failure");
  check(config.policy.calibrationStatus === "uncalibrated-advisory-simulation", "calibration boundary changed");
  check(config.policy.humanCalibrationPending === true, "human calibration must remain pending");

  checkCalibration(calibration.schemaVersion === 1, "real-world calibration schemaVersion must be 1");
  checkCalibration(calibration.sourceBoundary?.minimumNecessaryMetadataOnly === true, "real-world calibration must retain minimum-necessary metadata only");
  checkCalibration(calibration.sourceBoundary?.rawMessagePersisted === false, "raw response cannot be persisted in the calibration artifact");
  checkCalibration(calibration.sourceBoundary?.personalCircumstancesPersisted === false, "personal circumstances cannot be persisted in the calibration artifact");
  checkCalibration(calibration.sourceBoundary?.participantIdentityPersisted === false, "participant identity cannot be persisted in the calibration artifact");
  checkCalibration(calibration.sourceBoundary?.companyIdentityPersisted === false, "company identity cannot be persisted in the calibration artifact");
  checkCalibration(calibration.sourceBoundary?.inputToAdvisoryModel === false, "real-world response cannot be shown to the advisory model");
  checkCalibration(calibration.observedState?.responseReceived === "observed", "real-world response receipt must be recorded");
  checkCalibration(calibration.observedState?.positiveReception === "observed", "positive reception must remain an observed response signal");
  checkCalibration(calibration.observedState?.interestInReconnecting === "observed", "interest in reconnecting must remain an observed response signal");
  checkCalibration(calibration.observedState?.pageOpened === "not-observed", "real-world response does not establish page opening");
  checkCalibration(calibration.observedState?.proposalRead === "not-observed", "real-world response does not establish proposal readership");
  checkCalibration(calibration.observedState?.needQualified === "not-observed", "real-world response does not establish a qualified organizational need");
  checkCalibration(calibration.observedState?.budgetAuthority === "unknown", "real-world response does not establish budget authority");
  checkCalibration(calibration.observedState?.engagementAuthorized === "not-observed", "real-world response does not establish an authorized engagement");
  checkCalibration(calibration.observedState?.hiringDecision === "not-observed", "real-world response does not establish a hiring decision");
  failures.push(...calibrationFailures);

  check(receipt.schemaVersion === 1, "browser receipt schemaVersion must be 1");
  check(receipt.captureProtocol === "headless-browser-public-render-with-screenshot-v2", "browser capture protocol changed");
  check(receipt.startRoute === config.browser.startRoute, "browser receipt start route changed");
  check(receipt.repositoryAccess === false, "browser capture cannot inspect the repository");
  check(receipt.sourceCodeAccess === false, "browser capture cannot inspect source code");
  check(receipt.routeChain[0] === config.browser.startRoute, "browser route chain did not start at team memory");
  check(
    receipt.routeChain.every((route) => config.browser.allowedRoutes.includes(route)),
    "browser receipt includes a route outside the allowlist"
  );
  check(new Set(receipt.routeChain).size === receipt.routeChain.length, "browser route chain cannot contain duplicates");
  check(receipt.linkDiscovery?.["/lab/source-backed-team-memory"]?.includes("/resume"), "resume was not discovered from the team-memory page");
  check(receipt.linkDiscovery?.["/resume"]?.includes("/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf"), "PDF was not discovered from the resume page");
  check(/^[a-f0-9]{64}$/.test(receipt.publicSurfaceDigest ?? ""), "public surface digest is invalid");
  check(
    receipt.pages.every(
      (page) =>
        page.screenshot?.format === "png" &&
        page.screenshot?.width === 1440 &&
        page.screenshot?.height === 1200 &&
        /^[a-f0-9]{64}$/.test(page.screenshot?.sha256 ?? "")
    ),
    "browser screenshot evidence is incomplete"
  );
  check(receipt.resumeArtifact?.route === "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf", "public resume artifact changed");
  check(receipt.resumeArtifact?.status === 200, "public resume artifact did not return 200");
  check(/^[a-f0-9]{64}$/.test(receipt.resumeArtifact?.sha256 ?? ""), "resume artifact digest is invalid");
  const currentPublicResumeSha256 = createHash("sha256")
    .update(readFileSync(path.join(root, publicResumeRelativePath)))
    .digest("hex");
  check(
    receipt.resumeArtifact?.sha256 === currentPublicResumeSha256,
    "browser receipt resume digest is stale for the current public PDF"
  );

  for (const criterion of config.deterministicCriteria) {
    const page = routeRecords.get(criterion.route);
    check(Boolean(page), `${criterion.id}: missing browser page ${criterion.route}`);
    check(page?.status === 200, `${criterion.id}: browser page did not return 200`);
    check(page?.visibleText?.includes(criterion.needle), `${criterion.id}: missing ${criterion.needle}`);
  }

  const deterministicPassed = failures.length === 0;
  const candidateDigest = teamMemoryReferralCandidateDigest(root, config, receipt);
  if (deterministicPassed) {
    check(result.schemaVersion === 1, "advisory result schemaVersion must be 1");
    check(result.candidateDigest === candidateDigest, "advisory result is stale for this restricted packet");
    check(result.calibrationStatus === config.policy.calibrationStatus, "advisory result calibration boundary changed");
    check(result.simulatedRealPersonLens === true, "simulation disclosure is required");
    check(result.syntheticSpeechOnly === true, "only synthetic, explicitly labeled speech is allowed");
    check(/not a quotation.*endorsement/i.test(result.nonEndorsementBoundary ?? ""), "non-endorsement boundary is required");
    check(result.inputScope?.anonymizedArtifactsOnly === true, "result must use only anonymized artifacts");
    check(result.inputScope?.browserVisiblePublicSurfaceOnly === true, "result must use only browser-visible public surfaces");
    check(result.inputScope?.repositoryAccess === false, "result cannot use repository context");
    check(result.inputScope?.rawTranscriptAccess === false, "result cannot use raw transcripts");
    check(result.inputScope?.participantIdentityAccess === false, "result cannot use participant identity");
    check(result.inputScope?.companyIdentityAccess === false, "result cannot use company identity");
    check(result.referral?.label === "synthetic fictionalized referral note", "referral note must be labeled synthetic");
    check(typeof result.referral?.message === "string" && result.referral.message.trim(), "synthetic referral message is required");
    check(Array.isArray(result.authorityDiscussion) && result.authorityDiscussion.length >= 3, "authority discussion is required");
    check(result.authorityDiscussion?.every((turn) => typeof turn.role === "string" && typeof turn.message === "string" && turn.message.trim()), "authority discussion turns must be complete");
    check(result.decision?.decision === config.evaluator.acceptanceDecision, "advisory panel did not authorize the paid discovery");
    check(result.decision?.wouldHire === true, "advisory panel did not pass the hiring gate");
    check(nonEmptyStrings(result.decision?.conditions), "decision conditions are required");
    check(result.relay?.label === "synthetic fictionalized relay", "relay must be labeled synthetic");
    check(typeof result.relay?.message === "string" && result.relay.message.trim(), "relay message is required");
    check(nonEmptyStrings(result.relay?.recommendations), "relay recommendations are required");
    check(
      config.judges.every((judge) => result.judgeResults?.some((item) => item.id === judge.id && item.result === "pass" && typeof item.critique === "string" && item.critique.trim())),
      "all three advisory judges must pass with critiques"
    );
  }

  const advisorySimulationPassed = deterministicPassed && failures.length === 0;
  const realWorldCalibrationPassed = calibrationFailures.length === 0;
  return {
    passed: deterministicPassed && advisorySimulationPassed && realWorldCalibrationPassed,
    deterministicPassed,
    advisorySimulationPassed,
    realWorldCalibrationPassed,
    candidateDigest,
    failures
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const report = evaluateTeamMemoryReferralHiring(defaultRoot);
    process.stdout.write(`${JSON.stringify(report)}\n`);
    if (!report.passed) process.exitCode = 1;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
