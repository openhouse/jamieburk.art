import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  caseStudySource,
  evaluateTeamMemoryCaseStudy,
  loadTeamMemoryCaseStudyCandidate,
  sha256
} from "./team-memory-case-study-eval.mjs";

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function main() {
  const promptOutput = arg("--prompt-output");
  const metadataOutput = arg("--metadata-output");
  if (
    process.env.TEAM_MEMORY_CASE_STUDY_EXTERNAL_REVIEW_APPROVED !== "yes"
  ) {
    throw new Error(
      "Protected transcripts may enter an external model review only after separate informed approval. Set TEAM_MEMORY_CASE_STUDY_EXTERNAL_REVIEW_APPROVED=yes for that approved run."
    );
  }
  const sourcePaths = (process.env.TEAM_MEMORY_CASE_STUDY_SOURCE_PATHS ?? "")
    .split(path.delimiter)
    .filter(Boolean);
  if (!promptOutput || !metadataOutput || sourcePaths.length === 0) {
    throw new Error(
      "Usage: TEAM_MEMORY_CASE_STUDY_EXTERNAL_REVIEW_APPROVED=yes TEAM_MEMORY_CASE_STUDY_SOURCE_PATHS=<protected paths> node prepare-team-memory-case-study-prompt.mjs --prompt-output <private prompt> --metadata-output <private metadata>"
    );
  }

  const candidate = loadTeamMemoryCaseStudyCandidate();
  const deterministic = evaluateTeamMemoryCaseStudy(candidate, {
    deterministicOnly: true
  });
  if (!deterministic.passed) {
    throw new Error(
      `Deterministic preflight failed:\n${deterministic.failures.join("\n")}`
    );
  }

  const privateSources = sourcePaths.map((sourcePath, index) =>
    `--- PRIVATE SOURCE ${index + 1} ---\n${readFileSync(sourcePath, "utf8")}`
  );
  const caseStudy = caseStudySource(candidate);
  const prompt = `Conduct one independent source-informed evaluation of an anonymized case-study packet.

The private source material is supplied only for this runtime evaluation. Do not repeat or expose any person's name, company name, product name, location, contact information, exact identifying organizational detail, private locator, or private quotation. Do not claim to be either participant. The source participant did not take part in this evaluation.

Acceptance question:
${candidate.config.acceptanceQuestion}

Evaluate four gates independently:
1. Would the source participant likely find the prospective-sponsor perspective remarkably accurate in situation, motivation, judgment, sequence, and unresolved commercial state?
2. Would Jamie likely find Jamie's perspective remarkably accurate by the same standard?
3. Does the voice profile faithfully describe prosody, reasoning habits, question style, ethical commitments, and interpersonal posture without becoming an impersonation recipe?
4. Does the packet successfully withhold identifying information and private-source language?

Pass only when every gate passes. Treat omitted identifying detail as a requirement, not an accuracy defect. Treat the corrected working source as non-forensic unless the source itself establishes otherwise. Do not infer an offer, authorization, contract, work performed, endorsement, or outcome.

Return only JSON matching the supplied schema. Use readerId reader.anonymized-team-knowledge-case-study. Set actualPersonParticipated=false and sourceParticipantReviewed=false. The boundary must state that this is a source-informed model simulation, that the source participant did not participate, and that the result is not that person's approval or endorsement. Include constructive critique and the most important human validation still required.

--- ANONYMIZED CASE-STUDY PACKET ---
${caseStudy}

${privateSources.join("\n\n")}
`;

  writeFileSync(promptOutput, prompt, { mode: 0o600 });
  writeFileSync(
    metadataOutput,
    `${JSON.stringify(
      {
        caseStudySha256: sha256(caseStudy),
        scenarioSha256: sha256(candidate.config.publicSafeScenario),
        promptSha256: sha256(prompt),
        promptVersion: candidate.config.modelGate.promptVersion,
        privateSourceCount: sourcePaths.length,
        actualPersonParticipated: false,
        sourceParticipantReviewed: false
      },
      null,
      2
    )}\n`,
    { mode: 0o600 }
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
