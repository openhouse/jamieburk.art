#!/usr/bin/env node

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

import { defaultRepoRoot } from "./lib.mjs";

export const contractPath =
  "evals/knowledge-wiki/team-memory-forwarded-hiring.json";

const expectedInputs = [
  "case-studies/2026-08-21/source-backed-team-memory/01-technical-leader-perspective.md",
  "case-studies/2026-08-21/source-backed-team-memory/03-technical-leader-conversational-voice.md"
];

function hasAll(source, patterns) {
  return patterns.every((pattern) => pattern.test(source));
}

const requiredUnestablishedFeedback = [
  "link-opened",
  "page-read",
  "proposal-assessed",
  "internal-forward",
  "present-organizational-need",
  "budget-authority",
  "hiring-intent",
  "commercial-authorization",
  "engagement-accepted"
];

const privateFeedbackMarker =
  /(?:message|email|transcript)_(?:body|excerpt)|(?:collaborator|company)_identity|private_(?:path|family_circumstances)|bereavement|funeral|health_details|personal_address/i;

export function evaluateForwardedHiringScenario({
  contract,
  pageSource,
  opportunitySource = "",
  protectedSource = ""
}) {
  const publicPage = pageSource.replace(/\s+/g, " ");
  const diagnosisIndex = publicPage.search(/Start with the operating problem/i);
  const preservationIndex = publicPage.search(
    /Then preserve what must continue/i
  );
  const allowedInputs = contract?.judge?.allowedArtifactInputs ?? [];
  const prohibitedInputs = contract?.judge?.prohibitedInputs ?? [];
  const opportunity = opportunitySource
    ? matter(opportunitySource).data
    : {};
  const protectedSourceRecord = protectedSource
    ? matter(protectedSource).data
    : {};
  const responseState = opportunity?.response_state ?? {};
  const realWorldFeedback = contract?.realWorldFeedback ?? {};
  const feedbackUnknowns = new Set(realWorldFeedback.notEstablished ?? []);
  const responseUnknowns = new Set(responseState.not_established ?? []);
  const decisionJudge = contract?.judges?.find(
    (judge) => judge.id === "decision-maker-hire-gate"
  );

  const checks = {
    judge_input_boundary_is_exact:
      JSON.stringify(allowedInputs) === JSON.stringify(expectedInputs) &&
      contract?.judge?.repositoryAccess === false &&
      prohibitedInputs.includes("repository source") &&
      prohibitedInputs.includes("raw or working transcripts") &&
      prohibitedInputs.includes("Jamie-perspective case-study document"),
    navigation_begins_at_public_team_memory:
      contract?.site?.startPath === "/lab/source-backed-team-memory" &&
      contract?.site?.judgeDelivery === "harness-captured-local-render" &&
      contract?.judge?.navigation?.mustBeginAtStartPath === true &&
      contract?.judge?.navigation?.publicRoutesOnly === true &&
      contract?.judge?.navigation?.judgeReceivesHarnessCapturedRenderings ===
        true,
    forwardable_decision_brief: hasAll(publicPage, [
      /Internal decision brief/i,
      /When a team grows faster than its context can travel/i,
      /Continue, revise, or stop/i
    ]),
    diagnosis_and_stabilization_precede_memory:
      diagnosisIndex >= 0 &&
      preservationIndex > diagnosisIndex &&
      hasAll(publicPage, [
        /(?:priorities|priority).{0,100}(?:owner|ownership)|(?:owner|ownership).{0,100}(?:priorities|priority)/i,
        /(?:blocked|risky).{0,60}(?:decision|handoff)|(?:decision|handoff).{0,60}(?:blocked|risky)/i,
        /do not assume.{0,80}(?:wiki|knowledge platform)/i,
        /Make one operating loop usable/i
      ]),
    focused_paid_engagement_is_explicit: hasAll(publicPage, [
      /short paid diagnostic and implementation sprint/i,
      /one working session/i,
      /choose one approved, non-sensitive or representative source/i
    ]),
    team_attention_is_explicit: hasAll(publicPage, [
      /one team-side owner/i,
      /one (?:working|review) session/i,
      /one approved, non-sensitive or representative source/i
    ]),
    jamie_responsibility_is_explicit: hasAll(publicPage, [
      /Jamie(?:'|’|&apos;)s part/i,
      /map the knowledge friction/i,
      /build one reviewable source-to-memory loop/i
    ]),
    why_jamie_is_explicit: hasAll(publicPage, [
      /Why Jamie/i,
      /technical project management/i,
      /facilitation/i,
      /documentation architecture/i,
      /implementation/i,
      /governance/i
    ]),
    success_and_pre_kickoff_are_explicit: hasAll(publicPage, [
      /Success questions/i,
      /correct the record/i,
      /answer agreed questions from linked sources/i,
      /Before kickoff/i,
      /fee, confidentiality, ownership, source authority/i,
      /retention, internal owner, and final success criteria/i
    ]),
    generic_summary_is_differentiated: hasAll(publicPage, [
      /more than an AI summary/i,
      /linked to sources/i,
      /human review and correction/i
    ]),
    resume_is_one_click_away:
      /href=\{site\.resumePath\}/.test(pageSource) &&
      contract?.site?.resumePath ===
        "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf",
    contact_is_one_click_away: /href=\{site\.emailHref\}/.test(pageSource),
    binary_hiring_decision_is_strict:
      JSON.stringify(decisionJudge?.verdicts) ===
        JSON.stringify(["hire", "pass"]) &&
      decisionJudge?.allCriteriaMustPass === true &&
      decisionJudge?.outputOrder?.[0] === "critique",
    modeled_result_is_advisory:
      contract?.calibration?.status === "required" &&
      contract?.calibration?.minimumHumanLabeledHireExamples >= 20 &&
      contract?.calibration?.minimumHumanLabeledPassExamples >= 20 &&
      contract?.calibration?.releaseAuthority === "advisory-only" &&
      contract?.calibration?.realWorldDecisionClaimed === false,
    real_world_feedback_is_summary_only:
      opportunity?.visibility === "summary-only" &&
      protectedSourceRecord?.visibility === "summary-only" &&
      responseState?.evidence_class === "protected-summary" &&
      realWorldFeedback?.publicUse === "protected-summary-only" &&
      !privateFeedbackMarker.test(`${opportunitySource}\n${protectedSource}`),
    real_world_feedback_stage_is_calibrated:
      realWorldFeedback?.observedStage === "conversation-invited" &&
      responseState?.stage === "conversation-invited" &&
      opportunity?.opportunity_status === "conditional" &&
      realWorldFeedback?.commercialEffect === "none" &&
      responseState?.commercial_effect === "none" &&
      realWorldFeedback?.observedSignals?.includes("warm-response") &&
      realWorldFeedback?.observedSignals?.includes(
        "future-conversation-invited"
      ) &&
      responseState?.observed_signals?.includes("warm-response") &&
      responseState?.observed_signals?.includes(
        "future-conversation-invited"
      ),
    real_world_feedback_preserves_unknowns:
      requiredUnestablishedFeedback.every(
        (item) => feedbackUnknowns.has(item) && responseUnknowns.has(item)
      ),
    real_world_feedback_does_not_validate_modeled_hire:
      realWorldFeedback?.validatesModeledHire === false &&
      realWorldFeedback?.allowedToFeedModeledJudge === false &&
      responseState?.modeled_hire_validated === false &&
      responseState?.judge_input_allowed === false &&
      contract?.scenario?.realWorldDecisionClaimed === false
  };

  const failures = Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([id]) => id);

  return {
    checks,
    failures,
    deterministicVerdict: failures.length === 0 ? "pass" : "fail",
    judgeStatus:
      failures.length === 0
        ? "ready-for-isolated-modeled-review"
        : "preflight-blocked",
    realWorldFeedback: {
      stage: responseState?.stage ?? null,
      commercialEffect: responseState?.commercial_effect ?? null,
      modeledHireValidated: responseState?.modeled_hire_validated ?? null
    }
  };
}

export function evaluateRepository(repoRoot = defaultRepoRoot) {
  const contract = JSON.parse(
    readFileSync(path.join(repoRoot, contractPath), "utf8")
  );
  const pageSource = readFileSync(
    path.join(repoRoot, contract.site.pageSourcePath),
    "utf8"
  );
  const opportunitySource = readFileSync(
    path.join(
      repoRoot,
      "docs/knowledge-bank/opportunities/source-backed-team-memory.md"
    ),
    "utf8"
  );
  const protectedSource = readFileSync(
    path.join(
      repoRoot,
      "docs/knowledge-bank/sources/protected-source-backed-memory-opportunity.md"
    ),
    "utf8"
  );
  return evaluateForwardedHiringScenario({
    contract,
    pageSource,
    opportunitySource,
    protectedSource
  });
}

const isCli =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
  const result = evaluateRepository();
  if (result.failures.length) {
    console.error("Forwarded team-memory hiring preflight failed:");
    for (const failure of result.failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log(
    "Forwarded team-memory hiring preflight passed; isolated modeled review is ready and remains advisory until calibrated."
  );
}
