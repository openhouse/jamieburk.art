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
const defaultSuite = readJson("evals/knowledge-wiki/hiring-suites.json");
const defaultNamedReader = readJson("evals/knowledge-wiki/named-reader-acceptance.json");

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
  return (
    left.length === right.length &&
    [...left].sort().every((value, index) => value === [...right].sort()[index])
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

function evaluateResumeVersion({ version, root, resumeOverrides, config }) {
  const markdown = getResumeText(version, root, resumeOverrides);
  if (markdown === null) {
    return {
      artifactId: version.artifactId,
      opportunityId: version.opportunityId,
      resumePath: version.resumePath,
      status: version.status,
      overall: "fail",
      wordCount: 0,
      sha256: null,
      artifactChecks: [
        { id: "resume-file-exists", pass: false, detail: "Required resume version is missing." }
      ],
      readerResults: version.readerCriteria.map((reader) => ({
        pairId: reader.pairId,
        readerId: reader.readerId,
        displayName: reader.displayName,
        modeledVerdict: "fail",
        decision: "do-not-advance",
        actualPersonParticipated: false,
        matchedSignalGroups: [],
        missingSignalGroups: reader.signalGroups.map((group) => group.id),
        constructiveCritique: reader.constructiveCritique,
        validateNext: reader.validateNext
      }))
    };
  }

  const plainText = normalizeText(markdown);
  const firstThird = plainText.slice(0, Math.ceil(plainText.length / 3));
  const words = wordsIn(markdown);
  const artifactChecks = [
    {
      id: "resume-file-exists",
      pass: true,
      detail: "Required resume version exists."
    },
    {
      id: "target-role-near-top",
      pass: firstThird.toLocaleLowerCase("en-US").includes(version.targetRole.toLocaleLowerCase("en-US")),
      detail: `${version.targetRole} appears in the first third.`
    },
    {
      id: "standard-sections",
      pass: config.resumeStandards.requiredHeadings.every((heading) =>
        new RegExp(`^## (?:[^\\n]*${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^\\n]*)$`, "im").test(markdown)
      ),
      detail: "Standard ATS-readable headings are present."
    },
    {
      id: "ats-safe-markdown",
      pass:
        !/!\[[^\]]*\]\([^)]+\)/.test(markdown) &&
        !/^\s*\|.+\|\s*$/m.test(markdown) &&
        !/<(?:table|div|img|header|footer)\b/i.test(markdown) &&
        !/```/.test(markdown),
      detail: "No images, tables, HTML layout, or code blocks."
    },
    {
      id: "complete-contact-block",
      pass: [
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
      id: "third-person-resume-voice",
      pass: !/\b(?:I|me|my|mine)\b/.test(plainText),
      detail: "Avoids first-person claims and personal appeals."
    },
    {
      id: "claim-and-endorsement-safety",
      pass: config.resumeStandards.forbiddenPatterns.every(
        (pattern) => !new RegExp(pattern, "i").test(plainText)
      ),
      detail: "Avoids guaranteed outcomes, invented named-reader participation, sole-credit claims, and unsupported conformance claims."
    }
  ];

  const artifactPass = artifactChecks.every((check) => check.pass);
  const readerResults = version.readerCriteria.map((reader) => {
    const signalResults = reader.signalGroups.map((group) => ({
      id: group.id,
      pass: containsAny(plainText, group.patterns)
    }));
    const modeledPass = artifactPass && signalResults.every((signal) => signal.pass);
    return {
      pairId: reader.pairId,
      readerId: reader.readerId,
      displayName: reader.displayName,
      relationship: reader.relationship,
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
    artifactId: version.artifactId,
    opportunityId: version.opportunityId,
    organization: version.organization,
    targetRole: version.targetRole,
    status: version.status,
    officialSource: version.officialSource,
    activeOpportunityIds: version.activeOpportunityIds,
    resumePath: version.resumePath,
    wordCount: words.length,
    sha256: sha256(markdown),
    overall:
      artifactPass && readerResults.every((reader) => reader.modeledVerdict === "pass")
        ? "pass"
        : "fail",
    artifactChecks,
    readerResults
  };
}

export function evaluateHiringReaderPortfolio({
  root = repoRoot,
  config = defaultConfig,
  suite = defaultSuite,
  namedReader = defaultNamedReader,
  resumeOverrides = {}
} = {}) {
  const requiredOpportunityIds = [
    ...suite.priorityOpportunityIds,
    ...suite.benchmarkOpportunityIds
  ];
  const configuredOpportunityIds = config.versions.map((version) => version.opportunityId);
  const requiredPairs = namedReader.readerOpportunityPairs
    .filter((pair) => pair.required)
    .map((pair) => pair.id);
  const configuredPairs = config.versions.flatMap((version) =>
    version.readerCriteria.map((reader) => reader.pairId)
  );
  const activeOpportunityIds = suite.activeTruthfullyHirableOpportunityIds ?? [];
  const activeVersions = config.versions.filter((version) =>
    activeOpportunityIds.includes(version.opportunityId)
  );
  const activeReaderCriteria = activeVersions.flatMap((version) => version.readerCriteria);
  const publicResumeVersion = {
    ...config.publicResume,
    readerCriteria: activeReaderCriteria
  };
  const skillPath = path.join(root, config.methodology.installedPath);

  const portfolioChecks = [
    {
      id: "priority-and-benchmark-opportunity-coverage",
      pass: sameMembers(requiredOpportunityIds, configuredOpportunityIds),
      detail: `${configuredOpportunityIds.length}/${requiredOpportunityIds.length} required opportunity versions configured.`
    },
    {
      id: "named-reader-pair-coverage",
      pass: sameMembers(requiredPairs, configuredPairs),
      detail: `${configuredPairs.length}/${requiredPairs.length} required reader/opportunity pairs configured.`
    },
    {
      id: "candidate-evaluation-skill-installed",
      pass:
        existsSync(skillPath) &&
        /Interviewing and Evaluating Candidates/i.test(readFileSync(skillPath, "utf8")),
      detail: `${config.methodology.skill} is pinned inside the repository.`
    },
    {
      id: "fictionalized-public-context-boundary",
      pass:
        config.contract.actualPeopleParticipated === false &&
        config.contract.passDecision === "advance-to-structured-next-step" &&
        /not proof of a final hiring decision/i.test(config.methodology.principles.join(" ")),
      detail: "A modeled pass advances to a structured next step and cannot represent actual participation or a final hire."
    },
    {
      id: "active-public-resume-set-is-exact",
      pass:
        Array.isArray(config.publicResume?.activeOpportunityIds) &&
        sameMembers(config.publicResume.activeOpportunityIds, activeOpportunityIds),
      detail: `${config.publicResume?.activeOpportunityIds?.length ?? 0}/${activeOpportunityIds.length} active truthfully-hirable opportunities target the public resume.`
    },
    {
      id: "hard-screened-roles-excluded-from-public-resume",
      pass: (suite.excludedOpportunityIds ?? []).every(
        (entry) =>
          entry.disposition === "exclude-hard-screen" &&
          !config.publicResume?.activeOpportunityIds?.includes(entry.opportunityId)
      ),
      detail: "Hard-screened adjacent roles remain discoverable without entering the public resume target set."
    }
  ];

  const versions = config.versions.map((version) =>
    evaluateResumeVersion({ version, root, resumeOverrides, config })
  );
  const publicResume = evaluateResumeVersion({
    version: publicResumeVersion,
    root,
    resumeOverrides,
    config
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
    readerResults.length === requiredPairs.length &&
    passingReaders === requiredPairs.length &&
    publicResume.overall === "pass" &&
    publicResume.readerResults.length === activeReaderCriteria.length;

  return {
    schemaVersion: 1,
    evalId: config.id,
    runId: "2026-08-15-hiring-reader-resume-portfolio-universal-public",
    evaluatedAt: config.evaluatedAt,
    methodologySkill: config.methodology.skill,
    actualPeopleParticipated: false,
    acceptanceQuestion: config.contract.acceptanceQuestion,
    decision: overallPass ? config.contract.passDecision : "do-not-advance",
    overall: overallPass ? "pass" : "fail",
    summary: {
      requiredOpportunityVersions: requiredOpportunityIds.length,
      maintainedOpportunityVersions: maintainedVersions,
      passingOpportunityVersions: versions.filter((version) => version.overall === "pass").length,
      requiredReaderOpportunityPairs: requiredPairs.length,
      passingReaderOpportunityPairs: passingReaders,
      requiredPublicResumeReaderPairs: activeReaderCriteria.length,
      passingPublicResumeReaderPairs: publicResume.readerResults.filter(
        (reader) => reader.modeledVerdict === "pass"
      ).length
    },
    portfolioChecks,
    versions,
    publicResume,
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
      sha256: version.sha256,
      overall: version.overall,
      readerResults: version.readerResults.map((reader) => ({
        pairId: reader.pairId,
        readerId: reader.readerId,
        displayName: reader.displayName,
        modeledVerdict: reader.modeledVerdict,
        decision: reader.decision,
        actualPersonParticipated: reader.actualPersonParticipated,
        missingSignalGroups: reader.missingSignalGroups,
        validateNext: reader.validateNext
      }))
    })),
    publicResume: {
      artifactId: result.publicResume.artifactId,
      status: result.publicResume.status,
      activeOpportunityIds: result.publicResume.activeOpportunityIds,
      resumePath: result.publicResume.resumePath,
      wordCount: result.publicResume.wordCount,
      sha256: result.publicResume.sha256,
      overall: result.publicResume.overall,
      readerResults: result.publicResume.readerResults.map((reader) => ({
        pairId: reader.pairId,
        readerId: reader.readerId,
        displayName: reader.displayName,
        modeledVerdict: reader.modeledVerdict,
        decision: reader.decision,
        actualPersonParticipated: reader.actualPersonParticipated,
        missingSignalGroups: reader.missingSignalGroups,
        validateNext: reader.validateNext
      }))
    },
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
