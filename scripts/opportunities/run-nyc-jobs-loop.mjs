import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { prepareOpportunityRefresh, sendDigestWithResend } from "./nyc-jobs-loop.mjs";

function argument(name, fallback = "") {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function requiredArgument(name) {
  const value = argument(name);
  if (!value) throw new Error(`${name} is required.`);
  return path.resolve(value);
}

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

const metadata = readJson(requiredArgument("--metadata"));
const postings = readJson(requiredArgument("--postings"));
const config = readJson(requiredArgument("--config"));
const outputDirectory = requiredArgument("--output-dir");
const now = argument("--now", new Date().toISOString().slice(0, 10));
const candidateQueuePath = argument("--candidate-queue");
const carriedCandidates = candidateQueuePath && existsSync(candidateQueuePath)
  ? readJson(candidateQueuePath).candidates ?? []
  : [];

if (config.schemaVersion !== 1 || config.source?.datasetId !== "pda4-rgn4") {
  throw new Error("The NYC Jobs intake config is missing or incompatible.");
}
if (!Array.isArray(postings)) throw new Error("The postings input must be a JSON array.");

const result = prepareOpportunityRefresh({
  metadata,
  committedState: process.argv.includes("--active-digest-only")
    ? { ...config.state, rowsUpdatedAt: Number(metadata.rowsUpdatedAt) }
    : config.state,
  postings,
  policy: config.policy,
  now,
  knownJobIds: config.knownJobIds,
  activeOpportunities: config.activeOpportunities,
  carriedCandidates,
  forceRefresh: process.argv.includes("--force-refresh")
});

mkdirSync(outputDirectory, { recursive: true });
const queue = {
  schemaVersion: 1,
  generatedAt: `${now}T12:00:00.000Z`,
  sourceDatasetId: config.source.datasetId,
  sourceRowsUpdatedAt: Number(metadata.rowsUpdatedAt),
  refreshRequired: result.refreshRequired,
  scoringPerformed: result.scoringPerformed,
  deterministicRowsEvaluated: result.deterministicRowsEvaluated,
  strongMatchesObserved: result.strongMatchesObserved,
  publicBoundary: "Candidate intake only. Verify the individual official posting before creating a canonical opportunity or outward-facing application material.",
  candidates: result.candidateMatches
};

writeFileSync(
  path.join(outputDirectory, "nyc-jobs-candidate-queue.json"),
  `${JSON.stringify(queue, null, 2)}\n`
);
writeFileSync(
  path.join(outputDirectory, "nyc-jobs-source-state.json"),
  `${JSON.stringify(result.nextSourceState, null, 2)}\n`
);
writeFileSync(
  path.join(outputDirectory, "nyc-jobs-action-digest.md"),
  result.digest.markdown
);

let delivery = { sent: false, reason: "not-requested" };
if (process.argv.includes("--send")) {
  delivery = await sendDigestWithResend(result.digest, {
    sendEnabled: process.env.OPPORTUNITY_DIGEST_SEND_ENABLED === "true",
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.OPPORTUNITY_DIGEST_FROM,
    to: process.env.OPPORTUNITY_DIGEST_TO
  });
}

process.stdout.write(`${JSON.stringify({
  refreshRequired: result.refreshRequired,
  scoringPerformed: result.scoringPerformed,
  candidates: result.candidateMatches.length,
  delivery
})}\n`);
