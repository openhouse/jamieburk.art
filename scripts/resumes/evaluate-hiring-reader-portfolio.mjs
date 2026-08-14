import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readJson(relativePath, root = repoRoot) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

const defaultConfig = readJson("evals/resumes/hiring-reader-portfolio.json");
const defaultReaderSuite = readJson(defaultConfig.readerSuitePath);
const defaultSkillsLock = readJson("skills-lock.json");

function normalizeText(markdown) {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#*_>`~|]/g, " ");
}

function wordsIn(markdown) {
  return normalizeText(markdown).match(/[A-Za-z0-9$][A-Za-z0-9+./'’$–—-]*/g) ?? [];
}

function sameMembers(left, right) {
  const sortedLeft = [...left].sort();
  const sortedRight = [...right].sort();
  return (
    sortedLeft.length === sortedRight.length &&
    sortedLeft.every((value, index) => value === sortedRight[index])
  );
}

function containsAny(text, patterns) {
  const folded = text.toLocaleLowerCase("en-US");
  return patterns.some((pattern) => folded.includes(pattern.toLocaleLowerCase("en-US")));
}

function sha256(text) {
  return createHash("sha256").update(text).digest("hex");
}

function getResumeText(version, root, resumeOverrides) {
  if (Object.prototype.hasOwnProperty.call(resumeOverrides, version.resumePath)) {
    return resumeOverrides[version.resumePath];
  }
  const absolutePath = path.join(root, version.resumePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : null;
}

function maximumRoleBullets(markdown) {
  const experience = markdown.split(/^## Professional Experience\s*$/im)[1]?.split(/^## /m)[0] ?? "";
  const roles = experience.split(/^### /m).slice(1);
  return roles.reduce((maximum, role) => {
    const count = (role.match(/^- /gm) ?? []).length;
    return Math.max(maximum, count);
  }, 0);
}

export function evaluateHiringReaderPortfolio({
  root = repoRoot,
  config = defaultConfig,
  readerSuite = defaultReaderSuite,
  skillsLock = defaultSkillsLock,
  resumeOverrides = {},
  skillTextOverride
} = {}) {
  const requiredOpportunityIds = [
    ...new Set(readerSuite.opportunityReaders.map((reader) => reader.opportunityId))
  ];
  const requiredGateIds = readerSuite.opportunityReaders.map((reader) => reader.id);
  const configuredOpportunityIds = config.versions.map((version) => version.opportunityId);
  const configuredGateIds = config.versions.flatMap((version) =>
    version.readerCriteria.map((reader) => reader.gateId)
  );
  const installedSkillPath = path.join(root, config.methodology.installedPath);
  const installedSkill = skillTextOverride ?? (
    existsSync(installedSkillPath) ? readFileSync(installedSkillPath, "utf8") : null
  );
  const skillLock = skillsLock.skills?.[config.methodology.primarySkill];

  const portfolioChecks = [
    {
      id: "named-reader-opportunity-coverage",
      pass: sameMembers(requiredOpportunityIds, configuredOpportunityIds),
      detail: `${configuredOpportunityIds.length}/${requiredOpportunityIds.length} named-reader opportunity versions configured.`
    },
    {
      id: "named-reader-pair-coverage",
      pass: sameMembers(requiredGateIds, configuredGateIds),
      detail: `${configuredGateIds.length}/${requiredGateIds.length} named reader/opportunity gates configured.`
    },
    {
      id: "candidate-evaluation-skill-pinned",
      pass:
        installedSkill !== null &&
        sha256(installedSkill) === config.methodology.skillFileSha256 &&
        skillLock?.source === "refoundai/lenny-skills" &&
        skillLock?.sourceType === "github",
      detail: `${config.methodology.primarySkill} is repository-pinned with source provenance and an exact SKILL.md digest.`
    },
    {
      id: "fictionalized-public-context-boundary",
      pass:
        config.contract.actualPeopleParticipated === false &&
        config.contract.passDecision === "advance-to-structured-next-step" &&
        /fictionalized public-source lens/i.test(config.contract.acceptanceQuestion),
      detail: "A modeled pass advances to a structured next step and cannot represent actual participation or a final hire."
    }
  ];

  const versions = config.versions.map((version) => {
    const markdown = getResumeText(version, root, resumeOverrides);
    const plainText = markdown ? normalizeText(markdown) : "";
    const words = markdown ? wordsIn(markdown) : [];
    const firstThird = plainText.slice(0, Math.ceil(plainText.length / 3));
    const numericSignals = new Set(
      (plainText.match(/(?:\$?\d[\d,]*(?:\.\d+)?(?:\+|x|%|\s*sq\.\s*ft\.)?)/gi) ?? [])
        .map((value) => value.toLowerCase())
    );
    const opportunityPath = path.join(root, version.opportunityPath);
    const opportunityText = existsSync(opportunityPath) ? readFileSync(opportunityPath, "utf8") : "";
    const maximumBullets = markdown ? maximumRoleBullets(markdown) : 0;

    const artifactChecks = [
      {
        id: "resume-file-exists",
        pass: markdown !== null,
        detail: version.resumePath
      },
      {
        id: "opportunity-record-binding",
        pass:
          opportunityText.includes(`id: ${version.opportunityId}`) &&
          opportunityText.includes(`canonical_url: ${version.officialSource}`),
        detail: version.opportunityPath
      },
      {
        id: "exact-target-in-first-third",
        pass: firstThird.toLowerCase().includes(version.targetRole.toLowerCase()),
        detail: `${version.targetRole} appears in the first third.`
      },
      {
        id: "standard-sections",
        pass:
          markdown !== null &&
          config.resumeStandards.requiredHeadings.every((heading) =>
            new RegExp(`^## (?:[^\\n]*${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^\\n]*)$`, "im").test(markdown)
          ),
        detail: "Standard ATS-readable headings are present."
      },
      {
        id: "ats-safe-markdown",
        pass:
          markdown !== null &&
          !/!\[[^\]]*\]\([^)]+\)/.test(markdown) &&
          !/^\s*\|.+\|\s*$/m.test(markdown) &&
          !/<(?:table|div|img|header|footer)\b/i.test(markdown) &&
          !/```/.test(markdown),
        detail: "No images, tables, HTML layout, or code blocks."
      },
      {
        id: "complete-contact-block",
        pass:
          markdown !== null &&
          [
            /jamie\.burkart@gmail\.com/i,
            /\(816\)\s*728-8685/,
            /jamieburk\.art/i,
            /linkedin\.com\/in\/jamie-burkart/i,
            /github\.com\/openhouse/i
          ].every((pattern) => pattern.test(markdown)),
        detail: "Email, phone, portfolio, LinkedIn, and GitHub are present."
      },
      {
        id: "word-count",
        pass:
          words.length >= config.resumeStandards.minimumWords &&
          words.length <= config.resumeStandards.maximumWords,
        detail: `${words.length} words; required ${config.resumeStandards.minimumWords}-${config.resumeStandards.maximumWords}.`
      },
      {
        id: "role-bullet-density",
        pass:
          markdown !== null &&
          maximumBullets > 0 &&
          maximumBullets <= config.resumeStandards.maximumBulletsPerRole,
        detail: `Maximum ${maximumBullets} bullets for one role; allowed ${config.resumeStandards.maximumBulletsPerRole}.`
      },
      {
        id: "quantified-evidence",
        pass: numericSignals.size >= config.resumeStandards.minimumNumericSignals,
        detail: `${numericSignals.size} distinct numeric signals; required ${config.resumeStandards.minimumNumericSignals}.`
      },
      {
        id: "third-person-resume-voice",
        pass: markdown !== null && !/\b(?:I|me|my|mine)\b/.test(plainText),
        detail: "Avoids first-person claims and personal appeals."
      },
      {
        id: "claim-and-endorsement-safety",
        pass:
          markdown !== null &&
          config.resumeStandards.forbiddenPatterns.every(
            (pattern) => !new RegExp(pattern, "i").test(plainText)
          ),
        detail: "Avoids guaranteed outcomes, invented named-reader participation, sole-credit claims, and unsupported conformance claims."
      }
    ];

    const artifactPass = artifactChecks.every((check) => check.pass);
    const readerResults = version.readerCriteria.map((reader) => {
      const registryEntry = readerSuite.opportunityReaders.find((entry) => entry.id === reader.gateId);
      const readerProfilePath = registryEntry?.readerPath
        ? path.join(root, registryEntry.readerPath)
        : null;
      const readerProfile = readerProfilePath && existsSync(readerProfilePath)
        ? readFileSync(readerProfilePath, "utf8")
        : "";
      const signalResults = reader.signalGroups.map((group) => ({
        id: group.id,
        pass: containsAny(plainText, group.patterns)
      }));
      const registryBound =
        registryEntry?.readerId === reader.readerId &&
        registryEntry?.opportunityId === version.opportunityId;
      const profileBound =
        readerProfile.includes(`id: ${reader.readerId}`) &&
        readerProfile.includes(`displayName: ${reader.displayName}`) &&
        /publicSources:/i.test(readerProfile) &&
        /Simulated .*not actual participation|not actual participation|not actual .* endorsement/i.test(readerProfile);
      const modeledPass =
        artifactPass && registryBound && profileBound && signalResults.every((signal) => signal.pass);

      return {
        gateId: reader.gateId,
        readerId: reader.readerId,
        displayName: reader.displayName,
        relationship: reader.relationship,
        registryBound,
        profileBound,
        modeledVerdict: modeledPass ? "pass" : "fail",
        decision: modeledPass ? config.contract.passDecision : "do-not-advance",
        actualPersonParticipated: false,
        matchedSignalGroups: signalResults.filter((signal) => signal.pass).map((signal) => signal.id),
        missingSignalGroups: signalResults.filter((signal) => !signal.pass).map((signal) => signal.id),
        constructiveCritique: reader.constructiveCritique,
        validateNext: reader.validateNext
      };
    });

    return {
      opportunityId: version.opportunityId,
      organization: version.organization,
      targetRole: version.targetRole,
      status: version.status,
      officialSource: version.officialSource,
      resumePath: version.resumePath,
      wordCount: words.length,
      numericSignalCount: numericSignals.size,
      sha256: markdown ? sha256(markdown) : null,
      overall:
        artifactPass && readerResults.every((reader) => reader.modeledVerdict === "pass")
          ? "pass"
          : "fail",
      artifactChecks,
      readerResults
    };
  });

  const readerResults = versions.flatMap((version) => version.readerResults);
  const maintainedVersions = versions.filter((version) =>
    version.artifactChecks.find((check) => check.id === "resume-file-exists")?.pass
  ).length;
  const passingReaders = readerResults.filter((reader) => reader.modeledVerdict === "pass").length;
  const overallPass =
    portfolioChecks.every((check) => check.pass) &&
    versions.length === requiredOpportunityIds.length &&
    versions.every((version) => version.overall === "pass") &&
    readerResults.length === requiredGateIds.length &&
    passingReaders === requiredGateIds.length;

  return {
    schemaVersion: 1,
    evalId: config.id,
    runId: "2026-08-14-hiring-reader-resume-portfolio-post-hillclimb",
    evaluatedAt: config.evaluatedAt,
    methodologySkill: config.methodology.primarySkill,
    actualPeopleParticipated: false,
    acceptanceQuestion: config.contract.acceptanceQuestion,
    decision: overallPass ? config.contract.passDecision : "do-not-advance",
    overall: overallPass ? "pass" : "fail",
    summary: {
      requiredOpportunityVersions: requiredOpportunityIds.length,
      maintainedOpportunityVersions: maintainedVersions,
      passingOpportunityVersions: versions.filter((version) => version.overall === "pass").length,
      requiredReaderOpportunityPairs: requiredGateIds.length,
      passingReaderOpportunityPairs: passingReaders
    },
    portfolioChecks,
    versions,
    boundary: "This is a deterministic, fictionalized public-source resume screen. It is not participation, endorsement, an interview promise, or a final hiring decision by any named person."
  };
}

export function currentRunSnapshot(result) {
  return {
    schemaVersion: result.schemaVersion,
    evalId: result.evalId,
    runId: result.runId,
    evaluatedAt: result.evaluatedAt,
    methodologySkill: result.methodologySkill,
    actualPeopleParticipated: result.actualPeopleParticipated,
    acceptanceQuestion: result.acceptanceQuestion,
    decision: result.decision,
    overall: result.overall,
    summary: result.summary,
    portfolioChecks: result.portfolioChecks,
    versions: result.versions.map((version) => ({
      opportunityId: version.opportunityId,
      status: version.status,
      resumePath: version.resumePath,
      wordCount: version.wordCount,
      numericSignalCount: version.numericSignalCount,
      sha256: version.sha256,
      overall: version.overall,
      readerResults: version.readerResults.map((reader) => ({
        gateId: reader.gateId,
        readerId: reader.readerId,
        displayName: reader.displayName,
        modeledVerdict: reader.modeledVerdict,
        decision: reader.decision,
        actualPersonParticipated: reader.actualPersonParticipated,
        profileBound: reader.profileBound,
        missingSignalGroups: reader.missingSignalGroups,
        validateNext: reader.validateNext
      }))
    })),
    boundary: result.boundary
  };
}

function main() {
  const result = evaluateHiringReaderPortfolio();
  console.log(JSON.stringify(result, null, 2));

  if (!process.argv.includes("--no-current-run-check")) {
    const expected = readJson(defaultConfig.currentRunPath);
    assert.deepEqual(currentRunSnapshot(result), expected, "Committed resume portfolio run is stale");
  }

  if (result.overall !== "pass") process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
