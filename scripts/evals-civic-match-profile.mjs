import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(scriptDir, "..");
const hiringAcceptanceQuestion = "I would hire this person for this job.";
const helperAcceptanceQuestion = "I would actively match this candidate to a current opportunity their evidence supports.";

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function wordCount(value) {
  const words = String(value ?? "").trim().match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu);
  return words?.length ?? 0;
}

export function extractCopyBlock(guide, id) {
  const startMarker = `<!-- copy:${id}:start -->`;
  const endMarker = `<!-- copy:${id}:end -->`;
  const start = guide.indexOf(startMarker);
  const end = guide.indexOf(endMarker, start + startMarker.length);
  if (start < 0 || end < 0) return "";
  const segment = guide.slice(start + startMarker.length, end);
  return segment.match(/```(?:text)?\s*([\s\S]*?)\s*```/i)?.[1]?.trim() ?? "";
}

function readJson(root, relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

function nameForPerson(root, personId) {
  const slug = personId.replace(/^person\./, "");
  const personPath = path.join(root, `docs/knowledge-bank/people/${slug}.md`);
  if (!existsSync(personPath)) return personId;
  return matter(readFileSync(personPath, "utf8")).data.title ?? personId;
}

export function deriveExpectedCivicMatchAudience(root, config) {
  const opportunityManifest = readJson(root, config.currentOpportunityManifest);
  const hiringReaders = (opportunityManifest.opportunities ?? []).flatMap((opportunity) =>
    (opportunity.namedReaders ?? []).map((reader) => ({
      key: `hiring|${opportunity.opportunityId}|${reader.personId}|${reader.relationship}`,
      role: "hiring-reader",
      opportunityId: opportunity.opportunityId,
      opportunityPath: opportunity.opportunityPath,
      personId: reader.personId,
      name: nameForPerson(root, reader.personId),
      relationship: reader.relationship,
      acceptanceQuestion: hiringAcceptanceQuestion
    }))
  );
  const helpers = (config.civicMatchHelpers ?? []).map((helper) => ({
    key: `helper|${helper.personId}|${helper.relationship}`,
    role: "civic-match-helper",
    ...helper
  }));
  return { hiringReaders, helpers, all: [...hiringReaders, ...helpers] };
}

export function evaluateCivicMatchProfile(root = defaultRoot, { deterministicOnly = false } = {}) {
  const failures = [];
  const fail = (criterion, message) => failures.push(`${criterion}: ${message}`);
  const configPath = "evals/opportunity-intake/civic-match.json";
  if (!existsSync(path.join(root, configPath))) {
    return {
      pass: false,
      failures: [`contract: ${configPath} is missing`],
      phases: { deterministic: "fail", hiringReaders: "not-eligible" },
      metrics: {}
    };
  }

  const config = readJson(root, configPath);
  const registry = readJson(root, config.sourceRegistryPath);
  const guidePath = path.join(root, config.guidePath ?? "");
  const guide = existsSync(guidePath) ? readFileSync(guidePath, "utf8") : "";
  const opportunityManifest = readJson(root, config.currentOpportunityManifest);
  const audience = deriveExpectedCivicMatchAudience(root, config);
  const source = registry.sources?.find(({ id }) => id === config.sourceId);
  const nycSource = registry.sources?.find(({ id }) => id === "source.nyc-jobs.open-data.pda4-rgn4");

  if (config.schemaVersion !== 1 || config.observationMode !== "authenticated-read-only-field-map") {
    fail("contract", "schema or read-only observation mode changed");
  }
  if (!source || source.sourceType !== "authenticated-talent-network" || source.accessMode !== "authenticated-candidate-interface") {
    fail("source adapter", "Civic Match is not registered as an authenticated talent network");
  }
  if (!nycSource || nycSource.sourceType !== "official-bulk-dataset" ||
      JSON.stringify(source?.affordances) === JSON.stringify(nycSource?.affordances)) {
    fail("source adapter", "Civic Match and NYC Jobs must retain different affordances");
  }
  for (const affordance of [
    "candidate-profile-discovery",
    "employer-profile-discovery",
    "candidate-invitations",
    "saved-job-interest-signals",
    "application-state-tracking",
    "staff-assisted-matching",
    "live-events-and-q-and-a"
  ]) {
    if (!source?.affordances?.includes(affordance)) fail("source adapter", `missing Civic Match affordance ${affordance}`);
  }
  for (const boundary of [
    "external-employer-application-remains-required",
    "profile-visibility-requires-jamie-consent",
    "application-submission-remains-human"
  ]) {
    if (!source?.boundaries?.includes(boundary)) fail("source boundary", `missing ${boundary}`);
  }

  if (!guide) {
    fail("guide", `${config.guidePath} is missing`);
  } else if (config.guideSha256 !== sha256(guide)) {
    fail("guide lineage", "the guide digest is not in step with the field-map contract");
  }

  const steps = Array.isArray(config.steps) ? config.steps : [];
  const fieldIds = steps.flatMap(({ fieldIds = [] }) => fieldIds);
  if (steps.length !== 5 || steps.some(({ step }, index) => step !== index + 1)) {
    fail("five-step coverage", "the observed Civic Match flow must contain ordered steps 1 through 5");
  }
  if (new Set(fieldIds).size !== fieldIds.length || fieldIds.length < 37) {
    fail("field coverage", `expected at least 37 unique field identifiers; observed ${fieldIds.length}`);
  }
  for (const id of config.copyBlockIds ?? []) {
    const copy = extractCopyBlock(guide, id);
    if (!copy) fail("copy block", `${id} is missing`);
  }
  for (const id of config.privateNarrativeAnswerIds ?? []) {
    const copy = extractCopyBlock(guide, id);
    const count = wordCount(copy);
    if (!copy || count > 300) fail("word limit", `${id} has ${count} words; observed maximum is 300`);
  }
  const profileSummary = extractCopyBlock(guide, "profile-summary");
  if (wordCount(profileSummary) > 250) fail("scanability", `profile-summary has ${wordCount(profileSummary)} words`);

  for (const text of [
    "Step 1 of 5",
    "Step 2 of 5",
    "Step 3 of 5",
    "Step 4 of 5",
    "Step 5 of 5",
    "Jamie alone checks",
    "Jamie alone clicks `Submit`",
    "external employer link",
    "Show Profile"
  ]) {
    if (!guide.includes(text)) fail("guide coverage", `missing instruction: ${text}`);
  }
  if (/\/(?:Users|Volumes)\//.test(`${guide}\n${JSON.stringify(config)}`) || /docs\.google\.com\//.test(`${guide}\n${JSON.stringify(config)}`)) {
    fail("public safety", "a private local or Google Workspace locator entered the guide or contract");
  }
  if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(guide) || /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/.test(guide)) {
    fail("public safety", "a direct email address or phone number entered the repository guide");
  }
  if (/\b(?:bound|bounded|hinge)\b/i.test(guide)) {
    fail("public language", "the guide contains a discouraged public-surface word");
  }

  const resume = opportunityManifest.resume ?? {};
  if (config.resume?.uploadPath !== resume.pdfPath || config.resume?.publicProjectionPath !== resume.publicPdfPath) {
    fail("resume selection", "the Civic Match upload is not the current governed multi-opportunity resume");
  }
  for (const relativePath of [config.resume?.uploadPath, config.resume?.publicProjectionPath]) {
    if (!relativePath || !existsSync(path.join(root, relativePath))) fail("resume selection", `${relativePath || "resume path"} is missing`);
  }
  if (!/current multi-opportunity resume/i.test(guide)) {
    fail("resume selection", "the guide does not identify the governed multi-opportunity resume");
  }

  if (audience.hiringReaders.length !== 9 || audience.helpers.length !== 2 ||
      new Set(audience.all.map(({ key }) => key)).size !== audience.all.length) {
    fail("reader audience", `expected 9 hiring-reader assignments and 2 helpers; observed ${audience.hiringReaders.length} and ${audience.helpers.length}`);
  }
  const helperIds = audience.helpers.map(({ personId }) => personId).sort();
  if (JSON.stringify(helperIds) !== JSON.stringify(["person.courtney-kishbaugh", "person.josh-gee"])) {
    fail("helper audience", "the Civic Match helper set changed");
  }
  for (const participant of audience.all) {
    if (!existsSync(path.join(root, `docs/knowledge-bank/people/${participant.personId.replace(/^person\./, "")}.md`))) {
      fail("reader context", `${participant.personId} has no governed public-context record`);
    }
  }
  if (!Array.isArray(config.humanGates) || config.humanGates.length < 4 ||
      !config.humanGates.some((gate) => /Jamie.*Submit/.test(gate)) ||
      !config.humanGates.some((gate) => /fictionalized public-context/.test(gate))) {
    fail("human gates", "final submission and named-person non-endorsement controls are incomplete");
  }

  const baseMetrics = {
    stepsCovered: steps.length,
    fieldsMapped: fieldIds.length,
    privateNarrativeAnswers: config.privateNarrativeAnswerIds?.length ?? 0,
    namedHiringReaderAssignments: audience.hiringReaders.length,
    civicMatchHelperAssignments: audience.helpers.length,
    passingReaders: 0,
    readerAssessmentsEvaluated: 0
  };
  if (failures.length) {
    return {
      pass: false,
      failures,
      phases: { deterministic: "fail", hiringReaders: "not-eligible" },
      metrics: baseMetrics
    };
  }
  if (deterministicOnly) {
    return {
      pass: true,
      failures: [],
      phases: { deterministic: "pass", hiringReaders: "not-run" },
      metrics: baseMetrics
    };
  }

  const assessments = Array.isArray(config.readerAssessments) ? config.readerAssessments : [];
  const expectedKeys = audience.all.map(({ key }) => key).sort();
  const observedKeys = assessments.map(({ key }) => key).sort();
  if (new Set(observedKeys).size !== observedKeys.length || JSON.stringify(expectedKeys) !== JSON.stringify(observedKeys)) {
    fail("reader coverage", "assessments do not exactly cover the current named hiring readers and Civic Match helpers");
  }

  let passingReaders = 0;
  for (const assessment of assessments) {
    const expected = audience.all.find(({ key }) => key === assessment.key);
    const rolePass = expected?.role === "hiring-reader"
      ? assessment.acceptanceQuestion === hiringAcceptanceQuestion && assessment.wouldHire === true
      : expected?.role === "civic-match-helper"
        ? assessment.acceptanceQuestion === helperAcceptanceQuestion && assessment.wouldActivelyMatch === true
        : false;
    const assessmentPass = assessment.guideSha256 === config.guideSha256 &&
      assessment.decision === "pass" &&
      rolePass &&
      assessment.simulatedPublicFigureLens === true &&
      /not participation, quotation, endorsement, recommendation, or (?:a )?hiring decision/i.test(assessment.nonEndorsementBoundary ?? "") &&
      assessment?.access?.scope === "guide-current-public-resume-and-public-opportunity-context-only" &&
      assessment?.access?.repositoryAccess === false &&
      assessment?.access?.privateSourceAccess === false &&
      Array.isArray(assessment.strengths) && assessment.strengths.length >= 2 &&
      Array.isArray(assessment.risks) && assessment.risks.length >= 1 &&
      Array.isArray(assessment.followUpEvidence) && assessment.followUpEvidence.length >= 1;
    if (/\b(?:bound|bounded|hinge)\b/i.test(JSON.stringify(assessment))) {
      fail("public language", `${assessment.key} contains a discouraged public-surface word`);
    }
    if (assessmentPass) passingReaders += 1;
    else fail("reader acceptance", `${assessment.name ?? assessment.key ?? "unknown reader"} is not an exact-guide pass`);
  }

  return {
    pass: failures.length === 0,
    failures,
    phases: { deterministic: "pass", hiringReaders: failures.length ? "fail" : "pass" },
    metrics: {
      ...baseMetrics,
      passingReaders,
      readerAssessmentsEvaluated: assessments.length
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const rootIndex = process.argv.indexOf("--root");
  const root = rootIndex >= 0 && process.argv[rootIndex + 1] ? path.resolve(process.argv[rootIndex + 1]) : defaultRoot;
  const result = evaluateCivicMatchProfile(root, { deterministicOnly: process.argv.includes("--deterministic-only") });
  process.stdout.write(`${JSON.stringify(result)}\n`);
  if (!result.pass) process.exitCode = 1;
}
