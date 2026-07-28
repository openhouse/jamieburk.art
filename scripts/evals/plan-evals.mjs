#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
const policyPath = path.join(
  repoRoot,
  ".agents/evals/pre-launch-cost-policy.json"
);

function globToRegExp(pattern) {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replaceAll("**", "\u0000")
    .replaceAll("*", "[^/]*")
    .replaceAll("\u0000", ".*");
  return new RegExp(`^${escaped}$`);
}

export function planEvaluations({ files, policy }) {
  const matchedRules = policy.impactRules.filter((rule) =>
    files.some((file) =>
      rule.patterns.some((pattern) => globToRegExp(pattern).test(file))
    )
  );

  const required = new Set(["tier-0"]);
  for (const rule of matchedRules) {
    for (const tier of rule.requires) required.add(tier);
  }

  return {
    version: policy.version,
    changedFiles: [...files].sort(),
    matchedRules: matchedRules.map((rule) => rule.id),
    requiredTiers: policy.tiers
      .filter((tier) => required.has(tier.id))
      .map((tier) => ({
        id: tier.id,
        name: tier.name,
        cost: tier.cost,
        reason:
          tier.id === "tier-0"
            ? "deterministic baseline"
            : `required by ${matchedRules
                .filter((rule) => rule.requires.includes(tier.id))
                .map((rule) => rule.id)
                .join(", ")}`
      })),
    skippedTiers: policy.tiers
      .filter((tier) => tier.id !== "tier-3" && !required.has(tier.id))
      .map((tier) => ({
        id: tier.id,
        name: tier.name,
        reason: "no matching changed-path impact rule"
      })),
    humanGates: policy.tiers.find((tier) => tier.id === "tier-3").checks,
    cacheContract:
      "same candidate fingerprint + rubric digest + evaluator version + environment contract"
  };
}

function gitLines(args) {
  return execFileSync("git", args, { cwd: repoRoot, encoding: "utf8" })
    .split(/\r?\n/)
    .filter(Boolean);
}

function changedFiles(base) {
  return [
    ...new Set([
      ...gitLines(["diff", "--name-only", "--diff-filter=ACMR", `${base}...HEAD`]),
      ...gitLines(["diff", "--name-only", "--diff-filter=ACMR"]),
      ...gitLines(["diff", "--cached", "--name-only", "--diff-filter=ACMR"]),
      ...gitLines(["ls-files", "--others", "--exclude-standard"])
    ])
  ];
}

function parseArgs(argv) {
  const options = { base: "origin/develop", json: false };
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === "--base") {
      options.base = argv[index + 1];
      index += 1;
    } else if (argv[index] === "--json") {
      options.json = true;
    } else {
      throw new Error(`Unknown argument: ${argv[index]}`);
    }
  }
  return options;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const options = parseArgs(process.argv.slice(2));
  const policy = JSON.parse(readFileSync(policyPath, "utf8"));
  const plan = planEvaluations({
    files: changedFiles(options.base),
    policy
  });

  if (options.json) {
    process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
  } else {
    console.log(`Changed files: ${plan.changedFiles.length}`);
    console.log(`Matched rules: ${plan.matchedRules.join(", ") || "none"}`);
    for (const tier of plan.requiredTiers) {
      console.log(`RUN  ${tier.id} (${tier.cost}): ${tier.reason}`);
    }
    for (const tier of plan.skippedTiers) {
      console.log(`SKIP ${tier.id}: ${tier.reason}`);
    }
    console.log(
      `Human gates remain: ${plan.humanGates.join(", ")}`
    );
  }
}
