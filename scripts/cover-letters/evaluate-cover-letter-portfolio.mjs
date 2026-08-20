import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readJson(relativePath, root = repoRoot) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

const defaultConfig = readJson("evals/cover-letters/hiring-reader-portfolio.json");
const defaultResumeConfig = readJson("evals/resumes/hiring-reader-portfolio.json");

function normalizeText(markdown) {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_>`~|]/g, " ");
}

function wordsIn(markdown) {
  return normalizeText(markdown).match(/[A-Za-z0-9$][A-Za-z0-9+./'’$–—-]*/g) ?? [];
}

function sha256(text) {
  return createHash("sha256").update(text).digest("hex");
}

function sameMembers(left, right) {
  const a = [...left].sort();
  const b = [...right].sort();
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function containsAny(text, patterns) {
  const folded = text.toLocaleLowerCase("en-US");
  return patterns.some((pattern) => folded.includes(pattern.toLocaleLowerCase("en-US")));
}

function artifactText(relativePath, root, overrides) {
  if (Object.prototype.hasOwnProperty.call(overrides, relativePath)) return overrides[relativePath];
  const absolutePath = path.join(root, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : null;
}

function evaluateVersion({ version, resumeVersion, config, root, artifactOverrides }) {
  const markdown = artifactText(version.coverLetterPath, root, artifactOverrides);
  const resume = artifactText(resumeVersion.resumePath, root, artifactOverrides);
  if (markdown === null) {
    return {
      opportunityId: version.opportunityId,
      status: version.status,
      coverLetterPath: version.coverLetterPath,
      resumePath: resumeVersion.resumePath,
      wordCount: 0,
      sha256: null,
      overall: "fail",
      artifactChecks: [{ id: "cover-letter-exists", pass: false, detail: "Required cover letter is missing." }],
      readerResults: version.readerCriteria.map((reader) => ({
        pairId: reader.pairId,
        displayName: resumeVersion.readerCriteria.find((candidate) => candidate.pairId === reader.pairId)?.displayName,
        preflightVerdict: "fail",
        decision: "block-model-review",
        missingSignalGroups: reader.signalGroups.map((group) => group.id),
        actualPersonParticipated: false
      }))
    };
  }

  const plainText = normalizeText(markdown);
  const firstThird = plainText.slice(0, Math.ceil(plainText.length / 3));
  const words = wordsIn(markdown);
  const voiceResults = Object.entries(version.voiceSignals).map(([id, patterns]) => ({
    id,
    pass: containsAny(plainText, patterns)
  }));
  const expectedDirectory = path.posix.dirname(resumeVersion.resumePath);
  const letterDirectory = path.posix.dirname(version.coverLetterPath);
  const isExpired = version.status === "expired-benchmark";
  const artifactChecks = [
    { id: "cover-letter-exists", pass: true, detail: "Required cover letter exists." },
    {
      id: "sibling-of-tailored-resume",
      pass: letterDirectory === expectedDirectory && resume !== null,
      detail: `${version.coverLetterPath} is maintained beside ${resumeVersion.resumePath}.`
    },
    {
      id: "target-role-near-top",
      pass: firstThird.toLocaleLowerCase("en-US").includes(resumeVersion.targetRole.toLocaleLowerCase("en-US")),
      detail: `${resumeVersion.targetRole} appears in the first third.`
    },
    {
      id: "organization-is-specific",
      pass: plainText.toLocaleLowerCase("en-US").includes(resumeVersion.organization.toLocaleLowerCase("en-US")),
      detail: `${resumeVersion.organization} is named.`
    },
    {
      id: "letter-structure",
      pass:
        /^Dear .+Hiring Team,/m.test(markdown) &&
        /\nWarmly,\s*\n\s*Jamie Burkart\s*$/m.test(markdown) &&
        /^\*\*Re:/m.test(markdown),
      detail: "The letter has a role line, direct greeting, and warm close."
    },
    {
      id: "word-count",
      pass: words.length >= config.letterStandards.minimumWords && words.length <= config.letterStandards.maximumWords,
      detail: `${words.length} words; required ${config.letterStandards.minimumWords}-${config.letterStandards.maximumWords}.`
    },
    {
      id: "clean-markdown",
      pass:
        !/!\[[^\]]*\]\([^)]+\)/.test(markdown) &&
        !/^\s*\|.+\|\s*$/m.test(markdown) &&
        !/<(?:table|div|img|header|footer)\b/i.test(markdown) &&
        !/```/.test(markdown),
      detail: "No images, tables, HTML layout, or code blocks."
    },
    {
      id: "not-resume-in-prose",
      pass: resume !== null && sha256(markdown) !== sha256(resume) && !/^## Professional Summary/m.test(markdown),
      detail: "The cover letter is a distinct narrative artifact, not the resume copied into paragraphs."
    },
    {
      id: "claim-and-endorsement-safety",
      pass: config.letterStandards.forbiddenPatterns.every((pattern) => !new RegExp(pattern, "i").test(plainText)),
      detail: "Avoids boilerplate, guarantees, invented participation, sole credit, and unsupported conformance claims."
    },
    {
      id: "writer-voice-movement",
      pass: voiceResults.every((result) => result.pass),
      detail: `${voiceResults.filter((result) => result.pass).length}/${voiceResults.length} scene-to-durable-possibility voice movements are present.`
    },
    {
      id: "lifecycle-safety",
      pass: isExpired
        ? /Historical benchmark — do not submit/i.test(markdown) && /expired on August 7, 2026/i.test(markdown)
        : !/do not submit|historical benchmark/i.test(markdown),
      detail: isExpired ? "Expired benchmark is unmistakably blocked from submission." : "Live or pending letter is not mislabeled as expired."
    }
  ];

  const artifactPass = artifactChecks.every((check) => check.pass);
  const resumeReaders = new Map(resumeVersion.readerCriteria.map((reader) => [reader.pairId, reader]));
  const readerResults = version.readerCriteria.map((reader) => {
    const sourceReader = resumeReaders.get(reader.pairId);
    const signalResults = reader.signalGroups.map((group) => ({
      id: group.id,
      pass: containsAny(plainText, group.patterns)
    }));
    const pass = artifactPass && Boolean(sourceReader) && signalResults.every((signal) => signal.pass);
    return {
      pairId: reader.pairId,
      readerId: sourceReader?.readerId,
      displayName: sourceReader?.displayName,
      relationship: sourceReader?.relationship,
      preflightVerdict: pass ? "pass" : "fail",
      decision: pass ? "eligible-for-fictionalized-model-review" : "block-model-review",
      matchedSignalGroups: signalResults.filter((signal) => signal.pass).map((signal) => signal.id),
      missingSignalGroups: signalResults.filter((signal) => !signal.pass).map((signal) => signal.id),
      actualPersonParticipated: false
    };
  });

  return {
    opportunityId: version.opportunityId,
    organization: resumeVersion.organization,
    targetRole: resumeVersion.targetRole,
    status: version.status,
    officialSource: resumeVersion.officialSource,
    coverLetterPath: version.coverLetterPath,
    resumePath: resumeVersion.resumePath,
    wordCount: words.length,
    sha256: sha256(markdown),
    resumeSha256: resume === null ? null : sha256(resume),
    overall: artifactPass && readerResults.every((reader) => reader.preflightVerdict === "pass") ? "pass" : "fail",
    voiceResults,
    artifactChecks,
    readerResults
  };
}

