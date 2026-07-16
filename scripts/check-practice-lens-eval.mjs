import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const slug = process.argv[2];
const supported = new Set(["margaret-morse-lens", "warren-sack-lens"]);
const failures = [];

function fail(message) {
  failures.push(message);
}

function readJson(filePath, label) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${label} is not valid JSON: ${error.message}`);
    return {};
  }
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function unique(values, label) {
  if (new Set(values).size !== values.length) fail(`${label} contains duplicates`);
  return new Set(values);
}

function exactIds(records, expected, label) {
  const actual = records?.map(({ id }) => id) ?? [];
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    fail(`${label} must be ${expected.join(", ")}`);
  }
}

function requireContainedFile(relativePath, runRoot, label) {
  const absolutePath = path.resolve(runRoot, relativePath ?? "");
  const relative = path.relative(runRoot, absolutePath);
  if (!relativePath || relative.startsWith("..") || path.isAbsolute(relative)) {
    fail(`${label} escapes its run directory`);
    return null;
  }
  if (!existsSync(absolutePath)) {
    fail(`${label} does not exist: ${relativePath}`);
    return null;
  }
  const realRun = realpathSync(runRoot);
  const realFile = realpathSync(absolutePath);
  const realRelative = path.relative(realRun, realFile);
  if (realRelative.startsWith("..") || path.isAbsolute(realRelative)) {
    fail(`${label} escapes its run directory after resolving links`);
    return null;
  }
  return absolutePath;
}

if (!supported.has(slug)) {
  console.error(`Usage: node scripts/check-practice-lens-eval.mjs <${[...supported].join("|")}>`);
  process.exit(1);
}

const evalRoot = path.join(repoRoot, "evals", slug);
const evalPath = path.join(evalRoot, "eval.json");
const evalSource = readFileSync(evalPath, "utf8");
const definition = readJson(evalPath, `${slug}/eval.json`);
const expected = {
  "margaret-morse-lens": {
    dimensions: [
      "embodied-inquiry",
      "tending-and-hospitality",
      "material-and-temporal-specificity",
      "art-life-continuity",
      "irreducible-value-and-legibility"
    ],
    gates: [
      "evidence-and-attribution",
      "participant-and-record-safety",
      "anti-instrumentalization",
      "collective-agency"
    ],
    roles: ["embodied-practice-judge", "portfolio-composition-judge"]
  },
  "warren-sack-lens": {
    dimensions: [
      "recursive-relational-reasoning",
      "cross-representational-translation",
      "prototype-and-artifact-specificity",
      "source-rigor",
      "collective-agency-and-feedback"
    ],
    gates: [
      "evidence-and-attribution",
      "no-network-determinism",
      "prototype-status-and-collective-credit",
      "public-legibility-and-safety"
    ],
    roles: ["systems-and-evidence-judge", "hiring-reader-judge"]
  }
}[slug];

if (definition.version !== 1) fail(`${slug} version must be 1`);
if (definition.evalId !== slug) fail(`${slug} evalId must match its directory`);
if (!definition.objective) fail(`${slug} is missing its objective`);
if (definition.criterion?.id !== slug || definition.criterion?.threshold !== 5) {
  fail(`${slug} criterion must use its eval ID and threshold 5`);
}
exactIds(definition.criterion?.dimensions, expected.dimensions, `${slug} dimensions`);
exactIds(definition.hardGates, expected.gates, `${slug} hard gates`);
for (const anchor of ["1", "3", "5"]) {
  if (!definition.criterion?.anchors?.[anchor]) fail(`${slug} is missing score anchor ${anchor}`);
}
if (JSON.stringify(definition.judgeProtocol?.independentRoles) !== JSON.stringify(expected.roles)) {
  fail(`${slug} must declare its two independent judge roles in canonical order`);
}
const schemaPath = path.join(repoRoot, definition.judgeProtocol?.artifactSchema ?? "");
if (!existsSync(schemaPath)) fail(`${slug} judge artifact schema is missing`);

const contract = definition.candidateContract ?? {};
if (!Number.isInteger(contract.maximumWords) || contract.maximumWords > 90) {
  fail(`${slug} maximumWords must be an integer no greater than 90`);
}
if (!Number.isInteger(contract.maximumSentences) || contract.maximumSentences > 4) {
  fail(`${slug} maximumSentences must be an integer no greater than 4`);
}
if ((definition.fixture?.mustInclude?.length ?? 0) < 5) {
  fail(`${slug} fixture must exercise all five dimensions`);
}
if ((definition.fixture?.mustNotClaim?.length ?? 0) < 4) {
  fail(`${slug} fixture needs at least four anti-claims`);
}

const projection = definition.projectionContract ?? {};
for (const key of ["exactCandidatePaths", "knowledgeBankClaimIds", "knowledgeBankPaths"]) {
  if (!(projection[key]?.length > 0)) fail(`${slug} projection contract is missing ${key}`);
}
const stop = definition.stopPolicy ?? {};
if (stop.targetScore !== 5) fail(`${slug} target score must be 5`);
if (!Number.isInteger(stop.requiredConsecutivePasses) || stop.requiredConsecutivePasses < 2) {
  fail(`${slug} requires at least two consecutive passes`);
}
if (!Number.isInteger(stop.maxIterations) || stop.maxIterations < 1) {
  fail(`${slug} maxIterations must be a positive integer`);
}
if (stop.maxRegressions !== 0) fail(`${slug} must accept zero regressions`);

const privatePattern = /\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|file:\/\/|\.photoslibrary|student\s+id|@[a-z0-9.-]+\.[a-z]{2,}/i;
if (privatePattern.test(evalSource)) fail(`${slug} eval definition contains a protected locator or contact detail`);

const runsRoot = path.join(evalRoot, "runs");
const completeRuns = existsSync(runsRoot)
  ? readdirSync(runsRoot)
      .filter((name) => existsSync(path.join(runsRoot, name, "result.json")))
      .filter((name) => readJson(path.join(runsRoot, name, "result.json"), `${name}/result.json`).status === "complete")
      .sort()
  : [];
if (!completeRuns.length) fail(`${slug} has no complete recursive run`);

const latestRunName = completeRuns.at(-1);
if (latestRunName) {
  const runRoot = path.join(runsRoot, latestRunName);
  const resultPath = path.join(runRoot, "result.json");
  const resultSource = readFileSync(resultPath, "utf8");
  const result = readJson(resultPath, `${latestRunName}/result.json`);
  const provenancePath = path.join(runRoot, "provenance.json");
  const provenanceSource = existsSync(provenancePath) ? readFileSync(provenancePath, "utf8") : "";
  const provenance = existsSync(provenancePath)
    ? readJson(provenancePath, `${latestRunName}/provenance.json`)
    : (fail(`${latestRunName} is missing provenance.json`), {});

  if (result.version !== 1 || result.evalId !== slug || result.runId !== latestRunName) {
    fail(`${latestRunName} references the wrong eval, run, or version`);
  }
  if (!Number.isInteger(result.iterations) || result.iterations < 1 || result.iterations > stop.maxIterations) {
    fail(`${latestRunName} has an invalid iteration count`);
  }
  if (result.rounds?.length !== result.iterations) fail(`${latestRunName} must record every round`);
  for (const [index, round] of (result.rounds ?? []).entries()) {
    if (round.round !== index + 1) fail(`${latestRunName} round numbers must be contiguous`);
  }
  const qualifying = result.qualifyingRounds ?? [];
  if (qualifying.length < stop.requiredConsecutivePasses) {
    fail(`${latestRunName} lacks enough qualifying rounds`);
  }
  if (qualifying.slice(1).some((round, index) => round !== qualifying[index] + 1)) {
    fail(`${latestRunName} qualifying rounds must be consecutive`);
  }
  const finalRounds = Array.from(
    { length: stop.requiredConsecutivePasses },
    (_, index) => result.iterations - stop.requiredConsecutivePasses + index + 1
  );
  if (JSON.stringify(qualifying.slice(-stop.requiredConsecutivePasses)) !== JSON.stringify(finalRounds)) {
    fail(`${latestRunName} must end with its qualifying rounds`);
  }

  const candidate = result.candidate ?? "";
  const candidateSha256 = sha256(candidate);
  const wordCount = candidate.trim().split(/\s+/).filter(Boolean).length;
  const sentenceCount = (candidate.match(/[.!?](?:\s|$)/g) ?? []).length;
  if (candidateSha256 !== result.candidateSha256) fail(`${latestRunName} candidate digest is stale`);
  if (wordCount !== result.wordCount || wordCount > contract.maximumWords) {
    fail(`${latestRunName} candidate violates its word-count contract`);
  }
  if (sentenceCount !== result.sentenceCount || sentenceCount > contract.maximumSentences) {
    fail(`${latestRunName} candidate violates its sentence-count contract`);
  }
  if ((result.regressions?.length ?? 0) !== 0) fail(`${latestRunName} records a regression`);

  for (const relativePath of projection.exactCandidatePaths ?? []) {
    const filePath = path.join(repoRoot, relativePath);
    if (!existsSync(filePath) || !readFileSync(filePath, "utf8").includes(candidate)) {
      fail(`${latestRunName} winning candidate is not projected exactly in ${relativePath}`);
    }
  }
  for (const relativePath of projection.knowledgeBankPaths ?? []) {
    const filePath = path.join(repoRoot, relativePath);
    if (!existsSync(filePath)) {
      fail(`${latestRunName} Knowledge Bank path is missing: ${relativePath}`);
      continue;
    }
    const source = readFileSync(filePath, "utf8");
    for (const claimId of projection.knowledgeBankClaimIds ?? []) {
      if (!source.includes(claimId)) fail(`${latestRunName} is missing ${claimId} from ${relativePath}`);
    }
  }

  if (provenance.version !== 1 || provenance.evalId !== slug || provenance.runId !== latestRunName) {
    fail(`${latestRunName} provenance references the wrong eval, run, or version`);
  }
  if (provenance.generatorWasJudge !== false) fail(`${latestRunName} generator must not be a deciding judge`);
  const provenanceJudges = provenance.judges ?? [];
  const sessionIds = provenanceJudges.map(({ sessionId }) => sessionId);
  const judgeRunIds = provenanceJudges.map(({ judgeRunId }) => judgeRunId);
  unique(sessionIds, `${latestRunName} judge session IDs`);
  unique(judgeRunIds, `${latestRunName} judge run IDs`);
  if (sessionIds.some((id) => !id)) fail(`${latestRunName} has a missing judge session ID`);
  if (provenanceJudges.length !== finalRounds.length * expected.roles.length) {
    fail(`${latestRunName} must record two independent judges for each qualifying round`);
  }

  const finalJudgments = result.finalJudgments ?? [];
  if (finalJudgments.length !== expected.roles.length) {
    fail(`${latestRunName} must record two final judgments`);
  }
  for (const role of expected.roles) {
    const judgment = finalJudgments.find((item) => item.role === role);
    if (
      judgment?.score !== stop.targetScore ||
      judgment?.hardGatesPass !== true ||
      judgment?.dimensionsPass !== expected.dimensions.length
    ) {
      fail(`${latestRunName} lacks a perfect final judgment from ${role}`);
    }
  }

  for (const roundNumber of finalRounds) {
    const round = result.rounds?.[roundNumber - 1];
    if (round?.result !== "qualifying-pass") {
      fail(`${latestRunName} round ${roundNumber} is not a qualifying pass`);
      continue;
    }
    if (round.candidateSha256 !== candidateSha256) {
      fail(`${latestRunName} round ${roundNumber} evaluated a different candidate`);
    }
    if (round.judges?.length !== expected.roles.length) {
      fail(`${latestRunName} round ${roundNumber} must contain both judges`);
      continue;
    }
    for (const role of expected.roles) {
      const reference = round.judges.find((item) => item.role === role);
      const provenanceEntry = provenanceJudges.find(
        (item) => item.round === roundNumber && item.role === role
      );
      if (!reference || !provenanceEntry) {
        fail(`${latestRunName} round ${roundNumber} is missing ${role}`);
        continue;
      }
      if (provenanceEntry.mode !== "read-only") {
        fail(`${latestRunName} ${role} round ${roundNumber} was not read-only`);
      }
      if (reference.judgeRunId !== provenanceEntry.judgeRunId) {
        fail(`${latestRunName} ${role} round ${roundNumber} has mismatched judge IDs`);
      }
      const artifactPath = requireContainedFile(reference.artifact, runRoot, `${latestRunName}/${role}`);
      if (!artifactPath) continue;
      const artifactSource = readFileSync(artifactPath, "utf8");
      const artifact = readJson(artifactPath, `${latestRunName}/${reference.artifact}`);
      if (sha256(artifactSource) !== reference.outputSha256 || reference.outputSha256 !== provenanceEntry.outputSha256) {
        fail(`${latestRunName} ${role} round ${roundNumber} artifact digest is stale`);
      }
      if (
        artifact.judgeRunId !== reference.judgeRunId ||
        artifact.evalId !== slug ||
        artifact.role !== role ||
        artifact.candidateSha256 !== candidateSha256
      ) {
        fail(`${latestRunName} ${role} round ${roundNumber} artifact identity is invalid`);
      }
      exactIds(artifact.hardGateFindings, expected.gates, `${latestRunName}/${role} hard-gate findings`);
      exactIds(artifact.dimensionFindings, expected.dimensions, `${latestRunName}/${role} dimension findings`);
      if (
        artifact.allHardGatesPassed !== true ||
        artifact.hardGateFindings?.some(({ passed }) => passed !== true) ||
        artifact.dimensionFindings?.some(({ passed }) => passed !== true) ||
        artifact.score !== stop.targetScore ||
        (artifact.regressions?.length ?? 0) > stop.maxRegressions ||
        (artifact.requiredRevisions?.length ?? 0) > 0
      ) {
        fail(`${latestRunName} ${role} round ${roundNumber} is not a perfect non-regressing pass`);
      }
    }
  }
  if (privatePattern.test(resultSource) || privatePattern.test(provenanceSource)) {
    fail(`${latestRunName} run metadata contains a protected locator or contact detail`);
  }
}

if (failures.length) {
  console.error(`${slug} eval check failed:`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  `${slug} eval check passed: ${expected.dimensions.length} dimensions, ` +
    `${expected.gates.length} hard gates, two independent judges, two consecutive perfect rounds.`
);
