import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { z } from "zod";

export const defaultRepoRoot = path.resolve(import.meta.dirname, "../..");

const domainSchema = z.object({
  id: z.string().min(1),
  pathPatterns: z.array(z.string().min(1)).min(1),
  iterationCommands: z.array(z.string().min(1)).min(1),
  forcesFullSuite: z.boolean().default(false)
});

export const preLaunchSuiteSchema = z.object({
  suiteId: z.literal("resource-aware-pre-launch"),
  version: z.number().int().positive(),
  baseRef: z.string().min(1),
  principles: z.array(z.string().min(1)).min(1),
  domains: z.array(domainSchema).min(1),
  candidateLock: z.object({
    requiredCommands: z.array(z.string().min(1)).min(1),
    cleanWorktreeRequiredForReceipt: z.literal(true),
    candidateAffectingChangeInvalidatesReceipt: z.literal(true)
  }),
  modelHoldouts: z.object({
    allowedStates: z.array(z.string().min(1)).min(1),
    passRequiresExactCandidateBinding: z.literal(true),
    passRequiresExactContractBinding: z.literal(true),
    passRequiresExactEvidenceBinding: z.literal(true),
    consecutiveUnchangedPasses: z.number().int().min(2),
    blockedStatesCannotPass: z.array(z.string().min(1)).min(1)
  }),
  releaseObservation: z.object({
    required: z.array(z.string().min(1)).min(1)
  })
});

export function loadSuite(repoRoot = defaultRepoRoot) {
  const source = readFileSync(
    path.join(repoRoot, "evals/pre-launch/suite.json"),
    "utf8"
  );
  return {
    suite: preLaunchSuiteSchema.parse(JSON.parse(source)),
    contractSha256: createHash("sha256").update(source).digest("hex")
  };
}

function commandTargetExists(command, repoRoot) {
  const npmMatch = command.match(/^npm run ([a-zA-Z0-9:_-]+)(?:\s|$)/);
  if (npmMatch) {
    const packageJson = JSON.parse(
      readFileSync(path.join(repoRoot, "package.json"), "utf8")
    );
    return Boolean(packageJson.scripts?.[npmMatch[1]]);
  }

  const nodeMatch = command.match(/^node(?: --test)? ([^\s*]+)$/);
  if (nodeMatch) {
    return existsSync(path.join(repoRoot, nodeMatch[1]));
  }

  return false;
}

export function evaluatePreLaunchSuite(suite, repoRoot = defaultRepoRoot) {
  const errors = [];
  const domainIds = suite.domains.map((domain) => domain.id);
  if (new Set(domainIds).size !== domainIds.length) {
    errors.push("pre-launch domain IDs must be unique");
  }
  for (const domain of suite.domains) {
    for (const pattern of domain.pathPatterns) {
      try {
        new RegExp(pattern);
      } catch {
        errors.push(`${domain.id} contains an invalid path pattern`);
      }
    }
  }
  for (const command of ["npm run check", "npm run build"]) {
    if (!suite.candidateLock.requiredCommands.includes(command)) {
      errors.push(`candidate lock must retain ${command}`);
    }
  }
  const declaredCommands = new Set([
    ...suite.domains.flatMap((domain) => domain.iterationCommands),
    ...suite.candidateLock.requiredCommands
  ]);
  for (const command of declaredCommands) {
    if (!commandTargetExists(command, repoRoot)) {
      errors.push(`declared command is not executable from the repository root: ${command}`);
    }
  }
  for (const state of ["blocked-budget", "blocked-access", "missing", "stale"]) {
    if (!suite.modelHoldouts.blockedStatesCannotPass.includes(state)) {
      errors.push(`${state} must remain a non-passing holdout state`);
    }
  }
  if (suite.modelHoldouts.blockedStatesCannotPass.includes("pass")) {
    errors.push("pass cannot be listed as a blocked holdout state");
  }
  return { errors };
}

export function planChangedPaths(changedPaths, suite) {
  const domainIds = new Set();
  const commands = [];
  let unknownPathForcesFullSuite = false;
  let configuredDomainForcesFullSuite = false;
  const pathDispositions = changedPaths.map((changedPath) => {
    const matches = suite.domains.filter((domain) =>
      domain.pathPatterns.some((pattern) =>
        new RegExp(pattern).test(changedPath)
      )
    );
    if (matches.length === 0) unknownPathForcesFullSuite = true;
    for (const domain of matches) {
      domainIds.add(domain.id);
      configuredDomainForcesFullSuite ||= domain.forcesFullSuite;
      for (const command of domain.iterationCommands) {
        if (!commands.includes(command)) commands.push(command);
      }
    }
    return {
      path: changedPath,
      domains: matches.map((domain) => domain.id),
      disposition: matches.length ? "matched" : "full-suite-fallback"
    };
  });

  const fullSuiteRequired =
    unknownPathForcesFullSuite || configuredDomainForcesFullSuite;
  return {
    changedPaths: [...changedPaths],
    domains: [...domainIds],
    iterationCommands: fullSuiteRequired
      ? [...new Set([...commands, ...suite.candidateLock.requiredCommands])]
      : commands,
    candidateLockCommands: suite.candidateLock.requiredCommands,
    fullSuiteRequired,
    reasons: [
      ...(unknownPathForcesFullSuite
        ? ["At least one changed path has no configured domain."]
        : []),
      ...(configuredDomainForcesFullSuite
        ? ["A changed governance or deployment domain requires the full suite."]
        : [])
    ],
    pathDispositions
  };
}

export function evaluateHoldoutReceipt(receipt, suite) {
  if (!suite.modelHoldouts.allowedStates.includes(receipt.state)) {
    return { pass: false, reason: `Unknown holdout state: ${receipt.state}` };
  }
  if (suite.modelHoldouts.blockedStatesCannotPass.includes(receipt.state)) {
    return { pass: false, reason: `Holdout is ${receipt.state}.` };
  }
  if (receipt.state !== "pass") {
    return { pass: false, reason: `Holdout state is ${receipt.state}.` };
  }
  const bindings = [
    ["candidate", receipt.candidateSha256],
    ["contract", receipt.contractSha256],
    ["evidence", receipt.evidenceSha256]
  ];
  const missing = bindings.find(
    ([_label, value]) => !/^[a-f0-9]{64}$/.test(value ?? "")
  );
  if (missing) {
    return {
      pass: false,
      reason: `Holdout lacks an exact ${missing[0]} binding.`
    };
  }
  if (
    receipt.consecutiveUnchangedPasses <
    suite.modelHoldouts.consecutiveUnchangedPasses
  ) {
    return {
      pass: false,
      reason: "Holdout has not reached the consecutive unchanged-pass criterion."
    };
  }
  return { pass: true, reason: "Exact bindings and pass stability are present." };
}

export function hashChangedContents(repoRoot, changedPaths) {
  const hash = createHash("sha256");
  for (const changedPath of [...changedPaths].sort()) {
    hash.update(changedPath);
    try {
      hash.update(readFileSync(path.join(repoRoot, changedPath)));
    } catch {
      hash.update("<deleted-or-unavailable>");
    }
  }
  return hash.digest("hex");
}
