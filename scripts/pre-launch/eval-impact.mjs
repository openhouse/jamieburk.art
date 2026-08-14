import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const contractPath = path.join(repoRoot, "evals/pre-launch/evaluation-budget.json");

export function globToRegExp(glob) {
  const escaped = glob
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replaceAll("**", "\u0000")
    .replaceAll("*", "[^/]*")
    .replaceAll("\u0000", ".*");
  return new RegExp(`^${escaped}$`);
}

export function calculateImpact(changedPaths, contract) {
  const domains = contract.domains
    .filter((domain) =>
      changedPaths.some((changedPath) =>
        domain.patterns.some((pattern) => globToRegExp(pattern).test(changedPath))
      )
    )
    .map((domain) => domain.id);

  const commands = [];
  for (const domain of contract.domains) {
    if (!domains.includes(domain.id)) continue;
    for (const command of domain.commands) {
      if (!commands.includes(command)) commands.push(command);
    }
  }

  return {
    changedPaths,
    domains,
    deterministicCommands: commands,
    semanticPanelsDeferred: changedPaths.length > 0,
    semanticCommands: contract.finalSemanticPanels.commands,
    invalidatesPriorCandidateEvidence: changedPaths.length > 0
  };
}

function parseArgs(argv) {
  const args = { base: "origin/develop", json: false, paths: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--base") args.base = argv[++index];
    else if (value === "--json") args.json = true;
    else if (value === "--path") args.paths.push(argv[++index]);
    else throw new Error(`Unknown argument: ${value}`);
  }
  return args;
}

function lines(output) {
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function changedPathsFromGit(base, run = execFileSync) {
  const options = { cwd: repoRoot, encoding: "utf8" };
  const committed = run(
    "git",
    ["diff", "--name-only", "--diff-filter=ACMRD", `${base}...HEAD`],
    options
  );
  const workingTree = run(
    "git",
    ["diff", "--name-only", "--diff-filter=ACMRD", "HEAD"],
    options
  );
  const untracked = run(
    "git",
    ["ls-files", "--others", "--exclude-standard"],
    options
  );
  return [
    ...new Set([
      ...lines(committed),
      ...lines(workingTree),
      ...lines(untracked)
    ])
  ].sort();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = parseArgs(process.argv.slice(2));
  const contract = JSON.parse(readFileSync(contractPath, "utf8"));
  const changedPaths = args.paths.length > 0 ? args.paths : changedPathsFromGit(args.base);
  const impact = calculateImpact(changedPaths, contract);

  if (args.json) {
    process.stdout.write(`${JSON.stringify(impact, null, 2)}\n`);
  } else {
    console.log(`Changed paths: ${impact.changedPaths.length}`);
    console.log(`Affected domains: ${impact.domains.join(", ") || "none"}`);
    console.log("Deterministic inner-loop commands:");
    for (const command of impact.deterministicCommands) console.log(`- ${command}`);
    console.log("Semantic panels: deferred until the final unchanged candidate");
    for (const command of impact.semanticCommands) console.log(`- ${command}`);
  }
}
