import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(scriptDir, "..");
const manifestRelativePath = "evals/resume-hiring-readers/current.json";
const reviewedSkillCommit = "18468a95b427e70e258b51389796367c6f684e7d";
const reviewedSkillDigest = "cec1de0916b608a559844c5f39a3b18e65f88d6694d3bb9c1ff04bde9e062c2f";

function nonEmptyStrings(value, minimum = 1) {
  return Array.isArray(value) && value.length >= minimum && value.every(
    (item) => typeof item === "string" && item.trim()
  );
}

function digest(content) {
  return createHash("sha256").update(content).digest("hex");
}

function frontMatterValue(content, key) {
  return content.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.trim();
}

function wordCount(content) {
  return content.trim().split(/\s+/).length;
}

function summaryWordCount(content) {
  const match = content.match(/## Professional Summary\s+([\s\S]*?)(?=\n## )/);
  return match ? wordCount(match[1]) : 0;
}

function normalizedReaderKey(reader) {
  return [reader?.personId, reader?.relationship].join("|");
}

export function evaluateResumeHiringReaders(root = defaultRoot) {
  const failures = [];
  const fail = (criterion, message) => failures.push({ criterion, message });
  const manifestPath = path.join(root, manifestRelativePath);
  const registryPath = path.join(root, "evals/hiring-readers/current.json");

  if (!existsSync(manifestPath) || !existsSync(registryPath)) {
    return {
      passed: false,
      failures: [{ criterion: "coverage", message: "Missing resume or hiring-reader registry." }],
      metrics: { opportunities: 0, resumes: 0, namedReaders: 0, passingReaderAssessments: 0 }
    };
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const registry = JSON.parse(readFileSync(registryPath, "utf8"));
  const entries = Array.isArray(manifest.opportunities) ? manifest.opportunities : [];
  const registryEvaluations = Array.isArray(registry.evaluations) ? registry.evaluations : [];
  const expectedByOpportunity = new Map();

  for (const evaluation of registryEvaluations) {
    const list = expectedByOpportunity.get(evaluation.opportunityId) ?? [];
    list.push({
      personId: evaluation?.reader?.personId,
      name: evaluation?.reader?.name,
      relationship: evaluation?.reader?.relationship
    });
    expectedByOpportunity.set(evaluation.opportunityId, list);
  }

  if (manifest.schemaVersion !== 1 ||
      manifest.sourceHiringReaderRegistry !== "evals/hiring-readers/current.json" ||
      manifest.acceptanceQuestion !== "I would advance this candidate to an interview for this job based on this resume." ||
      manifest.passPolicy !== "unanimous-named-readers-per-opportunity") {
    fail("contract", "Resume hiring-reader schema, source registry, question, or unanimous policy changed.");
  }

  const skill = manifest?.skillContract?.primarySkill;
  if (skill?.id !== "review-resume" ||
      skill?.package !== "phuryn/pm-skills@review-resume" ||
      skill?.repository !== "https://github.com/phuryn/pm-skills" ||
      skill?.upstreamCommit !== reviewedSkillCommit ||
      skill?.skillSha256 !== reviewedSkillDigest ||
      !nonEmptyStrings(skill?.practicesApplied, 10) ||
      !nonEmptyStrings(manifest?.skillContract?.localOverrides, 5) ||
      !manifest?.skillContract?.complementaryInstalledSkills?.includes("hiring") ||
      !manifest?.skillContract?.complementaryInstalledSkills?.includes("job-application-optimizer") ||
      !manifest?.skillContract?.complementaryInstalledSkills?.includes("tailored-resume-generator")) {
    fail("skill-contract", "The pinned review-resume skill or its truth-preserving local overrides are incomplete.");
  }

  const expectedOpportunityIds = [...expectedByOpportunity.keys()].sort();
  const observedOpportunityIds = entries.map((entry) => entry.opportunityId).sort();
  if (JSON.stringify(expectedOpportunityIds) !== JSON.stringify(observedOpportunityIds)) {
    fail("coverage", "Every opportunity in the named hiring-reader registry must have exactly one resume entry.");
  }

  const observedDigests = [];
  let passingReaderAssessments = 0;
  let observedReaderAssessments = 0;

  for (const entry of entries) {
    const label = entry.jobTitle || entry.opportunityId || "unknown opportunity";
    const opportunityPath = path.join(root, entry.opportunityPath ?? "");
    if (!entry.opportunityPath || !existsSync(opportunityPath)) {
      fail("opportunity-binding", `${label}: governed opportunity file is missing.`);
      continue;
    }

    const opportunity = readFileSync(opportunityPath, "utf8");
    if (frontMatterValue(opportunity, "id") !== entry.opportunityId ||
        !["live", "closed"].includes(frontMatterValue(opportunity, "opportunity_status"))) {
      fail("opportunity-binding", `${label}: resume must bind to the exact live or closed governed opportunity ID.`);
    }

    if (!/^resume-versions\/\d{4}-\d{2}-\d{2}\/[a-z0-9-]+\/Jamie-Burkart-Resume\.md$/.test(entry.resumePath ?? "")) {
      fail("versioned-path", `${label}: resume path is not date and job specific.`);
      continue;
    }

    const resumePath = path.join(root, entry.resumePath);
    if (!existsSync(resumePath)) {
      fail("coverage", `${label}: tailored resume is missing.`);
      continue;
    }

    const resume = readFileSync(resumePath, "utf8");
    const resumeDigest = digest(resume);
    observedDigests.push(resumeDigest);
    if (entry.resumeSha256 !== resumeDigest) {
      fail("exact-resume", `${label}: stored resume digest is stale.`);
    }

    const words = wordCount(resume);
    const summaryWords = summaryWordCount(resume);
    const sectionOrder = [
      resume.indexOf("## Professional Summary"),
      resume.indexOf("## Professional Experience"),
      resume.indexOf("## Education & Professional Development"),
      resume.indexOf("## Core Skills")
    ];
    const hasOrderedSections = sectionOrder.every((index) => index >= 0) &&
      sectionOrder.every((index, position) => position === 0 || index > sectionOrder[position - 1]);
    const numericBullets = resume.split("\n").filter(
      (line) => /^- /.test(line) && /(?:\$|\b\d+[+x%]?\b)/i.test(line)
    ).length;
    const experienceBody = resume.match(
      /## Professional Experience\s+([\s\S]*?)(?=\n## )/
    )?.[1] ?? "";
    const overstuffedRoles = experienceBody
      .split(/\n### /)
      .filter(Boolean)
      .filter((section) => section.split("\n").filter((line) => /^- /.test(line)).length > 5);
    const forbiddenPronouns = /\b(?:I|me|my|mine|we|our|ours|he|she|his|hers)\b/i.test(resume);

    if (!resume.startsWith("# Jamie Burkart") ||
        !resume.includes(`## Target Role: ${entry.targetRole}`) ||
        !hasOrderedSections ||
        words < 450 || words > 850 ||
        summaryWords < 25 || summaryWords > 90 ||
        /^\s*\|.+\|\s*$/m.test(resume) ||
        /!\[[^\]]*\]\(/.test(resume) ||
        forbiddenPronouns ||
        !/jamie\.burkart@gmail\.com/i.test(resume)) {
      fail("resume-review-structure", `${label}: resume fails the installed review skill's ATS, summary, concision, pronoun, or contact contract (${words} words; ${summaryWords} summary words).`);
    }

    if (typeof entry.targetRole !== "string" ||
        !entry.targetRole.trim() ||
        !resume.includes(`## Target Role: ${entry.targetRole}`)) {
      fail("target-role", `${label}: target-role headline is generic or does not match the governed application role.`);
    }

    if (numericBullets < 4) {
      fail("evidence-density", `${label}: fewer than four bullets contain governed quantitative context.`);
    }
    if (overstuffedRoles.length) {
      fail("role-bullets", `${label}: a job entry exceeds the installed resume-review skill's five-bullet scannability limit.`);
    }

    const terms = Array.isArray(entry.requiredTerms) ? entry.requiredTerms : [];
    const lower = resume.toLowerCase();
    const missingTerms = terms.filter((term) => !lower.includes(term.toLowerCase()));
    const earlyResume = resume.slice(0, Math.ceil(resume.length * 0.4)).toLowerCase();
    const earlyTerms = terms.filter((term) => earlyResume.includes(term.toLowerCase()));
    if (terms.length < 6 || missingTerms.length || earlyTerms.length < Math.ceil(terms.length / 2)) {
      fail("job-tailoring", `${label}: required job language is missing or appears too late: ${missingTerms.join(", ") || "insufficient early coverage"}.`);
    }

    const actualTitles = [
      "### THICK ARTS - Founder, Technical Project Manager & Web Systems Lead",
      "### NYC Artist Coalition / Fair Rent NYC - Co-Founder, Civic Systems, Coalition Operations & Policy Communications Lead",
      "### WOWList.org - Co-Founder, Product & Community Systems",
      "### 196 Artists Residency / Sunday Dinner - Founder & Systems Steward",
      "### KC Town Hall LLC - Co-Founder & Project Manager, Historic Restoration / Mixed-Use Development"
    ];
    const unsupportedClaims = [
      /(?:certified|certification|fully compliant).{0,30}(?:WCAG|Section 508)/i,
      /(?:WCAG|Section 508).{0,30}(?:certified|certification|fully compliant)/i,
      /formal user research program/i,
      /government product owner/i,
      /\b(?:solely|single-handedly|without help)\b/i,
      /caused (?:the )?law/i,
      /\/(?:Users|Volumes)\//
    ];
    if (!actualTitles.every((title) => resume.includes(title)) ||
        unsupportedClaims.some((pattern) => pattern.test(resume))) {
      fail("truth-boundaries", `${label}: actual titles changed or an unsupported authority, compliance, authorship, causation, or private locator claim appeared.`);
    }

    if (!nonEmptyStrings(entry.mustHaveEvidence, 4) ||
        !nonEmptyStrings(entry.biasChecks, 2) ||
        typeof entry.hiringGoal !== "string" || !entry.hiringGoal.trim()) {
      fail("hiring-bar", `${label}: hiring goal, evidence bar, and bias check are required.`);
    }

    const expectedReaders = expectedByOpportunity.get(entry.opportunityId) ?? [];
    const assessments = Array.isArray(entry.readerAssessments) ? entry.readerAssessments : [];
    const expectedReaderKeys = expectedReaders.map(normalizedReaderKey).sort();
    const assessmentKeys = assessments.map(normalizedReaderKey).sort();
    if (JSON.stringify(expectedReaderKeys) !== JSON.stringify(assessmentKeys)) {
      fail("reader-coverage", `${label}: named reader assessments do not match the governed reader registry.`);
    }

    for (const assessment of assessments) {
      observedReaderAssessments += 1;
      const expected = expectedReaders.find(
        (reader) => normalizedReaderKey(reader) === normalizedReaderKey(assessment)
      );
      const passes = assessment.name === expected?.name &&
        assessment.resumeSha256 === resumeDigest &&
        assessment.skillId === "review-resume" &&
        assessment.simulatedPublicFigureLens === true &&
        /not participation, quotation, endorsement, or a hiring decision/i.test(assessment.nonEndorsementBoundary ?? "") &&
        assessment?.access?.scope === "application-resume-and-public-job-context-only" &&
        assessment?.access?.repositoryAccess === false &&
        assessment?.access?.privateSourceAccess === false &&
        assessment.decision === "pass" &&
        assessment.wouldAdvanceToInterview === true &&
        nonEmptyStrings(assessment.strengths, 2) &&
        nonEmptyStrings(assessment.risks) &&
        nonEmptyStrings(assessment.interviewEvidenceNeeded);
      if (!passes) {
        fail("reader-acceptance", `${label}: ${assessment.name || assessment.personId} is not exact-resume-bound, disclosed, evidence-bearing, and passing.`);
      } else {
        passingReaderAssessments += 1;
      }
    }
  }

  if (new Set(observedDigests).size !== observedDigests.length) {
    fail("distinct-tailoring", "Two opportunities share the same resume digest; copied generic resumes fail closed.");
  }

  if (!nonEmptyStrings(manifest.humanReviewGates, 3) ||
      JSON.stringify(manifest).match(/\/(?:Users|Volumes)\//)) {
    fail("public-safety", "Human approval gates are incomplete or the public eval exposes a private local path.");
  }

  return {
    passed: failures.length === 0,
    failures,
    metrics: {
      opportunities: expectedOpportunityIds.length,
      resumes: entries.length,
      namedReaders: registryEvaluations.length,
      readerAssessments: observedReaderAssessments,
      passingReaderAssessments
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const rootIndex = process.argv.indexOf("--root");
  const root = rootIndex >= 0 && process.argv[rootIndex + 1]
    ? path.resolve(process.argv[rootIndex + 1])
    : defaultRoot;
  const result = evaluateResumeHiringReaders(root);
  process.stdout.write(`${JSON.stringify(result)}\n`);
  if (!result.passed) process.exitCode = 1;
}
