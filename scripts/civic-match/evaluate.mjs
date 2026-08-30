#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const moduleRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function wordCount(value) {
  const normalized = String(value ?? "").trim();
  return normalized ? normalized.split(/\s+/u).length : 0;
}

export function extractCopyBlock(markdown, id) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  const fence = "```";
  const match = markdown.match(
    new RegExp(`<!-- copy:${escaped}:start -->\\s*${fence}text\\s*([\\s\\S]*?)\\s*${fence}\\s*<!-- copy:${escaped}:end -->`, "u")
  );
  return match?.[1]?.trim() ?? "";
}

export function deriveExpectedAudience(repoRoot, config) {
  const selection = readJson(repoRoot, config.selectionConfigPath);
  const portfolio = readJson(repoRoot, config.hiringReaderConfigPath);
  const activePairs = new Set(selection.expectedCurrentSelection.readerPairIds);
  const criteria = portfolio.versions
    .flatMap((opportunity) => opportunity.readerCriteria ?? [])
    .filter((reader) => activePairs.has(reader.pairId));

  const hiringReaders = criteria.map((reader) => ({
    ...reader,
    personId: reader.readerId.replace(/^reader\./u, "person."),
    kind: "hiring-reader",
    acceptanceQuestion: "I want to hire this person for this current opportunity and advance them through the employer's formal process."
  }));

  return {
    hiringReaders,
    helpers: config.civicMatchHelpers.map((helper) => ({ ...helper, kind: "civic-match-helper" }))
  };
}

function personPath(personId) {
  return `docs/knowledge-bank/people/${personId.replace(/^person\./u, "")}.md`;
}

