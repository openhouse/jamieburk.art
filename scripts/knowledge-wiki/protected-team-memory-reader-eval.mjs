#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defaultRepoRoot } from "./lib.mjs";

export const contractPath =
  "evals/knowledge-wiki/protected-team-memory-reader.json";

const prohibitedPublicPattern =
  /(?:private-call participant|protected collaborator|private company|pricing|fixed fee|\/Users\/|\/Volumes\/|Mobile Documents|Library\/CloudStorage)/i;
const falseOutcomePattern =
  /(?:completed|delivered|deployed|adopted|hired|contracted).{0,80}(?:team memory|memory sprint|engagement|pilot)/i;

function hasAll(source, patterns) {
  return patterns.every((pattern) => pattern.test(source));
}

export function evaluateProtectedTeamMemoryProposal({ contract, pageSource, supportingCopy }) {
  const publicCopy = `${pageSource}\n${supportingCopy}`.replace(/\s+/g, " ");
  const diagnosisIndex = publicCopy.search(/Start with the operating problem/i);
  const preservationIndex = publicCopy.search(
    /Then preserve what must continue/i
  );
  const checks = {
    simulated_reader_disclaimed:
      /Simulated protected-reader analytical lens/.test(
        contract?.judge?.disclaimer ?? ""
      ) &&
      /not a quote, endorsement, participation claim, prediction, or actual hiring decision by the real person/i.test(
        contract?.judge?.disclaimer ?? ""
      ),
    judge_uses_public_surface_only:
      contract?.sourceBoundary?.rawTranscriptProvidedToJudge === false &&
      contract?.sourceBoundary?.publicSafeScenarioOnly === true &&
      contract?.judge?.prohibitedInputs?.includes("private transcripts") &&
      contract?.judge?.prohibitedInputs?.includes("repository source"),
    scenario_is_problem_first: hasAll(publicCopy, [
      /(?:team|collaborators).{0,100}(?:grows|growing|hiring|join)/i,
      /(?:ideas|decisions).{0,120}(?:context|reasoning)/i,
      /(?:lost|flattened|disappear|re-explained|repeated explanation)/i
    ]),
    diagnosis_precedes_memory_system:
      diagnosisIndex >= 0 &&
      preservationIndex > diagnosisIndex &&
      hasAll(publicCopy, [
        /(?:priorities|priority).{0,100}(?:owner|ownership)|(?:owner|ownership).{0,100}(?:priorities|priority)/i,
        /(?:blocked|risky).{0,60}(?:decision|handoff)|(?:decision|handoff).{0,60}(?:blocked|risky)/i,
        /do not assume.{0,80}(?:wiki|knowledge platform)/i,
        /(?:stabilize|operating loop)/i
      ]),
    first_engagement_is_focused: hasAll(publicCopy, [
      /(?:choose|use|select).{0,30}(?:one|single).{0,30}(?:approved|permissioned|non-sensitive|representative).{0,60}(?:source|source surface)/i,
      /(?:short|1.?2 week|two-week).{0,80}(?:paid )?(?:discovery|prototype|sprint)/i,
      /(?:working session|knowledge-friction map)/i
    ]),
    contribution_preservation_is_explicit: hasAll(publicCopy, [
      /(?:preserve|retain|keep).{0,100}(?:ideas|contributions)/i,
      /(?:open|unresolved).{0,60}(?:questions|ideas)/i,
      /(?:flag|review|correct)/i
    ]),
    generic_summary_is_not_the_offer: hasAll(publicCopy, [
      /(?:not|more than).{0,50}(?:summary|summaries|notes)/i,
      /source-(?:linked|backed)/i,
      /human-(?:reviewed|correctable)/i
    ]),
    outputs_and_decision_are_concrete: hasAll(publicCopy, [
      /knowledge-friction map/i,
      /(?:prototype|memory structure)/i,
      /(?:continue|revise).{0,30}(?:stop)/i
    ]),
    public_copy_preserves_private_boundary: !prohibitedPublicPattern.test(
      publicCopy
    ),
    public_copy_does_not_claim_outcome: !falseOutcomePattern.test(publicCopy),
    judge_requires_calibration:
      contract?.judge?.calibration?.status === "required" &&
      contract?.judge?.calibration?.minimumHumanLabeledPassExamples >= 20 &&
      contract?.judge?.calibration?.minimumHumanLabeledFailExamples >= 20 &&
      contract?.judge?.calibration?.releaseAuthority ===
        "advisory-until-calibrated"
  };

  const failures = Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([id]) => id);

  return {
    checks,
    failures,
    deterministicVerdict: failures.length === 0 ? "pass" : "fail",
    judgeStatus:
      failures.length === 0 ? "ready-for-modeled-review" : "preflight-blocked"
  };
}

export function evaluateRepository(repoRoot = defaultRepoRoot) {
  const contract = JSON.parse(
    readFileSync(path.join(repoRoot, contractPath), "utf8")
  );
  const pageSource = readFileSync(
    path.join(repoRoot, contract.targetPath),
    "utf8"
  );
  const supportingCopy = readFileSync(
    path.join(repoRoot, contract.supportingPublicCopyPath),
    "utf8"
  );
  return evaluateProtectedTeamMemoryProposal({ contract, pageSource, supportingCopy });
}

const isCli =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
  const result = evaluateRepository();
  if (result.failures.length) {
    console.error("Protected team-memory reader scenario preflight failed:");
    for (const failure of result.failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log(
    "Protected team-memory reader scenario preflight passed; calibrated modeled review remains a separate gate."
  );
}
