#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import matter from "gray-matter";

import { defaultRepoRoot } from "./lib.mjs";
import { evaluatePublicResumeSelection } from "../resumes/evaluate-public-resume-selection.mjs";

export const namedHiringSuitePath = "evals/knowledge-wiki/named-hiring-readers.json";

const protectedPathPattern = /(?:\/Users\/|\/Volumes\/|Mobile Documents|Library\/CloudStorage|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;

function readJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

export function loadNamedHiringSuite(repoRoot = defaultRepoRoot) {
  return readJson(repoRoot, namedHiringSuitePath);
}

export function loadNamedHiringRun(repoRoot = defaultRepoRoot, runPath) {
  const suite = loadNamedHiringSuite(repoRoot);
  return readJson(repoRoot, runPath ?? suite.latestRunPath);
}

export function validateNamedHiringRun({ repoRoot = defaultRepoRoot, suite, run }) {
  const issues = [];
  const add = (condition, message) => {
    if (!condition) issues.push(message);
  };

  add(suite?.version === 1, "suite version must be 1");
  add(suite?.acceptanceGate === "I would hire this person for this job", "acceptance gate changed");
  add(suite?.passPolicy?.allEvaluationsMustPass === true, "all evaluations must pass");
  add(suite?.passPolicy?.averagingAllowed === false, "verdicts cannot be averaged");
  add(suite?.execution?.oneSandboxedTaskPerNamedPerson === true, "one sandboxed task per person is required");
  add(suite?.execution?.tasksRunSequentially === true, "named reader tasks must run sequentially");
  add(suite?.execution?.publicWebOnly === true, "judges must receive public web only");
  add(suite?.execution?.repositoryOrWikiAccessForJudges === false, "judges cannot receive repository or Wiki access");
  add(suite?.execution?.priorJudgeOutputVisible === false, "judges cannot see prior judge output");

  const registryGates = Array.isArray(suite?.opportunityReaders) ? suite.opportunityReaders : [];
  const registryGateIds = registryGates.map((gate) => gate.id);
  const selection = evaluatePublicResumeSelection({ root: repoRoot });
  const selectedGateIds = selection.llmGate.queue.map((entry) => entry.gateId);
  const selectedGateSet = new Set(selectedGateIds);
  const gates = registryGates.filter((gate) => selectedGateSet.has(gate.id));
  const gateIds = gates.map((gate) => gate.id);
  add(registryGates.length > 0, "suite must define opportunity readers");
  add(new Set(registryGateIds).size === registryGateIds.length, "registry gate ids must be unique");
  add(suite?.execution?.deterministicPreflightRequired === true, "deterministic preflight is required");
  add(selection.overall === "pass", "public resume selection must pass before named-reader work");
  add(selection.llmGate.allowed === true, "deterministic gate must release the reader queue");
  add(gates.length === selectedGateIds.length, "selected reader queue is not fully represented in the registry");

  for (const gate of registryGates) {
    for (const [key, label] of [
      ["readerPath", "reader profile"],
      ["opportunityPath", "opportunity record"]
    ]) {
      add(
        typeof gate[key] === "string" && existsSync(path.join(repoRoot, gate[key])),
        `${gate.id} ${label} must exist`
      );
    }
    add(Array.isArray(gate.requiredRoutes) && gate.requiredRoutes.length >= 5, `${gate.id} needs public route coverage`);
    if (typeof gate.readerPath === "string" && existsSync(path.join(repoRoot, gate.readerPath))) {
      const reader = matter(readFileSync(path.join(repoRoot, gate.readerPath), "utf8")).data;
      add(reader.id === gate.readerId, `${gate.id} reader id does not match profile`);
      add(/Simulated/.test(reader.disclaimer ?? ""), `${gate.id} reader profile lacks simulation disclaimer`);
      add(
        Array.isArray(reader.prohibitedAssumptions) && reader.prohibitedAssumptions.length >= 2,
        `${gate.id} reader profile needs prohibited assumptions`
      );
      add(
        (reader.publicSources ?? []).every((url) => /^https:\/\//.test(url)),
        `${gate.id} reader sources must be public HTTPS URLs`
      );
    }
  }

  add(run?.schemaVersion === 1, "run schema version must be 1");
  add(run?.suiteId === suite?.id, "run suite id must match contract");
  add(/^[0-9a-f]{40}$/.test(run?.evaluatedGitRev ?? ""), "evaluated Git revision must be a full SHA");
  add(/^https:\/\//.test(run?.evaluatedUrl ?? ""), "evaluated URL must be public HTTPS");
  add(/^[0-9a-f]{64}$/.test(run?.portfolioSnapshotHash ?? ""), "portfolio snapshot hash must be SHA-256");
  add(run?.allMustPass === true, "run must preserve all-must-pass policy");
  add(!protectedPathPattern.test(JSON.stringify(run)), "run contains a protected local path or secret marker");

  const publicReportPath = "reports/hiring-acceptance-public.json";
  if (existsSync(path.join(repoRoot, publicReportPath))) {
    const publicReport = readJson(repoRoot, publicReportPath);
    add(
      run?.portfolioSnapshotHash === publicReport?.portfolioSnapshotHash,
      "run portfolio snapshot does not match the current public hiring surface"
    );
  }

  const results = Array.isArray(run?.results) ? run.results : [];
  const resultIds = results.map((result) => result.gateId);
  add(results.length === gates.length, "run must contain exactly one result per selected opportunity-reader gate");
  add(new Set(resultIds).size === resultIds.length, "run result gate ids must be unique");
  add(gateIds.every((id) => resultIds.includes(id)), "run is missing a selected opportunity-reader gate");
  add(resultIds.every((id) => gateIds.includes(id)), "run contains an unselected opportunity-reader gate");

  for (const result of results) {
    add(["pass", "fail"].includes(result.verdict), `${result.gateId} verdict must be pass or fail`);
    const expectedStatement =
      result.verdict === "pass"
        ? "I would hire this person for this job"
        : "I would not yet hire this person for this job";
    add(result.acceptanceStatement === expectedStatement, `${result.gateId} acceptance statement contradicts verdict`);
    add(
      typeof result.confidence === "number" && result.confidence >= 0 && result.confidence <= 1,
      `${result.gateId} confidence must be between 0 and 1`
    );
    add(
      result.verdict === "pass" || (typeof result.primaryBlocker === "string" && result.primaryBlocker.length > 0),
      `${result.gateId} failure must name a blocker`
    );
    add(typeof result.gapClass === "string" && result.gapClass.length > 0, `${result.gateId} must classify the gap`);
  }

  const passCount = results.filter((result) => result.verdict === "pass").length;
  const failCount = results.length - passCount;
  const expectedSuiteVerdict = failCount === 0 ? "pass" : "fail";
  add(run?.evaluationCount === results.length, "evaluation count is stale");
  add(run?.uniqueReaderCount === new Set(gates.map((gate) => gate.readerId)).size, "unique reader count is stale");
  add(run?.passCount === passCount, "pass count is stale");
  add(run?.failCount === failCount, "fail count is stale");
  add(run?.suiteVerdict === expectedSuiteVerdict, "suite verdict is stale or averaged");

  const liveResults = results;

  return {
    issues,
    summary: {
      passCount,
      failCount,
      evaluationCount: results.length,
      livePassCount: liveResults.filter((result) => result.verdict === "pass").length,
      liveEvaluationCount: liveResults.length,
      suiteVerdict: expectedSuiteVerdict
    }
  };
}

function cliArgs(argv) {
  const runIndex = argv.indexOf("--run");
  return {
    strict: argv.includes("--strict"),
    runPath: runIndex >= 0 ? argv[runIndex + 1] : undefined
  };
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const args = cliArgs(process.argv.slice(2));
  const suite = loadNamedHiringSuite();
  const run = loadNamedHiringRun(defaultRepoRoot, args.runPath);
  const validation = validateNamedHiringRun({ suite, run });
  if (validation.issues.length) {
    console.error("Named hiring-reader eval validation failed:");
    for (const issue of validation.issues) console.error(`- ${issue}`);
    process.exit(1);
  }
  console.log(
    `Named hiring-reader artifact valid: ${validation.summary.passCount}/${validation.summary.evaluationCount} gates pass; suite ${validation.summary.suiteVerdict}.`
  );
  if (args.strict && validation.summary.suiteVerdict !== "pass") process.exit(1);
}
