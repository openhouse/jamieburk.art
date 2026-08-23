import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluateHiringReaderPortfolio } from "./evaluate-hiring-reader-portfolio.mjs";
import { selectPublicResume } from "./select-public-resume.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readJson(relativePath, root = repoRoot) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

const defaultSelectionConfig = readJson("evals/resumes/public-resume-selection.json");
const defaultReaderConfig = readJson("evals/resumes/hiring-reader-portfolio.json");

function cacheKey(call) {
  return [
    call.opportunityId,
    call.readerPairId,
    call.resumeSha256,
    call.contextSha256,
    call.postingSourceReviewedAt,
    call.promptVersion
  ].join("|");
}

export function buildHiringReaderPrompts({
  root = repoRoot,
  selectionConfig = defaultSelectionConfig,
  readerConfig = defaultReaderConfig
} = {}) {
  const selection = selectPublicResume({ root, config: selectionConfig });
  const preflight = evaluateHiringReaderPortfolio({ root, selectionConfig });
  assert.equal(selection.overall, "pass", "Deterministic opportunity selection must pass before prompts are built");
  assert.equal(preflight.overall, "pass", "Artifact and reader-signal preflight must pass before prompts are built");

  const resume = readFileSync(
    path.join(root, selectionConfig.currentPublicArtifact.markdownPath),
    "utf8"
  );
  const readers = new Map(
    readerConfig.versions.flatMap((version) =>
      version.readerCriteria.map((reader) => [
        reader.pairId,
        {
          ...reader,
          opportunityId: version.opportunityId,
          organization: version.organization,
          targetRole: version.targetRole,
          officialSource: version.officialSource
        }
      ])
    )
  );

  return selection.llmPlan.calls.map((call) => {
    const reader = readers.get(call.readerPairId);
    assert.ok(reader, `Missing public reader context for ${call.readerPairId}`);
    const context = call.contextPaths
      .map((relativePath) => {
        const text = readFileSync(path.join(root, relativePath), "utf8");
        return `\n--- PUBLIC-SOURCE CONTEXT: ${relativePath} ---\n${text}`;
      })
      .join("\n");

    const prompt = `You are conducting one independent pass/fail resume evaluation.

This is an explicitly fictionalized analytical lens informed only by public sources. You are not ${reader.displayName}; ${reader.displayName} did not participate, review, approve, endorse, or make any decision. Do not write in the first person as that person and do not invent their private views. Use the public relationship only as a perspective:

- Reader lens: ${reader.displayName}
- Public relationship: ${reader.relationship}
- Opportunity: ${reader.organization} — ${reader.targetRole}
- Official posting: ${reader.officialSource}

Acceptance question: ${selectionConfig.modelGate.acceptanceQuestion}

Evaluate the resume as a real hiring reader would at the resume-screen stage. A pass means the evidence is strong enough to advance to a structured interview or practical work sample, subject to normal eligibility and hiring checks. It does not mean a final hire. Be rigorous about role fit, direct evidence, scope, institutional work, resident-facing services, public-interest technology, delivery judgment, and unresolved civil-service eligibility. Return constructive narrative criticism even if the verdict is pass.

Return only JSON matching the supplied schema. Set pairId exactly to ${call.readerPairId}. Set actualPersonParticipated to false. The decision must be advance-to-structured-next-step when verdict is pass and do-not-advance when verdict is fail. The boundary must explicitly say this is a fictionalized public-source model simulation and not participation or endorsement by ${reader.displayName}.

--- PUBLIC RESUME (SHA-256 ${call.resumeSha256}) ---
${resume}
${context}
`;

    return {
      opportunityId: call.opportunityId,
      readerPairId: call.readerPairId,
      readerDisplayName: reader.displayName,
      cacheKey: cacheKey(call),
      call,
      prompt
    };
  });
}

function main() {
  const prompts = buildHiringReaderPrompts();
  const pairFlag = process.argv.indexOf("--pair");
  if (pairFlag >= 0) {
    const pairId = process.argv[pairFlag + 1];
    const selected = prompts.find((entry) => entry.readerPairId === pairId);
    assert.ok(selected, `No eligible planned call for ${pairId}`);
    process.stdout.write(selected.prompt);
    return;
  }
  console.log(
    JSON.stringify(
      prompts.map(({ prompt, ...entry }) => ({ ...entry, promptBytes: Buffer.byteLength(prompt) })),
      null,
      2
    )
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
