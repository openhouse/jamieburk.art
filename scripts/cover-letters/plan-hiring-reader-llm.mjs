import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { selectPublicResume } from "../resumes/select-public-resume.mjs";
import { evaluateCoverLetterPortfolio } from "./evaluate-cover-letter-portfolio.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readJson(relativePath, root = repoRoot) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

const defaultConfig = readJson("evals/cover-letters/hiring-reader-portfolio.json");
const defaultResumeConfig = readJson("evals/resumes/hiring-reader-portfolio.json");
const defaultSelectionConfig = readJson("evals/resumes/public-resume-selection.json");

function sha256(text) {
  return createHash("sha256").update(text).digest("hex");
}

export function coverLetterCacheKey(call) {
  return [
    call.opportunityId,
    call.readerPairId,
    call.coverLetterSha256,
    call.resumeSha256,
    call.contextSha256,
    call.voiceProfileSha256,
    call.postingSourceReviewedAt,
    call.voiceSourceModifiedAt,
    call.promptVersion
  ].join("|");
}

export function planCoverLetterReaderCalls({
  root = repoRoot,
  config = defaultConfig,
  resumeConfig = defaultResumeConfig,
  selectionConfig = defaultSelectionConfig
} = {}) {
  const selection = selectPublicResume({ root, config: selectionConfig });
  const preflight = evaluateCoverLetterPortfolio({ root, config, resumeConfig });
  assert.equal(selection.overall, "pass", "Opportunity lifecycle selection must pass before model planning");
  assert.equal(preflight.overall, "pass", "Cover-letter deterministic preflight must pass before model planning");

  const selectedIds = new Set(selection.selection.opportunityIds);
  const selectionCalls = new Map(selection.llmPlan.calls.map((call) => [call.readerPairId, call]));
  const resumeById = new Map(resumeConfig.versions.map((version) => [version.opportunityId, version]));
  const voiceProfileSha256 = sha256(config.writerVoiceSource.workingProfile.join("\n"));
  const calls = [];

  for (const version of config.versions) {
    if (!selectedIds.has(version.opportunityId) || version.status === "expired-benchmark") continue;
    const resumeVersion = resumeById.get(version.opportunityId);
    const coverLetter = readFileSync(path.join(root, version.coverLetterPath), "utf8");
    const resume = readFileSync(path.join(root, resumeVersion.resumePath), "utf8");
    for (const reader of version.readerCriteria) {
      const sourceCall = selectionCalls.get(reader.pairId);
      assert.ok(sourceCall, `Selected reader ${reader.pairId} has no lifecycle-bound public context`);
      calls.push({
        opportunityId: version.opportunityId,
        readerPairId: reader.pairId,
        coverLetterPath: version.coverLetterPath,
        coverLetterSha256: sha256(coverLetter),
        resumePath: resumeVersion.resumePath,
        resumeSha256: sha256(resume),
        contextPaths: sourceCall.contextPaths,
        contextSha256: sourceCall.contextSha256,
        postingSourceReviewedAt: sourceCall.postingSourceReviewedAt,
        voiceProfileSha256,
        voiceSourceModifiedAt: config.writerVoiceSource.sourceModifiedAt,
        promptVersion: config.modelGate.promptVersion
      });
    }
  }

  assert.ok(calls.length <= config.modelGate.maximumCallsPerRun, "Cover-letter model-call budget exceeded");
  const totalPairs = config.versions.reduce((sum, version) => sum + version.readerCriteria.length, 0);
  return {
    schemaVersion: 1,
    status: "eligible",
    selectedOpportunityIds: [...selectedIds],
    plannedCallCount: calls.length,
    skippedCallCount: totalPairs - calls.length,
    calls: calls.map((call) => ({ ...call, cacheKey: coverLetterCacheKey(call) })),
    actualPeopleParticipated: false,
    boundary: "Only lifecycle-selected opportunities that pass deterministic artifact, voice, truth, and reader-signal checks may consume model calls. Expired and unselected letters remain maintained without model cost."
  };
}

export function buildCoverLetterPrompts({
  root = repoRoot,
  config = defaultConfig,
  resumeConfig = defaultResumeConfig,
  selectionConfig = defaultSelectionConfig
} = {}) {
  const plan = planCoverLetterReaderCalls({ root, config, resumeConfig, selectionConfig });
  const readerByPair = new Map(
    resumeConfig.versions.flatMap((version) =>
      version.readerCriteria.map((reader) => [reader.pairId, { ...reader, opportunityId: version.opportunityId, organization: version.organization, targetRole: version.targetRole, officialSource: version.officialSource }])
    )
  );
  const voiceProfile = config.writerVoiceSource.workingProfile.map((principle) => `- ${principle}`).join("\n");

  return plan.calls.map((call) => {
    const reader = readerByPair.get(call.readerPairId);
    assert.ok(reader, `Missing reader context for ${call.readerPairId}`);
    const coverLetter = readFileSync(path.join(root, call.coverLetterPath), "utf8");
    const resume = readFileSync(path.join(root, call.resumePath), "utf8");
    const context = call.contextPaths.map((relativePath) => `\n--- PUBLIC-SOURCE CONTEXT: ${relativePath} ---\n${readFileSync(path.join(root, relativePath), "utf8")}`).join("\n");
    const prompt = `You are conducting one independent pass/fail cover-letter evaluation.

This is an explicitly fictionalized analytical lens informed only by public sources. You are not ${reader.displayName}; ${reader.displayName} did not participate, review, approve, endorse, or make any decision. Do not write in the first person as that person or invent private views.

- Reader lens: ${reader.displayName}
- Public relationship: ${reader.relationship}
- Opportunity: ${reader.organization} — ${reader.targetRole}
- Official posting: ${reader.officialSource}

Acceptance question: ${config.contract.acceptanceQuestion}

Read the role-specific cover letter together with its sibling tailored resume. A pass means the combined application is worth advancing to a structured interview or practical work sample, subject to normal eligibility and hiring checks. It does not mean final hire. Be rigorous about role specificity, truthful scope, public evidence, unresolved gaps, and whether the letter adds a memorable governing situation rather than paraphrasing the resume.

Also evaluate fidelity to this bounded working profile derived today from Jamie's living, read-only writer-voice source. Do not treat this profile as a quotation or the full source:
${voiceProfile}

Return only JSON matching the supplied schema. Set pairId exactly to ${call.readerPairId}. A pass requires both the application verdict and voiceFidelity.verdict to be pass. Set actualPersonParticipated to false. The boundary must say this is a fictionalized public-source model simulation and not participation or endorsement by ${reader.displayName}. Return constructive narrative criticism even when passing.

--- ROLE-SPECIFIC COVER LETTER (SHA-256 ${call.coverLetterSha256}) ---
${coverLetter}

--- SIBLING TAILORED RESUME (SHA-256 ${call.resumeSha256}) ---
${resume}
${context}
`;
    return { ...call, readerDisplayName: reader.displayName, prompt };
  });
}

function main() {
  const prompts = buildCoverLetterPrompts();
  const pairFlag = process.argv.indexOf("--pair");
  if (pairFlag >= 0) {
    const pairId = process.argv[pairFlag + 1];
    const selected = prompts.find((entry) => entry.readerPairId === pairId);
    assert.ok(selected, `No eligible planned call for ${pairId}`);
    process.stdout.write(selected.prompt);
    return;
  }
  console.log(JSON.stringify(prompts.map(({ prompt, ...entry }) => ({ ...entry, promptBytes: Buffer.byteLength(prompt) })), null, 2));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
