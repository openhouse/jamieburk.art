import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptDir, "../..");
export const configPath = "evals/knowledge-wiki/team-memory-proposal-acceptance.json";

function readJson(root, relativePath) {
  return JSON.parse(readFileSync(path.join(root, relativePath), "utf8"));
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function loadTeamMemoryProposalCandidate(root = repoRoot) {
  const config = readJson(root, configPath);
  return {
    config,
    pageSource: readFileSync(path.join(root, config.pageSourcePath), "utf8"),
    pageCopy: readFileSync(path.join(root, config.pageCopyPath), "utf8"),
    run: readJson(root, config.currentRunPath)
  };
}

export function evaluateTeamMemoryProposal(
  candidate,
  { deterministicOnly = false } = {}
) {
  const { config, pageSource, pageCopy, run } = candidate;
  const publicSource = `${pageSource}\n${pageCopy}`.replace(/\s+/g, " ");
  const failures = [];
  const checks = [];
  const check = (id, pass, detail) => {
    checks.push({ id, pass, detail });
    if (!pass) failures.push(detail);
  };

  check(
    "public-only-reader-contract",
    config.modelGate.publicOnly === true &&
      config.modelGate.privateTranscriptAvailableToModel === false &&
      config.reader.actualPersonParticipated === false &&
      config.reader.identityMayBeCommitted === false,
    "The reader contract must remain public-only, fictionalized, and free of private transcript or committed identity input."
  );

  check(
    "deterministic-stages-before-model",
    config.deterministicStages.at(-1) === "model-reader-evaluation" &&
      config.deterministicStages.indexOf("scenario-to-page-coverage") <
        config.deterministicStages.indexOf("model-reader-evaluation") &&
      config.modelGate.maximumCallsPerCandidate === 1,
    "Deterministic page checks must precede the single permitted model call."
  );

  for (const signal of config.requiredPublicSignals) {
    const missing = signal.patterns.filter(
      (pattern) => !publicSource.toLowerCase().includes(pattern.toLowerCase())
    );
    check(
      `public-signal-${signal.id}`,
      missing.length === 0,
      missing.length === 0
        ? `The public page carries ${signal.id}.`
        : `The public page is missing ${signal.id}: ${missing.join(", ")}.`
    );
  }

  check(
    "protected-material-excluded",
    !/(?:"runtimeReaderName"\s*:|"companyIdentity"\s*:|"privateTranscript"\s*:|"sourcePath"\s*:|\/Users\/|\/Volumes\/|Mobile Documents|otter\.ai|\$[0-9][0-9,]*)/i.test(
      JSON.stringify({ config, pageSource, pageCopy, run })
    ),
    "The committed public eval or page exposes protected identity, company, transcript, path, or pricing material."
  );

  check(
    "proposal-not-misrepresented-as-delivery",
    /proposed acceptance conditions/i.test(pageSource) &&
      /not a claim that a\s+client engagement or company-wide implementation has occurred/i.test(
        pageSource
      ),
    "The page must distinguish a proposed pilot from completed client work or adoption."
  );

  if (!deterministicOnly) {
    const expectedPageSha = sha256(pageSource);
    const expectedScenarioSha = sha256(config.publicSafeScenario);
    const result = run.result;
    check(
      "current-hash-bound-model-run",
      run.status === "complete" &&
        run.pageSourceSha256 === expectedPageSha &&
        run.scenarioSha256 === expectedScenarioSha &&
        run.promptVersion === config.modelGate.promptVersion &&
        /^[0-9a-f]{64}$/.test(run.publicPageTextSha256 ?? "") &&
        /^[0-9a-f]{64}$/.test(run.promptSha256 ?? ""),
      "The fictionalized reader run is missing, stale, or not bound to this page and scenario."
    );
    check(
      "model-reader-acceptance",
      Boolean(result) &&
        result.readerId === config.reader.id &&
        result.verdict === config.modelGate.requiredVerdict &&
        result.decision === config.modelGate.requiredDecision &&
        result.actualPersonParticipated === false,
      "The current fictionalized reader model did not choose hire-for-focused-pilot."
    );
    check(
      "constructive-reader-record",
      Boolean(result) &&
        Array.isArray(result.strengths) &&
        result.strengths.length >= 2 &&
        Array.isArray(result.missingEvidence) &&
        typeof result.constructiveCritique === "string" &&
        result.constructiveCritique.length >= 40 &&
        typeof result.validateNext === "string" &&
        result.validateNext.length >= 40 &&
        typeof result.boundary === "string" &&
        /fictionalized/i.test(result.boundary) &&
        /not .*endorsement|did not participate/i.test(result.boundary),
      "The modeled pass must retain constructive critique, a next validation, and the no-endorsement boundary."
    );
  }

  return {
    passed: failures.length === 0,
    stage: deterministicOnly ? "deterministic" : "full",
    failures,
    checks,
    boundary: config.modelGate.humanMeaning
  };
}

function main() {
  const deterministicOnly = process.argv.includes("--deterministic-only");
  const result = evaluateTeamMemoryProposal(loadTeamMemoryProposalCandidate(), {
    deterministicOnly
  });
  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exit(1);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
