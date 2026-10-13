import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

const configPath = "evals/knowledge-wiki/named-reader-acceptance.json";
const privatePattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|Library\/CloudStorage|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;

function readJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function httpsOrigin(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password &&
      url.pathname === "/" && !url.search && !url.hash
      ? url.origin
      : null;
  } catch {
    return null;
  }
}

function receiptCurrentness(repoRoot, run, expectedOrigin) {
  let currentCommit = null;
  let runtimeClean = null;
  try {
    const head = execFileSync("git", ["rev-parse", "--verify", "HEAD"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
    if (/^[0-9a-f]{40}$/.test(head)) currentCommit = head;
  } catch {
    // Historical inspection remains available, but an unverified HEAD cannot pass.
  }
  try {
    const changes = execFileSync("git", [
      "status", "--porcelain=v1", "-z", "--untracked-files=all", "--",
      "apps/www", "package.json", "package-lock.json"
    ], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
    // Review receipts live outside these runtime inputs; Git ignores build outputs.
    runtimeClean = changes.length === 0;
  } catch {
    // An unreadable candidate cannot satisfy the current-candidate gate.
  }
  const candidateMatches = currentCommit !== null && run.candidateCommit === currentCommit;
  const originMatches = expectedOrigin !== null && httpsOrigin(run.publicOrigin) === expectedOrigin;
  const reasons = [];
  if (currentCommit === null) reasons.push("Git HEAD could not be verified");
  else if (!candidateMatches) reasons.push("candidate commit does not match HEAD");
  if (runtimeClean === null) reasons.push("runtime input status could not be verified");
  else if (!runtimeClean) reasons.push("runtime inputs differ from HEAD");
  if (!originMatches) reasons.push("origin does not match the expected HTTPS origin");
  return {
    currentCommit,
    expectedOrigin,
    candidateMatches,
    originMatches,
    runtimeClean,
    status: currentCommit === null || runtimeClean === null ? "unverified" :
      !candidateMatches ? "historical" : !originMatches ? "mismatched" :
        !runtimeClean ? "modified" : "current",
    reasons
  };
}

function expectedStatement(result, benchmark) {
  if (benchmark) {
    return result.modeledVerdict === "pass"
      ? "Under this fictionalized public-source lens, I would hire this person for a future materially similar role."
      : "Under this fictionalized public-source lens, I would not yet hire this person for a future materially similar role.";
  }
  return result.modeledVerdict === "pass"
    ? "Under this fictionalized public-source lens, I would hire this person for this job."
    : "Under this fictionalized public-source lens, I would not yet hire this person for this job.";
}

export function validateNamedReaderAcceptance(repoRoot, overrides = {}) {
  const config = overrides.config ?? readJson(repoRoot, configPath);
  const run = overrides.run ?? readJson(repoRoot, config.currentRunPath);
  const issues = [];
  const expectedOrigin = httpsOrigin(overrides.expectedOrigin ?? config.publicOrigin);
  if (expectedOrigin === null) {
    issues.push("Expected origin must be an HTTPS origin without credentials, a source path, query, or fragment.");
  }
  const currentness = receiptCurrentness(repoRoot, run, expectedOrigin);
  const pairs = new Map(config.readerOpportunityPairs.map((pair) => [pair.id, pair]));
  const results = new Map(run.results.map((result) => [result.pairId, result]));

  if (config.contract.publicOnly !== true) issues.push("Contract must remain public-only.");
  if (config.contract.actualPeopleParticipated !== false) {
    issues.push("Contract must record that the named people did not participate.");
  }
  if (run.actualPeopleParticipated !== false) {
    issues.push("Run must record that the named people did not participate.");
  }
  if (run.accessBoundary !== "public-web-only") {
    issues.push("Run access boundary must be public-web-only.");
  }
  if (run.publicOrigin !== config.publicOrigin || !run.publicOrigin.startsWith("https://")) {
    issues.push("Run public origin must match the HTTPS evaluation origin.");
  }
  if (!/^[0-9a-f]{40}$/.test(run.candidateCommit)) {
    issues.push("Run must bind to an exact 40-character candidate commit.");
  }
  if (privatePattern.test(JSON.stringify({ config, run }))) {
    issues.push("Eval contains a protected local path or source marker.");
  }

  for (const pair of config.readerOpportunityPairs) {
    const result = results.get(pair.id);
    if (!result) {
      issues.push(`Missing result for ${pair.id}.`);
      continue;
    }
    if (result.readerId !== pair.readerId || result.opportunityId !== pair.opportunityId) {
      issues.push(`Reader or opportunity mismatch for ${pair.id}.`);
    }
    if (!['pass', 'fail'].includes(result.modeledVerdict)) {
      issues.push(`Invalid modeled verdict for ${pair.id}.`);
    }
    if (result.acceptanceStatement !== expectedStatement(result, pair.benchmark === true)) {
      issues.push(`Acceptance statement does not match verdict for ${pair.id}.`);
    }
    if (!Array.isArray(result.pagesInspected) || result.pagesInspected.length === 0) {
      issues.push(`No public pages recorded for ${pair.id}.`);
    } else if (result.pagesInspected.some((url) => !/^https:\/\//.test(url))) {
      issues.push(`Non-public page recorded for ${pair.id}.`);
    }
  }

  for (const result of run.results) {
    if (!pairs.has(result.pairId)) issues.push(`Unexpected result ${result.pairId}.`);
  }

  const requiredPairs = config.readerOpportunityPairs.filter((pair) => pair.required);
  const passedPairCount = requiredPairs.filter(
    (pair) => results.get(pair.id)?.modeledVerdict === "pass"
  ).length;
  const expectedOverall =
    passedPairCount === requiredPairs.length && run.availability.gate === "pass"
      ? "pass"
      : "fail";
  if (run.requiredPairCount !== requiredPairs.length) issues.push("Required pair count is stale.");
  if (run.passedPairCount !== passedPairCount) issues.push("Passed pair count is stale.");
  if (run.overall !== expectedOverall) issues.push("Overall gate result is inconsistent.");

  return {
    config,
    run,
    issues,
    currentness,
    summary: {
      overall: expectedOverall,
      requiredPairCount: requiredPairs.length,
      passedPairCount,
      availabilityGate: run.availability.gate,
      gatePassed: issues.length === 0 && expectedOverall === "pass" && currentness.status === "current"
    }
  };
}
