import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateTeamMemoryProposal,
  loadTeamMemoryProposalCandidate,
  repoRoot,
  sha256
} from "./team-memory-proposal-eval.mjs";

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function decodeEntities(value) {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

export function publicTextFromHtml(html) {
  return decodeEntities(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

export function buildTeamMemoryReaderPrompt({ config, publicPageText, readerName }) {
  return `You are conducting one independent pass/fail proposal evaluation.

This is an explicitly fictionalized analytical lens informed only by a public portfolio page. You are not ${readerName}. ${readerName} did not participate in this evaluation, review the candidate, approve the proposal, endorse Jamie, or make a hiring decision. Do not write in the first person as ${readerName}; do not invent private views, facts, conversations, or company information.

Reader lens: ${readerName}
Public relationship used only to define the scenario: a prospective collaborator considering a focused paid team-knowledge discovery or prototype engagement.

Scenario:
${config.publicSafeScenario}

Acceptance question:
${config.acceptanceQuestion}

Judge the page as the proposal itself. A pass requires enough clarity and credible public evidence to choose a small paid pilot now, while recognizing that scope, confidentiality, budget, and contract terms would still need normal human agreement. Look for a concrete team problem, an adoptable first step, useful deliverables, onboarding and decision-memory value, privacy and correction practices, observable success conditions, and honest maturity boundaries. Do not reward conceptual sophistication when the proposed use remains unclear.

Return only JSON matching the supplied schema. Set readerId to ${config.reader.id}. A pass requires verdict=pass and decision=${config.passDecision}; a fail requires verdict=fail and decision=${config.failDecision}. Set actualPersonParticipated=false. Even for a pass, return constructive critique and the most important thing to validate in a real kickoff. The boundary must state that this is a fictionalized public-page model simulation, that ${readerName} did not participate, and that the result is not ${readerName}'s endorsement or budget authorization.

--- PUBLIC PORTFOLIO PAGE ---
${publicPageText}
`;
}

function main() {
  const htmlPath = arg("--html");
  const promptOutput = arg("--prompt-output");
  const metadataOutput = arg("--metadata-output");
  const readerName = process.env.TEAM_MEMORY_RUNTIME_READER_NAME;
  if (!htmlPath || !promptOutput || !metadataOutput || !readerName) {
    throw new Error(
      "Usage: TEAM_MEMORY_RUNTIME_READER_NAME=<protected runtime value> node prepare-team-memory-reader-prompt.mjs --html <public html> --prompt-output <private prompt> --metadata-output <private metadata>"
    );
  }

  const candidate = loadTeamMemoryProposalCandidate(repoRoot);
  const deterministic = evaluateTeamMemoryProposal(candidate, {
    deterministicOnly: true
  });
  if (!deterministic.passed) {
    throw new Error(`Deterministic preflight failed:\n${deterministic.failures.join("\n")}`);
  }

  const publicPageText = publicTextFromHtml(readFileSync(htmlPath, "utf8"));
  for (const signal of candidate.config.requiredPublicSignals) {
    for (const pattern of signal.patterns) {
      if (!publicPageText.toLowerCase().includes(pattern.toLowerCase())) {
        throw new Error(`Fetched public page is missing ${signal.id}: ${pattern}`);
      }
    }
  }

  const prompt = buildTeamMemoryReaderPrompt({
    config: candidate.config,
    publicPageText,
    readerName
  });
  writeFileSync(promptOutput, prompt, { mode: 0o600 });
  writeFileSync(
    metadataOutput,
    `${JSON.stringify(
      {
        publicOrigin: candidate.config.publicOrigin,
        pagePath: candidate.config.pagePath,
        readerId: candidate.config.reader.id,
        pageSourceSha256: sha256(candidate.pageSource),
        publicPageTextSha256: sha256(publicPageText),
        scenarioSha256: sha256(candidate.config.publicSafeScenario),
        promptSha256: sha256(prompt),
        promptVersion: candidate.config.modelGate.promptVersion,
        actualPersonParticipated: false
      },
      null,
      2
    )}\n`,
    { mode: 0o600 }
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