export function evaluateCivicMatch(repoRoot = moduleRoot, options = {}) {
  const config = readJson(repoRoot, "evals/opportunity-intake/civic-match.json");
  const registry = readJson(repoRoot, config.sourceRegistryPath);
  const selection = readJson(repoRoot, config.selectionConfigPath);
  const guidePath = path.join(repoRoot, config.guidePath);
  const guide = readFileSync(guidePath, "utf8");
  const audience = deriveExpectedAudience(repoRoot, config);
  const failures = [];
  const requireGate = (condition, message) => {
    if (!condition) failures.push(message);
  };

  const fields = config.steps.flatMap((step) => step.fieldIds);
  const uniqueFields = new Set(fields);
  const civic = registry.sources.find((source) => source.id === config.sourceId);
  const nyc = registry.sources.find((source) => source.id === "source.nyc-open-data.jobs.pda4-rgn4");

  requireGate(config.steps.length === 5, "The authenticated Civic Match flow must retain all five steps.");
  requireGate(config.steps.every((step, index) => step.step === index + 1), "Civic Match steps must be ordered 1 through 5.");
  requireGate(fields.length === uniqueFields.size && uniqueFields.size >= 36, "The field map must retain at least 36 unique observed fields.");
  requireGate(Boolean(civic) && civic.sourceType === "authenticated-talent-network", "Civic Match must be modeled as an authenticated talent network.");
  requireGate(Boolean(nyc) && nyc.sourceType === "official-bulk-dataset", "NYC Jobs must remain a distinct official bulk dataset.");
  requireGate(civic?.affordances?.includes("candidate-profile-discovery"), "Civic Match profile discovery affordance is missing.");
  requireGate(civic?.affordances?.includes("candidate-invitations"), "Civic Match invitation affordance is missing.");
  requireGate(civic?.affordances?.includes("staff-assisted-matching"), "Civic Match staff-assisted matching affordance is missing.");
  requireGate(civic?.boundaries?.includes("external-employer-application-remains-required"), "External employer applications must remain required.");
  requireGate(JSON.stringify(civic?.affordances) !== JSON.stringify(nyc?.affordances), "Opportunity source affordances must not collapse into one generic model.");
  requireGate(sha256(guide) === config.guideSha256, "The signup guide changed without refreshing its evaluated fingerprint.");

  for (const id of config.copyBlockIds) {
    requireGate(extractCopyBlock(guide, id).length > 0, `Copy block ${id} is missing.`);
  }
  for (const id of config.narrativeAnswerIds) {
    requireGate(wordCount(extractCopyBlock(guide, id)) <= 300, `${id} exceeds the observed 300-word limit.`);
  }
  requireGate(wordCount(extractCopyBlock(guide, "profile-summary")) <= 250, "The profile summary exceeds 250 words.");
  requireGate(!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/iu.test(guide), "The repo guide must not retain a direct email address.");
  requireGate(!/\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/u.test(guide), "The repo guide must not retain a direct phone number.");
  requireGate(!/\b(?:bound|bounded|hinge)\b/iu.test(guide), "The public-safe guide contains discouraged wording.");
  requireGate(!/\/(?:Users|Volumes|private|tmp)\//u.test(guide), "The guide exposes a local filesystem path.");
  requireGate(/Jamie alone clicks `Submit`/u.test(guide), "The guide must reserve final submission for Jamie.");
  requireGate(/employer's official process/u.test(guide), "The guide must distinguish matching from an employer application.");

  requireGate(config.resume.markdownPath === selection.currentPublicArtifact.markdownPath, "The guide's Markdown resume is not the lifecycle-selected public artifact.");
  requireGate(config.resume.uploadPath === selection.currentPublicArtifact.pdfPath, "The guide's upload resume is not the lifecycle-selected public artifact.");
  requireGate(config.resume.publicProjectionPath === selection.currentPublicArtifact.publicInstallPath, "The guide's public resume projection is out of step.");
  requireGate(audience.hiringReaders.length === 2, "The current selected application must produce exactly two named hiring-reader lenses.");
  requireGate(audience.helpers.length === 2, "The Civic Match source must produce exactly two named helper lenses.");
  for (const member of [...audience.hiringReaders, ...audience.helpers]) {
    requireGate(existsSync(path.join(repoRoot, personPath(member.personId))), `Missing public-source person record for ${member.personId}.`);
  }
  requireGate(config.humanGates.length >= 4, "Civic Match must retain protected-answer, visibility, final-submit, and fictionalized-lens human gates.");

  const metrics = {
    stepsCovered: config.steps.length,
    fieldsMapped: uniqueFields.size,
    hiringReaders: audience.hiringReaders.length,
    civicMatchHelpers: audience.helpers.length,
    governmentImpactWords: wordCount(extractCopyBlock(guide, "government-impact")),
    communityInitiativeWords: wordCount(extractCopyBlock(guide, "community-initiative")),
    profileSummaryWords: wordCount(extractCopyBlock(guide, "profile-summary"))
  };

  if (!options.deterministicOnly && failures.length === 0) {
    const runPath = path.join(repoRoot, config.currentRunPath);
    requireGate(existsSync(runPath), "The named-reader run is missing; deterministic success alone cannot pass the full eval.");
    if (existsSync(runPath)) {
      const run = readJson(repoRoot, config.currentRunPath);
      const expected = [...audience.hiringReaders, ...audience.helpers];
      requireGate(run.guideSha256 === config.guideSha256, "The named-reader run targets a different guide fingerprint.");
      requireGate(run.resumeSha256 === sha256(readFileSync(path.join(repoRoot, config.resume.markdownPath), "utf8")), "The named-reader run targets a different resume fingerprint.");
      requireGate(run.selectionConfigSha256 === sha256(readFileSync(path.join(repoRoot, config.selectionConfigPath), "utf8")), "The named-reader run targets a different lifecycle-selection fingerprint.");
      requireGate(run.hiringReaderConfigSha256 === sha256(readFileSync(path.join(repoRoot, config.hiringReaderConfigPath), "utf8")), "The named-reader run targets a different hiring-reader configuration fingerprint.");
      requireGate(run.publicOnly === true && run.actualPeopleParticipated === false, "The reader run must remain public-only and explicitly fictionalized.");
      requireGate(run.assessments?.length === expected.length, "The reader run must contain exactly the current four named lenses.");
      for (const member of expected) {
        const assessment = run.assessments?.find((entry) => entry.personId === member.personId && entry.kind === member.kind);
        requireGate(Boolean(assessment), `Missing named-reader assessment for ${member.personId}.`);
        if (assessment) {
          requireGate(assessment.acceptanceQuestion === member.acceptanceQuestion, `${member.personId} was judged against the wrong acceptance question.`);
          requireGate(assessment.pass === true, `${member.personId} did not pass the acceptance gate.`);
          requireGate((assessment.strengths?.length ?? 0) >= 2, `${member.personId} assessment needs at least two specific strengths.`);
          requireGate((assessment.risks?.length ?? 0) >= 1, `${member.personId} assessment needs at least one constructive risk.`);
          requireGate((assessment.followUp?.length ?? 0) >= 1, `${member.personId} assessment needs at least one follow-up.`);
          requireGate(/^[a-f0-9]{64}$/u.test(assessment.packetSha256 ?? ""), `${member.personId} assessment is missing its exact packet fingerprint.`);
        }
      }
    }
  }

  return {
    pass: failures.length === 0,
    failures,
    metrics,
    phases: {
      deterministic: failures.length === 0 || !failures.some((failure) => !failure.startsWith("The named-reader run")) ? "pass" : "fail",
      readers: options.deterministicOnly ? "not-run" : failures.some((failure) => /named-reader|assessment|acceptance gate/u.test(failure)) ? "fail" : "pass"
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const deterministicOnly = process.argv.includes("--deterministic-only");
  const result = evaluateCivicMatch(moduleRoot, { deterministicOnly });
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.pass ? 0 : 1;
}
