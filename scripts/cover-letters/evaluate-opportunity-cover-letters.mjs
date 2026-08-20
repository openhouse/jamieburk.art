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
  const queueGateIds = selection.llmGate.queue.map((entry) => entry.gateId);
  const selectedReaderGateIds = selectedVersions.flatMap((version) => version.readerGateIds);
  const selectedReadersBound = sameMembers(queueGateIds, selectedReaderGateIds);
  const deterministicPass =
    Object.values(voiceChecks).every(Boolean) &&
    skillChecksPass &&
    Object.values(portfolioCoverage).every(Boolean) &&
    versions.every((version) => version.deterministicPass) &&
    selection.overall === "pass" &&
    selection.llmGate.allowed &&
    selectedCovered &&
    selectedReadersBound &&
    selectedVersions.every((version) => version.deterministicPass);
  const llmQueue = deterministicPass
    ? selection.llmGate.queue.map((entry) => {
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
      selectedReadersBound
    },
    llmGate: {
      allowed: deterministicPass,
      queue: llmQueue,
      queuedCalls: llmQueue.length,
      avoidedCalls: selection.llmGate.avoidedCalls,
      reason: deterministicPass
        ? "Voice provenance, skills, material bindings, role status, and exact selected readers passed before modeled review."
        : "Named-reader work is blocked until the voice source, skills, cover letters, resumes, opportunities, and exact selection all bind."
    },
    overall: deterministicPass ? "pass" : "fail",
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
