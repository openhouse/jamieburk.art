#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  contractDigest,
  governedInputDigest,
  governedInputDigestAtCommit,
  loadCompositeRunRecords,
  loadEvalContract,
  promptDigest,
  repoRoot,
  runRecordDigest,
  scoreHoldout,
  validateCompositeRunRecord,
  validateRunSequence
} from "./lib/eval-contract.mjs";

const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, item, index, all) => {
  if (item.startsWith("--")) pairs.push([item.slice(2), all[index + 1]]);
  return pairs;
}, []));
for (const key of ["input", "prompt", "session"]) if (!args[key]) throw new Error(`--${key} is required`);

const git = (...values) => execFileSync("git", values, { cwd: repoRoot, encoding: "utf8" }).trim();
const contract = loadEvalContract();
const commit = git("rev-parse", "HEAD");
const tree = git("rev-parse", "HEAD^{tree}");
const currentDigest = governedInputDigest(contract);
const committedDigest = governedInputDigestAtCommit(commit, contract);
if (currentDigest !== committedDigest) throw new Error("Governed inputs differ from HEAD. Freeze the candidate before recording a holdout.");

const judgment = JSON.parse(readFileSync(path.resolve(args.input), "utf8"));
const previousRuns = loadCompositeRunRecords();
const previous = previousRuns.at(-1)?.record;
const iteration = (previous?.iteration ?? 0) + 1;
const label = String(judgment.judgeLabel ?? "").trim();
if (!label) throw new Error("Holdout input needs judgeLabel");
const record = {
  schemaVersion: "2.1.0",
  id: `composite-${contract.version}-${label}-${iteration}`,
  iteration,
  recordedAt: new Date().toISOString(),
  ...(previous ? { previousRunId: previous.id, previousRunDigest: previous.recordDigest } : {}),
  contract: { id: contract.id, version: contract.version, digest: contractDigest(contract) },
  candidate: { branch: git("branch", "--show-current"), commit, tree, governedInputDigest: committedDigest },
  commands: [{ command: "independent read-only holdout", exitCode: 0, status: "passed" }],
  judge: { class: "holdout", label, sessionId: args.session, independent: true, priorScoresVisible: false, promptPath: args.prompt, promptDigest: promptDigest(args.prompt) },
  criterionResults: judgment.criteria,
  blockingFindings: judgment.blockingFindings ?? [],
  decisionRecord: judgment.decisionRecord,
  openDisagreements: judgment.openDisagreements ?? [],
  overrides: [],
  reopenTriggersReviewed: [...contract.requiredReopenTriggers],
  decision: { status: "revision-required", weightedScore: 0, productionReady: false, externalGatesOpen: [...contract.requiredExternalGates] },
  summary: judgment.summary ?? ""
};
const scored = scoreHoldout(record);
if (scored.errors.length) throw new Error(scored.errors.join("\n"));
record.decision.weightedScore = scored.weightedScore;
record.decision.status = scored.scorePasses && judgment.acceptedForReview === true && record.blockingFindings.length === 0 ? "accepted-for-review" : "revision-required";
record.recordDigest = runRecordDigest(record);
const candidateRecords = [...previousRuns, { file: "pending holdout record", record }];
const recordErrors = [
  ...validateRunSequence(candidateRecords),
  ...validateCompositeRunRecord(record, { contract, contractId: contract.id, contractVersion: contract.version, contractDigest: contractDigest(contract), governedInputDigest: committedDigest })
];
if (recordErrors.length) throw new Error(`Refusing invalid holdout record:\n${recordErrors.join("\n")}`);
const outputPath = path.join(repoRoot, `evals/_shared/runs/${String(iteration).padStart(3, "0")}-${record.id}.json`);
mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(record, null, 2)}\n`);
console.log(`Recorded ${path.relative(repoRoot, outputPath)} (${record.decision.status}, ${scored.weightedScore}).`);
