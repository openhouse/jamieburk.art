import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  evaluateTeamMemoryCaseStudy,
  loadTeamMemoryCaseStudyCandidate,
  repoRoot
} from "./team-memory-case-study-eval.mjs";

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

export function assertPublicSafeCaseStudyResult(result, protectedTerms = []) {
  const serialized = JSON.stringify(result);
  const leakedTerm = protectedTerms
    .filter(Boolean)
    .find((term) => serialized.toLowerCase().includes(term.toLowerCase()));
  if (leakedTerm) {
    throw new Error("The model result repeats a protected runtime identity term.");
  }
  if (/(?:[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}|https?:\/\/|\/Users\/|\/Volumes\/|Mobile Documents|otter\.ai)/i.test(serialized)) {
    throw new Error("The model result exposes a private locator or identifying artifact.");
  }
}

function main() {
  const metadataPath = arg("--metadata");
  const resultPath = arg("--result");
  if (!metadataPath || !resultPath) {
    throw new Error(
      "Usage: node record-team-memory-case-study-run.mjs --metadata <private metadata> --result <model result>"
    );
  }

  const protectedTerms = (
    process.env.TEAM_MEMORY_CASE_STUDY_PROTECTED_TERMS ?? ""
  )
    .split("|")
    .filter(Boolean);
  const candidate = loadTeamMemoryCaseStudyCandidate();
  const metadata = JSON.parse(readFileSync(metadataPath, "utf8"));
  const result = JSON.parse(readFileSync(resultPath, "utf8"));
  assertPublicSafeCaseStudyResult(result, protectedTerms);

  const run = {
    id: "team-memory-anonymized-case-study-reader-2026-08-21",
    schemaVersion: 1,
    status: "complete",
    evaluatedAt: new Date().toISOString(),
    reviewMethod: "independent-source-informed-model-review",
    independentReview: true,
    ...metadata,
    result,
    boundary:
      "This is an advisory source-informed model simulation. The actual source participant did not participate, review, approve, or endorse the packet. Human accuracy and publication review remain pending."
  };
  const evaluated = evaluateTeamMemoryCaseStudy({ ...candidate, run });
  if (!evaluated.passed) {
    throw new Error(`Result cannot be recorded:\n${evaluated.failures.join("\n")}`);
  }
  writeFileSync(
    path.join(repoRoot, candidate.config.currentRunPath),
    `${JSON.stringify(run, null, 2)}\n`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
