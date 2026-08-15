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

function sectionText(markdown, heading) {
  return markdown.split(new RegExp(`^## ${heading}[^\\n]*$`, "im"))[1]?.split(/^## /m)[0]?.trim() ?? "";
}

function experienceBullets(markdown) {
  return [...sectionText(markdown, "Professional Experience").matchAll(/^- (.+)$/gm)].map(
    (match) => match[1]
  );
}

function evidenceBearingBulletRatio(markdown) {
  const bullets = experienceBullets(markdown);
  if (bullets.length === 0) return 0;
  const actionVerb = /^(?:Built|Co-built|Co-developed|Co-founded|Co-led|Contributed|Coordinate|Coordinated|Created|Facilitate|Help|Helped|Implement|Implemented|Lead|Led|Reached|Separate|Translate|Use|Work)\b/i;
  const contextOrMeasure = /(?:\$?\d[\d,.]*(?:\+|x|%|\s*sq\.\s*ft\.)?|\b(?:across|by|connecting|contributing|covered|from|into|through|translating|while|with|without)\b)/i;
  const evidenceBearing = bullets.filter(
    (bullet) => actionVerb.test(bullet) && contextOrMeasure.test(bullet)
  ).length;
  return evidenceBearing / bullets.length;
}

function countExperienceSignalGroups(version, experience) {
  return version.readerCriteria
    .flatMap((reader) => reader.signalGroups)
    .filter((group) => containsAny(experience, group.patterns)).length;
}

function frontmatterValue(markdown, key) {
  return markdown.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.trim() ?? null;
}

function getMarkdown(relativePath, root, overrides) {
  if (Object.prototype.hasOwnProperty.call(overrides, relativePath)) {
    return overrides[relativePath];
  }
  const absolutePath = path.join(root, relativePath);
  return existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : null;
}

function evaluatePublicResume({ root, config, resumeOverrides }) {
  const publicConfig = config.publicResume;
  if (!publicConfig) return null;

  const markdown = getMarkdown(publicConfig.resumePath, root, resumeOverrides);
  const plainText = markdown ? normalizeText(markdown) : "";
  const artifactSpecPath = path.join(root, publicConfig.artifactSpecPath);
  const artifactSpec = existsSync(artifactSpecPath)
    ? JSON.parse(readFileSync(artifactSpecPath, "utf8"))
    : null;
  const evaluatedDate = config.evaluatedAt.slice(0, 10);
  const artifactChecks = [
    {
      id: "public-resume-file-exists",
      pass: markdown !== null,
      detail: publicConfig.resumePath
    },
    {
      id: "public-pdf-source-binding",
      pass:
        markdown !== null &&
        artifactSpec?.sourceMarkdownPath === publicConfig.resumePath &&
        artifactSpec?.sourceMarkdownSha256 === sha256(markdown),
      detail: publicConfig.artifactSpecPath
    },
    {
      id: "fictionalized-next-step-boundary",
      pass:
        config.contract.actualPeopleParticipated === false &&
        config.contract.passDecision === "advance-to-structured-next-step",
      detail: "The modeled screen cannot claim participation, endorsement, or a final hiring outcome."
    }
  ];

  const readers = publicConfig.readerCriteria.map((reader) => {
    const opportunityPath = path.join(root, reader.opportunityPath);
    const opportunity = existsSync(opportunityPath)
      ? readFileSync(opportunityPath, "utf8")
      : "";
    const opportunityStatus = frontmatterValue(opportunity, "opportunity_status");
    const reviewBy = frontmatterValue(opportunity, "review_by");
    const opportunityId = frontmatterValue(opportunity, "id");
    const readerProfilePath = path.join(root, reader.readerPath);
    const profile = existsSync(readerProfilePath)
      ? readFileSync(readerProfilePath, "utf8")
      : "";
    const profileBound =
      profile.includes(`id: ${reader.readerId}`) &&
      profile.includes(`displayName: ${reader.displayName}`) &&
      /publicSources:/i.test(profile) &&
      /not actual participation/i.test(profile);
    const statusPass =
      opportunityId === reader.opportunityId &&
      opportunityStatus === publicConfig.statusPolicy.requiredOpportunityStatus;
    const hardScreenPass = !/^\s*disposition:\s*do-not-pursue\s*$/im.test(opportunity);
    const freshnessPass =
      !publicConfig.statusPolicy.requireFreshReview ||
      (reviewBy !== null && reviewBy >= evaluatedDate);
    const signalResults = reader.signalGroups.map((group) => ({
      id: group.id,
      pass: containsAny(plainText, group.patterns)
    }));
    const modeledPass =
      markdown !== null &&
      profileBound &&
      statusPass &&
      hardScreenPass &&
      freshnessPass &&
      signalResults.every((signal) => signal.pass);

    return {
      gateId: reader.gateId,
      readerId: reader.readerId,
      displayName: reader.displayName,
      opportunityId: reader.opportunityId,
      opportunityStatus,
      reviewBy,
      profileBound,
      statusPass,
      hardScreenPass,
      freshnessPass,
      modeledVerdict: modeledPass ? "pass" : "fail",
      decision: modeledPass ? config.contract.passDecision : "do-not-advance",
      actualPersonParticipated: false,
      matchedSignalGroups: signalResults.filter((signal) => signal.pass).map((signal) => signal.id),
      missingSignalGroups: signalResults.filter((signal) => !signal.pass).map((signal) => signal.id),
      constructiveCritique: reader.constructiveCritique,
      validateNext: reader.validateNext
    };
  });
  const activeGateIds = readers.map((reader) => reader.gateId).sort();
  const overallPass =
    artifactChecks.every((check) => check.pass) &&
    readers.length > 0 &&
    readers.every((reader) => reader.modeledVerdict === "pass");

  return {
    resumePath: publicConfig.resumePath,
    sha256: markdown ? sha256(markdown) : null,
    scope: publicConfig.scope,
    activeGateIds,
    activeOpportunityIds: [...new Set(readers.map((reader) => reader.opportunityId))].sort(),
    artifactChecks,
    readerResults: readers,
    actualPeopleParticipated: false,
    decision: overallPass ? config.contract.passDecision : "do-not-advance",
    overall: overallPass ? "pass" : "fail",
    boundary: "This single public resume is tested against current modeled reader contexts only. Closed roles are excluded, and a pass is not an employer endorsement or final hiring decision."
  };
}

export function evaluateHiringReaderPortfolio({
  root = repoRoot,
  config = defaultConfig,
  readerSuite = defaultReaderSuite,
  skillsLock = defaultSkillsLock,
  resumeOverrides = {},
  skillTextOverride,
  resumeSkillTextOverride
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
  const resumeReviewMethod = config.methodology.resumeReviewSkill;
  const resumeReviewSkillPath = path.join(root, resumeReviewMethod.installedPath);
  const resumeReviewSkill = resumeSkillTextOverride ?? (
    existsSync(resumeReviewSkillPath) ? readFileSync(resumeReviewSkillPath, "utf8") : null
  );
  const resumeReviewSkillLock = skillsLock.skills?.[resumeReviewMethod.name];

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
      id: "resume-review-skill-pinned",
      pass:
        resumeReviewSkill !== null &&
        sha256(resumeReviewSkill) === resumeReviewMethod.skillFileSha256 &&
        resumeReviewSkillLock?.source === "phuryn/pm-skills" &&
        resumeReviewSkillLock?.sourceType === "github",
      detail: `${resumeReviewMethod.name} is repository-pinned with marketplace provenance and an exact SKILL.md digest.`
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
    const summaryText = markdown ? sectionText(markdown, "Professional Summary") : "";
    const summaryWords = wordsIn(summaryText);
    const experienceText = markdown ? sectionText(markdown, "Professional Experience") : "";
    const experienceSignalGroups = countExperienceSignalGroups(version, experienceText);
    const evidenceRatio = markdown ? evidenceBearingBulletRatio(markdown) : 0;
    const roleHeadings = markdown ? [...experienceText.matchAll(/^### .+$/gm)] : [];
    const datedRoleLines = markdown
      ? [...experienceText.matchAll(/^[^\n]*\|\s*(?:[A-Za-z]{3,9}\s+)?\d{4}(?:[–-](?:Present|\d{4}))?\s*$/gm)]
      : [];
    const headingPositions = {
      summary: markdown?.search(/^## Professional Summary\s*$/im) ?? -1,
      experience: markdown?.search(/^## Professional Experience\s*$/im) ?? -1,
      education: markdown?.search(/^## Education(?:\s|\s*&)/im) ?? -1
    };
    const productBusinessSignals = [
      "adoption",
      "analytics",
      "implementation",
      "operations",
      "prioritization",
      "release",
      "requirements",
      "research",
      "risk",
      "roadmap",
      "stakeholder",
      "users"
    ].filter((signal) => experienceText.toLowerCase().includes(signal));
    const targetFunctionTokens = version.targetRole
      .toLowerCase()
      .split(/[^a-z]+/)
      .filter(
        (token) =>
          token.length >= 7 &&
          !["manager", "national", "senior"].includes(token)
      );

    const reviewResumeChecks = [
      {
        id: "professional-summary",
        pass:
          summaryWords.length >= 30 &&
          summaryWords.length <= 100 &&
          !config.resumeStandards.genericSummaryPatterns.some((pattern) =>
            summaryText.toLowerCase().includes(pattern.toLowerCase())
          ),
        detail: `${summaryWords.length}-word specific summary without configured generic phrases.`
      },
      {
        id: "pronoun-free-voice",
        pass: markdown !== null && !/\b(?:I|me|my|mine|we|our|ours|he|his|she|her|hers)\b/i.test(plainText),
        detail: "No first- or third-person pronouns in resume prose."
      },
      {
        id: "concise-role-history",
        pass:
          words.length >= config.resumeStandards.minimumWords &&
          words.length <= config.resumeStandards.maximumWords &&
          maximumBullets > 0 &&
          maximumBullets <= config.resumeStandards.maximumBulletsPerRole,
        detail: `${words.length} words; no role exceeds ${maximumBullets} bullets.`
      },
      {
        id: "xyzs-evidence-proxy",
        pass: evidenceRatio >= config.resumeStandards.minimumEvidenceBearingBulletRatio,
        detail: `${Math.round(evidenceRatio * 100)}% of experience bullets pair an action with a measure or specific context; required ${Math.round(config.resumeStandards.minimumEvidenceBearingBulletRatio * 100)}%.`
      },
      {
        id: "professional-email",
        pass: /jamie\.burkart@gmail\.com/i.test(markdown ?? ""),
        detail: "Professional name-based email is present."
      },
      {
        id: "job-specific-tailoring",
        pass:
          firstThird.toLowerCase().includes(version.targetRole.toLowerCase()) &&
          experienceSignalGroups >= config.resumeStandards.minimumExperienceSignalGroups,
        detail: `Exact target is prominent; ${experienceSignalGroups} reader signal groups appear in experience evidence.`
      },
      {
        id: "product-and-business-skills-in-evidence",
        pass: productBusinessSignals.length >= 3,
        detail: `${productBusinessSignals.length} product/business signals appear in experience bullets: ${productBusinessSignals.join(", ")}.`
      },
      {
        id: "section-order",
        pass:
          headingPositions.summary >= 0 &&
          headingPositions.experience > headingPositions.summary &&
          headingPositions.education > headingPositions.experience,
        detail: "Contact information precedes summary; experience precedes education."
      },
      {
        id: "career-transition-framing",
        pass:
          /14\+ years/i.test(summaryText) &&
          targetFunctionTokens.some((token) => summaryText.toLowerCase().includes(token)),
        detail: "Mid-career experience and target-function continuity are explicit in the summary."
      },
      {
        id: "clear-role-language",
        pass:
          roleHeadings.length > 0 &&
          roleHeadings.length === datedRoleLines.length &&
          !/\b(?:ninja|guru|rockstar|wizard)\b/i.test(experienceText),
        detail: `${roleHeadings.length}/${datedRoleLines.length} roles have dated entries and no novelty-title language.`
      }
    ];

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

    const reviewResumePass = reviewResumeChecks.every((check) => check.pass);
    const artifactPass = artifactChecks.every((check) => check.pass) && reviewResumePass;
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
      reviewResumeSkill: resumeReviewMethod.name,
      reviewResumeCriteriaPassed: reviewResumeChecks.filter((check) => check.pass).length,
      reviewResumeCriteriaRequired: reviewResumeChecks.length,
      overall:
        artifactPass && readerResults.every((reader) => reader.modeledVerdict === "pass")
          ? "pass"
          : "fail",
      artifactChecks,
      reviewResumeChecks,
      readerResults
    };
  });

  const readerResults = versions.flatMap((version) => version.readerResults);
  const maintainedVersions = versions.filter((version) =>
    version.artifactChecks.find((check) => check.id === "resume-file-exists")?.pass
  ).length;
  const passingReaders = readerResults.filter((reader) => reader.modeledVerdict === "pass").length;
  const publicResume = evaluatePublicResume({ root, config, resumeOverrides });
  const overallPass =
    portfolioChecks.every((check) => check.pass) &&
    versions.length === requiredOpportunityIds.length &&
    versions.every((version) => version.overall === "pass") &&
    readerResults.length === requiredGateIds.length &&
    passingReaders === requiredGateIds.length &&
    publicResume?.overall === "pass";

  return {
    schemaVersion: 1,
    evalId: config.id,
    runId: "2026-08-15-public-active-opportunity-resume-post-hillclimb",
    evaluatedAt: config.evaluatedAt,
    methodologySkills: [config.methodology.primarySkill, resumeReviewMethod.name],
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
    methodologySkills: result.methodologySkills,
    actualPeopleParticipated: result.actualPeopleParticipated,
    acceptanceQuestion: result.acceptanceQuestion,
    decision: result.decision,
    overall: result.overall,
    summary: result.summary,
    portfolioChecks: result.portfolioChecks,
    publicResume: result.publicResume,
    versions: result.versions.map((version) => ({
      opportunityId: version.opportunityId,
      status: version.status,
      resumePath: version.resumePath,
      wordCount: version.wordCount,
      numericSignalCount: version.numericSignalCount,
      sha256: version.sha256,
      reviewResumeSkill: version.reviewResumeSkill,
      reviewResumeCriteriaPassed: version.reviewResumeCriteriaPassed,
      reviewResumeCriteriaRequired: version.reviewResumeCriteriaRequired,
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