export function evaluateCoverLetterPortfolio({
  root = repoRoot,
  config = defaultConfig,
  resumeConfig = defaultResumeConfig,
  artifactOverrides = {}
} = {}) {
  const resumeByOpportunity = new Map(resumeConfig.versions.map((version) => [version.opportunityId, version]));
  const coverIds = config.versions.map((version) => version.opportunityId);
  const resumeIds = resumeConfig.versions.map((version) => version.opportunityId);
  const coverPairs = config.versions.flatMap((version) => version.readerCriteria.map((reader) => reader.pairId));
  const resumePairs = resumeConfig.versions.flatMap((version) => version.readerCriteria.map((reader) => reader.pairId));
  const skills = config.methodology.skills.map((skill) => {
    const absolutePath = path.join(root, skill.installedPath);
    return {
      id: skill.id,
      pass: existsSync(absolutePath) && readFileSync(absolutePath, "utf8").trim().length > 200,
      path: skill.installedPath
    };
  });
  const voiceProfileSha256 = sha256(config.writerVoiceSource.workingProfile.join("\n"));
  const portfolioChecks = [
    {
      id: "one-letter-per-maintained-resume",
      pass: sameMembers(coverIds, resumeIds) && new Set(coverIds).size === coverIds.length,
      detail: `${coverIds.length}/${resumeIds.length} maintained resume opportunities have exactly one configured cover letter.`
    },
    {
      id: "same-named-reader-pairs",
      pass: sameMembers(coverPairs, resumePairs),
      detail: `${coverPairs.length}/${resumePairs.length} resume hiring-reader pairs are also cover-letter gates.`
    },
    {
      id: "relevant-skills-pinned",
      pass: skills.every((skill) => skill.pass),
      detail: skills.map((skill) => `${skill.id}:${skill.pass ? "present" : "missing"}`).join(", ")
    },
    {
      id: "living-voice-source-bound",
      pass:
        config.writerVoiceSource.authority === "living-source-of-truth" &&
        config.writerVoiceSource.accessMode === "read-only" &&
        config.writerVoiceSource.rawDocumentCopiedIntoRepository === false &&
        new Date(config.writerVoiceSource.reviewedAt) >= new Date(config.writerVoiceSource.sourceModifiedAt) &&
        config.writerVoiceSource.workingProfile.length >= 5,
      detail: `${config.writerVoiceSource.title} was read after its recorded modification; only a bounded working profile is stored.`
    },
    {
      id: "fictionalized-reader-boundary",
      pass:
        config.contract.actualPeopleParticipated === false &&
        config.contract.passDecision === "advance-to-structured-next-step" &&
        /not proof of participation/i.test(config.methodology.principles.join(" ")),
      detail: "Named readers are fictionalized public-source lenses, not participants or endorsers."
    }
  ];

  const versions = config.versions.map((version) =>
    evaluateVersion({
      version,
      resumeVersion: resumeByOpportunity.get(version.opportunityId),
      config,
      root,
      artifactOverrides
    })
  );
  const readerResults = versions.flatMap((version) => version.readerResults);
  const overallPass =
    portfolioChecks.every((check) => check.pass) &&
    versions.length === resumeConfig.versions.length &&
    versions.every((version) => version.overall === "pass") &&
    readerResults.length === resumePairs.length &&
    readerResults.every((reader) => reader.preflightVerdict === "pass");

  return {
    schemaVersion: 1,
    evalId: config.id,
    evaluatedAt: config.evaluatedAt,
    overall: overallPass ? "pass" : "fail",
    decision: overallPass ? "eligible-for-fictionalized-model-review" : "block-model-review",
    acceptanceQuestion: config.contract.acceptanceQuestion,
    actualPeopleParticipated: false,
    voiceSource: {
      title: config.writerVoiceSource.title,
      canonicalUrl: config.writerVoiceSource.canonicalUrl,
      sourceModifiedAt: config.writerVoiceSource.sourceModifiedAt,
      reviewedAt: config.writerVoiceSource.reviewedAt,
      rawDocumentCopiedIntoRepository: false,
      workingProfileSha256: voiceProfileSha256
    },
    summary: {
      requiredLetters: resumeConfig.versions.length,
      maintainedLetters: versions.filter((version) => version.artifactChecks.some((check) => check.id === "cover-letter-exists" && check.pass)).length,
      passingLetters: versions.filter((version) => version.overall === "pass").length,
      requiredReaderPairs: resumePairs.length,
      passingReaderPreflights: readerResults.filter((reader) => reader.preflightVerdict === "pass").length
    },
    portfolioChecks,
    versions,
    boundary: "This deterministic preflight checks artifacts, lifecycle, voice movement, truth boundaries, and reader-specific evidence before any model call. It is not actual participation, endorsement, an interview promise, or a final hiring decision."
  };
}

export function currentRunSnapshot(result) {
  return result;
}

function main() {
  const result = evaluateCoverLetterPortfolio();
  console.log(JSON.stringify(result, null, 2));
  assert.equal(result.overall, "pass", "Cover-letter portfolio did not clear deterministic preflight");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
