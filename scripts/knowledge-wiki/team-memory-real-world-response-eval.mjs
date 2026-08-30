import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");
export const configPath =
  "evals/knowledge-wiki/team-memory-real-world-response.json";

function readJson(root, relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

export function loadTeamMemoryResponseCandidate(root = repoRoot) {
  const config = readJson(root, configPath);
  return {
    config,
    response: readJson(root, config.responseStatePath),
    knowledgeBank: structuredClone(knowledgeBank)
  };
}

export function evaluateTeamMemoryResponse(candidate) {
  const { config, response, knowledgeBank: bank } = candidate;
  const checks = [];
  const failures = [];
  const check = (id, pass, detail) => {
    checks.push({ id, pass, detail });
    if (!pass) failures.push(detail);
  };

  check(
    "deterministic-before-model",
    config.evaluationType === "deterministic-state-boundary" &&
      config.modelCallsAllowed === 0,
    "This categorical response-state gate must not spend a model call."
  );

  for (const [key, value] of Object.entries(config.requiredObservedStates)) {
    check(
      `observed-${key}`,
      response.state?.[key] === value,
      `The observed response state ${key} must remain ${value}.`
    );
  }

  for (const [key, value] of Object.entries(config.requiredUnknownStates)) {
    check(
      `unknown-${key}`,
      response.state?.[key] === value,
      `The unobserved response state ${key} must remain ${value}.`
    );
  }

  for (const [key, value] of Object.entries(config.requiredDisposition)) {
    check(
      `disposition-${key}`,
      response.disposition?.[key] === value,
      `The response disposition ${key} must remain ${value}.`
    );
  }

  const source = bank.sources.find((item) => item.id === config.sourceRecordId);
  const intake = bank.intakeItems.find((item) =>
    item.sourceIds.includes(config.sourceRecordId)
  );
  const observations = bank.observations.filter(
    (item) => item.sourceId === config.sourceRecordId
  );

  check(
    "governed-source-present",
    source?.visibility === "private" &&
      source?.preservationStatus === "private" &&
      Boolean(source?.protectedLocatorId),
    "The response must remain a protected, privately preserved Knowledge Wiki source."
  );

  check(
    "minimal-intake-boundary",
    intake?.kind === "analysis-note" &&
      intake?.visibility === "protected" &&
      intake?.boundaries.some((boundary) =>
        /no message text, personal circumstances, contact information, screenshots/i.test(
          boundary
        )
      ),
    "The response must remain an analysis note, not human corroboration, and must explicitly exclude message text, personal circumstances, contact information, and screenshots."
  );

  check(
    "positive-signal-is-not-endorsement",
    source?.supportsGenerally.includes("warm re-engagement") &&
      source?.supportsGenerally.includes("interest in a future conversation") &&
      [
        "link opening",
        "page review",
        "proposal comprehension",
        "endorsement",
        "budget authority",
        "hiring intent",
        "commercial acceptance"
      ].every((boundary) => source?.doesNotEstablish.includes(boundary)),
    "The source must separate the observed relational signal from every unobserved editorial, hiring, and commercial signal."
  );

  check(
    "no-claim-promotion",
    observations.length === 2 &&
      observations.every((observation) => observation.claimIds.length === 0),
    "The protected response may update operating state but cannot promote a public claim."
  );

  check(
    "no-private-content-in-governed-summary",
    !/(messageText|messageBody|personalCircumstances|contactInformation|screenshotPath|privateSourceIdentifier|participantIdentity)/i.test(
      JSON.stringify({ response, source, intake, observations })
    ),
    "The governed summary must contain no private-message, personal-context, contact, screenshot, private-locator, or participant-identity field."
  );

  return {
    id: config.id,
    passed: failures.length === 0,
    stage: "deterministic",
    checks,
    failures,
    acceptanceMeaning: config.acceptanceMeaning
  };
}

function main() {
  const result = evaluateTeamMemoryResponse(loadTeamMemoryResponseCandidate());
  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();

export function assertTeamMemoryResponsePass(candidate) {
  const result = evaluateTeamMemoryResponse(candidate);
  assert.equal(result.passed, true, result.failures.join("\n"));
}
