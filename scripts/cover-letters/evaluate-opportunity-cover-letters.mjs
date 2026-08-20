import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluatePublicResumeSelection } from "../resumes/evaluate-public-resume-selection.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readJson(root, relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

const defaultConfig = readJson(repoRoot, "evals/cover-letters/opportunity-cover-letters.json");

function frontmatter(markdown) {
  if (!markdown.startsWith("---\n")) return {};
  const closing = markdown.indexOf("\n---\n", 4);
  if (closing < 0) return {};
  const values = {};
  for (const line of markdown.slice(4, closing).split("\n")) {
    const separator = line.indexOf(":");
    if (separator < 0 || /^\s/.test(line)) continue;
    values[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  return values;
}

function contentAfterFrontmatter(markdown) {
  const closing = markdown.startsWith("---\n") ? markdown.indexOf("\n---\n", 4) : -1;
  return closing >= 0 ? markdown.slice(closing + 5).trim() : markdown.trim();
}

function letterBody(markdown) {
  const content = contentAfterFrontmatter(markdown);
  const dearIndex = content.search(/^Dear .+,$/m);
  if (dearIndex < 0) return "";
  const afterDear = content.slice(dearIndex).replace(/^Dear .+,$/m, "").trim();
  return afterDear.split(/^Sincerely,$/m)[0]?.trim() ?? "";
}

function words(text) {
  return text.match(/[A-Za-z0-9$][A-Za-z0-9+./'’$–—-]*/g) ?? [];
}

function paragraphs(text) {
  return text.split(/\n\s*\n/).map((value) => value.trim()).filter(Boolean);
}

function includesAny(text, patterns) {
  const folded = text.toLocaleLowerCase("en-US");
  return patterns.some((pattern) => folded.includes(pattern.toLocaleLowerCase("en-US")));
}

function sameMembers(left, right) {
  const a = [...left].sort();
  const b = [...right].sort();
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function daysBetween(later, earlier) {
  return (new Date(later).getTime() - new Date(earlier).getTime()) / 86400000;
}

function letterText(relativePath, root, overrides) {
  if (Object.prototype.hasOwnProperty.call(overrides, relativePath)) return overrides[relativePath];
  const absolute = path.join(root, relativePath);
  return existsSync(absolute) ? readFileSync(absolute, "utf8") : null;
}

function sha256(text) {
  return createHash("sha256").update(text).digest("hex");
}

export function evaluateOpportunityCoverLetters({
  root = repoRoot,
  config = defaultConfig,
  configOverrides = {},
  letterOverrides = {},
  selectionOverrides = {}
} = {}) {
  const effectiveConfig = { ...config, ...configOverrides };
  const portfolio = readJson(root, effectiveConfig.hiringReaderPortfolioPath);
  const lock = readJson(root, "skills-lock.json");
  const selection = evaluatePublicResumeSelection({ root, opportunityOverrides: selectionOverrides });
  const sourceRecord = path.join(root, effectiveConfig.voice.sourceRecordPath);
  const sourceRecordText = existsSync(sourceRecord) ? readFileSync(sourceRecord, "utf8") : "";
  const voiceAgeDays = daysBetween(effectiveConfig.asOf, effectiveConfig.voice.connectedReadAt);
  const voiceChecks = {
    sourceRecordExists: existsSync(sourceRecord),
    stableUrlRecorded: sourceRecordText.includes(effectiveConfig.voice.sourceUrl),
    modificationTimeRecorded: sourceRecordText.includes(effectiveConfig.voice.sourceModifiedAt),
    revisionFingerprintRecorded: sourceRecordText.includes(effectiveConfig.voice.revisionSha256),
    connectedReadFresh:
      voiceAgeDays >= 0 && voiceAgeDays <= effectiveConfig.voice.maxConnectedReadAgeDays
  };
  const skills = effectiveConfig.skills.map((skill) => ({
    ...skill,
    fileExists: existsSync(path.join(root, skill.path)),
    lockMatches: lock.skills?.[skill.lockKey]?.source === skill.source
  }));
  const skillChecksPass = skills.every((skill) => skill.fileExists && skill.lockMatches);

  const opportunityIds = portfolio.versions.map((version) => version.opportunityId);
  const portfolioCoverage = {
    idsUnique: new Set(opportunityIds).size === opportunityIds.length,
    everyResumeHasCoverLetterPath: portfolio.versions.every((version) => Boolean(version.coverLetterPath)),
    everyVersionHasReaders: portfolio.versions.every((version) => version.readerCriteria.length > 0)
  };

  const versions = portfolio.versions.map((version) => {
    const markdown = version.coverLetterPath
      ? letterText(version.coverLetterPath, root, letterOverrides)
      : null;
    const metadata = markdown ? frontmatter(markdown) : {};
    const documentText = markdown ? contentAfterFrontmatter(markdown) : "";
    const body = markdown ? letterBody(markdown) : "";
    const bodyWords = words(body).length;
    const bodyParagraphs = paragraphs(body).length;
    const readerGateIds = version.readerCriteria.map((reader) => reader.gateId);
    const opportunity = existsSync(path.join(root, version.opportunityPath))
      ? readFileSync(path.join(root, version.opportunityPath), "utf8")
      : "";
    const officialSource = opportunity.match(/^canonical_url:\s*(.+)$/m)?.[1]?.trim() ?? null;
    const projectAnchorCount = effectiveConfig.policy.projectAnchors.filter((anchor) =>
      body.toLocaleLowerCase("en-US").includes(anchor.toLocaleLowerCase("en-US"))
    ).length;
    const checks = {
      fileExists: markdown !== null,
      adjacentToResume:
        Boolean(version.coverLetterPath) &&
        path.dirname(version.coverLetterPath) === path.dirname(version.resumePath),
      opportunityBound: metadata.opportunity_id === version.opportunityId,
      opportunityPathBound: metadata.opportunity_path === version.opportunityPath,
      resumeBound: metadata.resume_path === version.resumePath,
      sourceBound:
        metadata.writer_voice_source === effectiveConfig.voice.sourceRecordPath &&
        metadata.writer_voice_source_modified === effectiveConfig.voice.sourceModifiedAt &&
        metadata.writer_voice_revision_sha256 === effectiveConfig.voice.revisionSha256,
      officialSourceBound: officialSource !== null && metadata.official_source === officialSource,
      wordCount:
        bodyWords >= effectiveConfig.policy.minimumWords &&
        bodyWords <= effectiveConfig.policy.maximumWords,
      paragraphCount:
        bodyParagraphs >= effectiveConfig.policy.minimumBodyParagraphs &&
        bodyParagraphs <= effectiveConfig.policy.maximumBodyParagraphs,
      salutationAndSignature:
        markdown !== null && /^Dear .+,$/m.test(markdown) && /^Sincerely,$/m.test(markdown),
      roleSpecific:
        documentText.toLocaleLowerCase("en-US").includes(version.organization.toLocaleLowerCase("en-US")) &&
        version.targetRole
          .toLocaleLowerCase("en-US")
          .split(/[^a-z0-9]+/)
          .filter((token) => token.length > 2)
          .every((token) => documentText.toLocaleLowerCase("en-US").includes(token)),
      evidenceSpecific: projectAnchorCount >= 2,
      voiceSequenceSignals:
        includesAny(body, effectiveConfig.policy.humanStakePatterns) &&
        includesAny(body, effectiveConfig.policy.systemPatterns) &&
        includesAny(body, effectiveConfig.policy.hingePatterns) &&
        includesAny(body, effectiveConfig.policy.durablePossibilityPatterns),
      authorityBoundary: includesAny(body, effectiveConfig.policy.authorityBoundaryPatterns),
      avoidsGenericPhrases: !includesAny(body, effectiveConfig.policy.forbiddenPhrases),
      avoidsUnsupportedClaims: !includesAny(body, effectiveConfig.policy.forbiddenUnsupportedClaims),
      readerIdsUnique: new Set(readerGateIds).size === readerGateIds.length
    };
    return {
      opportunityId: version.opportunityId,
      organization: version.organization,
      targetRole: version.targetRole,
      opportunityPath: version.opportunityPath,
      resumePath: version.resumePath,
      coverLetterPath: version.coverLetterPath ?? null,
      readerGateIds,
      bodyWords,
      bodyParagraphs,
      projectAnchorCount,
      checks,
      deterministicPass: Object.values(checks).every(Boolean)
    };
  });

  const selectedVersions = versions.filter((version) =>
    selection.selectedOpportunityIds.includes(version.opportunityId)
  );
  const selectedCovered = sameMembers(
    selectedVersions.map((version) => version.opportunityId),
    selection.selectedOpportunityIds
  );
  const selectedReaderGateIds = selectedVersions.flatMap((version) => version.readerGateIds);
  const latestRunPath = effectiveConfig.readerContract.latestRunPath;
  const latestRunAbsolute = latestRunPath ? path.join(root, latestRunPath) : null;
  const latestRunExists = latestRunAbsolute !== null && existsSync(latestRunAbsolute);
  const latestRun = latestRunExists ? JSON.parse(readFileSync(latestRunAbsolute, "utf8")) : null;
  const runResults = Array.isArray(latestRun?.results) ? latestRun.results : [];
  const runGateIds = runResults.map((result) => result.gateId);
  const runCoversSelectedReaders = sameMembers(runGateIds, selectedReaderGateIds);
  const resultCountsMatch =
    latestRun !== null &&
    latestRun.evaluationCount === runResults.length &&
    latestRun.advancePassCount === runResults.filter((result) => result.verdict === "pass").length &&
    latestRun.advanceFailCount === runResults.filter((result) => result.verdict === "fail").length &&
    latestRun.voicePassCount === runResults.filter((result) => result.voiceVerdict === "pass").length &&
    latestRun.voiceFailCount === runResults.filter((result) => result.voiceVerdict === "fail").length;
  const acceptanceStatementsMatch = runResults.every((result) =>
    result.verdict === "pass"
      ? result.acceptanceStatement === effectiveConfig.readerContract.passStatement
      : result.verdict === "fail" &&
        result.acceptanceStatement === effectiveConfig.readerContract.failStatement
  );
  const readerRunIntegrityPass =
    latestRun !== null &&
    latestRun.suiteId === effectiveConfig.id &&
    runCoversSelectedReaders &&
    resultCountsMatch &&
    acceptanceStatementsMatch;
  const digestStates = selectedVersions.map((version) => {
    const markdown = letterText(version.coverLetterPath, root, letterOverrides);
    const currentSha256 = markdown === null ? null : sha256(markdown);
    const recordedSha256 = latestRun?.artifactDigests?.[version.opportunityId] ?? null;
    return {
      opportunityId: version.opportunityId,
      currentSha256,
      recordedSha256,
      exact: currentSha256 !== null && currentSha256 === recordedSha256
    };
  });
  const exactMaterialOpportunityIds = new Set(
    digestStates.filter((state) => state.exact).map((state) => state.opportunityId)
  );
  const selectedMaterialsExact = digestStates.every((state) => state.exact);
  const advancementPass =
    readerRunIntegrityPass &&
    selectedMaterialsExact &&
    runResults.every((result) => result.verdict === "pass");
  const voicePass =
    readerRunIntegrityPass &&
    selectedMaterialsExact &&
    runResults.every((result) => result.voiceVerdict === "pass");
  const deterministicPass =
    Object.values(voiceChecks).every(Boolean) &&
    skillChecksPass &&
    Object.values(portfolioCoverage).every(Boolean) &&
    versions.every((version) => version.deterministicPass) &&
    selection.overall === "pass" &&
    selection.llmGate.allowed &&
    selectedCovered &&
    readerRunIntegrityPass &&
    selectedVersions.every((version) => version.deterministicPass);
  const llmQueue = deterministicPass
    ? selection.llmGate.queue
      .filter((entry) => !exactMaterialOpportunityIds.has(entry.opportunityId))
      .map((entry) => {
        const version = selectedVersions.find((candidate) => candidate.opportunityId === entry.opportunityId);
        return {
          ...entry,
          coverLetterPath: version.coverLetterPath,
          resumePath: version.resumePath
        };
      })
    : [];

  return {
    id: effectiveConfig.id,
    asOf: effectiveConfig.asOf,
    voice: { ...voiceChecks, ageDays: voiceAgeDays },
    skills,
    portfolioCoverage,
    versionCount: versions.length,
    versions,
    selection: {
      tier: selection.selectedTier,
      opportunityIds: selection.selectedOpportunityIds,
      selectedCovered,
      selectedReadersCoveredByRun: runCoversSelectedReaders
    },
    readerRun: {
      path: latestRunPath,
      exists: latestRunExists,
      integrityPass: readerRunIntegrityPass,
      resultCountsMatch,
      acceptanceStatementsMatch,
      artifactDigests: digestStates,
      selectedMaterialsExact,
      advancePassCount: runResults.filter((result) => result.verdict === "pass").length,
      advanceFailCount: runResults.filter((result) => result.verdict === "fail").length,
      voicePassCount: runResults.filter((result) => result.voiceVerdict === "pass").length,
      voiceFailCount: runResults.filter((result) => result.voiceVerdict === "fail").length,
      advancementOverall: advancementPass ? "pass" : "fail",
      voiceOverall: voicePass ? "pass" : "fail"
    },
    llmGate: {
      allowed: deterministicPass,
      queue: llmQueue,
      queuedCalls: llmQueue.length,
      avoidedCalls:
        selection.llmGate.avoidedCalls + selectedReaderGateIds.length - llmQueue.length,
      reason: deterministicPass
        ? llmQueue.length === 0
          ? "The current reader run exactly matches every selected cover-letter digest, so no modeled review is repeated."
          : "Only selected opportunities whose cover-letter digest changed are released for modeled review."
        : "Named-reader work is blocked until the voice source, skills, cover letters, resumes, opportunities, selection, and latest-run integrity all bind."
    },
    maintenanceOverall: deterministicPass ? "pass" : "fail",
    overall: deterministicPass && advancementPass && voicePass ? "pass" : "fail",
    boundary: "Modeled readers receive public application materials only. Their outputs are synthetic critique, not participation, endorsement, prediction, interview, offer, or hire."
  };
}

function main() {
  const result = evaluateOpportunityCoverLetters();
  console.log(JSON.stringify(result, null, 2));
  if (result.overall !== "pass") process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
