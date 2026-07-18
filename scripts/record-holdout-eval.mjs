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
for (const key of ["input", "prompt"]) if (!args[key]) throw new Error(`--${key} is required`);

const git = (...values) => execFileSync("git", values, { cwd: repoRoot, encoding: "utf8" }).trim();
const contract = loadEvalContract();
const commit = git("rev-parse", "HEAD");
const tree = git("rev-parse", "HEAD^{tree}");
const currentDigest = governedInputDigest(contract);
const committedDigest = governedInputDigestAtCommit(commit, contract);
if (currentDigest !== committedDigest) throw new Error("Governed inputs differ from HEAD. Freeze the candidate before recording a holdout.");

const judgment = JSON.parse(readFileSync(path.resolve(args.input), "utf8"));
const provenance = judgment.reviewerProvenance;
if (!provenance || provenance.reviewerClass !== "model-context" || !provenance.provider?.trim()) throw new Error("Holdout input needs explicit model-context reviewer provenance");
if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(provenance.sessionId ?? "")) throw new Error("Holdout provenance needs a stable reviewer session UUID");
if (args.session && args.session !== provenance.sessionId) throw new Error("CLI session disagrees with reviewer provenance");
if (provenance.candidateCommit !== commit) throw new Error("Reviewer provenance does not name the frozen candidate commit");
if (provenance.promptPath !== args.prompt) throw new Error("Reviewer provenance does not name the governed prompt");
for (const field of ["priorScoresVisible", "runRecordsInspected", "generatedReportsInspected", "editsMade"]) {
  if (provenance[field] !== false) throw new Error(`Reviewer provenance requires ${field}=false`);
}
if (!Number.isFinite(Date.parse(provenance.attestedAt ?? ""))) throw new Error("Reviewer provenance needs an attestedAt timestamp");
if (judgment.openDisagreements && JSON.stringify(judgment.openDisagreements) !== JSON.stringify(judgment.decisionRecord?.openDisagreements)) throw new Error("Top-level disagreements disagree with the decision record");
if (judgment.overrides && JSON.stringify(judgment.overrides) !== JSON.stringify(judgment.decisionRecord?.overrides)) throw new Error("Top-level overrides disagree with the decision record");
const previousRuns = loadCompositeRunRecords();
const previous = previousRuns.at(-1)?.record;
const iteration = (previous?.iteration ?? 0) + 1;
const label = String(judgment.judgeLabel ?? "").trim();
if (!label) throw new Error("Holdout input needs judgeLabel");
const record = {
  schemaVersion: "2.2.0",
  id: `composite-${contract.version}-${label}-${iteration}`,
  iteration,
  recordedAt: new Date().toISOString(),
  ...(previous ? { previousRunId: previous.id, previousRunDigest: previous.recordDigest } : {}),
  contract: { id: contract.id, version: contract.version, digest: contractDigest(contract) },
  candidate: { branch: git("branch", "--show-current"), commit, tree, governedInputDigest: committedDigest },
  commands: [{ command: "independent read-only holdout", exitCode: 0, status: "passed" }],
  judge: {
    class: "holdout",
    label,
    sessionId: provenance.sessionId,
    reviewerClass: provenance.reviewerClass,
    provider: provenance.provider,
    independent: provenance.runRecordsInspected === false && provenance.generatedReportsInspected === false && provenance.editsMade === false,
    priorScoresVisible: provenance.priorScoresVisible,
    promptPath: args.prompt,
    promptDigest: promptDigest(args.prompt),
    attestation: {
      candidateCommit: provenance.candidateCommit,
      promptPath: provenance.promptPath,
      runRecordsInspected: provenance.runRecordsInspected,
      generatedReportsInspected: provenance.generatedReportsInspected,
      editsMade: provenance.editsMade,
      attestedAt: provenance.attestedAt
    }
  },
  criterionResults: judgment.criteria,
  blockingFindings: judgment.blockingFindings ?? [],
  decisionRecord: judgment.decisionRecord,
  openDisagreements: [...(judgment.decisionRecord?.openDisagreements ?? [])],
  overrides: [...(judgment.decisionRecord?.overrides ?? [])],
  reopenTriggersReviewed: [...(judgment.decisionRecord?.reopenTriggersConsidered ?? [])],
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
